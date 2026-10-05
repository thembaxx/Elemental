import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { ElementData } from '../data/elements';

interface BohrAtomProps {
  element: ElementData;
  autoRotate?: boolean;
}

function Nucleus({ element }: { element: ElementData }) {
  const coreRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const nucleons = useMemo(() => {
    const total = Math.min(element.number, 24); // Represent core nucleons gracefully
    const points: { pos: [number, number, number]; isProton: boolean }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < total; i++) {
      const y = 1 - (i / (total - 1 || 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const r = 0.45 + Math.random() * 0.1;
      const x = Math.cos(theta) * radiusAtY * r;
      const z = Math.sin(theta) * radiusAtY * r;
      points.push({
        pos: [x, y * r, z],
        isProton: i % 2 === 0,
      });
    }
    return points;
  }, [element.number]);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Outer Frosted Core Envelope */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshPhysicalMaterial
          color={element.glowColor.primary}
          emissive={element.glowColor.secondary}
          emissiveIntensity={0.6}
          transmission={0.8}
          opacity={0.85}
          transparent
          roughness={0.15}
          ior={1.4}
        />
      </mesh>

      {/* Internal Nucleon Cluster */}
      <group ref={coreRef}>
        {nucleons.map((item, idx) => (
          <mesh key={idx} position={item.pos}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial
              color={item.isProton ? element.glowColor.primary : '#e2e8f0'}
              emissive={item.isProton ? element.glowColor.secondary : '#94a3b8'}
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Core Point Light */}
      <pointLight color={element.glowColor.primary} intensity={2.5} distance={10} />
    </group>
  );
}

function OrbitalShell({
  radius,
  electronCount,
  tilt,
  speed,
  color,
}: {
  radius: number;
  electronCount: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const electronsRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (electronsRef.current) {
      electronsRef.current.rotation.z += delta * speed;
    }
  });

  const electrons = useMemo(() => {
    const arr = [];
    for (let i = 0; i < electronCount; i++) {
      const angle = (i / electronCount) * Math.PI * 2;
      arr.push(angle);
    }
    return arr;
  }, [electronCount]);

  return (
    <group rotation={tilt}>
      {/* Orbital Ring Path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshBasicMaterial color={color} opacity={0.45} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Revolving Electrons */}
      <group ref={electronsRef}>
        {electrons.map((angle, idx) => {
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <group key={idx} position={[x, y, 0]}>
              <mesh>
                <sphereGeometry args={[0.14, 16, 16]} />
                <meshStandardMaterial
                  color="#ffffff"
                  emissive={color}
                  emissiveIntensity={1.5}
                  roughness={0.1}
                />
              </mesh>
              <pointLight color={color} intensity={1.2} distance={3} />
            </group>
          );
        })}
      </group>
    </group>
  );
}

export function BohrAtomStage({ element, autoRotate = true }: BohrAtomProps) {
  const controlsRef = useRef<any>(null);

  // Compute shells and 3D tilts
  const shells = useMemo(() => {
    return element.shells.map((count, index) => {
      const radius = 2.4 + index * 1.5;
      const tilts: [number, number, number][] = [
        [0.4, 0.2, 0],
        [-0.5, 0.6, 0.3],
        [0.8, -0.4, -0.2],
        [0.2, 0.9, 0.5],
        [-0.7, -0.3, 0.8],
        [0.5, -0.8, 0.4],
      ];
      return {
        radius,
        count,
        tilt: tilts[index % tilts.length],
        speed: 0.8 + index * 0.3,
      };
    });
  }, [element]);

  return (
    <div className="w-full h-full relative min-h-[350px]">
      <Canvas
        camera={{ position: [0, 2, 8.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color={element.glowColor.primary} />

        <Stars radius={50} depth={50} count={1200} factor={4} saturation={0.5} fade speed={1} />

        {/* Central Nucleus */}
        <Nucleus element={element} />

        {/* Orbitals */}
        {shells.map((s, idx) => (
          <OrbitalShell
            key={idx}
            radius={s.radius}
            electronCount={s.count}
            tilt={s.tilt}
            speed={s.speed}
            color={element.glowColor.primary}
          />
        ))}

        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={1.2}
          minDistance={3.5}
          maxDistance={22}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
