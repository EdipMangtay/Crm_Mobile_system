'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TravelSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const TravelSelect = React.forwardRef<HTMLSelectElement, TravelSelectProps>(
  ({ className, error, children, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        <select
          className={cn(
            'flex h-8.5 w-full appearance-none rounded-[6px] bg-[#101524] px-3 pr-8 py-1.5 text-xs text-[#F5F1E8] border border-[rgba(201,166,107,0.14)] transition-all duration-120 cursor-pointer',
            'focus:outline-none focus:border-[#C9A66B] focus:ring-1 focus:ring-[#C9A66B]',
            'disabled:cursor-not-allowed disabled:opacity-40',
            error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50',
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-2.5 h-3.5 w-3.5 pointer-events-none text-[#F5F1E8]/35 shrink-0" />
      </div>
    );
  }
);

TravelSelect.displayName = 'TravelSelect';

export { TravelSelect };
