'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import adminService from '@/src/services/admin.service';

import { ADMIN_AUTH_QUERY_KEY } from './use-admin-auth';

interface UseAdminLogoutOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
}

export function useAdminLogout(options: UseAdminLogoutOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { onSuccess, onError, redirectTo = '/admin-login' } = options;

  return useMutation({
    mutationFn: () => adminService.logout(),
    onSuccess: () => {
      // Clear auth query cache
      queryClient.invalidateQueries({ queryKey: ADMIN_AUTH_QUERY_KEY });
      queryClient.clear();

      // Call custom onSuccess if provided
      onSuccess?.();

      // Redirect to login page
      router.push(redirectTo);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
}
