import { build } from 'esbuild'

const targets = [
  'api/campus.js',
]

for (const outfile of targets) {
  await build({
    entryPoints: ['src/server/campusHandler.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node18',
    outfile,
  })
}

console.log('✓ Campus API bundle generated (api/campus.js)')
