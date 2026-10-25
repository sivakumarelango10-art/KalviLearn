import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:two-pointers:two-sum-exists",
    "bankId": "T15-Q01",
    "slug": "two-sum-exists",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Two Sum Exists",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Return true if two distinct indices i<j have nums[i]+nums[j]=target.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "true",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Return true if two distinct indices i<j have nums[i]+nums[j]=target. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "false",
        "explanation": "Inspect 0 values [] and target=0. Return true if two distinct indices i<j have nums[i]+nums[j]=target. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "false",
        "explanation": "Inspect 1 values [7] and target=7. Return true if two distinct indices i<j have nums[i]+nums[j]=target. Therefore the expected JSON output is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
        "expectedOutput": "false"
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
    "id": "learn:two-pointers:unique-two-sum-value-pairs",
    "bankId": "T15-Q02",
    "slug": "unique-two-sum-value-pairs",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Unique Two Sum Value Pairs",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Return all distinct [small,large] value pairs adding to target, sorted lexicographically.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "[[1,3]]",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Return all distinct [small,large] value pairs adding to target, sorted lexicographically. Therefore the expected JSON output is [[1,3]]."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "[]",
        "explanation": "Inspect 0 values [] and target=0. Return all distinct [small,large] value pairs adding to target, sorted lexicographically. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "[[0,0]]",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Return all distinct [small,large] value pairs adding to target, sorted lexicographically. Therefore the expected JSON output is [[0,0]]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "[[1,3]]"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "expectedOutput": "[[0,0]]"
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
    "id": "learn:two-pointers:count-two-sum-index-pairs",
    "bankId": "T15-Q03",
    "slug": "count-two-sum-index-pairs",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Count Two Sum Index Pairs",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Count all distinct index pairs i<j whose values sum to target; duplicate values at different positions count separately.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "2",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Count all distinct index pairs i<j whose values sum to target; duplicate values at different positions count separately. Therefore the expected JSON output is 2."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "0",
        "explanation": "Inspect 0 values [] and target=0. Count all distinct index pairs i<j whose values sum to target; duplicate values at different positions count separately. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "3",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Count all distinct index pairs i<j whose values sum to target; duplicate values at different positions count separately. Therefore the expected JSON output is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[0,0,0],\"target\":0}",
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
    "id": "learn:two-pointers:smallest-index-two-sum",
    "bankId": "T15-Q04",
    "slug": "smallest-index-two-sum",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Smallest Index Two Sum",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Return lexicographically smallest [i,j] with i<j and nums[i]+nums[j]=target, or [-1,-1].",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "[0,2]",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Return lexicographically smallest [i,j] with i<j and nums[i]+nums[j]=target, or [-1,-1]. Therefore the expected JSON output is [0,2]."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "[-1,-1]",
        "explanation": "Inspect 0 values [] and target=0. Return lexicographically smallest [i,j] with i<j and nums[i]+nums[j]=target, or [-1,-1]. Therefore the expected JSON output is [-1,-1]."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "[0,1]",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Return lexicographically smallest [i,j] with i<j and nums[i]+nums[j]=target, or [-1,-1]. Therefore the expected JSON output is [0,1]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "[0,2]"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "[-1,-1]"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "expectedOutput": "[0,1]"
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
    "id": "learn:two-pointers:count-pair-sums-below-target",
    "bankId": "T15-Q05",
    "slug": "count-pair-sums-below-target",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Count Pair Sums Below Target",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Count index pairs i<j where nums[i]+nums[j]<target.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "1",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Count index pairs i<j where nums[i]+nums[j]<target. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "0",
        "explanation": "Inspect 0 values [] and target=0. Count index pairs i<j where nums[i]+nums[j]<target. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"nums\":[-4,-3,-1,2],\"target\":-1}",
        "output": "4",
        "explanation": "Inspect 4 values [-4,-3,-1,2] and target=-1. Count index pairs i<j where nums[i]+nums[j]<target. Therefore the expected JSON output is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[-4,-3,-1,2],\"target\":-1}",
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
    "id": "learn:two-pointers:count-pair-sums-at-most-target",
    "bankId": "T15-Q06",
    "slug": "count-pair-sums-at-most-target",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Count Pair Sums At Most Target",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Count index pairs i<j whose sum is ≤target.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "3",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Count index pairs i<j whose sum is ≤target. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "0",
        "explanation": "Inspect 0 values [] and target=0. Count index pairs i<j whose sum is ≤target. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"nums\":[-4,-3,-1,2],\"target\":-1}",
        "output": "5",
        "explanation": "Inspect 4 values [-4,-3,-1,2] and target=-1. Count index pairs i<j whose sum is ≤target. Therefore the expected JSON output is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[-4,-3,-1,2],\"target\":-1}",
        "expectedOutput": "5"
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
    "id": "learn:two-pointers:count-pair-sums-above-target",
    "bankId": "T15-Q07",
    "slug": "count-pair-sums-above-target",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Count Pair Sums Above Target",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Count index pairs i<j whose sum is >target.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "7",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Count index pairs i<j whose sum is >target. Therefore the expected JSON output is 7."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "0",
        "explanation": "Inspect 0 values [] and target=0. Count index pairs i<j whose sum is >target. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"nums\":[-4,-3,-1,2],\"target\":-1}",
        "output": "1",
        "explanation": "Inspect 4 values [-4,-3,-1,2] and target=-1. Count index pairs i<j whose sum is >target. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[-4,-3,-1,2],\"target\":-1}",
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
    "id": "learn:two-pointers:closest-two-sum-value-pair",
    "bankId": "T15-Q08",
    "slug": "closest-two-sum-value-pair",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Closest Two Sum Value Pair",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Return [small,large] with sum nearest target; ties choose lexicographically smaller value pair, or null when <2 entries.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "[1,3]",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Return [small,large] with sum nearest target; ties choose lexicographically smaller value pair, or null when <2 entries. Therefore the expected JSON output is [1,3]."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "null",
        "explanation": "Inspect 0 values [] and target=0. Return [small,large] with sum nearest target; ties choose lexicographically smaller value pair, or null when <2 entries. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "[0,0]",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Return [small,large] with sum nearest target; ties choose lexicographically smaller value pair, or null when <2 entries. Therefore the expected JSON output is [0,0]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "[1,3]"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "expectedOutput": "[0,0]"
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
    "id": "learn:two-pointers:three-sum-unique-triples",
    "bankId": "T15-Q09",
    "slug": "three-sum-unique-triples",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Three Sum Unique Triples",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Return distinct sorted triples of values adding to target, lexicographically sorted.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "[]",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Return distinct sorted triples of values adding to target, lexicographically sorted. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "[[0,0,0]]",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Return distinct sorted triples of values adding to target, lexicographically sorted. Therefore the expected JSON output is [[0,0,0]]."
      },
      {
        "input": "{\"nums\":[1,2,3,4,5,6,7,8,9,10],\"target\":7}",
        "output": "[[1,2,4]]",
        "explanation": "Inspect 10 values [1,2,3,4,5,6,7,8,9,10] and target=7. Return distinct sorted triples of values adding to target, lexicographically sorted. Therefore the expected JSON output is [[1,2,4]]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "expectedOutput": "[[0,0,0]]"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[1,2,3,4,5,6,7,8,9,10],\"target\":7}",
        "expectedOutput": "[[1,2,4]]"
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
    "id": "learn:two-pointers:two-pointer-reverse",
    "bankId": "T15-Q10",
    "slug": "two-pointer-reverse",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Two Pointer Reverse",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Reverse the array by swapping values at its two ends until pointers cross.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "[5,4,3,1,1]",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Reverse the array by swapping values at its two ends until pointers cross. Therefore the expected JSON output is [5,4,3,1,1]."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "[]",
        "explanation": "Inspect 0 values [] and target=0. Reverse the array by swapping values at its two ends until pointers cross. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "[7]",
        "explanation": "Inspect 1 values [7] and target=7. Reverse the array by swapping values at its two ends until pointers cross. Therefore the expected JSON output is [7]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "[5,4,3,1,1]"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
        "expectedOutput": "[7]"
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
    "id": "learn:two-pointers:remove-duplicates-in-place-model",
    "bankId": "T15-Q11",
    "slug": "remove-duplicates-in-place-model",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Remove Duplicates in Place Model",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Return one copy of each value from the sorted input, preserving ascending order.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "[1,3,4,5]",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Return one copy of each value from the sorted input, preserving ascending order. Therefore the expected JSON output is [1,3,4,5]."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "[]",
        "explanation": "Inspect 0 values [] and target=0. Return one copy of each value from the sorted input, preserving ascending order. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "[7]",
        "explanation": "Inspect 1 values [7] and target=7. Return one copy of each value from the sorted input, preserving ascending order. Therefore the expected JSON output is [7]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "[1,3,4,5]"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
        "expectedOutput": "[7]"
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
    "id": "learn:two-pointers:sorted-array-squared-values",
    "bankId": "T15-Q12",
    "slug": "sorted-array-squared-values",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Sorted Array Squared Values",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Square all values and return the resulting squares in nondecreasing order.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "[1,1,9,16,25]",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Square all values and return the resulting squares in nondecreasing order. Therefore the expected JSON output is [1,1,9,16,25]."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "[]",
        "explanation": "Inspect 0 values [] and target=0. Square all values and return the resulting squares in nondecreasing order. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "[49]",
        "explanation": "Inspect 1 values [7] and target=7. Square all values and return the resulting squares in nondecreasing order. Therefore the expected JSON output is [49]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "[1,1,9,16,25]"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
        "expectedOutput": "[49]"
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
    "id": "learn:two-pointers:count-opposite-value-index-pairs",
    "bankId": "T15-Q13",
    "slug": "count-opposite-value-index-pairs",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Count Opposite Value Index Pairs",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Count i<j such that nums[i]+nums[j]=0.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "0",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Count i<j such that nums[i]+nums[j]=0. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "3",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Count i<j such that nums[i]+nums[j]=0. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"nums\":[-5,-5,0,5,5],\"target\":5}",
        "output": "4",
        "explanation": "Inspect 5 values [-5,-5,0,5,5] and target=5. Count i<j such that nums[i]+nums[j]=0. Therefore the expected JSON output is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[-5,-5,0,5,5],\"target\":5}",
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
    "id": "learn:two-pointers:two-pointer-palindrome-check",
    "bankId": "T15-Q14",
    "slug": "two-pointer-palindrome-check",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Two Pointer Palindrome Check",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Return true if the sorted array equals its reverse.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "false",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Return true if the sorted array equals its reverse. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "true",
        "explanation": "Inspect 0 values [] and target=0. Return true if the sorted array equals its reverse. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "true",
        "explanation": "Inspect 1 values [7] and target=7. Return true if the sorted array equals its reverse. Therefore the expected JSON output is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
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
    "id": "learn:two-pointers:count-pairs-with-difference-target",
    "bankId": "T15-Q15",
    "slug": "count-pairs-with-difference-target",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Count Pairs With Difference Target",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Count index pairs i<j with nums[j]-nums[i]=abs(target).",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "2",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Count index pairs i<j with nums[j]-nums[i]=abs(target). Therefore the expected JSON output is 2."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "0",
        "explanation": "Inspect 0 values [] and target=0. Count index pairs i<j with nums[j]-nums[i]=abs(target). Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "3",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Count index pairs i<j with nums[j]-nums[i]=abs(target). Therefore the expected JSON output is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[0,0,0],\"target\":0}",
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
    "id": "learn:two-pointers:maximum-two-pointer-pair-sum",
    "bankId": "T15-Q16",
    "slug": "maximum-two-pointer-pair-sum",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Maximum Two Pointer Pair Sum",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Return max(nums[i]+nums[j]) for i<j, or null if fewer than two elements.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "9",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Return max(nums[i]+nums[j]) for i<j, or null if fewer than two elements. Therefore the expected JSON output is 9."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "null",
        "explanation": "Inspect 0 values [] and target=0. Return max(nums[i]+nums[j]) for i<j, or null if fewer than two elements. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "0",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Return max(nums[i]+nums[j]) for i<j, or null if fewer than two elements. Therefore the expected JSON output is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "expectedOutput": "0"
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
    "id": "learn:two-pointers:minimum-two-pointer-pair-sum",
    "bankId": "T15-Q17",
    "slug": "minimum-two-pointer-pair-sum",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Minimum Two Pointer Pair Sum",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Return min(nums[i]+nums[j]) for i<j, or null if fewer than two.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "2",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Return min(nums[i]+nums[j]) for i<j, or null if fewer than two. Therefore the expected JSON output is 2."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "null",
        "explanation": "Inspect 0 values [] and target=0. Return min(nums[i]+nums[j]) for i<j, or null if fewer than two. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "0",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Return min(nums[i]+nums[j]) for i<j, or null if fewer than two. Therefore the expected JSON output is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "expectedOutput": "0"
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
    "id": "learn:two-pointers:pairs-exactly-twice-target",
    "bankId": "T15-Q18",
    "slug": "pairs-exactly-twice-target",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Pairs Exactly Twice Target",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Return unique value pairs with sum = 2*target, sorted lexicographically.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "[[3,5]]",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Return unique value pairs with sum = 2*target, sorted lexicographically. Therefore the expected JSON output is [[3,5]]."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "[]",
        "explanation": "Inspect 0 values [] and target=0. Return unique value pairs with sum = 2*target, sorted lexicographically. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "[[0,0]]",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Return unique value pairs with sum = 2*target, sorted lexicographically. Therefore the expected JSON output is [[0,0]]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "[[3,5]]"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "expectedOutput": "[[0,0]]"
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
    "id": "learn:two-pointers:first-pair-meeting-threshold",
    "bankId": "T15-Q19",
    "slug": "first-pair-meeting-threshold",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "First Pair Meeting Threshold",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Return lexicographically smallest [i,j] where i<j and nums[i]+nums[j]≥target, or [-1,-1].",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "[0,2]",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Return lexicographically smallest [i,j] where i<j and nums[i]+nums[j]≥target, or [-1,-1]. Therefore the expected JSON output is [0,2]."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "[-1,-1]",
        "explanation": "Inspect 0 values [] and target=0. Return lexicographically smallest [i,j] where i<j and nums[i]+nums[j]≥target, or [-1,-1]. Therefore the expected JSON output is [-1,-1]."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "[0,1]",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Return lexicographically smallest [i,j] where i<j and nums[i]+nums[j]≥target, or [-1,-1]. Therefore the expected JSON output is [0,1]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "[0,2]"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "[-1,-1]"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "expectedOutput": "[0,1]"
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
    "id": "learn:two-pointers:pair-product-closest-to-target",
    "bankId": "T15-Q20",
    "slug": "pair-product-closest-to-target",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Pair Product Closest to Target",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Return [nums[i],nums[j]] with product nearest target; ties choose lexicographically smallest value-pair, or null when <2.",
    "inputFormat": "A single JSON object: {\"nums\": integer array sorted in nondecreasing order, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ values,target ≤ 10; multiple equal numbers are separate indexed elements; output value-pairs sorted lexicographically.",
    "examples": [
      {
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "output": "[1,4]",
        "explanation": "Inspect 5 values [1,1,3,4,5] and target=4. Return [nums[i],nums[j]] with product nearest target; ties choose lexicographically smallest value-pair, or null when <2. Therefore the expected JSON output is [1,4]."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "null",
        "explanation": "Inspect 0 values [] and target=0. Return [nums[i],nums[j]] with product nearest target; ties choose lexicographically smallest value-pair, or null when <2. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "[0,0]",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Return [nums[i],nums[j]] with product nearest target; ties choose lexicographically smallest value-pair, or null when <2. Therefore the expected JSON output is [0,0]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[1,1,3,4,5],\"target\":4}",
        "expectedOutput": "[1,4]"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "expectedOutput": "[0,0]"
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
