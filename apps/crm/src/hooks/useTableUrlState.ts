'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export function useTableUrlState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchQuery = searchParams.get('q') || '';
  const pageIndex = Math.max(0, parseInt(searchParams.get('page') || '1', 10) - 1);
  const pageSize = parseInt(searchParams.get('limit') || '20', 10);
  const viewMode = searchParams.get('view') || undefined;

  const updateUrl = useCallback(
    (paramsToUpdate: Record<string, string | null | undefined>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(paramsToUpdate).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      const search = current.toString();
      const query = search ? `?${search}` : '';
      router.replace(`${pathname}${query}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const setSearchQuery = useCallback(
    (q: string) => {
      updateUrl({ q: q || null, page: '1' });
    },
    [updateUrl]
  );

  const setPage = useCallback(
    (page: number) => {
      updateUrl({ page: String(page + 1) });
    },
    [updateUrl]
  );

  const setPageSize = useCallback(
    (size: number) => {
      updateUrl({ limit: String(size), page: '1' });
    },
    [updateUrl]
  );

  const setViewMode = useCallback(
    (view: string) => {
      updateUrl({ view });
    },
    [updateUrl]
  );

  return useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      pageIndex,
      setPage,
      pageSize,
      setPageSize,
      viewMode,
      setViewMode,
      updateUrl,
      searchParams,
    }),
    [
      searchQuery,
      setSearchQuery,
      pageIndex,
      setPage,
      pageSize,
      setPageSize,
      viewMode,
      setViewMode,
      updateUrl,
      searchParams,
    ]
  );
}
