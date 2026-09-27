// src/api/types.ts
// API response wrapper types.

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedApiResponse<T> {
  results: T[];
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
  detail?: string;
  errors?: Record<string, string[]>;
}

export interface TokenPair {
  access: string;
  refresh: string;
}
