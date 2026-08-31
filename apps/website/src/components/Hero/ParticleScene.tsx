'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// High-fidelity Dubai Burj Khalifa and futuristic skyline architectural silhouette
function generateArchitecturalSkyline(count: number): {
  targets: Float32Array;
  initials: Float32Array;
  colors: Float32Array;
  scales: Float32Array;
} {
  const targets = new Float32Array(count * 3);
  const initials = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);

  const goldBright = new THREE.Color('#FFF1D0');
  const goldMid = new THREE.Color('#E8C77A');
  const goldDeep = new THREE.Color('#C9A66B');
  const sapphireAccent = new THREE.Color('#4E7DBA');

  // Allocate ~45% particles strictly to the intricate Burj Khalifa spire & tiers
  const burjCount = Math.floor(count * 0.48);

  for (let i = 0; i < count; i++) {
    // Random initial positions exploded across 3D space
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const radius = Math.random() * 16 + 8; // wide dispersion outside camera view

    initials[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    initials[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    initials[i * 3 + 2] = (radius * Math.cos(phi)) * 0.7 - 2;

    let x = 0;
    let y = 0;
    let z = 0;
    let scale = Math.random() * 2.2 + 0.8;
    const col = new THREE.Color();

    if (i < burjCount) {
      // ──────────────────────────────────────────
      // BURJ KHALIFA PINNACLE & TIER ARCHITECTURE
      // ──────────────────────────────────────────
      const t = Math.random(); // Height normalized [0, 1]
      y = t * 6.8 - 2.8; // Vertical range [-2.8, 4.0]

      // Architectural taper: exponential tapering towards tip
      const baseWidth = 1.35 * Math.pow(1 - t * 0.88, 1.4);

      // Y-shaped buttressed core angle (120 degrees wings)
      const wing = (Math.floor(Math.random() * 3) * 120 * Math.PI) / 180;
      const wingDist = Math.random() * baseWidth;
      const angleJitter = (Math.random() - 0.5) * 0.6;

      x = Math.cos(wing + angleJitter) * wingDist;
      z = Math.sin(wing + angleJitter) * wingDist * 0.5;

      // Pinnacle spire tip needle
      if (t > 0.88) {
        x *= 0.15;
        z *= 0.15;
        scale *= 1.4;
        col.copy(goldBright); // Beacon glow
      } else if (Math.random() > 0.82) {
        col.copy(goldBright); // Floor lights
      } else if (Math.random() > 0.3) {
        col.copy(goldMid);
      } else {
        col.copy(goldDeep);
      }
    } else {
      // ──────────────────────────────────────────
      // SURROUNDING DUBAI DOWNTOWN TOWERS & MARINA
      // ──────────────────────────────────────────
      // Towers on left & right clusters
      const side = Math.random() > 0.5 ? 1 : -1;
      const distFromCenter = Math.random() * 4.2 + 0.85;
      x = side * distFromCenter;

      const towerHeight = Math.random() * 3.8 + 1.2;
      const tY = Math.random();
      y = tY * towerHeight - 2.8;

      const buildingWidth = (Math.random() * 0.45 + 0.2) * (1 - tY * 0.3);
      x += (Math.random() - 0.5) * buildingWidth;
      z = (Math.random() - 0.5) * 1.2;

      // Color assignment
      const r = Math.random();
      if (r > 0.85) col.copy(goldBright);
      else if (r > 0.55) col.copy(goldMid);
      else if (r > 0.2) col.copy(goldDeep);
      else col.copy(sapphireAccent);
    }

    targets[i * 3] = x;
    targets[i * 3 + 1] = y;
    targets[i * 3 + 2] = z;

    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;

    scales[i] = scale;
  }

  return { targets, initials, colors, scales };
}

function InteractiveParticleCloud({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const { targets, initials, colors } = useMemo(
    () => generateArchitecturalSkyline(count),
    [count]
  );

  const velocitiesRef = useRef<Float32Array | null>(null);
  const mouseWorld = useRef(new THREE.Vector3(999, 999, 0));
  const scrollRef = useRef(0);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Normalize mouse to 3D viewport coordinates
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseWorld.current.set(
        (nx * viewport.width) / 2,
        (ny * viewport.height) / 2,
        0
      );
    };

    const handleScroll = () => {
      // Scroll progress relative to hero height
      scrollRef.current = Math.min(1.5, Math.max(0, window.scrollY / window.innerHeight));
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [viewport]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    if (!posAttr) return;

    if (!velocitiesRef.current || velocitiesRef.current.length !== count * 3) {
      velocitiesRef.current = new Float32Array(count * 3);
    }
    const velocities = velocitiesRef.current;
    const positions = posAttr.array as Float32Array;

    const elapsed = state.clock.getElapsedTime();
    // Initial dramatic 3.2s assemble curve
    const assembleT = Math.min(1, elapsed / 3.2);
    const easeAssemble = 1 - Math.pow(1 - assembleT, 3.8); // Ultra smooth elastic settle

    const scrollDisperse = scrollRef.current; // 0 at top, > 0 on scroll
    const mouse = mouseWorld.current;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const tx = targets[idx];
      const ty = targets[idx + 1];
      const tz = targets[idx + 2];

      const ix = initials[idx];
      const iy = initials[idx + 1];
      const iz = initials[idx + 2];

      // Base target position during assembly
      let destX = ix + (tx - ix) * easeAssemble;
      let destY = iy + (ty - iy) * easeAssemble;
      let destZ = iz + (tz - iz) * easeAssemble;

      // ──────────────────────────────────────────
      // SCROLL SHATTER / DISASSEMBLE EFFECT
      // ──────────────────────────────────────────
      if (scrollDisperse > 0) {
        // Physical explosion upwards and outwards with vortex twist
        const disperseFactor = Math.pow(scrollDisperse, 1.6) * 7.5;
        const angle = Math.atan2(tz, tx) + scrollDisperse * 2.5;
        const dist = Math.sqrt(tx * tx + tz * tz) + 0.2;

        destX += Math.cos(angle) * dist * disperseFactor * 1.8;
        destY += disperseFactor * (Math.abs(ty) + 2.0) * 1.2; // Shatters skyward
        destZ += Math.sin(angle) * dist * disperseFactor * 1.4;
      }

      // ──────────────────────────────────────────
      // MOUSE REPULSION PHYSICS
      // ──────────────────────────────────────────
      const dx = positions[idx] - mouse.x;
      const dy = positions[idx + 1] - mouse.y;
      const distSq = dx * dx + dy * dy;
      const repulsionRadius = 2.0;

      if (distSq < repulsionRadius * repulsionRadius && distSq > 0.0001) {
        const d = Math.sqrt(distSq);
        const force = (1 - d / repulsionRadius) * 2.8;
        velocities[idx] += (dx / d) * force * delta * 8;
        velocities[idx + 1] += (dy / d) * force * delta * 8;
      }

      // Velocity damping & spring return
      velocities[idx] *= 0.88;
      velocities[idx + 1] *= 0.88;
      velocities[idx + 2] *= 0.88;

      // Subtle atmospheric breathing float
      const breath = Math.sin(elapsed * 1.2 + i * 0.08) * 0.015;

      positions[idx] += (destX - positions[idx]) * 0.08 + velocities[idx];
      positions[idx + 1] += (destY + breath - positions[idx + 1]) * 0.08 + velocities[idx + 1];
      positions[idx + 2] += (destZ - positions[idx + 2]) * 0.08 + velocities[idx + 2];
    }

    posAttr.needsUpdate = true;

    // Slow majestic camera pan
    pointsRef.current.rotation.y = Math.sin(elapsed * 0.15) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[new Float32Array(initials), 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.048}
        vertexColors
        transparent
        opacity={0.92}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleScene() {
  const performanceTier = useDevicePerformance();
  const reducedMotion = useReducedMotion();

  // Fine-tuned count for ultra-smooth 60fps
  const particleCount = useMemo(() => {
    if (performanceTier === 'high') return 4200;
    if (performanceTier === 'medium') return 2200;
    return 900;
  }, [performanceTier]);

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-navy-800 via-navy-900 to-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,166,107,0.12)_0%,transparent_70%)]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.4, 7.8], fov: 52 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <InteractiveParticleCloud count={particleCount} />
      </Canvas>
      {/* Cinematic Vignette & Ambient Radial Glows */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(232,199,122,0.08)_0%,transparent_65%)]" />
    </div>
  );
}
