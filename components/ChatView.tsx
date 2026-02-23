import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, User, Paperclip, 
  MoreHorizontal, Shield, Zap, AlertCircle
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
    <div className="flex flex-col h-full bg-[#121212] text-white overflow-hidden">
      {/* Chat Header - Flush */}
      <div className="p-6 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-red-600 border border-white/20 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            <Bot size={28} />
          </div>
          <div>
            <h1 className="marker text-3xl text-white">XAVIER CORE</h1>
            <div className="flex items-center gap-2 text-green-500 shadows text-lg">
              <Shield size={14} />
              <span>ACTIVE DEFENSE</span>
            </div>
          </div>
        </div>
        <button className="p-3 hover:bg-white/10 rounded-full transition-all">
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Messages Area - Flush */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] bg-[length:20px_20px]"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 border border-white/10 flex items-center justify-center shrink-0 rounded-full ${msg.sender === 'user' ? 'bg-white/10' : 'bg-red-600 text-white'}`}>
                  {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`relative p-4 border border-white/10 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600/20' : 'bg-white/5 backdrop-blur-sm'}`}>
                  <p className="hand-drawn text-xl leading-relaxed text-gray-100">{msg.text}</p>
                  <span className="block mt-2 shadows text-sm text-gray-500 text-right">{msg.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area - Flush */}
      <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button className="p-3 hover:bg-white/10 rounded-full transition-all text-gray-400"><Paperclip size={20} /></button>
          
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Command Xavier..."
              className="w-full bg-white/5 border border-white/10 p-3 rounded-full marker text-xl outline-none focus:border-red-600/50 transition-all"
            />
          </div>

          <button 
            onClick={handleSend}
            className="bg-red-600 text-white p-3 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:bg-red-700 transition-all"
          >
            <Send size={24} />
          </button>
        </div>

        {/* Suggested Commands */}
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {[
            { icon: Shield, label: "Security Status" },
            { icon: Zap, label: "Optimize Storage" },
            { icon: AlertCircle, label: "Recent Threats" }
          ].map((cmd, i) => (
            <button 
              key={i}
              onClick={() => setInput(cmd.label)}
              className="flex items-center gap-2 px-4 py-1.5 border border-white/10 rounded-full marker text-lg whitespace-nowrap hover:bg-white/10 transition-all text-gray-300"
            >
              <cmd.icon size={16} />
              {cmd.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatView;
