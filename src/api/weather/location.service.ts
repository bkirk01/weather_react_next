import {
  AccuWeatherLocationResponse,
  AccuWeatherCurrentResponse,
} from '@/types/accuweather.types';
import { ICity } from '@/types/components/CitySearch.types';
import { ILocationWeatherResponse, TCurrentLocationUnitType } from '@/types/weather.types';

import axiosInstance from '@/api/axios';

/**
 * Location Weather Service
 *
 * Handles all location-based weather operations including:
 * - Fetching weather data by coordinates
 * - Retrieving current conditions
 * - Getting weather by location key
 * - Formatting weather responses
 *
 * This service acts as the main interface between the application and the AccuWeather API
 * for location-specific weather data.
 */

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

  async getWeatherByLocationKey(locationKey: string): Promise<ILocationWeatherResponse> {
    try {
      const response = await axiosInstance.get(`/locations/v1/${locationKey}`);

      if (!response.data) {
        throw new Error('Location not found');
      }

      const conditions = await this.getCurrentConditions(locationKey);

      return this.formatWeatherResponse(
        conditions,
        {
          Key: locationKey,
          LocalizedName: response.data.LocalizedName,
          Country: response.data.Country,
          GeoPosition: response.data.GeoPosition,
        },
        'C' // Default to Celsius
      );
    } catch (error) {
      console.error('Error fetching weather by location key:', error);
      throw error;
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
