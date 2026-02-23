import React, { useState } from 'react';
import { 
  Search, Grid, List, 
  Image as ImageIcon, Video, Music, FileText, 
  Package, Download, Trash2, Share2, Star,
  MoreVertical, Folder, Info, Edit3, Copy, ChevronDown, ChevronRight, HardDrive, Disc
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FileItem } from '../types';

const MOCK_FILES: FileItem[] = [
  { id: '1', name: 'IMG_2024_PARIS.jpg', size: '4.2 MB', type: 'image', modifiedDate: '2 hours ago', path: '/DCIM/Camera' },
  { id: '2', name: 'Project_Proposal_v2.pdf', size: '1.8 MB', type: 'document', modifiedDate: 'Yesterday', path: '/Documents' },
  { id: '3', name: 'Morning_Jazz.mp3', size: '8.5 MB', type: 'audio', modifiedDate: '3 days ago', path: '/Music' },
  { id: '4', name: 'VLOG_Summer_24.mp4', size: '450 MB', type: 'video', modifiedDate: 'Last week', path: '/Movies' },
  { id: '5', name: 'whatsapp_backup.zip', size: '1.2 GB', type: 'zip', modifiedDate: '1 month ago', path: '/Downloads' },
  { id: '6', name: 'Google_Photos_Clone.apk', size: '25 MB', type: 'apk', modifiedDate: '2 months ago', path: '/Downloads' },
];

