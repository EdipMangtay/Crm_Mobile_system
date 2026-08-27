'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft, Users, Plus, Key, Printer, AlertCircle
} from 'lucide-react';
import Badge from '@/components/crm/ui/Badge';
import ProposalModal from '@/crm/components/proposal/ProposalModal';
import { formatCurrency } from '@/types/crm';
import { traviaData } from '@/../shared/data/traviaData';

export default function TripDetailPage() {
  const params = useParams<{ id: string }>();
  const tripId = params?.id || '';

  const tripRecord = traviaData.getTrip(tripId);
  const customerRecord = tripRecord ? traviaData.getCustomer(tripRecord.customer_id) : null;

  const [selectedDay, setSelectedDay] = useState(1);
  const [isProposalOpen, setIsProposalOpen] = useState(false);

  if (!tripRecord) {
    return (
      <div className="space-y-5 max-w-[1400px]">
        <Link href="/crm/trips" className="inline-flex items-center gap-1.5 text-xs text-[#F5F1E8]/40 hover:text-[#C9A66B] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Geziler Listesine Dön
        </Link>
        <div className="bg-[#0B0F1A] border border-red-500/20 rounded-xl p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
          <h2 className="text-base font-semibold text-[#F5F1E8] mb-1">Gezi Bulunamadı</h2>
          <p className="text-xs text-[#F5F1E8]/40 mb-6 leading-relaxed">
            Aradığınız ID (<code className="text-[#C9A66B] font-mono">{tripId}</code>) ile eşleşen bir gezi kaydı bulunamadı.
          </p>
          <Link href="/crm/trips" className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#C9A66B] text-[#05070F] hover:bg-[#E8C77A] transition-colors inline-flex items-center gap-2">
            Geziler Listesine Dön
          </Link>
        </div>
      </div>
    );
  }

  const customerName = customerRecord ? `${customerRecord.first_name} ${customerRecord.last_name}` : 'Kayıtlı Misafir';
  const supplierCost = tripRecord.supplier_cost || Math.round(tripRecord.total_amount * 0.64);
  const grossContribution = tripRecord.gross_contribution || (tripRecord.total_amount - supplierCost);
  const marginPct = ((grossContribution / tripRecord.total_amount) * 100).toFixed(1);
  const paidAmount = tripRecord.total_amount > 20000 ? tripRecord.total_amount : 5000;
  const remainingAmount = Math.max(0, tripRecord.total_amount - paidAmount);

  const itineraryDays = [
    {
      day: 1,
      date: `${tripRecord.start_date} (1. Gün)`,
      title: "Dubai'ye Hoş Geldiniz & Otel Check-in",
      items: [
        { time: '09:10', title: 'Havalimanı Karşılama', desc: 'DXB Terminal 3 · VIP Marhaba Service', type: 'transfer', status: 'confirmed' },
        { time: '10:30', title: 'VIP Chauffeur Transfer', desc: 'Mercedes V-Class (Özel Şoför Tahsisli)', type: 'transfer', status: 'confirmed' },
        { time: '12:00', title: `${tripRecord.hotel_name} Check-in`, desc: 'VIP Karşılama & Süit Girişi', type: 'hotel', status: 'confirmed' },
        { time: '20:30', title: 'Akşam Yemeği Rezervasyonu', desc: 'DIFC · Masa rezervasyonu onaylandı', type: 'restaurant', status: 'confirmed' },
      ],
    },
    {
      day: 2,
      date: 'Eylül 2026 (2. Gün)',
      title: 'Özel Süperyat & Gün Batımı Seyri',
      items: [
        { time: '10:00', title: 'Özel Şehir Turu', desc: 'Mercedes S-Class & Türkçe Rehber', type: 'tour', status: 'confirmed' },
        { time: '14:00', title: 'Private Superyacht Sunset Cruise', desc: 'Majesty 56ft · Marina Yacht Club Pier 7', type: 'yacht', status: 'confirmed' },
        { time: '20:30', title: 'Fine Dining Akşam Yemeği', desc: 'Burj Al Arab manzaralı teras masa rezervasyonu', type: 'restaurant', status: 'confirmed' },
      ],
    },
    {
      day: 3,
      date: 'Eylül 2026 (3. Gün)',
      title: 'Kızıl Kum Tepeleri VIP Çöl Safarisi',
      items: [
        { time: '15:30', title: 'VIP Çöl Safarisi Alış', desc: 'Özel 4x4 Land Cruiser · Otel Lobisi', type: 'safari', status: 'confirmed' },
        { time: '18:00', title: 'Royal Majlis Kampı & Şahin Gösterisi', desc: 'Gurme Barbekü & Özel Çadır', type: 'safari', status: 'confirmed' },
      ],
    },
  ];

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Back link */}
      <Link href="/crm/trips" className="inline-flex items-center gap-1.5 text-xs text-[#F5F1E8]/40 hover:text-[#C9A66B] transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Geziler Listesine Dön
      </Link>

      {/* Header Card */}
      <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-[#F5F1E8] tracking-tight">{tripRecord.title}</h1>
              <Badge variant="info">Yaklaşan</Badge>
            </div>
            <p className="text-xs text-[#F5F1E8]/40 mt-1">
              Misafir: <Link href={`/crm/customers/${tripRecord.customer_id}`} className="text-[#C9A66B] hover:underline font-medium">{customerName}</Link> · {tripRecord.start_date} – {tripRecord.end_date} ({tripRecord.nights} Gece)
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsProposalOpen(true)}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#C9A66B]/20 to-[#C9A66B]/10 border border-[#C9A66B]/30 text-xs text-[#E8C77A] font-medium hover:bg-[#C9A66B]/25 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(201,166,107,0.15)]"
            >
              <Printer className="w-3.5 h-3.5 text-[#C9A66B]" /> Teklif & Voucher PDF
            </button>
            <button className="px-3 py-2 rounded-xl bg-[#111827] border border-[#C9A66B]/15 text-xs text-[#F5F1E8]/60 hover:text-[#F5F1E8] transition-all flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" /> Mobil Giriş Kodu
            </button>
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Rezervasyon Ekle
            </button>
          </div>
        </div>

        {/* Financial Margins Bar (Staff Only - PRD requirement) */}
        <div className="mt-6 pt-5 border-t border-[#C9A66B]/10 grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="bg-[#111827]/40 p-3.5 rounded-xl border border-[#C9A66B]/5">
            <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">Toplam Satış</span>
            <p className="text-lg font-semibold text-[#F5F1E8] mt-0.5">{formatCurrency(tripRecord.total_amount)}</p>
          </div>
          <div className="bg-[#111827]/40 p-3.5 rounded-xl border border-[#C9A66B]/5">
            <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">Tedarikçi Maliyeti</span>
            <p className="text-lg font-semibold text-rose-400/80 mt-0.5">{formatCurrency(supplierCost)}</p>
          </div>
          <div className="bg-[#111827]/40 p-3.5 rounded-xl border border-[#C9A66B]/5">
            <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">Brüt Katkı (Kâr)</span>
            <p className="text-lg font-semibold text-emerald-400 mt-0.5">{formatCurrency(grossContribution)}</p>
          </div>
          <div className="bg-[#111827]/40 p-3.5 rounded-xl border border-[#C9A66B]/5">
            <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">Kâr Marjı</span>
            <p className="text-lg font-semibold text-[#C9A66B] mt-0.5">%{marginPct}</p>
          </div>
          <div className="bg-[#111827]/40 p-3.5 rounded-xl border border-[#C9A66B]/5">
            <span className="text-[10px] text-[#F5F1E8]/30 font-mono uppercase">Kalan Tahsilat</span>
            <p className="text-lg font-semibold text-amber-400 mt-0.5">{formatCurrency(remainingAmount)}</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Days Navigation + Day Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Days Selector (Left Sidebar) */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-[#C9A66B] px-1 mb-2">Günlük Program</div>
          {itineraryDays.map((d) => (
            <button
              key={d.day}
              onClick={() => setSelectedDay(d.day)}
              className={`w-full text-left p-4 rounded-xl transition-all ${
                selectedDay === d.day
                  ? 'bg-[#C9A66B]/15 border border-[#C9A66B]/30 shadow-[0_0_15px_rgba(201,166,107,0.1)]'
                  : 'bg-[#0B0F1A] border border-[#C9A66B]/5 hover:border-[#C9A66B]/20 text-[#F5F1E8]/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#F5F1E8]">Gün {d.day}</span>
                <span className="text-[10px] font-mono text-[#F5F1E8]/30">{d.items.length} Aktivite</span>
              </div>
              <p className="text-xs text-[#F5F1E8]/40 mt-1 line-clamp-1">{d.title}</p>
            </button>
          ))}

          {/* Hotel Summary Card */}
          <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-xl p-4 mt-6">
            <span className="text-[10px] font-mono text-[#C9A66B] uppercase">Konaklama</span>
            <p className="text-sm font-semibold text-[#F5F1E8] mt-1">{tripRecord.hotel_name}</p>
            <p className="text-xs text-[#F5F1E8]/40 mt-0.5">{tripRecord.hotel_address || 'Dubai, BAE'}</p>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#C9A66B]/5 text-xs text-[#F5F1E8]/60">
              <Users className="w-3.5 h-3.5 text-[#C9A66B]" /> {tripRecord.pax_count} Misafir ({tripRecord.pax_label || 'VIP'})
            </div>
          </div>
        </div>

        {/* Selected Day Timeline (Right 3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {(() => {
            const currentDayData = itineraryDays.find(d => d.day === selectedDay) || itineraryDays[0];
            return (
              <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#C9A66B]/10 mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-[#F5F1E8]">{currentDayData.title}</h2>
                    <span className="text-xs text-[#C9A66B] font-mono">{currentDayData.date}</span>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-[#111827] border border-[#C9A66B]/20 text-xs text-[#C9A66B] hover:bg-[#C9A66B]/10 transition-all flex items-center gap-1.5">
                    <Plus className="w-3 h-3" /> Bu Güne Aktivite Ekle
                  </button>
                </div>

                {/* Timeline Items */}
                <div className="relative pl-6 space-y-6">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#C9A66B]/15" />
                  {currentDayData.items.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#0B0F1A] border-2 border-[#C9A66B] group-hover:scale-125 transition-transform" />
                      <div className="bg-[#111827]/40 border border-[#C9A66B]/5 rounded-xl p-4 hover:border-[#C9A66B]/20 transition-all">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-semibold text-[#C9A66B]">{item.time}</span>
                            <span className="text-xs font-semibold text-[#F5F1E8]">{item.title}</span>
                          </div>
                          <Badge variant="success" size="sm">Onaylandı</Badge>
                        </div>
                        <p className="text-xs text-[#F5F1E8]/50 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Proposal & Voucher Modal */}
      <ProposalModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        tripData={{
          customerName: customerName,
          title: tripRecord.title,
          hotel: tripRecord.hotel_name || 'Atlantis The Royal',
          dates: `${tripRecord.start_date} — ${tripRecord.end_date}`,
          nights: tripRecord.nights,
          pax: tripRecord.pax_count,
          totalAmount: tripRecord.total_amount,
          itinerary: itineraryDays.map(d => ({
            day: d.day,
            date: d.date,
            title: d.title,
            items: d.items.map(it => `${it.time} - ${it.title}`),
          })),
        }}
      />
    </div>
  );
}
