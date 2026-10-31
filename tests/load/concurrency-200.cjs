/**
 * Primary Acceptance Load Test: 200 Concurrent Users
 * Evaluates 200 users x 10 test cases = 2,000 real test-case evaluations simultaneously.
 * Validates correctness, denominator retention (10), hidden test concealment,
 * and measures p50, p90, p95, p99 latencies, throughput, and error rates.
 */

const { runConcurrentWorkers, executeWorker } = require('./harness.cjs');

const CONCURRENCY = parseInt(process.env.CONCURRENCY || '200', 10);

async function main() {
  console.log('========================================================================');
  console.log(`🚀 PRIMARY ACCEPTANCE LOAD TEST: ${CONCURRENCY} CONCURRENT USERS`);
  console.log(`🎯 Target API: https://kalvilearn.vercel.app/api/execute`);
  console.log('========================================================================\n');

  const result = await runConcurrentWorkers({
    totalUsers: CONCURRENCY,
    iterationsPerUser: 1,
    workerFn: executeWorker,
  });

  console.log('------------------------------------------------------------------------');
  console.log('📊 200 CONCURRENT USERS LOAD TEST RESULTS:');
  console.log('------------------------------------------------------------------------');
  console.log(`Total Concurrent Users:     ${result.totalUsers}`);
  console.log(`Total Requests:             ${result.totalRequests}`);
  console.log(`Successful Executions:      ${result.successCount}`);
  console.log(`Failed Executions:          ${result.failureCount}`);
  console.log(`Success Rate:               ${result.successRate}`);
  console.log(`Error Rate:                 ${result.errorRate}`);
  console.log(`Total Test Cases Evaluated: ${result.totalEvaluatedCases}`);
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

  if (result.sampleErrors.length > 0) {
    console.log('\n⚠️ SAMPLE ERRORS:');
    console.log(JSON.stringify(result.sampleErrors, null, 2));
  }

  console.log('\n========================================================================');
  return result;
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal execution test error:', err);
    process.exit(1);
  });
}

module.exports = { main };
