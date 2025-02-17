'use client';

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { fetchLocationWeather, fetchCityWeather } from '@/store/slices/currentWeatherSlice';
import { AppDispatch } from '@/store/store';
import { ICity } from '@/types/city.types';
import { TCurrentLocationUnitType } from '@/types/weather.types';

export const useWeatherService = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getLocationWeather = useCallback(
    async (latitude: number, longitude: number, unit: TCurrentLocationUnitType) => {
      try {
        await dispatch(fetchLocationWeather({ latitude, longitude, unit })).unwrap();
      } catch (error) {
        console.error('Error fetching location weather:', error);
        throw new Error('Failed to fetch weather data');
      }
    },
    [dispatch]
  );

  const getWeatherByCity = useCallback(
    async (city: ICity, unit: TCurrentLocationUnitType) => {
      try {
        await dispatch(fetchCityWeather({ city, unit })).unwrap();
      } catch (error) {
        console.error('Error fetching city weather:', error);
        throw new Error('Failed to fetch weather data');
      }
    },
    [dispatch]
  );

  return {
    getLocationWeather,
    getWeatherByCity,
  };
};
