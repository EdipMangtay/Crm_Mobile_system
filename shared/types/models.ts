/**
 * TRAVIA DUBAI — Unified Domain Types (Shared between Mobile, Web, CRM)
 * PRD: "ONE CUSTOMER · ONE DATABASE · MULTIPLE INTERFACES"
 */

export type UserRole = 'customer' | 'owner' | 'admin' | 'sales' | 'concierge' | 'operations' | 'finance' | 'marketing' | 'viewer';
export type TripStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';
export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'issue';
export type BookingType = 'transfer' | 'tour' | 'yacht' | 'restaurant' | 'desert_safari' | 'beach_club' | 'helicopter' | 'supercar' | 'activity' | 'hotel' | 'flight' | 'other';
export type RequestStatus = 'received' | 'reviewing' | 'preparing_offer' | 'pending_approval' | 'confirmed' | 'completed' | 'cancelled';
export type RequestCategory = 'restaurant' | 'transfer' | 'yacht' | 'beach_club' | 'activity' | 'private_driver' | 'booking_change' | 'itinerary_change' | 'other';
export type MessageType = 'text' | 'image' | 'document' | 'system' | 'action';
export type MessageStatus = 'sent' | 'delivered' | 'read';
export type PaymentStatus = 'pending' | 'received' | 'refunded' | 'cancelled';
export type DocumentType = 'hotel_voucher' | 'yacht_confirmation' | 'safari_voucher' | 'transfer_confirmation' | 'invoice' | 'payment_receipt' | 'visa_document' | 'travel_document' | 'other';

export interface Customer {
  id: string;
  company_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  country: string;
  preferred_language: string;
  notes?: string;
  tags: string[];
  avatar_url?: string;
  lifetime_value: number;
}

export interface Trip {
  id: string;
  company_id: string;
  customer_id: string;
  title: string;
  subtitle?: string;
  destination: string;
  start_date: string;
  end_date: string;
  nights: number;
  pax_count: number;
  pax_label?: string;
  status: TripStatus;
  hotel_name?: string;
  hotel_address?: string;
  cover_image_url?: string;
  timezone: string;
  total_amount: number;
  supplier_cost?: number;
  gross_contribution?: number;
  currency: string;
}

export interface Booking {
  id: string;
  company_id: string;
  trip_id: string;
  customer_id: string;
  type: BookingType;
  status: BookingStatus;
  title: string;
  description?: string;
  date: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  meeting_point?: string;
  pax_count: number;
  dress_code?: string;
  included?: string[];
  customer_notes?: string;
  driver_name?: string;
  driver_phone?: string;
  vehicle_type?: string;
  vehicle_plate?: string;
  pickup_location?: string;
  dropoff_location?: string;
  // Internal staff fields
  internal_supplier_name?: string;
  internal_supplier_cost?: number;
  internal_margin?: number;
}

export interface CustomerRequest {
  id: string;
  company_id: string;
  customer_id: string;
  trip_id?: string;
  category: RequestCategory;
  status: RequestStatus;
  title: string;
  date?: string;
  time?: string;
  pax_count?: number;
  budget?: string;
  preferences?: string;
  notes?: string;
  created_at: string;
  customer_name?: string;
}

export interface Message {
  id: string;
  thread_id: string;
  sender_id?: string;
  sender_role: UserRole;
  type: MessageType;
  content: string;
  attachment_url?: string;
  attachment_name?: string;
  status: MessageStatus;
  created_at: string;
}

export interface UserMessageThread {
  id: string;
  customer_id: string;
  customer_name: string;
  customer_country: string;
  customer_vip: boolean;
  trip_title: string;
  last_message_at: string;
  last_message_preview: string;
  customer_unread_count: number;
  staff_unread_count: number;
  messages: Message[];
}
