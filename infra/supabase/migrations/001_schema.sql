-- ═══════════════════════════════════════════════════════════════
-- TRAVIA DUBAI — CORE DATABASE SCHEMA
-- ONE CUSTOMER — ONE DATABASE — MULTIPLE INTERFACES
-- ═══════════════════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── ENUMS ────────────────────────────────────────────────────

CREATE TYPE user_role AS ENUM ('customer', 'admin', 'concierge', 'operations');
CREATE TYPE trip_status AS ENUM ('upcoming', 'active', 'completed', 'cancelled');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'issue');
CREATE TYPE booking_type AS ENUM ('transfer', 'tour', 'yacht', 'restaurant', 'desert_safari', 'beach_club', 'helicopter', 'supercar', 'activity', 'hotel', 'flight', 'other');
CREATE TYPE request_status AS ENUM ('received', 'reviewing', 'preparing_offer', 'pending_approval', 'confirmed', 'completed', 'cancelled');
CREATE TYPE request_category AS ENUM ('restaurant', 'transfer', 'yacht', 'beach_club', 'activity', 'private_driver', 'booking_change', 'itinerary_change', 'other');
CREATE TYPE message_type AS ENUM ('text', 'image', 'document', 'system', 'action');
CREATE TYPE message_status AS ENUM ('sent', 'delivered', 'read');
CREATE TYPE payment_status AS ENUM ('pending', 'received', 'refunded', 'cancelled');
CREATE TYPE document_type AS ENUM ('hotel_voucher', 'yacht_confirmation', 'safari_voucher', 'transfer_confirmation', 'invoice', 'payment_receipt', 'visa_document', 'travel_document', 'other');
CREATE TYPE notification_type AS ENUM ('message', 'booking_update', 'request_update', 'payment_update', 'itinerary_update', 'driver_ready', 'general');
CREATE TYPE activity_type AS ENUM ('login', 'message_sent', 'request_created', 'request_updated', 'booking_changed', 'trip_changed', 'document_uploaded', 'payment_recorded', 'staff_contacted', 'access_created', 'access_revoked');

-- ─── COMPANIES ────────────────────────────────────────────────
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── PROFILES ─────────────────────────────────────────────────
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id),
  role user_role NOT NULL DEFAULT 'customer',
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  country TEXT,
  preferred_language TEXT DEFAULT 'tr',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── CUSTOMERS ────────────────────────────────────────────────
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id),
  profile_id UUID REFERENCES profiles(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  country TEXT DEFAULT 'TR',
  preferred_language TEXT DEFAULT 'tr',
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_customers_company ON customers(company_id);

-- ─── CUSTOMER ACCESS ──────────────────────────────────────────
CREATE TABLE customer_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  auth_user_id UUID REFERENCES auth.users(id),
  username TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  must_change_password BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id),
  CONSTRAINT uq_customer_access_username UNIQUE (username),
  CONSTRAINT uq_customer_access_customer UNIQUE (customer_id)
);

-- ─── TRIPS ────────────────────────────────────────────────────
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  title TEXT NOT NULL,
  subtitle TEXT,
  destination TEXT NOT NULL DEFAULT 'Dubai',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  nights INTEGER GENERATED ALWAYS AS (end_date - start_date) STORED,
  pax_count INTEGER NOT NULL DEFAULT 1,
  pax_label TEXT,
  status trip_status NOT NULL DEFAULT 'upcoming',
  hotel_name TEXT,
  hotel_address TEXT,
  cover_image_url TEXT,
  timezone TEXT DEFAULT 'Asia/Dubai',
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  total_amount DECIMAL(10,2),
  currency TEXT DEFAULT 'AED',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_trips_customer ON trips(customer_id);
CREATE INDEX idx_trips_status ON trips(status);

-- ─── BOOKINGS ─────────────────────────────────────────────────
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id),
  type booking_type NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  location TEXT,
  meeting_point TEXT,
  pax_count INTEGER DEFAULT 1,
  dress_code TEXT,
  included TEXT[],
  customer_notes TEXT,
  cover_image_url TEXT,
  driver_name TEXT,
  driver_phone TEXT,
  driver_whatsapp TEXT,
  vehicle_type TEXT,
  vehicle_plate TEXT,
  pickup_location TEXT,
  dropoff_location TEXT,
  -- INTERNAL ONLY
  internal_supplier_name TEXT,
  internal_supplier_cost DECIMAL(10,2),
  internal_supplier_currency TEXT DEFAULT 'AED',
  internal_supplier_contact TEXT,
  internal_commission DECIMAL(10,2),
  internal_margin DECIMAL(10,2),
  internal_notes TEXT,
  internal_confirmation_ref TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_bookings_trip ON bookings(trip_id);
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);

