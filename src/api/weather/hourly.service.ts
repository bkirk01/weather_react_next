import { DailyEvolutionData } from '@/components/DailyEvolution/DailyEvolution.types';

import axiosInstance from '../axios';

export class HourlyForecastService {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY || '';
  }

  async get24HourForecast(locationKey: string): Promise<DailyEvolutionData[]> {
    try {
      const response = await axiosInstance.get(
        `/forecasts/v1/hourly/12hour/${locationKey}?apikey=${this.apiKey}&metric=true&details=true`
      );

      if (!response.data) {
        throw new Error('No hourly forecast data available');
      }

      return response.data.slice(0, 5).map((hour: any) => ({
        hour: new Date(hour.DateTime).getHours(),
        temperature: hour.Temperature.Value,
      }));
    } catch (error) {
      console.error('Error fetching hourly forecast:', error);
      throw error;
    }
  }
}
