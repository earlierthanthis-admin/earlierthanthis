import Cookies from 'js-cookie';

import type {
  AdminCountry,
  AdminEssay,
  AdminListItem,
  AdminLoginRequest,
  AdminLoginResponse,
  AdminProfileUpdateRequest,
  AdminRole,
  AdminSignupRequest,
  AdminSignupResponse,
  AdminUser,
  AnalyticsData,
  ContributionSettings,
  CreateEssayRequest,
  CreateSubRegionRequest,
  DashboardStats,
  PendingAdminRequest,
  UpdateContributionSettingsRequest,
  UpdateCountryRequest,
  UpdateEssayRequest,
  UpdateSubRegionRequest,
  UploadResponse,
} from '@/src/types';

import apiClient from './api-client';

// Cookie helper functions
const isProduction = process.env.NODE_ENV === 'production';

const setAdminAuthCookies = (
  token: string,
  userId: string,
  role: AdminRole,
) => {
  Cookies.set('token', token, {
    expires: 7,
    secure: isProduction,
    sameSite: 'lax',
  });
  Cookies.set('userId', userId, {
    expires: 7,
    secure: isProduction,
    sameSite: 'lax',
  });
  Cookies.set('role', role, {
    expires: 7,
    secure: isProduction,
    sameSite: 'lax',
  });
};

const clearAdminAuthCookies = () => {
  Cookies.remove('token');
  Cookies.remove('userId');
  Cookies.remove('role');
};

