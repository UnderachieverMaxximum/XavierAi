import React, { useState } from 'react';
import { 
  FileText, Folder, ChevronRight, ChevronDown, 
  Search, Download, Trash2, Zap, Clock,
  Terminal, Shield, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LogFolder, LogFile } from '../types';

const MOCK_LOGS: (LogFolder | LogFile)[] = [
  {
    id: 'f1',
    name: 'System Logs',
    type: 'folder',
    items: [
      { id: 'l1', name: 'kernel_panic.log', type: 'file', size: '12 KB', date: '10m ago' },
      { id: 'l2', name: 'boot_sequence.log', type: 'file', size: '45 KB', date: '1h ago' },
    ]
  },
  {
    id: 'f2',
    name: 'Xavier AI Logs',
    type: 'folder',
    items: [
      { id: 'l3', name: 'neural_ink_flow.log', type: 'file', size: '2.4 MB', date: 'Just now' },
      { id: 'l4', name: 'security_audit.log', type: 'file', size: '156 KB', date: '5m ago' },
    ]
  },
  { id: 'l5', name: 'full_system_dump.zip', type: 'file', size: '450 MB', date: 'Yesterday' },
];

const LogsView: React.FC = () => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['f1', 'f2']);
  const [selectedLog, setSelectedLog] = useState<string | null>(null);

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#121212] text-white overflow-hidden">
      {/* Header - Flush */}
      <div className="p-8 pb-4 flex items-end justify-between bg-black/40 backdrop-blur-md border-b border-white/10">
        <div>
          <h1 className="marker text-7xl text-white mb-2">LOG CENTER</h1>
          <p className="shadows text-3xl text-gray-500 italic">"The paper trail of the machine."</p>
        </div>
        <div className="flex gap-4">
          <button className="marker-btn bg-red-600 text-white hover:bg-red-700 px-8 py-3 text-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            ZIP ALL
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Log Tree - Flush Sidebar */}
        <div className="w-1/3 border-r border-white/10 overflow-y-auto bg-black/20 custom-scrollbar">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <Search size={20} className="text-gray-500" />
              <input type="text" placeholder="Search logs..." className="bg-transparent border-none outline-none marker text-xl w-full text-white" />
            </div>
          </div>
          
          <div className="p-4 space-y-2">
            {MOCK_LOGS.map((item) => (
              <div key={item.id}>
                {item.type === 'folder' ? (
                  <div>
                    <button 
                      onClick={() => toggleFolder(item.id)}
                      className="w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors border-b border-white/5 rounded-xl"
                    >
                      {expandedFolders.includes(item.id) ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                      <Folder size={24} className="text-yellow-500" />
                      <span className="marker text-2xl">{item.name}</span>
                    </button>
                    <AnimatePresence>
                      {expandedFolders.includes(item.id) && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden ml-8 border-l border-white/10"
                        >
                          {item.items.map(file => (
                            <button 
                              key={file.id}
                              onClick={() => setSelectedLog(file.id)}
                              className={`w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded-xl ${selectedLog === file.id ? 'bg-red-600/20' : ''}`}
                            >
                              <div className="flex items-center gap-3">
                                <FileText size={20} className="text-gray-400" />
                                <span className="marker text-xl">{file.name}</span>
                              </div>
                              {file.type === 'file' && <span className="shadows text-lg text-gray-500">{file.size}</span>}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button 
                    onClick={() => setSelectedLog(item.id)}
                    className={`w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5 rounded-xl ${selectedLog === item.id ? 'bg-red-600/20' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <Zap size={24} className="text-blue-500" />
                      <span className="marker text-2xl">{item.name}</span>
                    </div>
                    {item.type === 'file' && <span className="shadows text-lg text-gray-500">{item.size}</span>}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Log Viewer - Flush Content */}
        <div className="flex-1 flex flex-col bg-black">
          {selectedLog ? (
            <>
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-4">
                  <Terminal size={28} className="text-red-500" />
                  <h2 className="marker text-3xl">VIEWER: {selectedLog}</h2>
                </div>
                <div className="flex gap-4">
                  <button className="p-2 hover:bg-white/10 border border-white/10 transition-all rounded-lg"><Download size={24} /></button>
                  <button className="p-2 hover:bg-white/10 border border-white/10 transition-all text-red-500 rounded-lg"><Trash2 size={24} /></button>
                </div>
              </div>
              <div className="flex-1 p-8 font-mono text-lg overflow-y-auto custom-scrollbar bg-black text-green-500 selection:bg-green-900 selection:text-white">
                <div className="space-y-2">
                  <p className="opacity-50">[09:24:11] XAVIER_CORE: Initializing neural ink flow...</p>
                  <p className="opacity-50">[09:24:12] SYSTEM: Kernel integrity check PASSED.</p>
                  <p className="text-red-400">[09:24:15] SECURITY: Blocked unauthorized access to /root/secrets.</p>
                  <p className="opacity-50">[09:24:20] XAVIER_CORE: Optimization cycle 42 started.</p>
                  <p className="animate-pulse">_</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] bg-[length:20px_20px]">
              <div className="w-32 h-32 bg-white/5 border-4 border-white/10 border-dashed rounded-full flex items-center justify-center mb-8">
                <Shield size={64} className="text-white/10" />
              </div>
              <h2 className="marker text-4xl text-gray-600 mb-4">NO LOG SELECTED</h2>
              <p className="shadows text-2xl text-gray-600 max-w-md">
                Select a room from the left to inspect Xavier's digital footprint.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Real-time Ticker Footer - Flush */}
      <div className="h-16 bg-black text-white flex items-center px-8 gap-8 overflow-hidden border-t border-white/10">
        <div className="flex items-center gap-2 shrink-0">
          <Clock size={20} className="text-red-600" />
          <span className="marker text-xl">LIVE STREAM:</span>
        </div>
        <div className="flex-1 whitespace-nowrap animate-marquee marker text-xl text-green-500">
          [03:55:36] - SECURITY ALERT: PORT 8080 SCAN DETECTED - [03:55:37] - XAVIER: ANALYZING PACKET SIGNATURES - [03:55:40] - SYSTEM: CACHE PURGE RECOMMENDED
        </div>
      </div>
    </div>
  );
};

export default LogsView;
