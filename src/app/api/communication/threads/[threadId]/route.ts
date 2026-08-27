import { NextRequest, NextResponse } from 'next/server';
import { traviaData } from '@/shared/data/traviaData';
import { tenantRegistry } from '@/lib/tenancy/tenantContext';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ threadId: string }> }
) {
  const { threadId } = await params;
  const host = request.headers.get('host') || 'localhost';
  const tenantHeader = request.headers.get('x-tenant-id');
  const tenant = tenantHeader
    ? tenantRegistry.getTenantById(tenantHeader)
    : tenantRegistry.resolveTenantFromHost(host);

  const thread = traviaData.getThread(threadId, tenant.id);

  if (!thread) {
    return NextResponse.json(
      { error: 'Thread not found or forbidden for this tenant' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    tenant_id: tenant.id,
    thread,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ threadId: string }> }
) {
  try {
    const { threadId } = await params;
    const host = request.headers.get('host') || 'localhost';
    const tenantHeader = request.headers.get('x-tenant-id');
    const tenant = tenantHeader
      ? tenantRegistry.getTenantById(tenantHeader)
      : tenantRegistry.resolveTenantFromHost(host);

    const body = await request.json();
    const { content, senderRole } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const message = traviaData.sendMessage(
      threadId,
      content,
      senderRole === 'customer' ? 'customer' : 'concierge',
      tenant.id
    );

    if (!message) {
      return NextResponse.json(
        { error: 'Thread not found or forbidden for this tenant' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      tenant_id: tenant.id,
      message,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
