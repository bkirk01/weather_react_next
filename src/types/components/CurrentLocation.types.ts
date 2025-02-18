import { ILocationWeatherResponse } from '@/types/weatherAppTypes';
import { ICity } from '@/types/components/CitySearch.types';
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
