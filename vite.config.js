import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
      '@animations': fileURLToPath(new URL('./src/animations', import.meta.url)),
      '@theme': fileURLToPath(new URL('./src/theme', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
    },
  },
  build: {
    // Fail loudly if a route/vendor chunk balloons unexpectedly instead of
    // silently shipping a huge bundle to production.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Group stable, rarely-changing vendor code into dedicated chunks
        // so browsers can cache them independently of app code that
        // changes on every release.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/[\\/](react|react-dom|react-router-dom)[\\/]/.test(id)) return 'vendor-react'
          if (/[\\/](@mui|@emotion)[\\/]/.test(id)) return 'vendor-mui'
          if (/[\\/](framer-motion|gsap|motion-dom|motion-utils)[\\/]/.test(id))
            return 'vendor-motion'
          if (/[\\/](@tanstack|axios|zustand)[\\/]/.test(id)) return 'vendor-data'
          return 'vendor'
        },
      },
    },
  },
})
