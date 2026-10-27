import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:dictionaries-hash-maps:frequency-map",
    "bankId": "T16-Q01",
    "slug": "frequency-map",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Frequency Map",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers, compute the frequency of each distinct number. For each distinct number sorted in ascending order, print the number and its frequency separated by a space on a new line. If the array is empty, print EMPTY.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print each number and frequency on a new line sorted ascending by number, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1 2\n3 1\n4 1\n5 1",
        "explanation": "Frequencies of each distinct element:\n1 2\n3 1\n4 1\n5 1"
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Frequencies of each distinct element:\nEMPTY"
      },
      {
        "input": "1\n7",
        "output": "7 1",
        "explanation": "Frequencies of each distinct element:\n7 1"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1 2\n3 1\n4 1\n5 1"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
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
      "python": "# Language: Python 3\nimport sys\nfrom collections import Counter\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print number and frequency sorted by number ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.util.TreeMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <map>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        map<long long, int> counts;\n        for (int i = 0; i < n; i++) {\n            long long val;\n            cin >> val;\n            counts[val]++;\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:target-frequency-using-map",
    "bankId": "T16-Q02",
    "slug": "target-frequency-using-map",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Target Frequency Using Map",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers and an integer target, count the number of times target occurs in the array using hash map frequency lookup. Print the count.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the count of target occurrences.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "1",
        "explanation": "Target 4 occurs 1 time(s)."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "Target 0 occurs 0 time(s)."
      },
      {
        "input": "3 0\n0 0 0",
        "output": "3",
        "explanation": "Target 0 occurs 3 time(s)."
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
      "python": "# Language: Python 3\nimport sys\nfrom collections import Counter\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print frequency of target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:first-repeated-value",
    "bankId": "T16-Q03",
    "slug": "first-repeated-value",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "First Repeated Value",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers, find the earliest element scanning left-to-right whose value has already appeared earlier in the array. If no value is repeated, print null.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the first repeated value, or null if none.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1",
        "explanation": "First repeated value encountered: 1."
      },
      {
        "input": "0\n",
        "output": "null",
        "explanation": "First repeated value encountered: null."
      },
      {
        "input": "3\n0 0 0",
        "output": "0",
        "explanation": "First repeated value encountered: 0."
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
        "input": "3\n0 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print first repeated value or null\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.util.HashSet;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:first-unique-value",
    "bankId": "T16-Q04",
    "slug": "first-unique-value",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "First Unique Value",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers, find the earliest element scanning left-to-right that occurs exactly once in the entire array. If no unique value exists, print null.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the first unique value, or null if none.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "3",
        "explanation": "First unique value: 3."
      },
      {
        "input": "0\n",
        "output": "null",
        "explanation": "First unique value: null."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "First unique value: 7."
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
      "python": "# Language: Python 3\nimport sys\nfrom collections import Counter\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print first unique value or null\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:unique-count",
    "bankId": "T16-Q05",
    "slug": "unique-count",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Unique Count",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers, compute the count of unique (distinct) numbers present in the array. Print the count as an integer.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the number of distinct elements.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "4",
        "explanation": "Count of distinct elements: 4."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Count of distinct elements: 0."
      },
      {
        "input": "1\n7",
        "output": "1",
        "explanation": "Count of distinct elements: 1."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print count of distinct elements\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:most-frequent-value",
    "bankId": "T16-Q06",
    "slug": "most-frequent-value",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Most Frequent Value",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers, find the most frequent value. If there is a tie, choose the smallest numeric value. If the array is empty, print null.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the most frequent value, or null if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1",
        "explanation": "Most frequent value (tie broken by smaller value): 1."
      },
      {
        "input": "0\n",
        "output": "null",
        "explanation": "Most frequent value (tie broken by smaller value): null."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Most frequent value (tie broken by smaller value): 7."
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
      "python": "# Language: Python 3\nimport sys\nfrom collections import Counter\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print most frequent value or null\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:least-frequent-value",
    "bankId": "T16-Q07",
    "slug": "least-frequent-value",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Least Frequent Value",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers, find the least frequent value. If there is a tie, choose the smallest numeric value. If the array is empty, print null.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the least frequent value, or null if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "3",
        "explanation": "Least frequent value (tie broken by smaller value): 3."
      },
      {
        "input": "0\n",
        "output": "null",
        "explanation": "Least frequent value (tie broken by smaller value): null."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Least frequent value (tie broken by smaller value): 7."
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
      "python": "# Language: Python 3\nimport sys\nfrom collections import Counter\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print least frequent value or null\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:index-lists-per-value",
    "bankId": "T16-Q08",
    "slug": "index-lists-per-value",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Index Lists per Value",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, group all 0-based indices for each distinct value. For each distinct value sorted in ascending order, print the value followed by its indices separated by spaces on a new line. If the array is empty, print EMPTY.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print each value and its space-separated indices on a new line sorted ascending by value, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1 1 3\n3 0\n4 2\n5 4",
        "explanation": "Index lists per value:\n1 1 3\n3 0\n4 2\n5 4"
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Index lists per value:\nEMPTY"
      },
      {
        "input": "1\n7",
        "output": "7 0",
        "explanation": "Index lists per value:\n7 0"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1 1 3\n3 0\n4 2\n5 4"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
        "expectedOutput": "7 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nfrom collections import defaultdict\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print each value and its indices on a new line\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.util.TreeMap;\nimport java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <map>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        map<long long, vector<int>> groups;\n        for (int i = 0; i < n; i++) {\n            long long val;\n            cin >> val;\n            groups[val].push_back(i);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:two-sum-hash-lookup",
    "bankId": "T16-Q09",
    "slug": "two-sum-hash-lookup",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Two Sum Hash Lookup",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers and an integer target, determine whether there exist two distinct indices i and j (i ≠ j) such that nums[i] + nums[j] == target. Print true if such a pair exists, or false otherwise.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print true or false.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "true",
        "explanation": "Pair summing to 4 exists? true."
      },
      {
        "input": "0 0\n",
        "output": "false",
        "explanation": "Pair summing to 0 exists? false."
      },
      {
        "input": "1 7\n7",
        "output": "false",
        "explanation": "Pair summing to 7 exists? false."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print true if two elements sum to target else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.util.HashSet;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:two-sum-lexicographically-first-indices",
    "bankId": "T16-Q10",
    "slug": "two-sum-lexicographically-first-indices",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Two Sum Lexicographically First Indices",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers and an integer target, find the lexicographically earliest pair of indices (i, j) with i < j such that nums[i] + nums[j] == target. Print the two indices separated by a space, or -1 -1 if no such pair exists.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print i and j separated by space, or -1 -1.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "0 1",
        "explanation": "Lexicographically first pair of indices summing to 4: 0 1."
      },
      {
        "input": "0 0\n",
        "output": "-1 -1",
        "explanation": "Lexicographically first pair of indices summing to 0: -1 -1."
      },
      {
        "input": "4 -1\n-4 -1 -3 2",
        "output": "2 3",
        "explanation": "Lexicographically first pair of indices summing to -1: 2 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "0 1"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "-1 -1"
      },
      {
        "testIndex": 3,
        "input": "4 -1\n-4 -1 -3 2",
        "expectedOutput": "2 3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print first pair of indices (i, j) with sum == target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:number-of-equal-index-pairs",
    "bankId": "T16-Q11",
    "slug": "number-of-equal-index-pairs",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Number of Equal Index Pairs",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, count the number of index pairs (i, j) with i < j such that nums[i] == nums[j]. Print the count as an integer.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the count of equal index pairs.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1",
        "explanation": "Count of pairs (i < j) with nums[i] == nums[j]: 1."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Count of pairs (i < j) with nums[i] == nums[j]: 0."
      },
      {
        "input": "3\n0 0 0",
        "output": "3",
        "explanation": "Count of pairs (i < j) with nums[i] == nums[j]: 3."
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
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "3\n0 0 0",
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
      "python": "# Language: Python 3\nimport sys\nfrom collections import Counter\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print number of pairs with nums[i] == nums[j]\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:number-of-unequal-index-pairs",
    "bankId": "T16-Q12",
    "slug": "number-of-unequal-index-pairs",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Number of Unequal Index Pairs",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, count the number of index pairs (i, j) with i < j such that nums[i] ≠ nums[j]. Print the count as an integer.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the count of unequal index pairs.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "9",
        "explanation": "Count of pairs (i < j) with nums[i] != nums[j]: 9."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Count of pairs (i < j) with nums[i] != nums[j]: 0."
      },
      {
        "input": "4\n-4 -1 -3 2",
        "output": "6",
        "explanation": "Count of pairs (i < j) with nums[i] != nums[j]: 6."
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
        "input": "4\n-4 -1 -3 2",
        "expectedOutput": "6"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nfrom collections import Counter\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print number of pairs with nums[i] != nums[j]\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:values-occurring-at-least-twice",
    "bankId": "T16-Q13",
    "slug": "values-occurring-at-least-twice",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Values Occurring At Least Twice",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, find all distinct values that appear at least twice in the array. Print the values in ascending order separated by spaces, or EMPTY if no value repeats.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the distinct repeated values sorted ascending, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1",
        "explanation": "Values occurring at least twice: 1."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Values occurring at least twice: EMPTY."
      },
      {
        "input": "3\n0 0 0",
        "output": "0",
        "explanation": "Values occurring at least twice: 0."
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
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "3\n0 0 0",
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
      "python": "# Language: Python 3\nimport sys\nfrom collections import Counter\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print values occurring >= 2 times sorted ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:frequency-of-frequencies",
    "bankId": "T16-Q14",
    "slug": "frequency-of-frequencies",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Frequency of Frequencies",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, compute the frequency of each frequency count (i.e. how many distinct numbers appear exactly k times). For each frequency count k sorted in ascending order, print k and the number of distinct integers having that frequency separated by a space on a new line. If the array is empty, print EMPTY.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print each frequency and its count on a new line sorted ascending by frequency, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1 3\n2 1",
        "explanation": "Frequency of frequencies:\n1 3\n2 1"
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Frequency of frequencies:\nEMPTY"
      },
      {
        "input": "1\n7",
        "output": "1 1",
        "explanation": "Frequency of frequencies:\n1 1"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1 3\n2 1"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
        "expectedOutput": "1 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nfrom collections import Counter\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print each frequency and its count\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:count-subarrays-with-sum-target",
    "bankId": "T16-Q15",
    "slug": "count-subarrays-with-sum-target",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Count Subarrays With Sum Target",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers and an integer target, count the number of non-empty contiguous subarrays whose sum equals target. Negative numbers are permitted. Print the count as an integer.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the count of subarrays summing to target.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "2",
        "explanation": "Number of contiguous subarrays summing to 4: 2."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "Number of contiguous subarrays summing to 0: 0."
      },
      {
        "input": "1 7\n7",
        "output": "1",
        "explanation": "Number of contiguous subarrays summing to 7: 1."
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
      "python": "# Language: Python 3\nimport sys\nfrom collections import defaultdict\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Count subarrays summing to target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.util.HashMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:longest-target-sum-subarray",
    "bankId": "T16-Q16",
    "slug": "longest-target-sum-subarray",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Longest Target Sum Subarray",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers and an integer target, find the maximum length of a contiguous subarray whose sum equals target. If no such subarray exists, print 0.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the length of the longest subarray with sum equal to target, or 0.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "2",
        "explanation": "Maximum length of subarray summing to 4: 2."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "Maximum length of subarray summing to 0: 0."
      },
      {
        "input": "1 7\n7",
        "output": "1",
        "explanation": "Maximum length of subarray summing to 7: 1."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print maximum length of subarray with sum == target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.util.HashMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:shortest-target-sum-subarray",
    "bankId": "T16-Q17",
    "slug": "shortest-target-sum-subarray",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Shortest Target Sum Subarray",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers and an integer target, find the minimum length of a non-empty contiguous subarray whose sum equals target. If no such subarray exists, print 0.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the length of the shortest subarray with sum equal to target, or 0.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "1",
        "explanation": "Minimum length of subarray summing to 4: 1."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "Minimum length of subarray summing to 0: 0."
      },
      {
        "input": "1 7\n7",
        "output": "1",
        "explanation": "Minimum length of subarray summing to 7: 1."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print minimum length of subarray with sum == target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.util.HashMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:longest-zero-sum-subarray",
    "bankId": "T16-Q18",
    "slug": "longest-zero-sum-subarray",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Longest Zero Sum Subarray",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers, find the maximum length of a contiguous subarray whose sum equals zero. If no such subarray exists or the array is empty, print 0.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the maximum length of a zero-sum subarray, or 0.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "0",
        "explanation": "Maximum length of a zero-sum subarray: 0."
      },
      {
        "input": "3\n0 0 0",
        "output": "3",
        "explanation": "Maximum length of a zero-sum subarray: 3."
      },
      {
        "input": "5\n5 -5 5 -5 0",
        "output": "5",
        "explanation": "Maximum length of a zero-sum subarray: 5."
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
        "input": "3\n0 0 0",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n5 -5 5 -5 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print maximum length of subarray with sum == 0\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.util.HashMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:first-index-lookup-map",
    "bankId": "T16-Q19",
    "slug": "first-index-lookup-map",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "First Index Lookup Map",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers, find the earliest 0-based index for each distinct number. For each distinct number sorted in ascending order, print the number and its earliest index separated by a space on a new line. If the array is empty, print EMPTY.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print each number and its first index on a new line sorted ascending by number, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1 1\n3 0\n4 2\n5 4",
        "explanation": "First index for each distinct value:\n1 1\n3 0\n4 2\n5 4"
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "First index for each distinct value:\nEMPTY"
      },
      {
        "input": "1\n7",
        "output": "7 0",
        "explanation": "First index for each distinct value:\n7 0"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1 1\n3 0\n4 2\n5 4"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
        "expectedOutput": "7 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print number and its first index on each line\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.util.TreeMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <map>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        map<long long, int> first_idx;\n        for (int i = 0; i < n; i++) {\n            long long val;\n            cin >> val;\n            if (first_idx.find(val) == first_idx.end()) first_idx[val] = i;\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:dictionaries-hash-maps:last-index-lookup-map",
    "bankId": "T16-Q20",
    "slug": "last-index-lookup-map",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Last Index Lookup Map",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers, find the last 0-based index for each distinct number. For each distinct number sorted in ascending order, print the number and its last index separated by a space on a new line. If the array is empty, print EMPTY.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print each number and its last index on a new line sorted ascending by number, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1 3\n3 0\n4 2\n5 4",
        "explanation": "Last index for each distinct value:\n1 3\n3 0\n4 2\n5 4"
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Last index for each distinct value:\nEMPTY"
      },
      {
        "input": "1\n7",
        "output": "7 0",
        "explanation": "Last index for each distinct value:\n7 0"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1 3\n3 0\n4 2\n5 4"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7",
        "expectedOutput": "7 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print number and its last index on each line\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.util.TreeMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <map>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        map<long long, int> last_idx;\n        for (int i = 0; i < n; i++) {\n            long long val;\n            cin >> val;\n            last_idx[val] = i;\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
