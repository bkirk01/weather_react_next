export interface IWeatherApp {
  // Define your weather app interface
  location?: {
    city: string;
    country: string;
    key: string;
  };
  current?: {
    temperature: number;
    condition: string;
    icon: string;
  };
  forecast?: Array<{
    date: string;
    temperature: {
      min: number;
      max: number;
    };
    condition: string;
    icon: string;
  }>;
}
