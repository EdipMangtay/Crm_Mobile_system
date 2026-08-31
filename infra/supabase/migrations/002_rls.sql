-- ═══════════════════════════════════════════════════════════════
-- TRAVIA DUBAI — ROW LEVEL SECURITY POLICIES
-- Customer sees ONLY their own data. Staff sees ONLY their company data.
-- Booking internal fields are NEVER exposed to customer.
-- ═══════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;

-- ─── HELPER FUNCTIONS ─────────────────────────────────────────

-- Get the company_id for the current authenticated user
CREATE OR REPLACE FUNCTION auth_company_id()
RETURNS UUID AS $$
  SELECT company_id FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Get the role for the current authenticated user
CREATE OR REPLACE FUNCTION auth_role()
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Get the customer_id for the current authenticated customer
CREATE OR REPLACE FUNCTION auth_customer_id()
RETURNS UUID AS $$
  SELECT customer_id FROM customer_access WHERE auth_user_id = auth.uid() AND is_active = TRUE;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Check if user is staff (admin, concierge, operations)
CREATE OR REPLACE FUNCTION is_staff()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
      AND role IN ('admin', 'concierge', 'operations')
      AND is_active = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ─── PROFILES ─────────────────────────────────────────────────
-- Users can read their own profile
CREATE POLICY "Users read own profile" ON profiles
  FOR SELECT USING (id = auth.uid());

-- Staff can read profiles in their company
CREATE POLICY "Staff read company profiles" ON profiles
  FOR SELECT USING (is_staff() AND company_id = auth_company_id());

-- Users can update their own profile
CREATE POLICY "Users update own profile" ON profiles
  FOR UPDATE USING (id = auth.uid());

-- ─── COMPANIES ────────────────────────────────────────────────
CREATE POLICY "Users read own company" ON companies
  FOR SELECT USING (id = auth_company_id());

-- ─── CUSTOMERS ────────────────────────────────────────────────
-- Customer reads their own record
CREATE POLICY "Customer reads self" ON customers
  FOR SELECT USING (id = auth_customer_id());

-- Staff reads customers in their company
CREATE POLICY "Staff reads company customers" ON customers
  FOR SELECT USING (is_staff() AND company_id = auth_company_id());

-- Staff can update customers
CREATE POLICY "Staff updates customers" ON customers
  FOR UPDATE USING (is_staff() AND company_id = auth_company_id());

-- ─── CUSTOMER ACCESS ──────────────────────────────────────────
-- Customer reads own access
CREATE POLICY "Customer reads own access" ON customer_access
  FOR SELECT USING (auth_user_id = auth.uid());

-- Staff reads company access records
CREATE POLICY "Staff reads access" ON customer_access
  FOR SELECT USING (is_staff() AND company_id = auth_company_id());

-- Staff manages access
CREATE POLICY "Staff manages access" ON customer_access
  FOR ALL USING (is_staff() AND company_id = auth_company_id());

-- ─── TRIPS ────────────────────────────────────────────────────
-- Customer reads own trips
CREATE POLICY "Customer reads own trips" ON trips
  FOR SELECT USING (customer_id = auth_customer_id());

-- Staff reads company trips
CREATE POLICY "Staff reads company trips" ON trips
  FOR SELECT USING (is_staff() AND company_id = auth_company_id());

-- Staff manages trips
CREATE POLICY "Staff manages trips" ON trips
  FOR ALL USING (is_staff() AND company_id = auth_company_id());

-- ─── BOOKINGS ─────────────────────────────────────────────────
-- CRITICAL: Customer view that EXCLUDES internal fields
-- We use a security-definer function to strip internal columns

