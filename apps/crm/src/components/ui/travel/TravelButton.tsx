'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TravelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
}

const TravelButton = React.forwardRef<HTMLButtonElement, TravelButtonProps>(
  (
    {
      className,
      variant = 'secondary',
      size = 'md',
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-120 select-none disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A66B] active:scale-[0.98] cursor-pointer';

    const variants = {
      // Refined mostly-solid metallic gold surface, crisp text, subtle inset highlight
      primary:
        'bg-[#C9A66B] text-[#05070F] font-semibold hover:bg-[#E8C77A] active:bg-[#A8854D] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] border border-[#C9A66B]/40',
      // Calm dark navy-700 surface, gold-tinted hairline border
      secondary:
        'bg-[#101524] text-[#F5F1E8] border border-[rgba(201,166,107,0.16)] hover:bg-[#161D30] hover:border-[rgba(201,166,107,0.30)] active:bg-[#0B0F1A]',
      // Subtle transparent button for secondary tools
      ghost:
        'text-[#F5F1E8]/70 hover:text-[#F5F1E8] hover:bg-[rgba(245,241,232,0.04)] active:bg-[rgba(245,241,232,0.08)]',
      // High-precision destructive action
      danger:
        'bg-red-500/10 text-red-400 border border-red-500/25 hover:bg-red-500/20 active:bg-red-500/30',
      // Neutral subtle border
      outline:
        'bg-transparent text-[#F5F1E8]/80 border border-[rgba(201,166,107,0.12)] hover:border-[rgba(201,166,107,0.25)] hover:text-[#F5F1E8]',
    };

    const sizes = {
      sm: 'h-7 px-2.5 text-[11px] rounded-[4px] gap-1.5',
      md: 'h-8.5 px-3.5 text-xs rounded-[6px] gap-2',
      lg: 'h-10 px-5 text-sm rounded-[6px] gap-2.5',
      icon: 'h-8.5 w-8.5 rounded-[6px] p-0 flex items-center justify-center',
    };

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

TravelButton.displayName = 'TravelButton';

export { TravelButton };
