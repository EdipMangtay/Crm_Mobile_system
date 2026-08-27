'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Phone, MessageCircle, Mail, Calendar, MapPin, CreditCard,
  Star, User, Plane, Ship, Utensils, Clock, FileText, Heart, Shield,
  Plus, Edit, Key, ChevronRight
} from 'lucide-react';
import Badge from '@/components/crm/ui/Badge';
import KPICard from '@/components/crm/ui/KPICard';
import { formatCurrency, COUNTRY_FLAGS, PREFERENCE_CATEGORIES } from '@/types/crm';

const TABS = ['Genel', 'Geziler', 'Rezervasyonlar', 'Concierge', 'Talepler', 'Ödemeler', 'Belgeler', 'Tercihler', 'Aktivite', 'Dahili'] as const;

// Demo customer
const CUSTOMER = {
  id: 'd0000000-0000-0000-0000-000000000001',
  first_name: 'Edip', last_name: 'Mangtay',
  country: 'TR', preferred_language: 'tr',
  email: 'edip@email.com', phone: '+90 532 000 0000', whatsapp: '+905320000000',
  tags: ['VIP', 'Couple', 'Luxury', 'Booked'],
  notes: 'VIP misafir, fine dining ve lüks yat deneyimlerine özel ilgi gösteriyor.',
  assigned_manager: 'Furkan',
  customer_since: '2026-08-20',
  lifetime_value: 18500,
  trips_count: 1,
  current_trip: {
    id: 'f0000000-0000-0000-0000-000000000001',
    title: 'Travia Dubai — Premium Couple',
    dates: '12-17 Eylül 2026',
    hotel: 'Atlantis The Royal',
    pax: 2,
    total: 18500,
    paid: 5000,
    remaining: 13500,
    status: 'upcoming' as const,
  },
  preferences: ['Luxury', 'Fine Dining', 'Yacht', 'Beach Club', 'Couple'],
  has_mobile_access: true,
};

const ACTIVITY_LOG = [
  { time: '27 Ağu 2026 14:00', action: 'Ödeme alındı', detail: '5,000 AED · Banka Havalesi', type: 'payment' },
  { time: '27 Ağu 2026 12:00', action: 'Mobil erişim oluşturuldu', detail: 'Kullanıcı adı: edip.demo', type: 'access' },
  { time: '26 Ağu 2026 18:00', action: 'Gezi oluşturuldu', detail: 'Travia Dubai — Premium Couple · 18,500 AED', type: 'trip' },
  { time: '25 Ağu 2026 15:30', action: 'Lead dönüştürüldü', detail: 'Müşteri kaydı oluşturuldu', type: 'lead' },
  { time: '24 Ağu 2026 11:00', action: 'Teklif kabul edildi', detail: 'Premium Couple Dubai paketi', type: 'proposal' },
  { time: '23 Ağu 2026 16:00', action: 'Teklif gönderildi', detail: '18,500 AED · 5 gece', type: 'proposal' },
  { time: '22 Ağu 2026 10:00', action: 'Lead nitelikli işaretlendi', detail: 'Furkan tarafından', type: 'lead' },
  { time: '20 Ağu 2026 09:00', action: 'Lead oluşturuldu', detail: 'Instagram · Direct message', type: 'lead' },
];

