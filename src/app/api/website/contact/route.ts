import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { leadService } from '@/lib/services/leadService';

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

    // Always register into domain leadService so it appears in CRM Leads
    await leadService.createLead(
      {
        first_name: firstName,
        last_name: lastName,
        email: `${firstName.toLowerCase().replace(/[^a-z0-9]/g, '')}@website.lead`,
        phone,
        source: 'Website Contact Form',
        notes: `Hizmet: ${serviceType || 'vip-tour'} | Tarih: ${date || '-'} | Mesaj: ${message || '-'}`,
      },
      'a0000000-0000-0000-0000-000000000001'
    );

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('your-project')) {
      try {
        const supabase = await createSupabaseServerClient();
        const { error: insertError } = await supabase.from('leads').insert({
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

        if (insertError) {
          console.error('Supabase lead insert error:', insertError);
          return NextResponse.json(
            { error: 'Veritabanı kayıt hatası: ' + insertError.message },
            { status: 500 }
          );
        }
      } catch (dbError) {
        console.error('Supabase connection error:', dbError);
        return NextResponse.json(
          { error: 'Veritabanı bağlantısı kurulamadı.' },
          { status: 500 }
        );
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
