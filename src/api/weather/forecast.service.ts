import { IForecastDay } from '@/types/weather.types';

import axiosInstance from '../axios';
import { AccuWeatherForecastResponse } from '../mappers/types/accuweather.types';
import { WeatherMapper } from '../mappers/weather.mapper';

export class ForecastService {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY || '';
  }

  async getFiveDayForecast(locationKey: string): Promise<IForecastDay[]> {
    try {
      const response = await axiosInstance.get<AccuWeatherForecastResponse>(
        `/forecasts/v1/daily/5day/${locationKey}?apikey=${this.apiKey}&metric=true&details=true`
      );
      return WeatherMapper.mapForecast(response.data);
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }
}