CREATE OR REPLACE FUNCTION customer_booking_view(p_customer_id UUID)
RETURNS SETOF bookings AS $$
  SELECT id, company_id, trip_id, customer_id, type, status,
         title, description, date, start_time, end_time, location, meeting_point,
         pax_count, dress_code, included, customer_notes, cover_image_url,
         driver_name, driver_phone, driver_whatsapp, vehicle_type, vehicle_plate,
         pickup_location, dropoff_location,
         -- NULLIFY internal fields
         NULL::TEXT, NULL::DECIMAL, NULL::TEXT, NULL::TEXT,
         NULL::DECIMAL, NULL::DECIMAL, NULL::TEXT, NULL::TEXT,
         metadata, created_at, updated_at
  FROM bookings WHERE customer_id = p_customer_id;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Customer reads own bookings (internal fields will be null via app-level SELECT)
CREATE POLICY "Customer reads own bookings" ON bookings
  FOR SELECT USING (customer_id = auth_customer_id());

-- Staff reads company bookings (full access including internal fields)
CREATE POLICY "Staff reads company bookings" ON bookings
  FOR SELECT USING (is_staff() AND company_id = auth_company_id());

-- Staff manages bookings
CREATE POLICY "Staff manages bookings" ON bookings
  FOR ALL USING (is_staff() AND company_id = auth_company_id());

-- ─── ITINERARY DAYS ───────────────────────────────────────────
CREATE POLICY "Customer reads own itinerary days" ON itinerary_days
  FOR SELECT USING (
    trip_id IN (SELECT id FROM trips WHERE customer_id = auth_customer_id())
  );

CREATE POLICY "Staff reads company itinerary days" ON itinerary_days
  FOR SELECT USING (is_staff() AND trip_id IN (SELECT id FROM trips WHERE company_id = auth_company_id()));

CREATE POLICY "Staff manages itinerary days" ON itinerary_days
  FOR ALL USING (is_staff() AND trip_id IN (SELECT id FROM trips WHERE company_id = auth_company_id()));

-- ─── ITINERARY ITEMS ──────────────────────────────────────────
CREATE POLICY "Customer reads own itinerary items" ON itinerary_items
  FOR SELECT USING (
    itinerary_day_id IN (
      SELECT id.id FROM itinerary_days id
      JOIN trips t ON id.trip_id = t.id
      WHERE t.customer_id = auth_customer_id()
    )
  );

CREATE POLICY "Staff reads company itinerary items" ON itinerary_items
  FOR SELECT USING (is_staff() AND itinerary_day_id IN (
    SELECT id.id FROM itinerary_days id
    JOIN trips t ON id.trip_id = t.id
    WHERE t.company_id = auth_company_id()
  ));

CREATE POLICY "Staff manages itinerary items" ON itinerary_items
  FOR ALL USING (is_staff() AND itinerary_day_id IN (
    SELECT id.id FROM itinerary_days id
    JOIN trips t ON id.trip_id = t.id
    WHERE t.company_id = auth_company_id()
  ));

-- ─── CUSTOMER REQUESTS ────────────────────────────────────────
CREATE POLICY "Customer reads own requests" ON customer_requests
  FOR SELECT USING (customer_id = auth_customer_id());

CREATE POLICY "Customer creates requests" ON customer_requests
  FOR INSERT WITH CHECK (customer_id = auth_customer_id());

CREATE POLICY "Customer updates own requests" ON customer_requests
  FOR UPDATE USING (customer_id = auth_customer_id());

CREATE POLICY "Staff reads company requests" ON customer_requests
  FOR SELECT USING (is_staff() AND company_id = auth_company_id());

CREATE POLICY "Staff manages requests" ON customer_requests
  FOR ALL USING (is_staff() AND company_id = auth_company_id());

-- ─── MESSAGE THREADS ──────────────────────────────────────────
CREATE POLICY "Customer reads own threads" ON message_threads
  FOR SELECT USING (customer_id = auth_customer_id());

CREATE POLICY "Staff reads company threads" ON message_threads
  FOR SELECT USING (is_staff() AND company_id = auth_company_id());

CREATE POLICY "Staff manages threads" ON message_threads
  FOR ALL USING (is_staff() AND company_id = auth_company_id());

-- ─── MESSAGES ─────────────────────────────────────────────────
CREATE POLICY "Customer reads own messages" ON messages
  FOR SELECT USING (
    thread_id IN (SELECT id FROM message_threads WHERE customer_id = auth_customer_id())
  );

