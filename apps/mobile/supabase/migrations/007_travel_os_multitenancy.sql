-- ═══════════════════════════════════════════════════════════════
-- TRAVEL OS — MULTI-TENANT ARCHITECTURE MIGRATION
-- Migration Ref: 007_travel_os_multitenancy.sql
-- Principle: ONE PLATFORM · MANY TRAVEL COMPANIES
-- ═══════════════════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── 1. TENANT STATUS & PLAN ENUMS ────────────────────────────
DO $$ BEGIN
  CREATE TYPE tenant_status AS ENUM ('trial', 'active', 'past_due', 'restricted', 'suspended', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE tenant_plan AS ENUM ('starter', 'professional', 'premium', 'enterprise', 'founding_partner');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE tenant_member_role AS ENUM ('owner', 'admin', 'sales', 'concierge', 'operations', 'finance', 'marketing', 'viewer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE platform_role AS ENUM ('platform_owner', 'platform_admin', 'platform_support');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ─── 2. TENANTS TABLE (FIRST-CLASS TENANCY ENTITY) ───────────
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  legal_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  status tenant_status NOT NULL DEFAULT 'active',
  plan tenant_plan NOT NULL DEFAULT 'starter',
  timezone TEXT NOT NULL DEFAULT 'Asia/Dubai',
  default_currency TEXT NOT NULL DEFAULT 'AED',
  default_language TEXT NOT NULL DEFAULT 'en',
  logo_url TEXT,
  favicon_url TEXT,
  primary_color TEXT NOT NULL DEFAULT '#C9A66B',
  secondary_color TEXT NOT NULL DEFAULT '#05070F',
  domain TEXT UNIQUE,
  crm_domain TEXT UNIQUE,
  customer_domain TEXT UNIQUE,
  settings_json JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Backwards compatibility with existing companies table
-- Insert or migrate existing company into tenants table
INSERT INTO tenants (id, slug, legal_name, display_name, status, plan, timezone, default_currency, default_language, primary_color, secondary_color, settings_json)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'travia',
  'Travia Tourism L.L.C.',
  'Travia Dubai',
  'active',
  'founding_partner',
  'Asia/Dubai',
  'AED',
  'tr',
  '#C9A66B',
  '#05070F',
  '{"contact_phone": "+90 532 000 0000", "whatsapp": "+905320000000", "bank_name": "Emirates NBD", "iban": "AE07 0260 0001 2345 6789 012"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  plan = EXCLUDED.plan;

-- Seed Second Tenant to verify tenant isolation (Agency B)
INSERT INTO tenants (id, slug, legal_name, display_name, status, plan, timezone, default_currency, default_language, primary_color, secondary_color, settings_json)
VALUES (
  'a0000000-0000-0000-0000-000000000002',
  'luxury-b',
  'Elite Horizons Travel Ltd.',
  'Elite Horizons VIP',
  'active',
  'professional',
  'Europe/London',
  'USD',
  'en',
  '#2563EB',
  '#0F172A',
  '{"contact_phone": "+44 20 7946 0912", "whatsapp": "+442079460912", "bank_name": "HSBC UK", "iban": "GB29 HBUK 4012 7612 3456 78"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- ─── 3. TENANT MEMBERSHIPS ───────────────────────────────────
-- Allows one user to belong to multiple tenants with distinct roles
CREATE TABLE IF NOT EXISTS tenant_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  role tenant_member_role NOT NULL DEFAULT 'concierge',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'invited', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, tenant_id)
);

CREATE INDEX IF NOT EXISTS idx_tenant_memberships_user ON tenant_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_tenant_memberships_tenant ON tenant_memberships(tenant_id);

-- ─── 4. PLATFORM ROLES (SUPERADMIN CONTROL PLANE) ─────────────
-- Completely separated from tenant memberships
CREATE TABLE IF NOT EXISTS platform_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role platform_role NOT NULL DEFAULT 'platform_support',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── 5. TENANT FEATURE FLAGS ─────────────────────────────────
CREATE TABLE IF NOT EXISTS tenant_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  feature_key TEXT NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(tenant_id, feature_key)
);

CREATE INDEX IF NOT EXISTS idx_tenant_features_tenant ON tenant_features(tenant_id);

