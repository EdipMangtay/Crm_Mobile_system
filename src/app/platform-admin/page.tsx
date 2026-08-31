'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  Plus,
  X,
  ExternalLink,
  Search,
} from 'lucide-react';
import { tenantRegistry } from '@/lib/tenancy/tenantContext';
import { Tenant, TenantStatus, TenantPlan, TenantFeatures } from '@/shared/types/models';
import { TravelButton } from '@/components/ui/travel/TravelButton';
import { TravelDialog } from '@/components/ui/travel/TravelDialog';

export default function PlatformAdminDashboard() {
  const [tenants, setTenants] = useState<Tenant[]>(() => tenantRegistry.getAllTenants());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [isProvisionOpen, setIsProvisionOpen] = useState(false);

  // New Tenant Wizard state
  const [wizardData, setWizardData] = useState({
    legal_name: '',
    display_name: '',
    slug: '',
    plan: 'professional' as TenantPlan,
    default_currency: 'USD',
    timezone: 'Europe/London',
    default_language: 'en',
    primary_color: '#3B82F6',
    secondary_color: '#0F172A',
    admin_email: '',
    custom_domain: '',
  });

  const stats = tenantRegistry.getPlatformStats();

  const filteredTenants = tenants.filter(
    (t) =>
      t.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.legal_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (tenantId: string, newStatus: TenantStatus) => {
    const updated = tenantRegistry.updateTenantStatus(tenantId, newStatus);
    setTenants(tenantRegistry.getAllTenants());
    if (selectedTenant?.id === tenantId) {
      setSelectedTenant(updated);
    }
  };

  const handleFeatureToggle = (tenantId: string, feature: keyof TenantFeatures) => {
    const tenant = tenantRegistry.getTenantById(tenantId);
    const updated = tenantRegistry.toggleTenantFeature(
      tenantId,
      feature,
      !tenant.features[feature]
    );
    setTenants(tenantRegistry.getAllTenants());
    setSelectedTenant(updated);
  };

  const handleProvisionTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wizardData.display_name || !wizardData.slug) return;

    const created = tenantRegistry.createTenant(wizardData);
    setTenants(tenantRegistry.getAllTenants());
    setIsProvisionOpen(false);
    setSelectedTenant(created);

    // Reset wizard
    setWizardData({
      legal_name: '',
      display_name: '',
      slug: '',
      plan: 'professional',
      default_currency: 'USD',
      timezone: 'Europe/London',
      default_language: 'en',
      primary_color: '#3B82F6',
      secondary_color: '#0F172A',
      admin_email: '',
      custom_domain: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#05070F] text-[#F5F1E8] p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ─── Platform Header ────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">TRAVEL OS</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  PLATFORM KONTROL MERKEZİ
                </span>
              </div>
              <p className="text-xs text-white/40 mt-0.5">
                Çoklu acente kayıt defteri ve oturum tenant yönetim paneli
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/crm"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/70 hover:text-white transition-all flex items-center gap-1.5"
            >
              <span>Acente CRM Görünümü</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <TravelButton
              variant="primary"
              size="sm"
              onClick={() => setIsProvisionOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Yeni Acente Tanımla
            </TravelButton>
          </div>
        </div>

        {/* ─── Authentic Platform Registry Metrics ────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#0B0F1A] border border-cyan-500/15 space-y-1">
            <span className="text-[10px] font-mono uppercase text-white/40">Kayıtlı Acente Sayısı</span>
            <p className="text-2xl font-bold text-white font-mono">{stats.totalTenants}</p>
            <p className="text-[11px] text-white/40 font-mono">Kayıt Defteri Havuzu</p>
          </div>

          <div className="p-5 rounded-xl bg-[#0B0F1A] border border-cyan-500/15 space-y-1">
            <span className="text-[10px] font-mono uppercase text-white/40">Aktif Operasyonlar</span>
            <p className="text-2xl font-bold text-emerald-400 font-mono">{stats.activeTenants}</p>
            <p className="text-[11px] text-white/40 font-mono">Çalışır Durumda</p>
          </div>

          <div className="p-5 rounded-xl bg-[#0B0F1A] border border-cyan-500/15 space-y-1">
            <span className="text-[10px] font-mono uppercase text-white/40">Deneme / Trial</span>
            <p className="text-2xl font-bold text-amber-400 font-mono">{stats.trialTenants}</p>
            <p className="text-[11px] text-white/40 font-mono">Değerlendirme Modunda</p>
          </div>

          <div className="p-5 rounded-xl bg-[#0B0F1A] border border-cyan-500/15 space-y-1">
            <span className="text-[10px] font-mono uppercase text-white/40">Askıda (Suspended)</span>
            <p className="text-2xl font-bold text-rose-400 font-mono">{stats.suspendedTenants}</p>
            <p className="text-[11px] text-white/40 font-mono">Durdurulan Tenant</p>
          </div>
        </div>

        {/* ─── Search & Tenants Table ─────────────────────────────────────── */}
        <div className="bg-[#0B0F1A] border border-cyan-500/15 rounded-xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-white/10 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Acente adı, slug veya unvan ile ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="text-xs text-white/40 font-mono">
              Toplam {filteredTenants.length} Acente Listeleniyor
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-white/[0.02] border-b border-white/5 text-white/40 font-mono uppercase text-[10px]">
                <tr>
                  <th className="px-5 py-3.5">Tenant / Acente</th>
                  <th className="px-5 py-3.5">Slug & ID</th>
                  <th className="px-5 py-3.5">Hizmet Planı</th>
                  <th className="px-5 py-3.5">Para Birimi / Dil</th>
                  <th className="px-5 py-3.5">Durum</th>
                  <th className="px-5 py-3.5 text-right">Detay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTenants.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => setSelectedTenant(t)}
                    className={`hover:bg-white/[0.03] cursor-pointer transition-colors ${
                      selectedTenant?.id === t.id ? 'bg-cyan-500/10' : ''
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                          style={{
                            backgroundColor: (t.primary_color || '#3B82F6') + '25',
                            color: t.primary_color || '#3B82F6',
                            border: `1px solid ${t.primary_color || '#3B82F6'}40`,
                          }}
                        >
                          {t.display_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{t.display_name}</p>
                          <p className="text-[11px] text-white/40">{t.legal_name}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 font-mono text-[11px] text-white/70">
                      <span className="text-cyan-400">@{t.slug}</span>
                    </td>

                    <td className="px-5 py-4 font-mono text-xs">
                      <span className="capitalize text-white/80">{t.plan.replace('_', ' ')}</span>
                    </td>

                    <td className="px-5 py-4 font-mono text-xs text-white/60">
                      <span>{t.default_currency}</span> · <span className="uppercase">{t.default_language}</span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-medium ${
                          t.status === 'active'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : t.status === 'trial'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {t.status.toUpperCase()}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTenant(t);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-white/70 hover:text-white transition-all font-mono"
                      >
                        İncele
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── Selected Tenant Detail Drawer ──────────────────────────────── */}
        {selectedTenant && (
          <div className="bg-[#0B0F1A] border border-cyan-500/20 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                  style={{
                    backgroundColor: (selectedTenant.primary_color || '#3B82F6') + '25',
                    color: selectedTenant.primary_color || '#3B82F6',
                    border: `1px solid ${selectedTenant.primary_color || '#3B82F6'}40`,
                  }}
                >
                  {selectedTenant.display_name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">{selectedTenant.display_name}</h2>
                  <p className="text-xs text-white/40 font-mono">ID: {selectedTenant.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedTenant(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Meta */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase text-white/40">Acente Profili</h3>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
                  <div>
                    <span className="text-white/40 block text-[10px]">Yasal Unvan:</span>
                    <span className="text-white font-medium">{selectedTenant.legal_name}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">Saat Dilimi:</span>
                    <span className="text-white font-mono">{selectedTenant.timezone}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">Özel Domain:</span>
                    <span className="text-cyan-400 font-mono">{selectedTenant.domain || 'Tanımlanmadı'}</span>
                  </div>
                </div>
              </div>

              {/* Status Management */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase text-white/40">Oturum Durumu</h3>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                  <div className="flex items-center gap-2">
                    {(['active', 'trial', 'suspended'] as TenantStatus[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(selectedTenant.id, st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all uppercase ${
                          selectedTenant.status === st
                            ? 'bg-cyan-500 text-black font-bold'
                            : 'bg-white/5 text-white/50 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-white/40">
                    Durum değişikliği aktif in-memory oturumunda anında uygulanır.
                  </p>
                </div>
              </div>

              {/* Module Toggles */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase text-white/40">Modül Yetkileri</h3>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
                  {(Object.keys(selectedTenant.features) as (keyof TenantFeatures)[]).slice(0, 4).map((f) => (
                    <div key={f} className="flex items-center justify-between">
                      <span className="text-white/70 font-mono text-[11px]">{f}</span>
                      <button
                        onClick={() => handleFeatureToggle(selectedTenant.id, f)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          selectedTenant.features[f]
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-white/5 text-white/30'
                        }`}
                      >
                        {selectedTenant.features[f] ? 'AÇIK' : 'KAPALI'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Provision Wizard Dialog ────────────────────────────────────── */}
        <TravelDialog
          open={isProvisionOpen}
          onOpenChange={setIsProvisionOpen}
          title="Oturuma Yeni Acente Tanımla"
          description="Kayıt defterine oturum boyunca geçerli yeni bir acente profili ekleyin."
        >
          <form onSubmit={handleProvisionTenant} className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/70 mb-1">Görünen Ad</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Bosphorus VIP"
                  value={wizardData.display_name}
                  onChange={(e) => setWizardData({ ...wizardData, display_name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs text-white/70 mb-1">Slug / Tanımlayıcı</label>
                <input
                  type="text"
                  required
                  placeholder="bosphorus"
                  value={wizardData.slug}
                  onChange={(e) => setWizardData({ ...wizardData, slug: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/70 mb-1">Yasal Şirket Unvanı</label>
              <input
                type="text"
                placeholder="Bosphorus Travel A.Ş."
                value={wizardData.legal_name}
                onChange={(e) => setWizardData({ ...wizardData, legal_name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/70 mb-1">Hizmet Planı</label>
                <select
                  value={wizardData.plan}
                  onChange={(e) => setWizardData({ ...wizardData, plan: e.target.value as TenantPlan })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="starter">Starter</option>
                  <option value="professional">Professional</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-white/70 mb-1">Para Birimi</label>
                <select
                  value={wizardData.default_currency}
                  onChange={(e) => setWizardData({ ...wizardData, default_currency: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="AED">AED (د.إ)</option>
                  <option value="TRY">TRY (₺)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-300">
              ℹ Tanımlanan acente oturum süresince tenant havuzuna eklenir.
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
              <TravelButton
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setIsProvisionOpen(false)}
              >
                İptal
              </TravelButton>
              <TravelButton variant="primary" size="sm" type="submit">
                Acenteyi Tanımla
              </TravelButton>
            </div>
          </form>
        </TravelDialog>
      </div>
    </div>
  );
}
