import React from 'react';
import { ElementData } from '../data/elements';

interface DynamicGlowContainerProps {
  element: ElementData;
  children: React.ReactNode;
  className?: string;
}

export function DynamicGlowContainer({ element, children, className = '' }: DynamicGlowContainerProps) {
  return (
    <div className={`relative rounded-[32px] p-[1.5px] transition-all duration-700 ease-out ${className}`}>
      {/* Outer Glow Aura */}
      <div
        className="absolute -inset-1.5 rounded-[36px] blur-xl opacity-40 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${element.glowColor.primary} 0%, ${element.glowColor.secondary} 50%, transparent 80%)`,
        }}
      />

      {/* Dynamic 1.5px Edge Gradient Border */}
      <div
        className="absolute inset-0 rounded-[32px] transition-all duration-700 pointer-events-none opacity-80"
        style={{
          background: `linear-gradient(135deg, ${element.glowColor.primary}, rgba(255, 255, 255, 0.2) 40%, ${element.glowColor.secondary})`,
        }}
      />

      {/* Glass Inner Container */}
      <div className="relative rounded-[30px] bg-slate-950/70 backdrop-blur-2xl border border-white/10 overflow-hidden h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
