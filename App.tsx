import React, { useState } from 'react';
import { PERIODIC_ELEMENTS, ElementData } from './src/data/elements';
import { TopNav } from './src/components/TopNav';
import { DynamicGlowContainer } from './src/components/DynamicGlowContainer';
import { BohrAtomStage } from './src/components/BohrAtomStage';
import { CameraHud } from './src/components/CameraHud';
import { EmpiricalInspector } from './src/components/EmpiricalInspector';
import { SequenceScrubber } from './src/components/SequenceScrubber';
import { PeriodicDrawerSheet } from './src/components/PeriodicDrawerSheet';
import { PropertyHeatmaps } from './src/components/PropertyHeatmaps';
import { QuantumQuiz } from './src/components/QuantumQuiz';

export default function App() {
  const [selectedElement, setSelectedElement] = useState<ElementData>(
    PERIODIC_ELEMENTS.find((e) => e.symbol === 'O') || PERIODIC_ELEMENTS[0]
  );
  const [activeTab, setActiveTab] = useState<'inspect' | 'matrix' | 'heatmaps' | 'quiz'>('inspect');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [cameraKey, setCameraKey] = useState(0);

  const handleResetCamera = () => {
    setCameraKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#141d44] via-[#233170] to-[#3f519d] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 overflow-x-hidden relative">
      {/* Background Celestial Particles Effect */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/10 via-transparent to-transparent pointer-events-none" />

      {/* Top Floating Navigation Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 z-30">
        <TopNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenDrawer={() => setIsDrawerOpen(true)}
        />
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-2 flex flex-col z-10">
        {activeTab === 'inspect' && (
          <DynamicGlowContainer element={selectedElement} className="flex-1">
            {/* 12-Column Responsive Desktop & Mobile Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 h-full min-h-[550px]">
              {/* Left Column: 3D Three.js Bohr Orbital Viewport (7 Cols on Desktop) */}
              <div className="lg:col-span-7 relative flex flex-col min-h-[380px] lg:min-h-[550px] border-b lg:border-b-0 lg:border-r border-white/10">
                <CameraHud
                  autoRotate={autoRotate}
                  onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
                  onResetView={handleResetCamera}
                />
                <BohrAtomStage key={cameraKey} element={selectedElement} autoRotate={autoRotate} />
              </div>

              {/* Right Column: Empirical Inspector Telemetry (5 Cols on Desktop) */}
              <div className="lg:col-span-5 flex flex-col justify-between overflow-y-auto max-h-[600px] scrollbar-none">
                <EmpiricalInspector element={selectedElement} />
              </div>
            </div>

            {/* Full-Width Sequence Scrubber Carousel at Container Bottom */}
            <SequenceScrubber
              selectedElement={selectedElement}
              onSelectElement={setSelectedElement}
            />
          </DynamicGlowContainer>
        )}

        {activeTab === 'heatmaps' && (
          <div className="flex-1 bg-slate-950/60 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden">
            <PropertyHeatmaps />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="flex-1 bg-slate-950/60 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden py-8">
            <QuantumQuiz />
          </div>
        )}
      </main>

      {/* Full Periodic Table Drawer Sheet Modal */}
      <PeriodicDrawerSheet
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedElement={selectedElement}
        onSelectElement={(elem) => {
          setSelectedElement(elem);
          setActiveTab('inspect');
        }}
      />
    </div>
  );
}
