'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { authService } from '@/src/services';
import type { AuthResponse, SignupRequest } from '@/src/types';

interface UseSignupOptions {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
}

export function useSignup(options: UseSignupOptions = {}) {
  const router = useRouter();
  const { onSuccess, onError } = options;

  return useMutation({
    mutationFn: (data: SignupRequest) => authService.signup(data),
    onSuccess: (data, variables) => {
      // Call custom onSuccess if provided
      onSuccess?.(data);

      // Redirect to email-sent page with email for display
      // Don't set auth cookies yet - user needs to verify email first
      router.push(`/email-sent?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
}
