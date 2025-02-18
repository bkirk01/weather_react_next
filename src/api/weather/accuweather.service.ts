import { ICity } from '@/types/components/CitySearch.types';

import axiosInstance from '@/api/axios';

export class AccuWeatherService {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY || '';
  }

  async searchCities(query: string): Promise<ICity[]> {
    try {
      const response = await axiosInstance.get(
        `/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${query}`
      );
      return response.data;
    } catch (error) {
      console.error('Error searching cities:', error);
      throw error;
    }
  }

  // Add other weather-related methods here
}
