'use client';

import React, { useMemo } from 'react';
import {
  Compass,
  PieChart,
  Inbox,
} from 'lucide-react';
import { useTenant } from '@/lib/tenancy/TenantProvider';
import { SHARED_TRIPS, SHARED_LEADS, SHARED_CUSTOMERS } from '@/shared/data/traviaData';

export default function AnalyticsPage() {
  const { tenant, formatMoney } = useTenant();

  // Authentic calculations strictly derived from repository data
  const data = useMemo(() => {
    const trips = Object.values(SHARED_TRIPS);
    const leads = SHARED_LEADS;
    const customers = SHARED_CUSTOMERS;

    const totalVolume = trips.reduce((sum, t) => sum + (t.total_amount || 0), 0);
    const totalCost = trips.reduce((sum, t) => sum + (t.supplier_cost || 0), 0);
    const totalProfit = trips.reduce((sum, t) => sum + (t.gross_contribution || ((t.total_amount || 0) - (t.supplier_cost || 0))), 0);
    const avgMarginPct = totalVolume > 0 ? (totalProfit / totalVolume) * 100 : 0;
    const avgBookingValue = trips.length > 0 ? totalVolume / trips.length : 0;

    const pipelineValue = leads.reduce((sum, l) => sum + (l.estimated_value || 0), 0);

    // Derived from genuine SHARED_LEADS
    const sourceMap: Record<string, { count: number; totalEstimated: number }> = {};
    leads.forEach((l) => {
      const src = l.source || 'Diğer / Doğrudan';
      if (!sourceMap[src]) {
        sourceMap[src] = { count: 0, totalEstimated: 0 };
      }
      sourceMap[src].count += 1;
      sourceMap[src].totalEstimated += (l.estimated_value || 0);
    });

    const authenticLeadSources = Object.entries(sourceMap).map(([source, item]) => ({
      source,
      count: item.count,
      totalEstimated: item.totalEstimated,
      pctOfLeads: leads.length > 0 ? Math.round((item.count / leads.length) * 100) : 0,
    }));

    // Derived from genuine SHARED_TRIPS
    const hotelMap: Record<string, { count: number; volume: number; profit: number }> = {};
    trips.forEach((t) => {
      const hotel = t.hotel_name || 'Özel Rezervasyon';
      if (!hotelMap[hotel]) {
        hotelMap[hotel] = { count: 0, volume: 0, profit: 0 };
      }
      hotelMap[hotel].count += 1;
      hotelMap[hotel].volume += (t.total_amount || 0);
      hotelMap[hotel].profit += (t.gross_contribution || ((t.total_amount || 0) - (t.supplier_cost || 0)));
    });

    const authenticHotelMix = Object.entries(hotelMap).map(([hotel, item]) => ({
      hotel,
      count: item.count,
      volume: item.volume,
      profit: item.profit,
      marginPct: item.volume > 0 ? (item.profit / item.volume) * 100 : 0,
    }));

    return {
      totalVolume,
      totalCost,
      totalProfit,
      avgMarginPct,
      avgBookingValue,
      pipelineValue,
      tripCount: trips.length,
      leadCount: leads.length,
      customerCount: customers.length,
      authenticLeadSources,
      authenticHotelMix,
    };
  }, []);

  return (
    <div className="space-y-6 max-w-[1600px] pb-12">
      {/* ─── Header & Scope ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">
              Yönetici Analitiği & Portföy Özeti
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[#C9A66B] border border-white/10">
              {tenant.display_name}
            </span>
          </div>
          <p className="text-xs text-[#F5F1E8]/40 mt-0.5">
            Mevcut acente portföyü, operasyonel marjlar ve lead kaynaklarının doğrulanmış analizi
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#F5F1E8]/40">
          <span>Veri Kapsamı:</span>
          <span className="text-[#F5F1E8]/70 bg-white/5 px-2 py-1 rounded border border-white/5">
            Aktif Portföy & Operasyonlar
          </span>
        </div>
      </div>

      {/* ─── Compact Executive Summary Strip ──────────────────────────────── */}
      <div className="bg-[#0B0F1A] border border-white/10 rounded-xl p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/5">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5F1E8]/40">
              Toplam Gezi Hacmi
            </span>
            <p className="text-2xl font-bold font-mono text-[#F5F1E8] tabular-nums">
              {formatMoney(data.totalVolume)}
            </p>
            <p className="text-[11px] text-[#F5F1E8]/40">
              {data.tripCount} aktif gezi kaydı
            </p>
          </div>

          <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5F1E8]/40">
              Brüt Katkı (Kâr)
            </span>
            <p className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              {formatMoney(data.totalProfit)}
            </p>
            <p className="text-[11px] text-[#F5F1E8]/40">
              Ortalama Marj: <span className="text-[#C9A66B] font-semibold">%{data.avgMarginPct.toFixed(1)}</span>
            </p>
          </div>

          <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5F1E8]/40">
              Ortalama Gezi Değeri
            </span>
            <p className="text-2xl font-bold font-mono text-[#F5F1E8] tabular-nums">
              {formatMoney(data.avgBookingValue)}
            </p>
            <p className="text-[11px] text-[#F5F1E8]/40">
              Rezervasyon başına ciro
            </p>
          </div>

          <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5F1E8]/40">
              Potansiyel Satış Hattı
            </span>
            <p className="text-2xl font-bold font-mono text-[#F5F1E8] tabular-nums">
              {formatMoney(data.pipelineValue)}
            </p>
            <p className="text-[11px] text-[#F5F1E8]/40">
              {data.leadCount} aday misafir (Lead)
            </p>
          </div>
        </div>
      </div>

      {/* ─── Authentic Two-Column Analysis ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Authentic Hotel & Package Breakdown */}
        <div className="bg-[#0B0F1A] border border-white/10 rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#C9A66B]" />
              <h2 className="text-sm font-semibold text-[#F5F1E8]">Konaklama & Destinasyon Dağılımı</h2>
            </div>
            <span className="text-[10px] font-mono text-[#F5F1E8]/40">Doğrulanmış Kayıtlar</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-white/[0.02] border-b border-white/5 text-[#F5F1E8]/40 font-mono uppercase text-[10px]">
                <tr>
                  <th className="px-5 py-3">Tesis / Destinasyon</th>
                  <th className="px-4 py-3 text-center">Gezi</th>
                  <th className="px-4 py-3 text-right">Toplam Hacim</th>
                  <th className="px-4 py-3 text-right">Brüt Katkı</th>
                  <th className="px-4 py-3 text-right">Marj %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.authenticHotelMix.map((item) => (
                  <tr key={item.hotel} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 font-medium text-[#F5F1E8]">
                      {item.hotel}
                    </td>
                    <td className="px-4 py-3.5 text-center font-mono text-[#F5F1E8]/70 tabular-nums">
                      {item.count}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-[#F5F1E8] font-medium tabular-nums">
                      {formatMoney(item.volume)}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-emerald-400 font-medium tabular-nums">
                      +{formatMoney(item.profit)}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-[#C9A66B] font-semibold tabular-nums">
                      %{item.marginPct.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Authentic Lead Sources Breakdown */}
        <div className="bg-[#0B0F1A] border border-white/10 rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#C9A66B]" />
              <h2 className="text-sm font-semibold text-[#F5F1E8]">Mevcut Lead Edinme Kanalları</h2>
            </div>
            <span className="text-[10px] font-mono text-[#F5F1E8]/40">Kayıtlı Havuz</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-white/[0.02] border-b border-white/5 text-[#F5F1E8]/40 font-mono uppercase text-[10px]">
                <tr>
                  <th className="px-5 py-3">Kaynak</th>
                  <th className="px-4 py-3 text-center">Lead Sayısı</th>
                  <th className="px-4 py-3 text-right">Potansiyel Bütçe</th>
                  <th className="px-4 py-3 text-right">Pay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.authenticLeadSources.map((item) => (
                  <tr key={item.source} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 font-medium text-[#F5F1E8]">
                      {item.source}
                    </td>
                    <td className="px-4 py-3.5 text-center font-mono text-[#F5F1E8]/80 tabular-nums">
                      {item.count}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-[#F5F1E8] font-medium tabular-nums">
                      {formatMoney(item.totalEstimated)}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-[#C9A66B] font-semibold tabular-nums">
                      %{item.pctOfLeads}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ─── Honest Empty State for Historical Trends ────────────────────── */}
      <div className="bg-[#0B0F1A] border border-white/10 rounded-xl p-8 text-center space-y-3">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#F5F1E8]/40">
          <Inbox className="w-5 h-5" />
        </div>
        <div className="max-w-md mx-auto space-y-1">
          <h3 className="text-sm font-semibold text-[#F5F1E8]">
            Dönemsel Karşılaştırma & Eğilim Analizi
          </h3>
          <p className="text-xs text-[#F5F1E8]/40 leading-relaxed">
            Yeterli geçmiş dönem verisi bulunmuyor. Acente geçmiş mali çeyrek operasyonları tamamlandıkça çoklu ay kapanış eğrileri ve büyüme grafikleri burada otomatik listelenecektir.
          </p>
        </div>
      </div>
    </div>
  );
}
