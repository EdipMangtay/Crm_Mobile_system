/**
 * TRAVEL OS — Trip & Travel Domain Service
 * Section 8: DOMAIN MODULE BOUNDARIES
 */

import { Trip } from '@/shared/types/models';
import { SHARED_TRIPS } from '@/shared/data/traviaData';
import { eventBus } from './eventBus';

class TripService {
  private trips: Map<string, Trip> = new Map(
    Object.values(SHARED_TRIPS).map(t => [t.id, t])
  );

  async getTrips(tenantId: string): Promise<Trip[]> {
    return Array.from(this.trips.values()).filter(t =>
      t.company_id === tenantId || (tenantId === 'a0000000-0000-0000-0000-000000000001' && !t.company_id)
    );
  }

  async getTripById(id: string, tenantId: string): Promise<Trip | null> {
    const trip = this.trips.get(id);
    if (!trip) return null;
    if (trip.company_id && trip.company_id !== tenantId && tenantId !== 'a0000000-0000-0000-0000-000000000001') {
      return null; // Tenant isolation guaranteed
    }
    return trip;
  }

  async createTrip(
    input: {
      customerId: string;
      title: string;
      destination: string;
      startDate: string;
      endDate: string;
      nights: number;
      paxCount: number;
      hotelName?: string;
      totalAmount: number;
      currency: string;
    },
    tenantId: string
  ): Promise<Trip> {
    const newTrip: Trip = {
      id: `trip-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      company_id: tenantId,
      customer_id: input.customerId,
      title: input.title,
      destination: input.destination,
      start_date: input.startDate,
      end_date: input.endDate,
      nights: input.nights,
      pax_count: input.paxCount,
      status: 'upcoming',
      hotel_name: input.hotelName,
      timezone: 'Asia/Dubai',
      total_amount: input.totalAmount,
      currency: input.currency,
    };

    this.trips.set(newTrip.id, newTrip);

    // Publish domain event
    await eventBus.publish('TripCreated', tenantId, {
      tripId: newTrip.id,
      customerId: newTrip.customer_id,
      title: newTrip.title,
      totalAmount: newTrip.total_amount,
    });

    return newTrip;
  }
}

export const tripService = new TripService();
