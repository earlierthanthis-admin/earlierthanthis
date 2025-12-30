'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import adminService from '@/src/services/admin.service';
import type { AdminProfileUpdateRequest } from '@/src/types';

export const ADMIN_PROFILE_QUERY_KEY = ['admin', 'profile'];

export function useAdminProfile() {
  return useQuery({
    queryKey: ADMIN_PROFILE_QUERY_KEY,
    queryFn: () => adminService.getProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateAdminProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AdminProfileUpdateRequest) =>
      adminService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PROFILE_QUERY_KEY });
    },
  });
}
