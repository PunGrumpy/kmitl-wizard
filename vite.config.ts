import { crx } from '@crxjs/vite-plugin'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import manifest from './manifest.config'

export default defineConfig({
  plugins: [svelte(), crx({ manifest })],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173
    }
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    emptyOutDir: true
  },
  assetsInclude: 'src/**/*'
})
