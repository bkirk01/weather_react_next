import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  city: string | null;
  country: string | null;
  key: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  city: null,
  country: null,
  key: null,
  loading: false,
  error: null,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<{ city: string; country: string; key: string }>) => {
      state.city = action.payload.city;
      state.country = action.payload.country;
      state.key = action.payload.key;
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

export const { setLocation, setLoading, setError } = locationSlice.actions;
export default locationSlice.reducer;
