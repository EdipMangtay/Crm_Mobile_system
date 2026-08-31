'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TravelStatusDotProps {
  status?: 'online' | 'in_progress' | 'pending' | 'danger' | 'neutral';
  pulse?: boolean;
  className?: string;
}

const STATUS_COLORS = {
  online: 'bg-emerald-400',
  in_progress: 'bg-[#C9A66B]',
  pending: 'bg-amber-400',
  danger: 'bg-red-400',
  neutral: 'bg-[#F5F1E8]/40',
};

export function TravelStatusDot({
  status = 'neutral',
  pulse = false,
  className,
}: TravelStatusDotProps) {
  const colorClass = STATUS_COLORS[status] || STATUS_COLORS.neutral;

  return (
    <span className={cn('relative flex h-2 w-2 items-center justify-center shrink-0', className)}>
      {pulse && (
        <span
          className={cn(
            'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping',
            colorClass
          )}
        />
      )}
      <span className={cn('relative inline-flex h-2 w-2 rounded-full', colorClass)} />
    </span>
  );
}

export default TravelStatusDot;
