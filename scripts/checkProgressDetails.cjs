const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

async function check() {
  const up = await prisma.userProgress.findMany({
    include: { problem: { select: { slug: true, title: true, beltId: true } } },
    take: 20,
  });
  console.log('UserProgress count:', up.length);
  for (const p of up) {
    console.log(`userId: ${p.userId} | problem: ${p.problem?.title} (${p.problem?.slug}) | status: ${p.status} | lang: ${p.language}`);
  }

  const sub = await prisma.submission.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: { problem: { select: { slug: true, title: true } } },
  });
  console.log('\nSubmissions count:', sub.length);
  for (const s of sub) {
    console.log(`userId: ${s.userId} | problem: ${s.problem?.title} | status: ${s.status} | lang: ${s.language} | time: ${s.createdAt}`);
  }

  await prisma.$disconnect();
}

check();
