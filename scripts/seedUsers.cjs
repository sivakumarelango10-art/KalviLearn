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
  console.log('--- Cleaning and Seeding Users Table ---');

  // 1. Clear all existing users
  await prisma.user.deleteMany({});
  console.log('Cleared all existing users from users table.');

  // 2. Insert the two specified users
  const allowedUsers = [
    {
      email: 'kavya.ramesh.s.121@kalvium.community',
      role: 'STUDENT',
      status: 'ACTIVE',
      name: 'Kavya Ramesh',
    },
    {
      email: 'prajith.p.s.121@kalvium.community',
      role: 'STUDENT',
      status: 'ACTIVE',
      name: 'Prajith P S',
    },
    {
      email: 'rahul@kalvium.community',
      role: 'MENTOR',
      status: 'ACTIVE',
      name: 'Rahul',
    },
    {
      email: 'sivakumarelango10@gmail.com',
      role: 'MENTOR',
      status: 'ACTIVE',
      name: 'Rahul',
    },
  ];

  for (const u of allowedUsers) {
    const created = await prisma.user.create({
      data: u,
    });
    console.log(`Created user: ${created.email} (${created.role}, ${created.status})`);
  }

  // 3. Ensure permissions and RLS policies on public.users
  console.log('Configuring PostgreSQL permissions for Supabase client read access...');
  try {
    await prisma.$executeRawUnsafe(`GRANT SELECT ON TABLE "public"."users" TO anon;`);
    await prisma.$executeRawUnsafe(`GRANT SELECT ON TABLE "public"."users" TO authenticated;`);
    await prisma.$executeRawUnsafe(`GRANT SELECT ON TABLE "public"."users" TO service_role;`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;`);
    await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Allow public read access to users" ON "public"."users";`);
    await prisma.$executeRawUnsafe(`CREATE POLICY "Allow public read access to users" ON "public"."users" FOR SELECT USING (true);`);
    console.log('Permissions and RLS policies configured successfully.');
  } catch (permErr) {
    console.warn('Note on permissions:', permErr.message);
  }

  // 4. Verify users in DB
  const users = await prisma.user.findMany();
  console.log(`Current users in database (${users.length}):`);
  console.table(users);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Failed to seed users:', err);
  process.exit(1);
});
