// Common weather-related types and interfaces
export type TCurrentLocationUnitType = 'C' | 'F';

export interface ILocationWeatherResponse {
  location: string;
  locationKey: string;
  temperature: number;
  temperatureC: number;
  temperatureF: number;
  description: string;
}

export interface IWeatherState {
  data: ILocationWeatherResponse | null;
  loading: boolean;
  error: string | null;
}
