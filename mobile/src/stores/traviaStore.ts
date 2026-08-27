/**
 * TRAVIA DUBAI — Central Reactive Store (Zustand)
 * PRD §3, §46, §47, §61 — "ONE CUSTOMER — ONE DATABASE — MULTIPLE INTERFACES"
 * Provides real-time synchronized state across Customer and Staff views.
 */

import { create } from 'zustand';
import {
  Trip,
  ItineraryDay,
  ItineraryItem,
  Booking,
  CustomerRequest,
  Message,
  DocumentItem,
  PaymentItem,
  NotificationItem,
  Customer,
  RequestCategory,
  RequestStatus,
  BookingStatus,
} from '../types/models';
import {
  mockTrip,
  mockCustomer,
  mockCustomerAhmet,
  mockCustomerCanan,
  mockCustomersList,
  mockItineraryDays,
  mockBookingTransfer,
  mockBookingYacht,
  mockMessages,
  mockUserThreads,
  mockRequests,
  mockPayments,
  mockDocuments,
} from '../lib/mockData';

export interface StaffCustomerItem {
  id: string;
  customerId: string;
  name: string;
  paxLabel: string;
  dates: string;
  statusText: string;
  isInsideDubai: boolean;
  unreadCount: number;
  hotel: string;
  outstanding: string;
}

export interface OperationItem {
  id: string;
  bookingId?: string;
  time: string;
  type: string;
  customerName: string;
  details: string;
  status: 'confirmed' | 'in_progress' | 'completed' | 'issue' | 'pending';
  driverOrLocation: string;
}

interface TraviaStoreState {
  // Domain entities
  activeCustomerId: string;
  customer: Customer;
  trip: Trip;
  itineraryDays: ItineraryDay[];
  bookings: Booking[];
  messages: Message[];
  userThreads: Record<string, Message[]>;
  requests: CustomerRequest[];
  notifications: NotificationItem[];
  documents: DocumentItem[];
  payments: PaymentItem[];
  staffCustomers: StaffCustomerItem[];
  operations: OperationItem[];

  // Real-time Actions
  setActiveCustomer: (customerId: string) => void;
  sendCustomerMessage: (text: string) => void;
  sendStaffMessage: (text: string) => void;
  createCustomerRequest: (data: {
    category: RequestCategory;
    title: string;
    date: string;
    time?: string;
    pax_count?: number;
    notes?: string;
  }) => CustomerRequest;
  approveRequest: (requestId: string) => void;
  updateRequestStatus: (requestId: string, status: RequestStatus) => void;
  updateOperationStatus: (
    operationId: string,
    status: OperationItem['status']
  ) => void;
  markNotificationsAsRead: () => void;
  markCustomerMessagesAsRead: () => void;
  markStaffMessagesAsRead: () => void;
}

