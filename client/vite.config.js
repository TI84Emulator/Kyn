import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './', // This ensures relative paths
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../docs'), // Adjust the path to your desired output directory
  },
});
