import { ICurrentWeather, IForecastDay, IWeatherResponse } from '@/types/weather.types';

import { IWeatherLocation } from '../weather/types';

import {
  AccuWeatherLocationResponse,
  AccuWeatherCurrentResponse,
  AccuWeatherForecastResponse,
} from './types/accuweather.types';

export class WeatherMapper {
  static mapLocation(data: AccuWeatherLocationResponse): IWeatherLocation {
    return {
      key: data.Key,
      city: data.LocalizedName,
      country: data.Country.LocalizedName,
      latitude: data.GeoPosition.Latitude,
      longitude: data.GeoPosition.Longitude,
    };
  }

  static mapCurrentWeather(data: AccuWeatherCurrentResponse): ICurrentWeather {
    return {
      temperature: {
        celsius: data.Temperature.Metric.Value,
        fahrenheit: data.Temperature.Imperial.Value,
      },
      description: data.WeatherText,
      timestamp: data.LocalObservationDateTime,
      humidity: data.RelativeHumidity,
      windSpeed: {
        metric: data.Wind.Speed.Metric.Value,
        imperial: data.Wind.Speed.Imperial.Value,
      },
      pressure: {
        metric: data.Pressure.Metric.Value,
        imperial: data.Pressure.Imperial.Value,
      },
      visibility: {
        metric: data.Visibility.Metric.Value,
        imperial: data.Visibility.Imperial.Value,
      },
    };
  }

  static mapForecast(data: AccuWeatherForecastResponse): IForecastDay[] {
    return data.DailyForecasts.map(day => ({
      date: day.Date,
      temperature: {
        min: {
          celsius: day.Temperature.Minimum.Value,
          fahrenheit: (day.Temperature.Minimum.Value * 9) / 5 + 32,
        },
        max: {
          celsius: day.Temperature.Maximum.Value,
          fahrenheit: (day.Temperature.Maximum.Value * 9) / 5 + 32,
        },
      },
      description: day.Day.IconPhrase,
      dayIcon: day.Day.Icon,
      nightIcon: day.Night.Icon,
      precipitation: {
        probability: day.Day.PrecipitationProbability,
        type: day.Day.PrecipitationType,
      },
    }));
  }

  static mapWeatherResponse(
    location: AccuWeatherLocationResponse,
    current: AccuWeatherCurrentResponse,
    forecast?: AccuWeatherForecastResponse
  ): IWeatherResponse {
    return {
      location: this.mapLocation(location),
      current: this.mapCurrentWeather(current),
      forecast: forecast ? this.mapForecast(forecast) : undefined,
    };
  }
}
