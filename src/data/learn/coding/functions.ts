import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:functions:reusable-max-function",
    "bankId": "T06-Q01",
    "slug": "reusable-max-function",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Reusable Max Function",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Write a function larger(a, b) that returns the greater of the two inputs, and print the result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the greater integer value.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "7",
        "explanation": "larger(7, 3) = 7."
      },
      {
        "input": "0 5",
        "output": "5",
        "explanation": "larger(0, 5) = 5."
      },
      {
        "input": "12 4",
        "output": "12",
        "explanation": "larger(12, 4) = 12."
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
        "expectedOutput": "5"
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
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef larger(a: int, b: int) -> int:\n    # TODO: Write your solution here\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    print(larger(a, b))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\n\nfunction larger(a, b) {\n    // TODO: Write your solution here\n}\n\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    console.log(larger(a, b));\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static long larger(long a, long b) {\n        // TODO: Write your solution here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        System.out.println(larger(a, b));\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nlong long larger(long long a, long long b) {\n    // TODO: Write your solution here\n    return 0;\n}\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        cout << larger(a, b) << endl;\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:reusable-min-function",
    "bankId": "T06-Q02",
    "slug": "reusable-min-function",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Reusable Min Function",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Write a function smaller(a, b) that returns the lesser of the two inputs, and print the result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the lesser integer value.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "3",
        "explanation": "smaller(7, 3) = 3."
      },
      {
        "input": "0 5",
        "output": "0",
        "explanation": "smaller(0, 5) = 0."
      },
      {
        "input": "12 4",
        "output": "4",
        "explanation": "smaller(12, 4) = 4."
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
        "expectedOutput": "0"
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
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef smaller(a: int, b: int) -> int:\n    # TODO: Write your solution here\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    print(smaller(a, b))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\n\nfunction smaller(a, b) {\n    // TODO: Write your solution here\n}\n\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    console.log(smaller(a, b));\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static long smaller(long a, long b) {\n        // TODO: Write your solution here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        System.out.println(smaller(a, b));\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nlong long smaller(long long a, long long b) {\n    // TODO: Write your solution here\n    return 0;\n}\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        cout << smaller(a, b) << endl;\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:absolute-difference-function",
    "bankId": "T06-Q03",
    "slug": "absolute-difference-function",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Absolute Difference Function",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Write a function distance(a, b) that computes and returns the absolute difference |a - b|, and print the non-negative result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the non-negative integer distance |a - b|.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "4",
        "explanation": "distance(7, 3) = |7 - 3| = 4."
      },
      {
        "input": "0 5",
        "output": "5",
        "explanation": "distance(0, 5) = |0 - 5| = 5."
      },
      {
        "input": "12 4",
        "output": "8",
        "explanation": "distance(12, 4) = |12 - 4| = 8."
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
        "expectedOutput": "5"
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
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef distance(a: int, b: int) -> int:\n    # TODO: Write your solution here\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    print(distance(a, b))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\n\nfunction distance(a, b) {\n    // TODO: Write your solution here\n}\n\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    console.log(distance(a, b));\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static long distance(long a, long b) {\n        // TODO: Write your solution here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        System.out.println(distance(a, b));\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <cmath>\nusing namespace std;\n\nlong long distance(long long a, long long b) {\n    // TODO: Write your solution here\n    return 0;\n}\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        cout << distance(a, b) << endl;\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:parity-comparison-function",
    "bankId": "T06-Q04",
    "slug": "parity-comparison-function",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Parity Comparison Function",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Write a function same_parity(a, b) that returns true if both numbers have the same parity (both even or both odd), or false otherwise. Print \"true\" or \"false\".",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print \"true\" if parities match, otherwise \"false\".",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "true",
        "explanation": "same_parity(7, 3) is true."
      },
      {
        "input": "0 5",
        "output": "false",
        "explanation": "same_parity(0, 5) is false."
      },
      {
        "input": "12 4",
        "output": "true",
        "explanation": "same_parity(12, 4) is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "12 4",
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
      "python": "# Language: Python 3\nimport sys\n\ndef same_parity(a: int, b: int) -> bool:\n    # TODO: Write your solution here\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    print(\"true\" if same_parity(a, b) else \"false\")\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\n\nfunction same_parity(a, b) {\n    // TODO: Write your solution here\n}\n\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    console.log(same_parity(a, b) ? 'true' : 'false');\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static boolean sameParity(long a, long b) {\n        // TODO: Write your solution here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        System.out.println(sameParity(a, b) ? \"true\" : \"false\");\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nbool sameParity(long long a, long long b) {\n    // TODO: Write your solution here\n    return false;\n}\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        cout << (sameParity(a, b) ? \"true\" : \"false\") << endl;\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:integer-gcd-helper",
    "bankId": "T06-Q05",
    "slug": "integer-gcd-helper",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Integer GCD Helper",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Implement a function gcd(a, b) that returns the greatest common divisor gcd(|a|, |b|), and print the non-negative result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the non-negative integer greatest common divisor.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "1",
        "explanation": "gcd(|7|, |3|) = 1."
      },
      {
        "input": "0 5",
        "output": "5",
        "explanation": "gcd(|0|, |5|) = 5."
      },
      {
        "input": "12 4",
        "output": "4",
        "explanation": "gcd(|12|, |4|) = 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "1"
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
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef gcd(a: int, b: int) -> int:\n    # TODO: Write your solution here\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    print(gcd(a, b))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\n\nfunction gcd(a, b) {\n    // TODO: Write your solution here\n}\n\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    console.log(gcd(a, b));\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static long gcd(long a, long b) {\n        // TODO: Write your solution here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        System.out.println(gcd(a, b));\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nlong long gcd(long long a, long long b) {\n    // TODO: Write your solution here\n    return 0;\n}\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        cout << gcd(a, b) << endl;\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:safe-division-function",
    "bankId": "T06-Q06",
    "slug": "safe-division-function",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Safe Division Function",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Write a function divide(a, b) that returns null if b is zero, and otherwise returns the integer quotient truncated toward zero (e.g. 7 / 3 = 2, -7 / 3 = -2). Print the quotient, or null if b is 0.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer quotient truncated toward zero, or null if b is 0.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "2",
        "explanation": "divide(7, 3) truncates toward zero to 2."
      },
      {
        "input": "0 5",
        "output": "0",
        "explanation": "divide(0, 5) truncates toward zero to 0."
      },
      {
        "input": "12 4",
        "output": "3",
        "explanation": "divide(12, 4) truncates toward zero to 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12 4",
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
      "python": "# Language: Python 3\nimport sys\n\ndef divide(a: int, b: int):\n    # TODO: Write your solution here\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    print(divide(a, b))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\n\nfunction divide(a, b) {\n    // TODO: Write your solution here\n}\n\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    console.log(divide(a, b));\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static Object divide(long a, long b) {\n        // TODO: Write your solution here\n        return null;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        System.out.println(divide(a, b));\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        if (b == 0) cout << \"null\" << endl;\n        else cout << (a / b) << endl;\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:composite-function-evaluation",
    "bankId": "T06-Q07",
    "slug": "composite-function-evaluation",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Composite Function Evaluation",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Define helper functions double(x) = 2*x and increment(x) = x + 1. Compute and print the composite expression double(increment(a)) + increment(b).",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the evaluated integer result.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "20",
        "explanation": "double(7 + 1) + (3 + 1) = 2 * 8 + 4 = 20."
      },
      {
        "input": "0 5",
        "output": "8",
        "explanation": "double(0 + 1) + (5 + 1) = 2 * 1 + 6 = 8."
      },
      {
        "input": "12 4",
        "output": "31",
        "explanation": "double(12 + 1) + (4 + 1) = 2 * 13 + 5 = 31."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "20"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "31"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:function-returns-a-pair",
    "bankId": "T06-Q08",
    "slug": "function-returns-a-pair",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Function Returns a Pair",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Write a function that computes the pair [a + b, a - b], and print the two integers separated by a space on a single line.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print \"sum diff\" separated by a space.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "10 4",
        "explanation": "Sum 7 + 3 = 10, Difference 7 - 3 = 4. Output: 10 4."
      },
      {
        "input": "0 5",
        "output": "5 -5",
        "explanation": "Sum 0 + 5 = 5, Difference 0 - 5 = -5. Output: 5 -5."
      },
      {
        "input": "12 4",
        "output": "16 8",
        "explanation": "Sum 12 + 4 = 16, Difference 12 - 4 = 8. Output: 16 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "10 4"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5 -5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16 8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:range-sum-helper",
    "bankId": "T06-Q09",
    "slug": "range-sum-helper",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Range Sum Helper",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Write a function range_sum(a, b) that returns the sum of all integers from min(a, b) through max(a, b) inclusive, and print the result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer sum of the inclusive range.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "25",
        "explanation": "Sum from 3 to 7 is 25."
      },
      {
        "input": "0 5",
        "output": "15",
        "explanation": "Sum from 0 to 5 is 15."
      },
      {
        "input": "12 4",
        "output": "72",
        "explanation": "Sum from 4 to 12 is 72."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "25"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "72"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef range_sum(a: int, b: int) -> int:\n    # TODO: Write your solution here\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    print(range_sum(a, b))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\n\nfunction range_sum(a, b) {\n    // TODO: Write your solution here\n}\n\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    console.log(range_sum(a, b));\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static long rangeSum(long a, long b) {\n        // TODO: Write your solution here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        System.out.println(rangeSum(a, b));\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nlong long rangeSum(long long a, long long b) {\n    // TODO: Write your solution here\n    return 0;\n}\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        cout << rangeSum(a, b) << endl;\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:divisibility-function",
    "bankId": "T06-Q10",
    "slug": "divisibility-function",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Divisibility Function",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Write a function is_divisible(a, b) that returns true if b is nonzero and a is divisible by b (a % b == 0), or false otherwise. Print \"true\" or \"false\".",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print \"true\" if a is divisible by b, otherwise \"false\".",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "false",
        "explanation": "7 divisible by 3 is false."
      },
      {
        "input": "0 5",
        "output": "true",
        "explanation": "0 divisible by 5 is true."
      },
      {
        "input": "12 4",
        "output": "true",
        "explanation": "12 divisible by 4 is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "12 4",
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
      "python": "# Language: Python 3\nimport sys\n\ndef is_divisible(a: int, b: int) -> bool:\n    # TODO: Write your solution here\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    print(\"true\" if is_divisible(a, b) else \"false\")\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\n\nfunction is_divisible(a, b) {\n    // TODO: Write your solution here\n}\n\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    console.log(is_divisible(a, b) ? 'true' : 'false');\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static boolean isDivisible(long a, long b) {\n        // TODO: Write your solution here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        System.out.println(isDivisible(a, b) ? \"true\" : \"false\");\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nbool isDivisible(long long a, long long b) {\n    // TODO: Write your solution here\n    return false;\n}\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        cout << (isDivisible(a, b) ? \"true\" : \"false\") << endl;\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:prime-checker-function",
    "bankId": "T06-Q11",
    "slug": "prime-checker-function",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Prime Checker Function",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Write a function that checks whether the sum of their absolute values, |a| + |b|, is a prime number. Print \"true\" if prime, or \"false\" otherwise.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print \"true\" if |a| + |b| is prime, otherwise \"false\".",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "false",
        "explanation": "|7| + |3| = 10, which is prime: false."
      },
      {
        "input": "0 5",
        "output": "true",
        "explanation": "|0| + |5| = 5, which is prime: true."
      },
      {
        "input": "12 4",
        "output": "false",
        "explanation": "|12| + |4| = 16, which is prime: false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "12 4",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <cmath>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:factor-count-helper",
    "bankId": "T06-Q12",
    "slug": "factor-count-helper",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Factor Count Helper",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Write a function factor_count that computes the number of positive integer factors of |a| + |b|. If |a| + |b| = 0, return 0. Print the factor count.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the count of positive factors.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "4",
        "explanation": "|7| + |3| = 10, which has 4 positive factor(s)."
      },
      {
        "input": "0 5",
        "output": "2",
        "explanation": "|0| + |5| = 5, which has 2 positive factor(s)."
      },
      {
        "input": "12 4",
        "output": "5",
        "explanation": "|12| + |4| = 16, which has 5 positive factor(s)."
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
        "expectedOutput": "2"
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
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <cmath>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:function-composition-of-squares",
    "bankId": "T06-Q13",
    "slug": "function-composition-of-squares",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Function Composition of Squares",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Define a helper function square(x) = x * x. Compute and print square(a) + square(b).",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer sum of squares.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "58",
        "explanation": "square(7) + square(3) = 49 + 9 = 58."
      },
      {
        "input": "0 5",
        "output": "25",
        "explanation": "square(0) + square(5) = 0 + 25 = 25."
      },
      {
        "input": "12 4",
        "output": "160",
        "explanation": "square(12) + square(4) = 144 + 16 = 160."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "58"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "25"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "160"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef square(x: int) -> int:\n    return x * x\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = BigInt(data[0]);\n    const b = BigInt(data[1]);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:swap-function-output",
    "bankId": "T06-Q14",
    "slug": "swap-function-output",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Swap Function Output",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Write a function swap(a, b) that returns the two values swapped, and print \"b a\" separated by a space on a single line.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the swapped values \"b a\" on a single line.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
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
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef swap(a: int, b: int):\n    return b, a\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:clamp-using-helper-functions",
    "bankId": "T06-Q15",
    "slug": "clamp-using-helper-functions",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Clamp Using Helper Functions",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Find the bounds low = min(a, b) and high = max(a, b), and clamp the value 0 into the interval [low, high]. Print the clamped result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the clamped integer value.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "3",
        "explanation": "Clamping 0 into [3, 7] produces 3."
      },
      {
        "input": "0 5",
        "output": "0",
        "explanation": "Clamping 0 into [0, 5] produces 0."
      },
      {
        "input": "12 4",
        "output": "4",
        "explanation": "Clamping 0 into [4, 12] produces 4."
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
        "expectedOutput": "0"
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
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:digits-in-both-arguments",
    "bankId": "T06-Q16",
    "slug": "digits-in-both-arguments",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Digits in Both Arguments",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. Define a helper function digits(x) returning the number of decimal digits in |x| (with 0 having 1 digit). Compute and print digits(a) + digits(b).",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the combined total digit count.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "2",
        "explanation": "|7| has 1 digit(s) and |3| has 1 digit(s). Total: 2."
      },
      {
        "input": "12 4",
        "output": "3",
        "explanation": "|12| has 2 digit(s) and |4| has 1 digit(s). Total: 3."
      },
      {
        "input": "15 15",
        "output": "4",
        "explanation": "|15| has 2 digit(s) and |15| has 2 digit(s). Total: 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "12 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "15 15",
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
      "python": "# Language: Python 3\nimport sys\n\ndef digits(x: int) -> int:\n    return len(str(abs(x)))\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:function-returns-sign-product",
    "bankId": "T06-Q17",
    "slug": "function-returns-sign-product",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Function Returns Sign Product",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. Define a helper function sign(x) that returns -1 for negative numbers, 0 for zero, and 1 for positive numbers. Compute and print sign(a) * sign(b).",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the sign product (-1, 0, or 1).",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "1",
        "explanation": "sign(7) = 1, sign(3) = 1. Product: 1."
      },
      {
        "input": "0 5",
        "output": "0",
        "explanation": "sign(0) = 0, sign(5) = 1. Product: 0."
      },
      {
        "input": "-8 3",
        "output": "-1",
        "explanation": "sign(-8) = -1, sign(3) = 1. Product: -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "-8 3",
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
      "python": "# Language: Python 3\nimport sys\n\ndef sign(x: int) -> int:\n    return 1 if x > 0 else -1 if x < 0 else 0\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:coprime-function",
    "bankId": "T06-Q18",
    "slug": "coprime-function",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Coprime Function",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. Write a function coprime(a, b) that returns true if gcd(|a|, |b|) == 1, or false otherwise. Print \"true\" or \"false\".",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print \"true\" if a and b are coprime, otherwise \"false\".",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "true",
        "explanation": "gcd(|7|, |3|) == 1 is true."
      },
      {
        "input": "0 5",
        "output": "false",
        "explanation": "gcd(|0|, |5|) == 1 is false."
      },
      {
        "input": "12 4",
        "output": "false",
        "explanation": "gcd(|12|, |4|) == 1 is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "12 4",
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
      "python": "# Language: Python 3\nimport sys, math\n\ndef coprime(a: int, b: int) -> bool:\n    return math.gcd(a, b) == 1\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    print(\"true\" if coprime(a, b) else \"false\")\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:normalize-fraction-function",
    "bankId": "T06-Q19",
    "slug": "normalize-fraction-function",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Normalize Fraction Function",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input representing fraction a / b. If b is 0, print null. Otherwise, reduce the fraction to lowest terms with a strictly positive denominator, and print \"numerator denominator\" separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print \"numerator denominator\" with denominator > 0, or null if b is 0.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "7 3",
        "explanation": "Fraction 7/3 in lowest terms is 7 3."
      },
      {
        "input": "0 5",
        "output": "0 1",
        "explanation": "Fraction 0/5 in lowest terms is 0 1."
      },
      {
        "input": "12 4",
        "output": "3 1",
        "explanation": "Fraction 12/4 in lowest terms is 3 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "7 3"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "0 1"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "3 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:functions:math-utility-summary",
    "bankId": "T06-Q20",
    "slug": "math-utility-summary",
    "languages": ["python","nodejs"],
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Math Utility Summary",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. Compute their gcd(|a|, |b|), least common multiple lcm(|a|, |b|) (or 0 if either is 0), and sum a + b. Print \"gcd lcm sum\" separated by spaces on a single line.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print \"gcd lcm sum\" separated by spaces on one line.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "1 21 10",
        "explanation": "For 7 and 3, gcd, lcm, and sum are: 1 21 10."
      },
      {
        "input": "0 5",
        "output": "5 0 5",
        "explanation": "For 0 and 5, gcd, lcm, and sum are: 5 0 5."
      },
      {
        "input": "12 4",
        "output": "4 12 16",
        "explanation": "For 12 and 4, gcd, lcm, and sum are: 4 12 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "1 21 10"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5 0 5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "4 12 16"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
