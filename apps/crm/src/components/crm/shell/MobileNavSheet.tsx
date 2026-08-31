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
  Shield,
  Check,
} from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { useCrmShell } from './CrmShellContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  TravelDropdownMenu,
  TravelDropdownMenuTrigger,
  TravelDropdownMenuContent,
  TravelDropdownMenuItem,
  TravelDropdownMenuLabel,
} from '@/components/ui';
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

export function MobileNavSheet() {
  const pathname = usePathname();
  const router = useRouter();
  const { tenant, setTenantId, availableTenants } = useTenant();
  const { mobileNavOpen, setMobileNavOpen } = useCrmShell();

  const handleLogout = async () => {
    try {
      document.cookie =
        'travia_staff_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    } finally {
      setMobileNavOpen(false);
      router.push('/crm/login');
    }
  };

  const isActive = (href: string) => {
    if (href === '/crm') return pathname === '/crm';
    return pathname.startsWith(href);
  };

  return (
    <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
      <SheetContent side="left" className="w-[280px] p-0 bg-[#0B0F1A] border-r border-[rgba(201,166,107,0.15)] flex flex-col">
        {/* Header with Tenant Switcher */}
        <SheetHeader className="h-[52px] border-b border-[rgba(201,166,107,0.10)] px-4 flex items-center justify-between flex-row space-y-0">
          <SheetTitle className="sr-only">Navigasyon Menüsü</SheetTitle>
          <TravelDropdownMenu>
            <TravelDropdownMenuTrigger asChild>
              <button className="flex items-center gap-2.5 text-left py-1 px-1.5 rounded-md hover:bg-[rgba(245,241,232,0.03)] focus:outline-none">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center font-serif font-bold text-xs text-white shadow-sm shrink-0"
                  style={{ backgroundColor: tenant.primary_color || '#C9A66B' }}
                >
                  {tenant.display_name ? tenant.display_name.slice(0, 1) : 'T'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#F5F1E8] truncate leading-tight">
                    {tenant.display_name}
                  </p>
                  <p className="text-[10px] font-mono text-[#C9A66B]/80 truncate leading-none mt-0.5">
                    {tenant.default_currency} · TRAVEL OS
                  </p>
                </div>
              </button>
            </TravelDropdownMenuTrigger>
            <TravelDropdownMenuContent align="start" className="w-56">
              <TravelDropdownMenuLabel>Çalışma Alanı / Tenant</TravelDropdownMenuLabel>
              {availableTenants.map((t) => {
                const selected = t.id === tenant.id;
                return (
                  <TravelDropdownMenuItem
                    key={t.id}
                    onClick={() => {
                      setTenantId(t.id);
                    }}
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
            </TravelDropdownMenuContent>
          </TravelDropdownMenu>
        </SheetHeader>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
          {NAV_GROUPS.map((group, gi) => {
            const visibleItems = group.items.filter((item) => {
              if (!item.featureKey) return true;
              return tenant.features ? tenant.features[item.featureKey] !== false : true;
            });

            if (visibleItems.length === 0) return null;

            return (
              <div key={gi} className="space-y-1">
                <p className="text-[9px] font-mono tracking-[0.18em] text-[#F5F1E8]/30 uppercase px-2.5 py-1">
                  {group.title}
                </p>
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-2.5 py-2 rounded-md text-xs transition-colors group relative',
                        active
                          ? 'bg-[rgba(201,166,107,0.10)] text-[#E8C77A] font-medium'
                          : 'text-[#F5F1E8]/60 hover:text-[#F5F1E8] hover:bg-[rgba(245,241,232,0.03)]'
                      )}
                    >
                      {active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-4 bg-[#C9A66B] rounded-r-sm" />
                      )}
                      <Icon
                        className={cn(
                          'w-4 h-4 shrink-0 transition-colors',
                          active ? 'text-[#C9A66B]' : 'text-[#F5F1E8]/45'
                        )}
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Bottom logout */}
        <div className="border-t border-[rgba(201,166,107,0.10)] p-3 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-2.5 py-2 rounded-md text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Güvenli Çıkış</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavSheet;
