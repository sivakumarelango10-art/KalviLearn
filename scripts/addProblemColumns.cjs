const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  console.log('Adding exampleExplanation, examples, and subdivision columns to Problem table if not exists...');
  await prisma.$executeRawUnsafe(`ALTER TABLE "Problem" ADD COLUMN IF NOT EXISTS "exampleExplanation" TEXT;`);
  await prisma.$executeRawUnsafe(`ALTER TABLE "Problem" ADD COLUMN IF NOT EXISTS "examples" JSONB;`);
  await prisma.$executeRawUnsafe(`ALTER TABLE "Problem" ADD COLUMN IF NOT EXISTS "subdivision" TEXT;`);
  console.log('✅ Columns added successfully to PostgreSQL "Problem" table!');
  await prisma.$disconnect();
}

run().catch(err => {
  console.error('Error adding columns:', err);
  process.exit(1);
});
