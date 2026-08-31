'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Users,
  Plus,
  Key,
  Printer,
  AlertCircle,
  Clock,
  MapPin,
  Lock,
  Copy,
  Check,
} from 'lucide-react';
import {
  TravelBadge,
  TravelButton,
  TravelDialog,
} from '@/components/ui/travel';
import { ProposalModal } from '@/components/crm';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { traviaData } from '@/shared/data/traviaData';

interface ItineraryItem {
  time: string;
  title: string;
  desc: string;
  type: 'transfer' | 'hotel' | 'restaurant' | 'tour' | 'yacht' | 'safari' | 'helicopter';
  status: 'confirmed' | 'pending' | 'completed';
  location?: string;
  supplier?: string;
}

interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  items: ItineraryItem[];
}

export default function TripDetailPage() {
  const params = useParams<{ id: string }>();
  const tripId = params?.id || '';
  const { formatMoney } = useTenant();

  const tripRecord = traviaData.getTrip(tripId);
  const customerRecord = tripRecord ? traviaData.getCustomer(tripRecord.customer_id) : null;

  const [selectedDay, setSelectedDay] = React.useState(1);
  const [isProposalOpen, setIsProposalOpen] = React.useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = React.useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState(false);

  // New activity form state
  const [newTime, setNewTime] = React.useState('14:00');
  const [newTitle, setNewTitle] = React.useState('');
  const [newDesc, setNewDesc] = React.useState('');
  const [newType, setNewType] = React.useState<ItineraryItem['type']>('restaurant');

  const [itineraryDays, setItineraryDays] = React.useState<ItineraryDay[]>(() => {
    const start = tripRecord?.start_date || '2026-09-12';
    return [
      {
        day: 1,
        date: `${start} (1. Gün)`,
        title: "Dubai'ye Hoş Geldiniz & Otel Check-in",
        items: [
          {
            time: '09:10',
            title: 'Havalimanı VIP Karşılama',
            desc: 'DXB Terminal 3 · VIP Marhaba Service ile pasaport geçişi',
            type: 'transfer',
            status: 'confirmed',
            location: 'DXB Terminal 3 VIP Salonu',
            supplier: 'Al Futtaim Chauffeur',
          },
          {
            time: '10:30',
            title: 'VIP Chauffeur Transfer',
            desc: 'Mercedes V-Class (Özel Şoför Tahsisli)',
            type: 'transfer',
            status: 'confirmed',
            location: 'DXB → Atlantis The Royal',
            supplier: 'Al Futtaim Chauffeur',
          },
          {
            time: '12:00',
            title: `${tripRecord?.hotel_name || 'Atlantis The Royal'} Check-in`,
            desc: 'VIP Karşılama & Süit Girişi (Erken check-in onaylandı)',
            type: 'hotel',
            status: 'confirmed',
            location: tripRecord?.hotel_name || 'Atlantis The Royal',
            supplier: 'Atlantis Resorts',
          },
          {
            time: '20:30',
            title: 'Nobu Dubai Akşam Yemeği',
            desc: 'Burj Al Arab manzaralı teras masa rezervasyonu',
            type: 'restaurant',
            status: 'confirmed',
            location: 'Atlantis The Palm',
            supplier: 'Nobu Restaurant',
          },
        ],
      },
      {
        day: 2,
        date: '13 Eyl 2026 (2. Gün)',
        title: 'Özel Süperyat & Gün Batımı Seyri',
        items: [
          {
            time: '10:00',
            title: 'Özel Şehir ve DIFC Turu',
            desc: 'Mercedes S-Class & Türkçe Rehber',
            type: 'tour',
            status: 'confirmed',
            location: 'DIFC & Downtown Dubai',
            supplier: 'Travia Tour Ops',
          },
          {
            time: '14:00',
            title: 'Private Superyacht Sunset Cruise',
            desc: 'Majesty 56ft · Marina Yacht Club Pier 7 · Şampanya Servisi',
            type: 'yacht',
            status: 'confirmed',
            location: 'Dubai Marina Yacht Club',
            supplier: 'Marina Superyachts LLC',
          },
          {
            time: '20:30',
            title: 'Fine Dining Akşam Yemeği',
            desc: 'Carna by Dario Cecchini · VIP Teras',
            type: 'restaurant',
            status: 'confirmed',
            location: 'SLS Dubai Hotel',
            supplier: 'SLS Restaurants',
          },
        ],
      },
      {
        day: 3,
        date: '14 Eyl 2026 (3. Gün)',
        title: 'Kızıl Kum Tepeleri VIP Çöl Safarisi',
        items: [
          {
            time: '15:30',
            title: 'VIP Çöl Safarisi Alış',
            desc: 'Özel 4x4 Land Cruiser · Otel Lobisi',
            type: 'safari',
            status: 'confirmed',
            location: 'Otel Lobisi → Lahbab Çölü',
            supplier: 'Royal Desert Safari',
          },
          {
            time: '18:00',
            title: 'Royal Majlis Kampı & Şahin Gösterisi',
            desc: 'Gurme Barbekü & Özel Çadır Deneyimi',
            type: 'safari',
            status: 'confirmed',
            location: 'Royal Desert Majlis',
            supplier: 'Royal Desert Safari',
          },
        ],
      },
    ];
  });

  if (!tripRecord) {
    return (
      <div className="space-y-5 max-w-[1400px] select-none">
        <Link
          href="/crm/trips"
          className="inline-flex items-center gap-1.5 text-xs text-[#F5F1E8]/40 hover:text-[#C9A66B] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Geziler Listesine Dön
        </Link>
        <div className="bg-[#0B0F1A] border border-rose-500/20 rounded-xl p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-rose-400" />
          </div>
          <h2 className="text-base font-semibold text-[#F5F1E8] mb-1">Gezi Bulunamadı</h2>
          <p className="text-xs text-[#F5F1E8]/40 mb-6 leading-relaxed">
            Aradığınız ID (<code className="text-[#C9A66B] font-mono">{tripId}</code>) ile eşleşen bir gezi kaydı bulunamadı.
          </p>
          <Link href="/crm/trips">
            <TravelButton variant="primary" size="sm">
              Geziler Listesine Dön
            </TravelButton>
          </Link>
        </div>
      </div>
    );
  }

  const customerName = customerRecord
    ? `${customerRecord.first_name} ${customerRecord.last_name}`
    : 'VIP Misafir';
  const supplierCost = tripRecord.supplier_cost || Math.round(tripRecord.total_amount * 0.64);
  const grossContribution = tripRecord.gross_contribution || tripRecord.total_amount - supplierCost;
  const marginPct = ((grossContribution / tripRecord.total_amount) * 100).toFixed(1);
  const paidAmount = tripRecord.total_amount > 20000 ? tripRecord.total_amount : 5000;
  const remainingAmount = Math.max(0, tripRecord.total_amount - paidAmount);

  const handleCopyId = () => {
    navigator.clipboard.writeText(tripRecord.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleAddActivity = () => {
    if (!newTitle.trim()) return;
    const newItem: ItineraryItem = {
      time: newTime,
      title: newTitle.trim(),
      desc: newDesc.trim() || 'Operasyon ekibi tarafından eklendi.',
      type: newType,
      status: 'confirmed',
      location: 'Dubai',
      supplier: 'Dahili Operasyon',
    };

    setItineraryDays((prev) =>
      prev.map((d) => (d.day === selectedDay ? { ...d, items: [...d.items, newItem] } : d))
    );

    setNewTitle('');
    setNewDesc('');
    setIsAddItemModalOpen(false);
  };

  const currentDayData = itineraryDays.find((d) => d.day === selectedDay) || itineraryDays[0];

  return (
    <div className="space-y-5 max-w-[1600px] select-none">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/crm/trips"
          className="inline-flex items-center gap-1.5 text-xs text-[#F5F1E8]/40 hover:text-[#C9A66B] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Geziler Listesine Dön
        </Link>
        <button
          onClick={handleCopyId}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#F5F1E8]/40 hover:text-[#E8C77A] transition-colors"
          title="Gezi UUID Kopyala"
        >
          {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>ID: {tripRecord.id.slice(0, 8)}...</span>
        </button>
      </div>

      {/* Trip Record Header */}
      <div className="p-6 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">
                {tripRecord.title}
              </h1>
              <TravelBadge variant={tripRecord.status === 'active' ? 'success' : 'info'} size="sm">
                {tripRecord.status === 'active' ? 'Devam Ediyor' : 'Yaklaşan Gezi'}
              </TravelBadge>
            </div>
            <p className="text-xs text-[#F5F1E8]/40 mt-1.5">
              Misafir:{' '}
              <Link
                href={`/crm/customers/${tripRecord.customer_id}`}
                className="text-[#C9A66B] hover:text-[#E8C77A] transition-colors font-medium underline"
              >
                {customerName}
              </Link>{' '}
              · {tripRecord.start_date} – {tripRecord.end_date} ({tripRecord.nights} Gece · {tripRecord.pax_count} PAX)
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0 self-start">
            <TravelButton
              variant="outline"
              size="sm"
              onClick={() => setIsProposalOpen(true)}
              className="h-8 text-xs gap-1.5 border-[rgba(201,166,107,0.20)] text-[#E8C77A] hover:bg-[rgba(201,166,107,0.10)]"
            >
              <Printer className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span>Teklif & Voucher PDF</span>
            </TravelButton>
            <TravelButton
              variant="outline"
              size="sm"
              onClick={() => setIsAccessModalOpen(true)}
              className="h-8 text-xs gap-1.5 border-[rgba(201,166,107,0.15)] text-[#F5F1E8]/80 hover:text-[#F5F1E8]"
            >
              <Key className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span className="hidden sm:inline">Mobil Giriş Kodu</span>
            </TravelButton>
            <TravelButton
              variant="primary"
              size="sm"
              onClick={() => setIsAddItemModalOpen(true)}
              className="h-8 text-xs font-semibold gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Aktivite Ekle</span>
            </TravelButton>
          </div>
        </div>

        {/* Staff Only Financial Confidentiality Ledger Bar (PRD Requirement) */}
        <div className="mt-6 pt-5 border-t border-[rgba(201,166,107,0.08)]">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-3 h-3 text-[#C9A66B]" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A66B] font-semibold">
              Dahili Finansal Görünüm (Sadece Yetkili Operasyon Personeli)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)]">
              <span className="text-[10px] text-[#F5F1E8]/40 font-mono uppercase block">Toplam Paket Satış</span>
              <p className="text-base font-semibold text-[#F5F1E8] font-mono mt-0.5">
                {formatMoney(tripRecord.total_amount)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)]">
              <span className="text-[10px] text-[#F5F1E8]/40 font-mono uppercase block">Tedarikçi Net Maliyeti</span>
              <p className="text-base font-medium text-[#F5F1E8]/70 font-mono mt-0.5 tabular-nums">
                {formatMoney(supplierCost)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)]">
              <span className="text-[10px] text-[#F5F1E8]/40 font-mono uppercase block">Brüt Katkı (Kâr)</span>
              <p className="text-base font-semibold text-[#E8C77A] font-mono mt-0.5 tabular-nums">
                {formatMoney(grossContribution)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)]">
              <span className="text-[10px] text-[#F5F1E8]/40 font-mono uppercase block">Kâr Marjı</span>
              <p className="text-base font-semibold text-[#E8C77A] font-mono mt-0.5 tabular-nums">
                %{marginPct}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)]">
              <span className="text-[10px] text-[#F5F1E8]/40 font-mono uppercase block">Kalan Tahsilat</span>
              <p className="text-base font-semibold text-[#F5F1E8] font-mono mt-0.5 tabular-nums">
                {formatMoney(remainingAmount)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Itinerary Workspace: Days Navigation + Day Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Left Col: Day Navigator & Hotel Card */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)] space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A66B] block mb-1">
              Günlük Program Akışı
            </span>
            {itineraryDays.map((d) => {
              const isSelected = selectedDay === d.day;
              return (
                <button
                  key={d.day}
                  onClick={() => setSelectedDay(d.day)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    isSelected
                      ? 'bg-[rgba(201,166,107,0.15)] border border-[rgba(201,166,107,0.30)] text-[#F5F1E8]'
                      : 'bg-[#101524]/60 border border-[rgba(201,166,107,0.06)] hover:border-[rgba(201,166,107,0.20)] text-[#F5F1E8]/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">Gün {d.day}</span>
                    <span className="text-[10px] font-mono text-[#E8C77A]">{d.items.length} Kalem</span>
                  </div>
                  <p className="text-[11px] text-[#F5F1E8]/40 mt-1 truncate">{d.title}</p>
                </button>
              );
            })}
          </div>

          {/* Hotel & Logistics Card */}
          <div className="p-4 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)] space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A66B] block">
              Konaklama & Lojistik
            </span>
            <p className="text-sm font-semibold text-[#F5F1E8]">{tripRecord.hotel_name}</p>
            <p className="text-xs text-[#F5F1E8]/40 font-mono">{tripRecord.hotel_address || 'Dubai, BAE'}</p>
            <div className="flex items-center gap-2 pt-2 border-t border-[rgba(201,166,107,0.06)] text-xs text-[#F5F1E8]/60">
              <Users className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span>{tripRecord.pax_count} Misafir ({tripRecord.pax_label || 'VIP Grup'})</span>
            </div>
          </div>
        </div>

        {/* Right 3 Cols: Selected Day Schedule Timeline */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-6 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[rgba(201,166,107,0.08)] mb-5">
              <div>
                <h2 className="text-base font-semibold text-[#F5F1E8]">{currentDayData.title}</h2>
                <span className="text-xs text-[#C9A66B] font-mono mt-0.5 block">{currentDayData.date}</span>
              </div>
              <TravelButton
                variant="outline"
                size="sm"
                onClick={() => setIsAddItemModalOpen(true)}
                className="h-7 text-xs border-[rgba(201,166,107,0.20)] text-[#E8C77A] hover:bg-[rgba(201,166,107,0.10)] gap-1 self-start sm:self-auto"
              >
                <Plus className="w-3 h-3" />
                <span>Bu Güne Aktivite Ekle</span>
              </TravelButton>
            </div>

            {/* Timeline Items */}
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[rgba(201,166,107,0.15)]" />
              {currentDayData.items.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full bg-[#101524] border-2 border-[#C9A66B] group-hover:scale-125 transition-transform" />
                  <div className="p-4 rounded-lg bg-[#101524]/70 border border-[rgba(201,166,107,0.08)] hover:border-[rgba(201,166,107,0.25)] transition-all space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-[#C9A66B] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.time}
                        </span>
                        <span className="text-xs font-semibold text-[#F5F1E8]">{item.title}</span>
                      </div>
                      <TravelBadge variant="success" size="sm" className="text-[10px] self-start sm:self-auto">
                        Onaylandı
                      </TravelBadge>
                    </div>
                    <p className="text-xs text-[#F5F1E8]/60 leading-relaxed">{item.desc}</p>
                    {(item.location || item.supplier) && (
                      <div className="flex items-center gap-3 pt-1 text-[11px] text-[#F5F1E8]/35 font-mono">
                        {item.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#C9A66B]/60" />
                            {item.location}
                          </span>
                        )}
                        {item.supplier && <span>Tedarikçi: {item.supplier}</span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Activity Modal */}
      <TravelDialog
        open={isAddItemModalOpen}
        onOpenChange={setIsAddItemModalOpen}
        title={`Gün ${selectedDay} İçin Aktivite Ekle`}
        description="Gezi programına yeni transfer, restoran, yat veya tur kalemi ekleyin."
      >
        <div className="space-y-3 text-xs">
          <div>
            <label className="text-[11px] text-[#F5F1E8]/60 font-mono block mb-1">Saat</label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#05070F] border border-[rgba(201,166,107,0.20)] text-[#F5F1E8] text-xs font-mono"
            />
          </div>
          <div>
            <label className="text-[11px] text-[#F5F1E8]/60 font-mono block mb-1">Hizmet Türü</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as ItineraryItem['type'])}
              className="w-full px-3 py-1.5 rounded-lg bg-[#05070F] border border-[rgba(201,166,107,0.20)] text-[#F5F1E8] text-xs"
            >
              <option value="transfer">VIP Transfer</option>
              <option value="yacht">Süperyat Seyri</option>
              <option value="restaurant">Restoran & Fine Dining</option>
              <option value="safari">Çöl Safarisi</option>
              <option value="tour">Şehir Turu</option>
              <option value="helicopter">Helikopter</option>
              <option value="hotel">Otel / Konaklama</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] text-[#F5F1E8]/60 font-mono block mb-1">Başlık</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Örn: Armani Ristorante Akşam Yemeği"
              className="w-full px-3 py-1.5 rounded-lg bg-[#05070F] border border-[rgba(201,166,107,0.20)] text-[#F5F1E8] text-xs placeholder-[#F5F1E8]/30"
            />
          </div>
          <div>
            <label className="text-[11px] text-[#F5F1E8]/60 font-mono block mb-1">Açıklama & Detay</label>
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Örn: 2 Kişi · Terasta Burj Khalifa manzaralı masa"
              className="w-full px-3 py-1.5 rounded-lg bg-[#05070F] border border-[rgba(201,166,107,0.20)] text-[#F5F1E8] text-xs placeholder-[#F5F1E8]/30"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <TravelButton variant="outline" size="sm" onClick={() => setIsAddItemModalOpen(false)}>
              İptal
            </TravelButton>
            <TravelButton variant="primary" size="sm" onClick={handleAddActivity} disabled={!newTitle.trim()}>
              Programa Ekle
            </TravelButton>
          </div>
        </div>
      </TravelDialog>

      {/* Mobile Access Modal */}
      <TravelDialog
        open={isAccessModalOpen}
        onOpenChange={setIsAccessModalOpen}
        title="Misafir Mobil Seyahat Kodu"
        description="Misafirin mobil uygulamadan bu seyahat programına erişmesi için üretilen kod."
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-[#05070F] border border-[rgba(201,166,107,0.15)] space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#F5F1E8]/40 font-mono">Gezi Referansı</span>
              <span className="font-mono text-[#E8C77A] font-semibold">{tripRecord.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#F5F1E8]/40 font-mono">Giriş PIN Kodu</span>
              <span className="font-mono text-base font-bold text-[#F5F1E8] tracking-widest">9201</span>
            </div>
          </div>
          <p className="text-[11px] text-[#F5F1E8]/40 leading-relaxed">
            Misafir bu kodla seyahat programını, şoför ve transfer saatlerini canlı takip edebilir.
          </p>
        </div>
      </TravelDialog>

      {/* Preserved Proposal & Printable Voucher Engine Modal */}
      <ProposalModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        tripData={{
          customerName: customerName,
          title: tripRecord.title,
          hotel: tripRecord.hotel_name || 'Atlantis The Royal',
          dates: `${tripRecord.start_date} — ${tripRecord.end_date}`,
          nights: tripRecord.nights,
          pax: tripRecord.pax_count,
          totalAmount: tripRecord.total_amount,
          itinerary: itineraryDays.map((d) => ({
            day: d.day,
            date: d.date,
            title: d.title,
            items: d.items.map((it) => `${it.time} - ${it.title}`),
          })),
        }}
      />
    </div>
  );
}
