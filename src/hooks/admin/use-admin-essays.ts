'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import adminService from '@/src/services/admin.service';
import type { CreateEssayRequest, UpdateEssayRequest } from '@/src/types';

export const ADMIN_ESSAYS_QUERY_KEY = ['admin', 'essays'];

export function useAdminEssays(parameters?: {
  countryId?: string;
  year?: number;
}) {
  return useQuery({
    queryKey: [...ADMIN_ESSAYS_QUERY_KEY, parameters],
    queryFn: () => adminService.getEssays(parameters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAdminEssay(id: string) {
  return useQuery({
    queryKey: [...ADMIN_ESSAYS_QUERY_KEY, id],
    queryFn: () => adminService.getEssay(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateEssay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEssayRequest) => adminService.createEssay(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_ESSAYS_QUERY_KEY });
    },
  });
}

export function useUpdateEssay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEssayRequest }) =>
      adminService.updateEssay(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_ESSAYS_QUERY_KEY });
    },
  });
}

export function useDeleteEssay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminService.deleteEssay(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_ESSAYS_QUERY_KEY });
    },
  });
}
