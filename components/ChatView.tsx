import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, User, Paperclip, 
  MoreHorizontal, Shield, Zap, AlertCircle,
  Smile, Mic
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Xavier online. System integrity at 98%. How can I assist your defense today?", sender: 'bot', time: '09:00 AM' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newUserMsg = { id: Date.now(), text: input, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages([...messages, newUserMsg]);
    setInput('');

    // Simulate Xavier response
    setTimeout(() => {
      const botMsg = { 
        id: Date.now() + 1, 
        text: "I've analyzed that request. Applying security protocols to the relevant sectors now.", 
        sender: 'bot', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f1ea] paper-texture overflow-hidden">
      {/* Chat Header - Flush */}
      <div className="p-6 border-b-4 border-black bg-white/50 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-red-600 border-4 border-black flex items-center justify-center text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Bot size={32} />
          </div>
          <div>
            <h1 className="marker text-4xl text-gray-800 leading-none uppercase">XAVIER CORE</h1>
            <div className="flex items-center gap-2 text-red-600 shadows text-xl">
              <Shield size={16} />
              <span>ACTIVE DEFENSE</span>
            </div>
          </div>
        </div>
        <button className="p-3 border-4 border-black bg-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Messages Area - Flush */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar bg-white/10"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-12 h-12 border-4 border-black flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${msg.sender === 'user' ? 'bg-white' : 'bg-red-600 text-white'}`}>
                  {msg.sender === 'user' ? <User size={24} /> : <Bot size={24} />}
                </div>
                <div className={`relative p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${msg.sender === 'user' ? 'bg-blue-100' : 'bg-white'}`}>
                  <p className="hand-drawn text-2xl leading-tight text-gray-800">{msg.text}</p>
                  <span className="block mt-4 shadows text-lg text-gray-500 text-right uppercase tracking-widest">{msg.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area - Flush */}
      <div className="p-6 border-t-4 border-black bg-white/50">
        <div className="flex items-center gap-4">
          <button className="p-3 border-4 border-black bg-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
            <Paperclip size={24} />
          </button>
          
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="COMMAND XAVIER..."
              className="w-full bg-white border-4 border-black p-4 marker text-2xl outline-none focus:bg-gray-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            />
          </div>

          <button 
            onClick={handleSend}
            className="p-4 bg-red-600 text-white border-4 border-black hover:bg-red-700 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            <Send size={28} />
          </button>
        </div>

        {/* Suggested Commands */}
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
          {[
            { icon: Shield, label: "SECURITY STATUS" },
            { icon: Zap, label: "OPTIMIZE STORAGE" },
            { icon: AlertCircle, label: "RECENT THREATS" },
            { icon: Mic, label: "VOICE COMMAND" }
          ].map((cmd, i) => (
            <button 
              key={i}
              onClick={() => setInput(cmd.label)}
              className="flex items-center gap-2 px-6 py-2 border-4 border-black bg-white marker text-xl whitespace-nowrap hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              <cmd.icon size={18} />
              {cmd.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatView;
