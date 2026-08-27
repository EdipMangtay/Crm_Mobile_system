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

export interface SharedLead {
  id: string;
  first_name: string;
  last_name: string;
  country: string;
  phone: string;
  whatsapp?: string;
  email: string;
  travel_start_date: string;
  travel_end_date: string;
  pax_count: number;
  travel_type: string;
  stage: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'booked' | 'lost';
  estimated_value: number;
  budget_range?: string;
  source: string;
  utm_campaign?: string;
  assigned_to: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  lead_score: number;
  created_at: string;
  interests: string[];
  notes?: string;
}

export const SHARED_LEADS: SharedLead[] = [
  {
    id: 'l0000000-0000-0000-0000-000000000001',
    first_name: 'Stefan',
    last_name: 'Müller',
    country: 'DE',
    phone: '+49 170 123 4567',
    whatsapp: '+491701234567',
    email: 'stefan.mueller@luxurytravel.de',
    travel_start_date: '2026-10-01',
    travel_end_date: '2026-10-07',
    pax_count: 6,
    travel_type: 'VIP Family & Friends',
    budget_range: '50,000 - 75,000 AED',
    stage: 'qualified',
    estimated_value: 52000,
    source: 'Instagram Ad (Summer Campaign)',
    utm_campaign: 'dubai_luxury_october',
    assigned_to: 'Furkan Çelik',
    priority: 'high',
    lead_score: 83,
    interests: ['Superyacht Charter', 'Fine Dining (Nobu/Zuma)', 'Desert Safari Royal Majlis', 'VIP Chauffeur Maybach'],
    notes: 'Misafir 6 kişilik özel yat ve çöl kampı deneyimi istiyor. Çocuklu aile, 2 çocuk var. Özel şefli villa veya süit konaklama araştırılıyor.',
    created_at: '2026-08-25T14:30:00Z',
  },
  {
    id: 'l0000000-0000-0000-0000-000000000002',
    first_name: 'Ayşe',
    last_name: 'Korkmaz',
    country: 'TR',
    phone: '+90 532 987 6543',
    whatsapp: '+905329876543',
    email: 'ayse.korkmaz@email.com',
    travel_start_date: '2026-09-25',
    travel_end_date: '2026-09-30',
    pax_count: 2,
    travel_type: 'Luxury Spa & Retreat',
    budget_range: '15,000 - 25,000 AED',
    stage: 'contacted',
    estimated_value: 18000,
    source: 'Google Search',
    assigned_to: 'Efza Yılmaz',
    priority: 'medium',
    lead_score: 65,
    interests: ['Luxury', 'Spa & Wellness', 'Fine Dining'],
    notes: 'Atlantis The Royal veya Bulgari Resort konaklama tercihi.',
    created_at: '2026-08-26T11:00:00Z',
  },
  {
    id: 'l0000000-0000-0000-0000-000000000003',
    first_name: 'James',
    last_name: 'Wilson',
    country: 'GB',
    phone: '+44 7700 900000',
    whatsapp: '+447700900000',
    email: 'james.wilson@luxuryuk.co.uk',
    travel_start_date: '2026-11-15',
    travel_end_date: '2026-11-22',
    pax_count: 4,
    travel_type: 'Supercar & Adventure',
    budget_range: '30,000 - 50,000 AED',
    stage: 'qualified',
    estimated_value: 38000,
    source: 'Referral',
    assigned_to: 'Furkan Çelik',
    priority: 'high',
    lead_score: 78,
    interests: ['Desert Safari', 'Supercar Rental', 'Helicopter Tour'],
    notes: 'Ferrari F8 kiralama ve özel çöl kampı istedi.',
    created_at: '2026-08-25T16:00:00Z',
  },
  {
    id: 'l0000000-0000-0000-0000-000000000004',
    first_name: 'Mert',
    last_name: 'Kaya',
    country: 'TR',
    phone: '+90 535 111 2233',
    whatsapp: '+905351112233',
    email: 'mert.kaya@email.com',
    travel_start_date: '2026-10-10',
    travel_end_date: '2026-10-14',
    pax_count: 2,
    travel_type: 'Honeymoon Exclusive',
    budget_range: '20,000 - 30,000 AED',
    stage: 'proposal_sent',
    estimated_value: 22000,
    source: 'WhatsApp',
    assigned_to: 'Efza Yılmaz',
    priority: 'medium',
    lead_score: 71,
    interests: ['Honeymoon', 'Beach Club', 'Private Yacht'],
    notes: 'Teklif PDF olarak gönderildi, balayı karşılama paketi dahil.',
    created_at: '2026-08-24T09:30:00Z',
  },
  {
    id: 'l0000000-0000-0000-0000-000000000005',
    first_name: 'Александр',
    last_name: 'Петrov',
    country: 'RU',
    phone: '+7 926 123 4567',
    whatsapp: '+79261234567',
    email: 'alex.petrov@vipinvest.ru',
    travel_start_date: '2026-12-20',
    travel_end_date: '2027-01-05',
    pax_count: 3,
    travel_type: 'UHNW New Year in Dubai',
    budget_range: '60,000 - 100,000 AED',
    stage: 'negotiation',
    estimated_value: 65000,
    source: 'Instagram',
    assigned_to: 'Furkan Çelik',
    priority: 'urgent',
    lead_score: 91,
    interests: ['UHNW', 'Yacht New Year Fireworks', 'Helicopter'],
    notes: 'Yılbaşı gecesi Burj Al Arab açıklarında süperyat havai fişek seyri.',
    created_at: '2026-08-23T14:15:00Z',
  },
  {
    id: 'l0000000-0000-0000-0000-000000000006',
    first_name: 'Edip',
    last_name: 'Mangtay',
    country: 'TR',
    phone: '+90 532 000 0000',
    whatsapp: '+905320000000',
    email: 'edip@traviadubai.com',
    travel_start_date: '2026-09-12',
    travel_end_date: '2026-09-17',
    pax_count: 2,
    travel_type: 'VIP Couple Luxury',
    budget_range: '18,500 AED',
    stage: 'booked',
    estimated_value: 18500,
    source: 'Direct Client',
    assigned_to: 'Furkan Çelik',
    priority: 'medium',
    lead_score: 95,
    interests: ['VIP', 'Couple', 'Fine Dining', 'Superyacht'],
    notes: 'Rezervasyon onaylandı, kapora ödendi, seyahat takvimi aktif.',
    created_at: '2026-08-20T10:00:00Z',
  },
  {
    id: 'l0000000-0000-0000-0000-000000000007',
    first_name: 'Fatma',
    last_name: 'Demir',
    country: 'TR',
    phone: '+90 533 444 5566',
    whatsapp: '+905334445566',
    email: 'fatma.demir@email.com',
    travel_start_date: '2026-09-20',
    travel_end_date: '2026-09-24',
    pax_count: 1,
    travel_type: 'Solo Shopping & Dubai Mall',
    budget_range: '10,000 - 15,000 AED',
    stage: 'lost',
    estimated_value: 12000,
    source: 'Google Search',
    assigned_to: 'Efza Yılmaz',
    priority: 'low',
    lead_score: 32,
    interests: ['Solo', 'Shopping', 'City Tour'],
    notes: 'Seyahat planını erteledi.',
    created_at: '2026-08-22T17:00:00Z',
  },
];