export default function Customer360Page() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Genel');

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
              <span className="text-lg font-semibold text-[#C9A66B]">{CUSTOMER.first_name[0]}{CUSTOMER.last_name[0]}</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-semibold text-[#F5F1E8]">{CUSTOMER.first_name} {CUSTOMER.last_name}</h1>
                <span className="text-lg">{COUNTRY_FLAGS[CUSTOMER.country]}</span>
                <Badge variant="gold">VIP</Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#F5F1E8]/30">
                <span>Premium Couple</span>
                <span>·</span>
                <span>Müşteri: Ağu 2026</span>
                <span>·</span>
                <span>Yönetici: {CUSTOMER.assigned_manager}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {CUSTOMER.tags.map(tag => (
                  <Badge key={tag} variant={tag === 'VIP' ? 'gold' : tag === 'Booked' ? 'success' : 'default'} size="sm">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors" title="WhatsApp">
              <MessageCircle className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-[#111827] text-[#F5F1E8]/40 hover:text-[#F5F1E8]/60 transition-colors" title="Ara">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-[#111827] text-[#F5F1E8]/40 hover:text-[#F5F1E8]/60 transition-colors" title="E-posta">
              <Mail className="w-4 h-4" />
            </button>
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
            <p className="text-lg font-semibold text-[#C9A66B] mt-0.5">{formatCurrency(CUSTOMER.lifetime_value)}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#F5F1E8]/25 uppercase tracking-wider">Toplam Gezi</span>
            <p className="text-lg font-semibold text-[#F5F1E8] mt-0.5">{CUSTOMER.trips_count}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#F5F1E8]/25 uppercase tracking-wider">Ödenen</span>
            <p className="text-lg font-semibold text-emerald-400 mt-0.5">{formatCurrency(CUSTOMER.current_trip.paid)}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#F5F1E8]/25 uppercase tracking-wider">Kalan Bakiye</span>
            <p className="text-lg font-semibold text-amber-400 mt-0.5">{formatCurrency(CUSTOMER.current_trip.remaining)}</p>
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
            <Link href={`/crm/trips/${CUSTOMER.current_trip.id}`} className="block bg-[#111827]/50 border border-[#C9A66B]/10 rounded-xl p-4 hover:border-[#C9A66B]/25 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-[#F5F1E8]/80 font-medium">{CUSTOMER.current_trip.title}</p>
                  <p className="text-xs text-[#F5F1E8]/30 mt-0.5">{CUSTOMER.current_trip.dates}</p>
                </div>
                <Badge variant="info">Yaklaşan</Badge>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-[10px] text-[#F5F1E8]/25 uppercase">Otel</p>
                  <p className="text-xs text-[#F5F1E8]/60 mt-0.5">{CUSTOMER.current_trip.hotel}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#F5F1E8]/25 uppercase">PAX</p>
                  <p className="text-xs text-[#F5F1E8]/60 mt-0.5">{CUSTOMER.current_trip.pax} kişi</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#F5F1E8]/25 uppercase">Toplam</p>
                  <p className="text-xs text-[#C9A66B] mt-0.5">{formatCurrency(CUSTOMER.current_trip.total)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#F5F1E8]/25 uppercase">Kalan</p>
                  <p className="text-xs text-amber-400 mt-0.5">{formatCurrency(CUSTOMER.current_trip.remaining)}</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Contact & Preferences */}
          <div className="space-y-4">
            <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl p-5">
              <h3 className="text-sm font-medium text-[#F5F1E8] mb-3">İletişim</h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-[#F5F1E8]/40"><Phone className="w-3.5 h-3.5 text-[#C9A66B]/40" />{CUSTOMER.phone}</div>
                <div className="flex items-center gap-2 text-[#F5F1E8]/40"><Mail className="w-3.5 h-3.5 text-[#C9A66B]/40" />{CUSTOMER.email}</div>
                <div className="flex items-center gap-2 text-[#F5F1E8]/40"><MessageCircle className="w-3.5 h-3.5 text-green-400/40" />{CUSTOMER.whatsapp}</div>
              </div>
            </div>
            <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl p-5">
              <h3 className="text-sm font-medium text-[#F5F1E8] mb-3">Tercihler</h3>
              <div className="flex flex-wrap gap-1.5">
                {CUSTOMER.preferences.map(pref => (
                  <Badge key={pref} variant="gold" size="sm">{pref}</Badge>
                ))}
              </div>
            </div>
            <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl p-5">
              <h3 className="text-sm font-medium text-[#F5F1E8] mb-3">Notlar</h3>
              <p className="text-xs text-[#F5F1E8]/40 leading-relaxed">{CUSTOMER.notes}</p>
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
              {ACTIVITY_LOG.map((activity, i) => (
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
