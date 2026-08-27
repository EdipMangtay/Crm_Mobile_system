'use client';

import { motion } from 'framer-motion';
import { ArrowDown, MessageCircle, Sparkles, Compass } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import { CONTACT } from '@/lib/constants';

export default function HeroContent() {
  const handleScrollToServices = () => {
    const el = document.querySelector('#services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const titleWords = ["Dubai'yi", "Size", "Özel", "Yaşayın."];

  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
      {/* Luxury Golden Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-navy-800/80 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(201,166,107,0.15)] mb-6"
      >
        <Sparkles className="h-3.5 w-3.5 text-gold-400 animate-pulse" />
        <span className="text-[11px] font-sans font-medium tracking-[0.25em] text-gold-300 uppercase">
          Kişiye Özel VIP Turizm & Vize Hizmetleri
        </span>
      </motion.div>

      {/* Main Dramatic Headline */}
      <h1 className="heading-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-cream max-w-6xl tracking-tight leading-[1.04]">
        {titleWords.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 50, rotateX: 30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.9 + index * 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block mr-[0.25em] will-change-transform ${
              word === 'Özel' ? 'text-gold-gradient font-normal italic' : ''
            }`}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      {/* Subtitle with blur-to-clear reveal */}
      <motion.p
        className="mt-7 max-w-2xl text-base sm:text-lg lg:text-xl text-cream/70 font-light leading-relaxed tracking-wide"
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
      >
        10 saatlik özel lüks araç, Türkçe rehber ve eksiksiz vize danışmanlığıyla
        Dubai&apos;nin en seçkin kapıları yalnızca sizin için aralanıyor.
      </motion.p>

      {/* CTA Action Buttons */}
      <motion.div
        className="mt-10 flex flex-col sm:flex-row items-center gap-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <MagneticButton
          variant="gold"
          size="lg"
          onClick={handleScrollToServices}
          className="shadow-[0_0_35px_rgba(201,166,107,0.35)]"
        >
          <Compass className="h-4 w-4 mr-2.5 inline" />
          Ayrıcalıkları Keşfedin
        </MagneticButton>
        <MagneticButton
          variant="outline"
          size="lg"
          href={CONTACT.whatsappUrl}
          target="_blank"
        >
          <MessageCircle className="h-4 w-4 mr-2.5 inline text-green-400" />
          WhatsApp VIP Hattı
        </MagneticButton>
      </motion.div>

      {/* Scroll Down Cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-cream/40 cursor-pointer"
        onClick={handleScrollToServices}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400/80 font-mono">
          AŞAĞI KAYDIRIN
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-9 rounded-full border border-gold-400/30 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-gold-400"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
