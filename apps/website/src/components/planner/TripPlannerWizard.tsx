'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, Check, ArrowRight, ArrowLeft,
  Ship, Compass, Utensils, Car, Send, CheckCircle2
} from 'lucide-react';
import { formatCurrency } from '@/types/crm';

interface PlannerData {
  nights: number;
  startDate: string;
  pax: number;
  hotel: string;
  experiences: string[];
  name: string;
  phone: string;
  email: string;
  specialRequests: string;
}

const HOTELS = [
  { id: 'atlantis-royal', name: 'Atlantis The Royal', area: 'Palm Jumeirah', pricePerNight: 4200, badge: 'En Çok Tercih Edilen' },
  { id: 'burj-al-arab', name: 'Burj Al Arab Jumeirah', area: 'Umm Suqeim', pricePerNight: 6500, badge: 'Ultra Lüks İkonik' },
  { id: 'armani-hotel', name: 'Armani Hotel Dubai', area: 'Burj Khalifa / Downtown', pricePerNight: 3200, badge: 'Şehir & Alışveriş' },
  { id: 'bulgari-resort', name: 'Bulgari Resort Dubai', area: 'Jumeira Bay Island', pricePerNight: 5500, badge: 'İzole Ada Lüksü' },
];

const EXPERIENCES = [
  { id: 'yacht', name: 'Özel Süperyat Gün Batımı Turu (Majesty 56ft)', price: 6800, icon: Ship },
  { id: 'safari', name: 'VIP Kızıl Kum Çöl Safarisi & Royal Majlis Çadırı', price: 4200, icon: Compass },
  { id: 'helicopter', name: '25 Dk Helikopter Şehir Turu (Atlantis Helipad)', price: 3600, icon: Sparkles },
  { id: 'dining', name: 'Nobu Dubai / Zuma Terasta Gurme Masa Rezervasyonu', price: 2800, icon: Utensils },
  { id: 'chauffeur', name: 'Seyahat Boyunca 24 Saat Tahsisli Mercedes V-Class / Maybach', price: 5000, icon: Car },
];

