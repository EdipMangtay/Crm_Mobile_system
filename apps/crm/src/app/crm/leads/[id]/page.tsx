'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Calendar,
  Plus,
  UserCheck,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import {
  TravelBadge,
  TravelButton,
  TravelDialog,
} from '@/components/ui/travel';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { LEAD_STAGES, COUNTRY_FLAGS, type LeadStage } from '@/types';
import { traviaData } from '@/shared/data/traviaData';

export default function LeadDetailPage() {
  const params = useParams<{ id: string }>();
  const leadId = params?.id || '';
  const { formatMoney } = useTenant();

  const leadRecord = traviaData.getLead(leadId);

  const [currentStage, setCurrentStage] = React.useState<LeadStage>(
    (leadRecord?.stage as LeadStage) || 'new'
  );
  const [noteInput, setNoteInput] = React.useState('');
  const [copiedId, setCopiedId] = React.useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = React.useState(false);
  const [isConverted, setIsConverted] = React.useState(false);

  const [timeline, setTimeline] = React.useState([
    {
      time: '27 Ağu 14:15',
      title: 'İletişim Kuruldu',
      desc: `${leadRecord?.assigned_to || 'Danışman'}: Misafir ile görüşüldü. Tercihler ve tarihler güncellendi.`,
      user: leadRecord?.assigned_to?.split(' ')[0] || 'Deniz',
    },
    {
      time: '26 Ağu 11:00',
      title: 'Aşama Güncellendi',
      desc: `Lead "${leadRecord?.stage || 'qualified'}" aşamasına alındı.`,
      user: 'Sistem',
    },
    {
      time: '25 Ağu 14:30',
      title: 'Lead Oluşturuldu',
      desc: `${leadRecord?.source || 'Web Sitesi'} üzerinden talep formu alındı.`,
      user: 'Sistem',
    },
  ]);

  if (!leadRecord) {
    return (
      <div className="space-y-5 max-w-[1400px] select-none">
        <Link
          href="/crm/leads"
          className="inline-flex items-center gap-1.5 text-xs text-[#F5F1E8]/40 hover:text-[#C9A66B] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Leads Listesine Dön
        </Link>
        <div className="bg-[#0B0F1A] border border-rose-500/20 rounded-xl p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-rose-400" />
          </div>
          <h2 className="text-base font-semibold text-[#F5F1E8] mb-1">Lead Bulunamadı</h2>
          <p className="text-xs text-[#F5F1E8]/40 mb-6 leading-relaxed">
            Aradığınız ID (<code className="text-[#C9A66B] font-mono">{leadId}</code>) ile eşleşen bir potansiyel müşteri bulunamadı.
          </p>
          <Link href="/crm/leads">
            <TravelButton variant="primary" size="sm">
              Lead Havuzuna Dön
            </TravelButton>
          </Link>
        </div>
      </div>
    );
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(leadRecord.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    const newEntry = {
      time: 'Şimdi',
      title: 'Dahili Not Eklendi',
      desc: noteInput.trim(),
      user: 'Danışman',
    };
    setTimeline([newEntry, ...timeline]);
    setNoteInput('');
  };

  const handleStageChange = (newStage: LeadStage) => {
    setCurrentStage(newStage);
    const stageLabel = LEAD_STAGES.find((s) => s.value === newStage)?.label || newStage;
    setTimeline((prev) => [
      {
        time: 'Şimdi',
        title: 'Aşama Güncellendi',
        desc: `Satış aşaması "${stageLabel}" olarak güncellendi.`,
        user: 'Danışman',
      },
      ...prev,
    ]);
  };

  // Deterministic AI Lead Intelligence Brief
  const aiLeadBrief = `${leadRecord.first_name} ${leadRecord.last_name}, ${leadRecord.source} kaynağından gelen %${leadRecord.lead_score} nitelik skorlu bir potansiyel misafirdir. ${leadRecord.pax_count} kişi için ${leadRecord.travel_start_date} başlangıçlı ${leadRecord.travel_type || 'VIP seyahat'} planlamaktadır. Tahmini bütçe ${formatMoney(leadRecord.estimated_value)} olup, önerilen sonraki aksiyon: Özel Teklif PDF iletmek ve VIP otel kontenjanını rezerve etmektir.`;

  return (
    <div className="space-y-5 max-w-[1500px] select-none">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Link
          href="/crm/leads"
          className="inline-flex items-center gap-1.5 text-xs text-[#F5F1E8]/40 hover:text-[#C9A66B] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Leads Listesine Dön
        </Link>
        <button
          onClick={handleCopyId}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#F5F1E8]/40 hover:text-[#E8C77A] transition-colors"
          title="Lead UUID Kopyala"
        >
          {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>ID: {leadRecord.id.slice(0, 8)}...</span>
        </button>
      </div>

      {/* Record Header */}
      <div className="p-6 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
          {/* Identity */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A66B]/20 to-[#C9A66B]/5 border border-[#C9A66B]/30 flex items-center justify-center font-serif text-lg font-bold text-[#E8C77A] shrink-0 shadow-sm">
              {leadRecord.first_name[0]}
              {leadRecord.last_name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">
                  {leadRecord.first_name} {leadRecord.last_name}
                </h1>
                <span className="text-base">{COUNTRY_FLAGS[leadRecord.country] || '🌍'}</span>
                <TravelBadge variant="gold" size="sm">
                  Skor: %{leadRecord.lead_score}
                </TravelBadge>
                {isConverted ? (
                  <TravelBadge variant="success" size="sm">
                    Müşteriye Dönüştürüldü
                  </TravelBadge>
                ) : (
                  <TravelBadge variant="info" size="sm">
                    Potansiyel Lead
                  </TravelBadge>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-[#F5F1E8]/40 flex-wrap">
                <span>Kaynak: <strong className="text-[#F5F1E8]/70 font-normal">{leadRecord.source}</strong></span>
                <span>·</span>
                <span>Temsilci: <strong className="text-[#E8C77A] font-normal">{leadRecord.assigned_to}</strong></span>
                <span>·</span>
                <span>Kayıt: <strong className="text-[#F5F1E8]/70 font-normal font-mono">{leadRecord.created_at.split('T')[0]}</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0 self-start">
            <a
              href={`https://wa.me/${(leadRecord.whatsapp || leadRecord.phone || '').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TravelButton variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-[rgba(201,166,107,0.15)] text-emerald-400 hover:bg-emerald-500/10">
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </TravelButton>
            </a>
            <a href={`tel:${leadRecord.phone}`}>
              <TravelButton variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-[rgba(201,166,107,0.15)] text-[#F5F1E8]/80 hover:text-[#F5F1E8]">
                <Phone className="w-3.5 h-3.5 text-[#C9A66B]" />
                <span className="hidden sm:inline">Ara</span>
              </TravelButton>
            </a>
            <TravelButton
              variant="primary"
              size="sm"
              onClick={() => setIsConvertModalOpen(true)}
              className="h-8 text-xs font-semibold gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{isConverted ? 'Müşteri Profilini Aç' : 'Müşteriye Dönüştür'}</span>
            </TravelButton>
          </div>
        </div>

        {/* Pipeline Stage Progression Stepper */}
        <div className="mt-6 pt-5 border-t border-[rgba(201,166,107,0.08)]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#F5F1E8]/40 mb-2.5">
            Satış Hunisi (Pipeline Aşaması)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
            {LEAD_STAGES.map((stg) => {
              const isActive = currentStage === stg.value;
              return (
                <button
                  key={stg.value}
                  onClick={() => handleStageChange(stg.value)}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-center transition-all ${
                    isActive
                      ? 'bg-[#C9A66B] text-[#05070F] font-semibold shadow-[0_0_12px_rgba(201,166,107,0.25)]'
                      : 'bg-[#101524] border border-[rgba(201,166,107,0.10)] text-[#F5F1E8]/50 hover:border-[rgba(201,166,107,0.25)] hover:text-[#F5F1E8]'
                  }`}
                >
                  {stg.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Embedded Contextual AI Lead Brief */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#101524] to-[#0B0F1A] border border-[rgba(201,166,107,0.18)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[rgba(201,166,107,0.10)] border border-[rgba(201,166,107,0.20)] flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-[#C9A66B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A66B] font-semibold">
                AI Fırsat Değerlendirme & Nitelik Özeti
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#05070F] text-[#F5F1E8]/40 border border-[rgba(201,166,107,0.10)]">
                Sales Copilot
              </span>
            </div>
            <p className="text-xs text-[#F5F1E8]/80 mt-1 leading-relaxed">{aiLeadBrief}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <TravelButton
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard.writeText(aiLeadBrief)}
            className="h-7 text-[11px] border-[rgba(201,166,107,0.15)] text-[#F5F1E8]/70 hover:text-[#F5F1E8]"
          >
            Özeti Kopyala
          </TravelButton>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Preferences & Activity Timeline */}
        <div className="lg:col-span-2 space-y-5">
          {/* Trip Request Box */}
          <div className="p-5 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)]">
            <h2 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C9A66B]" /> Seyahat Tercihleri ve Bütçe
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)]">
                <span className="text-[10px] text-[#F5F1E8]/40 font-mono uppercase block">Tahmini Bütçe</span>
                <p className="text-base font-semibold text-[#E8C77A] font-mono mt-0.5">
                  {formatMoney(leadRecord.estimated_value)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)]">
                <span className="text-[10px] text-[#F5F1E8]/40 font-mono uppercase block">Kişi Sayısı</span>
                <p className="text-base font-semibold text-[#F5F1E8] mt-0.5">{leadRecord.pax_count} Misafir</p>
              </div>
              <div className="p-3 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)]">
                <span className="text-[10px] text-[#F5F1E8]/40 font-mono uppercase block">Tarih Aralığı</span>
                <p className="font-medium text-[#F5F1E8] font-mono text-[11px] mt-1 truncate">
                  {leadRecord.travel_start_date}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)]">
                <span className="text-[10px] text-[#F5F1E8]/40 font-mono uppercase block">Seyahat Türü</span>
                <p className="font-medium text-[#F5F1E8] text-xs mt-1 truncate">{leadRecord.travel_type}</p>
              </div>
            </div>

            {/* Requested Interests */}
            {leadRecord.interests && leadRecord.interests.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[rgba(201,166,107,0.08)]">
                <span className="text-[10px] text-[#F5F1E8]/40 font-mono uppercase block mb-2">
                  İlgilenilen İmza Hizmetler
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {leadRecord.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-[#101524] border border-[rgba(201,166,107,0.15)] text-[#E8C77A] text-xs font-medium"
                    >
                      ✦ {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Guest Notes */}
            <div className="mt-4 pt-4 border-t border-[rgba(201,166,107,0.08)]">
              <span className="text-[10px] text-[#F5F1E8]/40 font-mono uppercase block mb-1">
                Misafir Ön Talep Notu
              </span>
              <p className="text-xs text-[#F5F1E8]/70 leading-relaxed bg-[#101524]/60 p-3 rounded-lg border border-[rgba(201,166,107,0.06)] italic">
                &quot;{leadRecord.notes || 'Özel bir not iletilmedi.'}&quot;
              </p>
            </div>
          </div>

          {/* Timeline & Notes */}
          <div className="p-5 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)]">
            <h2 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono mb-4">
              Etkileşim ve Takip Günlüğü
            </h2>

            {/* Add note input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                placeholder="Bu lead için arama veya görüşme notu ekleyin..."
                className="flex-1 px-3 py-2 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.14)] text-xs text-[#F5F1E8] placeholder-[#F5F1E8]/30 focus:outline-none focus:border-[#C9A66B]/50"
              />
              <TravelButton
                variant="primary"
                size="sm"
                onClick={handleAddNote}
                disabled={!noteInput.trim()}
                className="h-8 text-xs font-semibold gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ekle</span>
              </TravelButton>
            </div>

            {/* Timeline list */}
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[rgba(201,166,107,0.12)]" />
              {timeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full bg-[#101524] border-2 border-[#C9A66B] group-hover:scale-125 transition-transform" />
                  <div className="p-3 rounded-lg bg-[#101524]/60 border border-[rgba(201,166,107,0.06)]">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#F5F1E8]">{item.title}</p>
                      <span className="text-[10px] font-mono text-[#F5F1E8]/35">{item.time}</span>
                    </div>
                    <p className="text-xs text-[#F5F1E8]/60 mt-1 leading-relaxed">{item.desc}</p>
                    <p className="text-[10px] text-[#C9A66B]/70 mt-1 font-mono">Yetkili: {item.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Lead Score */}
        <div className="space-y-5">
          {/* Contact Details */}
          <div className="p-5 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)] space-y-3">
            <h3 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono">
              İletişim Bilgileri
            </h3>
            <div className="space-y-2 text-xs">
              <a
                href={`mailto:${leadRecord.email}`}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)] hover:border-[rgba(201,166,107,0.25)] text-[#F5F1E8]/80 hover:text-[#F5F1E8] transition-colors"
              >
                <span className="font-mono text-[11px] truncate">{leadRecord.email}</span>
              </a>
              <a
                href={`tel:${leadRecord.phone}`}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)] hover:border-[rgba(201,166,107,0.25)] text-[#F5F1E8]/80 hover:text-[#F5F1E8] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A66B]" />
                <span className="font-mono text-[11px]">{leadRecord.phone}</span>
              </a>
              <a
                href={`https://wa.me/${(leadRecord.whatsapp || leadRecord.phone || '').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.08)] hover:border-[rgba(201,166,107,0.25)] text-[#F5F1E8]/80 hover:text-[#F5F1E8] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-[11px]">{leadRecord.whatsapp || leadRecord.phone} (WhatsApp)</span>
              </a>
            </div>
          </div>

          {/* Lead Qualification Score */}
          <div className="p-5 rounded-xl bg-[#0B0F1A] border border-[rgba(201,166,107,0.12)] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-[#F5F1E8]/70 uppercase tracking-wider font-mono">
                Nitelik Skoru
              </h3>
              <span className="font-mono text-xs font-bold text-[#E8C77A]">{leadRecord.lead_score}%</span>
            </div>
            <div className="h-2 bg-[#05070F] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${leadRecord.lead_score}%`,
                  backgroundColor:
                    leadRecord.lead_score > 75 ? '#10B981' : leadRecord.lead_score > 50 ? '#FBBF24' : '#EF4444',
                }}
              />
            </div>
            <p className="text-[11px] text-[#F5F1E8]/40 leading-relaxed">
              Bütçe uygunluğu, talep edilen tarihler ve lüks seyahat ilgi alanları doğrultusunda hesaplanmıştır.
            </p>
          </div>
        </div>
      </div>

      {/* Customer Conversion Modal */}
      <TravelDialog
        open={isConvertModalOpen}
        onOpenChange={setIsConvertModalOpen}
        title="Lead'i Müşteri Portföyüne Dönüştür"
        description="Bu işlem lead kaydını onaylanmış CRM misafirine dönüştürür ve müşteri 360 profilini oluşturur."
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-[#05070F] border border-[rgba(201,166,107,0.15)] space-y-2">
            <div className="flex justify-between">
              <span className="text-[#F5F1E8]/40">Müşteri Adı:</span>
              <span className="font-semibold text-[#F5F1E8]">{leadRecord.first_name} {leadRecord.last_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#F5F1E8]/40">Tahmini Bütçe (LTV):</span>
              <span className="font-mono text-[#E8C77A] font-semibold">{formatMoney(leadRecord.estimated_value)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#F5F1E8]/40">Atanan Danışman:</span>
              <span className="text-[#F5F1E8]">{leadRecord.assigned_to}</span>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <TravelButton
              variant="outline"
              size="sm"
              onClick={() => setIsConvertModalOpen(false)}
            >
              İptal
            </TravelButton>
            <TravelButton
              variant="primary"
              size="sm"
              onClick={() => {
                setIsConverted(true);
                setCurrentStage('booked');
                setIsConvertModalOpen(false);
              }}
            >
              Dönüşümü Onayla & Profili Aç
            </TravelButton>
          </div>
        </div>
      </TravelDialog>
    </div>
  );
}
