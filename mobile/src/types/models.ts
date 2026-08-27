/**
 * TRAVIA DUBAI — Domain TypeScript Models
 */

export type UserRole = 'customer' | 'admin' | 'concierge' | 'operations';
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
  email?: string;
  phone?: string;
  whatsapp?: string;
  country: string;
  preferred_language: string;
  notes?: string;
  tags: string[];
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
  total_amount?: number;
  currency: string;
}

export interface ItineraryDay {
  id: string;
  trip_id: string;
  day_number: number;
  date: string;
  title?: string;
  items?: ItineraryItem[];
}

export interface ItineraryItem {
  id: string;
  itinerary_day_id: string;
  booking_id?: string;
  sort_order: number;
  time?: string;
  end_time?: string;
  title: string;
  subtitle?: string;
  location?: string;
  icon?: string;
  status: BookingStatus;
  is_highlight: boolean;
  booking?: Booking;
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
  cover_image_url?: string;
  driver_name?: string;
  driver_phone?: string;
  driver_whatsapp?: string;
  vehicle_type?: string;
  vehicle_plate?: string;
  pickup_location?: string;
  dropoff_location?: string;
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

export interface MessageThread {
  id: string;
  company_id: string;
  customer_id: string;
  trip_id?: string;
  title: string;
  last_message_at?: string;
  last_message_preview?: string;
  customer_unread_count: number;
  staff_unread_count: number;
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

export interface DocumentItem {
  id: string;
  customer_id: string;
  trip_id?: string;
  type: DocumentType;
  title: string;
  file_url: string;
  file_name: string;
  file_size?: number;
  created_at: string;
}

export interface PaymentItem {
  id: string;
  trip_id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  description?: string;
  payment_method?: string;
  paid_at?: string;
}

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  body?: string;
  is_read: boolean;
  created_at: string;
  data?: Record<string, any>;
}

export interface ExperienceItem {
  id: string;
  category: BookingType;
  title: string;
  description: string;
  cover_image_url?: string;
  duration?: string;
  highlights: string[];
}
