'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, Clock, User, ChevronDown } from 'lucide-react';

function getDubaiTime(): string {
  return new Date().toLocaleTimeString('tr-TR', {
    timeZone: 'Asia/Dubai',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface CrmHeaderProps {
  onOpenCommandPalette?: () => void;
}

export default function CrmHeader({ onOpenCommandPalette }: CrmHeaderProps) {
  const [dubaiTime, setDubaiTime] = useState(getDubaiTime());

  useEffect(() => {
    const interval = setInterval(() => setDubaiTime(getDubaiTime()), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-[#C9A66B]/10 flex items-center justify-between px-5 sticky top-0 z-30">
      {/* Left: Search */}
      <button
        onClick={onOpenCommandPalette}
        className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-[#111827] border border-[#C9A66B]/10 text-[#F5F1E8]/30 hover:text-[#F5F1E8]/50 hover:border-[#C9A66B]/20 transition-all text-sm min-w-[260px]"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="flex-1 text-left text-xs">Ara...</span>
        <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-[#05070F]/60 border border-[#C9A66B]/10 text-[#F5F1E8]/25 font-mono">
          ⌘K
        </kbd>
      </button>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Dubai Time */}
        <div className="flex items-center gap-1.5 text-xs text-[#F5F1E8]/30 px-3 py-1.5 rounded-lg bg-[#111827]/50 border border-[#C9A66B]/5">
          <Clock className="w-3 h-3" />
          <span className="font-mono">{dubaiTime}</span>
          <span className="text-[9px] text-[#C9A66B]/50">Dubai</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-[#F5F1E8]/40 hover:text-[#F5F1E8]/70 hover:bg-[#F5F1E8]/[0.03] transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#C9A66B] rounded-full" />
        </button>

        {/* User */}
        <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#F5F1E8]/[0.03] transition-all">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#C9A66B]/20 to-[#C9A66B]/5 border border-[#C9A66B]/20 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-[#C9A66B]" />
          </div>
          <ChevronDown className="w-3 h-3 text-[#F5F1E8]/20" />
        </button>
      </div>
    </header>
  );
}
