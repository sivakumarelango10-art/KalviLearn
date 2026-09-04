const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

const CANONICAL_USERS = {
  kavya: {
    id: '36a74ed3-4a98-4374-a3d1-be0e2050b81c',
    email: 'kavya.ramesh.s.121@kalvium.community',
    name: 'Kavya Ramesh',
    role: 'STUDENT',
    status: 'ACTIVE',
    legacyUserIds: [
      '89d07eb8-4423-4038-87de-fb8b46347696',
      'd9be4c88-fa61-4204-b196-1a8b45e593be',
      'local_kavya_ramesh_s_121_kalvium_community',
    ],
  },
  prajith: {
    id: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
    email: 'prajith.p.s.121@kalvium.community',
    name: 'Prajith P S',
    role: 'STUDENT',
    status: 'ACTIVE',
    legacyUserIds: [
      '05ff3a01-b711-4016-ac67-6b5f34ae4e65',
      '175056fa-dd8b-4f1c-a520-c1c2b7c7ed0e',
      'local_prajith_p_s_121_kalvium_community',
    ],
  },
  sivakumar: {
    id: 'e95272bc-633d-4fbd-8bf0-7801426fd0f6',
    email: 'sivakumarelango10@gmail.com',
    name: 'Sivakumar Elango',
    role: 'MENTOR',
    status: 'ACTIVE',
    legacyUserIds: [
      '673f9e93-d869-46dc-9d08-0210d2987769',
      'local_sivakumarelango10_gmail_com',
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
