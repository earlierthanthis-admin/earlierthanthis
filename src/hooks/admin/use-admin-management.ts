'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import adminService from '@/src/services/admin.service';

export const ADMIN_LIST_QUERY_KEY = ['admin', 'admins'];
export const ADMIN_PENDING_QUERY_KEY = ['admin', 'admins', 'pending'];

// Get all admins (super admin only)
export function useAdminList() {
  return useQuery({
    queryKey: ADMIN_LIST_QUERY_KEY,
    queryFn: () => adminService.getAllAdmins(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get pending admin requests (super admin only)
export function usePendingAdminRequests() {
  return useQuery({
    queryKey: ADMIN_PENDING_QUERY_KEY,
    queryFn: () => adminService.getPendingRequests(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Promote admin to super admin
export function usePromoteAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adminId: string) => adminService.promoteAdmin(adminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_LIST_QUERY_KEY });
    },
  });
}

// Demote super admin to admin
export function useDemoteAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adminId: string) => adminService.demoteAdmin(adminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_LIST_QUERY_KEY });
    },
  });
}

// Revoke admin access
export function useRevokeAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adminId: string) => adminService.revokeAdmin(adminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_LIST_QUERY_KEY });
    },
  });
}
