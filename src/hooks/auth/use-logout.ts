'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { authService } from '@/src/services';

interface UseLogoutOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
}

export function useLogout(options: UseLogoutOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { onSuccess, onError, redirectTo = '/login' } = options;

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear all cached queries
      queryClient.clear();

      // Call custom onSuccess if provided
      onSuccess?.();

      // Redirect to login or specified route
      router.push(redirectTo);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
}
