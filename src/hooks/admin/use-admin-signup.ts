'use client';

import { useMutation } from '@tanstack/react-query';

import adminService from '@/src/services/admin.service';
import type { AdminSignupRequest, AdminSignupResponse } from '@/src/types';

interface UseAdminSignupOptions {
  onSuccess?: (data: AdminSignupResponse) => void;
  onError?: (error: Error) => void;
}

export function useAdminSignup(options: UseAdminSignupOptions = {}) {
  const { onSuccess, onError } = options;

  return useMutation({
    mutationFn: (data: AdminSignupRequest) => adminService.signupRequest(data),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
}
