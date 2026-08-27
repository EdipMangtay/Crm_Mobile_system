'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Calendar, Users, MapPin, DollarSign, Clock, Shield,
  Car, Ship, Utensils, Compass, Sun, Plus, CheckCircle, FileText,
  Key, Share2, Printer
} from 'lucide-react';
import Badge from '@/components/crm/ui/Badge';
import { formatCurrency } from '@/types/crm';

const DEMO_TRIP = {
  id: 'f0000000-0000-0000-0000-000000000001',
  title: 'Travia Dubai — Premium Couple Experience',
  customer_name: 'Edip Mangtay',
  customer_id: 'd0000000-0000-0000-0000-000000000001',
  start_date: '2026-09-12',
  end_date: '2026-09-17',
  nights: 5,
  pax_count: 2,
  hotel_name: 'Atlantis The Royal',
  hotel_address: 'Crescent Rd, Palm Jumeirah, Dubai',
  total_amount: 18500,
  supplier_cost: 11800,
  gross_contribution: 6700,
  margin_pct: 36.2,
  paid_amount: 5000,
  remaining_amount: 13500,
  status: 'upcoming' as const,
};

const ITINERARY_DAYS = [
  {
    day: 1,
    date: '12 Eylül 2026',
    title: "Dubai'ye Hoş Geldiniz & Atlantis Check-in",
    items: [
      { time: '09:10', title: 'Havalimanı Karşılama', desc: 'DXB Terminal 3 · VIP Marhaba Service', type: 'transfer', status: 'confirmed' },
      { time: '10:30', title: 'VIP Chauffeur Transfer', desc: 'Mercedes V-Class (Şoför: Khalid Ahmed)', type: 'transfer', status: 'confirmed' },
      { time: '12:00', title: 'Atlantis The Royal Check-in', desc: 'Sky Pool Villa Giriş & Karşılama Şampanyası', type: 'hotel', status: 'confirmed' },
      { time: '20:30', title: 'Zuma Dubai Akşam Yemeği', desc: 'DIFC · Masa rezervasyonu onaylandı (2 PAX)', type: 'restaurant', status: 'confirmed' },
    ],
  },
  {
    day: 2,
    date: '13 Eylül 2026',
    title: 'Özel Süperyat & Nobu Teras Deneyimi',
    items: [
      { time: '10:00', title: 'Özel Şehir Turu', desc: 'Mercedes S-Class & Türkçe Rehber', type: 'tour', status: 'confirmed' },
      { time: '14:00', title: 'Private Superyacht Sunset Cruise', desc: 'Majesty 56ft · Marina Yacht Club Pier 7', type: 'yacht', status: 'confirmed' },
      { time: '20:30', title: 'Nobu Dubai Akşam Yemeği', desc: 'Burj Al Arab manzaralı teras masa rezervasyonu', type: 'restaurant', status: 'confirmed' },
    ],
  },
  {
    day: 3,
    date: '14 Eylül 2026',
    title: 'Kızıl Kum Tepeleri VIP Çöl Safarisi',
    items: [
      { time: '15:30', title: 'VIP Çöl Safarisi Alış', desc: 'Özel 4x4 Land Cruiser · Otel Lobisi', type: 'safari', status: 'confirmed' },
      { time: '18:00', title: 'Royal Majlis Kampı & Şahin Gösterisi', desc: 'Gurme Barbekü & Özel Çadır', type: 'safari', status: 'confirmed' },
    ],
  },
];

