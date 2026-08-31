'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  CrmShellProvider,
  useCrmShell,
  TravelSidebar,
  TravelHeader,
  TravelCommand,
  MobileNavSheet,
} from '@/components/crm';
import { TenantProvider } from '@/lib/tenancy/TenantProvider';
import { cn } from '@/lib/utils';

function CrmShellLayoutContent({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed, isHydrated } = useCrmShell();

  return (
    <div className="min-h-screen bg-[#05070F] text-[#F5F1E8]">
      {/* Desktop Persistent Sidebar */}
      <TravelSidebar />

      {/* Mobile Slide-Over Navigation Sheet */}
      <MobileNavSheet />

      {/* Synchronized Main Content Area */}
      <div
        className={cn(
          'min-h-screen flex flex-col',
          isHydrated && 'transition-[margin-left] duration-180 ease-out',
          sidebarCollapsed ? 'md:ml-[64px]' : 'md:ml-[240px]',
          'ml-0'
        )}
      >
        <TravelHeader />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Global Command Palette */}
      <TravelCommand />
    </div>
  );
}

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Isolate login screen from CRM shell
  if (pathname === '/crm/login') {
    return <TenantProvider>{children}</TenantProvider>;
  }

  return (
    <TenantProvider>
      <CrmShellProvider>
        <CrmShellLayoutContent>{children}</CrmShellLayoutContent>
      </CrmShellProvider>
    </TenantProvider>
  );
}
