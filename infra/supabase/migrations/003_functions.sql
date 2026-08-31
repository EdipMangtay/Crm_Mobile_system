-- ═══════════════════════════════════════════════════════════════
-- TRAVIA DUBAI — DATABASE FUNCTIONS & PROCEDURES
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. CREATE CUSTOMER MOBILE ACCESS (PRD §50) ───────────────
CREATE OR REPLACE FUNCTION create_customer_mobile_access(
  p_customer_id UUID,
  p_username TEXT,
  p_temp_password TEXT,
  p_created_by UUID
)
RETURNS JSONB AS $$
DECLARE
  v_company_id UUID;
  v_customer RECORD;
  v_auth_user_id UUID;
  v_access_id UUID;
  v_existing_access RECORD;
BEGIN
  -- 1. Get customer and verify exists
  SELECT * INTO v_customer FROM customers WHERE id = p_customer_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Customer not found with ID: %', p_customer_id;
  END IF;

  v_company_id := v_customer.company_id;

  -- 2. Check if active access already exists
  SELECT * INTO v_existing_access FROM customer_access WHERE customer_id = p_customer_id AND is_active = TRUE;
  IF FOUND THEN
    RAISE EXCEPTION 'Customer already has active mobile access (username: %)', v_existing_access.username;
  END IF;

  -- 3. Verify username uniqueness
  IF EXISTS (SELECT 1 FROM customer_access WHERE username = p_username) THEN
    RAISE EXCEPTION 'Username already taken: %', p_username;
  END IF;

  -- 4. Create auth user in Supabase auth schema if available, or generate record
  -- Note: In edge functions or server callers, supabase admin API creates auth user.
  -- Here we link or prepare customer_access.
  INSERT INTO customer_access (
    company_id,
    customer_id,
    auth_user_id,
    username,
    is_active,
    must_change_password,
    created_by
  ) VALUES (
    v_company_id,
    p_customer_id,
    v_customer.profile_id,
    p_username,
    TRUE,
    TRUE,
    p_created_by
  ) RETURNING id INTO v_access_id;

  -- 5. Log audit activity
  INSERT INTO activities (
    company_id,
    user_id,
    customer_id,
    type,
    description,
    entity_type,
    entity_id
  ) VALUES (
    v_company_id,
    p_created_by,
    p_customer_id,
    'access_created',
    'Mobile access generated for username: ' || p_username,
    'customer_access',
    v_access_id
  );

  RETURN jsonb_build_object(
    'success', TRUE,
    'access_id', v_access_id,
    'username', p_username,
    'must_change_password', TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ─── 2. REVOKE CUSTOMER ACCESS (PRD §51) ─────────────────────
CREATE OR REPLACE FUNCTION revoke_customer_access(
  p_access_id UUID,
  p_revoked_by UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_access RECORD;
BEGIN
  SELECT * INTO v_access FROM customer_access WHERE id = p_access_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Access record not found';
  END IF;

  UPDATE customer_access
  SET is_active = FALSE,
      updated_at = NOW()
  WHERE id = p_access_id;

  -- Log activity
  INSERT INTO activities (
    company_id,
    user_id,
    customer_id,
    type,
    description,
    entity_type,
    entity_id
  ) VALUES (
    v_access.company_id,
    p_revoked_by,
    v_access.customer_id,
    'access_revoked',
    'Mobile access disabled for username: ' || v_access.username,
    'customer_access',
    p_access_id
  );

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ─── 3. MARK MESSAGES AS READ (PRD §47) ──────────────────────
CREATE OR REPLACE FUNCTION mark_thread_messages_as_read(
  p_thread_id UUID,
  p_reader_role user_role
)
RETURNS INTEGER AS $$
DECLARE
  v_updated_count INTEGER;
BEGIN
  IF p_reader_role = 'customer' THEN
    -- Customer marks staff messages as read
    UPDATE messages
    SET status = 'read',
        read_at = NOW()
    WHERE thread_id = p_thread_id
      AND sender_role != 'customer'
      AND status != 'read';
    
    GET DIAGNOSTICS v_updated_count = ROW_COUNT;

    UPDATE message_threads
    SET customer_unread_count = 0,
        updated_at = NOW()
    WHERE id = p_thread_id;

  ELSE
    -- Staff marks customer messages as read
    UPDATE messages
    SET status = 'read',
        read_at = NOW()
    WHERE thread_id = p_thread_id
      AND sender_role = 'customer'
      AND status != 'read';

    GET DIAGNOSTICS v_updated_count = ROW_COUNT;

    UPDATE message_threads
    SET staff_unread_count = 0,
        updated_at = NOW()
    WHERE id = p_thread_id;
  END IF;

  RETURN v_updated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ─── 4. GET STAFF DASHBOARD KPI METRICS (PRD §39) ─────────────
CREATE OR REPLACE FUNCTION get_staff_dashboard_metrics(p_company_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_active_guests INTEGER;
  v_today_operations INTEGER;
  v_new_requests INTEGER;
  v_unread_messages INTEGER;
  v_pending_approvals INTEGER;
  v_today DATE := CURRENT_DATE;
BEGIN
  -- Active guests in Dubai right now
  SELECT COUNT(DISTINCT customer_id) INTO v_active_guests
  FROM trips
  WHERE company_id = p_company_id
    AND status = 'active';

  -- Today's operations
  SELECT COUNT(*) INTO v_today_operations
  FROM bookings
  WHERE company_id = p_company_id
    AND date = v_today;

  -- New requests awaiting review
  SELECT COUNT(*) INTO v_new_requests
  FROM customer_requests
  WHERE company_id = p_company_id
    AND status IN ('received', 'reviewing');

  -- Total staff unread messages
  SELECT COALESCE(SUM(staff_unread_count), 0) INTO v_unread_messages
  FROM message_threads
  WHERE company_id = p_company_id;

  -- Pending approvals
  SELECT COUNT(*) INTO v_pending_approvals
  FROM customer_requests
  WHERE company_id = p_company_id
    AND status = 'pending_approval';

  RETURN jsonb_build_object(
    'active_guests', v_active_guests,
    'today_operations', v_today_operations,
    'new_requests', v_new_requests,
    'unread_messages', v_unread_messages,
    'pending_approvals', v_pending_approvals
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
