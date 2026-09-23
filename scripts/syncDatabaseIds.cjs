const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

const fs = require('fs');
// Synthetic mappings for local migration testing.
// For production database synchronization, supply a JSON mapping file via CANONICAL_USERS_FILE.
const CANONICAL_USERS = process.env.CANONICAL_USERS_FILE && fs.existsSync(process.env.CANONICAL_USERS_FILE)
  ? JSON.parse(fs.readFileSync(process.env.CANONICAL_USERS_FILE, 'utf8'))
  : {
      testStudent1: {
        id: '00000000-0000-0000-0000-000000000001',
        email: 'test.student1@kalvilearn.test',
        name: 'Synthetic Student One',
        role: 'STUDENT',
        status: 'ACTIVE',
        legacyUserIds: [
          'local_test_student1',
        ],
      },
      testStudent2: {
        id: '00000000-0000-0000-0000-000000000002',
        email: 'test.student2@kalvilearn.test',
        name: 'Synthetic Student Two',
        role: 'STUDENT',
        status: 'ACTIVE',
        legacyUserIds: [
          'local_test_student2',
        ],
      },
      testMentor1: {
        id: '00000000-0000-0000-0000-000000000003',
        email: 'test.mentor1@kalvilearn.test',
        name: 'Synthetic Mentor One',
        role: 'MENTOR',
        status: 'ACTIVE',
        legacyUserIds: [
          'local_test_mentor1',
        ],
      },
    };

async function sync() {
  console.log('--- 1. Synchronizing Users in public.users ---');
  
  for (const key of Object.keys(CANONICAL_USERS)) {
    const u = CANONICAL_USERS[key];
    
    // Check if user exists by email
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    if (existing) {
      if (existing.id !== u.id) {
        // Update user ID to canonical Supabase Auth UUID
        await prisma.$executeRawUnsafe(
          `UPDATE "public"."users" SET "id" = $1, "name" = $2, "role" = $3, "status" = $4, "updatedAt" = NOW() WHERE "email" = $5;`,
          u.id, u.name, u.role, u.status, u.email
        );
        console.log(`Updated ${u.email} ID from ${existing.id} -> ${u.id}`);
      } else {
        console.log(`${u.email} already has canonical ID ${u.id}`);
      }
    } else {
      // Insert with canonical ID
      await prisma.user.create({
        data: {
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role,
          status: u.status,
        },
      });
      console.log(`Created ${u.email} with canonical ID ${u.id}`);
    }
  }

  console.log('\n--- 2. Migrating Submissions to Canonical User IDs ---');
  for (const key of Object.keys(CANONICAL_USERS)) {
    const u = CANONICAL_USERS[key];
    for (const legacyId of u.legacyUserIds) {
      const updated = await prisma.submission.updateMany({
        where: { userId: legacyId },
        data: { userId: u.id },
      });
      if (updated.count > 0) {
        console.log(`Migrated ${updated.count} submissions from ${legacyId} -> ${u.name} (${u.id})`);
      }
    }
  }

  console.log('\n--- 3. Migrating UserProgress to Canonical User IDs ---');
  for (const key of Object.keys(CANONICAL_USERS)) {
    const u = CANONICAL_USERS[key];
    for (const legacyId of u.legacyUserIds) {
      const legacyProgress = await prisma.userProgress.findMany({
        where: { userId: legacyId },
      });
      
      for (const p of legacyProgress) {
        // Check if canonical record already exists for this problem
        const existingProg = await prisma.userProgress.findUnique({
          where: {
            userId_problemId: {
              userId: u.id,
              problemId: p.problemId,
            },
          },
        });

        if (!existingProg) {
          // Point to canonical user
          await prisma.userProgress.update({
            where: { id: p.id },
            data: { userId: u.id },
          });
          console.log(`Migrated progress for problem ${p.problemId} -> ${u.name}`);
        } else {
          // Already have a progress row for canonical user; remove duplicate legacy row
          await prisma.userProgress.delete({
            where: { id: p.id },
          });
          console.log(`Merged duplicate progress for problem ${p.problemId} -> kept canonical`);
        }
      }
    }
  }

  console.log('\n--- 4. Verification of Current Database State ---');
  const users = await prisma.user.findMany();
  console.log('Users:');
  for (const u of users) {
    const progressCount = await prisma.userProgress.count({ where: { userId: u.id } });
    const subCount = await prisma.submission.count({ where: { userId: u.id } });
    console.log(`• ${u.name} (${u.email}) [${u.role}] ID: ${u.id}`);
    console.log(`   UserProgress: ${progressCount} solved, Submissions: ${subCount} submissions`);
  }

  await prisma.$disconnect();
  console.log('\n✅ Database User IDs successfully synchronized!');
}

sync().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
