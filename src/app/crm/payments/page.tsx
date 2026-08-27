'use client';

import { DollarSign, TrendingUp, CreditCard, ArrowDownRight, ArrowUpRight, Download, Filter } from 'lucide-react';
import Badge from '@/components/crm/ui/Badge';
import { formatCurrency } from '@/types/crm';

const PAYMENTS = [
  { id: 'pay-1', customer: 'Edip Mangtay', trip: 'Travia Dubai — Premium Couple', amount: 5000, method: 'Banka Havalesi (EFT)', status: 'received' as const, date: '27 Ağu 2026 14:00', ref: 'TRV-2026-0812' },
  { id: 'pay-2', customer: 'Edip Mangtay', trip: 'Travia Dubai — Premium Couple', amount: 13500, method: 'Kredi Kartı / Otel', status: 'pending' as const, date: '12 Eyl 2026', ref: 'TRV-2026-0813' },
  { id: 'pay-3', customer: 'Ahmet Yılmaz', trip: 'Dubai Luxury Family', amount: 42000, method: 'Stripe Kredi Kartı', status: 'received' as const, date: '25 Ağu 2026 11:20', ref: 'TRV-2026-0798' },
  { id: 'pay-4', customer: 'Canan Özdemir', trip: 'VIP Solo Retreat', amount: 10800, method: 'Banka Havalesi', status: 'received' as const, date: '24 Ağu 2026 16:45', ref: 'TRV-2026-0785' },
  { id: 'pay-5', customer: 'Canan Özdemir', trip: 'VIP Solo Retreat', amount: 4200, method: 'Nakit / Havalimanı', status: 'pending' as const, date: '18 Eyl 2026', ref: 'TRV-2026-0786' },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-5 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Finans & Ödemeler (Payments Ledger)</h1>
          <p className="text-xs text-[#F5F1E8]/30 mt-0.5">Gelir tahsilatları, bekleyen bakiyeler ve kaporalar</p>
        </div>
        <button className="px-3 py-1.5 text-xs rounded-lg bg-[#111827] border border-[#C9A66B]/15 text-[#F5F1E8]/60 hover:text-[#F5F1E8] transition-all flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" /> Finans Raporu (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-5">
          <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30">Toplam Ciro</span>
          <p className="text-xl font-semibold text-[#F5F1E8] mt-1">247,500 AED</p>
        </div>
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-5">
          <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30">Tahsil Edilen</span>
          <p className="text-xl font-semibold text-emerald-400 mt-1">205,200 AED</p>
        </div>
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-5">
          <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30">Bekleyen Bakiye</span>
          <p className="text-xl font-semibold text-amber-400 mt-1">42,300 AED</p>
        </div>
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-5">
          <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30">Brüt Marj Ortalama</span>
          <p className="text-xl font-semibold text-[#C9A66B] mt-1">%36.0</p>
        </div>
      </div>

      <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#C9A66B]/8">
              {['İşlem Referansı', 'Misafir / Paket', 'Ödeme Yöntemi', 'Tarih', 'Tutar', 'Durum'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-mono tracking-wider text-[#F5F1E8]/25 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C9A66B]/5">
            {PAYMENTS.map(p => (
              <tr key={p.id} className="hover:bg-[#F5F1E8]/[0.01] transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-[#C9A66B]">{p.ref}</td>
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-[#F5F1E8]/80">{p.customer}</p>
                  <p className="text-xs text-[#F5F1E8]/30">{p.trip}</p>
                </td>
                <td className="px-4 py-3 text-xs text-[#F5F1E8]/50">{p.method}</td>
                <td className="px-4 py-3 text-xs text-[#F5F1E8]/40">{p.date}</td>
                <td className="px-4 py-3 text-sm font-mono font-semibold text-[#F5F1E8]">{formatCurrency(p.amount)}</td>
                <td className="px-4 py-3">
                  <Badge variant={p.status === 'received' ? 'success' : 'warning'}>
                    {p.status === 'received' ? 'Tahsil Edildi' : 'Bekliyor'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
