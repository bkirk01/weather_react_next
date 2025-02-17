import { IWeatherLocation } from '@/api/weather/types';

// Common weather-related types and interfaces
export type TCurrentLocationUnitType = 'C' | 'F';

export interface ITemperature {
  celsius: number;
  fahrenheit: number;
}
export interface ILocationWeatherResponse {
  location: string;
  locationKey: string;
  temperature: number;
  temperatureC: number;
  temperatureF: number;
  description: string;
}

export interface IWeatherIcon {
  src: string;
  description: string;
}

export interface ICurrentWeather {
  temperature: ITemperature;
  description: string;
  timestamp: string;
  humidity: number;
  windSpeed: {
    metric: number;
    imperial: number;
  };
  pressure: {
    metric: number;
    imperial: number;
  };
  visibility: {
    metric: number;
    imperial: number;
  };
}

export interface IWeatherResponse {
  location: IWeatherLocation;
  current: ICurrentWeather;
  forecast?: IForecastDay[];
}
export interface IWeatherState {
  data: ILocationWeatherResponse | null;
  loading: boolean;
  error: string | null;
  selectedUnit: TCurrentLocationUnitType;
}
export interface IForecastDay {
  date: string;
  temperature: {
    min: ITemperature;
    max: ITemperature;
  };
  description: string;
  dayIcon: number;
  nightIcon: number;
  precipitation: {
    probability: number;
    type: string;
  };
}
