/**
 * TRAVIA DUBAI — Unified Shared Data & User-Based Communication Hub
 * PRD: "ONE CUSTOMER · ONE DATABASE · MULTIPLE INTERFACES"
 * 
 * Provides isolated, user-specific threads for each customer.
 * Used identically by Mobile, CRM, and API.
 */

import { Customer, Trip, Booking, CustomerRequest, UserMessageThread, Message } from '../types/models';

export const SHARED_CUSTOMERS: Customer[] = [
  {
    id: 'd0000000-0000-0000-0000-000000000001',
    company_id: 'a0000000-0000-0000-0000-000000000001',
    first_name: 'Edip',
    last_name: 'Mangtay',
    email: 'edip@traviadubai.com',
    phone: '+90 532 000 0000',
    whatsapp: '+905320000000',
    country: 'TR',
    preferred_language: 'tr',
    notes: 'VIP misafir. Fine dining, yat turu ve özel tahsisli şoför tercihi var.',
    tags: ['VIP', 'Couple', 'Booked', 'Luxury'],
    lifetime_value: 18500,
  },
  {
    id: 'd0000000-0000-0000-0000-000000000002',
    company_id: 'a0000000-0000-0000-0000-000000000001',
    first_name: 'Ahmet',
    last_name: 'Yılmaz',
    email: 'ahmet.yilmaz@familytravel.com',
    phone: '+90 533 111 2233',
    whatsapp: '+905331112233',
    country: 'TR',
    preferred_language: 'tr',
    notes: '4 kişilik aile. Çocuklar (8 ve 11 yaş) için özel çöl aktiviteleri talep edildi.',
    tags: ['Family', 'Luxury', 'Booked'],
    lifetime_value: 42000,
  },
  {
    id: 'd0000000-0000-0000-0000-000000000003',
    company_id: 'a0000000-0000-0000-0000-000000000001',
    first_name: 'Canan',
    last_name: 'Özdemir',
    email: 'canan.ozdemir@vipretreat.com',
    phone: '+90 534 444 5566',
    whatsapp: '+905344445566',
    country: 'TR',
    preferred_language: 'tr',
    notes: 'VIP Solo seyahat. Sessiz odalar, spa ve helikopter turu ilgisi yüksek.',
    tags: ['VIP', 'Solo', 'Active'],
    lifetime_value: 15000,
  },
  {
    id: 'd0000000-0000-0000-0000-000000000004',
    company_id: 'a0000000-0000-0000-0000-000000000001',
    first_name: 'Hans',
    last_name: 'Weber',
    email: 'hans.weber@munichcapital.de',
    phone: '+49 170 123 4567',
    whatsapp: '+491701234567',
    country: 'DE',
    preferred_language: 'en',
    notes: 'Corporate & Leisure. DIFC toplantı odası ve akşamları fine dining istiyor.',
    tags: ['Business', 'Repeat', 'Luxury'],
    lifetime_value: 68000,
  },
];

