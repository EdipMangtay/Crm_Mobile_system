'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Plane,
  CalendarCheck,
  Compass,
  Headphones,
  MessageCircle,
  CreditCard,
  Truck,
  TrendingUp,
  BarChart3,
  UsersRound,
  ListTodo,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  ChevronsUpDown,
  Check,
} from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { useCrmShell } from './CrmShellContext';
import {
  TravelTooltip,
  TravelDropdownMenu,
  TravelDropdownMenuTrigger,
  TravelDropdownMenuContent,
  TravelDropdownMenuItem,
  TravelDropdownMenuLabel,
  TravelDropdownMenuSeparator,
} from '@/components/ui/travel';
import { cn } from '@/lib/utils';
import { Tenant } from '@/shared/types/models';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  featureKey?: keyof Tenant['features'];
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'GENEL BAKIŞ',
    items: [
      { label: 'Kontrol Paneli', href: '/crm', icon: LayoutDashboard },
      { label: 'Analitik', href: '/crm/analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'İLİŞKİLER',
    items: [
      { label: 'Lead Yönetimi', href: '/crm/leads', icon: UserPlus },
      { label: 'Müşteriler', href: '/crm/customers', icon: Users },
    ],
  },
  {
    title: 'SEYAHAT',
    items: [
      { label: 'Geziler', href: '/crm/trips', icon: Plane },
      { label: 'Rezervasyonlar', href: '/crm/bookings', icon: CalendarCheck },
      { label: 'Talepler', href: '/crm/requests', icon: MessageCircle },
      { label: 'Concierge', href: '/crm/concierge', icon: Headphones, featureKey: 'CONCIERGE' },
    ],
  },
  {
    title: 'OPERASYON',
    items: [
      { label: 'Operasyonlar', href: '/crm/operations', icon: Compass },
      { label: 'Tedarikçiler', href: '/crm/suppliers', icon: Truck, featureKey: 'SUPPLIER_MANAGEMENT' },
      { label: 'Görevler', href: '/crm/tasks', icon: ListTodo },
    ],
  },
  {
    title: 'BÜYÜME & FİNANS',
    items: [
      { label: 'Pazarlama', href: '/crm/marketing', icon: TrendingUp },
      { label: 'Ödemeler', href: '/crm/payments', icon: CreditCard, featureKey: 'PAYMENTS' },
    ],
  },
  {
    title: 'YÖNETİM',
    items: [
      { label: 'Ekip', href: '/crm/team', icon: UsersRound },
      { label: 'Ayarlar', href: '/crm/settings', icon: Settings },
      { label: 'Platform Admin', href: '/platform-admin', icon: Shield },
    ],
  },
];

