'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  loading?: boolean;
  onClick?: () => void;
}

export default function KPICard({
  title,
  value,
  delta,
  deltaLabel,
  icon,
  trend,
  loading,
  onClick,
}: KPICardProps) {
  const trendColor =
    trend === 'up' ? 'text-emerald-400' :
    trend === 'down' ? 'text-red-400' :
    'text-[#F5F1E8]/30';

  const TrendIcon =
    trend === 'up' ? TrendingUp :
    trend === 'down' ? TrendingDown :
    Minus;

  if (loading) {
    return (
      <div className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl p-5 animate-pulse">
        <div className="h-3 w-20 bg-[#111827] rounded mb-3" />
        <div className="h-7 w-28 bg-[#111827] rounded mb-2" />
        <div className="h-3 w-24 bg-[#111827] rounded" />
      </div>
    );
  }

  return (
    <div
      className={`bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl p-5 transition-all hover:border-[#C9A66B]/15 ${
        onClick ? 'cursor-pointer hover:bg-[#0B0F1A]/80' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono tracking-wider text-[#F5F1E8]/35 uppercase">
          {title}
        </span>
        {icon && (
          <div className="w-7 h-7 rounded-lg bg-[#C9A66B]/5 border border-[#C9A66B]/10 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      <p className="text-2xl font-semibold text-[#F5F1E8] tracking-tight mb-1">
        {value}
      </p>
      {delta !== undefined && (
        <div className="flex items-center gap-1.5">
          <TrendIcon className={`w-3 h-3 ${trendColor}`} />
          <span className={`text-xs ${trendColor}`}>
            {delta > 0 ? '+' : ''}{delta}%
          </span>
          {deltaLabel && (
            <span className="text-[10px] text-[#F5F1E8]/20 ml-1">{deltaLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
