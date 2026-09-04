async function testHttpApi() {
  console.log('Sending POST to http://localhost:5173/api/execute ...')
  const res = await fetch('http://localhost:5173/api/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questionSlug: 'belt-1-q1-sum-of-two-numbers',
      language: 'python',
      code: `
import sys
tokens = sys.stdin.read().split()
if len(tokens) >= 2:
    print(int(tokens[0]) + int(tokens[1]))
`
    })
  })

  console.log(`HTTP Status: ${res.status}`)
  const data = await res.json()
  console.log('API Response:', JSON.stringify(data, null, 2))

  if (res.status === 200 && data.success && data.passed === 10 && data.testCases.length === 10) {
    console.log('🎉 LOCAL HTTP API TEST PASSED! Vite dev server is successfully executing 10 test cases!')
  } else {
    console.error('❌ LOCAL HTTP API TEST FAILED!')
    process.exit(1)
  }
}

testHttpApi().catch(err => {
  console.error(err)
  process.exit(1)
})
