import axios, { AxiosError } from 'axios';

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

    try {
      // Ensure API key is included in all requests
      const url = new URL(config.url || '', config.baseURL);
      const apiKey = process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY;

      if (!apiKey) {
        throw new Error('API key is missing');
      }

      if (!url.searchParams.has('apikey')) {
        url.searchParams.append('apikey', apiKey);
        config.url = url.pathname + url.search;
      }

      rateLimiter.incrementCounter();
      return config;
    } catch (error) {
      throw new Error('Invalid request configuration');
    }
  },
  error => {
    return Promise.reject(new Error('Failed to prepare the request. Please try again.'));
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  response => {
    if (!response.data) {
      throw new Error('No data received from the server');
    }
    return response;
  },
  (error: AxiosError) => {
    if (!error.response) {
      // Network error
      if (error.code === 'ECONNABORTED') {
        return Promise.reject(new Error('Request timed out. Please try again.'));
      }
      return Promise.reject(new Error('Network error. Please check your internet connection.'));
    }

    // Handle specific HTTP status codes
    switch (error.response.status) {
      case 400:
        return Promise.reject(new Error('Invalid request. Please check your input.'));
      case 401:
        return Promise.reject(new Error('Invalid API key. Please check your configuration.'));
      case 403:
        return Promise.reject(
          new Error('Access forbidden. Please check your API key permissions.')
        );
      case 404:
        return Promise.reject(new Error('Weather data not found for this location.'));
      case 429:
        return Promise.reject(new Error('API rate limit exceeded. Please try again later.'));
      case 500:
      case 502:
      case 503:
      case 504:
        return Promise.reject(
          new Error('Weather service is temporarily unavailable. Please try again later.')
        );
      default:
        return Promise.reject(new Error('An unexpected error occurred. Please try again.'));
    }
  }
);

export default axiosInstance;
