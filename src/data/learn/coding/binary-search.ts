import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:binary-search:exact-binary-search",
    "slug": "exact-binary-search",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Exact Binary Search",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Use binary search on integers to find the smallest non-negative `x` such that `x*x >= n+1`.",
    "inputFormat": "One line contains non-negative integer `n`.",
    "outputFormat": "Print the minimum feasible `x`.",
    "constraints": "0 <= n <= 10^18.",
    "examples": [
      {
        "input": "10",
        "output": "4",
        "explanation": "The smallest integer x with x² ≥ 10+1 is 4."
      },
      {
        "input": "25",
        "output": "6",
        "explanation": "The smallest integer x with x² ≥ 25+1 is 6."
      },
      {
        "input": "50",
        "output": "8",
        "explanation": "The smallest integer x with x² ≥ 50+1 is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "25",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "50",
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
    "id": "learn:binary-search:lower-bound",
    "slug": "lower-bound",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Lower Bound",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Use binary search on integers to find the smallest non-negative `x` such that `x*x >= n+2`.",
    "inputFormat": "One line contains non-negative integer `n`.",
    "outputFormat": "Print the minimum feasible `x`.",
    "constraints": "0 <= n <= 10^18.",
    "examples": [
      {
        "input": "10",
        "output": "4",
        "explanation": "The smallest integer x with x² ≥ 10+2 is 4."
      },
      {
        "input": "25",
        "output": "6",
        "explanation": "The smallest integer x with x² ≥ 25+2 is 6."
      },
      {
        "input": "50",
        "output": "8",
        "explanation": "The smallest integer x with x² ≥ 50+2 is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "25",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "50",
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
    "id": "learn:binary-search:upper-bound",
    "slug": "upper-bound",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Upper Bound",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Use binary search on integers to find the smallest non-negative `x` such that `x*x >= n+3`.",
    "inputFormat": "One line contains non-negative integer `n`.",
    "outputFormat": "Print the minimum feasible `x`.",
    "constraints": "0 <= n <= 10^18.",
    "examples": [
      {
        "input": "10",
        "output": "4",
        "explanation": "The smallest integer x with x² ≥ 10+3 is 4."
      },
      {
        "input": "25",
        "output": "6",
        "explanation": "The smallest integer x with x² ≥ 25+3 is 6."
      },
      {
        "input": "50",
        "output": "8",
        "explanation": "The smallest integer x with x² ≥ 50+3 is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "25",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "50",
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
    "id": "learn:binary-search:first-occurrence",
    "slug": "first-occurrence",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "First Occurrence",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Use binary search on integers to find the smallest non-negative `x` such that `x*x >= n+4`.",
    "inputFormat": "One line contains non-negative integer `n`.",
    "outputFormat": "Print the minimum feasible `x`.",
    "constraints": "0 <= n <= 10^18.",
    "examples": [
      {
        "input": "10",
        "output": "4",
        "explanation": "The smallest integer x with x² ≥ 10+4 is 4."
      },
      {
        "input": "25",
        "output": "6",
        "explanation": "The smallest integer x with x² ≥ 25+4 is 6."
      },
      {
        "input": "50",
        "output": "8",
        "explanation": "The smallest integer x with x² ≥ 50+4 is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "25",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "50",
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
    "id": "learn:binary-search:last-occurrence",
    "slug": "last-occurrence",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Last Occurrence",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Use binary search on integers to find the smallest non-negative `x` such that `x*x >= n+5`.",
    "inputFormat": "One line contains non-negative integer `n`.",
    "outputFormat": "Print the minimum feasible `x`.",
    "constraints": "0 <= n <= 10^18.",
    "examples": [
      {
        "input": "10",
        "output": "4",
        "explanation": "The smallest integer x with x² ≥ 10+5 is 4."
      },
      {
        "input": "25",
        "output": "6",
        "explanation": "The smallest integer x with x² ≥ 25+5 is 6."
      },
      {
        "input": "50",
        "output": "8",
        "explanation": "The smallest integer x with x² ≥ 50+5 is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "25",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "50",
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
    "id": "learn:binary-search:integer-square-root",
    "slug": "integer-square-root",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Integer Square Root",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Use binary search on integers to find the smallest non-negative `x` such that `x*x >= n+6`.",
    "inputFormat": "One line contains non-negative integer `n`.",
    "outputFormat": "Print the minimum feasible `x`.",
    "constraints": "0 <= n <= 10^18.",
    "examples": [
      {
        "input": "10",
        "output": "4",
        "explanation": "The smallest integer x with x² ≥ 10+6 is 4."
      },
      {
        "input": "25",
        "output": "6",
        "explanation": "The smallest integer x with x² ≥ 25+6 is 6."
      },
      {
        "input": "50",
        "output": "8",
        "explanation": "The smallest integer x with x² ≥ 50+6 is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "25",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "50",
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
    "id": "learn:binary-search:first-positive",
    "slug": "first-positive",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "First Positive",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Use binary search on integers to find the smallest non-negative `x` such that `x*x >= n+7`.",
    "inputFormat": "One line contains non-negative integer `n`.",
    "outputFormat": "Print the minimum feasible `x`.",
    "constraints": "0 <= n <= 10^18.",
    "examples": [
      {
        "input": "10",
        "output": "5",
        "explanation": "The smallest integer x with x² ≥ 10+7 is 5."
      },
      {
        "input": "25",
        "output": "6",
        "explanation": "The smallest integer x with x² ≥ 25+7 is 6."
      },
      {
        "input": "50",
        "output": "8",
        "explanation": "The smallest integer x with x² ≥ 50+7 is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "25",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "50",
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
    "id": "learn:binary-search:rotated-array-search",
    "slug": "rotated-array-search",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Rotated Array Search",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Use binary search on integers to find the smallest non-negative `x` such that `x*x >= n+8`.",
    "inputFormat": "One line contains non-negative integer `n`.",
    "outputFormat": "Print the minimum feasible `x`.",
    "constraints": "0 <= n <= 10^18.",
    "examples": [
      {
        "input": "10",
        "output": "5",
        "explanation": "The smallest integer x with x² ≥ 10+8 is 5."
      },
      {
        "input": "25",
        "output": "6",
        "explanation": "The smallest integer x with x² ≥ 25+8 is 6."
      },
      {
        "input": "50",
        "output": "8",
        "explanation": "The smallest integer x with x² ≥ 50+8 is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "25",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "50",
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
    "id": "learn:binary-search:minimum-feasible-rate",
    "slug": "minimum-feasible-rate",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Minimum Feasible Rate",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Use binary search on integers to find the smallest non-negative `x` such that `x*x >= n+9`.",
    "inputFormat": "One line contains non-negative integer `n`.",
    "outputFormat": "Print the minimum feasible `x`.",
    "constraints": "0 <= n <= 10^18.",
    "examples": [
      {
        "input": "10",
        "output": "5",
        "explanation": "The smallest integer x with x² ≥ 10+9 is 5."
      },
      {
        "input": "25",
        "output": "6",
        "explanation": "The smallest integer x with x² ≥ 25+9 is 6."
      },
      {
        "input": "50",
        "output": "8",
        "explanation": "The smallest integer x with x² ≥ 50+9 is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "25",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "50",
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
    "id": "learn:binary-search:mountain-peak",
    "slug": "mountain-peak",
    "topicId": "binary-search",
    "topicSlug": "binary-search",
    "topicTitle": "Binary Search",
    "title": "Mountain Peak",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Use binary search on integers to find the smallest non-negative `x` such that `x*x >= n+10`.",
    "inputFormat": "One line contains non-negative integer `n`.",
    "outputFormat": "Print the minimum feasible `x`.",
    "constraints": "0 <= n <= 10^18.",
    "examples": [
      {
        "input": "10",
        "output": "5",
        "explanation": "The smallest integer x with x² ≥ 10+10 is 5."
      },
      {
        "input": "25",
        "output": "6",
        "explanation": "The smallest integer x with x² ≥ 25+10 is 6."
      },
      {
        "input": "50",
        "output": "8",
        "explanation": "The smallest integer x with x² ≥ 50+10 is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "25",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "50",
        "expectedOutput": "8"
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
