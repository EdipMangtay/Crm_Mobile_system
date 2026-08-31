'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Badge } from '@/components/crm';

const DEMO_REQUESTS = [
  { id: '1', customer: 'Edip Mangtay', category: 'Restoran', title: 'Nobu Dubai Akşam Yemeği Rezervasyonu', time: '13 Eyl 20:30', pax: 2, notes: 'Yıldönümü kutlaması için sessiz köşe masa ricası.', status: 'confirmed' as const, created_at: '27 Ağu 17:15' },
  { id: '2', customer: 'Edip Mangtay', category: 'Aktivite', title: 'Helikopter Şehir Turu Ekleme', time: '14 Eyl 11:00', pax: 2, notes: '22 Dakikalık Palm rotası, hava durumuna göre planlanması.', status: 'reviewing' as const, created_at: '27 Ağu 18:00' },
  { id: '3', customer: 'Selin Arslan', category: 'Transfer', title: 'Havalimanı Dönüş Transferi Saati Değişikliği', time: '23 Eyl 15:30', pax: 1, notes: 'Uçuş saati 2 saat ertelendi, transferin 17:30 yapılması ricası.', status: 'received' as const, created_at: '27 Ağu 18:40' },
  { id: '4', customer: 'Kerem Aydın', category: 'Çöl Safarisi', title: 'Çocuk Menüsü ve Özel Sandboarding Talebi', time: '16 Eyl 16:00', pax: 4, notes: '2 çocuk için kasksız kum kayağı ve mini buggy aracı.', status: 'received' as const, created_at: '27 Ağu 19:10' },
];

export default function RequestsPage() {
  const [requests, setRequests] = useState(DEMO_REQUESTS);

  const handleApprove = (id: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'confirmed' as const } : r));
  };

  return (
    <div className="space-y-5 max-w-[1600px]">
      <div>
        <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Misafir Talepleri (Customer Requests)</h1>
        <p className="text-xs text-[#F5F1E8]/30 mt-0.5">Mobil uygulama ve WhatsApp üzerinden gelen anlık concierge talepleri</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.map(req => (
          <div key={req.id} className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-5 hover:border-[#C9A66B]/25 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <Badge variant="gold" size="sm">{req.category}</Badge>
                <h3 className="text-sm font-semibold text-[#F5F1E8] mt-1.5">{req.title}</h3>
                <p className="text-xs text-[#C9A66B] mt-0.5">{req.customer} · {req.pax} Kişi</p>
              </div>
              <Badge variant={req.status === 'confirmed' ? 'success' : req.status === 'reviewing' ? 'warning' : 'info'}>
                {req.status === 'confirmed' ? 'Onaylandı' : req.status === 'reviewing' ? 'İnceleniyor' : 'Yeni Talep'}
              </Badge>
            </div>

            <p className="text-xs text-[#F5F1E8]/60 bg-[#111827]/40 p-3 rounded-xl border border-[#C9A66B]/5 mb-4 leading-relaxed">
              &quot;{req.notes}&quot;
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-[#C9A66B]/5">
              <span className="text-[10px] text-[#F5F1E8]/20 font-mono">Talep: {req.created_at} · Zaman: {req.time}</span>
              {req.status !== 'confirmed' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(req.id)}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] text-xs font-semibold hover:opacity-90 flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Onayla & Geziye Ekle
                  </button>
                </div>
              ) : (
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  ✓ Seyahat Planına Eklendi
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
