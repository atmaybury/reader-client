import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import tsconfigpaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    watch: {
      ignored: ['**/coverage/**', 'node_modules/**'],
    },
  },
  plugins: [
    react(),
    checker({
      typescript: {
        tsconfigPath: './tsconfig.app.json',
      },
    }),
    tsconfigpaths(),
  ],
});
