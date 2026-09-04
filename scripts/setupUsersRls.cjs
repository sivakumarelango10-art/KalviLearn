const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

async function main() {
  console.log('Configuring PostgreSQL permissions and RLS policies on public.users...');
  try {
    await prisma.$executeRawUnsafe(`GRANT ALL ON TABLE "public"."users" TO anon;`);
    await prisma.$executeRawUnsafe(`GRANT ALL ON TABLE "public"."users" TO authenticated;`);
    await prisma.$executeRawUnsafe(`GRANT ALL ON TABLE "public"."users" TO service_role;`);
    
    // Enable RLS
    await prisma.$executeRawUnsafe(`ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;`);
    
    // Drop existing policies if any
    await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Allow public read access to users" ON "public"."users";`);
    await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Allow public insert to users" ON "public"."users";`);
    await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Allow public update to users" ON "public"."users";`);
    await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Allow public delete to users" ON "public"."users";`);
    await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Allow full access to users" ON "public"."users";`);

    // Create full access policy
    await prisma.$executeRawUnsafe(`CREATE POLICY "Allow full access to users" ON "public"."users" FOR ALL USING (true) WITH CHECK (true);`);

    console.log('✅ Successfully granted full access policy on public.users');
  } catch (err) {
    console.error('Error setting RLS:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
