let handler;

async function runTest(name, payload) {
  if (!handler) {
    handler = (await import('../api/execute.js')).default;
  }
  return new Promise((resolve) => {
    const req = {
      method: 'POST',
      body: payload
    };
    const res = {
      statusCode: 200,
      headers: {},
      setHeader(k, v) { this.headers[k] = v; },
      end(str) {
        try {
          const data = JSON.parse(str);
          resolve(data);
        } catch (e) {
          resolve({ error: str });
        }
      }
    };
    handler(req, res);
  });
}

async function main() {
  console.log('=== TEST 1: Correct Python Solution ===');
  const r1 = await runTest('Py Correct', {
    questionSlug: 'belt-1-q1-sum-of-two-numbers',
    language: 'python',
    code: 'a, b = map(int, input().split())\nprint(a + b)\n'
  });
  console.log('Result:', r1.passed, '/', r1.total, 'Success:', r1.success);

  console.log('\n=== TEST 2: Hardcoded Python Solution (Only handles visible 1, 2, 3) ===');
  const hardcodedPy = [
    's = input().strip()',
    'if s == "15 27":',
    '    print(42)',
    'elif s == "100 250":',
    '    print(350)',
    'elif s == "8 12":',
    '    print(20)',
    'else:',
    '    print("FAIL_ANSWER")'
  ].join('\n');
  const r2 = await runTest('Py Hardcoded', {
    questionSlug: 'belt-1-q1-sum-of-two-numbers',
    language: 'python',
    code: hardcodedPy
  });
  console.log('Result:', r2.passed, '/', r2.total, 'Success:', r2.success);
  r2.testCases.forEach(tc => {
    console.log(`  Test ${tc.testIndex} (visible: ${tc.visible}): ${tc.status}`);
  });

  console.log('\n=== TEST 3: Syntax Error Python Solution ===');
  const r3 = await runTest('Py Syntax', {
    questionSlug: 'belt-1-q1-sum-of-two-numbers',
    language: 'python',
    code: 'def bad(\n'
  });
  console.log('Result error:', r3.error, 'message:', r3.message);

  console.log('\n=== TEST 4: Pattern Problem in Python ===');
  const patternPy = [
    'n = int(input())',
    'for i in range(1, n + 1):',
    '    row = []',
    '    for j in range(i):',
    '        row.append(str(i))',
    '    print(" ".join(row))'
  ].join('\n');
  const r4 = await runTest('Py Pattern', {
    questionSlug: 'belt-2-q27-number-pattern',
    language: 'python',
    code: patternPy
  });
  console.log('Result:', r4.passed, '/', r4.total);

  console.log('\n=== TEST 5: Java Correct Solution on Problem 1 ===');
  const javaCode = [
    'import java.util.Scanner;',
    'public class Main {',
    '  public static void main(String[] args) {',
    '    Scanner sc = new Scanner(System.in);',
    '    int a = sc.nextInt();',
    '    int b = sc.nextInt();',
    '    System.out.println(a + b);',
    '  }',
    '}'
  ].join('\n');
  const r5 = await runTest('Java Correct', {
    questionSlug: 'belt-1-q1-sum-of-two-numbers',
    language: 'java',
    code: javaCode
  });
  console.log('Result:', r5.passed, '/', r5.total);

  console.log('\n=== TEST 6: C++ Correct Solution on Problem 1 ===');
  const cppCode = [
    '#include <iostream>',
    'using namespace std;',
    'int main() {',
    '  int a, b;',
    '  cin >> a >> b;',
    '  cout << a + b << endl;',
    '  return 0;',
    '}'
  ].join('\n');
  const r6 = await runTest('C++ Correct', {
    questionSlug: 'belt-1-q1-sum-of-two-numbers',
    language: 'cpp',
    code: cppCode
  });
  console.log('Result:', r6.passed, '/', r6.total);

  console.log('\n=== TEST 8: Check Even or Odd across all 4 languages ===');
  // Python
  const r8Py = await runTest('Even/Odd Py', {
    questionSlug: 'belt-1-q8-check-even-or-odd',
    language: 'python',
    code: 'n = int(input())\nprint("Even" if n % 2 == 0 else "Odd")\n'
  });
  console.log('Even/Odd Python passed:', r8Py.passed, '/', r8Py.total);

  // Java
  const r8Java = await runTest('Even/Odd Java', {
    questionSlug: 'belt-1-q8-check-even-or-odd',
    language: 'java',
    code: 'import java.util.Scanner;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int n = sc.nextInt();\n    if (n % 2 == 0) System.out.println("Even");\n    else System.out.println("Odd");\n  }\n}'
  });
  console.log('Even/Odd Java passed:', r8Java.passed, '/', r8Java.total);

  // C++
  const r8Cpp = await runTest('Even/Odd C++', {
    questionSlug: 'belt-1-q8-check-even-or-odd',
    language: 'cpp',
    code: '#include <iostream>\nusing namespace std;\nint main() {\n  int n;\n  cin >> n;\n  if (n % 2 == 0) cout << "Even" << endl;\n  else cout << "Odd" << endl;\n  return 0;\n}'
  });
  console.log('Even/Odd C++ passed:', r8Cpp.passed, '/', r8Cpp.total);

  // Node.js
  const r8Node = await runTest('Even/Odd Node.js', {
    questionSlug: 'belt-1-q8-check-even-or-odd',
    language: 'nodejs',
    code: 'const fs = require("fs");\nconst n = parseInt(fs.readFileSync(0, "utf-8").trim(), 10);\nconsole.log(n % 2 === 0 ? "Even" : "Odd");'
  });
  console.log('Even/Odd Node.js passed:', r8Node.passed, '/', r8Node.total);

  console.log('\n=== TEST 9: Hardcoded Java Solution (Only handles visible 1, 2, 3) ===');
  const hardcodedJava = [
    'import java.util.Scanner;',
    'public class Main {',
    '  public static void main(String[] args) {',
    '    Scanner sc = new Scanner(System.in);',
    '    int a = sc.nextInt();',
    '    int b = sc.nextInt();',
    '    if (a == 15 && b == 27) System.out.println("42");',
    '    else if (a == 100 && b == 250) System.out.println("350");',
    '    else if (a == 8 && b == 12) System.out.println("20");',
    '    else System.out.println("FAKE_WRONG");',
    '  }',
    '}'
  ].join('\n');
  const r9 = await runTest('Java Hardcoded', {
    questionSlug: 'belt-1-q1-sum-of-two-numbers',
    language: 'java',
    code: hardcodedJava
  });
  console.log('Java Hardcoded passed:', r9.passed, '/', r9.total);

  console.log('\n=== TEST 10: Hardcoded C++ Solution (Only handles visible 1, 2, 3) ===');
  const hardcodedCpp = [
    '#include <iostream>',
    'using namespace std;',
    'int main() {',
    '  int a, b;',
    '  cin >> a >> b;',
    '  if (a == 15 && b == 27) cout << 42 << endl;',
    '  else if (a == 100 && b == 250) cout << 350 << endl;',
    '  else if (a == 8 && b == 12) cout << 20 << endl;',
    '  else cout << 999999 << endl;',
    '  return 0;',
    '}'
  ].join('\n');
  const r10 = await runTest('C++ Hardcoded', {
    questionSlug: 'belt-1-q1-sum-of-two-numbers',
    language: 'cpp',
    code: hardcodedCpp
  });
  console.log('C++ Hardcoded passed:', r10.passed, '/', r10.total);

  console.log('\n=== TEST 11: Hardcoded Node.js Solution (Only handles visible 1, 2, 3) ===');
  const hardcodedNode = [
    'const fs = require("fs");',
    'const str = fs.readFileSync(0, "utf-8").trim();',
    'if (str === "15 27") console.log(42);',
    'else if (str === "100 250") console.log(350);',
    'else if (str === "8 12") console.log(20);',
    'else console.log(99999);'
  ].join('\n');
  const r11 = await runTest('Node.js Hardcoded', {
    questionSlug: 'belt-1-q1-sum-of-two-numbers',
    language: 'nodejs',
    code: hardcodedNode
  });
  console.log('Node.js Hardcoded passed:', r11.passed, '/', r11.total);

  console.log('\n=== TEST 12: Run Code mode (isSubmit: false) ===');
  const r12 = await runTest('Run Code mode', {
    questionSlug: 'belt-1-q1-sum-of-two-numbers',
    language: 'python',
    code: 'a, b = map(int, input().split())\nprint(a + b)\n',
    isSubmit: false
  });
  console.log('Run Code mode total:', r12.total, 'passed:', r12.passed);
  console.log('Test cases returned:', r12.testCases.length);
}

main();

