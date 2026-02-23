import React, { useState } from 'react';
import { 
  Shield, Cpu, HardDrive, Bell, 
  Eye, Globe, Lock, Sliders,
  ChevronRight, Save, RotateCcw,
  Smartphone, Zap, Database, User,
  Moon, Sun, Volume2, Wifi,
  Bluetooth, Fingerprint, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('system');

  const sections = [
    { id: 'system', label: 'SYSTEM CORE', icon: Cpu, color: 'text-red-600' },
    { id: 'security', label: 'SECURITY & PRIVACY', icon: Shield, color: 'text-blue-600' },
    { id: 'display', label: 'VISUALS & UI', icon: Eye, color: 'text-purple-600' },
    { id: 'storage', label: 'DATA & STORAGE', icon: HardDrive, color: 'text-emerald-600' },
    { id: 'network', label: 'CONNECTIVITY', icon: Globe, color: 'text-orange-600' },
    { id: 'advanced', label: 'XAVIER LABS', icon: Zap, color: 'text-yellow-600' },
  ];

  const renderSettingItem = (title: string, desc: string, control: React.ReactNode) => (
    <div className="flex items-center justify-between p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
      <div className="flex-1 pr-4">
        <h3 className="marker text-2xl text-gray-800 leading-tight">{title}</h3>
        <p className="shadows text-lg text-gray-500 italic">{desc}</p>
      </div>
      <div className="flex-shrink-0">
        {control}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#f4f1ea] paper-texture overflow-hidden">
      {/* Header - Flush */}
      <div className="p-6 border-b-4 border-black bg-white/50 flex items-center justify-between">
        <div>
          <h1 className="marker text-6xl text-gray-800 leading-none">SYSTEM SETTINGS</h1>
          <p className="shadows text-2xl text-gray-500 italic">"Calibrating the machine's soul."</p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 border-4 border-black bg-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
            <RotateCcw size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Navigation - Scrollable on mobile, sidebar on desktop */}
        <div className="w-full md:w-80 border-b-4 md:border-b-0 md:border-r-4 border-black bg-white/30 overflow-x-auto md:overflow-y-auto custom-scrollbar flex md:flex-col p-4 gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex-shrink-0 md:flex-shrink-1 flex items-center gap-4 p-4 border-4 transition-all whitespace-nowrap ${
                activeTab === section.id
                  ? 'bg-red-600 text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-gray-800 border-black hover:bg-black hover:text-white'
              }`}
            >
              <section.icon size={24} className={activeTab === section.id ? 'text-white' : section.color} />
              <span className="marker text-2xl tracking-tight">{section.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              {activeTab === 'system' && (
                <div className="space-y-6">
                  <h2 className="marker text-4xl text-red-600 mb-8 flex items-center gap-3">
                    <Cpu size={32} /> CORE PARAMETERS
                  </h2>
                  {renderSettingItem(
                    "XAVIER RESPONSE LATENCY",
                    "Adjust the speed of AI thought processing",
                    <input type="range" className="accent-red-600 w-32 md:w-48" />
                  )}
                  {renderSettingItem(
                    "AUTO-INDEXING",
                    "Real-time file system monitoring",
                    <div className="w-14 h-8 bg-red-600 border-2 border-black relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white border-2 border-black"></div>
                    </div>
                  )}
                  {renderSettingItem(
                    "MEMORY RESERVATION",
                    "Dedicated RAM for Xavier's neural net",
                    <select className="bg-white border-4 border-black p-2 marker text-xl outline-none">
                      <option>512MB</option>
                      <option selected>1GB</option>
                      <option>2GB</option>
                    </select>
                  )}
                  {renderSettingItem(
                    "BACKGROUND OPTIMIZATION",
                    "Allow Xavier to manage idle tasks",
                    <div className="w-14 h-8 bg-black border-2 border-black relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white border-2 border-black"></div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="marker text-4xl text-blue-600 mb-8 flex items-center gap-3">
                    <Shield size={32} /> DEFENSE PROTOCOLS
                  </h2>
                  {renderSettingItem(
                    "NEURAL ENCRYPTION",
                    "AES-256 bit ink-flow protection",
                    <div className="w-14 h-8 bg-red-600 border-2 border-black relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white border-2 border-black"></div>
                    </div>
                  )}
                  {renderSettingItem(
                    "THREAT SCAN FREQUENCY",
                    "How often Xavier checks for intruders",
                    <select className="bg-white border-4 border-black p-2 marker text-xl outline-none">
                      <option>REAL-TIME</option>
                      <option>HOURLY</option>
                      <option>DAILY</option>
                    </select>
                  )}
                  {renderSettingItem(
                    "BIOMETRIC OVERRIDE",
                    "Require fingerprint for system exit",
                    <div className="w-14 h-8 bg-black border-2 border-black relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white border-2 border-black"></div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'display' && (
                <div className="space-y-6">
                  <h2 className="marker text-4xl text-purple-600 mb-8 flex items-center gap-3">
                    <Eye size={32} /> UI CALIBRATION
                  </h2>
                  {renderSettingItem(
                    "PAPER TEXTURE INTENSITY",
                    "Adjust the grain of the interface",
                    <input type="range" className="accent-red-600 w-32 md:w-48" />
                  )}
                  {renderSettingItem(
                    "MESSY LINING STYLE",
                    "Toggle the hand-drawn border aesthetic",
                    <div className="w-14 h-8 bg-red-600 border-2 border-black relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white border-2 border-black"></div>
                    </div>
                  )}
                  {renderSettingItem(
                    "DARK MODE (INK SAVER)",
                    "Invert colors for night operations",
                    <div className="w-14 h-8 bg-black border-2 border-black relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white border-2 border-black"></div>
                    </div>
                  )}
                </div>
              )}

              {/* Other tabs follow same pattern... */}
              {['storage', 'network', 'advanced'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                  <RefreshCw size={80} className="mb-6 animate-spin-slow" />
                  <h2 className="marker text-5xl text-gray-800 mb-4">MODULE SYNCING</h2>
                  <p className="shadows text-3xl text-gray-500 italic max-w-md">
                    "Xavier is currently indexing these parameters. Please check back after the next system pulse."
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Action Bar - Flush */}
      <div className="p-6 border-t-4 border-black bg-white/50 flex items-center justify-end gap-4">
        <button className="flex items-center gap-3 px-8 py-3 border-4 border-black marker text-2xl hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
          <RotateCcw size={24} /> RESET
        </button>
        <button className="flex items-center gap-3 px-8 py-3 bg-red-600 text-white border-4 border-black marker text-2xl hover:bg-red-700 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
          <Save size={24} /> APPLY CHANGES
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
