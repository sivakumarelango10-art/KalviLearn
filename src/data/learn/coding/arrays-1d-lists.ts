import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:arrays-1d-lists:sum-of-elements",
    "bankId": "T08-Q01",
    "slug": "sum-of-elements",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Sum of Elements",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Read an integer n followed by an array of n integers from standard input. Compute and print the sum of all elements in the array. If the array is empty (n = 0), print 0.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the integer sum of the elements.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "14",
        "explanation": "Summing the 5 elements yields 14."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "The array is empty, so the sum is 0."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Summing the 1 elements yields 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "14"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:count-negative-entries",
    "bankId": "T08-Q02",
    "slug": "count-negative-entries",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Count Negative Entries",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Read an integer n followed by an array of n integers from standard input. Count and print how many elements in the array are strictly negative (nums[i] < 0). If the array is empty, print 0.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the count of strictly negative numbers.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "0",
        "explanation": "Among the 5 elements, 0 are strictly negative."
      },
      {
        "input": "4\n-4 -1 -3 2",
        "output": "3",
        "explanation": "Among the 4 elements, 3 are strictly negative."
      },
      {
        "input": "5\n5 -5 5 -5 0",
        "output": "2",
        "explanation": "Among the 5 elements, 2 are strictly negative."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4\n-4 -1 -3 2",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n5 -5 5 -5 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:maximum-or-null",
    "bankId": "T08-Q03",
    "slug": "maximum-or-null",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Maximum or Null",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Read an integer n followed by an array of n integers from standard input. Find and print the maximum value in the array. If the array is empty (n = 0), print null.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the maximum integer value, or null if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "5",
        "explanation": "The maximum element among 3 1 4 1 5 is 5."
      },
      {
        "input": "0\n",
        "output": "null",
        "explanation": "Array is empty, so maximum is null."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "The maximum element among 7 is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:minimum-or-null",
    "bankId": "T08-Q04",
    "slug": "minimum-or-null",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Minimum or Null",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Read an integer n followed by an array of n integers from standard input. Find and print the minimum value in the array. If the array is empty (n = 0), print null.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the minimum integer value, or null if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1",
        "explanation": "The minimum element among 3 1 4 1 5 is 1."
      },
      {
        "input": "0\n",
        "output": "null",
        "explanation": "Array is empty, so minimum is null."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "The minimum element among 7 is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:reverse-the-array",
    "bankId": "T08-Q05",
    "slug": "reverse-the-array",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Reverse the Array",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Read an integer n followed by an array of n integers from standard input. Reverse the array and print the elements space-separated on a single line. If the array is empty (n = 0), print \"EMPTY\".",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the reversed array space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "5 1 4 1 3",
        "explanation": "Reversing [3 1 4 1 5] gives 5 1 4 1 3."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Array is empty, output is EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Reversing [7] gives 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "5 1 4 1 3"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:prefix-sum-array",
    "bankId": "T08-Q06",
    "slug": "prefix-sum-array",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Prefix Sum Array",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Read an integer n followed by an array of n integers from standard input. Compute the running prefix sums of the array (P_0 = nums[0], P_i = P_(i-1) + nums[i]), and print them space-separated on a single line. If the array is empty (n = 0), print \"EMPTY\".",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the prefix sums space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "3 4 8 9 14",
        "explanation": "Prefix sums of [3 1 4 1 5] are 3 4 8 9 14."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Array is empty, output is EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Prefix sums of [7] are 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "3 4 8 9 14"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:suffix-sum-array",
    "bankId": "T08-Q07",
    "slug": "suffix-sum-array",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Suffix Sum Array",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Read an integer n followed by an array of n integers from standard input. Compute the suffix sum for each position starting at index i through n-1, and print the suffix sums space-separated on a single line. If the array is empty (n = 0), print \"EMPTY\".",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the suffix sums space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "14 11 10 6 5",
        "explanation": "Suffix sums of [3 1 4 1 5] are 14 11 10 6 5."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Array is empty, output is EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Suffix sums of [7] are 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "14 11 10 6 5"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:left-rotate-by-k",
    "bankId": "T08-Q08",
    "slug": "left-rotate-by-k",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Left Rotate by K",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Read two integers n and k on the first line, followed by an array of n integers on the second line. Cyclically rotate the array to the left by k positions, and print the resulting elements space-separated on a single line. If the array is empty (n = 0), print \"EMPTY\".",
    "inputFormat": "The first line contains two integers n and k. The second line contains n space-separated integers.",
    "outputFormat": "Print the left-rotated array space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, 0 ≤ k ≤ 10^9, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 2\n3 1 4 1 5",
        "output": "4 1 5 3 1",
        "explanation": "Rotating [3 1 4 1 5] left by 2 positions yields 4 1 5 3 1."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "Array is empty, output is EMPTY."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Rotating [7] left by 1 positions yields 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 2\n3 1 4 1 5",
        "expectedOutput": "4 1 5 3 1"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, k = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10);\n    const k = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:right-rotate-by-k",
    "bankId": "T08-Q09",
    "slug": "right-rotate-by-k",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Right Rotate by K",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Read two integers n and k on the first line, followed by an array of n integers on the second line. Cyclically rotate the array to the right by k positions, and print the resulting elements space-separated on a single line. If the array is empty (n = 0), print \"EMPTY\".",
    "inputFormat": "The first line contains two integers n and k. The second line contains n space-separated integers.",
    "outputFormat": "Print the right-rotated array space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, 0 ≤ k ≤ 10^9, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 2\n3 1 4 1 5",
        "output": "1 5 3 1 4",
        "explanation": "Rotating [3 1 4 1 5] right by 2 positions yields 1 5 3 1 4."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "Array is empty, output is EMPTY."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Rotating [7] right by 1 positions yields 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 2\n3 1 4 1 5",
        "expectedOutput": "1 5 3 1 4"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, k = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10);\n    const k = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:second-distinct-largest",
    "bankId": "T08-Q10",
    "slug": "second-distinct-largest",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Second Distinct Largest",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Read an integer n followed by an array of n integers from standard input. Find the second largest distinct number in the array. If fewer than two distinct numbers exist, print null.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the second distinct largest integer, or null if it does not exist.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "4",
        "explanation": "Distinct values sorted descending: second largest is 4."
      },
      {
        "input": "0\n",
        "output": "null",
        "explanation": "Fewer than 2 distinct elements exist, so result is null."
      },
      {
        "input": "4\n-4 -1 -3 2",
        "output": "-1",
        "explanation": "Distinct values sorted descending: second largest is -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "4\n-4 -1 -3 2",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:adjacent-pair-sums",
    "bankId": "T08-Q11",
    "slug": "adjacent-pair-sums",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Adjacent Pair Sums",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Read an integer n followed by an array of n integers from standard input. Compute the pairwise sums of all adjacent elements (nums[i] + nums[i+1] for 0 ≤ i < n - 1), and print them space-separated on a single line. If n < 2, print \"EMPTY\".",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the adjacent pair sums space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "4 5 5 6",
        "explanation": "Adjacent pair sums of [3 1 4 1 5] are 4 5 5 6."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Array has fewer than 2 elements, output is EMPTY."
      },
      {
        "input": "3\n0 0 0",
        "output": "0 0",
        "explanation": "Adjacent pair sums of [0 0 0] are 0 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "4 5 5 6"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "3\n0 0 0",
        "expectedOutput": "0 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:count-target-occurrences",
    "bankId": "T08-Q12",
    "slug": "count-target-occurrences",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Count Target Occurrences",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Count and print how many elements in the array are equal to target. If n = 0, print 0.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the occurrence count of target.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "1",
        "explanation": "Target 4 appears 1 time(s) in the array."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "Target 0 appears 0 time(s) in the array."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "3",
        "explanation": "Target 0 appears 3 time(s) in the array."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "3 0\n0 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10);\n    const target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:array-palindrome-check",
    "bankId": "T08-Q13",
    "slug": "array-palindrome-check",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Palindrome Check",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Read an integer n followed by an array of n integers from standard input. Determine whether the array is a palindrome (reads identically forwards and backwards). Print \"true\" if it is, or \"false\" otherwise.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print \"true\" if the array is a palindrome, otherwise \"false\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "false",
        "explanation": "The array [3 1 4 1 5] is a palindrome: false."
      },
      {
        "input": "0\n",
        "output": "true",
        "explanation": "The array [] is a palindrome: true."
      },
      {
        "input": "1\n7",
        "output": "true",
        "explanation": "The array [7] is a palindrome: true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:replace-values-below-target",
    "bankId": "T08-Q14",
    "slug": "replace-values-below-target",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Replace Values Below Target",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Replace every element strictly less than target with target, and print the resulting elements space-separated on a single line. If n = 0, print \"EMPTY\".",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the clamped array space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "4 4 4 4 5",
        "explanation": "Replacing elements < 4 with 4 yields 4 4 4 4 5."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "Array is empty, output is EMPTY."
      },
      {
        "input": "1 7\n7",
        "output": "7",
        "explanation": "Replacing elements < 7 with 7 yields 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "4 4 4 4 5"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10);\n    const target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:indices-above-target",
    "bankId": "T08-Q15",
    "slug": "indices-above-target",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Indices Above Target",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find all zero-based indices i where nums[i] > target, and print them in increasing order space-separated on a single line. If no such indices exist, print \"EMPTY\".",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the matching indices space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "4",
        "explanation": "Indices where element > 4: 4."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "Indices where element > 0: EMPTY."
      },
      {
        "input": "4 -1\n-4 -1 -3 2",
        "output": "3",
        "explanation": "Indices where element > -1: 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "4 -1\n-4 -1 -3 2",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10);\n    const target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:running-maximum-array",
    "bankId": "T08-Q16",
    "slug": "running-maximum-array",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Running Maximum Array",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Read an integer n followed by an array of n integers from standard input. Compute the running maximum at each index (M_i = max(nums[0..i])), and print them space-separated on a single line. If n = 0, print \"EMPTY\".",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the running maximums space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "3 3 4 4 5",
        "explanation": "Running maximums of [3 1 4 1 5] are 3 3 4 4 5."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Array is empty, output is EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Running maximums of [7] are 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "3 3 4 4 5"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:first-k-elements-sum",
    "bankId": "T08-Q17",
    "slug": "first-k-elements-sum",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "First K Elements Sum",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Read two integers n and k on the first line, followed by an array of n integers on the second line. Compute the sum of the first k elements (or all elements if k ≥ n). If n = 0, print 0.",
    "inputFormat": "The first line contains two integers n and k. The second line contains n space-separated integers.",
    "outputFormat": "Print the sum of the first k elements.",
    "constraints": "0 ≤ n, k ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 2\n3 1 4 1 5",
        "output": "4",
        "explanation": "Sum of first min(2, 5) elements is 4."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "Sum of first min(0, 0) elements is 0."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Sum of first min(1, 1) elements is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 2\n3 1 4 1 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, k = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10);\n    const k = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:maximum-k-window-sum",
    "bankId": "T08-Q18",
    "slug": "maximum-k-window-sum",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Maximum K Window Sum",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Read two integers n and k on the first line, followed by an array of n integers on the second line. Find the maximum sum of any contiguous subarray of length k. If n < k or n = 0, print 0.",
    "inputFormat": "The first line contains two integers n and k. The second line contains n space-separated integers.",
    "outputFormat": "Print the maximum k-window sum.",
    "constraints": "0 ≤ n, k ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 2\n3 1 4 1 5",
        "output": "6",
        "explanation": "The maximum contiguous window sum of length 2 is 6."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "Not enough elements for window of size 0, so result is 0."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "The maximum contiguous window sum of length 1 is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 2\n3 1 4 1 5",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, k = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10);\n    const k = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:longest-positive-streak",
    "bankId": "T08-Q19",
    "slug": "longest-positive-streak",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Longest Positive Streak",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Read an integer n followed by an array of n integers from standard input. Find the length of the longest contiguous streak of elements strictly greater than zero. If no positive elements exist, print 0.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the length of the longest positive streak.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "5",
        "explanation": "Longest streak of values > 0 in [3 1 4 1 5] is 5."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Longest streak of values > 0 in [] is 0."
      },
      {
        "input": "1\n7",
        "output": "1",
        "explanation": "Longest streak of values > 0 in [7] is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:arrays-1d-lists:remove-adjacent-duplicates",
    "bankId": "T08-Q20",
    "slug": "remove-adjacent-duplicates",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Remove Adjacent Duplicates",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Read an integer n followed by an array of n integers from standard input. Remove adjacent duplicates, retaining only the first element of each consecutive run of identical values. Print the resulting array space-separated on a single line. If the array is empty, print \"EMPTY\".",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the deduplicated array space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "3 1 4 1 5",
        "explanation": "Collapsing consecutive duplicates in [3 1 4 1 5] gives 3 1 4 1 5."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Array is empty, output is EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Collapsing consecutive duplicates in [7] gives 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "3 1 4 1 5"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
