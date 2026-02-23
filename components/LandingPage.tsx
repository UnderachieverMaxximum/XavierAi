
import React, { useState, useEffect, useRef } from 'react';
import { Settings, Sparkles, Pencil, FileText, MousePointer2 } from 'lucide-react';

interface LandingPageProps {
  onLaunch: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Simulate initial drawing sequence
    const timer = setTimeout(() => setIsDrawing(true), 500);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Calculate eye rotation/position based on mouse
  const getEyeStyle = (baseX: number, baseY: number) => {
    const dx = mousePos.x - baseX;
    const dy = mousePos.y - baseY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(45, Math.sqrt(dx * dx + dy * dy) / 10);
    return {
      transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
    };
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen paper-texture overflow-hidden selection:bg-red-200"
    >
      {/* Background Decor - Flush to edges */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 opacity-20 rotate-[-5deg]">
          <div className="w-64 h-80 bg-white shadow-2xl border border-black/5 p-4 transform rotate-1 flex flex-col gap-2">
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-100 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
            <div className="mt-auto flex justify-between">
              <div className="w-8 h-8 rounded-full bg-red-100"></div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-20 right-10 opacity-10">
          <div className="flex flex-col gap-4 items-end">
            <div className="flex gap-2">
               {[...Array(5)].map((_, i) => <div key={i} className="w-16 h-1 bg-black/40 rotate-12"></div>)}
            </div>
            <p className="marker text-6xl">XAVIER OS</p>
            <p className="shadows text-2xl uppercase tracking-widest">Secure Environment</p>
          </div>
        </div>
      </div>

      {/* Main Content - No max-width constraint for flush feel */}
      <div className="relative z-10 flex flex-col items-center w-full px-8 py-12">
        
        {/* Top Branding Section */}
        <div className="mb-16 text-center">
          <div className="inline-block relative">
             <span className="hand-drawn text-2xl absolute -top-10 -left-6 text-blue-600 bg-blue-50 px-3 py-1 rounded-sm border border-blue-200 rotate-[-3deg] shadow-sm">
              System Ready.
             </span>
             <h2 className="shadows text-4xl text-gray-400 mb-[-1.5rem] ml-16">initializing...</h2>
             <h1 className="marker text-[12rem] sm:text-[15rem] leading-none tracking-tighter text-gray-800 relative">
               X<span className="text-red-600 animate-scribble inline-block">A</span>VIER
               <div className="absolute -bottom-4 left-0 w-full h-6 bg-yellow-400/30 -skew-x-12 -z-10"></div>
             </h1>
          </div>
          <p className="kalam text-4xl mt-6 text-gray-600 italic">
            "The assistant that was <span className="underline decoration-red-400 decoration-wavy underline-offset-8">drawn</span> to help."
          </p>
        </div>

        {/* Character Interaction Zone - Larger for mobile impact */}
        <div className="relative mb-20 group">
          {/* Sketchy Circle Background */}
          <svg className="absolute inset-0 -m-32 w-[calc(100%+256px)] h-[calc(100%+256px)] pointer-events-none opacity-10" viewBox="0 0 200 200">
             <circle 
              cx="100" cy="100" r="90" 
              fill="none" 
              stroke="black" 
              strokeWidth="0.2" 
              className="animate-draw" 
              strokeDasharray="2,2"
            />
          </svg>

          {/* Xavier Character */}
          <div className="flex gap-16 relative z-10 transition-transform duration-700 group-hover:scale-110">
            {/* Left Eye */}
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-[4px] border-black bg-white shadow-2xl flex items-center justify-center overflow-hidden">
                <div 
                  className="w-14 h-14 sm:w-18 sm:h-18 bg-red-600 rounded-full flex items-center justify-center transition-transform duration-100 ease-out"
                  style={getEyeStyle(window.innerWidth/2 - 80, window.innerHeight/2)}
                >
                  <span className="marker text-white text-4xl sm:text-5xl mt-[-4px]">M</span>
                </div>
              </div>
              <div className="absolute -top-6 -left-4 w-20 h-3 bg-black/80 rounded-full -rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </div>

            {/* Right Eye */}
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-[4px] border-black bg-white shadow-2xl flex items-center justify-center overflow-hidden">
                <div 
                  className="w-14 h-14 sm:w-18 sm:h-18 bg-red-600 rounded-full flex items-center justify-center transition-transform duration-100 ease-out"
                  style={getEyeStyle(window.innerWidth/2 + 80, window.innerHeight/2)}
                >
                  <span className="marker text-white text-4xl sm:text-5xl mt-[-4px]">M</span>
                </div>
              </div>
              <div className="absolute -top-6 -right-4 w-20 h-3 bg-black/80 rounded-full rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </div>
          </div>

          {/* Speech Bubble */}
          <div className="absolute -top-28 -right-40 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0 scale-90 group-hover:scale-100">
            <div className="bg-white border-4 border-black px-8 py-4 rounded-[3rem] relative shadow-xl">
              <p className="hand-drawn text-3xl font-bold">Ready to chat?</p>
              <div className="absolute -left-3 bottom-2 w-8 h-8 bg-white border-l-4 border-b-4 border-black -rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Action Section - Full width on mobile */}
        <div className="flex flex-col items-center gap-10 w-full max-w-md">
          <button 
            onClick={onLaunch}
            className="w-full group relative py-8 px-16 transition-all active:scale-95"
          >
            {/* Stamp-like button */}
            <div className="absolute inset-0 bg-red-600 rotate-[-1deg] rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-0 group-hover:bg-red-700 transition-all"></div>
            <div className="relative flex items-center justify-center gap-6 text-white">
              <Sparkles className="animate-pulse w-8 h-8" />
              <span className="marker text-5xl tracking-[0.2em] uppercase">Launch</span>
            </div>
          </button>

          <div className="flex justify-between w-full px-4">
            <button className="flex items-center gap-3 hover:text-red-600 transition-colors group">
              <Settings size={24} className="group-hover:rotate-90 transition-transform" />
              <span className="hand-drawn text-2xl font-bold">CONFIG</span>
            </button>
            <div className="flex items-center gap-3 text-gray-400">
              <Pencil size={20} />
              <span className="shadows text-xl">XAVIER CORE v2.5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Foreground Scribbles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-5">
         {[...Array(12)].map((_, i) => (
           <div 
             key={i} 
             className="absolute"
             style={{
               top: `${Math.random() * 100}%`,
               left: `${Math.random() * 100}%`,
               transform: `rotate(${Math.random() * 360}deg)`,
             }}
           >
             <svg width="200" height="200" viewBox="0 0 200 200">
               <path 
                d={`M ${Math.random()*200} ${Math.random()*200} Q ${Math.random()*200} ${Math.random()*200} ${Math.random()*200} ${Math.random()*200}`} 
                stroke="black" fill="none" strokeWidth="2" 
               />
             </svg>
           </div>
         ))}
      </div>
    </div>
  );
};

export default LandingPage;
