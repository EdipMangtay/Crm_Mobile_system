'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  Clock,
  Menu,
  ChevronRight,
  User,
  Settings,
  Shield,
  LogOut,
} from 'lucide-react';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { useCrmShell } from './CrmShellContext';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import {
  TravelDropdownMenu,
  TravelDropdownMenuTrigger,
  TravelDropdownMenuContent,
  TravelDropdownMenuItem,
  TravelDropdownMenuLabel,
  TravelDropdownMenuSeparator,
  TravelDropdownMenuShortcut,
  TravelTooltip,
} from '@/components/ui/travel';

const ROUTE_LABELS: Record<string, string> = {
  '/crm': 'Kontrol Paneli',
  '/crm/leads': 'Lead Yönetimi',
  '/crm/customers': 'Müşteriler',
  '/crm/trips': 'Geziler',
  '/crm/bookings': 'Rezervasyonlar',
  '/crm/concierge': 'VIP Concierge',
  '/crm/requests': 'Talepler',
  '/crm/operations': 'Operasyonlar',
  '/crm/suppliers': 'Tedarikçiler',
  '/crm/payments': 'Ödemeler',
  '/crm/marketing': 'Pazarlama',
  '/crm/analytics': 'Analitik',
  '/crm/team': 'Ekip',
  '/crm/tasks': 'Görevler',
  '/crm/settings': 'Ayarlar',
  '/platform-admin': 'Platform Yönetimi',
};

