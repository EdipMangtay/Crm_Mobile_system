'use client';

interface LoadingSkeletonProps {
  rows?: number;
  variant?: 'table' | 'cards' | 'detail';
}

export default function LoadingSkeleton({ rows = 5, variant = 'table' }: LoadingSkeletonProps) {
  if (variant === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl p-5">
            <div className="h-3 w-20 bg-[#111827] rounded mb-3" />
            <div className="h-7 w-28 bg-[#111827] rounded mb-2" />
            <div className="h-3 w-24 bg-[#111827] rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'detail') {
    return (
      <div className="animate-pulse space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#111827]" />
          <div>
            <div className="h-6 w-48 bg-[#111827] rounded mb-2" />
            <div className="h-4 w-32 bg-[#111827] rounded" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 bg-[#0B0F1A] border border-[#C9A66B]/8 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse">
      <div className="h-10 bg-[#111827] rounded-lg mb-3" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-14 bg-[#0B0F1A] border-b border-[#C9A66B]/5 flex items-center gap-4 px-4">
          <div className="w-8 h-8 rounded-lg bg-[#111827]" />
          <div className="flex-1">
            <div className="h-3 w-32 bg-[#111827] rounded mb-1" />
            <div className="h-2 w-48 bg-[#111827] rounded" />
          </div>
          <div className="h-5 w-16 bg-[#111827] rounded-full" />
        </div>
      ))}
    </div>
  );
}
