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
      target: 'https://store-1-33c5.onrender.com',
      changeOrigin: true,
      secure: false,
    },
    '/uploads/' : {
      target: 'http://localhost:4000',
    }
  },
},
})
