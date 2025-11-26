// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // <--- You need to import 'path'

export default defineConfig({
  base: '/product-management-app/',
  plugins: [vue()],
  css: {
    postcss: './postcss.config.js',
  },
  resolve: { // <--- Add this resolve block
    alias: {
      '@': path.resolve(__dirname, './src'), // <--- This configures the @ alias
    },
  },
})