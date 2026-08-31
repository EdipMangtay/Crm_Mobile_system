'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Car, FileCheck2, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import TiltCard from './ui/TiltCard';
import { CONTACT } from '@/lib/constants';

const serviceData = [
  {
    id: 'vip-tours',
    tag: '10 SAAT SINIRSIZ AYRICALIK',
    title: 'VIP Şehir & Gece Turları',
    description:
      'Mercedes S-Class veya Audi A6 tahsisli lüks aracınız ve anadili Türkçe olan özel rehberiniz eşliğinde Dubai’nin ikonik noktaları (Burj Khalifa, Palm Jumeirah, Dubai Mall, Marina). Kalabalık aileler için GMC Yukon ve Patrol seçenekleri.',
    highlights: ['10 saat kesintisiz araç & rehber', 'Mercedes S-Class / GMC filosu', 'Kişiye özel esnek rota'],
    image: '/images/vip-chauffeur.jpg',
    icon: Car,
  },
  {
    id: 'visa',
    tag: '3 İŞ GÜNÜNDE ONAY',
    title: 'Dubai Vize Danışmanlığı',
    description:
      'Bordo pasaport sahibi Türk vatandaşları için Birleşik Arap Emirlikleri resmi e-vize başvuru sürecini A’dan Z’ye yönetiyoruz. Evrak kontrolü, sistem kaydı ve %99.8 onay oranı ile güvenilir vize garantisi.',
    highlights: ['Online ve hızlı başvuru', 'Evrak hazırlık desteği', '7/24 başvuru takibi'],
    image: '/images/visa-concierge.jpg',
    icon: FileCheck2,
  },
  {
    id: 'experiences',
    tag: 'UNUTULMAZ ANILAR',
    title: 'Özel Aktiviteler & Deneyimler',
    description:
      'Kızıl kum tepelerinde gün batımı VIP çöl safarisi, Dubai Marina’da şampanyalı özel yat kiralama, Burj Al Arab’da fine-dining ve helikopter turları. Her detay en ince ayrıntısına kadar önceden organize edilir.',
    highlights: ['Özel lüks çöl kampları', 'Dubai Marina yat turları', 'Michelin restoran rezervasyonları'],
    image: '/images/desert-safari.jpg',
    icon: Sparkles,
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="services"
      ref={ref}
      className="section-padding relative overflow-hidden bg-navy-900"
      aria-label="Hizmetlerimiz"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(201,166,107,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="heading-section">Ayrıcalıklı Hizmet Yelpazemiz</span>
          </motion.div>

          <motion.h2
            className="heading-display text-3xl sm:text-5xl lg:text-6xl text-cream leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dubai Seyahatinizi{' '}
            <span className="text-gold-gradient">Sanata Dönüştürün</span>
          </motion.h2>

          <motion.p
            className="mt-5 text-cream/60 text-base sm:text-lg font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            İster iş gezisi, ister aile tatili; standart turların sınırlarını aşın ve Dubai&apos;nin lüksünü doyasıya yaşayın.
          </motion.p>
        </div>

        {/* 3 Columns Grid of Luxury Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {serviceData.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.35 + i * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <TiltCard tiltIntensity={6} className="h-full">
                  <div className="glass-card rounded-3xl overflow-hidden h-full flex flex-col border border-gold-400/20 hover:border-gold-400/50 transition-all duration-500 group shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    {/* Realistic Photo with Hover Zoom */}
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {/* Gradients over image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />

                      {/* Tag Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-block rounded-full bg-navy-900/80 backdrop-blur-md border border-gold-400/30 px-3.5 py-1 text-[10px] font-mono font-semibold tracking-wider text-gold-300 uppercase shadow-lg">
                          {service.tag}
                        </span>
                      </div>

                      {/* Floating Icon */}
                      <div className="absolute bottom-4 right-4 w-12 h-12 rounded-2xl bg-gold-500/20 backdrop-blur-md border border-gold-400/40 flex items-center justify-center text-gold-300 shadow-xl group-hover:bg-gold-400 group-hover:text-navy-900 transition-colors duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-2xl text-cream font-medium mb-3 group-hover:text-gold-300 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-cream/65 text-sm sm:text-base leading-relaxed mb-6">
                          {service.description}
                        </p>

                        {/* Bullet highlights */}
                        <div className="space-y-2 mb-6 pt-2 border-t border-gold-400/10">
                          {service.highlights.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-cream/75">
                              <CheckCircle2 className="h-4 w-4 text-gold-400 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Action Link */}
                      <a
                        href={CONTACT.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between w-full pt-4 border-t border-gold-400/15 text-sm font-medium text-gold-300 hover:text-gold-200 group/link transition-colors"
                      >
                        <span>WhatsApp ile Planlayın</span>
                        <div className="w-8 h-8 rounded-full bg-gold-400/10 flex items-center justify-center transition-transform group-hover/link:translate-x-1 group-hover/link:bg-gold-400 group-hover/link:text-navy-900">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
