import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:sorting:sort-ascending",
    "bankId": "T13-Q01",
    "slug": "sort-ascending",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Sort Ascending",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers, sort the elements in non-decreasing (ascending) order. Print the sorted elements separated by spaces, or EMPTY if the array is empty.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the sorted array, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1 1 3 4 5",
        "explanation": "Array sorted in ascending order: 1 1 3 4 5."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Array sorted in ascending order: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Array sorted in ascending order: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1 1 3 4 5"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Sort ascending and print\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:sort-descending",
    "bankId": "T13-Q02",
    "slug": "sort-descending",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Sort Descending",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers, sort the elements in non-increasing (descending) order. Print the sorted elements separated by spaces, or EMPTY if the array is empty.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the sorted array in descending order, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "5 4 3 1 1",
        "explanation": "Array sorted in descending order: 5 4 3 1 1."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Array sorted in descending order: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Array sorted in descending order: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "5 4 3 1 1"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Sort descending and print\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:sort-by-absolute-value",
    "bankId": "T13-Q03",
    "slug": "sort-by-absolute-value",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Sort by Absolute Value",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers, sort the elements primarily by their absolute value in ascending order. Break ties by sorting by actual numeric value in ascending order. Print the sorted elements separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the array sorted by absolute value, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1 1 3 4 5",
        "explanation": "Sorted by absolute value with ties broken numerically: 1 1 3 4 5."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Sorted by absolute value with ties broken numerically: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Sorted by absolute value with ties broken numerically: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1 1 3 4 5"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Sort by abs(x) then x\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:even-numbers-first-sorted",
    "bankId": "T13-Q04",
    "slug": "even-numbers-first-sorted",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Even Numbers First Sorted",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers, sort the elements such that all even numbers appear first in ascending order, followed by all odd numbers in ascending order. Print the sorted elements separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print evens sorted ascending followed by odds sorted ascending.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "4 1 1 3 5",
        "explanation": "Even numbers ascending then odd numbers ascending: 4 1 1 3 5."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Even numbers ascending then odd numbers ascending: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Even numbers ascending then odd numbers ascending: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "4 1 1 3 5"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Sort evens ascending, then odds ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:odd-numbers-first-sorted",
    "bankId": "T13-Q05",
    "slug": "odd-numbers-first-sorted",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Odd Numbers First Sorted",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers, sort the elements such that all odd numbers appear first in ascending order, followed by all even numbers in ascending order. Print the sorted elements separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print odds sorted ascending followed by evens sorted ascending.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1 1 3 5 4",
        "explanation": "Odd numbers ascending then even numbers ascending: 1 1 3 5 4."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Odd numbers ascending then even numbers ascending: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Odd numbers ascending then even numbers ascending: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1 1 3 5 4"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Sort odds ascending, then evens ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:sorted-distinct-values",
    "bankId": "T13-Q06",
    "slug": "sorted-distinct-values",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Sorted Distinct Values",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers, remove all duplicate values and sort the remaining unique values in ascending order. Print the distinct sorted values separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the distinct sorted values, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1 3 4 5",
        "explanation": "Distinct values sorted ascending: 1 3 4 5."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Distinct values sorted ascending: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Distinct values sorted ascending: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1 3 4 5"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print sorted distinct values\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:k-smallest-with-duplicates",
    "bankId": "T13-Q07",
    "slug": "k-smallest-with-duplicates",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "K Smallest with Duplicates",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Given an array of n integers and an integer k, find the k smallest elements in the array (including duplicates) and print them in ascending order. If k = 0, print EMPTY.",
    "inputFormat": "The first line contains two integers n and k. The second line contains n space-separated integers.",
    "outputFormat": "Print the k smallest elements in ascending order, or EMPTY if k is 0.",
    "constraints": "0 ≤ k ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 2\n3 1 4 1 5",
        "output": "1 1",
        "explanation": "The 2 smallest element(s) are: 1 1."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "The 0 smallest element(s) are: EMPTY."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "The 1 smallest element(s) are: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 2\n3 1 4 1 5",
        "expectedOutput": "1 1"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, k = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print k smallest elements in ascending order\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), k = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:k-largest-with-duplicates",
    "bankId": "T13-Q08",
    "slug": "k-largest-with-duplicates",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "K Largest with Duplicates",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers and an integer k, find the k largest elements in the array (including duplicates) and print them in descending order. If k = 0, print EMPTY.",
    "inputFormat": "The first line contains two integers n and k. The second line contains n space-separated integers.",
    "outputFormat": "Print the k largest elements in descending order, or EMPTY if k is 0.",
    "constraints": "0 ≤ k ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 2\n3 1 4 1 5",
        "output": "5 4",
        "explanation": "The 2 largest element(s) in descending order are: 5 4."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "The 0 largest element(s) in descending order are: EMPTY."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "The 1 largest element(s) in descending order are: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 2\n3 1 4 1 5",
        "expectedOutput": "5 4"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, k = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print k largest elements in descending order\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), k = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:kth-smallest",
    "bankId": "T13-Q09",
    "slug": "kth-smallest",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Kth Smallest",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers and a 1-based index k, find the kth smallest element in the sorted array. If the array is empty or k > n, print null.",
    "inputFormat": "The first line contains two integers n and k. The second line contains n space-separated integers.",
    "outputFormat": "Print the kth smallest element, or null if empty.",
    "constraints": "0 ≤ n ≤ 10^5, 1 ≤ k ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5 2\n3 1 4 1 5",
        "output": "1",
        "explanation": "The 2th smallest element is 1."
      },
      {
        "input": "0 0\n",
        "output": "null",
        "explanation": "The 0th smallest element is null."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "The 1th smallest element is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 2\n3 1 4 1 5",
        "expectedOutput": "1"
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
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, k = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print kth smallest element\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), k = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:kth-largest",
    "bankId": "T13-Q10",
    "slug": "kth-largest",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Kth Largest",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers and a 1-based index k, find the kth largest element in the sorted array. If the array is empty or k > n, print null.",
    "inputFormat": "The first line contains two integers n and k. The second line contains n space-separated integers.",
    "outputFormat": "Print the kth largest element, or null if empty.",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, k = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Print kth largest element\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), k = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:sort-by-frequency",
    "bankId": "T13-Q11",
    "slug": "sort-by-frequency",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Sort by Frequency",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, sort all elements by decreasing frequency. If two values have the same frequency, place the smaller numeric value first. Print the sorted elements separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the array sorted by decreasing frequency, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1 1 3 4 5",
        "explanation": "Sorted by frequency (ties broken by value): 1 1 3 4 5."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Sorted by frequency (ties broken by value): EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Sorted by frequency (ties broken by value): 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1 1 3 4 5"
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
      "python": "# Language: Python 3\nimport sys\nfrom collections import Counter\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Sort by frequency descending, value ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:sort-only-positive-values",
    "bankId": "T13-Q12",
    "slug": "sort-only-positive-values",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Sort Only Positive Values",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, sort only the strictly positive values in ascending order while keeping all non-positive values (≤ 0) in their original positions. Print the resulting array separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the array with positive values sorted in-place, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1 1 3 4 5",
        "explanation": "Positives sorted in-place while non-positives retain positions: 1 1 3 4 5."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Positives sorted in-place while non-positives retain positions: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Positives sorted in-place while non-positives retain positions: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1 1 3 4 5"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Sort only positive values\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:alternate-smallest-largest",
    "bankId": "T13-Q13",
    "slug": "alternate-smallest-largest",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Alternate Smallest Largest",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, sort the elements in ascending order, then rearrange them in alternating order: smallest, largest, second-smallest, second-largest, and so forth. Print the rearranged array separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the elements in alternating smallest-largest order, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1 5 1 4 3",
        "explanation": "Alternating smallest and largest: 1 5 1 4 3."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Alternating smallest and largest: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Alternating smallest and largest: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1 5 1 4 3"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Rearrange alternating smallest and largest\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:sorted-adjacent-differences",
    "bankId": "T13-Q14",
    "slug": "sorted-adjacent-differences",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Sorted Adjacent Differences",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, sort it in ascending order, then compute the differences between consecutive adjacent elements (nums[i+1] - nums[i]). Print the resulting differences separated by spaces, or EMPTY if n < 2.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the adjacent sorted differences, or EMPTY if n < 2.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "0 2 1 1",
        "explanation": "Differences between consecutive sorted elements: 0 2 1 1."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Differences between consecutive sorted elements: EMPTY."
      },
      {
        "input": "3\n0 0 0",
        "output": "0 0",
        "explanation": "Differences between consecutive sorted elements: 0 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "0 2 1 1"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Sort and compute adjacent differences\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:median-of-sorted-list",
    "bankId": "T13-Q15",
    "slug": "median-of-sorted-list",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Median of Sorted List",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Given an array of n integers, find the median value(s) after sorting in ascending order. If n is odd, print the single middle value. If n is even and n > 0, print the two middle values separated by a space. If the array is empty, print null.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the middle value (if odd) or two middle values (if even), or null if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "3",
        "explanation": "Median element(s): 3."
      },
      {
        "input": "0\n",
        "output": "null",
        "explanation": "Median element(s): null."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Median element(s): 7."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print median of sorted array\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:negatives-first-stable",
    "bankId": "T13-Q16",
    "slug": "negatives-first-stable",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Negatives First Stable",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers, rearrange the elements stably so that all negative values (< 0) appear first in their original order, followed by all non-negative values (≥ 0) in their original order. Print the elements separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print negatives first followed by non-negatives, maintaining original relative orders.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "3 1 4 1 5",
        "explanation": "Negatives stably placed before non-negatives: 3 1 4 1 5."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Negatives stably placed before non-negatives: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Negatives stably placed before non-negatives: 7."
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Place negatives first stably\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:sort-by-distance-from-target",
    "bankId": "T13-Q17",
    "slug": "sort-by-distance-from-target",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Sort by Distance from Target",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers and an integer target, sort the elements by their distance (absolute difference) from target in ascending order. Break ties by sorting by actual numeric value ascending. Print the sorted elements separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the array sorted by distance to target, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "4 3 5 1 1",
        "explanation": "Elements sorted by distance from 4: 4 3 5 1 1."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "Elements sorted by distance from 0: EMPTY."
      },
      {
        "input": "1 7\n7",
        "output": "7",
        "explanation": "Elements sorted by distance from 7: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "4 3 5 1 1"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Sort by distance from target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:rank-each-element",
    "bankId": "T13-Q18",
    "slug": "rank-each-element",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Rank Each Element",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers, compute the dense rank (starting at 1) of each original element based on its sorted ascending position. Equal elements share the same rank. Print the ranks corresponding to the original array elements separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print the 1-based ranks of the original elements, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "2 1 3 1 4",
        "explanation": "Dense ranks for original elements: 2 1 3 1 4."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Dense ranks for original elements: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "1",
        "explanation": "Dense ranks for original elements: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "2 1 3 1 4"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print dense ranks for each element\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:order-unique-values-by-frequency",
    "bankId": "T13-Q19",
    "slug": "order-unique-values-by-frequency",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Order Unique Values by Frequency",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers, find each unique value and order them by descending frequency. Break ties by sorting by smaller numeric value. Print each unique value once, separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains an integer n. The second line contains n space-separated integers.",
    "outputFormat": "Print unique values ordered by frequency, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i] ≤ 10^9",
    "examples": [
      {
        "input": "5\n3 1 4 1 5",
        "output": "1 3 4 5",
        "explanation": "Unique values ordered by frequency: 1 3 4 5."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Unique values ordered by frequency: EMPTY."
      },
      {
        "input": "1\n7",
        "output": "7",
        "explanation": "Unique values ordered by frequency: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n3 1 4 1 5",
        "expectedOutput": "1 3 4 5"
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
      "python": "# Language: Python 3\nimport sys\nfrom collections import Counter\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1+n]]\n    # TODO: Print unique values by frequency descending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const nums = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sorting:partition-around-target",
    "bankId": "T13-Q20",
    "slug": "partition-around-target",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Partition Around Target",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Given an array of n integers and an integer target, partition the array into three sections: all values strictly less than target sorted ascending, followed by all values equal to target, followed by all values strictly greater than target sorted descending. Print the partitioned array separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated integers.",
    "outputFormat": "Print the partitioned array (< target ascending, = target, > target descending), or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9",
    "examples": [
      {
        "input": "5 4\n3 1 4 1 5",
        "output": "1 1 3 4 5",
        "explanation": "Partition around 4: 1 1 3 4 5."
      },
      {
        "input": "0 0\n",
        "output": "EMPTY",
        "explanation": "Partition around 0: EMPTY."
      },
      {
        "input": "1 7\n7",
        "output": "7",
        "explanation": "Partition around 7: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n3 1 4 1 5",
        "expectedOutput": "1 1 3 4 5"
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    nums = [int(x) for x in data[2:2+n]]\n    # TODO: Partition around target\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const nums = data.slice(2, 2 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        long[] nums = new long[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<long long> nums(n);\n        for (int i = 0; i < n; i++) cin >> nums[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
