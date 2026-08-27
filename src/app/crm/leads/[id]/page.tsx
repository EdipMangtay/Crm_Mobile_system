'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Phone, Mail, MessageCircle, Calendar, Users, DollarSign,
  TrendingUp, CheckCircle, XCircle, ArrowRight, Clock, Plus, Tag,
  FileText, Shield, UserCheck, Edit
} from 'lucide-react';
import Badge from '@/components/crm/ui/Badge';
import { LEAD_STAGES, COUNTRY_FLAGS, formatCurrency, type LeadStage } from '@/types/crm';

const DEMO_LEAD = {
  id: '1',
  first_name: 'Stefan',
  last_name: 'Müller',
  country: 'DE',
  phone: '+49 170 123 4567',
  whatsapp: '+491701234567',
  email: 'stefan.mueller@luxurytravel.de',
  travel_start_date: '2026-10-01',
  travel_end_date: '2026-10-07',
  pax_count: 6,
  travel_type: 'VIP Family & Friends',
  budget_range: '50,000 - 75,000 AED',
  stage: 'qualified' as LeadStage,
  estimated_value: 52000,
  currency: 'AED',
  source: 'Instagram Ad (Summer Campaign)',
  utm_campaign: 'dubai_luxury_october',
  assigned_to: 'Furkan Çelik',
  priority: 'high' as const,
  lead_score: 83,
  interests: ['Superyacht Charter', 'Fine Dining (Nobu/Zuma)', 'Desert Safari Royal Majlis', 'VIP Chauffeur Maybach'],
  notes: 'Misafir 6 kişilik özel yat ve çöl kampı deneyimi istiyor. Çocuklu aile, 2 çocuk var. Özel şefli villa veya süit konaklama araştırılıyor.',
  created_at: '2026-08-25T14:30:00Z',
};

const TIMELINE = [
  { time: '27 Ağu 14:15', title: 'Telefon Görüşmesi', desc: 'Furkan Çelik: Misafir ile 18 dk görüşüldü. Tarihler ve bütçe netleştirildi.', user: 'Furkan' },
  { time: '26 Ağu 11:00', title: 'Aşama Güncellendi', desc: 'Lead "Nitelikli (Qualified)" aşamasına taşındı.', user: 'Furkan' },
  { time: '25 Ağu 16:40', title: 'WhatsApp İletişimi', desc: 'Ön karşılama broşürü ve deneyim kataloğu iletildi.', user: 'Efza' },
  { time: '25 Ağu 14:30', title: 'Lead Oluşturuldu', desc: 'Instagram reklamı üzerinden web formu dolduruldu.', user: 'Sistem' },
];

