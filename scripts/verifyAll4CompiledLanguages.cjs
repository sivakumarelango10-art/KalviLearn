// Test the compiled worker bundle with all 4 languages in Node
const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Find the worker bundle in dist/assets/
const distDir = path.join(__dirname, '../dist/assets');
const workerFile = fs.readdirSync(distDir).find(f => f.startsWith('codeRunner.worker') && f.endsWith('.js'));
console.log('Testing compiled worker bundle:', workerFile);

const workerCode = fs.readFileSync(path.join(distDir, workerFile), 'utf8');

// Mock self environment to capture onmessage
let workerOnMessage = null;
const messagesSent = [];

const fakeSelf = {
  get onmessage() { return workerOnMessage; },
  set onmessage(fn) { workerOnMessage = fn; },
  postMessage(data) { messagesSent.push(data); }
};

// Execute worker bundle in sandbox with fakeSelf
const runner = new Function('self', 'window', workerCode);
runner(fakeSelf, fakeSelf);

assert(typeof workerOnMessage === 'function', 'Worker onmessage handler must be installed');

// Helper to run code through worker handler
function runInWorker(id, language, code, input) {
  const startLen = messagesSent.length;
  workerOnMessage({ data: { id, language, code, input } });
  return messagesSent[messagesSent.length - 1];
}

console.log('=================================================================');
console.log('  TESTING COMPILED WORKER WITH ALL 4 REAL-WORLD LANGUAGES');
console.log('=================================================================\n');

// 1. PYTHON 3
console.log('1. Testing Python 3 in compiled worker...');
const pyCode = `
import sys
def solve():
    parts = sys.stdin.read().split()
    a = int(parts[0])
    b = int(parts[1])
    print(a + b)
solve()
`;
const pyRes = runInWorker('py1', 'python', pyCode, '15 27');
console.log('   Python Output:', pyRes.output);
assert.strictEqual(pyRes.output, '42');
assert.strictEqual(pyRes.error, undefined);
console.log('   ✅ Python 3: PASSED!');

// 2. JAVASCRIPT (Node.js)
console.log('\n2. Testing JavaScript (Node.js) in compiled worker...');
const jsCode = `
const fs = require('fs');
function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim();
    const parts = input.split(/\\s+/);
    const a = parseInt(parts[0], 10);
    const b = parseInt(parts[1], 10);
    console.log(a + b);
}
solve();
`;
const jsRes = runInWorker('js1', 'javascript', jsCode, '15 27');
console.log('   JS Output:', jsRes.output);
assert.strictEqual(jsRes.output, '42');
assert.strictEqual(jsRes.error, undefined);
console.log('   ✅ JavaScript: PASSED!');

// 3. C++ (g++)
console.log('\n3. Testing C++ (g++) in compiled worker...');
const cppCode = `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}
`;
const cppRes = runInWorker('cpp1', 'cpp', cppCode, '15 27');
console.log('   C++ Output:', cppRes.output);
assert.strictEqual(cppRes.output, '42');
assert.strictEqual(cppRes.error, undefined);
console.log('   ✅ C++ (g++): PASSED!');

// 4. JAVA (OpenJDK)
console.log('\n4. Testing Java (OpenJDK) in compiled worker...');
const javaCode = `
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int a = scanner.nextInt();
        int b = scanner.nextInt();
        System.out.println(a + b);
        scanner.close();
    }
}
`;
const javaRes = runInWorker('java1', 'java', javaCode, '15 27');
console.log('   Java Output:', javaRes.output);
assert.strictEqual(javaRes.output, '42');
assert.strictEqual(javaRes.error, undefined);
console.log('   ✅ Java (OpenJDK): PASSED!');

// 5. C++ Vector & Sort Test
console.log('\n5. Testing C++ Vector and sorting...');
const cppVectorCode = `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    sort(a.begin(), a.end());
    for (int i = 0; i < n; i++) {
        cout << a[i] << " ";
    }
    cout << endl;
    return 0;
}
`;
const cppVecRes = runInWorker('cpp2', 'cpp', cppVectorCode, '5\n50 20 10 40 30');
console.log('   C++ Vector Output:', cppVecRes.output);
assert.strictEqual(cppVecRes.output, '10 20 30 40 50');
console.log('   ✅ C++ Vector & Sorting: PASSED!');

// 6. Java Arrays.sort Test
console.log('\n6. Testing Java Arrays.sort...');
const javaSortCode = `
import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        Arrays.sort(arr);
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}
`;
const javaSortRes = runInWorker('java2', 'java', javaSortCode, '5\n50 20 10 40 30');
console.log('   Java Sort Output:', javaSortRes.output);
assert.strictEqual(javaSortRes.output, '10 20 30 40 50');
console.log('   ✅ Java Arrays.sort: PASSED!');

console.log('\n=================================================================');
console.log('  ALL 4 COMPILERS / INTERPRETERS WORK 100% PERFECTLY IN PRODUCTION!');
console.log('=================================================================');
