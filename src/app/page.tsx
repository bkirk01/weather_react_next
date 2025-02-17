'use client';

import dynamic from 'next/dynamic';
import React, { Suspense, useState } from 'react';

import { useCtxCurrentLocation } from '@/app/context/CtxCurrentLocation';
import CitySearch from '@/components/CitySearch/CitySearch';
import { mockDailyEvolutionData } from '@/components/DailyEvolution/DailyEvolution.types';
import { Footer } from '@/components/Footer/Footer';
import { mockForecastData } from '@/components/Forecast/Forecast.types';
import Header from '@/components/Header/Header';
import { ICity } from '@/types/city.types';
import './styles/page.css';

const DailyEvolution = dynamic(() => import('@/components/DailyEvolution/DailyEvolution'), {
  ssr: false,
});

const FiveDayForecast = dynamic(() => import('@/components/Forecast/Forecast'), {
  ssr: false,
});

const CurrentLocation = dynamic(() => import('@/components/CurrentLocation/CurrentLocation'), {
  ssr: false,
});

export default function HomePage() {
  const { unit, setUnit } = useCtxCurrentLocation();
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);

  const handleCitySelect = (city: ICity) => {
    setSelectedCity(city);
  };

  return (
    <div className="home-container">
      <Header title="React Weather" />
      <main className="home-main" role="main">
        <div className="section-content">
          <section className="section-even search-section">
            <CitySearch onCitySelect={handleCitySelect} />
          </section>

          <section className="weather-section">
            <Suspense fallback={<div className="loading-container">Loading weather data...</div>}>
              <CurrentLocation unit={unit} selectedTmpUnit={setUnit} selectedCity={selectedCity} />
            </Suspense>
          </section>

          <section className="section-even forecast-section">
            <FiveDayForecast forecast={mockForecastData} />
          </section>

          <section className="evolution-section">
            <DailyEvolution data={mockDailyEvolutionData} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
