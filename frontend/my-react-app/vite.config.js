import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host:true, 
    proxy: {
      '^/api*': { 
        target: 'http://localhost:8000/' ,
       changeOrigin: false,
    },   
  }
  },
  build: {
    outDir: 'build', // 👈 this makes Vite output to 'build/' instead of 'dist/'
  },
})
