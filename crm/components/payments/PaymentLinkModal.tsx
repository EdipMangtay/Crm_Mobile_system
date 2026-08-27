'use client';

import { useState } from 'react';
import { CreditCard, Copy, Check, QrCode, X, Sparkles, MessageCircle, ExternalLink } from 'lucide-react';
import { formatCurrency } from '@/types/crm';

interface PaymentLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName?: string;
  amount?: number;
  description?: string;
}

export default function PaymentLinkModal({
  isOpen,
  onClose,
  customerName = 'Edip Mangtay',
  amount = 13500,
  description = 'Kalan Bakiye Tahsilatı — Travia Dubai Premium Couple',
}: PaymentLinkModalProps) {
  const [copied, setCopied] = useState(false);
  const payId = `TRV-${Math.floor(100000 + Math.random() * 900000)}`;
  const paymentUrl = `https://pay.traviadubai.com/checkout/${payId}`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = `Sayın ${customerName}, ${description} için güvenli 3D Secure ödeme bağlantınız: ${paymentUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070F]/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0B0F1A] border border-[#C9A66B]/25 rounded-3xl p-6 shadow-[0_20px_70px_rgba(0,0,0,0.8)] space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#C9A66B]/15">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C9A66B]/15 flex items-center justify-center text-[#C9A66B]">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F5F1E8]">Güvenli Ödeme Linki</h3>
              <p className="text-[10px] text-[#C9A66B] font-mono">3D Secure / Apple Pay / Visa / MC</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#F5F1E8]/40 hover:text-[#F5F1E8]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount & Customer Info */}
        <div className="bg-[#111827] p-4 rounded-2xl border border-[#C9A66B]/10 text-center space-y-1">
          <span className="text-[10px] text-[#F5F1E8]/40 uppercase font-mono tracking-wider">Tahsilat Tutarı</span>
          <p className="text-2xl font-serif font-bold text-[#C9A66B] font-mono">{formatCurrency(amount)}</p>
          <p className="text-xs text-[#F5F1E8]/70 mt-1">{customerName}</p>
          <p className="text-[11px] text-[#F5F1E8]/30">{description}</p>
        </div>

        {/* QR Code Simulation */}
        <div className="flex flex-col items-center justify-center py-2 space-y-2">
          <div className="w-36 h-36 bg-white p-3 rounded-2xl flex items-center justify-center shadow-lg">
            <div className="w-full h-full border-4 border-[#05070F] rounded-lg flex flex-col items-center justify-center p-2 text-center">
              <QrCode className="w-16 h-16 text-[#05070F]" />
              <span className="text-[8px] font-mono font-bold text-[#05070F] mt-1">{payId}</span>
            </div>
          </div>
          <span className="text-[10px] text-[#F5F1E8]/30 font-mono">Misafir kamerasıyla taratabilir</span>
        </div>

        {/* URL Input & Copy */}
        <div className="space-y-2">
          <label className="block text-[10px] font-mono uppercase text-[#C9A66B]">Ödeme Bağlantısı</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={paymentUrl}
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#111827] border border-[#C9A66B]/15 text-[#F5F1E8] font-mono select-all focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-2 rounded-xl bg-[#C9A66B]/15 border border-[#C9A66B]/30 text-xs text-[#E8C77A] font-medium hover:bg-[#C9A66B]/25 transition-all flex items-center gap-1 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleWhatsApp}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#05070F] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Müşteriye WhatsApp ile İlet</span>
          </button>
        </div>
      </div>
    </div>
  );
}
