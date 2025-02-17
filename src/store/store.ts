import { configureStore } from '@reduxjs/toolkit';

import currentWeatherReducer from './slices/currentWeatherSlice';

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these specific action types
        ignoredActions: [
          'currentWeather/fetchByLocation/rejected',
          'currentWeather/fetchByCity/rejected',
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['error', 'meta.arg'],
        // Ignore these paths in the state
        ignoredPaths: ['error'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
