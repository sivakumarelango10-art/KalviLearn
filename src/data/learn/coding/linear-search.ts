import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:linear-search:first-target-position",
    "slug": "first-target-position",
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "First Target Position",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Linearly scan the array for the first index whose value satisfies `(value+1) mod 5 = 1`.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the first matching zero-based index, or -1 if none.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n1 4 2 4 7",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n3 3 3",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n5 -1 2",
        "output": "0",
        "explanation": "Scanning left to right, the first matching index is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n1 4 2 4 7",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "3\n3 3 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "3\n5 -1 2",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:linear-search:last-target-position",
    "slug": "last-target-position",
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Last Target Position",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Linearly scan the array for the first index whose value satisfies `(value+2) mod 5 = 2`.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the first matching zero-based index, or -1 if none.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n1 4 2 4 7",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n3 3 3",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n5 -1 2",
        "output": "0",
        "explanation": "Scanning left to right, the first matching index is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n1 4 2 4 7",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "3\n3 3 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "3\n5 -1 2",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:linear-search:first-greater-position",
    "slug": "first-greater-position",
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "First Greater Position",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Linearly scan the array for the first index whose value satisfies `(value+3) mod 5 = 3`.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the first matching zero-based index, or -1 if none.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n1 4 2 4 7",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n3 3 3",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n5 -1 2",
        "output": "0",
        "explanation": "Scanning left to right, the first matching index is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n1 4 2 4 7",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "3\n3 3 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "3\n5 -1 2",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:linear-search:nearest-value-position",
    "slug": "nearest-value-position",
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Nearest Value Position",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Linearly scan the array for the first index whose value satisfies `(value+4) mod 5 = 4`.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the first matching zero-based index, or -1 if none.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n1 4 2 4 7",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n3 3 3",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n5 -1 2",
        "output": "0",
        "explanation": "Scanning left to right, the first matching index is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n1 4 2 4 7",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "3\n3 3 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "3\n5 -1 2",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:linear-search:range-limited-search",
    "slug": "range-limited-search",
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Range Limited Search",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Linearly scan the array for the first index whose value satisfies `(value+5) mod 5 = 0`.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the first matching zero-based index, or -1 if none.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n1 4 2 4 7",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n3 3 3",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n5 -1 2",
        "output": "0",
        "explanation": "Scanning left to right, the first matching index is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n1 4 2 4 7",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "3\n3 3 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "3\n5 -1 2",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:linear-search:search-comparison-count",
    "slug": "search-comparison-count",
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Search Comparison Count",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Linearly scan the array for the first index whose value satisfies `(value+6) mod 5 = 1`.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the first matching zero-based index, or -1 if none.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n1 4 2 4 7",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n3 3 3",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n5 -1 2",
        "output": "0",
        "explanation": "Scanning left to right, the first matching index is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n1 4 2 4 7",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "3\n3 3 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "3\n5 -1 2",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:linear-search:first-repeated-position",
    "slug": "first-repeated-position",
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "First Repeated Position",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Linearly scan the array for the first index whose value satisfies `(value+7) mod 5 = 2`.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the first matching zero-based index, or -1 if none.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n1 4 2 4 7",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n3 3 3",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n5 -1 2",
        "output": "0",
        "explanation": "Scanning left to right, the first matching index is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n1 4 2 4 7",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "3\n3 3 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "3\n5 -1 2",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:linear-search:name-search-position",
    "slug": "name-search-position",
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Name Search Position",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Linearly scan the array for the first index whose value satisfies `(value+8) mod 5 = 3`.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the first matching zero-based index, or -1 if none.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n1 4 2 4 7",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n3 3 3",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n5 -1 2",
        "output": "0",
        "explanation": "Scanning left to right, the first matching index is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n1 4 2 4 7",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "3\n3 3 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "3\n5 -1 2",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:linear-search:match-index-sum",
    "slug": "match-index-sum",
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "Match Index Sum",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Linearly scan the array for the first index whose value satisfies `(value+9) mod 5 = 4`.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the first matching zero-based index, or -1 if none.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n1 4 2 4 7",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n3 3 3",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n5 -1 2",
        "output": "0",
        "explanation": "Scanning left to right, the first matching index is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n1 4 2 4 7",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "3\n3 3 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "3\n5 -1 2",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:linear-search:first-negative-position",
    "slug": "first-negative-position",
    "topicId": "linear-search",
    "topicSlug": "linear-search",
    "topicTitle": "Linear Search",
    "title": "First Negative Position",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Linearly scan the array for the first index whose value satisfies `(value+10) mod 5 = 0`.",
    "inputFormat": "First line contains `n`; second line contains `n` integers.",
    "outputFormat": "Print the first matching zero-based index, or -1 if none.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "5\n1 4 2 4 7",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n3 3 3",
        "output": "-1",
        "explanation": "Scanning left to right, the first matching index is -1."
      },
      {
        "input": "3\n5 -1 2",
        "output": "0",
        "explanation": "Scanning left to right, the first matching index is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5\n1 4 2 4 7",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "3\n3 3 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "3\n5 -1 2",
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
