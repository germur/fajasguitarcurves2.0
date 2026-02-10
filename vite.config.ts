import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/cart': {
        target: 'https://92542c-b5.myshopify.com',
        changeOrigin: true,
        secure: false,
      },
      '/checkouts': {
        target: 'https://92542c-b5.myshopify.com',
        changeOrigin: true,
        secure: false,
      },
      '/wc': {
        target: 'https://92542c-b5.myshopify.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
