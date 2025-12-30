'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { authService } from '@/src/services';
import type { AuthResponse, LoginRequest } from '@/src/types';

interface UseLoginOptions {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
}

export function useLogin(options: UseLoginOptions = {}) {
  const router = useRouter();
  const { onSuccess, onError, redirectTo = '/' } = options;

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (data, variables) => {
      // Check if user is verified (backend returns is_verified in user object)
      const isVerified = data.user?.is_verified;
      if (isVerified === false) {
        // Redirect to email-sent page if not verified
        router.push(`/email-sent?email=${encodeURIComponent(variables.email)}`);
        return;
      }

      // Set auth cookies with user name
      const userName = data.user?.fullName;
      authService.setAuthCookies(data.token, data.userId, userName);

      // Call custom onSuccess if provided
      onSuccess?.(data);

      // Redirect to landing page or specified route
      router.push(redirectTo);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
}
