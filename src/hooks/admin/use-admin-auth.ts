'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import adminService from '@/src/services/admin.service';

export const ADMIN_AUTH_QUERY_KEY = ['admin', 'auth', 'status'];

export function useAdminAuth() {
  // Check if we have a token before making the API call
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    setHasToken(!!adminService.getToken());
  }, []);

  const query = useQuery({
    queryKey: ADMIN_AUTH_QUERY_KEY,
    queryFn: () => adminService.checkAuthentication(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: hasToken === true, // Only run query if we have a token
  });

  // Still checking for token on client
  if (hasToken === null) {
    return {
      isAuthenticated: false,
      role: null,
      isSuperAdmin: false,
      isLoading: true,
      isError: false,
      error: null,
      token: null,
      userId: null,
    };
  }

  // If no token, we're definitely not authenticated
  if (!hasToken) {
    return {
      isAuthenticated: false,
      role: null,
      isSuperAdmin: false,
      isLoading: false,
      isError: false,
      error: null,
      token: null,
      userId: null,
    };
  }

  const isAuthenticated = query.data?.isAuthenticated ?? false;
  const role = query.data?.role ?? null;
  const isSuperAdmin = role === 'super_admin';

  return {
    isAuthenticated,
    role,
    isSuperAdmin,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    token: adminService.getToken(),
    userId: adminService.getUserId(),
  };
}
