import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Auth endpoints that should not trigger redirect on 401
const authEndpoints = ['/auth/login', '/auth/signup', '/auth/google'];

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';

    const requestUrl = error.config?.url || '';
    const isAuthEndpoint = authEndpoints.some((endpoint) =>
      requestUrl.includes(endpoint),
    );

    // Handle 401 Unauthorized - but not for auth endpoints
    if (error.response?.status === 401 && !isAuthEndpoint) {
      Cookies.remove('token');
      Cookies.remove('userId');
      Cookies.remove('role');
      // Redirect to login for protected routes only
      if (typeof window !== 'undefined') {
        const isAdminRoute =
          requestUrl.includes('/admin') ||
          window.location.pathname.startsWith('/admin');
        window.location.href = isAdminRoute ? '/admin-login' : '/login';
      }
    }

    return Promise.reject(new Error(message));
  },
);

export default apiClient;
