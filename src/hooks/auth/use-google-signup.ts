'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { authService } from '@/src/services';
import type { AuthResponse, GoogleAuthRequest } from '@/src/types';

interface UseGoogleSignupOptions {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
}

export function useGoogleSignup(options: UseGoogleSignupOptions = {}) {
  const router = useRouter();
  const { onSuccess, onError, redirectTo = '/' } = options;

  return useMutation({
    mutationFn: (data: GoogleAuthRequest) => authService.googleSignup(data),
    onSuccess: (data) => {
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
