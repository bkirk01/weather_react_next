import {
  AccuWeatherLocationResponse,
  AccuWeatherCurrentResponse,
} from '@/api/mappers/types/accuweather.types';
import { ICity } from '@/types/city.types';
import { ILocationWeatherResponse, TCurrentLocationUnitType } from '@/types/weather.types';

import axiosInstance from '../axios';

export class LocationWeatherService {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY || '';
  }

  async getLocationByCoordinates(
    latitude: number,
    longitude: number
  ): Promise<AccuWeatherLocationResponse> {
    try {
      const response = await axiosInstance.get(
        `/locations/v1/cities/geoposition/search?apikey=${this.apiKey}&q=${latitude},${longitude}&toplevel=true`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching location:', error);
      throw new Error('Failed to fetch location data');
    }
  }

  async getCurrentConditions(locationKey: string): Promise<AccuWeatherCurrentResponse> {
    try {
      const response = await axiosInstance.get(
        `/currentconditions/v1/${locationKey}?apikey=${this.apiKey}&details=true`
      );
      return response.data[0];
    } catch (error) {
      console.error('Error fetching current conditions:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  formatWeatherResponse(
    conditions: AccuWeatherCurrentResponse,
    location: AccuWeatherLocationResponse,
    unit: TCurrentLocationUnitType
  ): ILocationWeatherResponse {
    return {
      location: `${location.LocalizedName}, ${location.Country.LocalizedName}`,
      locationKey: location.Key,
      temperature:
        unit === 'C' ? conditions.Temperature.Metric.Value : conditions.Temperature.Imperial.Value,
      temperatureC: conditions.Temperature.Metric.Value,
      temperatureF: conditions.Temperature.Imperial.Value,
      description: conditions.WeatherText,
    };
  }

  async getWeatherByCity(
    city: ICity,
    unit: TCurrentLocationUnitType
  ): Promise<ILocationWeatherResponse> {
    try {
      const conditions = await this.getCurrentConditions(city.Key);
      return this.formatWeatherResponse(
        conditions,
        {
          Key: city.Key,
          LocalizedName: city.LocalizedName,
          Country: city.Country,
          GeoPosition: {
            Latitude: 0,
            Longitude: 0,
          },
        },
        unit
      );
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      throw new Error('Failed to fetch weather data for selected city');
    }
  }
}
