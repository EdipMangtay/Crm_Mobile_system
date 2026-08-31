import { NextRequest, NextResponse } from 'next/server';
import { traviaData } from '@/shared/data/traviaData';
import { tenantRegistry } from '@/lib/tenancy/tenantContext';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || 'localhost';
  const tenantHeader = request.headers.get('x-tenant-id');
  const tenant = tenantHeader
    ? tenantRegistry.getTenantById(tenantHeader)
    : tenantRegistry.resolveTenantFromHost(host);

  const threads = traviaData.getAllThreads(tenant.id);
  return NextResponse.json({
    success: true,
    tenant_id: tenant.id,
    tenant_name: tenant.display_name,
    threads,
  });
}
