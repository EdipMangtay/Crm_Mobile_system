'use client';

import * as React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export interface TravelTabItem {
  id: string;
  label: React.ReactNode;
  content?: React.ReactNode;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TravelTabsProps {
  items: TravelTabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  listClassName?: string;
  contentClassName?: string;
  children?: React.ReactNode;
}

export function TravelTabs({
  items,
  defaultValue,
  value,
  onValueChange,
  className,
  listClassName,
  contentClassName,
  children,
}: TravelTabsProps) {
  const initial = defaultValue || items[0]?.id;

  return (
    <Tabs
      defaultValue={initial}
      value={value}
      onValueChange={onValueChange}
      className={cn('w-full', className)}
    >
      <TabsList className={cn(listClassName)}>
        {items.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            disabled={item.disabled}
            className="flex items-center gap-1.5"
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
            {item.badge && <span className="ml-1 shrink-0">{item.badge}</span>}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) =>
        item.content ? (
          <TabsContent
            key={item.id}
            value={item.id}
            className={cn(contentClassName)}
          >
            {item.content}
          </TabsContent>
        ) : null
      )}
      {children}
    </Tabs>
  );
}

export {
  Tabs as TravelTabsRoot,
  TabsList as TravelTabsList,
  TabsTrigger as TravelTabsTrigger,
  TabsContent as TravelTabsContent,
};
