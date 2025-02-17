import type { Metadata } from 'next';

import AppProvider from './context/AppProvider';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Next.js PWA App',
  description: 'A simple Next.js PWA application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-status-bar" content="#000000" />
      </head>
      <body suppressHydrationWarning={true}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
