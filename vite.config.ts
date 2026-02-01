import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
  alias: {
    '@reportify': '/src',
  }
  },
    server: {
    allowedHosts: [
      '5173.devops.my.id',       // allows my-app.com   // relevant for Docker setups where hostnames are container names
    ]
  },
});
