import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const base = process.env.NODE_ENV === 'production' ? '/flipping-tracker/' : '/flipping-tracker/';

export default defineConfig({
  plugins: [react()],
  base
});
