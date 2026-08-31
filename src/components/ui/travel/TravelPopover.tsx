'use client';

import * as React from 'react';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface TravelPopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  className?: string;
}

export function TravelPopover({
  trigger,
  children,
  open,
  onOpenChange,
  align = 'center',
  sideOffset = 4,
  className,
}: TravelPopoverProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align={align}
        sideOffset={sideOffset}
        className={cn('w-auto p-3', className)}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}

export {
  Popover as TravelPopoverRoot,
  PopoverTrigger as TravelPopoverTrigger,
  PopoverContent as TravelPopoverContent,
  PopoverAnchor as TravelPopoverAnchor,
};
