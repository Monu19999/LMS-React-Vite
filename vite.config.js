import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

let __dirname = '.';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      base: 'http://eshiksha.test.com/assets/',
    },
  },
  resolve: {
    alias: {
      '@public': path.resolve(__dirname, 'public/'),
      '@src': path.resolve(__dirname, 'src/'),
    }
  },
  plugins: [react()],
  base: '/',
  baseServer: 'http://eshiksha.test.com'
})
