const { execSync } = require('child_process');

console.log('================================================================');
console.log('🏆 KALVICODE / KALVILEARN: MASTER COMPREHENSIVE PLATFORM AUDIT');
console.log('================================================================\n');

const testSuites = [
  { name: 'Audit All 85 Problems & 850 Test Cases', cmd: 'node scripts/auditAllProblems.cjs' },
  { name: '10 Test Cases & Compiler Runner Engine', cmd: 'npx tsx scripts/test-10-cases.ts' },
  { name: 'Verify All 4 Compiled Languages (Py, JS, C++, Java)', cmd: 'node scripts/verifyAll4CompiledLanguages.cjs' },
  { name: 'Mentor Roster & Real Data End-to-End Test', cmd: 'node scripts/verifyMentorRealData.cjs' },
  { name: 'Add Scholar / Student Live Persistence Test', cmd: 'node scripts/testAddStudentFeature.cjs' },
  { name: 'Authorized Mentors Database Sync Check', cmd: 'node scripts/seedAllMentors.cjs' },
];

let allPassed = true;

for (const suite of testSuites) {
  console.log(`\n▶️ RUNNING: ${suite.name}...`);
  try {
    const output = execSync(suite.cmd, { encoding: 'utf8' });
    console.log(output.trim());
    console.log(`✅ ${suite.name}: PASSED!`);
  } catch (err) {
    console.error(`❌ ${suite.name}: FAILED!`);
    console.error(err.stdout || err.message);
    allPassed = false;
  }
}

console.log('\n================================================================');
if (allPassed) {
  console.log('🎉 ALL 6 COMPREHENSIVE SUITES PASSED WITH ZERO ERRORS!');
} else {
  console.error('❌ SOME SUITES FAILED!');
  process.exit(1);
}
console.log('================================================================\n');
