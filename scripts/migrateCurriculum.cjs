const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { parseCurriculumMarkdown, resolveCurriculumFilePath } = require('./parseCurriculum.cjs');

const connectionUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionUrl,
    },
  },
});

async function main() {
  console.log('================================================================');
  console.log('  KalviLearn — Curriculum Content Migration & Database Sync');
  console.log('================================================================\n');

  // 1. Resolve source file and parse
  const resolvedPath = resolveCurriculumFilePath();
  console.log(`📖 Source of Truth File: ${resolvedPath}`);
  
  const modules = parseCurriculumMarkdown(resolvedPath);
  console.log(`✅ Parsed ${modules.length} Modules.`);

  let totalLUs = 0;
  for (const m of modules) {
    console.log(`  + Module ${m.order}: "${m.title}" -> ${m.learningUnits.length} Learning Units`);
    totalLUs += m.learningUnits.length;
  }
  console.log(`✅ Total Learning Units Parsed: ${totalLUs}\n`);

  if (modules.length !== 10 || totalLUs !== 85) {
    throw new Error(`Validation failed: Expected 10 modules and 85 LUs, got ${modules.length} modules and ${totalLUs} LUs.`);
  }

  // 2. Write to src/data/curriculum.json
  const dataDir = path.join(__dirname, '..', 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const curriculumJsonPath = path.join(dataDir, 'curriculum.json');
  fs.writeFileSync(curriculumJsonPath, JSON.stringify(modules, null, 2), 'utf8');
  console.log(`💾 Saved updated curriculum JSON to: ${curriculumJsonPath}\n`);

  // 3. Database Sync
  console.log('🔗 Connecting to PostgreSQL database...');

  // 3a. Ensure columns exist on LearningUnit
  console.log('🛠️ Ensuring table schema has "codeSnippets" and "approach" columns...');
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "LearningUnit" 
    ADD COLUMN IF NOT EXISTS "codeSnippets" jsonb,
    ADD COLUMN IF NOT EXISTS "approach" text;
  `);
  console.log('✅ LearningUnit schema verified/updated.\n');

  // 3b. Clean only existing LearningUnit records (safe, zero impact on Problem/TestCase/Belt/Submission)
  console.log('🧹 Purging obsolete LearningUnit records...');
  await prisma.$executeRawUnsafe(`DELETE FROM "LearningUnit";`);
  console.log('✅ Old LearningUnit records purged.\n');

  // 3c. Upsert Modules and insert new Learning Units
  console.log('📥 Inserting Modules & 85 Multilingual Learning Units...');

  for (const m of modules) {
    // Upsert Module by order
    const modRecord = await prisma.module.upsert({
      where: { order: m.order },
      update: {
        title: m.title,
        description: m.description,
      },
      create: {
        order: m.order,
        title: m.title,
        description: m.description,
      },
    });

    // Prepare LUs for this module
    for (const lu of m.learningUnits) {
      await prisma.learningUnit.create({
        data: {
          moduleId: modRecord.id,
          order: lu.order,
          title: lu.title,
          content: lu.concept,
          codingQuestion: lu.codingQuestion,
          inputFormat: lu.inputFormat,
          outputFormat: lu.outputFormat,
          examples: lu.examples,
          codeSnippets: lu.codeSnippets,
          approach: lu.approach,
        },
      });
    }
    console.log(`  + Seeded Module ${m.order} (${m.learningUnits.length} LUs with all 4 language snippets)`);
  }

  // 4. Verify Database Records
  console.log('\n🔍 Verifying Database Integrity...');
  const dbModulesCount = await prisma.module.count();
  const dbLUsCount = await prisma.learningUnit.count();
  const dbBeltsCount = await prisma.belt.count();
  const dbProblemsCount = await prisma.problem.count();

  console.log(`  - Modules in DB: ${dbModulesCount} (expected: 10)`);
  console.log(`  - Learning Units in DB: ${dbLUsCount} (expected: 85)`);
  console.log(`  - Belts in DB: ${dbBeltsCount} (unmodified)`);
  console.log(`  - Problems in DB: ${dbProblemsCount} (unmodified)`);

  if (dbModulesCount !== 10 || dbLUsCount !== 85) {
    throw new Error(`Database verification failed: ${dbModulesCount} modules, ${dbLUsCount} LUs.`);
  }

  // Verify code snippets in a sample LU from DB
  const sampleLU = await prisma.learningUnit.findFirst({
    where: { order: 1 },
    include: { module: true },
  });
  console.log(`\n✅ Sample DB Unit Verified: "${sampleLU.module.title}" -> "${sampleLU.title}"`);
  console.log(`   Python snippet length: ${(sampleLU.codeSnippets?.python || '').length}`);
  console.log(`   C++ snippet length: ${(sampleLU.codeSnippets?.cpp || '').length}`);
  console.log(`   Java snippet length: ${(sampleLU.codeSnippets?.java || '').length}`);
  console.log(`   JavaScript snippet length: ${(sampleLU.codeSnippets?.javascript || '').length}`);

  console.log('\n================================================================');
  console.log('🎉 Curriculum Migration Completed Successfully!');
  console.log('================================================================');
}

main()
  .catch((e) => {
    console.error('\n❌ Migration Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
