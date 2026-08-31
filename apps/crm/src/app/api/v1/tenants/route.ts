import { NextRequest, NextResponse } from 'next/server';
import { tenantRegistry } from '@/lib/tenancy/tenantContext';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || 'localhost';
  const tenantHeader = request.headers.get('x-tenant-id');

  // If specific tenant requested via header, return single tenant config
  if (tenantHeader) {
    const tenant = tenantRegistry.getTenantById(tenantHeader);
    return NextResponse.json({
      success: true,
      tenant,
    });
  }

  // Otherwise return host-resolved tenant
  const tenant = tenantRegistry.resolveTenantFromHost(host);
  return NextResponse.json({
    success: true,
    tenant: {
      id: tenant.id,
      slug: tenant.slug,
      displayName: tenant.display_name,
      currency: tenant.default_currency,
      timezone: tenant.timezone,
      language: tenant.default_language,
      primaryColor: tenant.primary_color,
      logoUrl: tenant.logo_url,
      features: tenant.features,
    },
  });
}
