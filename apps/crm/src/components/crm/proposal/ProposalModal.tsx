'use client';

import { Printer, X, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/types/crm';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripData: {
    customerName: string;
    title: string;
    dates: string;
    nights: number;
    pax: number;
    hotel: string;
    totalAmount: number;
    itinerary: { day: number; date: string; title: string; items: string[] }[];
  };
}

export default function ProposalModal({ isOpen, onClose, tripData }: ProposalModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070F]/80 backdrop-blur-md">
      {/* Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0B0F1A] border border-[#C9A66B]/30 rounded-3xl overflow-hidden flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
        {/* Modal Controls (Not printed) */}
        <div className="print:hidden flex items-center justify-between px-6 py-4 border-b border-[#C9A66B]/15 bg-[#111827]/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A66B]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#C9A66B]">
              VIP Seyahat Programı & Teklif Belgesi
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-all shadow-[0_0_15px_rgba(201,166,107,0.3)]"
            >
              <Printer className="w-3.5 h-3.5" /> Yazdır / PDF Olarak Kaydet
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#F5F1E8]/40 hover:text-[#F5F1E8] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Proposal Document Body */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 text-[#F5F1E8] print:p-0 print:bg-white print:text-black space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#C9A66B]/20 pb-6 print:border-black">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A66B] to-[#E8C77A] flex items-center justify-center font-serif font-bold text-[#05070F]">
                  T
                </div>
                <span className="text-xl font-serif tracking-[0.15em] font-bold">TRAVIA DUBAI</span>
              </div>
              <p className="text-xs text-[#C9A66B] font-mono tracking-widest uppercase">VIP Concierge & Luxury Operating System</p>
              <p className="text-[11px] text-[#F5F1E8]/40 print:text-gray-600 mt-1">DIFC Gate Precinct 4, Dubai, UAE · concierge@traviadubai.com</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30 print:text-gray-500">Teklif / Ref No</span>
              <p className="text-sm font-mono font-bold text-[#C9A66B]">TRV-VIP-2026-0812</p>
              <p className="text-xs text-[#F5F1E8]/40 print:text-gray-600 mt-1">Tarih: 27.08.2026</p>
            </div>
          </div>

          {/* Client & Trip Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#111827]/40 border border-[#C9A66B]/15 print:bg-gray-50 print:border-gray-300">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30 print:text-gray-500">Sayın Misafir</span>
              <p className="text-sm font-bold text-[#F5F1E8] print:text-black mt-0.5">{tripData.customerName}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30 print:text-gray-500">Seyahat Tarihleri</span>
              <p className="text-xs font-semibold text-[#F5F1E8] print:text-black mt-0.5">{tripData.dates} ({tripData.nights} Gece)</p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30 print:text-gray-500">Misafir Sayısı</span>
              <p className="text-xs font-semibold text-[#F5F1E8] print:text-black mt-0.5">{tripData.pax} Kişi</p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30 print:text-gray-500">Konaklama</span>
              <p className="text-xs font-semibold text-[#C9A66B] print:text-gray-900 mt-0.5">{tripData.hotel}</p>
            </div>
          </div>

          {/* Day by Day Program */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#C9A66B] print:text-black font-bold">
              Özel Seyahat Programı (Itinerary)
            </h3>
            <div className="space-y-3">
              {tripData.itinerary.map((day) => (
                <div key={day.day} className="p-4 rounded-xl bg-[#111827]/30 border border-[#C9A66B]/10 print:border-gray-200 print:bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#C9A66B] font-mono">Gün {day.day} · {day.date}</span>
                    <span className="text-xs font-semibold text-[#F5F1E8] print:text-black">{day.title}</span>
                  </div>
                  <ul className="space-y-1">
                    {day.items.map((item, idx) => (
                      <li key={idx} className="text-xs text-[#F5F1E8]/70 print:text-gray-700 flex items-center gap-2">
                        <span className="text-[#C9A66B]">✦</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Summary & Bank Wire */}
          <div className="pt-6 border-t border-[#C9A66B]/20 print:border-black grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30 print:text-gray-500">Banka Havalesi Bilgileri (UAE)</span>
              <div className="text-xs text-[#F5F1E8]/60 print:text-gray-700 space-y-1 mt-1 font-mono">
                <p>Banka: Emirates NBD (Dubai, UAE)</p>
                <p>Hesap Adı: TRAVIA TOURISM L.L.C</p>
                <p>IBAN: AE07 0260 0001 2345 6789 012</p>
                <p>SWIFT/BIC: EBILAEAD</p>
              </div>
            </div>

            <div className="text-right flex flex-col justify-end">
              <span className="text-[10px] font-mono uppercase text-[#F5F1E8]/30 print:text-gray-500">Toplam VIP Paket Bedeli</span>
              <p className="text-3xl font-serif font-bold text-[#C9A66B] print:text-black mt-1 font-mono">
                {formatCurrency(tripData.totalAmount)}
              </p>
              <p className="text-[10px] text-[#F5F1E8]/30 print:text-gray-500 mt-0.5">Tüm vergiler ve servis bedelleri dahildir.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
