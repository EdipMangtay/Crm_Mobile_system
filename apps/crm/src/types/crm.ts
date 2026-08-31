/**
 * TRAVIA ULTIMATE CRM — TypeScript Type Definitions
 * Mirrors database schema with CRM-specific extensions
 */

// ─── Enums ────────────────────────────────────────────────────

export type UserRole = 'customer' | 'owner' | 'admin' | 'sales' | 'concierge' | 'operations' | 'finance' | 'marketing' | 'viewer';

export type CrmStaffRole = Exclude<UserRole, 'customer'>;

export type TripStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';

export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'issue';

export type BookingType = 'transfer' | 'tour' | 'yacht' | 'restaurant' | 'desert_safari' | 'beach_club' | 'helicopter' | 'supercar' | 'activity' | 'hotel' | 'flight' | 'other';

export type LeadStage = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'booked' | 'lost';

export type LeadPriority = 'low' | 'medium' | 'high' | 'urgent';

export type RequestStatus = 'received' | 'reviewing' | 'preparing_offer' | 'pending_approval' | 'confirmed' | 'completed' | 'cancelled';

export type RequestCategory = 'restaurant' | 'transfer' | 'yacht' | 'beach_club' | 'activity' | 'private_driver' | 'booking_change' | 'itinerary_change' | 'other';

export type PaymentStatus = 'pending' | 'received' | 'refunded' | 'cancelled';

export type ProposalStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export type SupplierCategory = 'hotel' | 'transport' | 'yacht' | 'safari' | 'restaurant' | 'experience' | 'ticketing' | 'guide' | 'photography' | 'other';

export type MessageType = 'text' | 'image' | 'document' | 'system' | 'action';

export type MessageStatus = 'sent' | 'delivered' | 'read';

export type DocumentType = 'hotel_voucher' | 'yacht_confirmation' | 'safari_voucher' | 'transfer_confirmation' | 'invoice' | 'payment_receipt' | 'visa_document' | 'travel_document' | 'other';

export type ActivityType = 'login' | 'message_sent' | 'request_created' | 'request_updated' | 'booking_changed' | 'trip_changed' | 'document_uploaded' | 'payment_recorded' | 'staff_contacted' | 'access_created' | 'access_revoked' | 'lead_created' | 'lead_stage_changed' | 'lead_assigned' | 'lead_converted' | 'proposal_sent' | 'proposal_accepted' | 'customer_created' | 'trip_created' | 'task_created' | 'task_completed' | 'note_added';

// ─── Database Models ──────────────────────────────────────────

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  company_id: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  country: string | null;
  preferred_language: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  company_id: string;
  profile_id: string | null;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  country: string;
  preferred_language: string;
  notes: string | null;
  tags: string[];
  metadata: Record<string, unknown>;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  company_id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  country: string | null;
  preferred_language: string;
  travel_start_date: string | null;
  travel_end_date: string | null;
  pax_count: number | null;
  travel_type: string | null;
  budget_range: string | null;
  interests: string[];
  requested_services: string[];
  source: string | null;
  source_detail: string | null;
  campaign: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  referral_code: string | null;
  influencer_id: string | null;
  assigned_to: string | null;
  stage: LeadStage;
  estimated_value: number | null;
  currency: string;
  priority: LeadPriority;
  lead_score: number | null;
  lost_reason: string | null;
  notes: string | null;
  customer_id: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  assigned_staff?: Profile;
}

export interface Trip {
  id: string;
  company_id: string;
  customer_id: string;
  title: string;
  subtitle: string | null;
  destination: string;
  start_date: string;
  end_date: string;
  nights: number;
  pax_count: number;
  pax_label: string | null;
  status: TripStatus;
  hotel_name: string | null;
  hotel_address: string | null;
  cover_image_url: string | null;
  timezone: string;
  notes: string | null;
  metadata: Record<string, unknown>;
  total_amount: number | null;
  currency: string;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  // Joined
  customer?: Customer;
}

