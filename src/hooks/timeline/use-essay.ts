'use client';

import { useQuery } from '@tanstack/react-query';

import { timelineService } from '@/src/services';

export const ESSAY_QUERY_KEY = ['timeline', 'essay'];

// Hook for fetching a single essay by ID
export function useEssay(essayId: string | null) {
  const query = useQuery({
    queryKey: [...ESSAY_QUERY_KEY, essayId],
    queryFn: () => {
      if (!essayId) return null;
      return timelineService.getEssay(essayId);
    },
    enabled: !!essayId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    essay: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

// Hook for fetching essays for a specific year
export function useEssaysForYear(
  countryId: string | null,
  year: number | null,
) {
  const query = useQuery({
    queryKey: [...ESSAY_QUERY_KEY, 'year', countryId, year],
    queryFn: () => {
      if (!countryId || year === null) return [];
      return timelineService.getEssaysForYear(countryId, year);
    },
    enabled: !!countryId && year !== null,
    staleTime: 5 * 60 * 1000,
  });

  return {
    essays: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

// Hook for fetching the first essay of a year (for direct navigation)
export function useFirstEssayForYear(
  countryId: string | null,
  year: number | null,
) {
  const query = useQuery({
    queryKey: [...ESSAY_QUERY_KEY, 'first', countryId, year],
    queryFn: () => {
      if (!countryId || year === null) return null;
      return timelineService.getFirstEssayForYear(countryId, year);
    },
    enabled: !!countryId && year !== null,
    staleTime: 5 * 60 * 1000,
  });

  return {
    essay: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