export const useTraviaStore = create<TraviaStoreState>((set, get) => ({
  activeCustomerId: 'd0000000-0000-0000-0000-000000000001',
  customer: mockCustomer,
  trip: mockTrip,
  itineraryDays: mockItineraryDays,
  bookings: [mockBookingTransfer, mockBookingYacht],
  userThreads: mockUserThreads,
  messages: mockUserThreads['d0000000-0000-0000-0000-000000000001'] || mockMessages,
  requests: mockRequests,
  notifications: initialNotifications,
  documents: mockDocuments,
  payments: mockPayments,
  staffCustomers: [
    {
      id: 'cust-1',
      customerId: 'd0000000-0000-0000-0000-000000000001',
      name: 'Edip Mangtay',
      paxLabel: 'Premium Couple (2 Kişi)',
      dates: '12 – 17 Eylül',
      statusText: "Dubai'de",
      isInsideDubai: true,
      unreadCount: 1,
      hotel: 'Atlantis The Royal',
      outstanding: '13.500 AED',
    },
    {
      id: 'cust-2',
      customerId: 'd0000000-0000-0000-0000-000000000002',
      name: 'Ahmet Yılmaz',
      paxLabel: 'Luxury Family (4 Kişi)',
      dates: '15 – 21 Eylül',
      statusText: '3 gün kaldı',
      isInsideDubai: false,
      unreadCount: 0,
      hotel: 'Burj Al Arab Jumeirah',
      outstanding: '0 AED',
    },
    {
      id: 'cust-3',
      customerId: 'd0000000-0000-0000-0000-000000000003',
      name: 'Canan Özdemir',
      paxLabel: 'VIP Solo (1 Kişi)',
      dates: '18 – 23 Eylül',
      statusText: '6 gün kaldı',
      isInsideDubai: false,
      unreadCount: 1,
      hotel: 'Armani Hotel Dubai',
      outstanding: '4.200 AED',
    },
  ],
  operations: initialOperations,

  // ─── Set Active Customer (User-Based Switching) ───────────────
  setActiveCustomer: (customerId: string) => {
    const cust = mockCustomersList.find((c) => c.id === customerId) || mockCustomer;
    const threadMsgs = get().userThreads[customerId] || [];
    set({
      activeCustomerId: customerId,
      customer: cust,
      messages: threadMsgs,
    });
  },

  // ─── Send Customer Message (Scoped to Active Customer Thread) ─
  sendCustomerMessage: (text: string) => {
    const { activeCustomerId, userThreads, customer } = get();
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      thread_id: `thread-${activeCustomerId}`,
      sender_role: 'customer',
      type: 'text',
      content: text,
      status: 'sent',
      created_at: new Date().toISOString(),
    };

    const currentThread = userThreads[activeCustomerId] || [];
    const updatedThread = [...currentThread, newMsg];

    set((state) => ({
      userThreads: {
        ...state.userThreads,
        [activeCustomerId]: updatedThread,
      },
      messages: updatedThread,
      staffCustomers: state.staffCustomers.map((sc) =>
        sc.customerId === activeCustomerId ? { ...sc, unreadCount: sc.unreadCount + 1 } : sc
      ),
    }));

    // Realistic concierge auto-response after 1.5s
    setTimeout(() => {
      const state = get();
      const replyMsg: Message = {
        id: `msg-reply-${Date.now()}`,
        thread_id: `thread-${activeCustomerId}`,
        sender_role: 'concierge',
        type: 'text',
        content: `Talebinizi aldık ${customer.first_name} Bey/Hanım, concierge ekibimiz derhal ilgileniyor.`,
        status: 'read',
        created_at: new Date().toISOString(),
      };

      const threadNow = state.userThreads[activeCustomerId] || [];
      const updatedWithReply = [...threadNow, replyMsg];

      set({
        userThreads: {
          ...state.userThreads,
          [activeCustomerId]: updatedWithReply,
        },
        messages: updatedWithReply,
      });
    }, 1500);
  },

  // ─── Send Staff Message ───────────────────────────────────────
  sendStaffMessage: (text: string) => {
    const { activeCustomerId, userThreads } = get();
    const newMsg: Message = {
      id: `msg-staff-${Date.now()}`,
      thread_id: `thread-${activeCustomerId}`,
      sender_role: 'concierge',
      type: 'text',
      content: text,
      status: 'sent',
      created_at: new Date().toISOString(),
    };

    const currentThread = userThreads[activeCustomerId] || [];
    const updatedThread = [...currentThread, newMsg];

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'concierge_message',
      title: 'Travia Concierge',
      body: text.length > 60 ? `${text.slice(0, 57)}...` : text,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    set((state) => ({
      userThreads: {
        ...state.userThreads,
        [activeCustomerId]: updatedThread,
      },
      messages: updatedThread,
      notifications: [newNotif, ...state.notifications],
    }));
  },

  // ─── Create Customer Request (PRD §26, §27, §31) ──────────────
  createCustomerRequest: (data) => {
    const newReq: CustomerRequest = {
      id: `req-${Date.now()}`,
      company_id: 'a0000000-0000-0000-0000-000000000001',
      customer_id: 'd0000000-0000-0000-0000-000000000001',
      category: data.category,
      status: 'received',
      title: data.title,
      date: data.date,
      time: data.time || '20:00',
      pax_count: data.pax_count || 2,
      notes: data.notes,
      created_at: new Date().toISOString(),
      customer_name: 'Edip Mangtay',
    };

    // 1. Post system card message to chat (PRD §25)
    const systemMsg: Message = {
      id: `sys-${Date.now()}`,
      thread_id: 'thread-1',
      sender_role: 'concierge',
      type: 'system',
      content: `Yeni Talep Oluşturuldu: ${data.title} (${data.date}${data.time ? ' · ' + data.time : ''})`,
      status: 'read',
      created_at: new Date().toISOString(),
    };

    // 2. Add customer notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'request_received',
      title: 'Talebiniz Alındı',
      body: `"${data.title}" talebiniz concierge ekibine iletildi. İnceleniyor.`,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    set((state) => ({
      requests: [newReq, ...state.requests],
      messages: [...state.messages, systemMsg],
      notifications: [newNotif, ...state.notifications],
    }));

    return newReq;
  },

  // ─── Approve Request (PRD §43, §61 step 10-12) ───────────────
  approveRequest: (requestId: string) => {
    const { requests, itineraryDays } = get();
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;

    // 1. Mark request confirmed
    const updatedRequests = requests.map((r) =>
      r.id === requestId ? { ...r, status: 'confirmed' as RequestStatus } : r
    );

    // 2. Add as an Itinerary Item to the relevant day (Day 2 or Day 3)
    const targetDayIndex = req.date?.includes('14')
      ? 2
      : req.date?.includes('13')
      ? 1
      : 0;

    const newBookingId = `booking-gen-${Date.now()}`;
    const newBooking: Booking = {
      id: newBookingId,
      company_id: 'a0000000-0000-0000-0000-000000000001',
      trip_id: 'f0000000-0000-0000-0000-000000000001',
      customer_id: 'd0000000-0000-0000-0000-000000000001',
      type: (req.category === 'restaurant'
        ? 'restaurant'
        : req.category === 'yacht'
        ? 'yacht'
        : req.category === 'transfer'
        ? 'transfer'
        : 'activity') as any,
      status: 'confirmed',
      title: req.title,
      description: req.notes || 'Concierge tarafından onaylanan özel rezervasyon.',
      date: req.date || '2026-09-13',
      start_time: req.time || '20:30',
      location: 'Dubai',
      pax_count: req.pax_count || 2,
      dress_code: 'Smart Elegant',
      included: ['Masa Rezervasyonu', 'VIP Karşılama'],
    };

    const newItem: ItineraryItem = {
      id: `item-gen-${Date.now()}`,
      itinerary_day_id: itineraryDays[targetDayIndex]?.id || '10000000-0000-0000-0000-000000000001',
      booking_id: newBookingId,
      sort_order: 10,
      time: req.time || '20:30',
      title: req.title,
      subtitle: `${req.pax_count || 2} Kişi · Onaylandı`,
      location: 'Dubai',
      icon: req.category === 'restaurant' ? 'coffee' : req.category === 'yacht' ? 'navigation' : 'compass',
      status: 'confirmed',
      is_highlight: true,
      booking: newBooking,
    };

    const updatedItineraryDays = itineraryDays.map((day, idx) => {
      if (idx === targetDayIndex) {
        return {
          ...day,
          items: [...(day.items || []), newItem],
        };
      }
      return day;
    });

    // 3. Post system message to chat
    const systemMsg: Message = {
      id: `sys-conf-${Date.now()}`,
      thread_id: 'thread-1',
      sender_role: 'concierge',
      type: 'system',
      content: `Rezervasyon Onaylandı: ${req.title} · ${req.time || '20:30'}`,
      status: 'read',
      created_at: new Date().toISOString(),
    };

    // 4. Create customer notification
    const newNotif: NotificationItem = {
      id: `notif-conf-${Date.now()}`,
      type: 'booking_confirmed',
      title: 'Rezervasyonunuz Onaylandı!',
      body: `"${req.title}" rezervasyonunuz onaylanarak seyahat programınıza eklendi.`,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    // 5. Add to operations
    const newOp: OperationItem = {
      id: `op-new-${Date.now()}`,
      bookingId: newBookingId,
      time: req.time || '20:30',
      type: req.title,
      customerName: 'Edip Mangtay',
      details: `${req.pax_count || 2} Kişi · Özel Rezervasyon`,
      status: 'confirmed',
      driverOrLocation: 'Dubai',
    };

    set((state) => ({
      requests: updatedRequests,
      itineraryDays: updatedItineraryDays,
      bookings: [...state.bookings, newBooking],
      messages: [...state.messages, systemMsg],
      notifications: [newNotif, ...state.notifications],
      operations: [newOp, ...state.operations],
    }));
  },

  // ─── Update Request Status ────────────────────────────────────
  updateRequestStatus: (requestId, status) => {
    set((state) => ({
      requests: state.requests.map((r) =>
        r.id === requestId ? { ...r, status } : r
      ),
    }));
  },

  // ─── Update Operation Status (PRD §44, §45) ───────────────────
  updateOperationStatus: (operationId, status) => {
    const { operations } = get();
    const op = operations.find((o) => o.id === operationId);

    const updatedOps = operations.map((o) =>
      o.id === operationId ? { ...o, status } : o
    );

    // Notify customer on status change
    let statusLabel = 'Onaylandı';
    if (status === 'in_progress') statusLabel = 'Başladı';
    if (status === 'completed') statusLabel = 'Tamamlandı';
    if (status === 'issue') statusLabel = 'Operasyon İncelemede';

    const notif: NotificationItem = {
      id: `notif-op-${Date.now()}`,
      type: 'operation_update',
      title: `${op?.type || 'Operasyon'}: ${statusLabel}`,
      body: `Hizmet durumu güncellendi: ${statusLabel}.`,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    set((state) => ({
      operations: updatedOps,
      notifications: [notif, ...state.notifications],
    }));
  },

  // ─── Mark Notifications Read ─────────────────────────────────
  markNotificationsAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, is_read: true })),
    }));
  },

  // ─── Mark Messages Read ──────────────────────────────────────
  markCustomerMessagesAsRead: () => {
    set((state) => ({
      messages: state.messages.map((m) =>
        m.sender_role !== 'customer' ? { ...m, status: 'read' as const } : m
      ),
    }));
  },

  markStaffMessagesAsRead: () => {
    set((state) => ({
      messages: state.messages.map((m) =>
        m.sender_role === 'customer' ? { ...m, status: 'read' as const } : m
      ),
      staffCustomers: state.staffCustomers.map((sc) =>
        sc.id === 'cust-1' ? { ...sc, unreadCount: 0 } : sc
      ),
    }));
  },
}));
