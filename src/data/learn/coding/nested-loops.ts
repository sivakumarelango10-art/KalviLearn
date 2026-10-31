import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:nested-loops:all-coordinate-pairs",
    "bankId": "T05-Q01",
    "slug": "all-coordinate-pairs",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "All Coordinate Pairs",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a grid of coordinate pairs (r,c) for 0 ≤ r < rows and 0 ≤ c < cols in row-major order. Print each row on a new line with coordinate pairs separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols coordinate pairs in the format (r,c) separated by spaces.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "(0,0) (0,1) (0,2) (0,3)\n(1,0) (1,1) (1,2) (1,3)\n(2,0) (2,1) (2,2) (2,3)",
        "explanation": "For a 3x4 grid, coordinates range from (0,0) to (2,3)."
      },
      {
        "input": "1 1",
        "output": "(0,0)",
        "explanation": "For a 1x1 grid, coordinates range from (0,0) to (0,0)."
      },
      {
        "input": "4 2",
        "output": "(0,0) (0,1)\n(1,0) (1,1)\n(2,0) (2,1)\n(3,0) (3,1)",
        "explanation": "For a 4x2 grid, coordinates range from (0,0) to (3,1)."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "(0,0) (0,1) (0,2) (0,3)\n(1,0) (1,1) (1,2) (1,3)\n(2,0) (2,1) (2,2) (2,3)"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "(0,0)"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "(0,0) (0,1)\n(1,0) (1,1)\n(2,0) (2,1)\n(3,0) (3,1)"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:addition-grid",
    "bankId": "T05-Q02",
    "slug": "addition-grid",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Addition Grid",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a grid of size rows x cols where each cell (r, c) contains the sum of its zero-based indices (r + c). Print each row on a new line with values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "0 1 2 3\n1 2 3 4\n2 3 4 5",
        "explanation": "Each cell (r, c) has value r + c."
      },
      {
        "input": "1 1",
        "output": "0",
        "explanation": "Each cell (r, c) has value r + c."
      },
      {
        "input": "4 2",
        "output": "0 1\n1 2\n2 3\n3 4",
        "explanation": "Each cell (r, c) has value r + c."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "0 1 2 3\n1 2 3 4\n2 3 4 5"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "0 1\n1 2\n2 3\n3 4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:multiplication-grid",
    "bankId": "T05-Q03",
    "slug": "multiplication-grid",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Multiplication Grid",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a multiplication table grid of size rows x cols where cell (r, c) contains (r + 1) * (c + 1) for 0 ≤ r < rows and 0 ≤ c < cols. Print each row on a new line with values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "1 2 3 4\n2 4 6 8\n3 6 9 12",
        "explanation": "Each cell has 1-based product (r + 1) * (c + 1)."
      },
      {
        "input": "1 1",
        "output": "1",
        "explanation": "Each cell has 1-based product (r + 1) * (c + 1)."
      },
      {
        "input": "4 2",
        "output": "1 2\n2 4\n3 6\n4 8",
        "explanation": "Each cell has 1-based product (r + 1) * (c + 1)."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "1 2 3 4\n2 4 6 8\n3 6 9 12"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "1 2\n2 4\n3 6\n4 8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:row-index-grid",
    "bankId": "T05-Q04",
    "slug": "row-index-grid",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Row Index Grid",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a grid of size rows x cols where every element in row r equals r (0 ≤ r < rows). Print each row on a new line with values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "0 0 0 0\n1 1 1 1\n2 2 2 2",
        "explanation": "Row r consists of 4 copies of integer r."
      },
      {
        "input": "1 1",
        "output": "0",
        "explanation": "Row r consists of 1 copies of integer r."
      },
      {
        "input": "4 2",
        "output": "0 0\n1 1\n2 2\n3 3",
        "explanation": "Row r consists of 2 copies of integer r."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "0 0 0 0\n1 1 1 1\n2 2 2 2"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "0 0\n1 1\n2 2\n3 3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:column-index-grid",
    "bankId": "T05-Q05",
    "slug": "column-index-grid",
    "languages": ["python","nodejs","java","cpp"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Column Index Grid",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a grid of size rows x cols where each cell (r, c) equals the column index c (0 ≤ c < cols). Print each row on a new line with values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "0 1 2 3\n0 1 2 3\n0 1 2 3",
        "explanation": "Each row lists column indices 0 through 3."
      },
      {
        "input": "1 1",
        "output": "0",
        "explanation": "Each row lists column indices 0 through 0."
      },
      {
        "input": "4 2",
        "output": "0 1\n0 1\n0 1\n0 1",
        "explanation": "Each row lists column indices 0 through 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "0 1 2 3\n0 1 2 3\n0 1 2 3"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "0 1\n0 1\n0 1\n0 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:checkerboard-digits",
    "bankId": "T05-Q06",
    "slug": "checkerboard-digits",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Checkerboard Digits",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a checkerboard grid of size rows x cols where cell (r, c) contains (r + c) % 2. Print each row on a new line with values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated binary digits (0 or 1).",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "0 1 0 1\n1 0 1 0\n0 1 0 1",
        "explanation": "Alternating 0 and 1 checkerboard pattern."
      },
      {
        "input": "1 1",
        "output": "0",
        "explanation": "Alternating 0 and 1 checkerboard pattern."
      },
      {
        "input": "4 2",
        "output": "0 1\n1 0\n0 1\n1 0",
        "explanation": "Alternating 0 and 1 checkerboard pattern."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "0 1 0 1\n1 0 1 0\n0 1 0 1"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "0 1\n1 0\n0 1\n1 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:main-diagonal-ones",
    "bankId": "T05-Q07",
    "slug": "main-diagonal-ones",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Main Diagonal Ones",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a grid of size rows x cols with 1 on the main diagonal (where r == c) and 0 elsewhere. Print each row on a new line with values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "1 0 0 0\n0 1 0 0\n0 0 1 0",
        "explanation": "Cells with r == c are 1, all others 0."
      },
      {
        "input": "1 1",
        "output": "1",
        "explanation": "Cells with r == c are 1, all others 0."
      },
      {
        "input": "4 2",
        "output": "1 0\n0 1\n0 0\n0 0",
        "explanation": "Cells with r == c are 1, all others 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "1 0 0 0\n0 1 0 0\n0 0 1 0"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "1 0\n0 1\n0 0\n0 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:anti-diagonal-ones",
    "bankId": "T05-Q08",
    "slug": "anti-diagonal-ones",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Anti Diagonal Ones",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a grid of size rows x cols with 1 on the anti-diagonal (where r + c == cols - 1) and 0 elsewhere. Print each row on a new line with values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "0 0 0 1\n0 0 1 0\n0 1 0 0",
        "explanation": "Cells with r + c == 3 are 1, all others 0."
      },
      {
        "input": "1 1",
        "output": "1",
        "explanation": "Cells with r + c == 0 are 1, all others 0."
      },
      {
        "input": "4 2",
        "output": "0 1\n1 0\n0 0\n0 0",
        "explanation": "Cells with r + c == 1 are 1, all others 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "0 0 0 1\n0 0 1 0\n0 1 0 0"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "0 1\n1 0\n0 0\n0 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:border-of-ones",
    "bankId": "T05-Q09",
    "slug": "border-of-ones",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Border of Ones",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a grid of size rows x cols with 1 on the outer border (first row, last row, first column, or last column) and 0 in the interior. Print each row on a new line with values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "1 1 1 1\n1 0 0 1\n1 1 1 1",
        "explanation": "Border cells are 1, interior cells are 0."
      },
      {
        "input": "1 1",
        "output": "1",
        "explanation": "Border cells are 1, interior cells are 0."
      },
      {
        "input": "4 2",
        "output": "1 1\n1 1\n1 1\n1 1",
        "explanation": "Border cells are 1, interior cells are 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "1 1 1 1\n1 0 0 1\n1 1 1 1"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "1 1\n1 1\n1 1\n1 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:upper-triangle-matrix",
    "bankId": "T05-Q10",
    "slug": "upper-triangle-matrix",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Upper Triangle Matrix",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate an upper triangular grid of size rows x cols with 1 where r ≤ c and 0 where r > c. Print each row on a new line with values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "1 1 1 1\n0 1 1 1\n0 0 1 1",
        "explanation": "Cells with r <= c are 1, others 0."
      },
      {
        "input": "1 1",
        "output": "1",
        "explanation": "Cells with r <= c are 1, others 0."
      },
      {
        "input": "4 2",
        "output": "1 1\n0 1\n0 0\n0 0",
        "explanation": "Cells with r <= c are 1, others 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "1 1 1 1\n0 1 1 1\n0 0 1 1"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "1 1\n0 1\n0 0\n0 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:lower-triangle-matrix",
    "bankId": "T05-Q11",
    "slug": "lower-triangle-matrix",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Lower Triangle Matrix",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a lower triangular grid of size rows x cols with 1 where r ≥ c and 0 where r < c. Print each row on a new line with values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "1 0 0 0\n1 1 0 0\n1 1 1 0",
        "explanation": "Cells with r >= c are 1, others 0."
      },
      {
        "input": "1 1",
        "output": "1",
        "explanation": "Cells with r >= c are 1, others 0."
      },
      {
        "input": "4 2",
        "output": "1 0\n1 1\n1 1\n1 1",
        "explanation": "Cells with r >= c are 1, others 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "1 0 0 0\n1 1 0 0\n1 1 1 0"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "1 0\n1 1\n1 1\n1 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:distance-to-bottom-right",
    "bankId": "T05-Q12",
    "slug": "distance-to-bottom-right",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Distance to Bottom Right",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Read two positive integers rows and cols from standard input. Compute the Manhattan distance from each cell (r, c) to the bottom-right corner (rows - 1, cols - 1), defined as (rows - 1 - r) + (cols - 1 - c). Print each row on a new line with distance values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "5 4 3 2\n4 3 2 1\n3 2 1 0",
        "explanation": "Manhattan distance to (2, 3)."
      },
      {
        "input": "1 1",
        "output": "0",
        "explanation": "Manhattan distance to (0, 0)."
      },
      {
        "input": "4 2",
        "output": "4 3\n3 2\n2 1\n1 0",
        "explanation": "Manhattan distance to (3, 1)."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "5 4 3 2\n4 3 2 1\n3 2 1 0"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "4 3\n3 2\n2 1\n1 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:row-major-serial-numbers",
    "bankId": "T05-Q13",
    "slug": "row-major-serial-numbers",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Row Major Serial Numbers",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Read two positive integers rows and cols from standard input. Fill a grid of size rows x cols with 1-based serial numbers in row-major order (cell (r, c) contains r * cols + c + 1). Print each row on a new line with values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "1 2 3 4\n5 6 7 8\n9 10 11 12",
        "explanation": "Row-major serial numbers from 1 to 12."
      },
      {
        "input": "1 1",
        "output": "1",
        "explanation": "Row-major serial numbers from 1 to 1."
      },
      {
        "input": "4 2",
        "output": "1 2\n3 4\n5 6\n7 8",
        "explanation": "Row-major serial numbers from 1 to 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "1 2 3 4\n5 6 7 8\n9 10 11 12"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "1 2\n3 4\n5 6\n7 8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:column-major-serial-numbers",
    "bankId": "T05-Q14",
    "slug": "column-major-serial-numbers",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Column Major Serial Numbers",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Read two positive integers rows and cols from standard input. Fill a grid of size rows x cols with 1-based serial numbers in column-major order (cell (r, c) contains c * rows + r + 1). Print each row on a new line with values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "1 4 7 10\n2 5 8 11\n3 6 9 12",
        "explanation": "Column-major serial numbers from 1 to 12."
      },
      {
        "input": "1 1",
        "output": "1",
        "explanation": "Column-major serial numbers from 1 to 1."
      },
      {
        "input": "4 2",
        "output": "1 5\n2 6\n3 7\n4 8",
        "explanation": "Column-major serial numbers from 1 to 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "1 4 7 10\n2 5 8 11\n3 6 9 12"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "1 5\n2 6\n3 7\n4 8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:right-aligned-star-triangle",
    "bankId": "T05-Q15",
    "slug": "right-aligned-star-triangle",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Right Aligned Star Triangle",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a right-aligned star triangle pattern of size rows x cols, where each row r (0 ≤ r < rows) has r + 1 asterisks (*) right-aligned and padded on the left with dots (.) to reach cols characters. Print each row on a new line.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines of strings of length cols.",
    "constraints": "1 ≤ rows ≤ cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "...*\n..**\n.***",
        "explanation": "Right-aligned triangle with rows lines padded to width 4."
      },
      {
        "input": "1 1",
        "output": "*",
        "explanation": "Right-aligned triangle with rows lines padded to width 1."
      },
      {
        "input": "4 2",
        "output": ".*\n**\n**\n**",
        "explanation": "Right-aligned triangle with rows lines padded to width 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "...*\n..**\n.***"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "*"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": ".*\n**\n**\n**"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:left-aligned-star-triangle",
    "bankId": "T05-Q16",
    "slug": "left-aligned-star-triangle",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Left Aligned Star Triangle",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a left-aligned star triangle pattern of size rows x cols, where each row r (0 ≤ r < rows) has min(r + 1, cols) asterisks (*) left-aligned and padded on the right with dots (.) to reach cols characters. Print each row on a new line.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines of strings of length cols.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "*...\n**..\n***.",
        "explanation": "Left-aligned triangle with rows lines padded to width 4."
      },
      {
        "input": "1 1",
        "output": "*",
        "explanation": "Left-aligned triangle with rows lines padded to width 1."
      },
      {
        "input": "4 2",
        "output": "*.\n**\n**\n**",
        "explanation": "Left-aligned triangle with rows lines padded to width 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "*...\n**..\n***."
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "*"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "*.\n**\n**\n**"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:alternating-rows",
    "bankId": "T05-Q17",
    "slug": "alternating-rows",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Alternating Rows",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a grid of size rows x cols where every cell in row r contains r % 2. Print each row on a new line with values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated binary digits (0 or 1).",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "0 0 0 0\n1 1 1 1\n0 0 0 0",
        "explanation": "Alternating rows of 0s and 1s."
      },
      {
        "input": "1 1",
        "output": "0",
        "explanation": "Alternating rows of 0s and 1s."
      },
      {
        "input": "4 2",
        "output": "0 0\n1 1\n0 0\n1 1",
        "explanation": "Alternating rows of 0s and 1s."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "0 0 0 0\n1 1 1 1\n0 0 0 0"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "0 0\n1 1\n0 0\n1 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:concentric-layer-index",
    "bankId": "T05-Q18",
    "slug": "concentric-layer-index",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Concentric Layer Index",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a grid of size rows x cols where each cell (r, c) contains its concentric layer index, defined as min(r, rows - 1 - r, c, cols - 1 - c). Print each row on a new line with values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "0 0 0 0\n0 1 1 0\n0 0 0 0",
        "explanation": "Concentric distance from the nearest boundary."
      },
      {
        "input": "1 1",
        "output": "0",
        "explanation": "Concentric distance from the nearest boundary."
      },
      {
        "input": "4 2",
        "output": "0 0\n0 0\n0 0\n0 0",
        "explanation": "Concentric distance from the nearest boundary."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "0 0 0 0\n0 1 1 0\n0 0 0 0"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "0 0\n0 0\n0 0\n0 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:row-reversal-number-grid",
    "bankId": "T05-Q19",
    "slug": "row-reversal-number-grid",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Row Reversal Number Grid",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a grid of size rows x cols where even rows (0, 2, ...) contain numbers 1 through cols in increasing order, and odd rows (1, 3, ...) contain numbers cols down to 1 in decreasing order. Print each row on a new line with values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "1 2 3 4\n4 3 2 1\n1 2 3 4",
        "explanation": "Even rows go 1 to 4, odd rows go 4 down to 1."
      },
      {
        "input": "1 1",
        "output": "1",
        "explanation": "Even rows go 1 to 1, odd rows go 1 down to 1."
      },
      {
        "input": "4 2",
        "output": "1 2\n2 1\n1 2\n2 1",
        "explanation": "Even rows go 1 to 2, odd rows go 2 down to 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "1 2 3 4\n4 3 2 1\n1 2 3 4"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "1 2\n2 1\n1 2\n2 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:nested-loops:grid-lexicographic-labels",
    "bankId": "T05-Q20",
    "slug": "grid-lexicographic-labels",
    "languages": ["python","nodejs"],
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Grid Lexicographic Labels",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Read two positive integers rows and cols from standard input. Generate a grid of size rows x cols where each cell (r, c) is labeled with the string \"r,c\". Print each row on a new line with cell labels separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers rows and cols.",
    "outputFormat": "Print rows lines, each containing cols space-separated labels \"r,c\".",
    "constraints": "1 ≤ rows, cols ≤ 100",
    "examples": [
      {
        "input": "3 4",
        "output": "0,0 0,1 0,2 0,3\n1,0 1,1 1,2 1,3\n2,0 2,1 2,2 2,3",
        "explanation": "Grid labels from 0,0 to 2,3."
      },
      {
        "input": "1 1",
        "output": "0,0",
        "explanation": "Grid labels from 0,0 to 0,0."
      },
      {
        "input": "4 2",
        "output": "0,0 0,1\n1,0 1,1\n2,0 2,1\n3,0 3,1",
        "explanation": "Grid labels from 0,0 to 3,1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "0,0 0,1 0,2 0,3\n1,0 1,1 1,2 1,3\n2,0 2,1 2,2 2,3"
      },
      {
        "testIndex": 2,
        "input": "1 1",
        "expectedOutput": "0,0"
      },
      {
        "testIndex": 3,
        "input": "4 2",
        "expectedOutput": "0,0 0,1\n1,0 1,1\n2,0 2,1\n3,0 3,1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
