
import React, { useState, useEffect } from 'react';
import { 
  Activity, Shield, Cpu, HardDrive, 
  Zap, AlertTriangle, CheckCircle2, 
  Search, RefreshCw, Globe, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MonitorView: React.FC = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStep, setUpdateStep] = useState(0);
  const [apps, setApps] = useState([
    { name: 'System Core', status: 'secure', usage: '12%', network: '0.1 KB/s' },
    { name: 'Xavier Neural', status: 'optimizing', usage: '45%', network: '1.2 MB/s' },
    { name: 'Security Sandbox', status: 'active', usage: '5%', network: '0 KB/s' },
    { name: 'Network Guard', status: 'secure', usage: '8%', network: '45 KB/s' },
  ]);

  const startUpdate = () => {
    setIsUpdating(true);
    setUpdateStep(1);
    
    // Step 1: Confirmation (simulated by starting)
    // Step 2: Sandbox opens
    setTimeout(() => setUpdateStep(2), 1500);
    // Step 3: Xavier detaches
    setTimeout(() => setUpdateStep(3), 3000);
    // Step 4: Scrape internet
    setTimeout(() => setUpdateStep(4), 5000);
    // Step 5: Disconnect & Scan
    setTimeout(() => setUpdateStep(5), 7500);
    // Step 6: Reconnect
    setTimeout(() => {
      setUpdateStep(6);
      setTimeout(() => {
        setIsUpdating(false);
        setUpdateStep(0);
      }, 2000);
    }, 9000);
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f1ea] paper-texture overflow-hidden">
      {/* Header - Flush */}
      <div className="p-8 pb-4 flex items-end justify-between bg-white/30">
        <div>
          <h1 className="marker text-7xl text-gray-800 mb-2">MONITOR</h1>
          <p className="shadows text-3xl text-gray-500 italic">"Xavier's watchful eye on every process."</p>
        </div>
        <button 
          onClick={startUpdate}
          disabled={isUpdating}
          className={`marker-btn flex items-center gap-3 px-8 py-4 text-2xl transition-all ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <RefreshCw size={28} className={isUpdating ? 'animate-spin' : ''} />
          UPDATE KNOWLEDGE
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* System Health Cards - Flush */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-b-4 border-black">
          <div className="p-8 border-r-4 border-black bg-white flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Cpu size={32} className="text-blue-600" />
              <span className="marker text-4xl">CPU</span>
            </div>
            <div className="h-4 bg-gray-100 border-2 border-black">
              <motion.div 
                animate={{ width: '42%' }}
                className="h-full bg-blue-600"
              />
            </div>
            <span className="shadows text-2xl text-gray-400">42% LOAD • STABLE</span>
          </div>

          <div className="p-8 border-r-4 border-black bg-white flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Activity size={32} className="text-red-600" />
              <span className="marker text-4xl">THREATS</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="marker text-6xl text-red-600">0</span>
              <span className="shadows text-2xl text-gray-400">ACTIVE MALWARE DETECTED</span>
            </div>
          </div>

          <div className="p-8 bg-white flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Globe size={32} className="text-green-600" />
              <span className="marker text-4xl">NETWORK</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="marker text-5xl text-green-600">ENCRYPTED</span>
              <Lock size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* App Activity List - Flush */}
        <div className="p-8">
          <h2 className="marker text-5xl mb-8">APPLICATION ACTIVITY</h2>
          <div className="border-4 border-black bg-white divide-y-4 divide-black">
            {apps.map((app, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-black/5 transition-colors group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 border-2 border-black flex items-center justify-center bg-gray-50 group-hover:bg-red-50 transition-colors">
                    <Shield size={32} className={app.status === 'secure' ? 'text-green-600' : 'text-blue-600'} />
                  </div>
                  <div>
                    <h3 className="marker text-3xl">{app.name}</h3>
                    <p className="shadows text-xl text-gray-400 uppercase">{app.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                  <div className="text-right">
                    <p className="marker text-2xl">{app.usage}</p>
                    <p className="shadows text-lg text-gray-400">CPU USAGE</p>
                  </div>
                  <div className="text-right">
                    <p className="marker text-2xl">{app.network}</p>
                    <p className="shadows text-lg text-gray-400">NETWORK</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Update Sandbox Overlay */}
      <AnimatePresence>
        {isUpdating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-8"
          >
            <div className="max-w-2xl w-full bg-white border-8 border-red-600 p-12 relative overflow-hidden">
              {/* Scanlines effect */}
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center gap-8">
                <div className="w-32 h-32 border-8 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                
                <h2 className="marker text-6xl text-red-600">XAVIER SANDBOX</h2>
                
                <div className="space-y-4 w-full">
                  <div className={`p-4 border-2 border-black marker text-2xl transition-all ${updateStep >= 1 ? 'bg-green-50 text-green-700' : 'opacity-30'}`}>
                    {updateStep >= 1 ? '✓ NEURAL NODE DETACHED' : 'DETACHING NEURAL NODE...'}
                  </div>
                  <div className={`p-4 border-2 border-black marker text-2xl transition-all ${updateStep >= 2 ? 'bg-green-50 text-green-700' : 'opacity-30'}`}>
                    {updateStep >= 2 ? '✓ SANDBOX ISOLATED' : 'ISOLATING SANDBOX...'}
                  </div>
                  <div className={`p-4 border-2 border-black marker text-2xl transition-all ${updateStep >= 3 ? 'bg-green-50 text-green-700' : 'opacity-30'}`}>
                    {updateStep >= 3 ? '✓ INTERNET SCRAPE COMPLETE' : 'SCRAPING SECURITY DATA...'}
                  </div>
                  <div className={`p-4 border-2 border-black marker text-2xl transition-all ${updateStep >= 4 ? 'bg-green-50 text-green-700' : 'opacity-30'}`}>
                    {updateStep >= 4 ? '✓ MALWARE SCAN PASSED' : 'SCANNING FOR HIJACKING...'}
                  </div>
                  <div className={`p-4 border-2 border-black marker text-2xl transition-all ${updateStep >= 5 ? 'bg-green-50 text-green-700' : 'opacity-30'}`}>
                    {updateStep >= 5 ? '✓ RECONNECTING TO DEVICE' : 'VERIFYING INTEGRITY...'}
                  </div>
                </div>

                <p className="shadows text-3xl text-gray-500 italic">
                  "Xavier is currently outside the system. Do not interrupt."
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Ticker - Flush */}
      <div className="h-16 bg-red-600 text-white flex items-center px-8 gap-8 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <AlertTriangle size={20} />
          <span className="marker text-xl">SYSTEM STATUS:</span>
        </div>
        <div className="flex-1 whitespace-nowrap animate-marquee marker text-xl">
          OPTIMAL DEFENSE ACTIVE - ALL PORTS SECURED - NEURAL INK FLOW AT 100% - NO ANOMALIES DETECTED IN LAST 24H - XAVIER IS WATCHING
        </div>
      </div>
    </div>
  );
};

export default MonitorView;
