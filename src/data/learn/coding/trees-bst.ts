import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:trees-bst:tree-count-all-nodes-1",
    "slug": "tree-count-all-nodes-1",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — All Nodes #1",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select all nodes and print their count. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "7",
        "explanation": "Selected node values are [5, 3, 8, 1, 4, 7, 9]; the count is 7."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "5",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the count is 5."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "6",
        "explanation": "Selected node values are [10, 5, 15, 7, 12, 20]; the count is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "6"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-sum-all-nodes-2",
    "slug": "tree-sum-all-nodes-2",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — All Nodes #2",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select all nodes and print their sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "37",
        "explanation": "Selected node values are [5, 3, 8, 1, 4, 7, 9]; the sum is 37."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "15",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the sum is 15."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "69",
        "explanation": "Selected node values are [10, 5, 15, 7, 12, 20]; the sum is 69."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "37"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "69"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-max-all-nodes-3",
    "slug": "tree-max-all-nodes-3",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — All Nodes #3",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select all nodes and print their max. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "9",
        "explanation": "Selected node values are [5, 3, 8, 1, 4, 7, 9]; the max is 9."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "5",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the max is 5."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "20",
        "explanation": "Selected node values are [10, 5, 15, 7, 12, 20]; the max is 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "20"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-min-all-nodes-4",
    "slug": "tree-min-all-nodes-4",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — All Nodes #4",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select all nodes and print their min. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "1",
        "explanation": "Selected node values are [5, 3, 8, 1, 4, 7, 9]; the min is 1."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "1",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the min is 1."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "5",
        "explanation": "Selected node values are [10, 5, 15, 7, 12, 20]; the min is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-all-nodes-5",
    "slug": "tree-depth-sum-all-nodes-5",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — All Nodes #5",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select all nodes and print their depth sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "10",
        "explanation": "Selected node values are [5, 3, 8, 1, 4, 7, 9]; the depth sum is 10."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "6",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the depth sum is 6."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "8",
        "explanation": "Selected node values are [10, 5, 15, 7, 12, 20]; the depth sum is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-count-leaf-nodes-6",
    "slug": "tree-count-leaf-nodes-6",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Leaf Nodes #6",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select leaf nodes and print their count. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "4",
        "explanation": "Selected node values are [1, 4, 7, 9]; the count is 4."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "2",
        "explanation": "Selected node values are [4, 5]; the count is 2."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "3",
        "explanation": "Selected node values are [7, 12, 20]; the count is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-sum-leaf-nodes-7",
    "slug": "tree-sum-leaf-nodes-7",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Leaf Nodes #7",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select leaf nodes and print their sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "21",
        "explanation": "Selected node values are [1, 4, 7, 9]; the sum is 21."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "9",
        "explanation": "Selected node values are [4, 5]; the sum is 9."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "39",
        "explanation": "Selected node values are [7, 12, 20]; the sum is 39."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "39"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-max-leaf-nodes-8",
    "slug": "tree-max-leaf-nodes-8",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Leaf Nodes #8",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select leaf nodes and print their max. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "9",
        "explanation": "Selected node values are [1, 4, 7, 9]; the max is 9."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "5",
        "explanation": "Selected node values are [4, 5]; the max is 5."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "20",
        "explanation": "Selected node values are [7, 12, 20]; the max is 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "20"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-min-leaf-nodes-9",
    "slug": "tree-min-leaf-nodes-9",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Leaf Nodes #9",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select leaf nodes and print their min. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "1",
        "explanation": "Selected node values are [1, 4, 7, 9]; the min is 1."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "4",
        "explanation": "Selected node values are [4, 5]; the min is 4."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "7",
        "explanation": "Selected node values are [7, 12, 20]; the min is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-leaf-nodes-10",
    "slug": "tree-depth-sum-leaf-nodes-10",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Leaf Nodes #10",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select leaf nodes and print their depth sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "8",
        "explanation": "Selected node values are [1, 4, 7, 9]; the depth sum is 8."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "4",
        "explanation": "Selected node values are [4, 5]; the depth sum is 4."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "6",
        "explanation": "Selected node values are [7, 12, 20]; the depth sum is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "6"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-count-internal-nodes-11",
    "slug": "tree-count-internal-nodes-11",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Internal Nodes #11",
    "order": 11,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select internal nodes and print their count. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "3",
        "explanation": "Selected node values are [5, 3, 8]; the count is 3."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "3",
        "explanation": "Selected node values are [1, 2, 3]; the count is 3."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "3",
        "explanation": "Selected node values are [10, 5, 15]; the count is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-sum-internal-nodes-12",
    "slug": "tree-sum-internal-nodes-12",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Internal Nodes #12",
    "order": 12,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select internal nodes and print their sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "16",
        "explanation": "Selected node values are [5, 3, 8]; the sum is 16."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "6",
        "explanation": "Selected node values are [1, 2, 3]; the sum is 6."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "30",
        "explanation": "Selected node values are [10, 5, 15]; the sum is 30."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "16"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "30"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-max-internal-nodes-13",
    "slug": "tree-max-internal-nodes-13",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Internal Nodes #13",
    "order": 13,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select internal nodes and print their max. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "8",
        "explanation": "Selected node values are [5, 3, 8]; the max is 8."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "3",
        "explanation": "Selected node values are [1, 2, 3]; the max is 3."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "15",
        "explanation": "Selected node values are [10, 5, 15]; the max is 15."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "15"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-min-internal-nodes-14",
    "slug": "tree-min-internal-nodes-14",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Internal Nodes #14",
    "order": 14,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select internal nodes and print their min. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "3",
        "explanation": "Selected node values are [5, 3, 8]; the min is 3."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "1",
        "explanation": "Selected node values are [1, 2, 3]; the min is 1."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "5",
        "explanation": "Selected node values are [10, 5, 15]; the min is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-internal-nodes-15",
    "slug": "tree-depth-sum-internal-nodes-15",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Internal Nodes #15",
    "order": 15,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select internal nodes and print their depth sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "2",
        "explanation": "Selected node values are [5, 3, 8]; the depth sum is 2."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "2",
        "explanation": "Selected node values are [1, 2, 3]; the depth sum is 2."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "2",
        "explanation": "Selected node values are [10, 5, 15]; the depth sum is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-count-even-depth-nodes-16",
    "slug": "tree-count-even-depth-nodes-16",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Even Depth Nodes #16",
    "order": 16,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select even depth nodes and print their count. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "5",
        "explanation": "Selected node values are [5, 1, 4, 7, 9]; the count is 5."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "3",
        "explanation": "Selected node values are [1, 4, 5]; the count is 3."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "4",
        "explanation": "Selected node values are [10, 7, 12, 20]; the count is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-sum-even-depth-nodes-17",
    "slug": "tree-sum-even-depth-nodes-17",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Even Depth Nodes #17",
    "order": 17,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select even depth nodes and print their sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "26",
        "explanation": "Selected node values are [5, 1, 4, 7, 9]; the sum is 26."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "10",
        "explanation": "Selected node values are [1, 4, 5]; the sum is 10."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "49",
        "explanation": "Selected node values are [10, 7, 12, 20]; the sum is 49."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "26"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "49"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-max-even-depth-nodes-18",
    "slug": "tree-max-even-depth-nodes-18",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Even Depth Nodes #18",
    "order": 18,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select even depth nodes and print their max. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "9",
        "explanation": "Selected node values are [5, 1, 4, 7, 9]; the max is 9."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "5",
        "explanation": "Selected node values are [1, 4, 5]; the max is 5."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "20",
        "explanation": "Selected node values are [10, 7, 12, 20]; the max is 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "20"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-min-even-depth-nodes-19",
    "slug": "tree-min-even-depth-nodes-19",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Even Depth Nodes #19",
    "order": 19,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select even depth nodes and print their min. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "1",
        "explanation": "Selected node values are [5, 1, 4, 7, 9]; the min is 1."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "1",
        "explanation": "Selected node values are [1, 4, 5]; the min is 1."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "7",
        "explanation": "Selected node values are [10, 7, 12, 20]; the min is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-even-depth-nodes-20",
    "slug": "tree-depth-sum-even-depth-nodes-20",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Even Depth Nodes #20",
    "order": 20,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select even depth nodes and print their depth sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "8",
        "explanation": "Selected node values are [5, 1, 4, 7, 9]; the depth sum is 8."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "4",
        "explanation": "Selected node values are [1, 4, 5]; the depth sum is 4."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "6",
        "explanation": "Selected node values are [10, 7, 12, 20]; the depth sum is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "6"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-count-odd-depth-nodes-21",
    "slug": "tree-count-odd-depth-nodes-21",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Odd Depth Nodes #21",
    "order": 21,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select odd depth nodes and print their count. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "2",
        "explanation": "Selected node values are [3, 8]; the count is 2."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "2",
        "explanation": "Selected node values are [2, 3]; the count is 2."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "2",
        "explanation": "Selected node values are [5, 15]; the count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-sum-odd-depth-nodes-22",
    "slug": "tree-sum-odd-depth-nodes-22",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Odd Depth Nodes #22",
    "order": 22,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select odd depth nodes and print their sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "11",
        "explanation": "Selected node values are [3, 8]; the sum is 11."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "5",
        "explanation": "Selected node values are [2, 3]; the sum is 5."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "20",
        "explanation": "Selected node values are [5, 15]; the sum is 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "11"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "20"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-max-odd-depth-nodes-23",
    "slug": "tree-max-odd-depth-nodes-23",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Odd Depth Nodes #23",
    "order": 23,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select odd depth nodes and print their max. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "8",
        "explanation": "Selected node values are [3, 8]; the max is 8."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "3",
        "explanation": "Selected node values are [2, 3]; the max is 3."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "15",
        "explanation": "Selected node values are [5, 15]; the max is 15."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "15"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-min-odd-depth-nodes-24",
    "slug": "tree-min-odd-depth-nodes-24",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Odd Depth Nodes #24",
    "order": 24,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select odd depth nodes and print their min. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "3",
        "explanation": "Selected node values are [3, 8]; the min is 3."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "2",
        "explanation": "Selected node values are [2, 3]; the min is 2."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "5",
        "explanation": "Selected node values are [5, 15]; the min is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-odd-depth-nodes-25",
    "slug": "tree-depth-sum-odd-depth-nodes-25",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Odd Depth Nodes #25",
    "order": 25,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select odd depth nodes and print their depth sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "2",
        "explanation": "Selected node values are [3, 8]; the depth sum is 2."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "2",
        "explanation": "Selected node values are [2, 3]; the depth sum is 2."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "2",
        "explanation": "Selected node values are [5, 15]; the depth sum is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-count-even-valued-nodes-26",
    "slug": "tree-count-even-valued-nodes-26",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Even Valued Nodes #26",
    "order": 26,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select even valued nodes and print their count. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "2",
        "explanation": "Selected node values are [8, 4]; the count is 2."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "2",
        "explanation": "Selected node values are [2, 4]; the count is 2."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "3",
        "explanation": "Selected node values are [10, 12, 20]; the count is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-sum-even-valued-nodes-27",
    "slug": "tree-sum-even-valued-nodes-27",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Even Valued Nodes #27",
    "order": 27,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select even valued nodes and print their sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "12",
        "explanation": "Selected node values are [8, 4]; the sum is 12."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "6",
        "explanation": "Selected node values are [2, 4]; the sum is 6."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "42",
        "explanation": "Selected node values are [10, 12, 20]; the sum is 42."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "12"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "42"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-max-even-valued-nodes-28",
    "slug": "tree-max-even-valued-nodes-28",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Even Valued Nodes #28",
    "order": 28,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select even valued nodes and print their max. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "8",
        "explanation": "Selected node values are [8, 4]; the max is 8."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "4",
        "explanation": "Selected node values are [2, 4]; the max is 4."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "20",
        "explanation": "Selected node values are [10, 12, 20]; the max is 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "20"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-min-even-valued-nodes-29",
    "slug": "tree-min-even-valued-nodes-29",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Even Valued Nodes #29",
    "order": 29,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select even valued nodes and print their min. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "4",
        "explanation": "Selected node values are [8, 4]; the min is 4."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "2",
        "explanation": "Selected node values are [2, 4]; the min is 2."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "10",
        "explanation": "Selected node values are [10, 12, 20]; the min is 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "10"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-even-valued-nodes-30",
    "slug": "tree-depth-sum-even-valued-nodes-30",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Even Valued Nodes #30",
    "order": 30,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select even valued nodes and print their depth sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "3",
        "explanation": "Selected node values are [8, 4]; the depth sum is 3."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "3",
        "explanation": "Selected node values are [2, 4]; the depth sum is 3."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "4",
        "explanation": "Selected node values are [10, 12, 20]; the depth sum is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-count-odd-valued-nodes-31",
    "slug": "tree-count-odd-valued-nodes-31",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Odd Valued Nodes #31",
    "order": 31,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select odd valued nodes and print their count. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "5",
        "explanation": "Selected node values are [5, 3, 1, 7, 9]; the count is 5."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "3",
        "explanation": "Selected node values are [1, 3, 5]; the count is 3."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "3",
        "explanation": "Selected node values are [5, 15, 7]; the count is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-sum-odd-valued-nodes-32",
    "slug": "tree-sum-odd-valued-nodes-32",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Odd Valued Nodes #32",
    "order": 32,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select odd valued nodes and print their sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "25",
        "explanation": "Selected node values are [5, 3, 1, 7, 9]; the sum is 25."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "9",
        "explanation": "Selected node values are [1, 3, 5]; the sum is 9."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "27",
        "explanation": "Selected node values are [5, 15, 7]; the sum is 27."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "25"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "27"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-max-odd-valued-nodes-33",
    "slug": "tree-max-odd-valued-nodes-33",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Odd Valued Nodes #33",
    "order": 33,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select odd valued nodes and print their max. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "9",
        "explanation": "Selected node values are [5, 3, 1, 7, 9]; the max is 9."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "5",
        "explanation": "Selected node values are [1, 3, 5]; the max is 5."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "15",
        "explanation": "Selected node values are [5, 15, 7]; the max is 15."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "15"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-min-odd-valued-nodes-34",
    "slug": "tree-min-odd-valued-nodes-34",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Odd Valued Nodes #34",
    "order": 34,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select odd valued nodes and print their min. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "1",
        "explanation": "Selected node values are [5, 3, 1, 7, 9]; the min is 1."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "1",
        "explanation": "Selected node values are [1, 3, 5]; the min is 1."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "5",
        "explanation": "Selected node values are [5, 15, 7]; the min is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-odd-valued-nodes-35",
    "slug": "tree-depth-sum-odd-valued-nodes-35",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Odd Valued Nodes #35",
    "order": 35,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select odd valued nodes and print their depth sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "7",
        "explanation": "Selected node values are [5, 3, 1, 7, 9]; the depth sum is 7."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "3",
        "explanation": "Selected node values are [1, 3, 5]; the depth sum is 3."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "4",
        "explanation": "Selected node values are [5, 15, 7]; the depth sum is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-count-positive-nodes-36",
    "slug": "tree-count-positive-nodes-36",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Positive Nodes #36",
    "order": 36,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select positive nodes and print their count. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "7",
        "explanation": "Selected node values are [5, 3, 8, 1, 4, 7, 9]; the count is 7."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "5",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the count is 5."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "6",
        "explanation": "Selected node values are [10, 5, 15, 7, 12, 20]; the count is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "6"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-sum-positive-nodes-37",
    "slug": "tree-sum-positive-nodes-37",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Positive Nodes #37",
    "order": 37,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select positive nodes and print their sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "37",
        "explanation": "Selected node values are [5, 3, 8, 1, 4, 7, 9]; the sum is 37."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "15",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the sum is 15."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "69",
        "explanation": "Selected node values are [10, 5, 15, 7, 12, 20]; the sum is 69."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "37"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "69"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-max-positive-nodes-38",
    "slug": "tree-max-positive-nodes-38",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Positive Nodes #38",
    "order": 38,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select positive nodes and print their max. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "9",
        "explanation": "Selected node values are [5, 3, 8, 1, 4, 7, 9]; the max is 9."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "5",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the max is 5."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "20",
        "explanation": "Selected node values are [10, 5, 15, 7, 12, 20]; the max is 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "20"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-min-positive-nodes-39",
    "slug": "tree-min-positive-nodes-39",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Positive Nodes #39",
    "order": 39,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select positive nodes and print their min. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "1",
        "explanation": "Selected node values are [5, 3, 8, 1, 4, 7, 9]; the min is 1."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "1",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the min is 1."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "5",
        "explanation": "Selected node values are [10, 5, 15, 7, 12, 20]; the min is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-positive-nodes-40",
    "slug": "tree-depth-sum-positive-nodes-40",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Positive Nodes #40",
    "order": 40,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select positive nodes and print their depth sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "10",
        "explanation": "Selected node values are [5, 3, 8, 1, 4, 7, 9]; the depth sum is 10."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "6",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the depth sum is 6."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "8",
        "explanation": "Selected node values are [10, 5, 15, 7, 12, 20]; the depth sum is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-count-nodes-with-two-children-41",
    "slug": "tree-count-nodes-with-two-children-41",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Nodes With Two Children #41",
    "order": 41,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes with two children and print their count. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "3",
        "explanation": "Selected node values are [5, 3, 8]; the count is 3."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "1",
        "explanation": "Selected node values are [1]; the count is 1."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "2",
        "explanation": "Selected node values are [10, 15]; the count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-sum-nodes-with-two-children-42",
    "slug": "tree-sum-nodes-with-two-children-42",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Nodes With Two Children #42",
    "order": 42,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes with two children and print their sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "16",
        "explanation": "Selected node values are [5, 3, 8]; the sum is 16."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "1",
        "explanation": "Selected node values are [1]; the sum is 1."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "25",
        "explanation": "Selected node values are [10, 15]; the sum is 25."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "16"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "25"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-max-nodes-with-two-children-43",
    "slug": "tree-max-nodes-with-two-children-43",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Nodes With Two Children #43",
    "order": 43,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes with two children and print their max. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "8",
        "explanation": "Selected node values are [5, 3, 8]; the max is 8."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "1",
        "explanation": "Selected node values are [1]; the max is 1."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "15",
        "explanation": "Selected node values are [10, 15]; the max is 15."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "15"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-min-nodes-with-two-children-44",
    "slug": "tree-min-nodes-with-two-children-44",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Nodes With Two Children #44",
    "order": 44,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes with two children and print their min. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "3",
        "explanation": "Selected node values are [5, 3, 8]; the min is 3."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "1",
        "explanation": "Selected node values are [1]; the min is 1."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "10",
        "explanation": "Selected node values are [10, 15]; the min is 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "10"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-nodes-with-two-children-45",
    "slug": "tree-depth-sum-nodes-with-two-children-45",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Nodes With Two Children #45",
    "order": 45,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes with two children and print their depth sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "2",
        "explanation": "Selected node values are [5, 3, 8]; the depth sum is 2."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "0",
        "explanation": "Selected node values are [1]; the depth sum is 0."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "1",
        "explanation": "Selected node values are [10, 15]; the depth sum is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-count-nodes-with-one-child-46",
    "slug": "tree-count-nodes-with-one-child-46",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Nodes With One Child #46",
    "order": 46,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes with one child and print their count. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "0",
        "explanation": "Selected node values are []; the count is 0."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "2",
        "explanation": "Selected node values are [2, 3]; the count is 2."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "1",
        "explanation": "Selected node values are [5]; the count is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-sum-nodes-with-one-child-47",
    "slug": "tree-sum-nodes-with-one-child-47",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Nodes With One Child #47",
    "order": 47,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes with one child and print their sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "0",
        "explanation": "Selected node values are []; the sum is 0."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "5",
        "explanation": "Selected node values are [2, 3]; the sum is 5."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "5",
        "explanation": "Selected node values are [5]; the sum is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-max-nodes-with-one-child-48",
    "slug": "tree-max-nodes-with-one-child-48",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Nodes With One Child #48",
    "order": 48,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes with one child and print their max. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "0",
        "explanation": "Selected node values are []; the max is 0."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "3",
        "explanation": "Selected node values are [2, 3]; the max is 3."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "5",
        "explanation": "Selected node values are [5]; the max is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-min-nodes-with-one-child-49",
    "slug": "tree-min-nodes-with-one-child-49",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Nodes With One Child #49",
    "order": 49,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes with one child and print their min. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "0",
        "explanation": "Selected node values are []; the min is 0."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "2",
        "explanation": "Selected node values are [2, 3]; the min is 2."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "5",
        "explanation": "Selected node values are [5]; the min is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-nodes-with-one-child-50",
    "slug": "tree-depth-sum-nodes-with-one-child-50",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Nodes With One Child #50",
    "order": 50,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes with one child and print their depth sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "0",
        "explanation": "Selected node values are []; the depth sum is 0."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "2",
        "explanation": "Selected node values are [2, 3]; the depth sum is 2."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "1",
        "explanation": "Selected node values are [5]; the depth sum is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-count-depth-2-nodes-51",
    "slug": "tree-count-depth-2-nodes-51",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Depth <= 2 Nodes #51",
    "order": 51,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose depth is at most two and print their count. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "7",
        "explanation": "Selected node values are [5, 3, 8, 1, 4, 7, 9]; the count is 7."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "5",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the count is 5."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "6",
        "explanation": "Selected node values are [10, 5, 15, 7, 12, 20]; the count is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "6"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-sum-depth-2-nodes-52",
    "slug": "tree-sum-depth-2-nodes-52",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Depth <= 2 Nodes #52",
    "order": 52,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose depth is at most two and print their sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "37",
        "explanation": "Selected node values are [5, 3, 8, 1, 4, 7, 9]; the sum is 37."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "15",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the sum is 15."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "69",
        "explanation": "Selected node values are [10, 5, 15, 7, 12, 20]; the sum is 69."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "37"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "69"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-max-depth-2-nodes-53",
    "slug": "tree-max-depth-2-nodes-53",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Depth <= 2 Nodes #53",
    "order": 53,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose depth is at most two and print their max. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "9",
        "explanation": "Selected node values are [5, 3, 8, 1, 4, 7, 9]; the max is 9."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "5",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the max is 5."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "20",
        "explanation": "Selected node values are [10, 5, 15, 7, 12, 20]; the max is 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "20"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-min-depth-2-nodes-54",
    "slug": "tree-min-depth-2-nodes-54",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Depth <= 2 Nodes #54",
    "order": 54,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose depth is at most two and print their min. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "1",
        "explanation": "Selected node values are [5, 3, 8, 1, 4, 7, 9]; the min is 1."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "1",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the min is 1."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "5",
        "explanation": "Selected node values are [10, 5, 15, 7, 12, 20]; the min is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-depth-2-nodes-55",
    "slug": "tree-depth-sum-depth-2-nodes-55",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Depth <= 2 Nodes #55",
    "order": 55,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose depth is at most two and print their depth sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "10",
        "explanation": "Selected node values are [5, 3, 8, 1, 4, 7, 9]; the depth sum is 10."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "6",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the depth sum is 6."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "8",
        "explanation": "Selected node values are [10, 5, 15, 7, 12, 20]; the depth sum is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-count-depth-2-nodes-56",
    "slug": "tree-count-depth-2-nodes-56",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Depth >= 2 Nodes #56",
    "order": 56,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose depth is at least two and print their count. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "4",
        "explanation": "Selected node values are [1, 4, 7, 9]; the count is 4."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "2",
        "explanation": "Selected node values are [4, 5]; the count is 2."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "3",
        "explanation": "Selected node values are [7, 12, 20]; the count is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-sum-depth-2-nodes-57",
    "slug": "tree-sum-depth-2-nodes-57",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Depth >= 2 Nodes #57",
    "order": 57,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose depth is at least two and print their sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "21",
        "explanation": "Selected node values are [1, 4, 7, 9]; the sum is 21."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "9",
        "explanation": "Selected node values are [4, 5]; the sum is 9."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "39",
        "explanation": "Selected node values are [7, 12, 20]; the sum is 39."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "39"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-max-depth-2-nodes-58",
    "slug": "tree-max-depth-2-nodes-58",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Depth >= 2 Nodes #58",
    "order": 58,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose depth is at least two and print their max. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "9",
        "explanation": "Selected node values are [1, 4, 7, 9]; the max is 9."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "5",
        "explanation": "Selected node values are [4, 5]; the max is 5."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "20",
        "explanation": "Selected node values are [7, 12, 20]; the max is 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "20"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-min-depth-2-nodes-59",
    "slug": "tree-min-depth-2-nodes-59",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Depth >= 2 Nodes #59",
    "order": 59,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose depth is at least two and print their min. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "1",
        "explanation": "Selected node values are [1, 4, 7, 9]; the min is 1."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "4",
        "explanation": "Selected node values are [4, 5]; the min is 4."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "7",
        "explanation": "Selected node values are [7, 12, 20]; the min is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-depth-2-nodes-60",
    "slug": "tree-depth-sum-depth-2-nodes-60",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Depth >= 2 Nodes #60",
    "order": 60,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose depth is at least two and print their depth sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "8",
        "explanation": "Selected node values are [1, 4, 7, 9]; the depth sum is 8."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "4",
        "explanation": "Selected node values are [4, 5]; the depth sum is 4."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "6",
        "explanation": "Selected node values are [7, 12, 20]; the depth sum is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "6"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-count-values-root-61",
    "slug": "tree-count-values-root-61",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Values >= Root #61",
    "order": 61,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose value is greater than or equal to the root value and print their count. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "4",
        "explanation": "Selected node values are [5, 8, 7, 9]; the count is 4."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "5",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the count is 5."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "4",
        "explanation": "Selected node values are [10, 15, 12, 20]; the count is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-sum-values-root-62",
    "slug": "tree-sum-values-root-62",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Values >= Root #62",
    "order": 62,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose value is greater than or equal to the root value and print their sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "29",
        "explanation": "Selected node values are [5, 8, 7, 9]; the sum is 29."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "15",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the sum is 15."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "57",
        "explanation": "Selected node values are [10, 15, 12, 20]; the sum is 57."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "29"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "57"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-max-values-root-63",
    "slug": "tree-max-values-root-63",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Values >= Root #63",
    "order": 63,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose value is greater than or equal to the root value and print their max. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "9",
        "explanation": "Selected node values are [5, 8, 7, 9]; the max is 9."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "5",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the max is 5."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "20",
        "explanation": "Selected node values are [10, 15, 12, 20]; the max is 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "20"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-min-values-root-64",
    "slug": "tree-min-values-root-64",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Values >= Root #64",
    "order": 64,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose value is greater than or equal to the root value and print their min. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "5",
        "explanation": "Selected node values are [5, 8, 7, 9]; the min is 5."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "1",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the min is 1."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "10",
        "explanation": "Selected node values are [10, 15, 12, 20]; the min is 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "10"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-values-root-65",
    "slug": "tree-depth-sum-values-root-65",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Values >= Root #65",
    "order": 65,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose value is greater than or equal to the root value and print their depth sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "5",
        "explanation": "Selected node values are [5, 8, 7, 9]; the depth sum is 5."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "6",
        "explanation": "Selected node values are [1, 2, 3, 4, 5]; the depth sum is 6."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "5",
        "explanation": "Selected node values are [10, 15, 12, 20]; the depth sum is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-count-values-root-66",
    "slug": "tree-count-values-root-66",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Values < Root #66",
    "order": 66,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose value is strictly less than the root value and print their count. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "3",
        "explanation": "Selected node values are [3, 1, 4]; the count is 3."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "0",
        "explanation": "Selected node values are []; the count is 0."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "2",
        "explanation": "Selected node values are [5, 7]; the count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-sum-values-root-67",
    "slug": "tree-sum-values-root-67",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Values < Root #67",
    "order": 67,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose value is strictly less than the root value and print their sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "8",
        "explanation": "Selected node values are [3, 1, 4]; the sum is 8."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "0",
        "explanation": "Selected node values are []; the sum is 0."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "12",
        "explanation": "Selected node values are [5, 7]; the sum is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "12"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-max-values-root-68",
    "slug": "tree-max-values-root-68",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Values < Root #68",
    "order": 68,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose value is strictly less than the root value and print their max. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "4",
        "explanation": "Selected node values are [3, 1, 4]; the max is 4."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "0",
        "explanation": "Selected node values are []; the max is 0."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "7",
        "explanation": "Selected node values are [5, 7]; the max is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "7"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-min-values-root-69",
    "slug": "tree-min-values-root-69",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Values < Root #69",
    "order": 69,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose value is strictly less than the root value and print their min. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "1",
        "explanation": "Selected node values are [3, 1, 4]; the min is 1."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "0",
        "explanation": "Selected node values are []; the min is 0."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "5",
        "explanation": "Selected node values are [5, 7]; the min is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-values-root-70",
    "slug": "tree-depth-sum-values-root-70",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Values < Root #70",
    "order": 70,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select nodes whose value is strictly less than the root value and print their depth sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "5",
        "explanation": "Selected node values are [3, 1, 4]; the depth sum is 5."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "0",
        "explanation": "Selected node values are []; the depth sum is 0."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "3",
        "explanation": "Selected node values are [5, 7]; the depth sum is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-count-non-leaf-even-depth-71",
    "slug": "tree-count-non-leaf-even-depth-71",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Non-Leaf Even Depth #71",
    "order": 71,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select non-leaf even depth and print their count. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "1",
        "explanation": "Selected node values are [5]; the count is 1."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "1",
        "explanation": "Selected node values are [1]; the count is 1."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "1",
        "explanation": "Selected node values are [10]; the count is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-sum-non-leaf-even-depth-72",
    "slug": "tree-sum-non-leaf-even-depth-72",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Non-Leaf Even Depth #72",
    "order": 72,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select non-leaf even depth and print their sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "5",
        "explanation": "Selected node values are [5]; the sum is 5."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "1",
        "explanation": "Selected node values are [1]; the sum is 1."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "10",
        "explanation": "Selected node values are [10]; the sum is 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "10"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-max-non-leaf-even-depth-73",
    "slug": "tree-max-non-leaf-even-depth-73",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Non-Leaf Even Depth #73",
    "order": 73,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select non-leaf even depth and print their max. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "5",
        "explanation": "Selected node values are [5]; the max is 5."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "1",
        "explanation": "Selected node values are [1]; the max is 1."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "10",
        "explanation": "Selected node values are [10]; the max is 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "10"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-min-non-leaf-even-depth-74",
    "slug": "tree-min-non-leaf-even-depth-74",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Non-Leaf Even Depth #74",
    "order": 74,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select non-leaf even depth and print their min. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "5",
        "explanation": "Selected node values are [5]; the min is 5."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "1",
        "explanation": "Selected node values are [1]; the min is 1."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "10",
        "explanation": "Selected node values are [10]; the min is 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "10"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-non-leaf-even-depth-75",
    "slug": "tree-depth-sum-non-leaf-even-depth-75",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Non-Leaf Even Depth #75",
    "order": 75,
    "difficulty": "Easy",
    "problemStatement": "Build the binary tree from level-order array notation where -1 means missing. Select non-leaf even depth and print their depth sum. Empty max/min selections produce 0.",
    "inputFormat": "First line contains `n`; second line contains n level-order integers; `-1` denotes a missing node.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; the root is present.",
    "examples": [
      {
        "input": "7\n5 3 8 1 4 7 9",
        "output": "0",
        "explanation": "Selected node values are [5]; the depth sum is 0."
      },
      {
        "input": "7\n1 2 3 4 -1 -1 5",
        "output": "0",
        "explanation": "Selected node values are [1]; the depth sum is 0."
      },
      {
        "input": "7\n10 5 15 -1 7 12 20",
        "output": "0",
        "explanation": "Selected node values are [10]; the depth sum is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7\n5 3 8 1 4 7 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "7\n1 2 3 4 -1 -1 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "7\n10 5 15 -1 7 12 20",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  }
]

export default questions
