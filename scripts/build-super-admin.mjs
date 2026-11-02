import { build } from 'esbuild'
import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

const targets = ['api/super-admin.js', ...["dashboard","campuses","managers","mentors","students","roles","audit"].map((route) => `api/super-admin/${route}.js`)]

for (const outfile of targets) {
  await mkdir(dirname(outfile), { recursive: true })
  await build({
    entryPoints: ['src/server/superAdminHandler.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node18',
    outfile,
  })
}

console.log('Super Admin API bundles generated.')
