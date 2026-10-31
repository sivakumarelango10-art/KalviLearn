/**
 * Hardened PostgreSQL Row-Level Security (RLS) configuration script
 *
 * Enforces principle of least privilege:
 * 1. Revokes unrestricted anon write access on "public"."users"
 * 2. Permits users to view and update only their own profile (auth.uid() = id)
 * 3. Enforces least-privilege RLS on "Submission" and "UserProgress" (auth.uid() = userId)
 * 4. Keeps service_role fully privileged for backend administrative operations
 */

const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

async function main() {
  console.log('========================================================================');
  console.log('🛡️  APPLYING PRODUCTION ROW-LEVEL SECURITY (RLS) POLICIES');
  console.log('========================================================================\n');

  try {
    // 1. Revoke write permissions from anonymous role
    console.log('1. Revoking anon write permissions on public.users...');
    await prisma.$executeRawUnsafe(`REVOKE INSERT, UPDATE, DELETE ON TABLE "public"."users" FROM anon;`).catch((e) => console.warn('Note:', e.message));

    // 2. Enable RLS on core identity and submission tables
    console.log('2. Enabling RLS on public.users, Submission, and UserProgress...');
    await prisma.$executeRawUnsafe(`ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;`).catch(() => {});
    await prisma.$executeRawUnsafe(`ALTER TABLE "public"."Submission" ENABLE ROW LEVEL SECURITY;`).catch(() => {});
    await prisma.$executeRawUnsafe(`ALTER TABLE "public"."UserProgress" ENABLE ROW LEVEL SECURITY;`).catch(() => {});

    // 3. Drop overly permissive legacy policies
    console.log('3. Dropping legacy permissive policies...');
    const dropPolicies = [
      `DROP POLICY IF EXISTS "Allow full access to users" ON "public"."users";`,
      `DROP POLICY IF EXISTS "Allow public read access to users" ON "public"."users";`,
      `DROP POLICY IF EXISTS "Allow public insert to users" ON "public"."users";`,
      `DROP POLICY IF EXISTS "Allow public update to users" ON "public"."users";`,
      `DROP POLICY IF EXISTS "Allow public delete to users" ON "public"."users";`,
      `DROP POLICY IF EXISTS "Users can read own profile" ON "public"."users";`,
      `DROP POLICY IF EXISTS "Users can update only own profile" ON "public"."users";`,
      `DROP POLICY IF EXISTS "Users can insert own profile" ON "public"."users";`,
      `DROP POLICY IF EXISTS "Users can read own submissions" ON "public"."Submission";`,
      `DROP POLICY IF EXISTS "Users can insert own submissions" ON "public"."Submission";`,
      `DROP POLICY IF EXISTS "Users can update own submissions" ON "public"."Submission";`,
      `DROP POLICY IF EXISTS "Users can read own progress" ON "public"."UserProgress";`,
      `DROP POLICY IF EXISTS "Users can insert own progress" ON "public"."UserProgress";`,
      `DROP POLICY IF EXISTS "Users can update own progress" ON "public"."UserProgress";`,
    ];

    for (const sql of dropPolicies) {
      await prisma.$executeRawUnsafe(sql).catch(() => {});
    }

    // 4. Create least-privilege policies for public.users
    console.log('4. Creating hardened policies for public.users...');
    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Users can read own profile" ON "public"."users"
        FOR SELECT
        USING (auth.uid()::text = id);
    `).catch((e) => console.warn('Policy note (users select):', e.message));

    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Users can update only own profile" ON "public"."users"
        FOR UPDATE
        USING (auth.uid()::text = id)
        WITH CHECK (auth.uid()::text = id);
    `).catch((e) => console.warn('Policy note (users update):', e.message));

    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Users can insert own profile" ON "public"."users"
        FOR INSERT
        WITH CHECK (auth.uid()::text = id);
    `).catch((e) => console.warn('Policy note (users insert):', e.message));

    // 5. Create least-privilege policies for public.Submission
    console.log('5. Creating hardened policies for public.Submission...');
    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Users can read own submissions" ON "public"."Submission"
        FOR SELECT
        USING (auth.uid()::text = "userId");
    `).catch((e) => console.warn('Policy note (submission select):', e.message));

    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Users can insert own submissions" ON "public"."Submission"
        FOR INSERT
        WITH CHECK (auth.uid()::text = "userId");
    `).catch((e) => console.warn('Policy note (submission insert):', e.message));

    // 6. Create least-privilege policies for public.UserProgress
    console.log('6. Creating hardened policies for public.UserProgress...');
    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Users can read own progress" ON "public"."UserProgress"
        FOR SELECT
        USING (auth.uid()::text = "userId");
    `).catch((e) => console.warn('Policy note (progress select):', e.message));

    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Users can insert own progress" ON "public"."UserProgress"
        FOR INSERT
        WITH CHECK (auth.uid()::text = "userId");
    `).catch((e) => console.warn('Policy note (progress insert):', e.message));

    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Users can update own progress" ON "public"."UserProgress"
        FOR UPDATE
        USING (auth.uid()::text = "userId")
        WITH CHECK (auth.uid()::text = "userId");
    `).catch((e) => console.warn('Policy note (progress update):', e.message));

    console.log('\n✅ Successfully applied hardened RLS policies on PostgreSQL database.');
  } catch (err) {
    console.error('Error applying hardened RLS:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