-- Seed Default Feature Flags for Tenant #001
INSERT INTO tenant_features (tenant_id, feature_key, is_enabled) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'CRM', true),
  ('a0000000-0000-0000-0000-000000000001', 'MOBILE_APP', true),
  ('a0000000-0000-0000-0000-000000000001', 'CUSTOMER_PORTAL', true),
  ('a0000000-0000-0000-0000-000000000001', 'CONCIERGE', true),
  ('a0000000-0000-0000-0000-000000000001', 'AI_COPILOT', true),
  ('a0000000-0000-0000-0000-000000000001', 'PAYMENTS', true),
  ('a0000000-0000-0000-0000-000000000001', 'SUPPLIER_MANAGEMENT', true),
  ('a0000000-0000-0000-0000-000000000001', 'WHITE_LABEL', true)
ON CONFLICT (tenant_id, feature_key) DO NOTHING;

-- ─── 6. TENANT AUDIT LOGS ────────────────────────────────────
CREATE TABLE IF NOT EXISTS tenant_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  module TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tenant_audit_logs_tenant ON tenant_audit_logs(tenant_id, created_at DESC);

-- ─── 7. SECURITY DEFINER HELPER FUNCTIONS ────────────────────

-- Get Current User's Active Tenant ID
CREATE OR REPLACE FUNCTION current_tenant_id()
RETURNS UUID AS $$
DECLARE
  v_tenant_id UUID;
  v_header_tenant TEXT;
BEGIN
  -- 1. Try to read from request headers (set by Next.js API/Middleware)
  v_header_tenant := current_setting('request.headers', true)::json->>'x-tenant-id';
  IF v_header_tenant IS NOT NULL AND v_header_tenant ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    -- Verify the caller has membership in this tenant
    IF EXISTS (
      SELECT 1 FROM tenant_memberships
      WHERE user_id = auth.uid() AND tenant_id = v_header_tenant::uuid AND status = 'active'
    ) THEN
      RETURN v_header_tenant::uuid;
    END IF;
  END IF;

  -- 2. Fall back to user's first active tenant membership
  SELECT tenant_id INTO v_tenant_id
  FROM tenant_memberships
  WHERE user_id = auth.uid() AND status = 'active'
  LIMIT 1;

  IF v_tenant_id IS NOT NULL THEN
    RETURN v_tenant_id;
  END IF;

  -- 3. Backwards compatibility fallback for profiles.company_id
  SELECT company_id INTO v_tenant_id
  FROM profiles
  WHERE id = auth.uid()
  LIMIT 1;

  RETURN v_tenant_id;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Check if current user is a Platform Admin
CREATE OR REPLACE FUNCTION is_platform_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM platform_users
    WHERE id = auth.uid() AND is_active = true
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Check if user has specific tenant role
CREATE OR REPLACE FUNCTION has_tenant_role(target_tenant_id UUID, allowed_roles TEXT[])
RETURNS BOOLEAN AS $$
BEGIN
  IF is_platform_admin() THEN
    RETURN TRUE;
  END IF;

  RETURN EXISTS (
    SELECT 1 FROM tenant_memberships
    WHERE user_id = auth.uid()
      AND tenant_id = target_tenant_id
      AND role::text = ANY(allowed_roles)
      AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- ─── 8. ROW LEVEL SECURITY (RLS) FOR TENANTS ─────────────────
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_users ENABLE ROW LEVEL SECURITY;

-- Tenants: Platform admin sees all; Tenant users see only their own tenant
DROP POLICY IF EXISTS "tenants_select_policy" ON tenants;
CREATE POLICY "tenants_select_policy" ON tenants
FOR SELECT TO authenticated
USING (
  is_platform_admin()
  OR id = current_tenant_id()
  OR EXISTS (
    SELECT 1 FROM tenant_memberships
    WHERE user_id = auth.uid() AND tenant_id = tenants.id AND status = 'active'
  )
);

DROP POLICY IF EXISTS "tenants_platform_owner_write" ON tenants;
CREATE POLICY "tenants_platform_owner_write" ON tenants
FOR ALL TO authenticated
USING (is_platform_admin())
WITH CHECK (is_platform_admin());

-- Tenant Memberships: Platform admin sees all; users see memberships in their tenant
DROP POLICY IF EXISTS "memberships_select_policy" ON tenant_memberships;
CREATE POLICY "memberships_select_policy" ON tenant_memberships
FOR SELECT TO authenticated
USING (
  is_platform_admin()
  OR user_id = auth.uid()
  OR tenant_id = current_tenant_id()
);

-- Tenant Features: Read-only for tenant members; write for platform admins
DROP POLICY IF EXISTS "features_select_policy" ON tenant_features;
CREATE POLICY "features_select_policy" ON tenant_features
FOR SELECT TO authenticated
USING (
  is_platform_admin()
  OR tenant_id = current_tenant_id()
);
