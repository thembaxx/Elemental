import React from 'react';
import { Compass, Layers, Search, Settings, Grid, Award, Activity } from 'lucide-react';

interface TopNavProps {
  activeTab: 'inspect' | 'matrix' | 'heatmaps' | 'quiz';
  setActiveTab: (tab: 'inspect' | 'matrix' | 'heatmaps' | 'quiz') => void;
  onOpenDrawer: () => void;
}

export function TopNav({ activeTab, setActiveTab, onOpenDrawer }: TopNavProps) {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-full my-2 shadow-2xl">
      {/* Brand & Symbol */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center border border-white/20 shadow-lg shadow-sky-500/30">
          <Compass size={22} className="text-white animate-spin-slow" />
        </div>
        <div>
          <h1 className="text-base font-bold text-white tracking-wider font-sans leading-none">
            AETHER <span className="text-sky-400 font-light">ELEMENT</span>
          </h1>
          <p className="text-[10px] text-slate-400 tracking-widest uppercase mt-0.5">Quantum Celestial Edition</p>
        </div>
      </div>

      {/* Center Navigation Pills */}
      <nav className="flex items-center gap-1.5 bg-white/5 p-1 rounded-full border border-white/10">
        <button
          onClick={() => setActiveTab('inspect')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
            activeTab === 'inspect'
              ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25 border border-white/20'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Compass size={18} />
          <span className="hidden md:inline">Inspect 3D</span>
        </button>

        <button
          onClick={onOpenDrawer}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
            activeTab === 'matrix'
              ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25 border border-white/20'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Grid size={18} />
          <span className="hidden md:inline">Matrix 118</span>
        </button>

        <button
          onClick={() => setActiveTab('heatmaps')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
            activeTab === 'heatmaps'
              ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25 border border-white/20'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Activity size={18} />
          <span className="hidden md:inline">Heatmaps</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
            activeTab === 'quiz'
              ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25 border border-white/20'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Award size={18} />
          <span className="hidden md:inline">Quiz Lab</span>
        </button>
      </nav>

      {/* Action Icons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenDrawer}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all"
          title="Search Elements"
        >
          <Search size={20} />
        </button>
      </div>
    </header>
  );
}
