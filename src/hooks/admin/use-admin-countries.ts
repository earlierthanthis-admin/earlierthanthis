'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import adminService from '@/src/services/admin.service';
import type {
  CreateSubRegionRequest,
  UpdateCountryRequest,
  UpdateSubRegionRequest,
} from '@/src/types';

export const ADMIN_COUNTRIES_QUERY_KEY = ['admin', 'countries'];

export function useAdminCountries() {
  return useQuery({
    queryKey: ADMIN_COUNTRIES_QUERY_KEY,
    queryFn: () => adminService.getCountries(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAdminCountry(id: string) {
  return useQuery({
    queryKey: [...ADMIN_COUNTRIES_QUERY_KEY, id],
    queryFn: () => adminService.getCountry(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateCountry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCountryRequest }) =>
      adminService.updateCountry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_COUNTRIES_QUERY_KEY });
    },
  });
}

export function useAddSubRegion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      countryId,
      data,
    }: {
      countryId: string;
      data: CreateSubRegionRequest;
    }) => adminService.addSubRegion(countryId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_COUNTRIES_QUERY_KEY });
    },
  });
}

export function useUpdateSubRegion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      countryId,
      subRegionId,
      data,
    }: {
      countryId: string;
      subRegionId: string;
      data: UpdateSubRegionRequest;
    }) => adminService.updateSubRegion(countryId, subRegionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_COUNTRIES_QUERY_KEY });
    },
  });
}

export function useDeleteSubRegion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      countryId,
      subRegionId,
    }: {
      countryId: string;
      subRegionId: string;
    }) => adminService.deleteSubRegion(countryId, subRegionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_COUNTRIES_QUERY_KEY });
    },
  });
}
