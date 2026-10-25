import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:dictionaries-hash-maps:frequency-map",
    "slug": "frequency-map",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Frequency Map",
    "order": 1,
    "problemStatement": "Build a frequency dictionary. For every distinct value `v` with count `c`, add `v*(c+1)`; print the total.",
    "inputFormat": "First line contains `n`; second line contains n integers.",
    "outputFormat": "Print the dictionary-based score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n1 2 2 3",
        "output": "14",
        "explanation": "The frequency map is {1: 1, 2: 2, 3: 1}; the score is 14."
      },
      {
        "input": "3\n5 5 5",
        "output": "20",
        "explanation": "The frequency map is {5: 3}; the score is 20."
      },
      {
        "input": "4\n0 -1 0 2",
        "output": "2",
        "explanation": "The frequency map is {0: 2, -1: 1, 2: 1}; the score is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3",
        "expectedOutput": "14"
      },
      {
        "testIndex": 2,
        "input": "3\n5 5 5",
        "expectedOutput": "20"
      },
      {
        "testIndex": 3,
        "input": "4\n0 -1 0 2",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:dictionaries-hash-maps:t16-q01-frequency-map",
    "bankId": "T16-Q01",
    "slug": "t16-q01-frequency-map",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Frequency Map",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Return an object mapping each distinct number as a string key to its frequency.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "{\"1\":2,\"3\":1,\"4\":1,\"5\":1}",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return an object mapping each distinct number as a string key to its frequency. Therefore the expected JSON output is {\"1\":2,\"3\":1,\"4\":1,\"5\":1}."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "{}",
        "explanation": "Inspect 0 values [] and target=0. Return an object mapping each distinct number as a string key to its frequency. Therefore the expected JSON output is {}."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "{\"7\":1}",
        "explanation": "Inspect 1 values [7] and target=7. Return an object mapping each distinct number as a string key to its frequency. Therefore the expected JSON output is {\"7\":1}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "{\"1\":2,\"3\":1,\"4\":1,\"5\":1}"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "{}"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
        "expectedOutput": "{\"7\":1}"
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:target-frequency-using-map",
    "bankId": "T16-Q02",
    "slug": "target-frequency-using-map",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Target Frequency Using Map",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Return the count of target using frequency lookup.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "1",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return the count of target using frequency lookup. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "0",
        "explanation": "Inspect 0 values [] and target=0. Return the count of target using frequency lookup. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "3",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Return the count of target using frequency lookup. Therefore the expected JSON output is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "1"
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
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:first-repeated-value",
    "bankId": "T16-Q03",
    "slug": "first-repeated-value",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "First Repeated Value",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Return the earliest element by scanning left-to-right whose value has appeared earlier; null when none.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "1",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return the earliest element by scanning left-to-right whose value has appeared earlier; null when none. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "null",
        "explanation": "Inspect 0 values [] and target=0. Return the earliest element by scanning left-to-right whose value has appeared earlier; null when none. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "0",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Return the earliest element by scanning left-to-right whose value has appeared earlier; null when none. Therefore the expected JSON output is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "1"
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:first-unique-value",
    "bankId": "T16-Q04",
    "slug": "first-unique-value",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "First Unique Value",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Return the earliest value occurring exactly once; null when absent.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "3",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return the earliest value occurring exactly once; null when absent. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "null",
        "explanation": "Inspect 0 values [] and target=0. Return the earliest value occurring exactly once; null when absent. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "7",
        "explanation": "Inspect 1 values [7] and target=7. Return the earliest value occurring exactly once; null when absent. Therefore the expected JSON output is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
        "expectedOutput": "7"
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:unique-count",
    "bankId": "T16-Q05",
    "slug": "unique-count",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Unique Count",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Return the number of keys in the frequency map.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "4",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return the number of keys in the frequency map. Therefore the expected JSON output is 4."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "0",
        "explanation": "Inspect 0 values [] and target=0. Return the number of keys in the frequency map. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "1",
        "explanation": "Inspect 1 values [7] and target=7. Return the number of keys in the frequency map. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:most-frequent-value",
    "bankId": "T16-Q06",
    "slug": "most-frequent-value",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Most Frequent Value",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Return the most frequent value; break ties by choosing the smallest number; null for empty.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "1",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return the most frequent value; break ties by choosing the smallest number; null for empty. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "null",
        "explanation": "Inspect 0 values [] and target=0. Return the most frequent value; break ties by choosing the smallest number; null for empty. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "7",
        "explanation": "Inspect 1 values [7] and target=7. Return the most frequent value; break ties by choosing the smallest number; null for empty. Therefore the expected JSON output is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
        "expectedOutput": "7"
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:least-frequent-value",
    "bankId": "T16-Q07",
    "slug": "least-frequent-value",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Least Frequent Value",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Return the least frequent value; break ties by choosing the smallest number; null for empty.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "3",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return the least frequent value; break ties by choosing the smallest number; null for empty. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "null",
        "explanation": "Inspect 0 values [] and target=0. Return the least frequent value; break ties by choosing the smallest number; null for empty. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "7",
        "explanation": "Inspect 1 values [7] and target=7. Return the least frequent value; break ties by choosing the smallest number; null for empty. Therefore the expected JSON output is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
        "expectedOutput": "7"
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:index-lists-per-value",
    "bankId": "T16-Q08",
    "slug": "index-lists-per-value",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Index Lists per Value",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Return an object mapping each distinct value (as a string key) to all of its indices.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "{\"1\":[1,3],\"3\":[0],\"4\":[2],\"5\":[4]}",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return an object mapping each distinct value (as a string key) to all of its indices. Therefore the expected JSON output is {\"1\":[1,3],\"3\":[0],\"4\":[2],\"5\":[4]}."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "{}",
        "explanation": "Inspect 0 values [] and target=0. Return an object mapping each distinct value (as a string key) to all of its indices. Therefore the expected JSON output is {}."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "{\"7\":[0]}",
        "explanation": "Inspect 1 values [7] and target=7. Return an object mapping each distinct value (as a string key) to all of its indices. Therefore the expected JSON output is {\"7\":[0]}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "{\"1\":[1,3],\"3\":[0],\"4\":[2],\"5\":[4]}"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "{}"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
        "expectedOutput": "{\"7\":[0]}"
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:two-sum-hash-lookup",
    "bankId": "T16-Q09",
    "slug": "two-sum-hash-lookup",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Two Sum Hash Lookup",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Return true if any two distinct indices have values summing to target.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "true",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return true if any two distinct indices have values summing to target. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "false",
        "explanation": "Inspect 0 values [] and target=0. Return true if any two distinct indices have values summing to target. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "false",
        "explanation": "Inspect 1 values [7] and target=7. Return true if any two distinct indices have values summing to target. Therefore the expected JSON output is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:two-sum-lexicographically-first-indices",
    "bankId": "T16-Q10",
    "slug": "two-sum-lexicographically-first-indices",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Two Sum Lexicographically First Indices",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Return lexicographically first pair of indices [i,j] where i<j and the values add to target, or [-1,-1].",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "[0,1]",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return lexicographically first pair of indices [i,j] where i<j and the values add to target, or [-1,-1]. Therefore the expected JSON output is [0,1]."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "[-1,-1]",
        "explanation": "Inspect 0 values [] and target=0. Return lexicographically first pair of indices [i,j] where i<j and the values add to target, or [-1,-1]. Therefore the expected JSON output is [-1,-1]."
      },
      {
        "input": "{\"nums\":[-4,-1,-3,2],\"target\":-1}",
        "output": "[2,3]",
        "explanation": "Inspect 4 values [-4,-1,-3,2] and target=-1. Return lexicographically first pair of indices [i,j] where i<j and the values add to target, or [-1,-1]. Therefore the expected JSON output is [2,3]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "[0,1]"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "[-1,-1]"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[-4,-1,-3,2],\"target\":-1}",
        "expectedOutput": "[2,3]"
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:number-of-equal-index-pairs",
    "bankId": "T16-Q11",
    "slug": "number-of-equal-index-pairs",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Number of Equal Index Pairs",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Count index pairs i<j containing equal values.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "1",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Count index pairs i<j containing equal values. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "0",
        "explanation": "Inspect 0 values [] and target=0. Count index pairs i<j containing equal values. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "3",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Count index pairs i<j containing equal values. Therefore the expected JSON output is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "1"
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:number-of-unequal-index-pairs",
    "bankId": "T16-Q12",
    "slug": "number-of-unequal-index-pairs",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Number of Unequal Index Pairs",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Count pairs i<j whose values differ.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "9",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Count pairs i<j whose values differ. Therefore the expected JSON output is 9."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "0",
        "explanation": "Inspect 0 values [] and target=0. Count pairs i<j whose values differ. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"nums\":[-4,-1,-3,2],\"target\":-1}",
        "output": "6",
        "explanation": "Inspect 4 values [-4,-1,-3,2] and target=-1. Count pairs i<j whose values differ. Therefore the expected JSON output is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[-4,-1,-3,2],\"target\":-1}",
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:values-occurring-at-least-twice",
    "bankId": "T16-Q13",
    "slug": "values-occurring-at-least-twice",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Values Occurring At Least Twice",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Return the sorted list of values occurring two or more times.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "[1]",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return the sorted list of values occurring two or more times. Therefore the expected JSON output is [1]."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "[]",
        "explanation": "Inspect 0 values [] and target=0. Return the sorted list of values occurring two or more times. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "[0]",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Return the sorted list of values occurring two or more times. Therefore the expected JSON output is [0]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "[1]"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "expectedOutput": "[0]"
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:frequency-of-frequencies",
    "bankId": "T16-Q14",
    "slug": "frequency-of-frequencies",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Frequency of Frequencies",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Return an object where each string key is an occurrence count and each value is the number of distinct integers having that count.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "{\"1\":3,\"2\":1}",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return an object where each string key is an occurrence count and each value is the number of distinct integers having that count. Therefore the expected JSON output is {\"1\":3,\"2\":1}."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "{}",
        "explanation": "Inspect 0 values [] and target=0. Return an object where each string key is an occurrence count and each value is the number of distinct integers having that count. Therefore the expected JSON output is {}."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "{\"1\":1}",
        "explanation": "Inspect 1 values [7] and target=7. Return an object where each string key is an occurrence count and each value is the number of distinct integers having that count. Therefore the expected JSON output is {\"1\":1}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "{\"1\":3,\"2\":1}"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "{}"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
        "expectedOutput": "{\"1\":1}"
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:count-subarrays-with-sum-target",
    "bankId": "T16-Q15",
    "slug": "count-subarrays-with-sum-target",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Count Subarrays With Sum Target",
    "order": 16,
    "difficulty": "Medium",
    "problemStatement": "Return the count of nonempty contiguous subarrays summing to target, allowing negative values.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "2",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return the count of nonempty contiguous subarrays summing to target, allowing negative values. Therefore the expected JSON output is 2."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "0",
        "explanation": "Inspect 0 values [] and target=0. Return the count of nonempty contiguous subarrays summing to target, allowing negative values. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "1",
        "explanation": "Inspect 1 values [7] and target=7. Return the count of nonempty contiguous subarrays summing to target, allowing negative values. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:longest-target-sum-subarray",
    "bankId": "T16-Q16",
    "slug": "longest-target-sum-subarray",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Longest Target Sum Subarray",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Return the maximum length of a contiguous subarray with sum=target; return 0 if none.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "2",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return the maximum length of a contiguous subarray with sum=target; return 0 if none. Therefore the expected JSON output is 2."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "0",
        "explanation": "Inspect 0 values [] and target=0. Return the maximum length of a contiguous subarray with sum=target; return 0 if none. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "1",
        "explanation": "Inspect 1 values [7] and target=7. Return the maximum length of a contiguous subarray with sum=target; return 0 if none. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:shortest-target-sum-subarray",
    "bankId": "T16-Q17",
    "slug": "shortest-target-sum-subarray",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Shortest Target Sum Subarray",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Return the minimum length of a nonempty subarray summing to target; return 0 if none.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "1",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return the minimum length of a nonempty subarray summing to target; return 0 if none. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "0",
        "explanation": "Inspect 0 values [] and target=0. Return the minimum length of a nonempty subarray summing to target; return 0 if none. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "1",
        "explanation": "Inspect 1 values [7] and target=7. Return the minimum length of a nonempty subarray summing to target; return 0 if none. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:longest-zero-sum-subarray",
    "bankId": "T16-Q18",
    "slug": "longest-zero-sum-subarray",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Longest Zero Sum Subarray",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Return the length of the longest contiguous subarray with sum zero.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "0",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return the length of the longest contiguous subarray with sum zero. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "output": "3",
        "explanation": "Inspect 3 values [0,0,0] and target=0. Return the length of the longest contiguous subarray with sum zero. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"nums\":[5,-5,5,-5,0],\"target\":5}",
        "output": "5",
        "explanation": "Inspect 5 values [5,-5,5,-5,0] and target=5. Return the length of the longest contiguous subarray with sum zero. Therefore the expected JSON output is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[0,0,0],\"target\":0}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[5,-5,5,-5,0],\"target\":5}",
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:first-index-lookup-map",
    "bankId": "T16-Q19",
    "slug": "first-index-lookup-map",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "First Index Lookup Map",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Return a dictionary mapping distinct numeric values (string keys) to their earliest index.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "{\"1\":1,\"3\":0,\"4\":2,\"5\":4}",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return a dictionary mapping distinct numeric values (string keys) to their earliest index. Therefore the expected JSON output is {\"1\":1,\"3\":0,\"4\":2,\"5\":4}."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "{}",
        "explanation": "Inspect 0 values [] and target=0. Return a dictionary mapping distinct numeric values (string keys) to their earliest index. Therefore the expected JSON output is {}."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "{\"7\":0}",
        "explanation": "Inspect 1 values [7] and target=7. Return a dictionary mapping distinct numeric values (string keys) to their earliest index. Therefore the expected JSON output is {\"7\":0}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "{\"1\":1,\"3\":0,\"4\":2,\"5\":4}"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "{}"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
        "expectedOutput": "{\"7\":0}"
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:dictionaries-hash-maps:last-index-lookup-map",
    "bankId": "T16-Q20",
    "slug": "last-index-lookup-map",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Last Index Lookup Map",
    "order": 21,
    "difficulty": "Hard",
    "problemStatement": "Return a dictionary mapping distinct numeric values (string keys) to their last index.",
    "inputFormat": "A single JSON object: {\"nums\": integer array, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(nums) ≤ 10; -10 ≤ nums[i],target ≤ 10; dictionary keys for numeric elements must be decimal strings.",
    "examples": [
      {
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "output": "{\"1\":3,\"3\":0,\"4\":2,\"5\":4}",
        "explanation": "Inspect 5 values [3,1,4,1,5] and target=4. Return a dictionary mapping distinct numeric values (string keys) to their last index. Therefore the expected JSON output is {\"1\":3,\"3\":0,\"4\":2,\"5\":4}."
      },
      {
        "input": "{\"nums\":[],\"target\":0}",
        "output": "{}",
        "explanation": "Inspect 0 values [] and target=0. Return a dictionary mapping distinct numeric values (string keys) to their last index. Therefore the expected JSON output is {}."
      },
      {
        "input": "{\"nums\":[7],\"target\":7}",
        "output": "{\"7\":0}",
        "explanation": "Inspect 1 values [7] and target=7. Return a dictionary mapping distinct numeric values (string keys) to their last index. Therefore the expected JSON output is {\"7\":0}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"nums\":[3,1,4,1,5],\"target\":4}",
        "expectedOutput": "{\"1\":3,\"3\":0,\"4\":2,\"5\":4}"
      },
      {
        "testIndex": 2,
        "input": "{\"nums\":[],\"target\":0}",
        "expectedOutput": "{}"
      },
      {
        "testIndex": 3,
        "input": "{\"nums\":[7],\"target\":7}",
        "expectedOutput": "{\"7\":0}"
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  }
]

export default questions
