import React, { useState } from 'react';
import { 
  Zap, Trash2, ShieldCheck, Sparkles, 
  AlertTriangle, CheckCircle2, RefreshCw,
  Search, ArrowRight
} from 'lucide-react';

const OptimizeView: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  const recommendations = [
    { title: 'Duplicate Images', size: '1.2 GB', count: 42, icon: AlertTriangle, color: 'text-orange-500' },
    { title: 'Large Video Files', size: '8.4 GB', count: 5, icon: Zap, color: 'text-red-500' },
    { title: 'Unused App Cache', size: '2.8 GB', count: 12, icon: Trash2, color: 'text-blue-500' },
    { title: 'System Junk', size: '450 MB', count: 1500, icon: ShieldCheck, color: 'text-green-500' },
  ];

  return (
    <div className="flex flex-col h-full p-8 max-w-6xl mx-auto w-full">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h1 className="marker text-6xl text-gray-800 mb-2">OPTIMIZE</h1>
          <p className="shadows text-2xl text-gray-400 italic">"Sharpening the digital pencil."</p>
        </div>
        
        {!scanComplete && !isScanning && (
          <button 
            onClick={startScan}
            className="marker-btn flex items-center gap-3 px-12 py-4 text-3xl"
          >
            <Sparkles className="animate-pulse" />
            START AI SCAN
          </button>
        )}
      </div>

      {isScanning ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          <div className="relative">
            <div className="w-48 h-48 border-8 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search size={48} className="text-gray-400 animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="marker text-4xl text-gray-800 animate-bounce">SCANNING FILESYSTEM...</h2>
            <p className="shadows text-2xl text-gray-400">Xavier is looking for digital dust.</p>
          </div>
        </div>
      ) : scanComplete ? (
        <div className="flex-1 space-y-8 overflow-y-auto pr-4 custom-scrollbar">
          <div className="bg-green-50 border-4 border-green-600 p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(22,163,74,1)] flex items-center justify-between">
            <div className="flex items-center gap-6">
              <CheckCircle2 size={64} className="text-green-600" />
              <div>
                <h2 className="marker text-4xl text-green-800">SCAN COMPLETE</h2>
                <p className="shadows text-2xl text-green-700">We found 12.85 GB of optimizable space.</p>
              </div>
            </div>
            <button className="bg-green-600 text-white px-8 py-3 rounded-xl marker text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              CLEAN ALL NOW
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="bg-white border-2 border-black p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 bg-gray-50 rounded-xl border-2 border-black/5 ${rec.color}`}>
                    <rec.icon size={32} />
                  </div>
                  <div className="text-right">
                    <span className="marker text-3xl text-red-600">{rec.size}</span>
                    <p className="shadows text-lg text-gray-400">{rec.count} items</p>
                  </div>
                </div>
                <h3 className="marker text-2xl text-gray-800 mb-4">{rec.title}</h3>
                <button className="w-full flex items-center justify-between p-3 border-2 border-black rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="marker text-xl">VIEW & SELECT</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-black text-white p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]">
            <div className="flex items-center gap-4 mb-4">
              <Sparkles className="text-yellow-400" />
              <h3 className="marker text-3xl">Xavier's Recommendation</h3>
            </div>
            <p className="hand-drawn text-2xl italic leading-relaxed">
              "I've identified several large video files that haven't been opened in over 6 months. Moving these to a zipped archive could save you 4.2 GB immediately while keeping them safe."
            </p>
            <div className="mt-6 flex gap-4">
              <button className="bg-red-600 px-6 py-2 rounded-lg marker text-xl hover:bg-red-700 transition-colors">ARCHIVE NOW</button>
              <button className="px-6 py-2 border-2 border-white rounded-lg marker text-xl hover:bg-white/10 transition-colors">DISMISS</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
          <Zap size={120} className="mb-6 text-gray-300" />
          <h2 className="marker text-5xl text-gray-400">READY TO OPTIMIZE</h2>
          <p className="shadows text-3xl text-gray-300">Run a scan to see Xavier's recommendations.</p>
        </div>
      )}
    </div>
  );
};

export default OptimizeView;
