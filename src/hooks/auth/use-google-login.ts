'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { authService } from '@/src/services';
import type { AuthResponse, GoogleAuthRequest } from '@/src/types';

interface UseGoogleLoginOptions {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
}

export function useGoogleLogin(options: UseGoogleLoginOptions = {}) {
  const router = useRouter();
  const { onSuccess, onError, redirectTo = '/' } = options;

  return useMutation({
    mutationFn: (data: GoogleAuthRequest) => authService.googleLogin(data),
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
