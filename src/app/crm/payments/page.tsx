'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, ArrowDownRight, ArrowUpRight, Download, Filter, Plus } from 'lucide-react';
import Badge from '@/components/crm/ui/Badge';
import PaymentLinkModal from '@/crm/components/payments/PaymentLinkModal';
import { exportToCsv } from '@/crm/utils/exportCsv';
import { formatCurrency } from '@/types/crm';

const PAYMENTS = [
  { id: 'pay-1', customer: 'Edip Mangtay', trip: 'Travia Dubai — Premium Couple', amount: 5000, method: 'Banka Havalesi (EFT)', status: 'received' as const, date: '27 Ağu 2026 14:00', ref: 'TRV-2026-0812' },
  { id: 'pay-2', customer: 'Edip Mangtay', trip: 'Travia Dubai — Premium Couple', amount: 13500, method: 'Kredi Kartı / Otel', status: 'pending' as const, date: '12 Eyl 2026', ref: 'TRV-2026-0813' },
  { id: 'pay-3', customer: 'Ahmet Yılmaz', trip: 'Dubai Luxury Family', amount: 42000, method: 'Stripe Kredi Kartı', status: 'received' as const, date: '25 Ağu 2026 11:20', ref: 'TRV-2026-0798' },
  { id: 'pay-4', customer: 'Canan Özdemir', trip: 'VIP Solo Retreat', amount: 10800, method: 'Banka Havalesi', status: 'received' as const, date: '24 Ağu 2026 16:45', ref: 'TRV-2026-0785' },
  { id: 'pay-5', customer: 'Canan Özdemir', trip: 'VIP Solo Retreat', amount: 4200, method: 'Nakit / Havalimanı', status: 'pending' as const, date: '18 Eyl 2026', ref: 'TRV-2026-0786' },
  { id: 'pay-6', customer: 'Fatma Demir', trip: 'Solo Shopping & Dubai Mall', amount: 3500, method: 'Kredi Kartı', status: 'refunded' as const, date: '23 Ağu 2026 10:15', ref: 'TRV-2026-0770' },
];

const PAYMENT_STATUS_MAP: Record<string, { label: string; variant: 'success' | 'warning' | 'error' | 'default' }> = {
  received: { label: 'Tahsil Edildi', variant: 'success' },
  pending: { label: 'Bekliyor', variant: 'warning' },
  refunded: { label: 'İade Edildi', variant: 'error' },
  cancelled: { label: 'İptal', variant: 'default' },
};

export default function PaymentsPage() {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  return (
    <div className="space-y-5 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Finans & Ödemeler (Payments Ledger)</h1>
          <p className="text-xs text-[#F5F1E8]/30 mt-0.5">Gelir tahsilatları, bekleyen bakiyeler ve kaporalar</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToCsv('travia_payments', PAYMENTS, [
              { header: 'Referans', key: 'ref' },
              { header: 'Müşteri', key: 'customer' },
              { header: 'Paket / Gezi', key: 'trip' },
              { header: 'Ödeme Yöntemi', key: 'method' },
              { header: 'Tarih', key: 'date' },
              { header: 'Tutar (AED)', key: 'amount' },
              { header: 'Durum', key: 'status' },
            ])}
            className="px-3 py-1.5 text-xs rounded-lg bg-[#111827] border border-[#C9A66B]/15 text-[#F5F1E8]/60 hover:text-[#F5F1E8] transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Finans Raporu (CSV)
          </button>
          <button
            onClick={() => setIsLinkModalOpen(true)}
            className="px-3.5 py-1.5 text-xs rounded-lg bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] font-semibold flex items-center gap-1.5 hover:opacity-90 shadow-[0_0_15px_rgba(201,166,107,0.2)]"
          >
            <Plus className="w-3.5 h-3.5" /> Ödeme Linki Üret
          </button>
        </div>
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
                  {(() => {
                    const stg = PAYMENT_STATUS_MAP[p.status] || { label: p.status, variant: 'default' as const };
                    return <Badge variant={stg.variant}>{stg.label}</Badge>;
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Link Generator Modal */}
      <PaymentLinkModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        customerName="Edip Mangtay"
        amount={13500}
        description="Kalan Bakiye Tahsilatı — Travia Dubai Premium Couple"
      />
    </div>
  );
}
