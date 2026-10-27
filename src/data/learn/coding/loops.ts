import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:loops:sum-from-one-to-n",
    "bankId": "T04-Q01",
    "slug": "sum-from-one-to-n",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Sum from One to N",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Read a non-negative integer n from standard input. Calculate and print the sum of integers from 1 through n (1 + 2 + ... + n). If n is 0, the sum is 0.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the integer sum.",
    "constraints": "0 ≤ n ≤ 10^5",
    "examples": [
      {
        "input": "5",
        "output": "15",
        "explanation": "Sum 1 through 5 is 15 = 15."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Sum 1 through 0 is 0 = 0."
      },
      {
        "input": "8",
        "output": "36",
        "explanation": "Sum 1 through 8 is 36 = 36."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "15"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:loops:factorial-with-a-loop",
    "bankId": "T04-Q02",
    "slug": "factorial-with-a-loop",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Factorial with a Loop",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Read a non-negative integer n from standard input. Compute and print n factorial (n!) using a loop. By definition, 0! = 1.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the value of n!.",
    "constraints": "0 ≤ n ≤ 20",
    "examples": [
      {
        "input": "5",
        "output": "120",
        "explanation": "5! = 120."
      },
      {
        "input": "0",
        "output": "1",
        "explanation": "0! = 1."
      },
      {
        "input": "8",
        "output": "40320",
        "explanation": "8! = 40320."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "120"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "40320"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
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
    "id": "learn:loops:first-n-square-sum",
    "bankId": "T04-Q03",
    "slug": "first-n-square-sum",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "First N Square Sum",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Read a non-negative integer n from standard input. Compute the sum of squares of the first n positive integers, 1^2 + 2^2 + ... + n^2, and print the result. If n is 0, print 0.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the sum of squares.",
    "constraints": "0 ≤ n ≤ 10^5",
    "examples": [
      {
        "input": "5",
        "output": "55",
        "explanation": "Sum of squares 1^2 through 5^2 is 55."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Sum of squares 1^2 through 0^2 is 0."
      },
      {
        "input": "8",
        "output": "204",
        "explanation": "Sum of squares 1^2 through 8^2 is 204."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "55"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "204"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = BigInt(s);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:loops:first-n-cube-sum",
    "bankId": "T04-Q04",
    "slug": "first-n-cube-sum",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "First N Cube Sum",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Read a non-negative integer n from standard input. Compute the sum of cubes of the first n positive integers, 1^3 + 2^3 + ... + n^3, and print the result. If n is 0, print 0.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the sum of cubes.",
    "constraints": "0 ≤ n ≤ 10^5",
    "examples": [
      {
        "input": "5",
        "output": "225",
        "explanation": "Sum of cubes 1^3 through 5^3 is 225."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Sum of cubes 1^3 through 0^3 is 0."
      },
      {
        "input": "8",
        "output": "1296",
        "explanation": "Sum of cubes 1^3 through 8^3 is 1296."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "225"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "1296"
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
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = BigInt(s);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:loops:even-numbers-through-n",
    "bankId": "T04-Q05",
    "slug": "even-numbers-through-n",
    "languages": ["python","nodejs"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Even Numbers Through N",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Read a non-negative integer n from standard input. Find all even integers from 0 through n inclusive, and print them separated by spaces on a single line. If no such numbers exist, print \"EMPTY\".",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the even integers space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5",
    "examples": [
      {
        "input": "5",
        "output": "0 2 4",
        "explanation": "Even integers from 0 through 5 are: 0 2 4."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Even integers from 0 through 0 are: 0."
      },
      {
        "input": "8",
        "output": "0 2 4 6 8",
        "explanation": "Even integers from 0 through 8 are: 0 2 4 6 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "0 2 4"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "0 2 4 6 8"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:loops:odd-numbers-through-n",
    "bankId": "T04-Q06",
    "slug": "odd-numbers-through-n",
    "languages": ["python","nodejs"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Odd Numbers Through N",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Read a non-negative integer n from standard input. Find all positive odd integers up to n (1 ≤ x ≤ n), and print them separated by spaces on a single line. If no such numbers exist, print \"EMPTY\".",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the odd integers space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5",
    "examples": [
      {
        "input": "5",
        "output": "1 3 5",
        "explanation": "Positive odd integers up to 5 are: 1 3 5."
      },
      {
        "input": "0",
        "output": "EMPTY",
        "explanation": "Positive odd integers up to 0 are: EMPTY."
      },
      {
        "input": "8",
        "output": "1 3 5 7",
        "explanation": "Positive odd integers up to 8 are: 1 3 5 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "1 3 5"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "1 3 5 7"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:loops:number-of-multiples-of-three",
    "bankId": "T04-Q07",
    "slug": "number-of-multiples-of-three",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Number of Multiples of Three",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Read a non-negative integer n from standard input. Count and print how many positive integers in the range 1 through n are divisible by 3.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the count of multiples of 3.",
    "constraints": "0 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "5",
        "output": "1",
        "explanation": "There are 1 multiples of 3 in the range 1 through 5."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "There are 0 multiples of 3 in the range 1 through 0."
      },
      {
        "input": "8",
        "output": "2",
        "explanation": "There are 2 multiples of 3 in the range 1 through 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
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
    "id": "learn:loops:powers-of-two-table",
    "bankId": "T04-Q08",
    "slug": "powers-of-two-table",
    "languages": ["python","nodejs"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Powers of Two Table",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Read a non-negative integer n from standard input. Generate the first n powers of two starting from 2^0 (i.e. 2^0, 2^1, ..., 2^(n-1)), and print them space-separated on a single line. If n is 0, print \"EMPTY\".",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the space-separated powers of two, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 60",
    "examples": [
      {
        "input": "5",
        "output": "1 2 4 8 16",
        "explanation": "The first 5 powers of two are: 1 2 4 8 16."
      },
      {
        "input": "0",
        "output": "EMPTY",
        "explanation": "The first 0 powers of two are: EMPTY."
      },
      {
        "input": "8",
        "output": "1 2 4 8 16 32 64 128",
        "explanation": "The first 8 powers of two are: 1 2 4 8 16 32 64 128."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "1 2 4 8 16"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "1 2 4 8 16 32 64 128"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:loops:reverse-range",
    "bankId": "T04-Q09",
    "slug": "reverse-range",
    "languages": ["python","nodejs"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Reverse Range",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Read a non-negative integer n from standard input. Generate the sequence of integers from n counting down to 1 (n, n-1, ..., 1), and print them space-separated on a single line. If n is 0, print \"EMPTY\".",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the reversed range space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5",
    "examples": [
      {
        "input": "5",
        "output": "5 4 3 2 1",
        "explanation": "Counting down from 5 to 1 yields: 5 4 3 2 1."
      },
      {
        "input": "0",
        "output": "EMPTY",
        "explanation": "Counting down from 0 to 1 yields: EMPTY."
      },
      {
        "input": "8",
        "output": "8 7 6 5 4 3 2 1",
        "explanation": "Counting down from 8 to 1 yields: 8 7 6 5 4 3 2 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "5 4 3 2 1"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "8 7 6 5 4 3 2 1"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:loops:cumulative-sums",
    "bankId": "T04-Q10",
    "slug": "cumulative-sums",
    "languages": ["python","nodejs"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Cumulative Sums",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Read a non-negative integer n from standard input. Compute the cumulative prefix sums of the first n positive integers (1, 1+2, 1+2+3, ..., 1+...+n), and print them space-separated on a single line. If n is 0, print \"EMPTY\".",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the cumulative sums space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5",
    "examples": [
      {
        "input": "5",
        "output": "1 3 6 10 15",
        "explanation": "The first 5 cumulative sums are: 1 3 6 10 15."
      },
      {
        "input": "0",
        "output": "EMPTY",
        "explanation": "The first 0 cumulative sums are: EMPTY."
      },
      {
        "input": "8",
        "output": "1 3 6 10 15 21 28 36",
        "explanation": "The first 8 cumulative sums are: 1 3 6 10 15 21 28 36."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "1 3 6 10 15"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "1 3 6 10 15 21 28 36"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:loops:fibonacci-at-position-n",
    "bankId": "T04-Q11",
    "slug": "fibonacci-at-position-n",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Fibonacci at Position N",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Read a non-negative integer n from standard input. Compute and print the n-th Fibonacci number F_n, where F_0 = 0, F_1 = 1, and F_i = F_(i-1) + F_(i-2).",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the n-th Fibonacci number.",
    "constraints": "0 ≤ n ≤ 50",
    "examples": [
      {
        "input": "5",
        "output": "5",
        "explanation": "F_5 = 5."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "F_0 = 0."
      },
      {
        "input": "8",
        "output": "21",
        "explanation": "F_8 = 21."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "21"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:loops:fibonacci-prefix",
    "bankId": "T04-Q12",
    "slug": "fibonacci-prefix",
    "languages": ["python","nodejs"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Fibonacci Prefix",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Read a non-negative integer n from standard input. Generate the prefix of the first n Fibonacci numbers [F_0, F_1, ..., F_(n-1)], with F_0 = 0 and F_1 = 1, and print them space-separated on a single line. If n is 0, print \"EMPTY\".",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the first n Fibonacci numbers space-separated, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 50",
    "examples": [
      {
        "input": "5",
        "output": "0 1 1 2 3",
        "explanation": "The first 5 Fibonacci numbers are: 0 1 1 2 3."
      },
      {
        "input": "0",
        "output": "EMPTY",
        "explanation": "The first 0 Fibonacci numbers are: EMPTY."
      },
      {
        "input": "8",
        "output": "0 1 1 2 3 5 8 13",
        "explanation": "The first 8 Fibonacci numbers are: 0 1 1 2 3 5 8 13."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "0 1 1 2 3"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "0 1 1 2 3 5 8 13"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:loops:primes-up-to-n",
    "bankId": "T04-Q13",
    "slug": "primes-up-to-n",
    "languages": ["python","nodejs"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Primes Up to N",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Read a non-negative integer n from standard input. Find all prime numbers less than or equal to n in increasing order, and print them space-separated on a single line. If no primes exist, print \"EMPTY\".",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the prime numbers space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5",
    "examples": [
      {
        "input": "5",
        "output": "2 3 5",
        "explanation": "Primes up to 5 are: 2 3 5."
      },
      {
        "input": "0",
        "output": "EMPTY",
        "explanation": "Primes up to 0 are: EMPTY."
      },
      {
        "input": "8",
        "output": "2 3 5 7",
        "explanation": "Primes up to 8 are: 2 3 5 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "2 3 5"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "2 3 5 7"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:loops:prime-count-up-to-n",
    "bankId": "T04-Q14",
    "slug": "prime-count-up-to-n",
    "languages": ["python","nodejs"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Prime Count Up to N",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Read a non-negative integer n from standard input. Count and print how many prime numbers are less than or equal to n.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the count of primes ≤ n.",
    "constraints": "0 ≤ n ≤ 10^5",
    "examples": [
      {
        "input": "5",
        "output": "3",
        "explanation": "There are 3 prime numbers less than or equal to 5."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "There are 0 prime numbers less than or equal to 0."
      },
      {
        "input": "8",
        "output": "4",
        "explanation": "There are 4 prime numbers less than or equal to 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:loops:multiplication-table-of-n",
    "bankId": "T04-Q15",
    "slug": "multiplication-table-of-n",
    "languages": ["python","nodejs"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Multiplication Table of N",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Read an integer n from standard input. Compute the first 10 multiples of n (n*1, n*2, ..., n*10), and print them space-separated on a single line.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the 10 space-separated multiples of n.",
    "constraints": "-10^6 ≤ n ≤ 10^6",
    "examples": [
      {
        "input": "5",
        "output": "5 10 15 20 25 30 35 40 45 50",
        "explanation": "Multiplication table of 5 from 1 to 10: 5 10 15 20 25 30 35 40 45 50."
      },
      {
        "input": "0",
        "output": "0 0 0 0 0 0 0 0 0 0",
        "explanation": "Multiplication table of 0 from 1 to 10: 0 0 0 0 0 0 0 0 0 0."
      },
      {
        "input": "8",
        "output": "8 16 24 32 40 48 56 64 72 80",
        "explanation": "Multiplication table of 8 from 1 to 10: 8 16 24 32 40 48 56 64 72 80."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "5 10 15 20 25 30 35 40 45 50"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0 0 0 0 0 0 0 0 0 0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "8 16 24 32 40 48 56 64 72 80"
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
    "id": "learn:loops:alternating-sum",
    "bankId": "T04-Q16",
    "slug": "alternating-sum",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Alternating Sum",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Read a non-negative integer n from standard input. Compute the alternating sum 1 - 2 + 3 - 4 + ... + (-1)^(n+1) * n, and print the resulting integer. If n is 0, print 0.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the alternating sum value.",
    "constraints": "0 ≤ n ≤ 10^5",
    "examples": [
      {
        "input": "5",
        "output": "3",
        "explanation": "Alternating sum up to 5 is 3."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Alternating sum up to 0 is 0."
      },
      {
        "input": "8",
        "output": "-4",
        "explanation": "Alternating sum up to 8 is -4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "-4"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:loops:divisor-list",
    "bankId": "T04-Q17",
    "slug": "divisor-list",
    "languages": ["python","nodejs"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Divisor List",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Read a non-negative integer n from standard input. Find all positive divisors of n in increasing order, and print them space-separated on a single line. If n is 0, print \"EMPTY\".",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the positive divisors space-separated, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^6",
    "examples": [
      {
        "input": "5",
        "output": "1 5",
        "explanation": "Positive divisors of 5 are: 1 5."
      },
      {
        "input": "0",
        "output": "EMPTY",
        "explanation": "Positive divisors of 0 are: EMPTY."
      },
      {
        "input": "8",
        "output": "1 2 4 8",
        "explanation": "Positive divisors of 8 are: 1 2 4 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "1 5"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "1 2 4 8"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:loops:count-digits-in-n-factorial",
    "bankId": "T04-Q18",
    "slug": "count-digits-in-n-factorial",
    "languages": ["python","nodejs"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Count Digits in N Factorial",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Read a non-negative integer n from standard input. Calculate n factorial (n!) and print the total number of decimal digits in its standard decimal representation. (By definition, 0! = 1, which has 1 digit).",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the digit count of n!.",
    "constraints": "0 ≤ n ≤ 1000",
    "examples": [
      {
        "input": "5",
        "output": "3",
        "explanation": "5! has 3 decimal digit(s)."
      },
      {
        "input": "0",
        "output": "1",
        "explanation": "0! has 1 decimal digit(s)."
      },
      {
        "input": "8",
        "output": "5",
        "explanation": "8! has 5 decimal digit(s)."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "8",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.math.BigInteger;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <cmath>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:loops:binary-digits-through-repetition",
    "bankId": "T04-Q19",
    "slug": "binary-digits-through-repetition",
    "languages": ["python","nodejs"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Binary Digits Through Repetition",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Read a non-negative integer n from standard input. Convert n to its standard binary string without leading zeros (e.g. 5 -> 101, 0 -> 0) using repeated division by two, and print the resulting binary string.",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the binary string representation.",
    "constraints": "0 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "5",
        "output": "101",
        "explanation": "The binary representation of 5 is 101."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "The binary representation of 0 is 0."
      },
      {
        "input": "8",
        "output": "1000",
        "explanation": "The binary representation of 8 is 1000."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "101"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "1000"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
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
    "id": "learn:loops:triangular-number-rows",
    "bankId": "T04-Q20",
    "slug": "triangular-number-rows",
    "languages": ["python","nodejs"],
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Triangular Number Rows",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Read a non-negative integer n from standard input. Generate the sequence of the first n triangular numbers [T_1, T_2, ..., T_n], where T_k = k*(k+1)/2, and print them space-separated on a single line. If n is 0, print \"EMPTY\".",
    "inputFormat": "A single line containing an integer n.",
    "outputFormat": "Print the first n triangular numbers space-separated, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5",
    "examples": [
      {
        "input": "5",
        "output": "1 3 6 10 15",
        "explanation": "The first 5 triangular numbers are: 1 3 6 10 15."
      },
      {
        "input": "0",
        "output": "EMPTY",
        "explanation": "The first 0 triangular numbers are: EMPTY."
      },
      {
        "input": "8",
        "output": "1 3 6 10 15 21 28 36",
        "explanation": "The first 8 triangular numbers are: 1 3 6 10 15 21 28 36."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "1 3 6 10 15"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "1 3 6 10 15 21 28 36"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    n = int(s)\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').trim();\nif (s) {\n    const n = parseInt(s, 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
