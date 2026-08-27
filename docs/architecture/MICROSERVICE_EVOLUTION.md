# TRAVEL OS — MICROSERVICE EXTRACTION ROADMAP
**Document Ref:** `DOC-ARCH-002`  
**Current Phase:** Multi-Tenant Modular Monolith  
**Evolution Goal:** Event-Ready & Microservice-Ready Architecture

---

## 1. Architectural Philosophy: Why Modular Monolith Today?

TravelOS is intentionally architected today as a **Modular Monolith** rather than a distributed set of microservices.

### Decision Rationale:
1. **Transactional Integrity:** Booking multiple components (Hotel + VIP Transfer + Superyacht) in an itinerary requires atomic, ACID guarantees across PostgreSQL tables. Monolithic transactions eliminate complex distributed two-phase commits.
2. **Operational Simplicity:** A single deployment pipeline with Next.js 16 and Supabase ensures instantaneous deployment, low infrastructure overhead, zero inter-service network latency, and unified observability.
3. **Product Velocity:** Early-stage SaaS features evolve rapidly. Refactoring module boundaries in code is orders of magnitude faster than synchronizing multiple microservice repositories, RPC schemas, and container orchestrations.

---

## 2. Extraction Candidates & Trigger Metrics

Each domain module in `packages/` or `@/services` is engineered with clean interface boundaries. When operational thresholds are crossed, specific modules can be extracted into standalone microservices without rewriting business logic.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   TRAVEL OS MODULAR MONOLITH (CORE)                    │
│    [Tenancy] ── [CRM] ── [Trips] ── [Bookings] ── [Finance] ── [Auth]  │
└───────┬────────────────────┬────────────────────┬──────────────────────┘
        │ Trigger: >50k/day  │ Trigger: >10k req/m│ Trigger: Async latency
        ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  NOTIFICATIONS  │  │   AI COPILOT    │  │  INTEGRATIONS   │
│     SERVICE     │  │     SERVICE     │  │ & WEBHOOK WORKER│
│ • WhatsApp API  │  │ • LLM Itinerary │  │ • Flight Radar  │
│ • APNs / FCM    │  │ • Auto-Replies  │  │ • Hotel Channel │
│ • SMS Gateways  │  │ • Smart Pricing │  │ • GDS Sync      │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 3. Extraction Matrix

| Candidate Service | Responsibilities | Extraction Trigger Metrics | Inter-Service Protocol | Database Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **Notification & Messaging Service** | WhatsApp Cloud API, Apple APNs, Firebase FCM, Twilio SMS, Email dispatch | • >50,000 outbound messages/day<br>• Rate-limiting spikes affecting HTTP API | Asynchronous Event Queue (Redis BullMQ / AWS SQS) | Ephemeral Redis cache + Read replica |
| **AI Copilot & Itinerary Service** | OpenAI / Claude completions, auto-proposal text, fine dining recommendations | • Token consumption >10M/month<br>• Long-running LLM streaming (>5s) | gRPC / REST with server-sent events (SSE) | Vector store (pgvector / Pinecone) |
| **Integrations & Webhook Worker** | FlightRadar24 live tracking, hotel bed banks, Amadeus GDS, Stripe webhook ingress | • >500 webhook events/second<br>• Third-party supplier API retries | Distributed Task Queue (RabbitMQ / SQS) | Dedicated integration event store |
| **Document & PDF Worker** | Serverless high-resolution vector PDF generation, photo compression, watermarking | • CPU spikes during simultaneous itinerary PDF downloads (>80% CPU) | Async Job Queue + Presigned S3/Storage URLs | Supabase Storage / S3 |
| **Analytics & Telemetry Aggregator** | Tenant financial rollups, marketing attribution, conversion funnels | • Database query degradation on reporting dashboards (>500ms) | Change Data Capture (Debezium / PostgreSQL logical decoding) | ClickHouse or Snowflake OLAP warehouse |

---

## 4. Required Interfaces for Zero-Downtime Extraction

To extract any module into an independent service without refactoring client applications, the following abstraction contracts are established in TravelOS today:

1. **Service Interface Contracts (`@/services/*`):**  
   Components call service interfaces (`INotificationService`, `IAiService`, `IBookingService`), never direct raw SQL queries or third-party SDKs directly from React pages.
2. **Domain Event Bus (`@/core/events`):**  
   In-process EventEmitter dispatching typed events (`TripCreated`, `PaymentReceived`, `BookingConfirmed`). When extracted, the in-process emitter is replaced with an external message broker (RabbitMQ / Kafka / Redis) by simply updating the driver configuration.
3. **Idempotency Keys & Transactional Outbox:**  
   Every event includes a UUID `event_id` and `tenant_id` ensuring exactly-once processing when asynchronous workers consume messages.

---

## 5. Migration Strategy

When an extraction trigger is met:
1. **Phase 1:** Implement the external service behind the existing TypeScript interface.
2. **Phase 2:** Dual-run: write events to both the in-process handler and external queue.
3. **Phase 3:** Verify parity and switch reads to the external service.
4. **Phase 4:** Deprecate the in-process monolithic handler.
