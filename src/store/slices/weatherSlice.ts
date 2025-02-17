import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { LocationWeatherService } from '@/api/weather/location.service';
import { IWeatherState, TCurrentLocationUnitType } from '@/types/weather.types';

const initialState: IWeatherState = {
  data: null,
  loading: false,
  error: null,
  selectedUnit: 'C',
};

export const fetchLocationWeather = createAsyncThunk(
  'weather/fetchByLocation',
  async ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    const locationService = new LocationWeatherService();
    const location = await locationService.getLocationByCoordinates(latitude, longitude);
    const conditions = await locationService.getCurrentConditions(location.Key);
    return locationService.formatWeatherResponse(conditions, location, 'C');
  }
);

export const fetchWeatherByLocationKey = createAsyncThunk(
  'weather/fetchByLocationKey',
  async (locationKey: string) => {
    const locationService = new LocationWeatherService();
    return await locationService.getWeatherByLocationKey(locationKey);
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: { payload: TCurrentLocationUnitType }) => {
      state.selectedUnit = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Location weather
      .addCase(fetchLocationWeather.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchLocationWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      })
      // Location key weather
      .addCase(fetchWeatherByLocationKey.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByLocationKey.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchWeatherByLocationKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export const { setTemperatureUnit } = weatherSlice.actions;
export default weatherSlice.reducer;
