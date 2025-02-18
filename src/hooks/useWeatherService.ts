'use client';

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { fetchLocationWeather, fetchCityWeather } from '@/store/slices/currentWeatherSlice';
import { AppDispatch } from '@/store/store';
import { ICity } from '@/types/components/CitySearch.types';
import { TCurrentLocationUnitType } from '@/types/weather.types';

export const useWeatherService = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getLocationWeather = useCallback(
    async (latitude: number, longitude: number, unit: TCurrentLocationUnitType) => {
      try {
        const result = await dispatch(fetchLocationWeather({ latitude, longitude, unit })).unwrap();
        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch weather data';
        console.error('Error fetching location weather:', errorMessage);
        throw new Error(errorMessage);
      }
    },
    [dispatch]
  );

  const getWeatherByCity = useCallback(
    async (city: ICity, unit: TCurrentLocationUnitType) => {
      try {
        const result = await dispatch(fetchCityWeather({ city, unit })).unwrap();
        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch weather data';
        console.error('Error fetching city weather:', errorMessage);
        throw new Error(errorMessage);
      }
    },
    [dispatch]
  );

  return {
    getLocationWeather,
    getWeatherByCity,
  };
};
