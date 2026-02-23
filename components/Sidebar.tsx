import React from 'react';
import { 
  Settings, Folder, BarChart2, MessageSquare, 
  Zap, ScrollText, X, LogOut, ShieldCheck, Activity 
} from 'lucide-react';
import { FileManagerView } from '../types';

interface SidebarProps {
  currentView: FileManagerView;
  onViewChange: (view: FileManagerView) => void;
  onClose: () => void;
  onBackToLanding: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onViewChange, 
  onClose,
  onBackToLanding
}) => {
  const menuItems = [
    { id: FileManagerView.EXPLORER, label: 'File Manager', icon: Folder },
    { id: FileManagerView.SETTINGS, label: 'Settings', icon: Settings },
    { id: FileManagerView.GRAPHS, label: 'Graph Views', icon: BarChart2 },
    { id: FileManagerView.SECURITY, label: 'Security', icon: ShieldCheck },
    { id: FileManagerView.CHAT, label: 'Xavier Chat', icon: MessageSquare },
    { id: FileManagerView.LOGS, label: 'Log Center', icon: ScrollText },
    { id: FileManagerView.MONITOR, label: 'Monitor', icon: Activity },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Menu Content */}
      <div className="relative w-80 h-full bg-[#1a1a1a] border-r border-white/10 shadow-2xl flex flex-col p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col">
            <h2 className="marker text-4xl text-white">XAVIER</h2>
            <span className="shadows text-xs text-red-500 uppercase tracking-[0.2em]">System Navigation</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
            <X size={28} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                currentView === item.id 
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' 
                  : 'hover:bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <item.icon size={24} className={currentView === item.id ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
              <span className="marker text-xl tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <button 
            onClick={onBackToLanding}
            className="w-full flex items-center gap-4 p-4 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all group"
          >
            <LogOut size={24} className="group-hover:-translate-x-1 transition-transform" />
            <span className="marker text-xl">EXIT SYSTEM</span>
          </button>
          <div className="mt-4 flex flex-col items-center">
            <p className="shadows text-xs text-gray-600 uppercase tracking-widest">Xavier OS v2.5.0</p>
            <div className="w-1 h-1 bg-red-600 rounded-full mt-2 animate-ping"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
