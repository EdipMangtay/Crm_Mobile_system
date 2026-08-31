-- ============================================================
-- 005_crm_schema.sql
-- TRAVIA ULTIMATE CRM — Schema Extensions
-- ============================================================

-- 1. Extend user_role enum
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'owner';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'sales';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'finance';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'marketing';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'viewer';

-- 2. New CRM Enums
DO $$ BEGIN
  CREATE TYPE lead_stage AS ENUM ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'booked', 'lost');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE lead_priority AS ENUM ('low', 'medium', 'high', 'urgent');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE proposal_status AS ENUM ('draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE supplier_status AS ENUM ('active', 'inactive', 'blocked');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE supplier_category AS ENUM ('hotel', 'transport', 'yacht', 'safari', 'restaurant', 'experience', 'ticketing', 'guide', 'photography', 'other');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. Leads Table (CRM Core)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  country TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'en',
  travel_start_date DATE,
  travel_end_date DATE,
  pax_count INTEGER,
  travel_type TEXT,
  budget_range TEXT,
  interests TEXT[] NOT NULL DEFAULT '{}',
  requested_services TEXT[] NOT NULL DEFAULT '{}',
  source TEXT,
  source_detail TEXT,
  campaign TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  referral_code TEXT,
  influencer_id UUID,
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  stage lead_stage NOT NULL DEFAULT 'new',
  estimated_value DECIMAL(12, 2),
  currency TEXT NOT NULL DEFAULT 'AED',
  priority lead_priority NOT NULL DEFAULT 'medium',
  lead_score INTEGER DEFAULT 50,
  lost_reason TEXT,
  notes TEXT,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Suppliers Table
CREATE TABLE IF NOT EXISTS suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  category supplier_category NOT NULL DEFAULT 'other',
  contact_person TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  currency TEXT NOT NULL DEFAULT 'AED',
  payment_terms TEXT,
  rating DECIMAL(2, 1) DEFAULT 5.0,
  reliability INTEGER DEFAULT 100,
  notes TEXT,
  status supplier_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Proposals Table
CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  travel_dates TEXT,
  hotel TEXT,
  experiences TEXT[] NOT NULL DEFAULT '{}',
  total_price DECIMAL(12, 2),
  currency TEXT NOT NULL DEFAULT 'AED',
  notes TEXT,
  status proposal_status NOT NULL DEFAULT 'draft',
  sent_at TIMESTAMPTZ,
  viewed_at TIMESTAMPTZ,
  responded_at TIMESTAMPTZ,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  due_date TIMESTAMPTZ,
  priority task_priority NOT NULL DEFAULT 'medium',
  status task_status NOT NULL DEFAULT 'pending',
  completed_at TIMESTAMPTZ,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Add soft delete and CRM extensions to existing tables
ALTER TABLE customers ADD COLUMN IF NOT EXISTS is_archived BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE trips ADD COLUMN IF NOT EXISTS is_archived BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS is_archived BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE experiences ADD COLUMN IF NOT EXISTS internal_cost DECIMAL(10, 2);
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS selling_price_min DECIMAL(10, 2);
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS selling_price_max DECIMAL(10, 2);
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS estimated_margin DECIMAL(10, 2);
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS recommended_segments TEXT[] NOT NULL DEFAULT '{}';

-- Indices
CREATE INDEX IF NOT EXISTS idx_leads_company_stage ON leads(company_id, stage);
CREATE INDEX IF NOT EXISTS idx_leads_assigned ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_status ON tasks(assigned_to, status);
CREATE INDEX IF NOT EXISTS idx_suppliers_category ON suppliers(company_id, category);
