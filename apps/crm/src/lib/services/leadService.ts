/**
 * TRAVEL OS — Lead Domain Service
 * Section 8: DOMAIN MODULE BOUNDARIES
 */

import { eventBus } from './eventBus';

export interface Lead {
  id: string;
  tenant_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  source: string;
  stage: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'booked' | 'lost';
  estimated_value: number;
  assigned_to?: string;
  notes?: string;
  created_at: string;
}

class LeadService {
  private leads: Map<string, Lead> = new Map();

  async getLeads(tenantId: string): Promise<Lead[]> {
    return Array.from(this.leads.values()).filter(l => l.tenant_id === tenantId);
  }

  async createLead(
    input: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      country?: string;
      source?: string;
      estimated_value?: number;
      notes?: string;
    },
    tenantId: string
  ): Promise<Lead> {
    const newLead: Lead = {
      id: `lead-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      tenant_id: tenantId,
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      phone: input.phone,
      country: input.country || '🌐',
      source: input.source || 'Website VIP Form',
      stage: 'new',
      estimated_value: input.estimated_value || 15000,
      notes: input.notes,
      created_at: new Date().toISOString(),
    };

    this.leads.set(newLead.id, newLead);

    // Publish domain event
    await eventBus.publish('LeadCreated', tenantId, {
      leadId: newLead.id,
      name: `${newLead.first_name} ${newLead.last_name}`,
      source: newLead.source,
      estimatedValue: newLead.estimated_value,
    });

    return newLead;
  }
}

export const leadService = new LeadService();
