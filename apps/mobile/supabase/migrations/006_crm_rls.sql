-- ============================================================
-- 006_crm_rls.sql
-- TRAVIA ULTIMATE CRM — Security Hardening & RLS
-- ============================================================

-- Fix 1: Hardened profile update policy (prevent privilege escalation)
DROP POLICY IF EXISTS "Users update own profile" ON profiles;
CREATE POLICY "Users update own profile" ON profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid() AND
    role = (SELECT role FROM profiles WHERE id = auth.uid()) AND
    company_id = (SELECT company_id FROM profiles WHERE id = auth.uid())
  );

-- Fix 2: Enable RLS on new tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Leads RLS
CREATE POLICY "Staff view company leads" ON leads
  FOR SELECT TO authenticated
  USING (company_id = auth_company_id() AND is_staff());

CREATE POLICY "Staff manage company leads" ON leads
  FOR ALL TO authenticated
  USING (company_id = auth_company_id() AND is_staff())
  WITH CHECK (company_id = auth_company_id() AND is_staff());

-- Suppliers RLS
CREATE POLICY "Staff view company suppliers" ON suppliers
  FOR SELECT TO authenticated
  USING (company_id = auth_company_id() AND is_staff());

CREATE POLICY "Staff manage company suppliers" ON suppliers
  FOR ALL TO authenticated
  USING (company_id = auth_company_id() AND is_staff())
  WITH CHECK (company_id = auth_company_id() AND is_staff());

-- Proposals RLS
CREATE POLICY "Staff manage company proposals" ON proposals
  FOR ALL TO authenticated
  USING (company_id = auth_company_id() AND is_staff())
  WITH CHECK (company_id = auth_company_id() AND is_staff());

-- Tasks RLS
CREATE POLICY "Staff view company tasks" ON tasks
  FOR SELECT TO authenticated
  USING (company_id = auth_company_id() AND is_staff());

CREATE POLICY "Staff manage company tasks" ON tasks
  FOR ALL TO authenticated
  USING (company_id = auth_company_id() AND is_staff())
  WITH CHECK (company_id = auth_company_id() AND is_staff());
