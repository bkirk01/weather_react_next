/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Card } from '@/components/ui';
import { useWeatherService } from '@/hooks/useWeatherService';
import { setSelectedUnit } from '@/store/slices/currentWeatherSlice';
import { fetchForecast } from '@/store/slices/forecastSlice';
import { AppDispatch, RootState } from '@/store/store';
import { TCurrentLocationUnitType } from '@/types/weather.types';

import { ICurrentLocationProps } from '@/types/components/CurrentLocation.types';

import '@/components/CurrentLocation/CurrentLocation.css';

const LOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 15000, // 15 seconds timeout
  maximumAge: 300000, // Cache location for 5 minutes
};

const CurrentLocation: React.FC<ICurrentLocationProps> = ({
  unit,
  selectedTmpUnit,
  selectedCity,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { getLocationWeather, getWeatherByCity } = useWeatherService();
  const {
    data: weatherData,
    loading,
    error,
  } = useSelector((state: RootState) => state.currentWeather);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const handleLocationError = useCallback(
    (error: GeolocationPositionError) => {
      switch (error.code) {
        case GeolocationPositionError.PERMISSION_DENIED:
          setPermissionDenied(true);
          setLocationError(
            'Location access was denied. Please enable location services to get weather information for your area.'
          );
          break;
        case GeolocationPositionError.POSITION_UNAVAILABLE:
          setLocationError('Unable to detect your location. Please try the city search above.');
          break;
        case GeolocationPositionError.TIMEOUT:
          if (retryCount < MAX_RETRIES) {
            setRetryCount(prev => prev + 1);
            requestLocationPermission();
          } else {
            setLocationError('Location request timed out. Please try the city search above.');
          }
          break;
        default:
          setLocationError('An unexpected error occurred. Please try the city search above.');
      }
      setIsInitialLoad(false);
    },
    [retryCount]
  );

  const requestLocationPermission = async () => {
    setLocationError(null);
    setIsInitialLoad(true);

    if (!navigator.geolocation) {
      setLocationError(
        'Geolocation is not supported by your browser. Please try using the city search instead.'
      );
      setIsInitialLoad(false);
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          ...LOCATION_OPTIONS,
          enableHighAccuracy: retryCount === 0,
          timeout: LOCATION_OPTIONS.timeout * (retryCount + 1),
        });
      });

      const weatherResult = await getLocationWeather(
        position.coords.latitude,
        position.coords.longitude,
        unit
      );

      if (weatherResult.locationKey) {
        dispatch(fetchForecast(weatherResult.locationKey));
      }

      setPermissionDenied(false);
      setLocationError(null);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        handleLocationError(error);
      } else {
        setLocationError('Failed to fetch weather data. Please try again.');
        console.error('Weather fetch error:', error);
      }
    } finally {
      setIsInitialLoad(false);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      setIsInitialLoad(true);
      getWeatherByCity(selectedCity, unit)
        .then(result => {
          // Fetch forecast after getting weather data for selected city
          if (result.locationKey) {
            dispatch(fetchForecast(result.locationKey));
          }
        })
        .catch(error => {
          setLocationError(error.message || 'Failed to fetch weather data for selected city.');
        })
        .finally(() => setIsInitialLoad(false));
    } else {
      requestLocationPermission();
    }
  }, [selectedCity, unit, getWeatherByCity]);

  const handleUnitChange = (newUnit: TCurrentLocationUnitType) => {
    selectedTmpUnit(newUnit);
    dispatch(setSelectedUnit(newUnit));
  };

  if (loading || isInitialLoad) {
    return (
      <Card className="current-location">
        <div className="loading-spinner" role="status">
          <span className="sr-only">Loading weather information...</span>
        </div>
      </Card>
    );
  }

  if (permissionDenied) {
    return (
      <Card className="current-location">
        <div className="permission-prompt" role="alert">
          <h3 className="permission-title">Location Access Required</h3>
          <p className="permission-description">
            {locationError ||
              'Please allow access to your location to get accurate weather information.'}
          </p>
          <button
            onClick={requestLocationPermission}
            className="permission-button"
            aria-label="Enable location access"
          >
            Enable Location Access
          </button>
        </div>
      </Card>
    );
  }

  if (locationError || error) {
    return (
      <Card className="current-location">
        <div className="error-container" role="alert">
          <p className="error-message">{locationError || error}</p>
          <button
            onClick={requestLocationPermission}
            className="permission-button"
            aria-label="Retry getting location"
          >
            Retry
          </button>
        </div>
      </Card>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <Card className="current-location">
      <h2>{weatherData.location}</h2>
      <div className="temperature-container">
        <span
          className="temperature"
          aria-label={`Temperature: ${Math.round(weatherData.temperature)} degrees ${unit}`}
        >
          {Math.round(weatherData.temperature)}&deg;
        </span>
        <div className="units" role="group" aria-label="Temperature unit selection">
          <button
            className={`unit ${unit === 'C' ? 'active' : ''}`}
            onClick={() => handleUnitChange('C')}
            aria-pressed={unit === 'C'}
          >
            C
          </button>
          <button
            className={`unit ${unit === 'F' ? 'active' : ''}`}
            onClick={() => handleUnitChange('F')}
            aria-pressed={unit === 'F'}
          >
            F
          </button>
        </div>
      </div>
      <p className="description">{weatherData.description}</p>
    </Card>
  );
};

export default CurrentLocation;
