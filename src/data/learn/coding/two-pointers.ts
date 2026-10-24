import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:two-pointers:sorted-pair-sum",
    "slug": "sorted-pair-sum",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Sorted Pair Sum",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array, move one pointer from each end inward. For every pair, add `abs(right-left)+1`. Print the final score.",
    "inputFormat": "First line contains `n`; second line contains n non-decreasing integers.",
    "outputFormat": "Print the two-pointer score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n-4 -1 0 3 8",
        "output": "18",
        "explanation": "Pairing outer values inward and adding the required score gives 18."
      },
      {
        "input": "4\n-2 2 5 9",
        "output": "16",
        "explanation": "Pairing outer values inward and adding the required score gives 16."
      },
      {
        "input": "4\n1 2 3 4",
        "output": "6",
        "explanation": "Pairing outer values inward and adding the required score gives 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n-4 -1 0 3 8",
        "expectedOutput": "18"
      },
      {
        "testIndex": 2,
        "input": "4\n-2 2 5 9",
        "expectedOutput": "16"
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 3 4",
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
    "id": "learn:two-pointers:closest-pair",
    "slug": "closest-pair",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Closest Pair",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array, move one pointer from each end inward. For every pair, add `abs(right-left)+2`. Print the final score.",
    "inputFormat": "First line contains `n`; second line contains n non-decreasing integers.",
    "outputFormat": "Print the two-pointer score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n-4 -1 0 3 8",
        "output": "20",
        "explanation": "Pairing outer values inward and adding the required score gives 20."
      },
      {
        "input": "4\n-2 2 5 9",
        "output": "18",
        "explanation": "Pairing outer values inward and adding the required score gives 18."
      },
      {
        "input": "4\n1 2 3 4",
        "output": "8",
        "explanation": "Pairing outer values inward and adding the required score gives 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n-4 -1 0 3 8",
        "expectedOutput": "20"
      },
      {
        "testIndex": 2,
        "input": "4\n-2 2 5 9",
        "expectedOutput": "18"
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 3 4",
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
    "id": "learn:two-pointers:remove-duplicates",
    "slug": "remove-duplicates",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Remove Duplicates",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array, move one pointer from each end inward. For every pair, add `abs(right-left)+3`. Print the final score.",
    "inputFormat": "First line contains `n`; second line contains n non-decreasing integers.",
    "outputFormat": "Print the two-pointer score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n-4 -1 0 3 8",
        "output": "22",
        "explanation": "Pairing outer values inward and adding the required score gives 22."
      },
      {
        "input": "4\n-2 2 5 9",
        "output": "20",
        "explanation": "Pairing outer values inward and adding the required score gives 20."
      },
      {
        "input": "4\n1 2 3 4",
        "output": "10",
        "explanation": "Pairing outer values inward and adding the required score gives 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n-4 -1 0 3 8",
        "expectedOutput": "22"
      },
      {
        "testIndex": 2,
        "input": "4\n-2 2 5 9",
        "expectedOutput": "20"
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 3 4",
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
    "id": "learn:two-pointers:palindrome-pointers",
    "slug": "palindrome-pointers",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Palindrome Pointers",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array, move one pointer from each end inward. For every pair, add `abs(right-left)+4`. Print the final score.",
    "inputFormat": "First line contains `n`; second line contains n non-decreasing integers.",
    "outputFormat": "Print the two-pointer score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n-4 -1 0 3 8",
        "output": "24",
        "explanation": "Pairing outer values inward and adding the required score gives 24."
      },
      {
        "input": "4\n-2 2 5 9",
        "output": "22",
        "explanation": "Pairing outer values inward and adding the required score gives 22."
      },
      {
        "input": "4\n1 2 3 4",
        "output": "12",
        "explanation": "Pairing outer values inward and adding the required score gives 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n-4 -1 0 3 8",
        "expectedOutput": "24"
      },
      {
        "testIndex": 2,
        "input": "4\n-2 2 5 9",
        "expectedOutput": "22"
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 3 4",
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
    "id": "learn:two-pointers:container-area",
    "slug": "container-area",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Container Area",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array, move one pointer from each end inward. For every pair, add `abs(right-left)+5`. Print the final score.",
    "inputFormat": "First line contains `n`; second line contains n non-decreasing integers.",
    "outputFormat": "Print the two-pointer score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n-4 -1 0 3 8",
        "output": "26",
        "explanation": "Pairing outer values inward and adding the required score gives 26."
      },
      {
        "input": "4\n-2 2 5 9",
        "output": "24",
        "explanation": "Pairing outer values inward and adding the required score gives 24."
      },
      {
        "input": "4\n1 2 3 4",
        "output": "14",
        "explanation": "Pairing outer values inward and adding the required score gives 14."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n-4 -1 0 3 8",
        "expectedOutput": "26"
      },
      {
        "testIndex": 2,
        "input": "4\n-2 2 5 9",
        "expectedOutput": "24"
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 3 4",
        "expectedOutput": "14"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:two-pointers:sorted-squares",
    "slug": "sorted-squares",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Sorted Squares",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array, move one pointer from each end inward. For every pair, add `abs(right-left)+6`. Print the final score.",
    "inputFormat": "First line contains `n`; second line contains n non-decreasing integers.",
    "outputFormat": "Print the two-pointer score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n-4 -1 0 3 8",
        "output": "28",
        "explanation": "Pairing outer values inward and adding the required score gives 28."
      },
      {
        "input": "4\n-2 2 5 9",
        "output": "26",
        "explanation": "Pairing outer values inward and adding the required score gives 26."
      },
      {
        "input": "4\n1 2 3 4",
        "output": "16",
        "explanation": "Pairing outer values inward and adding the required score gives 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n-4 -1 0 3 8",
        "expectedOutput": "28"
      },
      {
        "testIndex": 2,
        "input": "4\n-2 2 5 9",
        "expectedOutput": "26"
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 3 4",
        "expectedOutput": "16"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:two-pointers:merge-from-end",
    "slug": "merge-from-end",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Merge From End",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array, move one pointer from each end inward. For every pair, add `abs(right-left)+7`. Print the final score.",
    "inputFormat": "First line contains `n`; second line contains n non-decreasing integers.",
    "outputFormat": "Print the two-pointer score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n-4 -1 0 3 8",
        "output": "30",
        "explanation": "Pairing outer values inward and adding the required score gives 30."
      },
      {
        "input": "4\n-2 2 5 9",
        "output": "28",
        "explanation": "Pairing outer values inward and adding the required score gives 28."
      },
      {
        "input": "4\n1 2 3 4",
        "output": "18",
        "explanation": "Pairing outer values inward and adding the required score gives 18."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n-4 -1 0 3 8",
        "expectedOutput": "30"
      },
      {
        "testIndex": 2,
        "input": "4\n-2 2 5 9",
        "expectedOutput": "28"
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 3 4",
        "expectedOutput": "18"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:two-pointers:three-sum",
    "slug": "three-sum",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Three Sum",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array, move one pointer from each end inward. For every pair, add `abs(right-left)+8`. Print the final score.",
    "inputFormat": "First line contains `n`; second line contains n non-decreasing integers.",
    "outputFormat": "Print the two-pointer score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n-4 -1 0 3 8",
        "output": "32",
        "explanation": "Pairing outer values inward and adding the required score gives 32."
      },
      {
        "input": "4\n-2 2 5 9",
        "output": "30",
        "explanation": "Pairing outer values inward and adding the required score gives 30."
      },
      {
        "input": "4\n1 2 3 4",
        "output": "20",
        "explanation": "Pairing outer values inward and adding the required score gives 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n-4 -1 0 3 8",
        "expectedOutput": "32"
      },
      {
        "testIndex": 2,
        "input": "4\n-2 2 5 9",
        "expectedOutput": "30"
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 3 4",
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
    "id": "learn:two-pointers:stable-partition",
    "slug": "stable-partition",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Stable Partition",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array, move one pointer from each end inward. For every pair, add `abs(right-left)+9`. Print the final score.",
    "inputFormat": "First line contains `n`; second line contains n non-decreasing integers.",
    "outputFormat": "Print the two-pointer score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n-4 -1 0 3 8",
        "output": "34",
        "explanation": "Pairing outer values inward and adding the required score gives 34."
      },
      {
        "input": "4\n-2 2 5 9",
        "output": "32",
        "explanation": "Pairing outer values inward and adding the required score gives 32."
      },
      {
        "input": "4\n1 2 3 4",
        "output": "22",
        "explanation": "Pairing outer values inward and adding the required score gives 22."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n-4 -1 0 3 8",
        "expectedOutput": "34"
      },
      {
        "testIndex": 2,
        "input": "4\n-2 2 5 9",
        "expectedOutput": "32"
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 3 4",
        "expectedOutput": "22"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:two-pointers:target-difference",
    "slug": "target-difference",
    "topicId": "two-pointers",
    "topicSlug": "two-pointers",
    "topicTitle": "Two Pointers",
    "title": "Target Difference",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Given a sorted array, move one pointer from each end inward. For every pair, add `abs(right-left)+10`. Print the final score.",
    "inputFormat": "First line contains `n`; second line contains n non-decreasing integers.",
    "outputFormat": "Print the two-pointer score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n-4 -1 0 3 8",
        "output": "36",
        "explanation": "Pairing outer values inward and adding the required score gives 36."
      },
      {
        "input": "4\n-2 2 5 9",
        "output": "34",
        "explanation": "Pairing outer values inward and adding the required score gives 34."
      },
      {
        "input": "4\n1 2 3 4",
        "output": "24",
        "explanation": "Pairing outer values inward and adding the required score gives 24."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n-4 -1 0 3 8",
        "expectedOutput": "36"
      },
      {
        "testIndex": 2,
        "input": "4\n-2 2 5 9",
        "expectedOutput": "34"
      },
      {
        "testIndex": 3,
        "input": "4\n1 2 3 4",
        "expectedOutput": "24"
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
