import React, { useState } from 'react';
import { 
  ScrollText, Search, Filter, 
  ChevronRight, ChevronDown, FileText, 
  Terminal, AlertCircle, CheckCircle2, 
  Clock, Download, Trash2, Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LogFolder, LogFile } from '../types';

const MOCK_LOGS: LogFolder = {
  id: 'root',
  name: 'System Logs',
  type: 'folder',
  items: [
    {
      id: 'kernel',
      name: 'Kernel',
      type: 'folder',
      items: [
        { id: 'k1', name: 'boot.log', type: 'file', size: '12 KB', date: '2024-03-20', content: '[0.000000] Linux version 6.5.0-26-generic\n[0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-6.5.0-26-generic\n[0.000000] KERNEL: Xavier Core Initialized' },
        { id: 'k2', name: 'dmesg.log', type: 'file', size: '45 KB', date: '2024-03-20', content: '[1.234] usb 1-1: new high-speed USB device\n[1.456] input: Xavier HID Mouse' },
      ]
    },
    {
      id: 'apps',
      name: 'Applications',
      type: 'folder',
      items: [
        { id: 'a1', name: 'xavier_ai.log', type: 'file', size: '1.2 MB', date: '2024-03-21', content: '2024-03-21 10:00:01 INFO: Xavier AI started\n2024-03-21 10:00:05 DEBUG: Neural weights loaded' },
        { id: 'a2', name: 'file_manager.log', type: 'file', size: '230 KB', date: '2024-03-21', content: '2024-03-21 10:05:12 ERROR: Failed to read /root/secret.txt' },
      ]
    },
    { id: 'sys', name: 'syslog', type: 'file', size: '2.4 MB', date: '2024-03-21', content: 'Mar 21 10:15:01 xavier-os systemd[1]: Starting Periodic Command Scheduler...' },
  ]
};

const LogsView: React.FC = () => {
  const [selectedLog, setSelectedLog] = useState<LogFile | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root', 'kernel', 'apps']));

  const toggleFolder = (id: string) => {
    const newSet = new Set(expandedFolders);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedFolders(newSet);
  };

  const renderTree = (item: LogFolder | LogFile, depth = 0) => {
    if (item.type === 'folder') {
      const isExpanded = expandedFolders.has(item.id);
      return (
        <div key={item.id} className="select-none">
          <button 
            onClick={() => toggleFolder(item.id)}
            className="w-full flex items-center gap-2 py-2 px-2 hover:bg-red-600/10 transition-colors group"
            style={{ paddingLeft: `${depth * 1.5 + 0.5}rem` }}
          >
            {isExpanded ? <ChevronDown size={18} className="text-red-600" /> : <ChevronRight size={18} className="text-gray-400" />}
            <span className="marker text-xl text-gray-800">{item.name}</span>
          </button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {item.items.map(child => renderTree(child, depth + 1))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    } else {
      const isSelected = selectedLog?.id === item.id;
      return (
        <button 
          key={item.id}
          onClick={() => setSelectedLog(item)}
          className={`w-full flex items-center gap-2 py-2 px-2 transition-all ${
            isSelected ? 'bg-red-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'hover:bg-black/5'
          }`}
          style={{ paddingLeft: `${depth * 1.5 + 0.5}rem` }}
        >
          <FileText size={16} className={isSelected ? 'text-white' : 'text-blue-600'} />
          <span className="marker text-xl truncate">{item.name}</span>
        </button>
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f1ea] paper-texture overflow-hidden">
      {/* Header - Flush */}
      <div className="p-6 border-b-4 border-black bg-white/50 flex items-center justify-between">
        <div>
          <h1 className="marker text-6xl text-gray-800 leading-none">LOG CENTER</h1>
          <p className="shadows text-2xl text-gray-500 italic">"Every bit accounted for."</p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 border-4 border-black bg-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
            <Download size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Log Tree - Flush Sidebar */}
        <div className="w-1/3 border-r-4 border-black bg-white/30 overflow-y-auto custom-scrollbar hidden sm:block">
          <div className="p-2">
            {renderTree(MOCK_LOGS)}
          </div>
        </div>

        {/* Log Viewer - Flush Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white/20">
          {selectedLog ? (
            <>
              <div className="p-4 border-b-4 border-black bg-white/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-600 border-2 border-black flex items-center justify-center text-white">
                    <Terminal size={24} />
                  </div>
                  <div>
                    <h2 className="marker text-2xl text-gray-800 leading-none">{selectedLog.name}</h2>
                    <p className="shadows text-lg text-gray-400">{selectedLog.size} • {selectedLog.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"><Search size={18} /></button>
                  <button className="p-2 border-2 border-black hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-6 font-mono text-sm bg-black text-green-400 selection:bg-green-900 selection:text-white custom-scrollbar">
                <div className="max-w-full overflow-x-auto whitespace-pre">
                  {selectedLog.content}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-32 h-32 bg-white border-4 border-black flex items-center justify-center mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <ScrollText size={64} className="text-gray-300" />
              </div>
              <h2 className="marker text-4xl text-gray-800 mb-4">NO LOG SELECTED</h2>
              <p className="shadows text-2xl text-gray-400 italic max-w-sm">
                "Select a file from the tree to inspect the system's neural activity."
              </p>
              
              {/* Mobile Tree View - Only visible on small screens */}
              <div className="mt-12 w-full sm:hidden border-t-4 border-black pt-8">
                <h3 className="marker text-3xl text-gray-800 mb-4">BROWSE LOGS</h3>
                <div className="text-left bg-white/50 border-4 border-black p-4">
                  {renderTree(MOCK_LOGS)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Flush */}
      <div className="h-12 border-t-4 border-black bg-black text-white px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="shadows text-lg uppercase tracking-widest">System Healthy</span>
          </div>
          <span className="shadows text-lg text-gray-500 uppercase tracking-widest hidden md:inline">Xavier Core v2.5</span>
        </div>
        <div className="flex items-center gap-4">
          <Clock size={16} className="text-gray-500" />
          <span className="marker text-xl">05:00:44 AM</span>
        </div>
      </div>
    </div>
  );
};

export default LogsView;
