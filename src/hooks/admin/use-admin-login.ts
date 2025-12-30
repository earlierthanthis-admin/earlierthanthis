'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import adminService from '@/src/services/admin.service';
import type { AdminLoginRequest, AdminLoginResponse } from '@/src/types';

import { ADMIN_AUTH_QUERY_KEY } from './use-admin-auth';

interface UseAdminLoginOptions {
  onSuccess?: (data: AdminLoginResponse) => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
}

export function useAdminLogin(options: UseAdminLoginOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { onSuccess, onError, redirectTo = '/admin/dashboard' } = options;

  return useMutation({
    mutationFn: (data: AdminLoginRequest) => adminService.login(data),
    onSuccess: (data) => {
      // Set auth cookies with role
      adminService.setAdminAuthCookies(data.token, data.userId, data.role);

      // Invalidate auth query to refresh state
      queryClient.invalidateQueries({ queryKey: ADMIN_AUTH_QUERY_KEY });

      // Call custom onSuccess if provided
      onSuccess?.(data);

      // Redirect to dashboard or specified route
      router.push(redirectTo);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
}
