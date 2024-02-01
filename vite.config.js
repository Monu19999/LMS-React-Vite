import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

let __dirname = '.';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
      alias: {
          '@public'   : path.resolve(__dirname, 'public/'),
          '@src'   : path.resolve(__dirname, 'src/'),
          '@features'   : path.resolve(__dirname, 'src/features'),
          '@pages'   : path.resolve(__dirname, 'src/Pages/'),
          '@components'   : path.resolve(__dirname, 'src/Components/'),
      }
  },
  plugins: [react()],
})
