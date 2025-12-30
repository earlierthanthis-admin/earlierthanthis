'use client';

import { useMutation } from '@tanstack/react-query';

import adminService from '@/src/services/admin.service';
import type { UploadResponse } from '@/src/types';

interface UseImageUploadOptions {
  onSuccess?: (data: UploadResponse) => void;
  onError?: (error: Error) => void;
}

export function useImageUpload(options: UseImageUploadOptions = {}) {
  const { onSuccess, onError } = options;

  return useMutation({
    mutationFn: (file: File) => adminService.uploadImage(file),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
}