export default function LeadDetailPage() {
  const [currentStage, setCurrentStage] = useState<LeadStage>(DEMO_LEAD.stage);
  const [noteInput, setNoteInput] = useState('');
  const [timeline, setTimeline] = useState(TIMELINE);

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    const newEntry = {
      time: 'Şimdi',
      title: 'Dahili Not Eklendi',
      desc: noteInput,
      user: 'Sen',
    };
    setTimeline([newEntry, ...timeline]);
    setNoteInput('');
  };

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Back link */}
      <Link href="/crm/leads" className="inline-flex items-center gap-1.5 text-xs text-[#F5F1E8]/40 hover:text-[#C9A66B] transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Leads Listesine Dön
      </Link>

      {/* Header card */}
      <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9A66B]/20 to-[#C9A66B]/5 border border-[#C9A66B]/20 flex items-center justify-center text-xl font-bold text-[#C9A66B]">
              {DEMO_LEAD.first_name[0]}{DEMO_LEAD.last_name[0]}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-[#F5F1E8] tracking-tight">
                  {DEMO_LEAD.first_name} {DEMO_LEAD.last_name}
                </h1>
                <span className="text-lg">{COUNTRY_FLAGS[DEMO_LEAD.country]}</span>
                <Badge variant="gold">VIP</Badge>
                <Badge variant="info">Skor: {DEMO_LEAD.lead_score}</Badge>
              </div>
              <p className="text-xs text-[#F5F1E8]/35 mt-1">
                Kaynak: {DEMO_LEAD.source} · Atanan Danışman: <span className="text-[#C9A66B]">{DEMO_LEAD.assigned_to}</span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${DEMO_LEAD.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a
              href={`tel:${DEMO_LEAD.phone}`}
              className="px-3.5 py-2 rounded-xl bg-[#111827] border border-[#C9A66B]/15 text-[#F5F1E8]/70 text-xs font-medium hover:text-[#F5F1E8] transition-all flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-[#C9A66B]" /> Ara
            </a>
            <button
              onClick={() => alert('Lead başarıyla Müşteriye dönüştürüldü! Müşteri 360 oluşturuldu.')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(201,166,107,0.2)]"
            >
              <UserCheck className="w-4 h-4" /> Müşteriye Dönüştür
            </button>
          </div>
        </div>

        {/* Pipeline stage progress tracker */}
        <div className="mt-6 pt-5 border-t border-[#C9A66B]/10">
          <p className="text-[10px] font-mono tracking-wider text-[#C9A66B] uppercase mb-2">Satış Aşaması</p>
          <div className="grid grid-cols-2 sm:grid-cols-7 gap-1.5">
            {LEAD_STAGES.map((s) => {
              const active = currentStage === s.value;
              return (
                <button
                  key={s.value}
                  onClick={() => setCurrentStage(s.value)}
                  className={`py-2 px-2 rounded-lg text-xs font-medium transition-all text-center ${
                    active
                      ? 'bg-[#C9A66B] text-[#05070F] shadow-[0_0_15px_rgba(201,166,107,0.3)] font-semibold'
                      : 'bg-[#111827] text-[#F5F1E8]/40 hover:text-[#F5F1E8]/70 hover:bg-[#111827]/80 border border-[#C9A66B]/5'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Lead Info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Key Parameters */}
          <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-[#F5F1E8] mb-4">Seyahat ve Talep Parametreleri</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#111827]/60 border border-[#C9A66B]/10 rounded-xl p-3.5">
                <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">Tahmini Değer</span>
                <p className="text-lg font-semibold text-[#C9A66B] mt-0.5">{formatCurrency(DEMO_LEAD.estimated_value)}</p>
              </div>
              <div className="bg-[#111827]/60 border border-[#C9A66B]/10 rounded-xl p-3.5">
                <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">Kişi Sayısı</span>
                <p className="text-lg font-semibold text-[#F5F1E8] mt-0.5">{DEMO_LEAD.pax_count} Misafir</p>
              </div>
              <div className="bg-[#111827]/60 border border-[#C9A66B]/10 rounded-xl p-3.5">
                <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">Giriş / Çıkış</span>
                <p className="text-xs font-semibold text-[#F5F1E8] mt-1.5">1-7 Ekim 2026</p>
              </div>
              <div className="bg-[#111827]/60 border border-[#C9A66B]/10 rounded-xl p-3.5">
                <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">Seyahat Tipi</span>
                <p className="text-xs font-semibold text-[#F5F1E8] mt-1.5">{DEMO_LEAD.travel_type}</p>
              </div>
            </div>

            {/* Requested Interests */}
            <div className="mt-5">
              <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">İlgilenilen Hizmetler</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {DEMO_LEAD.interests.map((interest, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-[#C9A66B]/10 border border-[#C9A66B]/20 text-[#E8C77A] text-xs font-medium">
                    ✦ {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mt-5 pt-4 border-t border-[#C9A66B]/5">
              <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">Müşteri Notu</span>
              <p className="text-xs text-[#F5F1E8]/60 mt-1 leading-relaxed bg-[#111827]/30 p-3.5 rounded-xl border border-[#C9A66B]/5">
                {DEMO_LEAD.notes}
              </p>
            </div>
          </div>

          {/* Timeline & Notes */}
          <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-[#F5F1E8] mb-4">Etkileşim ve Takip Günlüğü</h2>

            {/* Add note input */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                placeholder="Bu lead için not veya arama sonucu ekleyin..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#111827] border border-[#C9A66B]/15 text-xs text-[#F5F1E8] placeholder-[#F5F1E8]/20 focus:outline-none focus:border-[#C9A66B]/40"
              />
              <button
                onClick={handleAddNote}
                className="px-4 py-2.5 rounded-xl bg-[#C9A66B]/20 border border-[#C9A66B]/30 text-[#E8C77A] text-xs font-medium hover:bg-[#C9A66B]/30 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Ekle
              </button>
            </div>

            {/* Timeline list */}
            <div className="space-y-4">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#111827]/40 border border-[#C9A66B]/5">
                  <div className="w-2 h-2 rounded-full bg-[#C9A66B] mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#F5F1E8]">{item.title}</p>
                      <span className="text-[10px] font-mono text-[#F5F1E8]/25">{item.time}</span>
                    </div>
                    <p className="text-xs text-[#F5F1E8]/50 mt-0.5 leading-relaxed">{item.desc}</p>
                    <p className="text-[10px] text-[#C9A66B]/40 mt-1">Yetkili: {item.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Metadata */}
        <div className="space-y-5">
          <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#C9A66B]">İletişim Bilgileri</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#F5F1E8]/30">E-posta:</span>
                <span className="text-[#F5F1E8]/80 font-mono text-[11px]">{DEMO_LEAD.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#F5F1E8]/30">Telefon:</span>
                <span className="text-[#F5F1E8]/80 font-mono">{DEMO_LEAD.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#F5F1E8]/30">WhatsApp:</span>
                <span className="text-emerald-400 font-mono">{DEMO_LEAD.whatsapp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#F5F1E8]/30">Ülke:</span>
                <span className="text-[#F5F1E8]/80">Almanya (DE)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#C9A66B]">Pazarlama ve Atıf</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#F5F1E8]/30">Kampanya:</span>
                <span className="text-[#F5F1E8]/70">{DEMO_LEAD.utm_campaign}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#F5F1E8]/30">Kanal:</span>
                <span className="text-[#F5F1E8]/70">Meta Instagram Ads</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#F5F1E8]/30">Kayıt Tarihi:</span>
                <span className="text-[#F5F1E8]/70">25 Ağustos 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
