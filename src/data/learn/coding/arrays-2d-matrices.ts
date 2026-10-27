import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:arrays-2d-matrices:total-matrix-sum",
    "bankId": "T10-Q01",
    "slug": "total-matrix-sum",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Total Matrix Sum",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Compute and print the total sum of all cells in the matrix.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print the total sum of all cells.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "21",
        "explanation": "Sum of all matrix elements is 21."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Sum of all matrix elements is 7."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "9",
        "explanation": "Sum of all matrix elements is 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:sum-every-row",
    "bankId": "T10-Q02",
    "slug": "sum-every-row",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Sum Every Row",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Compute the sum of elements in each row, and print the row sums space-separated on a single line.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print the row sums space-separated on one line.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "6 15",
        "explanation": "Row sums from top to bottom are: 6 15."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Row sums from top to bottom are: 7."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "1 1 7",
        "explanation": "Row sums from top to bottom are: 1 1 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "6 15"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
        "expectedOutput": "1 1 7"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:sum-every-column",
    "bankId": "T10-Q03",
    "slug": "sum-every-column",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Sum Every Column",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Compute the sum of elements in each column from left to right, and print the column sums space-separated on a single line.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print the column sums space-separated on one line.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "5 7 9",
        "explanation": "Column sums from left to right are: 5 7 9."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Column sums from left to right are: 7."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "3 6",
        "explanation": "Column sums from left to right are: 3 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "5 7 9"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
        "expectedOutput": "3 6"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:matrix-maximum",
    "bankId": "T10-Q04",
    "slug": "matrix-maximum",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Matrix Maximum",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Find and print the maximum cell value in the matrix.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print the maximum cell value.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "6",
        "explanation": "Maximum element in the matrix is 6."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Maximum element in the matrix is 7."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "4",
        "explanation": "Maximum element in the matrix is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:matrix-minimum",
    "bankId": "T10-Q05",
    "slug": "matrix-minimum",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Matrix Minimum",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Find and print the minimum cell value in the matrix.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print the minimum cell value.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "1",
        "explanation": "Minimum element in the matrix is 1."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Minimum element in the matrix is 7."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "-1",
        "explanation": "Minimum element in the matrix is -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:transpose-the-matrix",
    "bankId": "T10-Q06",
    "slug": "transpose-the-matrix",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Transpose the Matrix",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Compute the transpose of the matrix (where rows and columns are swapped), and print the resulting cols x rows matrix with one row per line.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print cols lines, each containing rows space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "1 4\n2 5\n3 6",
        "explanation": "Transpose swaps rows and columns."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Transpose swaps rows and columns."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "1 -1 3\n0 2 4",
        "explanation": "Transpose swaps rows and columns."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "1 4\n2 5\n3 6"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
        "expectedOutput": "1 -1 3\n0 2 4"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:flip-matrix-horizontally",
    "bankId": "T10-Q07",
    "slug": "flip-matrix-horizontally",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Flip Matrix Horizontally",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Flip the matrix horizontally by reversing each row from left to right, and print the resulting matrix.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "3 2 1\n6 5 4",
        "explanation": "Each row is reversed left-to-right."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Each row is reversed left-to-right."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "0 1\n2 -1\n4 3",
        "explanation": "Each row is reversed left-to-right."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "3 2 1\n6 5 4"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
        "expectedOutput": "0 1\n2 -1\n4 3"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:flip-matrix-vertically",
    "bankId": "T10-Q08",
    "slug": "flip-matrix-vertically",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Flip Matrix Vertically",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Flip the matrix vertically by reversing the order of the rows from bottom to top, and print the resulting matrix.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "4 5 6\n1 2 3",
        "explanation": "The rows are reversed vertically."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "The rows are reversed vertically."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "3 4\n-1 2\n1 0",
        "explanation": "The rows are reversed vertically."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "4 5 6\n1 2 3"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
        "expectedOutput": "3 4\n-1 2\n1 0"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:rotate-matrix-clockwise",
    "bankId": "T10-Q09",
    "slug": "rotate-matrix-clockwise",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Rotate Matrix Clockwise",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Rotate the rectangular matrix 90 degrees clockwise, and print the resulting cols x rows matrix.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print cols lines, each containing rows space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "4 1\n5 2\n6 3",
        "explanation": "Rotating 90 degrees clockwise."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Rotating 90 degrees clockwise."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "3 -1 1\n4 2 0",
        "explanation": "Rotating 90 degrees clockwise."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "4 1\n5 2\n6 3"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
        "expectedOutput": "3 -1 1\n4 2 0"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:rotate-matrix-counterclockwise",
    "bankId": "T10-Q10",
    "slug": "rotate-matrix-counterclockwise",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Rotate Matrix Counterclockwise",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Rotate the rectangular matrix 90 degrees counterclockwise, and print the resulting cols x rows matrix.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print cols lines, each containing rows space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "3 6\n2 5\n1 4",
        "explanation": "Rotating 90 degrees counterclockwise."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Rotating 90 degrees counterclockwise."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "0 2 4\n1 -1 3",
        "explanation": "Rotating 90 degrees counterclockwise."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "3 6\n2 5\n1 4"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
        "expectedOutput": "0 2 4\n1 -1 3"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:flatten-matrix-row-major",
    "bankId": "T10-Q11",
    "slug": "flatten-matrix-row-major",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Flatten Matrix Row Major",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Flatten the matrix in row-major order, and print the elements space-separated on a single line.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print the flattened elements space-separated on one line.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "1 2 3 4 5 6",
        "explanation": "Flattening row-by-row gives: 1 2 3 4 5 6."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Flattening row-by-row gives: 7."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "1 0 -1 2 3 4",
        "explanation": "Flattening row-by-row gives: 1 0 -1 2 3 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "1 2 3 4 5 6"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
        "expectedOutput": "1 0 -1 2 3 4"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:flatten-matrix-column-major",
    "bankId": "T10-Q12",
    "slug": "flatten-matrix-column-major",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Flatten Matrix Column Major",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Flatten the matrix in column-major order (column by column from left to right), and print the elements space-separated on a single line.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print the flattened elements space-separated on one line.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "1 4 2 5 3 6",
        "explanation": "Flattening column-by-column gives: 1 4 2 5 3 6."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Flattening column-by-column gives: 7."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "1 -1 3 0 2 4",
        "explanation": "Flattening column-by-column gives: 1 -1 3 0 2 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "1 4 2 5 3 6"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
        "expectedOutput": "1 -1 3 0 2 4"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:main-diagonal-sum",
    "bankId": "T10-Q13",
    "slug": "main-diagonal-sum",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Main Diagonal Sum",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Sum the elements along the main diagonal grid[i][i] for 0 ≤ i < min(rows, cols), and print the resulting integer.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print the main diagonal sum.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "6",
        "explanation": "Main diagonal elements sum to 6."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Main diagonal elements sum to 7."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "3",
        "explanation": "Main diagonal elements sum to 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:top-right-diagonal-sum",
    "bankId": "T10-Q14",
    "slug": "top-right-diagonal-sum",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Top Right Diagonal Sum",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Starting at the top-right corner, move diagonally down and left summing grid[i][cols - 1 - i] for 0 ≤ i < min(rows, cols). Print the resulting integer sum.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print the top-right diagonal sum.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "8",
        "explanation": "Top-right diagonal elements sum to 8."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Top-right diagonal elements sum to 7."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "-1",
        "explanation": "Top-right diagonal elements sum to -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:count-zero-cells",
    "bankId": "T10-Q15",
    "slug": "count-zero-cells",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Count Zero Cells",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Count and print how many cells in the matrix are equal to zero.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print the count of zero cells.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "0",
        "explanation": "The matrix contains 0 zero cell(s)."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "1",
        "explanation": "The matrix contains 1 zero cell(s)."
      },
      {
        "input": "1 3\n0 0 0",
        "output": "3",
        "explanation": "The matrix contains 3 zero cell(s)."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "3 2\n1 0\n-1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "1 3\n0 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    rows, cols = int(data[0]), int(data[1])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const rows = parseInt(data[0], 10);\n    const cols = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:positive-cell-coordinates",
    "bankId": "T10-Q16",
    "slug": "positive-cell-coordinates",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Positive Cell Coordinates",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Find all coordinate pairs (r,c) where grid[r][c] > 0 in row-major order. Print the coordinates space-separated on a single line in the format (r,c). If no positive cells exist, print \"EMPTY\".",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print matching (r,c) coordinates space-separated on one line, or \"EMPTY\".",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "(0,0) (0,1) (0,2) (1,0) (1,1) (1,2)",
        "explanation": "Coordinates where cell > 0: (0,0) (0,1) (0,2) (1,0) (1,1) (1,2)."
      },
      {
        "input": "1 1\n7",
        "output": "(0,0)",
        "explanation": "Coordinates where cell > 0: (0,0)."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "(0,0) (1,1) (2,0) (2,1)",
        "explanation": "Coordinates where cell > 0: (0,0) (1,1) (2,0) (2,1)."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "(0,0) (0,1) (0,2) (1,0) (1,1) (1,2)"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "(0,0)"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
        "expectedOutput": "(0,0) (1,1) (2,0) (2,1)"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:row-maximums",
    "bankId": "T10-Q17",
    "slug": "row-maximums",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Row Maximums",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Find the maximum value in each row, and print the row maximums space-separated on a single line.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print the row maximums space-separated on one line.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "3 6",
        "explanation": "Row maximums are: 3 6."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Row maximums are: 7."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "1 2 4",
        "explanation": "Row maximums are: 1 2 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "3 6"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
        "expectedOutput": "1 2 4"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:column-minimums",
    "bankId": "T10-Q18",
    "slug": "column-minimums",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Column Minimums",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Find the minimum value in each column, and print the column minimums space-separated on a single line.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print the column minimums space-separated on one line.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "1 2 3",
        "explanation": "Column minimums are: 1 2 3."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Column minimums are: 7."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "-1 0",
        "explanation": "Column minimums are: -1 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "1 2 3"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
        "expectedOutput": "-1 0"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:spiral-order-traversal",
    "bankId": "T10-Q19",
    "slug": "spiral-order-traversal",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Spiral Order Traversal",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. Traverse the matrix in clockwise spiral order starting from the top-left cell, and print the elements space-separated on a single line.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print the elements in spiral order space-separated on one line.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "1 2 3 6 5 4",
        "explanation": "Spiral traversal starting at top-left: 1 2 3 6 5 4."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Spiral traversal starting at top-left: 7."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "1 0 2 4 3 -1",
        "explanation": "Spiral traversal starting at top-left: 1 0 2 4 3 -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "1 2 3 6 5 4"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
        "expectedOutput": "1 0 2 4 3 -1"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-2d-matrices:add-row-and-column-indices",
    "bankId": "T10-Q20",
    "slug": "add-row-and-column-indices",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Add Row and Column Indices",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Read matrix dimensions rows and cols followed by a rows x cols integer matrix from standard input. For each cell (r, c), add its row and column indices to its original value (cell = grid[r][c] + r + c). Print the resulting matrix with one row per line.",
    "inputFormat": "The first line contains two integers rows and cols. The next rows lines each contain cols space-separated integers.",
    "outputFormat": "Print rows lines, each containing cols space-separated integers.",
    "constraints": "1 ≤ rows, cols ≤ 100, -10^6 ≤ grid[r][c] ≤ 10^6",
    "examples": [
      {
        "input": "2 3\n1 2 3\n4 5 6",
        "output": "1 3 5\n5 7 9",
        "explanation": "Each cell has r + c added to its value."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Each cell has r + c added to its value."
      },
      {
        "input": "3 2\n1 0\n-1 2\n3 4",
        "output": "1 1\n0 4\n5 7",
        "explanation": "Each cell has r + c added to its value."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3\n1 2 3\n4 5 6",
        "expectedOutput": "1 3 5\n5 7 9"
      },
      {
        "testIndex": 2,
        "input": "1 1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n1 0\n-1 2\n3 4",
        "expectedOutput": "1 1\n0 4\n5 7"
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
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt(), cols = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int rows, cols;\n    if (cin >> rows >> cols) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
