'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/constants';
import GoldLine from './ui/GoldLine';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      id="faq"
      ref={ref}
      className="section-padding relative"
      aria-label="Sıkça sorulan sorular"
    >
      <div className="mx-auto max-w-3xl">
        {/* Section heading */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.p
            className="heading-section mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Sıkça Sorulan Sorular
          </motion.p>
          <motion.h2
            className="heading-display text-3xl sm:text-4xl lg:text-5xl text-cream"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Merak Ettikleriniz
          </motion.h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-gold-500/30' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                style={{
                  borderColor: isOpen ? 'rgba(201, 166, 107, 0.3)' : undefined,
                }}
              >
                <button
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left cursor-pointer"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-cream text-sm sm:text-base font-medium pr-4 leading-snug">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-gold-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                        <GoldLine className="mb-4" />
                        <p className="text-cream/50 text-sm leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
