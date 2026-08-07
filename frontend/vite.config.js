import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      tailwindcss()
  ],

  resolve:{
    alias:{
      "@":path.resolve(__dirname,"./src")
    }
  },
   publicDir: 'public',
  server: {
  proxy: {
    '/api': {
      target: "http://13.233.156.6:30090",
      changeOrigin: true,
      secure: false,
    },
  },
},
})
