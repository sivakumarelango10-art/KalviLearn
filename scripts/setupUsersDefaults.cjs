const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

async function main() {
  console.log('Setting defaults for id and updatedAt on users table...');
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "public"."users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "public"."users" ALTER COLUMN "updatedAt" SET DEFAULT now();`);
    console.log('✅ Defaults configured successfully!');
  } catch (err) {
    console.error('Error setting defaults:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
