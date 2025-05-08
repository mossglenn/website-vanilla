import path from 'path';
import { fileURLToPath } from 'url';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [],
  vite: {
    server: {
      fs: {
        allow: ['.'], // Only include the current project folder
        deny: ['/Users/amosglenn/Dev/website-vanilla/_portfolio-site-resources']
      }
    },
    optimizeDeps: {
      exclude: ['_portfolio-site-resources']
    },
    build: {
      rollupOptions: {
        external: ['_portfolio-site-resources']
      }
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@pages': path.resolve('./src/pages'),
        '@public': path.resolve('./public'),
        '@styles': path.resolve('./src/styles'),
        '@utils': path.resolve('./src/utils'),
        '@assets': path.resolve('./src/assets'),
        '@project-images': path.resolve('./src/assets/images/project-images')
      }
    },
    plugins: [tailwindcss()]
  }
});
