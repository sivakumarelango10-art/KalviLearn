import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:variables-data-types:integer-to-decimal-string",
    "bankId": "T01-Q01",
    "slug": "integer-to-decimal-string",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer to Decimal String",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Read a signed integer from standard input. Convert the integer to its standard decimal string representation and print it. If the input is negative, it must be preceded by a minus sign.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the decimal string representation of n.",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "7",
        "explanation": "The integer 7 in standard decimal notation is 7."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "The integer 0 in standard decimal notation is 0."
      },
      {
        "input": "12",
        "output": "12",
        "explanation": "The integer 12 in standard decimal notation is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    # TODO: Write your solution here\n    print(s)\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    // TODO: Write your solution here\n    console.log(s);\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // TODO: Write your solution here\n        System.out.println(s);\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // TODO: Write your solution here\n        cout << s << endl;\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:integer-to-binary-digits",
    "bankId": "T01-Q02",
    "slug": "integer-to-binary-digits",
    "languages": ["python","nodejs"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer to Binary Digits",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Read a signed integer from standard input. Convert its magnitude to binary digits without leading zeros. If the original integer is negative, prefix the binary representation with a minus sign.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the binary digits of n (with a minus sign if negative).",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "111",
        "explanation": "7 has magnitude 7, which in binary is 111."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "0 has magnitude 0, which in binary is 0."
      },
      {
        "input": "12",
        "output": "1100",
        "explanation": "12 has magnitude 12, which in binary is 1100."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "111"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:integer-to-hexadecimal",
    "bankId": "T01-Q03",
    "slug": "integer-to-hexadecimal",
    "languages": ["python","nodejs"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer to Hexadecimal",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Read a signed integer from standard input. Convert its magnitude to lowercase hexadecimal digits without any 0x prefix. If the integer is negative, prefix the output with a minus sign.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the lowercase hexadecimal representation of n.",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "7",
        "explanation": "7 has magnitude 7, which in base 16 is 7."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "0 has magnitude 0, which in base 16 is 0."
      },
      {
        "input": "12",
        "output": "c",
        "explanation": "12 has magnitude 12, which in base 16 is c."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:integer-to-octal",
    "bankId": "T01-Q04",
    "slug": "integer-to-octal",
    "languages": ["python","nodejs"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer to Octal",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Read a signed integer from standard input. Convert its magnitude to octal digits without any 0o prefix. If the integer is negative, prefix the output with a minus sign.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the octal representation of n.",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "7",
        "explanation": "7 has magnitude 7, which in base 8 is 7."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "0 has magnitude 0, which in base 8 is 0."
      },
      {
        "input": "12",
        "output": "14",
        "explanation": "12 has magnitude 12, which in base 8 is 14."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:absolute-value-assignment",
    "bankId": "T01-Q05",
    "slug": "absolute-value-assignment",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Absolute Value Assignment",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Read a signed integer from standard input. Compute its absolute value and print it as a nonnegative integer.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print |n| as a nonnegative integer.",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "7",
        "explanation": "The absolute value of 7 is |7| = 7."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "The absolute value of 0 is |0| = 0."
      },
      {
        "input": "12",
        "output": "12",
        "explanation": "The absolute value of 12 is |12| = 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <cmath>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:boolean-from-integer",
    "bankId": "T01-Q06",
    "slug": "boolean-from-integer",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Boolean From Integer",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Read a signed integer from standard input. Convert it to a boolean value: zero maps to false, and any nonzero integer maps to true. Print the result in lowercase.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print true if n is nonzero, or false if n is zero.",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "true",
        "explanation": "7 is nonzero, so the boolean output is true."
      },
      {
        "input": "0",
        "output": "false",
        "explanation": "0 is zero, so the boolean output is false."
      },
      {
        "input": "12",
        "output": "true",
        "explanation": "12 is nonzero, so the boolean output is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:sign-as-integer",
    "bankId": "T01-Q07",
    "slug": "sign-as-integer",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Sign as Integer",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Read a signed integer from standard input. Determine its sign: print -1 if the integer is strictly negative, 0 if it is zero, and 1 if it is strictly positive.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print -1, 0, or 1.",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "1",
        "explanation": "7 is positive, so its sign indicator is 1."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "0 is zero, so its sign indicator is 0."
      },
      {
        "input": "-1",
        "output": "-1",
        "explanation": "-1 is negative, so its sign indicator is -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "-1",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:square-as-numeric-value",
    "bankId": "T01-Q08",
    "slug": "square-as-numeric-value",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Square as Numeric Value",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Read an integer from standard input. Compute and print its square (n * n).",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the squared integer.",
    "constraints": "-10^4 ≤ n ≤ 10^4",
    "examples": [
      {
        "input": "7",
        "output": "49",
        "explanation": "7 * 7 = 49."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "0 * 0 = 0."
      },
      {
        "input": "12",
        "output": "144",
        "explanation": "12 * 12 = 144."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "49"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:truncated-half",
    "bankId": "T01-Q09",
    "slug": "truncated-half",
    "languages": ["python","nodejs"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Truncated Half",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Read an integer from standard input. Divide it by 2 and truncate the quotient toward zero (dropping any fractional remainder). Print the resulting integer.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the quotient truncated toward zero.",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "3",
        "explanation": "7 / 2 = 3.5, which truncated toward zero is 3."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "0 / 2 = 0.0, which truncated toward zero is 0."
      },
      {
        "input": "12",
        "output": "6",
        "explanation": "12 / 2 = 6.0, which truncated toward zero is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:floor-half",
    "bankId": "T01-Q10",
    "slug": "floor-half",
    "languages": ["python","nodejs"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Floor Half",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Read an integer from standard input. Divide it by 2 and round downward to the nearest integer (floor division). Print the resulting integer.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print floor(n / 2).",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "3",
        "explanation": "7 / 2 = 3.5, which rounded down (floor) is 3."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "0 / 2 = 0.0, which rounded down (floor) is 0."
      },
      {
        "input": "12",
        "output": "6",
        "explanation": "12 / 2 = 6.0, which rounded down (floor) is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <cmath>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:decimal-digit-count",
    "bankId": "T01-Q11",
    "slug": "decimal-digit-count",
    "languages": ["python","nodejs"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Decimal Digit Count",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Read an integer from standard input. Count the number of decimal digits in its absolute value. Note that 0 has exactly 1 digit.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the count of decimal digits in |n|.",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "1",
        "explanation": "|7| = 7, which contains 1 digit."
      },
      {
        "input": "12",
        "output": "2",
        "explanation": "|12| = 12, which contains 2 digits."
      },
      {
        "input": "100",
        "output": "3",
        "explanation": "|100| = 100, which contains 3 digits."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "12",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "100",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:unit-digit-extraction",
    "bankId": "T01-Q12",
    "slug": "unit-digit-extraction",
    "languages": ["python","nodejs"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Unit Digit Extraction",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Read an integer from standard input. Extract and print the units (last) digit of its absolute value.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the units digit (an integer from 0 to 9).",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "7",
        "explanation": "|7| = 7. The units digit is 7."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "|0| = 0. The units digit is 0."
      },
      {
        "input": "12",
        "output": "2",
        "explanation": "|12| = 12. The units digit is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:tens-digit-extraction",
    "bankId": "T01-Q13",
    "slug": "tens-digit-extraction",
    "languages": ["python","nodejs"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Tens Digit Extraction",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Read an integer from standard input. Extract and print the tens digit of its absolute value. If the number has fewer than two digits, print 0.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the tens digit (an integer from 0 to 9).",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "0",
        "explanation": "|7| = 7. Dividing by 10 gives 0, so the tens digit is 0."
      },
      {
        "input": "12",
        "output": "1",
        "explanation": "|12| = 12. Dividing by 10 gives 1, so the tens digit is 1."
      },
      {
        "input": "45",
        "output": "4",
        "explanation": "|45| = 45. Dividing by 10 gives 4, so the tens digit is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "12",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "45",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:minutes-to-seconds",
    "bankId": "T01-Q14",
    "slug": "minutes-to-seconds",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Minutes to Seconds",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Read an integer representing a duration in minutes from standard input. Convert the absolute value of the duration into seconds by multiplying by 60, and print the result.",
    "inputFormat": "A single line containing an integer m.",
    "outputFormat": "Print the duration in seconds.",
    "constraints": "-10^6 ≤ m ≤ 10^6",
    "examples": [
      {
        "input": "7",
        "output": "420",
        "explanation": "|7| = 7 minutes. 7 * 60 = 420 seconds."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "|0| = 0 minutes. 0 * 60 = 0 seconds."
      },
      {
        "input": "12",
        "output": "720",
        "explanation": "|12| = 12 minutes. 12 * 60 = 720 seconds."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "420"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    m = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const m = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long m = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long m;\n    if (cin >> m) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:celsius-to-fahrenheit-number",
    "bankId": "T01-Q15",
    "slug": "celsius-to-fahrenheit-number",
    "languages": ["python","nodejs"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Celsius to Fahrenheit Number",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Read an integer representing a temperature in degrees Celsius from standard input. Convert it to Fahrenheit using the formula F = 9 * C / 5 + 32, and print the resulting numeric value.",
    "inputFormat": "A single line containing an integer c.",
    "outputFormat": "Print the temperature in Fahrenheit.",
    "constraints": "-1000 ≤ c ≤ 1000",
    "examples": [
      {
        "input": "7",
        "output": "44.6",
        "explanation": "9 * (7) / 5 + 32 = 12.6 + 32 = 44.6."
      },
      {
        "input": "0",
        "output": "32",
        "explanation": "9 * (0) / 5 + 32 = 0 + 32 = 32."
      },
      {
        "input": "12",
        "output": "53.6",
        "explanation": "9 * (12) / 5 + 32 = 21.6 + 32 = 53.6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "44.6"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "32"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    c = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const c = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextDouble()) return;\n        double c = sc.nextDouble();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    double c;\n    if (cin >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:parity-as-text",
    "bankId": "T01-Q16",
    "slug": "parity-as-text",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Parity as Text",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Read an integer from standard input. Determine its parity: print \"even\" if the integer is divisible by 2, or \"odd\" if it is not.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print even or odd in lowercase.",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "odd",
        "explanation": "7 is not divisible by 2, so it is odd."
      },
      {
        "input": "0",
        "output": "even",
        "explanation": "0 is divisible by 2, so it is even."
      },
      {
        "input": "12",
        "output": "even",
        "explanation": "12 is divisible by 2, so it is even."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "odd"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "even"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:lowest-eight-bits",
    "bankId": "T01-Q17",
    "slug": "lowest-eight-bits",
    "languages": ["python","nodejs"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Lowest Eight Bits",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Read an integer from standard input. Compute its lowest 8 bits using n modulo 256 (unsigned low byte), and print them as an 8-character binary string with leading zeros.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print an 8-character binary string.",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "00000111",
        "explanation": "7 mod 256 = 7, which formatted as an 8-bit binary string is 00000111."
      },
      {
        "input": "0",
        "output": "00000000",
        "explanation": "0 mod 256 = 0, which formatted as an 8-bit binary string is 00000000."
      },
      {
        "input": "12",
        "output": "00001100",
        "explanation": "12 mod 256 = 12, which formatted as an 8-bit binary string is 00001100."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "00000111"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "00000000"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:number-of-set-bits",
    "bankId": "T01-Q18",
    "slug": "number-of-set-bits",
    "languages": ["python","nodejs"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Number of Set Bits",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Read an integer from standard input. Count and print the number of 1-bits (set bits) in the standard binary representation of its absolute value.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the count of set bits in |n|.",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "3",
        "explanation": "|7| = 7 = 111 in binary, which has 3 set bits."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "|0| = 0 = 0 in binary, which has 0 set bits."
      },
      {
        "input": "12",
        "output": "2",
        "explanation": "|12| = 12 = 1100 in binary, which has 2 set bits."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:reverse-decimal-digits",
    "bankId": "T01-Q19",
    "slug": "reverse-decimal-digits",
    "languages": ["python","nodejs"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Reverse Decimal Digits",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Read an integer from standard input. Reverse the decimal digits of its absolute value, drop any leading zeros, and restore the original sign. Print the resulting signed integer.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the integer with its digits reversed and original sign preserved.",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "7",
        "explanation": "Reversing the digits of |7| gives 7."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Reversing the digits of |0| gives 0."
      },
      {
        "input": "12",
        "output": "21",
        "explanation": "Reversing the digits of |12| gives 21."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:variables-data-types:integer-to-string-type-tag",
    "bankId": "T01-Q20",
    "slug": "integer-to-string-type-tag",
    "languages": ["python","nodejs","java"],
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer to String Type Tag",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Read an integer from standard input. Form its decimal string representation and determine its string length (including any leading minus sign). Print the decimal text, its length, and the literal tag \"string\" separated by single spaces on a single line.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print: <text> <length> string",
    "constraints": "-10^9 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "7",
        "output": "7 1 string",
        "explanation": "The decimal representation of 7 has length 1, so the space-separated output is: 7 1 string."
      },
      {
        "input": "0",
        "output": "0 1 string",
        "explanation": "The decimal representation of 0 has length 1, so the space-separated output is: 0 1 string."
      },
      {
        "input": "12",
        "output": "12 2 string",
        "explanation": "The decimal representation of 12 has length 2, so the space-separated output is: 12 2 string."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "7 1 string"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0 1 string"
      },
      {
        "testIndex": 3,
        "input": "12",
        "expectedOutput": "12 2 string"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    # TODO: Write your solution here\n    print(f\"{s} {len(s)} string\")\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    // TODO: Write your solution here\n    console.log(`${s} ${s.length} string`);\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // TODO: Write your solution here\n        System.out.println(s + \" \" + s.length() + \" string\");\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // TODO: Write your solution here\n        cout << s << \" \" << s.length() << \" string\" << endl;\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
