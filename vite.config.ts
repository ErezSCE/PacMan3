import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunk
          vendor: ['react', 'react-dom']
        }
      }
    },
    // Enforce bundle size limit (approx 2 MB)
    chunkSizeWarningLimit: 2000 // in KB
  },
  server: {
    port: 3000
  }
});
