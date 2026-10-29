import { build } from 'esbuild'

const targets = [
  'api/super-admin.js',
  'api/super-admin/dashboard.js',
  'api/super-admin/campuses.js',
  'api/super-admin/managers.js',
  'api/super-admin/mentors.js',
  'api/super-admin/students.js',
  'api/super-admin/roles.js',
  'api/super-admin/audit.js',
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

console.log('✓ Super Admin API bundles generated (api/super-admin.js and subroutes)')
