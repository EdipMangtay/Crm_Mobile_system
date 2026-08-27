'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Mail, Send, Check, Sparkles, Clock, Shield } from 'lucide-react';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

import MagneticButton from './ui/MagneticButton';
import GoldLine from './ui/GoldLine';
import { CONTACT } from '@/lib/constants';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    serviceType: 'vip-tour',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/website/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', phone: '', date: '', serviceType: 'vip-tour', message: '' });
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding relative overflow-hidden bg-navy-900"
      aria-label="İletişim & Rezervasyon"
    >
      {/* Dynamic ambient gold/sapphire glow backdrop */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gold-500/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[600px] h-[600px] bg-sapphire/[0.08] rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Sparkles className="h-4 w-4 text-gold-400" />
            <span className="heading-section">VIP Rezervasyon & İletişim</span>
          </motion.div>

          <motion.h2
            className="heading-display text-3xl sm:text-5xl lg:text-6xl text-cream leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hayalinizdeki Dubai Seyahatini{' '}
            <span className="text-gold-gradient block mt-1">Birlikte Başlatalım</span>
          </motion.h2>

          <motion.p
            className="mt-4 text-cream/60 text-base sm:text-lg font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Formu doldurun veya doğrudan WhatsApp hattımızdan Türkçe concierge ekibimizle iletişime geçin.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Contact Form (7 cols) */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-card rounded-3xl p-8 sm:p-10 border border-gold-400/25 relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-16 text-center"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      className="flex h-24 w-24 items-center justify-center rounded-full bg-gold-400/20 border border-gold-400/50 mb-6 shadow-[0_0_30px_rgba(201,166,107,0.4)]"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 220 }}
                    >
                      <Check className="h-12 w-12 text-gold-300" />
                    </motion.div>
                    <h3 className="font-serif text-3xl text-cream mb-3">Talebiniz Alındı</h3>
                    <p className="text-cream/70 text-base max-w-md leading-relaxed">
                      VIP seyahat uzmanımız en geç 15 dakika içinde sizinle iletişime geçerek detaylı tur programınızı oluşturacaktır.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-mono tracking-wider text-gold-400 uppercase mb-2">
                          Adınız Soyadınız *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-2xl bg-navy-800/80 border border-gold-400/20 px-5 py-4 text-cream text-sm placeholder-cream/25 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20 transition-all"
                          placeholder="Örn: Ahmet Yılmaz"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-mono tracking-wider text-gold-400 uppercase mb-2">
                          Telefon Numaranız *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full rounded-2xl bg-navy-800/80 border border-gold-400/20 px-5 py-4 text-cream text-sm placeholder-cream/25 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20 transition-all"
                          placeholder="+90 5XX XXX XX XX"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact-service" className="block text-xs font-mono tracking-wider text-gold-400 uppercase mb-2">
                          İlgilendiğiniz Hizmet
                        </label>
                        <select
                          id="contact-service"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          className="w-full rounded-2xl bg-navy-800/80 border border-gold-400/20 px-5 py-4 text-cream text-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20 transition-all [color-scheme:dark]"
                        >
                          <option value="vip-tour">10 Saatlik VIP Şehir Turu</option>
                          <option value="visa">Dubai Vize Danışmanlığı</option>
                          <option value="safari">VIP Çöl Safarisi</option>
                          <option value="yacht">Özel Yat Kiralama</option>
                          <option value="full-package">Kapsamlı VIP Tatil Paketi</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="contact-date" className="block text-xs font-mono tracking-wider text-gold-400 uppercase mb-2">
                          Planlanan Seyahat Tarihi
                        </label>
                        <input
                          id="contact-date"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full rounded-2xl bg-navy-800/80 border border-gold-400/20 px-5 py-4 text-cream text-sm focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20 transition-all [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-mono tracking-wider text-gold-400 uppercase mb-2">
                        Özel İstekleriniz & Beklentileriniz
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        required
                        className="w-full rounded-2xl bg-navy-800/80 border border-gold-400/20 px-5 py-4 text-cream text-sm placeholder-cream/25 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20 transition-all resize-none"
                        placeholder="Kişi sayısı, özel istekler, araç tercihi vb. belirtiniz..."
                      />
                    </div>

                    <div className="pt-2">
                      <MagneticButton
                        variant="gold"
                        size="lg"
                        className="w-full py-4 text-base shadow-[0_0_30px_rgba(201,166,107,0.35)]"
                      >
                        <Send className="h-4 w-4 mr-2.5 inline" />
                        VIP Talep Formunu Gönder
                      </MagneticButton>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Quick Direct Contacts (5 cols) */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Direct WhatsApp VIP Action Card */}
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-3xl p-7 bg-gradient-to-br from-green-950/40 via-navy-800 to-navy-800 border border-green-500/30 hover:border-green-400 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/20 text-green-400 group-hover:scale-110 transition-transform shadow-lg shrink-0">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500/15 text-green-300 text-[10px] font-mono font-semibold mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                    7/24 AKTİF VIP HATTI
                  </div>
                  <h3 className="font-serif text-xl text-cream font-medium">WhatsApp İle Anında Yazın</h3>
                  <p className="text-cream/50 text-xs mt-1">Ortalama yanıt süresi 2 dakika</p>
                </div>
              </div>
            </a>

            {/* Direct Phone */}
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="group flex items-center gap-5 glass-card rounded-3xl p-6 border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300 shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400/10 text-gold-300 group-hover:scale-110 transition-transform shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">
                  Doğrudan Arama
                </span>
                <p className="font-serif text-lg text-cream font-medium">{CONTACT.phone}</p>
                <p className="text-cream/40 text-xs mt-0.5">Dubai yerel hat & Türkçe destek</p>
              </div>
            </a>

            {/* Direct Email */}
            <a
              href={`mailto:${CONTACT.email}`}
              className="group flex items-center gap-5 glass-card rounded-3xl p-6 border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300 shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400/10 text-gold-300 group-hover:scale-110 transition-transform shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-gold-400 uppercase block">
                  Kurumsal E-Posta
                </span>
                <p className="font-serif text-base text-cream font-medium">{CONTACT.email}</p>
                <p className="text-cream/40 text-xs mt-0.5">Teklif & kurumsal işbirlikleri</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 glass-card rounded-3xl p-6 border border-gold-400/20 hover:border-pink-500/40 transition-all duration-300 shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400 group-hover:scale-110 transition-transform shrink-0">
                <InstagramIcon className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-pink-400 uppercase block">
                  Instagram
                </span>
                <p className="font-serif text-lg text-cream font-medium">@{CONTACT.instagram}</p>
                <p className="text-cream/40 text-xs mt-0.5">Günlük Dubai hikayeleri ve turlarımız</p>
              </div>
            </a>

            {/* Trust Badges */}
            <div className="glass-card rounded-3xl p-6 border border-gold-400/10 flex items-center justify-around text-center">
              <div>
                <Shield className="h-5 w-5 text-gold-400 mx-auto mb-1" />
                <span className="text-[11px] text-cream/70 font-medium">%100 Lisanslı</span>
              </div>
              <div className="h-8 w-px bg-gold-400/20" />
              <div>
                <Clock className="h-5 w-5 text-gold-400 mx-auto mb-1" />
                <span className="text-[11px] text-cream/70 font-medium">7/24 Kesintisiz</span>
              </div>
              <div className="h-8 w-px bg-gold-400/20" />
              <div>
                <Sparkles className="h-5 w-5 text-gold-400 mx-auto mb-1" />
                <span className="text-[11px] text-cream/70 font-medium">Türkçe Rehber</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
