import { IApiRateLimiter } from '@/types/api.types';

/**
 * API Rate Limiter
 *
 * Implements client-side rate limiting to prevent API abuse:
 * - Tracks API call frequency
 * - Enforces rate limits
 * - Provides rate limit status
 * - Automatic counter reset
 */

export const API_RATE_LIMIT_CONFIG: IApiRateLimiter = {
  MAX_API_CALLS: 10,
  RESET_INTERVAL: 60000, // 1 minute
};

class RateLimiter {
  private apiCalls: number = 0;
  private resetTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.resetCounter();
  }

  private resetCounter(): void {
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }

    this.resetTimeout = setTimeout(() => {
      this.apiCalls = 0;
      this.resetCounter();
    }, API_RATE_LIMIT_CONFIG.RESET_INTERVAL);
  }

  public incrementCounter(): void {
    this.apiCalls++;
  }

  public isLimitExceeded(): boolean {
    return this.apiCalls >= API_RATE_LIMIT_CONFIG.MAX_API_CALLS;
  }

  public getCurrentCount(): number {
    return this.apiCalls;
  }
}

export const rateLimiter = new RateLimiter();
