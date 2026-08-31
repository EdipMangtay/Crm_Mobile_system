'use client';

import { Plus, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/crm';

const TEAM = [
  { id: '1', name: 'Edip Mangtay', role: 'Kurucu / Sahip (Owner)', email: 'edip@traviadubai.com', phone: '+90 532 000 0000', badge: 'gold' as const, active: true },
  { id: '2', name: 'Deniz Acar', role: 'Kıdemli Satış & VIP Portföy Yöneticisi', email: 'deniz@traviadubai.com', phone: '+971 50 111 2233', badge: 'info' as const, active: true },
  { id: '3', name: 'Melis Demir', role: 'VIP Concierge & Misafir İlişkileri Lideri', email: 'melis@traviadubai.com', phone: '+971 52 444 5566', badge: 'info' as const, active: true },
  { id: '4', name: 'Tariq Al-Mansoor', role: 'Saha Operasyon & Şoför Koordinatörü', email: 'tariq@traviadubai.com', phone: '+971 55 777 8899', badge: 'warning' as const, active: true },
];

export default function TeamPage() {
  return (
    <div className="space-y-5 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Ekip & Yetkilendirme (Staff & Roles)</h1>
          <p className="text-xs text-[#F5F1E8]/30 mt-0.5">Rol bazlı erişim kontrolü (RBAC) ve personel listesi</p>
        </div>
        <button className="px-3.5 py-1.5 text-xs rounded-lg bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] font-semibold flex items-center gap-1.5 hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Yeni Personel Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TEAM.map(member => (
          <div key={member.id} className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-5 hover:border-[#C9A66B]/25 transition-all flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C9A66B]/15 flex items-center justify-center text-sm font-bold text-[#C9A66B] shrink-0">
              {member.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#F5F1E8]">{member.name}</h3>
                <Badge variant={member.badge} size="sm">{member.role.split(' ')[0]}</Badge>
              </div>
              <p className="text-xs text-[#C9A66B] mt-0.5">{member.role}</p>
              <div className="text-xs text-[#F5F1E8]/40 space-y-1 mt-3">
                <p className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-[#C9A66B]/40" /> {member.email}</p>
                <p className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-[#C9A66B]/40" /> {member.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
