import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',              // IMPORTANT for custom domain
  build: { outDir: 'docs' }  // keep this if you publish from /docs
})
