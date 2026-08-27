import { NextResponse } from 'next/server';
import { traviaData } from '@/shared/data/traviaData';

export async function GET() {
  const threads = traviaData.getAllThreads();
  return NextResponse.json({
    success: true,
    threads,
  });
}
