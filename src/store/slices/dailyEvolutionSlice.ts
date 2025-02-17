import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DailyEvolution {
  hour: number;
  temperature: number;
}

interface DailyEvolutionState {
  data: DailyEvolution[];
  loading: boolean;
  error: string | null;
}

const initialState: DailyEvolutionState = {
  data: [],
  loading: false,
  error: null,
};

export const dailyEvolutionSlice = createSlice({
  name: 'dailyEvolution',
  initialState,
  reducers: {
    setDailyEvolution: (state, action: PayloadAction<DailyEvolution[]>) => {
      state.data = action.payload;
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

export const { setDailyEvolution, setLoading, setError } = dailyEvolutionSlice.actions;
export default dailyEvolutionSlice.reducer;
