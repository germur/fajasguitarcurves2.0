import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './lib/router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <shopify-store
        store-domain="92542c-b5.myshopify.com"
        public-access-token="04c58a7586c413051625b8a9aedd0416"
      >
        <RouterProvider router={router} />
      </shopify-store>
    </HelmetProvider>
  </React.StrictMode>
);
