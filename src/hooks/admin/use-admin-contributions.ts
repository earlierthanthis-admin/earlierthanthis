'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import adminService from '@/src/services/admin.service';
import type { UpdateContributionSettingsRequest } from '@/src/types';

export const ADMIN_CONTRIBUTION_SETTINGS_QUERY_KEY = [
  'admin',
  'contribution-settings',
];

export function useContributionSettings() {
  return useQuery({
    queryKey: ADMIN_CONTRIBUTION_SETTINGS_QUERY_KEY,
    queryFn: () => adminService.getContributionSettings(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateContributionSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateContributionSettingsRequest) =>
      adminService.updateContributionSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_CONTRIBUTION_SETTINGS_QUERY_KEY,
      });
    },
  });
}
