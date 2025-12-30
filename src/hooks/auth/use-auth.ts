'use client';

import { useQuery } from '@tanstack/react-query';

import { authService } from '@/src/services';

export const AUTH_QUERY_KEY = ['auth', 'status'];

export function useAuth() {
  const query = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: () => authService.checkAuthentication(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    isAuthenticated: query.data === true,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    token: authService.getToken(),
    userId: authService.getUserId(),
    userName: authService.getUserName(),
  };
}
