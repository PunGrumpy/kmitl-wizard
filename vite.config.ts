import { crx } from '@crxjs/vite-plugin'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import zipPack from 'vite-plugin-zip-pack'
import manifest from './src/manifest.config'

export default defineConfig({
  plugins: [
    svelte(),
    crx({ manifest }),
    zipPack({
      inDir: 'dist',
      outDir: 'dist',
      outFileName: 'kmitl-wizard.zip'
    })
  ],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173
    }
  }
})
