import { IWeatherIcon } from '@/types/weather.types';

const ICON_BASE_URL = '/assets/icons';

export const getWeatherIcon = (iconNumber: number): IWeatherIcon => {
  // Map AccuWeather icon numbers to our custom icons
  const iconMap: { [key: number]: { description: string } } = {
    1: { description: 'Sunny' },
    2: { description: 'Mostly Sunny' },
    3: { description: 'Partly Sunny' },
    4: { description: 'Intermittent Clouds' },
    5: { description: 'Hazy Sunshine' },
    6: { description: 'Mostly Cloudy' },
    7: { description: 'Cloudy' },
    8: { description: 'Dreary (Overcast)' },
    9: { description: 'Fog' },
    10: { description: 'Showers' },
    11: { description: 'Mostly Cloudy w/ Showers' },
    12: { description: 'Partly Sunny w/ Showers' },
    13: { description: 'T-Storms' },
    14: { description: 'Mostly Cloudy w/ T-Storms' },
    15: { description: 'Partly Sunny w/ T-Storms' },
    16: { description: 'Rain' },
    17: { description: 'Flurries' },
    18: { description: 'Mostly Cloudy w/ Flurries' },
    19: { description: 'Partly Sunny w/ Flurries' },
    20: { description: 'Snow' },
    21: { description: 'Mostly Cloudy w/ Snow' },
    22: { description: 'Ice' },
    23: { description: 'Sleet' },
    24: { description: 'Freezing Rain' },
    25: { description: 'Rain and Snow' },
    26: { description: 'Hot' },
    27: { description: 'Cold' },
    28: { description: 'Windy' },
    29: { description: 'Clear' },
    30: { description: 'Mostly Clear' },
    31: { description: 'Partly Cloudy' },
    32: { description: 'Intermittent Clouds (Night)' },
    33: { description: 'Hazy Moonlight' },
    34: { description: 'Mostly Cloudy (Night)' },
    35: { description: 'Partly Cloudy w/ Showers (Night)' },
    36: { description: 'Mostly Cloudy w/ Showers (Night)' },
    37: { description: 'Partly Cloudy w/ T-Storms (Night)' },
    38: { description: 'Mostly Cloudy w/ T-Storms (Night)' },
    39: { description: 'Mostly Cloudy w/ Flurries (Night)' },
    40: { description: 'Mostly Cloudy w/ Snow (Night)' },
  };

  const defaultIconNo = '6';
  if (iconMap[iconNumber]) {
    return { ...iconMap[iconNumber], ...{ src: `${ICON_BASE_URL}/${iconNumber}-s.png` } };
  }
  return { ...iconMap[defaultIconNo], ...{ src: `${ICON_BASE_URL}/${defaultIconNo}s.png` } };
};
