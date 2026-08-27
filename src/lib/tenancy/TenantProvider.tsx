'use client';

import React, { createContext, useContext, useState } from 'react';
import { Tenant } from '@/shared/types/models';
import { tenantRegistry, DEFAULT_TENANT_ID } from './tenantContext';

interface TenantContextValue {
  tenant: Tenant;
  setTenantId: (id: string) => void;
  availableTenants: Tenant[];
  formatMoney: (amount: number) => string;
}

const TenantContext = createContext<TenantContextValue | null>(null);

export function TenantProvider({
  children,
  initialTenantId = DEFAULT_TENANT_ID,
}: {
  children: React.ReactNode;
  initialTenantId?: string;
}) {
  const [tenantId, setTenantId] = useState<string>(initialTenantId);
  const tenant = tenantRegistry.getTenantById(tenantId);
  const availableTenants = tenantRegistry.getAllTenants();

  const formatMoney = (amount: number): string => {
    const currency = tenant.default_currency || 'USD';
    try {
      return new Intl.NumberFormat(tenant.default_language === 'tr' ? 'tr-TR' : 'en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      return `${amount.toLocaleString()} ${currency}`;
    }
  };

  return (
    <TenantContext.Provider value={{ tenant, setTenantId, availableTenants, formatMoney }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant(): TenantContextValue {
  const ctx = useContext(TenantContext);
  if (!ctx) {
    const defaultTenant = tenantRegistry.getTenantById(DEFAULT_TENANT_ID);
    return {
      tenant: defaultTenant,
      setTenantId: () => {},
      availableTenants: tenantRegistry.getAllTenants(),
      formatMoney: (amount: number) => `${amount.toLocaleString()} ${defaultTenant.default_currency}`,
    };
  }
  return ctx;
}
