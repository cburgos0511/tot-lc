import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        'admin-panel': 'public/admin-panel.html',
      },
    },
  },
  server: {
    open: '/admin-panel.html',
  },
}); 