import { ILocationWeatherResponse } from '@/api/weather/types';
import { ICity } from '@/types/city.types';
import { TCurrentLocationUnitType } from '@/types/weather.types';

export interface ICurrentLocationState {
  loading: boolean;
  error: string | null;
  weather: ILocationWeatherResponse | null;
  permissionDenied: boolean;
}

export interface ICurrentLocationProps {
  unit: TCurrentLocationUnitType;
  selectedTmpUnit: (unit: TCurrentLocationUnitType) => void;
  selectedCity: ICity | null;
}
