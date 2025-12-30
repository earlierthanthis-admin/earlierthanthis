'use client';

import { useMutation } from '@tanstack/react-query';

import { authService } from '@/src/services';

interface UseResendVerificationEmailOptions {
  onSuccess?: (data: { message: string }) => void;
  onError?: (error: Error) => void;
}

export function useResendVerificationEmail(
  options: UseResendVerificationEmailOptions = {},
) {
  const { onSuccess, onError } = options;

  return useMutation({
    mutationFn: (email: string) => authService.resendVerificationEmail(email),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
}
