'use client';

import { useState } from 'react';
import { Plane, Car, Ship, Utensils, Compass, Sun, ChevronRight, Clock, AlertTriangle, CheckCircle, Play, Pause } from 'lucide-react';
import Badge from '@/components/crm/ui/Badge';

const OPERATIONS = [
  { id: '1', time: '09:10', customer: 'Ahmet Yılmaz', country: '🇹🇷', type: 'Havalimanı İniş & Karşılama', detail: 'Uçuş: TK762 · 4 Kişi', location: 'DXB Terminal 3', driver: '—', status: 'completed' as const, icon: Plane },
  { id: '2', time: '10:30', customer: 'Edip Mangtay', country: '🇹🇷', type: 'VIP Chauffeur Transfer', detail: 'Mercedes V-Class (Dubai X 78219)', location: 'DXB → Atlantis The Royal', driver: 'Khalid Ahmed · +971 50 123 4567', status: 'in_progress' as const, icon: Car },
  { id: '3', time: '14:00', customer: 'Edip Mangtay', country: '🇹🇷', type: 'Özel Süperyat Seyri', detail: 'Majesty 56ft Yacht · Şampanya İkramı', location: 'Dubai Marina Yacht Club Pier 7', driver: 'Kaptan Rashid', status: 'confirmed' as const, icon: Ship },
  { id: '4', time: '15:30', customer: 'Canan Özdemir', country: '🇹🇷', type: 'VIP Çöl Safarisi', detail: 'Land Cruiser · 1 Kişi', location: 'Otel Lobisi → Lahbab Çölü', driver: 'Ahmed Hassan', status: 'confirmed' as const, icon: Compass },
  { id: '5', time: '20:30', customer: 'Edip Mangtay', country: '🇹🇷', type: 'Nobu Dubai Akşam Yemeği', detail: 'Teras Masa · 2 Kişi', location: 'Atlantis The Palm', driver: '—', status: 'confirmed' as const, icon: Utensils },
  { id: '6', time: '22:00', customer: 'Ahmet Yılmaz', country: '🇹🇷', type: 'Hotel Check-in', detail: 'Royal Suite · Postviya Suite', location: 'Burj Al Arab Jumeirah', driver: '—', status: 'pending' as const, icon: Sun },
];

const STATUS_STYLES = {
  completed: { label: 'Tamamlandı', variant: 'success' as const, color: 'border-l-emerald-500' },
  in_progress: { label: 'Devam Ediyor', variant: 'gold' as const, color: 'border-l-[#C9A66B]' },
  confirmed: { label: 'Onaylı', variant: 'info' as const, color: 'border-l-blue-500' },
  pending: { label: 'Bekliyor', variant: 'warning' as const, color: 'border-l-amber-500' },
  issue: { label: 'Sorun', variant: 'error' as const, color: 'border-l-red-500' },
  cancelled: { label: 'İptal', variant: 'error' as const, color: 'border-l-red-500' },
};

export default function OperationsPage() {
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = statusFilter === 'all' ? OPERATIONS : OPERATIONS.filter(o => o.status === statusFilter);

  return (
    <div className="space-y-5 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Operasyon Merkezi</h1>
          </div>
          <p className="text-xs text-[#F5F1E8]/30 mt-0.5">Bugün — {OPERATIONS.length} operasyon · {OPERATIONS.filter(o => o.status === 'in_progress').length} devam ediyor</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: 'Tümü', count: OPERATIONS.length, filter: 'all', color: 'text-[#F5F1E8]/60' },
          { label: 'Tamamlanan', count: OPERATIONS.filter(o => o.status === 'completed').length, filter: 'completed', color: 'text-emerald-400' },
          { label: 'Devam Eden', count: OPERATIONS.filter(o => o.status === 'in_progress').length, filter: 'in_progress', color: 'text-[#C9A66B]' },
          { label: 'Onaylı', count: OPERATIONS.filter(o => o.status === 'confirmed').length, filter: 'confirmed', color: 'text-blue-400' },
          { label: 'Bekleyen', count: OPERATIONS.filter(o => o.status === 'pending').length, filter: 'pending', color: 'text-amber-400' },
        ].map(stat => (
          <button
            key={stat.filter}
            onClick={() => setStatusFilter(stat.filter)}
            className={`p-3 rounded-xl border transition-all text-left ${
              statusFilter === stat.filter ? 'bg-[#0B0F1A] border-[#C9A66B]/20' : 'bg-[#0B0F1A]/50 border-[#C9A66B]/5 hover:border-[#C9A66B]/10'
            }`}
          >
            <p className={`text-xl font-semibold ${stat.color}`}>{stat.count}</p>
            <p className="text-[10px] text-[#F5F1E8]/25 uppercase tracking-wider mt-0.5">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl overflow-hidden">
        <div className="divide-y divide-[#C9A66B]/5">
          {filtered.map(op => {
            const OpIcon = op.icon;
            const statusInfo = STATUS_STYLES[op.status];
            return (
              <div key={op.id} className={`flex items-start gap-4 px-5 py-4 border-l-[3px] hover:bg-[#F5F1E8]/[0.01] transition-colors ${statusInfo.color}`}>
                <div className="text-center shrink-0 w-12">
                  <p className="text-sm font-mono text-[#C9A66B] font-medium">{op.time}</p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-[#111827] border border-[#C9A66B]/10 flex items-center justify-center shrink-0">
                  <OpIcon className="w-4 h-4 text-[#C9A66B]/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm">{op.country}</span>
                    <p className="text-sm text-[#F5F1E8]/80 font-medium">{op.customer}</p>
                    <Badge variant={statusInfo.variant} size="sm">{statusInfo.label}</Badge>
                  </div>
                  <p className="text-sm text-[#F5F1E8]/50">{op.type}</p>
                  <p className="text-xs text-[#F5F1E8]/25 mt-0.5">{op.detail}</p>
                  <p className="text-xs text-[#F5F1E8]/20 mt-0.5">{op.location}</p>
                  {op.driver !== '—' && (
                    <p className="text-xs text-[#C9A66B]/40 mt-1">🚗 {op.driver}</p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {op.status === 'confirmed' && (
                    <button className="p-1.5 rounded-lg bg-[#C9A66B]/10 text-[#C9A66B] hover:bg-[#C9A66B]/20 transition-colors" title="Başlat">
                      <Play className="w-3 h-3" />
                    </button>
                  )}
                  {op.status === 'in_progress' && (
                    <button className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors" title="Tamamla">
                      <CheckCircle className="w-3 h-3" />
                    </button>
                  )}
                  <button className="p-1.5 rounded-lg bg-red-500/5 text-red-400/40 hover:bg-red-500/10 hover:text-red-400 transition-colors" title="Sorun Bildir">
                    <AlertTriangle className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
