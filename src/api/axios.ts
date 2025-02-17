import axios from 'axios';

import { rateLimiter } from './security/rateLimiter';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async config => {
    if (rateLimiter.isLimitExceeded()) {
      throw new Error('API rate limit exceeded. Please wait before making more requests.');
    }
    rateLimiter.incrementCounter();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.message === 'API rate limit exceeded. Please wait before making more requests.') {
      // Handle rate limit error
      console.error('Rate limit exceeded:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
