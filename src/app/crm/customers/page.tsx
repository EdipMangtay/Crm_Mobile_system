'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Filter, ArrowUpDown, Download } from 'lucide-react';
import Badge from '@/components/crm/ui/Badge';
import { exportToCsv } from '@/crm/utils/exportCsv';
import { COUNTRY_FLAGS, formatCurrency } from '@/types/crm';

const DEMO_CUSTOMERS = [
  { id: 'd0000000-0000-0000-0000-000000000001', first_name: 'Edip', last_name: 'Mangtay', country: 'TR', tags: ['VIP', 'Couple', 'Luxury'], email: 'edip@email.com', phone: '+90 532 000 0000', trips: 1, lifetime_value: 18500, status: 'active', assigned: 'Furkan' },
  { id: '2', first_name: 'Ahmet', last_name: 'Yılmaz', country: 'TR', tags: ['Family', 'Luxury'], email: 'ahmet@email.com', phone: '+90 533 111 2233', trips: 2, lifetime_value: 42000, status: 'active', assigned: 'Furkan' },
  { id: '3', first_name: 'Canan', last_name: 'Özdemir', country: 'TR', tags: ['VIP', 'Solo'], email: 'canan@email.com', phone: '+90 534 444 5566', trips: 1, lifetime_value: 15000, status: 'active', assigned: 'Efza' },
  { id: '4', first_name: 'Hans', last_name: 'Weber', country: 'DE', tags: ['Business', 'Repeat'], email: 'hans@email.de', phone: '+49 170 123 4567', trips: 3, lifetime_value: 68000, status: 'active', assigned: 'Furkan' },
  { id: '5', first_name: 'Oliver', last_name: 'Smith', country: 'GB', tags: ['Honeymoon', 'Couple'], email: 'oliver@email.co.uk', phone: '+44 7700 900000', trips: 1, lifetime_value: 24000, status: 'active', assigned: 'Efza' },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = DEMO_CUSTOMERS.filter(c =>
    `${c.first_name} ${c.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Müşteriler</h1>
          <p className="text-xs text-[#F5F1E8]/30 mt-0.5">{DEMO_CUSTOMERS.length} müşteri · Toplam LTV: {formatCurrency(DEMO_CUSTOMERS.reduce((s, c) => s + c.lifetime_value, 0))}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToCsv('travia_customers', DEMO_CUSTOMERS, [
              { header: 'Ad', key: 'first_name' },
              { header: 'Soyad', key: 'last_name' },
              { header: 'Ülke', key: 'country' },
              { header: 'E-posta', key: 'email' },
              { header: 'Telefon', key: 'phone' },
              { header: 'Gezi Sayısı', key: 'trips' },
              { header: 'Yaşam Boyu Değer (AED)', key: 'lifetime_value' },
              { header: 'Portföy Yöneticisi', key: 'assigned' },
            ])}
            className="px-3 py-1.5 text-xs rounded-lg bg-[#111827] border border-[#C9A66B]/15 text-[#F5F1E8]/60 hover:text-[#F5F1E8] transition-all flex items-center gap-1.5"
          >
            <Download className="w-3 h-3" /> Excel / CSV
          </button>
          <button className="px-3 py-1.5 text-xs rounded-lg bg-[#111827] border border-[#C9A66B]/10 text-[#F5F1E8]/40 hover:text-[#F5F1E8]/60 transition-colors flex items-center gap-1.5">
            <Filter className="w-3 h-3" /> Filtre
          </button>
          <button className="px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Yeni Müşteri
          </button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#F5F1E8]/20" />
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Müşteri ara..." className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-[#111827] border border-[#C9A66B]/10 text-[#F5F1E8] placeholder-[#F5F1E8]/20 focus:outline-none focus:border-[#C9A66B]/30" />
      </div>

      <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#C9A66B]/8">
              {['Müşteri', 'Ülke', 'Etiketler', 'Geziler', 'Yaşam Boyu Değer', 'Atanan', 'Durum'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-mono tracking-wider text-[#F5F1E8]/25 uppercase">
                  <button className="flex items-center gap-1 hover:text-[#F5F1E8]/40 transition-colors">
                    {h} <ArrowUpDown className="w-2.5 h-2.5" />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C9A66B]/5">
            {filtered.map((customer) => (
              <tr key={customer.id} className="hover:bg-[#F5F1E8]/[0.01] transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/crm/customers/${customer.id}`} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C9A66B]/15 to-[#C9A66B]/5 border border-[#C9A66B]/15 flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-[#C9A66B]">{customer.first_name[0]}{customer.last_name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm text-[#F5F1E8]/80 hover:text-[#C9A66B] transition-colors">{customer.first_name} {customer.last_name}</p>
                      <p className="text-xs text-[#F5F1E8]/25">{customer.email}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className="text-base">{COUNTRY_FLAGS[customer.country] || '🌍'}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {customer.tags.map(tag => (
                      <Badge key={tag} variant={tag === 'VIP' ? 'gold' : 'default'} size="sm">{tag}</Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-[#F5F1E8]/40">{customer.trips}</td>
                <td className="px-4 py-3 text-sm text-[#C9A66B] font-medium">{formatCurrency(customer.lifetime_value)}</td>
                <td className="px-4 py-3 text-xs text-[#F5F1E8]/30">{customer.assigned}</td>
                <td className="px-4 py-3"><Badge variant="success">Aktif</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
