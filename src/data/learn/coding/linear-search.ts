import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:linear-search:first-target-index",
    "bankId": "T11-Q01",
    "slug": "first-target-index",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "First Target Index",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find the first (leftmost) zero-based index where nums[i] == target. If target is not found in the array, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the first index of target, or -1 if not found.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "2",
        "explanation": "First occurrence of 4 is at index 2."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "First occurrence of 0 is at index -1."
      },
      {
        "input": "1 7\n7",
        "output": "0",
        "explanation": "First occurrence of 7 is at index 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:last-target-index",
    "bankId": "T11-Q02",
    "slug": "last-target-index",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Last Target Index",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find the last (rightmost) zero-based index where nums[i] == target. If target is not found in the array, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the last index of target, or -1 if not found.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "2",
        "explanation": "Last occurrence of 4 is at index 2."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "Last occurrence of 0 is at index -1."
      },
      {
        "input": "1 7\n7",
        "output": "0",
        "explanation": "Last occurrence of 7 is at index 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:count-equal-values",
    "bankId": "T11-Q03",
    "slug": "count-equal-values",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Count Equal Values",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Count and print how many elements in the array are equal to target.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the count of matching elements.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "1",
        "explanation": "Target 4 appears 1 time(s)."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "Target 0 appears 0 time(s)."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "3",
        "explanation": "Target 0 appears 3 time(s)."
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
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:all-matching-indices",
    "bankId": "T11-Q04",
    "slug": "all-matching-indices",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "All Matching Indices",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find all zero-based indices where nums[i] == target, and print them in increasing order space-separated on a single line. If target is not found, print \"EMPTY\".",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the matching indices space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "2",
        "explanation": "Indices matching target 4: 2."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "Indices matching target 0: EMPTY."
      },
      {
        "input": "1 7\n7",
        "output": "0",
        "explanation": "Indices matching target 7: 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:target-exists",
    "bankId": "T11-Q05",
    "slug": "target-exists",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Target Exists",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Determine whether target exists anywhere in the array. Print \"true\" if it does, or \"false\" otherwise.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print \"true\" if target exists, otherwise \"false\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "true",
        "explanation": "Target 4 exists in array: true."
      },
      {
        "input": "0 0\n",
        "output": "false",
        "explanation": "Target 0 exists in array: false."
      },
      {
        "input": "1 7\n7",
        "output": "true",
        "explanation": "Target 7 exists in array: true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:first-greater-than-target",
    "bankId": "T11-Q06",
    "slug": "first-greater-than-target",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "First Greater Than Target",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find the 0-based index of the first value in the array that is strictly greater than target (nums[i] > target). If no such element exists, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the first index where nums[i] > target, or -1 if none exists.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "4",
        "explanation": "First index with element strictly greater than 4 is 4."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "First index with element strictly greater than 0 is -1."
      },
      {
        "input": "4 -1\n-4 -1 -3 2",
        "output": "3",
        "explanation": "First index with element strictly greater than -1 is 3."
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
        "expectedOutput": "-1"
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
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:last-less-than-target",
    "bankId": "T11-Q07",
    "slug": "last-less-than-target",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Last Less Than Target",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find the 0-based index of the last value in the array that is strictly less than target (nums[i] < target). If no such element exists, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the last index where nums[i] < target, or -1 if none exists.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "3",
        "explanation": "Last index with element strictly less than 4 is 3."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "Last index with element strictly less than 0 is -1."
      },
      {
        "input": "4 -1\n-4 -1 -3 2",
        "output": "2",
        "explanation": "Last index with element strictly less than -1 is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "4 -1\n-4 -1 -3 2",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:first-greater-or-equal",
    "bankId": "T11-Q08",
    "slug": "first-greater-or-equal",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "First Greater or Equal",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find the first (leftmost) zero-based index i where nums[i] ≥ target. If no such index exists, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the first index where nums[i] ≥ target, or -1.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "2",
        "explanation": "First index where element >= 4 is 2."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "First index where element >= 0 is -1."
      },
      {
        "input": "1 7\n7",
        "output": "0",
        "explanation": "First index where element >= 7 is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:last-less-or-equal",
    "bankId": "T11-Q09",
    "slug": "last-less-or-equal",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Last Less or Equal",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find the last (rightmost) zero-based index i where nums[i] ≤ target. If no such index exists, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the last index where nums[i] ≤ target, or -1.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "3",
        "explanation": "Last index where element <= 4 is 3."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "Last index where element <= 0 is -1."
      },
      {
        "input": "1 7\n7",
        "output": "0",
        "explanation": "Last index where element <= 7 is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:nearest-value-index",
    "bankId": "T11-Q10",
    "slug": "nearest-value-index",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Nearest Value Index",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find the index of the element closest in value to target (|nums[i] - target| is minimized). If there is a tie, pick the smaller index. If the array is empty, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the index of the nearest element, or -1.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "2",
        "explanation": "Element closest to target 4 is at index 2."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "Element closest to target 0 is at index -1."
      },
      {
        "input": "1 7\n7",
        "output": "0",
        "explanation": "Element closest to target 7 is at index 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <cmath>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:first-nonmatching-index",
    "bankId": "T11-Q11",
    "slug": "first-nonmatching-index",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "First Nonmatching Index",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find the first (leftmost) index where nums[i] != target. If all elements equal target or the array is empty, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the first index != target, or -1.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "0",
        "explanation": "First element differing from 4 is at index 0."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "First element differing from 0 is at index -1."
      },
      {
        "input": "5 5\n5 -5 5 -5 0",
        "output": "1",
        "explanation": "First element differing from 5 is at index 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "5 5\n5 -5 5 -5 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:indices-of-even-entries",
    "bankId": "T11-Q12",
    "slug": "indices-of-even-entries",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Indices of Even Entries",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find all zero-based indices where nums[i] is even, and print them space-separated on a single line. If no even elements exist, print \"EMPTY\".",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the even indices space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "2",
        "explanation": "Indices of even entries: 2."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "Indices of even entries: EMPTY."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "0 1 2",
        "explanation": "Indices of even entries: 0 1 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "3 0\n0 0 0",
        "expectedOutput": "0 1 2"
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
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:first-multiple-of-target",
    "bankId": "T11-Q13",
    "slug": "first-multiple-of-target",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "First Multiple of Target",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find the first index i where nums[i] is a multiple of target (target != 0 and nums[i] % target == 0). If no such element exists, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the first index of a multiple of target, or -1.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "2",
        "explanation": "First multiple of 4 is at index 2."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "First multiple of 0 is at index -1."
      },
      {
        "input": "1 7\n7",
        "output": "0",
        "explanation": "First multiple of 7 is at index 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:first-local-peak",
    "bankId": "T11-Q14",
    "slug": "first-local-peak",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "First Local Peak",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find the index of the first local peak (an element at least as large as both its existing immediate neighbors: nums[i] >= neighbors). If no local peak exists or the array is empty, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the index of the first local peak, or -1.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "0",
        "explanation": "First local peak is at index 0."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "First local peak is at index -1."
      },
      {
        "input": "4 -1\n-4 -1 -3 2",
        "output": "1",
        "explanation": "First local peak is at index 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "4 -1\n-4 -1 -3 2",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:search-starting-after-first-half",
    "bankId": "T11-Q15",
    "slug": "search-starting-after-first-half",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Search Starting After First Half",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Search for target starting from the middle index i = n // 2 through n - 1. Find the first occurrence in this second half and print its global index. If not found in the second half, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the index in the second half matching target, or -1.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "2",
        "explanation": "Searching from index n//2 onwards, first occurrence of 4 is at 2."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "Searching from index n//2 onwards, first occurrence of 0 is at -1."
      },
      {
        "input": "1 7\n7",
        "output": "0",
        "explanation": "Searching from index n//2 onwards, first occurrence of 7 is at 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:last-negative-position",
    "bankId": "T11-Q16",
    "slug": "last-negative-position",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Last Negative Position",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find the index of the last (rightmost) negative element in the array (nums[i] < 0). If no negative numbers exist, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the index of the last negative number, or -1.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "-1",
        "explanation": "Last negative element index is -1."
      },
      {
        "input": "4 -1\n-4 -1 -3 2",
        "output": "2",
        "explanation": "Last negative element index is 2."
      },
      {
        "input": "5 5\n5 -5 5 -5 0",
        "output": "3",
        "explanation": "Last negative element index is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "4 -1\n-4 -1 -3 2",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "5 5\n5 -5 5 -5 0",
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
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:index-of-maximum-first-tie",
    "bankId": "T11-Q17",
    "slug": "index-of-maximum-first-tie",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Index of Maximum First Tie",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find the index of the maximum value in the array. If there are ties, choose the smallest (first) index. If the array is empty, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the first index of the maximum value, or -1.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "4",
        "explanation": "First maximum element index is 4."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "First maximum element index is -1."
      },
      {
        "input": "1 7\n7",
        "output": "0",
        "explanation": "First maximum element index is 0."
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
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:index-of-minimum-last-tie",
    "bankId": "T11-Q18",
    "slug": "index-of-minimum-last-tie",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Index of Minimum Last Tie",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find the index of the minimum value in the array. If there are ties, choose the largest (last) index. If the array is empty, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the last index of the minimum value, or -1.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "3",
        "explanation": "Last minimum element index is 3."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "Last minimum element index is -1."
      },
      {
        "input": "1 7\n7",
        "output": "0",
        "explanation": "Last minimum element index is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:closest-smaller-value",
    "bankId": "T11-Q19",
    "slug": "closest-smaller-value",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Closest Smaller Value",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find the value in the array strictly smaller than target that is closest to target (i.e. the maximum element among all nums[i] < target). If no elements are smaller than target, print null.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the closest smaller value, or null.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "3",
        "explanation": "Closest value smaller than 4 is 3."
      },
      {
        "input": "0 0\n",
        "output": "null",
        "explanation": "Closest value smaller than 0 is null."
      },
      {
        "input": "4 -1\n-4 -1 -3 2",
        "output": "-3",
        "explanation": "Closest value smaller than -1 is -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "4 -1\n-4 -1 -3 2",
        "expectedOutput": "-3"
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
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:linear-search:closest-larger-value",
    "bankId": "T11-Q20",
    "slug": "closest-larger-value",
    "languages": ["python","nodejs"],
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Closest Larger Value",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Read two integers n and target on the first line, followed by an array of n integers on the second line. Find the value in the array strictly larger than target that is closest to target (i.e. the minimum element among all nums[i] > target). If no elements are larger than target, print null.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the closest larger value, or null.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "5",
        "explanation": "Closest value larger than 4 is 5."
      },
      {
        "input": "0 0\n",
        "output": "null",
        "explanation": "Closest value larger than 0 is null."
      },
      {
        "input": "4 -1\n-4 -1 -3 2",
        "output": "2",
        "explanation": "Closest value larger than -1 is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "4 -1\n-4 -1 -3 2",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
