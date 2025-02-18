import axiosInstance from '@/api/axios';
import { DailyEvolutionData } from '@/types/components/DailyEvolution.types';
import { IHourlyWeather } from '@/types/weather.types';

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

      return response.data.slice(0, 5).map((hour: IHourlyWeather) => ({
        hour: new Date(hour.DateTime).getHours(),
        temperature: hour.Temperature.Value,
      }));
    } catch (error) {
      console.error('Error fetching hourly forecast:', error);
      throw error;
    }
  }
}
