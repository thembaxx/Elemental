import React from 'react';
import { ElementData, PERIODIC_ELEMENTS } from '../data/elements';

interface SequenceScrubberProps {
  selectedElement: ElementData;
  onSelectElement: (element: ElementData) => void;
}

export function SequenceScrubber({ selectedElement, onSelectElement }: SequenceScrubberProps) {
  return (
    <div className="w-full bg-slate-950/60 backdrop-blur-2xl border-t border-white/10 p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between px-2 text-xs">
        <span className="font-semibold text-slate-300 tracking-wider text-[11px] uppercase flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" /> Cosmic Sequence Scrubber (1 - 118)
        </span>
        <span className="text-[11px] text-slate-400 font-mono">
          Focused: <strong className="text-white">{selectedElement.name}</strong> ({selectedElement.symbol})
        </span>
      </div>

      {/* Horizontal Scrollable Orb Strip */}
      <div className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 scrollbar-none">
        {PERIODIC_ELEMENTS.map((elem) => {
          const isSelected = elem.number === selectedElement.number;
          return (
            <button
              key={elem.number}
              onClick={() => onSelectElement(elem)}
              className={`flex-shrink-0 group relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 transform ${
                isSelected
                  ? 'scale-110 -translate-y-1 z-10'
                  : 'hover:scale-105 hover:-translate-y-0.5 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Outer Glow Halo for Selected */}
              {isSelected && (
                <div
                  className="absolute -inset-1 rounded-2xl blur-md opacity-80 transition-all pointer-events-none"
                  style={{ background: elem.glowColor.primary }}
                />
              )}

              {/* 3D Tactile Orb Body */}
              <div
                className="w-full h-full rounded-2xl border flex flex-col items-center justify-center relative overflow-hidden transition-all"
                style={{
                  background: isSelected
                    ? `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), ${elem.glowColor.primary} 70%, rgba(15, 23, 42, 0.95))`
                    : `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15), rgba(30, 41, 59, 0.9))`,
                  borderColor: isSelected ? elem.glowColor.primary : 'rgba(255, 255, 255, 0.15)',
                  boxShadow: isSelected ? `0 6px 20px -3px ${elem.glowColor.glow}` : 'none',
                }}
              >
                <span className="text-[9px] font-bold text-white/70 leading-none">{elem.number}</span>
                <span className="text-sm font-black text-white leading-tight drop-shadow">{elem.symbol}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