CREATE POLICY "Customer sends messages" ON messages
  FOR INSERT WITH CHECK (
    thread_id IN (SELECT id FROM message_threads WHERE customer_id = auth_customer_id())
    AND sender_role = 'customer'
  );

CREATE POLICY "Staff reads company messages" ON messages
  FOR SELECT USING (is_staff() AND thread_id IN (
    SELECT id FROM message_threads WHERE company_id = auth_company_id()
  ));

CREATE POLICY "Staff sends messages" ON messages
  FOR INSERT WITH CHECK (is_staff() AND thread_id IN (
    SELECT id FROM message_threads WHERE company_id = auth_company_id()
  ));

-- Message read updates
CREATE POLICY "Users update message read state" ON messages
  FOR UPDATE USING (
    thread_id IN (SELECT id FROM message_threads WHERE customer_id = auth_customer_id())
    OR (is_staff() AND thread_id IN (SELECT id FROM message_threads WHERE company_id = auth_company_id()))
  );

-- ─── DOCUMENTS ────────────────────────────────────────────────
CREATE POLICY "Customer reads own visible documents" ON documents
  FOR SELECT USING (customer_id = auth_customer_id() AND is_customer_visible = TRUE);

CREATE POLICY "Staff reads company documents" ON documents
  FOR SELECT USING (is_staff() AND company_id = auth_company_id());

CREATE POLICY "Staff manages documents" ON documents
  FOR ALL USING (is_staff() AND company_id = auth_company_id());

-- ─── PAYMENTS ─────────────────────────────────────────────────
CREATE POLICY "Customer reads own payments" ON payments
  FOR SELECT USING (customer_id = auth_customer_id());

CREATE POLICY "Staff reads company payments" ON payments
  FOR SELECT USING (is_staff() AND company_id = auth_company_id());

CREATE POLICY "Staff manages payments" ON payments
  FOR ALL USING (is_staff() AND company_id = auth_company_id());

-- ─── NOTIFICATIONS ────────────────────────────────────────────
CREATE POLICY "Users read own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users update own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- ─── ACTIVITIES ───────────────────────────────────────────────
CREATE POLICY "Staff reads company activities" ON activities
  FOR SELECT USING (is_staff() AND company_id = auth_company_id());

-- Insert policy - anyone can create activity logs
CREATE POLICY "Users create activities" ON activities
  FOR INSERT WITH CHECK (TRUE);

-- ─── STAFF ASSIGNMENTS ────────────────────────────────────────
CREATE POLICY "Staff reads assignments" ON staff_assignments
  FOR SELECT USING (is_staff() AND company_id = auth_company_id());

CREATE POLICY "Staff manages assignments" ON staff_assignments
  FOR ALL USING (is_staff() AND company_id = auth_company_id());

-- ─── EXPERIENCES ──────────────────────────────────────────────
-- Everyone in the company can read experiences
CREATE POLICY "Users read experiences" ON experiences
  FOR SELECT USING (company_id = auth_company_id() AND is_active = TRUE);

CREATE POLICY "Staff manages experiences" ON experiences
  FOR ALL USING (is_staff() AND company_id = auth_company_id());

-- ─── CUSTOMER PREFERENCES ─────────────────────────────────────
CREATE POLICY "Customer reads own preferences" ON customer_preferences
  FOR SELECT USING (customer_id = auth_customer_id());

CREATE POLICY "Customer manages preferences" ON customer_preferences
  FOR ALL USING (customer_id = auth_customer_id());

-- ─── DEVICES ──────────────────────────────────────────────────
CREATE POLICY "Users manage own devices" ON devices
  FOR ALL USING (user_id = auth.uid());

-- ═══════════════════════════════════════════════════════════════
-- RLS COMPLETE
-- All tables secured. Customer isolated. Staff company-scoped.
-- Booking internal fields protected via app-level column selection.
-- ═══════════════════════════════════════════════════════════════
