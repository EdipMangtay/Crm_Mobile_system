'use client';

import { BarChart3, TrendingUp, DollarSign, Calendar, Users, Target } from 'lucide-react';
import KPICard from '@/components/crm/ui/KPICard';

export default function AnalyticsPage() {
  return (
    <div className="space-y-5 max-w-[1600px]">
      <div>
        <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Yönetici Analitiği & Raporlar</h1>
        <p className="text-xs text-[#F5F1E8]/30 mt-0.5">Operasyonel marjlar, büyüme metrikleri ve müşteri edinme eğilimleri</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Dönem Geliri" value="247,500 AED" delta={18.3} trend="up" />
        <KPICard title="Net Katkı Marjı" value="%36.2" delta={3.4} trend="up" />
        <KPICard title="Ortalama Müşteri LTV" value="27,400 AED" delta={12.0} trend="up" />
        <KPICard title="Dönüşüm Süresi" value="3.4 Gün" delta={-15.0} trend="up" deltaLabel="hızlanma" />
      </div>

      {/* Monthly Performance Overview */}
      <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-[#F5F1E8] mb-4">Aylık Finansal Büyüme & Kârlılık</h3>
        <div className="space-y-4">
          {[
            { month: 'Ağustos 2026', revenue: 247500, cost: 158300, profit: 89200, pct: 100 },
            { month: 'Temmuz 2026', revenue: 209000, cost: 135000, profit: 74000, pct: 84 },
            { month: 'Haziran 2026', revenue: 178000, cost: 118000, profit: 60000, pct: 72 },
            { month: 'Mayıs 2026', revenue: 154000, cost: 102000, profit: 52000, pct: 62 },
          ].map(m => (
            <div key={m.month} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#F5F1E8]/70 font-medium">{m.month}</span>
                <span className="text-[#C9A66B] font-mono font-semibold">{m.revenue.toLocaleString()} AED (Kâr: {m.profit.toLocaleString()} AED)</span>
              </div>
              <div className="h-2 bg-[#111827] rounded-full overflow-hidden flex">
                <div className="h-full bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] rounded-full" style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
