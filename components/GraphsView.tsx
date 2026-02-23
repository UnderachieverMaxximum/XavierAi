import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  Plus, Maximize2, Trash2, Zap
} from 'lucide-react';
import { motion } from 'motion/react';

const MOCK_DATA = [
  { name: 'Jan', value: 400, files: 2400, logs: 2400 },
  { name: 'Feb', value: 300, files: 1398, logs: 2210 },
  { name: 'Mar', value: 200, files: 9800, logs: 2290 },
  { name: 'Apr', value: 278, files: 3908, logs: 2000 },
  { name: 'May', value: 189, files: 4800, logs: 2181 },
  { name: 'Jun', value: 239, files: 3800, logs: 2500 },
  { name: 'Jul', value: 349, files: 4300, logs: 2100 },
];

const GraphsView: React.FC = () => {
  const [graphs, setGraphs] = useState([
    { id: 'storage', type: 'area', title: 'Storage Growth', x: 100, y: 100 },
    { id: 'activity', type: 'line', title: 'System Activity', x: 800, y: 400 },
  ]);

  const addGraph = () => {
    const newId = `graph-${graphs.length + 1}`;
    setGraphs([...graphs, { 
      id: newId, 
      type: 'bar', 
      title: `New Insight ${graphs.length + 1}`,
      x: Math.random() * 1000,
      y: Math.random() * 1000
    }]);
  };

  return (
    <div className="flex flex-col h-full bg-[#121212] overflow-hidden relative">
      {/* HUD Overlay - Flush */}
      <div className="absolute top-0 left-0 w-full p-8 flex items-start justify-between z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="marker text-7xl text-white mb-2 drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">PLAYGROUND</h1>
          <p className="shadows text-3xl text-red-500 italic drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">"Infinite insights, drawn by Xavier."</p>
        </div>
        <button 
          onClick={addGraph}
          className="marker-btn flex items-center gap-2 px-8 py-3 text-2xl pointer-events-auto bg-red-600 text-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <Plus size={28} />
          NEW GRAPH
        </button>
      </div>

      {/* Infinite Space - Flush */}
      <div className="flex-1 overflow-auto custom-scrollbar bg-[radial-gradient(#222_1px,transparent_1px)] bg-[length:40px_40px]">
        <div className="relative min-w-[3000px] min-h-[3000px]">
          {graphs.map((graph, i) => (
            <motion.div 
              key={graph.id}
              drag
              dragMomentum={false}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ left: graph.x, top: graph.y }}
              className="absolute w-[600px] bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 group cursor-move"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="marker text-4xl text-gray-800">{graph.title}</h2>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-black/5 border-2 border-black"><Maximize2 size={20} /></button>
                  <button className="p-2 hover:bg-black/5 border-2 border-black text-red-600"><Trash2 size={20} /></button>
                </div>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {graph.type === 'area' ? (
                    <AreaChart data={MOCK_DATA}>
                      <defs>
                        <linearGradient id={`grad-${graph.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip contentStyle={{border: '4px solid black', fontFamily: 'Architects Daughter'}} />
                      <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={4} fillOpacity={1} fill={`url(#grad-${graph.id})`} />
                    </AreaChart>
                  ) : graph.type === 'line' ? (
                    <LineChart data={MOCK_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip contentStyle={{border: '4px solid black', fontFamily: 'Architects Daughter'}} />
                      <Line type="monotone" dataKey="logs" stroke="#3b82f6" strokeWidth={4} dot={{r: 4, fill: '#3b82f6'}} />
                    </LineChart>
                  ) : (
                    <BarChart data={MOCK_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip contentStyle={{border: '4px solid black', fontFamily: 'Architects Daughter'}} />
                      <Bar dataKey="files" fill="#10b981" stroke="#000" strokeWidth={2} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-red-600 border-2 border-black rounded-full flex items-center justify-center text-white">
                  <Zap size={20} />
                </div>
                <p className="hand-drawn text-xl text-gray-600 italic">
                  "Analyzing pattern {graph.id}..."
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Scribbles - Flush */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <p className="marker text-[20rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12">XAVIER</p>
      </div>
    </div>
  );
};

export default GraphsView;
