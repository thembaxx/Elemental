import React, { useState, useMemo } from 'react';
import { ElementData, PERIODIC_ELEMENTS } from '../data/elements';
import { X, Search, Sparkles, ChevronRight } from 'lucide-react';

interface PeriodicDrawerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectElement: (element: ElementData) => void;
  selectedElement: ElementData;
}

const CATEGORIES = [
  'All',
  'Nonmetal',
  'Noble Gas',
  'Alkali Metal',
  'Alkaline Earth',
  'Metalloid',
  'Halogen',
  'Transition Metal',
  'Post-Transition Metal',
] as const;

export function PeriodicDrawerSheet({
  isOpen,
  onClose,
  onSelectElement,
  selectedElement,
}: PeriodicDrawerSheetProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredElements = useMemo(() => {
    return PERIODIC_ELEMENTS.filter((elem) => {
      const matchesSearch =
        elem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem.number.toString().includes(searchQuery);

      const matchesCategory =
        activeCategory === 'All' || elem.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/75 backdrop-blur-md">
      {/* Backdrop Dismiss Area */}
      <div className="flex-1 w-full" onClick={onClose} />

      {/* Sheet Modal Container */}
      <div className="w-full max-h-[85vh] bg-[#0c1328] border-t border-white/20 rounded-t-[36px] flex flex-col shadow-2xl overflow-hidden text-white">
        {/* Tactile Drag Handle Pill */}
        <div className="w-full flex justify-center py-3 cursor-pointer" onClick={onClose}>
          <div className="w-12 h-1.5 bg-white/30 rounded-full hover:bg-white/50 transition-colors" />
        </div>

        {/* Sheet Header */}
        <div className="px-6 pb-4 flex items-center justify-between border-b border-white/10 bg-[#0c1328]">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles size={20} className="text-sky-400" /> Periodic Matrix • 118
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">Select any chemical element to inspect in 3D</p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Controls: Search Input + Category Chips */}
        <div className="p-6 pb-3 space-y-3 bg-[#111a36]">
          {/* Search Bar */}
          <div className="relative w-full">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, symbol, or atomic number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#1b264f] border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-sky-500/30 border-sky-400 text-sky-200 shadow-sm shadow-sky-500/30'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Element Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 bg-[#0c1328]">
          {filteredElements.map((elem) => {
            const isSelected = elem.number === selectedElement.number;
            return (
              <button
                key={elem.number}
                onClick={() => {
                  onSelectElement(elem);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                  isSelected
                    ? 'bg-sky-500/30 border-sky-400 shadow-xl shadow-sky-500/30 scale-[1.02]'
                    : 'bg-[#162044] hover:bg-[#1e2a57] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Glow Backdrop Accent */}
                <div
                  className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full blur-xl opacity-30 pointer-events-none"
                  style={{ backgroundColor: elem.glowColor.primary }}
                />

                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-mono text-slate-400 font-bold">{elem.number}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10 text-slate-200">
                    {elem.state}
                  </span>
                </div>

                <div className="my-1.5">
                  <span className="text-xl font-black text-white group-hover:scale-105 transition-transform inline-block">
                    {elem.symbol}
                  </span>
                  <p className="text-xs font-semibold text-slate-200 truncate">{elem.name}</p>
                </div>

                <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                  <span>{elem.atomicMass} u</span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: elem.glowColor.primary }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Floating Quick Inspector Bar */}
        <div className="p-4 bg-[#090e1f] border-t border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white border"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderColor: selectedElement.glowColor.border,
              }}
            >
              {selectedElement.symbol}
            </div>
            <div>
              <p className="text-xs font-bold text-white">{selectedElement.name} (Z={selectedElement.number})</p>
              <p className="text-[10px] text-slate-400">Config: {selectedElement.electronConfig}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-full shadow-lg shadow-sky-500/25 hover:scale-105 transition-transform"
          >
            <span>Inspect 3D Orbital</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
