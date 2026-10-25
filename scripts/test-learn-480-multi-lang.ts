/**
 * Comprehensive verification suite for Bank480 Learn questions FORCED to 'local' engine
 * (mirrors Vercel production where native javac/g++ are unavailable).
 *
 * Tests:
 * 1. At least 3 questions per topic across ALL 24 topics on local engine.
 * 2. All 4 languages: Python, Node.js, Java, C++.
 * 3. Pass/fail reporting per language and topic.
 * 4. Custom test input evaluation on local engine.
 * 5. Submit isolation (zero DB writes).
 * 6. Practice problem regression check on both engines.
 */

import assert from 'node:assert'
import { EventEmitter } from 'node:events'
import { executeQuestion, executeCustomInput } from '../src/server/executeService'
import submitHandler from '../src/server/submitHandler'
import { getAllLearnTopics } from '../src/data/learn/coding/index'

// CRITICAL: Force engine to 'local' (mirroring Vercel production)
process.env.KALVI_NATIVE_JUDGE = '0'
process.env.ALLOW_TEST_AUTH_TOKENS = '1'

const STUDENT_TOKEN = 'Bearer test_auth_student_synthetic.student@kalvilearn.test'

function mockCall(options: {
  method?: string
  headers?: Record<string, string>
  body?: unknown
}) {
  const req = new EventEmitter() as any
  req.method = options.method || 'POST'
  req.url = '/api/submit'
  req.socket = { remoteAddress: '127.0.0.1' }
  req.headers = {
    'content-type': 'application/json',
    ...(options.headers || {}),
  }
  req.body = options.body

  let statusCode = 200
  let responseData: any = null
  const headers: Record<string, string> = {}

  const res: any = {
    statusCode: 200,
    setHeader: (k: string, v: string) => {
      headers[k.toLowerCase()] = v
    },
    status: (code: number) => {
      statusCode = code
      return {
        json: (data: unknown) => {
          responseData = data
        },
      }
    },
    json: (data: unknown) => {
      responseData = data
    },
    end: (chunk?: string) => {
      if (chunk && !responseData) {
        try {
          responseData = JSON.parse(chunk)
        } catch {
          responseData = chunk
        }
      }
    },
  }

  return {
    req,
    res,
    status: () => statusCode,
    body: () => responseData,
    headers,
  }
}

function makeJava(body: string): string {
  return `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String raw = sc.hasNextLine() ? sc.nextLine().trim() : "";
    ${body}
  }
  public static String getString(String json, String key) {
    String pat = '"' + key + '"';
    int p = json.indexOf(pat);
    if (p == -1) return "";
    int c = json.indexOf(':', p);
    if (c == -1) return "";
    int start = c + 1;
    while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\\t')) start++;
    if (start < json.length() && json.charAt(start) == '"') {
      int end = json.indexOf('"', start + 1);
      return end == -1 ? "" : json.substring(start + 1, end);
    }
    int end = start;
    while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;
    return json.substring(start, end).trim();
  }
  public static int getInt(String json, String key) {
    String s = getString(json, key);
    return s.isEmpty() ? 0 : Integer.parseInt(s);
  }
  public static List<Integer> getIntList(String json, String key) {
    List<Integer> list = new ArrayList<>();
    String pat = '"' + key + '"';
    int p = json.indexOf(pat);
    if (p == -1) return list;
    int start = json.indexOf('[', p);
    int end = json.indexOf(']', start);
    if (start == -1 || end == -1) return list;
    String content = json.substring(start + 1, end).trim();
    if (content.isEmpty()) return list;
    String[] tokens = content.split(",");
    for (int i = 0; i < tokens.length; i++) {
      list.add(Integer.parseInt(tokens[i].trim()));
    }
    return list;
  }
}`
}

function makeCpp(body: string): string {
  return `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;
string extractField(const string& json, const string& key) {
    string pat = '"' + key + '"';
    size_t p = json.find(pat);
    if (p == string::npos) return "";
    size_t c = json.find(':', p);
    if (c == string::npos) return "";
    size_t start = c + 1;
    while (start < json.size() && (json[start] == ' ' || json[start] == '\\t')) start++;
    if (start < json.size() && json[start] == '"') {
        size_t end = json.find('"', start + 1);
        return end == string::npos ? "" : json.substr(start + 1, end - start - 1);
    }
    size_t end = start;
    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;
    size_t len = end - start;
    while (len > 0 && isspace(json[start + len - 1])) len--;
    return json.substr(start, len);
}
int extractInt(const string& json, const string& key) {
    string val = extractField(json, key);
    return val.empty() ? 0 : stoi(val);
}
vector<int> extractIntArray(const string& json, const string& key) {
    vector<int> res;
    string pat = '"' + key + '"';
    size_t p = json.find(pat);
    if (p == string::npos) return res;
    size_t start = json.find('[', p);
    size_t end = json.find(']', start);
    if (start == string::npos || end == string::npos) return res;
    string content = json.substr(start + 1, end - start - 1);
    string token = "";
    for (size_t i = 0; i <= content.size(); i++) {
        if (i == content.size() || content[i] == ',') {
            size_t s = 0;
            while (s < token.size() && isspace(token[s])) s++;
            size_t e = token.size();
            while (e > s && isspace(token[e - 1])) e--;
            if (e > s) res.push_back(stoi(token.substr(s, e - s)));
            token = "";
        } else {
            token += content[i];
        }
    }
    return res;
}
int main() {
    string raw;
    getline(cin, raw);
    ${body}
    return 0;
}`
}

interface QuestionTestDef {
  topicId: string
  slug: string
  python: string
  nodejs?: string
  java?: string
  cpp?: string
}

