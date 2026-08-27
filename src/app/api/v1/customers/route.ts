import { NextRequest, NextResponse } from 'next/server';
import { tenantRegistry } from '@/lib/tenancy/tenantContext';
import { customerService } from '@/lib/services';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || 'localhost';
  const tenantHeader = request.headers.get('x-tenant-id');
  const tenant = tenantHeader
    ? tenantRegistry.getTenantById(tenantHeader)
    : tenantRegistry.resolveTenantFromHost(host);

  const customers = await customerService.getCustomers(tenant.id);

  return NextResponse.json({
    success: true,
    tenant_id: tenant.id,
    tenant_name: tenant.display_name,
    count: customers.length,
    customers,
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
    const { first_name, last_name, email, phone, country } = body;

    if (!first_name || !last_name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required customer fields (first_name, last_name, email, phone)' },
        { status: 400 }
      );
    }

    const customer = await customerService.createCustomer(
      {
        first_name,
        last_name,
        email,
        phone,
        country: country || '🌐',
      },
      tenant.id
    );

    return NextResponse.json({
      success: true,
      tenant_id: tenant.id,
      customer,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}
