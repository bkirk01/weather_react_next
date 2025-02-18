// AccuWeather Location Response
export interface AccuWeatherLocationResponse {
  Key: string;
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
  GeoPosition: {
    Latitude: number;
    Longitude: number;
  };
}

// AccuWeather Current Conditions Response
export interface AccuWeatherCurrentResponse {
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
  RelativeHumidity: number;
  Wind: {
    Speed: {
      Metric: {
        Value: number;
        Unit: string;
      };
      Imperial: {
        Value: number;
        Unit: string;
      };
    };
  };
  Pressure: {
    Metric: {
      Value: number;
      Unit: string;
    };
    Imperial: {
      Value: number;
      Unit: string;
    };
  };
  Visibility: {
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

// AccuWeather Forecast Response
export interface AccuWeatherForecastResponse {
  DailyForecasts: Array<{
    Date: string;
    Temperature: {
      Minimum: {
        Value: number;
        Unit: string;
      };
      Maximum: {
        Value: number;
        Unit: string;
      };
    };
    Day: {
      Icon: number;
      IconPhrase: string;
      PrecipitationType: string;
      PrecipitationProbability: number;
    };
    Night: {
      Icon: number;
      IconPhrase: string;
    };
  }>;
}
