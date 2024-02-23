import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? '/ai-exercises-generator/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: './build',
  },
});
