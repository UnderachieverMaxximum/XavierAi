import React, { useState } from 'react';
import { 
  BarChart2, TrendingUp, PieChart, Activity, 
  Download, Share2, Maximize2, Save, 
  ChevronRight, ChevronLeft, Bot, Filter, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ResponsiveContainer, AreaChart, Area, 
  BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart as RePieChart, Pie
} from 'recharts';

const MOCK_GRAPH_DATA = [
  { name: 'Mon', val: 400, val2: 240 },
  { name: 'Tue', val: 300, val2: 139 },
  { name: 'Wed', val: 200, val2: 980 },
  { name: 'Thu', val: 278, val2: 390 },
  { name: 'Fri', val: 189, val2: 480 },
  { name: 'Sat', val: 239, val2: 380 },
  { name: 'Sun', val: 349, val2: 430 },
];

const PIE_DATA = [
  { name: 'System', value: 400 },
  { name: 'Apps', value: 300 },
  { name: 'Media', value: 300 },
  { name: 'Other', value: 200 },
];

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];

const GraphsView: React.FC = () => {
  const [selectedGraph, setSelectedGraph] = useState<number | null>(null);

  const graphs = [
    { id: 1, title: 'SYSTEM LOAD', type: 'area', color: '#ef4444', data: MOCK_GRAPH_DATA, key: 'val' },
    { id: 2, title: 'NETWORK TRAFFIC', type: 'line', color: '#3b82f6', data: MOCK_GRAPH_DATA, key: 'val2' },
    { id: 3, title: 'STORAGE ALLOCATION', type: 'pie', color: '#10b981', data: PIE_DATA, key: 'value' },
    { id: 4, title: 'APP PERFORMANCE', type: 'bar', color: '#f59e0b', data: MOCK_GRAPH_DATA, key: 'val' },
    { id: 5, title: 'SECURITY THREATS', type: 'area', color: '#ef4444', data: MOCK_GRAPH_DATA, key: 'val2' },
    { id: 6, title: 'BATTERY DRAIN', type: 'line', color: '#10b981', data: MOCK_GRAPH_DATA, key: 'val' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f4f1ea] paper-texture overflow-hidden">
      {/* Header - Flush */}
      <div className="p-6 border-b-4 border-black bg-white/50 flex items-center justify-between">
        <div>
          <h1 className="marker text-6xl text-gray-800 leading-none">GRAPH PLAYGROUND</h1>
          <p className="shadows text-2xl text-gray-500 italic">"Visualizing the digital pulse."</p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 border-4 border-black bg-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
            <Filter size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {/* Xavier's Insight Card */}
        <div className="mb-8 bg-black text-white p-6 border-4 border-black relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <Bot className="text-red-500" size={32} />
            <h2 className="marker text-3xl">XAVIER'S ANALYSIS</h2>
          </div>
          <p className="hand-drawn text-2xl italic leading-tight">
            "I've compiled these metrics from your last 24 hours of activity. Notice the spike in 'Neural Activity' around 4 PM—that was your deep work session. I've optimized background tasks to match your rhythm."
          </p>
        </div>

        {/* Graphs Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {graphs.map((graph) => (
            <motion.div
              key={graph.id}
              whileHover={{ y: -5 }}
              className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="marker text-2xl text-gray-800">{graph.title}</h3>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedGraph(graph.id)} className="p-1 hover:text-red-600"><Maximize2 size={18} /></button>
                  <button className="p-1 hover:text-blue-600"><Download size={18} /></button>
                </div>
              </div>

              <div className="h-48 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  {graph.type === 'area' ? (
                    <AreaChart data={graph.data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Area type="monotone" dataKey={graph.key} stroke={graph.color} strokeWidth={3} fill={`${graph.color}22`} />
                    </AreaChart>
                  ) : graph.type === 'line' ? (
                    <LineChart data={graph.data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Line type="monotone" dataKey={graph.key} stroke={graph.color} strokeWidth={3} dot={{ r: 4, fill: graph.color }} />
                    </LineChart>
                  ) : graph.type === 'bar' ? (
                    <BarChart data={graph.data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Bar dataKey={graph.key} fill={graph.color} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  ) : (
                    <RePieChart>
                      <Pie
                        data={graph.data}
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {graph.data.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  )}
                </ResponsiveContainer>
              </div>

              <div className="mt-auto pt-4 border-t-2 border-black/10 flex justify-between items-center">
                <span className="shadows text-lg text-gray-400 uppercase tracking-widest">Live Syncing...</span>
                <button className="marker text-xl text-red-600 hover:underline">DETAILS</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Graph Modal */}
      <AnimatePresence>
        {selectedGraph && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGraph(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-[#f4f1ea] paper-texture border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col h-[80vh]"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-600 border-4 border-black flex items-center justify-center text-white">
                    <TrendingUp size={32} />
                  </div>
                  <div>
                    <h2 className="marker text-4xl text-gray-800 leading-none">{graphs.find(g => g.id === selectedGraph)?.title}</h2>
                    <p className="shadows text-2xl text-gray-400 italic">Extended Analysis by Xavier</p>
                  </div>
                </div>
                <button onClick={() => setSelectedGraph(null)} className="marker text-3xl hover:text-red-600 transition-colors">CLOSE</button>
              </div>

              <div className="flex-1 bg-white border-4 border-black p-6 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_GRAPH_DATA}>
                    <CartesianGrid strokeDasharray="5 5" stroke="#ddd" />
                    <XAxis dataKey="name" stroke="#000" tick={{fontFamily: 'Architects Daughter'}} />
                    <YAxis stroke="#000" tick={{fontFamily: 'Architects Daughter'}} />
                    <Tooltip contentStyle={{border: '4px solid black', fontFamily: 'Architects Daughter'}} />
                    <Area type="monotone" dataKey="val" stroke="#ef4444" strokeWidth={4} fill="#ef444422" />
                    <Area type="monotone" dataKey="val2" stroke="#3b82f6" strokeWidth={4} fill="#3b82f622" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button className="flex items-center justify-center gap-3 p-4 border-4 border-black marker text-2xl hover:bg-black hover:text-white transition-all">
                  <Save size={24} /> SAVE
                </button>
                <button className="flex items-center justify-center gap-3 p-4 border-4 border-black marker text-2xl hover:bg-black hover:text-white transition-all">
                  <Share2 size={24} /> EXPORT
                </button>
                <button className="flex items-center justify-center gap-3 p-4 bg-red-600 text-white border-4 border-black marker text-2xl hover:bg-red-700 transition-all">
                  <Activity size={24} /> REFRESH
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GraphsView;