const ExplorerView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

  const renderFileIcon = (type: FileItem['type']) => {
    switch(type) {
      case 'image': return <ImageIcon className="text-blue-600" />;
      case 'video': return <Video className="text-red-600" />;
      case 'audio': return <Music className="text-purple-600" />;
      case 'document': return <FileText className="text-yellow-600" />;
      case 'apk': return <Package className="text-green-600" />;
      default: return <Download className="text-gray-600" />;
    }
  };

  const handleTouchStart = (file: FileItem) => {
    const timer = setTimeout(() => {
      setSelectedFile(file);
    }, 600);
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) clearTimeout(longPressTimer);
  };

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] text-white font-sans overflow-hidden">
      {/* Top Ribbon - Flush */}
      <div className="bg-[#2d2d2d] border-b border-black flex flex-col">
        <div className="flex items-center px-4 py-1 gap-4 text-sm">
          <button className="px-4 py-1 bg-blue-600 hover:bg-blue-700 transition-colors">File</button>
          <button className="px-4 py-1 hover:bg-white/10 transition-colors">Computer</button>
          <button className="px-4 py-1 hover:bg-white/10 transition-colors">View</button>
        </div>
        <div className="bg-[#3d3d3d] p-2 flex items-center gap-4 border-t border-white/5">
          <div className="flex gap-1">
            <button className="p-2 hover:bg-white/10 transition-colors rounded"><ImageIcon size={20} /></button>
            <button className="p-2 hover:bg-white/10 transition-colors rounded"><List size={20} /></button>
            <button className="p-2 hover:bg-white/10 transition-colors rounded"><Grid size={20} /></button>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex-1 flex items-center gap-2 bg-[#1a1a1a] border border-white/10 px-3 py-1">
            <Folder size={16} className="text-gray-400" />
            <span className="text-sm text-gray-300">This PC</span>
            <ChevronRight size={14} className="text-gray-500" />
          </div>
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="Search This PC" 
              className="w-full bg-[#1a1a1a] border border-white/10 px-8 py-1 text-sm outline-none focus:border-blue-500 transition-all"
            />
            <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Pane - Flush */}
        <div className="w-64 bg-[#1a1a1a] border-r border-black overflow-y-auto custom-scrollbar p-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-2 py-1 text-blue-400">
              <Star size={16} />
              <span className="text-sm font-semibold">Quick access</span>
            </div>
            {['Desktop', 'Downloads', 'Documents', 'Pictures'].map(item => (
              <div key={item} className="flex items-center gap-2 px-6 py-1 hover:bg-blue-600/20 cursor-pointer text-sm">
                <Folder size={16} className="text-blue-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-1">
            <div className="flex items-center gap-2 px-2 py-1 text-gray-400">
              <ChevronDown size={16} />
              <HardDrive size={16} />
              <span className="text-sm font-semibold">This PC</span>
            </div>
            {['3D Objects', 'Desktop', 'Documents', 'Downloads', 'Music', 'Pictures', 'Videos'].map(item => (
              <div key={item} className="flex items-center gap-2 px-8 py-1 hover:bg-blue-600/20 cursor-pointer text-sm">
                <Folder size={16} className="text-yellow-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area - Flush */}
        <div className="flex-1 overflow-y-auto bg-[#1a1a1a] p-6 custom-scrollbar">
          {/* Folders Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
              <ChevronDown size={16} className="text-gray-500" />
              <span className="text-sm font-semibold text-gray-300">Folders (7)</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {['3D Objects', 'Desktop', 'Documents', 'Downloads', 'Music', 'Pictures', 'Videos'].map(folder => (
                <div key={folder} className="flex items-center gap-4 p-2 hover:bg-blue-600/20 cursor-pointer group">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Folder size={48} className="text-yellow-500 fill-yellow-500/20" />
                  </div>
                  <span className="text-sm truncate">{folder}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Devices and Drives Section */}
          <div>
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4">
              <ChevronDown size={16} className="text-gray-500" />
              <span className="text-sm font-semibold text-gray-300">Devices and drives (4)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Home (C:)', used: '212 GB', total: '475 GB', icon: HardDrive },
                { name: 'BD-RE Drive (H:)', used: '0 GB', total: '0 GB', icon: Disc },
                { name: 'Data (Q:)', used: '130 GB', total: '931 GB', icon: HardDrive },
                { name: 'Backup (X:)', used: '125 GB', total: '372 GB', icon: HardDrive },
              ].map(drive => (
                <div key={drive.name} className="flex items-center gap-4 p-2 hover:bg-blue-600/20 cursor-pointer group">
                  <drive.icon size={48} className="text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{drive.name}</p>
                    <div className="h-3 bg-gray-700 border border-gray-600 mt-1 relative">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${(parseInt(drive.used) / parseInt(drive.total) * 100) || 0}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{drive.used} free of {drive.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Options Panel Overlay */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-x-0 bottom-0 z-[100] p-6"
          >
            <div className="bg-[#2d2d2d] border-t-4 border-blue-600 shadow-2xl p-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center">
                    {renderFileIcon(selectedFile.type)}
                  </div>
                  <div>
                    <h2 className="marker text-3xl text-white">{selectedFile.name}</h2>
                    <p className="shadows text-xl text-gray-400">{selectedFile.size} • {selectedFile.path}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedFile(null)} className="marker text-2xl hover:text-red-600 transition-colors">CLOSE</button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Info, label: 'DETAILS', color: 'text-gray-400' },
                  { icon: Edit3, label: 'RENAME', color: 'text-blue-400' },
                  { icon: Copy, label: 'DUPLICATE', color: 'text-purple-400' },
                  { icon: Trash2, label: 'DELETE', color: 'text-red-400' },
                ].map((opt, i) => (
                  <button key={i} className="flex flex-col items-center gap-2 p-6 border border-white/10 hover:bg-white/5 transition-all">
                    <opt.icon size={32} className={opt.color} />
                    <span className="marker text-xl">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Bar - Flush */}
      <div className="bg-[#2d2d2d] border-t border-black px-4 py-1 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span>11 items</span>
          <div className="h-3 w-px bg-white/10" />
          <span className="text-blue-400">Xavier Security Active</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:text-white transition-colors"><Grid size={14} /></button>
          <button className="hover:text-white transition-colors"><List size={14} /></button>
        </div>
      </div>
    </div>
  );
};

export default ExplorerView;
