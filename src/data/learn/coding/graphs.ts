import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:graphs:degree-of-every-vertex",
    "bankId": "T19-Q01",
    "slug": "degree-of-every-vertex",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Degree of Every Vertex",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Given an undirected graph with n vertices labeled 0 through n - 1 and m edges, compute the degree of each vertex from 0 to n - 1. Print the degrees separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains two integers n and m. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print the degrees of vertices 0 to n - 1 separated by space, or EMPTY if n = 0.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v < n",
    "examples": [
      {
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "output": "1 2 2 2 1",
        "explanation": "Degrees of vertices 0 to n-1: 1 2 2 2 1."
      },
      {
        "input": "0 0",
        "output": "EMPTY",
        "explanation": "Degrees of vertices 0 to n-1: EMPTY."
      },
      {
        "input": "1 0",
        "output": "0",
        "explanation": "Degrees of vertices 0 to n-1: 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "1 2 2 2 1"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m = int(data[0]), int(data[1])\n    # TODO: Compute degrees of vertices 0 to n-1\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (cin >> n >> m) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:neighbors-of-start",
    "bankId": "T19-Q02",
    "slug": "neighbors-of-start",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Neighbors of Start",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Given an undirected graph with n vertices, m edges, and a vertex start, find all neighbors of start sorted in ascending order. Print the neighbors separated by spaces, or EMPTY if start has no neighbors or the graph is empty.",
    "inputFormat": "The first line contains three integers n, m, and start. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print the neighbors of start sorted ascending, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v, start < n",
    "examples": [
      {
        "input": "5 4 0\n0 1\n1 2\n2 3\n3 4",
        "output": "1",
        "explanation": "Neighbors of start: 1."
      },
      {
        "input": "0 0 -1",
        "output": "EMPTY",
        "explanation": "Neighbors of start: EMPTY."
      },
      {
        "input": "3 3 0\n0 1\n1 2\n0 2",
        "output": "1 2",
        "explanation": "Neighbors of start: 1 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4 0\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "0 0 -1",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "3 3 0\n0 1\n1 2\n0 2",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m, start = int(data[0]), int(data[1]), int(data[2])\n    # TODO: Print neighbors of start sorted ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10), start = parseInt(data[2], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        int start = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m, start;\n    if (cin >> n >> m >> start) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:breadth-first-search-order",
    "bankId": "T19-Q03",
    "slug": "breadth-first-search-order",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Breadth First Search Order",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Given an undirected graph with n vertices, m edges, and a vertex start, compute the Breadth-First Search (BFS) visit order starting at start. Neighbors must be explored in ascending vertex order. Print the visited vertices separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains three integers n, m, and start. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print the BFS visit order separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v, start < n",
    "examples": [
      {
        "input": "5 4 0\n0 1\n1 2\n2 3\n3 4",
        "output": "0 1 2 3 4",
        "explanation": "BFS traversal order from start: 0 1 2 3 4."
      },
      {
        "input": "0 0 -1",
        "output": "EMPTY",
        "explanation": "BFS traversal order from start: EMPTY."
      },
      {
        "input": "1 0 0",
        "output": "0",
        "explanation": "BFS traversal order from start: 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4 0\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "0 1 2 3 4"
      },
      {
        "testIndex": 2,
        "input": "0 0 -1",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m, start = int(data[0]), int(data[1]), int(data[2])\n    # TODO: Print BFS traversal order from start\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10), start = parseInt(data[2], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        int start = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m, start;\n    if (cin >> n >> m >> start) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:depth-first-search-order",
    "bankId": "T19-Q04",
    "slug": "depth-first-search-order",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Depth First Search Order",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Given an undirected graph with n vertices, m edges, and a vertex start, compute the Depth-First Search (DFS) visit order starting at start. Neighbors must be explored in ascending vertex order. Print the visited vertices separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains three integers n, m, and start. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print the DFS visit order separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v, start < n",
    "examples": [
      {
        "input": "5 4 0\n0 1\n1 2\n2 3\n3 4",
        "output": "0 1 2 3 4",
        "explanation": "DFS traversal order from start: 0 1 2 3 4."
      },
      {
        "input": "0 0 -1",
        "output": "EMPTY",
        "explanation": "DFS traversal order from start: EMPTY."
      },
      {
        "input": "1 0 0",
        "output": "0",
        "explanation": "DFS traversal order from start: 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4 0\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "0 1 2 3 4"
      },
      {
        "testIndex": 2,
        "input": "0 0 -1",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m, start = int(data[0]), int(data[1]), int(data[2])\n    # TODO: Print DFS traversal order from start\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10), start = parseInt(data[2], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        int start = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m, start;\n    if (cin >> n >> m >> start) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:is-start-connected-to-end",
    "bankId": "T19-Q05",
    "slug": "is-start-connected-to-end",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Is Start Connected to End",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Given an undirected graph with n vertices, m edges, and two vertices start and end, determine whether there exists a path connecting start and end. If n = 0, print false. Print true or false.",
    "inputFormat": "The first line contains four integers n, m, start, and end. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print true if start is connected to end, else false.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v, start, end < n",
    "examples": [
      {
        "input": "5 4 0 4\n0 1\n1 2\n2 3\n3 4",
        "output": "true",
        "explanation": "Is start connected to end? true."
      },
      {
        "input": "0 0 -1 -1",
        "output": "false",
        "explanation": "Is start connected to end? false."
      },
      {
        "input": "1 0 0 0",
        "output": "true",
        "explanation": "Is start connected to end? true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4 0 4\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "0 0 -1 -1",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "1 0 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m, start, end = int(data[0]), int(data[1]), int(data[2]), int(data[3])\n    # TODO: Print true if start is connected to end else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 4) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10), start = parseInt(data[2], 10), end = parseInt(data[3], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        int start = sc.nextInt();\n        int end = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m, start, end;\n    if (cin >> n >> m >> start >> end) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:connected-component-count",
    "bankId": "T19-Q06",
    "slug": "connected-component-count",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Connected Component Count",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Given an undirected graph with n vertices and m edges, count the total number of connected components (including isolated vertices). Print the component count as an integer.",
    "inputFormat": "The first line contains two integers n and m. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print the number of connected components.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v < n",
    "examples": [
      {
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "output": "1",
        "explanation": "Number of connected components: 1."
      },
      {
        "input": "0 0",
        "output": "0",
        "explanation": "Number of connected components: 0."
      },
      {
        "input": "5 0",
        "output": "5",
        "explanation": "Number of connected components: 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m = int(data[0]), int(data[1])\n    # TODO: Print number of connected components\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (cin >> n >> m) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:connected-component-sizes",
    "bankId": "T19-Q07",
    "slug": "connected-component-sizes",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Connected Component Sizes",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Given an undirected graph with n vertices and m edges, find the size (number of vertices) of each connected component. Print the component sizes in ascending order separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains two integers n and m. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print the component sizes sorted ascending, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v < n",
    "examples": [
      {
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "output": "5",
        "explanation": "Connected component sizes: 5."
      },
      {
        "input": "0 0",
        "output": "EMPTY",
        "explanation": "Connected component sizes: EMPTY."
      },
      {
        "input": "1 0",
        "output": "1",
        "explanation": "Connected component sizes: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m = int(data[0]), int(data[1])\n    # TODO: Print sizes of connected components sorted ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (cin >> n >> m) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:all-reachable-vertices",
    "bankId": "T19-Q08",
    "slug": "all-reachable-vertices",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "All Reachable Vertices",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Given an undirected graph with n vertices, m edges, and a vertex start, find all vertices reachable from start. Print the reachable vertex labels in ascending order separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains three integers n, m, and start. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print all reachable vertices sorted ascending, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v, start < n",
    "examples": [
      {
        "input": "5 4 0\n0 1\n1 2\n2 3\n3 4",
        "output": "0 1 2 3 4",
        "explanation": "Reachable vertices from start: 0 1 2 3 4."
      },
      {
        "input": "0 0 -1",
        "output": "EMPTY",
        "explanation": "Reachable vertices from start: EMPTY."
      },
      {
        "input": "1 0 0",
        "output": "0",
        "explanation": "Reachable vertices from start: 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4 0\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "0 1 2 3 4"
      },
      {
        "testIndex": 2,
        "input": "0 0 -1",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m, start = int(data[0]), int(data[1]), int(data[2])\n    # TODO: Print reachable vertices from start sorted ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10), start = parseInt(data[2], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        int start = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m, start;\n    if (cin >> n >> m >> start) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:shortest-edge-distance",
    "bankId": "T19-Q09",
    "slug": "shortest-edge-distance",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Shortest Edge Distance",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Given an undirected graph with n vertices, m edges, and two vertices start and end, find the shortest distance (minimum number of edges) from start to end. If unreachable or n = 0, print -1.",
    "inputFormat": "The first line contains four integers n, m, start, and end. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print the shortest edge distance, or -1 if unreachable.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v, start, end < n",
    "examples": [
      {
        "input": "5 4 0 4\n0 1\n1 2\n2 3\n3 4",
        "output": "4",
        "explanation": "Shortest edge distance from start to end: 4."
      },
      {
        "input": "0 0 -1 -1",
        "output": "-1",
        "explanation": "Shortest edge distance from start to end: -1."
      },
      {
        "input": "1 0 0 0",
        "output": "0",
        "explanation": "Shortest edge distance from start to end: 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4 0 4\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0 0 -1 -1",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "1 0 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m, start, end = int(data[0]), int(data[1]), int(data[2]), int(data[3])\n    # TODO: Print shortest edge distance or -1\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 4) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10), start = parseInt(data[2], 10), end = parseInt(data[3], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        int start = sc.nextInt();\n        int end = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m, start, end;\n    if (cin >> n >> m >> start >> end) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:lexicographically-first-shortest-path",
    "bankId": "T19-Q10",
    "slug": "lexicographically-first-shortest-path",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Lexicographically First Shortest Path",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Given an undirected graph with n vertices, m edges, and two vertices start and end, find the shortest path from start to end. If there are multiple shortest paths, choose the one that is lexicographically earliest. Print the sequence of vertex labels along the path separated by spaces, or EMPTY if unreachable or n = 0.",
    "inputFormat": "The first line contains four integers n, m, start, and end. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print the shortest path vertices separated by space, or EMPTY if unreachable.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v, start, end < n",
    "examples": [
      {
        "input": "5 4 0 4\n0 1\n1 2\n2 3\n3 4",
        "output": "0 1 2 3 4",
        "explanation": "Lexicographically first shortest path: 0 1 2 3 4."
      },
      {
        "input": "0 0 -1 -1",
        "output": "EMPTY",
        "explanation": "Lexicographically first shortest path: EMPTY."
      },
      {
        "input": "1 0 0 0",
        "output": "0",
        "explanation": "Lexicographically first shortest path: 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4 0 4\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "0 1 2 3 4"
      },
      {
        "testIndex": 2,
        "input": "0 0 -1 -1",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 0 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m, start, end = int(data[0]), int(data[1]), int(data[2]), int(data[3])\n    # TODO: Print lexicographically first shortest path\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 4) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10), start = parseInt(data[2], 10), end = parseInt(data[3], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        int start = sc.nextInt();\n        int end = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m, start, end;\n    if (cin >> n >> m >> start >> end) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:distances-from-start",
    "bankId": "T19-Q11",
    "slug": "distances-from-start",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Distances from Start",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Given an undirected graph with n vertices, m edges, and a vertex start, compute the shortest edge distance from start to every vertex 0 through n - 1. If a vertex is unreachable, its distance is -1. Print the distances separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains three integers n, m, and start. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print the distances from start to vertices 0..n-1 separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v, start < n",
    "examples": [
      {
        "input": "5 4 0\n0 1\n1 2\n2 3\n3 4",
        "output": "0 1 2 3 4",
        "explanation": "Shortest distances from start to each vertex: 0 1 2 3 4."
      },
      {
        "input": "0 0 -1",
        "output": "EMPTY",
        "explanation": "Shortest distances from start to each vertex: EMPTY."
      },
      {
        "input": "1 0 0",
        "output": "0",
        "explanation": "Shortest distances from start to each vertex: 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4 0\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "0 1 2 3 4"
      },
      {
        "testIndex": 2,
        "input": "0 0 -1",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m, start = int(data[0]), int(data[1]), int(data[2])\n    # TODO: Print distances from start to vertices 0..n-1\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 3) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10), start = parseInt(data[2], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        int start = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m, start;\n    if (cin >> n >> m >> start) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:is-graph-connected",
    "bankId": "T19-Q12",
    "slug": "is-graph-connected",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Is Graph Connected",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Given an undirected graph with n vertices and m edges, determine whether the graph is connected (all n vertices lie in a single connected component). For n ≤ 1, the graph is considered connected. Print true or false.",
    "inputFormat": "The first line contains two integers n and m. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print true if the graph is connected, else false.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v < n",
    "examples": [
      {
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "output": "true",
        "explanation": "Is the graph connected? true."
      },
      {
        "input": "5 0",
        "output": "false",
        "explanation": "Is the graph connected? false."
      },
      {
        "input": "0 0",
        "output": "true",
        "explanation": "Is the graph connected? true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "5 0",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m = int(data[0]), int(data[1])\n    # TODO: Print true if graph is connected else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (cin >> n >> m) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:has-undirected-cycle",
    "bankId": "T19-Q13",
    "slug": "has-undirected-cycle",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Has Undirected Cycle",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Given an undirected graph with n vertices and m edges, determine whether any connected component contains an undirected cycle. Print true if a cycle exists, or false otherwise.",
    "inputFormat": "The first line contains two integers n and m. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print true if graph has an undirected cycle, else false.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v < n",
    "examples": [
      {
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "output": "false",
        "explanation": "Does the graph have a cycle? false."
      },
      {
        "input": "3 3\n0 1\n1 2\n0 2",
        "output": "true",
        "explanation": "Does the graph have a cycle? true."
      },
      {
        "input": "0 0",
        "output": "false",
        "explanation": "Does the graph have a cycle? false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "3 3\n0 1\n1 2\n0 2",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m = int(data[0]), int(data[1])\n    # TODO: Print true if graph has an undirected cycle else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (cin >> n >> m) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:is-graph-bipartite",
    "bankId": "T19-Q14",
    "slug": "is-graph-bipartite",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Is Graph Bipartite",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Given an undirected graph with n vertices and m edges, determine whether the graph is bipartite (admits a 2-coloring such that every edge connects vertices of different colors). Print true or false.",
    "inputFormat": "The first line contains two integers n and m. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print true if graph is bipartite, else false.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v < n",
    "examples": [
      {
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "output": "true",
        "explanation": "Is the graph bipartite? true."
      },
      {
        "input": "3 3\n0 1\n1 2\n0 2",
        "output": "false",
        "explanation": "Is the graph bipartite? false."
      },
      {
        "input": "0 0",
        "output": "true",
        "explanation": "Is the graph bipartite? true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "3 3\n0 1\n1 2\n0 2",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "0 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m = int(data[0]), int(data[1])\n    # TODO: Print true if graph is bipartite else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (cin >> n >> m) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:is-an-undirected-tree",
    "bankId": "T19-Q15",
    "slug": "is-an-undirected-tree",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Is an Undirected Tree",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Given an undirected graph with n vertices and m edges, determine whether the graph forms a valid tree (i.e. n > 0, connected, and contains no cycles). Print true or false.",
    "inputFormat": "The first line contains two integers n and m. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print true if graph is a valid tree, else false.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v < n",
    "examples": [
      {
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "output": "true",
        "explanation": "Is the graph a valid undirected tree? true."
      },
      {
        "input": "0 0",
        "output": "false",
        "explanation": "Is the graph a valid undirected tree? false."
      },
      {
        "input": "1 0",
        "output": "true",
        "explanation": "Is the graph a valid undirected tree? true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "1 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m = int(data[0]), int(data[1])\n    # TODO: Print true if graph is an undirected tree else false\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (cin >> n >> m) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:isolated-vertex-count",
    "bankId": "T19-Q16",
    "slug": "isolated-vertex-count",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Isolated Vertex Count",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Given an undirected graph with n vertices and m edges, count the number of isolated vertices (vertices with degree zero). Print the count as an integer.",
    "inputFormat": "The first line contains two integers n and m. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print the count of isolated vertices.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v < n",
    "examples": [
      {
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "output": "0",
        "explanation": "Count of isolated vertices: 0."
      },
      {
        "input": "1 0",
        "output": "1",
        "explanation": "Count of isolated vertices: 1."
      },
      {
        "input": "5 0",
        "output": "5",
        "explanation": "Count of isolated vertices: 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "1 0",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m = int(data[0]), int(data[1])\n    # TODO: Print count of isolated vertices\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (cin >> n >> m) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:leaf-degree-vertex-ids",
    "bankId": "T19-Q17",
    "slug": "leaf-degree-vertex-ids",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Leaf Degree Vertex IDs",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Given an undirected graph with n vertices and m edges, find all vertices that have a degree of exactly 1 (leaf vertices). Print the vertex labels in ascending order separated by spaces, or EMPTY if none exist.",
    "inputFormat": "The first line contains two integers n and m. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print the degree-1 vertices sorted ascending, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v < n",
    "examples": [
      {
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "output": "0 4",
        "explanation": "Vertices with degree 1: 0 4."
      },
      {
        "input": "0 0",
        "output": "EMPTY",
        "explanation": "Vertices with degree 1: EMPTY."
      },
      {
        "input": "5 4\n0 1\n0 2\n0 3\n0 4",
        "output": "1 2 3 4",
        "explanation": "Vertices with degree 1: 1 2 3 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "0 4"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "5 4\n0 1\n0 2\n0 3\n0 4",
        "expectedOutput": "1 2 3 4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m = int(data[0]), int(data[1])\n    # TODO: Print vertices with degree 1 sorted ascending\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (cin >> n >> m) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:triangle-count",
    "bankId": "T19-Q18",
    "slug": "triangle-count",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Triangle Count",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Given an undirected simple graph with n vertices and m edges, count the number of triangles (unordered triples of distinct vertices {u, v, w} with all three edges (u,v), (v,w), (u,w) present). Print the triangle count as an integer.",
    "inputFormat": "The first line contains two integers n and m. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print the count of triangles.",
    "constraints": "0 ≤ n ≤ 500, 0 ≤ m ≤ 5000, 0 ≤ u, v < n",
    "examples": [
      {
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "output": "0",
        "explanation": "Number of triangles: 0."
      },
      {
        "input": "3 3\n0 1\n1 2\n0 2",
        "output": "1",
        "explanation": "Number of triangles: 1."
      },
      {
        "input": "5 10\n0 1\n0 2\n0 3\n0 4\n1 2\n1 3\n1 4\n2 3\n2 4\n3 4",
        "output": "10",
        "explanation": "Number of triangles: 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "3 3\n0 1\n1 2\n0 2",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5 10\n0 1\n0 2\n0 3\n0 4\n1 2\n1 3\n1 4\n2 3\n2 4\n3 4",
        "expectedOutput": "10"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m = int(data[0]), int(data[1])\n    # TODO: Print triangle count\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (cin >> n >> m) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:number-of-bridges",
    "bankId": "T19-Q19",
    "slug": "number-of-bridges",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Number of Bridges",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Given an undirected connected or disconnected graph with n vertices and m edges, count the number of bridges (edges whose removal strictly increases the number of connected components). Print the bridge count as an integer.",
    "inputFormat": "The first line contains two integers n and m. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print the number of bridges in the graph.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ m ≤ 10^5, 0 ≤ u, v < n",
    "examples": [
      {
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "output": "4",
        "explanation": "Number of bridges: 4."
      },
      {
        "input": "0 0",
        "output": "0",
        "explanation": "Number of bridges: 0."
      },
      {
        "input": "6 3\n0 1\n1 2\n3 4",
        "output": "3",
        "explanation": "Number of bridges: 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 3\n0 1\n1 2\n3 4",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m = int(data[0]), int(data[1])\n    # TODO: Print number of bridges in the graph\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (cin >> n >> m) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:graphs:adjacency-matrix",
    "bankId": "T19-Q20",
    "slug": "adjacency-matrix",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Adjacency Matrix",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Given an undirected graph with n vertices and m edges, construct its n × n adjacency matrix where matrix[u][v] = 1 if an edge joins u and v, and 0 otherwise. Print the matrix with each row on a new line and elements separated by spaces, or EMPTY if n = 0.",
    "inputFormat": "The first line contains two integers n and m. Each of the next m lines contains an undirected edge u v.",
    "outputFormat": "Print the n x n adjacency matrix, or EMPTY if n = 0.",
    "constraints": "0 ≤ n ≤ 500, 0 ≤ m ≤ 10^5, 0 ≤ u, v < n",
    "examples": [
      {
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "output": "0 1 0 0 0\n1 0 1 0 0\n0 1 0 1 0\n0 0 1 0 1\n0 0 0 1 0",
        "explanation": "Adjacency matrix:\n0 1 0 0 0\n1 0 1 0 0\n0 1 0 1 0\n0 0 1 0 1\n0 0 0 1 0"
      },
      {
        "input": "0 0",
        "output": "EMPTY",
        "explanation": "Adjacency matrix:\nEMPTY"
      },
      {
        "input": "1 0",
        "output": "0",
        "explanation": "Adjacency matrix:\n0"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 4\n0 1\n1 2\n2 3\n3 4",
        "expectedOutput": "0 1 0 0 0\n1 0 1 0 0\n0 1 0 1 0\n0 0 1 0 1\n0 0 0 1 0"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, m = int(data[0]), int(data[1])\n    # TODO: Print n x n adjacency matrix\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), m = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (cin >> n >> m) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
