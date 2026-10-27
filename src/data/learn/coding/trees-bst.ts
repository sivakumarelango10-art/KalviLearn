import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:trees-bst:preorder-traversal",
    "bankId": "T18-Q01",
    "slug": "preorder-traversal",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Preorder Traversal",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), compute its preorder traversal (root, left subtree, right subtree). Print the node values in preorder separated by spaces, or EMPTY if the tree is empty.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the preorder traversal, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "4 2 1 3 6 5 7",
        "explanation": "Preorder traversal: 4 2 1 3 6 5 7."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Preorder traversal: EMPTY."
      },
      {
        "input": "1\n5",
        "output": "5",
        "explanation": "Preorder traversal: 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "4 2 1 3 6 5 7"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print preorder traversal\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:inorder-traversal",
    "bankId": "T18-Q02",
    "slug": "inorder-traversal",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Inorder Traversal",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), compute its inorder traversal (left subtree, root, right subtree). Print the node values in inorder separated by spaces, or EMPTY if the tree is empty.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the inorder traversal, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "1 2 3 4 5 6 7",
        "explanation": "Inorder traversal: 1 2 3 4 5 6 7."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Inorder traversal: EMPTY."
      },
      {
        "input": "1\n5",
        "output": "5",
        "explanation": "Inorder traversal: 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "1 2 3 4 5 6 7"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print inorder traversal\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:postorder-traversal",
    "bankId": "T18-Q03",
    "slug": "postorder-traversal",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Postorder Traversal",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), compute its postorder traversal (left subtree, right subtree, root). Print the node values in postorder separated by spaces, or EMPTY if the tree is empty.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the postorder traversal, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "1 3 2 5 7 6 4",
        "explanation": "Postorder traversal: 1 3 2 5 7 6 4."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Postorder traversal: EMPTY."
      },
      {
        "input": "1\n5",
        "output": "5",
        "explanation": "Postorder traversal: 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "1 3 2 5 7 6 4"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print postorder traversal\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:breadth-first-traversal",
    "bankId": "T18-Q04",
    "slug": "breadth-first-traversal",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Breadth First Traversal",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), compute its breadth-first (level-order) traversal visiting reachable non-null nodes level by level from left to right. Print the node values separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the breadth-first traversal, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "4 2 6 1 3 5 7",
        "explanation": "Breadth-first traversal: 4 2 6 1 3 5 7."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Breadth-first traversal: EMPTY."
      },
      {
        "input": "1\n5",
        "output": "5",
        "explanation": "Breadth-first traversal: 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "4 2 6 1 3 5 7"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print BFS traversal\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:tree-node-count",
    "bankId": "T18-Q05",
    "slug": "tree-node-count",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Node Count",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), count the total number of non-null reachable nodes in the tree. Print the count as an integer.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the node count.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "7",
        "explanation": "Total reachable node count: 7."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Total reachable node count: 0."
      },
      {
        "input": "1\n5",
        "output": "1",
        "explanation": "Total reachable node count: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print total node count\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:tree-value-sum",
    "bankId": "T18-Q06",
    "slug": "tree-value-sum",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Value Sum",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), compute the sum of all reachable non-null node values. Print the sum as an integer.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the sum of all node values.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "28",
        "explanation": "Sum of all node values: 28."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Sum of all node values: 0."
      },
      {
        "input": "1\n5",
        "output": "5",
        "explanation": "Sum of all node values: 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "28"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print sum of all node values\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:tree-height-in-nodes",
    "bankId": "T18-Q07",
    "slug": "tree-height-in-nodes",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Height in Nodes",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), compute its height measured in nodes (the longest path from root to a leaf). An empty tree has height 0. Print the height as an integer.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the tree height in nodes.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "3",
        "explanation": "Tree height in nodes: 3."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Tree height in nodes: 0."
      },
      {
        "input": "1\n5",
        "output": "1",
        "explanation": "Tree height in nodes: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print height in nodes\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:leaf-node-count",
    "bankId": "T18-Q08",
    "slug": "leaf-node-count",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Leaf Node Count",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), count the number of leaf nodes (non-null nodes that have neither a left nor a right child). Print the count as an integer.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the leaf node count.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "4",
        "explanation": "Number of leaf nodes: 4."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Number of leaf nodes: 0."
      },
      {
        "input": "1\n5",
        "output": "1",
        "explanation": "Number of leaf nodes: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print leaf node count\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:internal-node-count",
    "bankId": "T18-Q09",
    "slug": "internal-node-count",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Internal Node Count",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), count the number of internal nodes (non-null nodes that have at least one child). Print the count as an integer.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the internal node count.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "3",
        "explanation": "Number of internal nodes: 3."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Number of internal nodes: 0."
      },
      {
        "input": "3\n5 5 5",
        "output": "1",
        "explanation": "Number of internal nodes: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "3\n5 5 5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print internal node count\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:minimum-tree-value",
    "bankId": "T18-Q10",
    "slug": "minimum-tree-value",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Minimum Tree Value",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), find the minimum value among all reachable non-null nodes. If the tree is empty, print null.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the minimum node value, or null if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "1",
        "explanation": "Minimum node value: 1."
      },
      {
        "input": "0\n",
        "output": "null",
        "explanation": "Minimum node value: null."
      },
      {
        "input": "1\n5",
        "output": "5",
        "explanation": "Minimum node value: 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "1\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print minimum node value or null\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:maximum-tree-value",
    "bankId": "T18-Q11",
    "slug": "maximum-tree-value",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Maximum Tree Value",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), find the maximum value among all reachable non-null nodes. If the tree is empty, print null.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the maximum node value, or null if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "7",
        "explanation": "Maximum node value: 7."
      },
      {
        "input": "0\n",
        "output": "null",
        "explanation": "Maximum node value: null."
      },
      {
        "input": "1\n5",
        "output": "5",
        "explanation": "Maximum node value: 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "1\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print maximum node value or null\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:search-target-in-binary-tree",
    "bankId": "T18-Q12",
    "slug": "search-target-in-binary-tree",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Search Target in Binary Tree",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node) and an integer target, determine whether target is present in any reachable node. Print true if found, or false otherwise.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print true if target is in the tree, else false.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i], target ≤ 10^9",
    "examples": [
      {
        "input": "7 3\n4 2 6 1 3 5 7",
        "output": "true",
        "explanation": "Target 3 in binary tree? true."
      },
      {
        "input": "0 0\n",
        "output": "false",
        "explanation": "Target 0 in binary tree? false."
      },
      {
        "input": "1 5\n5",
        "output": "true",
        "explanation": "Target 5 in binary tree? true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3\n4 2 6 1 3 5 7",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "1 5\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    tree = [None if x == 'null' else int(x) for x in data[2:2+n]]\n    # TODO: Print true if target in tree else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const tree = data.slice(2, 2 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:count-target-nodes",
    "bankId": "T18-Q13",
    "slug": "count-target-nodes",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Count Target Nodes",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node) and an integer target, count the number of reachable nodes whose value equals target. Print the count as an integer.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the count of nodes equal to target.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i], target ≤ 10^9",
    "examples": [
      {
        "input": "7 3\n4 2 6 1 3 5 7",
        "output": "1",
        "explanation": "Target 3 appears 1 time(s) in the tree."
      },
      {
        "input": "0 0\n",
        "output": "0",
        "explanation": "Target 0 appears 0 time(s) in the tree."
      },
      {
        "input": "3 5\n5 5 5",
        "output": "3",
        "explanation": "Target 5 appears 3 time(s) in the tree."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3\n4 2 6 1 3 5 7",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "3 5\n5 5 5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    tree = [None if x == 'null' else int(x) for x in data[2:2+n]]\n    # TODO: Print count of target nodes\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const tree = data.slice(2, 2 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:validate-strict-bst",
    "bankId": "T18-Q14",
    "slug": "validate-strict-bst",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Validate Strict BST",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), determine whether the tree satisfies strict Binary Search Tree (BST) ordering (for every node, all left descendants are strictly smaller and all right descendants are strictly greater). An empty tree is valid. Print true or false.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print true if the tree is a strict BST, else false.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "true",
        "explanation": "Is the tree a strict BST? true."
      },
      {
        "input": "7\n1 2 3 4 5 6 7",
        "output": "false",
        "explanation": "Is the tree a strict BST? false."
      },
      {
        "input": "0\n",
        "output": "true",
        "explanation": "Is the tree a strict BST? true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 5 6 7",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print true if tree is strict BST else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:height-balanced-binary-tree",
    "bankId": "T18-Q15",
    "slug": "height-balanced-binary-tree",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Height Balanced Binary Tree",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), determine whether the tree is height-balanced (for every node, the heights of its left and right subtrees differ by at most 1). An empty tree is balanced. Print true or false.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print true if the tree is height-balanced, else false.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "true",
        "explanation": "Is the tree height-balanced? true."
      },
      {
        "input": "14\n9 3 10 1 6 null 14 null null 4 7 null null 13",
        "output": "false",
        "explanation": "Is the tree height-balanced? false."
      },
      {
        "input": "0\n",
        "output": "true",
        "explanation": "Is the tree height-balanced? true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "14\n9 3 10 1 6 null 14 null null 4 7 null null 13",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print true if tree is height-balanced else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:diameter-in-edges",
    "bankId": "T18-Q16",
    "slug": "diameter-in-edges",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Diameter in Edges",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), compute its diameter measured in edges (the length of the longest path between any two nodes in the tree). For an empty or single-node tree, print 0.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the tree diameter in edges.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "4",
        "explanation": "Tree diameter in edges: 4."
      },
      {
        "input": "0\n",
        "output": "0",
        "explanation": "Tree diameter in edges: 0."
      },
      {
        "input": "3\n5 5 5",
        "output": "2",
        "explanation": "Tree diameter in edges: 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "3\n5 5 5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print diameter in edges\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:root-to-leaf-path-sums",
    "bankId": "T18-Q17",
    "slug": "root-to-leaf-path-sums",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Root to Leaf Path Sums",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), find the sum of node values along each path from root to leaf, traversed from left to right. Print the path sums separated by spaces, or EMPTY if the tree is empty.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the root-to-leaf path sums, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "7 9 15 17",
        "explanation": "Root-to-leaf path sums: 7 9 15 17."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Root-to-leaf path sums: EMPTY."
      },
      {
        "input": "1\n5",
        "output": "5",
        "explanation": "Root-to-leaf path sums: 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "7 9 15 17"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print root-to-leaf path sums\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:level-sum-array",
    "bankId": "T18-Q18",
    "slug": "level-sum-array",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Level Sum Array",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), compute the sum of values at each depth level from root (depth 0) to the deepest level. Print the level sums separated by spaces, or EMPTY if the tree is empty.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the sum at each level separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "4 8 16",
        "explanation": "Level sums from root to leaf depth: 4 8 16."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Level sums from root to leaf depth: EMPTY."
      },
      {
        "input": "1\n5",
        "output": "5",
        "explanation": "Level sums from root to leaf depth: 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "4 8 16"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print sum at each depth level\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:minimum-target-depth",
    "bankId": "T18-Q19",
    "slug": "minimum-target-depth",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Minimum Target Depth",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node) and an integer target, find the minimum (shallowest) 0-based depth from root (root depth = 0) where a node equals target. If target is not found, print -1.",
    "inputFormat": "The first line contains two integers n and target. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the shallowest depth of target, or -1 if not found.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i], target ≤ 10^9",
    "examples": [
      {
        "input": "7 3\n4 2 6 1 3 5 7",
        "output": "2",
        "explanation": "Minimum depth of target 3: 2."
      },
      {
        "input": "0 0\n",
        "output": "-1",
        "explanation": "Minimum depth of target 0: -1."
      },
      {
        "input": "1 5\n5",
        "output": "0",
        "explanation": "Minimum depth of target 5: 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3\n4 2 6 1 3 5 7",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0 0\n",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "1 5\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, target = int(data[0]), int(data[1])\n    tree = [None if x == 'null' else int(x) for x in data[2:2+n]]\n    # TODO: Print shallowest depth of target or -1\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), target = parseInt(data[1], 10);\n    const tree = data.slice(2, 2 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        long target = sc.nextLong();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    long long target;\n    if (cin >> n >> target) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:trees-bst:right-side-view",
    "bankId": "T18-Q20",
    "slug": "right-side-view",
    "languages": ["python"],
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Right Side View",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Given a binary tree represented in array level-order of size n (where null represents a missing/null node), compute its right side view (the rightmost visible node value at each depth level from top to bottom). Print the values separated by spaces, or EMPTY if the tree is empty.",
    "inputFormat": "The first line contains integer n. The second line contains n space-separated tokens representing the tree in level-order (where null represents a missing node).",
    "outputFormat": "Print the right side view of the tree, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^5, -10^9 ≤ tree[i] ≤ 10^9",
    "examples": [
      {
        "input": "7\n4 2 6 1 3 5 7",
        "output": "4 6 7",
        "explanation": "Right side view: 4 6 7."
      },
      {
        "input": "0\n",
        "output": "EMPTY",
        "explanation": "Right side view: EMPTY."
      },
      {
        "input": "1\n5",
        "output": "5",
        "explanation": "Right side view: 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n4 2 6 1 3 5 7",
        "expectedOutput": "4 6 7"
      },
      {
        "testIndex": 2,
        "input": "0\n",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1\n5",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    tree = [None if x == 'null' else int(x) for x in data[1:1+n]]\n    # TODO: Print right side view\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    const tree = data.slice(1, 1 + n).map(x => x === 'null' ? null : parseInt(x, 10));\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        Long[] tree = new Long[n];\n        for (int i = 0; i < n; i++) {\n            String tok = sc.next();\n            tree[i] = tok.equals(\"null\") ? null : Long.parseLong(tok);\n        }\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\n#include <optional>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<optional<long long>> tree(n);\n        for (int i = 0; i < n; i++) {\n            string tok;\n            cin >> tok;\n            if (tok == \"null\") tree[i] = nullopt;\n            else tree[i] = stoll(tok);\n        }\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
