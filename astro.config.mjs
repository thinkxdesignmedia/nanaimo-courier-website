import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nanaimocourier.com',
  output: 'static',
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  vite: {
    ssr: {
      external: ['sharp'],
    },
  },
});
