'use client';

import { formatCurrency } from '@/types';

const CAMPAIGNS = [
  { id: '1', name: 'Meta Instagram VIP Couples Ad', spend: 6500, leads: 24, bookings: 7, revenue: 129500, roas: '19.9x' },
  { id: '2', name: 'Google Search "Dubai Luxury Concierge"', spend: 4800, leads: 14, bookings: 4, revenue: 74000, roas: '15.4x' },
  { id: '3', name: 'Alman & İsviçre UHNW Hedefleme', spend: 3200, leads: 9, bookings: 2, revenue: 68000, roas: '21.2x' },
  { id: '4', name: 'VIP Referral & Influencer Programı', spend: 2000, leads: 8, bookings: 4, revenue: 64000, roas: '32.0x' },
];

export default function MarketingPage() {
  return (
    <div className="space-y-5 max-w-[1600px]">
      <div>
        <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Pazarlama & Atıf (Marketing Attribution)</h1>
        <p className="text-xs text-[#F5F1E8]/30 mt-0.5">Reklam harcamaları, ROAS analizi ve lead kaynak performansları</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-5">
          <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30">Toplam Harcama</span>
          <p className="text-xl font-semibold text-[#F5F1E8] mt-1">16,500 AED</p>
        </div>
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-5">
          <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30">Üretilen Gelir</span>
          <p className="text-xl font-semibold text-emerald-400 mt-1">335,500 AED</p>
        </div>
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-5">
          <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30">Ortalama ROAS</span>
          <p className="text-xl font-semibold text-[#C9A66B] mt-1">20.3x</p>
        </div>
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-5">
          <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30">Lead Başına Maliyet</span>
          <p className="text-xl font-semibold text-[#F5F1E8] mt-1">295 AED</p>
        </div>
      </div>

      <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#C9A66B]/8">
              {['Kampanya / Kanal', 'Harcama', 'Lead Sayısı', 'Rezervasyon', 'Oluşan Gelir', 'ROAS'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-mono tracking-wider text-[#F5F1E8]/25 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C9A66B]/5">
            {CAMPAIGNS.map(c => (
              <tr key={c.id} className="hover:bg-[#F5F1E8]/[0.01] transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-[#F5F1E8]/90">{c.name}</td>
                <td className="px-4 py-3 text-xs font-mono text-red-400/80">{formatCurrency(c.spend)}</td>
                <td className="px-4 py-3 text-xs text-[#F5F1E8]/70 font-semibold">{c.leads}</td>
                <td className="px-4 py-3 text-xs text-emerald-400 font-semibold">{c.bookings}</td>
                <td className="px-4 py-3 text-xs font-mono text-[#F5F1E8]">{formatCurrency(c.revenue)}</td>
                <td className="px-4 py-3 text-xs font-mono text-[#C9A66B] font-bold">{c.roas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
