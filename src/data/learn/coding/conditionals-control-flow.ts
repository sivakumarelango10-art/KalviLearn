import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:conditionals-control-flow:maximum-of-three",
    "bankId": "T03-Q01",
    "slug": "maximum-of-three",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Maximum of Three",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Read three integers a, b, and c from standard input. Find and print the maximum value among them.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print the maximum integer value.",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "5",
        "explanation": "Comparing 3, 4, and 5, the maximum is 5."
      },
      {
        "input": "0 0 0",
        "output": "0",
        "explanation": "Comparing 0, 0, and 0, the maximum is 0."
      },
      {
        "input": "9 4 1",
        "output": "9",
        "explanation": "Comparing 9, 4, and 1, the maximum is 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "9 4 1",
        "expectedOutput": "9"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:minimum-of-three",
    "bankId": "T03-Q02",
    "slug": "minimum-of-three",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Minimum of Three",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Read three integers a, b, and c from standard input. Find and print the minimum value among them.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print the minimum integer value.",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "3",
        "explanation": "Comparing 3, 4, and 5, the minimum is 3."
      },
      {
        "input": "0 0 0",
        "output": "0",
        "explanation": "Comparing 0, 0, and 0, the minimum is 0."
      },
      {
        "input": "9 4 1",
        "output": "1",
        "explanation": "Comparing 9, 4, and 1, the minimum is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "9 4 1",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:median-of-three",
    "bankId": "T03-Q03",
    "slug": "median-of-three",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Median of Three",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Read three integers a, b, and c from standard input. Find and print the median value (the middle value when sorted).",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print the median integer value.",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "4",
        "explanation": "Sorting [3, 4, 5] yields [3, 4, 5], whose median is 4."
      },
      {
        "input": "0 0 0",
        "output": "0",
        "explanation": "Sorting [0, 0, 0] yields [0, 0, 0], whose median is 0."
      },
      {
        "input": "1 1 2",
        "output": "1",
        "explanation": "Sorting [1, 1, 2] yields [1, 1, 2], whose median is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 1 2",
        "expectedOutput": "1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long[] arr = {sc.nextLong(), sc.nextLong(), sc.nextLong()};\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <algorithm>\n#include <vector>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:all-three-equal",
    "bankId": "T03-Q04",
    "slug": "all-three-equal",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "All Three Equal",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Read three integers a, b, and c from standard input. Determine whether all three numbers are equal (a == b == c). Print \"true\" if they are, or \"false\" otherwise.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print \"true\" if all three are equal, otherwise \"false\".",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "false",
        "explanation": "3 == 4 == 5 is false."
      },
      {
        "input": "0 0 0",
        "output": "true",
        "explanation": "0 == 0 == 0 is true."
      },
      {
        "input": "9 4 1",
        "output": "false",
        "explanation": "9 == 4 == 1 is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "9 4 1",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:exactly-two-equal",
    "bankId": "T03-Q05",
    "slug": "exactly-two-equal",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Exactly Two Equal",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Read three integers a, b, and c from standard input. Determine whether exactly two of the three integers are equal and the third is different. Print \"true\" if so, or \"false\" otherwise.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print \"true\" if exactly two values are equal, otherwise \"false\".",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "false",
        "explanation": "Among 3, 4, and 5, exactly two equal is false."
      },
      {
        "input": "1 1 2",
        "output": "true",
        "explanation": "Among 1, 1, and 2, exactly two equal is true."
      },
      {
        "input": "0 0 0",
        "output": "false",
        "explanation": "Among 0, 0, and 0, exactly two equal is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "1 1 2",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "0 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:strict-increasing-order",
    "bankId": "T03-Q06",
    "slug": "strict-increasing-order",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Strict Increasing Order",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Read three integers a, b, and c from standard input. Check if they appear in strictly increasing order (a < b < c). Print \"true\" if they do, or \"false\" otherwise.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print \"true\" if a < b < c, otherwise \"false\".",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "true",
        "explanation": "3 < 4 < 5 is true."
      },
      {
        "input": "0 0 0",
        "output": "false",
        "explanation": "0 < 0 < 0 is false."
      },
      {
        "input": "9 4 1",
        "output": "false",
        "explanation": "9 < 4 < 1 is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "9 4 1",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:nondecreasing-order",
    "bankId": "T03-Q07",
    "slug": "nondecreasing-order",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Nondecreasing Order",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Read three integers a, b, and c from standard input. Check if they appear in non-decreasing order (a ≤ b ≤ c). Print \"true\" if they do, or \"false\" otherwise.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print \"true\" if a ≤ b ≤ c, otherwise \"false\".",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "true",
        "explanation": "3 <= 4 <= 5 is true."
      },
      {
        "input": "9 4 1",
        "output": "false",
        "explanation": "9 <= 4 <= 1 is false."
      },
      {
        "input": "0 0 0",
        "output": "true",
        "explanation": "0 <= 0 <= 0 is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "9 4 1",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "0 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:classify-sum-sign",
    "bankId": "T03-Q08",
    "slug": "classify-sum-sign",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Classify Sum Sign",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Read three integers a, b, and c from standard input. Compute their sum (a + b + c) and print \"positive\" if the sum is greater than 0, \"negative\" if it is less than 0, or \"zero\" if it is 0.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print \"positive\", \"negative\", or \"zero\".",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "positive",
        "explanation": "Sum 3 + 4 + 5 = 12, which is positive."
      },
      {
        "input": "0 0 0",
        "output": "zero",
        "explanation": "Sum 0 + 0 + 0 = 0, which is zero."
      },
      {
        "input": "-4 -2 -3",
        "output": "negative",
        "explanation": "Sum -4 + -2 + -3 = -9, which is negative."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "positive"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "zero"
      },
      {
        "testIndex": 3,
        "input": "-4 -2 -3",
        "expectedOutput": "negative"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:largest-absolute-value",
    "bankId": "T03-Q09",
    "slug": "largest-absolute-value",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Largest Absolute Value",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Read three integers a, b, and c from standard input. Find and print the largest absolute value among |a|, |b|, and |c|.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print the maximum absolute value.",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "5",
        "explanation": "|3| = 3, |4| = 4, |5| = 5. Largest is 5."
      },
      {
        "input": "0 0 0",
        "output": "0",
        "explanation": "|0| = 0, |0| = 0, |0| = 0. Largest is 0."
      },
      {
        "input": "9 4 1",
        "output": "9",
        "explanation": "|9| = 9, |4| = 4, |1| = 1. Largest is 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "9 4 1",
        "expectedOutput": "9"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <cmath>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:count-positive-numbers",
    "bankId": "T03-Q10",
    "slug": "count-positive-numbers",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Count Positive Numbers",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Read three integers a, b, and c from standard input. Count and print how many of the numbers are strictly greater than zero.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print the count of positive integers.",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "3",
        "explanation": "Among 3, 4, 5, 3 are strictly greater than 0."
      },
      {
        "input": "0 0 0",
        "output": "0",
        "explanation": "Among 0, 0, 0, 0 are strictly greater than 0."
      },
      {
        "input": "-3 2 5",
        "output": "2",
        "explanation": "Among -3, 2, 5, 2 are strictly greater than 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "-3 2 5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:count-even-numbers",
    "bankId": "T03-Q11",
    "slug": "count-even-numbers",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Count Even Numbers",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Read three integers a, b, and c from standard input. Count and print how many of the numbers are even.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print the count of even integers.",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "1",
        "explanation": "Among 3, 4, 5, 1 are divisible by 2."
      },
      {
        "input": "0 0 0",
        "output": "3",
        "explanation": "Among 0, 0, 0, 3 are divisible by 2."
      },
      {
        "input": "5 5 5",
        "output": "0",
        "explanation": "Among 5, 5, 5, 0 are divisible by 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5 5 5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:triangle-possibility",
    "bankId": "T03-Q12",
    "slug": "triangle-possibility",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Triangle Possibility",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Read three integers a, b, and c from standard input. Determine whether all three are strictly positive and can form the side lengths of a non-degenerate triangle (the sum of any two sides must strictly exceed the third). Print \"true\" if possible, or \"false\" otherwise.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print \"true\" if a triangle is possible, otherwise \"false\".",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "true",
        "explanation": "Side lengths 3, 4, 5 forming a triangle is true."
      },
      {
        "input": "0 0 0",
        "output": "false",
        "explanation": "Side lengths 0, 0, 0 forming a triangle is false."
      },
      {
        "input": "9 4 1",
        "output": "false",
        "explanation": "Side lengths 9, 4, 1 forming a triangle is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "9 4 1",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:right-triangle-test",
    "bankId": "T03-Q13",
    "slug": "right-triangle-test",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Right Triangle Test",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Read three integers a, b, and c from standard input. Determine whether they are all strictly positive and satisfy the Pythagorean theorem (x^2 + y^2 == z^2 for some permutation) to form a right triangle. Print \"true\" if so, or \"false\" otherwise.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print \"true\" if they form a right triangle, otherwise \"false\".",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "true",
        "explanation": "For sorted sides [3, 4, 5], 3^2 + 4^2 = 25 vs 5^2 = 25. Right triangle: true."
      },
      {
        "input": "0 0 0",
        "output": "false",
        "explanation": "For sorted sides [0, 0, 0], 0^2 + 0^2 = 0 vs 0^2 = 0. Right triangle: false."
      },
      {
        "input": "9 4 1",
        "output": "false",
        "explanation": "For sorted sides [1, 4, 9], 1^2 + 4^2 = 17 vs 9^2 = 81. Right triangle: false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "9 4 1",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long[] arr = {sc.nextLong(), sc.nextLong(), sc.nextLong()};\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <algorithm>\n#include <vector>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:range-inclusive-check",
    "bankId": "T03-Q14",
    "slug": "range-inclusive-check",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Range Inclusive Check",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Read three integers a, b, and c from standard input. Determine whether a lies within the inclusive range between b and c, min(b, c) ≤ a ≤ max(b, c). Print \"true\" if it does, or \"false\" otherwise.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print \"true\" if a is in [min(b,c), max(b,c)], otherwise \"false\".",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "false",
        "explanation": "4 <= 3 <= 5 is false."
      },
      {
        "input": "0 0 0",
        "output": "true",
        "explanation": "0 <= 0 <= 0 is true."
      },
      {
        "input": "9 4 1",
        "output": "false",
        "explanation": "1 <= 9 <= 4 is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "9 4 1",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:parity-majority",
    "bankId": "T03-Q15",
    "slug": "parity-majority",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Parity Majority",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Read three integers a, b, and c from standard input. Determine which parity is the majority among them. Print \"even\" if at least two are even, or \"odd\" otherwise.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print \"even\" or \"odd\".",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "odd",
        "explanation": "There are 1 even number(s) and 2 odd number(s). Majority parity is odd."
      },
      {
        "input": "0 0 0",
        "output": "even",
        "explanation": "There are 3 even number(s) and 0 odd number(s). Majority parity is even."
      },
      {
        "input": "9 4 1",
        "output": "odd",
        "explanation": "There are 1 even number(s) and 2 odd number(s). Majority parity is odd."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "odd"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "even"
      },
      {
        "testIndex": 3,
        "input": "9 4 1",
        "expectedOutput": "odd"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:choose-nearest-to-target",
    "bankId": "T03-Q16",
    "slug": "choose-nearest-to-target",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Choose Nearest to Target",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Read three integers a, b, and c from standard input. Find which of a or b is closer to the target c. If they are equally close, choose the smaller of a and b.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print the chosen integer value.",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "4",
        "explanation": "Distances to 5: |3 - 5| = 2, |4 - 5| = 1. Chosen value: 4."
      },
      {
        "input": "0 0 0",
        "output": "0",
        "explanation": "Distances to 0: |0 - 0| = 0, |0 - 0| = 0. Chosen value: 0."
      },
      {
        "input": "1 1 2",
        "output": "1",
        "explanation": "Distances to 2: |1 - 2| = 1, |1 - 2| = 1. Chosen value: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 1 2",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <cmath>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:basic-triangle-classification",
    "bankId": "T03-Q17",
    "slug": "basic-triangle-classification",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Basic Triangle Classification",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Read three integers a, b, and c from standard input representing potential side lengths. If they cannot form a non-degenerate triangle, print \"invalid\". Otherwise, print \"equilateral\" if all three sides are equal, \"isosceles\" if exactly two sides are equal, or \"scalene\" if all three sides are distinct.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print \"invalid\", \"equilateral\", \"isosceles\", or \"scalene\".",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "scalene",
        "explanation": "Sides 3, 4, 5 classify as scalene."
      },
      {
        "input": "0 0 0",
        "output": "invalid",
        "explanation": "Sides 0, 0, 0 classify as invalid."
      },
      {
        "input": "5 5 5",
        "output": "equilateral",
        "explanation": "Sides 5, 5, 5 classify as equilateral."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "scalene"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "invalid"
      },
      {
        "testIndex": 3,
        "input": "5 5 5",
        "expectedOutput": "equilateral"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:select-first-maximum-variable",
    "bankId": "T03-Q18",
    "slug": "select-first-maximum-variable",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Select First Maximum Variable",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Read three integers a, b, and c from standard input. Find the maximum value and print the name of the first variable holding that maximum, checking in order \"a\", then \"b\", then \"c\".",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print \"a\", \"b\", or \"c\".",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "c",
        "explanation": "Values are a=3, b=4, c=5. Maximum is 5, first achieved at c."
      },
      {
        "input": "0 0 0",
        "output": "a",
        "explanation": "Values are a=0, b=0, c=0. Maximum is 0, first achieved at a."
      },
      {
        "input": "-4 -2 -3",
        "output": "b",
        "explanation": "Values are a=-4, b=-2, c=-3. Maximum is -2, first achieved at b."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "c"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "a"
      },
      {
        "testIndex": 3,
        "input": "-4 -2 -3",
        "expectedOutput": "b"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:all-values-same-sign",
    "bankId": "T03-Q19",
    "slug": "all-values-same-sign",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "All Values Same Sign",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Read three integers a, b, and c from standard input. Determine whether all three numbers have the exact same sign (all strictly positive or all strictly negative). Print \"true\" if so, or \"false\" otherwise.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print \"true\" if all three share the same non-zero sign, otherwise \"false\".",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "true",
        "explanation": "For 3, 4, 5, all having the same sign is true."
      },
      {
        "input": "0 0 0",
        "output": "false",
        "explanation": "For 0, 0, 0, all having the same sign is false."
      },
      {
        "input": "9 4 1",
        "output": "true",
        "explanation": "For 9, 4, 1, all having the same sign is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "9 4 1",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:conditionals-control-flow:clamp-to-dynamic-bounds",
    "bankId": "T03-Q20",
    "slug": "clamp-to-dynamic-bounds",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Clamp to Dynamic Bounds",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Read three integers a, b, and c from standard input. Clamp a into the inclusive range between endpoints b and c, [min(b, c), max(b, c)]. Print the clamped integer value.",
    "inputFormat": "A single line containing three space-separated integers a, b, and c.",
    "outputFormat": "Print the clamped integer value.",
    "constraints": "-10^9 ≤ a, b, c ≤ 10^9",
    "examples": [
      {
        "input": "3 4 5",
        "output": "4",
        "explanation": "Clamping 3 into [4, 5] produces 4."
      },
      {
        "input": "0 0 0",
        "output": "0",
        "explanation": "Clamping 0 into [0, 0] produces 0."
      },
      {
        "input": "1 1 2",
        "output": "1",
        "explanation": "Clamping 1 into [1, 2] produces 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0 0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 1 2",
        "expectedOutput": "1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    a, b, c = map(int, data[:3])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const [a, b, c] = data.slice(0, 3).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long a = sc.nextLong(), b = sc.nextLong(), c = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    long long a, b, c;\n    if (cin >> a >> b >> c) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
