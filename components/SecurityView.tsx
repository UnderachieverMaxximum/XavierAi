import React, { useState } from 'react';
import { 
  Shield, ShieldCheck, ShieldAlert, Activity, 
  Lock, Unlock, Eye, EyeOff, Zap, 
  Search, RefreshCw, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SecurityView: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [threats, setThreats] = useState<number>(0);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setThreats(Math.floor(Math.random() * 2));
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f1ea] paper-texture">
      {/* Header - Flush */}
      <div className="p-8 pb-4 flex items-end justify-between">
        <div>
          <h1 className="marker text-7xl text-gray-800 mb-2">SECURITY CENTER</h1>
          <p className="shadows text-3xl text-gray-500 italic">"Xavier's watchful eye."</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={startScan}
            disabled={isScanning}
            className={`marker-btn px-8 py-3 text-2xl flex items-center gap-3 ${isScanning ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}
          >
            <Zap size={24} className={isScanning ? 'animate-spin' : ''} />
            {isScanning ? 'SCANNING...' : 'DEEP SCAN'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
        {/* Status Card - Flush */}
        <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-8">
            <div className={`w-24 h-24 rounded-full border-4 border-black flex items-center justify-center ${threats > 0 ? 'bg-red-100' : 'bg-green-100'}`}>
              {threats > 0 ? <ShieldAlert size={48} className="text-red-600" /> : <ShieldCheck size={48} className="text-green-600" />}
            </div>
            <div className="flex-1">
              <h2 className="marker text-4xl mb-2">
                {isScanning ? 'SCAN IN PROGRESS...' : threats > 0 ? 'THREATS DETECTED' : 'SYSTEM SECURE'}
              </h2>
              <div className="w-full bg-gray-100 h-6 border-2 border-black overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${scanProgress}%` }}
                  className="h-full bg-red-600"
                />
              </div>
              <p className="shadows text-2xl text-gray-400 mt-2">
                {isScanning ? `Analyzing neural patterns... ${scanProgress}%` : `Last scan: Just now. ${threats} issues found.`}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Activity Monitor - Flush */}
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-6 border-b-2 border-black pb-4">
              <div className="flex items-center gap-3">
                <Activity size={24} className="text-red-600" />
                <h3 className="marker text-2xl">ACTIVITY MONITOR</h3>
              </div>
              <span className="text-xs bg-black text-white px-2 py-1 uppercase tracking-tighter">Live</span>
            </div>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center justify-between text-green-600">
                <span>[04:12:01] - Encrypting /root/vault</span>
                <CheckCircle2 size={16} />
              </div>
              <div className="flex items-center justify-between text-yellow-600">
                <span>[04:12:05] - Port 8080 scan detected</span>
                <AlertTriangle size={16} className="animate-pulse" />
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>[04:12:10] - Xavier: Analyzing traffic...</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>[04:12:15] - System: Integrity check OK</span>
              </div>
            </div>
          </div>

          {/* Defense Tools - Flush */}
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-4">
              <Shield size={24} className="text-blue-600" />
              <h3 className="marker text-2xl">DEFENSE TOOLS</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 border-2 border-black hover:bg-black/5 transition-all">
                <Lock size={32} className="mb-2" />
                <span className="marker text-lg">ENCRYPT</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 border-2 border-black hover:bg-black/5 transition-all">
                <RefreshCw size={32} className="mb-2" />
                <span className="marker text-lg">REPAIR</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 border-2 border-black hover:bg-black/5 transition-all">
                <Eye size={32} className="mb-2" />
                <span className="marker text-lg">STEALTH</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 border-2 border-black hover:bg-black/5 transition-all">
                <Search size={32} className="mb-2" />
                <span className="marker text-lg">AUDIT</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Monitoring - Flush */}
        <div className="border-4 border-black bg-black text-green-400 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono">
          <div className="flex items-center gap-4 mb-6">
            <Activity size={32} className="animate-pulse" />
            <h3 className="marker text-3xl text-white">XAVIER SENTINEL</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase">CPU Load</p>
              <p className="text-2xl">12.4%</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase">Memory</p>
              <p className="text-2xl">2.1 GB</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase">Network</p>
              <p className="text-2xl">0.5 MB/s</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase">Uptime</p>
              <p className="text-2xl">142:12:05</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityView;
