/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useRef, useEffect } from 'react';

import { AccuWeatherService } from '@/api/weather/accuweather.service';
import { useDebounce } from '@/hooks/useDebounce';
import { ICity } from '@/types/components/CitySearch.types';
import '@/component/CitySearch/CitySearch.css';

interface CitySearchProps {
  showLoading?: boolean;
  onCitySelect: (city: ICity) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ showLoading = false, onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(showLoading);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldSearch, setShouldSearch] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const weatherService = new AccuWeatherService();

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    setLoading(showLoading);
  }, [showLoading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchCities = async () => {
      if (!shouldSearch || debouncedQuery.trim().length < 2) {
        setCities([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const results = await weatherService.searchCities(debouncedQuery);
        setCities(results);
        setIsOpen(true);
      } catch (err) {
        setError('Failed to fetch cities. Please try again.');
        console.error('Error fetching cities:', err);
      } finally {
        setLoading(false);
      }
    };

    searchCities();
  }, [debouncedQuery, shouldSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShouldSearch(true);
  };

  const handleCitySelect = (city: ICity) => {
    setQuery(city.LocalizedName);
    setShouldSearch(false);
    setIsOpen(false);
    setCities([]);
    onCitySelect(city);
  };

  return (
    <form role="search" aria-label="Search for a city" className="search-form">
      <div className="search-form-group">
        <label htmlFor="city-search" className="search-label">
          City Name
        </label>
        <div className="input-spinner-container">
          <input
            id="city-search"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter city name"
            className="search-input"
            aria-required="true"
          />

          {loading && (
            <div role="status" className="search-loading">
              <div className="search-spinner" />
            </div>
          )}
        </div>

        {error && <div className="search-error">{error}</div>}

        {isOpen && cities.length > 0 && (
          <div ref={dropdownRef} className="search-results">
            {cities.map(city => (
              <div
                key={city.Key}
                onClick={() => handleCitySelect(city)}
                className="search-result-item"
              >
                <div className="search-result-item-city">{city.LocalizedName}</div>
                <div className="search-result-item-country">{city.Country.LocalizedName}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};

export default CitySearch;
