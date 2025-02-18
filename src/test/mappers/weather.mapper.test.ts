import { describe, it, expect } from 'vitest';

import { WeatherMapper } from '@/api/mappers/weather.mapper';
import type {
  AccuWeatherLocationResponse,
  AccuWeatherCurrentResponse,
  AccuWeatherForecastResponse,
} from '@/types/accuweather.types';

describe('WeatherMapper', () => {
  describe('mapLocation', () => {
    it('correctly maps location data', () => {
      const mockLocationData: AccuWeatherLocationResponse = {
        Key: '123456',
        LocalizedName: 'London',
        Country: {
          LocalizedName: 'United Kingdom',
        },
        GeoPosition: {
          Latitude: 51.5074,
          Longitude: -0.1278,
        },
      };

      const result = WeatherMapper.mapLocation(mockLocationData);

      expect(result).toEqual({
        key: '123456',
        city: 'London',
        country: 'United Kingdom',
        latitude: 51.5074,
        longitude: -0.1278,
      });
    });
  });

  describe('mapCurrentWeather', () => {
    it('correctly maps current weather data', () => {
      const mockCurrentData: AccuWeatherCurrentResponse = {
        LocalObservationDateTime: '2025-01-15T12:00:00+00:00',
        WeatherText: 'Partly cloudy',
        Temperature: {
          Metric: {
            Value: 20,
            Unit: 'C',
          },
          Imperial: {
            Value: 68,
            Unit: 'F',
          },
        },
        RelativeHumidity: 65,
        Wind: {
          Speed: {
            Metric: {
              Value: 15,
              Unit: 'km/h',
            },
            Imperial: {
              Value: 9.3,
              Unit: 'mi/h',
            },
          },
        },
        Pressure: {
          Metric: {
            Value: 1015,
            Unit: 'mb',
          },
          Imperial: {
            Value: 30,
            Unit: 'inHg',
          },
        },
        Visibility: {
          Metric: {
            Value: 10,
            Unit: 'km',
          },
          Imperial: {
            Value: 6.2,
            Unit: 'mi',
          },
        },
      };

      const result = WeatherMapper.mapCurrentWeather(mockCurrentData);

      expect(result).toEqual({
        temperature: {
          celsius: 20,
          fahrenheit: 68,
        },
        description: 'Partly cloudy',
        timestamp: '2025-01-15T12:00:00+00:00',
        humidity: 65,
        windSpeed: {
          metric: 15,
          imperial: 9.3,
        },
        pressure: {
          metric: 1015,
          imperial: 30,
        },
        visibility: {
          metric: 10,
          imperial: 6.2,
        },
      });
    });
  });

  describe('mapForecast', () => {
    it('correctly maps forecast data', () => {
      const mockForecastData: AccuWeatherForecastResponse = {
        DailyForecasts: [
          {
            Date: '2025-01-15T07:00:00+00:00',
            Temperature: {
              Minimum: {
                Value: 15,
                Unit: 'C',
              },
              Maximum: {
                Value: 25,
                Unit: 'C',
              },
            },
            Day: {
              Icon: 2,
              IconPhrase: 'Mostly sunny',
              PrecipitationType: 'Rain',
              PrecipitationProbability: 30,
            },
            Night: {
              Icon: 33,
              IconPhrase: 'Clear',
            },
          },
        ],
      };

      const result = WeatherMapper.mapForecast(mockForecastData);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        date: '2025-01-15T07:00:00+00:00',
        temperature: {
          min: {
            celsius: 15,
            fahrenheit: 59, // (15 * 9/5) + 32
          },
          max: {
            celsius: 25,
            fahrenheit: 77, // (25 * 9/5) + 32
          },
        },
        description: 'Mostly sunny',
        dayIcon: 2,
        nightIcon: 33,
        precipitation: {
          probability: 30,
          type: 'Rain',
        },
      });
    });

    it('handles empty forecast data', () => {
      const mockEmptyForecast: AccuWeatherForecastResponse = {
        DailyForecasts: [],
      };

      const result = WeatherMapper.mapForecast(mockEmptyForecast);

      expect(result).toEqual([]);
    });
  });

  describe('mapWeatherResponse', () => {
    it('correctly maps complete weather response with forecast', () => {
      const mockLocation: AccuWeatherLocationResponse = {
        Key: '123456',
        LocalizedName: 'London',
        Country: {
          LocalizedName: 'United Kingdom',
        },
        GeoPosition: {
          Latitude: 51.5074,
          Longitude: -0.1278,
        },
      };

      const mockCurrent: AccuWeatherCurrentResponse = {
        LocalObservationDateTime: '2025-01-15T12:00:00+00:00',
        WeatherText: 'Partly cloudy',
        Temperature: {
          Metric: {
            Value: 20,
            Unit: 'C',
          },
          Imperial: {
            Value: 68,
            Unit: 'F',
          },
        },
        RelativeHumidity: 65,
        Wind: {
          Speed: {
            Metric: {
              Value: 15,
              Unit: 'km/h',
            },
            Imperial: {
              Value: 9.3,
              Unit: 'mi/h',
            },
          },
        },
        Pressure: {
          Metric: {
            Value: 1015,
            Unit: 'mb',
          },
          Imperial: {
            Value: 30,
            Unit: 'inHg',
          },
        },
        Visibility: {
          Metric: {
            Value: 10,
            Unit: 'km',
          },
          Imperial: {
            Value: 6.2,
            Unit: 'mi',
          },
        },
      };

      const mockForecast: AccuWeatherForecastResponse = {
        DailyForecasts: [
          {
            Date: '2025-01-15T07:00:00+00:00',
            Temperature: {
              Minimum: {
                Value: 15,
                Unit: 'C',
              },
              Maximum: {
                Value: 25,
                Unit: 'C',
              },
            },
            Day: {
              Icon: 2,
              IconPhrase: 'Mostly sunny',
              PrecipitationType: 'Rain',
              PrecipitationProbability: 30,
            },
            Night: {
              Icon: 33,
              IconPhrase: 'Clear',
            },
          },
        ],
      };

      const result = WeatherMapper.mapWeatherResponse(mockLocation, mockCurrent, mockForecast);

      expect(result).toEqual({
        location: {
          key: '123456',
          city: 'London',
          country: 'United Kingdom',
          latitude: 51.5074,
          longitude: -0.1278,
        },
        current: {
          temperature: {
            celsius: 20,
            fahrenheit: 68,
          },
          description: 'Partly cloudy',
          timestamp: '2025-01-15T12:00:00+00:00',
          humidity: 65,
          windSpeed: {
            metric: 15,
            imperial: 9.3,
          },
          pressure: {
            metric: 1015,
            imperial: 30,
          },
          visibility: {
            metric: 10,
            imperial: 6.2,
          },
        },
        forecast: [
          {
            date: '2025-01-15T07:00:00+00:00',
            temperature: {
              min: {
                celsius: 15,
                fahrenheit: 59,
              },
              max: {
                celsius: 25,
                fahrenheit: 77,
              },
            },
            description: 'Mostly sunny',
            dayIcon: 2,
            nightIcon: 33,
            precipitation: {
              probability: 30,
              type: 'Rain',
            },
          },
        ],
      });
    });

    it('correctly maps weather response without forecast', () => {
      const mockLocation: AccuWeatherLocationResponse = {
        Key: '123456',
        LocalizedName: 'London',
        Country: {
          LocalizedName: 'United Kingdom',
        },
        GeoPosition: {
          Latitude: 51.5074,
          Longitude: -0.1278,
        },
      };

      const mockCurrent: AccuWeatherCurrentResponse = {
        LocalObservationDateTime: '2025-01-15T12:00:00+00:00',
        WeatherText: 'Partly cloudy',
        Temperature: {
          Metric: {
            Value: 20,
            Unit: 'C',
          },
          Imperial: {
            Value: 68,
            Unit: 'F',
          },
        },
        RelativeHumidity: 65,
        Wind: {
          Speed: {
            Metric: {
              Value: 15,
              Unit: 'km/h',
            },
            Imperial: {
              Value: 9.3,
              Unit: 'mi/h',
            },
          },
        },
        Pressure: {
          Metric: {
            Value: 1015,
            Unit: 'mb',
          },
          Imperial: {
            Value: 30,
            Unit: 'inHg',
          },
        },
        Visibility: {
          Metric: {
            Value: 10,
            Unit: 'km',
          },
          Imperial: {
            Value: 6.2,
            Unit: 'mi',
          },
        },
      };

      const result = WeatherMapper.mapWeatherResponse(mockLocation, mockCurrent);

      expect(result.forecast).toBeUndefined();
      expect(result).toEqual({
        location: {
          key: '123456',
          city: 'London',
          country: 'United Kingdom',
          latitude: 51.5074,
          longitude: -0.1278,
        },
        current: {
          temperature: {
            celsius: 20,
            fahrenheit: 68,
          },
          description: 'Partly cloudy',
          timestamp: '2025-01-15T12:00:00+00:00',
          humidity: 65,
          windSpeed: {
            metric: 15,
            imperial: 9.3,
          },
          pressure: {
            metric: 1015,
            imperial: 30,
          },
          visibility: {
            metric: 10,
            imperial: 6.2,
          },
        },
      });
    });
  });
});
