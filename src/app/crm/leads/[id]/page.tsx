'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft, Phone, MessageCircle, Calendar, Plus, UserCheck, AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/crm';
import { LEAD_STAGES, COUNTRY_FLAGS, formatCurrency, type LeadStage } from '@/types';
import { traviaData } from '@/shared/data/traviaData';

export default function LeadDetailPage() {
  const params = useParams<{ id: string }>();
  const leadId = params?.id || '';

  const leadRecord = traviaData.getLead(leadId);

  const [currentStage, setCurrentStage] = useState<LeadStage>(
    (leadRecord?.stage as LeadStage) || 'new'
  );
  const [noteInput, setNoteInput] = useState('');
  const [timeline, setTimeline] = useState([
    { time: 'Bugün 14:15', title: 'İletişim Kuruldu', desc: `${leadRecord?.assigned_to || 'Danışman'}: Misafir ile görüşüldü. Tercihler güncellendi.`, user: leadRecord?.assigned_to?.split(' ')[0] || 'Deniz' },
    { time: '26 Ağu 11:00', title: 'Aşama Güncellendi', desc: `Lead "${leadRecord?.stage || 'new'}" aşamasında takip ediliyor.`, user: 'Sistem' },
    { time: '25 Ağu 14:30', title: 'Lead Oluşturuldu', desc: `${leadRecord?.source || 'Web Sitesi'} üzerinden kayıt alındı.`, user: 'Sistem' },
  ]);

  if (!leadRecord) {
    return (
      <div className="space-y-5 max-w-[1400px]">
        <Link href="/crm/leads" className="inline-flex items-center gap-1.5 text-xs text-[#F5F1E8]/40 hover:text-[#C9A66B] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Leads Listesine Dön
        </Link>
        <div className="bg-[#0B0F1A] border border-red-500/20 rounded-xl p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
          <h2 className="text-base font-semibold text-[#F5F1E8] mb-1">Lead Bulunamadı</h2>
          <p className="text-xs text-[#F5F1E8]/40 mb-6 leading-relaxed">
            Aradığınız ID (<code className="text-[#C9A66B] font-mono">{leadId}</code>) ile eşleşen bir potansiyel müşteri bulunamadı.
          </p>
          <Link href="/crm/leads" className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#C9A66B] text-[#05070F] hover:bg-[#E8C77A] transition-colors inline-flex items-center gap-2">
            Lead Havuzuna Dön
          </Link>
        </div>
      </div>
    );
  }

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
              {leadRecord.first_name[0]}{leadRecord.last_name[0]}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-[#F5F1E8] tracking-tight">
                  {leadRecord.first_name} {leadRecord.last_name}
                </h1>
                <span className="text-lg">{COUNTRY_FLAGS[leadRecord.country] || '🌐'}</span>
                <Badge variant="gold">VIP</Badge>
                <Badge variant="info">Skor: {leadRecord.lead_score}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#F5F1E8]/40">
                <span>Kaynak: <strong className="text-[#F5F1E8]/70 font-normal">{leadRecord.source}</strong></span>
                <span>•</span>
                <span>Oluşturulma: <strong className="text-[#F5F1E8]/70 font-normal">{leadRecord.created_at.split('T')[0]}</strong></span>
                <span>•</span>
                <span>Temsilci: <strong className="text-[#C9A66B] font-normal">{leadRecord.assigned_to}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${(leadRecord.whatsapp || leadRecord.phone || '').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a
              href={`tel:${leadRecord.phone}`}
              className="px-3.5 py-2 rounded-xl bg-[#111827] border border-[#C9A66B]/15 text-[#F5F1E8]/70 text-xs font-medium hover:bg-[#111827]/80 hover:text-[#F5F1E8] transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> Ara
            </a>
            <Link
              href={`/crm/customers/d0000000-0000-0000-0000-000000000001`}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_20px_rgba(201,166,107,0.2)]"
            >
              <UserCheck className="w-4 h-4" /> Müşteriye Dönüştür
            </Link>
          </div>
        </div>

        {/* Pipeline Stage Bar */}
        <div className="mt-8 pt-6 border-t border-[#C9A66B]/10">
          <div className="text-xs font-mono uppercase tracking-wider text-[#F5F1E8]/30 mb-3">Satış Hunisi (Pipeline)</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {LEAD_STAGES.map((stg) => {
              const isActive = currentStage === stg.value;
              return (
                <button
                  key={stg.value}
                  onClick={() => setCurrentStage(stg.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium text-center transition-all ${
                    isActive
                      ? 'bg-[#C9A66B] text-[#05070F] font-semibold shadow-[0_0_15px_rgba(201,166,107,0.3)]'
                      : 'bg-[#111827]/60 border border-[#C9A66B]/10 text-[#F5F1E8]/40 hover:border-[#C9A66B]/30 hover:text-[#F5F1E8]/80'
                  }`}
                >
                  {stg.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trip Request Box */}
          <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-[#F5F1E8] mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C9A66B]" /> Seyahat Tercihleri ve Bütçe
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#111827]/60 border border-[#C9A66B]/10 rounded-xl p-3.5">
                <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">Tahmini Değer</span>
                <p className="text-lg font-semibold text-[#C9A66B] mt-0.5">{formatCurrency(leadRecord.estimated_value)}</p>
              </div>
              <div className="bg-[#111827]/60 border border-[#C9A66B]/10 rounded-xl p-3.5">
                <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">Kişi Sayısı</span>
                <p className="text-lg font-semibold text-[#F5F1E8] mt-0.5">{leadRecord.pax_count} Misafir</p>
              </div>
              <div className="bg-[#111827]/60 border border-[#C9A66B]/10 rounded-xl p-3.5">
                <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">Tarihler</span>
                <p className="text-xs font-semibold text-[#F5F1E8] mt-1.5">{leadRecord.travel_start_date} — {leadRecord.travel_end_date}</p>
              </div>
              <div className="bg-[#111827]/60 border border-[#C9A66B]/10 rounded-xl p-3.5">
                <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">Seyahat Tipi</span>
                <p className="text-xs font-semibold text-[#F5F1E8] mt-1.5">{leadRecord.travel_type}</p>
              </div>
            </div>

            {/* Requested Interests */}
            <div className="mt-5">
              <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">İlgilenilen Hizmetler</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {leadRecord.interests.map((interest, i) => (
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
                {leadRecord.notes || 'Özel not belirtilmemiş.'}
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
                <span className="text-[#F5F1E8]/80 font-mono text-[11px]">{leadRecord.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#F5F1E8]/30">Telefon:</span>
                <span className="text-[#F5F1E8]/80 font-mono">{leadRecord.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#F5F1E8]/30">WhatsApp:</span>
                <span className="text-emerald-400 font-mono">{leadRecord.whatsapp || leadRecord.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#F5F1E8]/30">Ülke:</span>
                <span className="text-[#F5F1E8]/80">{leadRecord.country}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#C9A66B]">Pazarlama ve Atıf</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#F5F1E8]/30">Kampanya:</span>
                <span className="text-[#F5F1E8]/70">{leadRecord.utm_campaign || 'Doğrudan Başvuru'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#F5F1E8]/30">Kanal:</span>
                <span className="text-[#F5F1E8]/70">{leadRecord.source}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#F5F1E8]/30">Kayıt Tarihi:</span>
                <span className="text-[#F5F1E8]/70">{leadRecord.created_at.split('T')[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
