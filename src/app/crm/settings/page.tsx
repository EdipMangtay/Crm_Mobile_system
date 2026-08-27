'use client';

import { Settings, Shield, Bell, Key, Globe, Database } from 'lucide-react';

export default function SettingsPage() {
  const isSupabaseConfigured = Boolean(
    typeof process !== 'undefined' &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')
  );
  const supabaseUrlDisplay = isSupabaseConfigured
    ? process.env.NEXT_PUBLIC_SUPABASE_URL
    : 'Bağlı Değil (Yerel In-Memory Depo Aktif)';

  return (
    <div className="space-y-6 max-w-[1200px]">
      <div>
        <h1 className="text-xl font-semibold text-[#F5F1E8] tracking-tight">Sistem Ayarları (Settings)</h1>
        <p className="text-xs text-[#F5F1E8]/30 mt-0.5">Entegrasyonlar, bildirimler ve operasyonel yapılandırma</p>
      </div>

      <div className="space-y-4">
        {/* Supabase Connection */}
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Database className="w-5 h-5 text-[#C9A66B]" />
            <h3 className="text-sm font-semibold text-[#F5F1E8]">Supabase PostgreSQL Veritabanı</h3>
          </div>
          <p className="text-xs text-[#F5F1E8]/50 leading-relaxed mb-4">
            Merkezi Travia veritabanı (Web, CRM, Mobile) tek kaynak prensibiyle bağlanır.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#111827]/50 p-3 rounded-xl border border-[#C9A66B]/5">
              <span className="text-[10px] text-[#F5F1E8]/30 font-mono">SUPABASE URL</span>
              <p className="font-mono text-[#F5F1E8]/80 mt-0.5">{supabaseUrlDisplay}</p>
            </div>
            <div className="bg-[#111827]/50 p-3 rounded-xl border border-[#C9A66B]/5">
              <span className="text-[10px] text-[#F5F1E8]/30 font-mono">DURUM</span>
              {isSupabaseConfigured ? (
                <p className="text-emerald-400 font-semibold mt-0.5">● Canlı Supabase Bağlantısı Hazır</p>
              ) : (
                <p className="text-amber-400 font-semibold mt-0.5">○ Demo / In-Memory Modu (Çevrimdışı Depo)</p>
              )}
            </div>
          </div>
        </div>

        {/* Currency and Localization */}
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-5 h-5 text-[#C9A66B]" />
            <h3 className="text-sm font-semibold text-[#F5F1E8]">Para Birimi & Lokasyon</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#111827]/50 p-3 rounded-xl border border-[#C9A66B]/5">
              <span className="text-[10px] text-[#F5F1E8]/30 font-mono">VARSAYILAN PARA BİRİMİ</span>
              <p className="text-[#F5F1E8]/80 mt-0.5 font-semibold">AED (Birleşik Arap Emirlikleri Dirhemi)</p>
            </div>
            <div className="bg-[#111827]/50 p-3 rounded-xl border border-[#C9A66B]/5">
              <span className="text-[10px] text-[#F5F1E8]/30 font-mono">SAAT DİLİMİ</span>
              <p className="text-[#F5F1E8]/80 mt-0.5 font-semibold">Asia/Dubai (GST UTC+4)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