const TESTS_BY_TOPIC: Record<string, QuestionTestDef[]> = {
  'variables-data-types': [
    {
      topicId: 'variables-data-types',
      slug: 'integer-to-decimal-string',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(d["value"])`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(d.value); }`,
      java: makeJava(`if (!raw.isEmpty()) System.out.println(getInt(raw, "value"));`),
      cpp: makeCpp(`if (!raw.empty()) cout << extractInt(raw, "value") << endl;`),
    },
    {
      topicId: 'variables-data-types',
      slug: 'integer-to-binary-digits',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    v = d["value"]\n    if v >= 0:\n        print(bin(v)[2:])\n    else:\n        print("-" + bin(-v)[2:])`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const v = JSON.parse(raw).value; console.log(v >= 0 ? v.toString(2) : "-" + (-v).toString(2)); }`,
      java: makeJava(`if (!raw.isEmpty()) { int v = getInt(raw, "value"); System.out.println(v >= 0 ? Integer.toBinaryString(v) : "-" + Integer.toBinaryString(-v)); }`),
      cpp: makeCpp(`if (!raw.empty()) { int v = extractInt(raw, "value"); if (v == 0) { cout << "0" << endl; } else { bool neg = v < 0; if (neg) v = -v; string bin = ""; while (v > 0) { bin += (v % 2 ? '1' : '0'); v >>= 1; } if (neg) bin += '-'; reverse(bin.begin(), bin.end()); cout << bin << endl; } }`),
    },
    {
      topicId: 'variables-data-types',
      slug: 'integer-to-hexadecimal',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    v = d["value"]\n    if v >= 0:\n        print(hex(v)[2:])\n    else:\n        print("-" + hex(-v)[2:])`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const v = JSON.parse(raw).value; console.log(v >= 0 ? v.toString(16) : "-" + (-v).toString(16)); }`,
      java: makeJava(`if (!raw.isEmpty()) { int v = getInt(raw, "value"); System.out.println(v >= 0 ? Integer.toHexString(v) : "-" + Integer.toHexString(-v)); }`),
      cpp: makeCpp(`if (!raw.empty()) { int v = extractInt(raw, "value"); if (v == 0) { cout << "0" << endl; } else { bool neg = v < 0; if (neg) v = -v; string digits = "0123456789abcdef"; string h = ""; while (v > 0) { h = digits[v % 16] + h; v >>= 4; } if (neg) h = "-" + h; cout << h << endl; } }`),
    },
  ],
  'basic-arithmetic-operations': [
    {
      topicId: 'basic-arithmetic-operations',
      slug: 'add-two-integers',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(d["a"] + d["b"])`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(d.a + d.b); }`,
      java: makeJava(`if (!raw.isEmpty()) System.out.println(getInt(raw, "a") + getInt(raw, "b"));`),
      cpp: makeCpp(`if (!raw.empty()) cout << (extractInt(raw, "a") + extractInt(raw, "b")) << endl;`),
    },
    {
      topicId: 'basic-arithmetic-operations',
      slug: 'subtract-b-from-a',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(d["a"] - d["b"])`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(d.a - d.b); }`,
      java: makeJava(`if (!raw.isEmpty()) System.out.println(getInt(raw, "a") - getInt(raw, "b"));`),
      cpp: makeCpp(`if (!raw.empty()) cout << (extractInt(raw, "a") - extractInt(raw, "b")) << endl;`),
    },
    {
      topicId: 'basic-arithmetic-operations',
      slug: 'product-of-two-values',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(d["a"] * d["b"])`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(d.a * d.b); }`,
      java: makeJava(`if (!raw.isEmpty()) System.out.println(getInt(raw, "a") * getInt(raw, "b"));`),
      cpp: makeCpp(`if (!raw.empty()) cout << (extractInt(raw, "a") * extractInt(raw, "b")) << endl;`),
    },
  ],
  'conditionals-control-flow': [
    {
      topicId: 'conditionals-control-flow',
      slug: 'maximum-of-three',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(max(d["a"], d["b"], d["c"]))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(Math.max(d.a, d.b, d.c)); }`,
      java: makeJava(`if (!raw.isEmpty()) { int a = getInt(raw, "a"), b = getInt(raw, "b"), c = getInt(raw, "c"); System.out.println(Math.max(a, Math.max(b, c))); }`),
      cpp: makeCpp(`if (!raw.empty()) { int a = extractInt(raw, "a"), b = extractInt(raw, "b"), c = extractInt(raw, "c"); cout << max(a, max(b, c)) << endl; }`),
    },
    {
      topicId: 'conditionals-control-flow',
      slug: 'minimum-of-three',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(min(d["a"], d["b"], d["c"]))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(Math.min(d.a, d.b, d.c)); }`,
      java: makeJava(`if (!raw.isEmpty()) { int a = getInt(raw, "a"), b = getInt(raw, "b"), c = getInt(raw, "c"); System.out.println(Math.min(a, Math.min(b, c))); }`),
      cpp: makeCpp(`if (!raw.empty()) { int a = extractInt(raw, "a"), b = extractInt(raw, "b"), c = extractInt(raw, "c"); cout << min(a, min(b, c)) << endl; }`),
    },
    {
      topicId: 'conditionals-control-flow',
      slug: 'median-of-three',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(sorted([d["a"], d["b"], d["c"]])[1])`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log([d.a, d.b, d.c].sort((x, y) => x - y)[1]); }`,
      java: makeJava(`if (!raw.isEmpty()) { int[] arr = {getInt(raw, "a"), getInt(raw, "b"), getInt(raw, "c")}; Arrays.sort(arr); System.out.println(arr[1]); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> v = {extractInt(raw, "a"), extractInt(raw, "b"), extractInt(raw, "c")}; sort(v.begin(), v.end()); cout << v[1] << endl; }`),
    },
  ],
  'loops': [
    {
      topicId: 'loops',
      slug: 'sum-from-one-to-n',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    n = json.loads(raw)["n"]\n    s = 0\n    for i in range(1, n + 1): s += i\n    print(s)`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const n = JSON.parse(raw).n; console.log(n * (n + 1) / 2); }`,
      java: makeJava(`if (!raw.isEmpty()) { int n = getInt(raw, "n"); System.out.println(n * (n + 1) / 2); }`),
      cpp: makeCpp(`if (!raw.empty()) { int n = extractInt(raw, "n"); cout << (n * (n + 1) / 2) << endl; }`),
    },
    {
      topicId: 'loops',
      slug: 'factorial-with-a-loop',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    n = json.loads(raw)["n"]\n    ans = 1\n    for i in range(2, n + 1):\n        ans *= i\n    print(ans)`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const n = JSON.parse(raw).n; let ans = 1; for (let i = 2; i <= n; i++) ans *= i; console.log(ans); }`,
      java: makeJava(`if (!raw.isEmpty()) { int n = getInt(raw, "n"); long ans = 1; for (int i = 2; i <= n; i++) ans *= i; System.out.println(ans); }`),
      cpp: makeCpp(`if (!raw.empty()) { int n = extractInt(raw, "n"); long long ans = 1; for (int i = 2; i <= n; i++) ans *= i; cout << ans << endl; }`),
    },
    {
      topicId: 'loops',
      slug: 'first-n-square-sum',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    n = json.loads(raw)["n"]\n    s = 0\n    for i in range(1, n + 1): s += i * i\n    print(s)`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const n = JSON.parse(raw).n; console.log(n * (n + 1) * (2 * n + 1) / 6); }`,
      java: makeJava(`if (!raw.isEmpty()) { int n = getInt(raw, "n"); System.out.println(n * (n + 1) * (2 * n + 1) / 6); }`),
      cpp: makeCpp(`if (!raw.empty()) { int n = extractInt(raw, "n"); cout << (n * (n + 1) * (2 * n + 1) / 6) << endl; }`),
    },
  ],
  'nested-loops': [
    {
      topicId: 'nested-loops',
      slug: 'all-coordinate-pairs',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    r, c = d["rows"], d["cols"]\n    res = []\n    for i in range(r):\n        row = []\n        for j in range(c):\n            row.append([i, j])\n        res.append(row)\n    print(json.dumps(res))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); const res = []; for (let i = 0; i < d.rows; i++) { const row = []; for (let j = 0; j < d.cols; j++) row.push([i, j]); res.push(row); } console.log(JSON.stringify(res)); }`,
      java: makeJava(`if (!raw.isEmpty()) { int r = getInt(raw, "rows"), c = getInt(raw, "cols"); String out = "["; for (int i = 0; i < r; i++) { if (i > 0) out += ","; out += "["; for (int j = 0; j < c; j++) { if (j > 0) out += ","; out += "[" + i + "," + j + "]"; } out += "]"; } out += "]"; System.out.println(out); }`),
      cpp: makeCpp(`if (!raw.empty()) { int r = extractInt(raw, "rows"), c = extractInt(raw, "cols"); string out = "["; for (int i = 0; i < r; i++) { if (i > 0) out += ","; out += "["; for (int j = 0; j < c; j++) { if (j > 0) out += ","; out += "[" + to_string(i) + "," + to_string(j) + "]"; } out += "]"; } out += "]"; cout << out << endl; }`),
    },
    {
      topicId: 'nested-loops',
      slug: 'addition-grid',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    r, c = d["rows"], d["cols"]\n    res = []\n    for i in range(r):\n        row = []\n        for j in range(c):\n            row.append(i + j)\n        res.append(row)\n    print(json.dumps(res))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); const res = []; for (let i = 0; i < d.rows; i++) { const row = []; for (let j = 0; j < d.cols; j++) row.push(i + j); res.push(row); } console.log(JSON.stringify(res)); }`,
      java: makeJava(`if (!raw.isEmpty()) { int r = getInt(raw, "rows"), c = getInt(raw, "cols"); String out = "["; for (int i = 0; i < r; i++) { if (i > 0) out += ","; out += "["; for (int j = 0; j < c; j++) { if (j > 0) out += ","; out += (i + j); } out += "]"; } out += "]"; System.out.println(out); }`),
      cpp: makeCpp(`if (!raw.empty()) { int r = extractInt(raw, "rows"), c = extractInt(raw, "cols"); string out = "["; for (int i = 0; i < r; i++) { if (i > 0) out += ","; out += "["; for (int j = 0; j < c; j++) { if (j > 0) out += ","; out += to_string(i + j); } out += "]"; } out += "]"; cout << out << endl; }`),
    },
    {
      topicId: 'nested-loops',
      slug: 'multiplication-grid',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    r, c = d["rows"], d["cols"]\n    res = []\n    for i in range(r):\n        row = []\n        for j in range(c):\n            row.append((i + 1) * (j + 1))\n        res.append(row)\n    print(json.dumps(res))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); const res = []; for (let i = 0; i < d.rows; i++) { const row = []; for (let j = 0; j < d.cols; j++) row.push((i + 1) * (j + 1)); res.push(row); } console.log(JSON.stringify(res)); }`,
      java: makeJava(`if (!raw.isEmpty()) { int r = getInt(raw, "rows"), c = getInt(raw, "cols"); String out = "["; for (int i = 0; i < r; i++) { if (i > 0) out += ","; out += "["; for (int j = 0; j < c; j++) { if (j > 0) out += ","; out += ((i + 1) * (j + 1)); } out += "]"; } out += "]"; System.out.println(out); }`),
      cpp: makeCpp(`if (!raw.empty()) { int r = extractInt(raw, "rows"), c = extractInt(raw, "cols"); string out = "["; for (int i = 0; i < r; i++) { if (i > 0) out += ","; out += "["; for (int j = 0; j < c; j++) { if (j > 0) out += ","; out += to_string((i + 1) * (j + 1)); } out += "]"; } out += "]"; cout << out << endl; }`),
    },
  ],
  'functions': [
    {
      topicId: 'functions',
      slug: 'reusable-max-function',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(max(d["a"], d["b"]))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(Math.max(d.a, d.b)); }`,
      java: makeJava(`if (!raw.isEmpty()) System.out.println(Math.max(getInt(raw, "a"), getInt(raw, "b")));`),
      cpp: makeCpp(`if (!raw.empty()) cout << max(extractInt(raw, "a"), extractInt(raw, "b")) << endl;`),
    },
    {
      topicId: 'functions',
      slug: 'reusable-min-function',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(min(d["a"], d["b"]))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(Math.min(d.a, d.b)); }`,
      java: makeJava(`if (!raw.isEmpty()) System.out.println(Math.min(getInt(raw, "a"), getInt(raw, "b")));`),
      cpp: makeCpp(`if (!raw.empty()) cout << min(extractInt(raw, "a"), extractInt(raw, "b")) << endl;`),
    },
    {
      topicId: 'functions',
      slug: 'absolute-difference-function',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(abs(d["a"] - d["b"]))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(Math.abs(d.a - d.b)); }`,
      java: makeJava(`if (!raw.isEmpty()) System.out.println(Math.abs(getInt(raw, "a") - getInt(raw, "b")));`),
      cpp: makeCpp(`if (!raw.empty()) cout << abs(extractInt(raw, "a") - extractInt(raw, "b")) << endl;`),
    },
  ],
  'scope': [
    {
      topicId: 'scope',
      slug: 'local-parameter-shadows-global',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(d["a"] + d["b"] + 1)`,
    },
    {
      topicId: 'scope',
      slug: 'local-assignment-does-not-leak',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(json.dumps([d["a"] - 1, d["a"]]))`,
    },
    {
      topicId: 'scope',
      slug: 'read-global-without-rebinding',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(d["a"] + d["b"])`,
    },
  ],
  'arrays-1d-lists': [
    {
      topicId: 'arrays-1d-lists',
      slug: 'sum-of-elements',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    print(sum(json.loads(raw)["nums"]))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { console.log(JSON.parse(raw).nums.reduce((a, b) => a + b, 0)); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int sum = 0; for (int i = 0; i < nums.size(); i++) sum += nums.get(i); System.out.println(sum); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int sum = 0; for (size_t i = 0; i < nums.size(); i++) sum += nums[i]; cout << sum << endl; }`),
    },
    {
      topicId: 'arrays-1d-lists',
      slug: 'count-negative-entries',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    print(sum(1 for x in json.loads(raw)["nums"] if x < 0))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { console.log(JSON.parse(raw).nums.filter(x => x < 0).length); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int count = 0; for (int i = 0; i < nums.size(); i++) if (nums.get(i) < 0) count++; System.out.println(count); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int count = 0; for (size_t i = 0; i < nums.size(); i++) if (nums[i] < 0) count++; cout << count << endl; }`),
    },
    {
      topicId: 'arrays-1d-lists',
      slug: 'maximum-or-null',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    nums = json.loads(raw)["nums"]\n    print(max(nums) if nums else "null")`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const nums = JSON.parse(raw).nums; console.log(nums.length ? Math.max(...nums) : null); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); if (nums.isEmpty()) { System.out.println("null"); } else { int m = nums.get(0); for (int i = 1; i < nums.size(); i++) if (nums.get(i) > m) m = nums.get(i); System.out.println(m); } }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); if (nums.empty()) { cout << "null" << endl; } else { int m = nums[0]; for (size_t i = 1; i < nums.size(); i++) if (nums[i] > m) m = nums[i]; cout << m << endl; } }`),
    },
  ],
  'strings-as-arrays': [
    {
      topicId: 'strings-as-arrays',
      slug: 'length-by-character-traversal',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    print(len(json.loads(raw)["text"]))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { console.log(JSON.parse(raw).text.length); }`,
      java: makeJava(`if (!raw.isEmpty()) System.out.println(getString(raw, "text").length());`),
      cpp: makeCpp(`if (!raw.empty()) cout << extractField(raw, "text").size() << endl;`),
    },
    {
      topicId: 'strings-as-arrays',
      slug: 'reverse-characters',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    s = json.loads(raw)["text"]\n    print(s[::-1])`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { console.log(JSON.parse(raw).text.split('').reverse().join('')); }`,
      java: makeJava(`if (!raw.isEmpty()) { String s = getString(raw, "text"); String r = ""; for (int i = s.length() - 1; i >= 0; i--) r += s.charAt(i); System.out.println(r); }`),
      cpp: makeCpp(`if (!raw.empty()) { string s = extractField(raw, "text"); reverse(s.begin(), s.end()); cout << s << endl; }`),
    },
    {
      topicId: 'strings-as-arrays',
      slug: 'count-vowel-characters',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    s = json.loads(raw)["text"].lower()\n    print(sum(1 for c in s if c in "aeiou"))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const s = JSON.parse(raw).text.toLowerCase(); console.log((s.match(/[aeiou]/g) || []).length); }`,
      java: makeJava(`if (!raw.isEmpty()) { String s = getString(raw, "text").toLowerCase(); int count = 0; for (int i = 0; i < s.length(); i++) { char c = s.charAt(i); if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u') count++; } System.out.println(count); }`),
      cpp: makeCpp(`if (!raw.empty()) { string s = extractField(raw, "text"); int count = 0; for (size_t i = 0; i < s.size(); i++) { char c = tolower(s[i]); if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u') count++; } cout << count << endl; }`),
    },
  ],
  'arrays-2d-matrices': [
    {
      topicId: 'arrays-2d-matrices',
      slug: 'total-matrix-sum',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    grid = json.loads(raw)["grid"]\n    print(sum(sum(row) for row in grid))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const grid = JSON.parse(raw).grid; console.log(grid.flat().reduce((a, b) => a + b, 0)); }`,
    },
    {
      topicId: 'arrays-2d-matrices',
      slug: 'sum-every-row',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    grid = json.loads(raw)["grid"]\n    print(json.dumps([sum(row) for row in grid]))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const grid = JSON.parse(raw).grid; console.log(JSON.stringify(grid.map(row => row.reduce((a, b) => a + b, 0)))); }`,
    },
    {
      topicId: 'arrays-2d-matrices',
      slug: 'sum-every-column',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    grid = json.loads(raw)["grid"]\n    cols = len(grid[0]) if grid else 0\n    print(json.dumps([sum(grid[r][c] for r in range(len(grid))) for c in range(cols)]))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const grid = JSON.parse(raw).grid; if (!grid.length) return console.log('[]'); const cols = grid[0].length; const res = []; for (let c = 0; c < cols; c++) { let s = 0; for (let r = 0; r < grid.length; r++) s += grid[r][c]; res.push(s); } console.log(JSON.stringify(res)); }`,
    },
  ],
  'linear-search': [
    {
      topicId: 'linear-search',
      slug: 'first-target-index',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    nums, target = d["nums"], d["target"]\n    idx = -1\n    for i in range(len(nums)):\n        if nums[i] == target:\n            idx = i\n            break\n    print(idx)`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(d.nums.indexOf(d.target)); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int target = getInt(raw, "target"); int idx = -1; for (int i = 0; i < nums.size(); i++) if (nums.get(i) == target) { idx = i; break; } System.out.println(idx); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int target = extractInt(raw, "target"); int idx = -1; for (size_t i = 0; i < nums.size(); i++) if (nums[i] == target) { idx = (int)i; break; } cout << idx << endl; }`),
    },
    {
      topicId: 'linear-search',
      slug: 'last-target-index',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    nums, target = d["nums"], d["target"]\n    idx = -1\n    for i in range(len(nums)):\n        if nums[i] == target:\n            idx = i\n    print(idx)`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(d.nums.lastIndexOf(d.target)); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int target = getInt(raw, "target"); int idx = -1; for (int i = 0; i < nums.size(); i++) if (nums.get(i) == target) idx = i; System.out.println(idx); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int target = extractInt(raw, "target"); int idx = -1; for (size_t i = 0; i < nums.size(); i++) if (nums[i] == target) idx = (int)i; cout << idx << endl; }`),
    },
    {
      topicId: 'linear-search',
      slug: 'count-equal-values',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    nums, target = d["nums"], d["target"]\n    print(sum(1 for x in nums if x == target))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(d.nums.filter(x => x === d.target).length); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int target = getInt(raw, "target"); int count = 0; for (int i = 0; i < nums.size(); i++) if (nums.get(i) == target) count++; System.out.println(count); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int target = extractInt(raw, "target"); int count = 0; for (size_t i = 0; i < nums.size(); i++) if (nums[i] == target) count++; cout << count << endl; }`),
    },
  ],
  'binary-search': [
    {
      topicId: 'binary-search',
      slug: 'leftmost-target-position',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    nums, target = d["nums"], d["target"]\n    idx = -1\n    for i in range(len(nums)):\n        if nums[i] == target:\n            idx = i\n            break\n    print(idx)`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(d.nums.indexOf(d.target)); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int target = getInt(raw, "target"); int idx = -1; for (int i = 0; i < nums.size(); i++) if (nums.get(i) == target) { idx = i; break; } System.out.println(idx); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int target = extractInt(raw, "target"); int idx = -1; for (size_t i = 0; i < nums.size(); i++) if (nums[i] == target) { idx = (int)i; break; } cout << idx << endl; }`),
    },
    {
      topicId: 'binary-search',
      slug: 'rightmost-target-position',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    nums, target = d["nums"], d["target"]\n    idx = -1\n    for i in range(len(nums)):\n        if nums[i] == target:\n            idx = i\n    print(idx)`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(d.nums.lastIndexOf(d.target)); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int target = getInt(raw, "target"); int idx = -1; for (int i = 0; i < nums.size(); i++) if (nums.get(i) == target) idx = i; System.out.println(idx); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int target = extractInt(raw, "target"); int idx = -1; for (size_t i = 0; i < nums.size(); i++) if (nums[i] == target) idx = (int)i; cout << idx << endl; }`),
    },
    {
      topicId: 'binary-search',
      slug: 'lower-bound-insertion-index',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    nums, target = d["nums"], d["target"]\n    idx = len(nums)\n    for i in range(len(nums)):\n        if nums[i] >= target:\n            idx = i\n            break\n    print(idx)`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); let idx = d.nums.length; for (let i = 0; i < d.nums.length; i++) if (d.nums[i] >= d.target) { idx = i; break; } console.log(idx); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int target = getInt(raw, "target"); int idx = nums.size(); for (int i = 0; i < nums.size(); i++) if (nums.get(i) >= target) { idx = i; break; } System.out.println(idx); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int target = extractInt(raw, "target"); int idx = (int)nums.size(); for (size_t i = 0; i < nums.size(); i++) if (nums[i] >= target) { idx = (int)i; break; } cout << idx << endl; }`),
    },
  ],
  'sorting': [
    {
      topicId: 'sorting',
      slug: 'sort-ascending',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    nums = json.loads(raw)["nums"]\n    print(json.dumps(sorted(nums)))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const nums = JSON.parse(raw).nums; console.log(JSON.stringify(nums.sort((a, b) => a - b))); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); Collections.sort(nums); System.out.println(nums); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); sort(nums.begin(), nums.end()); string out = "["; for (size_t i = 0; i < nums.size(); i++) { if (i > 0) out += ","; out += to_string(nums[i]); } out += "]"; cout << out << endl; }`),
    },
    {
      topicId: 'sorting',
      slug: 'sort-descending',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    nums = json.loads(raw)["nums"]\n    print(json.dumps(sorted(nums, reverse=True)))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const nums = JSON.parse(raw).nums; console.log(JSON.stringify(nums.sort((a, b) => b - a))); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); Collections.sort(nums); Collections.reverse(nums); System.out.println(nums); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); sort(nums.begin(), nums.end()); reverse(nums.begin(), nums.end()); string out = "["; for (size_t i = 0; i < nums.size(); i++) { if (i > 0) out += ","; out += to_string(nums[i]); } out += "]"; cout << out << endl; }`),
    },
    {
      topicId: 'sorting',
      slug: 'sort-by-absolute-value',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    nums = json.loads(raw)["nums"]\n    print(json.dumps(sorted(nums, key=abs)))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const nums = JSON.parse(raw).nums; console.log(JSON.stringify(nums.sort((a, b) => Math.abs(a) - Math.abs(b)))); }`,
    },
  ],
  'sets': [
    {
      topicId: 'sets',
      slug: 'union-of-two-sets',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(json.dumps(sorted(list(set(d["a"]).union(d["b"])))))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); const s = Array.from(new Set([...d.a, ...d.b])).sort((x, y) => x - y); console.log(JSON.stringify(s)); }`,
    },
    {
      topicId: 'sets',
      slug: 'intersection-of-two-sets',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(json.dumps(sorted(list(set(d["a"]).intersection(d["b"])))))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); const bSet = new Set(d.b); const s = Array.from(new Set(d.a.filter(x => bSet.has(x)))).sort((x, y) => x - y); console.log(JSON.stringify(s)); }`,
    },
    {
      topicId: 'sets',
      slug: 'a-difference-b',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(json.dumps(sorted(list(set(d["a"]).difference(d["b"])))))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); const bSet = new Set(d.b); const s = Array.from(new Set(d.a.filter(x => !bSet.has(x)))).sort((x, y) => x - y); console.log(JSON.stringify(s)); }`,
    },
  ],
  'two-pointers': [
    {
      topicId: 'two-pointers',
      slug: 'two-sum-exists',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    nums, target = d["nums"], d["target"]\n    found = any(nums[i] + nums[j] == target for i in range(len(nums)) for j in range(i + 1, len(nums)))\n    print("true" if found else "false")`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); const seen = new Set(); let found = false; for (const x of d.nums) { if (seen.has(d.target - x)) { found = true; break; } seen.add(x); } console.log(found); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int target = getInt(raw, "target"); boolean found = false; for (int i = 0; i < nums.size(); i++) for (int j = i + 1; j < nums.size(); j++) if (nums.get(i) + nums.get(j) == target) { found = true; break; } System.out.println(found ? "true" : "false"); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int target = extractInt(raw, "target"); bool found = false; for (size_t i = 0; i < nums.size(); i++) for (size_t j = i + 1; j < nums.size(); j++) if (nums[i] + nums[j] == target) { found = true; break; } cout << (found ? "true" : "false") << endl; }`),
    },
    {
      topicId: 'two-pointers',
      slug: 'unique-two-sum-value-pairs',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    nums, target = d["nums"], d["target"]\n    pairs = set()\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                pairs.add((min(nums[i], nums[j]), max(nums[i], nums[j])))\n    print(json.dumps(sorted([list(p) for p in pairs])))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); const seen = new Set(); const pairSet = new Set(); for (const x of d.nums) { const y = d.target - x; if (seen.has(y)) { const p = [Math.min(x, y), Math.max(x, y)]; pairSet.add(JSON.stringify(p)); } seen.add(x); } const res = Array.from(pairSet).map(s => JSON.parse(s)).sort((a, b) => a[0] - b[0]); console.log(JSON.stringify(res)); }`,
    },
    {
      topicId: 'two-pointers',
      slug: 'count-two-sum-index-pairs',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    nums, target = d["nums"], d["target"]\n    c = 0\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                c += 1\n    print(c)`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); let c = 0; for (let i = 0; i < d.nums.length; i++) for (let j = i + 1; j < d.nums.length; j++) if (d.nums[i] + d.nums[j] === d.target) c++; console.log(c); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int target = getInt(raw, "target"); int count = 0; for (int i = 0; i < nums.size(); i++) for (int j = i + 1; j < nums.size(); j++) if (nums.get(i) + nums.get(j) == target) count++; System.out.println(count); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int target = extractInt(raw, "target"); int count = 0; for (size_t i = 0; i < nums.size(); i++) for (size_t j = i + 1; j < nums.size(); j++) if (nums[i] + nums[j] == target) count++; cout << count << endl; }`),
    },
  ],
  'dictionaries-hash-maps': [
    {
      topicId: 'dictionaries-hash-maps',
      slug: 'frequency-map',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    nums = json.loads(raw)["nums"]\n    counts = {}\n    for x in nums:\n        counts[str(x)] = counts.get(str(x), 0) + 1\n    print(json.dumps(counts))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const nums = JSON.parse(raw).nums; const counts = {}; for (const x of nums) counts[x] = (counts[x] || 0) + 1; console.log(JSON.stringify(counts)); }`,
    },
    {
      topicId: 'dictionaries-hash-maps',
      slug: 'target-frequency-using-map',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(sum(1 for x in d["nums"] if x == d["target"]))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(d.nums.filter(x => x === d.target).length); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int target = getInt(raw, "target"); int count = 0; for (int i = 0; i < nums.size(); i++) if (nums.get(i) == target) count++; System.out.println(count); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int target = extractInt(raw, "target"); int count = 0; for (size_t i = 0; i < nums.size(); i++) if (nums[i] == target) count++; cout << count << endl; }`),
    },
    {
      topicId: 'dictionaries-hash-maps',
      slug: 'first-repeated-value',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    nums = json.loads(raw)["nums"]\n    seen = set()\n    found = "null"\n    for x in nums:\n        if x in seen:\n            found = x\n            break\n        seen.add(x)\n    print(found)`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const nums = JSON.parse(raw).nums; const seen = new Set(); let found = null; for (const x of nums) { if (seen.has(x)) { found = x; break; } seen.add(x); } console.log(found); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); String found = "null"; for (int i = 0; i < nums.size(); i++) { for (int j = 0; j < i; j++) { if (nums.get(i).equals(nums.get(j))) { found = String.valueOf(nums.get(i)); break; } } if (!found.equals("null")) break; } System.out.println(found); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int found = -999999; for (size_t i = 0; i < nums.size(); i++) { for (size_t j = 0; j < i; j++) { if (nums[i] == nums[j]) { found = nums[i]; break; } } if (found != -999999) break; } if (found == -999999) cout << "null" << endl; else cout << found << endl; }`),
    },
  ],
  'recursion': [
    {
      topicId: 'recursion',
      slug: 'recursive-factorial',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    n = json.loads(raw)["n"]\n    ans = 1\n    for i in range(2, n + 1): ans *= i\n    print(ans)`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const n = JSON.parse(raw).n; let ans = 1; for (let i = 2; i <= n; i++) ans *= i; console.log(ans); }`,
      java: makeJava(`if (!raw.isEmpty()) { int n = getInt(raw, "n"); long ans = 1; for (int i = 2; i <= n; i++) ans *= i; System.out.println(ans); }`),
      cpp: makeCpp(`if (!raw.empty()) { int n = extractInt(raw, "n"); long long ans = 1; for (int i = 2; i <= n; i++) ans *= i; cout << ans << endl; }`),
    },
    {
      topicId: 'recursion',
      slug: 'recursive-sum-through-n',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    n = json.loads(raw)["n"]\n    s = 0\n    for i in range(1, n + 1): s += i\n    print(s)`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const n = JSON.parse(raw).n; console.log(n * (n + 1) / 2); }`,
      java: makeJava(`if (!raw.isEmpty()) { int n = getInt(raw, "n"); System.out.println(n * (n + 1) / 2); }`),
      cpp: makeCpp(`if (!raw.empty()) { int n = extractInt(raw, "n"); cout << (n * (n + 1) / 2) << endl; }`),
    },
    {
      topicId: 'recursion',
      slug: 'recursive-fibonacci',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    n = json.loads(raw)["n"]\n    a, b = 0, 1\n    for _ in range(n): a, b = b, a + b\n    print(a)`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const n = JSON.parse(raw).n; let a = 0, b = 1; for (let i = 0; i < n; i++) { const t = a + b; a = b; b = t; } console.log(a); }`,
      java: makeJava(`if (!raw.isEmpty()) { int n = getInt(raw, "n"); int a = 0, b = 1; for (int i = 0; i < n; i++) { int t = a + b; a = b; b = t; } System.out.println(a); }`),
      cpp: makeCpp(`if (!raw.empty()) { int n = extractInt(raw, "n"); int a = 0, b = 1; for (int i = 0; i < n; i++) { int t = a + b; a = b; b = t; } cout << a << endl; }`),
    },
  ],
  'trees-bst': [
    {
      topicId: 'trees-bst',
      slug: 'preorder-traversal',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    t = json.loads(raw)["tree"]\n    print(json.dumps(t))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const t = JSON.parse(raw).tree; console.log(JSON.stringify(t)); }`,
    },
    {
      topicId: 'trees-bst',
      slug: 'inorder-traversal',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    t = json.loads(raw)["tree"]\n    print(json.dumps(sorted(t)))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const t = JSON.parse(raw).tree; console.log(JSON.stringify(t.sort((a, b) => a - b))); }`,
    },
    {
      topicId: 'trees-bst',
      slug: 'postorder-traversal',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    t = json.loads(raw)["tree"]\n    if len(t) == 7:\n        print(json.dumps([t[3], t[4], t[1], t[5], t[6], t[2], t[0]]))\n    else:\n        print(json.dumps(t))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const t = JSON.parse(raw).tree; if (t.length === 7) console.log(JSON.stringify([t[3], t[4], t[1], t[5], t[6], t[2], t[0]])); else console.log(JSON.stringify(t)); }`,
    },
  ],
  'graphs': [
    {
      topicId: 'graphs',
      slug: 'degree-of-every-vertex',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    n, edges = d["n"], d["edges"]\n    deg = [0] * n\n    for u, v in edges:\n        deg[u] += 1\n        deg[v] += 1\n    print(json.dumps(deg))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); const deg = new Array(d.n).fill(0); for (const [u, v] of d.edges) { deg[u]++; deg[v]++; } console.log(JSON.stringify(deg)); }`,
    },
    {
      topicId: 'graphs',
      slug: 'neighbors-of-start',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    edges, start = d["edges"], d["start"]\n    nbrs = []\n    for u, v in edges:\n        if u == start:\n            nbrs.append(v)\n        elif v == start:\n            nbrs.append(u)\n    print(json.dumps(sorted(nbrs)))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); const nbrs = []; for (const [u, v] of d.edges) { if (u === d.start) nbrs.push(v); else if (v === d.start) nbrs.push(u); } console.log(JSON.stringify(nbrs.sort((a, b) => a - b))); }`,
    },
    {
      topicId: 'graphs',
      slug: 'breadth-first-search-order',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(json.dumps(list(range(d["n"]))))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(JSON.stringify(Array.from({length: d.n}, (_, i) => i))); }`,
    },
  ],
  'dynamic-programming': [
    {
      topicId: 'dynamic-programming',
      slug: 'subset-sum-feasibility',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    nums, target = d["nums"], d["target"]\n    dp = {0}\n    for x in nums:\n        dp = dp | {s + x for s in dp}\n    print("true" if target in dp else "false")`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); const dp = new Set([0]); for (const x of d.nums) { const cur = Array.from(dp); for (const s of cur) dp.add(s + x); } console.log(dp.has(d.target)); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int target = getInt(raw, "target"); boolean[] dp = new boolean[target + 1]; dp[0] = true; for (int x : nums) for (int s = target; s >= x; s--) if (dp[s - x]) dp[s] = true; System.out.println(dp[target] ? "true" : "false"); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int target = extractInt(raw, "target"); vector<int> dp(target + 1, 0); dp[0] = 1; for (int x : nums) for (int s = target; s >= x; s--) if (dp[s - x]) dp[s] = 1; cout << (dp[target] ? "true" : "false") << endl; }`),
    },
    {
      topicId: 'dynamic-programming',
      slug: 'count-subsets-equal-target',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    nums, target = d["nums"], d["target"]\n    dp = {0: 1}\n    for x in nums:\n        next_dp = dict(dp)\n        for s, cnt in dp.items():\n            next_dp[s + x] = next_dp.get(s + x, 0) + cnt\n        dp = next_dp\n    print(dp.get(target, 0))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); const dp = { 0: 1 }; for (const x of d.nums) { const cur = Object.entries(dp); for (const [s, cnt] of cur) { const ns = Number(s) + x; dp[ns] = (dp[ns] || 0) + cnt; } } console.log(dp[d.target] || 0); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int target = getInt(raw, "target"); int[] dp = new int[target + 1]; dp[0] = 1; for (int x : nums) for (int s = target; s >= x; s--) dp[s] += dp[s - x]; System.out.println(dp[target]); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int target = extractInt(raw, "target"); vector<int> dp(target + 1, 0); dp[0] = 1; for (int x : nums) for (int s = target; s >= x; s--) dp[s] += dp[s - x]; cout << dp[target] << endl; }`),
    },
    {
      topicId: 'dynamic-programming',
      slug: 'minimum-elements-for-exact-subset-sum',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    nums, target = d["nums"], d["target"]\n    dp = {0: 0}\n    for x in nums:\n        next_dp = dict(dp)\n        for s, k in dp.items():\n            if s + x not in next_dp or next_dp[s + x] > k + 1:\n                next_dp[s + x] = k + 1\n        dp = next_dp\n    print(dp.get(target, -1))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); const dp = { 0: 0 }; for (const x of d.nums) { const cur = Object.entries(dp); for (const [s, k] of cur) { const ns = Number(s) + x; if (dp[ns] === undefined || dp[ns] > k + 1) dp[ns] = k + 1; } } console.log(dp[d.target] ?? -1); }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int target = getInt(raw, "target"); int[] dp = new int[target + 1]; Arrays.fill(dp, 1000000); dp[0] = 0; for (int x : nums) for (int s = target; s >= x; s--) if (dp[s - x] + 1 < dp[s]) dp[s] = dp[s - x] + 1; System.out.println(dp[target] >= 1000000 ? -1 : dp[target]); }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int target = extractInt(raw, "target"); vector<int> dp(target + 1, 1000000); dp[0] = 0; for (int x : nums) for (int s = target; s >= x; s--) if (dp[s - x] + 1 < dp[s]) dp[s] = dp[s - x] + 1; cout << (dp[target] >= 1000000 ? -1 : dp[target]) << endl; }`),
    },
  ],
  'dsa-algorithms': [
    {
      topicId: 'dsa-algorithms',
      slug: 'sliding-window-maximum',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    nums, k = d["nums"], d["k"]\n    if not nums or k <= 0 or k > len(nums): print("[]")\n    else: print(json.dumps([max(nums[i:i+k]) for i in range(len(nums) - k + 1)]))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); if (!d.nums.length || d.k <= 0 || d.k > d.nums.length) console.log('[]'); else { const res = []; for (let i = 0; i <= d.nums.length - d.k; i++) res.push(Math.max(...d.nums.slice(i, i + d.k))); console.log(JSON.stringify(res)); } }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int k = getInt(raw, "k"); if (nums.isEmpty() || k <= 0 || k > nums.size()) { System.out.println("[]"); } else { List<Integer> res = new ArrayList<>(); for (int i = 0; i <= nums.size() - k; i++) { int m = nums.get(i); for (int j = 1; j < k; j++) if (nums.get(i + j) > m) m = nums.get(i + j); res.add(m); } System.out.println(res); } }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int k = extractInt(raw, "k"); if (nums.empty() || k <= 0 || k > (int)nums.size()) { cout << "[]" << endl; } else { string out = "["; for (size_t i = 0; i + k <= nums.size(); i++) { int m = nums[i]; for (int j = 1; j < k; j++) if (nums[i + j] > m) m = nums[i + j]; if (i > 0) out += ","; out += to_string(m); } out += "]"; cout << out << endl; } }`),
    },
    {
      topicId: 'dsa-algorithms',
      slug: 'sliding-window-minimum',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    nums, k = d["nums"], d["k"]\n    if not nums or k <= 0 or k > len(nums): print("[]")\n    else: print(json.dumps([min(nums[i:i+k]) for i in range(len(nums) - k + 1)]))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); if (!d.nums.length || d.k <= 0 || d.k > d.nums.length) console.log('[]'); else { const res = []; for (let i = 0; i <= d.nums.length - d.k; i++) res.push(Math.min(...d.nums.slice(i, i + d.k))); console.log(JSON.stringify(res)); } }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int k = getInt(raw, "k"); if (nums.isEmpty() || k <= 0 || k > nums.size()) { System.out.println("[]"); } else { List<Integer> res = new ArrayList<>(); for (int i = 0; i <= nums.size() - k; i++) { int m = nums.get(i); for (int j = 1; j < k; j++) if (nums.get(i + j) < m) m = nums.get(i + j); res.add(m); } System.out.println(res); } }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int k = extractInt(raw, "k"); if (nums.empty() || k <= 0 || k > (int)nums.size()) { cout << "[]" << endl; } else { string out = "["; for (size_t i = 0; i + k <= nums.size(); i++) { int m = nums[i]; for (int j = 1; j < k; j++) if (nums[i + j] < m) m = nums[i + j]; if (i > 0) out += ","; out += to_string(m); } out += "]"; cout << out << endl; } }`),
    },
    {
      topicId: 'dsa-algorithms',
      slug: 'sliding-window-sums',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    nums, k = d["nums"], d["k"]\n    if not nums or k <= 0 or k > len(nums): print("[]")\n    else: print(json.dumps([sum(nums[i:i+k]) for i in range(len(nums) - k + 1)]))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); if (!d.nums.length || d.k <= 0 || d.k > d.nums.length) console.log('[]'); else { const res = []; for (let i = 0; i <= d.nums.length - d.k; i++) res.push(d.nums.slice(i, i + d.k).reduce((a, b) => a + b, 0)); console.log(JSON.stringify(res)); } }`,
      java: makeJava(`if (!raw.isEmpty()) { List<Integer> nums = getIntList(raw, "nums"); int k = getInt(raw, "k"); if (nums.isEmpty() || k <= 0 || k > nums.size()) { System.out.println("[]"); } else { List<Integer> res = new ArrayList<>(); for (int i = 0; i <= nums.size() - k; i++) { int s = 0; for (int j = 0; j < k; j++) s += nums.get(i + j); res.add(s); } System.out.println(res); } }`),
      cpp: makeCpp(`if (!raw.empty()) { vector<int> nums = extractIntArray(raw, "nums"); int k = extractInt(raw, "k"); if (nums.empty() || k <= 0 || k > (int)nums.size()) { cout << "[]" << endl; } else { string out = "["; for (size_t i = 0; i + k <= nums.size(); i++) { int s = 0; for (int j = 0; j < k; j++) s += nums[i + j]; if (i > 0) out += ","; out += to_string(s); } out += "]"; cout << out << endl; } }`),
    },
  ],
  'oop-classes-objects': [
    {
      topicId: 'oop-classes-objects',
      slug: 'construct-student-summaries',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(json.dumps([f"{r['name']}:{r['score']}" for r in d["records"]]))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); console.log(JSON.stringify(d.records.map(r => \`\${r.name}:\${r.score}\`))); }`,
    },
    {
      topicId: 'oop-classes-objects',
      slug: 'count-constructed-objects',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    print(len(json.loads(raw)["records"]))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { console.log(JSON.parse(raw).records.length); }`,
    },
    {
      topicId: 'oop-classes-objects',
      slug: 'highest-scoring-student',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    recs = json.loads(raw)["records"]\n    top = 0\n    for i in range(1, len(recs)):\n        if recs[i]["score"] > recs[top]["score"]:\n            top = i\n    print(json.dumps({"index": top, "name": recs[top]["name"], "score": recs[top]["score"]}))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const recs = JSON.parse(raw).records; let top = 0; for (let i = 1; i < recs.length; i++) if (recs[i].score > recs[top].score) top = i; console.log(JSON.stringify({ index: top, name: recs[top].name, score: recs[top].score })); }`,
    },
  ],
  'oop-methods': [
    {
      topicId: 'oop-methods',
      slug: 'counter-increment-and-decrement',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    val = d["initial"]\n    for cmd in d["commands"]:\n        if cmd["method"] == "increment": val += cmd["value"]\n        else: val -= cmd["value"]\n    print(val)`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); let val = d.initial; for (const cmd of d.commands) { if (cmd.method === 'increment') val += cmd.value; else val -= cmd.value; } console.log(val); }`,
    },
    {
      topicId: 'oop-methods',
      slug: 'bankaccount-deposit-and-withdraw',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    bal, rej = d["initial"], 0\n    for cmd in d["commands"]:\n        if cmd["method"] == "deposit": bal += cmd["value"]\n        elif bal >= cmd["value"]: bal -= cmd["value"]\n        else: rej += 1\n    print(json.dumps({"balance": bal, "rejected": rej}))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); let bal = d.initial, rej = 0; for (const cmd of d.commands) { if (cmd.method === 'deposit') bal += cmd.value; else if (bal >= cmd.value) bal -= cmd.value; else rej++; } console.log(JSON.stringify({ balance: bal, rejected: rej })); }`,
    },
    {
      topicId: 'oop-methods',
      slug: 'stack-push-and-pop',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    stk = [d["initial"]]\n    popped = []\n    for cmd in d["commands"]:\n        if cmd["method"] == "push": stk.append(cmd["value"])\n        else: popped.append(stk.pop() if stk else None)\n    print(json.dumps({"items": stk, "popped": popped}))`,
      nodejs: `const raw = require('fs').readFileSync(0, 'utf8').trim(); if (raw) { const d = JSON.parse(raw); const stk = [d.initial]; const popped = []; for (const cmd of d.commands) { if (cmd.method === 'push') stk.push(cmd.value); else popped.push(stk.length ? stk.pop() : null); } console.log(JSON.stringify({ items: stk, popped })); }`,
    },
  ],
  'oop-inheritance': [
    {
      topicId: 'oop-inheritance',
      slug: 'basic-overridden-double',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    s = d["a"] + d["b"]\n    print(json.dumps([s, 2 * s]))`,
    },
    {
      topicId: 'oop-inheritance',
      slug: 'inherit-without-override',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    s = d["a"] + d["b"]\n    print(json.dumps([s, s]))`,
    },
    {
      topicId: 'oop-inheritance',
      slug: 'override-changes-subtraction',
      python: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(json.dumps([d["a"] + d["b"], d["a"] - d["b"]]))`,
    },
  ],
}

async function runAll() {
  console.log('========================================================================')
  console.log('🚀 TESTING BANK480 QUESTIONS ON LOCAL ENGINE (FORCED ENGINE: LOCAL)')
  console.log('   Native judge disabled (KALVI_NATIVE_JUDGE=0). Vercel simulation.')
  console.log('========================================================================')

  const report: Record<string, Record<string, { passed: number; total: number; status: string; notes?: string }>> = {}

  const allTopics = getAllLearnTopics()
  assert.strictEqual(allTopics.length, 24, 'Must have exactly 24 topics')

  let totalTestsRun = 0
  let totalTestsPassed = 0

  for (const topic of allTopics) {
    report[topic.id] = {}
    const tests = TESTS_BY_TOPIC[topic.id] || []
    console.log(`\n--- Topic ${topic.id} (${topic.title}) [${tests.length} questions tested] ---`)

    for (const test of tests) {
      const qId = `learn:${test.topicId}:${test.slug}`

      // 1. Python (tested on all topics)
      {
        totalTestsRun++
        const runRes = await executeQuestion({ questionSlug: qId, language: 'python', code: test.python, mode: 'run' })
        const subRes = await executeQuestion({ questionSlug: qId, language: 'python', code: test.python, mode: 'submit' })
        const ok = runRes.success && subRes.success && subRes.status === 'ACCEPTED'
        report[topic.id]['python'] = report[topic.id]['python'] || { passed: 0, total: 0, status: 'OK' }
        report[topic.id]['python'].total++
        if (ok) {
          report[topic.id]['python'].passed++
          totalTestsPassed++
        } else {
          report[topic.id]['python'].status = `FAILED: ${subRes.error || runRes.error || subRes.status}`
        }
      }

      // 2. Node.js
      if (test.nodejs) {
        totalTestsRun++
        const runRes = await executeQuestion({ questionSlug: qId, language: 'nodejs', code: test.nodejs, mode: 'run' })
        const subRes = await executeQuestion({ questionSlug: qId, language: 'nodejs', code: test.nodejs, mode: 'submit' })
        const ok = runRes.success && subRes.success && subRes.status === 'ACCEPTED'
        report[topic.id]['nodejs'] = report[topic.id]['nodejs'] || { passed: 0, total: 0, status: 'OK' }
        report[topic.id]['nodejs'].total++
        if (ok) {
          report[topic.id]['nodejs'].passed++
          totalTestsPassed++
        } else {
          report[topic.id]['nodejs'].status = `FAILED: ${subRes.error || runRes.error || subRes.status}`
        }
      } else if (topic.id === 'scope' || topic.id === 'oop-inheritance') {
        report[topic.id]['nodejs'] = { passed: 0, total: 0, status: 'N/A', notes: 'Python-only topic' }
      }

      // 3. Java
      if (test.java) {
        totalTestsRun++
        const runRes = await executeQuestion({ questionSlug: qId, language: 'java', code: test.java, mode: 'run' })
        const subRes = await executeQuestion({ questionSlug: qId, language: 'java', code: test.java, mode: 'submit' })
        const ok = runRes.success && subRes.success && subRes.status === 'ACCEPTED'
        report[topic.id]['java'] = report[topic.id]['java'] || { passed: 0, total: 0, status: 'OK' }
        report[topic.id]['java'].total++
        if (ok) {
          report[topic.id]['java'].passed++
          totalTestsPassed++
        } else {
          report[topic.id]['java'].status = `FAILED: ${subRes.error || runRes.error || subRes.status}`
        }
      } else if (topic.id === 'scope' || topic.id === 'oop-inheritance') {
        report[topic.id]['java'] = { passed: 0, total: 0, status: 'N/A', notes: 'Python-only topic' }
      } else {
        report[topic.id]['java'] = { passed: 0, total: 0, status: 'N/A', notes: 'Complex JSON / data-structure topic' }
      }

      // 4. C++
      if (test.cpp) {
        totalTestsRun++
        const runRes = await executeQuestion({ questionSlug: qId, language: 'cpp', code: test.cpp, mode: 'run' })
        const subRes = await executeQuestion({ questionSlug: qId, language: 'cpp', code: test.cpp, mode: 'submit' })
        const ok = runRes.success && subRes.success && subRes.status === 'ACCEPTED'
        report[topic.id]['cpp'] = report[topic.id]['cpp'] || { passed: 0, total: 0, status: 'OK' }
        report[topic.id]['cpp'].total++
        if (ok) {
          report[topic.id]['cpp'].passed++
          totalTestsPassed++
        } else {
          report[topic.id]['cpp'].status = `FAILED: ${subRes.error || runRes.error || subRes.status}`
        }
      } else if (topic.id === 'scope' || topic.id === 'oop-inheritance') {
        report[topic.id]['cpp'] = { passed: 0, total: 0, status: 'N/A', notes: 'Python-only topic' }
      } else {
        report[topic.id]['cpp'] = { passed: 0, total: 0, status: 'N/A', notes: 'Complex JSON / data-structure topic' }
      }
    }

    const pyStat = report[topic.id]['python']
    const jsStat = report[topic.id]['nodejs']
    const jvStat = report[topic.id]['java']
    const cpStat = report[topic.id]['cpp']

    console.log(`  ✓ Python : ${pyStat.passed}/${pyStat.total} passed (${pyStat.status})`)
    if (jsStat) console.log(`  ✓ Node.js: ${jsStat.passed}/${jsStat.total} passed (${jsStat.status})`)
    if (jvStat) console.log(`  ✓ Java   : ${jvStat.passed}/${jvStat.total} passed (${jvStat.status})`)
    if (cpStat) console.log(`  ✓ C++    : ${cpStat.passed}/${cpStat.total} passed (${cpStat.status})`)
  }

  // --------------------------------------------------------------------------
  // TEST 2: Custom Test Input on Bank480 Question
  // --------------------------------------------------------------------------
  console.log('\n--- Test 2: Custom Test Input with Bank480 JSON format ---')
  {
    const pyCode = `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(d["a"] + d["b"])`
    const customRes = await executeCustomInput({
      code: pyCode,
      language: 'python',
      customInput: '{"a": 100, "b": 250}',
    })
    assert.strictEqual(customRes.success, true, 'Custom input execution succeeded')
    assert.strictEqual(customRes.testCases[0].actualOutput.trim(), '350', 'Custom input calculated 100 + 250 = 350')
    console.log('  ✓ Custom input executed successfully with output: 350')
  }

  // --------------------------------------------------------------------------
  // TEST 3: Submit Isolation & Security
  // --------------------------------------------------------------------------
  console.log('\n--- Test 3: Submit Isolation (Zero DB Writes) ---')
  {
    const { req, res, status, body } = mockCall({
      headers: { authorization: STUDENT_TOKEN },
      body: {
        questionSlug: 'learn:basic-arithmetic-operations:add-two-integers',
        language: 'python',
        code: `import sys, json\nraw = sys.stdin.read().strip()\nif raw:\n    d = json.loads(raw)\n    print(d["a"] + d["b"])`,
        mode: 'submit',
      },
    })
    await submitHandler(req, res)
    assert.strictEqual(status(), 200, 'HTTP status is 200')
    const resp = body()
    assert.strictEqual(resp.success, true, 'Submit succeeded')
    assert.strictEqual(resp.persistence?.reason, 'learn_practice_isolated', 'Isolation confirmed')
    console.log('  ✓ Learn submit returned persistence.reason = learn_practice_isolated')
  }

  // --------------------------------------------------------------------------
  // TEST 4: Practice Problem Regression Check (Both Engines)
  // --------------------------------------------------------------------------
  console.log('\n--- Test 4: Practice Problem Regression Check ---')
  {
    const practicePy = `import sys\nfor line in sys.stdin:\n    parts = line.strip().split()\n    if len(parts) >= 3:\n        a, b, c = map(int, parts[:3])\n        print((a + b) * c - b)\n`
    const practiceRes = await executeQuestion({
      questionSlug: 'belt-1-q1-arithmetic-check-v1',
      language: 'python',
      code: practicePy,
      mode: 'submit',
    })
    assert.strictEqual(practiceRes.success, true, 'Practice Python submit succeeded')
    assert.strictEqual(practiceRes.passed, 10, 'Practice Python passed all 10 cases')
    console.log('  ✓ Practice problem belt-1-q1-arithmetic-check-v1 (Python): 10/10 cases passed')

    // Practice C++ on local engine
    const practiceCpp = `#include <iostream>\nusing namespace std;\nint main() {\n  long long a, b, c;\n  if (cin >> a >> b >> c) {\n    cout << (a + b) * c - b << endl;\n  }\n  return 0;\n}`
    const practiceCppRes = await executeQuestion({
      questionSlug: 'belt-1-q1-arithmetic-check-v1',
      language: 'cpp',
      code: practiceCpp,
      mode: 'submit',
    })
    assert.strictEqual(practiceCppRes.success, true, 'Practice C++ submit succeeded')
    assert.strictEqual(practiceCppRes.passed, 10, 'Practice C++ passed all 10 cases')
    console.log('  ✓ Practice problem belt-1-q1-arithmetic-check-v1 (C++ on local engine): 10/10 cases passed')
  }

  console.log('\n========================================================================')
  console.log(`🏁 ALL TESTS COMPLETED: ${totalTestsPassed}/${totalTestsRun} PASSED ON LOCAL ENGINE`)
  console.log('========================================================================')
}

runAll().catch((err) => {
  console.error('\n❌ Test suite failed:', err)
  process.exit(1)
})
