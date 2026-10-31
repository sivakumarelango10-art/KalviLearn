const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

// Synthetic test mentors used for local and testing environments.
// For production provisioning, supply a JSON file path via MENTORS_SEED_FILE environment variable.
const fs = require('fs');
const SPECIFIED_MENTORS = process.env.MENTORS_SEED_FILE && fs.existsSync(process.env.MENTORS_SEED_FILE)
  ? JSON.parse(fs.readFileSync(process.env.MENTORS_SEED_FILE, 'utf8'))
  : [
      { name: 'Faculty Mentor 1', email: 'mentor1@kalvilearn.test' },
      { name: 'Faculty Mentor 2', email: 'mentor2@kalvilearn.test' },
      { name: 'Faculty Mentor 3', email: 'mentor3@kalvilearn.test' },
      { name: 'Faculty Mentor 4', email: 'mentor4@kalvilearn.test' },
      { name: 'Faculty Mentor 5', email: 'mentor5@kalvilearn.test' },
      { name: 'Faculty Mentor 6', email: 'mentor6@kalvilearn.test' },
      { name: 'Faculty Mentor 7', email: 'mentor7@kalvilearn.test' },
      { name: 'Faculty Mentor 8', email: 'mentor8@kalvilearn.test' },
      { name: 'Faculty Mentor 9', email: 'mentor9@kalvilearn.test' },
      { name: 'Faculty Mentor 10', email: 'mentor10@kalvilearn.test' },
      { name: 'Faculty Mentor 11', email: 'mentor11@kalvilearn.test' },
    ];

async function seedMentors() {
  console.log('====================================================');
  console.log('ENROLLING AUTHORIZED MENTORS IN POSTGRESQL DATABASE');
  console.log('====================================================\n');

  for (const m of SPECIFIED_MENTORS) {
    const existing = await prisma.user.findUnique({
      where: { email: m.email.toLowerCase() },
    });

    if (existing) {
      await prisma.user.update({
        where: { email: m.email.toLowerCase() },
        data: {
          name: m.name,
          role: 'MENTOR',
          status: 'ACTIVE',
        },
      });
      console.log(`✅ Updated existing mentor: ${m.name} (${m.email}) -> ID: ${existing.id}`);
    } else {
      const created = await prisma.user.create({
        data: {
          email: m.email.toLowerCase(),
          name: m.name,
          role: 'MENTOR',
          status: 'ACTIVE',
        },
      });
      console.log(`✅ Created new authorized mentor: ${m.name} (${m.email}) -> ID: ${created.id}`);
    }
  }

  console.log('\n--- Current Mentors in Database ---');
  const allMentors = await prisma.user.findMany({
    where: { role: 'MENTOR' },
    orderBy: { name: 'asc' },
  });
  for (const mentor of allMentors) {
    console.log(`• ${mentor.name} (${mentor.email}) - ${mentor.status} [${mentor.id}]`);
  }

  await prisma.$disconnect();
  console.log(`\n🎉 Total authorized mentors in database: ${allMentors.length}`);
}

seedMentors().catch((err) => {
  console.error('Failed to seed mentors:', err);
  process.exit(1);
});
