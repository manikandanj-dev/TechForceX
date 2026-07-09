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
          const packagePath = id.replaceAll('\\', '/')
          if (
            packagePath.includes('/react/') ||
            packagePath.includes('/react-dom/') ||
            packagePath.includes('/react-router-dom/')
          )
            return 'vendor-react'
          if (packagePath.includes('/@mui/') || packagePath.includes('/@emotion/'))
            return 'vendor-mui'
          if (
            packagePath.includes('/framer-motion/') ||
            packagePath.includes('/gsap/') ||
            packagePath.includes('/motion-dom/') ||
            packagePath.includes('/motion-utils/')
          )
            return 'vendor-motion'
          if (packagePath.includes('/@react-three/')) return 'vendor-three-react'
          if (packagePath.includes('/@monogrid/')) return 'vendor-three-helpers'
          if (
            packagePath.includes('/three-stdlib/') ||
            packagePath.includes('/three-mesh-bvh/') ||
            packagePath.includes('/maath/') ||
            packagePath.includes('/meshline/') ||
            packagePath.includes('/camera-controls/') ||
            packagePath.includes('/troika-three-text/') ||
            packagePath.includes('/troika-three-utils/') ||
            packagePath.includes('/troika-worker-utils/') ||
            packagePath.includes('/stats-gl/') ||
            packagePath.includes('/suspend-react/')
          )
            return 'vendor-three-helpers'
          if (packagePath.includes('/three/')) return 'vendor-three'
          if (
            packagePath.includes('/@tanstack/') ||
            packagePath.includes('/axios/') ||
            packagePath.includes('/zustand/')
          )
            return 'vendor-data'
          return 'vendor'
        },
      },
    },
  },
})
