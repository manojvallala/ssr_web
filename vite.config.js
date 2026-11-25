import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Media lives in public/assets (served at /assets/... exactly as before);
// Vite's own JS/CSS bundles go to /static so the two never mix.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'static',
  },
  server: { port: 5173 },
  preview: { port: 5173 },
});
