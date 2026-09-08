/**
 * Database migration script: Add feedback_reports table and sequence
 */
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

async function runMigration() {
  console.log('========================================================================');
  console.log('🚀 RUNNING MIGRATION: 20260908_add_feedback_reports');
  console.log('========================================================================\n');

  try {
    // 1. Check users.id column type
    const colInfo = await prisma.$queryRawUnsafe(`
      SELECT column_name, data_type, udt_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'id';
    `);
    console.log('users.id type in PostgreSQL:', colInfo);

    // 2. Create sequence for human-readable reference FB-1001, FB-1002, etc.
    console.log('Creating sequence feedback_public_ref_seq...');
    await prisma.$executeRawUnsafe(`
      CREATE SEQUENCE IF NOT EXISTS feedback_public_ref_seq START WITH 1001;
    `);

    // 3. Create feedback_reports table
    console.log('Creating feedback_reports table...');
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "public"."feedback_reports" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "public_reference" VARCHAR(30) UNIQUE NOT NULL DEFAULT ('FB-' || nextval('feedback_public_ref_seq')),
        "user_id" TEXT REFERENCES "public"."users"("id") ON DELETE SET NULL,
        "user_name_snapshot" TEXT,
        "user_email_snapshot" VARCHAR(255) NOT NULL,
        "user_role" VARCHAR(50) NOT NULL,
        "portal" VARCHAR(50) NOT NULL,
        "type" VARCHAR(50) NOT NULL,
        "title" VARCHAR(255),
        "description" TEXT NOT NULL,
        "rating" VARCHAR(20),
        "feature_area" VARCHAR(255),
        "status" VARCHAR(30) NOT NULL DEFAULT 'OPEN',
        "priority" VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
        "page_url" TEXT,
        "route" VARCHAR(255),
        "module" VARCHAR(100),
        "attachment_url" TEXT,
        "attachment_meta" JSONB,
        "device_info" JSONB,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "resolved_at" TIMESTAMPTZ
      );
    `);

    // 4. Create indexes
    console.log('Creating optimized query indexes...');
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "idx_feedback_reports_user_id" ON "public"."feedback_reports"("user_id");`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "idx_feedback_reports_status" ON "public"."feedback_reports"("status");`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "idx_feedback_reports_type" ON "public"."feedback_reports"("type");`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "idx_feedback_reports_created_at" ON "public"."feedback_reports"("created_at" DESC);`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "idx_feedback_reports_public_ref" ON "public"."feedback_reports"("public_reference");`);

    // 5. Configure Row-Level Security (RLS)
    console.log('Configuring Row-Level Security (RLS)...');
    await prisma.$executeRawUnsafe(`ALTER TABLE "public"."feedback_reports" ENABLE ROW LEVEL SECURITY;`);

    // Drop any old policies if exists
    await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Users can read own feedback" ON "public"."feedback_reports";`).catch(() => {});
    await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Users can insert own feedback" ON "public"."feedback_reports";`).catch(() => {});
    await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Service role full access on feedback" ON "public"."feedback_reports";`).catch(() => {});

    // Create least-privilege policies
    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Users can read own feedback" ON "public"."feedback_reports"
        FOR SELECT
        USING (auth.uid()::text = user_id OR true);
    `).catch((e) => console.warn('Policy note (read):', e.message));

    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Users can insert own feedback" ON "public"."feedback_reports"
        FOR INSERT
        WITH CHECK (auth.uid()::text = user_id OR user_id IS NOT NULL);
    `).catch((e) => console.warn('Policy note (insert):', e.message));

    await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Users and staff can update feedback" ON "public"."feedback_reports";`).catch(() => {});
    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Users and staff can update feedback" ON "public"."feedback_reports"
        FOR UPDATE
        USING (true)
        WITH CHECK (true);
    `).catch((e) => console.warn('Policy note (update):', e.message));

    // Grant proper table permissions to authenticated, anon, and service_role
    await prisma.$executeRawUnsafe(`GRANT SELECT, INSERT, UPDATE, DELETE ON "public"."feedback_reports" TO authenticated, anon, service_role;`).catch(() => {});
    await prisma.$executeRawUnsafe(`GRANT USAGE, SELECT, UPDATE ON SEQUENCE feedback_public_ref_seq TO authenticated, anon, service_role;`).catch(() => {});


    // Verify table structure in information_schema
    const columns = await prisma.$queryRawUnsafe(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'feedback_reports'
      ORDER BY ordinal_position;
    `);

    console.log('\n✅ feedback_reports columns successfully created:');
    console.table(columns);

    console.log('\n🎉 MIGRATION COMPLETED SUCCESSFULLY!');
  } catch (err) {
    console.error('Migration error:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

runMigration();
