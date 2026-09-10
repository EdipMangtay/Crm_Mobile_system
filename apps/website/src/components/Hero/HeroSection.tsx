'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import HeroContent from './HeroContent';

const CinematicIntro = dynamic(() => import('./CinematicIntro'), { ssr: false });

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '2%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, reduced ? 1.03 : 1.045]);
  const atmosphereY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '2.5%']);
  const atmosphereOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduced ? 1 : 0.45]);

  return (
    <section ref={heroRef} id="hero" className="relative h-[100svh] min-h-[720px] overflow-hidden bg-canvas" aria-labelledby="hero-title">
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <Image
          src="/images/hero-skyline.jpg"
          alt="Akşam ışıklarında Downtown Dubai ve Burj Khalifa"
          fill
          loading="eager"
          fetchPriority="high"
          // Cover crops scale this landscape image by height on portrait screens.
          sizes="max(100vw, 180svh, 1290px)"
          className="object-cover object-[55%_center] brightness-[.97] contrast-[1.03] saturate-[.88] md:object-[52%_center] lg:object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,10,9,.22)_0%,rgba(3,10,9,.06)_34%,rgba(3,10,9,.28)_62%,rgba(3,10,9,.78)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,9,.36)_0%,rgba(3,10,9,.12)_65%,transparent_100%)] md:bg-[linear-gradient(90deg,rgba(3,10,9,.78)_0%,rgba(3,10,9,.58)_30%,rgba(3,10,9,.2)_58%,rgba(3,10,9,.05)_100%)]" />
      <motion.div
        className="absolute inset-[-4%] hidden bg-[radial-gradient(ellipse_62%_27%_at_58%_61%,rgba(244,240,231,.035)_0%,transparent_72%)] md:block"
        style={{ y: atmosphereY, opacity: atmosphereOpacity }}
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 left-[calc(var(--gutter)+2px)] hidden w-px bg-white/15 md:block" aria-hidden="true" />
      <HeroContent />
      <CinematicIntro />
    </section>
  );
}
