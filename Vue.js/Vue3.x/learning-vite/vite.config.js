import { defineConfig } from 'vite'
const {resolve} = require('path')
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  alias: {
   '@': resolve(__dirname, 'src'),
    '_c': resolve(__dirname, 'src/components'),
  },
})
