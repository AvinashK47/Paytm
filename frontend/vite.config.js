import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Useful for environments where file changes aren't detected automatically
    },
  },
});