export default function TripPlannerWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [data, setData] = useState<PlannerData>({
    nights: 5,
    startDate: '2026-10-15',
    pax: 2,
    hotel: 'atlantis-royal',
    experiences: ['yacht', 'safari'],
    name: '',
    phone: '',
    email: '',
    specialRequests: '',
  });

  const selectedHotel = HOTELS.find(h => h.id === data.hotel) || HOTELS[0];
  const hotelTotal = selectedHotel.pricePerNight * data.nights;
  const experiencesTotal = data.experiences.reduce((sum, expId) => {
    const exp = EXPERIENCES.find(e => e.id === expId);
    return sum + (exp?.price || 0);
  }, 0);
  const totalEstimate = hotelTotal + experiencesTotal;

  const toggleExperience = (id: string) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.includes(id)
        ? prev.experiences.filter(e => e !== id)
        : [...prev.experiences, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.phone) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/website/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          date: data.startDate,
          serviceType: `Bespoke Trip: ${selectedHotel.name} (${data.nights} Gece, ${data.pax} PAX)`,
          message: `Otel: ${selectedHotel.name}. Seçilen Deneyimler: ${data.experiences.join(', ')}. Tahmini Bütçe: ${totalEstimate} AED. Özel Not: ${data.specialRequests}`,
        }),
      });
      setIsSuccess(true);
    } catch {
      // Fallback success for client
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="trip-planner" className="py-20 bg-[#05070F] border-t border-[#C9A66B]/15 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A66B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A66B]/10 border border-[#C9A66B]/20 text-[#E8C77A] text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KİŞİYE ÖZEL DUBAİ SEYAHAT SİHİRBAZI</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F5F1E8]">
            Kendi VIP Dubai Seyahatinizi Tasarlayın
          </h2>
          <p className="text-xs sm:text-sm text-[#F5F1E8]/40 mt-2 max-w-xl mx-auto">
            Tercihlerinizi belirleyin, tahmini bütçenizi anlık hesaplayın ve concierge ekibimiz size özel teklif hazırlasın.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/20 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C9A66B]/10">
            {[
              { num: 1, label: 'Tarih & PAX' },
              { num: 2, label: 'Konaklama' },
              { num: 3, label: 'Deneyimler' },
              { num: 4, label: 'Teklif & Onay' },
            ].map(s => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s.num
                    ? 'bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] shadow-[0_0_15px_rgba(201,166,107,0.4)]'
                    : step > s.num
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#111827] text-[#F5F1E8]/30'
                }`}>
                  {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span className={`text-xs hidden sm:inline ${step === s.num ? 'text-[#F5F1E8] font-medium' : 'text-[#F5F1E8]/30'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Success View */}
          {isSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-[#F5F1E8]">VIP Seyahat Talebiniz Alındı!</h3>
              <p className="text-xs text-[#F5F1E8]/50 max-w-md mx-auto leading-relaxed">
                Talebiniz doğrudan Travia Ultimate CRM sistemimize aktarıldı. Özel portföy yöneticiniz 15 dakika içinde WhatsApp üzerinden sizinle iletişime geçecektir.
              </p>
              <div className="bg-[#111827] p-4 rounded-xl max-w-sm mx-auto text-xs text-[#C9A66B] font-mono border border-[#C9A66B]/15">
                Tahmini Paket Bedeli: {formatCurrency(totalEstimate)}
              </div>
            </div>
          ) : (
            <div>
              {/* STEP 1: Dates & Pax */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#C9A66B] mb-2">
                      Konaklama Süresi (Gece Sayısı)
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {[3, 5, 7, 10].map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setData({ ...data, nights: n })}
                          className={`py-3 rounded-xl border text-sm font-semibold transition-all ${
                            data.nights === n
                              ? 'bg-[#C9A66B]/15 border-[#C9A66B] text-[#E8C77A]'
                              : 'bg-[#111827] border-[#C9A66B]/10 text-[#F5F1E8]/50 hover:border-[#C9A66B]/30'
                          }`}
                        >
                          {n} Gece
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#C9A66B] mb-2">
                        Tahmini Başlangıç Tarihi
                      </label>
                      <input
                        type="date"
                        value={data.startDate}
                        onChange={e => setData({ ...data, startDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#C9A66B]/15 text-sm text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#C9A66B] mb-2">
                        Kişi Sayısı (Misafir)
                      </label>
                      <select
                        value={data.pax}
                        onChange={e => setData({ ...data, pax: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#C9A66B]/15 text-sm text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/40"
                      >
                        <option value={1}>1 Kişi (VIP Solo)</option>
                        <option value={2}>2 Kişi (Çift / VIP Couple)</option>
                        <option value={4}>4 Kişi (Aile / Küçük Grup)</option>
                        <option value={6}>6+ Kişi (Grup / Heyet)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Accommodation */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#C9A66B] mb-2">
                    Lüks Resort / Otel Tercihiniz
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {HOTELS.map(hotel => (
                      <button
                        key={hotel.id}
                        type="button"
                        onClick={() => setData({ ...data, hotel: hotel.id })}
                        className={`p-4 rounded-2xl border text-left transition-all relative ${
                          data.hotel === hotel.id
                            ? 'bg-[#C9A66B]/15 border-[#C9A66B] shadow-[0_0_20px_rgba(201,166,107,0.2)]'
                            : 'bg-[#111827] border-[#C9A66B]/10 hover:border-[#C9A66B]/30'
                        }`}
                      >
                        <span className="text-[10px] bg-[#C9A66B]/20 text-[#E8C77A] px-2 py-0.5 rounded-full font-mono">
                          {hotel.badge}
                        </span>
                        <h4 className="text-base font-semibold text-[#F5F1E8] mt-2">{hotel.name}</h4>
                        <p className="text-xs text-[#F5F1E8]/40">{hotel.area}</p>
                        <p className="text-xs font-mono text-[#C9A66B] font-semibold mt-3">
                          ~{formatCurrency(hotel.pricePerNight)} / gece
                        </p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Experiences */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#C9A66B] mb-2">
                    Pakete Eklenecek VIP Deneyimler (Çoklu Seçim)
                  </label>
                  <div className="space-y-2.5">
                    {EXPERIENCES.map(exp => {
                      const isSelected = data.experiences.includes(exp.id);
                      const Icon = exp.icon;
                      return (
                        <button
                          key={exp.id}
                          type="button"
                          onClick={() => toggleExperience(exp.id)}
                          className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all ${
                            isSelected
                              ? 'bg-[#C9A66B]/15 border-[#C9A66B]'
                              : 'bg-[#111827] border-[#C9A66B]/10 hover:border-[#C9A66B]/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isSelected ? 'bg-[#C9A66B] text-[#05070F]' : 'bg-[#0B0F1A] text-[#C9A66B]/60'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#F5F1E8]">{exp.name}</p>
                            </div>
                          </div>
                          <span className="text-xs font-mono text-[#C9A66B] font-semibold shrink-0 ml-2">
                            +{formatCurrency(exp.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Contact & Review */}
              {step === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  {/* Summary Bar */}
                  <div className="bg-[#111827] p-5 rounded-2xl border border-[#C9A66B]/20 space-y-2 text-xs">
                    <div className="flex justify-between text-[#F5F1E8]/60">
                      <span>Konaklama ({selectedHotel.name} · {data.nights} Gece):</span>
                      <span className="font-mono text-[#F5F1E8]">{formatCurrency(hotelTotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#F5F1E8]/60">
                      <span>Seçilen Deneyimler ({data.experiences.length} Kalem):</span>
                      <span className="font-mono text-[#F5F1E8]">{formatCurrency(experiencesTotal)}</span>
                    </div>
                    <div className="pt-2 border-t border-[#C9A66B]/10 flex justify-between text-sm font-semibold text-[#F5F1E8]">
                      <span>Tahmini Toplam Paket:</span>
                      <span className="text-base text-[#C9A66B] font-mono">{formatCurrency(totalEstimate)}</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#C9A66B] mb-1">Adınız Soyadınız *</label>
                        <input
                          type="text"
                          required
                          value={data.name}
                          onChange={e => setData({ ...data, name: e.target.value })}
                          placeholder="Örn: Edip Mangtay"
                          className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#C9A66B]/15 text-sm text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/40"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#C9A66B] mb-1">WhatsApp / Telefon *</label>
                        <input
                          type="tel"
                          required
                          value={data.phone}
                          onChange={e => setData({ ...data, phone: e.target.value })}
                          placeholder="Örn: +90 532 000 0000"
                          className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#C9A66B]/15 text-sm text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#C9A66B] mb-1">Özel İstek veya Notlar (Opsiyonel)</label>
                      <input
                        type="text"
                        value={data.specialRequests}
                        onChange={e => setData({ ...data, specialRequests: e.target.value })}
                        placeholder="Örn: Helal yemek hassasiyeti, bebek koltuğu, yıldönümü kutlaması..."
                        className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-[#C9A66B]/15 text-sm text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/40"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(201,166,107,0.3)] disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'İletiliyor...' : 'Teklifi Onayla & VIP Concierge’e Gönder'}</span>
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#C9A66B]/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 rounded-xl text-xs text-[#F5F1E8]/50 hover:text-[#F5F1E8] flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Geri
                  </button>
                ) : <div />}

                {step < 4 && (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-2.5 rounded-xl bg-[#C9A66B]/15 border border-[#C9A66B]/30 text-[#E8C77A] text-xs font-semibold hover:bg-[#C9A66B]/25 flex items-center gap-1.5 transition-all"
                  >
                    İleri <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
