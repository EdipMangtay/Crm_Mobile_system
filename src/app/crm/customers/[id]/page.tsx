'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Mail,
  Key,
  Plus,
  Copy,
  Check,
  Hotel,
  Calendar,
  Sparkles,
  AlertCircle,
  ExternalLink,
  Shield,
} from 'lucide-react';
import {
  TravelBadge,
  TravelButton,
  TravelTabs,
  TravelDialog,
} from '@/components/ui/travel';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { COUNTRY_FLAGS } from '@/types';
import { traviaData } from '@/shared/data/traviaData';

export default function Customer360Page() {
  const params = useParams<{ id: string }>();
  const customerId = params?.id || '';
  const { formatMoney } = useTenant();

  const [noteInput, setNoteInput] = React.useState('');
  const [copiedId, setCopiedId] = React.useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = React.useState(false);

  // Centralized domain data resolution
  const customerRecord = traviaData.getCustomer(customerId);
  const tripRecord = customerRecord
    ? traviaData.getTrip(customerRecord.id) || traviaData.getTripByCustomer(customerRecord.id)
    : null;

  const currentTrip = tripRecord
    ? {
        id: tripRecord.id,
        title: tripRecord.title,
        dates: `${tripRecord.start_date} — ${tripRecord.end_date}`,
        hotel: tripRecord.hotel_name || 'Dubai Luxury Suite',
        hotel_address: tripRecord.hotel_address || 'Dubai, BAE',
        pax: tripRecord.pax_count,
        nights: tripRecord.nights,
        total: tripRecord.total_amount,
        paid: tripRecord.total_amount > 20000 ? tripRecord.total_amount : 5000,
        remaining:
          tripRecord.total_amount > 20000 ? 0 : Math.max(0, tripRecord.total_amount - 5000),
        status: tripRecord.status,
      }
    : null;

  const [notes, setNotes] = React.useState<string[]>(() => [
    customerRecord?.notes || 'Misafir sessiz oda, yüksek kat ve Burj Al Arab manzarası tercih ediyor.',
    'VIP karşılama protokolü aktif. Özel Türkçe/İngilizce rehber atanmıştır.',
  ]);

  const [activityTimeline, setActivityTimeline] = React.useState([
    {
      time: '27 Ağu 2026 14:00',
      action: 'Ödeme Tahsil Edildi',
      detail: `${currentTrip ? formatMoney(currentTrip.paid) : formatMoney(5000)} · Banka Havalesi (EFT)`,
      type: 'payment',
    },
    {
      time: '27 Ağu 2026 12:00',
      action: 'Mobil Giriş Kodu Üretildi',
      detail: `Kullanıcı: ${customerRecord?.first_name.toLowerCase() || 'guest'}.vip · SMS iletildi`,
      type: 'access',
    },
    {
      time: '26 Ağu 2026 18:00',
      action: 'Gezi Programı Oluşturuldu',
      detail: `${currentTrip?.title || 'Dubai VIP Deneyimi'} · ${formatMoney(customerRecord?.lifetime_value || 18500)}`,
      type: 'trip',
    },
    {
      time: '25 Ağu 2026 15:30',
      action: 'Lead Dönüştürüldü',
      detail: 'Müşteri profili CRM veri tabanına işlendi',
      type: 'lead',
    },
  ]);

  const handleCopyId = () => {
    if (!customerRecord) return;
    navigator.clipboard.writeText(customerRecord.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    setNotes((prev) => [noteInput.trim(), ...prev]);
    setActivityTimeline((prev) => [
      {
        time: 'Şimdi',
        action: 'Dahili Not Eklendi',
        detail: noteInput.trim(),
        type: 'note',
      },
      ...prev,
    ]);
    setNoteInput('');
  };

  if (!customerRecord) {
    return (
      <div className="space-y-5 max-w-[1600px] select-none">
        <Link
          href="/crm/customers"
          className="inline-flex items-center gap-1.5 text-xs text-[#F5F1E8]/40 hover:text-[#C9A66B] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Müşteriler Listesine Dön
        </Link>
        <div className="bg-[#0B0F1A] border border-rose-500/20 rounded-xl p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-rose-400" />
          </div>
          <h2 className="text-base font-semibold text-[#F5F1E8] mb-1">Müşteri Kaydı Bulunamadı</h2>
          <p className="text-xs text-[#F5F1E8]/40 mb-6 leading-relaxed">
            Aradığınız ID (<code className="text-[#C9A66B] font-mono">{customerId}</code>) ile eşleşen bir müşteri kaydı bulunamadı.
          </p>
          <Link href="/crm/customers">
            <TravelButton variant="primary" size="sm">
              Müşteri Listesine Git
            </TravelButton>
          </Link>
        </div>
      </div>
    );
  }

  // Deterministic Contextual AI Brief
  const aiBriefText = `${customerRecord.first_name} ${customerRecord.last_name}, ${
    customerRecord.tags?.includes('VIP') ? 'yüksek bütçeli VIP' : 'kayıtlı'
  } portföy misafirimizdir. ${
    currentTrip
      ? `Yaklaşan "${currentTrip.title}" gezisi (${currentTrip.dates}) için ${currentTrip.hotel} konaklaması teyit edilmiştir. Kalan bakiye ${formatMoney(
          currentTrip.remaining
        )} seviyesindedir.`
      : 'Şu anda planlanan aktif bir seyahati bulunmamaktadır.'
  } İletişim dili ${customerRecord.preferred_language || 'TR'}, son concierge etkileşimi olumludur.`;

  const tabs = [
    {
      id: 'overview',
      label: 'Genel Bakış',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-2">
          {/* Left 2 Cols */}
          <div className="lg:col-span-2 space-y-5">
            {/* Active Trip Card */}
            <div className="p-5 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)]">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(201,166,107,0.08)]">
                <div className="flex items-center gap-2">
                  <Hotel className="w-4 h-4 text-[#C9A66B]" />
                  <h3 className="text-xs font-semibold text-[#F5F1E8] uppercase tracking-wider font-mono">
                    Aktif / Yaklaşan Gezi
                  </h3>
                </div>
                {currentTrip && (
                  <Link href={`/crm/trips/${currentTrip.id}`}>
                    <TravelButton variant="ghost" size="sm" className="h-6 text-[11px] text-[#C9A66B] gap-1 px-2">
                      <span>Gezi Detayı</span>
                      <ExternalLink className="w-3 h-3" />
                    </TravelButton>
                  </Link>
                )}
              </div>

              {currentTrip ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)]">
                    <div>
                      <p className="text-sm font-semibold text-[#F5F1E8]">{currentTrip.title}</p>
                      <p className="text-xs text-[#F5F1E8]/40 font-mono mt-0.5">{currentTrip.dates} · {currentTrip.nights} Gece</p>
                    </div>
                    <TravelBadge variant={currentTrip.status === 'active' ? 'success' : 'info'} size="sm">
                      {currentTrip.status === 'active' ? 'Devam Ediyor' : 'Yaklaşan Gezi'}
                    </TravelBadge>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#101524]/60 border border-[rgba(201,166,107,0.06)]">
                      <span className="text-[10px] text-[#F5F1E8]/40 uppercase font-mono block">Konaklama</span>
                      <p className="font-medium text-[#F5F1E8] mt-0.5 truncate">{currentTrip.hotel}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#101524]/60 border border-[rgba(201,166,107,0.06)]">
                      <span className="text-[10px] text-[#F5F1E8]/40 uppercase font-mono block">Misafir Sayısı</span>
                      <p className="font-medium text-[#F5F1E8] mt-0.5">{currentTrip.pax} PAX</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#101524]/60 border border-[rgba(201,166,107,0.06)]">
                      <span className="text-[10px] text-[#F5F1E8]/40 uppercase font-mono block">Toplam Tutar</span>
                      <p className="font-semibold text-[#E8C77A] font-mono mt-0.5">{formatMoney(currentTrip.total)}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#101524]/60 border border-[rgba(201,166,107,0.06)]">
                      <span className="text-[10px] text-[#F5F1E8]/40 uppercase font-mono block">Kalan Bakiye</span>
                      <p className="font-semibold text-[#F5F1E8] font-mono mt-0.5">{formatMoney(currentTrip.remaining)}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center bg-[#101524]/40 rounded-lg border border-dashed border-[rgba(201,166,107,0.08)]">
                  <p className="text-xs text-[#F5F1E8]/40">Bu müşteri için henüz tanımlanmış aktif gezi bulunmuyor.</p>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="p-5 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)]">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[rgba(201,166,107,0.08)]">
                <Calendar className="w-4 h-4 text-[#C9A66B]" />
                <h3 className="text-xs font-semibold text-[#F5F1E8] uppercase tracking-wider font-mono">
                  Son Aktivite ve Olay Günlüğü
                </h3>
              </div>
              <div className="relative pl-6 space-y-4">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[rgba(201,166,107,0.12)]" />
                {activityTimeline.slice(0, 4).map((activity, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full bg-[#101524] border-2 border-[#C9A66B] group-hover:scale-125 transition-transform" />
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-[#F5F1E8]">{activity.action}</p>
                        <span className="text-[10px] font-mono text-[#F5F1E8]/35">{activity.time}</span>
                      </div>
                      <p className="text-[11px] text-[#F5F1E8]/50 mt-0.5">{activity.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Preferences, Contact & Notes */}
          <div className="space-y-5">
            {/* Preferences & Tags */}
            <div className="p-5 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)] space-y-3">
              <h3 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono">
                Segment ve İlgi Alanları
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {(customerRecord.tags || ['VIP', 'Luxury']).map((tag) => (
                  <TravelBadge
                    key={tag}
                    variant={tag === 'VIP' ? 'gold' : 'neutral'}
                    size="sm"
                    className="text-[11px]"
                  >
                    {tag}
                  </TravelBadge>
                ))}
              </div>
            </div>

            {/* Direct Contact Box */}
            <div className="p-5 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)] space-y-3">
              <h3 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono">
                İletişim Kanalları
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href={`mailto:${customerRecord.email}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)] hover:border-[rgba(201,166,107,0.25)] text-[#F5F1E8]/80 hover:text-[#F5F1E8] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C9A66B] shrink-0" />
                  <span className="font-mono text-[11px] truncate">{customerRecord.email}</span>
                </a>
                <a
                  href={`tel:${customerRecord.phone}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)] hover:border-[rgba(201,166,107,0.25)] text-[#F5F1E8]/80 hover:text-[#F5F1E8] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A66B] shrink-0" />
                  <span className="font-mono text-[11px]">{customerRecord.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${(customerRecord.whatsapp || customerRecord.phone || '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)] hover:border-[rgba(201,166,107,0.25)] text-[#F5F1E8]/80 hover:text-[#F5F1E8] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-mono text-[11px]">{customerRecord.whatsapp || customerRecord.phone} (WhatsApp)</span>
                </a>
              </div>
            </div>

            {/* Operational Notes Composer */}
            <div className="p-5 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)] space-y-3">
              <h3 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono">
                Misafir Notları
              </h3>
              <div className="space-y-2">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                    placeholder="Yeni operasyonel not yazın..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.14)] text-xs text-[#F5F1E8] placeholder-[#F5F1E8]/30 focus:outline-none focus:border-[#C9A66B]/50"
                  />
                  <TravelButton
                    variant="primary"
                    size="sm"
                    onClick={handleAddNote}
                    disabled={!noteInput.trim()}
                    className="h-8 px-2.5 text-xs shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </TravelButton>
                </div>
                <div className="space-y-2 pt-1 max-h-48 overflow-y-auto pr-1">
                  {notes.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-[#101524]/60 border border-[rgba(201,166,107,0.06)] text-xs text-[#F5F1E8]/80 leading-relaxed"
                    >
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trips',
      label: 'Geziler',
      badge: currentTrip ? '1' : '0',
      content: (
        <div className="pt-2 space-y-4">
          {currentTrip ? (
            <div className="p-5 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)]">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(201,166,107,0.08)]">
                <div>
                  <h3 className="text-sm font-semibold text-[#F5F1E8]">{currentTrip.title}</h3>
                  <p className="text-xs text-[#F5F1E8]/40 font-mono">{currentTrip.dates} · {currentTrip.hotel}</p>
                </div>
                <Link href={`/crm/trips/${currentTrip.id}`}>
                  <TravelButton variant="primary" size="sm" className="text-xs gap-1.5">
                    <span>Gezi Programını Aç</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </TravelButton>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#101524]">
                  <span className="text-[10px] text-[#F5F1E8]/40 block">Toplam Tutar</span>
                  <span className="text-[#E8C77A] font-semibold">{formatMoney(currentTrip.total)}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#101524]">
                  <span className="text-[10px] text-[#F5F1E8]/40 block">Tahsil Edilen</span>
                  <span className="text-[#F5F1E8] font-semibold">{formatMoney(currentTrip.paid)}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#101524]">
                  <span className="text-[10px] text-[#F5F1E8]/40 block">Kalan Bakiye</span>
                  <span className="text-[#F5F1E8] font-semibold">{formatMoney(currentTrip.remaining)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-[#0B0F1A] rounded-xl border border-[rgba(201,166,107,0.08)]">
              <p className="text-xs text-[#F5F1E8]/40">Kayıtlı gezi bulunamadı.</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'payments',
      label: 'Ödemeler',
      content: (
        <div className="pt-2 space-y-4">
          <div className="p-5 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)]">
            <h3 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono mb-4">
              Finansal İşlem Geçmişi
            </h3>
            <div className="divide-y divide-[rgba(201,166,107,0.08)]">
              <div className="py-3 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#F5F1E8]">Kapora / Depozito Tahsilatı</p>
                  <p className="text-[10px] text-[#F5F1E8]/40 font-mono mt-0.5">TRV-2026-0812 · Banka Havalesi</p>
                </div>
                <div className="text-right font-mono">
                  <p className="text-[#E8C77A] font-semibold">{currentTrip ? formatMoney(currentTrip.paid) : formatMoney(5000)}</p>
                  <TravelBadge variant="success" size="sm" className="text-[9px] mt-1">
                    Tahsil Edildi
                  </TravelBadge>
                </div>
              </div>
              {currentTrip && currentTrip.remaining > 0 && (
                <div className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-[#F5F1E8]">Kalan Paket Bakiyesi</p>
                    <p className="text-[10px] text-[#F5F1E8]/40 font-mono mt-0.5">TRV-2026-0813 · Otel Girişinde Tahsil Edilecek</p>
                  </div>
                  <div className="text-right font-mono">
                    <p className="text-[#F5F1E8]/80 font-semibold">{formatMoney(currentTrip.remaining)}</p>
                    <TravelBadge variant="warning" size="sm" className="text-[9px] mt-1">
                      Bekliyor
                    </TravelBadge>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'activity',
      label: 'Aktivite & Notlar',
      content: (
        <div className="pt-2 space-y-4">
          <div className="p-5 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)]">
            <h3 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono mb-4">
              Kronolojik Aktivite Zaman Çizelgesi
            </h3>
            <div className="relative pl-6 space-y-5">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[rgba(201,166,107,0.12)]" />
              {activityTimeline.map((activity, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full bg-[#101524] border-2 border-[#C9A66B] group-hover:scale-125 transition-transform" />
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#F5F1E8]">{activity.action}</p>
                      <span className="text-[10px] font-mono text-[#F5F1E8]/35">{activity.time}</span>
                    </div>
                    <p className="text-xs text-[#F5F1E8]/60 mt-0.5">{activity.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5 max-w-[1600px] select-none">
      {/* Breadcrumb / Back Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/crm/customers"
          className="inline-flex items-center gap-1.5 text-xs text-[#F5F1E8]/40 hover:text-[#C9A66B] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Müşteriler Listesine Dön
        </Link>
        <button
          onClick={handleCopyId}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#F5F1E8]/40 hover:text-[#E8C77A] transition-colors"
          title="Müşteri UUID Kopyala"
        >
          {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>ID: {customerRecord.id.slice(0, 8)}...</span>
        </button>
      </div>

      {/* Record Header */}
      <div className="p-6 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
          {/* Identity & Tags */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A66B]/20 to-[#C9A66B]/5 border border-[#C9A66B]/30 flex items-center justify-center font-serif text-lg font-bold text-[#E8C77A] shrink-0 shadow-sm">
              {customerRecord.first_name[0]}
              {customerRecord.last_name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">
                  {customerRecord.first_name} {customerRecord.last_name}
                </h1>
                <span className="text-base">{COUNTRY_FLAGS[customerRecord.country] || '🌍'}</span>
                <TravelBadge variant="success" size="sm">
                  Aktif Müşteri
                </TravelBadge>
                {customerRecord.tags?.includes('VIP') && (
                  <TravelBadge variant="gold" size="sm">
                    VIP GUEST
                  </TravelBadge>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-[#F5F1E8]/40 flex-wrap">
                <span className="font-mono">{customerRecord.email}</span>
                <span>·</span>
                <span className="font-mono">{customerRecord.phone}</span>
                <span>·</span>
                <span>Temsilci: <strong className="text-[#F5F1E8]/70 font-normal">Deniz Acar</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-2 shrink-0 self-start">
            <a
              href={`https://wa.me/${(customerRecord.whatsapp || customerRecord.phone || '').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TravelButton variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-[rgba(201,166,107,0.15)] text-emerald-400 hover:bg-emerald-500/10">
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </TravelButton>
            </a>
            <TravelButton
              variant="outline"
              size="sm"
              onClick={() => setIsAccessModalOpen(true)}
              className="h-8 text-xs gap-1.5 border-[rgba(201,166,107,0.15)] text-[#F5F1E8]/80 hover:text-[#F5F1E8]"
            >
              <Key className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span className="hidden sm:inline">Mobil Erişim</span>
            </TravelButton>
            <Link href="/crm/concierge">
              <TravelButton variant="primary" size="sm" className="h-8 text-xs font-semibold gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Concierge Chat</span>
              </TravelButton>
            </Link>
          </div>
        </div>

        {/* High-Level Financial Metrics */}
        <div className="mt-6 pt-4 border-t border-[rgba(201,166,107,0.08)] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <span className="text-[10px] font-mono text-[#F5F1E8]/40 uppercase tracking-wider block">
              Yaşam Boyu Harcama (LTV)
            </span>
            <p className="text-base font-semibold text-[#E8C77A] font-mono mt-0.5">
              {formatMoney(customerRecord.lifetime_value)}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#F5F1E8]/40 uppercase tracking-wider block">
              Toplam Gezi
            </span>
            <p className="text-base font-semibold text-[#F5F1E8] font-mono mt-0.5">
              {currentTrip ? '1 Aktif Gezi' : '0 Gezi'}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#F5F1E8]/40 uppercase tracking-wider block">
              Toplam Tahsil Edilen
            </span>
            <p className="text-base font-semibold text-[#F5F1E8] font-mono mt-0.5">
              {currentTrip ? formatMoney(currentTrip.paid) : formatMoney(0)}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#F5F1E8]/40 uppercase tracking-wider block">
              Kalan Bakiye
            </span>
            <p className="text-base font-semibold text-[#F5F1E8] font-mono mt-0.5">
              {currentTrip ? formatMoney(currentTrip.remaining) : formatMoney(0)}
            </p>
          </div>
        </div>
      </div>

      {/* Embedded Contextual AI Intelligence Brief */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#101524] to-[#0B0F1A] border border-[rgba(201,166,107,0.18)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[rgba(201,166,107,0.10)] border border-[rgba(201,166,107,0.20)] flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-[#C9A66B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A66B] font-semibold">
                AI Misafir İstihbarat Özeti
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#05070F] text-[#F5F1E8]/40 border border-[rgba(201,166,107,0.10)]">
                Contextual Intelligence
              </span>
            </div>
            <p className="text-xs text-[#F5F1E8]/80 mt-1 leading-relaxed">{aiBriefText}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <TravelButton
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(aiBriefText);
            }}
            className="h-7 text-[11px] border-[rgba(201,166,107,0.15)] text-[#F5F1E8]/70 hover:text-[#F5F1E8]"
          >
            Özeti Kopyala
          </TravelButton>
        </div>
      </div>

      {/* Tab Navigation & Content */}
      <TravelTabs items={tabs} defaultValue="overview" />

      {/* Mobile Access Modal */}
      <TravelDialog
        open={isAccessModalOpen}
        onOpenChange={setIsAccessModalOpen}
        title="Mobil Misafir Uygulaması Erişimi"
        description="Misafir için tek kullanımlık güvenli PIN ve mobil giriş linki oluşturuldu."
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-[#05070F] border border-[rgba(201,166,107,0.15)] space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#F5F1E8]/40 font-mono">Misafir Kullanıcı Adı</span>
              <span className="font-mono text-[#E8C77A] font-semibold">{customerRecord.first_name.toLowerCase()}.demo</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#F5F1E8]/40 font-mono">Doğrulama PIN</span>
              <span className="font-mono text-base font-bold text-[#F5F1E8] tracking-widest">7829</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#F5F1E8]/40 font-mono">Güvenli Bağlantı</span>
              <span className="font-mono text-[10px] text-[#C9A66B]">https://app.traviadubai.com/vip-auth</span>
            </div>
          </div>
          <p className="text-[11px] text-[#F5F1E8]/40 leading-relaxed flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#C9A66B] shrink-0" />
            PIN kodunun süresi 48 saat sonra dolacaktır. Misafir bu kodla gezi programını ve concierge kanalını görüntüleyebilir.
          </p>
        </div>
      </TravelDialog>
    </div>
  );
}
