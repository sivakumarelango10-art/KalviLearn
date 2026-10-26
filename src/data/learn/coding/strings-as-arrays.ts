import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:strings-as-arrays:length-by-character-traversal",
    "bankId": "T09-Q01",
    "slug": "length-by-character-traversal",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Length by Character Traversal",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Return the number of characters in text.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "9",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Return the number of characters in text. Therefore the expected JSON output is 9."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "0",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Return the number of characters in text. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"text\":\"a\"}",
        "output": "1",
        "explanation": "Traverse the 1 characters in \"a\" from left to right unless specified otherwise. Return the number of characters in text. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"a\"}",
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
    "id": "learn:strings-as-arrays:reverse-characters",
    "bankId": "T09-Q02",
    "slug": "reverse-characters",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Reverse Characters",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Return text written in reverse character order.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "mhtirogla",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Return text written in reverse character order. Therefore the expected JSON output is \"mhtirogla\"."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Return text written in reverse character order. Therefore the expected JSON output is \"\"."
      },
      {
        "input": "{\"text\":\"a\"}",
        "output": "a",
        "explanation": "Traverse the 1 characters in \"a\" from left to right unless specified otherwise. Return text written in reverse character order. Therefore the expected JSON output is \"a\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "mhtirogla"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": ""
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"a\"}",
        "expectedOutput": "a"
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
    "id": "learn:strings-as-arrays:count-vowel-characters",
    "bankId": "T09-Q03",
    "slug": "count-vowel-characters",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Count Vowel Characters",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Count letters in {a,e,i,o,u}.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "3",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Count letters in {a,e,i,o,u}. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "0",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Count letters in {a,e,i,o,u}. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"text\":\"a\"}",
        "output": "1",
        "explanation": "Traverse the 1 characters in \"a\" from left to right unless specified otherwise. Count letters in {a,e,i,o,u}. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"a\"}",
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
    "id": "learn:strings-as-arrays:count-consonant-characters",
    "bankId": "T09-Q04",
    "slug": "count-consonant-characters",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Count Consonant Characters",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Count letters not in {a,e,i,o,u}.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "6",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Count letters not in {a,e,i,o,u}. Therefore the expected JSON output is 6."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "0",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Count letters not in {a,e,i,o,u}. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"text\":\"racecar\"}",
        "output": "4",
        "explanation": "Traverse the 7 characters in \"racecar\" from left to right unless specified otherwise. Count letters not in {a,e,i,o,u}. Therefore the expected JSON output is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"racecar\"}",
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
    "id": "learn:strings-as-arrays:palindrome-string",
    "bankId": "T09-Q05",
    "slug": "palindrome-string",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Palindrome String",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Return true iff text equals its reverse.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "false",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Return true iff text equals its reverse. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "true",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Return true iff text equals its reverse. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"text\":\"a\"}",
        "output": "true",
        "explanation": "Traverse the 1 characters in \"a\" from left to right unless specified otherwise. Return true iff text equals its reverse. Therefore the expected JSON output is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"a\"}",
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
    "id": "learn:strings-as-arrays:first-character-or-null",
    "bankId": "T09-Q06",
    "slug": "first-character-or-null",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "First Character or Null",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Return the first character; return null for empty text.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "a",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Return the first character; return null for empty text. Therefore the expected JSON output is \"a\"."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "null",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Return the first character; return null for empty text. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"text\":\"racecar\"}",
        "output": "r",
        "explanation": "Traverse the 7 characters in \"racecar\" from left to right unless specified otherwise. Return the first character; return null for empty text. Therefore the expected JSON output is \"r\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "a"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"racecar\"}",
        "expectedOutput": "r"
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
    "id": "learn:strings-as-arrays:last-character-or-null",
    "bankId": "T09-Q07",
    "slug": "last-character-or-null",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Last Character or Null",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Return the last character; return null for empty text.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "m",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Return the last character; return null for empty text. Therefore the expected JSON output is \"m\"."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "null",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Return the last character; return null for empty text. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"text\":\"a\"}",
        "output": "a",
        "explanation": "Traverse the 1 characters in \"a\" from left to right unless specified otherwise. Return the last character; return null for empty text. Therefore the expected JSON output is \"a\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "m"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"a\"}",
        "expectedOutput": "a"
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
    "id": "learn:strings-as-arrays:unique-characters-first-seen",
    "bankId": "T09-Q08",
    "slug": "unique-characters-first-seen",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Unique Characters First Seen",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Return a string of distinct characters in their first-appearance order.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "algorithm",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Return a string of distinct characters in their first-appearance order. Therefore the expected JSON output is \"algorithm\"."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Return a string of distinct characters in their first-appearance order. Therefore the expected JSON output is \"\"."
      },
      {
        "input": "{\"text\":\"a\"}",
        "output": "a",
        "explanation": "Traverse the 1 characters in \"a\" from left to right unless specified otherwise. Return a string of distinct characters in their first-appearance order. Therefore the expected JSON output is \"a\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "algorithm"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": ""
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"a\"}",
        "expectedOutput": "a"
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
    "id": "learn:strings-as-arrays:sorted-unique-characters",
    "bankId": "T09-Q09",
    "slug": "sorted-unique-characters",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Sorted Unique Characters",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Return the sorted string of distinct characters.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "aghilmort",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Return the sorted string of distinct characters. Therefore the expected JSON output is \"aghilmort\"."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Return the sorted string of distinct characters. Therefore the expected JSON output is \"\"."
      },
      {
        "input": "{\"text\":\"a\"}",
        "output": "a",
        "explanation": "Traverse the 1 characters in \"a\" from left to right unless specified otherwise. Return the sorted string of distinct characters. Therefore the expected JSON output is \"a\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "aghilmort"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": ""
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"a\"}",
        "expectedOutput": "a"
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
    "id": "learn:strings-as-arrays:first-nonrepeating-character",
    "bankId": "T09-Q10",
    "slug": "first-nonrepeating-character",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "First Nonrepeating Character",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Return the first character occurring exactly once in text, or null.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "a",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Return the first character occurring exactly once in text, or null. Therefore the expected JSON output is \"a\"."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "null",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Return the first character occurring exactly once in text, or null. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"text\":\"racecar\"}",
        "output": "e",
        "explanation": "Traverse the 7 characters in \"racecar\" from left to right unless specified otherwise. Return the first character occurring exactly once in text, or null. Therefore the expected JSON output is \"e\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "a"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"racecar\"}",
        "expectedOutput": "e"
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
    "id": "learn:strings-as-arrays:run-length-character-groups",
    "bankId": "T09-Q11",
    "slug": "run-length-character-groups",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Run Length Character Groups",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Return [[character,consecutive_count],...] for each maximal run of equal adjacent characters.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "[[\"a\",1],[\"l\",1],[\"g\",1],[\"o\",1],[\"r\",1],[\"i\",1],[\"t\",1],[\"h\",1],[\"m\",1]]",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Return [[character,consecutive_count],...] for each maximal run of equal adjacent characters. Therefore the expected JSON output is [[\"a\",1],[\"l\",1],[\"g\",1],[\"o\",1],[\"r\",1],[\"i\",1],[\"t\",1],[\"h\",1],[\"m\",1]]."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "[]",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Return [[character,consecutive_count],...] for each maximal run of equal adjacent characters. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"text\":\"a\"}",
        "output": "[[\"a\",1]]",
        "explanation": "Traverse the 1 characters in \"a\" from left to right unless specified otherwise. Return [[character,consecutive_count],...] for each maximal run of equal adjacent characters. Therefore the expected JSON output is [[\"a\",1]]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "[[\"a\",1],[\"l\",1],[\"g\",1],[\"o\",1],[\"r\",1],[\"i\",1],[\"t\",1],[\"h\",1],[\"m\",1]]"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"a\"}",
        "expectedOutput": "[[\"a\",1]]"
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
    "id": "learn:strings-as-arrays:alphabet-position-sum",
    "bankId": "T09-Q12",
    "slug": "alphabet-position-sum",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Alphabet Position Sum",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Interpret a=1,...,z=26 and add the letter positions.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "103",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Interpret a=1,...,z=26 and add the letter positions. Therefore the expected JSON output is 103."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "0",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Interpret a=1,...,z=26 and add the letter positions. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"text\":\"a\"}",
        "output": "1",
        "explanation": "Traverse the 1 characters in \"a\" from left to right unless specified otherwise. Interpret a=1,...,z=26 and add the letter positions. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "103"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"a\"}",
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
    "id": "learn:strings-as-arrays:character-frequency-sorted",
    "bankId": "T09-Q13",
    "slug": "character-frequency-sorted",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Character Frequency Sorted",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Return a dictionary mapping each occurring letter to its frequency, using alphabetic key order.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "{\"a\":1,\"g\":1,\"h\":1,\"i\":1,\"l\":1,\"m\":1,\"o\":1,\"r\":1,\"t\":1}",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Return a dictionary mapping each occurring letter to its frequency, using alphabetic key order. Therefore the expected JSON output is {\"a\":1,\"g\":1,\"h\":1,\"i\":1,\"l\":1,\"m\":1,\"o\":1,\"r\":1,\"t\":1}."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "{}",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Return a dictionary mapping each occurring letter to its frequency, using alphabetic key order. Therefore the expected JSON output is {}."
      },
      {
        "input": "{\"text\":\"a\"}",
        "output": "{\"a\":1}",
        "explanation": "Traverse the 1 characters in \"a\" from left to right unless specified otherwise. Return a dictionary mapping each occurring letter to its frequency, using alphabetic key order. Therefore the expected JSON output is {\"a\":1}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "{\"a\":1,\"g\":1,\"h\":1,\"i\":1,\"l\":1,\"m\":1,\"o\":1,\"r\":1,\"t\":1}"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": "{}"
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"a\"}",
        "expectedOutput": "{\"a\":1}"
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
    "id": "learn:strings-as-arrays:adjacent-equal-pair-count",
    "bankId": "T09-Q14",
    "slug": "adjacent-equal-pair-count",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Adjacent Equal Pair Count",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Count indices i at which text[i]=text[i+1].",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "0",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Count indices i at which text[i]=text[i+1]. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"text\":\"aaaa\"}",
        "output": "3",
        "explanation": "Traverse the 4 characters in \"aaaa\" from left to right unless specified otherwise. Count indices i at which text[i]=text[i+1]. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"text\":\"hello\"}",
        "output": "1",
        "explanation": "Traverse the 5 characters in \"hello\" from left to right unless specified otherwise. Count indices i at which text[i]=text[i+1]. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"aaaa\"}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"hello\"}",
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
    "id": "learn:strings-as-arrays:mirror-pair-matches",
    "bankId": "T09-Q15",
    "slug": "mirror-pair-matches",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Mirror Pair Matches",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Compare text[i] and text[n-1-i] for i in the first half; return the number of matching mirrored pairs.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "0",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Compare text[i] and text[n-1-i] for i in the first half; return the number of matching mirrored pairs. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"text\":\"aaaa\"}",
        "output": "2",
        "explanation": "Traverse the 4 characters in \"aaaa\" from left to right unless specified otherwise. Compare text[i] and text[n-1-i] for i in the first half; return the number of matching mirrored pairs. Therefore the expected JSON output is 2."
      },
      {
        "input": "{\"text\":\"racecar\"}",
        "output": "3",
        "explanation": "Traverse the 7 characters in \"racecar\" from left to right unless specified otherwise. Compare text[i] and text[n-1-i] for i in the first half; return the number of matching mirrored pairs. Therefore the expected JSON output is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"aaaa\"}",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"racecar\"}",
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
    "id": "learn:strings-as-arrays:longest-equal-character-run",
    "bankId": "T09-Q16",
    "slug": "longest-equal-character-run",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Longest Equal Character Run",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Return the maximum length of an uninterrupted run of the same character, or zero for empty text.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "1",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Return the maximum length of an uninterrupted run of the same character, or zero for empty text. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "0",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Return the maximum length of an uninterrupted run of the same character, or zero for empty text. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"text\":\"aaaa\"}",
        "output": "4",
        "explanation": "Traverse the 4 characters in \"aaaa\" from left to right unless specified otherwise. Return the maximum length of an uninterrupted run of the same character, or zero for empty text. Therefore the expected JSON output is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"aaaa\"}",
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
    "id": "learn:strings-as-arrays:rotate-first-letter-to-end",
    "bankId": "T09-Q17",
    "slug": "rotate-first-letter-to-end",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Rotate First Letter to End",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Move the first character to the end, keeping text unchanged when empty.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "lgorithma",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Move the first character to the end, keeping text unchanged when empty. Therefore the expected JSON output is \"lgorithma\"."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Move the first character to the end, keeping text unchanged when empty. Therefore the expected JSON output is \"\"."
      },
      {
        "input": "{\"text\":\"a\"}",
        "output": "a",
        "explanation": "Traverse the 1 characters in \"a\" from left to right unless specified otherwise. Move the first character to the end, keeping text unchanged when empty. Therefore the expected JSON output is \"a\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "lgorithma"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": ""
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"a\"}",
        "expectedOutput": "a"
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
    "id": "learn:strings-as-arrays:reverse-each-two-character-block",
    "bankId": "T09-Q18",
    "slug": "reverse-each-two-character-block",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Reverse Each Two Character Block",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Swap characters within successive nonoverlapping pairs; leave an unmatched final letter unchanged.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "laogirhtm",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Swap characters within successive nonoverlapping pairs; leave an unmatched final letter unchanged. Therefore the expected JSON output is \"laogirhtm\"."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Swap characters within successive nonoverlapping pairs; leave an unmatched final letter unchanged. Therefore the expected JSON output is \"\"."
      },
      {
        "input": "{\"text\":\"a\"}",
        "output": "a",
        "explanation": "Traverse the 1 characters in \"a\" from left to right unless specified otherwise. Swap characters within successive nonoverlapping pairs; leave an unmatched final letter unchanged. Therefore the expected JSON output is \"a\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "laogirhtm"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": ""
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"a\"}",
        "expectedOutput": "a"
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
    "id": "learn:strings-as-arrays:longest-proper-prefix-suffix",
    "bankId": "T09-Q19",
    "slug": "longest-proper-prefix-suffix",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Longest Proper Prefix Suffix",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Return the length of the longest nonempty proper prefix also appearing as a suffix, or zero.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "0",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Return the length of the longest nonempty proper prefix also appearing as a suffix, or zero. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"text\":\"aaaa\"}",
        "output": "3",
        "explanation": "Traverse the 4 characters in \"aaaa\" from left to right unless specified otherwise. Return the length of the longest nonempty proper prefix also appearing as a suffix, or zero. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"text\":\"racecar\"}",
        "output": "1",
        "explanation": "Traverse the 7 characters in \"racecar\" from left to right unless specified otherwise. Return the length of the longest nonempty proper prefix also appearing as a suffix, or zero. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"aaaa\"}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"racecar\"}",
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
    "id": "learn:strings-as-arrays:lexicographically-smallest-rotation",
    "bankId": "T09-Q20",
    "slug": "lexicographically-smallest-rotation",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Lexicographically Smallest Rotation",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Return the smallest rotation of the text in lexicographic order, or the empty string if text is empty.",
    "inputFormat": "A single JSON object: {\"text\": lowercase ASCII string}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(text) ≤ 18; text contains only a-z; arrays returned are ordered; positions are zero-based.",
    "examples": [
      {
        "input": "{\"text\":\"algorithm\"}",
        "output": "algorithm",
        "explanation": "Traverse the 9 characters in \"algorithm\" from left to right unless specified otherwise. Return the smallest rotation of the text in lexicographic order, or the empty string if text is empty. Therefore the expected JSON output is \"algorithm\"."
      },
      {
        "input": "{\"text\":\"\"}",
        "output": "",
        "explanation": "Traverse the 0 characters in \"\" from left to right unless specified otherwise. Return the smallest rotation of the text in lexicographic order, or the empty string if text is empty. Therefore the expected JSON output is \"\"."
      },
      {
        "input": "{\"text\":\"a\"}",
        "output": "a",
        "explanation": "Traverse the 1 characters in \"a\" from left to right unless specified otherwise. Return the smallest rotation of the text in lexicographic order, or the empty string if text is empty. Therefore the expected JSON output is \"a\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"text\":\"algorithm\"}",
        "expectedOutput": "algorithm"
      },
      {
        "testIndex": 2,
        "input": "{\"text\":\"\"}",
        "expectedOutput": ""
      },
      {
        "testIndex": 3,
        "input": "{\"text\":\"a\"}",
        "expectedOutput": "a"
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
