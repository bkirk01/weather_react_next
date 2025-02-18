'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { fetchDailyEvolution } from '@/store/slices/dailyEvolutionSlice';
import { RootState, AppDispatch } from '@/store/store';

import CustomDot from '@/components/DailyEvolution/CustomDots/CustomDots';
import CustomTooltip from '@/components/DailyEvolution/CustomTooltip/CustomTooltip';
import '@/components/DailyEvolution/DailyEvolution.css';

const DailyEvolution: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: weatherData, selectedUnit } = useSelector(
    (state: RootState) => state.currentWeather
  );
  const {
    data: evolutionData,
    loading,
    error,
  } = useSelector((state: RootState) => state.dailyEvolution);

  useEffect(() => {
    if (weatherData?.locationKey) {
      dispatch(fetchDailyEvolution(weatherData.locationKey));
    }
  }, [dispatch, weatherData?.locationKey]);

  if (loading) {
    return (
      <div className="daily-evolution-container">
        <h2 className="chart-title">Daily Temperature Evolution</h2>
        <div className="loading-spinner" role="status">
          <span className="sr-only">Loading temperature data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="daily-evolution-container">
        <h2 className="chart-title">Daily Temperature Evolution</h2>
        <p className="error-message" role="alert">
          {error}
        </p>
      </div>
    );
  }

  if (!evolutionData || evolutionData.length === 0) {
    return null;
  }

  const chartData = evolutionData.map(item => ({
    time: `${item.hour}:00`,
    value: selectedUnit === 'C' ? item.temperature : (item.temperature * 9) / 5 + 32, // Convert to Fahrenheit if needed
  }));

  return (
    <div className="daily-evolution-container">
      <div className="responsive-container">
        <ResponsiveContainer className="responsive-container" height={500}>
          <LineChart data={chartData} margin={{ top: 100, right: 60, left: 60, bottom: 10 }}>
            <XAxis
              dataKey="time"
              stroke="#232229"
              className="md:text-36 sm:text-24 text-18 font-bold"
              tick={{ fill: '#fff' }}
              interval={0}
              dy={0}
            />
            <YAxis hide={true} />
            <Tooltip
              cursor={{ stroke: 'transparent', strokeWidth: 0 }}
              content={<CustomTooltip />}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f48403"
              strokeWidth={10}
              dot={<CustomDot />}
              isAnimationActive={true}
              animationDuration={1000}
            />
            <text
              x={155}
              y={50}
              fill="white"
              textAnchor="middle"
              dominantBaseline="middle"
              className="chart-title"
            >
              DAILY EVOLUTION
            </text>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyEvolution;
