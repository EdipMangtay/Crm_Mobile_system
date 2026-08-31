'use client';

import * as React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface TravelTooltipProps {
  content: React.ReactNode;
  shortcut?: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  delayDuration?: number;
  className?: string;
}

export function TravelTooltip({
  content,
  shortcut,
  children,
  side = 'top',
  align = 'center',
  sideOffset = 6,
  delayDuration = 150,
  className,
}: TravelTooltipProps) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={cn('flex items-center gap-1.5', className)}
        >
          <span>{content}</span>
          {shortcut && (
            <kbd className="rounded bg-[#0B0F1A] border border-[rgba(201,166,107,0.20)] px-1 py-0.5 text-[9px] font-mono text-[#C9A66B]">
              {shortcut}
            </kbd>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export {
  Tooltip as TravelTooltipRoot,
  TooltipTrigger as TravelTooltipTrigger,
  TooltipContent as TravelTooltipContent,
  TooltipProvider as TravelTooltipProvider,
};
