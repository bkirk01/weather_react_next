import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { CtxCurrentLocationProvider } from '@/app/context/CtxCurrentLocation';
import currentWeatherReducer, {
  initialState as initialStateCurrentWeather,
} from '@/store/slices/currentWeatherSlice';
import dailyEvolutionReducer, {
  initialState as initialStateDailyEvolution,
} from '@/store/slices/dailyEvolutionSlice';
import forecastReducer, {
  initialState as initialStateForecast,
} from '@/store/slices/forecastSlice';
import type { RootState } from '@/store/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
}

// This type interface extends the default store state from redux-toolkit
// to include our custom reducers
interface ExtendedRootState extends RootState {
  currentWeather: ReturnType<typeof currentWeatherReducer>;
  forecast: ReturnType<typeof forecastReducer>;
  dailyEvolution: ReturnType<typeof dailyEvolutionReducer>;
}

export function setupStore(preloadedState?: Partial<ExtendedRootState>) {
  const defaultState: RootState = {
    currentWeather: initialStateCurrentWeather,
    forecast: initialStateForecast,
    dailyEvolution: initialStateDailyEvolution,
  };

  const completeState = { ...defaultState, ...preloadedState };

  return configureStore({
    reducer: {
      currentWeather: currentWeatherReducer,
      forecast: forecastReducer,
      dailyEvolution: dailyEvolutionReducer,
    },
    preloadedState: completeState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            'currentWeather/fetchByLocation/rejected',
            'currentWeather/fetchByCity/rejected',
            'forecast/fetchByLocationKey/rejected',
            'dailyEvolution/fetchDailyEvolution/rejected',
          ],
          ignoredActionPaths: ['error', 'meta.arg'],
          ignoredPaths: ['currentWeather.error', 'forecast.error', 'dailyEvolution.error'],
        },
      }),
  });
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <CtxCurrentLocationProvider>{children}</CtxCurrentLocationProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Re-export everything from testing-library
export * from '@testing-library/react';
