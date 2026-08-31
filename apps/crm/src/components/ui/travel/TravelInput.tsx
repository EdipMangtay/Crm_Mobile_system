'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TravelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  error?: boolean;
}

const TravelInput = React.forwardRef<HTMLInputElement, TravelInputProps>(
  ({ className, type, prefixIcon, suffixIcon, error, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {prefixIcon && (
          <div className="absolute left-2.5 flex items-center pointer-events-none text-[#F5F1E8]/35 shrink-0">
            {prefixIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-8.5 w-full rounded-[6px] bg-[#101524] px-3 py-1.5 text-xs text-[#F5F1E8] placeholder:text-[#F5F1E8]/25 border border-[rgba(201,166,107,0.14)] transition-all duration-120',
            'focus:outline-none focus:border-[#C9A66B] focus:ring-1 focus:ring-[#C9A66B]',
            'disabled:cursor-not-allowed disabled:opacity-40',
            error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50',
            prefixIcon && 'pl-8.5',
            suffixIcon && 'pr-8.5',
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {suffixIcon && (
          <div className="absolute right-2.5 flex items-center pointer-events-none text-[#F5F1E8]/35 shrink-0">
            {suffixIcon}
          </div>
        )}
      </div>
    );
  }
);

TravelInput.displayName = 'TravelInput';

export { TravelInput };
