
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Mic, MicOff, Volume2, Bot, Sparkles } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { TranscriptionItem } from '../types';

interface AssistantOverlayProps {
  onClose: () => void;
}

const AssistantOverlay: React.FC<AssistantOverlayProps> = ({ onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcriptions, setTranscriptions] = useState<TranscriptionItem[]>([]);
  const [status, setStatus] = useState<string>('Ready to talk');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const createBlob = (data: Float32Array) => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  };

  const stopSession = useCallback(() => {
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    setIsActive(false);
  }, []);

  const startSession = async () => {
    try {
      setStatus('Waking Xavier...');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('Active');
            setIsActive(true);
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (e) => {
              if (isMuted) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              setTranscriptions(prev => {
                const last = prev[prev.length - 1];
                if (last && last.type === 'output') return [...prev.slice(0, -1), { ...last, text: last.text + text }];
                return [...prev, { type: 'output', text }];
              });
            } else if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              setTranscriptions(prev => {
                const last = prev[prev.length - 1];
                if (last && last.type === 'input') return [...prev.slice(0, -1), { ...last, text: last.text + text }];
                return [...prev, { type: 'input', text }];
              });
            }
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && outAudioContextRef.current) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outAudioContextRef.current.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outAudioContextRef.current, 24000, 1);
              const source = outAudioContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outAudioContextRef.current.destination);
              source.onended = () => sourcesRef.current.delete(source);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: () => { setStatus('Error'); stopSession(); },
          onclose: () => { setStatus('Ended'); stopSession(); },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: 'You are Xavier, the AI File Assistant for a Pixel phone. You help users find, organize, and delete files. You are artistic, helpful, and speak concisely. Mention specific files from the user storage (Images, Videos, Downloads) to seem informed.',
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        }
      });
      sessionPromiseRef.current = sessionPromise;
    } catch (err) {
      console.error(err);
      setStatus('Access denied');
    }
  };

  useEffect(() => {
    startSession();
    return () => stopSession();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-end pointer-events-none">
      {/* Backdrop for mobile focus */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
      
      <div className="w-full max-w-2xl bg-white border-t-8 border-x-4 border-black pointer-events-auto overflow-hidden animate-slide-up flex flex-col h-[85vh] md:h-[70vh] relative">
        {/* Header - Flush */}
        <div className="p-6 flex items-center justify-between border-b-4 border-black bg-[#f4f1ea] paper-texture">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 <Bot size={28} className="text-white" />
              </div>
              <div>
                <h3 className="marker text-3xl font-bold">Xavier Assistant</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="text-xs uppercase tracking-widest font-black text-red-600">{status}</span>
                </div>
              </div>
           </div>
           <button onClick={onClose} className="p-3 hover:bg-black/5 border-2 border-black transition-all"><X size={32} /></button>
        </div>

        {/* Chat / Transcription Area - Flush */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 bg-white custom-scrollbar">
           {transcriptions.length === 0 && (
             <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 py-12">
                <Sparkles size={64} className="text-red-600 mb-6 animate-pulse" />
                <p className="kalam text-3xl">"Xavier is scanning your files...<br/>Try asking 'Find my largest video'"</p>
             </div>
           )}
           {transcriptions.map((t, i) => (
             <div key={i} className={`flex ${t.type === 'input' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-6 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${t.type === 'input' ? 'bg-blue-50' : 'bg-white'}`}>
                   <p className="marker text-xl">{t.text}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Live Audio Visualizer - Flush */}
        <div className="h-20 flex items-center justify-center gap-2 bg-black px-12">
           {[...Array(32)].map((_, i) => (
             <div 
              key={i} 
              className={`w-1.5 bg-red-600 rounded-full transition-all duration-75 ${isActive ? 'animate-bounce' : 'h-1'}`}
              style={{ 
                height: isActive ? `${6 + Math.random() * 48}px` : '6px',
                animationDelay: `${i * 0.03}s`
              }}
            ></div>
           ))}
        </div>

        {/* Footer Controls - Flush */}
        <div className="p-8 bg-[#f4f1ea] paper-texture border-t-4 border-black flex items-center justify-between">
           <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${isMuted ? 'bg-red-100 text-red-600' : 'bg-white'}`}
           >
             {isMuted ? <MicOff size={32} /> : <Mic size={32} />}
           </button>
           
           <div className="flex-1 px-12 text-center">
             <p className="shadows text-2xl text-gray-500 italic">"Speak to the machine..."</p>
           </div>

           <div className="w-16 h-16 bg-red-600 rounded-full border-4 border-black animate-ping opacity-10"></div>
        </div>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default AssistantOverlay;
