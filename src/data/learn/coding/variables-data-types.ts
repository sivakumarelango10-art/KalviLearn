import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:variables-data-types:integer-to-decimal-string",
    "bankId": "T01-Q01",
    "slug": "integer-to-decimal-string",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer to Decimal String",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Convert the integer value to its signed decimal string representation.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "7",
        "explanation": "Start from value=7. Convert the integer value to its signed decimal string representation. Therefore the expected JSON output is \"7\"."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Convert the integer value to its signed decimal string representation. Therefore the expected JSON output is \"0\"."
      },
      {
        "input": "{\"value\":12}",
        "output": "12",
        "explanation": "Start from value=12. Convert the integer value to its signed decimal string representation. Therefore the expected JSON output is \"12\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
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
    "id": "learn:variables-data-types:integer-to-binary-digits",
    "bankId": "T01-Q02",
    "slug": "integer-to-binary-digits",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer to Binary Digits",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Convert value to its unsigned binary digits, prefixed by a minus sign when negative; zero is \"0\".",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "111",
        "explanation": "Start from value=7. Convert value to its unsigned binary digits, prefixed by a minus sign when negative; zero is \"0\". Therefore the expected JSON output is \"111\"."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Convert value to its unsigned binary digits, prefixed by a minus sign when negative; zero is \"0\". Therefore the expected JSON output is \"0\"."
      },
      {
        "input": "{\"value\":12}",
        "output": "1100",
        "explanation": "Start from value=12. Convert value to its unsigned binary digits, prefixed by a minus sign when negative; zero is \"0\". Therefore the expected JSON output is \"1100\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "111"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "1100"
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
    "id": "learn:variables-data-types:integer-to-hexadecimal",
    "bankId": "T01-Q03",
    "slug": "integer-to-hexadecimal",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer to Hexadecimal",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Convert value to lowercase hexadecimal without a 0x prefix; preserve a leading minus for negative inputs.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "7",
        "explanation": "Start from value=7. Convert value to lowercase hexadecimal without a 0x prefix; preserve a leading minus for negative inputs. Therefore the expected JSON output is \"7\"."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Convert value to lowercase hexadecimal without a 0x prefix; preserve a leading minus for negative inputs. Therefore the expected JSON output is \"0\"."
      },
      {
        "input": "{\"value\":12}",
        "output": "c",
        "explanation": "Start from value=12. Convert value to lowercase hexadecimal without a 0x prefix; preserve a leading minus for negative inputs. Therefore the expected JSON output is \"c\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "c"
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
    "id": "learn:variables-data-types:integer-to-octal",
    "bankId": "T01-Q04",
    "slug": "integer-to-octal",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer to Octal",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Convert value to octal digits without a prefix, preserving a leading minus if needed.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "7",
        "explanation": "Start from value=7. Convert value to octal digits without a prefix, preserving a leading minus if needed. Therefore the expected JSON output is \"7\"."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Convert value to octal digits without a prefix, preserving a leading minus if needed. Therefore the expected JSON output is \"0\"."
      },
      {
        "input": "{\"value\":12}",
        "output": "14",
        "explanation": "Start from value=12. Convert value to octal digits without a prefix, preserving a leading minus if needed. Therefore the expected JSON output is \"14\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "14"
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
    "id": "learn:variables-data-types:absolute-value-assignment",
    "bankId": "T01-Q05",
    "slug": "absolute-value-assignment",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Absolute Value Assignment",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Store value as a nonnegative integer by taking its absolute value.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "7",
        "explanation": "Start from value=7. Store value as a nonnegative integer by taking its absolute value. Therefore the expected JSON output is 7."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Store value as a nonnegative integer by taking its absolute value. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "12",
        "explanation": "Start from value=12. Store value as a nonnegative integer by taking its absolute value. Therefore the expected JSON output is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
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
    "id": "learn:variables-data-types:boolean-from-integer",
    "bankId": "T01-Q06",
    "slug": "boolean-from-integer",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Boolean From Integer",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Convert value to a Boolean: zero is false, every nonzero integer is true.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "true",
        "explanation": "Start from value=7. Convert value to a Boolean: zero is false, every nonzero integer is true. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"value\":0}",
        "output": "false",
        "explanation": "Start from value=0. Convert value to a Boolean: zero is false, every nonzero integer is true. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"value\":12}",
        "output": "true",
        "explanation": "Start from value=12. Convert value to a Boolean: zero is false, every nonzero integer is true. Therefore the expected JSON output is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "true"
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
    "id": "learn:variables-data-types:sign-as-integer",
    "bankId": "T01-Q07",
    "slug": "sign-as-integer",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Sign as Integer",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Encode a negative input as -1, zero as 0, and a positive input as 1.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "1",
        "explanation": "Start from value=7. Encode a negative input as -1, zero as 0, and a positive input as 1. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Encode a negative input as -1, zero as 0, and a positive input as 1. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":-1}",
        "output": "-1",
        "explanation": "Start from value=-1. Encode a negative input as -1, zero as 0, and a positive input as 1. Therefore the expected JSON output is -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":-1}",
        "expectedOutput": "-1"
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
    "id": "learn:variables-data-types:square-as-numeric-value",
    "bankId": "T01-Q08",
    "slug": "square-as-numeric-value",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Square as Numeric Value",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Convert value to its exact squared integer.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "49",
        "explanation": "Start from value=7. Convert value to its exact squared integer. Therefore the expected JSON output is 49."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Convert value to its exact squared integer. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "144",
        "explanation": "Start from value=12. Convert value to its exact squared integer. Therefore the expected JSON output is 144."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "49"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "144"
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
    "id": "learn:variables-data-types:truncated-half",
    "bankId": "T01-Q09",
    "slug": "truncated-half",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Truncated Half",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Divide value by two and truncate toward zero (not floor toward negative infinity).",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "3",
        "explanation": "Start from value=7. Divide value by two and truncate toward zero (not floor toward negative infinity). Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Divide value by two and truncate toward zero (not floor toward negative infinity). Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "6",
        "explanation": "Start from value=12. Divide value by two and truncate toward zero (not floor toward negative infinity). Therefore the expected JSON output is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "6"
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
    "id": "learn:variables-data-types:floor-half",
    "bankId": "T01-Q10",
    "slug": "floor-half",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Floor Half",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Divide value by two and round downward to the nearest integer.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "3",
        "explanation": "Start from value=7. Divide value by two and round downward to the nearest integer. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Divide value by two and round downward to the nearest integer. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "6",
        "explanation": "Start from value=12. Divide value by two and round downward to the nearest integer. Therefore the expected JSON output is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "6"
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
    "id": "learn:variables-data-types:decimal-digit-count",
    "bankId": "T01-Q11",
    "slug": "decimal-digit-count",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Decimal Digit Count",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Count decimal digits in the absolute integer; zero has one digit.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "1",
        "explanation": "Start from value=7. Count decimal digits in the absolute integer; zero has one digit. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"value\":12}",
        "output": "2",
        "explanation": "Start from value=12. Count decimal digits in the absolute integer; zero has one digit. Therefore the expected JSON output is 2."
      },
      {
        "input": "{\"value\":100}",
        "output": "3",
        "explanation": "Start from value=100. Count decimal digits in the absolute integer; zero has one digit. Therefore the expected JSON output is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":12}",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":100}",
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
    "id": "learn:variables-data-types:unit-digit-extraction",
    "bankId": "T01-Q12",
    "slug": "unit-digit-extraction",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Unit Digit Extraction",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Extract the nonnegative units digit of the absolute integer.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "7",
        "explanation": "Start from value=7. Extract the nonnegative units digit of the absolute integer. Therefore the expected JSON output is 7."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Extract the nonnegative units digit of the absolute integer. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "2",
        "explanation": "Start from value=12. Extract the nonnegative units digit of the absolute integer. Therefore the expected JSON output is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
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
    "id": "learn:variables-data-types:tens-digit-extraction",
    "bankId": "T01-Q13",
    "slug": "tens-digit-extraction",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Tens Digit Extraction",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Extract the tens digit of the absolute integer, using zero when absent.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "0",
        "explanation": "Start from value=7. Extract the tens digit of the absolute integer, using zero when absent. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "1",
        "explanation": "Start from value=12. Extract the tens digit of the absolute integer, using zero when absent. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"value\":45}",
        "output": "4",
        "explanation": "Start from value=45. Extract the tens digit of the absolute integer, using zero when absent. Therefore the expected JSON output is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":12}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":45}",
        "expectedOutput": "4"
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
    "id": "learn:variables-data-types:minutes-to-seconds",
    "bankId": "T01-Q14",
    "slug": "minutes-to-seconds",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Minutes to Seconds",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Treat the absolute value as a number of minutes and convert it into seconds.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "420",
        "explanation": "Start from value=7. Treat the absolute value as a number of minutes and convert it into seconds. Therefore the expected JSON output is 420."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Treat the absolute value as a number of minutes and convert it into seconds. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "720",
        "explanation": "Start from value=12. Treat the absolute value as a number of minutes and convert it into seconds. Therefore the expected JSON output is 720."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "420"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "720"
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
    "id": "learn:variables-data-types:celsius-to-fahrenheit-number",
    "bankId": "T01-Q15",
    "slug": "celsius-to-fahrenheit-number",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Celsius to Fahrenheit Number",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Treat value as an integral Celsius reading and convert to Fahrenheit using F = 9*C/5 + 32; return a JSON number.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "44.6",
        "explanation": "Start from value=7. Treat value as an integral Celsius reading and convert to Fahrenheit using F = 9*C/5 + 32; return a JSON number. Therefore the expected JSON output is 44.6."
      },
      {
        "input": "{\"value\":0}",
        "output": "32",
        "explanation": "Start from value=0. Treat value as an integral Celsius reading and convert to Fahrenheit using F = 9*C/5 + 32; return a JSON number. Therefore the expected JSON output is 32.0."
      },
      {
        "input": "{\"value\":12}",
        "output": "53.6",
        "explanation": "Start from value=12. Treat value as an integral Celsius reading and convert to Fahrenheit using F = 9*C/5 + 32; return a JSON number. Therefore the expected JSON output is 53.6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "44.6"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "32"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "53.6"
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
    "id": "learn:variables-data-types:parity-as-text",
    "bankId": "T01-Q16",
    "slug": "parity-as-text",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Parity as Text",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Convert the integer to the string \"even\" or \"odd\" according to parity.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "odd",
        "explanation": "Start from value=7. Convert the integer to the string \"even\" or \"odd\" according to parity. Therefore the expected JSON output is \"odd\"."
      },
      {
        "input": "{\"value\":0}",
        "output": "even",
        "explanation": "Start from value=0. Convert the integer to the string \"even\" or \"odd\" according to parity. Therefore the expected JSON output is \"even\"."
      },
      {
        "input": "{\"value\":12}",
        "output": "even",
        "explanation": "Start from value=12. Convert the integer to the string \"even\" or \"odd\" according to parity. Therefore the expected JSON output is \"even\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "odd"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "even"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "even"
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
    "id": "learn:variables-data-types:lowest-eight-bits",
    "bankId": "T01-Q17",
    "slug": "lowest-eight-bits",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Lowest Eight Bits",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Represent value as an eight-bit binary string using value modulo 256 (two’s-complement low byte).",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "00000111",
        "explanation": "Start from value=7. Represent value as an eight-bit binary string using value modulo 256 (two’s-complement low byte). Therefore the expected JSON output is \"00000111\"."
      },
      {
        "input": "{\"value\":0}",
        "output": "00000000",
        "explanation": "Start from value=0. Represent value as an eight-bit binary string using value modulo 256 (two’s-complement low byte). Therefore the expected JSON output is \"00000000\"."
      },
      {
        "input": "{\"value\":12}",
        "output": "00001100",
        "explanation": "Start from value=12. Represent value as an eight-bit binary string using value modulo 256 (two’s-complement low byte). Therefore the expected JSON output is \"00001100\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "00000111"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "00000000"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "00001100"
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
    "id": "learn:variables-data-types:number-of-set-bits",
    "bankId": "T01-Q18",
    "slug": "number-of-set-bits",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Number of Set Bits",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Count the 1 bits in the standard binary representation of abs(value).",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "3",
        "explanation": "Start from value=7. Count the 1 bits in the standard binary representation of abs(value). Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Count the 1 bits in the standard binary representation of abs(value). Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "2",
        "explanation": "Start from value=12. Count the 1 bits in the standard binary representation of abs(value). Therefore the expected JSON output is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
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
    "id": "learn:variables-data-types:reverse-decimal-digits",
    "bankId": "T01-Q19",
    "slug": "reverse-decimal-digits",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Reverse Decimal Digits",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Reverse the digits of abs(value), returning a signed integer with the original sign; any leading zeroes disappear.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "7",
        "explanation": "Start from value=7. Reverse the digits of abs(value), returning a signed integer with the original sign; any leading zeroes disappear. Therefore the expected JSON output is 7."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Reverse the digits of abs(value), returning a signed integer with the original sign; any leading zeroes disappear. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "21",
        "explanation": "Start from value=12. Reverse the digits of abs(value), returning a signed integer with the original sign; any leading zeroes disappear. Therefore the expected JSON output is 21."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "21"
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
    "id": "learn:variables-data-types:integer-to-string-type-tag",
    "bankId": "T01-Q20",
    "slug": "integer-to-string-type-tag",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer to String Type Tag",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Return an object with fields \"text\" (decimal string of value), \"length\" (its string length including minus), and \"type\" (the literal \"string\").",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "{\"text\":\"7\",\"length\":1,\"type\":\"string\"}",
        "explanation": "Start from value=7. Return an object with fields \"text\" (decimal string of value), \"length\" (its string length including minus), and \"type\" (the literal \"string\"). Therefore the expected JSON output is {\"text\":\"7\",\"length\":1,\"type\":\"string\"}."
      },
      {
        "input": "{\"value\":0}",
        "output": "{\"text\":\"0\",\"length\":1,\"type\":\"string\"}",
        "explanation": "Start from value=0. Return an object with fields \"text\" (decimal string of value), \"length\" (its string length including minus), and \"type\" (the literal \"string\"). Therefore the expected JSON output is {\"text\":\"0\",\"length\":1,\"type\":\"string\"}."
      },
      {
        "input": "{\"value\":12}",
        "output": "{\"text\":\"12\",\"length\":2,\"type\":\"string\"}",
        "explanation": "Start from value=12. Return an object with fields \"text\" (decimal string of value), \"length\" (its string length including minus), and \"type\" (the literal \"string\"). Therefore the expected JSON output is {\"text\":\"12\",\"length\":2,\"type\":\"string\"}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "{\"text\":\"7\",\"length\":1,\"type\":\"string\"}"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "{\"text\":\"0\",\"length\":1,\"type\":\"string\"}"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "{\"text\":\"12\",\"length\":2,\"type\":\"string\"}"
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
