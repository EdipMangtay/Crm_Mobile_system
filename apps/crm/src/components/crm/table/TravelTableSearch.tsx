'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TravelTableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function TravelTableSearch({
  value,
  onChange,
  placeholder = 'Tabloda ara...',
  className,
}: TravelTableSearchProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={cn('relative flex items-center min-w-[220px] max-w-sm', className)}>
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#C9A66B]/60 pointer-events-none" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-8 pl-8 pr-7 rounded-lg bg-[#101524] border border-[rgba(201,166,107,0.14)] text-xs text-[#F5F1E8] placeholder-[#F5F1E8]/30 transition-colors focus:outline-none focus:border-[#C9A66B]/50 focus:ring-1 focus:ring-[#C9A66B]/30"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-[#F5F1E8]/40 hover:text-[#F5F1E8] hover:bg-[rgba(245,241,232,0.06)]"
          aria-label="Aramayı Temizle"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
