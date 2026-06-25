import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          // Keep charting libraries out of initial page load.
          if (id.includes('recharts') || id.includes('d3-')) return 'charts'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) return 'forms'
          if (id.includes('react-day-picker') || id.includes('date-fns')) return 'datepicker'

          // Let Rollup auto-balance the remaining vendor graph to avoid
          // circular dependencies across manually split vendor chunks.
          return
        },
      },
    },
  },
  optimizeDeps: {
    include: ['lenis']
  }
})
