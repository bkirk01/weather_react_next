import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { HourlyForecastService } from '@/api/weather/hourly.service';
import { DailyEvolutionData } from '@/components/DailyEvolution/DailyEvolution.types';

export interface DailyEvolutionState {
  data: DailyEvolutionData[];
  loading: boolean;
  error: string | null;
}

export const initialState: DailyEvolutionState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchDailyEvolution = createAsyncThunk(
  'dailyEvolution/fetch',
  async (locationKey: string, { rejectWithValue }) => {
    try {
      const hourlyService = new HourlyForecastService();
      return await hourlyService.get24HourForecast(locationKey);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch hourly forecast data');
    }
  }
);

const dailyEvolutionSlice = createSlice({
  name: 'dailyEvolution',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDailyEvolution.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyEvolution.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchDailyEvolution.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch hourly forecast data';
      });
  },
});

export default dailyEvolutionSlice.reducer;
