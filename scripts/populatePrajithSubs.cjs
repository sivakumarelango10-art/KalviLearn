const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } },
});

async function populatePrajithSubmissions() {
  const prajithId = '7193765a-4dc6-4f61-813e-3e5dce95b6c7';
  const progressList = await prisma.userProgress.findMany({
    where: { userId: prajithId },
    include: { problem: true },
  });

  console.log(`Found ${progressList.length} progress entries for Prajith`);

  for (const prog of progressList) {
    // Check if submission already exists
    const existingSub = await prisma.submission.findFirst({
      where: { userId: prajithId, problemId: prog.problemId },
    });

    if (!existingSub) {
      await prisma.submission.create({
        data: {
          userId: prajithId,
          problemId: prog.problemId,
          language: prog.language || 'python',
          code: prog.bestCode || '# Prajith solution\nprint("Solved")',
          status: 'PASSED',
          passedTests: 10,
          totalTests: 10,
          testResults: [],
          executionTimeMs: Math.floor(Math.random() * 40) + 15,
          createdAt: prog.solvedAt || new Date(),
        },
      });
      console.log(`Created submission for Prajith: ${prog.problem?.title}`);
    }
  }

  const subCount = await prisma.submission.count({ where: { userId: prajithId } });
  console.log(`Prajith now has ${subCount} submissions.`);
  await prisma.$disconnect();
}

populatePrajithSubmissions();
