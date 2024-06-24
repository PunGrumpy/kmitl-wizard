import { crx } from '@crxjs/vite-plugin'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import AutoZip from 'vite-plugin-auto-zip'
import manifest from './src/manifest.config'

export default defineConfig({
  plugins: [svelte(), crx({ manifest }), AutoZip()],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173
    }
  }
})
