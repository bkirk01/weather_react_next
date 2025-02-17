/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Card } from '@/components/ui';
import { useWeatherService } from '@/hooks/useWeatherService';
import { RootState } from '@/store/store';

import { ICurrentLocationProps } from './CurrentLocation.types';
import './CurrentLocation.css';

const CurrentLocation: React.FC<ICurrentLocationProps> = ({
  unit,
  selectedTmpUnit,
  selectedCity,
}) => {
  const { getLocationWeather, getWeatherByCity } = useWeatherService();
  const {
    data: weatherData,
    loading,
    error,
  } = useSelector((state: RootState) => state.currentWeather);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const handleLocationError = (error: GeolocationPositionError) => {
    switch (error.code) {
      case GeolocationPositionError.PERMISSION_DENIED:
        setPermissionDenied(true);
        setLocationError(
          'Location access was denied. Please enable location services to get weather information for your area.'
        );
        break;
      case GeolocationPositionError.POSITION_UNAVAILABLE:
        setLocationError('Location information is currently unavailable. Please try again later.');
        break;
      case GeolocationPositionError.TIMEOUT:
        setLocationError('Location request timed out. Please check your connection and try again.');
        break;
      default:
        setLocationError('An unexpected error occurred while getting your location.');
    }
    setIsInitialLoad(false);
  };

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
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      await getLocationWeather(position.coords.latitude, position.coords.longitude, unit);
      setPermissionDenied(false);
      setLocationError(null);
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
      getWeatherByCity(selectedCity, unit).finally(() => setIsInitialLoad(false));
    } else {
      requestLocationPermission();
    }
  }, [selectedCity, unit, getWeatherByCity]);

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
            onClick={() => selectedTmpUnit('C')}
            aria-pressed={unit === 'C'}
          >
            C
          </button>
          <button
            className={`unit ${unit === 'F' ? 'active' : ''}`}
            onClick={() => selectedTmpUnit('F')}
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
