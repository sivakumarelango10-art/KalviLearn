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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-sum-all-nodes-2",
    "slug": "tree-sum-all-nodes-2",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — All Nodes #2",
    "order": 2,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-max-all-nodes-3",
    "slug": "tree-max-all-nodes-3",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — All Nodes #3",
    "order": 3,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-min-all-nodes-4",
    "slug": "tree-min-all-nodes-4",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — All Nodes #4",
    "order": 4,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-all-nodes-5",
    "slug": "tree-depth-sum-all-nodes-5",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — All Nodes #5",
    "order": 5,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-count-leaf-nodes-6",
    "slug": "tree-count-leaf-nodes-6",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Leaf Nodes #6",
    "order": 6,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-sum-leaf-nodes-7",
    "slug": "tree-sum-leaf-nodes-7",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Leaf Nodes #7",
    "order": 7,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-max-leaf-nodes-8",
    "slug": "tree-max-leaf-nodes-8",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Leaf Nodes #8",
    "order": 8,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-min-leaf-nodes-9",
    "slug": "tree-min-leaf-nodes-9",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Leaf Nodes #9",
    "order": 9,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-leaf-nodes-10",
    "slug": "tree-depth-sum-leaf-nodes-10",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Leaf Nodes #10",
    "order": 10,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-count-internal-nodes-11",
    "slug": "tree-count-internal-nodes-11",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Internal Nodes #11",
    "order": 11,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-sum-internal-nodes-12",
    "slug": "tree-sum-internal-nodes-12",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Internal Nodes #12",
    "order": 12,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-max-internal-nodes-13",
    "slug": "tree-max-internal-nodes-13",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Internal Nodes #13",
    "order": 13,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-min-internal-nodes-14",
    "slug": "tree-min-internal-nodes-14",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Internal Nodes #14",
    "order": 14,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-internal-nodes-15",
    "slug": "tree-depth-sum-internal-nodes-15",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Internal Nodes #15",
    "order": 15,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-count-even-depth-nodes-16",
    "slug": "tree-count-even-depth-nodes-16",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Even Depth Nodes #16",
    "order": 16,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-sum-even-depth-nodes-17",
    "slug": "tree-sum-even-depth-nodes-17",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Even Depth Nodes #17",
    "order": 17,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-max-even-depth-nodes-18",
    "slug": "tree-max-even-depth-nodes-18",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Even Depth Nodes #18",
    "order": 18,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-min-even-depth-nodes-19",
    "slug": "tree-min-even-depth-nodes-19",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Even Depth Nodes #19",
    "order": 19,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-even-depth-nodes-20",
    "slug": "tree-depth-sum-even-depth-nodes-20",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Even Depth Nodes #20",
    "order": 20,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-count-odd-depth-nodes-21",
    "slug": "tree-count-odd-depth-nodes-21",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Odd Depth Nodes #21",
    "order": 21,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-sum-odd-depth-nodes-22",
    "slug": "tree-sum-odd-depth-nodes-22",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Odd Depth Nodes #22",
    "order": 22,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-max-odd-depth-nodes-23",
    "slug": "tree-max-odd-depth-nodes-23",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Odd Depth Nodes #23",
    "order": 23,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-min-odd-depth-nodes-24",
    "slug": "tree-min-odd-depth-nodes-24",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Odd Depth Nodes #24",
    "order": 24,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-odd-depth-nodes-25",
    "slug": "tree-depth-sum-odd-depth-nodes-25",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Odd Depth Nodes #25",
    "order": 25,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-count-even-valued-nodes-26",
    "slug": "tree-count-even-valued-nodes-26",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Even Valued Nodes #26",
    "order": 26,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-sum-even-valued-nodes-27",
    "slug": "tree-sum-even-valued-nodes-27",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Even Valued Nodes #27",
    "order": 27,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-max-even-valued-nodes-28",
    "slug": "tree-max-even-valued-nodes-28",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Even Valued Nodes #28",
    "order": 28,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-min-even-valued-nodes-29",
    "slug": "tree-min-even-valued-nodes-29",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Even Valued Nodes #29",
    "order": 29,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-even-valued-nodes-30",
    "slug": "tree-depth-sum-even-valued-nodes-30",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Even Valued Nodes #30",
    "order": 30,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-count-odd-valued-nodes-31",
    "slug": "tree-count-odd-valued-nodes-31",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Odd Valued Nodes #31",
    "order": 31,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-sum-odd-valued-nodes-32",
    "slug": "tree-sum-odd-valued-nodes-32",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Odd Valued Nodes #32",
    "order": 32,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-max-odd-valued-nodes-33",
    "slug": "tree-max-odd-valued-nodes-33",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Odd Valued Nodes #33",
    "order": 33,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-min-odd-valued-nodes-34",
    "slug": "tree-min-odd-valued-nodes-34",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Odd Valued Nodes #34",
    "order": 34,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-odd-valued-nodes-35",
    "slug": "tree-depth-sum-odd-valued-nodes-35",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Odd Valued Nodes #35",
    "order": 35,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-count-positive-nodes-36",
    "slug": "tree-count-positive-nodes-36",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Positive Nodes #36",
    "order": 36,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-sum-positive-nodes-37",
    "slug": "tree-sum-positive-nodes-37",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Positive Nodes #37",
    "order": 37,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-max-positive-nodes-38",
    "slug": "tree-max-positive-nodes-38",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Positive Nodes #38",
    "order": 38,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-min-positive-nodes-39",
    "slug": "tree-min-positive-nodes-39",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Positive Nodes #39",
    "order": 39,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-positive-nodes-40",
    "slug": "tree-depth-sum-positive-nodes-40",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Positive Nodes #40",
    "order": 40,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-count-nodes-with-two-children-41",
    "slug": "tree-count-nodes-with-two-children-41",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Nodes With Two Children #41",
    "order": 41,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-sum-nodes-with-two-children-42",
    "slug": "tree-sum-nodes-with-two-children-42",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Nodes With Two Children #42",
    "order": 42,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-max-nodes-with-two-children-43",
    "slug": "tree-max-nodes-with-two-children-43",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Nodes With Two Children #43",
    "order": 43,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-min-nodes-with-two-children-44",
    "slug": "tree-min-nodes-with-two-children-44",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Nodes With Two Children #44",
    "order": 44,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-nodes-with-two-children-45",
    "slug": "tree-depth-sum-nodes-with-two-children-45",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Nodes With Two Children #45",
    "order": 45,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-count-nodes-with-one-child-46",
    "slug": "tree-count-nodes-with-one-child-46",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Nodes With One Child #46",
    "order": 46,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-sum-nodes-with-one-child-47",
    "slug": "tree-sum-nodes-with-one-child-47",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Nodes With One Child #47",
    "order": 47,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-max-nodes-with-one-child-48",
    "slug": "tree-max-nodes-with-one-child-48",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Nodes With One Child #48",
    "order": 48,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-min-nodes-with-one-child-49",
    "slug": "tree-min-nodes-with-one-child-49",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Nodes With One Child #49",
    "order": 49,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-nodes-with-one-child-50",
    "slug": "tree-depth-sum-nodes-with-one-child-50",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Nodes With One Child #50",
    "order": 50,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-count-depth-2-nodes-51",
    "slug": "tree-count-depth-2-nodes-51",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Depth <= 2 Nodes #51",
    "order": 51,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-sum-depth-2-nodes-52",
    "slug": "tree-sum-depth-2-nodes-52",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Depth <= 2 Nodes #52",
    "order": 52,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-max-depth-2-nodes-53",
    "slug": "tree-max-depth-2-nodes-53",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Depth <= 2 Nodes #53",
    "order": 53,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-min-depth-2-nodes-54",
    "slug": "tree-min-depth-2-nodes-54",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Depth <= 2 Nodes #54",
    "order": 54,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-depth-2-nodes-55",
    "slug": "tree-depth-sum-depth-2-nodes-55",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Depth <= 2 Nodes #55",
    "order": 55,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-count-values-root-61",
    "slug": "tree-count-values-root-61",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Values >= Root #61",
    "order": 56,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-sum-values-root-62",
    "slug": "tree-sum-values-root-62",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Values >= Root #62",
    "order": 57,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-max-values-root-63",
    "slug": "tree-max-values-root-63",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Values >= Root #63",
    "order": 58,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-min-values-root-64",
    "slug": "tree-min-values-root-64",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Values >= Root #64",
    "order": 59,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-values-root-65",
    "slug": "tree-depth-sum-values-root-65",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Values >= Root #65",
    "order": 60,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-count-non-leaf-even-depth-71",
    "slug": "tree-count-non-leaf-even-depth-71",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Count — Non-Leaf Even Depth #71",
    "order": 61,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-sum-non-leaf-even-depth-72",
    "slug": "tree-sum-non-leaf-even-depth-72",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Sum — Non-Leaf Even Depth #72",
    "order": 62,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-max-non-leaf-even-depth-73",
    "slug": "tree-max-non-leaf-even-depth-73",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Max — Non-Leaf Even Depth #73",
    "order": 63,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-min-non-leaf-even-depth-74",
    "slug": "tree-min-non-leaf-even-depth-74",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Min — Non-Leaf Even Depth #74",
    "order": 64,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:tree-depth-sum-non-leaf-even-depth-75",
    "slug": "tree-depth-sum-non-leaf-even-depth-75",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Depth Sum — Non-Leaf Even Depth #75",
    "order": 65,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:trees-bst:preorder-traversal",
    "bankId": "T18-Q01",
    "slug": "preorder-traversal",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Preorder Traversal",
    "order": 66,
    "difficulty": "Easy",
    "problemStatement": "Return preorder values: root, left subtree, right subtree.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "[4,2,1,3,6,5,7]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return preorder values: root, left subtree, right subtree. Therefore the expected JSON output is [4,2,1,3,6,5,7]."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "[]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return preorder values: root, left subtree, right subtree. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"tree\":[5],\"target\":5}",
        "output": "[5]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5], and target=5. Return preorder values: root, left subtree, right subtree. Therefore the expected JSON output is [5]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "[4,2,1,3,6,5,7]"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5],\"target\":5}",
        "expectedOutput": "[5]"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:inorder-traversal",
    "bankId": "T18-Q02",
    "slug": "inorder-traversal",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Inorder Traversal",
    "order": 67,
    "difficulty": "Easy",
    "problemStatement": "Return inorder values: left subtree, root, right subtree.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "[1,2,3,4,5,6,7]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return inorder values: left subtree, root, right subtree. Therefore the expected JSON output is [1,2,3,4,5,6,7]."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "[]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return inorder values: left subtree, root, right subtree. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"tree\":[5],\"target\":5}",
        "output": "[5]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5], and target=5. Return inorder values: left subtree, root, right subtree. Therefore the expected JSON output is [5]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "[1,2,3,4,5,6,7]"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5],\"target\":5}",
        "expectedOutput": "[5]"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:postorder-traversal",
    "bankId": "T18-Q03",
    "slug": "postorder-traversal",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Postorder Traversal",
    "order": 68,
    "difficulty": "Easy",
    "problemStatement": "Return postorder values: left subtree, right subtree, root.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "[1,3,2,5,7,6,4]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return postorder values: left subtree, right subtree, root. Therefore the expected JSON output is [1,3,2,5,7,6,4]."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "[]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return postorder values: left subtree, right subtree, root. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"tree\":[5],\"target\":5}",
        "output": "[5]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5], and target=5. Return postorder values: left subtree, right subtree, root. Therefore the expected JSON output is [5]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "[1,3,2,5,7,6,4]"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5],\"target\":5}",
        "expectedOutput": "[5]"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:breadth-first-traversal",
    "bankId": "T18-Q04",
    "slug": "breadth-first-traversal",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Breadth First Traversal",
    "order": 69,
    "difficulty": "Easy",
    "problemStatement": "Return nodes level by level, from left to right, in one flat list.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "[4,2,6,1,3,5,7]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return nodes level by level, from left to right, in one flat list. Therefore the expected JSON output is [4,2,6,1,3,5,7]."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "[]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return nodes level by level, from left to right, in one flat list. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"tree\":[5],\"target\":5}",
        "output": "[5]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5], and target=5. Return nodes level by level, from left to right, in one flat list. Therefore the expected JSON output is [5]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "[4,2,6,1,3,5,7]"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5],\"target\":5}",
        "expectedOutput": "[5]"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:tree-node-count",
    "bankId": "T18-Q05",
    "slug": "tree-node-count",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Node Count",
    "order": 70,
    "difficulty": "Easy",
    "problemStatement": "Count all nonnull reachable tree nodes.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "7",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Count all nonnull reachable tree nodes. Therefore the expected JSON output is 7."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "0",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Count all nonnull reachable tree nodes. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"tree\":[5],\"target\":5}",
        "output": "1",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5], and target=5. Count all nonnull reachable tree nodes. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5],\"target\":5}",
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
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:tree-value-sum",
    "bankId": "T18-Q06",
    "slug": "tree-value-sum",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Value Sum",
    "order": 71,
    "difficulty": "Easy",
    "problemStatement": "Return the sum of all node values.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "28",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return the sum of all node values. Therefore the expected JSON output is 28."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "0",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return the sum of all node values. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"tree\":[5],\"target\":5}",
        "output": "5",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5], and target=5. Return the sum of all node values. Therefore the expected JSON output is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "28"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5],\"target\":5}",
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
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:tree-height-in-nodes",
    "bankId": "T18-Q07",
    "slug": "tree-height-in-nodes",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Tree Height in Nodes",
    "order": 72,
    "difficulty": "Easy",
    "problemStatement": "Return the longest root-to-leaf path length measured in nodes; empty tree has height zero.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "3",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return the longest root-to-leaf path length measured in nodes; empty tree has height zero. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "0",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return the longest root-to-leaf path length measured in nodes; empty tree has height zero. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"tree\":[5],\"target\":5}",
        "output": "1",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5], and target=5. Return the longest root-to-leaf path length measured in nodes; empty tree has height zero. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5],\"target\":5}",
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
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:leaf-node-count",
    "bankId": "T18-Q08",
    "slug": "leaf-node-count",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Leaf Node Count",
    "order": 73,
    "difficulty": "Medium",
    "problemStatement": "Count nonnull nodes that have no left or right child.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "4",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Count nonnull nodes that have no left or right child. Therefore the expected JSON output is 4."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "0",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Count nonnull nodes that have no left or right child. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"tree\":[5],\"target\":5}",
        "output": "1",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5], and target=5. Count nonnull nodes that have no left or right child. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5],\"target\":5}",
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
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:internal-node-count",
    "bankId": "T18-Q09",
    "slug": "internal-node-count",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Internal Node Count",
    "order": 74,
    "difficulty": "Medium",
    "problemStatement": "Count tree nodes that have at least one child.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "3",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Count tree nodes that have at least one child. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "0",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Count tree nodes that have at least one child. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"tree\":[5,5,5],\"target\":5}",
        "output": "1",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5, 5, 5], and target=5. Count tree nodes that have at least one child. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5,5,5],\"target\":5}",
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
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:minimum-tree-value",
    "bankId": "T18-Q10",
    "slug": "minimum-tree-value",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Minimum Tree Value",
    "order": 75,
    "difficulty": "Medium",
    "problemStatement": "Return the minimum node value or null for empty tree.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "1",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return the minimum node value or null for empty tree. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "null",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return the minimum node value or null for empty tree. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"tree\":[5],\"target\":5}",
        "output": "5",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5], and target=5. Return the minimum node value or null for empty tree. Therefore the expected JSON output is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5],\"target\":5}",
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
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:maximum-tree-value",
    "bankId": "T18-Q11",
    "slug": "maximum-tree-value",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Maximum Tree Value",
    "order": 76,
    "difficulty": "Medium",
    "problemStatement": "Return the maximum node value or null for empty tree.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "7",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return the maximum node value or null for empty tree. Therefore the expected JSON output is 7."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "null",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return the maximum node value or null for empty tree. Therefore the expected JSON output is null."
      },
      {
        "input": "{\"tree\":[5],\"target\":5}",
        "output": "5",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5], and target=5. Return the maximum node value or null for empty tree. Therefore the expected JSON output is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5],\"target\":5}",
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
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:search-target-in-binary-tree",
    "bankId": "T18-Q12",
    "slug": "search-target-in-binary-tree",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Search Target in Binary Tree",
    "order": 77,
    "difficulty": "Medium",
    "problemStatement": "Return true iff some node value equals target.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "true",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return true iff some node value equals target. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "false",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return true iff some node value equals target. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"tree\":[5],\"target\":5}",
        "output": "true",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5], and target=5. Return true iff some node value equals target. Therefore the expected JSON output is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5],\"target\":5}",
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
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:count-target-nodes",
    "bankId": "T18-Q13",
    "slug": "count-target-nodes",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Count Target Nodes",
    "order": 78,
    "difficulty": "Medium",
    "problemStatement": "Count how many nodes equal target.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "1",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Count how many nodes equal target. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "0",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Count how many nodes equal target. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"tree\":[5,5,5],\"target\":5}",
        "output": "3",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5, 5, 5], and target=5. Count how many nodes equal target. Therefore the expected JSON output is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5,5,5],\"target\":5}",
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
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:validate-strict-bst",
    "bankId": "T18-Q14",
    "slug": "validate-strict-bst",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Validate Strict BST",
    "order": 79,
    "difficulty": "Medium",
    "problemStatement": "Return true iff all nodes obey strict BST ordering (all left descendants < node < all right descendants); empty tree is valid.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "true",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return true iff all nodes obey strict BST ordering (all left descendants < node < all right descendants); empty tree is valid. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"tree\":[1,2,3,4,5,6,7],\"target\":7}",
        "output": "false",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [1, 2, 3, 4, 5, 6, 7], and target=7. Return true iff all nodes obey strict BST ordering (all left descendants < node < all right descendants); empty tree is valid. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "true",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return true iff all nodes obey strict BST ordering (all left descendants < node < all right descendants); empty tree is valid. Therefore the expected JSON output is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[1,2,3,4,5,6,7],\"target\":7}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[],\"target\":0}",
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
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:height-balanced-binary-tree",
    "bankId": "T18-Q15",
    "slug": "height-balanced-binary-tree",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Height Balanced Binary Tree",
    "order": 80,
    "difficulty": "Medium",
    "problemStatement": "Return true if at every node the heights of the left and right subtree differ by at most one.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "true",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return true if at every node the heights of the left and right subtree differ by at most one. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"tree\":[9,3,10,1,6,null,14,null,null,4,7,null,null,13],\"target\":4}",
        "output": "false",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [9, 3, 10, 1, 6, 14, 4, 7, 13], and target=4. Return true if at every node the heights of the left and right subtree differ by at most one. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "true",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return true if at every node the heights of the left and right subtree differ by at most one. Therefore the expected JSON output is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[9,3,10,1,6,null,14,null,null,4,7,null,null,13],\"target\":4}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[],\"target\":0}",
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
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:diameter-in-edges",
    "bankId": "T18-Q16",
    "slug": "diameter-in-edges",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Diameter in Edges",
    "order": 81,
    "difficulty": "Hard",
    "problemStatement": "Return length in edges of longest path between any two nodes; return zero for empty or one-node tree.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "4",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return length in edges of longest path between any two nodes; return zero for empty or one-node tree. Therefore the expected JSON output is 4."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "0",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return length in edges of longest path between any two nodes; return zero for empty or one-node tree. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"tree\":[5,5,5],\"target\":5}",
        "output": "2",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5, 5, 5], and target=5. Return length in edges of longest path between any two nodes; return zero for empty or one-node tree. Therefore the expected JSON output is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5,5,5],\"target\":5}",
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
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:root-to-leaf-path-sums",
    "bankId": "T18-Q17",
    "slug": "root-to-leaf-path-sums",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Root to Leaf Path Sums",
    "order": 82,
    "difficulty": "Hard",
    "problemStatement": "Return a left-to-right ordered array containing the sum of each root-to-leaf path.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "[7,9,15,17]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return a left-to-right ordered array containing the sum of each root-to-leaf path. Therefore the expected JSON output is [7,9,15,17]."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "[]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return a left-to-right ordered array containing the sum of each root-to-leaf path. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"tree\":[5],\"target\":5}",
        "output": "[5]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5], and target=5. Return a left-to-right ordered array containing the sum of each root-to-leaf path. Therefore the expected JSON output is [5]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "[7,9,15,17]"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5],\"target\":5}",
        "expectedOutput": "[5]"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:level-sum-array",
    "bankId": "T18-Q18",
    "slug": "level-sum-array",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Level Sum Array",
    "order": 83,
    "difficulty": "Hard",
    "problemStatement": "Return the sum of the values at each depth from root to deepest level.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "[4,8,16]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return the sum of the values at each depth from root to deepest level. Therefore the expected JSON output is [4,8,16]."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "[]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return the sum of the values at each depth from root to deepest level. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"tree\":[5],\"target\":5}",
        "output": "[5]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5], and target=5. Return the sum of the values at each depth from root to deepest level. Therefore the expected JSON output is [5]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "[4,8,16]"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5],\"target\":5}",
        "expectedOutput": "[5]"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:minimum-target-depth",
    "bankId": "T18-Q19",
    "slug": "minimum-target-depth",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Minimum Target Depth",
    "order": 84,
    "difficulty": "Hard",
    "problemStatement": "Return the shallowest root-to-node depth (root=0) where value equals target; return -1 if not found.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "2",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return the shallowest root-to-node depth (root=0) where value equals target; return -1 if not found. Therefore the expected JSON output is 2."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "-1",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return the shallowest root-to-node depth (root=0) where value equals target; return -1 if not found. Therefore the expected JSON output is -1."
      },
      {
        "input": "{\"tree\":[5],\"target\":5}",
        "output": "0",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5], and target=5. Return the shallowest root-to-node depth (root=0) where value equals target; return -1 if not found. Therefore the expected JSON output is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5],\"target\":5}",
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
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  },
  {
    "id": "learn:trees-bst:right-side-view",
    "bankId": "T18-Q20",
    "slug": "right-side-view",
    "topicId": "trees-bst",
    "topicSlug": "trees-bst",
    "topicTitle": "Trees / BST",
    "title": "Right Side View",
    "order": 85,
    "difficulty": "Hard",
    "problemStatement": "Return the rightmost visible node at every depth.",
    "inputFormat": "A single JSON object: {\"tree\": level-order binary-tree array using null placeholders, \"target\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ len(tree) ≤ 15; values -10..20 or null; all nonnull nodes have nonnull ancestors; root index 0, left child 2i+1, right child 2i+2; repeated node values possible.",
    "examples": [
      {
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "output": "[4,6,7]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [4, 2, 6, 1, 3, 5, 7], and target=3. Return the rightmost visible node at every depth. Therefore the expected JSON output is [4,6,7]."
      },
      {
        "input": "{\"tree\":[],\"target\":0}",
        "output": "[]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [], and target=0. Return the rightmost visible node at every depth. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"tree\":[5],\"target\":5}",
        "output": "[5]",
        "explanation": "Interpret non-null level-order nodes as a binary tree; breadth-first values are [5], and target=5. Return the rightmost visible node at every depth. Therefore the expected JSON output is [5]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"tree\":[4,2,6,1,3,5,7],\"target\":3}",
        "expectedOutput": "[4,6,7]"
      },
      {
        "testIndex": 2,
        "input": "{\"tree\":[],\"target\":0}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"tree\":[5],\"target\":5}",
        "expectedOutput": "[5]"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\n# Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport sys\nimport json\n\ndef solve(data):\n    # data contains the parsed JSON input object\n    # TODO: Write your solution here\n    return None\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    if raw:\n        data = json.loads(raw)\n        result = solve(data)\n        print(json.dumps(result))\n",
      "nodejs": "// Language: JavaScript (Node.js)\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nconst fs = require('fs');\n\nfunction solve(data) {\n    // data contains the parsed JSON input object\n    // TODO: Write your solution here\n    return null;\n}\n\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nif (raw) {\n    const data = JSON.parse(raw);\n    const result = solve(data);\n    console.log(JSON.stringify(result));\n}\n",
      "java": "// Language: Java 17\n// Input is parsed from a single JSON line on stdin; output must be printed as a valid JSON string.\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        StringBuilder sb = new StringBuilder();\n        String line;\n        while ((line = br.readLine()) != null) sb.append(line);\n        String raw = sb.toString().trim();\n        if (raw.isEmpty()) return;\n\n        Map<String, String> data = parseJson(raw);\n        Object result = solve(data, raw);\n        System.out.println(toJson(result));\n    }\n\n    public static Object solve(Map<String, String> data, String rawJson) {\n        // TODO: Write your solution here using data or rawJson\n        return null;\n    }\n\n    // --- JSON Helper ---\n    static Map<String, String> parseJson(String json) {\n        Map<String, String> map = new LinkedHashMap<>();\n        int i = json.indexOf('{'), j = json.lastIndexOf('}');\n        if (i < 0 || j <= i) return map;\n        String content = json.substring(i + 1, j).trim();\n        int depth = 0, start = 0;\n        List<String> tokens = new ArrayList<>();\n        for (int k = 0; k < content.length(); k++) {\n            char c = content.charAt(k);\n            if (c == '[' || c == '{') depth++;\n            else if (c == ']' || c == '}') depth--;\n            else if (c == ',' && depth == 0) {\n                tokens.add(content.substring(start, k).trim());\n                start = k + 1;\n            }\n        }\n        if (start < content.length()) tokens.add(content.substring(start).trim());\n        for (String t : tokens) {\n            int colon = t.indexOf(':');\n            if (colon > 0) {\n                String k = t.substring(0, colon).trim().replaceAll(\"^\"|\"$\", \"\");\n                String v = t.substring(colon + 1).trim();\n                map.put(k, v);\n            }\n        }\n        return map;\n    }\n\n    static String toJson(Object obj) {\n        if (obj == null) return \"null\";\n        if (obj instanceof String) return \"\\\"\" + obj + \"\\\"\";\n        if (obj instanceof List) {\n            List<?> l = (List<?>) obj;\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < l.size(); i++) {\n                if (i > 0) sb.append(\",\");\n                sb.append(toJson(l.get(i)));\n            }\n            return sb.append(\"]\").toString();\n        }\n        return String.valueOf(obj);\n    }\n}\n",
      "cpp": "// Language: C++20\n// Input is read from stdin; output must be printed as a valid JSON string.\n#include <iostream>\n#include <string>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\n// --- JSON Helper: extract field by key ---\nstring extractField(const string& json, const string& key) {\n    size_t pos = json.find(\"\\\"\" + key + \"\\\"\");\n    if (pos == string::npos) return \"\";\n    pos = json.find(':', pos);\n    if (pos == string::npos) return \"\";\n    pos++;\n    while (pos < json.size() && isspace(json[pos])) pos++;\n    if (pos >= json.size()) return \"\";\n    if (json[pos] == '[') {\n        int depth = 0;\n        size_t end = pos;\n        while (end < json.size()) {\n            if (json[end] == '[') depth++;\n            else if (json[end] == ']') { depth--; if (depth == 0) { end++; break; } }\n            end++;\n        }\n        return json.substr(pos, end - pos);\n    }\n    size_t end = pos;\n    while (end < json.size() && json[end] != ',' && json[end] != '}') end++;\n    string val = json.substr(pos, end - pos);\n    while (!val.empty() && isspace(val.back())) val.pop_back();\n    return val;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    string raw, line;\n    while (getline(cin, line)) raw += line;\n    if (raw.empty()) return 0;\n\n    // TODO: Write your solution here and print the result as JSON\n    return 0;\n}\n"
    },
    "inputMode": "json"
  }
]

export default questions
