'use client';

import { useQuery } from '@tanstack/react-query';

import { timelineService } from '@/src/services';

export const TIMELINE_QUERY_KEY = ['timeline', 'country'];

export function useCountryTimeline(countryId: string | null) {
  const query = useQuery({
    queryKey: [...TIMELINE_QUERY_KEY, countryId],
    queryFn: () => {
      if (!countryId) return null;
      return timelineService.getCountryTimeline(countryId);
    },
    enabled: !!countryId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    timeline: query.data,
    country: query.data?.country ?? null,
    events: query.data?.events ?? [],
    totalEssays: query.data?.totalEssays ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

// Hook for fetching a single country
export function useCountry(countryId: string | null) {
  const query = useQuery({
    queryKey: ['timeline', 'country', 'single', countryId],
    queryFn: () => {
      if (!countryId) return null;
      return timelineService.getCountryBySlug(countryId);
    },
    enabled: !!countryId,
    staleTime: 10 * 60 * 1000,
  });

  return {
    country: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
