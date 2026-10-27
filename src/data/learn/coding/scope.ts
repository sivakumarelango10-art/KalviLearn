import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:scope:local-parameter-shadows-global",
    "bankId": "T07-Q01",
    "slug": "local-parameter-shadows-global",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Local Parameter Shadows Global",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. In Python, let module-level x = a. A function f(x) returns x + b. Evaluate f(a + 1), where the function parameter x shadows the global x. Print the returned integer.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the evaluated integer result.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "11",
        "explanation": "Global x = 7. Calling f(8) shadows global x, computing 8 + 3 = 11."
      },
      {
        "input": "0 5",
        "output": "6",
        "explanation": "Global x = 0. Calling f(1) shadows global x, computing 1 + 5 = 6."
      },
      {
        "input": "12 4",
        "output": "17",
        "explanation": "Global x = 12. Calling f(13) shadows global x, computing 13 + 4 = 17."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "11"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "17"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Predict or implement the scoped function evaluation\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:local-assignment-does-not-leak",
    "bankId": "T07-Q02",
    "slug": "local-assignment-does-not-leak",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Local Assignment Does Not Leak",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. In Python, let module-level x = a. A function f() defines a local x = b and returns x * 2. Evaluate f() and the global x afterwards, and print \"f_result global_x\" separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print \"f_result global_x\" separated by a space.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "6 7",
        "explanation": "Local x = 3 returns 6. Global x remains 7. Output: 6 7."
      },
      {
        "input": "0 5",
        "output": "10 0",
        "explanation": "Local x = 5 returns 10. Global x remains 0. Output: 10 0."
      },
      {
        "input": "12 4",
        "output": "8 12",
        "explanation": "Local x = 4 returns 8. Global x remains 12. Output: 8 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "6 7"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "10 0"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "8 12"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:read-global-without-rebinding",
    "bankId": "T07-Q03",
    "slug": "read-global-without-rebinding",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Read Global Without Rebinding",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. In Python, set global x = a. A function f() reads the global x without re-binding it and returns x + b. Call f() and print the returned integer.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the evaluated integer result.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "10",
        "explanation": "Global x = 7. f() reads global x and returns 7 + 3 = 10."
      },
      {
        "input": "0 5",
        "output": "5",
        "explanation": "Global x = 0. f() reads global x and returns 0 + 5 = 5."
      },
      {
        "input": "12 4",
        "output": "16",
        "explanation": "Global x = 12. f() reads global x and returns 12 + 4 = 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:global-keyword-mutation",
    "bankId": "T07-Q04",
    "slug": "global-keyword-mutation",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Global Keyword Mutation",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. In Python, set global x = a. A function f() declares global x and adds b to x. Call f(), and print the final value of the global x.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the final global x value.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "10",
        "explanation": "Global x starts at 7. Mutating it with x += 3 results in 10."
      },
      {
        "input": "0 5",
        "output": "5",
        "explanation": "Global x starts at 0. Mutating it with x += 5 results in 5."
      },
      {
        "input": "12 4",
        "output": "16",
        "explanation": "Global x starts at 12. Mutating it with x += 4 results in 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:enclosing-variable-read",
    "bankId": "T07-Q05",
    "slug": "enclosing-variable-read",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Enclosing Variable Read",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. In Python, an outer function defines local x = a and returns an inner function that returns x + b. Execute outer() and call the resulting inner function, then print the returned integer.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the evaluated integer result.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "10",
        "explanation": "Enclosing x = 7. Inner function returns 7 + 3 = 10."
      },
      {
        "input": "0 5",
        "output": "5",
        "explanation": "Enclosing x = 0. Inner function returns 0 + 5 = 5."
      },
      {
        "input": "12 4",
        "output": "16",
        "explanation": "Enclosing x = 12. Inner function returns 12 + 4 = 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:nonlocal-increment",
    "bankId": "T07-Q06",
    "slug": "nonlocal-increment",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Nonlocal Increment",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. In Python, an outer function defines x = a. An inner function declares nonlocal x and adds b to x. Call inner() twice, and print the final value of x.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the final integer value of x.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "13",
        "explanation": "Starting at 7, incrementing twice by 3 yields 7 + 2 * 3 = 13."
      },
      {
        "input": "0 5",
        "output": "10",
        "explanation": "Starting at 0, incrementing twice by 5 yields 0 + 2 * 5 = 10."
      },
      {
        "input": "12 4",
        "output": "20",
        "explanation": "Starting at 12, incrementing twice by 4 yields 12 + 2 * 4 = 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "13"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "20"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:inner-shadow-vs-enclosing",
    "bankId": "T07-Q07",
    "slug": "inner-shadow-vs-enclosing",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Inner Shadow vs Enclosing",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. In Python, outer() sets x = a. An inner function sets a local x = b and returns it. outer() returns [inner(), x]. Print the two integers separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print \"inner_x outer_x\" separated by a space.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "3 7",
        "explanation": "inner() returns local 3; outer x remains 7. Output: 3 7."
      },
      {
        "input": "0 5",
        "output": "5 0",
        "explanation": "inner() returns local 5; outer x remains 0. Output: 5 0."
      },
      {
        "input": "12 4",
        "output": "4 12",
        "explanation": "inner() returns local 4; outer x remains 12. Output: 4 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "3 7"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5 0"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "4 12"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:nested-closure-captures-parameter",
    "bankId": "T07-Q08",
    "slug": "nested-closure-captures-parameter",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Nested Closure Captures Parameter",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. A closure factory make_adder(a) returns lambda y: a + y. Call the returned function with argument b, and print the resulting integer.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the evaluated integer result.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "10",
        "explanation": "make_adder(7)(3) computes 7 + 3 = 10."
      },
      {
        "input": "0 5",
        "output": "5",
        "explanation": "make_adder(0)(5) computes 0 + 5 = 5."
      },
      {
        "input": "12 4",
        "output": "16",
        "explanation": "make_adder(12)(4) computes 12 + 4 = 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:loop-variable-persists-in-function",
    "bankId": "T07-Q09",
    "slug": "loop-variable-persists-in-function",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Loop Variable Persists in Function",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. In Python, function f() sets result = a, then executes \"for i in range(3): result += b + i\", and returns result. Compute and print the final value of result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the evaluated integer result.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "19",
        "explanation": "Initial 7 + (3+0) + (3+1) + (3+2) = 19 = 19."
      },
      {
        "input": "0 5",
        "output": "18",
        "explanation": "Initial 0 + (5+0) + (5+1) + (5+2) = 18 = 18."
      },
      {
        "input": "12 4",
        "output": "27",
        "explanation": "Initial 12 + (4+0) + (4+1) + (4+2) = 27 = 27."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "19"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "18"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "27"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:if-block-uses-local-function-scope",
    "bankId": "T07-Q10",
    "slug": "if-block-uses-local-function-scope",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "If Block Uses Local Function Scope",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. In Python, function f() sets x = a; if b > 0: x = b; return x. (Note that if-blocks do not create a separate scope in Python). Print the returned integer.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the returned integer value.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "3",
        "explanation": "x starts at 7. Since b = 3 > 0, x becomes 3."
      },
      {
        "input": "0 5",
        "output": "5",
        "explanation": "x starts at 0. Since b = 5 > 0, x becomes 5."
      },
      {
        "input": "12 4",
        "output": "4",
        "explanation": "x starts at 12. Since b = 4 > 0, x becomes 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:comprehension-does-not-overwrite-x",
    "bankId": "T07-Q11",
    "slug": "comprehension-does-not-overwrite-x",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Comprehension Does Not Overwrite X",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. In Python, function f() sets x = a, evaluates the list comprehension [x for x in range(abs(b) % 4)], and then returns x. (In Python 3, list comprehensions have their own scope). Print the returned value of x.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer value of x.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "7",
        "explanation": "x was initialized to 7. The comprehension does not overwrite x, so x remains 7."
      },
      {
        "input": "0 5",
        "output": "0",
        "explanation": "x was initialized to 0. The comprehension does not overwrite x, so x remains 0."
      },
      {
        "input": "12 4",
        "output": "12",
        "explanation": "x was initialized to 12. The comprehension does not overwrite x, so x remains 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "12"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:parameter-rebinding-does-not-modify-caller",
    "bankId": "T07-Q12",
    "slug": "parameter-rebinding-does-not-modify-caller",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Parameter Rebinding Does Not Modify Caller",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. In Python, module x = a. Function f(x) adds b to its local x and returns it. Evaluate f(x) and print \"f_result global_x\" separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print \"f_result global_x\" separated by a space.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "10 7",
        "explanation": "f(x) returns 10; global x remains 7. Output: 10 7."
      },
      {
        "input": "0 5",
        "output": "5 0",
        "explanation": "f(x) returns 5; global x remains 0. Output: 5 0."
      },
      {
        "input": "12 4",
        "output": "16 12",
        "explanation": "f(x) returns 16; global x remains 12. Output: 16 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "10 7"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5 0"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16 12"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:three-level-legb-lookup",
    "bankId": "T07-Q13",
    "slug": "three-level-legb-lookup",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Three Level LEGB Lookup",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. In Python, global x = a. An outer function defines y = b, and an inner function returns x + y using LEGB lookup rules. Execute outer() and print the returned integer.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the evaluated integer result.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "10",
        "explanation": "Global x = 7, enclosing y = 3. Sum is 7 + 3 = 10."
      },
      {
        "input": "0 5",
        "output": "5",
        "explanation": "Global x = 0, enclosing y = 5. Sum is 0 + 5 = 5."
      },
      {
        "input": "12 4",
        "output": "16",
        "explanation": "Global x = 12, enclosing y = 4. Sum is 12 + 4 = 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:closest-scope-wins",
    "bankId": "T07-Q14",
    "slug": "closest-scope-wins",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Closest Scope Wins",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. In Python, global x = a. An outer function defines x = b, and an inner function returns x + 1. Under LEGB rules, the enclosing x shadows the global x. Execute outer() and print the returned integer.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the evaluated integer result.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "4",
        "explanation": "Enclosing x = 3 shadows global x = 7. Result: 3 + 1 = 4."
      },
      {
        "input": "0 5",
        "output": "6",
        "explanation": "Enclosing x = 5 shadows global x = 0. Result: 5 + 1 = 6."
      },
      {
        "input": "12 4",
        "output": "5",
        "explanation": "Enclosing x = 4 shadows global x = 12. Result: 4 + 1 = 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:nonlocal-swap-state",
    "bankId": "T07-Q15",
    "slug": "nonlocal-swap-state",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Nonlocal Swap State",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. In Python, outer() initializes x = a and y = b. An inner function declares nonlocal x, y and swaps their values (x, y = y, x). Call inner() once, and print the resulting values \"x y\" separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print \"x y\" separated by a space.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "3 7",
        "explanation": "Swapping 7 and 3 yields 3 7."
      },
      {
        "input": "0 5",
        "output": "5 0",
        "explanation": "Swapping 0 and 5 yields 5 0."
      },
      {
        "input": "12 4",
        "output": "4 12",
        "explanation": "Swapping 12 and 4 yields 4 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "3 7"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5 0"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "4 12"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:closure-factory-with-two-calls",
    "bankId": "T07-Q16",
    "slug": "closure-factory-with-two-calls",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Closure Factory with Two Calls",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. A closure factory make_counter() initializes an enclosing variable x = a. Each invocation increments x by b and returns the new value. Call the counter 3 times, and print the 3 values space-separated on a single line.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the three integer counter values separated by spaces.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "10 13 16",
        "explanation": "Starting at 7, incrementing by 3: 10, 13, 16. Output: 10 13 16."
      },
      {
        "input": "0 5",
        "output": "5 10 15",
        "explanation": "Starting at 0, incrementing by 5: 5, 10, 15. Output: 5 10 15."
      },
      {
        "input": "12 4",
        "output": "16 20 24",
        "explanation": "Starting at 12, incrementing by 4: 16, 20, 24. Output: 16 20 24."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "10 13 16"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5 10 15"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16 20 24"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:default-parameter-evaluated-at-definition",
    "bankId": "T07-Q17",
    "slug": "default-parameter-evaluated-at-definition",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Default Parameter Evaluated at Definition",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. In Python, default parameter values are evaluated when the function is defined. Let default_y = b. Define f(x, y=default_y): return x + y. If default_y is subsequently reassigned, f(a) still uses the original default. Print the result of f(a).",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the evaluated integer result.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "10",
        "explanation": "Captured default y = 3. f(7) evaluates 7 + 3 = 10."
      },
      {
        "input": "0 5",
        "output": "5",
        "explanation": "Captured default y = 5. f(0) evaluates 0 + 5 = 5."
      },
      {
        "input": "12 4",
        "output": "16",
        "explanation": "Captured default y = 4. f(12) evaluates 12 + 4 = 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:local-and-global-same-name",
    "bankId": "T07-Q18",
    "slug": "local-and-global-same-name",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Local and Global Same Name",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. In Python, global value = a. A function f() defines a local value = b and returns it. Compute and print global value - f().",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer difference global - local.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "4",
        "explanation": "Global 7 - Local 3 = 4."
      },
      {
        "input": "0 5",
        "output": "-5",
        "explanation": "Global 0 - Local 5 = -5."
      },
      {
        "input": "12 4",
        "output": "8",
        "explanation": "Global 12 - Local 4 = 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:nested-function-argument-overrides-closure",
    "bankId": "T07-Q19",
    "slug": "nested-function-argument-overrides-closure",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Nested Function Argument Overrides Closure",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. In Python, outer() sets x = a. An inner function inner(x) defines parameter x and returns x * 2 + b. Call inner(a + b), and print the returned integer.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the evaluated integer result.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "23",
        "explanation": "inner(10) evaluates (10) * 2 + 3 = 23."
      },
      {
        "input": "0 5",
        "output": "15",
        "explanation": "inner(5) evaluates (5) * 2 + 5 = 15."
      },
      {
        "input": "12 4",
        "output": "36",
        "explanation": "inner(16) evaluates (16) * 2 + 4 = 36."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "23"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "36"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:scope:two-independent-closure-instances",
    "bankId": "T07-Q20",
    "slug": "two-independent-closure-instances",
    "languages": ["python"],
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Two Independent Closure Instances",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. A closure factory(seed) closes over count = seed and adds b on each call. Create one instance with seed = a and call it twice. Create a second independent instance with seed = 0 and call it once. Print the final values of the two instances separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print \"first_val second_val\" separated by a space.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "13 3",
        "explanation": "First instance: 7 + 2*3 = 13. Second instance: 0 + 3 = 3. Output: 13 3."
      },
      {
        "input": "0 5",
        "output": "10 5",
        "explanation": "First instance: 0 + 2*5 = 10. Second instance: 0 + 5 = 5. Output: 10 5."
      },
      {
        "input": "12 4",
        "output": "20 4",
        "explanation": "First instance: 12 + 2*4 = 20. Second instance: 0 + 4 = 4. Output: 20 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "13 3"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "10 5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "20 4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\n",
      "java": "// Language: Java 17\n",
      "cpp": "// Language: C++20\n"
    },
    "inputMode": "plain",
  }
]
