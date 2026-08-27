'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Crown, Compass, ShieldCheck, ArrowUpRight } from 'lucide-react';
import SplitText from './ui/SplitText';
import GoldLine from './ui/GoldLine';
import TiltCard from './ui/TiltCard';
import { CONTACT } from '@/lib/constants';

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding relative overflow-hidden bg-navy-900"
      aria-label="Hakkımızda"
    >
      {/* Ambient background glows */}
      <div className="absolute -top-24 right-0 w-[500px] h-[500px] bg-gold-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 left-0 w-[450px] h-[450px] bg-sapphire/[0.07] rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Brand Narrative & Copy (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Crown className="h-4 w-4 text-gold-400" />
              <span className="heading-section">Hikayemiz & Felsefemiz</span>
            </motion.div>

            <motion.h2
              className="heading-display text-3xl sm:text-5xl lg:text-6xl text-cream mb-8 leading-[1.12]"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Standart Turizmi Unutun.{' '}
              <span className="text-gold-gradient block mt-1">
                Size Özel Bir Dubai Tasarlıyoruz.
              </span>
            </motion.h2>

            <div className="space-y-5 text-cream/70 text-base sm:text-lg leading-relaxed">
              <SplitText
                text="Travia Dubai, Türk kurucular tarafından Birleşik Arap Emirlikleri'nde kurulmuş; misafirlerinin beklentilerine göre şekillenen lüks, esnek, düzenli ve kusursuz seyahat deneyimleri tasarlayan butik bir VIP turizm firmasıdır."
                className="leading-relaxed"
              />

              <SplitText
                text="Hizmetlerimizi her misafirimizin ritmine göre planlıyor; aceleye gelmeyen, şehirde kendi zamanınıza saygı duyan modern bir VIP anlayışı benimsiyoruz. Mercedes S-Class, Audi A6 ve geniş gruplar için GMC/Patrol araçlarımızla maksimum konfor ve güvenlik sağlıyoruz."
                className="leading-relaxed"
              />
            </div>

            <GoldLine className="w-40 my-8" />

            {/* Vision & Mission Cards */}
            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              <motion.div
                className="glass-card rounded-2xl p-6 border border-gold-400/15 hover:border-gold-400/40 transition-colors"
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center mb-4 text-gold-400">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="text-gold-300 font-serif text-lg font-semibold mb-2">Vizyonumuz</h3>
                <p className="text-cream/60 text-sm leading-relaxed">
                  Turizmde kişiye özel yaklaşımı ve mükemmeliyetçi hizmetiyle öne çıkan, global ölçekte referans gösterilen lider marka olmak.
                </p>
              </motion.div>

              <motion.div
                className="glass-card rounded-2xl p-6 border border-gold-400/15 hover:border-gold-400/40 transition-colors"
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.65 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center mb-4 text-gold-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-gold-300 font-serif text-lg font-semibold mb-2">Misyonumuz</h3>
                <p className="text-cream/60 text-sm leading-relaxed">
                  Dubai&apos;nin büyüleyici atmosferini misafirlerimize sıcak bir Türk misafirperverliği, zarafet ve eksiksiz profesyonellikle yaşatmak.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Photorealistic Visual with Layered 3D Tilt (5 cols) */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard tiltIntensity={7} className="relative z-10">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold-400/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(201,166,107,0.15)] group">
                <Image
                  src="/images/visa-concierge.jpg"
                  alt="Dubai VIP Concierge ve Lüks Hizmet"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent" />

                {/* Floating badge inside photo */}
                <div className="absolute bottom-6 left-6 right-6 glass-heavy p-5 rounded-2xl border border-gold-400/25">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-gold-400 font-mono">
                        Lüks & Ayrıcalık
                      </p>
                      <h4 className="font-serif text-lg text-cream font-medium">
                        Dubai&apos;de Türkçe VIP Rehberlik
                      </h4>
                    </div>
                    <a
                      href={CONTACT.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gold-400/20 hover:bg-gold-400 flex items-center justify-center text-gold-300 hover:text-navy-900 transition-colors"
                      aria-label="Detaylı bilgi alın"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Decorative background golden wireframes */}
            <div className="pointer-events-none absolute -bottom-6 -right-6 w-full h-full border border-gold-400/20 rounded-3xl -z-10" />
            <div className="pointer-events-none absolute -top-6 -left-6 w-24 h-24 border border-gold-400/30 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
