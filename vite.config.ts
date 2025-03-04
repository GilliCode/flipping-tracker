import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/flipping-tracker/', // Fix asset paths for GitHub Pages
  plugins: [react()],
});
