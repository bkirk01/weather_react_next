import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ForecastDay {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
}

interface ForecastState {
  days: ForecastDay[];
  loading: boolean;
  error: string | null;
}

const initialState: ForecastState = {
  days: [],
  loading: false,
  error: null,
};

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setForecast: (state, action: PayloadAction<ForecastDay[]>) => {
      state.days = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setForecast, setLoading, setError } = forecastSlice.actions;
export default forecastSlice.reducer;
