import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'

function apiPlugin(): Plugin {
  const middleware = (server: any) => async (req: any, res: any, next: any) => {
    if (req.url === '/api/execute') {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

      if (req.method === 'OPTIONS') {
        res.statusCode = 204
        res.end()
        return
      }

      if (req.method !== 'POST') {
        res.statusCode = 405
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Method Not Allowed. Use POST.' }))
        return
      }

      let rawData = ''
      req.on('data', (chunk: any) => {
        rawData += chunk
      })
      req.on('end', async () => {
        try {
          const body = JSON.parse(rawData || '{}')
          const { questionSlug, language, code } = body || {}

          if (!questionSlug || !language || !code) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({
                success: false,
                error: 'Missing Parameters',
                message: 'questionSlug, language, and code are required.',
                total: 10,
                passed: 0,
                testCases: [],
              })
            )
            return
          }

          const { executeQuestion } = await server.ssrLoadModule('/src/server/executeService.ts')
          const result = await executeQuestion(body)

          if (result.error === 'Question Not Found') {
            res.statusCode = 404
          } else if (result.error === 'Compilation Error') {
            res.statusCode = 422
          } else if (!result.success && result.error) {
            res.statusCode = 500
          } else {
            res.statusCode = 200
          }

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result))
        } catch (err: any) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              success: false,
              error: 'Execution Error',
              message: err.message || 'Internal Server Error',
              total: 10,
              passed: 0,
              testCases: [],
            })
          )
        }
      })
      return
    }
    next()
  }

  return {
    name: 'api-server-middleware',
    configureServer(server) {
      server.middlewares.use(middleware(server))
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware(server))
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), apiPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-monaco': ['@monaco-editor/react'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
})

