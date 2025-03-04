import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const base = process.env.NODE_ENV === 'production' ? '/flipping-tracker/' : '/flipping-tracker/';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: '404.html',
          dest: ''
        }
      ]
    })
  ],
  base
});
