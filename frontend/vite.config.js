import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      tailwindcss()
  ],
  server: {
  proxy: {
    '/api': {
      target: 'https://store-5w0m.onrender.com',
      changeOrigin: true,
      secure: false,
    },
  },
  },
  build:{
      outDir: '../backend/dist',
      emptyOutDir: true
  }
})
