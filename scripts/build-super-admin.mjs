import { build } from 'esbuild'

const targets = [
  'api/super-admin.js',
]

for (const outfile of targets) {
  await build({
    entryPoints: ['src/server/superAdminHandler.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node18',
    outfile,
  })
}

console.log('✓ Super Admin API bundle generated (api/super-admin.js)')