const adminService = {
  // ==================== Authentication ====================

  // Admin login
  login: async (data: AdminLoginRequest): Promise<AdminLoginResponse> => {
    const response = await apiClient.post<AdminLoginResponse>(
      '/auth/admin/login',
      data,
    );
    return response.data;
  },

  // Admin signup request (email only)
  signupRequest: async (
    data: AdminSignupRequest,
  ): Promise<AdminSignupResponse> => {
    const response = await apiClient.post<AdminSignupResponse>(
      '/auth/admin/signup-request',
      data,
    );
    return response.data;
  },

  // Admin logout
  logout: async (): Promise<void> => {
    clearAdminAuthCookies();
  },

  // Check admin authentication
  checkAuthentication: async (): Promise<{
    isAuthenticated: boolean;
    role: AdminRole | null;
  }> => {
    const token = Cookies.get('token');
    const role = Cookies.get('role') as AdminRole | undefined;

    if (!token || !role) {
      return { isAuthenticated: false, role: null };
    }

    // Verify token is valid by making a test request
    try {
      await apiClient.post('/auth/check-token');
      return { isAuthenticated: true, role };
    } catch {
      clearAdminAuthCookies();
      return { isAuthenticated: false, role: null };
    }
  },

  // Get current admin profile
  getProfile: async (): Promise<AdminUser> => {
    const response = await apiClient.get<AdminUser>('/admin/profile');
    return response.data;
  },

  // Update admin profile
  updateProfile: async (
    data: AdminProfileUpdateRequest,
  ): Promise<AdminUser> => {
    const response = await apiClient.put<AdminUser>('/admin/profile', data);
    return response.data;
  },

  // ==================== Dashboard Analytics ====================

  // Get dashboard stats
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>(
      '/admin/analytics/stats',
    );
    return response.data;
  },

  // Get full analytics data
  getAnalytics: async (): Promise<AnalyticsData> => {
    const response = await apiClient.get<AnalyticsData>('/admin/analytics');
    return response.data;
  },

  // ==================== Countries Management ====================

  // Get all countries
  getCountries: async (): Promise<AdminCountry[]> => {
    const response = await apiClient.get<AdminCountry[]>('/admin/countries');
    return response.data;
  },

  // Get single country
  getCountry: async (id: string): Promise<AdminCountry> => {
    const response = await apiClient.get<AdminCountry>(
      `/admin/countries/${id}`,
    );
    return response.data;
  },

  // Update country
  updateCountry: async (
    id: string,
    data: UpdateCountryRequest,
  ): Promise<AdminCountry> => {
    const response = await apiClient.put<AdminCountry>(
      `/admin/countries/${id}`,
      data,
    );
    return response.data;
  },

  // Add sub-region to country
  addSubRegion: async (
    countryId: string,
    data: CreateSubRegionRequest,
  ): Promise<AdminCountry> => {
    const response = await apiClient.post<AdminCountry>(
      `/admin/countries/${countryId}/sub-regions`,
      data,
    );
    return response.data;
  },

  // Update sub-region
  updateSubRegion: async (
    countryId: string,
    subRegionId: string,
    data: UpdateSubRegionRequest,
  ): Promise<AdminCountry> => {
    const response = await apiClient.put<AdminCountry>(
      `/admin/countries/${countryId}/sub-regions/${subRegionId}`,
      data,
    );
    return response.data;
  },

  // Delete sub-region
  deleteSubRegion: async (
    countryId: string,
    subRegionId: string,
  ): Promise<void> => {
    await apiClient.delete(
      `/admin/countries/${countryId}/sub-regions/${subRegionId}`,
    );
  },

  // ==================== Essays Management ====================

  // Get all essays
  getEssays: async (parameters?: {
    countryId?: string;
    year?: number;
  }): Promise<AdminEssay[]> => {
    const response = await apiClient.get<AdminEssay[]>('/admin/essays', {
      params: parameters,
    });
    return response.data;
  },

  // Get single essay
  getEssay: async (id: string): Promise<AdminEssay> => {
    const response = await apiClient.get<AdminEssay>(`/admin/essays/${id}`);
    return response.data;
  },

  // Create essay
  createEssay: async (data: CreateEssayRequest): Promise<AdminEssay> => {
    const response = await apiClient.post<AdminEssay>('/admin/essays', data);
    return response.data;
  },

  // Update essay
  updateEssay: async (
    id: string,
    data: UpdateEssayRequest,
  ): Promise<AdminEssay> => {
    const response = await apiClient.put<AdminEssay>(
      `/admin/essays/${id}`,
      data,
    );
    return response.data;
  },

  // Delete essay
  deleteEssay: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/essays/${id}`);
  },

  // ==================== Contribution Settings ====================

  // Get contribution settings
  getContributionSettings: async (): Promise<ContributionSettings> => {
    const response = await apiClient.get<ContributionSettings>(
      '/admin/contribution-settings',
    );
    return response.data;
  },

  // Update contribution settings
  updateContributionSettings: async (
    data: UpdateContributionSettingsRequest,
  ): Promise<ContributionSettings> => {
    const response = await apiClient.put<ContributionSettings>(
      '/admin/contribution-settings',
      data,
    );
    return response.data;
  },

  // ==================== File Upload ====================

  // Upload image
  uploadImage: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<UploadResponse>(
      '/admin/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },

  // ==================== Admin Management (Super Admin) ====================

  // Get all admins
  getAllAdmins: async (): Promise<AdminListItem[]> => {
    const response = await apiClient.get<AdminListItem[]>('/admin/admins');
    return response.data;
  },

  // Get pending admin requests
  getPendingRequests: async (): Promise<PendingAdminRequest[]> => {
    const response = await apiClient.get<PendingAdminRequest[]>(
      '/admin/admins/pending',
    );
    return response.data;
  },

  // Promote admin to super admin
  promoteAdmin: async (adminId: string): Promise<AdminListItem> => {
    const response = await apiClient.post<AdminListItem>(
      `/admin/admins/${adminId}/promote`,
    );
    return response.data;
  },

  // Demote super admin to admin
  demoteAdmin: async (adminId: string): Promise<AdminListItem> => {
    const response = await apiClient.post<AdminListItem>(
      `/admin/admins/${adminId}/demote`,
    );
    return response.data;
  },

  // Revoke admin access
  revokeAdmin: async (adminId: string): Promise<void> => {
    await apiClient.delete(`/admin/admins/${adminId}`);
  },

  // Helper functions for cookies
  setAdminAuthCookies,
  clearAdminAuthCookies,
  getToken: () => Cookies.get('token'),
  getUserId: () => Cookies.get('userId'),
  getRole: () => Cookies.get('role') as AdminRole | undefined,
};

export default adminService;
