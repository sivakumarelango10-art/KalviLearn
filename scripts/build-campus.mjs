import { build } from 'esbuild'

const targets = [
  'api/campus.js',
  'api/campus/students.js',
  'api/campus/mentors.js',
  'api/campus/assign-mentor.js',
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

console.log('✓ Campus API bundles generated (api/campus.js, api/campus/students.js, api/campus/mentors.js, api/campus/assign-mentor.js)')

