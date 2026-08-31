'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TravelBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
}

const VARIANTS = {
  gold: {
    badge: 'bg-[rgba(201,166,107,0.10)] text-[#E8C77A] border-[rgba(201,166,107,0.22)]',
    dot: 'bg-[#C9A66B]',
  },
  success: {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  warning: {
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dot: 'bg-amber-400',
  },
  error: {
    badge: 'bg-red-500/10 text-red-400 border-red-500/20',
    dot: 'bg-red-400',
  },
  info: {
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    dot: 'bg-blue-400',
  },
  neutral: {
    badge: 'bg-[rgba(245,241,232,0.05)] text-[#F5F1E8]/60 border-[rgba(245,241,232,0.10)]',
    dot: 'bg-[#F5F1E8]/40',
  },
};

export function TravelBadge({
  children,
  variant = 'neutral',
  size = 'sm',
  dot = false,
  className,
  ...props
}: TravelBadgeProps) {
  const current = VARIANTS[variant] || VARIANTS.neutral;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium border select-none',
        current.badge,
        size === 'sm' && 'px-2 py-0.5 text-[10px] rounded-[4px]',
        size === 'md' && 'px-2.5 py-1 text-xs rounded-[6px]',
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full shrink-0',
            current.dot
          )}
        />
      )}
      {children}
    </span>
  );
}

export default TravelBadge;
