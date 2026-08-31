'use client';

import * as React from 'react';
import { MoreHorizontal, Eye, ExternalLink, Copy } from 'lucide-react';
import {
  TravelDropdownMenu,
  TravelDropdownMenuTrigger,
  TravelDropdownMenuContent,
  TravelDropdownMenuItem,
  TravelDropdownMenuSeparator,
  TravelButton,
} from '@/components/ui/travel';
import Link from 'next/link';

interface TravelTableRowActionsProps {
  onInspect?: () => void;
  detailHref?: string;
  onCopyId?: () => void;
  children?: React.ReactNode;
}

export function TravelTableRowActions({
  onInspect,
  detailHref,
  onCopyId,
  children,
}: TravelTableRowActionsProps) {
  return (
    <TravelDropdownMenu>
      <TravelDropdownMenuTrigger asChild>
        <TravelButton
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-[#F5F1E8]/40 hover:text-[#F5F1E8] hover:bg-[rgba(245,241,232,0.06)] data-[state=open]:bg-[rgba(201,166,107,0.12)] data-[state=open]:text-[#C9A66B]"
          aria-label="Satır İşlemleri Menüsü"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
        </TravelButton>
      </TravelDropdownMenuTrigger>
      <TravelDropdownMenuContent
        align="end"
        className="w-44 bg-[#0B0F1A] border-[rgba(201,166,107,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        {onInspect && (
          <TravelDropdownMenuItem onClick={onInspect} className="cursor-pointer gap-2 text-xs">
            <Eye className="w-3.5 h-3.5 text-[#C9A66B]" />
            <span>Hızlı İncele</span>
          </TravelDropdownMenuItem>
        )}

        {detailHref && (
          <TravelDropdownMenuItem asChild className="cursor-pointer gap-2 text-xs">
            <Link href={detailHref}>
              <ExternalLink className="w-3.5 h-3.5 text-[#F5F1E8]/50" />
              <span>Tam Detayı Aç</span>
            </Link>
          </TravelDropdownMenuItem>
        )}

        {onCopyId && (
          <TravelDropdownMenuItem onClick={onCopyId} className="cursor-pointer gap-2 text-xs">
            <Copy className="w-3.5 h-3.5 text-[#F5F1E8]/50" />
            <span>ID Kopyala</span>
          </TravelDropdownMenuItem>
        )}

        {children && (
          <>
            <TravelDropdownMenuSeparator />
            {children}
          </>
        )}
      </TravelDropdownMenuContent>
    </TravelDropdownMenu>
  );
}
