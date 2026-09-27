// src/config/environment.ts
// Centralized, typed access to all Vite environment variables.
// NEVER import import.meta.env directly in components — use this module.

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
  appName: (import.meta.env.VITE_APP_NAME as string) || 'VitaRossa',
  appVersion: (import.meta.env.VITE_APP_VERSION as string) || '2.0.0',
  appEnv: (import.meta.env.VITE_APP_ENV as string) || 'development',

  // Feature flags
  enableMockApi: import.meta.env.VITE_ENABLE_MOCK_API === 'true',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enableNotifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
  enableWebSockets: import.meta.env.VITE_ENABLE_WEBSOCKETS === 'true',
  enablePayment: import.meta.env.VITE_ENABLE_PAYMENT === 'true',

  // UI flags
  defaultTheme: (import.meta.env.VITE_DEFAULT_THEME as string) || 'dark',
  enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true',

  // Derived helpers
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

export type AppEnv = typeof env;
