'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Globe, Shield, Building2, Plus, X, ExternalLink, Search, Play, Pause
} from 'lucide-react';
import { tenantRegistry } from '@/lib/tenancy/tenantContext';
import { Tenant, TenantStatus, TenantPlan, TenantFeatures } from '@/shared/types/models';

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

  const filteredTenants = tenants.filter(t =>
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
    const updated = tenantRegistry.toggleTenantFeature(tenantId, feature, !tenant.features[feature]);
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
    <div className="min-h-screen bg-[#060913] text-[#F5F1E8] p-6 lg:p-10 font-sans">
      {/* Platform Header */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">TRAVEL OS</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  PLATFORM CONTROL PLANE
                </span>
              </div>
              <p className="text-xs text-white/40 mt-0.5">Multi-Tenant Fleet Management & Tenant Provisioning Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/crm"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/70 hover:text-white transition-all flex items-center gap-1.5"
            >
              <span>Tenant #001 (Travia CRM)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setIsProvisionOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Acente / Tenant Oluştur</span>
            </button>
          </div>
        </div>

        {/* Global Platform KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0B0F1A] border border-white/10 space-y-1">
            <span className="text-[10px] font-mono uppercase text-white/40">Kayıtlı Tenant Sayısı</span>
            <p className="text-2xl font-bold text-white font-mono">{stats.totalTenants}</p>
            <p className="text-[11px] text-emerald-400 font-mono">● {stats.activeTenants} Aktif Operasyonda</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B0F1A] border border-white/10 space-y-1">
            <span className="text-[10px] font-mono uppercase text-white/40">Platform Sağlığı</span>
            <p className="text-2xl font-bold text-emerald-400 font-mono">100%</p>
            <p className="text-[11px] text-white/40 font-mono">Sıfır Kesinti · PostgreSQL OK</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B0F1A] border border-white/10 space-y-1">
            <span className="text-[10px] font-mono uppercase text-white/40">Veritabanı İzolasyonu</span>
            <p className="text-2xl font-bold text-cyan-400 font-mono">Row RLS</p>
            <p className="text-[11px] text-white/40 font-mono">Security Definer + Memb. Key</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B0F1A] border border-white/10 space-y-1">
            <span className="text-[10px] font-mono uppercase text-white/40">Aktif Depolama</span>
            <p className="text-2xl font-bold text-white font-mono">{stats.totalStorageGB} GB</p>
            <p className="text-[11px] text-white/40 font-mono">Voucher & Belge Havuzu</p>
          </div>
        </div>

        {/* Search & Tenants Table */}
        <div className="bg-[#0B0F1A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-white/10 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Acente adı, slug veya domain ile ara..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="text-xs text-white/40 font-mono">
              Toplam {filteredTenants.length} Tenant Listeleniyor
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-white/[0.02] border-b border-white/5 text-white/40 font-mono uppercase text-[10px]">
                <tr>
                  <th className="px-5 py-3.5">Tenant / Şirket</th>
                  <th className="px-5 py-3.5">Slug & ID</th>
                  <th className="px-5 py-3.5">Plan</th>
                  <th className="px-5 py-3.5">Para Birimi & Bölge</th>
                  <th className="px-5 py-3.5">Durum</th>
                  <th className="px-5 py-3.5 text-right">Yönetim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTenants.map(t => (
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
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-md shrink-0"
                          style={{ backgroundColor: t.primary_color }}
                        >
                          {t.display_name.slice(0, 1)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{t.display_name}</p>
                          <p className="text-[11px] text-white/40">{t.legal_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] text-white/60">
                      <span className="text-cyan-400 font-semibold">{t.slug}</span>
                      <p className="text-[10px] text-white/30 truncate max-w-[140px]">{t.id}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-white/5 border border-white/10 text-white/80">
                        {t.plan}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] text-white/60">
                      <span className="text-white font-semibold">{t.default_currency}</span> · {t.timezone}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                        t.status === 'active'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : t.status === 'trial'
                          ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                          : 'bg-red-500/15 text-red-400 border border-red-500/30'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {t.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTenant(t);
                        }}
                        className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
                      >
                        Yapılandır
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Tenant Inspection & Feature Flags Drawer */}
        {selectedTenant && (
          <div className="bg-[#0B0F1A] border border-cyan-500/30 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-lg shadow-lg"
                  style={{ backgroundColor: selectedTenant.primary_color }}
                >
                  {selectedTenant.display_name.slice(0, 1)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {selectedTenant.display_name}
                    <span className="text-xs font-mono font-normal text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      ID: {selectedTenant.id}
                    </span>
                  </h3>
                  <p className="text-xs text-white/50">{selectedTenant.legal_name} · Domain: {selectedTenant.domain || 'travelos.app/' + selectedTenant.slug}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedTenant.status === 'active' ? (
                  <button
                    onClick={() => handleStatusChange(selectedTenant.id, 'suspended')}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-1.5 transition-all"
                  >
                    <Pause className="w-3.5 h-3.5" />
                    <span>Askıya Al (Suspend)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusChange(selectedTenant.id, 'active')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1.5 transition-all"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Etkinleştir (Activate)</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedTenant(null)}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Feature Modules Grid */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">
                Aktif Modüller & Özellik Paketleri (Tenant Feature Flags)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(Object.keys(selectedTenant.features) as (keyof TenantFeatures)[]).map(feature => {
                  const isEnabled = selectedTenant.features[feature];
                  return (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => handleFeatureToggle(selectedTenant.id, feature)}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isEnabled
                          ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                          : 'bg-white/[0.02] border-white/5 text-white/30 hover:border-white/20'
                      }`}
                    >
                      <span className="text-xs font-mono font-medium">{feature}</span>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isEnabled ? 'bg-cyan-400 text-black font-bold' : 'bg-white/10 text-white/40'
                      }`}>
                        {isEnabled ? '✓' : '×'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Tenant Provisioning Wizard Modal (Section 20 & 32) */}
      {isProvisionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0B0F1A] border border-cyan-500/40 rounded-3xl p-6 lg:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9)] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Yeni Acente / Tenant Tahsis Et</h3>
              </div>
              <button onClick={() => setIsProvisionOpen(false)} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleProvisionTenant} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-cyan-400 mb-1">Ticari Ünvan (Legal Name) *</label>
                  <input
                    type="text"
                    required
                    value={wizardData.legal_name}
                    onChange={e => setWizardData({ ...wizardData, legal_name: e.target.value })}
                    placeholder="Örn: Horizon Luxury Travel Ltd."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-cyan-400 mb-1">Marka Adı (Display Name) *</label>
                  <input
                    type="text"
                    required
                    value={wizardData.display_name}
                    onChange={e => setWizardData({ ...wizardData, display_name: e.target.value })}
                    placeholder="Örn: Horizon Travel"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-cyan-400 mb-1">Tenant Slug (Subdomain) *</label>
                  <input
                    type="text"
                    required
                    value={wizardData.slug}
                    onChange={e => setWizardData({ ...wizardData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                    placeholder="Örn: horizon"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-cyan-400 mb-1">Abonelik Paketi *</label>
                  <select
                    value={wizardData.plan}
                    onChange={e => setWizardData({ ...wizardData, plan: e.target.value as TenantPlan })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="starter">Starter Plan</option>
                    <option value="professional">Professional Plan</option>
                    <option value="premium">Premium Plan</option>
                    <option value="enterprise">Enterprise Plan</option>
                    <option value="founding_partner">Founding Partner</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-cyan-400 mb-1">Para Birimi</label>
                  <select
                    value={wizardData.default_currency}
                    onChange={e => setWizardData({ ...wizardData, default_currency: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-xs text-white focus:outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="AED">AED (د.إ)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="TRY">TRY (₺)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-cyan-400 mb-1">Zaman Dilimi</label>
                  <input
                    type="text"
                    value={wizardData.timezone}
                    onChange={e => setWizardData({ ...wizardData, timezone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-cyan-400 mb-1">Ana Renk Kodu</label>
                  <input
                    type="text"
                    value={wizardData.primary_color}
                    onChange={e => setWizardData({ ...wizardData, primary_color: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-cyan-400 mb-1">Acente Yönetici E-Postası (Admin Account) *</label>
                <input
                  type="email"
                  required
                  value={wizardData.admin_email}
                  onChange={e => setWizardData({ ...wizardData, admin_email: e.target.value })}
                  placeholder="admin@horizon.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 border-t border-white/10">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                >
                  <Shield className="w-4 h-4" />
                  <span>Acenteyi Canlıya Al (Provision Tenant)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
