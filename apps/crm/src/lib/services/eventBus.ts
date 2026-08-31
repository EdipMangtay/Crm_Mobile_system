/**
 * TRAVEL OS — In-Process Domain Event Bus & Outbox Abstraction
 * Section 9: EVENT-READY ARCHITECTURE
 * Easily replaceable with Redis/RabbitMQ/Kafka without rewriting domain services
 */

export type DomainEventType =
  | 'LeadCreated'
  | 'LeadConverted'
  | 'CustomerCreated'
  | 'TripCreated'
  | 'BookingConfirmed'
  | 'PaymentReceived'
  | 'CustomerMessageReceived'
  | 'RequestCreated'
  | 'TripCompleted';

export interface DomainEvent<T = unknown> {
  eventId: string;
  eventType: DomainEventType;
  tenantId: string;
  timestamp: string;
  payload: T;
  metadata?: Record<string, unknown>;
}

export type EventHandler<T = unknown> = (event: DomainEvent<T>) => Promise<void> | void;

class DomainEventBus {
  private handlers: Map<DomainEventType, EventHandler<unknown>[]> = new Map();
  private outboxHistory: DomainEvent<unknown>[] = [];

  subscribe<T>(eventType: DomainEventType, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler as EventHandler<unknown>);

    return () => {
      const list = this.handlers.get(eventType) || [];
      this.handlers.set(eventType, list.filter(h => h !== (handler as unknown)));
    };
  }

  async publish<T>(eventType: DomainEventType, tenantId: string, payload: T, metadata?: Record<string, unknown>): Promise<DomainEvent<T>> {
    const event: DomainEvent<T> = {
      eventId: `evt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      eventType,
      tenantId,
      timestamp: new Date().toISOString(),
      payload,
      metadata,
    };

    // Store in outbox for auditability and future queue replay
    this.outboxHistory.push(event);
    if (this.outboxHistory.length > 500) {
      this.outboxHistory.shift(); // Keep memory bounded
    }

    const listeners = this.handlers.get(eventType) || [];
    for (const listener of listeners) {
      try {
        await listener(event);
      } catch (err) {
        console.error(`[EventBus] Error handling event ${eventType}:`, err);
      }
    }

    return event;
  }

  getOutbox(): readonly DomainEvent[] {
    return this.outboxHistory;
  }
}

export const eventBus = new DomainEventBus();