export const SHARED_TRIPS: Record<string, Trip> = {
  'd0000000-0000-0000-0000-000000000001': {
    id: 'f0000000-0000-0000-0000-000000000001',
    company_id: 'a0000000-0000-0000-0000-000000000001',
    customer_id: 'd0000000-0000-0000-0000-000000000001',
    title: 'Travia Dubai — Premium Couple',
    subtitle: 'Atlantis The Royal Sky Pool Villa & Private Yacht',
    destination: 'Dubai',
    start_date: '2026-09-12',
    end_date: '2026-09-17',
    nights: 5,
    pax_count: 2,
    pax_label: 'Premium Couple (2 Kişi)',
    status: 'upcoming',
    hotel_name: 'Atlantis The Royal',
    hotel_address: 'Crescent Rd, Palm Jumeirah, Dubai',
    total_amount: 18500,
    supplier_cost: 11800,
    gross_contribution: 6700,
    currency: 'AED',
    timezone: 'Asia/Dubai',
  },
  'd0000000-0000-0000-0000-000000000002': {
    id: 'f0000000-0000-0000-0000-000000000002',
    company_id: 'a0000000-0000-0000-0000-000000000001',
    customer_id: 'd0000000-0000-0000-0000-000000000002',
    title: 'Dubai Luxury Family Holiday',
    subtitle: 'Burj Al Arab 2-Bedroom Suite & Royal Safari',
    destination: 'Dubai',
    start_date: '2026-09-15',
    end_date: '2026-09-21',
    nights: 6,
    pax_count: 4,
    pax_label: 'Luxury Family (4 Kişi)',
    status: 'upcoming',
    hotel_name: 'Burj Al Arab Jumeirah',
    hotel_address: 'Umm Suqeim 3, Dubai',
    total_amount: 42000,
    supplier_cost: 26500,
    gross_contribution: 15500,
    currency: 'AED',
    timezone: 'Asia/Dubai',
  },
  'd0000000-0000-0000-0000-000000000003': {
    id: 'f0000000-0000-0000-0000-000000000003',
    company_id: 'a0000000-0000-0000-0000-000000000001',
    customer_id: 'd0000000-0000-0000-0000-000000000003',
    title: 'VIP Solo Retreat & Wellness',
    subtitle: 'Armani Hotel Dubai & Helicopter Tour',
    destination: 'Dubai',
    start_date: '2026-09-18',
    end_date: '2026-09-23',
    nights: 5,
    pax_count: 1,
    pax_label: 'VIP Solo (1 Kişi)',
    status: 'upcoming',
    hotel_name: 'Armani Hotel Dubai',
    hotel_address: 'Burj Khalifa, Downtown Dubai',
    total_amount: 15000,
    supplier_cost: 9500,
    gross_contribution: 5500,
    currency: 'AED',
    timezone: 'Asia/Dubai',
  },
  'd0000000-0000-0000-0000-000000000004': {
    id: 'f0000000-0000-0000-0000-000000000004',
    company_id: 'a0000000-0000-0000-0000-000000000001',
    customer_id: 'd0000000-0000-0000-0000-000000000004',
    title: 'Dubai Business & Executive Leisure',
    subtitle: 'Address Sky View & DIFC Boardroom Access',
    destination: 'Dubai',
    start_date: '2026-10-01',
    end_date: '2026-10-05',
    nights: 4,
    pax_count: 2,
    pax_label: 'Business Executive (2 Kişi)',
    status: 'upcoming',
    hotel_name: 'Address Sky View',
    hotel_address: 'Downtown Dubai',
    total_amount: 24000,
    supplier_cost: 15200,
    gross_contribution: 8800,
    currency: 'AED',
    timezone: 'Asia/Dubai',
  },
};

/**
 * Isolated, User-Specific Message Threads
 * PRD requirement: Every customer has an independent conversation thread.
 */
