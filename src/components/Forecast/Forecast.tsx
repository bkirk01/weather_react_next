import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Card, CardContent } from '@/components/ui';
import { RootState } from '@/store/store';
import '@/components/Forecast/Forecast.css';
import { IForecastDay, IWeatherIcon } from '@/types/weather.types';
import { utilFormatDate, utilIsNightTime } from '@/utils/dateFormatter';
import { getWeatherIcon } from '@/utils/weatherIcons';

const FiveDayForecast: React.FC = () => {
  const { data: forecast, loading, error } = useSelector((state: RootState) => state.forecast);
  const { selectedUnit } = useSelector((state: RootState) => state.currentWeather);
  const [defaultIconInfo, setDefaultIconInfo] = useState<IWeatherIcon>();

  // ✅ Set iconInfo only once on first load
  useEffect(() => {
    const isNight = utilIsNightTime();
    const iconInfo = getWeatherIcon(isNight ? 34 : 6); // Default icons
    setDefaultIconInfo(iconInfo);
  }, []);

  const getIconForDay = (day: IForecastDay): IWeatherIcon => {
    if (!defaultIconInfo) return { src: '', description: '' };
    const isNight = utilIsNightTime();
    return getWeatherIcon(isNight ? day.nightIcon : day.dayIcon) || defaultIconInfo;
  };

  if (loading) {
    return (
      <div className="forecast-container">
        <h2 className="forecast-title">5 DAYS FORECAST</h2>
        <div className="loading-spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="forecast-container">
        <h2 className="forecast-title">5 DAYS FORECAST</h2>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <div className="forecast-container">
      <h2 className="forecast-title">5 DAYS FORECAST</h2>
      <div className="forecast-cards">
        {forecast.map((day, index) => {
          const iconInfo = getIconForDay(day);
          return (
            <Card key={index} className="forecast-card group">
              <CardContent className="forecast-card-content transition group-hover:translate group-hover:scale-105 group-hover:duration-[1s]">
                <span className="forecast-date">{utilFormatDate(day.date)}</span>
                <Image
                  src={iconInfo.src}
                  alt={day.description || 'Weather icon'}
                  width={79}
                  height={79}
                  className="forecast-icon transition group-hover:translate-x-5 group-hover:duration-[1s]"
                  priority={index === 0} // Prioritize loading first image
                />
                <div className="forecast-temps">
                  <span className="forecast-max-temp">
                    {Math.round(
                      selectedUnit === 'C'
                        ? day.temperature.max.celsius
                        : day.temperature.max.fahrenheit
                    )}
                    °
                  </span>
                  <span className="forecast-min-temp">
                    {Math.round(
                      selectedUnit === 'C'
                        ? day.temperature.min.celsius
                        : day.temperature.min.fahrenheit
                    )}
                    °
                  </span>
                </div>
                <span className="forecast-description">{day.description}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FiveDayForecast;
