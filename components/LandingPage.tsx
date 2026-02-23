import React, { useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';

interface LandingPageProps {
  onLaunch: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f1ea] flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Background Grid */}
      <div 
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: 
            'radial-gradient(#d1d1d1 1px, transparent 0), linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px, 20px 20px, 20px 20px'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Title with animation */}
        <div className="mb-4 inline-block">
          <Zap className="w-16 h-16 mx-auto mb-4 text-red-600 animate-pulse" />
        </div>

        <h1 className="marker text-8xl mb-6 text-[#2d2d2d] animate-scribble" style={{
          textShadow: '3px 3px 0px rgba(0,0,0,0.2)',
          letterSpacing: '2px'
        }}>
          XAVIER OS
        </h1>

        <p className="shadows text-4xl text-gray-600 mb-8 italic">
          Intelligent File Management System
        </p>

        <div className="sketch-card bg-white max-w-lg mx-auto mb-8">
          <p className="kalam text-2xl text-gray-700 leading-relaxed">
            A sophisticated digital assistant designed for seamless file exploration, AI-powered insights, and comprehensive system monitoring. Secured, intelligent, and built for the modern workspace.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {['AI Powered', 'Real-time Monitoring', 'Secure Access'].map((feature, idx) => (
            <div 
              key={idx}
              className="sketch-border bg-red-600 text-white px-6 py-3 marker text-xl"
              style={{
                boxShadow: '2px 2px 0px rgba(0,0,0,0.3)'
              }}
            >
              {feature}
            </div>
          ))}
        </div>

        {/* Launch Button */}
        <button
          onClick={onLaunch}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="marker-btn text-3xl px-12 py-4 group relative overflow-hidden"
          style={{
            transform: hovering ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.2s ease-out'
          }}
        >
          <span className="flex items-center gap-3">
            LAUNCH SYSTEM
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={28} />
          </span>
        </button>

        {/* Footer Text */}
        <p className="shadows text-gray-500 mt-12 text-lg italic">
          "Initializing Xavier AI File Manager..."
        </p>
      </div>
    </div>
  );
};

export default LandingPage;