import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'
import { fileURLToPath } from 'node:url'

// Vitest 配置
export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: ['e2e/**'],
    root: fileURLToPath(new URL('./', import.meta.url))
  },
  ...viteConfig // Spread 语法合并 Vite 配置
})

