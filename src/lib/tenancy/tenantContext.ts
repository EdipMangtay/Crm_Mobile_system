/**
 * TRAVEL OS — Multi-Tenant Resolution & Kernel Context Engine
 * Principle: ONE PLATFORM · MANY TRAVEL COMPANIES
 */

import { Tenant, TenantFeatures, TenantStatus, TenantPlan } from '@/shared/types/models';

export const DEFAULT_FEATURES: TenantFeatures = {
  CRM: true,
  MOBILE_APP: true,
  CUSTOMER_PORTAL: true,
  CONCIERGE: true,
  AI_COPILOT: true,
  PAYMENTS: true,
  SUPPLIER_MANAGEMENT: true,
  WHITE_LABEL: true,
  CUSTOM_DOMAIN: false,
};

// Initial in-memory tenant registry (synced with PostgreSQL database)
const TENANTS_STORE: Record<string, Tenant> = {
  // Tenant #001: Travia Dubai (The founding client)
  'a0000000-0000-0000-0000-000000000001': {
    id: 'a0000000-0000-0000-0000-000000000001',
    slug: 'travia',
    legal_name: 'Travia Tourism L.L.C.',
    display_name: 'Travia Dubai',
    status: 'active',
    plan: 'founding_partner',
    timezone: 'Asia/Dubai',
    default_currency: 'AED',
    default_language: 'tr',
    logo_url: '/images/travia-logo.png',
    primary_color: '#C9A66B',
    secondary_color: '#05070F',
    domain: 'traviadubai.com',
    crm_domain: 'crm.traviadubai.com',
    customer_domain: 'vip.traviadubai.com',
    settings: {
      contact_phone: '+90 532 000 0000',
      whatsapp: '+905320000000',
      support_email: 'concierge@traviadubai.com',
      bank_name: 'Emirates NBD (Dubai, UAE)',
      iban: 'AE07 0260 0001 2345 6789 012',
      swift_bic: 'EBILAEAD',
      address: 'DIFC Gate Precinct 4, Dubai, UAE',
      invoice_prefix: 'TRV',
    },
    features: {
      ...DEFAULT_FEATURES,
      CUSTOM_DOMAIN: true,
    },
    created_at: '2026-08-01T00:00:00Z',
    updated_at: '2026-08-27T12:00:00Z',
  },

  // Tenant #002: Elite Horizons VIP (Second travel company verifying multi-tenancy)
  'a0000000-0000-0000-0000-000000000002': {
    id: 'a0000000-0000-0000-0000-000000000002',
    slug: 'elite',
    legal_name: 'Elite Horizons Luxury Travel Ltd.',
    display_name: 'Elite Horizons',
    status: 'active',
    plan: 'professional',
    timezone: 'Europe/London',
    default_currency: 'USD',
    default_language: 'en',
    primary_color: '#3B82F6',
    secondary_color: '#0F172A',
    domain: 'elitehorizons.co.uk',
    crm_domain: 'crm.elitehorizons.co.uk',
    settings: {
      contact_phone: '+44 20 7946 0912',
      whatsapp: '+442079460912',
      support_email: 'vip@elitehorizons.co.uk',
      bank_name: 'HSBC Private Bank London',
      iban: 'GB29 HBUK 4012 7612 3456 78',
      swift_bic: 'HBUKGB4B',
      address: 'Mayfair, London W1K, United Kingdom',
      invoice_prefix: 'ELT',
    },
    features: {
      ...DEFAULT_FEATURES,
      AI_COPILOT: false,
    },
    created_at: '2026-08-20T10:00:00Z',
    updated_at: '2026-08-27T12:00:00Z',
  },

  // Tenant #003: Azure Mediterranean (Riviera & Aegean Concierge)
  'a0000000-0000-0000-0000-000000000003': {
    id: 'a0000000-0000-0000-0000-000000000003',
    slug: 'azure',
    legal_name: 'Azure Yachting & Concierge SAS',
    display_name: 'Azure Riviera',
    status: 'trial',
    plan: 'starter',
    timezone: 'Europe/Paris',
    default_currency: 'EUR',
    default_language: 'en',
    primary_color: '#06B6D4',
    secondary_color: '#082F49',
    domain: 'azure-riviera.com',
    settings: {
      contact_phone: '+33 4 93 00 00 00',
      whatsapp: '+33493000000',
      support_email: 'captain@azure-riviera.com',
      bank_name: 'BNP Paribas Monaco',
      iban: 'FR76 3000 4000 0100 2345 6789 012',
      swift_bic: 'BNPAFR2A',
      address: 'Port Hercule, Monaco',
      invoice_prefix: 'AZR',
    },
    features: {
      ...DEFAULT_FEATURES,
      PAYMENTS: false,
      AI_COPILOT: false,
    },
    created_at: '2026-08-25T14:00:00Z',
    updated_at: '2026-08-27T12:00:00Z',
  },
};