function formatTenantTime(timeZone: string): string {
  try {
    return new Date().toLocaleTimeString('tr-TR', {
      timeZone: timeZone || 'UTC',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return new Date().toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}

function getTimezoneCode(timeZone: string): string {
  if (!timeZone) return 'UTC';
  if (timeZone.includes('Dubai')) return 'DXB';
  if (timeZone.includes('London')) return 'LON';
  if (timeZone.includes('Paris')) return 'PAR';
  if (timeZone.includes('Istanbul')) return 'IST';
  if (timeZone.includes('New_York')) return 'NYC';
  const parts = timeZone.split('/');
  return parts[parts.length - 1].slice(0, 3).toUpperCase();
}

const emptySubscribe = () => () => {};

export function TravelHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { tenant } = useTenant();
  const { openCommand, setMobileNavOpen } = useCrmShell();
  
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Periodic tick for live clock updates
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const localTime = isHydrated ? formatTenantTime(tenant.timezone) : null;

  const handleLogout = async () => {
    try {
      document.cookie =
        'travia_staff_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    } finally {
      router.push('/crm/login');
    }
  };

  // Determine current page context title
  const currentTitle =
    ROUTE_LABELS[pathname] ||
    (pathname.startsWith('/crm/customers/')
      ? 'Müşteri Detayı'
      : pathname.startsWith('/crm/trips/')
      ? 'Gezi Programı'
      : pathname.startsWith('/crm/leads/')
      ? 'Lead Detayı'
      : 'CRM');

  const tzCode = getTimezoneCode(tenant.timezone);

  return (
    <header className="h-[52px] bg-[#0B0F1A]/90 backdrop-blur-md border-b border-[rgba(201,166,107,0.12)] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shrink-0">
      {/* Left: Mobile Nav toggle & Breadcrumb Context */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setMobileNavOpen(true)}
          className="md:hidden p-1.5 rounded-md text-[#F5F1E8]/60 hover:text-[#F5F1E8] hover:bg-[rgba(245,241,232,0.05)] focus:outline-none focus:ring-1 focus:ring-[#C9A66B]"
          aria-label="Navigasyon Menüsünü Aç"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 text-xs text-[#F5F1E8]/40 truncate">
          <Link
            href="/crm"
            className="hover:text-[#F5F1E8]/80 transition-colors font-medium hidden sm:inline"
          >
            {tenant.display_name}
          </Link>
          <ChevronRight className="w-3 h-3 text-[#F5F1E8]/20 hidden sm:inline shrink-0" />
          <span className="text-[#F5F1E8] font-medium truncate">
            {currentTitle}
          </span>
        </div>
      </div>

      {/* Center / Utility: Quick Search Command trigger */}
      <div className="flex-1 max-w-[280px] mx-4 hidden lg:block">
        <button
          onClick={openCommand}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-md bg-[#101524] border border-[rgba(201,166,107,0.14)] text-xs text-[#F5F1E8]/40 hover:text-[#F5F1E8]/70 hover:border-[rgba(201,166,107,0.28)] transition-all cursor-pointer group focus:outline-none focus:ring-1 focus:ring-[#C9A66B]"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#C9A66B]/70 group-hover:text-[#C9A66B]" />
            <span className="text-[11px]">Ara veya komut yaz...</span>
          </div>
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-[#05070F] border border-[rgba(201,166,107,0.15)] text-[#C9A66B] font-mono leading-none">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Operational Timezone, Notifications, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Mobile Search Button */}
        <button
          onClick={openCommand}
          className="lg:hidden p-1.5 rounded-md text-[#F5F1E8]/60 hover:text-[#F5F1E8] hover:bg-[rgba(245,241,232,0.05)] focus:outline-none"
          title="Komut Paleti (⌘K)"
        >
          <Search className="w-4 h-4 text-[#C9A66B]" />
        </button>

        {/* Tenant Operational Time */}
        <TravelTooltip content={`Operasyon Saati: ${tenant.timezone}`}>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#F5F1E8]/60 px-2.5 py-1 rounded-md bg-[#101524] border border-[rgba(201,166,107,0.10)] select-none">
            <Clock className="w-3 h-3 text-[#C9A66B]/70 shrink-0" />
            <span className="font-mono text-[11px] text-[#F5F1E8]/80 tabular-nums inline-block min-w-[34px] text-center">
              {localTime ?? '--:--'}
            </span>
            <span className="text-[9px] font-mono text-[#C9A66B] uppercase shrink-0">
              {tzCode}
            </span>
          </div>
        </TravelTooltip>

        {/* Notification Bell */}
        <TravelTooltip content="Bildirimler">
          <button className="relative p-1.5 rounded-md text-[#F5F1E8]/50 hover:text-[#F5F1E8] hover:bg-[rgba(245,241,232,0.05)] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C9A66B]">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#C9A66B] rounded-full ring-2 ring-[#0B0F1A]" />
          </button>
        </TravelTooltip>

        {/* User Profile Dropdown */}
        <TravelDropdownMenu>
          <TravelDropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1 rounded-md hover:bg-[rgba(245,241,232,0.05)] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C9A66B]">
              <div className="w-6.5 h-6.5 rounded-md bg-[rgba(201,166,107,0.15)] border border-[rgba(201,166,107,0.25)] flex items-center justify-center text-[#C9A66B] shrink-0 font-medium text-xs">
                <User className="w-3.5 h-3.5" />
              </div>
            </button>
          </TravelDropdownMenuTrigger>

          <TravelDropdownMenuContent align="end" className="w-52">
            <TravelDropdownMenuLabel>
              <p className="text-xs font-semibold text-[#F5F1E8] truncate">
                Operasyon Yöneticisi
              </p>
              <p className="text-[10px] text-[#C9A66B] font-mono truncate font-normal">
                {tenant.display_name}
              </p>
            </TravelDropdownMenuLabel>
            <TravelDropdownMenuSeparator />

            <TravelDropdownMenuItem asChild>
              <Link href="/crm/settings" className="flex items-center gap-2">
                <Settings className="w-3.5 h-3.5 text-[#F5F1E8]/60" />
                <span>Sistem Ayarları</span>
              </Link>
            </TravelDropdownMenuItem>

            <TravelDropdownMenuItem asChild>
              <Link href="/platform-admin" className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#C9A66B]" />
                <span>Platform Yönetimi</span>
              </Link>
            </TravelDropdownMenuItem>

            <TravelDropdownMenuSeparator />

            <TravelDropdownMenuItem
              onClick={openCommand}
              className="flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#F5F1E8]/60" />
                <span>Komut Menüsü</span>
              </span>
              <TravelDropdownMenuShortcut>⌘K</TravelDropdownMenuShortcut>
            </TravelDropdownMenuItem>

            <TravelDropdownMenuSeparator />

            <TravelDropdownMenuItem
              onClick={handleLogout}
              variant="danger"
              className="flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Güvenli Çıkış</span>
            </TravelDropdownMenuItem>
          </TravelDropdownMenuContent>
        </TravelDropdownMenu>
      </div>
    </header>
  );
}

export default TravelHeader;
