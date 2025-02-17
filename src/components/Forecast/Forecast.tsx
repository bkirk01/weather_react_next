'use client';

import React from 'react';

import { Card, CardContent } from '@/components/ui';

import { ForecastData } from './Forecast.types';
import './Forecast.css';

interface FiveDayForecastProps {
  forecast: ForecastData[];
}

const FiveDayForecast: React.FC<FiveDayForecastProps> = ({ forecast }) => {
  return (
    <div className="forecast-container">
      <h2 className="forecast-title">5 DAYS FORECAST</h2>
      <div className="forecast-cards">
        {forecast.map((day, index) => (
          <Card key={index} className="forecast-card">
            <CardContent className="forecast-card-content">
              <span className="forecast-date">{day.date}</span>
              <div className="forecast-temps">
                <span className="forecast-max-temp">{day.temperature.max}°</span>
                <span className="forecast-min-temp">{day.temperature.min}°</span>
              </div>
              <span className="forecast-description">{day.condition}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;
