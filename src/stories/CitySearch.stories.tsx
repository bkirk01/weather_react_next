import type { Meta, StoryObj } from '@storybook/react';
import CitySearch from '@/components/CitySearch';
import { AccuWeatherService } from '@/api/weather/accuweather.service';
import { ICity } from '@/types/city.types';
import { userEvent, within } from '@storybook/testing-library';

// Mock cities data
const mockCities: ICity[] = [
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
  {
    Key: '9012',
    LocalizedName: 'New York',
    Country: { LocalizedName: 'United States' },
  },
];

// Mock implementation of AccuWeatherService
const mockSearchCities = async (query: string): Promise<ICity[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCities.filter(city => city.LocalizedName.toLowerCase().includes(query.toLowerCase()));
};

const mockServiceWithDelay = {
  searchCities: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return mockCities;
  },
};

// Override the AccuWeatherService prototype for Storybook
AccuWeatherService.prototype.searchCities = mockSearchCities;

const meta = {
  title: 'Components/CitySearch',
  component: CitySearch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onCitySelect: { action: 'citySelected' },
    showLoading: {
      control: 'boolean',
      description: 'Force the loading state to be shown',
    },
  },
} satisfies Meta<typeof CitySearch>;

export default meta;
type Story = StoryObj<typeof CitySearch>;

export const Default: Story = {
  args: {
    onCitySelect: (city: ICity) => console.log('City selected:', city),
  },
};

export const WithPrefilledValue: Story = {
  args: {
    onCitySelect: (city: ICity) => console.log('City selected:', city),
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input');
    if (input) {
      input.value = 'Lon';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
};

// Loading state story with prop
export const LoadingWithProp: Story = {
  args: {
    onCitySelect: (city: ICity) => console.log('City selected:', city),
    showLoading: true,
  },
};

export const Loading: Story = {
  args: {
    showLoading: true,
    onCitySelect: (city: ICity) => console.log('City selected:', city),
  },
  parameters: {
    mockService: mockServiceWithDelay,
    // Auto-populate the search input
    initialSearch: 'Lon',
  },
  play: async ({ canvasElement }) => {
    // Override searchCities to simulate loading
    AccuWeatherService.prototype.searchCities = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return mockCities;
    };

    // Get the input element
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    // Type in the search box to trigger the loading state
    await userEvent.type(input, 'London');
  },
};

export const ErrorState: Story = {
  args: {
    onCitySelect: (city: ICity) => console.log('City selected:', city),
  },
  play: async ({ canvasElement }) => {
    // Override searchCities to simulate error
    AccuWeatherService.prototype.searchCities = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      throw new Error('Failed to fetch cities');
    };

    // Get the input element
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    // Type in the search box to trigger the loading state
    await userEvent.type(input, 'Lon');

    // Type in the search box to trigger the error state
    await userEvent.type(input, 'London');
  },
};
