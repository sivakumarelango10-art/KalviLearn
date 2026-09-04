const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

async function check() {
  const users = await prisma.user.findMany();
  console.log('--- Users in public.users ---');
  for (const u of users) {
    console.log(`${u.id} -> ${u.email} (${u.name}, ${u.role})`);
  }

  const subs = await prisma.submission.groupBy({
    by: ['userId'],
    _count: { id: true },
  });
  console.log('\n--- Submissions by userId ---');
  console.log(subs);

  const prog = await prisma.userProgress.groupBy({
    by: ['userId'],
    _count: { id: true },
  });
  console.log('\n--- Progress by userId ---');
  console.log(prog);

  // Check auth.users table via raw SQL
  try {
    const authUsers = await prisma.$queryRawUnsafe(`SELECT id, email, created_at FROM auth.users`);
    console.log('\n--- auth.users in Supabase Auth ---');
    console.log(authUsers);
  } catch (err) {
    console.log('auth.users query failed:', err.message);
  }

  await prisma.$disconnect();
}

check();
