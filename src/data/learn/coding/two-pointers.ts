import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:two-pointers:two-sum-exists",
    "bankId": "T15-Q01",
    "slug": "two-sum-exists",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Two Sum Exists",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Read a sorted array of integers and an integer target from standard input. Determine whether there exist two distinct indices i < j such that nums[i] + nums[j] == target. Print \"true\" if such a pair exists, or \"false\" otherwise.",
    "inputFormat": "The first line contains two integers: n (the length of the array) and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print true if a two-sum pair exists, otherwise false.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "true",
        "explanation": "For array [1, 1, 3, 4, 5] and target 4, there exists a pair summing to target, so the output is true."
      },
      {
        "input": "0 0",
        "output": "false",
        "explanation": "For array [] and target 0, no pair sums to target, so the output is false."
      },
      {
        "input": "1 7\n7",
        "output": "false",
        "explanation": "For array [7] and target 7, no pair sums to target, so the output is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    target = int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const target = parseInt(tokens[1], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:unique-two-sum-value-pairs",
    "bankId": "T15-Q02",
    "slug": "unique-two-sum-value-pairs",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Unique Two Sum Value Pairs",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Read a sorted array of integers and an integer target from standard input. Find all distinct value pairs (a, b) with a ≤ b such that a + b == target. Print each pair on a new line separated by a space, ordered by the first element ascending. If no pairs exist, print \"EMPTY\".",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print each unique pair \"a b\" on a separate line sorted by a ascending, or \"EMPTY\" if none exist.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "1 3",
        "explanation": "The unique pair(s) in [1, 1, 3, 4, 5] summing to 4 are:\n1 3"
      },
      {
        "input": "0 0",
        "output": "EMPTY",
        "explanation": "No two elements in [] add up to 0, so the output is EMPTY."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "0 0",
        "explanation": "The unique pair(s) in [0, 0, 0] summing to 0 are:\n0 0"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "1 3"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "3 0\n0 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    target = int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const target = parseInt(tokens[1], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:count-two-sum-index-pairs",
    "bankId": "T15-Q03",
    "slug": "count-two-sum-index-pairs",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Count Two Sum Index Pairs",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Read a sorted array of integers and an integer target from standard input. Count all pairs of indices (i, j) with i < j such that nums[i] + nums[j] == target. Print the count of such index pairs.",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the integer count of index pairs summing to target.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "2",
        "explanation": "In array [1, 1, 3, 4, 5], there are 2 pair(s) of indices (i < j) with sum equal to 4."
      },
      {
        "input": "0 0",
        "output": "0",
        "explanation": "In array [], there are 0 pair(s) of indices (i < j) with sum equal to 0."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "3",
        "explanation": "In array [0, 0, 0], there are 3 pair(s) of indices (i < j) with sum equal to 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    target = int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const target = parseInt(tokens[1], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:smallest-index-two-sum",
    "bankId": "T15-Q04",
    "slug": "smallest-index-two-sum",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Smallest Index Two Sum",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Read a sorted array of integers and an integer target from standard input. Find the lexicographically smallest pair of indices (i, j) with i < j such that nums[i] + nums[j] == target. Print the two indices separated by a space. If no pair exists, print \"-1 -1\".",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print \"i j\" representing the first index pair, or \"-1 -1\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "0 2",
        "explanation": "At indices i = 0 and j = 2, nums[0] + nums[2] = 1 + 3 = 4. Answer: 0 2."
      },
      {
        "input": "0 0",
        "output": "-1 -1",
        "explanation": "No pair in [] sums to 0, so the output is -1 -1."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "0 1",
        "explanation": "At indices i = 0 and j = 1, nums[0] + nums[1] = 0 + 0 = 0. Answer: 0 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "0 2"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "-1 -1"
      },
      {
        "testIndex": 3,
        "input": "3 0\n0 0 0",
        "expectedOutput": "0 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nfrom bisect import bisect_left\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    target = int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const target = parseInt(tokens[1], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:count-pair-sums-below-target",
    "bankId": "T15-Q05",
    "slug": "count-pair-sums-below-target",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Count Pair Sums Below Target",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Read a sorted array of integers and an integer target from standard input. Count all pairs of indices (i, j) with i < j such that nums[i] + nums[j] < target. Print the count.",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the count of index pairs summing strictly below target.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "1",
        "explanation": "In array [1, 1, 3, 4, 5], there are 1 pair(s) with sum < 4."
      },
      {
        "input": "0 0",
        "output": "0",
        "explanation": "In array [], there are 0 pair(s) with sum < 0."
      },
      {
        "input": "4 -1\n-4 -3 -1 2",
        "output": "4",
        "explanation": "In array [-4, -3, -1, 2], there are 4 pair(s) with sum < -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "4 -1\n-4 -3 -1 2",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    target = int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const target = parseInt(tokens[1], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:count-pair-sums-at-most-target",
    "bankId": "T15-Q06",
    "slug": "count-pair-sums-at-most-target",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Count Pair Sums At Most Target",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Read a sorted array of integers and an integer target from standard input. Count all pairs of indices (i, j) with i < j such that nums[i] + nums[j] ≤ target. Print the count.",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the count of index pairs summing at most target.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "3",
        "explanation": "In array [1, 1, 3, 4, 5], there are 3 pair(s) with sum ≤ 4."
      },
      {
        "input": "0 0",
        "output": "0",
        "explanation": "In array [], there are 0 pair(s) with sum ≤ 0."
      },
      {
        "input": "4 -1\n-4 -3 -1 2",
        "output": "5",
        "explanation": "In array [-4, -3, -1, 2], there are 5 pair(s) with sum ≤ -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "4 -1\n-4 -3 -1 2",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    target = int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const target = parseInt(tokens[1], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:count-pair-sums-above-target",
    "bankId": "T15-Q07",
    "slug": "count-pair-sums-above-target",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Count Pair Sums Above Target",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Read a sorted array of integers and an integer target from standard input. Count all pairs of indices (i, j) with i < j such that nums[i] + nums[j] > target. Print the count.",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the count of index pairs summing strictly above target.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "7",
        "explanation": "In array [1, 1, 3, 4, 5], there are 7 pair(s) with sum > 4."
      },
      {
        "input": "0 0",
        "output": "0",
        "explanation": "In array [], there are 0 pair(s) with sum > 0."
      },
      {
        "input": "4 -1\n-4 -3 -1 2",
        "output": "1",
        "explanation": "In array [-4, -3, -1, 2], there are 1 pair(s) with sum > -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "4 -1\n-4 -3 -1 2",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    target = int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const target = parseInt(tokens[1], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:closest-two-sum-value-pair",
    "bankId": "T15-Q08",
    "slug": "closest-two-sum-value-pair",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Closest Two Sum Value Pair",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Read a sorted array of integers and an integer target from standard input. Find a value pair (a, b) with a ≤ b whose sum is closest to target. If there is a tie, choose the lexicographically smaller pair. Print \"a b\". If the array has fewer than 2 elements, print \"NONE\".",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print \"a b\" for the closest pair, or \"NONE\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "1 3",
        "explanation": "In [1, 1, 3, 4, 5], the pair (1, 3) has sum 4, which is closest to 4. Output: 1 3."
      },
      {
        "input": "0 0",
        "output": "NONE",
        "explanation": "Array [] has fewer than 2 elements, so output is NONE."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "0 0",
        "explanation": "In [0, 0, 0], the pair (0, 0) has sum 0, which is closest to 0. Output: 0 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "1 3"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "NONE"
      },
      {
        "testIndex": 3,
        "input": "3 0\n0 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    target = int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const target = parseInt(tokens[1], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:three-sum-unique-triples",
    "bankId": "T15-Q09",
    "slug": "three-sum-unique-triples",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Three Sum Unique Triples",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Read a sorted array of integers and an integer target from standard input. Find all distinct sorted triples (a, b, c) with a ≤ b ≤ c such that a + b + c == target. Print each triple on its own line separated by spaces, ordered lexicographically. If no triples exist, print \"EMPTY\".",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print each triple \"a b c\" on a separate line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^3, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "EMPTY",
        "explanation": "No three elements in [1, 1, 3, 4, 5] sum to 4, so output is EMPTY."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "0 0 0",
        "explanation": "The unique triple(s) summing to 0 are:\n0 0 0"
      },
      {
        "input": "10 7\n1 2 3 4 5 6 7 8 9 10",
        "output": "1 2 4",
        "explanation": "The unique triple(s) summing to 7 are:\n1 2 4"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 2,
        "input": "3 0\n0 0 0",
        "expectedOutput": "0 0 0"
      },
      {
        "testIndex": 3,
        "input": "10 7\n1 2 3 4 5 6 7 8 9 10",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    target = int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const target = parseInt(tokens[1], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:two-pointer-reverse",
    "bankId": "T15-Q10",
    "slug": "two-pointer-reverse",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Two Pointer Reverse",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Read a sorted array of integers from standard input. Reverse the array using the two-pointer technique by swapping elements from both ends until the pointers meet. Print the reversed array as space-separated integers on a single line. If the array is empty, print \"EMPTY\".",
    "inputFormat": "The first line contains two integers: n and target (target can be ignored). The second line contains n space-separated integers.",
    "outputFormat": "Print the reversed array space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "5 4 3 1 1",
        "explanation": "Swapping elements from outer to inner in [1, 1, 3, 4, 5] produces [5 4 3 1 1]."
      },
      {
        "input": "0 0",
        "output": "EMPTY",
        "explanation": "The input array is empty, so the output is EMPTY."
      },
      {
        "input": "1 7\n7",
        "output": "7",
        "explanation": "Swapping elements from outer to inner in [7] produces [7]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "5 4 3 1 1"
      },
      {
        "testIndex": 2,
        "input": "0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:remove-duplicates-in-place-model",
    "bankId": "T15-Q11",
    "slug": "remove-duplicates-in-place-model",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Remove Duplicates in Place Model",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Read a sorted array of integers from standard input. Remove duplicates so that each element appears only once, preserving sorted order. Print the unique elements space-separated on a single line. If the array is empty, print \"EMPTY\".",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the unique elements space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "1 3 4 5",
        "explanation": "Retaining only the unique elements of [1, 1, 3, 4, 5] yields: 1 3 4 5."
      },
      {
        "input": "0 0",
        "output": "EMPTY",
        "explanation": "The array is empty, so output is EMPTY."
      },
      {
        "input": "1 7\n7",
        "output": "7",
        "explanation": "Retaining only the unique elements of [7] yields: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "1 3 4 5"
      },
      {
        "testIndex": 2,
        "input": "0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:sorted-array-squared-values",
    "bankId": "T15-Q12",
    "slug": "sorted-array-squared-values",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Sorted Array Squared Values",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Read a sorted array of integers from standard input. Square each element and return the resulting squares in non-decreasing order. Print the squares separated by spaces on a single line. If the array is empty, print \"EMPTY\".",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the sorted squares space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^4 ≤ nums[i] ≤ 10^4",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "1 1 9 16 25",
        "explanation": "Squaring [1, 1, 3, 4, 5] and sorting yields: 1 1 9 16 25."
      },
      {
        "input": "0 0",
        "output": "EMPTY",
        "explanation": "The array is empty, so output is EMPTY."
      },
      {
        "input": "1 7\n7",
        "output": "49",
        "explanation": "Squaring [7] and sorting yields: 49."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "1 1 9 16 25"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
        "expectedOutput": "49"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:count-opposite-value-index-pairs",
    "bankId": "T15-Q13",
    "slug": "count-opposite-value-index-pairs",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Count Opposite Value Index Pairs",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Read a sorted array of integers from standard input. Count all pairs of indices (i, j) with i < j such that nums[i] + nums[j] == 0. Print the count.",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the count of index pairs summing to 0.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "0",
        "explanation": "In [1, 1, 3, 4, 5], there are 0 pair(s) with nums[i] + nums[j] == 0."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "3",
        "explanation": "In [0, 0, 0], there are 3 pair(s) with nums[i] + nums[j] == 0."
      },
      {
        "input": "5 5\n-5 -5 0 5 5",
        "output": "4",
        "explanation": "In [-5, -5, 0, 5, 5], there are 4 pair(s) with nums[i] + nums[j] == 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "3 0\n0 0 0",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5 5\n-5 -5 0 5 5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:two-pointer-palindrome-check",
    "bankId": "T15-Q14",
    "slug": "two-pointer-palindrome-check",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Two Pointer Palindrome Check",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Read a sorted array of integers from standard input. Determine whether the array is a palindrome (reads the same forward and backward). Print \"true\" if it is a palindrome, or \"false\" otherwise.",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print true if the array is a palindrome, otherwise false.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "false",
        "explanation": "Array [1, 1, 3, 4, 5] does not equal its reverse, so the answer is false."
      },
      {
        "input": "0 0",
        "output": "true",
        "explanation": "Array [] equals its reverse, so the answer is true."
      },
      {
        "input": "1 7\n7",
        "output": "true",
        "explanation": "Array [7] equals its reverse, so the answer is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "true"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:count-pairs-with-difference-target",
    "bankId": "T15-Q15",
    "slug": "count-pairs-with-difference-target",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Count Pairs With Difference Target",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Read a sorted array of integers and an integer target from standard input. Count all pairs of indices (i, j) with i < j such that nums[j] - nums[i] == |target|. Print the count.",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the count of index pairs with difference |target|.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "2",
        "explanation": "In [1, 1, 3, 4, 5], there are 2 pair(s) with difference nums[j] - nums[i] == |4| = 4."
      },
      {
        "input": "0 0",
        "output": "0",
        "explanation": "In [], there are 0 pair(s) with difference nums[j] - nums[i] == |0| = 0."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "3",
        "explanation": "In [0, 0, 0], there are 3 pair(s) with difference nums[j] - nums[i] == |0| = 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    target = int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const target = parseInt(tokens[1], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:maximum-two-pointer-pair-sum",
    "bankId": "T15-Q16",
    "slug": "maximum-two-pointer-pair-sum",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Maximum Two Pointer Pair Sum",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Read a sorted array of integers from standard input. Find the maximum possible sum of any pair nums[i] + nums[j] with i < j. Print the maximum sum, or \"NONE\" if the array has fewer than 2 elements.",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the maximum pair sum, or \"NONE\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "9",
        "explanation": "The two largest elements in [1, 1, 3, 4, 5] are at the end: 4 + 5 = 9."
      },
      {
        "input": "0 0",
        "output": "NONE",
        "explanation": "Array has fewer than 2 elements, so output is NONE."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "0",
        "explanation": "The two largest elements in [0, 0, 0] are at the end: 0 + 0 = 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "NONE"
      },
      {
        "testIndex": 3,
        "input": "3 0\n0 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:minimum-two-pointer-pair-sum",
    "bankId": "T15-Q17",
    "slug": "minimum-two-pointer-pair-sum",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Minimum Two Pointer Pair Sum",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Read a sorted array of integers from standard input. Find the minimum possible sum of any pair nums[i] + nums[j] with i < j. Print the minimum sum, or \"NONE\" if the array has fewer than 2 elements.",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the minimum pair sum, or \"NONE\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "2",
        "explanation": "The two smallest elements in [1, 1, 3, 4, 5] are at the start: 1 + 1 = 2."
      },
      {
        "input": "0 0",
        "output": "NONE",
        "explanation": "Array has fewer than 2 elements, so output is NONE."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "0",
        "explanation": "The two smallest elements in [0, 0, 0] are at the start: 0 + 0 = 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "NONE"
      },
      {
        "testIndex": 3,
        "input": "3 0\n0 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:pairs-exactly-twice-target",
    "bankId": "T15-Q18",
    "slug": "pairs-exactly-twice-target",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Pairs Exactly Twice Target",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Read a sorted array of integers and an integer target from standard input. Find all distinct value pairs (a, b) with a ≤ b such that a + b == 2 * target. Print each pair on a new line separated by a space, ordered by the first element ascending. If no such pairs exist, print \"EMPTY\".",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print each unique pair \"a b\" on a separate line sorted by a ascending, or \"EMPTY\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "3 5",
        "explanation": "Pairs adding up to 2 * 4 = 8 are:\n3 5"
      },
      {
        "input": "0 0",
        "output": "EMPTY",
        "explanation": "No pair in [] sums to 2 * 0 = 0, so output is EMPTY."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "0 0",
        "explanation": "Pairs adding up to 2 * 0 = 0 are:\n0 0"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "3 5"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "3 0\n0 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    target = int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const target = parseInt(tokens[1], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:first-pair-meeting-threshold",
    "bankId": "T15-Q19",
    "slug": "first-pair-meeting-threshold",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "First Pair Meeting Threshold",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Read a sorted array of integers and an integer target from standard input. Find the lexicographically smallest pair of indices (i, j) with i < j such that nums[i] + nums[j] ≥ target. Print \"i j\". If no such pair exists, print \"-1 -1\".",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print \"i j\" representing the first index pair meeting the threshold, or \"-1 -1\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "0 2",
        "explanation": "At indices i = 0, j = 2, nums[0] + nums[2] = 1 + 3 = 4 ≥ 4. Answer: 0 2."
      },
      {
        "input": "0 0",
        "output": "-1 -1",
        "explanation": "No pair in [] has sum ≥ 0, so output is -1 -1."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "0 1",
        "explanation": "At indices i = 0, j = 1, nums[0] + nums[1] = 0 + 0 = 0 ≥ 0. Answer: 0 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "0 2"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "-1 -1"
      },
      {
        "testIndex": 3,
        "input": "3 0\n0 0 0",
        "expectedOutput": "0 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    target = int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const target = parseInt(tokens[1], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:two-pointers:pair-product-closest-to-target",
    "bankId": "T15-Q20",
    "slug": "pair-product-closest-to-target",
    "languages": ["python","nodejs"],
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Pair Product Closest to Target",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Read a sorted array of integers and an integer target from standard input. Find a value pair (a, b) with a ≤ b whose product (a * b) is closest to target. In case of ties, choose the lexicographically smaller pair. Print \"a b\", or \"NONE\" if the array has fewer than 2 elements.",
    "inputFormat": "The first line contains two integers: n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print \"a b\" for the closest product pair, or \"NONE\".",
    "constraints": "0 ≤ n ≤ 10^5, -10^4 ≤ nums[i], target ≤ 10^8",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "1 4",
        "explanation": "In [1, 1, 3, 4, 5], the pair (1, 4) has product 4, which is closest to 4. Output: 1 4."
      },
      {
        "input": "0 0",
        "output": "NONE",
        "explanation": "Array has fewer than 2 elements, so output is NONE."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "0 0",
        "explanation": "In [0, 0, 0], the pair (0, 0) has product 0, which is closest to 0. Output: 0 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "1 4"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "NONE"
      },
      {
        "testIndex": 3,
        "input": "3 0\n0 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    target = int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const n = parseInt(tokens[0], 10);\n    const target = parseInt(tokens[1], 10);\n    const nums = tokens.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