/**
 * Singleton In-Memory Repository
 * Maintains state across CRM, Mobile API, and SSR during runtime.
 */
class TraviaDataRepository {
  private threads: Record<string, UserMessageThread> = { ...INITIAL_USER_THREADS };
  private customers: Customer[] = [...SHARED_CUSTOMERS];

  // Get all user threads for CRM inbox (strictly isolated per tenant)
  getAllThreads(tenantId?: string): UserMessageThread[] {
    const list = Object.values(this.threads);
    if (!tenantId) return list;
    return list.filter(t => t.tenant_id === tenantId || (!t.tenant_id && tenantId === 'a0000000-0000-0000-0000-000000000001'));
  }

  // Get thread by customer ID or thread ID with tenant verification
  getThread(threadOrCustomerId: string, tenantId?: string): UserMessageThread | null {
    let thread = this.threads[threadOrCustomerId];
    if (!thread) {
      thread = Object.values(this.threads).find(t => t.customer_id === threadOrCustomerId)!;
    }
    if (!thread) return null;

    if (tenantId) {
      const itemTenant = thread.tenant_id || 'a0000000-0000-0000-0000-000000000001';
      if (itemTenant !== tenantId) return null; // Tenant isolation guaranteed
    }
    return thread;
  }

  // Create isolated customer thread for new tenant
  createTenantThread(tenantId: string, customerId: string, customerName: string, tripTitle: string): UserMessageThread {
    const threadId = `thread-${customerId}`;
    const newThread: UserMessageThread = {
      id: threadId,
      tenant_id: tenantId,
      customer_id: customerId,
      customer_name: customerName,
      customer_country: '🌐',
      customer_vip: true,
      trip_title: tripTitle,
      last_message_at: 'Şimdi',
      last_message_preview: 'Sohbet kanalı açıldı.',
      customer_unread_count: 0,
      staff_unread_count: 0,
      messages: [],
    };
    this.threads[threadId] = newThread;
    return newThread;
  }

