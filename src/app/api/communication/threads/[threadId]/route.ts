import { NextRequest, NextResponse } from 'next/server';
import { traviaData } from '@/shared/data/traviaData';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ threadId: string }> }
) {
  const { threadId } = await params;
  const thread = traviaData.getThread(threadId);

  if (!thread) {
    return NextResponse.json(
      { error: 'Thread not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    thread,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ threadId: string }> }
) {
  try {
    const { threadId } = await params;
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
      senderRole === 'customer' ? 'customer' : 'concierge'
    );

    if (!message) {
      return NextResponse.json(
        { error: 'Thread not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
