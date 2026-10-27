import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:basic-arithmetic-operations:add-two-integers",
    "bankId": "T02-Q01",
    "slug": "add-two-integers",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Add Two Integers",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Compute their sum (a + b) and print the result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer sum a + b.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "10",
        "explanation": "7 + 3 = 10."
      },
      {
        "input": "0 5",
        "output": "5",
        "explanation": "0 + 5 = 5."
      },
      {
        "input": "12 4",
        "output": "16",
        "explanation": "12 + 4 = 16."
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
    "id": "learn:basic-arithmetic-operations:subtract-b-from-a",
    "bankId": "T02-Q02",
    "slug": "subtract-b-from-a",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Subtract B from A",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Subtract b from a (a - b) and print the result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer difference a - b.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "4",
        "explanation": "7 - 3 = 4."
      },
      {
        "input": "0 5",
        "output": "-5",
        "explanation": "0 - 5 = -5."
      },
      {
        "input": "12 4",
        "output": "8",
        "explanation": "12 - 4 = 8."
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
    "id": "learn:basic-arithmetic-operations:product-of-two-values",
    "bankId": "T02-Q03",
    "slug": "product-of-two-values",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Product of Two Values",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Compute their product (a * b) and print the result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer product a * b.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "21",
        "explanation": "7 * 3 = 21."
      },
      {
        "input": "0 5",
        "output": "0",
        "explanation": "0 * 5 = 0."
      },
      {
        "input": "12 4",
        "output": "48",
        "explanation": "12 * 4 = 48."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "48"
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
    "id": "learn:basic-arithmetic-operations:square-sum-formula",
    "bankId": "T02-Q04",
    "slug": "square-sum-formula",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Square Sum Formula",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Compute the square of their sum, (a + b)^2, and print the result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer (a + b)^2.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "100",
        "explanation": "(7 + 3)^2 = (10)^2 = 100."
      },
      {
        "input": "0 5",
        "output": "25",
        "explanation": "(0 + 5)^2 = (5)^2 = 25."
      },
      {
        "input": "12 4",
        "output": "256",
        "explanation": "(12 + 4)^2 = (16)^2 = 256."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "100"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "25"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "256"
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
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = BigInt(data[0]);\n    const b = BigInt(data[1]);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:basic-arithmetic-operations:difference-of-squares",
    "bankId": "T02-Q05",
    "slug": "difference-of-squares",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Difference of Squares",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Compute the difference of their squares, a^2 - b^2, and print the result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer a^2 - b^2.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "40",
        "explanation": "7^2 - 3^2 = 49 - 9 = 40."
      },
      {
        "input": "0 5",
        "output": "-25",
        "explanation": "0^2 - 5^2 = 0 - 25 = -25."
      },
      {
        "input": "12 4",
        "output": "128",
        "explanation": "12^2 - 4^2 = 144 - 16 = 128."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "40"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "-25"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "128"
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
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = BigInt(data[0]);\n    const b = BigInt(data[1]);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:basic-arithmetic-operations:sum-of-individual-squares",
    "bankId": "T02-Q06",
    "slug": "sum-of-individual-squares",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Sum of Individual Squares",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Compute the sum of their squares, a^2 + b^2, and print the result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer a^2 + b^2.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "58",
        "explanation": "7^2 + 3^2 = 49 + 9 = 58."
      },
      {
        "input": "0 5",
        "output": "25",
        "explanation": "0^2 + 5^2 = 0 + 25 = 25."
      },
      {
        "input": "12 4",
        "output": "160",
        "explanation": "12^2 + 4^2 = 144 + 16 = 160."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = BigInt(data[0]);\n    const b = BigInt(data[1]);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:basic-arithmetic-operations:absolute-difference",
    "bankId": "T02-Q07",
    "slug": "absolute-difference",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Absolute Difference",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Compute their absolute difference, |a - b|, and print the non-negative result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the non-negative integer |a - b|.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "4",
        "explanation": "|7 - 3| = |4| = 4."
      },
      {
        "input": "0 5",
        "output": "5",
        "explanation": "|0 - 5| = |-5| = 5."
      },
      {
        "input": "12 4",
        "output": "8",
        "explanation": "|12 - 4| = |8| = 8."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <cmath>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:basic-arithmetic-operations:floor-division-with-zero-rule",
    "bankId": "T02-Q08",
    "slug": "floor-division-with-zero-rule",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Floor Division With Zero Rule",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Compute the floor division floor(a / b). If b is zero, print null.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the floor division result, or null if b is zero.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "2",
        "explanation": "floor(7 / 3) = 2."
      },
      {
        "input": "0 5",
        "output": "0",
        "explanation": "floor(0 / 5) = 0."
      },
      {
        "input": "12 4",
        "output": "3",
        "explanation": "floor(12 / 4) = 3."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <cmath>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:basic-arithmetic-operations:remainder-with-zero-rule",
    "bankId": "T02-Q09",
    "slug": "remainder-with-zero-rule",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Remainder With Zero Rule",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Compute a modulo |b| as a non-negative remainder. If b is zero, print null.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the non-negative remainder a % |b|, or null if b is zero.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "1",
        "explanation": "7 mod |3| = 1."
      },
      {
        "input": "0 5",
        "output": "0",
        "explanation": "0 mod |5| = 0."
      },
      {
        "input": "-7 -3",
        "output": "2",
        "explanation": "-7 mod |-3| = 2."
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
        "input": "-7 -3",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <cstdlib>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:basic-arithmetic-operations:division-quotient-and-remainder",
    "bankId": "T02-Q10",
    "slug": "division-quotient-and-remainder",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Division Quotient and Remainder",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Compute the floor quotient floor(a / |b|) and non-negative remainder a % |b|. Print both values separated by a space. If b is zero, print null.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print \"quotient remainder\" separated by a space, or null if b is zero.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "2 1",
        "explanation": "For a = 7 and divisor |3| = 3, floor quotient is 2 and remainder is 1. Result: 2 1."
      },
      {
        "input": "0 5",
        "output": "0 0",
        "explanation": "For a = 0 and divisor |5| = 5, floor quotient is 0 and remainder is 0. Result: 0 0."
      },
      {
        "input": "12 4",
        "output": "3 0",
        "explanation": "For a = 12 and divisor |4| = 4, floor quotient is 3 and remainder is 0. Result: 3 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "2 1"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "0 0"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "3 0"
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
      "cpp": "// Language: C++20\n#include <iostream>\n#include <cstdlib>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:basic-arithmetic-operations:euclidean-gcd",
    "bankId": "T02-Q11",
    "slug": "euclidean-gcd",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Euclidean GCD",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Compute their greatest common divisor gcd(|a|, |b|) using the Euclidean algorithm and print the result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the non-negative integer gcd(|a|, |b|).",
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
      "python": "# Language: Python 3\nimport sys, math\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:basic-arithmetic-operations:least-common-multiple",
    "bankId": "T02-Q12",
    "slug": "least-common-multiple",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Least Common Multiple",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Compute their least common multiple lcm(|a|, |b|). If either number is zero, print 0.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the non-negative integer least common multiple.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "21",
        "explanation": "lcm(|7|, |3|) = 21."
      },
      {
        "input": "0 5",
        "output": "0",
        "explanation": "lcm(|0|, |5|) = 0."
      },
      {
        "input": "12 4",
        "output": "12",
        "explanation": "lcm(|12|, |4|) = 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "21"
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
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys, math\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:basic-arithmetic-operations:weighted-sum",
    "bankId": "T02-Q13",
    "slug": "weighted-sum",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Weighted Sum",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Compute the weighted sum 2*a + 3*b and print the result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer value of 2*a + 3*b.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "23",
        "explanation": "2 * (7) + 3 * (3) = 14 + 9 = 23."
      },
      {
        "input": "0 5",
        "output": "15",
        "explanation": "2 * (0) + 3 * (5) = 0 + 15 = 15."
      },
      {
        "input": "12 4",
        "output": "36",
        "explanation": "2 * (12) + 3 * (4) = 24 + 12 = 36."
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
    "id": "learn:basic-arithmetic-operations:average-as-reduced-fraction",
    "bankId": "T02-Q14",
    "slug": "average-as-reduced-fraction",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Average as Reduced Fraction",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Represent their average (a + b) / 2 as a reduced fraction with a positive denominator, and print the numerator and denominator separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print \"numerator denominator\" separated by a space, with denominator > 0.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "5 1",
        "explanation": "Average is (7 + 3) / 2 = 10 / 2. In reduced form, this is 5 1."
      },
      {
        "input": "0 5",
        "output": "5 2",
        "explanation": "Average is (0 + 5) / 2 = 5 / 2. In reduced form, this is 5 2."
      },
      {
        "input": "12 4",
        "output": "8 1",
        "explanation": "Average is (12 + 4) / 2 = 16 / 2. In reduced form, this is 8 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "5 1"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5 2"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "8 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys, math\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:basic-arithmetic-operations:closest-multiple-of-five",
    "bankId": "T02-Q15",
    "slug": "closest-multiple-of-five",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Closest Multiple of Five",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Find the multiple of 5 closest to their sum (a + b). If there is a tie between two multiples of 5, choose the smaller multiple.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the closest multiple of 5.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "10",
        "explanation": "Sum 7 + 3 = 10. The closest multiple of 5 is 10."
      },
      {
        "input": "0 5",
        "output": "5",
        "explanation": "Sum 0 + 5 = 5. The closest multiple of 5 is 5."
      },
      {
        "input": "12 4",
        "output": "15",
        "explanation": "Sum 12 + 4 = 16. The closest multiple of 5 is 15."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:basic-arithmetic-operations:three-consecutive-multiples",
    "bankId": "T02-Q16",
    "slug": "three-consecutive-multiples",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Three Consecutive Multiples",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. Compute the three consecutive multiples [a*b, a*(b+1), a*(b+2)] and print them separated by spaces on a single line.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the three space-separated integers on one line.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "21 28 35",
        "explanation": "7 * 3 = 21, 7 * 4 = 28, 7 * 5 = 35. Output: 21 28 35."
      },
      {
        "input": "0 5",
        "output": "0 0 0",
        "explanation": "0 * 5 = 0, 0 * 6 = 0, 0 * 7 = 0. Output: 0 0 0."
      },
      {
        "input": "12 4",
        "output": "48 60 72",
        "explanation": "12 * 4 = 48, 12 * 5 = 60, 12 * 6 = 72. Output: 48 60 72."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "21 28 35"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "0 0 0"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "48 60 72"
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
    "id": "learn:basic-arithmetic-operations:rectangle-perimeter",
    "bankId": "T02-Q17",
    "slug": "rectangle-perimeter",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Rectangle Perimeter",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. Treating |a| and |b| as rectangle side lengths, compute and print its perimeter 2*(|a| + |b|).",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the rectangle perimeter 2*(|a| + |b|).",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "20",
        "explanation": "Perimeter = 2 * (|7| + |3|) = 2 * (7 + 3) = 20."
      },
      {
        "input": "0 5",
        "output": "10",
        "explanation": "Perimeter = 2 * (|0| + |5|) = 2 * (0 + 5) = 10."
      },
      {
        "input": "12 4",
        "output": "32",
        "explanation": "Perimeter = 2 * (|12| + |4|) = 2 * (12 + 4) = 32."
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
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "32"
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
    "id": "learn:basic-arithmetic-operations:rectangle-area",
    "bankId": "T02-Q18",
    "slug": "rectangle-area",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Rectangle Area",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. Treating |a| and |b| as rectangle side lengths, compute and print its area |a| * |b|.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the rectangle area |a| * |b|.",
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "examples": [
      {
        "input": "7 3",
        "output": "21",
        "explanation": "Area = |7| * |3| = 7 * 3 = 21."
      },
      {
        "input": "0 5",
        "output": "0",
        "explanation": "Area = |0| * |5| = 0 * 5 = 0."
      },
      {
        "input": "12 4",
        "output": "48",
        "explanation": "Area = |12| * |4| = 12 * 4 = 48."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "48"
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
    "id": "learn:basic-arithmetic-operations:power-with-bounded-exponent",
    "bankId": "T02-Q19",
    "slug": "power-with-bounded-exponent",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Power With Bounded Exponent",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. Compute a raised to the power |b| modulo 7, defined as (a^|b|) % 7, and print the non-negative result.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer (a^|b|) % 7.",
    "constraints": "-100 ≤ a, b ≤ 100",
    "examples": [
      {
        "input": "7 3",
        "output": "0",
        "explanation": "(7^3) mod 7 = 0."
      },
      {
        "input": "12 4",
        "output": "2",
        "explanation": "(12^4) mod 7 = 2."
      },
      {
        "input": "1 1",
        "output": "1",
        "explanation": "(1^1) mod 7 = 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "12 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "1 1",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <cmath>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:basic-arithmetic-operations:digit-sum-of-product",
    "bankId": "T02-Q20",
    "slug": "digit-sum-of-product",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Digit Sum of Product",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. Multiply a and b, then calculate and print the sum of all decimal digits in the absolute value |a * b|.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the sum of decimal digits of |a * b|.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "3",
        "explanation": "|7 * 3| = 21. Sum of digits of 21 is 3."
      },
      {
        "input": "0 5",
        "output": "0",
        "explanation": "|0 * 5| = 0. Sum of digits of 0 is 0."
      },
      {
        "input": "12 4",
        "output": "12",
        "explanation": "|12 * 4| = 48. Sum of digits of 48 is 12."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const a = parseInt(data[0], 10);\n    const b = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong();\n        long b = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    if (cin >> a >> b) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
