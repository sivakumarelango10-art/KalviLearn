import { build } from 'esbuild'

const targets = [
  'api/content-manager.js',
]

for (const outfile of targets) {
  await build({
    entryPoints: ['src/server/contentManagerHandler.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node18',
    outfile,
  })
}

console.log('✓ Content Manager API bundle generated (api/content-manager.js)')
