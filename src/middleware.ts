/**
 * TRAVIA — Next.js Middleware
 * Protects CRM and Platform Admin routes with server-side auth
 * Public website routes pass through untouched
 */

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseMiddlewareClient } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Platform Admin
  if (pathname.startsWith('/platform-admin')) {
    const demoCookie = request.cookies.get('travia_staff_session');
    const isDev = process.env.NODE_ENV !== 'production';

    // Allow in local dev / demo mode
    if (demoCookie?.value === 'demo' || isDev) {
      return NextResponse.next();
    }

    const loginUrl = new URL('/crm/login', request.url);
    loginUrl.searchParams.set('error', 'unauthorized');
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Only protect CRM routes (except login)
  if (!pathname.startsWith('/crm')) {
    return NextResponse.next();
  }

  // Allow CRM login page
  if (pathname === '/crm/login') {
    return NextResponse.next();
  }

  // Check for staff demo session cookie
  const demoCookie = request.cookies.get('travia_staff_session');
  if (demoCookie?.value === 'demo') {
    return NextResponse.next();
  }

  // If Supabase credentials are not set and in development, allow preview
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isDemo = process.env.TRAVIA_DEMO_MODE === 'true' || process.env.NODE_ENV !== 'production';
  if ((!supabaseUrl || supabaseUrl.includes('your-project')) && isDemo) {
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
    if (isDemo) {
      return NextResponse.next();
    }
    const loginUrl = new URL('/crm/login', request.url);
    loginUrl.searchParams.set('error', 'service_unavailable');
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/crm/:path*', '/platform-admin/:path*'],
};
