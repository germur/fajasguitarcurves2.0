import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './lib/router';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';
import './i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </GlobalErrorBoundary>
  </StrictMode>
);
