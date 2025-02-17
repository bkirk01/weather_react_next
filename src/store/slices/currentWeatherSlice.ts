import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { LocationWeatherService } from '@/api/weather/location.service';
import { ICity } from '@/types/city.types';
import { ILocationWeatherResponse, TCurrentLocationUnitType } from '@/types/weather.types';

interface CurrentWeatherState {
  data: ILocationWeatherResponse | null;
  loading: boolean;
  error: string | null;
  selectedUnit: TCurrentLocationUnitType;
}

const initialState: CurrentWeatherState = {
  data: null,
  loading: false,
  error: null,
  selectedUnit: 'C',
};

export const fetchLocationWeather = createAsyncThunk(
  'currentWeather/fetchByLocation',
  async ({
    latitude,
    longitude,
    unit,
  }: {
    latitude: number;
    longitude: number;
    unit: TCurrentLocationUnitType;
  }) => {
    const locationService = new LocationWeatherService();
    const location = await locationService.getLocationByCoordinates(latitude, longitude);
    const conditions = await locationService.getCurrentConditions(location.Key);
    return locationService.formatWeatherResponse(conditions, location, unit);
  }
);

export const fetchCityWeather = createAsyncThunk(
  'currentWeather/fetchByCity',
  async ({ city, unit }: { city: ICity; unit: TCurrentLocationUnitType }) => {
    const locationService = new LocationWeatherService();
    return await locationService.getWeatherByCity(city, unit);
  }
);

const currentWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState,
  reducers: {
    setSelectedUnit: (state, action) => {
      state.selectedUnit = action.payload;
      if (state.data) {
        state.data.temperature =
          state.selectedUnit === 'C' ? state.data.temperatureC : state.data.temperatureF;
      }
    },
  },
  extraReducers: builder => {
    builder
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
      .addCase(fetchCityWeather.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchCityWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export const { setSelectedUnit } = currentWeatherSlice.actions;
export default currentWeatherSlice.reducer;
