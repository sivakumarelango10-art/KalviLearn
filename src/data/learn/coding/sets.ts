import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:sets:union-of-two-sets",
    "bankId": "T14-Q01",
    "slug": "union-of-two-sets",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Union of Two Sets",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Given two arrays a and b representing sets, compute their union (all distinct elements appearing in either a or b). Print the distinct union elements in ascending order separated by spaces, or EMPTY if both arrays are empty.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print the distinct union elements sorted ascending, or EMPTY if empty.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "1 2 3 4",
        "explanation": "Union of the two sets: 1 2 3 4."
      },
      {
        "input": "0\n\n0\n",
        "output": "EMPTY",
        "explanation": "Union of the two sets: EMPTY."
      },
      {
        "input": "1\n7\n0\n",
        "output": "7",
        "explanation": "Union of the two sets: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "1 2 3 4"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7\n0\n",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print union of set(a) and set(b) sorted ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:intersection-of-two-sets",
    "bankId": "T14-Q02",
    "slug": "intersection-of-two-sets",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Intersection of Two Sets",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Given two arrays a and b representing sets, compute their intersection (distinct elements appearing in both a and b). Print the distinct common elements in ascending order separated by spaces, or EMPTY if no elements are shared.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print the distinct intersection elements sorted ascending, or EMPTY if empty.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "2 3",
        "explanation": "Intersection of the two sets: 2 3."
      },
      {
        "input": "0\n\n0\n",
        "output": "EMPTY",
        "explanation": "Intersection of the two sets: EMPTY."
      },
      {
        "input": "3\n-1 0 1\n3\n0 0 1",
        "output": "0 1",
        "explanation": "Intersection of the two sets: 0 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "2 3"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "3\n-1 0 1\n3\n0 0 1",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print intersection sorted ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:a-difference-b",
    "bankId": "T14-Q03",
    "slug": "a-difference-b",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "A Difference B",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Given two arrays a and b representing sets, compute the set difference a \\ b (all distinct elements present in a but not in b). Print the resulting elements in ascending order separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print distinct elements in a but not in b sorted ascending, or EMPTY if empty.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "1",
        "explanation": "Set difference a \\ b: 1."
      },
      {
        "input": "0\n\n0\n",
        "output": "EMPTY",
        "explanation": "Set difference a \\ b: EMPTY."
      },
      {
        "input": "1\n7\n0\n",
        "output": "7",
        "explanation": "Set difference a \\ b: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7\n0\n",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print set difference a - b sorted ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:b-difference-a",
    "bankId": "T14-Q04",
    "slug": "b-difference-a",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "B Difference A",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Given two arrays a and b representing sets, compute the set difference b \\ a (all distinct elements present in b but not in a). Print the resulting elements in ascending order separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print distinct elements in b but not in a sorted ascending, or EMPTY if empty.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "4",
        "explanation": "Set difference b \\ a: 4."
      },
      {
        "input": "0\n\n0\n",
        "output": "EMPTY",
        "explanation": "Set difference b \\ a: EMPTY."
      },
      {
        "input": "0\n\n3\n1 1 2",
        "output": "1 2",
        "explanation": "Set difference b \\ a: 1 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "0\n\n3\n1 1 2",
        "expectedOutput": "1 2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print set difference b - a sorted ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:symmetric-difference",
    "bankId": "T14-Q05",
    "slug": "symmetric-difference",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Symmetric Difference",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Given two arrays a and b representing sets, compute their symmetric difference (all distinct elements appearing in exactly one of the two sets). Print the elements in ascending order separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print symmetric difference sorted ascending, or EMPTY if empty.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "1 4",
        "explanation": "Symmetric difference: 1 4."
      },
      {
        "input": "0\n\n0\n",
        "output": "EMPTY",
        "explanation": "Symmetric difference: EMPTY."
      },
      {
        "input": "1\n7\n0\n",
        "output": "7",
        "explanation": "Symmetric difference: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "1 4"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7\n0\n",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print symmetric difference sorted ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:is-a-subset-of-b",
    "bankId": "T14-Q06",
    "slug": "is-a-subset-of-b",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Is A Subset of B",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Given two arrays a and b representing sets, determine whether set(a) is a subset of set(b) (every distinct element of a is also present in b). Print true or false.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print true if a is a subset of b, else false.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "false",
        "explanation": "Is set(a) a subset of set(b)? false."
      },
      {
        "input": "0\n\n0\n",
        "output": "true",
        "explanation": "Is set(a) a subset of set(b)? true."
      },
      {
        "input": "1\n7\n0\n",
        "output": "false",
        "explanation": "Is set(a) a subset of set(b)? false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "1\n7\n0\n",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print true if set(a) is subset of set(b) else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:is-a-strict-subset",
    "bankId": "T14-Q07",
    "slug": "is-a-strict-subset",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Is A Strict Subset",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Given two arrays a and b representing sets, determine whether set(a) is a strict (proper) subset of set(b) (a is a subset of b, and set(a) ≠ set(b)). Print true or false.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print true if a is a strict subset of b, else false.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "false",
        "explanation": "Is set(a) a strict subset of set(b)? false."
      },
      {
        "input": "0\n\n3\n1 1 2",
        "output": "true",
        "explanation": "Is set(a) a strict subset of set(b)? true."
      },
      {
        "input": "0\n\n0\n",
        "output": "false",
        "explanation": "Is set(a) a strict subset of set(b)? false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "0\n\n3\n1 1 2",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "0\n\n0\n",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print true if set(a) < set(b) else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:are-sets-equal",
    "bankId": "T14-Q08",
    "slug": "are-sets-equal",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Are Sets Equal",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Given two arrays a and b, determine whether they represent the same set of elements (i.e. set(a) == set(b)), regardless of element multiplicity or ordering. Print true or false.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print true if both arrays represent equal sets, else false.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "false",
        "explanation": "Are the two sets equal? false."
      },
      {
        "input": "0\n\n0\n",
        "output": "true",
        "explanation": "Are the two sets equal? true."
      },
      {
        "input": "1\n7\n0\n",
        "output": "false",
        "explanation": "Are the two sets equal? false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "1\n7\n0\n",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print true if set(a) == set(b) else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:are-sets-disjoint",
    "bankId": "T14-Q09",
    "slug": "are-sets-disjoint",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Are Sets Disjoint",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Given two arrays a and b representing sets, determine whether the sets are disjoint (share no common elements). Print true or false.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print true if the sets are disjoint, else false.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "false",
        "explanation": "Are the two sets disjoint? false."
      },
      {
        "input": "0\n\n0\n",
        "output": "true",
        "explanation": "Are the two sets disjoint? true."
      },
      {
        "input": "1\n7\n0\n",
        "output": "true",
        "explanation": "Are the two sets disjoint? true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "1\n7\n0\n",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print true if disjoint else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:union-cardinality",
    "bankId": "T14-Q10",
    "slug": "union-cardinality",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Union Cardinality",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Given two arrays a and b, compute the cardinality (number of distinct elements) of their union. Print the count as an integer.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print the cardinality of the union.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "4",
        "explanation": "Number of distinct elements in union: 4."
      },
      {
        "input": "0\n\n0\n",
        "output": "0",
        "explanation": "Number of distinct elements in union: 0."
      },
      {
        "input": "1\n7\n0\n",
        "output": "1",
        "explanation": "Number of distinct elements in union: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1\n7\n0\n",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print |union|\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:intersection-cardinality",
    "bankId": "T14-Q11",
    "slug": "intersection-cardinality",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Intersection Cardinality",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Given two arrays a and b, compute the cardinality (number of distinct elements) of their intersection. Print the count as an integer.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print the cardinality of the intersection.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "2",
        "explanation": "Number of distinct elements in intersection: 2."
      },
      {
        "input": "0\n\n0\n",
        "output": "0",
        "explanation": "Number of distinct elements in intersection: 0."
      },
      {
        "input": "3\n5 5 5\n1\n5",
        "output": "1",
        "explanation": "Number of distinct elements in intersection: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "3\n5 5 5\n1\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print |intersection|\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:remove-duplicates-from-a",
    "bankId": "T14-Q12",
    "slug": "remove-duplicates-from-a",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Remove Duplicates from A",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Given an array a, remove all duplicate values and print the distinct elements in ascending order separated by spaces, or EMPTY if a is empty. Array b may be ignored.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print the distinct elements of a sorted ascending, or EMPTY if empty.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "1 2 3",
        "explanation": "Distinct values of array a: 1 2 3."
      },
      {
        "input": "0\n\n0\n",
        "output": "EMPTY",
        "explanation": "Distinct values of array a: EMPTY."
      },
      {
        "input": "1\n7\n0\n",
        "output": "7",
        "explanation": "Distinct values of array a: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "1 2 3"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n7\n0\n",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    # TODO: Print distinct elements of a sorted ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const a = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:common-even-values",
    "bankId": "T14-Q13",
    "slug": "common-even-values",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Common Even Values",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Given two arrays a and b representing sets, find all distinct even integers that appear in both arrays. Print them in ascending order separated by spaces, or EMPTY if no common even integers exist.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print distinct common even values sorted ascending, or EMPTY if empty.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "2",
        "explanation": "Common even values: 2."
      },
      {
        "input": "0\n\n0\n",
        "output": "EMPTY",
        "explanation": "Common even values: EMPTY."
      },
      {
        "input": "3\n-1 0 1\n3\n0 0 1",
        "output": "0",
        "explanation": "Common even values: 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "3\n-1 0 1\n3\n0 0 1",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print common even elements sorted ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:distinct-values-occurring-in-a-only",
    "bankId": "T14-Q14",
    "slug": "distinct-values-occurring-in-a-only",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Distinct Values Occurring in A Only",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Given two arrays a and b, count how many distinct values occur exclusively in a (in a but not in b). Print the count as an integer.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print the count of distinct values occurring only in a.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "1",
        "explanation": "Number of distinct values in a only: 1."
      },
      {
        "input": "0\n\n0\n",
        "output": "0",
        "explanation": "Number of distinct values in a only: 0."
      },
      {
        "input": "8\n0 1 2 3 4 5 6 7\n8\n4 5 6 7 8 9 10 11",
        "output": "4",
        "explanation": "Number of distinct values in a only: 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8\n0 1 2 3 4 5 6 7\n8\n4 5 6 7 8 9 10 11",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print len(set(a) - set(b))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:smallest-shared-value",
    "bankId": "T14-Q15",
    "slug": "smallest-shared-value",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Smallest Shared Value",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Given two arrays a and b representing sets, find the smallest (minimum) value shared by both sets. If no values are shared, print null.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print the smallest shared value, or null if disjoint.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "2",
        "explanation": "Smallest shared value: 2."
      },
      {
        "input": "0\n\n0\n",
        "output": "null",
        "explanation": "Smallest shared value: null."
      },
      {
        "input": "3\n-1 0 1\n3\n0 0 1",
        "output": "0",
        "explanation": "Smallest shared value: 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "3\n-1 0 1\n3\n0 0 1",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print min(set(a) & set(b)) or null\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:largest-union-element",
    "bankId": "T14-Q16",
    "slug": "largest-union-element",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Largest Union Element",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Given two arrays a and b representing sets, find the largest (maximum) element across both sets (i.e. maximum of union). If both sets are empty, print null.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print the maximum element across both sets, or null if both empty.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "4",
        "explanation": "Largest element across both sets: 4."
      },
      {
        "input": "0\n\n0\n",
        "output": "null",
        "explanation": "Largest element across both sets: null."
      },
      {
        "input": "1\n7\n0\n",
        "output": "7",
        "explanation": "Largest element across both sets: 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "1\n7\n0\n",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print max(set(a) | set(b)) or null\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:a-duplicated-input-values",
    "bankId": "T14-Q17",
    "slug": "a-duplicated-input-values",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "A Duplicated Input Values",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Given an array a, find all distinct values that occur at least twice in a. Print them in ascending order separated by spaces, or EMPTY if no duplicated values exist. Array b may be ignored.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print duplicated values sorted ascending, or EMPTY if empty.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "2",
        "explanation": "Duplicated values in array a: 2."
      },
      {
        "input": "0\n\n0\n",
        "output": "EMPTY",
        "explanation": "Duplicated values in array a: EMPTY."
      },
      {
        "input": "3\n5 5 5\n1\n5",
        "output": "5",
        "explanation": "Duplicated values in array a: 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "3\n5 5 5\n1\n5",
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
      "python": "# Language: Python 3\nimport sys\nfrom collections import Counter\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    # TODO: Print values occurring at least twice in a\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1) {\n    const n = parseInt(data[0], 10);\n    const a = data.slice(1, 1 + n).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:unique-counts-of-both-inputs",
    "bankId": "T14-Q18",
    "slug": "unique-counts-of-both-inputs",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Unique Counts of Both Inputs",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Given two arrays a and b, compute the number of unique (distinct) elements in each array. Print two space-separated integers: count_distinct(a) and count_distinct(b).",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print count_distinct(a) and count_distinct(b) separated by a space.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "3 3",
        "explanation": "Unique counts: 3 in a and 3 in b."
      },
      {
        "input": "0\n\n0\n",
        "output": "0 0",
        "explanation": "Unique counts: 0 in a and 0 in b."
      },
      {
        "input": "1\n7\n0\n",
        "output": "1 0",
        "explanation": "Unique counts: 1 in a and 0 in b."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "3 3"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "0 0"
      },
      {
        "testIndex": 3,
        "input": "1\n7\n0\n",
        "expectedOutput": "1 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print len(set(a)) and len(set(b))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:exclusive-elements-count",
    "bankId": "T14-Q19",
    "slug": "exclusive-elements-count",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Exclusive Elements Count",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Given two arrays a and b representing sets, compute the number of exclusive elements (the size of the symmetric difference |set(a) ^ set(b)|). Print the count as an integer.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print the size of the symmetric difference.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "2",
        "explanation": "Count of exclusive elements: 2."
      },
      {
        "input": "0\n\n0\n",
        "output": "0",
        "explanation": "Count of exclusive elements: 0."
      },
      {
        "input": "1\n7\n0\n",
        "output": "1",
        "explanation": "Count of exclusive elements: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1\n7\n0\n",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print len(set(a) ^ set(b))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:sets:jaccard-similarity-fraction",
    "bankId": "T14-Q20",
    "slug": "jaccard-similarity-fraction",
    "languages": ["python","nodejs"],
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Jaccard Similarity Fraction",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Given two arrays a and b, compute the Jaccard similarity between set(a) and set(b) defined as |intersection| / |union| in lowest reduced fractional terms. Print two space-separated integers: numerator and denominator. If both sets are empty, print 1 1.",
    "inputFormat": "The first line contains integer n (size of a), followed by n space-separated integers on the second line. The third line contains integer m (size of b), followed by m space-separated integers on the fourth line.",
    "outputFormat": "Print numerator and denominator separated by space.",
    "constraints": "0 ≤ n, m ≤ 10^5, -10^9 ≤ a[i], b[i] ≤ 10^9",
    "examples": [
      {
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "output": "1 2",
        "explanation": "Jaccard similarity fraction: 1/2."
      },
      {
        "input": "0\n\n0\n",
        "output": "1 1",
        "explanation": "Jaccard similarity fraction: 1/1."
      },
      {
        "input": "1\n7\n0\n",
        "output": "0 1",
        "explanation": "Jaccard similarity fraction: 0/1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3\n3\n2 3 4",
        "expectedOutput": "1 2"
      },
      {
        "testIndex": 2,
        "input": "0\n\n0\n",
        "expectedOutput": "1 1"
      },
      {
        "testIndex": 3,
        "input": "1\n7\n0\n",
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
      "python": "# Language: Python 3\nimport sys, math\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    a = [int(x) for x in data[1:1+n]]\n    m = int(data[1+n])\n    b = [int(x) for x in data[2+n:2+n+m]]\n    # TODO: Print numerator and denominator in reduced terms\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    let idx = 0;\n    const n = parseInt(data[idx++], 10);\n    const a = data.slice(idx, idx + n).map(Number); idx += n;\n    const m = parseInt(data[idx++], 10);\n    const b = data.slice(idx, idx + m).map(Number);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long[] a = new long[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextLong();\n        int m = sc.nextInt();\n        long[] b = new long[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextLong();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<long long> a(n);\n        for (int i = 0; i < n; i++) cin >> a[i];\n        int m;\n        cin >> m;\n        vector<long long> b(m);\n        for (int i = 0; i < m; i++) cin >> b[i];\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
