'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroContent from './HeroContent';

// Dynamic import for ParticleScene to avoid SSR issues with Three.js
const ParticleScene = dynamic(() => import('./ParticleScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-navy-800 via-navy-900 to-navy-900" />
  ),
});

export default function HeroSection() {
  const { scrollY } = useScroll();
  // Cinematic parallax depth on background photo
  const bgScale = useTransform(scrollY, [0, 800], [1.05, 1.18]);
  const bgY = useTransform(scrollY, [0, 800], [0, 140]);
  const bgOpacity = useTransform(scrollY, [0, 600], [0.38, 0.08]);

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-navy-900 select-none"
      aria-label="Hero bölümü"
    >
      {/* Cinematic Photorealistic Backdrop Layer */}
      <motion.div
        style={{ scale: bgScale, y: bgY, opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 will-change-transform"
      >
        <Image
          src="/images/hero-skyline.jpg"
          alt="Dubai Skyline"
          fill
          priority
          className="object-cover object-center filter brightness-[0.7] contrast-[1.15]"
        />
      </motion.div>

      {/* Deep Navy/Black Gradient Transitions */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/85 via-navy-900/50 to-navy-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(201,166,107,0.12)_0%,transparent_70%)]" />

      {/* WebGL 3D Interactive Particle Cloud (Assembles, Reacts to Mouse, Shatters on Scroll) */}
      <ParticleScene />

      {/* Foreground Hero Content & Typography */}
      <HeroContent />
    </section>
  );
}
