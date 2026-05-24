import React, { useState } from 'react';
import PipelineGen from './pages/PipelineGen';
import ErrorAnalyzer from './pages/ErrorAnalyzer';
import DockerGen from './pages/DockerGen';
import DevOpsChat from './pages/DevOpsChat';
import { Cpu, Terminal, Bug, Box, MessageSquare } from 'lucide-react';

function App() {
  const [tab, setTab] = useState('pipeline');

  const menu = [
    { id: 'pipeline', label: 'Pipeline', icon: <Terminal size={18}/>, color: 'indigo' },
    { id: 'docker', label: 'Docker', icon: <Box size={18}/>, color: 'blue' },
    { id: 'error', label: 'Error AI', icon: <Bug size={18}/>, color: 'red' },
    { id: 'chat', label: 'Assistant', icon: <MessageSquare size={18}/>, color: 'green' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Sidebar & Navbar Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 border-r border-slate-800 md:h-screen sticky top-0 bg-slate-950 p-4 space-y-8">
          <div className="flex items-center gap-2 px-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg"><Cpu size={24}/></div>
            <span className="text-xl font-black tracking-tighter">DEVFLOW AI</span>
          </div>

          <nav className="space-y-2 text-left">
            {menu.map((m) => (
              <button 
                key={m.id}
                onClick={() => setTab(m.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${tab === m.id ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' : 'text-slate-400 hover:bg-slate-900'}`}
              >
                {m.icon} {m.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-h-screen overflow-y-auto">
          <header className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50 backdrop-blur-md">
            <h2 className="font-bold text-slate-400 uppercase text-xs tracking-widest">Dashboard / {tab}</h2>
            <div className="text-xs bg-green-500/10 text-green-500 px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Gemini AI Online
            </div>
          </header>

          <div className="animate-in fade-in zoom-in duration-300">
            {tab === 'pipeline' && <PipelineGen />}
            {tab === 'docker' && <DockerGen />}
            {tab === 'error' && <ErrorAnalyzer />}
            {tab === 'chat' && <DevOpsChat />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;