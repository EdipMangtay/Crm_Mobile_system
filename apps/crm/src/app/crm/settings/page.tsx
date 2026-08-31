'use client';

import React, { useState } from 'react';
import {
  Globe,
  Database,
  Building,
  Sliders,
  Palette,
  CheckCircle2,
  Save,
} from 'lucide-react';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { TravelButton } from '@/components/ui/travel/TravelButton';
import { TravelTabs, TravelTabItem } from '@/components/ui/travel/TravelTabs';

export default function SettingsPage() {
  const { tenant, updateTenant } = useTenant();
  const [activeTab, setActiveTab] = useState('general');

  // Form states strictly initialized from active tenant context without hardcoded defaults
  const [displayName, setDisplayName] = useState(tenant.display_name || '');
  const [legalName, setLegalName] = useState(tenant.legal_name || '');
  const [currency, setCurrency] = useState(tenant.default_currency || '');
  const [timezone, setTimezone] = useState(tenant.timezone || '');
  const [contactEmail, setContactEmail] = useState(tenant.settings?.support_email || '');
  const [contactPhone, setContactPhone] = useState(tenant.settings?.contact_phone || '');
  const [savedSuccess, setSavedSuccess] = useState(false);


  // Feature flags state initialized from active tenant features
  const [features, setFeatures] = useState({
    CRM: tenant.features?.CRM ?? true,
    CONCIERGE: tenant.features?.CONCIERGE ?? true,
    MOBILE_APP: tenant.features?.MOBILE_APP ?? true,
    PAYMENTS: tenant.features?.PAYMENTS ?? true,
    AI_COPILOT: tenant.features?.AI_COPILOT ?? true,
    SUPPLIER_MANAGEMENT: tenant.features?.SUPPLIER_MANAGEMENT ?? true,
  });

  const isSupabaseConfigured = Boolean(
    typeof process !== 'undefined' &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTenant({
      display_name: displayName,
      legal_name: legalName,
      default_currency: currency,
      timezone: timezone,
      settings: {
        ...tenant.settings,
        support_email: contactEmail,
        contact_phone: contactPhone,
      },
      features: {
        ...tenant.features,
        ...features,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const tabs: TravelTabItem[] = [
    {
      id: 'general',
      label: 'Genel & Lokasyon',
      icon: <Building className="w-3.5 h-3.5" />,
      badge: undefined,
    },
    {
      id: 'branding',
      label: 'Marka & Kimlik',
      icon: <Palette className="w-3.5 h-3.5" />,
      badge: undefined,
    },
    {
      id: 'integrations',
      label: 'Entegrasyonlar',
      icon: <Database className="w-3.5 h-3.5" />,
      badge: isSupabaseConfigured ? 'Canlı' : 'Demo',
    },
    {
      id: 'features',
      label: 'Özellik Bayrakları',
      icon: <Sliders className="w-3.5 h-3.5" />,
      badge: undefined,
    },
  ];

  return (
    <div className="space-y-6 max-w-[1200px] pb-12">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">
              Acente Yönetimi & Sistem Ayarları
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[#C9A66B] border border-white/10">
              {tenant.slug}
            </span>
          </div>
          <p className="text-xs text-[#F5F1E8]/40 mt-0.5">
            Acente kimliği, para birimi, veritabanı bağlantısı ve modül yönetimi
          </p>
        </div>

        {savedSuccess && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Değişiklikler bu oturum için uygulandı
          </div>
        )}
      </div>

      {/* ─── Tabs Navigation ─────────────────────────────────────────────── */}
      <TravelTabs items={tabs} defaultValue="general" onValueChange={setActiveTab} />

      {/* ─── TAB 1: Genel & Lokasyon ──────────────────────────────────────── */}
      {activeTab === 'general' && (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-[#0B0F1A] border border-white/10 rounded-xl p-6 space-y-5">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <Building className="w-4 h-4 text-[#C9A66B]" />
              <h2 className="text-sm font-semibold text-[#F5F1E8]">Acente & Şirket Profili</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#F5F1E8]/70 mb-1">Acente Görünen Adı</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
                />
              </div>

              <div>
                <label className="block text-xs text-[#F5F1E8]/70 mb-1">Yasal Şirket Unvanı</label>
                <input
                  type="text"
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
                />
              </div>

              <div>
                <label className="block text-xs text-[#F5F1E8]/70 mb-1">Resmi İletişim E-Postası</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
                />
              </div>

              <div>
                <label className="block text-xs text-[#F5F1E8]/70 mb-1">Acente Santral / WhatsApp</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0B0F1A] border border-white/10 rounded-xl p-6 space-y-5">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <Globe className="w-4 h-4 text-[#C9A66B]" />
              <h2 className="text-sm font-semibold text-[#F5F1E8]">Bölge & Para Birimi</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#F5F1E8]/70 mb-1">Varsayılan Operasyon Para Birimi</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
                >
                  <option value="AED">AED — Birleşik Arap Emirlikleri Dirhemi</option>
                  <option value="USD">USD — Amerikan Doları</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="TRY">TRY — Türk Lirası</option>
                  <option value="GBP">GBP — İngiliz Sterlini</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#F5F1E8]/70 mb-1">Acente Saat Dilimi (Timezone)</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
                >
                  <option value="Asia/Dubai">Asia/Dubai (GST UTC+4)</option>
                  <option value="Europe/Istanbul">Europe/Istanbul (TRT UTC+3)</option>
                  <option value="Europe/London">Europe/London (GMT UTC+0)</option>
                  <option value="Europe/Paris">Europe/Paris (CET UTC+1)</option>
                  <option value="America/New_York">America/New_York (EST UTC-5)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <TravelButton variant="primary" size="sm" type="submit">
              <Save className="w-3.5 h-3.5" />
              Oturuma Uygula
            </TravelButton>
          </div>
        </form>
      )}

      {/* ─── TAB 2: Marka & Kimlik ────────────────────────────────────────── */}
      {activeTab === 'branding' && (
        <div className="bg-[#0B0F1A] border border-white/10 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <Palette className="w-4 h-4 text-[#C9A66B]" />
            <h2 className="text-sm font-semibold text-[#F5F1E8]">Marka Kimliği & Renk Paleti</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <span className="text-xs text-[#F5F1E8]/70 block">Acente Logosu & İkonu</span>
              <div className="w-20 h-20 rounded-2xl bg-[#111827] border border-white/10 flex items-center justify-center text-xl font-serif text-[#C9A66B] font-bold">
                {tenant.display_name ? tenant.display_name.charAt(0) : 'T'}
              </div>
              <p className="text-[11px] text-[#F5F1E8]/40">
                Acente portalı ve teklif belgelerinde kullanılan görsel simge.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs text-[#F5F1E8]/70 block">Vurgu Rengi (Primary Accent)</span>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl border border-white/20 shadow-md"
                  style={{ backgroundColor: tenant.primary_color || '#C9A66B' }}
                />
                <div>
                  <p className="text-xs font-mono text-[#F5F1E8] font-bold">
                    {tenant.primary_color || '#C9A66B'}
                  </p>
                  <p className="text-[11px] text-[#F5F1E8]/40">Aktif tema vurgu rengi</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-[#F5F1E8]/60 space-y-1">
            <p className="font-semibold text-[#C9A66B]">TravelOS Tasarım Sistemi Uyumluluğu</p>
            <p className="text-[11px] text-[#F5F1E8]/40 leading-relaxed">
              TravelOS arayüz geometrisi, tipografi standartları ve operasyonel yerleşimleri korurken çoklu tenant renk kimliği ile tam uyum sağlar.
            </p>
          </div>
        </div>
      )}

      {/* ─── TAB 3: Entegrasyonlar ───────────────────────────────────────── */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          {/* Supabase Database */}
          <div className="bg-[#0B0F1A] border border-white/10 rounded-xl p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[#F5F1E8]">Supabase PostgreSQL Veritabanı</h3>
                <p className="text-xs text-[#F5F1E8]/40">
                  Kalıcı CRM verileri, misafir profilleri ve mesajlaşma tabloları
                </p>
              </div>
              <span
                className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium ${
                  isSupabaseConfigured
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}
              >
                {isSupabaseConfigured ? 'Bağlantı Aktif' : 'Demo / Yerel Mod'}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#111827] border border-white/5 text-xs font-mono text-[#F5F1E8]/60 flex items-center justify-between">
              <span>Endpoint:</span>
              <span className="text-[#F5F1E8]/40">
                {isSupabaseConfigured ? process.env.NEXT_PUBLIC_SUPABASE_URL : 'https://[demo-tenant].supabase.co'}
              </span>
            </div>
          </div>

          {/* WhatsApp Cloud API */}
          <div className="bg-[#0B0F1A] border border-white/10 rounded-xl p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[#F5F1E8]">WhatsApp Cloud API</h3>
                <p className="text-xs text-[#F5F1E8]/40">
                  Misafirlerle doğrudan iki yönlü anlık mesajlaşma ve rezervasyon bildirimleri
                </p>
              </div>
              <span className="px-2.5 py-1 rounded text-[11px] font-mono font-medium bg-white/5 text-[#F5F1E8]/40 border border-white/5">
                Konfigüre Edilmedi
              </span>
            </div>
            <p className="text-[11px] text-[#F5F1E8]/40">
              API anahtarları ortam değişkenleri (Meta Business Platform) üzerinden tanımlanır.
            </p>
          </div>
        </div>
      )}

      {/* ─── TAB 4: Özellik Bayrakları ───────────────────────────────────── */}
      {activeTab === 'features' && (
        <div className="bg-[#0B0F1A] border border-white/10 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <Sliders className="w-4 h-4 text-[#C9A66B]" />
            <h2 className="text-sm font-semibold text-[#F5F1E8]">Acente Modül & Özellik Bayrakları</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                id: 'CRM' as const,
                title: 'Temel CRM & Müşteri Yönetimi',
                desc: 'Müşteri profilleri, gezi kayıtları ve teklif oluşturucu',
                enabled: features.CRM,
              },
              {
                id: 'CONCIERGE' as const,
                title: 'VIP Concierge & İletişim Masası',
                desc: 'Çok kanallı misafir mesajlaşma ve talep takip sistemi',
                enabled: features.CONCIERGE,
              },
              {
                id: 'PAYMENTS' as const,
                title: 'Finans & Ödeme Takibi',
                desc: 'Tedarikçi maliyetleri, brüt kâr katkısı ve tahsilat kayıtları',
                enabled: features.PAYMENTS,
              },
              {
                id: 'AI_COPILOT' as const,
                title: 'AI Seyahat & Concierge Asistanı',
                desc: 'Özet çıkarımı, otomatik yanıt taslakları ve öneri motoru',
                enabled: features.AI_COPILOT,
              },
            ].map((feat) => (
              <div
                key={feat.id}
                className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-xs font-semibold text-[#F5F1E8]">{feat.title}</h3>
                  <p className="text-[11px] text-[#F5F1E8]/40 mt-0.5">{feat.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFeatures((prev) => ({ ...prev, [feat.id]: !prev[feat.id] }))
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    features[feat.id] ? 'bg-[#C9A66B]' : 'bg-white/10'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-[#05070F] absolute top-1 transition-transform ${
                      features[feat.id] ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-white/5">
            <TravelButton variant="primary" size="sm" onClick={handleSave}>
              <Save className="w-3.5 h-3.5" />
              Oturuma Uygula
            </TravelButton>
          </div>
        </div>
      )}
    </div>
  );
}
