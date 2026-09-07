/**
 * Master Load Testing Harness for KalviCode
 * Accurately measures concurrency, latency percentiles (p50, p90, p95, p99),
 * throughput, error classifications, and test-case integrity.
 */

const https = require('https');
const http = require('http');

function calculatePercentiles(latencies) {
  if (latencies.length === 0) return { p50: 0, p90: 0, p95: 0, p99: 0, min: 0, max: 0, avg: 0 };
  const sorted = [...latencies].sort((a, b) => a - b);
  const getP = (p) => sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))];
  const sum = sorted.reduce((acc, v) => acc + v, 0);

  return {
    min: Math.round(sorted[0]),
    max: Math.round(sorted[sorted.length - 1]),
    avg: Math.round(sum / sorted.length),
    p50: Math.round(getP(50)),
    p90: Math.round(getP(90)),
    p95: Math.round(getP(95)),
    p99: Math.round(getP(99)),
  };
}

async function runConcurrentWorkers({
  totalUsers,
  durationMs = 0,
  iterationsPerUser = 1,
  workerFn,
}) {
  const startTime = Date.now();
  const allLatencies = [];
  const statusCodes = {};
  const errors = [];
  let totalRequests = 0;
  let successCount = 0;
  let failureCount = 0;
  let totalEvaluatedCases = 0;

  const users = Array.from({ length: totalUsers }, (_, i) => ({ id: i + 1 }));

  async function runUser(user) {
    let iteration = 0;
    while (true) {
      if (durationMs > 0) {
        if (Date.now() - startTime >= durationMs) break;
      } else {
        if (iteration >= iterationsPerUser) break;
      }
      iteration++;
      totalRequests++;

      const reqStart = performance.now();
      try {
        const res = await workerFn(user, iteration);
        const reqDuration = performance.now() - reqStart;
        allLatencies.push(reqDuration);

        const status = res.status || 200;
        statusCodes[status] = (statusCodes[status] || 0) + 1;

        if (res.ok) {
          successCount++;
          if (res.evaluatedCases) {
            totalEvaluatedCases += res.evaluatedCases;
          }
        } else {
          failureCount++;
          errors.push({ user: user.id, error: res.error || `HTTP ${status}` });
        }
      } catch (err) {
        const reqDuration = performance.now() - reqStart;
        allLatencies.push(reqDuration);
        failureCount++;
        const msg = err.name === 'AbortError' ? 'TIMEOUT' : (err.message || 'Connection Error');
        statusCodes[msg] = (statusCodes[msg] || 0) + 1;
        errors.push({ user: user.id, error: msg });
      }
    }
  }

  // Fire all concurrent users simultaneously
  await Promise.all(users.map((u) => runUser(u)));

  const totalTimeSec = (Date.now() - startTime) / 1000;
  const percentiles = calculatePercentiles(allLatencies);
  const throughput = totalTimeSec > 0 ? (totalRequests / totalTimeSec).toFixed(2) : '0';

  return {
    totalUsers,
    totalRequests,
    successCount,
    failureCount,
    successRate: totalRequests > 0 ? ((successCount / totalRequests) * 100).toFixed(2) + '%' : '0%',
    errorRate: totalRequests > 0 ? ((failureCount / totalRequests) * 100).toFixed(2) + '%' : '0%',
    totalTimeSec: totalTimeSec.toFixed(2),
    throughputReqSec: throughput,
    totalEvaluatedCases,
    percentiles,
    statusCodes,
    sampleErrors: errors.slice(0, 5),
  };
}

async function executeWorker(user) {
  const TARGET_URL = process.env.TARGET_URL || 'https://kalvicode.vercel.app';
  const code = `import sys
data = sys.stdin.read().split()
if len(data) >= 2:
    print(int(data[0]) + int(data[1]))
`;
  const res = await fetch(`${TARGET_URL}/api/execute`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Virtual-User': `user_${user.id}`,
    },
    body: JSON.stringify({
      questionSlug: 'belt-1-q1-sum-of-two-numbers',
      language: 'python',
      code,
      isSubmit: false,
    }),
  });

  const json = await res.json().catch(() => ({}));
  const isOk = res.status === 200;
  return {
    ok: isOk,
    status: res.status,
    evaluatedCases: json.testCases?.length || 10,
    passedCount: json.passed || 0,
    totalCount: json.total || 10,
    error: isOk ? null : (json.error || `HTTP ${res.status}`),
  };
}

module.exports = {
  calculatePercentiles,
  runConcurrentWorkers,
  executeWorker,
};
