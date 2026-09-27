// src/features/auth/authService.ts
// Handles login/logout via mock API (VITE_ENABLE_MOCK_API=true)
// or real Django REST API.

import apiClient, { tokenStorage } from '../../api/api';
import API from '../../api/endpoints';
import { env } from '../../config/environment';
import type { LoginCredentials, LoginResponse, User } from '../../types';
import { MOCK_CREDENTIALS, MOCK_USERS } from '../../data/mock/users';

// Simulate network delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    if (env.enableMockApi) {
      await delay(800); // simulate latency
      const found = MOCK_CREDENTIALS[credentials.email.toLowerCase()];
      if (!found || found.password !== credentials.password) {
        throw new Error('Invalid email or password');
      }
      const user = MOCK_USERS.find((u) => u.id === found.userId);
      if (!user) throw new Error('User not found');

      const mockToken = `mock.token.${user.id}.${Date.now()}`;
      const mockRefresh = `mock.refresh.${user.id}.${Date.now()}`;

      tokenStorage.setToken(mockToken);
      tokenStorage.setRefresh(mockRefresh);
      if (credentials.rememberMe) {
        localStorage.setItem('bf_remember', 'true');
      }

      return { user, token: mockToken, refreshToken: mockRefresh };
    }

    // Real API
    const { data } = await apiClient.post<{ access: string; refresh: string; user: User }>(
      API.auth.login,
      { email: credentials.email, password: credentials.password },
    );
    tokenStorage.setToken(data.access);
    tokenStorage.setRefresh(data.refresh);
    return { user: data.user, token: data.access, refreshToken: data.refresh };
  },

  async logout(): Promise<void> {
    if (!env.enableMockApi) {
      try {
        const refresh = tokenStorage.getRefresh();
        await apiClient.post(API.auth.logout, { refresh });
      } catch {
        // ignore logout errors
      }
    }
    tokenStorage.clear();
    localStorage.removeItem('bf_remember');
  },

  async getCurrentUser(): Promise<User | null> {
    if (env.enableMockApi) {
      const token = tokenStorage.getToken();
      if (!token) return null;
      // Extract userId from mock token format: mock.token.<userId>.<timestamp>
      const parts = token.split('.');
      const userId = parts[2];
      return MOCK_USERS.find((u) => u.id === userId) ?? null;
    }

    try {
      const { data } = await apiClient.get<User>(API.auth.me);
      return data;
    } catch {
      return null;
    }
  },
};

export default authService;
