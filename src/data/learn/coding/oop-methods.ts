import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:oop-methods:counter-increment-and-decrement",
    "bankId": "T23-Q01",
    "slug": "counter-increment-and-decrement",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Counter Increment and Decrement",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Methods increment(v) and decrement(v) add/subtract v; return final integer counter.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['increment', 'decrement'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"increment\",\"value\":3},{\"method\":\"decrement\",\"value\":4},{\"method\":\"increment\",\"value\":2},{\"method\":\"decrement\",\"value\":1}]}",
        "output": "10",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('increment', 3), ('decrement', 4), ('increment', 2), ('decrement', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Methods increment(v) and decrement(v) add/subtract v; return final integer counter. Therefore the expected JSON output is 10."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "0",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Methods increment(v) and decrement(v) add/subtract v; return final integer counter. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"increment\",\"value\":1}]}",
        "output": "2",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('increment', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Methods increment(v) and decrement(v) add/subtract v; return final integer counter. Therefore the expected JSON output is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"increment\",\"value\":3},{\"method\":\"decrement\",\"value\":4},{\"method\":\"increment\",\"value\":2},{\"method\":\"decrement\",\"value\":1}]}",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"increment\",\"value\":1}]}",
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:oop-methods:bankaccount-deposit-and-withdraw",
    "bankId": "T23-Q02",
    "slug": "bankaccount-deposit-and-withdraw",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "BankAccount Deposit and Withdraw",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Methods deposit(v) always add v; withdraw(v) deducts only if balance≥v, otherwise increments rejected count. Return {\"balance\":...,\"rejected\":...}.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['deposit', 'withdraw'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"deposit\",\"value\":3},{\"method\":\"withdraw\",\"value\":4},{\"method\":\"deposit\",\"value\":2},{\"method\":\"withdraw\",\"value\":1}]}",
        "output": "{\"balance\":10,\"rejected\":0}",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('deposit', 3), ('withdraw', 4), ('deposit', 2), ('withdraw', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Methods deposit(v) always add v; withdraw(v) deducts only if balance≥v, otherwise increments rejected count. Return {\"balance\":...,\"rejected\":...}. Therefore the expected JSON output is {\"balance\":10,\"rejected\":0}."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "{\"balance\":0,\"rejected\":0}",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Methods deposit(v) always add v; withdraw(v) deducts only if balance≥v, otherwise increments rejected count. Return {\"balance\":...,\"rejected\":...}. Therefore the expected JSON output is {\"balance\":0,\"rejected\":0}."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"deposit\",\"value\":1}]}",
        "output": "{\"balance\":2,\"rejected\":0}",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('deposit', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Methods deposit(v) always add v; withdraw(v) deducts only if balance≥v, otherwise increments rejected count. Return {\"balance\":...,\"rejected\":...}. Therefore the expected JSON output is {\"balance\":2,\"rejected\":0}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"deposit\",\"value\":3},{\"method\":\"withdraw\",\"value\":4},{\"method\":\"deposit\",\"value\":2},{\"method\":\"withdraw\",\"value\":1}]}",
        "expectedOutput": "{\"balance\":10,\"rejected\":0}"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "{\"balance\":0,\"rejected\":0}"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"deposit\",\"value\":1}]}",
        "expectedOutput": "{\"balance\":2,\"rejected\":0}"
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
    "id": "learn:oop-methods:stack-push-and-pop",
    "bankId": "T23-Q03",
    "slug": "stack-push-and-pop",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Stack Push and Pop",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize stack to [initial]. push(v) appends, pop() removes and reports last entry or null when empty. Return {\"items\":remaining_stack,\"popped\":results}.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['push', 'pop'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"push\",\"value\":3},{\"method\":\"pop\",\"value\":4},{\"method\":\"push\",\"value\":2},{\"method\":\"pop\",\"value\":1}]}",
        "output": "{\"items\":[10],\"popped\":[3,2]}",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('push', 3), ('pop', 4), ('push', 2), ('pop', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize stack to [initial]. push(v) appends, pop() removes and reports last entry or null when empty. Return {\"items\":remaining_stack,\"popped\":results}. Therefore the expected JSON output is {\"items\":[10],\"popped\":[3,2]}."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "{\"items\":[0],\"popped\":[]}",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize stack to [initial]. push(v) appends, pop() removes and reports last entry or null when empty. Return {\"items\":remaining_stack,\"popped\":results}. Therefore the expected JSON output is {\"items\":[0],\"popped\":[]}."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"push\",\"value\":1}]}",
        "output": "{\"items\":[1,1],\"popped\":[]}",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('push', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize stack to [initial]. push(v) appends, pop() removes and reports last entry or null when empty. Return {\"items\":remaining_stack,\"popped\":results}. Therefore the expected JSON output is {\"items\":[1,1],\"popped\":[]}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"push\",\"value\":3},{\"method\":\"pop\",\"value\":4},{\"method\":\"push\",\"value\":2},{\"method\":\"pop\",\"value\":1}]}",
        "expectedOutput": "{\"items\":[10],\"popped\":[3,2]}"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "{\"items\":[0],\"popped\":[]}"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"push\",\"value\":1}]}",
        "expectedOutput": "{\"items\":[1,1],\"popped\":[]}"
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
    "id": "learn:oop-methods:queue-enqueue-and-dequeue",
    "bankId": "T23-Q04",
    "slug": "queue-enqueue-and-dequeue",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Queue Enqueue and Dequeue",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize queue to [initial]. enqueue(v) adds at tail, dequeue() removes head or reports null when empty. Return {\"queue\":...,\"dequeued\":...}.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['enqueue', 'dequeue'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"enqueue\",\"value\":3},{\"method\":\"dequeue\",\"value\":4},{\"method\":\"enqueue\",\"value\":2},{\"method\":\"dequeue\",\"value\":1}]}",
        "output": "{\"queue\":[2],\"dequeued\":[10,3]}",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('enqueue', 3), ('dequeue', 4), ('enqueue', 2), ('dequeue', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize queue to [initial]. enqueue(v) adds at tail, dequeue() removes head or reports null when empty. Return {\"queue\":...,\"dequeued\":...}. Therefore the expected JSON output is {\"queue\":[2],\"dequeued\":[10,3]}."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "{\"queue\":[0],\"dequeued\":[]}",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize queue to [initial]. enqueue(v) adds at tail, dequeue() removes head or reports null when empty. Return {\"queue\":...,\"dequeued\":...}. Therefore the expected JSON output is {\"queue\":[0],\"dequeued\":[]}."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"enqueue\",\"value\":1}]}",
        "output": "{\"queue\":[1,1],\"dequeued\":[]}",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('enqueue', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize queue to [initial]. enqueue(v) adds at tail, dequeue() removes head or reports null when empty. Return {\"queue\":...,\"dequeued\":...}. Therefore the expected JSON output is {\"queue\":[1,1],\"dequeued\":[]}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"enqueue\",\"value\":3},{\"method\":\"dequeue\",\"value\":4},{\"method\":\"enqueue\",\"value\":2},{\"method\":\"dequeue\",\"value\":1}]}",
        "expectedOutput": "{\"queue\":[2],\"dequeued\":[10,3]}"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "{\"queue\":[0],\"dequeued\":[]}"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"enqueue\",\"value\":1}]}",
        "expectedOutput": "{\"queue\":[1,1],\"dequeued\":[]}"
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
    "id": "learn:oop-methods:inventory-restock-and-sell",
    "bankId": "T23-Q05",
    "slug": "inventory-restock-and-sell",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Inventory Restock and Sell",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. restock(v) adds inventory. sell(v) ships min(v,stock) and accumulates unfilled units. Return {\"stock\":... ,\"unfilled_units\":...}.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['restock', 'sell'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"restock\",\"value\":3},{\"method\":\"sell\",\"value\":4},{\"method\":\"restock\",\"value\":2},{\"method\":\"sell\",\"value\":1}]}",
        "output": "{\"stock\":10,\"unfilled_units\":0}",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('restock', 3), ('sell', 4), ('restock', 2), ('sell', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. restock(v) adds inventory. sell(v) ships min(v,stock) and accumulates unfilled units. Return {\"stock\":... ,\"unfilled_units\":...}. Therefore the expected JSON output is {\"stock\":10,\"unfilled_units\":0}."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "{\"stock\":0,\"unfilled_units\":0}",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. restock(v) adds inventory. sell(v) ships min(v,stock) and accumulates unfilled units. Return {\"stock\":... ,\"unfilled_units\":...}. Therefore the expected JSON output is {\"stock\":0,\"unfilled_units\":0}."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"restock\",\"value\":1}]}",
        "output": "{\"stock\":2,\"unfilled_units\":0}",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('restock', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. restock(v) adds inventory. sell(v) ships min(v,stock) and accumulates unfilled units. Return {\"stock\":... ,\"unfilled_units\":...}. Therefore the expected JSON output is {\"stock\":2,\"unfilled_units\":0}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"restock\",\"value\":3},{\"method\":\"sell\",\"value\":4},{\"method\":\"restock\",\"value\":2},{\"method\":\"sell\",\"value\":1}]}",
        "expectedOutput": "{\"stock\":10,\"unfilled_units\":0}"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "{\"stock\":0,\"unfilled_units\":0}"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"restock\",\"value\":1}]}",
        "expectedOutput": "{\"stock\":2,\"unfilled_units\":0}"
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
    "id": "learn:oop-methods:lamp-toggle-and-explicit-states",
    "bankId": "T23-Q06",
    "slug": "lamp-toggle-and-explicit-states",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Lamp Toggle and Explicit States",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Lamp starts ON for odd initial, OFF for even. toggle() inverts, turn_on() sets ON, turn_off() sets OFF; return final Boolean.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['toggle', 'turn_on', 'turn_off'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"toggle\",\"value\":3},{\"method\":\"turn_on\",\"value\":4},{\"method\":\"turn_off\",\"value\":2},{\"method\":\"toggle\",\"value\":1}]}",
        "output": "true",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('toggle', 3), ('turn_on', 4), ('turn_off', 2), ('toggle', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Lamp starts ON for odd initial, OFF for even. toggle() inverts, turn_on() sets ON, turn_off() sets OFF; return final Boolean. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "false",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Lamp starts ON for odd initial, OFF for even. toggle() inverts, turn_on() sets ON, turn_off() sets OFF; return final Boolean. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"turn_off\",\"value\":1}]}",
        "output": "false",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('turn_off', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Lamp starts ON for odd initial, OFF for even. toggle() inverts, turn_on() sets ON, turn_off() sets OFF; return final Boolean. Therefore the expected JSON output is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"toggle\",\"value\":3},{\"method\":\"turn_on\",\"value\":4},{\"method\":\"turn_off\",\"value\":2},{\"method\":\"toggle\",\"value\":1}]}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"turn_off\",\"value\":1}]}",
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
    "id": "learn:oop-methods:thermometer-methods",
    "bankId": "T23-Q07",
    "slug": "thermometer-methods",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Thermometer Methods",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Temperature starts at initial Celsius. raise_c(v) increases, lower_c(v) decreases. Return {\"celsius\":C,\"fahrenheit_x5\":9*C+160}, i.e. 5 times Fahrenheit.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['raise_c', 'lower_c'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"raise_c\",\"value\":3},{\"method\":\"lower_c\",\"value\":4},{\"method\":\"raise_c\",\"value\":2},{\"method\":\"lower_c\",\"value\":1}]}",
        "output": "{\"celsius\":10,\"fahrenheit_x5\":250}",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('raise_c', 3), ('lower_c', 4), ('raise_c', 2), ('lower_c', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Temperature starts at initial Celsius. raise_c(v) increases, lower_c(v) decreases. Return {\"celsius\":C,\"fahrenheit_x5\":9*C+160}, i.e. 5 times Fahrenheit. Therefore the expected JSON output is {\"celsius\":10,\"fahrenheit_x5\":250}."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "{\"celsius\":0,\"fahrenheit_x5\":160}",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Temperature starts at initial Celsius. raise_c(v) increases, lower_c(v) decreases. Return {\"celsius\":C,\"fahrenheit_x5\":9*C+160}, i.e. 5 times Fahrenheit. Therefore the expected JSON output is {\"celsius\":0,\"fahrenheit_x5\":160}."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"raise_c\",\"value\":1}]}",
        "output": "{\"celsius\":2,\"fahrenheit_x5\":178}",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('raise_c', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Temperature starts at initial Celsius. raise_c(v) increases, lower_c(v) decreases. Return {\"celsius\":C,\"fahrenheit_x5\":9*C+160}, i.e. 5 times Fahrenheit. Therefore the expected JSON output is {\"celsius\":2,\"fahrenheit_x5\":178}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"raise_c\",\"value\":3},{\"method\":\"lower_c\",\"value\":4},{\"method\":\"raise_c\",\"value\":2},{\"method\":\"lower_c\",\"value\":1}]}",
        "expectedOutput": "{\"celsius\":10,\"fahrenheit_x5\":250}"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "{\"celsius\":0,\"fahrenheit_x5\":160}"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"raise_c\",\"value\":1}]}",
        "expectedOutput": "{\"celsius\":2,\"fahrenheit_x5\":178}"
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
    "id": "learn:oop-methods:shopping-cart-item-methods",
    "bankId": "T23-Q08",
    "slug": "shopping-cart-item-methods",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Shopping Cart Item Methods",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize cart with one item whose ID is initial. add_item(v) adds one unit of ID v; remove_item(v) removes one if present. Return sorted item ID string keys to remaining quantities.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['add_item', 'remove_item'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"add_item\",\"value\":3},{\"method\":\"remove_item\",\"value\":4},{\"method\":\"add_item\",\"value\":2},{\"method\":\"remove_item\",\"value\":1}]}",
        "output": "{\"2\":1,\"3\":1,\"10\":1}",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('add_item', 3), ('remove_item', 4), ('add_item', 2), ('remove_item', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize cart with one item whose ID is initial. add_item(v) adds one unit of ID v; remove_item(v) removes one if present. Return sorted item ID string keys to remaining quantities. Therefore the expected JSON output is {\"2\":1,\"3\":1,\"10\":1}."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "{\"0\":1}",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize cart with one item whose ID is initial. add_item(v) adds one unit of ID v; remove_item(v) removes one if present. Return sorted item ID string keys to remaining quantities. Therefore the expected JSON output is {\"0\":1}."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"add_item\",\"value\":1}]}",
        "output": "{\"1\":2}",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('add_item', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize cart with one item whose ID is initial. add_item(v) adds one unit of ID v; remove_item(v) removes one if present. Return sorted item ID string keys to remaining quantities. Therefore the expected JSON output is {\"1\":2}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"add_item\",\"value\":3},{\"method\":\"remove_item\",\"value\":4},{\"method\":\"add_item\",\"value\":2},{\"method\":\"remove_item\",\"value\":1}]}",
        "expectedOutput": "{\"2\":1,\"3\":1,\"10\":1}"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "{\"0\":1}"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"add_item\",\"value\":1}]}",
        "expectedOutput": "{\"1\":2}"
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
    "id": "learn:oop-methods:unique-collection-methods",
    "bankId": "T23-Q09",
    "slug": "unique-collection-methods",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Unique Collection Methods",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize a set with initial. add(v) inserts; remove(v) discards without error if absent. Return sorted set elements.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['add', 'remove'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"add\",\"value\":3},{\"method\":\"remove\",\"value\":4},{\"method\":\"add\",\"value\":2},{\"method\":\"remove\",\"value\":1}]}",
        "output": "[2,3,10]",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('add', 3), ('remove', 4), ('add', 2), ('remove', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize a set with initial. add(v) inserts; remove(v) discards without error if absent. Return sorted set elements. Therefore the expected JSON output is [2,3,10]."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "[0]",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize a set with initial. add(v) inserts; remove(v) discards without error if absent. Return sorted set elements. Therefore the expected JSON output is [0]."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"add\",\"value\":1}]}",
        "output": "[1]",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('add', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize a set with initial. add(v) inserts; remove(v) discards without error if absent. Return sorted set elements. Therefore the expected JSON output is [1]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"add\",\"value\":3},{\"method\":\"remove\",\"value\":4},{\"method\":\"add\",\"value\":2},{\"method\":\"remove\",\"value\":1}]}",
        "expectedOutput": "[2,3,10]"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "[0]"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"add\",\"value\":1}]}",
        "expectedOutput": "[1]"
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
    "id": "learn:oop-methods:undoable-calculator",
    "bankId": "T23-Q10",
    "slug": "undoable-calculator",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Undoable Calculator",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Methods add(v), subtract(v) save a previous-state snapshot and update value; undo() restores the most recent snapshot if any. Return {\"value\":...,\"undo_depth\":remaining_snapshots}.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['add', 'subtract', 'undo'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"add\",\"value\":3},{\"method\":\"subtract\",\"value\":4},{\"method\":\"undo\",\"value\":2},{\"method\":\"add\",\"value\":1}]}",
        "output": "{\"value\":14,\"undo_depth\":2}",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('add', 3), ('subtract', 4), ('undo', 2), ('add', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Methods add(v), subtract(v) save a previous-state snapshot and update value; undo() restores the most recent snapshot if any. Return {\"value\":...,\"undo_depth\":remaining_snapshots}. Therefore the expected JSON output is {\"value\":14,\"undo_depth\":2}."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "{\"value\":0,\"undo_depth\":0}",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Methods add(v), subtract(v) save a previous-state snapshot and update value; undo() restores the most recent snapshot if any. Return {\"value\":...,\"undo_depth\":remaining_snapshots}. Therefore the expected JSON output is {\"value\":0,\"undo_depth\":0}."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"undo\",\"value\":1}]}",
        "output": "{\"value\":1,\"undo_depth\":0}",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('undo', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Methods add(v), subtract(v) save a previous-state snapshot and update value; undo() restores the most recent snapshot if any. Return {\"value\":...,\"undo_depth\":remaining_snapshots}. Therefore the expected JSON output is {\"value\":1,\"undo_depth\":0}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"add\",\"value\":3},{\"method\":\"subtract\",\"value\":4},{\"method\":\"undo\",\"value\":2},{\"method\":\"add\",\"value\":1}]}",
        "expectedOutput": "{\"value\":14,\"undo_depth\":2}"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "{\"value\":0,\"undo_depth\":0}"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"undo\",\"value\":1}]}",
        "expectedOutput": "{\"value\":1,\"undo_depth\":0}"
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
    "id": "learn:oop-methods:clamped-gradebook-score",
    "bankId": "T23-Q11",
    "slug": "clamped-gradebook-score",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Clamped GradeBook Score",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Start at initial score; award(v) adds and penalty(v) subtracts, clamping into [0,100] after every method call; return final score.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['award', 'penalty'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"award\",\"value\":3},{\"method\":\"penalty\",\"value\":4},{\"method\":\"award\",\"value\":2},{\"method\":\"penalty\",\"value\":1}]}",
        "output": "10",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('award', 3), ('penalty', 4), ('award', 2), ('penalty', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Start at initial score; award(v) adds and penalty(v) subtracts, clamping into [0,100] after every method call; return final score. Therefore the expected JSON output is 10."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "0",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Start at initial score; award(v) adds and penalty(v) subtracts, clamping into [0,100] after every method call; return final score. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"award\",\"value\":1}]}",
        "output": "2",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('award', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Start at initial score; award(v) adds and penalty(v) subtracts, clamping into [0,100] after every method call; return final score. Therefore the expected JSON output is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"award\",\"value\":3},{\"method\":\"penalty\",\"value\":4},{\"method\":\"award\",\"value\":2},{\"method\":\"penalty\",\"value\":1}]}",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"award\",\"value\":1}]}",
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:oop-methods:digitalclock-time-methods",
    "bankId": "T23-Q12",
    "slug": "digitalclock-time-methods",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "DigitalClock Time Methods",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Treat initial as minutes since midnight. forward(v) advances v minutes, back(v) rewinds v; wrap modulo 1440. Return hour and minute in 24h time.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['forward', 'back'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"forward\",\"value\":3},{\"method\":\"back\",\"value\":4},{\"method\":\"forward\",\"value\":2},{\"method\":\"back\",\"value\":1}]}",
        "output": "{\"hour\":0,\"minute\":10}",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('forward', 3), ('back', 4), ('forward', 2), ('back', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Treat initial as minutes since midnight. forward(v) advances v minutes, back(v) rewinds v; wrap modulo 1440. Return hour and minute in 24h time. Therefore the expected JSON output is {\"hour\":0,\"minute\":10}."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "{\"hour\":0,\"minute\":0}",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Treat initial as minutes since midnight. forward(v) advances v minutes, back(v) rewinds v; wrap modulo 1440. Return hour and minute in 24h time. Therefore the expected JSON output is {\"hour\":0,\"minute\":0}."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"forward\",\"value\":1}]}",
        "output": "{\"hour\":0,\"minute\":2}",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('forward', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Treat initial as minutes since midnight. forward(v) advances v minutes, back(v) rewinds v; wrap modulo 1440. Return hour and minute in 24h time. Therefore the expected JSON output is {\"hour\":0,\"minute\":2}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"forward\",\"value\":3},{\"method\":\"back\",\"value\":4},{\"method\":\"forward\",\"value\":2},{\"method\":\"back\",\"value\":1}]}",
        "expectedOutput": "{\"hour\":0,\"minute\":10}"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "{\"hour\":0,\"minute\":0}"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"forward\",\"value\":1}]}",
        "expectedOutput": "{\"hour\":0,\"minute\":2}"
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
    "id": "learn:oop-methods:stringbuilder-append-and-delete",
    "bankId": "T23-Q13",
    "slug": "stringbuilder-append-and-delete",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "StringBuilder Append and Delete",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Start text=str(initial). append_digit(v) appends the last decimal digit of v; delete_last() removes final character if any. Return resulting string.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['append_digit', 'delete_last'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"append_digit\",\"value\":3},{\"method\":\"delete_last\",\"value\":4},{\"method\":\"append_digit\",\"value\":2},{\"method\":\"delete_last\",\"value\":1}]}",
        "output": "10",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('append_digit', 3), ('delete_last', 4), ('append_digit', 2), ('delete_last', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Start text=str(initial). append_digit(v) appends the last decimal digit of v; delete_last() removes final character if any. Return resulting string. Therefore the expected JSON output is \"10\"."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "0",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Start text=str(initial). append_digit(v) appends the last decimal digit of v; delete_last() removes final character if any. Return resulting string. Therefore the expected JSON output is \"0\"."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"append_digit\",\"value\":1}]}",
        "output": "11",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('append_digit', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Start text=str(initial). append_digit(v) appends the last decimal digit of v; delete_last() removes final character if any. Return resulting string. Therefore the expected JSON output is \"11\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"append_digit\",\"value\":3},{\"method\":\"delete_last\",\"value\":4},{\"method\":\"append_digit\",\"value\":2},{\"method\":\"delete_last\",\"value\":1}]}",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"append_digit\",\"value\":1}]}",
        "expectedOutput": "11"
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
    "id": "learn:oop-methods:priorityqueue-min-methods",
    "bankId": "T23-Q14",
    "slug": "priorityqueue-min-methods",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "PriorityQueue Min Methods",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize a min-priority queue with initial. insert(v) adds; extract_min() removes smallest or returns null if empty. Return {\"sorted_items\":...,\"removed_mins\":...}.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['insert', 'extract_min'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"insert\",\"value\":3},{\"method\":\"extract_min\",\"value\":4},{\"method\":\"insert\",\"value\":2},{\"method\":\"extract_min\",\"value\":1}]}",
        "output": "{\"sorted_items\":[10],\"removed_mins\":[3,2]}",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('insert', 3), ('extract_min', 4), ('insert', 2), ('extract_min', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize a min-priority queue with initial. insert(v) adds; extract_min() removes smallest or returns null if empty. Return {\"sorted_items\":...,\"removed_mins\":...}. Therefore the expected JSON output is {\"sorted_items\":[10],\"removed_mins\":[3,2]}."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "{\"sorted_items\":[0],\"removed_mins\":[]}",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize a min-priority queue with initial. insert(v) adds; extract_min() removes smallest or returns null if empty. Return {\"sorted_items\":...,\"removed_mins\":...}. Therefore the expected JSON output is {\"sorted_items\":[0],\"removed_mins\":[]}."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"insert\",\"value\":1}]}",
        "output": "{\"sorted_items\":[1,1],\"removed_mins\":[]}",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('insert', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize a min-priority queue with initial. insert(v) adds; extract_min() removes smallest or returns null if empty. Return {\"sorted_items\":...,\"removed_mins\":...}. Therefore the expected JSON output is {\"sorted_items\":[1,1],\"removed_mins\":[]}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"insert\",\"value\":3},{\"method\":\"extract_min\",\"value\":4},{\"method\":\"insert\",\"value\":2},{\"method\":\"extract_min\",\"value\":1}]}",
        "expectedOutput": "{\"sorted_items\":[10],\"removed_mins\":[3,2]}"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "{\"sorted_items\":[0],\"removed_mins\":[]}"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"insert\",\"value\":1}]}",
        "expectedOutput": "{\"sorted_items\":[1,1],\"removed_mins\":[]}"
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
    "id": "learn:oop-methods:accumulator-add-multiply-reset",
    "bankId": "T23-Q15",
    "slug": "accumulator-add-multiply-reset",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Accumulator Add Multiply Reset",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Use object methods add(v), multiply(v), reset() setting state to zero; return final state.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['add', 'multiply', 'reset'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"add\",\"value\":3},{\"method\":\"multiply\",\"value\":4},{\"method\":\"reset\",\"value\":2},{\"method\":\"add\",\"value\":1}]}",
        "output": "1",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('add', 3), ('multiply', 4), ('reset', 2), ('add', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Use object methods add(v), multiply(v), reset() setting state to zero; return final state. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "0",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Use object methods add(v), multiply(v), reset() setting state to zero; return final state. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"initial\":20,\"commands\":[{\"method\":\"multiply\",\"value\":12},{\"method\":\"reset\",\"value\":7},{\"method\":\"add\",\"value\":15}]}",
        "output": "15",
        "explanation": "Construct the object with initial state 20, then dispatch the ordered methods [('multiply', 12), ('reset', 7), ('add', 15)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Use object methods add(v), multiply(v), reset() setting state to zero; return final state. Therefore the expected JSON output is 15."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"add\",\"value\":3},{\"method\":\"multiply\",\"value\":4},{\"method\":\"reset\",\"value\":2},{\"method\":\"add\",\"value\":1}]}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":20,\"commands\":[{\"method\":\"multiply\",\"value\":12},{\"method\":\"reset\",\"value\":7},{\"method\":\"add\",\"value\":15}]}",
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
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:oop-methods:seat-reservation-object",
    "bankId": "T23-Q16",
    "slug": "seat-reservation-object",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Seat Reservation Object",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Venue capacity=20, initially initial seats reserved. reserve(v) succeeds only if within capacity (otherwise count one rejected command); cancel(v) reduces reserved by min(v,reserved). Return {\"reserved\":...,\"rejected\":...}.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['reserve', 'cancel'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"reserve\",\"value\":3},{\"method\":\"cancel\",\"value\":4},{\"method\":\"reserve\",\"value\":2},{\"method\":\"cancel\",\"value\":1}]}",
        "output": "{\"reserved\":10,\"rejected\":0}",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('reserve', 3), ('cancel', 4), ('reserve', 2), ('cancel', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Venue capacity=20, initially initial seats reserved. reserve(v) succeeds only if within capacity (otherwise count one rejected command); cancel(v) reduces reserved by min(v,reserved). Return {\"reserved\":...,\"rejected\":...}. Therefore the expected JSON output is {\"reserved\":10,\"rejected\":0}."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "{\"reserved\":0,\"rejected\":0}",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Venue capacity=20, initially initial seats reserved. reserve(v) succeeds only if within capacity (otherwise count one rejected command); cancel(v) reduces reserved by min(v,reserved). Return {\"reserved\":...,\"rejected\":...}. Therefore the expected JSON output is {\"reserved\":0,\"rejected\":0}."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"reserve\",\"value\":1}]}",
        "output": "{\"reserved\":2,\"rejected\":0}",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('reserve', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Venue capacity=20, initially initial seats reserved. reserve(v) succeeds only if within capacity (otherwise count one rejected command); cancel(v) reduces reserved by min(v,reserved). Return {\"reserved\":...,\"rejected\":...}. Therefore the expected JSON output is {\"reserved\":2,\"rejected\":0}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"reserve\",\"value\":3},{\"method\":\"cancel\",\"value\":4},{\"method\":\"reserve\",\"value\":2},{\"method\":\"cancel\",\"value\":1}]}",
        "expectedOutput": "{\"reserved\":10,\"rejected\":0}"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "{\"reserved\":0,\"rejected\":0}"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"reserve\",\"value\":1}]}",
        "expectedOutput": "{\"reserved\":2,\"rejected\":0}"
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
    "id": "learn:oop-methods:circular-playlist-cursor-methods",
    "bankId": "T23-Q17",
    "slug": "circular-playlist-cursor-methods",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Circular Playlist Cursor Methods",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. A playlist has length=initial%5+1, initial cursor zero. next(v) moves forward v; previous(v) backward v with wraparound. Return length and final cursor.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['next', 'previous'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"next\",\"value\":3},{\"method\":\"previous\",\"value\":4},{\"method\":\"next\",\"value\":2},{\"method\":\"previous\",\"value\":1}]}",
        "output": "{\"length\":1,\"cursor\":0}",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('next', 3), ('previous', 4), ('next', 2), ('previous', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. A playlist has length=initial%5+1, initial cursor zero. next(v) moves forward v; previous(v) backward v with wraparound. Return length and final cursor. Therefore the expected JSON output is {\"length\":1,\"cursor\":0}."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"next\",\"value\":1}]}",
        "output": "{\"length\":2,\"cursor\":1}",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('next', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. A playlist has length=initial%5+1, initial cursor zero. next(v) moves forward v; previous(v) backward v with wraparound. Return length and final cursor. Therefore the expected JSON output is {\"length\":2,\"cursor\":1}."
      },
      {
        "input": "{\"initial\":8,\"commands\":[{\"method\":\"previous\",\"value\":2},{\"method\":\"next\",\"value\":2},{\"method\":\"previous\",\"value\":2},{\"method\":\"next\",\"value\":2},{\"method\":\"previous\",\"value\":2}]}",
        "output": "{\"length\":4,\"cursor\":2}",
        "explanation": "Construct the object with initial state 8, then dispatch the ordered methods [('previous', 2), ('next', 2), ('previous', 2), ('next', 2), ('previous', 2)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. A playlist has length=initial%5+1, initial cursor zero. next(v) moves forward v; previous(v) backward v with wraparound. Return length and final cursor. Therefore the expected JSON output is {\"length\":4,\"cursor\":2}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"next\",\"value\":3},{\"method\":\"previous\",\"value\":4},{\"method\":\"next\",\"value\":2},{\"method\":\"previous\",\"value\":1}]}",
        "expectedOutput": "{\"length\":1,\"cursor\":0}"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"next\",\"value\":1}]}",
        "expectedOutput": "{\"length\":2,\"cursor\":1}"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":8,\"commands\":[{\"method\":\"previous\",\"value\":2},{\"method\":\"next\",\"value\":2},{\"method\":\"previous\",\"value\":2},{\"method\":\"next\",\"value\":2},{\"method\":\"previous\",\"value\":2}]}",
        "expectedOutput": "{\"length\":4,\"cursor\":2}"
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
    "id": "learn:oop-methods:flagregister-bit-methods",
    "bankId": "T23-Q18",
    "slug": "flagregister-bit-methods",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "FlagRegister Bit Methods",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize an 8-bit register to initial%256. set_bit(v),clear_bit(v),toggle_bit(v) act on bit index v%8. Return final unsigned byte.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['set_bit', 'clear_bit', 'toggle_bit'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"set_bit\",\"value\":3},{\"method\":\"clear_bit\",\"value\":4},{\"method\":\"toggle_bit\",\"value\":2},{\"method\":\"set_bit\",\"value\":1}]}",
        "output": "14",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('set_bit', 3), ('clear_bit', 4), ('toggle_bit', 2), ('set_bit', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize an 8-bit register to initial%256. set_bit(v),clear_bit(v),toggle_bit(v) act on bit index v%8. Return final unsigned byte. Therefore the expected JSON output is 14."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "0",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize an 8-bit register to initial%256. set_bit(v),clear_bit(v),toggle_bit(v) act on bit index v%8. Return final unsigned byte. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"toggle_bit\",\"value\":1}]}",
        "output": "3",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('toggle_bit', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Initialize an 8-bit register to initial%256. set_bit(v),clear_bit(v),toggle_bit(v) act on bit index v%8. Return final unsigned byte. Therefore the expected JSON output is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"set_bit\",\"value\":3},{\"method\":\"clear_bit\",\"value\":4},{\"method\":\"toggle_bit\",\"value\":2},{\"method\":\"set_bit\",\"value\":1}]}",
        "expectedOutput": "14"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"toggle_bit\",\"value\":1}]}",
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
    "id": "learn:oop-methods:robot-2d-movement-methods",
    "bankId": "T23-Q19",
    "slug": "robot-2d-movement-methods",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Robot 2D Movement Methods",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Robot starts at (initial,0); east(v),west(v),north(v),south(v) update integer position; return {\"x\":...,\"y\":...}.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['east', 'north', 'west', 'south'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"east\",\"value\":3},{\"method\":\"north\",\"value\":4},{\"method\":\"west\",\"value\":2},{\"method\":\"south\",\"value\":1}]}",
        "output": "{\"x\":11,\"y\":3}",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('east', 3), ('north', 4), ('west', 2), ('south', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Robot starts at (initial,0); east(v),west(v),north(v),south(v) update integer position; return {\"x\":...,\"y\":...}. Therefore the expected JSON output is {\"x\":11,\"y\":3}."
      },
      {
        "input": "{\"initial\":0,\"commands\":[]}",
        "output": "{\"x\":0,\"y\":0}",
        "explanation": "Construct the object with initial state 0, then dispatch the ordered methods []. Create an object, initialize it from initial, implement its named methods, apply commands in order. Robot starts at (initial,0); east(v),west(v),north(v),south(v) update integer position; return {\"x\":...,\"y\":...}. Therefore the expected JSON output is {\"x\":0,\"y\":0}."
      },
      {
        "input": "{\"initial\":5,\"commands\":[{\"method\":\"south\",\"value\":0},{\"method\":\"east\",\"value\":0},{\"method\":\"north\",\"value\":0}]}",
        "output": "{\"x\":5,\"y\":0}",
        "explanation": "Construct the object with initial state 5, then dispatch the ordered methods [('south', 0), ('east', 0), ('north', 0)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Robot starts at (initial,0); east(v),west(v),north(v),south(v) update integer position; return {\"x\":...,\"y\":...}. Therefore the expected JSON output is {\"x\":5,\"y\":0}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"east\",\"value\":3},{\"method\":\"north\",\"value\":4},{\"method\":\"west\",\"value\":2},{\"method\":\"south\",\"value\":1}]}",
        "expectedOutput": "{\"x\":11,\"y\":3}"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":0,\"commands\":[]}",
        "expectedOutput": "{\"x\":0,\"y\":0}"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":5,\"commands\":[{\"method\":\"south\",\"value\":0},{\"method\":\"east\",\"value\":0},{\"method\":\"north\",\"value\":0}]}",
        "expectedOutput": "{\"x\":5,\"y\":0}"
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
    "id": "learn:oop-methods:door-state-machine-methods",
    "bankId": "T23-Q20",
    "slug": "door-state-machine-methods",
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Door State Machine Methods",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Create an object, initialize it from initial, implement its named methods, apply commands in order. Door begins open if initial odd, else closed. open() disallowed when locked; close() disallowed when locked; lock() requires closed; unlock() requires locked and changes to closed. Count unsuccessful calls, return {\"state\":...,\"invalid_actions\":...}.",
    "inputFormat": "A single JSON object: {\"initial\": integer, \"commands\": ordered array of {\"method\": allowed method name,\"value\": integer}}; allowed methods are ['open', 'close', 'lock', 'unlock'].",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ initial ≤ 20; 0 ≤ command.value ≤ 20; 0 ≤ number of commands ≤ 7; execute commands in order; arguments are ignored for methods described as argument-free.",
    "examples": [
      {
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"open\",\"value\":3},{\"method\":\"close\",\"value\":4},{\"method\":\"lock\",\"value\":2},{\"method\":\"unlock\",\"value\":1}]}",
        "output": "{\"state\":\"closed\",\"invalid_actions\":0}",
        "explanation": "Construct the object with initial state 10, then dispatch the ordered methods [('open', 3), ('close', 4), ('lock', 2), ('unlock', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Door begins open if initial odd, else closed. open() disallowed when locked; close() disallowed when locked; lock() requires closed; unlock() requires locked and changes to closed. Count unsuccessful calls, return {\"state\":...,\"invalid_actions\":...}. Therefore the expected JSON output is {\"state\":\"closed\",\"invalid_actions\":0}."
      },
      {
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"lock\",\"value\":1}]}",
        "output": "{\"state\":\"open\",\"invalid_actions\":1}",
        "explanation": "Construct the object with initial state 1, then dispatch the ordered methods [('lock', 1)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Door begins open if initial odd, else closed. open() disallowed when locked; close() disallowed when locked; lock() requires closed; unlock() requires locked and changes to closed. Count unsuccessful calls, return {\"state\":...,\"invalid_actions\":...}. Therefore the expected JSON output is {\"state\":\"open\",\"invalid_actions\":1}."
      },
      {
        "input": "{\"initial\":5,\"commands\":[{\"method\":\"unlock\",\"value\":0},{\"method\":\"open\",\"value\":0},{\"method\":\"close\",\"value\":0}]}",
        "output": "{\"state\":\"closed\",\"invalid_actions\":1}",
        "explanation": "Construct the object with initial state 5, then dispatch the ordered methods [('unlock', 0), ('open', 0), ('close', 0)]. Create an object, initialize it from initial, implement its named methods, apply commands in order. Door begins open if initial odd, else closed. open() disallowed when locked; close() disallowed when locked; lock() requires closed; unlock() requires locked and changes to closed. Count unsuccessful calls, return {\"state\":...,\"invalid_actions\":...}. Therefore the expected JSON output is {\"state\":\"closed\",\"invalid_actions\":1}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"initial\":10,\"commands\":[{\"method\":\"open\",\"value\":3},{\"method\":\"close\",\"value\":4},{\"method\":\"lock\",\"value\":2},{\"method\":\"unlock\",\"value\":1}]}",
        "expectedOutput": "{\"state\":\"closed\",\"invalid_actions\":0}"
      },
      {
        "testIndex": 2,
        "input": "{\"initial\":1,\"commands\":[{\"method\":\"lock\",\"value\":1}]}",
        "expectedOutput": "{\"state\":\"open\",\"invalid_actions\":1}"
      },
      {
        "testIndex": 3,
        "input": "{\"initial\":5,\"commands\":[{\"method\":\"unlock\",\"value\":0},{\"method\":\"open\",\"value\":0},{\"method\":\"close\",\"value\":0}]}",
        "expectedOutput": "{\"state\":\"closed\",\"invalid_actions\":1}"
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
