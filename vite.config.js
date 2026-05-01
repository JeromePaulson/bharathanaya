import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Split vendor chunks for better long-term caching (function format for Vite 8 / Rolldown)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'motion-vendor'
          }
          if (id.includes('node_modules/gsap')) {
            return 'gsap-vendor'
          }
        },
      },
    },
    // Inline small assets as base64 (saves HTTP requests)
    assetsInlineLimit: 4096,
    // Split CSS per chunk for parallel loading
    cssCodeSplit: true,
    // Generate source maps for production debugging (optional – remove if not needed)
    sourcemap: false,
  },
})
