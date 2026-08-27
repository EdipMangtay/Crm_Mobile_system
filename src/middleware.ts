/**
 * TRAVIA — Next.js Middleware
 * Protects CRM routes with server-side auth
 * Public website routes pass through untouched
 */

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseMiddlewareClient } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect CRM routes (except login)
  if (!pathname.startsWith('/crm')) {
    return NextResponse.next();
  }

  // Allow CRM login page and API routes
  if (pathname === '/crm/login' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check for staff demo session cookie
  const demoCookie = request.cookies.get('travia_staff_session');
  if (demoCookie?.value === 'demo') {
    return NextResponse.next();
  }

  // If Supabase credentials are missing or default placeholder, allow demo preview
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || supabaseUrl.includes('your-project')) {
    return NextResponse.next();
  }

  try {
    const { supabase, response } = await createSupabaseMiddlewareClient(request);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = new URL('/crm/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user is staff (not customer)
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, is_active')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role === 'customer' || !profile.is_active) {
      const loginUrl = new URL('/crm/login', request.url);
      loginUrl.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(loginUrl);
    }

    return response;
  } catch {
    // If Supabase service unreachable during demo/local dev, allow preview
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/crm/:path*'],
};
