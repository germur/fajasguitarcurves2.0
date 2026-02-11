import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './lib/router';
import { StoreProvider } from './storefront/hooks/useStoreContext';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary'; // Import Error Boundary
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </GlobalErrorBoundary>
  </StrictMode>
);
