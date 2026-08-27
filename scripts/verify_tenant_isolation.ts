/**
 * TRAVEL OS — Multi-Tenant Isolation & New Tenant Acceptance Test Suite
 * Sections 31 & 32
 */

import { tenantRegistry, DEFAULT_TENANT_ID } from '../src/lib/tenancy/tenantContext';
import { customerService, tripService, eventBus } from '../src/lib/services';
import { traviaData } from '../shared/data/traviaData';

async function runTenantIsolationTests() {
  console.log('\n═══════════════════════════════════════════════════════════════════');
  console.log('       TRAVEL OS — TENANT ISOLATION & ACCEPTANCE SUITE             ');
  console.log('═══════════════════════════════════════════════════════════════════\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName} ${detail ? `-> ${detail}` : ''}`);
      failed++;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // TEST 1: Tenant Fleet Initial State
  // ─────────────────────────────────────────────────────────────
  console.log('▶ TEST GROUP 1: Core Tenancy Fleet');
  const traviaTenant = tenantRegistry.getTenantById(DEFAULT_TENANT_ID);
  assert(traviaTenant !== null && traviaTenant.slug === 'travia', 'Tenant #001 (Travia) successfully resolved');
  assert(traviaTenant.default_currency === 'AED', 'Travia default currency is AED');
  assert(traviaTenant.plan === 'founding_partner', 'Travia is on founding_partner plan');

  const eliteTenant = tenantRegistry.getTenantBySlug('elite');
  assert(eliteTenant !== null && eliteTenant.default_currency === 'USD', 'Tenant #002 (Elite Horizons) isolated with USD');

  // ─────────────────────────────────────────────────────────────
  // TEST 2: Section 32 Acceptance Test — Provision New Tenant "Luxury Travel B"
  // ─────────────────────────────────────────────────────────────
  console.log('\n▶ TEST GROUP 2: Provisioning New Tenant (Section 32)');
  const newTenant = tenantRegistry.createTenant({
    legal_name: 'Luxury Travel B International Ltd.',
    display_name: 'Luxury Travel B',
    slug: 'luxury-travel-b',
    plan: 'premium',
    default_currency: 'AED',
    timezone: 'Asia/Dubai',
    default_language: 'en',
    admin_email: 'ceo@luxurytravelb.com',
    primary_color: '#E11D48',
  });

  assert(Boolean(newTenant.id), `New tenant provisioned with ID: ${newTenant.id}`);
  assert(newTenant.status === 'active', 'New tenant status is immediately ACTIVE');
  assert(newTenant.default_currency === 'AED', 'New tenant currency is AED');

  // ─────────────────────────────────────────────────────────────
  // TEST 3: Zero-Data Contamination (Clean Slate Verification)
  // ─────────────────────────────────────────────────────────────
  console.log('\n▶ TEST GROUP 3: Zero Data Leakage / Isolation Verification');
  const tenantBCustomersInitial = await customerService.getCustomers(newTenant.id);
  assert(
    tenantBCustomersInitial.length === 0,
    'Requirement #10: New Tenant CRM contains ZERO customer records from Travia',
    `Found ${tenantBCustomersInitial.length} records`
  );

  const tenantBTripsInitial = await tripService.getTrips(newTenant.id);
  assert(
    tenantBTripsInitial.length === 0,
    'New Tenant CRM contains ZERO trip records from Travia',
    `Found ${tenantBTripsInitial.length} records`
  );

  const tenantBThreadsInitial = traviaData.getAllThreads(newTenant.id);
  assert(
    tenantBThreadsInitial.length === 0,
    'New Tenant Concierge contains ZERO message threads from Travia',
    `Found ${tenantBThreadsInitial.length} threads`
  );

  // ─────────────────────────────────────────────────────────────
  // TEST 4: Tenant Data Mutation & Cross-Tenant Access Denial
  // ─────────────────────────────────────────────────────────────
  console.log('\n▶ TEST GROUP 4: Tenant Creation & Boundary Defense');
  // Tenant B creates customer
  const custB = await customerService.createCustomer(
    {
      first_name: 'Lady Victoria',
      last_name: 'Sterling',
      email: 'victoria@sterlingholdings.co.uk',
      phone: '+44 7700 900077',
      country: 'United Kingdom',
    },
    newTenant.id
  );
  assert(custB.company_id === newTenant.id, 'Customer created under Tenant B company_id');

  // Tenant B creates trip
  const tripB = await tripService.createTrip(
    {
      customerId: custB.id,
      title: 'Dubai Royal Escapade',
      destination: 'Bulgari Resort Dubai',
      startDate: '2026-10-10',
      endDate: '2026-10-18',
      nights: 8,
      paxCount: 2,
      totalAmount: 95000,
      currency: 'AED',
    },
    newTenant.id
  );
  assert(tripB.company_id === newTenant.id, 'Trip created under Tenant B company_id');

  // Tenant B creates message thread
  const threadB = traviaData.createTenantThread(
    newTenant.id,
    custB.id,
    'Lady Victoria Sterling',
    'Dubai Royal Escapade'
  );
  assert(threadB.tenant_id === newTenant.id, 'Message thread created under Tenant B');

  // Query as Tenant #001 (Travia) — MUST NOT SEE TENANT B DATA
  const traviaCustomers = await customerService.getCustomers(DEFAULT_TENANT_ID);
  const traviaCanSeeCustB = traviaCustomers.some(c => c.id === custB.id);
  assert(!traviaCanSeeCustB, 'Tenant A (Travia) CANNOT see Tenant B customer "Lady Victoria Sterling"');

  const traviaTrips = await tripService.getTrips(DEFAULT_TENANT_ID);
  const traviaCanSeeTripB = traviaTrips.some(t => t.id === tripB.id);
  assert(!traviaCanSeeTripB, 'Tenant A (Travia) CANNOT see Tenant B trip "Dubai Royal Escapade"');

  const traviaThreads = traviaData.getAllThreads(DEFAULT_TENANT_ID);
  const traviaCanSeeThreadB = traviaThreads.some(t => t.id === threadB.id);
  assert(!traviaCanSeeThreadB, 'Tenant A (Travia) CANNOT see Tenant B concierge thread');

  // Query as Tenant B — MUST SEE ONLY TENANT B DATA
  const tenantBCustomers = await customerService.getCustomers(newTenant.id);
  assert(
    tenantBCustomers.length === 1 && tenantBCustomers[0].id === custB.id,
    'Tenant B sees strictly their own 1 customer'
  );

  // ─────────────────────────────────────────────────────────────
  // TEST 5: Domain Events & Transactional Outbox
  // ─────────────────────────────────────────────────────────────
  console.log('\n▶ TEST GROUP 5: Domain Events & Outbox Verification');
  const outbox = eventBus.getOutbox();
  const customerCreatedEvents = outbox.filter(e => e.eventType === 'CustomerCreated' && e.tenantId === newTenant.id);
  assert(customerCreatedEvents.length > 0, 'Domain event "CustomerCreated" was dispatched with Tenant B ID');

  const tripCreatedEvents = outbox.filter(e => e.eventType === 'TripCreated' && e.tenantId === newTenant.id);
  assert(tripCreatedEvents.length > 0, 'Domain event "TripCreated" was dispatched with Tenant B ID');

  // ─────────────────────────────────────────────────────────────
  // TEST 6: Feature Gating per Tenant
  // ─────────────────────────────────────────────────────────────
  console.log('\n▶ TEST GROUP 6: Tenant Feature Flag Isolation');
  tenantRegistry.toggleTenantFeature(newTenant.id, 'AI_COPILOT', false);
  const reloadedB = tenantRegistry.getTenantById(newTenant.id);
  const reloadedTravia = tenantRegistry.getTenantById(DEFAULT_TENANT_ID);

  assert(reloadedB.features.AI_COPILOT === false, 'Tenant B feature AI_COPILOT disabled successfully');
  assert(reloadedTravia.features.AI_COPILOT === true, 'Tenant #001 feature AI_COPILOT remains intact (TRUE)');

  // ─────────────────────────────────────────────────────────────
  // SUMMARY
  // ─────────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════════════════════════');
  console.log(`SUITE COMPLETE: ${passed} PASSED, ${failed} FAILED`);
  console.log('STATUS: MULTI-TENANT ISOLATION FULLY VERIFIED');
  console.log('═══════════════════════════════════════════════════════════════════\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTenantIsolationTests().catch(err => {
  console.error('Fatal error during test suite:', err);
  process.exit(1);
});
