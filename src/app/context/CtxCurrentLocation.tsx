'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';

import { TCurrentLocationUnitType } from '@/types/weather.types';

interface CtxCurrentLocationType {
  unit: TCurrentLocationUnitType;
  setUnit: (unit: TCurrentLocationUnitType) => void;
}

export const CtxCurrentLocation = createContext<CtxCurrentLocationType | undefined>(undefined);

export const CtxCurrentLocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState<TCurrentLocationUnitType>('C');
  return (
    <CtxCurrentLocation.Provider value={{ unit, setUnit }}>{children}</CtxCurrentLocation.Provider>
  );
};

export const useCtxCurrentLocation = () => {
  const context = useContext(CtxCurrentLocation);
  if (!context) {
    throw new Error('useCtxCurrentLocation must be used within a CtxCurrentLocationProvider');
  }
  return context;
};
