import React, { useState } from 'react';
import { PERIODIC_ELEMENTS } from '../data/elements';
import { Activity, Flame, Radio, Scale, Shield, ArrowUpRight } from 'lucide-react';

export function PropertyHeatmaps() {
  const [metric, setMetric] = useState<'electronegativity' | 'radius' | 'ionization' | 'mass'>('electronegativity');

  const getMetricValue = (elem: (typeof PERIODIC_ELEMENTS)[0]) => {
    switch (metric) {
      case 'electronegativity':
        return elem.electronegativity || 0;
      case 'radius':
        return elem.radiusPm;
      case 'ionization':
        return elem.ionizationEnergy;
      case 'mass':
        return elem.atomicMass;
    }
  };

  const getIntensityColor = (value: number) => {
    let max = 4.0;
    if (metric === 'radius') max = 250;
    if (metric === 'ionization') max = 2400;
    if (metric === 'mass') max = 200;

    const ratio = Math.min(Math.max(value / max, 0.1), 1.0);
    return `rgba(56, 189, 248, ${ratio})`;
  };

  return (
    <div className="w-full p-6 text-slate-100 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 border border-white/10 p-5 rounded-3xl">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Activity size={22} className="text-sky-400" /> Periodic Property Heatmaps
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Compare fundamental elemental metrics across atomic periods & groups
          </p>
        </div>

        {/* Metric Switcher Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => setMetric('electronegativity')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              metric === 'electronegativity'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Electronegativity
          </button>
          <button
            onClick={() => setMetric('radius')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              metric === 'radius'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Atomic Radius
          </button>
          <button
            onClick={() => setMetric('ionization')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              metric === 'ionization'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ionization Potential
          </button>
          <button
            onClick={() => setMetric('mass')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              metric === 'mass'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Atomic Mass
          </button>
        </div>
      </div>

      {/* Heatmap Matrix Display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {PERIODIC_ELEMENTS.map((elem) => {
          const val = getMetricValue(elem);
          return (
            <div
              key={elem.number}
              className="p-4 rounded-2xl border border-white/10 bg-white/5 relative overflow-hidden flex flex-col justify-between transition-transform hover:scale-105"
            >
              {/* Heat Background Aura */}
              <div
                className="absolute inset-0 opacity-40 transition-opacity pointer-events-none"
                style={{ backgroundColor: getIntensityColor(val) }}
              />

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Z = {elem.number}</span>
                <span>P{elem.period}</span>
              </div>

              <div className="my-2">
                <span className="text-2xl font-black text-white">{elem.symbol}</span>
                <p className="text-xs font-bold text-slate-200">{elem.name}</p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{metric}</span>
                <span className="text-xs font-black text-sky-300">{val}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
