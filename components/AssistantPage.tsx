
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { TranscriptionItem } from '../types';

interface AssistantPageProps {
  onBack: () => void;
}

const AssistantPage: React.FC<AssistantPageProps> = ({ onBack }) => {
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcriptions, setTranscriptions] = useState<TranscriptionItem[]>([]);
  const [status, setStatus] = useState<string>('Ready to help');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  // Helper functions for audio processing
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
    setStatus('Session ended');
  }, []);

  const startSession = async () => {
    try {
      setStatus('Connecting to Xavier...');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('Xavier is listening...');
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
            // Handle Transcription
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              setTranscriptions(prev => {
                const last = prev[prev.length - 1];
                if (last && last.type === 'output') {
                   return [...prev.slice(0, -1), { ...last, text: last.text + text }];
                }
                return [...prev, { type: 'output', text }];
              });
            } else if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              setTranscriptions(prev => {
                const last = prev[prev.length - 1];
                if (last && last.type === 'input') {
                   return [...prev.slice(0, -1), { ...last, text: last.text + text }];
                }
                return [...prev, { type: 'input', text }];
              });
            }

            // Handle Audio
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
          onerror: (e) => {
            console.error('Xavier Error:', e);
            setStatus('Connection error');
            stopSession();
          },
          onclose: () => {
            setStatus('Connection closed');
            stopSession();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: 'You are Xavier, a digital assistant that feels hand-drawn and artistic. Your voice is friendly, intelligent, and slightly whimsical. You were designed as a "new type" of assistant.',
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        }
      });

      sessionPromiseRef.current = sessionPromise;

    } catch (err) {
      console.error('Failed to start Xavier:', err);
      setStatus('Microphone access required');
    }
  };

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, [stopSession]);

  const transcriptionEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    transcriptionEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcriptions]);

  return (
    <div className="flex flex-col h-screen bg-[#b0b0b0] hand-drawn text-[#2d2d2d] relative overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b-2 border-black/10 bg-white/30 backdrop-blur-sm z-10">
        <button onClick={onBack} className="p-2 hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={32} />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl marker font-bold">Xavier Live</h2>
          <span className={`text-sm font-bold ${isActive ? 'text-green-700' : 'text-red-700'} animate-pulse`}>
            {status}
          </span>
        </div>
        <button 
          onClick={() => setIsMuted(!isMuted)} 
          className={`p-2 rounded-full transition-colors ${isMuted ? 'text-red-600 bg-red-100' : 'hover:bg-black/5'}`}
        >
          {isMuted ? <MicOff size={32} /> : <Mic size={32} />}
        </button>
      </div>

      {/* Main Visualizer / Interaction Area */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
        {/* Xavier Character (Animated) */}
        <div className="my-12 relative flex flex-col items-center animate-float">
          <div className="flex gap-8">
            <div className={`w-20 h-20 rounded-full border-4 border-red-500 bg-red-100 flex items-center justify-center glow-red transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100 grayscale'}`}>
               <span className="text-5xl font-bold marker mt-[-4px]">M</span>
            </div>
            <div className={`w-20 h-20 rounded-full border-4 border-red-500 bg-red-100 flex items-center justify-center glow-red transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100 grayscale'}`}>
               <span className="text-5xl font-bold marker mt-[-4px]">M</span>
            </div>
          </div>
          {/* Audio Visualization bars */}
          <div className="flex gap-2 mt-8 h-16 items-end">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3 bg-red-500/60 rounded-full transition-all duration-150 ${isActive ? 'animate-bounce' : 'h-2'}`}
                style={{ 
                  height: isActive ? `${20 + Math.random() * 40}px` : '8px',
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.6s'
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Transcriptions */}
        <div className="w-full max-w-2xl bg-white/20 border-2 border-black/5 rounded-3xl p-6 min-h-[300px] flex flex-col gap-4 shadow-inner">
          {transcriptions.length === 0 ? (
            <div className="flex-1 flex items-center justify-center opacity-30 italic text-2xl">
              Start talking to Xavier...
            </div>
          ) : (
            transcriptions.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${item.type === 'input' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] px-4 py-2 rounded-2xl text-xl border-2 ${
                    item.type === 'input' 
                      ? 'bg-blue-400/20 border-blue-500/30' 
                      : 'bg-green-400/20 border-green-500/30'
                  }`}
                >
                  <span className="text-xs uppercase font-black block opacity-50 mb-1">
                    {item.type === 'input' ? 'You' : 'Xavier'}
                  </span>
                  {item.text}
                </div>
              </div>
            ))
          )}
          <div ref={transcriptionEndRef} />
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-8 flex justify-center bg-white/30 backdrop-blur-md">
        {!isActive ? (
          <button 
            onClick={startSession}
            className="group relative"
          >
            <div className="border-[4px] border-green-600 px-12 py-3 rounded-xl rotate-[-1deg] bg-green-500 hover:rotate-0 transition-transform">
              <span className="text-4xl font-black text-white marker tracking-wider">START XAVIER</span>
            </div>
          </button>
        ) : (
          <button 
            onClick={stopSession}
            className="group relative"
          >
            <div className="border-[4px] border-red-600 px-12 py-3 rounded-xl rotate-[1deg] bg-red-500 hover:rotate-0 transition-transform">
              <span className="text-4xl font-black text-white marker tracking-wider">DISCONNECT</span>
            </div>
          </button>
        )}
      </div>

      {/* Decorative scribbles */}
      <div className="absolute top-20 left-10 opacity-10 rotate-12">
        <svg width="100" height="100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="2" strokeDasharray="5 5" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 -rotate-12">
        <svg width="120" height="80">
          <path d="M 0 40 Q 60 0 120 40 T 240 40" fill="none" stroke="black" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
};

export default AssistantPage;
