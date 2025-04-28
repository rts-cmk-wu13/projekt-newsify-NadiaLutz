import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: './',
  build: {
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, 'home.html'),
      }
    }
  }
});