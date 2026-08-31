'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Plane,
  CalendarCheck,
  CreditCard,
  LayoutDashboard,
  Compass,
  Headphones,
  Settings,
  TrendingUp,
  BarChart3,
  UsersRound,
  ListTodo,
  Truck,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useCrmShell } from './CrmShellContext';

interface SearchRecord {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const SEARCH_RECORDS: SearchRecord[] = [
  {
    id: 'c1',
    title: 'Edip Mangtay',
    subtitle: 'TR · VIP Misafir · Atlantis The Royal',
    href: '/crm/customers/d0000000-0000-0000-0000-000000000001',
    icon: User,
    tag: 'Müşteri',
  },
  {
    id: 'c2',
    title: 'Kerem Aydın',
    subtitle: 'TR · Family VIP · Burj Al Arab',
    href: '/crm/customers/d0000000-0000-0000-0000-000000000002',
    icon: User,
    tag: 'Müşteri',
  },
  {
    id: 'l1',
    title: 'Tobias Hartmann',
    subtitle: 'Nitelikli Lead · 52.000 AED · DE',
    href: '/crm/leads/l0000000-0000-0000-0000-000000000001',
    icon: User,
    tag: 'Lead',
  },
  {
    id: 'l2',
    title: 'Elif Şahin',
    subtitle: 'İletişimde Lead · 18.000 AED · TR',
    href: '/crm/leads/l0000000-0000-0000-0000-000000000002',
    icon: User,
    tag: 'Lead',
  },
  {
    id: 't1',
    title: 'Travia Dubai — Premium Couple',
    subtitle: 'Atlantis The Royal · 12-17 Eyl',
    href: '/crm/trips/f0000000-0000-0000-0000-000000000001',
    icon: Plane,
    tag: 'Gezi',
  },
  {
    id: 't2',
    title: 'Dubai Luxury Family',
    subtitle: 'Burj Al Arab · 15-21 Eyl',
    href: '/crm/trips/f0000000-0000-0000-0000-000000000002',
    icon: Plane,
    tag: 'Gezi',
  },
  {
    id: 'b1',
    title: 'VIP Chauffeur — Mercedes V-Class',
    subtitle: 'DXB Airport Transfer · 12 Eyl',
    href: '/crm/bookings',
    icon: CalendarCheck,
    tag: 'Rezervasyon',
  },
];

const NAVIGATION_ITEMS = [
  { label: 'Kontrol Paneli (Dashboard)', href: '/crm', icon: LayoutDashboard, category: 'Genel' },
  { label: 'Lead Yönetimi', href: '/crm/leads', icon: User, category: 'Satış' },
  { label: 'Müşteri Rehberi (360)', href: '/crm/customers', icon: User, category: 'Satış' },
  { label: 'Geziler & VIP Programlar', href: '/crm/trips', icon: Plane, category: 'Seyahat' },
  { label: 'Rezervasyonlar', href: '/crm/bookings', icon: CalendarCheck, category: 'Seyahat' },
  { label: 'VIP Concierge Masası', href: '/crm/concierge', icon: Headphones, category: 'Seyahat' },
  { label: 'Müşteri Talepleri', href: '/crm/requests', icon: MessageCircle, category: 'Seyahat' },
  { label: 'Operasyon Yönetimi', href: '/crm/operations', icon: Compass, category: 'Operasyon' },
  { label: 'Tedarikçi Ağı', href: '/crm/suppliers', icon: Truck, category: 'Operasyon' },
  { label: 'Ödemeler & Tahsilat', href: '/crm/payments', icon: CreditCard, category: 'Finans' },
  { label: 'Pazarlama & Kampanyalar', href: '/crm/marketing', icon: TrendingUp, category: 'Büyüme' },
  { label: 'Finansal Analitik & Raporlar', href: '/crm/analytics', icon: BarChart3, category: 'Büyüme' },
  { label: 'Ekip Yönetimi', href: '/crm/team', icon: UsersRound, category: 'Yönetim' },
  { label: 'Görev Listesi', href: '/crm/tasks', icon: ListTodo, category: 'Yönetim' },
  { label: 'Sistem Ayarları', href: '/crm/settings', icon: Settings, category: 'Yönetim' },
];

export function TravelCommand() {
  const router = useRouter();
  const { commandOpen, setCommandOpen, closeCommand } = useCrmShell();

  const handleSelect = (href: string) => {
    closeCommand();
    router.push(href);
  };

  return (
    <CommandDialog open={commandOpen} onOpenChange={setCommandOpen} title="TravelOS Komut Paleti">
      <CommandInput placeholder="Müşteri, gezi, rezervasyon veya sayfa ara..." />
      <CommandList>
        <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>

        {/* Recent & Search Records */}
        <CommandGroup heading="Kayıtlar & Arama">
          {SEARCH_RECORDS.map((record) => {
            const Icon = record.icon;
            return (
              <CommandItem
                key={record.id}
                onSelect={() => handleSelect(record.href)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-[#101524] border border-[rgba(201,166,107,0.14)] flex items-center justify-center text-[#C9A66B] shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate leading-tight">{record.title}</p>
                    <p className="text-[10px] text-[#F5F1E8]/40 truncate">{record.subtitle}</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#C9A66B]/60 bg-[rgba(201,166,107,0.06)] px-1.5 py-0.5 rounded shrink-0">
                  {record.tag}
                </span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        {/* Navigation items */}
        <CommandGroup heading="Navigasyon & Sayfalar">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={item.href}
                onSelect={() => handleSelect(item.href)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-[#F5F1E8]/50" />
                  <span>{item.label}</span>
                </div>
                <CommandShortcut>{item.category}</CommandShortcut>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        {/* Quick Actions */}
        <CommandGroup heading="Hızlı İşlemler">
          <CommandItem
            onSelect={() => handleSelect('/crm/leads')}
            className="flex items-center gap-2.5"
          >
            <Sparkles className="w-4 h-4 text-[#C9A66B]" />
            <span>Yeni Leadleri İncele</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect('/crm/payments')}
            className="flex items-center gap-2.5"
          >
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Ödeme İşlemlerini Aç</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleSelect('/crm/operations')}
            className="flex items-center gap-2.5"
          >
            <Compass className="w-4 h-4 text-blue-400" />
            <span>Günlük Operasyon Panosu</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export default TravelCommand;
