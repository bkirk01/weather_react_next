'use client';

import React, { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { CtxCurrentLocationProvider } from '@/app/context/CtxCurrentLocation';
import { store } from '@/store/store';

const providers = [
  (children: ReactNode) => <ReduxProvider store={store}>{children}</ReduxProvider>,
  (children: ReactNode) => <CtxCurrentLocationProvider>{children}</CtxCurrentLocationProvider>,
];

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return providers.reduceRight((acc, Provider) => Provider(acc), children);
};

export default AppProvider;
