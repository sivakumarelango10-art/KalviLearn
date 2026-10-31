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

  // 1. Safety check before wiping users
  if (process.env.ALLOW_USER_TABLE_RESET === 'true') {
    await prisma.user.deleteMany({});
    console.log('Cleared all existing users from users table.');
  } else {
    console.log('Skipping destructive user table wipe (ALLOW_USER_TABLE_RESET !== "true"). Upserting test users.');
  }

  // 2. Synthetic test users for local testing
  const fs = require('fs');
  const allowedUsers = process.env.USERS_SEED_FILE && fs.existsSync(process.env.USERS_SEED_FILE)
    ? JSON.parse(fs.readFileSync(process.env.USERS_SEED_FILE, 'utf8'))
    : [
        {
          email: 'test.student1@kalvilearn.test',
          role: 'STUDENT',
          status: 'ACTIVE',
          name: 'Synthetic Student One',
        },
        {
          email: 'test.student2@kalvilearn.test',
          role: 'STUDENT',
          status: 'ACTIVE',
          name: 'Synthetic Student Two',
        },
        {
          email: 'test.mentor1@kalvilearn.test',
          role: 'MENTOR',
          status: 'ACTIVE',
          name: 'Synthetic Mentor One',
        },
      ];

  for (const u of allowedUsers) {
    const created = await prisma.user.upsert({
      where: { email: u.email },
      update: { role: u.role, status: u.status, name: u.name },
      create: u,
    });
    console.log(`Configured user: ${created.email} (${created.role}, ${created.status})`);
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
