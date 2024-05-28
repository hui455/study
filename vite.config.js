import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {prismjsPlugin} from 'vite-plugin-prismjs'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    prismjsPlugin({
      languages: 'all',
      plugins: ['line-numbers', 'copy-to-clipboard'],
      css: true,
      theme:'okaidia'
  }
    )
  ],
  base:'./',
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
