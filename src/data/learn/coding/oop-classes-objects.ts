import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:oop-classes-objects:construct-student-summaries",
    "bankId": "T22-Q01",
    "slug": "construct-student-summaries",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Construct Student Summaries",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Define a Student class with name and score fields. Instantiate Student(name,score) for each record. Serialize objects in original order to strings \"name:score\".",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "[\"Anu:82\",\"Bala:65\",\"Charu:82\"]",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Instantiate Student(name,score) for each record. Serialize objects in original order to strings \"name:score\". Therefore the expected JSON output is [\"Anu:82\",\"Bala:65\",\"Charu:82\"]."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "[]",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Instantiate Student(name,score) for each record. Serialize objects in original order to strings \"name:score\". Therefore the expected JSON output is []."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "[\"A:100\"]",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Instantiate Student(name,score) for each record. Serialize objects in original order to strings \"name:score\". Therefore the expected JSON output is [\"A:100\"]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "[\"Anu:82\",\"Bala:65\",\"Charu:82\"]"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "expectedOutput": "[\"A:100\"]"
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
    "id": "learn:oop-classes-objects:count-constructed-objects",
    "bankId": "T22-Q02",
    "slug": "count-constructed-objects",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Count Constructed Objects",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Define a Student class with name and score fields. Construct a Student object per record; return the total number of instantiated objects.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "3",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Construct a Student object per record; return the total number of instantiated objects. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "0",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Construct a Student object per record; return the total number of instantiated objects. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "1",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Construct a Student object per record; return the total number of instantiated objects. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
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
    "id": "learn:oop-classes-objects:highest-scoring-student",
    "bankId": "T22-Q03",
    "slug": "highest-scoring-student",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Highest Scoring Student",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Define a Student class with name and score fields. Return {\"index\",\"name\",\"score\"} for the highest scoring object; tie breaks by earliest record; null when empty.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "{\"index\":0,\"name\":\"Anu\",\"score\":82}",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return {\"index\",\"name\",\"score\"} for the highest scoring object; tie breaks by earliest record; null when empty. Therefore the expected JSON output is {\"index\":0,\"name\":\"Anu\",\"score\":82}."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "null",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return {\"index\",\"name\",\"score\"} for the highest scoring object; tie breaks by earliest record; null when empty. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "{\"index\":0,\"name\":\"A\",\"score\":100}",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Return {\"index\",\"name\",\"score\"} for the highest scoring object; tie breaks by earliest record; null when empty. Therefore the expected JSON output is {\"index\":0,\"name\":\"A\",\"score\":100}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "{\"index\":0,\"name\":\"Anu\",\"score\":82}"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "expectedOutput": "{\"index\":0,\"name\":\"A\",\"score\":100}"
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
    "id": "learn:oop-classes-objects:lowest-scoring-student",
    "bankId": "T22-Q04",
    "slug": "lowest-scoring-student",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Lowest Scoring Student",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Define a Student class with name and score fields. Return {\"index\",\"name\",\"score\"} for the lowest scoring object; tie breaks by earliest record; null when empty.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "{\"index\":1,\"name\":\"Bala\",\"score\":65}",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return {\"index\",\"name\",\"score\"} for the lowest scoring object; tie breaks by earliest record; null when empty. Therefore the expected JSON output is {\"index\":1,\"name\":\"Bala\",\"score\":65}."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "null",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return {\"index\",\"name\",\"score\"} for the lowest scoring object; tie breaks by earliest record; null when empty. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "{\"index\":0,\"name\":\"A\",\"score\":100}",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Return {\"index\",\"name\",\"score\"} for the lowest scoring object; tie breaks by earliest record; null when empty. Therefore the expected JSON output is {\"index\":0,\"name\":\"A\",\"score\":100}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "{\"index\":1,\"name\":\"Bala\",\"score\":65}"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "expectedOutput": "{\"index\":0,\"name\":\"A\",\"score\":100}"
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
    "id": "learn:oop-classes-objects:passing-students",
    "bankId": "T22-Q05",
    "slug": "passing-students",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Passing Students",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Define a Student class with name and score fields. Return names of Student objects whose score is at least threshold, preserving roster order.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "[\"Anu\",\"Charu\"]",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return names of Student objects whose score is at least threshold, preserving roster order. Therefore the expected JSON output is [\"Anu\",\"Charu\"]."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "[]",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return names of Student objects whose score is at least threshold, preserving roster order. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "[\"A\"]",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Return names of Student objects whose score is at least threshold, preserving roster order. Therefore the expected JSON output is [\"A\"]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "[\"Anu\",\"Charu\"]"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "expectedOutput": "[\"A\"]"
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
    "id": "learn:oop-classes-objects:failing-students",
    "bankId": "T22-Q06",
    "slug": "failing-students",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Failing Students",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Define a Student class with name and score fields. Return names of Student objects whose score is strictly below threshold, preserving order.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "[\"Bala\"]",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return names of Student objects whose score is strictly below threshold, preserving order. Therefore the expected JSON output is [\"Bala\"]."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "[]",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return names of Student objects whose score is strictly below threshold, preserving order. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"records\":[{\"name\":\"Mira\",\"score\":0}],\"threshold\":1}",
        "output": "[\"Mira\"]",
        "explanation": "Instantiate 1 Student objects with scores [0] and threshold 1. Define a Student class with name and score fields. Return names of Student objects whose score is strictly below threshold, preserving order. Therefore the expected JSON output is [\"Mira\"]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "[\"Bala\"]"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"Mira\",\"score\":0}],\"threshold\":1}",
        "expectedOutput": "[\"Mira\"]"
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
    "id": "learn:oop-classes-objects:count-passing-objects",
    "bankId": "T22-Q07",
    "slug": "count-passing-objects",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Count Passing Objects",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Define a Student class with name and score fields. Return number of Student objects with score≥threshold.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "2",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return number of Student objects with score≥threshold. Therefore the expected JSON output is 2."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "0",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return number of Student objects with score≥threshold. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "1",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Return number of Student objects with score≥threshold. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
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
    "id": "learn:oop-classes-objects:average-object-score-fraction",
    "bankId": "T22-Q08",
    "slug": "average-object-score-fraction",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Average Object Score Fraction",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields. Return exact average score [reduced_numerator,positive_denominator], or null for no Student objects.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "[229,3]",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return exact average score [reduced_numerator,positive_denominator], or null for no Student objects. Therefore the expected JSON output is [229,3]."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "null",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return exact average score [reduced_numerator,positive_denominator], or null for no Student objects. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "[100,1]",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Return exact average score [reduced_numerator,positive_denominator], or null for no Student objects. Therefore the expected JSON output is [100,1]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "[229,3]"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "expectedOutput": "[100,1]"
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
    "id": "learn:oop-classes-objects:total-marks-across-objects",
    "bankId": "T22-Q09",
    "slug": "total-marks-across-objects",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Total Marks Across Objects",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields. Return sum of the score properties of all Student objects.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "229",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return sum of the score properties of all Student objects. Therefore the expected JSON output is 229."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "0",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return sum of the score properties of all Student objects. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "100",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Return sum of the score properties of all Student objects. Therefore the expected JSON output is 100."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "229"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "expectedOutput": "100"
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
    "id": "learn:oop-classes-objects:maximum-score-gap",
    "bankId": "T22-Q10",
    "slug": "maximum-score-gap",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Maximum Score Gap",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields. Return highest minus lowest score, or 0 for fewer than two students.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "17",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return highest minus lowest score, or 0 for fewer than two students. Therefore the expected JSON output is 17."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "0",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return highest minus lowest score, or 0 for fewer than two students. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"records\":[{\"name\":\"Zed\",\"score\":20},{\"name\":\"Yam\",\"score\":80},{\"name\":\"Xia\",\"score\":100}],\"threshold\":75}",
        "output": "80",
        "explanation": "Instantiate 3 Student objects with scores [20, 80, 100] and threshold 75. Define a Student class with name and score fields. Return highest minus lowest score, or 0 for fewer than two students. Therefore the expected JSON output is 80."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "17"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"Zed\",\"score\":20},{\"name\":\"Yam\",\"score\":80},{\"name\":\"Xia\",\"score\":100}],\"threshold\":75}",
        "expectedOutput": "80"
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
    "id": "learn:oop-classes-objects:rank-objects-by-score",
    "bankId": "T22-Q11",
    "slug": "rank-objects-by-score",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Rank Objects by Score",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields. Return student names sorted by descending score, with original-index tie-break.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "[\"Anu\",\"Charu\",\"Bala\"]",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return student names sorted by descending score, with original-index tie-break. Therefore the expected JSON output is [\"Anu\",\"Charu\",\"Bala\"]."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "[]",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return student names sorted by descending score, with original-index tie-break. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "[\"A\"]",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Return student names sorted by descending score, with original-index tie-break. Therefore the expected JSON output is [\"A\"]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "[\"Anu\",\"Charu\",\"Bala\"]"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "expectedOutput": "[\"A\"]"
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
    "id": "learn:oop-classes-objects:alphabetical-object-display",
    "bankId": "T22-Q12",
    "slug": "alphabetical-object-display",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Alphabetical Object Display",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields. Return [name,score] arrays sorted by name (case-sensitive), then original index.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "[[\"Anu\",82],[\"Bala\",65],[\"Charu\",82]]",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return [name,score] arrays sorted by name (case-sensitive), then original index. Therefore the expected JSON output is [[\"Anu\",82],[\"Bala\",65],[\"Charu\",82]]."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "[]",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return [name,score] arrays sorted by name (case-sensitive), then original index. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "[[\"A\",100]]",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Return [name,score] arrays sorted by name (case-sensitive), then original index. Therefore the expected JSON output is [[\"A\",100]]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "[[\"Anu\",82],[\"Bala\",65],[\"Charu\",82]]"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "expectedOutput": "[[\"A\",100]]"
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
    "id": "learn:oop-classes-objects:score-as-letter-grade",
    "bankId": "T22-Q13",
    "slug": "score-as-letter-grade",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Score as Letter Grade",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields. Return [\"A\"/\"B\"/\"C\"/\"D\"/\"F\",...] for every Student object in original order, using 90/80/70/60 thresholds.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "[\"B\",\"D\",\"B\"]",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return [\"A\"/\"B\"/\"C\"/\"D\"/\"F\",...] for every Student object in original order, using 90/80/70/60 thresholds. Therefore the expected JSON output is [\"B\",\"D\",\"B\"]."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "[]",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return [\"A\"/\"B\"/\"C\"/\"D\"/\"F\",...] for every Student object in original order, using 90/80/70/60 thresholds. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "[\"A\"]",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Return [\"A\"/\"B\"/\"C\"/\"D\"/\"F\",...] for every Student object in original order, using 90/80/70/60 thresholds. Therefore the expected JSON output is [\"A\"]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "[\"B\",\"D\",\"B\"]"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "expectedOutput": "[\"A\"]"
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
    "id": "learn:oop-classes-objects:pass-fail-status-for-objects",
    "bankId": "T22-Q14",
    "slug": "pass-fail-status-for-objects",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Pass Fail Status for Objects",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields. Return an object {\"passed\":p,\"failed\":f} based on threshold.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "{\"passed\":2,\"failed\":1}",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return an object {\"passed\":p,\"failed\":f} based on threshold. Therefore the expected JSON output is {\"passed\":2,\"failed\":1}."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "{\"passed\":0,\"failed\":0}",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return an object {\"passed\":p,\"failed\":f} based on threshold. Therefore the expected JSON output is {\"passed\":0,\"failed\":0}."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "{\"passed\":1,\"failed\":0}",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Return an object {\"passed\":p,\"failed\":f} based on threshold. Therefore the expected JSON output is {\"passed\":1,\"failed\":0}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "{\"passed\":2,\"failed\":1}"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "{\"passed\":0,\"failed\":0}"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "expectedOutput": "{\"passed\":1,\"failed\":0}"
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
    "id": "learn:oop-classes-objects:clone-scores-with-bonus",
    "bankId": "T22-Q15",
    "slug": "clone-scores-with-bonus",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Clone Scores with Bonus",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields. Clone each Student and add 5 points to each copied score, capped at 100. Return only the cloned scores in order.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "[87,70,87]",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Clone each Student and add 5 points to each copied score, capped at 100. Return only the cloned scores in order. Therefore the expected JSON output is [87,70,87]."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "[]",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Clone each Student and add 5 points to each copied score, capped at 100. Return only the cloned scores in order. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "[100]",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Clone each Student and add 5 points to each copied score, capped at 100. Return only the cloned scores in order. Therefore the expected JSON output is [100]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "[87,70,87]"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "expectedOutput": "[100]"
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
    "id": "learn:oop-classes-objects:copy-independence-check",
    "bankId": "T22-Q16",
    "slug": "copy-independence-check",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Copy Independence Check",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Define a Student class with name and score fields. Construct Student clones with scores capped at score+5; return {\"original\":original_scores,\"copy\":clone_scores} to show original instances remain unchanged.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "{\"original\":[82,65,82],\"copy\":[87,70,87]}",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Construct Student clones with scores capped at score+5; return {\"original\":original_scores,\"copy\":clone_scores} to show original instances remain unchanged. Therefore the expected JSON output is {\"original\":[82,65,82],\"copy\":[87,70,87]}."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "{\"original\":[],\"copy\":[]}",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Construct Student clones with scores capped at score+5; return {\"original\":original_scores,\"copy\":clone_scores} to show original instances remain unchanged. Therefore the expected JSON output is {\"original\":[],\"copy\":[]}."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "{\"original\":[100],\"copy\":[100]}",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Construct Student clones with scores capped at score+5; return {\"original\":original_scores,\"copy\":clone_scores} to show original instances remain unchanged. Therefore the expected JSON output is {\"original\":[100],\"copy\":[100]}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "{\"original\":[82,65,82],\"copy\":[87,70,87]}"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "{\"original\":[],\"copy\":[]}"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "expectedOutput": "{\"original\":[100],\"copy\":[100]}"
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
    "id": "learn:oop-classes-objects:distinct-student-names",
    "bankId": "T22-Q17",
    "slug": "distinct-student-names",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Distinct Student Names",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Define a Student class with name and score fields. Return count of distinct name properties, not the number of objects.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "3",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return count of distinct name properties, not the number of objects. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "0",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return count of distinct name properties, not the number of objects. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "1",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Return count of distinct name properties, not the number of objects. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
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
    "id": "learn:oop-classes-objects:threshold-score-distance",
    "bankId": "T22-Q18",
    "slug": "threshold-score-distance",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Threshold Score Distance",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Define a Student class with name and score fields. Return an array score-threshold for each Student object; values may be negative.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "[12,-5,12]",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return an array score-threshold for each Student object; values may be negative. Therefore the expected JSON output is [12,-5,12]."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "[]",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return an array score-threshold for each Student object; values may be negative. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "[0]",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Return an array score-threshold for each Student object; values may be negative. Therefore the expected JSON output is [0]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "[12,-5,12]"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
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
      "java": "// Language: Java 17\n// Input is read from stdin; output must be printed as a valid JSON string.\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String raw = sc.hasNextLine() ? sc.nextLine().trim() : \"\";\n        if (raw.isEmpty()) return;\n\n        Object result = solve(raw);\n        System.out.println(result);\n    }\n\n    public static Object solve(String json) {\n        // TODO: Write your solution here using helper methods:\n        // getInt(json, key), getString(json, key), getIntList(json, key)\n        return null;\n    }\n\n    // --- JSON Helpers ---\n    public static String getString(String json, String key) {\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return \"\";\n        int c = json.indexOf(':', p);\n        if (c == -1) return \"\";\n        int start = c + 1;\n        while (start < json.length() && (json.charAt(start) == ' ' || json.charAt(start) == '\t')) start++;\n        if (start < json.length() && json.charAt(start) == '\"') {\n            int end = json.indexOf('\"', start + 1);\n            return end == -1 ? \"\" : json.substring(start + 1, end);\n        }\n        int end = start;\n        while (end < json.length() && json.charAt(end) != ',' && json.charAt(end) != '}') end++;\n        return json.substring(start, end).trim();\n    }\n\n    public static int getInt(String json, String key) {\n        String s = getString(json, key);\n        return s.isEmpty() ? 0 : Integer.parseInt(s);\n    }\n\n    public static List<Integer> getIntList(String json, String key) {\n        List<Integer> list = new ArrayList<>();\n        String pat = '\"' + key + '\"';\n        int p = json.indexOf(pat);\n        if (p == -1) return list;\n        int start = json.indexOf('[', p);\n        int end = json.indexOf(']', start);\n        if (start == -1 || end == -1) return list;\n        String content = json.substring(start + 1, end).trim();\n        if (content.isEmpty()) return list;\n        String[] tokens = content.split(\",\");\n        for (int i = 0; i < tokens.length; i++) {\n            list.add(Integer.parseInt(tokens[i].trim()));\n        }\n        return list;\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helpers ---\nstring extractField(const string& json, const string& key) {\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return \"\";\n    size_t c = json.find(':', p);\n    if (c == string::npos) return \"\";\n    size_t start = c + 1;\n    while (start < json.size() && (json[start] == ' ' || json[start] == '\t')) start++;\n    if (start < json.size() && json[start] == '\"') {\n        size_t end = json.find('\"', start + 1);\n        return end == string::npos ? \"\" : json.substr(start + 1, end - start - 1);\n    }\n    size_t end = start;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    size_t len = end - start;\n    while (len > 0 && isspace(json[start + len - 1])) len--;\n    return json.substr(start, len);\n}\n\nint extractInt(const string& json, const string& key) {\n    string val = extractField(json, key);\n    return val.empty() ? 0 : stoi(val);\n}\n\nvector<int> extractIntArray(const string& json, const string& key) {\n    vector<int> res;\n    string pat = '\"' + key + '\"';\n    size_t p = json.find(pat);\n    if (p == string::npos) return res;\n    size_t start = json.find('[', p);\n    size_t end = json.find(']', start);\n    if (start == string::npos || end == string::npos) return res;\n    string content = json.substr(start + 1, end - start - 1);\n    string token = \"\";\n    for (size_t i = 0; i <= content.size(); i++) {\n        if (i == content.size() || content[i] == ',') {\n            size_t s = 0;\n            while (s < token.size() && isspace(token[s])) s++;\n            size_t e = token.size();\n            while (e > s && isspace(token[e - 1])) e--;\n            if (e > s) {\n                res.push_back(stoi(token.substr(s, e - s)));\n            }\n            token = \"\";\n        } else {\n            token += content[i];\n        }\n    }\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:oop-classes-objects:sort-objects-by-distance-to-pass",
    "bankId": "T22-Q19",
    "slug": "sort-objects-by-distance-to-pass",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Sort Objects by Distance to Pass",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Define a Student class with name and score fields. Return names sorted by increasing abs(score-threshold), tie by score descending, then original index.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "[\"Bala\",\"Anu\",\"Charu\"]",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return names sorted by increasing abs(score-threshold), tie by score descending, then original index. Therefore the expected JSON output is [\"Bala\",\"Anu\",\"Charu\"]."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "[]",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return names sorted by increasing abs(score-threshold), tie by score descending, then original index. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "[\"A\"]",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Return names sorted by increasing abs(score-threshold), tie by score descending, then original index. Therefore the expected JSON output is [\"A\"]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "[\"Bala\",\"Anu\",\"Charu\"]"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "expectedOutput": "[\"A\"]"
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
    "id": "learn:oop-classes-objects:roster-grade-histogram",
    "bankId": "T22-Q20",
    "slug": "roster-grade-histogram",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Roster Grade Histogram",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Define a Student class with name and score fields. Return an object {\"A\":count,\"B\":count,\"C\":count,\"D\":count,\"F\":count} for all Student objects.",
    "inputFormat": "A single JSON object: {\"records\": array of {\"name\": string,\"score\": integer}, \"threshold\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(records) ≤ 10; 0 ≤ score,threshold ≤ 100; names are nonempty strings; names may repeat; each record denotes a separate Student object.",
    "examples": [
      {
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "output": "{\"A\":0,\"B\":2,\"C\":0,\"D\":1,\"F\":0}",
        "explanation": "Instantiate 3 Student objects with scores [82, 65, 82] and threshold 70. Define a Student class with name and score fields. Return an object {\"A\":count,\"B\":count,\"C\":count,\"D\":count,\"F\":count} for all Student objects. Therefore the expected JSON output is {\"A\":0,\"B\":2,\"C\":0,\"D\":1,\"F\":0}."
      },
      {
        "input": "{\"records\":[],\"threshold\":50}",
        "output": "{\"A\":0,\"B\":0,\"C\":0,\"D\":0,\"F\":0}",
        "explanation": "Instantiate 0 Student objects with scores [] and threshold 50. Define a Student class with name and score fields. Return an object {\"A\":count,\"B\":count,\"C\":count,\"D\":count,\"F\":count} for all Student objects. Therefore the expected JSON output is {\"A\":0,\"B\":0,\"C\":0,\"D\":0,\"F\":0}."
      },
      {
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "output": "{\"A\":1,\"B\":0,\"C\":0,\"D\":0,\"F\":0}",
        "explanation": "Instantiate 1 Student objects with scores [100] and threshold 100. Define a Student class with name and score fields. Return an object {\"A\":count,\"B\":count,\"C\":count,\"D\":count,\"F\":count} for all Student objects. Therefore the expected JSON output is {\"A\":1,\"B\":0,\"C\":0,\"D\":0,\"F\":0}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"records\":[{\"name\":\"Anu\",\"score\":82},{\"name\":\"Bala\",\"score\":65},{\"name\":\"Charu\",\"score\":82}],\"threshold\":70}",
        "expectedOutput": "{\"A\":0,\"B\":2,\"C\":0,\"D\":1,\"F\":0}"
      },
      {
        "testIndex": 2,
        "input": "{\"records\":[],\"threshold\":50}",
        "expectedOutput": "{\"A\":0,\"B\":0,\"C\":0,\"D\":0,\"F\":0}"
      },
      {
        "testIndex": 3,
        "input": "{\"records\":[{\"name\":\"A\",\"score\":100}],\"threshold\":100}",
        "expectedOutput": "{\"A\":1,\"B\":0,\"C\":0,\"D\":0,\"F\":0}"
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
