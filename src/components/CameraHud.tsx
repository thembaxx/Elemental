import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Play, Pause, Move, RefreshCw } from 'lucide-react';

interface CameraHudProps {
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onResetView: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}

export function CameraHud({
  autoRotate,
  onToggleAutoRotate,
  onResetView,
}: CameraHudProps) {
  return (
    <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 bg-slate-950/60 backdrop-blur-xl border border-white/15 p-2 rounded-2xl shadow-2xl text-xs text-slate-200">
      {/* Gesture Controls Help Pill */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-xl border border-white/10 text-[11px] text-slate-300">
        <span className="flex items-center gap-1 font-medium"><Move size={13} className="text-sky-400" /> Drag to Rotate</span>
        <span className="text-slate-500">•</span>
        <span className="font-medium">Scroll to Zoom</span>
        <span className="text-slate-500">•</span>
        <span className="font-medium">Shift + Drag to Pan</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleAutoRotate}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
            autoRotate
              ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-sm shadow-sky-500/20'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
          }`}
          title="Toggle Auto Rotation"
        >
          {autoRotate ? <Pause size={14} /> : <Play size={14} />}
          <span>{autoRotate ? 'Orbit On' : 'Orbit Off'}</span>
        </button>

        <button
          onClick={onResetView}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-xl text-xs font-semibold transition-all duration-200"
          title="Reset Camera View"
        >
          <RotateCcw size={14} />
          <span>Reset Camera</span>
        </button>
      </div>
    </div>
  );
}
