import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Split vendor chunks for better long-term caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'gsap-vendor': ['gsap'],
        },
      },
    },
    // Inline small assets as base64 (saves HTTP requests)
    assetsInlineLimit: 4096,
    // Minify with esbuild (default, fast)
    minify: 'esbuild',
    // Split CSS per chunk for parallel loading
    cssCodeSplit: true,
    // Generate source maps for production debugging (optional – remove if not needed)
    sourcemap: false,
  },
})
