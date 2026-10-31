const { runConcurrentWorkers } = require('./harness.cjs');

const TARGET_URL = process.env.TARGET_URL || 'https://kalvilearn.vercel.app';
const CONCURRENCY = parseInt(process.env.CONCURRENCY || '200', 10);

async function testWorstCase() {
  console.log('========================================================================');
  console.log(`🧪 WORST-CASE LOAD TEST: ${CONCURRENCY} CONCURRENT USERS MIXED PROGRAMS`);
  console.log(`🎯 Target API: ${TARGET_URL}/api/execute`);
  console.log('========================================================================\n');

  const correctPython = `import sys
data = sys.stdin.read().split()
if len(data) >= 2:
    print(int(data[0]) + int(data[1]))
`;

  const infiniteLoop = `
i = 0
while i < 100000000:
    i += 1
print(i)
`;

  const syntaxError = `
def broken(
`;

  const heavyComputation = `
s = 0
for i in range(50000):
    s += i
print(s)
`;

  const result = await runConcurrentWorkers({
    totalUsers: CONCURRENCY,
    iterationsPerUser: 1,
    workerFn: async (user) => {
      let code = correctPython;

      // Distribute 4 program types across the 200 users:
      // 50% correct, 20% long/heavy loop, 15% infinite loop (guarded), 15% syntax error
      const mod = user.id % 10;
      if (mod === 0 || mod === 1) {
        code = infiniteLoop; // Test loop watchdog TLE guard
      } else if (mod === 2) {
        code = syntaxError;  // Test compilation error handling
      } else if (mod === 3 || mod === 4) {
        code = heavyComputation; // Test heavy computation
      }

      const res = await fetch(`${TARGET_URL}/api/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Virtual-User': `worker_${user.id}`,
        },
        body: JSON.stringify({
          questionSlug: 'belt-1-q1-sum-of-two-numbers',
          language: 'python',
          code,
          isSubmit: false,
        }),
      });

      const json = await res.json().catch(() => ({}));
      const isExpected = res.status === 200 || res.status === 422;
      return {
        ok: isExpected,
        status: res.status,
        passedCount: json.passed || 0,
        totalCount: json.total || 10,
        testCasesLength: json.testCases?.length || 0,
      };
    },
  });

  console.log('------------------------------------------------------------------------');
  console.log('📊 WORST-CASE LOAD TEST RESULTS:');
  console.log('------------------------------------------------------------------------');
  console.log(`Total Concurrent Users:     ${result.totalUsers}`);
  console.log(`Total Requests:             ${result.totalRequests}`);
  console.log(`Successful Responses:       ${result.successCount}`);
  console.log(`Failed Executions:          ${result.failureCount}`);
  console.log(`Success Rate:               ${result.successRate}`);
  console.log(`Error Rate:                 ${result.errorRate}`);
  console.log(`Total Wall Clock Time:      ${result.totalTimeSec} s`);
  console.log(`Throughput:                 ${result.throughputReqSec} req/sec`);
  console.log('\n⏱️ LATENCY PERCENTILES (ms):');
  console.log(`  Min:                      ${result.percentiles.min} ms`);
  console.log(`  p50 (Median):             ${result.percentiles.p50} ms`);
  console.log(`  p90:                      ${result.percentiles.p90} ms`);
  console.log(`  p95:                      ${result.percentiles.p95} ms`);
  console.log(`  p99:                      ${result.percentiles.p99} ms`);
  console.log(`  Max:                      ${result.percentiles.max} ms`);
  console.log(`  Avg:                      ${result.percentiles.avg} ms`);
  console.log('\n📋 HTTP STATUS CODE DISTRIBUTION:');
  console.log(JSON.stringify(result.statusCodes, null, 2));

  console.log('\n========================================================================');
  return result;
}

if (require.main === module) {
  testWorstCase().catch((err) => {
    console.error('Fatal execution test error:', err);
    process.exit(1);
  });
}

module.exports = { testWorstCase };
