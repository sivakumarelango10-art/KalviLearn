import fs from 'fs'
import path from 'path'

const distDir = path.resolve('dist')
const publicDir = path.resolve('public')

if (fs.existsSync(distDir)) {
  fs.cpSync(distDir, publicDir, { recursive: true })
  console.log('✓ Synced build output to public/ for universal Vercel deployment compatibility.')
}
