import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Strict CSP, injected into the production build only
// (the Vite dev server needs inline scripts for hot reload).
const CSP = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "base-uri 'self'",
  "form-action 'none'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = () => ({
  name: 'security-meta',
  apply: 'build',
  transformIndexHtml(html) {
    const metas =
      `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />` +
      `\n    <meta name="referrer" content="strict-origin-when-cross-origin" />`
    return html.replace('<meta charset="UTF-8" />', metas)
  },
})

// GitHub Pages base path:
//   <user>.github.io repo -> BASE_PATH=/
//   project repo "portfolio" -> BASE_PATH=/portfolio/
// Default './' works for both and for local preview.
export default defineConfig({
  plugins: [react(), securityHeaders()],
  base: process.env.BASE_PATH || './',
  build: { sourcemap: false, target: 'es2020' },
})
