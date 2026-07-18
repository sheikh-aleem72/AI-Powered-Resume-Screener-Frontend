// Token storage and management utilities
// Centralized token handling - components never manually attach headers

const TOKEN_KEYS = {
  ACCESS: "accessToken",
  REFRESH: "refreshToken",
  USER: "user",
} as const;

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  organization?: string;
  premium?: string;
}

export const tokenUtils = {
  setTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem(TOKEN_KEYS.ACCESS, accessToken);
    localStorage.setItem(TOKEN_KEYS.REFRESH, refreshToken);
  },

  getAccessToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEYS.ACCESS);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEYS.REFRESH);
  },

  setUser: (user: User): void => {
    localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const user = localStorage.getItem(TOKEN_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  clearAuth: (): void => {
    localStorage.removeItem(TOKEN_KEYS.ACCESS);
    localStorage.removeItem(TOKEN_KEYS.REFRESH);
    localStorage.removeItem(TOKEN_KEYS.USER);
  },

  isAuthenticated: (): boolean => {
    return !!tokenUtils.getAccessToken() && !!tokenUtils.getRefreshToken();
  },
};
