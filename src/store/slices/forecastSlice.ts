import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ForecastService } from '@/api/weather/forecast.service';
import { IForecastDay } from '@/types/weather.types';

interface ForecastState {
  data: IForecastDay[];
  loading: boolean;
  error: string | null;
}

const initialState: ForecastState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchForecast = createAsyncThunk(
  'forecast/fetchByLocationKey',
  async (locationKey: string, { rejectWithValue }) => {
    try {
      const forecastService = new ForecastService();
      return await forecastService.getFiveDayForecast(locationKey);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch forecast data');
    }
  }
);

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchForecast.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch forecast data';
      });
  },
});

export default forecastSlice.reducer;
