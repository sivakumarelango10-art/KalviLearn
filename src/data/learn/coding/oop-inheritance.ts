import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:oop-inheritance:basic-overridden-double",
    "bankId": "T24-Q01",
    "slug": "basic-overridden-double",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Basic Overridden Double",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.compute() returns a+b; Derived overrides compute() to return 2*(a+b). Return [Base.compute(),Derived.compute()].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[10,20]",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.compute() returns a+b; Derived overrides compute() to return 2*(a+b). Return [Base.compute(),Derived.compute()]. Therefore the expected JSON output is [10,20]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[5,10]",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.compute() returns a+b; Derived overrides compute() to return 2*(a+b). Return [Base.compute(),Derived.compute()]. Therefore the expected JSON output is [5,10]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[16,32]",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.compute() returns a+b; Derived overrides compute() to return 2*(a+b). Return [Base.compute(),Derived.compute()]. Therefore the expected JSON output is [16,32]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[10,20]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[5,10]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[16,32]"
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
    "id": "learn:oop-inheritance:inherit-without-override",
    "bankId": "T24-Q02",
    "slug": "inherit-without-override",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Inherit Without Override",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.total() returns a+b; Child inherits it without override. Return [Base.total(),Child.total()].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[10,10]",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.total() returns a+b; Child inherits it without override. Return [Base.total(),Child.total()]. Therefore the expected JSON output is [10,10]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[5,5]",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.total() returns a+b; Child inherits it without override. Return [Base.total(),Child.total()]. Therefore the expected JSON output is [5,5]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[16,16]",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.total() returns a+b; Child inherits it without override. Return [Base.total(),Child.total()]. Therefore the expected JSON output is [16,16]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[10,10]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[5,5]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[16,16]"
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
    "id": "learn:oop-inheritance:override-changes-subtraction",
    "bankId": "T24-Q03",
    "slug": "override-changes-subtraction",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Override Changes Subtraction",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.evaluate() returns a+b; Child overrides evaluate() to return a-b. Return [Base.evaluate(),Child.evaluate()].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[10,4]",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.evaluate() returns a+b; Child overrides evaluate() to return a-b. Return [Base.evaluate(),Child.evaluate()]. Therefore the expected JSON output is [10,4]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[5,-5]",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.evaluate() returns a+b; Child overrides evaluate() to return a-b. Return [Base.evaluate(),Child.evaluate()]. Therefore the expected JSON output is [5,-5]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[16,8]",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.evaluate() returns a+b; Child overrides evaluate() to return a-b. Return [Base.evaluate(),Child.evaluate()]. Therefore the expected JSON output is [16,8]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[10,4]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[5,-5]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[16,8]"
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
    "id": "learn:oop-inheritance:super-method-extension",
    "bankId": "T24-Q04",
    "slug": "super-method-extension",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Super Method Extension",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.value() returns a*b; Child.value() returns super().value()+a. Return Child.value().",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "28",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.value() returns a*b; Child.value() returns super().value()+a. Return Child.value(). Therefore the expected JSON output is 28."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "0",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.value() returns a*b; Child.value() returns super().value()+a. Return Child.value(). Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "60",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.value() returns a*b; Child.value() returns super().value()+a. Return Child.value(). Therefore the expected JSON output is 60."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "28"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "60"
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
    "id": "learn:oop-inheritance:three-level-method-chain",
    "bankId": "T24-Q05",
    "slug": "three-level-method-chain",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Three Level Method Chain",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a; Mid.f() returns super().f()+b; Leaf.f() returns 2*super().f(). Return [Base.f(),Mid.f(),Leaf.f()].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[7,10,20]",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a; Mid.f() returns super().f()+b; Leaf.f() returns 2*super().f(). Return [Base.f(),Mid.f(),Leaf.f()]. Therefore the expected JSON output is [7,10,20]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[0,5,10]",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a; Mid.f() returns super().f()+b; Leaf.f() returns 2*super().f(). Return [Base.f(),Mid.f(),Leaf.f()]. Therefore the expected JSON output is [0,5,10]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[12,16,32]",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a; Mid.f() returns super().f()+b; Leaf.f() returns 2*super().f(). Return [Base.f(),Mid.f(),Leaf.f()]. Therefore the expected JSON output is [12,16,32]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[7,10,20]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[0,5,10]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[12,16,32]"
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
    "id": "learn:oop-inheritance:runtime-polymorphism",
    "bankId": "T24-Q06",
    "slug": "runtime-polymorphism",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Runtime Polymorphism",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.label() returns \"base\", Child.label() returns \"child\". Iterate [Base(),Child(),Base()] and return their label strings.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[\"base\",\"child\",\"base\"]",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.label() returns \"base\", Child.label() returns \"child\". Iterate [Base(),Child(),Base()] and return their label strings. Therefore the expected JSON output is [\"base\",\"child\",\"base\"]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[\"base\",\"child\",\"base\"]",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.label() returns \"base\", Child.label() returns \"child\". Iterate [Base(),Child(),Base()] and return their label strings. Therefore the expected JSON output is [\"base\",\"child\",\"base\"]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[\"base\",\"child\",\"base\"]",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.label() returns \"base\", Child.label() returns \"child\". Iterate [Base(),Child(),Base()] and return their label strings. Therefore the expected JSON output is [\"base\",\"child\",\"base\"]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[\"base\",\"child\",\"base\"]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[\"base\",\"child\",\"base\"]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[\"base\",\"child\",\"base\"]"
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
    "id": "learn:oop-inheritance:constructor-field-inheritance",
    "bankId": "T24-Q07",
    "slug": "constructor-field-inheritance",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Constructor Field Inheritance",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base constructor stores x=a; Derived constructor calls super then stores y=b. Base.total() returns x; Derived.total() returns x+y. Return [Base.total(),Derived.total()].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[7,10]",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base constructor stores x=a; Derived constructor calls super then stores y=b. Base.total() returns x; Derived.total() returns x+y. Return [Base.total(),Derived.total()]. Therefore the expected JSON output is [7,10]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[0,5]",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base constructor stores x=a; Derived constructor calls super then stores y=b. Base.total() returns x; Derived.total() returns x+y. Return [Base.total(),Derived.total()]. Therefore the expected JSON output is [0,5]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[12,16]",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base constructor stores x=a; Derived constructor calls super then stores y=b. Base.total() returns x; Derived.total() returns x+y. Return [Base.total(),Derived.total()]. Therefore the expected JSON output is [12,16]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[7,10]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[0,5]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[12,16]"
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
    "id": "learn:oop-inheritance:overridden-property-of-shape",
    "bankId": "T24-Q08",
    "slug": "overridden-property-of-shape",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Overridden Property of Shape",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.area() returns a*b; Square override area() returns a*a, using inherited a. Return {\"rectangle\":...,\"square\":...}.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "{\"rectangle\":21,\"square\":49}",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.area() returns a*b; Square override area() returns a*a, using inherited a. Return {\"rectangle\":...,\"square\":...}. Therefore the expected JSON output is {\"rectangle\":21,\"square\":49}."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "{\"rectangle\":0,\"square\":0}",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.area() returns a*b; Square override area() returns a*a, using inherited a. Return {\"rectangle\":...,\"square\":...}. Therefore the expected JSON output is {\"rectangle\":0,\"square\":0}."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "{\"rectangle\":48,\"square\":144}",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.area() returns a*b; Square override area() returns a*a, using inherited a. Return {\"rectangle\":...,\"square\":...}. Therefore the expected JSON output is {\"rectangle\":48,\"square\":144}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "{\"rectangle\":21,\"square\":49}"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "{\"rectangle\":0,\"square\":0}"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "{\"rectangle\":48,\"square\":144}"
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
    "id": "learn:oop-inheritance:parent-vs-child-multiplier",
    "bankId": "T24-Q09",
    "slug": "parent-vs-child-multiplier",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Parent vs Child Multiplier",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.scale(x) multiplies x by a; Child.scale(x) multiplies x by b. Invoke each with x=a+b; return [parent,child].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[70,30]",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.scale(x) multiplies x by a; Child.scale(x) multiplies x by b. Invoke each with x=a+b; return [parent,child]. Therefore the expected JSON output is [70,30]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[0,25]",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.scale(x) multiplies x by a; Child.scale(x) multiplies x by b. Invoke each with x=a+b; return [parent,child]. Therefore the expected JSON output is [0,25]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[192,64]",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.scale(x) multiplies x by a; Child.scale(x) multiplies x by b. Invoke each with x=a+b; return [parent,child]. Therefore the expected JSON output is [192,64]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[70,30]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[0,25]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[192,64]"
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
    "id": "learn:oop-inheritance:super-call-twice",
    "bankId": "T24-Q10",
    "slug": "super-call-twice",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Super Call Twice",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a-b; Child.f() calls super().f() twice and sums results. Return Child.f().",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "8",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a-b; Child.f() calls super().f() twice and sums results. Return Child.f(). Therefore the expected JSON output is 8."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "-10",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a-b; Child.f() calls super().f() twice and sums results. Return Child.f(). Therefore the expected JSON output is -10."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "16",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a-b; Child.f() calls super().f() twice and sums results. Return Child.f(). Therefore the expected JSON output is 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "-10"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "16"
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
    "id": "learn:oop-inheritance:inherited-helper-used-by-override",
    "bankId": "T24-Q11",
    "slug": "inherited-helper-used-by-override",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Inherited Helper Used by Override",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.helper() returns a*a; Derived.result() returns self.helper()+b*b. Return Derived.result().",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "58",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.helper() returns a*a; Derived.result() returns self.helper()+b*b. Return Derived.result(). Therefore the expected JSON output is 58."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "25",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.helper() returns a*a; Derived.result() returns self.helper()+b*b. Return Derived.result(). Therefore the expected JSON output is 25."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "160",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.helper() returns a*a; Derived.result() returns self.helper()+b*b. Return Derived.result(). Therefore the expected JSON output is 160."
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
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:oop-inheritance:derived-helper-overrides-parent-helper",
    "bankId": "T24-Q12",
    "slug": "derived-helper-overrides-parent-helper",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Derived Helper Overrides Parent Helper",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.helper() returns a; Base.compute() returns self.helper()+b. Child overrides helper() to return 2*a. Return [Base.compute(),Child.compute()] using the inherited compute method.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[10,17]",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.helper() returns a; Base.compute() returns self.helper()+b. Child overrides helper() to return 2*a. Return [Base.compute(),Child.compute()] using the inherited compute method. Therefore the expected JSON output is [10,17]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[5,5]",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.helper() returns a; Base.compute() returns self.helper()+b. Child overrides helper() to return 2*a. Return [Base.compute(),Child.compute()] using the inherited compute method. Therefore the expected JSON output is [5,5]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[16,28]",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.helper() returns a; Base.compute() returns self.helper()+b. Child overrides helper() to return 2*a. Return [Base.compute(),Child.compute()] using the inherited compute method. Therefore the expected JSON output is [16,28]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[10,17]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[5,5]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[16,28]"
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
    "id": "learn:oop-inheritance:grandchild-uses-parent-override",
    "bankId": "T24-Q13",
    "slug": "grandchild-uses-parent-override",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Grandchild Uses Parent Override",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a; Child.f() returns a+b; Grandchild does not override f. Return [Child.f(),Grandchild.f()].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[10,10]",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a; Child.f() returns a+b; Grandchild does not override f. Return [Child.f(),Grandchild.f()]. Therefore the expected JSON output is [10,10]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[5,5]",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a; Child.f() returns a+b; Grandchild does not override f. Return [Child.f(),Grandchild.f()]. Therefore the expected JSON output is [5,5]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[16,16]",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a; Child.f() returns a+b; Grandchild does not override f. Return [Child.f(),Grandchild.f()]. Therefore the expected JSON output is [16,16]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[10,10]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[5,5]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[16,16]"
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
    "id": "learn:oop-inheritance:class-hierarchy-type-flags",
    "bankId": "T24-Q14",
    "slug": "class-hierarchy-type-flags",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Class Hierarchy Type Flags",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Define Base, Child(Base), Grandchild(Child), Other. Return [issubclass(Grandchild,Base),issubclass(Other,Base),issubclass(Child,Child)].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[true,false,true]",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Define Base, Child(Base), Grandchild(Child), Other. Return [issubclass(Grandchild,Base),issubclass(Other,Base),issubclass(Child,Child)]. Therefore the expected JSON output is [true,false,true]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[true,false,true]",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Define Base, Child(Base), Grandchild(Child), Other. Return [issubclass(Grandchild,Base),issubclass(Other,Base),issubclass(Child,Child)]. Therefore the expected JSON output is [true,false,true]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[true,false,true]",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Define Base, Child(Base), Grandchild(Child), Other. Return [issubclass(Grandchild,Base),issubclass(Other,Base),issubclass(Child,Child)]. Therefore the expected JSON output is [true,false,true]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[true,false,true]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[true,false,true]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[true,false,true]"
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
    "id": "learn:oop-inheritance:template-method-dispatch",
    "bankId": "T24-Q15",
    "slug": "template-method-dispatch",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Template Method Dispatch",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.process() calls self.transform(a)+b; Base.transform(x)=x, Child.transform(x)=2*x. Return [Base.process(),Child.process()].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[10,17]",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.process() calls self.transform(a)+b; Base.transform(x)=x, Child.transform(x)=2*x. Return [Base.process(),Child.process()]. Therefore the expected JSON output is [10,17]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[5,5]",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.process() calls self.transform(a)+b; Base.transform(x)=x, Child.transform(x)=2*x. Return [Base.process(),Child.process()]. Therefore the expected JSON output is [5,5]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[16,28]",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.process() calls self.transform(a)+b; Base.transform(x)=x, Child.transform(x)=2*x. Return [Base.process(),Child.process()]. Therefore the expected JSON output is [16,28]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[10,17]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[5,5]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[16,28]"
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
    "id": "learn:oop-inheritance:override-with-conditional",
    "bankId": "T24-Q16",
    "slug": "override-with-conditional",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Override with Conditional",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.classify() returns \"positive\" iff a>0 else \"nonpositive\"; Child.classify() checks a+b instead. Return [Base.classify(),Child.classify()].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[\"positive\",\"positive\"]",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.classify() returns \"positive\" iff a>0 else \"nonpositive\"; Child.classify() checks a+b instead. Return [Base.classify(),Child.classify()]. Therefore the expected JSON output is [\"positive\",\"positive\"]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[\"nonpositive\",\"positive\"]",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.classify() returns \"positive\" iff a>0 else \"nonpositive\"; Child.classify() checks a+b instead. Return [Base.classify(),Child.classify()]. Therefore the expected JSON output is [\"nonpositive\",\"positive\"]."
      },
      {
        "input": "{\"a\":-8,\"b\":3}",
        "output": "[\"nonpositive\",\"nonpositive\"]",
        "explanation": "Substitute a=-8 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.classify() returns \"positive\" iff a>0 else \"nonpositive\"; Child.classify() checks a+b instead. Return [Base.classify(),Child.classify()]. Therefore the expected JSON output is [\"nonpositive\",\"nonpositive\"]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[\"positive\",\"positive\"]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[\"nonpositive\",\"positive\"]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":-8,\"b\":3}",
        "expectedOutput": "[\"nonpositive\",\"nonpositive\"]"
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
    "id": "learn:oop-inheritance:grandchild-super-chain",
    "bankId": "T24-Q17",
    "slug": "grandchild-super-chain",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Grandchild Super Chain",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a; Mid.f() adds b via super(); Grandchild.f() subtracts a via super(). Return Grandchild.f().",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "3",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a; Mid.f() adds b via super(); Grandchild.f() subtracts a via super(). Return Grandchild.f(). Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a; Mid.f() adds b via super(); Grandchild.f() subtracts a via super(). Return Grandchild.f(). Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "4",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.f() returns a; Mid.f() adds b via super(); Grandchild.f() subtracts a via super(). Return Grandchild.f(). Therefore the expected JSON output is 4."
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
    "id": "learn:oop-inheritance:cooperative-diamond-inheritance",
    "bankId": "T24-Q18",
    "slug": "cooperative-diamond-inheritance",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Cooperative Diamond Inheritance",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. A.f() returns a; B(A).f() returns super().f()+b; C(A).f() returns 2*super().f(); D(B,C).f() returns super().f()+1. Use Python MRO D→B→C→A; return D.f().",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "18",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. A.f() returns a; B(A).f() returns super().f()+b; C(A).f() returns 2*super().f(); D(B,C).f() returns super().f()+1. Use Python MRO D→B→C→A; return D.f(). Therefore the expected JSON output is 18."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "6",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. A.f() returns a; B(A).f() returns super().f()+b; C(A).f() returns 2*super().f(); D(B,C).f() returns super().f()+1. Use Python MRO D→B→C→A; return D.f(). Therefore the expected JSON output is 6."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "29",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. A.f() returns a; B(A).f() returns super().f()+b; C(A).f() returns 2*super().f(); D(B,C).f() returns super().f()+1. Use Python MRO D→B→C→A; return D.f(). Therefore the expected JSON output is 29."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "18"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "29"
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
    "id": "learn:oop-inheritance:subclass-method-calls-another-override",
    "bankId": "T24-Q19",
    "slug": "subclass-method-calls-another-override",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Subclass Method Calls Another Override",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.value() returns a; Base.double() returns 2*self.value(); Child overrides value() to return b. Return [Base.double(),Child.double()].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[14,6]",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.value() returns a; Base.double() returns 2*self.value(); Child overrides value() to return b. Return [Base.double(),Child.double()]. Therefore the expected JSON output is [14,6]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[0,10]",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.value() returns a; Base.double() returns 2*self.value(); Child overrides value() to return b. Return [Base.double(),Child.double()]. Therefore the expected JSON output is [0,10]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[24,8]",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.value() returns a; Base.double() returns 2*self.value(); Child overrides value() to return b. Return [Base.double(),Child.double()]. Therefore the expected JSON output is [24,8]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[14,6]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[0,10]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[24,8]"
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
    "id": "learn:oop-inheritance:polymorphic-aggregate",
    "bankId": "T24-Q20",
    "slug": "polymorphic-aggregate",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Polymorphic Aggregate",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Apply Python object-oriented inheritance and method-dispatch rules. Base.score() returns a, Child.score() returns a+b, Grandchild(Child).score() returns a+2*b. Sum scores of [Base(),Child(),Grandchild()] via virtual dispatch.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; Python-style single or multiple inheritance, method resolution, super(), and dynamic dispatch; no division by zero.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "30",
        "explanation": "Substitute a=7 and b=3. Apply Python object-oriented inheritance and method-dispatch rules. Base.score() returns a, Child.score() returns a+b, Grandchild(Child).score() returns a+2*b. Sum scores of [Base(),Child(),Grandchild()] via virtual dispatch. Therefore the expected JSON output is 30."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "15",
        "explanation": "Substitute a=0 and b=5. Apply Python object-oriented inheritance and method-dispatch rules. Base.score() returns a, Child.score() returns a+b, Grandchild(Child).score() returns a+2*b. Sum scores of [Base(),Child(),Grandchild()] via virtual dispatch. Therefore the expected JSON output is 15."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "48",
        "explanation": "Substitute a=12 and b=4. Apply Python object-oriented inheritance and method-dispatch rules. Base.score() returns a, Child.score() returns a+b, Grandchild(Child).score() returns a+2*b. Sum scores of [Base(),Child(),Grandchild()] via virtual dispatch. Therefore the expected JSON output is 48."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "30"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "15"
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
    "isPythonOnly": true,
    "pythonOnlyNote": "This question specifically evaluates Python scope / inheritance semantics and must be solved in Python.",
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n"
    },
    "inputMode": "json"
  }
]

export default questions
