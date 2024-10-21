// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.jsx'],
      refresh: true,
    }),
    react(),
  ],
  server: {
    host: '127.0.0.1', // This makes the Vite server accessible externally
    port: 5173, // Vite's default port
    hmr: {
      host: 'localhost', // You can replace 'localhost' with the host machine IP if needed
      port: 5173,
    },
    watch: {
      usePolling: true, // Necessary to ensure file changes are detected in Docker
    },
  },
});
