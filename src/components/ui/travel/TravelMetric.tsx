'use client';

import * as React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export interface TravelMetricProps {
  title: string;
  value: React.ReactNode;
  delta?: number;
  deltaLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

export function TravelMetric({
  title,
  value,
  delta,
  deltaLabel,
  trend,
  icon,
  loading = false,
  className,
  onClick,
}: TravelMetricProps) {
  if (loading) {
    return (
      <div className={cn('rounded-[10px] bg-[#0B0F1A] border border-[rgba(201,166,107,0.08)] p-4', className)}>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-6 rounded-md" />
        </div>
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-3 w-20" />
      </div>
    );
  }

  const TrendIcon =
    trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  const trendColor =
    trend === 'up'
      ? 'text-emerald-400'
      : trend === 'down'
      ? 'text-red-400'
      : 'text-[#F5F1E8]/35';

  return (
    <div
      onClick={onClick}
      className={cn(
        'group rounded-[10px] bg-[#0B0F1A] border border-[rgba(201,166,107,0.08)] p-4 transition-all duration-120 hover:border-[rgba(201,166,107,0.18)]',
        onClick && 'cursor-pointer active:scale-[0.99]',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5F1E8]/35 truncate">
          {title}
        </span>
        {icon && (
          <div className="h-6 w-6 rounded-md bg-[rgba(201,166,107,0.06)] border border-[rgba(201,166,107,0.12)] flex items-center justify-center text-[#C9A66B] shrink-0">
            {icon}
          </div>
        )}
      </div>

      <div className="text-xl font-semibold text-[#F5F1E8] tracking-tight tabular-nums mb-1">
        {value}
      </div>

      {delta !== undefined && (
        <div className="flex items-center gap-1 text-[11px]">
          <TrendIcon className={cn('h-3 w-3 shrink-0', trendColor)} />
          <span className={cn('font-medium tabular-nums', trendColor)}>
            {delta > 0 ? '+' : ''}
            {delta}%
          </span>
          {deltaLabel && (
            <span className="text-[#F5F1E8]/30 ml-0.5 truncate text-[10px]">
              {deltaLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default TravelMetric;
