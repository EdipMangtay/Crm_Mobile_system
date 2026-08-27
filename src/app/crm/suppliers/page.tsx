'use client';

import { useState } from 'react';
import { Plus, Search, Truck, Star, Phone, Mail, CheckCircle2 } from 'lucide-react';
import Badge from '@/components/crm/ui/Badge';

const SUPPLIERS = [
  { id: '1', name: 'Marina Superyachts Charter LLC', category: 'Yat & Deniz', contact: 'Kaptan Tariq Al-Mansoor', phone: '+971 55 890 1234', email: 'charter@marinayachts.ae', rating: 4.9, terms: 'Net 15 Gün', status: 'active' },
  { id: '2', name: 'Al Futtaim Luxury Chauffeur Services', category: 'VIP Transfer', contact: 'Zayd Karim', phone: '+971 50 456 7890', email: 'dispatch@alfuttaimvip.ae', rating: 4.8, terms: 'Aylık Fatura', status: 'active' },
  { id: '3', name: 'Atlantis Resorts Dubai (The Royal & The Palm)', category: 'Otel & Restoran', contact: 'VIP Concierge Desk', phone: '+971 4 426 0000', email: 'vip@atlantisdubai.com', rating: 5.0, terms: 'Peşin / Depozit', status: 'active' },
  { id: '4', name: 'Royal Desert Safari Adventures', category: 'Çöl & Safari', contact: 'Hassan Mahmoud', phone: '+971 52 333 4455', email: 'bookings@royaldesertsafari.ae', rating: 4.7, terms: 'Net 7 Gün', status: 'active' },
  { id: '5', name: 'HeliDubai Aviation', category: 'Helikopter', contact: 'Operations Center', phone: '+971 4 208 1455', email: 'tours@helidubai.com', rating: 4.9, terms: 'Rezervasyonda %50', status: 'active' },
];

export default function SuppliersPage() {
  return (
    <div className="space-y-5 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Tedarikçiler (Suppliers Directory)</h1>
          <p className="text-xs text-[#F5F1E8]/30 mt-0.5">Yat, transfer, otel, helikopter ve safari iş ortakları</p>
        </div>
        <button className="px-3.5 py-1.5 text-xs rounded-lg bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] font-semibold flex items-center gap-1.5 hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Yeni Tedarikçi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SUPPLIERS.map(s => (
          <div key={s.id} className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-5 space-y-3 hover:border-[#C9A66B]/25 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="gold" size="sm">{s.category}</Badge>
                <h3 className="text-sm font-semibold text-[#F5F1E8] mt-1.5">{s.name}</h3>
              </div>
              <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {s.rating}
              </span>
            </div>

            <div className="text-xs text-[#F5F1E8]/50 space-y-1.5 pt-2 border-t border-[#C9A66B]/5">
              <p><span className="text-[#F5F1E8]/25">Yetkili:</span> {s.contact}</p>
              <p><span className="text-[#F5F1E8]/25">Telefon:</span> {s.phone}</p>
              <p><span className="text-[#F5F1E8]/25">Ödeme Koşulu:</span> {s.terms}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
