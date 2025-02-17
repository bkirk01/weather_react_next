export interface ForecastData {
  date: string;
  icon: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
}

// export const mockForecastData: ForecastData[] = [
//   {
//     date: 'FRI 29',
//     icon: '/icons/cloudy.png',
//     temperature: { min: 12, max: 25 },
//     condition: 'Sunny',
//   },
//   {
//     date: 'SAT 30',
//     icon: '/icons/sunny.png',
//     temperature: { min: 14, max: 27 },
//     condition: 'Partly Cloudy',
//   },
//   {
//     date: 'SUN 31',
//     icon: '/icons/rainy.png',
//     temperature: { min: 13, max: 26 },
//     condition: 'Cloudy',
//   },
//   {
//     date: 'MON 1',
//     icon: '/icons/storm.png',
//     temperature: { min: 15, max: 28 },
//     condition: 'Sunny',
//   },
//   {
//     date: 'TUE 2',
//     icon: '/icons/cloudy.png',
//     temperature: { min: 16, max: 29 },
//     condition: 'Clear',
//   },
// ];
