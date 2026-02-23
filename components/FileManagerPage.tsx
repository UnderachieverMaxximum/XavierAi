
import React, { useState } from 'react';
import { Menu, Bot, ArrowLeft } from 'lucide-react';
import { FileManagerView } from '../types';
import Sidebar from './Sidebar';
import ExplorerView from './ExplorerView';
import SettingsView from './SettingsView';
import GraphsView from './GraphsView';
import SecurityView from './SecurityView';
import ChatView from './ChatView';
import OptimizeView from './OptimizeView';
import LogsView from './LogsView';
import MonitorView from './MonitorView';
import AssistantOverlay from './AssistantOverlay';

interface FileManagerPageProps {
  onBack: () => void;
}

const FileManagerPage: React.FC<FileManagerPageProps> = ({ onBack }) => {
  const [currentView, setCurrentView] = useState<FileManagerView>(FileManagerView.EXPLORER);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showXavier, setShowXavier] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case FileManagerView.EXPLORER: return <ExplorerView />;
      case FileManagerView.SETTINGS: return <SettingsView />;
      case FileManagerView.GRAPHS: return <GraphsView />;
      case FileManagerView.SECURITY: return <SecurityView />;
      case FileManagerView.CHAT: return <ChatView />;
      case FileManagerView.OPTIMIZE: return <OptimizeView />;
      case FileManagerView.LOGS: return <LogsView />;
      case FileManagerView.MONITOR: return <MonitorView />;
      default: return <ExplorerView />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-white overflow-hidden relative">
      {/* Multi-window Protection Cue */}
      <div className="absolute inset-0 pointer-events-none z-[100] border-4 border-red-600/20 opacity-50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[101] bg-red-600 text-white px-4 py-0.5 rounded-b-lg text-[10px] marker tracking-widest opacity-40">
        SECURE VIEW ACTIVE • MULTI-WINDOW BLOCKED
      </div>

      {/* Top Navigation Bar - Flush & Minimal */}
      <header className="px-4 py-3 flex items-center justify-between border-b border-white/10 bg-black/60 backdrop-blur-xl z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-white/10 rounded-full transition-all"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex flex-col">
            <h1 className="marker text-2xl leading-none tracking-tight">XAVIER OS</h1>
            <span className="shadows text-xs text-gray-500 leading-none uppercase tracking-widest">v2.5.0 • SECURE</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowXavier(true)}
            className="p-2 hover:bg-red-600/20 text-red-500 rounded-full transition-all"
          >
            <Bot size={24} />
          </button>
          
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/10 text-gray-400 rounded-full transition-all"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
      </header>

      {/* Main Viewport - Flush */}
      <main className="flex-1 overflow-hidden relative">
        {renderView()}
      </main>

      {/* Sidebar Menu Overlay */}
      {isSidebarOpen && (
        <Sidebar 
          currentView={currentView}
          onViewChange={setCurrentView}
          onClose={() => setIsSidebarOpen(false)}
          onBackToLanding={onBack}
        />
      )}

      {/* Xavier Assistant Overlay */}
      {showXavier && <AssistantOverlay onClose={() => setShowXavier(false)} />}
    </div>
  );
};

export default FileManagerPage;
