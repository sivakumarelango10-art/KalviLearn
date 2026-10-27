import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:binary-search:leftmost-target-position",
    "bankId": "T12-Q01",
    "slug": "leftmost-target-position",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Leftmost Target Position",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array of n integers and an integer target, find the first (leftmost) 0-based index of target using binary search. If target is not present in the array, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the first index of target, or -1 if not found.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "3",
        "explanation": "Target 4 first occurs at index 3."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "Target 0 first occurs at index -1."
      },
      {
        "input": "1 7\n7",
        "output": "0",
        "explanation": "Target 7 first occurs at index 0."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Find leftmost index of target using binary search\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:rightmost-target-position",
    "bankId": "T12-Q02",
    "slug": "rightmost-target-position",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Rightmost Target Position",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array of n integers and an integer target, find the last (rightmost) 0-based index of target using binary search. If target is not present in the array, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the last index of target, or -1 if not found.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "3",
        "explanation": "Target 4 last occurs at index 3."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "Target 0 last occurs at index -1."
      },
      {
        "input": "1 7\n7",
        "output": "0",
        "explanation": "Target 7 last occurs at index 0."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Find rightmost index of target using binary search\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:lower-bound-insertion-index",
    "bankId": "T12-Q03",
    "slug": "lower-bound-insertion-index",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Lower Bound Insertion Index",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array of n integers and an integer target, find the lower bound insertion index. This is the first index i such that nums[i] ≥ target. If all elements are smaller than target, print n.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the lower bound insertion index.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "3",
        "explanation": "First index with value >= 4 is 3."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "First index with value >= 0 is 0."
      },
      {
        "input": "4 -1\n-4 -3 -1 2",
        "output": "2",
        "explanation": "First index with value >= -1 is 2."
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
        "input": "0 0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "4 -1\n-4 -3 -1 2",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Find lower bound insertion index\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:upper-bound-insertion-index",
    "bankId": "T12-Q04",
    "slug": "upper-bound-insertion-index",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Upper Bound Insertion Index",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array of n integers and an integer target, find the upper bound insertion index. This is the first index i such that nums[i] > target. If no element is strictly greater than target, print n.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the upper bound insertion index.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "4",
        "explanation": "First index with value > 4 is 4."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "First index with value > 0 is 0."
      },
      {
        "input": "1 7\n7",
        "output": "1",
        "explanation": "First index with value > 7 is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Find upper bound insertion index\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:number-of-target-occurrences",
    "bankId": "T12-Q05",
    "slug": "number-of-target-occurrences",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Number of Target Occurrences",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array of n integers and an integer target, count the number of occurrences of target using binary search boundaries (upper bound minus lower bound). Print the resulting count.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the count of target occurrences.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
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
        "input": "5 4\n1 1 3 4 5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Count occurrences of target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:has-exact-target",
    "bankId": "T12-Q06",
    "slug": "has-exact-target",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Has Exact Target",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array of n integers and an integer target, determine whether target is present in the array using binary search. Print true if found, or false otherwise.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print true or false.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "true",
        "explanation": "Target 4 is present in the array."
      },
      {
        "input": "0 0\n",
        "output": "false",
        "explanation": "Target 0 is absent in the array."
      },
      {
        "input": "1 7\n7",
        "output": "true",
        "explanation": "Target 7 is present in the array."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print true if target in nums else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:floor-value-of-target",
    "bankId": "T12-Q07",
    "slug": "floor-value-of-target",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Floor Value of Target",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array of n integers and an integer target, find the floor value of target (the largest element in the array that is ≤ target). If no such element exists, print null.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the floor value, or null if none exists.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "4",
        "explanation": "Floor value for target 4 is 4."
      },
      {
        "input": "0 0\n",
        "output": "null",
        "explanation": "Floor value for target 0 is null."
      },
      {
        "input": "1 7\n7",
        "output": "7",
        "explanation": "Floor value for target 7 is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Find floor value (largest element <= target)\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:ceiling-value-of-target",
    "bankId": "T12-Q08",
    "slug": "ceiling-value-of-target",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Ceiling Value of Target",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Given a sorted array of n integers and an integer target, find the ceiling value of target (the smallest element in the array that is ≥ target). If no such element exists, print null.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the ceiling value, or null if none exists.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "4",
        "explanation": "Ceiling value for target 4 is 4."
      },
      {
        "input": "0 0\n",
        "output": "null",
        "explanation": "Ceiling value for target 0 is null."
      },
      {
        "input": "1 7\n7",
        "output": "7",
        "explanation": "Ceiling value for target 7 is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Find ceiling value (smallest element >= target)\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:predecessor-strict",
    "bankId": "T12-Q09",
    "slug": "predecessor-strict",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Predecessor Strict",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Given a sorted array of n integers and an integer target, find the strict predecessor of target (the largest element strictly less than target). If no such element exists, print null.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the strict predecessor, or null if none exists.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "3",
        "explanation": "Strict predecessor of 4 is 3."
      },
      {
        "input": "0 0\n",
        "output": "null",
        "explanation": "Strict predecessor of 0 is null."
      },
      {
        "input": "4 -1\n-4 -3 -1 2",
        "output": "-3",
        "explanation": "Strict predecessor of -1 is -3."
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
        "input": "0 0\n",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "4 -1\n-4 -3 -1 2",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Find strict predecessor (largest element < target)\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:successor-strict",
    "bankId": "T12-Q10",
    "slug": "successor-strict",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Successor Strict",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Given a sorted array of n integers and an integer target, find the strict successor of target (the smallest element strictly greater than target). If no such element exists, print null.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the strict successor, or null if none exists.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "5",
        "explanation": "Strict successor of 4 is 5."
      },
      {
        "input": "0 0\n",
        "output": "null",
        "explanation": "Strict successor of 0 is null."
      },
      {
        "input": "4 -1\n-4 -3 -1 2",
        "output": "2",
        "explanation": "Strict successor of -1 is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "4 -1\n-4 -3 -1 2",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Find strict successor (smallest element > target)\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:count-values-strictly-less",
    "bankId": "T12-Q11",
    "slug": "count-values-strictly-less",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Count Values Strictly Less",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Given a sorted array of n integers and an integer target, count the number of elements in the array that are strictly less than target. Print the count.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the count of elements strictly less than target.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "3",
        "explanation": "There are 3 element(s) strictly less than 4."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "There are 0 element(s) strictly less than 0."
      },
      {
        "input": "4 -1\n-4 -3 -1 2",
        "output": "2",
        "explanation": "There are 2 element(s) strictly less than -1."
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
        "input": "0 0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "4 -1\n-4 -3 -1 2",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Count elements < target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:count-values-at-most",
    "bankId": "T12-Q12",
    "slug": "count-values-at-most",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Count Values at Most",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Given a sorted array of n integers and an integer target, count the number of elements in the array that are at most target (≤ target). Print the count.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the count of elements at most target.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "4",
        "explanation": "There are 4 element(s) at most 4."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "There are 0 element(s) at most 0."
      },
      {
        "input": "1 7\n7",
        "output": "1",
        "explanation": "There are 1 element(s) at most 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Count elements <= target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:count-values-strictly-greater",
    "bankId": "T12-Q13",
    "slug": "count-values-strictly-greater",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Count Values Strictly Greater",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Given a sorted array of n integers and an integer target, count the number of elements in the array that are strictly greater than target. Print the count.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the count of elements strictly greater than target.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "1",
        "explanation": "There are 1 element(s) strictly greater than 4."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "There are 0 element(s) strictly greater than 0."
      },
      {
        "input": "10 7\n1 2 3 4 5 6 7 8 9 10",
        "output": "3",
        "explanation": "There are 3 element(s) strictly greater than 7."
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
        "input": "0 0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "10 7\n1 2 3 4 5 6 7 8 9 10",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Count elements > target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:count-values-at-least",
    "bankId": "T12-Q14",
    "slug": "count-values-at-least",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Count Values at Least",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Given a sorted array of n integers and an integer target, count the number of elements in the array that are at least target (≥ target). Print the count.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the count of elements at least target.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "2",
        "explanation": "There are 2 element(s) at least 4."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "There are 0 element(s) at least 0."
      },
      {
        "input": "1 7\n7",
        "output": "1",
        "explanation": "There are 1 element(s) at least 7."
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
        "input": "0 0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Count elements >= target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:count-elements-between-t-and-t-plus-two",
    "bankId": "T12-Q15",
    "slug": "count-elements-between-t-and-t-plus-two",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Count Elements Between T and T Plus Two",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Given a sorted array of n integers and an integer target, count the number of elements that lie in the inclusive range [target, target + 2]. Print the count.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the count of elements in range [target, target + 2].",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "2",
        "explanation": "There are 2 element(s) between 4 and 6 inclusive."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "There are 0 element(s) between 0 and 2 inclusive."
      },
      {
        "input": "1 7\n7",
        "output": "1",
        "explanation": "There are 1 element(s) between 7 and 9 inclusive."
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
        "input": "0 0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Count elements in [target, target + 2]\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:nearest-value-in-sorted-array",
    "bankId": "T12-Q16",
    "slug": "nearest-value-in-sorted-array",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Nearest Value in Sorted Array",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Given a sorted array of n integers and an integer target, find the element in the array that is closest in absolute difference to target. If there is a tie, choose the smaller value. If the array is empty (n = 0), print null.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the nearest element value, or null if the array is empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "4",
        "explanation": "The closest element to 4 is 4."
      },
      {
        "input": "0 0\n",
        "output": "null",
        "explanation": "The closest element to 0 is null."
      },
      {
        "input": "1 7\n7",
        "output": "7",
        "explanation": "The closest element to 7 is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Find closest element to target (break ties with smaller value)\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:exact-target-index-interval",
    "bankId": "T12-Q17",
    "slug": "exact-target-index-interval",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Exact Target Index Interval",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Given a sorted array of n integers and an integer target, find the starting and ending 0-based indices of target in the array. Print two space-separated integers representing the interval. If target is absent, print -1 -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print start and end indices separated by space, or -1 -1.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "3 3",
        "explanation": "Target 4 spans index range [3, 3]."
      },
      {
        "input": "0 0\n",
        "output": "-1 -1",
        "explanation": "Target 0 spans index range [-1, -1]."
      },
      {
        "input": "1 7\n7",
        "output": "0 0",
        "explanation": "Target 7 spans index range [0, 0]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "3 3"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "-1 -1"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Find first and last indices of target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:insert-target-maintaining-order",
    "bankId": "T12-Q18",
    "slug": "insert-target-maintaining-order",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Insert Target Maintaining Order",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Given a sorted array of n integers and an integer target, insert target immediately before existing equal values (at the lower bound index) to maintain non-decreasing order. Print the resulting array as space-separated integers.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the updated array with target inserted.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "1 1 3 4 4 5",
        "explanation": "Target 4 inserted maintaining sorted order yields: 1 1 3 4 4 5."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "Target 0 inserted maintaining sorted order yields: 0."
      },
      {
        "input": "1 7\n7",
        "output": "7 7",
        "explanation": "Target 7 inserted maintaining sorted order yields: 7 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "1 1 3 4 4 5"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
        "expectedOutput": "7 7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Insert target maintaining sorted order\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:remove-all-exact-target-values",
    "bankId": "T12-Q19",
    "slug": "remove-all-exact-target-values",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Remove All Exact Target Values",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Given a sorted array of n integers and an integer target, remove all occurrences of target using binary search bounds. Print the remaining array as space-separated integers, or EMPTY if all elements are removed or the array is empty.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print the array after removing target, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "1 1 3 5",
        "explanation": "Removing all occurrences of 4 gives: 1 1 3 5."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "Removing all occurrences of 0 gives: EMPTY."
      },
      {
        "input": "4 -1\n-4 -3 -1 2",
        "output": "-4 -3 2",
        "explanation": "Removing all occurrences of -1 gives: -4 -3 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "1 1 3 5"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "4 -1\n-4 -3 -1 2",
        "expectedOutput": "-4 -3 2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Remove all target elements\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:binary-search:midpoint-partition-by-target",
    "bankId": "T12-Q20",
    "slug": "midpoint-partition-by-target",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Midpoint Partition by Target",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Given a sorted array of n integers and an integer target, partition the array conceptually into elements strictly less than target, equal to target, and strictly greater than target. Print three space-separated integers: the count of elements less than target, the count equal to target, and the count greater than target.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers in non-decreasing order.",
    "outputFormat": "Print three space-separated integers: less equal greater.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n1 1 3 4 5",
        "output": "3 1 1",
        "explanation": "3 element(s) < target, 1 equal, and 1 > target."
      },
      {
        "input": "0 0\n",
        "output": "0 0 0",
        "explanation": "0 element(s) < target, 0 equal, and 0 > target."
      },
      {
        "input": "1 7\n7",
        "output": "0 1 0",
        "explanation": "0 element(s) < target, 1 equal, and 0 > target."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n1 1 3 4 5",
        "expectedOutput": "3 1 1"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "0 0 0"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
        "expectedOutput": "0 1 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print less equal greater counts\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
