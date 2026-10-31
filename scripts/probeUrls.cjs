const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

async function main() {
  const testUrls = [
    'https://kalvilearn.vercel.app',
    'https://kalvilearn.vercel.app/login',
    'https://kalvilearn.vercel.app/auth/callback',
    'https://kalvicode.vercel.app',
    'https://kalvicode.vercel.app/login',
    'http://localhost:5173',
    'http://localhost:5173/login',
  ];

  console.log('--- Probing Supabase URL Allow List ---');
  for (const u of testUrls) {
    try {
      const res = await fetch(
        'https://iavxnhwbgoarnexmyxpn.supabase.co/auth/v1/authorize?provider=google&redirect_to=' +
          encodeURIComponent(u),
        { redirect: 'manual' }
      );
      const loc = res.headers.get('location') || '';
      const match = loc.match(/state=([a-f0-9-]+)/);
      if (match) {
        const stateId = match[1];
        const rows = await prisma.$queryRawUnsafe(
          `SELECT id, referrer FROM auth.flow_state WHERE id = '${stateId}'`
        );
        console.log(`Requested: ${u.padEnd(45)} => Stored Referrer: ${rows[0]?.referrer}`);
      }
    } catch (err) {
      console.error('Probe error for', u, err.message);
    }
  }

  await prisma.$disconnect();
}

main();