export function TravelSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { tenant, setTenantId, availableTenants } = useTenant();
  const { sidebarCollapsed, toggleSidebar, isHydrated } = useCrmShell();

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

  const isActive = (href: string) => {
    if (href === '/crm') return pathname === '/crm';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-[#0B0F1A] border-r border-[rgba(201,166,107,0.12)] flex flex-col z-40 select-none hidden md:flex',
        isHydrated && 'transition-[width] duration-180 ease-out',
        sidebarCollapsed ? 'w-[64px]' : 'w-[240px]'
      )}
    >
      {/* Top: Tenant Brand Header & Switcher */}
      <div className="h-[52px] border-b border-[rgba(201,166,107,0.10)] px-2.5 flex items-center shrink-0">
        <TravelDropdownMenu>
          <TravelDropdownMenuTrigger asChild>
            <button
              className={cn(
                'w-full flex items-center gap-2.5 p-1.5 rounded-lg transition-colors hover:bg-[rgba(245,241,232,0.03)] focus:outline-none focus:ring-1 focus:ring-[#C9A66B]',
                sidebarCollapsed && 'justify-center p-1'
              )}
              title={sidebarCollapsed ? `${tenant.display_name} (Şirket Değiştir)` : undefined}
            >
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center font-serif font-bold text-xs text-white shadow-sm shrink-0"
                style={{ backgroundColor: tenant.primary_color || '#C9A66B' }}
              >
                {tenant.display_name ? tenant.display_name.slice(0, 1) : 'T'}
              </div>

              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-medium text-[#F5F1E8] truncate leading-tight">
                    {tenant.display_name}
                  </p>
                  <p className="text-[10px] font-mono text-[#C9A66B]/80 truncate leading-none mt-0.5">
                    {tenant.default_currency} · TRAVEL OS
                  </p>
                </div>
              )}

              {!sidebarCollapsed && (
                <ChevronsUpDown className="w-3.5 h-3.5 text-[#F5F1E8]/30 shrink-0 ml-auto" />
              )}
            </button>
          </TravelDropdownMenuTrigger>

          <TravelDropdownMenuContent align="start" className="w-56">
            <TravelDropdownMenuLabel>Çalışma Alanı / Tenant</TravelDropdownMenuLabel>
            {availableTenants.map((t) => {
              const selected = t.id === tenant.id;
              return (
                <TravelDropdownMenuItem
                  key={t.id}
                  onClick={() => setTenantId(t.id)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: t.primary_color || '#C9A66B' }}
                    />
                    <span className="truncate">{t.display_name}</span>
                  </div>
                  {selected && <Check className="w-3.5 h-3.5 text-[#C9A66B] shrink-0" />}
                </TravelDropdownMenuItem>
              );
            })}
            <TravelDropdownMenuSeparator />
            <TravelDropdownMenuItem asChild>
              <Link href="/platform-admin" className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#C9A66B]" />
                <span>Platform Yönetimi</span>
              </Link>
            </TravelDropdownMenuItem>
          </TravelDropdownMenuContent>
        </TravelDropdownMenu>
      </div>

      {/* Main: Navigation Tree */}
      <nav className="flex-1 overflow-y-auto py-2.5 px-2 space-y-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[rgba(201,166,107,0.15)]">
        {NAV_GROUPS.map((group, gi) => {
          // Filter items by tenant feature flags if defined
          const visibleItems = group.items.filter((item) => {
            if (!item.featureKey) return true;
            return tenant.features ? tenant.features[item.featureKey] !== false : true;
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={gi} className="space-y-0.5">
              {!sidebarCollapsed ? (
                <p className="text-[9px] font-mono tracking-[0.18em] text-[#F5F1E8]/30 uppercase px-2.5 py-1">
                  {group.title}
                </p>
              ) : (
                <div className="h-px bg-[rgba(201,166,107,0.06)] mx-2 my-1.5" />
              )}

              {visibleItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                const linkContent = (
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs transition-colors group relative select-none',
                      active
                        ? 'bg-[rgba(201,166,107,0.10)] text-[#E8C77A] font-medium'
                        : 'text-[#F5F1E8]/60 hover:text-[#F5F1E8] hover:bg-[rgba(245,241,232,0.03)]',
                      sidebarCollapsed && 'justify-center px-1.5'
                    )}
                  >
                    {active && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-4 bg-[#C9A66B] rounded-r-sm" />
                    )}
                    <Icon
                      className={cn(
                        'w-4 h-4 shrink-0 transition-colors',
                        active ? 'text-[#C9A66B]' : 'text-[#F5F1E8]/45 group-hover:text-[#F5F1E8]/75'
                      )}
                    />
                    {!sidebarCollapsed && (
                      <span className="truncate leading-none">{item.label}</span>
                    )}
                  </Link>
                );

                if (sidebarCollapsed) {
                  return (
                    <TravelTooltip
                      key={item.href}
                      content={item.label}
                      side="right"
                      sideOffset={12}
                    >
                      {linkContent}
                    </TravelTooltip>
                  );
                }

                return <React.Fragment key={item.href}>{linkContent}</React.Fragment>;
              })}
            </div>
          );
        })}
      </nav>

      {/* Bottom: Collapse toggle & User actions */}
      <div className="border-t border-[rgba(201,166,107,0.10)] p-2 space-y-1 shrink-0 bg-[#0B0F1A]">
        <button
          onClick={toggleSidebar}
          className={cn(
            'flex items-center gap-2 w-full px-2.5 py-1.5 rounded-md text-xs text-[#F5F1E8]/40 hover:text-[#F5F1E8]/80 hover:bg-[rgba(245,241,232,0.03)] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C9A66B]',
            sidebarCollapsed && 'justify-center px-1.5'
          )}
          title={sidebarCollapsed ? 'Menüyü Genişlet' : 'Menüyü Daralt'}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span className="truncate">Menüyü Daralt</span>
            </>
          )}
        </button>

        <button
          onClick={handleLogout}
          className={cn(
            'flex items-center gap-2 w-full px-2.5 py-1.5 rounded-md text-xs text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors focus:outline-none focus:ring-1 focus:ring-red-400',
            sidebarCollapsed && 'justify-center px-1.5'
          )}
          title={sidebarCollapsed ? 'Güvenli Çıkış' : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!sidebarCollapsed && <span className="truncate">Güvenli Çıkış</span>}
        </button>
      </div>
    </aside>
  );
}

export default TravelSidebar;
