import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, date, serviceType, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'İsim ve telefon zorunludur' },
        { status: 400 }
      );
    }

    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || 'Misafir';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('your-project')) {
      try {
        const supabase = await createSupabaseServerClient();
        await supabase.from('leads').insert({
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          whatsapp: phone,
          travel_start_date: date || null,
          requested_services: [serviceType || 'vip-tour'],
          notes: message || null,
          source: 'Website Contact Form',
          stage: 'new',
          priority: 'high',
          lead_score: 75,
        });
      } catch (dbError) {
        console.warn('Supabase lead insert notice:', dbError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'VIP Rezervasyon talebiniz alındı. Concierge ekibimiz kısa süre içinde sizinle iletişime geçecektir.',
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'İşlem sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}
