import { configureStore } from '@reduxjs/toolkit';

import currentWeatherReducer from './slices/currentWeatherSlice';
import dailyEvolutionReducer from './slices/dailyEvolutionSlice';
import forecastReducer from './slices/forecastSlice';

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherReducer,
    forecast: forecastReducer,
    dailyEvolution: dailyEvolutionReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these specific action types
        ignoredActions: [
          'currentWeather/fetchByLocation/rejected',
          'currentWeather/fetchByCity/rejected',
          'forecast/fetchByLocationKey/rejected',
          'dailyEvolution/fetch/rejected',
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['error', 'meta.arg'],
        // Ignore these paths in the state
        ignoredPaths: ['currentWeather.error', 'forecast.error', 'dailyEvolution.error'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