export interface Booking {
  id: string;
  company_id: string;
  trip_id: string;
  customer_id: string;
  type: BookingType;
  status: BookingStatus;
  title: string;
  description: string | null;
  date: string;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  meeting_point: string | null;
  pax_count: number;
  dress_code: string | null;
  included: string[] | null;
  customer_notes: string | null;
  cover_image_url: string | null;
  driver_name: string | null;
  driver_phone: string | null;
  driver_whatsapp: string | null;
  vehicle_type: string | null;
  vehicle_plate: string | null;
  pickup_location: string | null;
  dropoff_location: string | null;
  // Internal fields (staff-only)
  internal_supplier_name: string | null;
  internal_supplier_cost: number | null;
  internal_supplier_currency: string;
  internal_supplier_contact: string | null;
  internal_commission: number | null;
  internal_margin: number | null;
  internal_notes: string | null;
  internal_confirmation_ref: string | null;
  metadata: Record<string, unknown>;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface ItineraryDay {
  id: string;
  trip_id: string;
  day_number: number;
  date: string;
  title: string | null;
  items?: ItineraryItem[];
}

export interface ItineraryItem {
  id: string;
  itinerary_day_id: string;
  booking_id: string | null;
  sort_order: number;
  time: string | null;
  end_time: string | null;
  title: string;
  subtitle: string | null;
  location: string | null;
  icon: string | null;
  status: BookingStatus;
  is_highlight: boolean;
  booking?: Booking;
}

export interface CustomerRequest {
  id: string;
  company_id: string;
  customer_id: string;
  trip_id: string | null;
  category: RequestCategory;
  status: RequestStatus;
  title: string;
  date: string | null;
  time: string | null;
  pax_count: number | null;
  budget: string | null;
  preferences: string | null;
  notes: string | null;
  staff_notes: string | null;
  assigned_to: string | null;
  resolved_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  customer?: Customer;
}

export interface MessageThread {
  id: string;
  company_id: string;
  customer_id: string;
  trip_id: string | null;
  title: string;
  last_message_at: string | null;
  last_message_preview: string | null;
  customer_unread_count: number;
  staff_unread_count: number;
  is_active: boolean;
  customer?: Customer;
}

export interface Message {
  id: string;
  thread_id: string;
  sender_id: string | null;
  sender_role: UserRole;
  type: MessageType;
  content: string | null;
  attachment_url: string | null;
  attachment_name: string | null;
  metadata: Record<string, unknown>;
  status: MessageStatus;
  read_at: string | null;
  created_at: string;
}

export interface Payment {
  id: string;
  company_id: string;
  trip_id: string;
  customer_id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  description: string | null;
  payment_method: string | null;
  reference: string | null;
  paid_at: string | null;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
  customer?: Customer;
  trip?: Trip;
}

export interface Supplier {
  id: string;
  company_id: string;
  company_name: string;
  category: SupplierCategory;
  contact_person: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  currency: string;
  payment_terms: string | null;
  rating: number | null;
  reliability: number | null;
  notes: string | null;
  status: 'active' | 'inactive' | 'blocked';
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  company_id: string;
  lead_id: string | null;
  customer_id: string | null;
  title: string;
  travel_dates: string | null;
  hotel: string | null;
  experiences: string[];
  total_price: number | null;
  currency: string;
  notes: string | null;
  status: ProposalStatus;
  sent_at: string | null;
  viewed_at: string | null;
  responded_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CrmTask {
  id: string;
  company_id: string;
  title: string;
  description: string | null;
  lead_id: string | null;
  customer_id: string | null;
  trip_id: string | null;
  assigned_to: string | null;
  due_date: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  completed_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  assigned_staff?: Profile;
}

export interface Activity {
  id: string;
  company_id: string;
  user_id: string | null;
  customer_id: string | null;
  type: ActivityType;
  description: string | null;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  user?: Profile;
}

export interface Experience {
  id: string;
  company_id: string;
  category: BookingType;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  duration: string | null;
  highlights: string[];
  is_active: boolean;
  sort_order: number;
  internal_cost: number | null;
  selling_price_min: number | null;
  selling_price_max: number | null;
  estimated_margin: number | null;
  location: string | null;
  recommended_segments: string[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  company_id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  old_values: Record<string, unknown> | null;
  new_values: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
  user?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string | null;
  data: Record<string, unknown>;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
}

// ─── CRM Dashboard Types ─────────────────────────────────────

export interface DashboardKPIs {
  revenue: number;
  revenue_delta: number;
  gross_contribution: number;
  gross_contribution_delta: number;
  bookings_count: number;
  bookings_delta: number;
  new_leads: number;
  new_leads_delta: number;
  conversion_rate: number;
  conversion_rate_delta: number;
  avg_booking_value: number;
  avg_booking_delta: number;
  active_guests: number;
  outstanding_payments: number;
}

export interface PipelineStage {
  stage: LeadStage;
  count: number;
  value: number;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  cost: number;
  gross_contribution: number;
}

export interface OperationEvent {
  id: string;
  time: string;
  customer_name: string;
  customer_country: string;
  type: BookingType;
  title: string;
  details: string;
  status: BookingStatus;
  location: string;
}

// ─── Permission Matrix ───────────────────────────────────────

export const ROLE_PERMISSIONS: Record<CrmStaffRole, string[]> = {
  owner: ['*'],
  admin: ['*'],
  sales: ['leads', 'customers', 'proposals', 'tasks', 'trips', 'analytics.sales'],
  concierge: ['customers', 'trips', 'bookings', 'messages', 'requests', 'tasks', 'operations'],
  operations: ['customers', 'trips', 'bookings', 'operations', 'suppliers', 'tasks'],
  finance: ['customers', 'trips', 'payments', 'suppliers', 'analytics.finance'],
  marketing: ['leads', 'customers', 'analytics.marketing', 'experiences'],
  viewer: ['customers.read', 'trips.read', 'bookings.read', 'analytics.read'],
};

export function hasPermission(role: CrmStaffRole, permission: string): boolean {
  const perms = ROLE_PERMISSIONS[role];
  if (!perms) return false;
  if (perms.includes('*')) return true;
  return perms.some(p => permission.startsWith(p));
}

// ─── Lead Stage Configuration ────────────────────────────────

export const LEAD_STAGES: { value: LeadStage; label: string; color: string }[] = [
  { value: 'new', label: 'Yeni', color: '#60A5FA' },
  { value: 'contacted', label: 'İletişime Geçildi', color: '#A78BFA' },
  { value: 'qualified', label: 'Nitelikli', color: '#34D399' },
  { value: 'proposal_sent', label: 'Teklif Gönderildi', color: '#FBBF24' },
  { value: 'negotiation', label: 'Müzakere', color: '#F97316' },
  { value: 'booked', label: 'Rezervasyon', color: '#10B981' },
  { value: 'lost', label: 'Kayıp', color: '#EF4444' },
];

// ─── Booking Type Labels ─────────────────────────────────────

export const BOOKING_TYPE_LABELS: Record<BookingType, string> = {
  transfer: 'Transfer',
  tour: 'Tur',
  yacht: 'Yat',
  restaurant: 'Restoran',
  desert_safari: 'Çöl Safarisi',
  beach_club: 'Beach Club',
  helicopter: 'Helikopter',
  supercar: 'Süper Araba',
  activity: 'Aktivite',
  hotel: 'Otel',
  flight: 'Uçuş',
  other: 'Diğer',
};

// ─── Country Flags ────────────────────────────────────────────

export const COUNTRY_FLAGS: Record<string, string> = {
  TR: '🇹🇷', AE: '🇦🇪', DE: '🇩🇪', GB: '🇬🇧', US: '🇺🇸',
  RU: '🇷🇺', SA: '🇸🇦', FR: '🇫🇷', IT: '🇮🇹', NL: '🇳🇱',
  KW: '🇰🇼', QA: '🇶🇦', BH: '🇧🇭', KZ: '🇰🇿', AZ: '🇦🇿',
};

// ─── Currency Configuration ──────────────────────────────────

export const CURRENCIES = [
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
] as const;

export function formatCurrency(amount: number, currency = 'AED'): string {
  const curr = CURRENCIES.find(c => c.code === currency);
  return `${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ${curr?.code || currency}`;
}

// ─── Customer Segments ────────────────────────────────────────

export const CUSTOMER_SEGMENTS = [
  'VIP', 'UHNW', 'Couple', 'Honeymoon', 'Family', 'Solo',
  'Business', 'Repeat', 'Referral', 'Influencer', 'Luxury', 'Adventure',
] as const;

// ─── Customer Preference Categories ──────────────────────────

export const PREFERENCE_CATEGORIES = [
  'Luxury', 'Adventure', 'Fine Dining', 'Nightlife', 'Family',
  'Shopping', 'Yacht', 'Beach Club', 'Supercar', 'Spa',
  'Art', 'Culture', 'Golf',
] as const;
