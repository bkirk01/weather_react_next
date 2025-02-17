'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import CustomDot from './CustomDots/CustomDots';
import CustomTooltip from './CustomTooltip/CustomTooltip';
import { DailyEvolutionData } from './DailyEvolution.types';
import './DailyEvolution.css';

interface DailyEvolutionProps {
  data: DailyEvolutionData[];
}

const DailyEvolution: React.FC<DailyEvolutionProps> = ({ data }) => {
  const chartData = data.map(item => ({
    time: `${item.hour}:00`,
    value: item.temperature,
  }));

  return (
    <div className="daily-evolution-container">
      <h2 className="chart-title">Daily Temperature Evolution</h2>
      <div className="responsive-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 50, right: 30, left: 20, bottom: 20 }}>
            <XAxis dataKey="time" stroke="#FFFFFF" tick={{ fill: '#FFFFFF' }} />
            <YAxis stroke="#FFFFFF" tick={{ fill: '#FFFFFF' }} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#F48403"
              strokeWidth={2}
              dot={<CustomDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyEvolution;
