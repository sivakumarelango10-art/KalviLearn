import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:sorting:bubble-sort",
    "slug": "bubble-sort",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Bubble Sort",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Sort the integers by the key `((abs(value)+1) mod 7, value)` in ascending lexicographic order.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the sorted sequence.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n4 1 3 2",
        "output": "1 2 3 4",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "4\n5 -2 0 7",
        "output": "0 7 -2 5",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "3\n3 3 1",
        "output": "1 3 3",
        "explanation": "Sorting by the stated key produces the displayed order."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n4 1 3 2",
        "expectedOutput": "1 2 3 4"
      },
      {
        "testIndex": 2,
        "input": "4\n5 -2 0 7",
        "expectedOutput": "0 7 -2 5"
      },
      {
        "testIndex": 3,
        "input": "3\n3 3 1",
        "expectedOutput": "1 3 3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:sorting:selection-sort",
    "slug": "selection-sort",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Selection Sort",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Sort the integers by the key `((abs(value)+2) mod 7, value)` in ascending lexicographic order.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the sorted sequence.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n4 1 3 2",
        "output": "1 2 3 4",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "4\n5 -2 0 7",
        "output": "5 0 7 -2",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "3\n3 3 1",
        "output": "1 3 3",
        "explanation": "Sorting by the stated key produces the displayed order."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n4 1 3 2",
        "expectedOutput": "1 2 3 4"
      },
      {
        "testIndex": 2,
        "input": "4\n5 -2 0 7",
        "expectedOutput": "5 0 7 -2"
      },
      {
        "testIndex": 3,
        "input": "3\n3 3 1",
        "expectedOutput": "1 3 3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:sorting:insertion-sort",
    "slug": "insertion-sort",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Insertion Sort",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Sort the integers by the key `((abs(value)+3) mod 7, value)` in ascending lexicographic order.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the sorted sequence.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n4 1 3 2",
        "output": "4 1 2 3",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "4\n5 -2 0 7",
        "output": "5 0 7 -2",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "3\n3 3 1",
        "output": "1 3 3",
        "explanation": "Sorting by the stated key produces the displayed order."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n4 1 3 2",
        "expectedOutput": "4 1 2 3"
      },
      {
        "testIndex": 2,
        "input": "4\n5 -2 0 7",
        "expectedOutput": "5 0 7 -2"
      },
      {
        "testIndex": 3,
        "input": "3\n3 3 1",
        "expectedOutput": "1 3 3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:sorting:merge-sort",
    "slug": "merge-sort",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Merge Sort",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Sort the integers by the key `((abs(value)+4) mod 7, value)` in ascending lexicographic order.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the sorted sequence.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n4 1 3 2",
        "output": "3 4 1 2",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "4\n5 -2 0 7",
        "output": "5 0 7 -2",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "3\n3 3 1",
        "output": "3 3 1",
        "explanation": "Sorting by the stated key produces the displayed order."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n4 1 3 2",
        "expectedOutput": "3 4 1 2"
      },
      {
        "testIndex": 2,
        "input": "4\n5 -2 0 7",
        "expectedOutput": "5 0 7 -2"
      },
      {
        "testIndex": 3,
        "input": "3\n3 3 1",
        "expectedOutput": "3 3 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:sorting:quick-sort",
    "slug": "quick-sort",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Quick Sort",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Sort the integers by the key `((abs(value)+5) mod 7, value)` in ascending lexicographic order.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the sorted sequence.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n4 1 3 2",
        "output": "2 3 4 1",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "4\n5 -2 0 7",
        "output": "-2 5 0 7",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "3\n3 3 1",
        "output": "3 3 1",
        "explanation": "Sorting by the stated key produces the displayed order."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n4 1 3 2",
        "expectedOutput": "2 3 4 1"
      },
      {
        "testIndex": 2,
        "input": "4\n5 -2 0 7",
        "expectedOutput": "-2 5 0 7"
      },
      {
        "testIndex": 3,
        "input": "3\n3 3 1",
        "expectedOutput": "3 3 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:sorting:absolute-value-sort",
    "slug": "absolute-value-sort",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Absolute Value Sort",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Sort the integers by the key `((abs(value)+6) mod 7, value)` in ascending lexicographic order.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the sorted sequence.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n4 1 3 2",
        "output": "1 2 3 4",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "4\n5 -2 0 7",
        "output": "-2 5 0 7",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "3\n3 3 1",
        "output": "1 3 3",
        "explanation": "Sorting by the stated key produces the displayed order."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n4 1 3 2",
        "expectedOutput": "1 2 3 4"
      },
      {
        "testIndex": 2,
        "input": "4\n5 -2 0 7",
        "expectedOutput": "-2 5 0 7"
      },
      {
        "testIndex": 3,
        "input": "3\n3 3 1",
        "expectedOutput": "1 3 3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:sorting:pair-secondary-sort",
    "slug": "pair-secondary-sort",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Pair Secondary Sort",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Sort the integers by the key `((abs(value)+7) mod 7, value)` in ascending lexicographic order.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the sorted sequence.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n4 1 3 2",
        "output": "1 2 3 4",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "4\n5 -2 0 7",
        "output": "0 7 -2 5",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "3\n3 3 1",
        "output": "1 3 3",
        "explanation": "Sorting by the stated key produces the displayed order."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n4 1 3 2",
        "expectedOutput": "1 2 3 4"
      },
      {
        "testIndex": 2,
        "input": "4\n5 -2 0 7",
        "expectedOutput": "0 7 -2 5"
      },
      {
        "testIndex": 3,
        "input": "3\n3 3 1",
        "expectedOutput": "1 3 3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:sorting:stable-parity-sort",
    "slug": "stable-parity-sort",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Stable Parity Sort",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Sort the integers by the key `((abs(value)+8) mod 7, value)` in ascending lexicographic order.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the sorted sequence.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n4 1 3 2",
        "output": "1 2 3 4",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "4\n5 -2 0 7",
        "output": "0 7 -2 5",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "3\n3 3 1",
        "output": "1 3 3",
        "explanation": "Sorting by the stated key produces the displayed order."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n4 1 3 2",
        "expectedOutput": "1 2 3 4"
      },
      {
        "testIndex": 2,
        "input": "4\n5 -2 0 7",
        "expectedOutput": "0 7 -2 5"
      },
      {
        "testIndex": 3,
        "input": "3\n3 3 1",
        "expectedOutput": "1 3 3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:sorting:digit-sum-sort",
    "slug": "digit-sum-sort",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Digit Sum Sort",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Sort the integers by the key `((abs(value)+9) mod 7, value)` in ascending lexicographic order.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the sorted sequence.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n4 1 3 2",
        "output": "1 2 3 4",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "4\n5 -2 0 7",
        "output": "5 0 7 -2",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "3\n3 3 1",
        "output": "1 3 3",
        "explanation": "Sorting by the stated key produces the displayed order."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n4 1 3 2",
        "expectedOutput": "1 2 3 4"
      },
      {
        "testIndex": 2,
        "input": "4\n5 -2 0 7",
        "expectedOutput": "5 0 7 -2"
      },
      {
        "testIndex": 3,
        "input": "3\n3 3 1",
        "expectedOutput": "1 3 3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:sorting:frequency-sort",
    "slug": "frequency-sort",
    "topicId": "sorting",
    "topicSlug": "sorting",
    "topicTitle": "Sorting",
    "title": "Frequency Sort",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Sort the integers by the key `((abs(value)+10) mod 7, value)` in ascending lexicographic order.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the sorted sequence.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n4 1 3 2",
        "output": "4 1 2 3",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "4\n5 -2 0 7",
        "output": "5 0 7 -2",
        "explanation": "Sorting by the stated key produces the displayed order."
      },
      {
        "input": "3\n3 3 1",
        "output": "1 3 3",
        "explanation": "Sorting by the stated key produces the displayed order."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n4 1 3 2",
        "expectedOutput": "4 1 2 3"
      },
      {
        "testIndex": 2,
        "input": "4\n5 -2 0 7",
        "expectedOutput": "5 0 7 -2"
      },
      {
        "testIndex": 3,
        "input": "3\n3 3 1",
        "expectedOutput": "1 3 3"
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
