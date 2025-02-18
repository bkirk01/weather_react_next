import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { AccuWeatherService } from '@/api/weather/accuweather.service';
import CitySearch from '@/components/CitySearch/CitySearch';
import { renderWithProviders } from '@/test/utils';

// Mock the AccuWeatherService
vi.mock('@/api/weather/accuweather.service', () => ({
  AccuWeatherService: vi.fn().mockImplementation(() => ({
    searchCities: vi.fn(),
  })),
}));

describe('CitySearch', () => {
  const mockOnCitySelect = vi.fn();
  const mockCities = [
    {
      Key: '1234',
      LocalizedName: 'London',
      Country: { LocalizedName: 'United Kingdom' },
    },
    {
      Key: '5678',
      LocalizedName: 'Paris',
      Country: { LocalizedName: 'France' },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the mock implementation for each test
    (AccuWeatherService as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      searchCities: vi.fn().mockResolvedValue(mockCities),
    }));
  });

  it('renders the search input correctly', () => {
    renderWithProviders(<CitySearch onCitySelect={mockOnCitySelect} />);

    expect(screen.getByLabelText(/city name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter city name/i)).toBeInTheDocument();
  });

  it('displays search results when typing', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CitySearch onCitySelect={mockOnCitySelect} />);

    // Type in the search input

    await user.type(screen.getByRole('textbox'), 'lon');

    // Wait for results to appear
    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText('United Kingdom')).toBeInTheDocument();
    });
  });

  it('handles city selection correctly', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CitySearch onCitySelect={mockOnCitySelect} />);

    // Type and wait for results
    await user.type(screen.getByRole('textbox'), 'lon');
    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
    });

    // Click on a city
    await user.click(screen.getByText('London'));

    // Verify onCitySelect was called with correct city
    expect(mockOnCitySelect).toHaveBeenCalledWith(mockCities[0]);
    // Verify input value was updated
    expect(screen.getByRole('textbox')).toHaveValue('London');
  });

  it('handles API errors correctly', async () => {
    // Mock API error
    (AccuWeatherService as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      searchCities: vi.fn().mockRejectedValue(new Error('API Error')),
    }));

    const user = userEvent.setup();
    renderWithProviders(<CitySearch onCitySelect={mockOnCitySelect} />);

    // Type in the search input
    await user.type(screen.getByRole('textbox'), 'lon');

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch cities/i)).toBeInTheDocument();
    });
  });

  it('does not search with less than 2 characters', async () => {
    const user = userEvent.setup();
    const mockSearchCities = vi.fn();
    (AccuWeatherService as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      searchCities: mockSearchCities,
    }));

    renderWithProviders(<CitySearch onCitySelect={mockOnCitySelect} />);

    // Type a single character
    await user.type(screen.getByRole('textbox'), 'l');

    // Verify searchCities wasn't called
    expect(mockSearchCities).not.toHaveBeenCalled();
  });

  it('debounces search requests', async () => {
    const user = userEvent.setup();
    const mockSearchCities = vi.fn().mockResolvedValue(mockCities);
    (AccuWeatherService as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      searchCities: mockSearchCities,
    }));

    renderWithProviders(<CitySearch onCitySelect={mockOnCitySelect} />);

    // Type quickly
    await user.type(screen.getByRole('textbox'), 'london');

    // Wait for debounce
    await waitFor(() => {
      expect(mockSearchCities).toHaveBeenCalledTimes(1);
      expect(mockSearchCities).toHaveBeenCalledWith('london');
    });
  });

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CitySearch onCitySelect={mockOnCitySelect} />);

    // Type and wait for results
    await user.type(screen.getByRole('textbox'), 'lon');
    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
    });

    // Click outside
    await user.click(document.body);

    // Verify dropdown is closed
    await waitFor(() => {
      expect(screen.queryByText('London')).not.toBeInTheDocument();
    });
  });

  it('handles empty results correctly', async () => {
    // Mock empty results
    (AccuWeatherService as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      searchCities: vi.fn().mockResolvedValue([]),
    }));

    const user = userEvent.setup();
    renderWithProviders(<CitySearch onCitySelect={mockOnCitySelect} />);

    // Type in the search input
    await user.type(screen.getByRole('textbox'), 'nonexistentcity');

    // Verify no results are shown
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('maintains accessibility features', () => {
    renderWithProviders(<CitySearch onCitySelect={mockOnCitySelect} />);

    // Check for proper ARIA attributes
    expect(screen.getByRole('search')).toHaveAttribute('aria-label', 'Search for a city');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
  });
});