export const INITIAL_USER_THREADS: Record<string, UserMessageThread> = {
  // 1. EDIP MANGTAY THREAD
  'thread-edip': {
    id: 'thread-edip',
    customer_id: 'd0000000-0000-0000-0000-000000000001',
    customer_name: 'Edip Mangtay',
    customer_country: '🇹🇷',
    customer_vip: true,
    trip_title: 'Premium Couple · Atlantis The Royal',
    last_message_at: '17:26',
    last_message_preview: 'Elegant Chic / Akşam Şıklığı tavsiye ediyoruz. Erkekler için ceket veya gömlek yeterlidir. 🥂',
    customer_unread_count: 0,
    staff_unread_count: 1,
    messages: [
      {
        id: 'msg-edip-1',
        thread_id: 'thread-edip',
        sender_role: 'customer',
        type: 'text',
        content: 'Bu akşam güzel bir steakhouse veya fine dining ayarlayabilir miyiz?',
        status: 'read',
        created_at: '2026-08-27T17:10:00Z',
      },
      {
        id: 'msg-edip-2',
        thread_id: 'thread-edip',
        sender_role: 'concierge',
        type: 'text',
        content: 'Elbette Edip Bey. Size üç imza seçenek hazırladık: Nusr-Et, Carna by Dario Cecchini ve Nobu Dubai.',
        status: 'read',
        created_at: '2026-08-27T17:12:00Z',
      },
      {
        id: 'msg-edip-3',
        thread_id: 'thread-edip',
        sender_role: 'concierge',
        type: 'system',
        content: 'Yeni Talep Oluşturuldu: Fine Dining · Nobu Dubai (Bu Akşam 20:30)',
        status: 'read',
        created_at: '2026-08-27T17:15:00Z',
      },
      {
        id: 'msg-edip-4',
        thread_id: 'thread-edip',
        sender_role: 'concierge',
        type: 'text',
        content: 'Nobu Dubai için 20:30 rezervasyonunuz onaylandı. Masanız terasta, Burj Al Arab manzaralıdır.',
        status: 'read',
        created_at: '2026-08-27T17:20:00Z',
      },
      {
        id: 'msg-edip-5',
        thread_id: 'thread-edip',
        sender_role: 'concierge',
        type: 'system',
        content: 'Rezervasyon Onaylandı: Nobu Dubai · 20:30 (2 Kişi)',
        status: 'read',
        created_at: '2026-08-27T17:21:00Z',
      },
      {
        id: 'msg-edip-6',
        thread_id: 'thread-edip',
        sender_role: 'customer',
        type: 'text',
        content: 'Harika, çok teşekkürler! Nobu için dress code nedir?',
        status: 'read',
        created_at: '2026-08-27T17:25:00Z',
      },
      {
        id: 'msg-edip-7',
        thread_id: 'thread-edip',
        sender_role: 'concierge',
        type: 'text',
        content: 'Elegant Chic / Akşam Şıklığı tavsiye ediyoruz. Erkekler için ceket veya gömlek yeterlidir. 🥂',
        status: 'read',
        created_at: '2026-08-27T17:26:00Z',
      },
    ],
  },

  // 2. AHMET YILMAZ THREAD
  'thread-ahmet': {
    id: 'thread-ahmet',
    customer_id: 'd0000000-0000-0000-0000-000000000002',
    customer_name: 'Ahmet Yılmaz',
    customer_country: '🇹🇷',
    customer_vip: false,
    trip_title: 'Luxury Family · Burj Al Arab',
    last_message_at: '16:45',
    last_message_preview: 'Tüm çocuk kum kayağı ekipmanları ve kasklar Land Cruiser aracımıza ayrıldı.',
    customer_unread_count: 0,
    staff_unread_count: 0,
    messages: [
      {
        id: 'msg-ahmet-1',
        thread_id: 'thread-ahmet',
        sender_role: 'customer',
        type: 'text',
        content: 'Merhaba, 16 Eylül çöl safarisi için 8 ve 11 yaşındaki çocuklarımız da gelebilir mi? Çocuklar için uygun mudur?',
        status: 'read',
        created_at: '2026-08-27T16:30:00Z',
      },
      {
        id: 'msg-ahmet-2',
        thread_id: 'thread-ahmet',
        sender_role: 'concierge',
        type: 'text',
        content: 'Merhaba Ahmet Bey! Kesinlikle uygundur. Çocuklar için yumuşak kum tepelerinde kum kayağı, şahinle hatıra fotoğrafı ve özel çocuk menülü barbekü hazırlıyoruz.',
        status: 'read',
        created_at: '2026-08-27T16:35:00Z',
      },
      {
        id: 'msg-ahmet-3',
        thread_id: 'thread-ahmet',
        sender_role: 'customer',
        type: 'text',
        content: 'Harika bir haber. Ekipmanları da dahil edebilirseniz çok seviniriz.',
        status: 'read',
        created_at: '2026-08-27T16:40:00Z',
      },
      {
        id: 'msg-ahmet-4',
        thread_id: 'thread-ahmet',
        sender_role: 'concierge',
        type: 'system',
        content: 'Talep Güncellendi: Çocuk Kum Kayağı & Şahin Gösterisi Ekipmanları Dahil Edildi',
        status: 'read',
        created_at: '2026-08-27T16:42:00Z',
      },
      {
        id: 'msg-ahmet-5',
        thread_id: 'thread-ahmet',
        sender_role: 'concierge',
        type: 'text',
        content: 'Tüm çocuk kum kayağı ekipmanları ve kasklar Land Cruiser aracımıza ayrıldı.',
        status: 'read',
        created_at: '2026-08-27T16:45:00Z',
      },
    ],
  },

  // 3. CANAN ÖZDEMİR THREAD
  'thread-canan': {
    id: 'thread-canan',
    customer_id: 'd0000000-0000-0000-0000-000000000003',
    customer_name: 'Canan Özdemir',
    customer_country: '🇹🇷',
    customer_vip: true,
    trip_title: 'VIP Solo Retreat · Armani Hotel',
    last_message_at: '15:20',
    last_message_preview: 'Çok teşekkür ederim ilginize, harikasınız.',
    customer_unread_count: 0,
    staff_unread_count: 1,
    messages: [
      {
        id: 'msg-canan-1',
        thread_id: 'thread-canan',
        sender_role: 'customer',
        type: 'text',
        content: 'İyi günler, 18 Eylül havalimanı transfer saatimi 2 saat erteleyebilir miyiz? İstanbul uçuşum rötar yaptı.',
        status: 'read',
        created_at: '2026-08-27T15:10:00Z',
      },
      {
        id: 'msg-canan-2',
        thread_id: 'thread-canan',
        sender_role: 'concierge',
        type: 'text',
        content: 'İyi günler Canan Hanım. Uçuş kodunuzu sisteme aldık ve anlık takip ediyoruz. Şoförümüz Khalid ve Mercedes S-Class aracımız yeni iniş saatiniz olan 17:30\'a göre güncellendi.',
        status: 'read',
        created_at: '2026-08-27T15:14:00Z',
      },
      {
        id: 'msg-canan-3',
        thread_id: 'thread-canan',
        sender_role: 'concierge',
        type: 'system',
        content: 'Transfer Saati Güncellendi: 17:30 · DXB Terminal 3 VIP Karşılama',
        status: 'read',
        created_at: '2026-08-27T15:15:00Z',
      },
      {
        id: 'msg-canan-4',
        thread_id: 'thread-canan',
        sender_role: 'customer',
        type: 'text',
        content: 'Çok teşekkür ederim ilginize, harikasınız.',
        status: 'read',
        created_at: '2026-08-27T15:20:00Z',
      },
    ],
  },

  // 4. HANS WEBER THREAD
  'thread-hans': {
    id: 'thread-hans',
    customer_id: 'd0000000-0000-0000-0000-000000000004',
    customer_name: 'Hans Weber',
    customer_country: '🇩🇪',
    customer_vip: true,
    trip_title: 'Business & Leisure · Address Sky View',
    last_message_at: '12:00',
    last_message_preview: 'Perfect, danke!',
    customer_unread_count: 0,
    staff_unread_count: 0,
    messages: [
      {
        id: 'msg-hans-1',
        thread_id: 'thread-hans',
        sender_role: 'customer',
        type: 'text',
        content: 'Guten Tag, can you arrange a private meeting room at DIFC Gate Village tomorrow between 10:00 and 14:00?',
        status: 'read',
        created_at: '2026-08-27T11:45:00Z',
      },
      {
        id: 'msg-hans-2',
        thread_id: 'thread-hans',
        sender_role: 'concierge',
        type: 'text',
        content: 'Guten Tag Herr Weber. We have secured the Executive Boardroom at DIFC Gate Village 4 with full AV support and premium catering.',
        status: 'read',
        created_at: '2026-08-27T11:55:00Z',
      },
      {
        id: 'msg-hans-3',
        thread_id: 'thread-hans',
        sender_role: 'customer',
        type: 'text',
        content: 'Perfect, danke!',
        status: 'read',
        created_at: '2026-08-27T12:00:00Z',
      },
    ],
  },
};

