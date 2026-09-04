const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

const SPECIFIED_MENTORS = [
  { name: 'Aaditya R M', email: 'aaditya.rm@kalvium.com' },
  { name: 'Swathi K S', email: 'swathi.ks@kalvium.com' },
  { name: 'Sanchita Dutta', email: 'sanchita.dutta@kalvium.com' },
  { name: 'Muvva Supriya', email: 'supriya.muvva@kalvium.com' },
  { name: 'Infanta Carolina Freshale', email: 'infanta.f@kalvium.com' },
  { name: 'Chaitra Alur', email: 'chaitra.alur@kalvium.com' },
  { name: 'Indhu K', email: 'indhu.k@kalvium.com' },
  { name: 'Tulika Suman', email: 'tulika.suman@kalvium.com' },
  { name: 'Mandala Thanuja', email: 'mandala.thanuja@kalvium.com' },
  { name: 'Bhavana R K', email: 'bhavana.r@kalvium.com' },
  { name: 'Sivakumar Elango', email: 'sivakumarelango10@gmail.com' },
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