export const DEFAULT_TENANT_ID = 'a0000000-0000-0000-0000-000000000001';

class TenantRegistry {
  private tenants: Map<string, Tenant>;

  constructor() {
    this.tenants = new Map(Object.entries(TENANTS_STORE));
  }

  getAllTenants(): Tenant[] {
    return Array.from(this.tenants.values());
  }

  getTenantById(id?: string | null): Tenant {
    if (!id) return this.tenants.get(DEFAULT_TENANT_ID)!;
    return this.tenants.get(id) || this.tenants.get(DEFAULT_TENANT_ID)!;
  }

  getTenantBySlug(slug: string): Tenant | null {
    for (const tenant of this.tenants.values()) {
      if (tenant.slug.toLowerCase() === slug.toLowerCase()) return tenant;
    }
    return null;
  }

  getTenantByDomain(domain: string): Tenant | null {
    const cleanDomain = domain.toLowerCase().replace(/:\d+$/, '');
    for (const tenant of this.tenants.values()) {
      if (
        tenant.domain?.toLowerCase() === cleanDomain ||
        tenant.crm_domain?.toLowerCase() === cleanDomain ||
        tenant.customer_domain?.toLowerCase() === cleanDomain
      ) {
        return tenant;
      }
    }
    return null;
  }

  resolveTenantFromHost(host: string): Tenant {
    // 1. Check exact custom domain
    const match = this.getTenantByDomain(host);
    if (match) return match;

    // 2. Check subdomain: e.g. "elite.travelos.com" or "azure.localhost:3000"
    const parts = host.split('.');
    if (parts.length > 1) {
      const subdomain = parts[0];
      const bySubdomain = this.getTenantBySlug(subdomain);
      if (bySubdomain) return bySubdomain;
    }

    // 3. Fallback to default founding tenant
    return this.getTenantById(DEFAULT_TENANT_ID);
  }

  createTenant(input: {
    legal_name: string;
    display_name: string;
    slug: string;
    plan: TenantPlan;
    default_currency: string;
    timezone: string;
    default_language: string;
    primary_color?: string;
    secondary_color?: string;
    admin_email: string;
    custom_domain?: string;
  }): Tenant {
    const newId = `t-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const newTenant: Tenant = {
      id: newId,
      slug: input.slug.toLowerCase(),
      legal_name: input.legal_name,
      display_name: input.display_name,
      status: 'active',
      plan: input.plan,
      timezone: input.timezone || 'Asia/Dubai',
      default_currency: input.default_currency || 'USD',
      default_language: input.default_language || 'en',
      primary_color: input.primary_color || '#C9A66B',
      secondary_color: input.secondary_color || '#05070F',
      domain: input.custom_domain,
      settings: {
        support_email: input.admin_email,
        invoice_prefix: input.slug.slice(0, 3).toUpperCase(),
      },
      features: {
        ...DEFAULT_FEATURES,
        AI_COPILOT: input.plan === 'enterprise' || input.plan === 'founding_partner',
        CUSTOM_DOMAIN: Boolean(input.custom_domain),
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.tenants.set(newId, newTenant);
    return newTenant;
  }

  updateTenant(tenantId: string, update: Partial<Tenant>): Tenant {
    const tenant = this.getTenantById(tenantId);
    const updated: Tenant = {
      ...tenant,
      ...update,
      settings: {
        ...tenant.settings,
        ...(update.settings || {}),
      },
      features: {
        ...tenant.features,
        ...(update.features || {}),
      },
      updated_at: new Date().toISOString(),
    };
    this.tenants.set(tenantId, updated);
    return updated;
  }

  updateTenantStatus(tenantId: string, status: TenantStatus): Tenant {
    const tenant = this.getTenantById(tenantId);
    tenant.status = status;
    tenant.updated_at = new Date().toISOString();
    this.tenants.set(tenantId, tenant);
    return tenant;
  }

  toggleTenantFeature(tenantId: string, feature: keyof TenantFeatures, isEnabled: boolean): Tenant {
    const tenant = this.getTenantById(tenantId);
    tenant.features[feature] = isEnabled;
    tenant.updated_at = new Date().toISOString();
    this.tenants.set(tenantId, tenant);
    return tenant;
  }

  getPlatformStats() {
    const all = this.getAllTenants();
    return {
      totalTenants: all.length,
      activeTenants: all.filter(t => t.status === 'active').length,
      trialTenants: all.filter(t => t.status === 'trial').length,
      suspendedTenants: all.filter(t => t.status === 'suspended').length,
      plansBreakdown: {
        starter: all.filter(t => t.plan === 'starter').length,
        professional: all.filter(t => t.plan === 'professional').length,
        premium: all.filter(t => t.plan === 'premium').length,
        enterprise: all.filter(t => t.plan === 'enterprise').length,
        founding_partner: all.filter(t => t.plan === 'founding_partner').length,
      },
    };
  }
}

export const tenantRegistry = new TenantRegistry();