/**
 * Singleton In-Memory Repository
 * Maintains state across CRM, Mobile API, and SSR during runtime.
 */
class TraviaDataRepository {
  private threads: Record<string, UserMessageThread> = { ...INITIAL_USER_THREADS };
  private customers: Customer[] = [...SHARED_CUSTOMERS];

  // Get all user threads for CRM inbox
  getAllThreads(): UserMessageThread[] {
    return Object.values(this.threads);
  }

  // Get thread by customer ID or thread ID
  getThread(threadOrCustomerId: string): UserMessageThread | null {
    if (this.threads[threadOrCustomerId]) {
      return this.threads[threadOrCustomerId];
    }
    const found = Object.values(this.threads).find(t => t.customer_id === threadOrCustomerId);
    return found || null;
  }

  // Send message to customer thread
  sendMessage(threadOrCustomerId: string, content: string, senderRole: 'customer' | 'concierge'): Message | null {
    let thread = this.getThread(threadOrCustomerId);
    if (!thread) return null;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      thread_id: thread.id,
      sender_role: senderRole,
      type: 'text',
      content,
      status: 'sent',
      created_at: new Date().toISOString(),
    };

    thread.messages.push(newMsg);
    thread.last_message_at = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    thread.last_message_preview = content;

    if (senderRole === 'customer') {
      thread.staff_unread_count += 1;
    } else {
      thread.customer_unread_count += 1;
    }

    return newMsg;
  }

  // Mark customer thread as read by staff
  markStaffRead(threadOrCustomerId: string) {
    const thread = this.getThread(threadOrCustomerId);
    if (thread) {
      thread.staff_unread_count = 0;
    }
  }

  // Mark customer thread as read by customer
  markCustomerRead(threadOrCustomerId: string) {
    const thread = this.getThread(threadOrCustomerId);
    if (thread) {
      thread.customer_unread_count = 0;
    }
  }

  // Get all customers
  getCustomers(): Customer[] {
    return this.customers;
  }

  // Get customer by ID
  getCustomer(id: string): Customer | null {
    return this.customers.find(c => c.id === id) || null;
  }
}

// Export singleton instance
export const traviaData = new TraviaDataRepository();
