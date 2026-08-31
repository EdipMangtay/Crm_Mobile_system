'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { CrmSidebar, CrmHeader, CommandPalette } from '@/components/crm';
import { TenantProvider } from '@/lib/tenancy/TenantProvider';

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const openCommandPalette = useCallback(() => setCommandPaletteOpen(true), []);
  const closeCommandPalette = useCallback(() => setCommandPaletteOpen(false), []);

  // Global CMD+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Isolate login screen from CRM shell
  if (pathname === '/crm/login') {
    return <TenantProvider>{children}</TenantProvider>;
  }

  return (
    <TenantProvider>
      <div className="min-h-screen bg-[#05070F]">
        <CrmSidebar />
        <div className="ml-[240px] min-h-screen flex flex-col">
          <CrmHeader onOpenCommandPalette={openCommandPalette} />
          <main className="flex-1 p-6 overflow-x-hidden">
            {children}
          </main>
        </div>
        <CommandPalette open={commandPaletteOpen} onClose={closeCommandPalette} />
      </div>
    </TenantProvider>
  );
}
