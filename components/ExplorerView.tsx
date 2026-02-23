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

import React, { useState } from 'react';
import { 
  Search, Grid, List, 
  Image as ImageIcon, Video, Music, FileText, 
  Package, Download, Trash2, Share2, Star,
  MoreVertical, Folder, Info, Edit3, Copy, ChevronDown, ChevronRight, HardDrive, Disc,
  ChevronLeft, Check
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleItemClick = (id: string) => {
    setSelectedId(id);
  };

  const handleLongPress = (id: string) => {
    setSelectedId(id);
    setShowOptions(true);
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f1ea] paper-texture overflow-hidden">
      {/* Ribbon Menu - Flush */}
      <div className="flex items-center gap-6 px-6 py-2 bg-white/50 border-b-4 border-black overflow-x-auto no-scrollbar">
        {['File', 'Computer', 'View', 'Manage', 'Xavier'].map((menu) => (
          <button key={menu} className="marker text-xl text-gray-800 hover:text-red-600 transition-colors whitespace-nowrap">
            {menu}
          </button>
        ))}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Pane - Flush Sidebar */}
        <div className="w-1/3 border-r-4 border-black bg-white/30 overflow-y-auto custom-scrollbar hidden sm:block">
          <div className="p-4 space-y-6">
            <div>
              <h3 className="marker text-2xl text-red-600 mb-3 flex items-center gap-2">
                <Star size={18} />
                QUICK ACCESS
              </h3>
              <div className="space-y-1">
                {['Desktop', 'Downloads', 'Documents', 'Pictures'].map(item => (
                  <button key={item} className="w-full text-left p-2 marker text-xl hover:bg-red-600 hover:text-white transition-all flex items-center gap-2">
                    <Folder size={18} className="text-yellow-600" />
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="marker text-2xl text-gray-800 mb-3 flex items-center gap-2">
                <HardDrive size={18} />
                THIS DEVICE
              </h3>
              <div className="space-y-1">
                {['Local Disk (C:)', 'Xavier Drive (X:)'].map(item => (
                  <button key={item} className="w-full text-left p-2 marker text-xl hover:bg-black hover:text-white transition-all flex items-center gap-2">
                    <Disc size={18} className="text-blue-600" />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Flush Grid */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Address Bar */}
          <div className="p-4 border-b-4 border-black bg-white/50 flex items-center gap-4">
            <div className="flex gap-2">
              <button className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"><ChevronLeft size={20} /></button>
              <button className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"><ChevronRight size={20} /></button>
            </div>
            <div className="flex-1 bg-white border-4 border-black px-4 py-1 flex items-center gap-3">
              <HardDrive size={18} className="text-gray-400" />
              <span className="marker text-xl text-gray-800">This PC &gt; Local Disk (C:)</span>
            </div>
            <div className="relative w-48 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search files..." 
                className="w-full bg-white border-4 border-black pl-10 pr-4 py-1 marker text-xl outline-none"
              />
            </div>
          </div>

          {/* Files Grid */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[radial-gradient(#00000011_1px,transparent_1px)] bg-[length:20px_20px]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {MOCK_FILES.map((file) => (
                <motion.button
                  key={file.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleItemClick(file.id)}
                  onContextMenu={(e) => { e.preventDefault(); handleLongPress(file.id); }}
                  className={`flex flex-col items-center p-4 border-4 transition-all group relative ${
                    selectedId === file.id 
                      ? 'bg-red-600 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                      : 'border-transparent hover:border-black/20'
                  }`}
                >
                  <div className={`mb-3 transition-transform group-hover:scale-110 ${selectedId === file.id ? 'text-white' : 'text-yellow-600'}`}>
                    <Folder size={64} fill="currentColor" fillOpacity={0.2} />
                  </div>
                  <span className={`marker text-xl text-center break-all leading-tight ${selectedId === file.id ? 'text-white' : 'text-gray-800'}`}>
                    {file.name}
                  </span>
                  {selectedId === file.id && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center border-2 border-white">
                      <Check size={12} />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Status Bar - Flush */}
          <div className="h-10 border-t-4 border-black bg-white/80 px-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-6">
              <span className="shadows text-lg text-gray-500 uppercase tracking-widest">{MOCK_FILES.length} ITEMS</span>
              <span className="shadows text-lg text-gray-500 uppercase tracking-widest">1 ITEM SELECTED</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-1 hover:bg-black/5"><Grid size={18} /></button>
              <button className="p-1 hover:bg-black/5"><List size={18} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Options Panel Overlay */}
      <AnimatePresence>
        {showOptions && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOptions(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-[#f4f1ea] paper-texture border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-red-600 border-4 border-black flex items-center justify-center text-white">
                  <Folder size={32} />
                </div>
                <div>
                  <h2 className="marker text-3xl text-gray-800 leading-none">FILE OPTIONS</h2>
                  <p className="shadows text-xl text-gray-400">Manage selected asset</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Details', icon: Info, color: 'hover:bg-blue-50' },
                  { label: 'Rename', icon: Edit3, color: 'hover:bg-yellow-50' },
                  { label: 'Duplicate', icon: Copy, color: 'hover:bg-green-50' },
                  { label: 'Delete', icon: Trash2, color: 'hover:bg-red-50 text-red-600' },
                ].map((opt) => (
                  <button 
                    key={opt.label}
                    className={`flex flex-col items-center gap-2 p-4 border-4 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 bg-white ${opt.color}`}
                  >
                    <opt.icon size={24} />
                    <span className="marker text-xl">{opt.label}</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setShowOptions(false)}
                className="w-full mt-8 py-3 border-4 border-black marker text-2xl hover:bg-black hover:text-white transition-all"
              >
                CLOSE
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExplorerView;
