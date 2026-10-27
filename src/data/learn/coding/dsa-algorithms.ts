import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:dsa-algorithms:sliding-window-maximum",
    "bankId": "T21-Q01",
    "slug": "sliding-window-maximum",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Sliding Window Maximum",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers and a window size k, find the maximum value in every contiguous sliding window of size k from left to right. Print the maximum values separated by spaces, or EMPTY if k > n or n = 0.",
    "inputFormat": "The first line contains two integers n and k. The second line contains n space-separated integers.",
    "outputFormat": "Print the sliding window maximums, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, 1 ≤ k ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 2\n3 1 4 1 5",
        "output": "3 4 4 5",
        "explanation": "Sliding window maximums: 3 4 4 5."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "Sliding window maximums: EMPTY."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Sliding window maximums: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 2\n3 1 4 1 5",
        "expectedOutput": "3 4 4 5"
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
      "python": "# Language: Python 3\nimport sys\nfrom collections import deque\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, k = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print sliding window maximums\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), k = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:sliding-window-minimum",
    "bankId": "T21-Q02",
    "slug": "sliding-window-minimum",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Sliding Window Minimum",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers and a window size k, find the minimum value in every contiguous sliding window of size k from left to right. Print the minimum values separated by spaces, or EMPTY if k > n or n = 0.",
    "inputFormat": "The first line contains two integers n and k. The second line contains n space-separated integers.",
    "outputFormat": "Print the sliding window minimums, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, 1 ≤ k ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 2\n3 1 4 1 5",
        "output": "1 1 1 1",
        "explanation": "Sliding window minimums: 1 1 1 1."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "Sliding window minimums: EMPTY."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Sliding window minimums: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 2\n3 1 4 1 5",
        "expectedOutput": "1 1 1 1"
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
      "python": "# Language: Python 3\nimport sys\nfrom collections import deque\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, k = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print sliding window minimums\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), k = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:sliding-window-sums",
    "bankId": "T21-Q03",
    "slug": "sliding-window-sums",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Sliding Window Sums",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers and a window size k, compute the sum of elements in every contiguous sliding window of size k from left to right. Print the sums separated by spaces, or EMPTY if k > n or n = 0.",
    "inputFormat": "The first line contains two integers n and k. The second line contains n space-separated integers.",
    "outputFormat": "Print the sliding window sums, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, 1 ≤ k ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 2\n3 1 4 1 5",
        "output": "4 5 5 6",
        "explanation": "Sliding window sums: 4 5 5 6."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "Sliding window sums: EMPTY."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Sliding window sums: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 2\n3 1 4 1 5",
        "expectedOutput": "4 5 5 6"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, k = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print sliding window sums\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), k = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:sliding-window-distinct-counts",
    "bankId": "T21-Q04",
    "slug": "sliding-window-distinct-counts",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Sliding Window Distinct Counts",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers and a window size k, count the number of distinct values in every contiguous sliding window of size k from left to right. Print the counts separated by spaces, or EMPTY if k > n or n = 0.",
    "inputFormat": "The first line contains two integers n and k. The second line contains n space-separated integers.",
    "outputFormat": "Print the distinct counts for each window, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, 1 ≤ k ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 2\n3 1 4 1 5",
        "output": "2 2 2 2",
        "explanation": "Distinct counts per sliding window: 2 2 2 2."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "Distinct counts per sliding window: EMPTY."
      },
      {
        "input": "1 1\n7",
        "output": "1",
        "explanation": "Distinct counts per sliding window: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 2\n3 1 4 1 5",
        "expectedOutput": "2 2 2 2"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
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
      "python": "# Language: Python 3\nimport sys\nfrom collections import defaultdict\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, k = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print distinct counts per sliding window\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), k = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:prefix-sum-query-base",
    "bankId": "T21-Q05",
    "slug": "prefix-sum-query-base",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Prefix Sum Query Base",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers, compute its 0-indexed prefix sum array of size n + 1 starting with 0: prefix[0] = 0, and prefix[i] = prefix[i-1] + nums[i-1]. Print the prefix sum array separated by spaces.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the n+1 prefix sum values separated by space.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "0 3 4 8 9 14",
        "explanation": "Prefix sums starting with 0: 0 3 4 8 9 14."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Prefix sums starting with 0: 0."
      },
      {
        "input": "1\n7",
        "output": "0 7",
        "explanation": "Prefix sums starting with 0: 0 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "0 3 4 8 9 14"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
        "expectedOutput": "0 7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print prefix sums starting with 0\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:prefix-xor-values",
    "bankId": "T21-Q06",
    "slug": "prefix-xor-values",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Prefix XOR Values",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers, compute the cumulative bitwise XOR of all elements up to each index (using Python signed integer XOR). Print the prefix XOR values separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the prefix XOR values separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "3 2 6 7 2",
        "explanation": "Prefix XOR values: 3 2 6 7 2."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Prefix XOR values: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Prefix XOR values: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "3 2 6 7 2"
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
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print cumulative prefix XOR values\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Note: This problem uses Python signed integer XOR semantics.\nconsole.log(\"Python only\");\n",
      "java": "// Note: This problem uses Python signed integer XOR semantics.\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Python only\");\n    }\n}\n",
      "cpp": "// Note: This problem uses Python signed integer XOR semantics.\n#include <iostream>\nint main() {\n    std::cout << \"Python only\\n\";\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:prefix-gcd-values",
    "bankId": "T21-Q07",
    "slug": "prefix-gcd-values",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Prefix GCD Values",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers, compute the cumulative greatest common divisor (GCD) of absolute values of elements up to each index. Print the prefix GCD values separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the prefix GCD values separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "3 1 1 1 1",
        "explanation": "Prefix GCD values: 3 1 1 1 1."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Prefix GCD values: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Prefix GCD values: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "3 1 1 1 1"
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
      "python": "# Language: Python 3\nimport sys, math\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print prefix GCD values\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:next-greater-element-to-right",
    "bankId": "T21-Q08",
    "slug": "next-greater-element-to-right",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Next Greater Element to Right",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, find the next strictly greater element to the right for each position. If no strictly greater element exists to the right, use -1. Print the resulting values separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the next greater elements to the right separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "4 4 5 5 -1",
        "explanation": "Next greater elements to the right: 4 4 5 5 -1."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Next greater elements to the right: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "-1",
        "explanation": "Next greater elements to the right: -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "4 4 5 5 -1"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print next greater element to the right for each position\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:next-smaller-element-to-right",
    "bankId": "T21-Q09",
    "slug": "next-smaller-element-to-right",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Next Smaller Element to Right",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, find the next strictly smaller element to the right for each position. If no strictly smaller element exists to the right, use -1. Print the resulting values separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the next smaller elements to the right separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1 -1 1 -1 -1",
        "explanation": "Next smaller elements to the right: 1 -1 1 -1 -1."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Next smaller elements to the right: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "-1",
        "explanation": "Next smaller elements to the right: -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1 -1 1 -1 -1"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print next smaller element to the right\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:previous-greater-element-to-left",
    "bankId": "T21-Q10",
    "slug": "previous-greater-element-to-left",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Previous Greater Element to Left",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, find the closest strictly greater element on the left for each position. If no strictly greater element exists to the left, use -1. Print the resulting values separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the previous greater elements to the left separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "-1 3 -1 4 -1",
        "explanation": "Previous greater elements to the left: -1 3 -1 4 -1."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Previous greater elements to the left: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "-1",
        "explanation": "Previous greater elements to the left: -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "-1 3 -1 4 -1"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print previous greater element to the left\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:previous-smaller-element-to-left",
    "bankId": "T21-Q11",
    "slug": "previous-smaller-element-to-left",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Previous Smaller Element to Left",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, find the closest strictly smaller element on the left for each position. If no strictly smaller element exists to the left, use -1. Print the resulting values separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the previous smaller elements to the left separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "-1 -1 1 -1 1",
        "explanation": "Previous smaller elements to the left: -1 -1 1 -1 1."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Previous smaller elements to the left: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "-1",
        "explanation": "Previous smaller elements to the left: -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "-1 -1 1 -1 1"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print previous smaller element to the left\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:stock-span-for-daily-prices",
    "bankId": "T21-Q12",
    "slug": "stock-span-for-daily-prices",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Stock Span for Daily Prices",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n daily prices, compute the stock span for each day. The span of day i is the number of consecutive preceding or current days where prices were ≤ price on day i. Print the spans separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the stock spans separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, 0 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1 1 3 1 5",
        "explanation": "Daily stock spans: 1 1 3 1 5."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Daily stock spans: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "1",
        "explanation": "Daily stock spans: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1 1 3 1 5"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print stock span for each day\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:largest-histogram-rectangle",
    "bankId": "T21-Q13",
    "slug": "largest-histogram-rectangle",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Largest Histogram Rectangle",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers representing histogram bar heights (treating negative heights as 0), find the area of the largest rectangle that can be formed within the histogram bars. Print the maximum area as an integer.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the maximum histogram rectangle area.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "5",
        "explanation": "Largest histogram rectangle area: 5."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Largest histogram rectangle area: 0."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Largest histogram rectangle area: 7."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print maximum rectangle area in histogram\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:trapping-rain-water",
    "bankId": "T21-Q14",
    "slug": "trapping-rain-water",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Trapping Rain Water",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers representing elevation map bar heights (treating negative heights as 0), compute the total volume of water trapped between the bars after raining. Print the trapped water volume as an integer.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the trapped rain water volume.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "5",
        "explanation": "Total trapped rain water: 5."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Total trapped rain water: 0."
      },
      {
        "input": "7\n8 1 8 2 8 3 8",
        "output": "18",
        "explanation": "Total trapped rain water: 18."
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
        "input": "7\n8 1 8 2 8 3 8",
        "expectedOutput": "18"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print trapped rain water\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:longest-distinct-subarray",
    "bankId": "T21-Q15",
    "slug": "longest-distinct-subarray",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Longest Distinct Subarray",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, find the maximum length of a contiguous subarray that contains no duplicate values. Print the maximum length as an integer.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the length of the longest distinct subarray.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "3",
        "explanation": "Length of longest subarray with distinct values: 3."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Length of longest subarray with distinct values: 0."
      },
      {
        "input": "1\n7",
        "output": "1",
        "explanation": "Length of longest subarray with distinct values: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "3"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print maximum length of contiguous subarray with distinct values\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:reverse-first-k-elements",
    "bankId": "T21-Q16",
    "slug": "reverse-first-k-elements",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Reverse First K Elements",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers and an integer k, reverse the first k elements of the array while keeping the remaining elements in their original positions and order. Print the updated array separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains two integers n and k. The second line contains n space-separated integers.",
    "outputFormat": "Print the array after reversing the first k elements, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, 0 ≤ k ≤ n, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 2\n3 1 4 1 5",
        "output": "1 3 4 1 5",
        "explanation": "First 2 elements reversed: 1 3 4 1 5."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "First 0 elements reversed: EMPTY."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "First 1 elements reversed: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 2\n3 1 4 1 5",
        "expectedOutput": "1 3 4 1 5"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, k = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Reverse first k elements and print array\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), k = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:kth-largest-with-heap",
    "bankId": "T21-Q17",
    "slug": "kth-largest-with-heap",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Kth Largest with Heap",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers and a 1-based index k, find the kth largest element in the array (including duplicates). If the array is empty or k > n, print null.",
    "inputFormat": "The first line contains two integers n and k. The second line contains n space-separated integers.",
    "outputFormat": "Print the kth largest value, or null if empty.",
    "constraints": "0 ≤ n ≤ 10^5, 1 ≤ k ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 2\n3 1 4 1 5",
        "output": "4",
        "explanation": "The 2th largest element is 4."
      },
      {
        "input": "0 0\n",
        "output": "null",
        "explanation": "The 0th largest element is null."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "The 1th largest element is 7."
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
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
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
      "python": "# Language: Python 3\nimport sys, heapq\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, k = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print kth largest element using heap\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), k = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:running-median-floor",
    "bankId": "T21-Q18",
    "slug": "running-median-floor",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Running Median Floor",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers, compute the floor of the running median for every prefix 1 through n. For even-length prefixes, average the two middle values and take the floor (math.floor). Print the running medians separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the running medians separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "3 2 3 2 3",
        "explanation": "Running median floor values: 3 2 3 2 3."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Running median floor values: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Running median floor values: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "3 2 3 2 3"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print running median floor for each prefix\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:window-average-as-fraction",
    "bankId": "T21-Q19",
    "slug": "window-average-as-fraction",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Window Average as Fraction",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers and a window size k, compute the average of each contiguous k-element sliding window expressed as a reduced fraction with a positive denominator. For each window, print numerator and denominator separated by space on a new line, or EMPTY if k > n or n = 0.",
    "inputFormat": "The first line contains two integers n and k. The second line contains n space-separated integers.",
    "outputFormat": "Print each window average as numerator and denominator on a new line, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, 1 ≤ k ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 2\n3 1 4 1 5",
        "output": "2 1\n5 2\n5 2\n3 1",
        "explanation": "Window averages as reduced fractions:\n2 1\n5 2\n5 2\n3 1"
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "Window averages as reduced fractions:\nEMPTY"
      },
      {
        "input": "1 1\n7",
        "output": "7 1",
        "explanation": "Window averages as reduced fractions:\n7 1"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 2\n3 1 4 1 5",
        "expectedOutput": "2 1\n5 2\n5 2\n3 1"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
        "expectedOutput": "7 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys, math\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, k = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print reduced fractions for each window average\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), k = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dsa-algorithms:balanced-binary-partition",
    "bankId": "T21-Q20",
    "slug": "balanced-binary-partition",
    "topicId": "dsa-algorithms",
    "topicSlug": "dsa-algorithms",
    "topicTitle": "DSA Algorithms",
    "title": "Balanced Binary Partition",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers and an integer target, partition the array so that all elements ≤ target come first followed by all elements > target, preserving the relative order within both groups (stable partition). Print the elements separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the stably partitioned array, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "3 1 4 1 5",
        "explanation": "Stable partition around target 4: 3 1 4 1 5."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "Stable partition around target 0: EMPTY."
      },
      {
        "input": "1 7\n7",
        "output": "7",
        "explanation": "Stable partition around target 7: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "3 1 4 1 5"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Stably partition elements <= target then > target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
