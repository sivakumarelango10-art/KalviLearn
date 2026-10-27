import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:dynamic-programming:subset-sum-feasibility",
    "bankId": "T20-Q01",
    "slug": "subset-sum-feasibility",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Subset Sum Feasibility",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n non-negative integers and an integer target, determine whether there exists a subset of elements that sums to target. Note that an empty subset has sum 0. Print true or false.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print true if a subset sums to target, else false.",
    "constraints": "0 ≤ n ≤ 100, 0 ≤ target ≤ 10^4, 0 ≤ nums[i] ≤ 1000",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "true",
        "explanation": "Can a subset sum to 4? true."
      },
      {
        "input": "3 9\n1 0 1",
        "output": "false",
        "explanation": "Can a subset sum to 9? false."
      },
      {
        "input": "0 0\n",
        "output": "true",
        "explanation": "Can a subset sum to 0? true."
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
        "input": "3 9\n1 0 1",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "0 0\n",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print true if subset sum == target else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (cin >> n >> target) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:count-subsets-equal-target",
    "bankId": "T20-Q02",
    "slug": "count-subsets-equal-target",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Count Subsets Equal Target",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers and an integer target, count the number of subsets of indices whose elements sum to target. Equal values at different indices are treated as distinct subsets. Print the count as an integer.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the count of subsets summing to target.",
    "constraints": "0 ≤ n ≤ 50, 0 ≤ target ≤ 5000, 0 ≤ nums[i] ≤ 500",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "3",
        "explanation": "Number of subsets summing to 4: 3."
      },
      {
        "input": "0 0\n",
        "output": "1",
        "explanation": "Number of subsets summing to 0: 1."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "8",
        "explanation": "Number of subsets summing to 0: 8."
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
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "3 0\n0 0 0",
        "expectedOutput": "8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Count subsets summing to target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (cin >> n >> target) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:minimum-elements-for-exact-subset-sum",
    "bankId": "T20-Q03",
    "slug": "minimum-elements-for-exact-subset-sum",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Minimum Elements for Exact Subset Sum",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers and an integer target, find the minimum number of elements in a subset that totals target. If no subset sums to target, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the minimum subset size, or -1 if impossible.",
    "constraints": "0 ≤ n ≤ 100, 0 ≤ target ≤ 5000, 0 ≤ nums[i] ≤ 500",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "1",
        "explanation": "Minimum elements for sum 4: 1."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "Minimum elements for sum 0: 0."
      },
      {
        "input": "3 9\n1 0 1",
        "output": "-1",
        "explanation": "Minimum elements for sum 9: -1."
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
        "input": "3 9\n1 0 1",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print minimum elements for subset sum == target or -1\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (cin >> n >> target) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:maximum-elements-for-exact-subset-sum",
    "bankId": "T20-Q04",
    "slug": "maximum-elements-for-exact-subset-sum",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Maximum Elements for Exact Subset Sum",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers and an integer target, find the maximum number of elements in a subset that totals target. If no subset sums to target, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the maximum subset size, or -1 if impossible.",
    "constraints": "0 ≤ n ≤ 100, 0 ≤ target ≤ 5000, 0 ≤ nums[i] ≤ 500",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "2",
        "explanation": "Maximum elements for sum 4: 2."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "Maximum elements for sum 0: 0."
      },
      {
        "input": "1 7\n7",
        "output": "1",
        "explanation": "Maximum elements for sum 7: 1."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print maximum elements for subset sum == target or -1\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (cin >> n >> target) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:count-subsets-not-exceeding-target",
    "bankId": "T20-Q05",
    "slug": "count-subsets-not-exceeding-target",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Count Subsets Not Exceeding Target",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n non-negative integers and an integer target, count the number of subsets whose sum is at most target (≤ target), including the empty subset (sum 0). Print the count as an integer.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the count of subsets with sum ≤ target.",
    "constraints": "0 ≤ n ≤ 40, 0 ≤ target ≤ 5000, 0 ≤ nums[i] ≤ 500",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "8",
        "explanation": "Number of subsets with sum <= 4: 8."
      },
      {
        "input": "0 0\n",
        "output": "1",
        "explanation": "Number of subsets with sum <= 0: 1."
      },
      {
        "input": "1 7\n7",
        "output": "2",
        "explanation": "Number of subsets with sum <= 7: 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "1 7\n7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Count subsets with sum <= target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (cin >> n >> target) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:largest-attainable-subset-sum",
    "bankId": "T20-Q06",
    "slug": "largest-attainable-subset-sum",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Largest Attainable Subset Sum",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n non-negative integers and an integer target, find the largest attainable subset sum that is at most target (≤ target). Print the maximum sum as an integer.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the largest attainable subset sum ≤ target.",
    "constraints": "0 ≤ n ≤ 100, 0 ≤ target ≤ 10^4, 0 ≤ nums[i] ≤ 1000",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "4",
        "explanation": "Largest attainable subset sum <= 4: 4."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "Largest attainable subset sum <= 0: 0."
      },
      {
        "input": "1 7\n7",
        "output": "7",
        "explanation": "Largest attainable subset sum <= 7: 7."
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
        "expectedOutput": "0"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print largest subset sum <= target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (cin >> n >> target) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:can-partition-into-equal-sums",
    "bankId": "T20-Q07",
    "slug": "can-partition-into-equal-sums",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Can Partition into Equal Sums",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n non-negative integers, determine whether the array can be partitioned into two subsets with equal sum. An empty array has equal sum 0 for both subsets. Print true or false.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print true if the array can be partitioned into two equal sums, else false.",
    "constraints": "0 ≤ n ≤ 100, 0 ≤ nums[i] ≤ 500",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "true",
        "explanation": "Can partition into equal sums? true."
      },
      {
        "input": "1\n7",
        "output": "false",
        "explanation": "Can partition into equal sums? false."
      },
      {
        "input": "0\n",
        "output": "true",
        "explanation": "Can partition into equal sums? true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "1\n7",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "0\n",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print true if partition into equal sum subsets is possible else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:minimum-equal-partition-difference",
    "bankId": "T20-Q08",
    "slug": "minimum-equal-partition-difference",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Minimum Equal Partition Difference",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n non-negative integers, partition the elements into two groups to minimize the absolute difference between their sums. Print the minimum difference as an integer.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the minimum absolute partition difference.",
    "constraints": "0 ≤ n ≤ 100, 0 ≤ nums[i] ≤ 500",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "0",
        "explanation": "Minimum partition difference: 0."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Minimum partition difference: 7."
      },
      {
        "input": "10\n1 2 3 4 5 6 7 0 1 2",
        "output": "1",
        "explanation": "Minimum partition difference: 1."
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
        "input": "1\n7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "10\n1 2 3 4 5 6 7 0 1 2",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print minimum partition difference\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:count-plus-minus-expressions",
    "bankId": "T20-Q09",
    "slug": "count-plus-minus-expressions",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Count Plus Minus Expressions",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n non-negative integers and an integer target, assign either a + or - sign to every element. Count the number of different ways to assign signs such that the algebraic sum equals target. Print the count as an integer.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the count of sign assignments summing to target.",
    "constraints": "0 ≤ n ≤ 30, -5000 ≤ target ≤ 5000, 0 ≤ nums[i] ≤ 500",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "4",
        "explanation": "Number of sign assignments summing to 4: 4."
      },
      {
        "input": "0 0\n",
        "output": "1",
        "explanation": "Number of sign assignments summing to 0: 1."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "8",
        "explanation": "Number of sign assignments summing to 0: 8."
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
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "3 0\n0 0 0",
        "expectedOutput": "8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Count sign assignments summing to target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (cin >> n >> target) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:longest-increasing-subsequence-length",
    "bankId": "T20-Q10",
    "slug": "longest-increasing-subsequence-length",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Longest Increasing Subsequence Length",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, find the length of the longest strictly increasing subsequence (LIS). The elements of the subsequence do not need to be contiguous. Print the length as an integer.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the length of the longest strictly increasing subsequence.",
    "constraints": "0 ≤ n ≤ 10^4, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "3",
        "explanation": "Length of longest strictly increasing subsequence: 3."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Length of longest strictly increasing subsequence: 0."
      },
      {
        "input": "1\n7",
        "output": "1",
        "explanation": "Length of longest strictly increasing subsequence: 1."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print length of LIS\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:longest-nondecreasing-subsequence-length",
    "bankId": "T20-Q11",
    "slug": "longest-nondecreasing-subsequence-length",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Longest Nondecreasing Subsequence Length",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, find the length of the longest non-decreasing subsequence (where each subsequent element is ≥ previous element). Print the length as an integer.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the length of the longest non-decreasing subsequence.",
    "constraints": "0 ≤ n ≤ 10^4, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "3",
        "explanation": "Length of longest non-decreasing subsequence: 3."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Length of longest non-decreasing subsequence: 0."
      },
      {
        "input": "1\n7",
        "output": "1",
        "explanation": "Length of longest non-decreasing subsequence: 1."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print length of longest non-decreasing subsequence\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:longest-strictly-decreasing-subsequence",
    "bankId": "T20-Q12",
    "slug": "longest-strictly-decreasing-subsequence",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Longest Strictly Decreasing Subsequence",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, find the length of the longest strictly decreasing subsequence. Print the length as an integer.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the length of the longest strictly decreasing subsequence.",
    "constraints": "0 ≤ n ≤ 10^4, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "2",
        "explanation": "Length of longest strictly decreasing subsequence: 2."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Length of longest strictly decreasing subsequence: 0."
      },
      {
        "input": "1\n7",
        "output": "1",
        "explanation": "Length of longest strictly decreasing subsequence: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "2"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print length of longest strictly decreasing subsequence\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:house-robber-on-a-line",
    "bankId": "T20-Q13",
    "slug": "house-robber-on-a-line",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "House Robber on a Line",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers representing houses in a line, choose a subset of non-adjacent positions to maximize the sum of selected values. Choosing no elements yields 0. Print the maximum possible sum as an integer.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the maximum non-adjacent subset sum.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "12",
        "explanation": "Maximum sum robbing non-adjacent houses: 12."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Maximum sum robbing non-adjacent houses: 0."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Maximum sum robbing non-adjacent houses: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "12"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print maximum sum of non-adjacent elements\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:circular-house-robber",
    "bankId": "T20-Q14",
    "slug": "circular-house-robber",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Circular House Robber",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers representing houses arranged in a circle (the first and last elements are also adjacent), choose non-adjacent positions to maximize the sum of selected values. For n = 1, selecting the single element is permitted. Print the maximum sum as an integer.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the maximum circular non-adjacent subset sum.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "9",
        "explanation": "Maximum circular non-adjacent sum: 9."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Maximum circular non-adjacent sum: 0."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Maximum circular non-adjacent sum: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "9"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print maximum circular non-adjacent sum\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:maximum-nonnegative-contiguous-sum",
    "bankId": "T20-Q15",
    "slug": "maximum-nonnegative-contiguous-sum",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Maximum Nonnegative Contiguous Sum",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, find the maximum sum of any contiguous subarray. An empty subarray with sum 0 is allowed, so the result is at least 0. Print the maximum sum as an integer.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the maximum non-negative contiguous subarray sum.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "14",
        "explanation": "Maximum non-negative contiguous sum: 14."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Maximum non-negative contiguous sum: 0."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Maximum non-negative contiguous sum: 7."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print maximum non-negative contiguous subarray sum\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:maximum-sum-increasing-subsequence",
    "bankId": "T20-Q16",
    "slug": "maximum-sum-increasing-subsequence",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Maximum Sum Increasing Subsequence",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers, find the maximum sum among all strictly increasing subsequences. An empty subsequence yields 0. Print the maximum sum as an integer.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the maximum sum of an increasing subsequence.",
    "constraints": "0 ≤ n ≤ 2000, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "12",
        "explanation": "Maximum sum of strictly increasing subsequence: 12."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Maximum sum of strictly increasing subsequence: 0."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Maximum sum of strictly increasing subsequence: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "12"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print maximum sum of strictly increasing subsequence\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:minimum-unlimited-coins",
    "bankId": "T20-Q17",
    "slug": "minimum-unlimited-coins",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Minimum Unlimited Coins",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers and an integer target, find the minimum number of coins needed to sum to target using unlimited copies of each distinct positive value in nums. If target cannot be formed, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the minimum number of coins, or -1 if impossible.",
    "constraints": "0 ≤ n ≤ 50, 0 ≤ target ≤ 10^4, 0 ≤ nums[i] ≤ 5000",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "1",
        "explanation": "Minimum coins to total 4: 1."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "Minimum coins to total 0: 0."
      },
      {
        "input": "3 9\n1 0 1",
        "output": "9",
        "explanation": "Minimum coins to total 9: 9."
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
        "input": "3 9\n1 0 1",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print minimum coins to sum to target or -1\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (cin >> n >> target) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:count-unlimited-coin-combinations",
    "bankId": "T20-Q18",
    "slug": "count-unlimited-coin-combinations",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Count Unlimited Coin Combinations",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers and an integer target, count the number of unordered combinations of coins summing to target using unlimited copies of each distinct positive value in nums. Print the count as an integer.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the count of coin combinations totaling target.",
    "constraints": "0 ≤ n ≤ 50, 0 ≤ target ≤ 5000, 0 ≤ nums[i] ≤ 5000",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "3",
        "explanation": "Number of coin combinations totaling 4: 3."
      },
      {
        "input": "0 0\n",
        "output": "1",
        "explanation": "Number of coin combinations totaling 0: 1."
      },
      {
        "input": "10 7\n1 2 3 4 5 6 7 0 1 2",
        "output": "15",
        "explanation": "Number of coin combinations totaling 7: 15."
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
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "10 7\n1 2 3 4 5 6 7 0 1 2",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print number of unordered coin combinations\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (cin >> n >> target) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:count-ordered-coin-sequences",
    "bankId": "T20-Q19",
    "slug": "count-ordered-coin-sequences",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Count Ordered Coin Sequences",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers and an integer target, count the number of ordered sequences of coins totaling target using unlimited copies of each distinct positive value in nums. Print the count as an integer.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the count of ordered coin sequences totaling target.",
    "constraints": "0 ≤ n ≤ 50, 0 ≤ target ≤ 5000, 0 ≤ nums[i] ≤ 5000",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "4",
        "explanation": "Number of ordered coin sequences totaling 4: 4."
      },
      {
        "input": "0 0\n",
        "output": "1",
        "explanation": "Number of ordered coin sequences totaling 0: 1."
      },
      {
        "input": "10 7\n1 2 3 4 5 6 7 0 1 2",
        "output": "64",
        "explanation": "Number of ordered coin sequences totaling 7: 64."
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
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "10 7\n1 2 3 4 5 6 7 0 1 2",
        "expectedOutput": "64"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print number of ordered coin sequences\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (cin >> n >> target) {\n        vector<int> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dynamic-programming:longest-alternating-up-down-subsequence",
    "bankId": "T20-Q20",
    "slug": "longest-alternating-up-down-subsequence",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Longest Alternating Up Down Subsequence",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers, find the length of the longest alternating (wiggle) subsequence, where the differences between successive values strictly alternate between positive and negative. A sequence with fewer than 2 elements is trivially alternating. Print the length as an integer.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the length of the longest alternating subsequence.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "5",
        "explanation": "Length of longest alternating subsequence: 5."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Length of longest alternating subsequence: 0."
      },
      {
        "input": "1\n7",
        "output": "1",
        "explanation": "Length of longest alternating subsequence: 1."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print length of longest alternating subsequence\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
