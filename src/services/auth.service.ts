import Cookies from 'js-cookie';

import type {
  AuthResponse,
  GoogleAuthRequest,
  LoginRequest,
  PasswordResetResponse,
  RequestPasswordResetRequest,
  ResetPasswordRequest,
  SignupRequest,
} from '@/src/types';

import apiClient from './api-client';

// Cookie helper functions
const isProduction = process.env.NODE_ENV === 'production';

const setAuthCookies = (token: string, userId: string, userName?: string) => {
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
  if (userName) {
    Cookies.set('userName', userName, {
      expires: 7,
      secure: isProduction,
      sameSite: 'lax',
    });
  }
};

const clearAuthCookies = () => {
  Cookies.remove('token');
  Cookies.remove('userId');
  Cookies.remove('userName');
  Cookies.remove('role');
};

const authService = {
  // Login with email and password
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  // Signup with email and password
  signup: async (
    data: SignupRequest,
    authTypeName: string = 'local',
  ): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      `/auth/signup?authTypeName=${authTypeName}`,
      data,
    );
    return response.data;
  },

  // Google login
  googleLogin: async (data: GoogleAuthRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      '/auth/google-login',
      data,
    );
    return response.data;
  },

  // Google signup
  googleSignup: async (data: GoogleAuthRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      '/auth/google/signup',
      data,
    );
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    clearAuthCookies();
  },

  // Check if user is authenticated
  checkAuthentication: async (): Promise<boolean> => {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('User not authenticated');
    }
    return true;
  },

  // Request password reset
  requestPasswordReset: async (
    data: RequestPasswordResetRequest,
  ): Promise<PasswordResetResponse> => {
    const response = await apiClient.post<PasswordResetResponse>(
      '/auth/request-password-reset',
      data,
    );
    return response.data;
  },

  // Reset password
  resetPassword: async (
    data: ResetPasswordRequest,
  ): Promise<PasswordResetResponse> => {
    const response = await apiClient.post<PasswordResetResponse>(
      '/auth/reset-password',
      { password: data.password },
      { params: { token: data.token } },
    );
    return response.data;
  },

  // Resend verification email
  resendVerificationEmail: async (
    email: string,
  ): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      '/auth/resend-verification-email',
      { email },
    );
    return response.data;
  },

  // Helper functions for cookies
  setAuthCookies,
  clearAuthCookies,
  getToken: () => Cookies.get('token'),
  getUserId: () => Cookies.get('userId'),
  getUserName: () => Cookies.get('userName'),
};

export default authService;
