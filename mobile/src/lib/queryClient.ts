/**
 * TRAVIA DUBAI — TanStack Query Client
 */
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes cache
      retry: 2,
      refetchOnWindowFocus: false, // Mobile doesn't have window focus
    },
    mutations: {
      retry: 1,
    },
  },
});