  // Send message to customer thread with optional tenant verification
  sendMessage(threadOrCustomerId: string, content: string, senderRole: 'customer' | 'concierge', tenantId?: string): Message | null {
    const thread = this.getThread(threadOrCustomerId, tenantId);
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

  // Get customer by ID (supports UUID or short ID)
  getCustomer(id: string): Customer | null {
    if (!id) return null;
    return this.customers.find(c =>
      c.id === id ||
      c.id.endsWith(id) ||
      (id === '1' && c.id.endsWith('0001')) ||
      (id === '2' && c.id.endsWith('0002')) ||
      (id === '3' && c.id.endsWith('0003')) ||
      (id === '4' && c.id.endsWith('0004'))
    ) || null;
  }

  // Get lead by ID (supports short ID like '1', '2' or full UUID)
  getLead(id: string): SharedLead | null {
    if (!id) return null;
    return SHARED_LEADS.find(l =>
      l.id === id ||
      l.id.endsWith(id) ||
      l.id.replace('l0000000-0000-0000-0000-00000000000', '') === id ||
      (id === '1' && l.id.endsWith('0001')) ||
      (id === '2' && l.id.endsWith('0002')) ||
      (id === '3' && l.id.endsWith('0003')) ||
      (id === '4' && l.id.endsWith('0004')) ||
      (id === '5' && l.id.endsWith('0005')) ||
      (id === '6' && l.id.endsWith('0006')) ||
      (id === '7' && l.id.endsWith('0007'))
    ) || null;
  }

  // Get all leads
  getAllLeads(): SharedLead[] {
    return SHARED_LEADS;
  }

  // Get trip by ID (supports trip ID, customer ID, or short ID)
  getTrip(id: string): Trip | null {
    if (!id) return null;
    if (SHARED_TRIPS[id]) return SHARED_TRIPS[id];
    const all = Object.values(SHARED_TRIPS);
    return all.find(t =>
      t.id === id ||
      t.customer_id === id ||
      t.id.endsWith(id) ||
      (id === '1' && t.id.endsWith('0001')) ||
      (id === '2' && t.id.endsWith('0002')) ||
      (id === '3' && t.id.endsWith('0003')) ||
      (id === '4' && t.id.endsWith('0004'))
    ) || null;
  }

  // Get trip by customer ID
  getTripByCustomer(customerId: string): Trip | null {
    return SHARED_TRIPS[customerId] || null;
  }
}

// Export singleton instance
export const traviaData = new TraviaDataRepository();
