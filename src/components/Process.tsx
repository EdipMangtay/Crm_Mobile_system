'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { PROCESS_STEPS } from '@/lib/constants';
import { MessageSquare, CalendarRange, CreditCard, Sparkles, Check } from 'lucide-react';

const stepIcons = [MessageSquare, CalendarRange, CreditCard, Sparkles];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.65'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="process"
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-navy-900"
      aria-label="Nasıl çalışır"
    >
      {/* Background ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="heading-section">Kusursuz İşleyiş</span>
          </motion.div>

          <motion.h2
            className="heading-display text-3xl sm:text-5xl lg:text-6xl text-cream"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dört Adımda{' '}
            <span className="text-gold-gradient">Ayrıcalıklı Deneyim</span>
          </motion.h2>

          <motion.p
            className="mt-4 text-cream/60 text-base sm:text-lg max-w-xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            İlk temastan havalimanı karşılamanıza kadar her detay kusursuz bir zarafetle yürütülür.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10">
          {/* Background rail */}
          <div className="absolute left-[38px] sm:left-[54px] top-6 bottom-6 w-[2px] bg-gold-400/10 rounded-full" />

          {/* Golden Animated Fill Line */}
          <motion.div
            className="absolute left-[38px] sm:left-[54px] top-6 w-[2px] bg-gradient-to-b from-gold-300 via-gold-400 to-gold-500 rounded-full shadow-[0_0_15px_rgba(201,166,107,0.8)] origin-top will-change-transform"
            style={{ height: lineHeight }}
          />

          {/* Traveling Golden Pulse Beacon */}
          <motion.div
            className="absolute left-[34px] sm:left-[50px] top-6 w-2.5 h-2.5 rounded-full bg-gold-200 shadow-[0_0_12px_#FFF] pointer-events-none will-change-transform"
            style={{ top: glowY }}
          />

          {/* Steps List */}
          <div className="space-y-12 sm:space-y-16">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div
                  key={step.step}
                  className="relative flex items-start gap-6 sm:gap-10 group"
                  initial={{ opacity: 0, x: -40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Step Orb Node */}
                  <div className="relative z-10 flex h-14 w-14 sm:h-18 sm:w-18 shrink-0 items-center justify-center rounded-2xl bg-navy-800 border border-gold-400/40 shadow-[0_0_25px_rgba(0,0,0,0.8)] group-hover:border-gold-400 group-hover:shadow-[0_0_30px_rgba(201,166,107,0.3)] transition-all duration-500">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-gold-300 group-hover:scale-110 transition-transform duration-300" />
                    {/* Tiny Step Number Tag */}
                    <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gold-400 text-navy-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-md">
                      0{step.step}
                    </span>
                  </div>

                  {/* Step Glassmorphic Card */}
                  <div className="flex-1 glass-card rounded-2xl p-6 sm:p-8 border border-gold-400/15 group-hover:border-gold-400/40 transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono tracking-widest text-gold-400 uppercase">
                        Aşama 0{step.step}
                      </span>
                      <div className="w-5 h-5 rounded-full bg-gold-400/10 flex items-center justify-center text-gold-400">
                        <Check className="h-3 w-3" />
                      </div>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-cream font-medium mb-3 group-hover:text-gold-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-cream/65 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
