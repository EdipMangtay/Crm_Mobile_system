import { NextRequest, NextResponse } from 'next/server';
import { tenantRegistry } from '@/lib/tenancy/tenantContext';
import { tripService } from '@/lib/services';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || 'localhost';
  const tenantHeader = request.headers.get('x-tenant-id');
  const tenant = tenantHeader
    ? tenantRegistry.getTenantById(tenantHeader)
    : tenantRegistry.resolveTenantFromHost(host);

  const trips = await tripService.getTrips(tenant.id);

  return NextResponse.json({
    success: true,
    tenant_id: tenant.id,
    tenant_name: tenant.display_name,
    count: trips.length,
    trips,
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
    const { customerId, title, destination, startDate, endDate, nights, paxCount, hotelName, totalAmount } = body;

    if (!customerId || !title || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required trip fields (customerId, title, startDate, endDate)' },
        { status: 400 }
      );
    }

    const trip = await tripService.createTrip(
      {
        customerId,
        title,
        destination: destination || 'Dubai, UAE',
        startDate,
        endDate,
        nights: nights || 5,
        paxCount: paxCount || 2,
        hotelName,
        totalAmount: totalAmount || 15000,
        currency: tenant.default_currency,
      },
      tenant.id
    );

    return NextResponse.json({
      success: true,
      tenant_id: tenant.id,
      trip,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create trip' },
      { status: 500 }
    );
  }
}
