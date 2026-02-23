import React, { useState } from 'react';
import { 
  ShieldAlert, Activity, Lock, Eye, 
  Cpu, Zap, AlertCircle, ShieldCheck, 
  Fingerprint, RefreshCw, Trash2, Shield
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  ResponsiveContainer, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';

const MOCK_SECURITY_DATA = [
  { name: '00:00', threats: 2, activity: 40 },
  { name: '04:00', threats: 1, activity: 30 },
  { name: '08:00', threats: 5, activity: 80 },
  { name: '12:00', threats: 3, activity: 60 },
  { name: '16:00', threats: 8, activity: 95 },
  { name: '20:00', threats: 4, activity: 70 },
  { name: '23:59', threats: 2, activity: 50 },
];

const SecurityView: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#f4f1ea] paper-texture overflow-hidden">
      {/* Header - Flush */}
      <div className="p-6 border-b-4 border-black bg-white/50">
        <h1 className="marker text-6xl text-gray-800 leading-none">SECURITY HUB</h1>
        <p className="shadows text-2xl text-red-600 italic">"Xavier's shield is always active."</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        {/* Quick Stats - Side by Side Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Threats', val: 'ZERO', icon: ShieldCheck, color: 'text-green-600' },
            { label: 'Vigilance', val: 'MAX', icon: Eye, color: 'text-red-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
              <stat.icon size={32} className={stat.color} />
              <div>
                <p className="shadows text-lg text-gray-400 leading-none">{stat.label}</p>
                <p className="marker text-3xl text-gray-800 leading-none">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Security Graphs - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="marker text-2xl mb-4 flex items-center gap-2">
              <ShieldAlert size={20} className="text-red-600" />
              THREAT VECTORS
            </h3>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_SECURITY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip contentStyle={{border: '2px solid black', fontFamily: 'Architects Daughter'}} />
                  <Area type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={3} fill="#fee2e2" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="marker text-2xl mb-4 flex items-center gap-2">
              <Activity size={20} className="text-blue-600" />
              NEURAL ACTIVITY
            </h3>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_SECURITY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip contentStyle={{border: '2px solid black', fontFamily: 'Architects Daughter'}} />
                  <Area type="monotone" dataKey="activity" stroke="#3b82f6" strokeWidth={3} fill="#dbeafe" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Defense Tools - Condensed Side by Side */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-4 bg-white border-4 border-black hover:bg-red-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
            <Shield size={24} className="text-red-600" />
            <span className="marker text-xl">DEEP SCAN</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-white border-4 border-black hover:bg-blue-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
            <Lock size={24} className="text-blue-600" />
            <span className="marker text-xl">ENCRYPT</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-white border-4 border-black hover:bg-green-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
            <RefreshCw size={24} className="text-green-600" />
            <span className="marker text-xl">REPAIR</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-red-600 text-white border-4 border-black hover:bg-red-700 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
            <Zap size={24} />
            <span className="marker text-xl uppercase">Optimize</span>
          </button>
        </div>

        {/* Xavier's Security Note - Styled like launch screen */}
        <section className="bg-black text-white p-6 border-4 border-black relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="flex items-center gap-3 mb-4">
            <BotIcon className="text-red-500" size={28} />
            <h2 className="marker text-3xl">XAVIER'S LOG</h2>
          </div>
          <p className="hand-drawn text-2xl italic leading-tight mb-6">
            "I've blocked 3 unauthorized access attempts today. Your digital perimeter is secure. I recommend a full purge of temporary cache files."
          </p>
          <button className="w-full marker-btn bg-white text-black hover:bg-gray-200 py-3 text-2xl border-2 border-black">
            EXECUTE PURGE
          </button>
        </section>

        {/* App Activity - Condensed */}
        <section>
          <h2 className="marker text-3xl text-gray-700 mb-4">RECENT EVENTS</h2>
          <div className="space-y-2">
            {[
              { app: 'System', action: 'Memory Check', status: 'Secure' },
              { app: 'Network', action: 'Packet Filter', status: 'Active' },
            ].map((act, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3">
                  <Fingerprint size={18} className="text-gray-400" />
                  <div>
                    <p className="marker text-lg leading-none">{act.app}</p>
                    <p className="shadows text-sm text-gray-500 leading-none">{act.action}</p>
                  </div>
                </div>
                <span className="marker text-sm text-green-600">{act.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const BotIcon = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    className={className} 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

export default SecurityView;
