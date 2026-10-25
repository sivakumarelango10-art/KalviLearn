import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:basic-arithmetic-operations:add-two-integers",
    "bankId": "T02-Q01",
    "slug": "add-two-integers",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Add Two Integers",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Return a + b.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "10",
        "explanation": "Substitute a=7 and b=3. Return a + b. Therefore the expected JSON output is 10."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Return a + b. Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "16",
        "explanation": "Substitute a=12 and b=4. Return a + b. Therefore the expected JSON output is 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "16"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:subtract-b-from-a",
    "bankId": "T02-Q02",
    "slug": "subtract-b-from-a",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Subtract B from A",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Return a - b.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "4",
        "explanation": "Substitute a=7 and b=3. Return a - b. Therefore the expected JSON output is 4."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "-5",
        "explanation": "Substitute a=0 and b=5. Return a - b. Therefore the expected JSON output is -5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "8",
        "explanation": "Substitute a=12 and b=4. Return a - b. Therefore the expected JSON output is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:product-of-two-values",
    "bankId": "T02-Q03",
    "slug": "product-of-two-values",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Product of Two Values",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Return a × b.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "21",
        "explanation": "Substitute a=7 and b=3. Return a × b. Therefore the expected JSON output is 21."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "0",
        "explanation": "Substitute a=0 and b=5. Return a × b. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "48",
        "explanation": "Substitute a=12 and b=4. Return a × b. Therefore the expected JSON output is 48."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "48"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:square-sum-formula",
    "bankId": "T02-Q04",
    "slug": "square-sum-formula",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Square Sum Formula",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Return (a + b)² using integer arithmetic.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "100",
        "explanation": "Substitute a=7 and b=3. Return (a + b)² using integer arithmetic. Therefore the expected JSON output is 100."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "25",
        "explanation": "Substitute a=0 and b=5. Return (a + b)² using integer arithmetic. Therefore the expected JSON output is 25."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "256",
        "explanation": "Substitute a=12 and b=4. Return (a + b)² using integer arithmetic. Therefore the expected JSON output is 256."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "100"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "25"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "256"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:difference-of-squares",
    "bankId": "T02-Q05",
    "slug": "difference-of-squares",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Difference of Squares",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Return a² - b².",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "40",
        "explanation": "Substitute a=7 and b=3. Return a² - b². Therefore the expected JSON output is 40."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "-25",
        "explanation": "Substitute a=0 and b=5. Return a² - b². Therefore the expected JSON output is -25."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "128",
        "explanation": "Substitute a=12 and b=4. Return a² - b². Therefore the expected JSON output is 128."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "40"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "-25"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "128"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:sum-of-individual-squares",
    "bankId": "T02-Q06",
    "slug": "sum-of-individual-squares",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Sum of Individual Squares",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Return a² + b².",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "58",
        "explanation": "Substitute a=7 and b=3. Return a² + b². Therefore the expected JSON output is 58."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "25",
        "explanation": "Substitute a=0 and b=5. Return a² + b². Therefore the expected JSON output is 25."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "160",
        "explanation": "Substitute a=12 and b=4. Return a² + b². Therefore the expected JSON output is 160."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "58"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "25"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "160"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:absolute-difference",
    "bankId": "T02-Q07",
    "slug": "absolute-difference",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Absolute Difference",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Return the nonnegative difference |a-b|.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "4",
        "explanation": "Substitute a=7 and b=3. Return the nonnegative difference |a-b|. Therefore the expected JSON output is 4."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Return the nonnegative difference |a-b|. Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "8",
        "explanation": "Substitute a=12 and b=4. Return the nonnegative difference |a-b|. Therefore the expected JSON output is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:floor-division-with-zero-rule",
    "bankId": "T02-Q08",
    "slug": "floor-division-with-zero-rule",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Floor Division With Zero Rule",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Return floor(a/b), or null if b is zero.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "2",
        "explanation": "Substitute a=7 and b=3. Return floor(a/b), or null if b is zero. Therefore the expected JSON output is 2."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "0",
        "explanation": "Substitute a=0 and b=5. Return floor(a/b), or null if b is zero. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "3",
        "explanation": "Substitute a=12 and b=4. Return floor(a/b), or null if b is zero. Therefore the expected JSON output is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:remainder-with-zero-rule",
    "bankId": "T02-Q09",
    "slug": "remainder-with-zero-rule",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Remainder With Zero Rule",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Return a modulo |b| as a nonnegative remainder, or null when b is zero.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "1",
        "explanation": "Substitute a=7 and b=3. Return a modulo |b| as a nonnegative remainder, or null when b is zero. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "0",
        "explanation": "Substitute a=0 and b=5. Return a modulo |b| as a nonnegative remainder, or null when b is zero. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":-7,\"b\":-3}",
        "output": "2",
        "explanation": "Substitute a=-7 and b=-3. Return a modulo |b| as a nonnegative remainder, or null when b is zero. Therefore the expected JSON output is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":-7,\"b\":-3}",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:division-quotient-and-remainder",
    "bankId": "T02-Q10",
    "slug": "division-quotient-and-remainder",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Division Quotient and Remainder",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "For b != 0, use positive divisor |b| and return {\"quotient\": floor(a/|b|), \"remainder\": a modulo |b|}; return null if b = 0.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "{\"quotient\":2,\"remainder\":1}",
        "explanation": "Substitute a=7 and b=3. For b != 0, use positive divisor |b| and return {\"quotient\": floor(a/|b|), \"remainder\": a modulo |b|}; return null if b = 0. Therefore the expected JSON output is {\"quotient\":2,\"remainder\":1}."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "{\"quotient\":0,\"remainder\":0}",
        "explanation": "Substitute a=0 and b=5. For b != 0, use positive divisor |b| and return {\"quotient\": floor(a/|b|), \"remainder\": a modulo |b|}; return null if b = 0. Therefore the expected JSON output is {\"quotient\":0,\"remainder\":0}."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "{\"quotient\":3,\"remainder\":0}",
        "explanation": "Substitute a=12 and b=4. For b != 0, use positive divisor |b| and return {\"quotient\": floor(a/|b|), \"remainder\": a modulo |b|}; return null if b = 0. Therefore the expected JSON output is {\"quotient\":3,\"remainder\":0}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "{\"quotient\":2,\"remainder\":1}"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "{\"quotient\":0,\"remainder\":0}"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "{\"quotient\":3,\"remainder\":0}"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:euclidean-gcd",
    "bankId": "T02-Q11",
    "slug": "euclidean-gcd",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Euclidean GCD",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Return the greatest common divisor of |a| and |b|, with gcd(0,0)=0.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "1",
        "explanation": "Substitute a=7 and b=3. Return the greatest common divisor of |a| and |b|, with gcd(0,0)=0. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Return the greatest common divisor of |a| and |b|, with gcd(0,0)=0. Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "4",
        "explanation": "Substitute a=12 and b=4. Return the greatest common divisor of |a| and |b|, with gcd(0,0)=0. Therefore the expected JSON output is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:least-common-multiple",
    "bankId": "T02-Q12",
    "slug": "least-common-multiple",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Least Common Multiple",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Return lcm(|a|,|b|), or zero if either number is zero.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "21",
        "explanation": "Substitute a=7 and b=3. Return lcm(|a|,|b|), or zero if either number is zero. Therefore the expected JSON output is 21."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "0",
        "explanation": "Substitute a=0 and b=5. Return lcm(|a|,|b|), or zero if either number is zero. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "12",
        "explanation": "Substitute a=12 and b=4. Return lcm(|a|,|b|), or zero if either number is zero. Therefore the expected JSON output is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "12"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:weighted-sum",
    "bankId": "T02-Q13",
    "slug": "weighted-sum",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Weighted Sum",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Return 2a + 3b.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "23",
        "explanation": "Substitute a=7 and b=3. Return 2a + 3b. Therefore the expected JSON output is 23."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "15",
        "explanation": "Substitute a=0 and b=5. Return 2a + 3b. Therefore the expected JSON output is 15."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "36",
        "explanation": "Substitute a=12 and b=4. Return 2a + 3b. Therefore the expected JSON output is 36."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "23"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "36"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:average-as-reduced-fraction",
    "bankId": "T02-Q14",
    "slug": "average-as-reduced-fraction",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Average as Reduced Fraction",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Represent the average (a+b)/2 as a reduced object {\"numerator\":p,\"denominator\":q}, with q positive.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "{\"numerator\":5,\"denominator\":1}",
        "explanation": "Substitute a=7 and b=3. Represent the average (a+b)/2 as a reduced object {\"numerator\":p,\"denominator\":q}, with q positive. Therefore the expected JSON output is {\"numerator\":5,\"denominator\":1}."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "{\"numerator\":5,\"denominator\":2}",
        "explanation": "Substitute a=0 and b=5. Represent the average (a+b)/2 as a reduced object {\"numerator\":p,\"denominator\":q}, with q positive. Therefore the expected JSON output is {\"numerator\":5,\"denominator\":2}."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "{\"numerator\":8,\"denominator\":1}",
        "explanation": "Substitute a=12 and b=4. Represent the average (a+b)/2 as a reduced object {\"numerator\":p,\"denominator\":q}, with q positive. Therefore the expected JSON output is {\"numerator\":8,\"denominator\":1}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "{\"numerator\":5,\"denominator\":1}"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "{\"numerator\":5,\"denominator\":2}"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "{\"numerator\":8,\"denominator\":1}"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:closest-multiple-of-five",
    "bankId": "T02-Q15",
    "slug": "closest-multiple-of-five",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Closest Multiple of Five",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Return the multiple of five closest to a+b; ties round toward the smaller multiple.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "10",
        "explanation": "Substitute a=7 and b=3. Return the multiple of five closest to a+b; ties round toward the smaller multiple. Therefore the expected JSON output is 10."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Return the multiple of five closest to a+b; ties round toward the smaller multiple. Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "15",
        "explanation": "Substitute a=12 and b=4. Return the multiple of five closest to a+b; ties round toward the smaller multiple. Therefore the expected JSON output is 15."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "15"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:three-consecutive-multiples",
    "bankId": "T02-Q16",
    "slug": "three-consecutive-multiples",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Three Consecutive Multiples",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Return [a*b, a*(b+1), a*(b+2)].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[21,28,35]",
        "explanation": "Substitute a=7 and b=3. Return [a*b, a*(b+1), a*(b+2)]. Therefore the expected JSON output is [21,28,35]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[0,0,0]",
        "explanation": "Substitute a=0 and b=5. Return [a*b, a*(b+1), a*(b+2)]. Therefore the expected JSON output is [0,0,0]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[48,60,72]",
        "explanation": "Substitute a=12 and b=4. Return [a*b, a*(b+1), a*(b+2)]. Therefore the expected JSON output is [48,60,72]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[21,28,35]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[0,0,0]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[48,60,72]"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:rectangle-perimeter",
    "bankId": "T02-Q17",
    "slug": "rectangle-perimeter",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Rectangle Perimeter",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Treat |a| and |b| as rectangle side lengths; return its perimeter.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "20",
        "explanation": "Substitute a=7 and b=3. Treat |a| and |b| as rectangle side lengths; return its perimeter. Therefore the expected JSON output is 20."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "10",
        "explanation": "Substitute a=0 and b=5. Treat |a| and |b| as rectangle side lengths; return its perimeter. Therefore the expected JSON output is 10."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "32",
        "explanation": "Substitute a=12 and b=4. Treat |a| and |b| as rectangle side lengths; return its perimeter. Therefore the expected JSON output is 32."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "20"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "32"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:rectangle-area",
    "bankId": "T02-Q18",
    "slug": "rectangle-area",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Rectangle Area",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Treat |a| and |b| as rectangle side lengths; return the area.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "21",
        "explanation": "Substitute a=7 and b=3. Treat |a| and |b| as rectangle side lengths; return the area. Therefore the expected JSON output is 21."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "0",
        "explanation": "Substitute a=0 and b=5. Treat |a| and |b| as rectangle side lengths; return the area. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "48",
        "explanation": "Substitute a=12 and b=4. Treat |a| and |b| as rectangle side lengths; return the area. Therefore the expected JSON output is 48."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "48"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:power-with-bounded-exponent",
    "bankId": "T02-Q19",
    "slug": "power-with-bounded-exponent",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Power With Bounded Exponent",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Return a raised to the nonnegative exponent abs(b) modulo 7.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "0",
        "explanation": "Substitute a=7 and b=3. Return a raised to the nonnegative exponent abs(b) modulo 7. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "2",
        "explanation": "Substitute a=12 and b=4. Return a raised to the nonnegative exponent abs(b) modulo 7. Therefore the expected JSON output is 2."
      },
      {
        "input": "{\"a\":1,\"b\":1}",
        "output": "1",
        "explanation": "Substitute a=1 and b=1. Return a raised to the nonnegative exponent abs(b) modulo 7. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":1,\"b\":1}",
        "expectedOutput": "1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:basic-arithmetic-operations:digit-sum-of-product",
    "bankId": "T02-Q20",
    "slug": "digit-sum-of-product",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Digit Sum of Product",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Multiply a and b, then add all decimal digits of its absolute value.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "3",
        "explanation": "Substitute a=7 and b=3. Multiply a and b, then add all decimal digits of its absolute value. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "0",
        "explanation": "Substitute a=0 and b=5. Multiply a and b, then add all decimal digits of its absolute value. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "12",
        "explanation": "Substitute a=12 and b=4. Multiply a and b, then add all decimal digits of its absolute value. Therefore the expected JSON output is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "12"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  }
]

export default questions
