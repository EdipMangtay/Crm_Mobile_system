import { NextRequest, NextResponse } from 'next/server';
import { tenantRegistry } from '@/lib/tenancy/tenantContext';
import { leadService } from '@/lib/services';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || 'localhost';
  const tenantHeader = request.headers.get('x-tenant-id');
  const tenant = tenantHeader
    ? tenantRegistry.getTenantById(tenantHeader)
    : tenantRegistry.resolveTenantFromHost(host);

  const leads = await leadService.getLeads(tenant.id);

  return NextResponse.json({
    success: true,
    tenant_id: tenant.id,
    tenant_name: tenant.display_name,
    count: leads.length,
    leads,
  });
}

export async function POST(request: NextRequest) {
  try {
    const host = request.headers.get('host') || 'localhost';
    const tenantHeader = request.headers.get('x-tenant-id');
    const tenant = tenantHeader
      ? tenantRegistry.getTenantById(tenantHeader)
      : tenantRegistry.resolveTenantFromHost(host);

    const body = await request.json();
    const { first_name, last_name, email, phone, country, source, estimated_value, notes } = body;

    if (!first_name || !phone) {
      return NextResponse.json(
        { error: 'Missing required lead fields (first_name, phone)' },
        { status: 400 }
      );
    }

    const lead = await leadService.createLead(
      {
        first_name,
        last_name: last_name || '',
        email: email || '',
        phone,
        country,
        source: source || 'External Web Ingestion API',
        estimated_value,
        notes,
      },
      tenant.id
    );

    return NextResponse.json({
      success: true,
      tenant_id: tenant.id,
      lead,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to ingest lead' },
      { status: 500 }
    );
  }
}
