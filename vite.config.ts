import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import { context as esbuildContext } from 'esbuild'

// Longest/most specific prefixes first.
const API_ROUTES: Array<{ match: (url: string) => boolean; module: string }> = [
  { match: (u) => u.startsWith('/api/feedback'), module: '/src/server/feedbackHandler.ts' },
  { match: (u) => u.startsWith('/api/integrations/teamsync/webhooks'), module: '/src/server/teamSyncWebhookHandler.ts' },
  { match: (u) => u.startsWith('/api/integrations/teamsync'), module: '/src/server/teamSyncHandler.ts' },
  { match: (u) => u.startsWith('/api/submit'), module: '/src/server/submitHandler.ts' },
  { match: (u) => u.startsWith('/api/execute'), module: '/src/server/apiHandler.ts' },
]

/**
 * The judge forks a sandbox child process from a compiled worker bundle. In development that bundle is built from
 * source here and rebuilt on every change (esbuild watch), so the dev server can never execute a stale copy of the
 * language runners. sandboxHost.ts picks it up through KALVI_SANDBOX_ENTRY.
 */
async function startSandboxWorkerBuild(): Promise<void> {
  const outfile = fileURLToPath(new URL('./node_modules/.kalvi-sandbox/sandbox-worker.mjs', import.meta.url))
  const ctx = await esbuildContext({
    entryPoints: [fileURLToPath(new URL('./src/server/sandboxWorker.ts', import.meta.url))],
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node18',
    outfile,
    logLevel: 'warning',
  })
  await ctx.rebuild()
  await ctx.watch()
  process.env.KALVI_SANDBOX_ENTRY = outfile
}

/** Dev/preview parity with the Vercel serverless functions: every route runs the real handler (auth included). */
function apiPlugin(): Plugin {
  const middleware = (server: any) => async (req: any, res: any, next: any) => {
    const url: string = req.url || ''
    const route = API_ROUTES.find((r) => r.match(url))
    if (!route) return next()
    try {
      const { default: handler } = await server.ssrLoadModule(route.module)
      return await handler(req, res)
    } catch (err: unknown) {
      console.error('[dev-api] handler failure:', err instanceof Error ? err.message : err)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: false, error: 'Internal Server Error', message: 'Unexpected server error.' }))
    }
  }

  return {
    name: 'api-server-middleware',
    async configureServer(server) {
      await startSandboxWorkerBuild()
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
