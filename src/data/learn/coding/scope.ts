import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:scope:local-shadows-global",
    "slug": "local-shadows-global",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Local Shadows Global",
    "order": 1,
    "problemStatement": "A global value `g` exists. Inside a function/block, create a local value `x+1` without modifying `g`. Print the local result followed by unchanged `g`.",
    "inputFormat": "One line contains integers `g x`.",
    "outputFormat": "Print `local_value g`.",
    "constraints": "-10^9 <= g,x <= 10^9.",
    "examples": [
      {
        "input": "10 4",
        "output": "5 10",
        "explanation": "The local value is 4+1=5; global g remains 10."
      },
      {
        "input": "3 7",
        "output": "8 3",
        "explanation": "The local value is 7+1=8; global g remains 3."
      },
      {
        "input": "-2 5",
        "output": "6 -2",
        "explanation": "The local value is 5+1=6; global g remains -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4",
        "expectedOutput": "5 10"
      },
      {
        "testIndex": 2,
        "input": "3 7",
        "expectedOutput": "8 3"
      },
      {
        "testIndex": 3,
        "input": "-2 5",
        "expectedOutput": "6 -2"
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
    "id": "learn:scope:local-parameter-shadows-global",
    "bankId": "T07-Q01",
    "slug": "local-parameter-shadows-global",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Local Parameter Shadows Global",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Predict the result under Python 3 scope rules. At module level x=a. Function f(x) returns x+b. Call f(a+1). Return its value; parameter x shadows the global.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "11",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. At module level x=a. Function f(x) returns x+b. Call f(a+1). Return its value; parameter x shadows the global. Therefore the expected JSON output is 11."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "6",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. At module level x=a. Function f(x) returns x+b. Call f(a+1). Return its value; parameter x shadows the global. Therefore the expected JSON output is 6."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "17",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. At module level x=a. Function f(x) returns x+b. Call f(a+1). Return its value; parameter x shadows the global. Therefore the expected JSON output is 17."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "11"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "17"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:local-assignment-does-not-leak",
    "bankId": "T07-Q02",
    "slug": "local-assignment-does-not-leak",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Local Assignment Does Not Leak",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Predict the result under Python 3 scope rules. Set global x=a. In f(), set local x=b, return x*2. After f(), return [f(),global x].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[6,7]",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. Set global x=a. In f(), set local x=b, return x*2. After f(), return [f(),global x]. Therefore the expected JSON output is [6,7]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[10,0]",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. Set global x=a. In f(), set local x=b, return x*2. After f(), return [f(),global x]. Therefore the expected JSON output is [10,0]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[8,12]",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. Set global x=a. In f(), set local x=b, return x*2. After f(), return [f(),global x]. Therefore the expected JSON output is [8,12]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[6,7]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[10,0]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[8,12]"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:read-global-without-rebinding",
    "bankId": "T07-Q03",
    "slug": "read-global-without-rebinding",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Read Global Without Rebinding",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Predict the result under Python 3 scope rules. At module level x=a; function f() returns x+b without assigning x. Return f().",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "10",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. At module level x=a; function f() returns x+b without assigning x. Return f(). Therefore the expected JSON output is 10."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. At module level x=a; function f() returns x+b without assigning x. Return f(). Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "16",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. At module level x=a; function f() returns x+b without assigning x. Return f(). Therefore the expected JSON output is 16."
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
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:global-keyword-mutation",
    "bankId": "T07-Q04",
    "slug": "global-keyword-mutation",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Global Keyword Mutation",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Predict the result under Python 3 scope rules. Set module x=a. In f(), declare global x and add b to x. Call f(), return module x.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "10",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. Set module x=a. In f(), declare global x and add b to x. Call f(), return module x. Therefore the expected JSON output is 10."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. Set module x=a. In f(), declare global x and add b to x. Call f(), return module x. Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "16",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. Set module x=a. In f(), declare global x and add b to x. Call f(), return module x. Therefore the expected JSON output is 16."
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
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:enclosing-variable-read",
    "bankId": "T07-Q05",
    "slug": "enclosing-variable-read",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Enclosing Variable Read",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Predict the result under Python 3 scope rules. outer() defines local x=a and inner() returns x+b. Return outer()->inner().",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "10",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. outer() defines local x=a and inner() returns x+b. Return outer()->inner(). Therefore the expected JSON output is 10."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. outer() defines local x=a and inner() returns x+b. Return outer()->inner(). Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "16",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. outer() defines local x=a and inner() returns x+b. Return outer()->inner(). Therefore the expected JSON output is 16."
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
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:nonlocal-increment",
    "bankId": "T07-Q06",
    "slug": "nonlocal-increment",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Nonlocal Increment",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Predict the result under Python 3 scope rules. outer() sets x=a. inner() declares nonlocal x and adds b to x. Call inner() twice, return final x.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "13",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. outer() sets x=a. inner() declares nonlocal x and adds b to x. Call inner() twice, return final x. Therefore the expected JSON output is 13."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "10",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. outer() sets x=a. inner() declares nonlocal x and adds b to x. Call inner() twice, return final x. Therefore the expected JSON output is 10."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "20",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. outer() sets x=a. inner() declares nonlocal x and adds b to x. Call inner() twice, return final x. Therefore the expected JSON output is 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "13"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "20"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:inner-shadow-vs-enclosing",
    "bankId": "T07-Q07",
    "slug": "inner-shadow-vs-enclosing",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Inner Shadow vs Enclosing",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Predict the result under Python 3 scope rules. outer() sets x=a; inner() sets local x=b and returns it; outer() returns [inner(), x].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[3,7]",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. outer() sets x=a; inner() sets local x=b and returns it; outer() returns [inner(), x]. Therefore the expected JSON output is [3,7]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[5,0]",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. outer() sets x=a; inner() sets local x=b and returns it; outer() returns [inner(), x]. Therefore the expected JSON output is [5,0]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[4,12]",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. outer() sets x=a; inner() sets local x=b and returns it; outer() returns [inner(), x]. Therefore the expected JSON output is [4,12]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[3,7]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[5,0]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[4,12]"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:nested-closure-captures-parameter",
    "bankId": "T07-Q08",
    "slug": "nested-closure-captures-parameter",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Nested Closure Captures Parameter",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Predict the result under Python 3 scope rules. make_adder(a) returns lambda y:a+y. Call returned function with b.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "10",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. make_adder(a) returns lambda y:a+y. Call returned function with b. Therefore the expected JSON output is 10."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. make_adder(a) returns lambda y:a+y. Call returned function with b. Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "16",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. make_adder(a) returns lambda y:a+y. Call returned function with b. Therefore the expected JSON output is 16."
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
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:loop-variable-persists-in-function",
    "bankId": "T07-Q09",
    "slug": "loop-variable-persists-in-function",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Loop Variable Persists in Function",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Predict the result under Python 3 scope rules. Function f() sets result=a then for i in range(3) adds b+i; return result. Return f().",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "19",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. Function f() sets result=a then for i in range(3) adds b+i; return result. Return f(). Therefore the expected JSON output is 19."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "18",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. Function f() sets result=a then for i in range(3) adds b+i; return result. Return f(). Therefore the expected JSON output is 18."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "27",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. Function f() sets result=a then for i in range(3) adds b+i; return result. Return f(). Therefore the expected JSON output is 27."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "19"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "18"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "27"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:if-block-uses-local-function-scope",
    "bankId": "T07-Q10",
    "slug": "if-block-uses-local-function-scope",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "If Block Uses Local Function Scope",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Predict the result under Python 3 scope rules. In f(), x=a; if b>0: x=b; return x. Note Python if-blocks do not create separate variable scope.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "3",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. In f(), x=a; if b>0: x=b; return x. Note Python if-blocks do not create separate variable scope. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. In f(), x=a; if b>0: x=b; return x. Note Python if-blocks do not create separate variable scope. Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "4",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. In f(), x=a; if b>0: x=b; return x. Note Python if-blocks do not create separate variable scope. Therefore the expected JSON output is 4."
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
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:comprehension-does-not-overwrite-x",
    "bankId": "T07-Q11",
    "slug": "comprehension-does-not-overwrite-x",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Comprehension Does Not Overwrite X",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Predict the result under Python 3 scope rules. Function f() sets x=a, evaluates [x for x in range(abs(b)%4)], then returns x; list-comprehension x is a separate scope in Python 3.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "7",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. Function f() sets x=a, evaluates [x for x in range(abs(b)%4)], then returns x; list-comprehension x is a separate scope in Python 3. Therefore the expected JSON output is 7."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "0",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. Function f() sets x=a, evaluates [x for x in range(abs(b)%4)], then returns x; list-comprehension x is a separate scope in Python 3. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "12",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. Function f() sets x=a, evaluates [x for x in range(abs(b)%4)], then returns x; list-comprehension x is a separate scope in Python 3. Therefore the expected JSON output is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "7"
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
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:parameter-rebinding-does-not-modify-caller",
    "bankId": "T07-Q12",
    "slug": "parameter-rebinding-does-not-modify-caller",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Parameter Rebinding Does Not Modify Caller",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Predict the result under Python 3 scope rules. Module x=a. Function f(x) adds b to its local x and returns it. Return [f(x),module x].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[10,7]",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. Module x=a. Function f(x) adds b to its local x and returns it. Return [f(x),module x]. Therefore the expected JSON output is [10,7]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[5,0]",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. Module x=a. Function f(x) adds b to its local x and returns it. Return [f(x),module x]. Therefore the expected JSON output is [5,0]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[16,12]",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. Module x=a. Function f(x) adds b to its local x and returns it. Return [f(x),module x]. Therefore the expected JSON output is [16,12]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[10,7]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[5,0]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[16,12]"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:three-level-legb-lookup",
    "bankId": "T07-Q13",
    "slug": "three-level-legb-lookup",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Three Level LEGB Lookup",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Predict the result under Python 3 scope rules. Global x=a; outer sets y=b; inner returns x+y using global and enclosing bindings. Return inner().",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "10",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. Global x=a; outer sets y=b; inner returns x+y using global and enclosing bindings. Return inner(). Therefore the expected JSON output is 10."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. Global x=a; outer sets y=b; inner returns x+y using global and enclosing bindings. Return inner(). Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "16",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. Global x=a; outer sets y=b; inner returns x+y using global and enclosing bindings. Return inner(). Therefore the expected JSON output is 16."
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
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:closest-scope-wins",
    "bankId": "T07-Q14",
    "slug": "closest-scope-wins",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Closest Scope Wins",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Predict the result under Python 3 scope rules. Global x=a; outer declares x=b; inner returns x+1. Return inner().",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "4",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. Global x=a; outer declares x=b; inner returns x+1. Return inner(). Therefore the expected JSON output is 4."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "6",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. Global x=a; outer declares x=b; inner returns x+1. Return inner(). Therefore the expected JSON output is 6."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "5",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. Global x=a; outer declares x=b; inner returns x+1. Return inner(). Therefore the expected JSON output is 5."
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
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:nonlocal-swap-state",
    "bankId": "T07-Q15",
    "slug": "nonlocal-swap-state",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Nonlocal Swap State",
    "order": 16,
    "difficulty": "Medium",
    "problemStatement": "Predict the result under Python 3 scope rules. outer initializes x=a,y=b. inner declares nonlocal x,y and swaps them. Return [x,y] after one call.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[3,7]",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. outer initializes x=a,y=b. inner declares nonlocal x,y and swaps them. Return [x,y] after one call. Therefore the expected JSON output is [3,7]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[5,0]",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. outer initializes x=a,y=b. inner declares nonlocal x,y and swaps them. Return [x,y] after one call. Therefore the expected JSON output is [5,0]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[4,12]",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. outer initializes x=a,y=b. inner declares nonlocal x,y and swaps them. Return [x,y] after one call. Therefore the expected JSON output is [4,12]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[3,7]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[5,0]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[4,12]"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:closure-factory-with-two-calls",
    "bankId": "T07-Q16",
    "slug": "closure-factory-with-two-calls",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Closure Factory with Two Calls",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Predict the result under Python 3 scope rules. make_counter() starts x=a; each call declares nonlocal x and increments by b. Return [first(),second(),third()].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[10,13,16]",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. make_counter() starts x=a; each call declares nonlocal x and increments by b. Return [first(),second(),third()]. Therefore the expected JSON output is [10,13,16]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[5,10,15]",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. make_counter() starts x=a; each call declares nonlocal x and increments by b. Return [first(),second(),third()]. Therefore the expected JSON output is [5,10,15]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[16,20,24]",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. make_counter() starts x=a; each call declares nonlocal x and increments by b. Return [first(),second(),third()]. Therefore the expected JSON output is [16,20,24]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[10,13,16]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[5,10,15]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[16,20,24]"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:default-parameter-evaluated-at-definition",
    "bankId": "T07-Q17",
    "slug": "default-parameter-evaluated-at-definition",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Default Parameter Evaluated at Definition",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Predict the result under Python 3 scope rules. Create default_y=b when defining f(x,y=default_y); later change outer b reference. Return f(a) using captured default.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "10",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. Create default_y=b when defining f(x,y=default_y); later change outer b reference. Return f(a) using captured default. Therefore the expected JSON output is 10."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. Create default_y=b when defining f(x,y=default_y); later change outer b reference. Return f(a) using captured default. Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "16",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. Create default_y=b when defining f(x,y=default_y); later change outer b reference. Return f(a) using captured default. Therefore the expected JSON output is 16."
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
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:local-and-global-same-name",
    "bankId": "T07-Q18",
    "slug": "local-and-global-same-name",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Local and Global Same Name",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Predict the result under Python 3 scope rules. Module value=a; f() sets local value=b. Return module value - f().",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "4",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. Module value=a; f() sets local value=b. Return module value - f(). Therefore the expected JSON output is 4."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "-5",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. Module value=a; f() sets local value=b. Return module value - f(). Therefore the expected JSON output is -5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "8",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. Module value=a; f() sets local value=b. Return module value - f(). Therefore the expected JSON output is 8."
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
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:nested-function-argument-overrides-closure",
    "bankId": "T07-Q19",
    "slug": "nested-function-argument-overrides-closure",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Nested Function Argument Overrides Closure",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Predict the result under Python 3 scope rules. outer sets x=a, inner(x) returns x*2+b. Return inner(a+b).",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "23",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. outer sets x=a, inner(x) returns x*2+b. Return inner(a+b). Therefore the expected JSON output is 23."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "15",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. outer sets x=a, inner(x) returns x*2+b. Return inner(a+b). Therefore the expected JSON output is 15."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "36",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. outer sets x=a, inner(x) returns x*2+b. Return inner(a+b). Therefore the expected JSON output is 36."
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
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:scope:two-independent-closure-instances",
    "bankId": "T07-Q20",
    "slug": "two-independent-closure-instances",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Two Independent Closure Instances",
    "order": 21,
    "difficulty": "Hard",
    "problemStatement": "Predict the result under Python 3 scope rules. factory(seed) closes over count=seed, adding b on each call. Create one with seed=a, one with seed=0. Call first twice, second once; return final [first, second] values.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python lexical-scope semantics, no hidden state between test cases.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[13,3]",
        "explanation": "Substitute a=7 and b=3. Predict the result under Python 3 scope rules. factory(seed) closes over count=seed, adding b on each call. Create one with seed=a, one with seed=0. Call first twice, second once; return final [first, second] values. Therefore the expected JSON output is [13,3]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[10,5]",
        "explanation": "Substitute a=0 and b=5. Predict the result under Python 3 scope rules. factory(seed) closes over count=seed, adding b on each call. Create one with seed=a, one with seed=0. Call first twice, second once; return final [first, second] values. Therefore the expected JSON output is [10,5]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[20,4]",
        "explanation": "Substitute a=12 and b=4. Predict the result under Python 3 scope rules. factory(seed) closes over count=seed, adding b on each call. Create one with seed=a, one with seed=0. Call first twice, second once; return final [first, second] values. Therefore the expected JSON output is [20,4]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[13,3]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[10,5]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[20,4]"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  }
]

export default questions
