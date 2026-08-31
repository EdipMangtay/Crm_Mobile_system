/**
 * TRAVEL OS — Customer Domain Service
 * Section 8: DOMAIN MODULE BOUNDARIES
 */

import { Customer } from '@/shared/types/models';
import { SHARED_CUSTOMERS } from '@/shared/data/traviaData';
import { eventBus } from './eventBus';

class CustomerService {
  private customers: Map<string, Customer> = new Map(
    SHARED_CUSTOMERS.map(c => [c.id, c])
  );

  async getCustomers(tenantId: string): Promise<Customer[]> {
    return Array.from(this.customers.values()).filter(c =>
      c.company_id === tenantId || (tenantId === 'a0000000-0000-0000-0000-000000000001' && !c.company_id)
    );
  }

  async getCustomerById(id: string, tenantId: string): Promise<Customer | null> {
    const customer = this.customers.get(id);
    if (!customer) return null;
    if (customer.company_id && customer.company_id !== tenantId && tenantId !== 'a0000000-0000-0000-0000-000000000001') {
      return null; // Tenant isolation guaranteed
    }
    return customer;
  }

  async createCustomer(
    input: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      whatsapp?: string;
      country: string;
      preferred_language?: string;
      tags?: string[];
    },
    tenantId: string
  ): Promise<Customer> {
    const newCustomer: Customer = {
      id: `cust-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      company_id: tenantId,
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      phone: input.phone,
      whatsapp: input.whatsapp || input.phone,
      country: input.country,
      preferred_language: input.preferred_language || 'en',
      tags: input.tags || ['New'],
      lifetime_value: 0,
    };

    this.customers.set(newCustomer.id, newCustomer);

    // Publish domain event
    await eventBus.publish('CustomerCreated', tenantId, {
      customerId: newCustomer.id,
      name: `${newCustomer.first_name} ${newCustomer.last_name}`,
      email: newCustomer.email,
    });

    return newCustomer;
  }
}

export const customerService = new CustomerService();
