import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/fanana-art/',  // because your site lives at ...github.io/fanana-art/
  build: { outDir: 'docs' } // build into /docs for Pages
})
