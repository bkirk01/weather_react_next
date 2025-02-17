// API-related types and interfaces
export interface IApiRateLimiter {
  MAX_API_CALLS: number;
  RESET_INTERVAL: number;
}

export interface IApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
