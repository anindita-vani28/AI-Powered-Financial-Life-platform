import api from './api';
import { User, AuthResponse } from '@/types';

const safeStorage = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.removeItem(key);
  },
};

export const authService = {
  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const { data } = await api.post('/auth/register', {
      email,
      password,
      name,
    });
    if (data.token) {
      safeStorage.setItem('token', data.token);
      if (data.refreshToken) {
        safeStorage.setItem('refreshToken', data.refreshToken);
      }
    }
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post('/auth/login', {
      email,
      password,
    });
    if (data.token) {
      safeStorage.setItem('token', data.token);
      if (data.refreshToken) {
        safeStorage.setItem('refreshToken', data.refreshToken);
      }
    }
    return data;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
    safeStorage.removeItem('token');
    safeStorage.removeItem('refreshToken');
  },

  async getCurrentUser(): Promise<User> {
    const { data } = await api.get('/auth/me');
    return data;
  },

  async refreshToken(): Promise<string> {
    const refreshToken = safeStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const { data } = await api.post('/auth/refresh', {
      refreshToken,
    });

    if (data.token) {
      safeStorage.setItem('token', data.token);
    }
    return data.token;
  },

  async requestPasswordReset(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await api.post('/auth/reset-password', {
      token,
      password,
    });
  },

  async verifyEmail(token: string): Promise<void> {
    await api.post('/auth/verify-email', { token });
  },

  getToken(): string | null {
    return safeStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
