'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft, Phone, MessageCircle, Mail, Key, Edit, AlertCircle
} from 'lucide-react';
import Badge from '@/components/crm/ui/Badge';
import { formatCurrency, COUNTRY_FLAGS } from '@/types/crm';
import { traviaData } from '@/../shared/data/traviaData';

const TABS = ['Genel', 'Geziler', 'Rezervasyonlar', 'Concierge', 'Talepler', 'Ödemeler', 'Belgeler', 'Tercihler', 'Aktivite', 'Dahili'] as const;

export default function Customer360Page() {
  const params = useParams<{ id: string }>();
  const customerId = params?.id || '';
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Genel');

  // Dynamically resolve customer from centralized repository
  const customerRecord = traviaData.getCustomer(customerId);
  const tripRecord = customerRecord ? (traviaData.getTrip(customerRecord.id) || traviaData.getTripByCustomer(customerRecord.id)) : null;

  if (!customerRecord) {
    return (
      <div className="space-y-5 max-w-[1600px]">
        <Link href="/crm/customers" className="inline-flex items-center gap-1.5 text-xs text-[#F5F1E8]/30 hover:text-[#C9A66B] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Müşteriler Listesine Dön
        </Link>
        <div className="bg-[#0B0F1A] border border-red-500/20 rounded-xl p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
          <h2 className="text-base font-semibold text-[#F5F1E8] mb-1">Müşteri Kaydı Bulunamadı</h2>
          <p className="text-xs text-[#F5F1E8]/40 mb-6 leading-relaxed">
            Aradığınız ID (<code className="text-[#C9A66B] font-mono">{customerId}</code>) ile eşleşen bir müşteri kaydı bulunamadı.
          </p>
          <Link href="/crm/customers" className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#C9A66B] text-[#05070F] hover:bg-[#E8C77A] transition-colors inline-flex items-center gap-2">
            Müşteri Listesine Git
          </Link>
        </div>
      </div>
    );
  }

  const currentTrip = tripRecord ? {
    id: tripRecord.id,
    title: tripRecord.title,
    dates: `${tripRecord.start_date} — ${tripRecord.end_date}`,
    hotel: tripRecord.hotel_name || 'Belirlenmedi',
    pax: tripRecord.pax_count,
    total: tripRecord.total_amount,
    paid: tripRecord.total_amount > 20000 ? tripRecord.total_amount : 5000,
    remaining: tripRecord.total_amount > 20000 ? 0 : Math.max(0, tripRecord.total_amount - 5000),
  } : null;

  const activityLog = [
    { time: '27 Ağu 2026 14:00', action: 'Ödeme alındı', detail: `${formatCurrency(currentTrip?.paid || 5000)} · Banka Havalesi`, type: 'payment' },
    { time: '27 Ağu 2026 12:00', action: 'Mobil erişim oluşturuldu', detail: `Kullanıcı: ${customerRecord.first_name.toLowerCase()}.demo`, type: 'access' },
    { time: '26 Ağu 2026 18:00', action: 'Gezi oluşturuldu', detail: `${currentTrip?.title || 'Dubai VIP Deneyimi'} · ${formatCurrency(customerRecord.lifetime_value || 18500)}`, type: 'trip' },
    { time: '25 Ağu 2026 15:30', action: 'Lead dönüştürüldü', detail: 'Müşteri kaydı oluşturuldu', type: 'lead' },
  ];

  return (
    <div className="space-y-5 max-w-[1600px]">
      {/* Back */}
      <Link href="/crm/customers" className="inline-flex items-center gap-1.5 text-xs text-[#F5F1E8]/30 hover:text-[#C9A66B] transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Müşteriler
      </Link>

      {/* Customer Header */}
      <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A66B]/20 to-[#C9A66B]/5 border border-[#C9A66B]/20 flex items-center justify-center shrink-0">
              <span className="text-lg font-semibold text-[#C9A66B]">{customerRecord.first_name[0]}{customerRecord.last_name[0]}</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-semibold text-[#F5F1E8]">{customerRecord.first_name} {customerRecord.last_name}</h1>
                <span className="text-lg">{COUNTRY_FLAGS[customerRecord.country] || '🌐'}</span>
                <Badge variant="gold">VIP</Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#F5F1E8]/30">
                <span>{customerRecord.tags?.[1] || 'VIP Misafir'}</span>
                <span>·</span>
                <span>Müşteri: Ağu 2026</span>
                <span>·</span>
                <span>Yönetici: Furkan Çelik</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {(customerRecord.tags || ['VIP', 'Luxury']).map(tag => (
                  <Badge key={tag} variant={tag === 'VIP' ? 'gold' : tag === 'Booked' ? 'success' : 'default'} size="sm">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <a href={`https://wa.me/${(customerRecord.whatsapp || customerRecord.phone || '').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors" title="WhatsApp">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href={`tel:${customerRecord.phone}`} className="p-2 rounded-lg bg-[#111827] text-[#F5F1E8]/40 hover:text-[#F5F1E8]/60 transition-colors" title="Ara">
              <Phone className="w-4 h-4" />
            </a>
            <a href={`mailto:${customerRecord.email}`} className="p-2 rounded-lg bg-[#111827] text-[#F5F1E8]/40 hover:text-[#F5F1E8]/60 transition-colors" title="E-posta">
              <Mail className="w-4 h-4" />
            </a>
            <button className="px-3 py-2 rounded-lg bg-[#111827] border border-[#C9A66B]/10 text-xs text-[#F5F1E8]/40 hover:text-[#F5F1E8]/60 transition-colors flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" /> Mobil Erişim
            </button>
            <button className="p-2 rounded-lg bg-[#111827] text-[#F5F1E8]/40 hover:text-[#F5F1E8]/60 transition-colors">
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lifetime Value Bar */}
        <div className="mt-5 pt-4 border-t border-[#C9A66B]/5 grid grid-cols-4 gap-6">
          <div>
            <span className="text-[10px] font-mono text-[#F5F1E8]/25 uppercase tracking-wider">Yaşam Boyu Gelir</span>
            <p className="text-lg font-semibold text-[#C9A66B] mt-0.5">{formatCurrency(customerRecord.lifetime_value || 18500)}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#F5F1E8]/25 uppercase tracking-wider">Toplam Gezi</span>
            <p className="text-lg font-semibold text-[#F5F1E8] mt-0.5">{currentTrip ? 1 : 0}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#F5F1E8]/25 uppercase tracking-wider">Ödenen</span>
            <p className="text-lg font-semibold text-emerald-400 mt-0.5">{formatCurrency(currentTrip?.paid || 0)}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#F5F1E8]/25 uppercase tracking-wider">Kalan Bakiye</span>
            <p className="text-lg font-semibold text-amber-400 mt-0.5">{formatCurrency(currentTrip?.remaining || 0)}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-[#C9A66B]/10 text-[#E8C77A] border border-[#C9A66B]/20'
                : 'text-[#F5F1E8]/35 hover:text-[#F5F1E8]/55 hover:bg-[#F5F1E8]/[0.02]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Genel' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Current Trip */}
          <div className="lg:col-span-2 bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl p-5">
            <h3 className="text-sm font-medium text-[#F5F1E8] mb-4">Mevcut Gezi</h3>
            {currentTrip ? (
              <Link href={`/crm/trips/${currentTrip.id}`} className="block bg-[#111827]/50 border border-[#C9A66B]/10 rounded-xl p-4 hover:border-[#C9A66B]/25 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-[#F5F1E8]/80 font-medium">{currentTrip.title}</p>
                    <p className="text-xs text-[#F5F1E8]/30 mt-0.5">{currentTrip.dates}</p>
                  </div>
                  <Badge variant="info">Yaklaşan</Badge>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-[10px] text-[#F5F1E8]/25 uppercase">Otel</p>
                    <p className="text-xs text-[#F5F1E8]/60 mt-0.5">{currentTrip.hotel}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#F5F1E8]/25 uppercase">PAX</p>
                    <p className="text-xs text-[#F5F1E8]/60 mt-0.5">{currentTrip.pax} kişi</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#F5F1E8]/25 uppercase">Toplam</p>
                    <p className="text-xs text-[#C9A66B] mt-0.5">{formatCurrency(currentTrip.total)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#F5F1E8]/25 uppercase">Kalan</p>
                    <p className="text-xs text-amber-400 mt-0.5">{formatCurrency(currentTrip.remaining)}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="p-8 text-center bg-[#111827]/30 rounded-xl border border-[#C9A66B]/5">
                <p className="text-xs text-[#F5F1E8]/40">Bu müşteri için henüz tanımlanmış aktif bir gezi bulunmuyor.</p>
              </div>
            )}
          </div>

          {/* Contact & Preferences */}
          <div className="space-y-4">
            <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl p-5">
              <h3 className="text-sm font-medium text-[#F5F1E8] mb-3">İletişim</h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-[#F5F1E8]/40"><Phone className="w-3.5 h-3.5 text-[#C9A66B]/40" />{customerRecord.phone}</div>
                <div className="flex items-center gap-2 text-[#F5F1E8]/40"><Mail className="w-3.5 h-3.5 text-[#C9A66B]/40" />{customerRecord.email}</div>
                <div className="flex items-center gap-2 text-[#F5F1E8]/40"><MessageCircle className="w-3.5 h-3.5 text-green-400/40" />{customerRecord.whatsapp || customerRecord.phone}</div>
              </div>
            </div>
            <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl p-5">
              <h3 className="text-sm font-medium text-[#F5F1E8] mb-3">Tercihler</h3>
              <div className="flex flex-wrap gap-1.5">
                {(customerRecord.tags || ['Luxury', 'VIP']).map(pref => (
                  <Badge key={pref} variant="gold" size="sm">{pref}</Badge>
                ))}
              </div>
            </div>
            <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl p-5">
              <h3 className="text-sm font-medium text-[#F5F1E8] mb-3">Notlar</h3>
              <p className="text-xs text-[#F5F1E8]/40 leading-relaxed">{customerRecord.notes || 'Özel bir not bulunmuyor.'}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Aktivite' && (
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#C9A66B]/8">
            <h3 className="text-sm font-medium text-[#F5F1E8]">Aktivite Zaman Çizelgesi</h3>
          </div>
          <div className="p-5">
            <div className="relative pl-6 space-y-6">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#C9A66B]/10" />
              {activityLog.map((activity, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#111827] border-2 border-[#C9A66B]/30" />
                  <div>
                    <p className="text-xs text-[#F5F1E8]/60">{activity.action}</p>
                    <p className="text-xs text-[#F5F1E8]/25 mt-0.5">{activity.detail}</p>
                    <p className="text-[10px] text-[#F5F1E8]/15 mt-1 font-mono">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for other tabs */}
      {!['Genel', 'Aktivite'].includes(activeTab) && (
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl p-12 text-center">
          <p className="text-sm text-[#F5F1E8]/30">{activeTab} sekmesi — veritabanı bağlantısıyla aktif olacak</p>
        </div>
      )}
    </div>
  );
}
