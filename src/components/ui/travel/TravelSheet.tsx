'use client';

import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export interface TravelSheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'default' | 'wide';
  side?: 'right' | 'left';
  className?: string;
}

export function TravelSheet({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  size = 'default',
  side = 'right',
  className,
}: TravelSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side={side} size={size} className={cn('overflow-y-auto', className)}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="flex-1 py-4">{children}</div>
        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  );
}

export {
  Sheet as TravelSheetRoot,
  SheetTrigger as TravelSheetTrigger,
  SheetContent as TravelSheetContent,
  SheetHeader as TravelSheetHeader,
  SheetFooter as TravelSheetFooter,
  SheetTitle as TravelSheetTitle,
  SheetDescription as TravelSheetDescription,
};
