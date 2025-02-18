import { ICity } from '@/types/components/CitySearch.types';
import { TCurrentLocationUnitType } from '@/types/weather.types';
import { ILocationWeatherResponse } from '@/types/weatherAppTypes';

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
