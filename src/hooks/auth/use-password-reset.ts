'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { authService } from '@/src/services';
import type {
  PasswordResetResponse,
  RequestPasswordResetRequest,
  ResetPasswordRequest,
} from '@/src/types';

interface UseRequestPasswordResetOptions {
  onSuccess?: (data: PasswordResetResponse) => void;
  onError?: (error: Error) => void;
}

interface UseResetPasswordOptions {
  onSuccess?: (data: PasswordResetResponse) => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
}

export function useRequestPasswordReset(
  options: UseRequestPasswordResetOptions = {},
) {
  const { onSuccess, onError } = options;

  return useMutation({
    mutationFn: (data: RequestPasswordResetRequest) =>
      authService.requestPasswordReset(data),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
}

export function useResetPassword(options: UseResetPasswordOptions = {}) {
  const router = useRouter();
  const { onSuccess, onError, redirectTo = '/login' } = options;

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
    onSuccess: (data) => {
      onSuccess?.(data);
      router.push(redirectTo);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
}
