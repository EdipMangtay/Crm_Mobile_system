import { NextRequest, NextResponse } from 'next/server';
import { tenantRegistry } from '@/lib/tenancy/tenantContext';

/**
 * TRAVEL OS — Mobile App Dynamic Tenant Bootstrap Config
 * Section 27: Mobile Tenant Awareness
 * Allows Expo or Flutter clients to dynamically brand and configure without hardcoded assets.
 */
export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || 'localhost';
  const tenantHeader = request.headers.get('x-tenant-id');
  const tenant = tenantHeader
    ? tenantRegistry.getTenantById(tenantHeader)
    : tenantRegistry.resolveTenantFromHost(host);

  return NextResponse.json({
    success: true,
    platform: 'TravelOS Mobile Engine v1.0',
    tenant: {
      id: tenant.id,
      slug: tenant.slug,
      displayName: tenant.display_name,
      legalName: tenant.legal_name,
      primaryColor: tenant.primary_color,
      secondaryColor: tenant.secondary_color,
      currency: tenant.default_currency,
      timezone: tenant.timezone,
      language: tenant.default_language,
      logoUrl: tenant.logo_url,
      features: tenant.features,
      channels: {
        whatsapp: tenant.settings.whatsapp,
        phone: tenant.settings.contact_phone,
        supportEmail: tenant.settings.support_email,
      },
    },
  });
}
