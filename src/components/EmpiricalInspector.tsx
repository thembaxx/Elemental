import React from 'react';
import { ElementData } from '../data/elements';
import { Atom, Scale, Zap, Radio, Shield, Thermometer } from 'lucide-react';

interface EmpiricalInspectorProps {
  element: ElementData;
}

export function EmpiricalInspector({ element }: EmpiricalInspectorProps) {
  return (
    <div className="flex flex-col gap-4 p-5 text-slate-100">
      {/* Element Header Card */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-2xl relative overflow-hidden">
        <div
          className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-2xl opacity-30 pointer-events-none"
          style={{ backgroundColor: element.glowColor.primary }}
        />

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-slate-300">
              Z = {element.number}
            </span>
            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full border"
              style={{
                borderColor: element.glowColor.border,
                color: element.glowColor.primary,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              {element.category}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white mt-1">
            {element.name}
          </h2>
          <p className="text-xs text-slate-400 italic mt-0.5">{element.latinName}</p>
        </div>

        {/* Large Tactile 3D Symbol Pill */}
        <div
          className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center border shadow-xl transition-transform duration-300 hover:scale-105"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), ${element.glowColor.primary} 60%, rgba(15, 23, 42, 0.9))`,
            borderColor: element.glowColor.border,
            boxShadow: `0 10px 25px -5px ${element.glowColor.glow}`,
          }}
        >
          <span className="text-xs font-bold text-white/70 tracking-widest">{element.number}</span>
          <span className="text-2xl font-black text-white leading-none drop-shadow-md">{element.symbol}</span>
        </div>
      </div>

      {/* Primary Telemetry Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Atomic Mass */}
        <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
            <Scale size={22} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Atomic Mass</p>
            <p className="text-sm font-bold text-white">{element.atomicMass} <span className="text-[10px] text-slate-400 font-normal">u</span></p>
          </div>
        </div>

        {/* Electronegativity */}
        <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Zap size={22} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Electronegativity</p>
            <p className="text-sm font-bold text-white">{element.electronegativity ? `${element.electronegativity} Pauling` : 'N/A'}</p>
          </div>
        </div>

        {/* Atomic Radius */}
        <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Radio size={22} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Atomic Radius</p>
            <p className="text-sm font-bold text-white">{element.radiusPm} <span className="text-[10px] text-slate-400 font-normal">pm</span></p>
          </div>
        </div>

        {/* Ionization Energy */}
        <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <Thermometer size={22} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">1st Ionization</p>
            <p className="text-sm font-bold text-white">{element.ionizationEnergy} <span className="text-[10px] text-slate-400 font-normal">kJ/mol</span></p>
          </div>
        </div>
      </div>

      {/* Electron Configuration Box */}
      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Atom size={16} className="text-sky-400" /> Electron Configuration
          </span>
          <span className="text-[10px] text-slate-400 tracking-wide font-mono">{element.electronConfig}</span>
        </div>

        {/* Shell Population Pills */}
        <div className="flex items-center gap-2 mt-2">
          {element.shells.map((shellCount, idx) => (
            <div
              key={idx}
              className="flex-1 py-1.5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center"
            >
              <span className="text-[9px] text-slate-400 font-medium">K{idx + 1}</span>
              <span className="text-xs font-extrabold text-sky-300">{shellCount}e⁻</span>
            </div>
          ))}
        </div>
      </div>

      {/* Element Summary */}
      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
        <p className="text-xs leading-relaxed text-slate-300">{element.summary}</p>
      </div>
    </div>
  );
}