export default function TripDetailPage() {
  const [selectedDay, setSelectedDay] = useState(1);

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
              <h1 className="text-2xl font-semibold text-[#F5F1E8] tracking-tight">{DEMO_TRIP.title}</h1>
              <Badge variant="info">Yaklaşan</Badge>
            </div>
            <p className="text-xs text-[#F5F1E8]/40 mt-1">
              Misafir: <Link href={`/crm/customers/${DEMO_TRIP.customer_id}`} className="text-[#C9A66B] hover:underline font-medium">{DEMO_TRIP.customer_name}</Link> · {DEMO_TRIP.start_date} – {DEMO_TRIP.end_date} ({DEMO_TRIP.nights} Gece)
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-xl bg-[#111827] border border-[#C9A66B]/15 text-xs text-[#F5F1E8]/60 hover:text-[#F5F1E8] transition-all flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5" /> Voucher Yazdır
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
            <span className="text-[10px] font-mono text-[#F5F1E8]/30 uppercase">Paket Satış Bedeli</span>
            <p className="text-lg font-semibold text-[#F5F1E8] mt-0.5">{formatCurrency(DEMO_TRIP.total_amount)}</p>
          </div>
          <div className="bg-[#111827]/40 p-3.5 rounded-xl border border-[#C9A66B]/5">
            <span className="text-[10px] font-mono text-[#F5F1E8]/30 uppercase">Tedarikçi Maliyeti</span>
            <p className="text-lg font-semibold text-red-400/80 mt-0.5">{formatCurrency(DEMO_TRIP.supplier_cost)}</p>
          </div>
          <div className="bg-[#111827]/40 p-3.5 rounded-xl border border-[#C9A66B]/5">
            <span className="text-[10px] font-mono text-[#F5F1E8]/30 uppercase">Brüt Katkı (Kâr)</span>
            <p className="text-lg font-semibold text-emerald-400 mt-0.5">{formatCurrency(DEMO_TRIP.gross_contribution)}</p>
          </div>
          <div className="bg-[#111827]/40 p-3.5 rounded-xl border border-[#C9A66B]/5">
            <span className="text-[10px] font-mono text-[#F5F1E8]/30 uppercase">Brüt Marj %</span>
            <p className="text-lg font-semibold text-[#C9A66B] mt-0.5">%{DEMO_TRIP.margin_pct}</p>
          </div>
          <div className="bg-[#111827]/40 p-3.5 rounded-xl border border-[#C9A66B]/5">
            <span className="text-[10px] font-mono text-[#F5F1E8]/30 uppercase">Kalan Tahsilat</span>
            <p className="text-lg font-semibold text-amber-400 mt-0.5">{formatCurrency(DEMO_TRIP.remaining_amount)}</p>
          </div>
        </div>
      </div>

      {/* Itinerary Day-by-Day View */}
      <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-[#F5F1E8]">Seyahat Programı ve İtinerary (Gün Gün)</h2>
          <div className="flex gap-2">
            {ITINERARY_DAYS.map((d) => (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedDay === d.day
                    ? 'bg-[#C9A66B] text-[#05070F] font-semibold'
                    : 'bg-[#111827] text-[#F5F1E8]/50 hover:bg-[#111827]/80'
                }`}
              >
                Gün {d.day}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Day Items */}
        {ITINERARY_DAYS.filter((d) => d.day === selectedDay).map((d) => (
          <div key={d.day} className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#C9A66B]/5">
              <div>
                <p className="text-xs text-[#C9A66B] font-mono uppercase tracking-wider">Gün {d.day} · {d.date}</p>
                <p className="text-sm font-semibold text-[#F5F1E8] mt-0.5">{d.title}</p>
              </div>
            </div>

            <div className="space-y-3">
              {d.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-[#111827]/60 border border-[#C9A66B]/10 hover:border-[#C9A66B]/25 transition-all">
                  <span className="text-xs font-mono text-[#C9A66B] font-semibold w-12 shrink-0 mt-0.5">{item.time}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[#F5F1E8]">{item.title}</p>
                      <Badge variant="success" size="sm">Onaylandı</Badge>
                    </div>
                    <p className="text-xs text-[#F5F1E8]/40 mt-1">{item.desc}</p>
                  </div>
                  <button className="text-xs text-[#C9A66B]/60 hover:text-[#C9A66B] font-medium transition-colors">
                    Düzenle
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
