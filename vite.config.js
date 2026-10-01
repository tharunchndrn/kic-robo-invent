import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Two pages: the landing site, and the competition stopwatch at /stopwatch/.
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        stopwatch: resolve(import.meta.dirname, 'stopwatch/index.html'),
      },
    },
  },
})
