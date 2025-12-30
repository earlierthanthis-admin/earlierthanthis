'use client';

import { useQuery } from '@tanstack/react-query';

import adminService from '@/src/services/admin.service';

export const ADMIN_ANALYTICS_QUERY_KEY = ['admin', 'analytics'];
export const ADMIN_STATS_QUERY_KEY = ['admin', 'stats'];

export function useAdminAnalytics() {
  return useQuery({
    queryKey: ADMIN_ANALYTICS_QUERY_KEY,
    queryFn: () => adminService.getAnalytics(),
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ADMIN_STATS_QUERY_KEY,
    queryFn: () => adminService.getStats(),
    staleTime: 60 * 1000, // 1 minute
  });
}
