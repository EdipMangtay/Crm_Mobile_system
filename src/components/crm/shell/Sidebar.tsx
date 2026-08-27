'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, UserPlus, Plane, CalendarCheck, Compass,
  Headphones, MessageCircle, CreditCard, Truck,
  TrendingUp, BarChart3, UsersRound, ListTodo, Settings, LogOut,
  ChevronLeft, ChevronRight, Sparkles, Shield
} from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useTenant } from '@/lib/tenancy/TenantProvider';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: '',
    items: [
      { label: 'Genel Bakış', href: '/crm', icon: LayoutDashboard },
    ],
  },
  {
    title: 'SATIŞ',
    items: [
      { label: 'Leads', href: '/crm/leads', icon: UserPlus },
      { label: 'Müşteriler', href: '/crm/customers', icon: Users },
    ],
  },
  {
    title: 'SEYAHAT',
    items: [
      { label: 'Geziler', href: '/crm/trips', icon: Plane },
      { label: 'Rezervasyonlar', href: '/crm/bookings', icon: CalendarCheck },
      { label: 'Deneyimler', href: '/crm/experiences', icon: Sparkles },
    ],
  },
  {
    title: 'OPERASYON',
    items: [
      { label: 'Operasyonlar', href: '/crm/operations', icon: Compass },
      { label: 'Concierge', href: '/crm/concierge', icon: Headphones },
      { label: 'Talepler', href: '/crm/requests', icon: MessageCircle },
    ],
  },
  {
    title: 'FİNANS',
    items: [
      { label: 'Ödemeler', href: '/crm/payments', icon: CreditCard },
      { label: 'Tedarikçiler', href: '/crm/suppliers', icon: Truck },
    ],
  },
  {
    title: 'BÜYÜME',
    items: [
      { label: 'Pazarlama', href: '/crm/marketing', icon: TrendingUp },
      { label: 'Analitik', href: '/crm/analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'ORGANİZASYON',
    items: [
      { label: 'Ekip', href: '/crm/team', icon: UsersRound },
      { label: 'Görevler', href: '/crm/tasks', icon: ListTodo },
    ],
  },
  {
    title: 'SİSTEM',
    items: [
      { label: 'Ayarlar', href: '/crm/settings', icon: Settings },
      { label: 'Platform Admin', href: '/platform-admin', icon: Shield },
    ],
  },
];

export default function CrmSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { tenant } = useTenant();

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/crm/login');
  };

  const isActive = (href: string) => {
    if (href === '/crm') return pathname === '/crm';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#0B0F1A] border-r border-[#C9A66B]/10 flex flex-col z-40 transition-all duration-300 ${
        collapsed ? 'w-[68px]' : 'w-[240px]'
      }`}
    >
      {/* Brand */}
      <div className="flex items-center h-16 px-4 border-b border-[#C9A66B]/10 shrink-0">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-serif font-bold text-sm text-white shadow-sm"
              style={{ backgroundColor: tenant.primary_color }}
            >
              {tenant.display_name.slice(0, 1)}
            </div>
            <div>
              <p className="text-[#F5F1E8] font-serif text-sm tracking-[0.1em] leading-none truncate max-w-[140px]">
                {tenant.display_name.toUpperCase()}
              </p>
              <p className="text-[#C9A66B] text-[9px] font-mono tracking-[0.15em] leading-none mt-1">
                {tenant.default_currency} · TRAVEL OS
              </p>
            </div>
          </div>
        ) : (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto text-white font-serif font-bold text-sm"
            style={{ backgroundColor: tenant.primary_color }}
          >
            {tenant.display_name.slice(0, 1)}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#C9A66B]/20">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="mb-1">
            {group.title && !collapsed && (
              <p className="text-[9px] font-mono tracking-[0.2em] text-[#F5F1E8]/25 uppercase px-3 pt-4 pb-1.5">
                {group.title}
              </p>
            )}
            {group.title && collapsed && <div className="h-px bg-[#C9A66B]/5 mx-2 my-2" />}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all group relative ${
                    active
                      ? 'bg-[#C9A66B]/10 text-[#E8C77A]'
                      : 'text-[#F5F1E8]/50 hover:text-[#F5F1E8]/80 hover:bg-[#F5F1E8]/[0.03]'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#C9A66B] rounded-r-full" />
                  )}
                  <Icon className={`w-4 h-4 shrink-0 ${collapsed ? 'mx-auto' : ''}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-[#C9A66B]/10 p-2 shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full p-2 rounded-lg text-[#F5F1E8]/30 hover:text-[#F5F1E8]/60 hover:bg-[#F5F1E8]/[0.03] transition-all mb-1"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-xs ml-2">Daralt</span>}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut className={`w-4 h-4 shrink-0 ${collapsed ? 'mx-auto' : ''}`} />
          {!collapsed && <span>Çıkış</span>}
        </button>
      </div>
    </aside>
  );
}
