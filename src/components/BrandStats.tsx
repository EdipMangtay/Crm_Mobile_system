'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Car, FileCheck, Headset, Sparkles } from 'lucide-react';
import CountUp from './ui/CountUp';
import { STATS } from '@/lib/constants';

const iconMap = {
  Users,
  Car,
  FileCheck,
  Headset,
} as const;

export default function BrandStats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 bg-navy-900 overflow-hidden"
      aria-label="Güven & Başarı İstatistikleri"
    >
      {/* Background golden horizontal beam */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/25 to-transparent -translate-y-1/2 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, i) => {
            const Icon = iconMap[stat.icon];
            return (
              <motion.div
                key={stat.label}
                className="group relative rounded-3xl p-7 sm:p-9 text-center overflow-hidden glass-card border border-gold-400/20 hover:border-gold-400/60 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(201,166,107,0.15)]"
                initial={{ opacity: 0, y: 50, scale: 0.92 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Background soft glowing orb on hover */}
                <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Stat Icon */}
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400/10 border border-gold-400/30 text-gold-300 group-hover:bg-gold-400 group-hover:text-navy-900 transition-colors duration-500 shadow-md">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Dynamic CountUp Number */}
                <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-cream tracking-tight">
                  <CountUp value={stat.value} suffix={stat.suffix} duration={2.4} />
                </div>

                {/* Subtitle label */}
                <p className="mt-3 text-xs sm:text-sm text-cream/70 font-medium tracking-wider uppercase">
                  {stat.label}
                </p>

                {/* Bottom luxury accent hairline */}
                <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent group-hover:via-gold-400 transition-colors" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
