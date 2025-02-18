import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchForecast } from '@/store/slices/forecastSlice';
import { RootState, AppDispatch } from '@/store/store';

export const useForecast = (locationKey: string | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: forecast, loading, error } = useSelector((state: RootState) => state.forecast);

  useEffect(() => {
    if (locationKey) {
      dispatch(fetchForecast(locationKey));
    }
  }, [dispatch, locationKey]);

  return { forecast, loading, error };
};