-- ─── ITINERARY DAYS ───────────────────────────────────────────
CREATE TABLE itinerary_days (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  date DATE NOT NULL,
  title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_itinerary_day UNIQUE (trip_id, day_number)
);

-- ─── ITINERARY ITEMS ──────────────────────────────────────────
CREATE TABLE itinerary_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  itinerary_day_id UUID NOT NULL REFERENCES itinerary_days(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id),
  sort_order INTEGER NOT NULL DEFAULT 0,
  time TIME,
  end_time TIME,
  title TEXT NOT NULL,
  subtitle TEXT,
  location TEXT,
  icon TEXT,
  status booking_status DEFAULT 'confirmed',
  is_highlight BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── CUSTOMER REQUESTS ────────────────────────────────────────
CREATE TABLE customer_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  trip_id UUID REFERENCES trips(id),
  category request_category NOT NULL,
  status request_status NOT NULL DEFAULT 'received',
  title TEXT NOT NULL,
  date DATE,
  time TIME,
  pax_count INTEGER,
  budget TEXT,
  preferences TEXT,
  notes TEXT,
  staff_notes TEXT,
  assigned_to UUID REFERENCES profiles(id),
  resolved_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── MESSAGE THREADS ──────────────────────────────────────────
CREATE TABLE message_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  trip_id UUID REFERENCES trips(id),
  title TEXT DEFAULT 'Travia Concierge',
  last_message_at TIMESTAMPTZ,
  last_message_preview TEXT,
  customer_unread_count INTEGER DEFAULT 0,
  staff_unread_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── MESSAGES ─────────────────────────────────────────────────
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id),
  sender_role user_role NOT NULL,
  type message_type NOT NULL DEFAULT 'text',
  content TEXT,
  attachment_url TEXT,
  attachment_name TEXT,
  metadata JSONB DEFAULT '{}',
  status message_status DEFAULT 'sent',
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_messages_thread ON messages(thread_id);
CREATE INDEX idx_messages_created ON messages(created_at);

-- ─── DOCUMENTS ────────────────────────────────────────────────
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  trip_id UUID REFERENCES trips(id),
  booking_id UUID REFERENCES bookings(id),
  type document_type NOT NULL,
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  is_customer_visible BOOLEAN DEFAULT TRUE,
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── PAYMENTS ─────────────────────────────────────────────────
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id),
  trip_id UUID NOT NULL REFERENCES trips(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'AED',
  status payment_status NOT NULL DEFAULT 'pending',
  description TEXT,
  payment_method TEXT,
  reference TEXT,
  paid_at TIMESTAMPTZ,
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── NOTIFICATIONS ────────────────────────────────────────────
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── ACTIVITIES ───────────────────────────────────────────────
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id),
  user_id UUID REFERENCES profiles(id),
  customer_id UUID REFERENCES customers(id),
  type activity_type NOT NULL,
  description TEXT,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── STAFF ASSIGNMENTS ────────────────────────────────────────
CREATE TABLE staff_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id),
  staff_id UUID NOT NULL REFERENCES profiles(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  role TEXT DEFAULT 'concierge',
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_staff_assignment UNIQUE (staff_id, customer_id)
);

-- ─── EXPERIENCES ──────────────────────────────────────────────
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id),
  category booking_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  duration TEXT,
  highlights TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── CUSTOMER PREFERENCES ─────────────────────────────────────
CREATE TABLE customer_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  key TEXT NOT NULL,
  value TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_customer_pref UNIQUE (customer_id, key)
);

-- ─── DEVICES ──────────────────────────────────────────────────
CREATE TABLE devices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  push_token TEXT NOT NULL,
  platform TEXT,
  device_name TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_device_token UNIQUE (push_token)
);

-- ─── TRIGGERS ─────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER set_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON trips FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON itinerary_days FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON itinerary_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON customer_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON message_threads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON devices FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── MESSAGE THREAD UPDATE TRIGGER ────────────────────────────
CREATE OR REPLACE FUNCTION update_thread_on_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE message_threads SET
    last_message_at = NEW.created_at,
    last_message_preview = LEFT(NEW.content, 100),
    customer_unread_count = CASE
      WHEN NEW.sender_role != 'customer' THEN customer_unread_count + 1
      ELSE customer_unread_count
    END,
    staff_unread_count = CASE
      WHEN NEW.sender_role = 'customer' THEN staff_unread_count + 1
      ELSE staff_unread_count
    END,
    updated_at = NOW()
  WHERE id = NEW.thread_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_message_insert
  AFTER INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION update_thread_on_message();

-- ═══════════════════════════════════════════════════════════════
-- SCHEMA COMPLETE — 20 tables, all enums, all triggers
-- ═══════════════════════════════════════════════════════════════
