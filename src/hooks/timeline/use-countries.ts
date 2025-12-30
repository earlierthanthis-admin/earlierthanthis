'use client';

import { useQuery } from '@tanstack/react-query';

import { timelineService } from '@/src/services';
import type { Country, SidebarSortOption } from '@/src/types';

export const COUNTRIES_QUERY_KEY = ['timeline', 'countries'];

// Era order for sorting
const eraOrder = [
  'Ancient',
  'Medieval',
  'EarlyModern',
  'Modern',
  'Contemporary',
];

export function useCountries(sortOption: SidebarSortOption = 'alphabetical') {
  const query = useQuery({
    queryKey: [...COUNTRIES_QUERY_KEY, sortOption],
    queryFn: async () => {
      const countries = await timelineService.getAllCountries();
      return sortCountries(countries, sortOption);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    countries: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

function sortCountries(
  countries: Country[],
  sortOption: SidebarSortOption,
): Country[] {
  const sorted = [...countries];

  switch (sortOption) {
    case 'alphabetical':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case 'byRegion':
      return sorted.sort((a, b) => {
        const regionCompare = a.region.localeCompare(b.region);
        return regionCompare !== 0
          ? regionCompare
          : a.name.localeCompare(b.name);
      });

    case 'byHistoricalEra': {
      return sorted.sort((a, b) => {
        const aEraIndex = Math.min(
          ...a.historicalEras.map((era) => eraOrder.indexOf(era)),
        );
        const bEraIndex = Math.min(
          ...b.historicalEras.map((era) => eraOrder.indexOf(era)),
        );
        return aEraIndex !== bEraIndex
          ? aEraIndex - bEraIndex
          : a.name.localeCompare(b.name);
      });
    }

    default:
      return sorted;
  }
}

// Hook for grouped countries by region
export function useCountriesByRegion() {
  const query = useQuery({
    queryKey: [...COUNTRIES_QUERY_KEY, 'byRegion', 'grouped'],
    queryFn: () => timelineService.getCountriesByRegionGrouped(),
    staleTime: 10 * 60 * 1000,
  });

  return {
    countriesByRegion: query.data ?? {},
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

// Hook for grouped countries by era
export function useCountriesByEra() {
  const query = useQuery({
    queryKey: [...COUNTRIES_QUERY_KEY, 'byEra', 'grouped'],
    queryFn: () => timelineService.getCountriesByEraGrouped(),
    staleTime: 10 * 60 * 1000,
  });

  return {
    countriesByEra: query.data ?? {},
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
