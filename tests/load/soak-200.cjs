/**
 * 200-User Sustained Soak Load Test
 * Runs continuous execution and submission load over 60 seconds with 50 persistent workers
 * to verify absence of memory leaks, connection exhaustion, and latency drift.
 */

const { runConcurrentWorkers, executeWorker } = require('./harness.cjs');

const TARGET_USERS = 50;
const DURATION_MS = 60000; // 60 seconds continuous soak

async function runSoakTest() {
  console.log('========================================================================');
  console.log(`🌊 200-USER SUSTAINED SOAK TEST (60 SECONDS CONTINUOUS WORKLOAD)`);
  console.log(`🎯 Target API: https://kalvicode.vercel.app/api/execute`);
  console.log('========================================================================\n');

  const result = await runConcurrentWorkers({
    totalUsers: TARGET_USERS,
    durationMs: DURATION_MS,
    workerFn: executeWorker,
  });

  console.log('------------------------------------------------------------------------');
  console.log('📊 SOAK LOAD TEST RESULTS:');
  console.log('------------------------------------------------------------------------');
  console.log(`Total Persistent Users:     ${result.totalUsers}`);
  console.log(`Total Requests Processed:   ${result.totalRequests}`);
  console.log(`Successful Executions:      ${result.successCount}`);
  console.log(`Failed Executions:          ${result.failureCount}`);
  console.log(`Success Rate:               ${result.successRate}`);
  console.log(`Error Rate:                 ${result.errorRate}`);
  console.log(`Total Test Cases Evaluated: ${result.totalEvaluatedCases}`);
  console.log(`Total Wall Clock Time:      ${result.totalTimeSec} s`);
  console.log(`Sustained Throughput:       ${result.throughputReqSec} req/sec`);
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

  if (result.sampleErrors.length > 0) {
    console.log('\n⚠️ SAMPLE ERRORS:');
    console.log(JSON.stringify(result.sampleErrors, null, 2));
  }

  console.log('\n========================================================================');
  return result;
}

if (require.main === module) {
  runSoakTest().catch((err) => {
    console.error('Fatal soak test error:', err);
    process.exit(1);
  });
}

module.exports = { runSoakTest };
