// Auth Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface GoogleAuthRequest {
  code: string;
}

export interface RequestPasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

// Auth Response Types
export interface AuthResponse {
  token: string;
  userId: string;
  user?: {
    fullName: string;
    email: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
  };
}

export interface PasswordResetResponse {
  message: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  isVerified: boolean;
}
