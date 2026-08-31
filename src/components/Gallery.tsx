'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Camera } from 'lucide-react';

const galleryPhotos = [
  {
    id: 1,
    title: 'Burj Khalifa & Downtown Fıskiyeleri',
    category: 'Şehir Silueti',
    src: '/images/hero-skyline.jpg',
  },
  {
    id: 2,
    title: 'Mercedes-Maybach VIP Şehir Turu',
    category: 'Lüks Transfer',
    src: '/images/vip-chauffeur.jpg',
  },
  {
    id: 3,
    title: 'Dubai Marina Özel Süperyat Seyri',
    category: 'Yat Deneyimi',
    src: '/images/luxury-yacht.jpg',
  },
  {
    id: 4,
    title: 'Kızıl Kum Tepeleri & Bedevi Majlis',
    category: 'VIP Çöl Safarisi',
    src: '/images/desert-safari.jpg',
  },
  {
    id: 5,
    title: 'Kişiye Özel Vize & Konsiyerj Hizmeti',
    category: 'Vize Danışmanlığı',
    src: '/images/visa-concierge.jpg',
  },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // Duplicate for seamless infinite loop
  const loopPhotos = [...galleryPhotos, ...galleryPhotos];
  const reverseLoop = [...galleryPhotos.slice().reverse(), ...galleryPhotos.slice().reverse()];

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-20 sm:py-32 overflow-hidden bg-navy-900 relative select-none"
      aria-label="Fotoğraf Galerisi"
    >
      {/* Section Header */}
      <div className="mx-auto max-w-7xl px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <Camera className="h-4 w-4 text-gold-400" />
          <span className="heading-section">Görsel Vitrin</span>
        </motion.div>

        <motion.h2
          className="heading-display text-3xl sm:text-5xl lg:text-6xl text-cream"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Dubai&apos;nin İhtişamına{' '}
          <span className="text-gold-gradient">Tanıklık Edin</span>
        </motion.h2>

        <motion.p
          className="mt-4 text-cream/60 text-base sm:text-lg max-w-xl mx-auto font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Misafirlerimizin deneyimlediği en özel anlardan ilham alan büyüleyici kareler.
        </motion.p>
      </div>

      {/* Row 1: Leftward Infinite Marquee */}
      <div className="relative mb-6">
        <div className="flex animate-marquee hover:[animation-play-state:paused] w-max gap-6 will-change-transform">
          {loopPhotos.map((item, i) => (
            <div
              key={`row1-${item.id}-${i}`}
              className="relative w-80 sm:w-96 h-60 sm:h-72 rounded-3xl overflow-hidden shrink-0 border border-gold-400/20 group hover:border-gold-400/70 transition-all duration-500 shadow-[0_20px_45px_rgba(0,0,0,0.7)]"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 320px, 384px"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent" />

              {/* Information pill */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl glass-heavy border border-gold-400/20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase block mb-1">
                  {item.category}
                </span>
                <p className="text-cream text-sm font-serif font-medium truncate">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Edge Vignette Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 sm:w-48 bg-gradient-to-r from-navy-900 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 sm:w-48 bg-gradient-to-l from-navy-900 to-transparent z-10" />
      </div>

      {/* Row 2: Rightward Infinite Marquee */}
      <div className="relative">
        <div className="flex animate-marquee-reverse hover:[animation-play-state:paused] w-max gap-6 will-change-transform">
          {reverseLoop.map((item, i) => (
            <div
              key={`row2-${item.id}-${i}`}
              className="relative w-72 sm:w-88 h-52 sm:h-64 rounded-3xl overflow-hidden shrink-0 border border-gold-400/15 group hover:border-gold-400/60 transition-all duration-500 shadow-[0_20px_45px_rgba(0,0,0,0.7)]"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 288px, 352px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl glass-heavy border border-gold-400/20">
                <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase block mb-0.5">
                  {item.category}
                </span>
                <p className="text-cream text-xs sm:text-sm font-serif font-medium truncate">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Edge Vignette Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 sm:w-48 bg-gradient-to-r from-navy-900 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 sm:w-48 bg-gradient-to-l from-navy-900 to-transparent z-10" />
      </div>
    </section>
  );
}
