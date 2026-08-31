'use client';

import React, { useState } from 'react';
import {
  Plus,
  Mail,
  Phone,
  Shield,
  Users,
  Key,
  Check,
} from 'lucide-react';
import { TravelBadge } from '@/components/ui/travel/TravelBadge';
import { TravelButton } from '@/components/ui/travel/TravelButton';
import { TravelDialog } from '@/components/ui/travel/TravelDialog';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  accessLevel: 'owner' | 'sales_lead' | 'concierge_lead' | 'operations';
  active: boolean;
  permissions: string[];
}

const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Edip Mangtay',
    role: 'Acente Kurucusu & Sahibi (Owner)',
    department: 'Yönetim & Strateji',
    email: 'edip@traviadubai.com',
    phone: '+90 532 000 0000',
    accessLevel: 'owner',
    active: true,
    permissions: ['Tüm Finans & Marjlar', 'Müşteri Portföyü', 'Sistem & API Ayarları', 'Saha Operasyonu'],
  },
  {
    id: 'team-2',
    name: 'Deniz Acar',
    role: 'Kıdemli Satış & VIP Portföy Yöneticisi',
    department: 'Satış & Müşteri Edinimi',
    email: 'deniz@traviadubai.com',
    phone: '+971 50 111 2233',
    accessLevel: 'sales_lead',
    active: true,
    permissions: ['Lead & Satış Hunisi', 'Teklif & Voucher Motoru', 'Müşteri Yönetimi'],
  },
  {
    id: 'team-3',
    name: 'Melis Demir',
    role: 'VIP Concierge & Misafir İlişkileri Lideri',
    department: 'Misafir Hizmetleri',
    email: 'melis@traviadubai.com',
    phone: '+971 52 444 5566',
    accessLevel: 'concierge_lead',
    active: true,
    permissions: ['Canlı Sohbet & Concierge Masası', 'Restoran / Yat Rezervasyonları', 'Misafir Profili'],
  },
  {
    id: 'team-4',
    name: 'Tariq Al-Mansoor',
    role: 'Saha Operasyon & Şoför Koordinatörü',
    department: 'Saha & Lojistik',
    email: 'tariq@traviadubai.com',
    phone: '+971 55 777 8899',
    accessLevel: 'operations',
    active: true,
    permissions: ['Saha Görevleri & Transfer', 'Tedarikçi Koordinasyonu', 'Saha Durum Güncellemeleri'],
  },
];

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New staff form state
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newDept, setNewDept] = useState('Satış & Müşteri Edinimi');
  const [newAccess, setNewAccess] = useState<'owner' | 'sales_lead' | 'concierge_lead' | 'operations'>('sales_lead');

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const created: TeamMember = {
      id: `team-${Date.now()}`,
      name: newName.trim(),
      role: newRole.trim() || 'Operasyon Uzmanı',
      department: newDept,
      email: newEmail.trim(),
      phone: newPhone.trim() || '+971 50 000 0000',
      accessLevel: newAccess,
      active: true,
      permissions: ['Müşteri Yönetimi', 'Saha Durum Güncellemeleri'],
    };

    setTeam((prev) => [...prev, created]);
    setNewName('');
    setNewRole('');
    setNewEmail('');
    setNewPhone('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6 max-w-[1600px] pb-10">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">
              Ekip & Yetkilendirme (Staff & Roles)
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#C9A66B]/10 text-[#C9A66B] border border-[#C9A66B]/20">
              {team.length} Personel
            </span>
          </div>
          <p className="text-xs text-[#F5F1E8]/40 mt-0.5">
            Rol bazlı erişim seviyeleri, departman atamaları ve iletişim bilgileri
          </p>
        </div>

        <TravelButton
          variant="primary"
          size="sm"
          onClick={() => setIsAddOpen(true)}
        >
          <Plus className="w-3.5 h-3.5" />
          Yeni Personel Ekle
        </TravelButton>
      </div>

      {/* ─── Role Hierarchy & Security Info ──────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0B0F1A] border border-white/10 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F1E8]">
            <Shield className="w-3.5 h-3.5 text-[#C9A66B]" />
            Rol Bazlı İzolasyon (RBAC)
          </div>
          <p className="text-[11px] text-[#F5F1E8]/40">
            Personel yetkileri profil rolüne göre otomatik filtrelenir.
          </p>
        </div>

        <div className="bg-[#0B0F1A] border border-white/10 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F1E8]">
            <Key className="w-3.5 h-3.5 text-emerald-400" />
            Finansal Gizlilik Kilidi
          </div>
          <p className="text-[11px] text-[#F5F1E8]/40">
            Tedarikçi net maliyetleri yalnızca yetkili yöneticilere görünür.
          </p>
        </div>

        <div className="bg-[#0B0F1A] border border-white/10 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F1E8]">
            <Users className="w-3.5 h-3.5 text-[#C9A66B]" />
            Aktif Oturum Ekibi
          </div>
          <p className="text-[11px] text-[#F5F1E8]/40">
            Ekip listesi çalışma ortamında aktif personelleri listeler.
          </p>
        </div>
      </div>

      {/* ─── Team Members Grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team.map((member) => {
          const badgeVariant =
            member.accessLevel === 'owner'
              ? 'gold'
              : member.accessLevel === 'sales_lead'
              ? 'info'
              : member.accessLevel === 'concierge_lead'
              ? 'success'
              : 'warning';

          const badgeLabel =
            member.accessLevel === 'owner'
              ? 'Kurucu / Sahip'
              : member.accessLevel === 'sales_lead'
              ? 'Satış Yöneticisi'
              : member.accessLevel === 'concierge_lead'
              ? 'Concierge Lideri'
              : 'Saha Koordinatörü';

          return (
            <div
              key={member.id}
              className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-xl p-5 hover:border-[#C9A66B]/25 transition-all space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C9A66B]/15 border border-[#C9A66B]/20 flex items-center justify-center text-base font-bold text-[#C9A66B] shrink-0">
                  {member.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-[#F5F1E8] truncate">{member.name}</h3>
                    <TravelBadge variant={badgeVariant} size="sm">
                      {badgeLabel}
                    </TravelBadge>
                  </div>
                  <p className="text-xs text-[#C9A66B] mt-0.5">{member.role}</p>
                  <p className="text-[11px] text-[#F5F1E8]/40 mt-0.5">{member.department}</p>
                </div>
              </div>

              {/* Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F5F1E8]/60 bg-[#111827]/40 p-3 rounded-lg border border-[#C9A66B]/5">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-1.5 hover:text-[#C9A66B] truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C9A66B]/50 shrink-0" />
                  <span className="truncate">{member.email}</span>
                </a>
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center gap-1.5 hover:text-[#C9A66B] font-mono truncate"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A66B]/50 shrink-0" />
                  <span>{member.phone}</span>
                </a>
              </div>

              {/* Permissions Tags */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#F5F1E8]/40 uppercase tracking-wider">
                  Yetkiler
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.permissions.map((perm, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[11px] bg-[#111827] border border-[#C9A66B]/10 text-[#F5F1E8]/70 flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-emerald-400" />
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Add Staff Dialog ───────────────────────────────────────────── */}
      <TravelDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title="Yeni Personel Tanımla"
        description="Oturum personel listesine yeni bir operasyon veya concierge çalışanı ekleyin."
      >
        <form onSubmit={handleAddStaff} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs text-[#F5F1E8]/70 mb-1">Ad Soyad</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Örn: Zeynep Kaya"
              required
              className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#F5F1E8]/70 mb-1">Pozisyon / Ünvan</label>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="Örn: VIP Concierge Specialist"
                required
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
              />
            </div>
            <div>
              <label className="block text-xs text-[#F5F1E8]/70 mb-1">Departman</label>
              <select
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
              >
                <option value="Satış & Müşteri Edinimi">Satış & Müşteri Edinimi</option>
                <option value="Misafir Hizmetleri">Misafir Hizmetleri</option>
                <option value="Saha & Lojistik">Saha & Lojistik</option>
                <option value="Yönetim & Finans">Yönetim & Finans</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#F5F1E8]/70 mb-1">E-Posta</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="zeynep@acente.com"
                required
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
              />
            </div>
            <div>
              <label className="block text-xs text-[#F5F1E8]/70 mb-1">Telefon</label>
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="+971 50 123 4567"
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#F5F1E8]/70 mb-1">Erişim Seviyesi (Rol)</label>
            <select
              value={newAccess}
              onChange={(e) => setNewAccess(e.target.value as 'owner' | 'sales_lead' | 'concierge_lead' | 'operations')}
              className="w-full px-3 py-2 text-xs rounded-lg bg-[#111827] border border-white/10 text-[#F5F1E8] focus:outline-none focus:border-[#C9A66B]/50"
            >
              <option value="sales_lead">Satış Yöneticisi (Lead, Teklif, Müşteri)</option>
              <option value="concierge_lead">Concierge Lideri (Canlı Mesajlar, Talepler)</option>
              <option value="operations">Saha Koordinatörü (Transferler, Görevler)</option>
              <option value="owner">Yönetici / Tam Yetkili</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
            <TravelButton variant="ghost" size="sm" onClick={() => setIsAddOpen(false)}>
              İptal
            </TravelButton>
            <TravelButton variant="primary" size="sm" type="submit">
              Listeye Ekle
            </TravelButton>
          </div>
        </form>
      </TravelDialog>
    </div>
  );
}
