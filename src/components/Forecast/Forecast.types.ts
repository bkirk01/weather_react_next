export interface ForecastData {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
}

export const mockForecastData: ForecastData[] = [
  {
    date: '2025-01-01',
    temperature: { min: 12, max: 25 },
    condition: 'Sunny',
  },
  {
    date: '2025-01-02',
    temperature: { min: 14, max: 27 },
    condition: 'Partly Cloudy',
  },
  {
    date: '2025-01-03',
    temperature: { min: 13, max: 26 },
    condition: 'Cloudy',
  },
  {
    date: '2025-01-04',
    temperature: { min: 15, max: 28 },
    condition: 'Sunny',
  },
  {
    date: '2025-01-05',
    temperature: { min: 16, max: 29 },
    condition: 'Clear',
  },
];
