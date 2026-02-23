import React, { useState } from 'react';
import { 
  Shield, Cpu, HardDrive, Bell, 
  Eye, Globe, Lock, Sliders,
  ChevronRight, Save, RotateCcw
} from 'lucide-react';

const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('system');

  const sections = [
    { id: 'system', label: 'System', icon: Cpu },
    { id: 'storage', label: 'Storage', icon: HardDrive },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'display', label: 'Display', icon: Eye },
    { id: 'network', label: 'Network', icon: Globe },
    { id: 'advanced', label: 'Advanced', icon: Sliders },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f4f1ea] paper-texture">
      {/* Header - Flush */}
      <div className="p-8 pb-4 flex items-end justify-between">
        <div>
          <h1 className="marker text-7xl text-gray-800 mb-2">SETTINGS</h1>
          <p className="shadows text-3xl text-gray-500 italic">"Total control over every ink drop."</p>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Nav - Flush Sidebar */}
        <div className="w-80 border-r-4 border-black overflow-y-auto bg-white/30 custom-scrollbar p-6 space-y-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`w-full flex items-center justify-between p-6 border-4 border-black transition-all ${
                activeTab === section.id
                  ? 'bg-black text-white shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] -translate-y-1'
                  : 'bg-white hover:bg-black/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <section.icon size={28} />
                <span className="marker text-2xl tracking-tight">{section.label}</span>
              </div>
              <ChevronRight size={24} className={activeTab === section.id ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
        </div>

        {/* Right Content - Flush */}
        <div className="flex-1 bg-white overflow-y-auto custom-scrollbar p-12">
          {activeTab === 'system' && (
            <div className="max-w-4xl space-y-12">
              <h2 className="marker text-5xl text-red-600 mb-8 border-b-4 border-black pb-4">System Core</h2>
              
              <div className="space-y-8">
                <div className="flex items-center justify-between p-8 border-4 border-black bg-[#f4f1ea] paper-texture shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <div>
                    <h3 className="marker text-3xl">Xavier Response Speed</h3>
                    <p className="shadows text-2xl text-gray-500 italic">Adjust the latency of AI processing</p>
                  </div>
                  <input type="range" className="accent-red-600 w-64 h-4" />
                </div>

                <div className="flex items-center justify-between p-8 border-4 border-black bg-[#f4f1ea] paper-texture shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <div>
                    <h3 className="marker text-3xl">Auto-Indexing</h3>
                    <p className="shadows text-2xl text-gray-500 italic">Scan filesystem changes in real-time</p>
                  </div>
                  <div className="w-16 h-8 bg-red-600 border-4 border-black relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white border-2 border-black"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-8 border-4 border-black bg-[#f4f1ea] paper-texture shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <div>
                    <h3 className="marker text-3xl">Memory Allocation</h3>
                    <p className="shadows text-2xl text-gray-500 italic">Current: 512MB Reserved</p>
                  </div>
                  <select className="bg-white border-4 border-black px-4 py-2 marker text-2xl outline-none">
                    <option>256MB</option>
                    <option selected>512MB</option>
                    <option>1GB</option>
                    <option>2GB</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="max-w-4xl space-y-12">
              <h2 className="marker text-5xl text-red-600 mb-8 border-b-4 border-black pb-4">Storage Management</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 border-4 border-black bg-[#f4f1ea] paper-texture shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="marker text-3xl mb-4">Log Pruning</h3>
                  <p className="shadows text-2xl text-gray-500 mb-6 italic">Delete logs older than X days</p>
                  <div className="flex items-center gap-4">
                    <input type="number" min="1" max="999" defaultValue="30" className="w-32 border-4 border-black p-3 marker text-3xl" />
                    <span className="marker text-3xl">DAYS</span>
                  </div>
                </div>

                <div className="p-8 border-4 border-black bg-[#f4f1ea] paper-texture shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="marker text-3xl mb-4">Compression Level</h3>
                  <p className="shadows text-2xl text-gray-500 mb-6 italic">Zipping algorithm intensity</p>
                  <div className="flex gap-4">
                    {['LOW', 'MED', 'MAX'].map(l => (
                      <button key={l} className={`flex-1 py-3 border-4 border-black marker text-2xl transition-all ${l === 'MAX' ? 'bg-black text-white' : 'bg-white hover:bg-black/5'}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {['security', 'display', 'network', 'advanced'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
              <Sliders size={96} className="mb-8" />
              <h2 className="marker text-5xl">UNDER CONSTRUCTION</h2>
              <p className="shadows text-3xl italic">Xavier is still drawing these modules...</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions - Flush */}
      <div className="h-24 border-t-4 border-black bg-white flex items-center justify-end px-12 gap-6">
        <button className="flex items-center gap-3 px-8 py-3 border-4 border-black marker text-2xl hover:bg-black/5 transition-all active:translate-x-[2px] active:translate-y-[2px]">
          <RotateCcw size={24} />
          RESET
        </button>
        <button className="marker-btn bg-black text-white hover:bg-gray-800 px-10 py-3 text-3xl shadow-[6px_6px_0px_0px_rgba(239,68,68,1)]">
          <Save size={28} className="mr-2 inline" />
          SAVE CHANGES
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
