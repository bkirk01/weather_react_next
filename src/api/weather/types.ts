export interface ILocationWeatherResponse {
  temperature: number;
  description: string;
  location: string;
  locationKey?: string;
  temperatureC: number;
  temperatureF: number;
}

export interface IWeatherLocation {
  key: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface ICurrentConditionsResponse {
  LocalObservationDateTime: string;
  WeatherText: string;
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
    };
    Imperial: {
      Value: number;
      Unit: string;
    };
  };
}
