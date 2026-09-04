async function main() {
  console.log('Testing live Vercel endpoint: https://kalvicode.vercel.app/api/execute');

  // Test 1: Known-correct Python
  const res1 = await fetch('https://kalvicode.vercel.app/api/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questionSlug: 'belt-1-q1-sum-of-two-numbers',
      language: 'python',
      code: 'a, b = map(int, input().split())\nprint(a + b)\n'
    })
  });
  const d1 = await res1.json();
  console.log('Test 1 (Known-correct Python):', d1.passed, '/', d1.total, 'Success:', d1.success);

  // Test 2: Hardcoded Python
  const hardcodedPy = [
    's = input().strip()',
    'if s == "15 27":',
    '    print(42)',
    'elif s == "100 250":',
    '    print(350)',
    'elif s == "8 12":',
    '    print(20)',
    'else:',
    '    print("WRONG")'
  ].join('\n');
  const res2 = await fetch('https://kalvicode.vercel.app/api/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questionSlug: 'belt-1-q1-sum-of-two-numbers',
      language: 'python',
      code: hardcodedPy
    })
  });
  const d2 = await res2.json();
  console.log('Test 2 (Hardcoded Python):', d2.passed, '/', d2.total, 'Success:', d2.success);
  console.log('  Case 1 (visible) status:', d2.testCases[0].status, 'input visible?', 'input' in d2.testCases[0]);
  console.log('  Case 4 (hidden) status:', d2.testCases[3].status, 'input hidden?', !('input' in d2.testCases[3]));

  // Test 3: Java on live Vercel
  const res3 = await fetch('https://kalvicode.vercel.app/api/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questionSlug: 'belt-1-q1-sum-of-two-numbers',
      language: 'java',
      code: 'import java.util.Scanner;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int a = sc.nextInt();\n    int b = sc.nextInt();\n    System.out.println(a + b);\n  }\n}'
    })
  });
  const d3 = await res3.json();
  console.log('Test 3 (Known-correct Java):', d3.passed, '/', d3.total, 'Success:', d3.success);

  // Test 4: C++ on live Vercel
  const res4 = await fetch('https://kalvicode.vercel.app/api/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questionSlug: 'belt-1-q1-sum-of-two-numbers',
      language: 'cpp',
      code: '#include <iostream>\nusing namespace std;\nint main() {\n  int a, b;\n  cin >> a >> b;\n  cout << a + b << endl;\n  return 0;\n}'
    })
  });
  const d4 = await res4.json();
  console.log('Test 4 (Known-correct C++):', d4.passed, '/', d4.total, 'Success:', d4.success);

  // Test 5: Node.js on live Vercel
  const res5 = await fetch('https://kalvicode.vercel.app/api/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questionSlug: 'belt-1-q1-sum-of-two-numbers',
      language: 'nodejs',
      code: 'const fs = require("fs");\nconst [a, b] = fs.readFileSync(0, "utf-8").trim().split(/\\s+/).map(Number);\nconsole.log(a + b);'
    })
  });
  const d5 = await res5.json();
  console.log('Test 5 (Known-correct Node.js):', d5.passed, '/', d5.total, 'Success:', d5.success);
}

main();
