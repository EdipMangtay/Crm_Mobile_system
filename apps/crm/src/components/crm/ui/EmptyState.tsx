'use client';

import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#111827] border border-[#C9A66B]/10 flex items-center justify-center mb-4">
        {icon || <Inbox className="w-6 h-6 text-[#F5F1E8]/20" />}
      </div>
      <h3 className="text-sm font-medium text-[#F5F1E8]/60 mb-1">{title}</h3>
      {description && (
        <p className="text-xs text-[#F5F1E8]/25 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
