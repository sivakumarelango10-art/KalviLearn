import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:nested-loops:grid-cell-score",
    "slug": "grid-cell-score",
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Grid Cell Score",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Using nested loops over `1<=r<=n` and `1<=c<=m`, sum `(r+c+1) mod 5`.",
    "inputFormat": "One line contains positive integers `n m`.",
    "outputFormat": "Print the nested-loop sum.",
    "constraints": "1 <= n,m <= 1000.",
    "examples": [
      {
        "input": "2 3",
        "output": "12",
        "explanation": "Summing `(r+c+1) mod 5` over all 6 grid positions gives 12."
      },
      {
        "input": "3 2",
        "output": "12",
        "explanation": "Summing `(r+c+1) mod 5` over all 6 grid positions gives 12."
      },
      {
        "input": "1 4",
        "output": "8",
        "explanation": "Summing `(r+c+1) mod 5` over all 4 grid positions gives 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "12"
      },
      {
        "testIndex": 2,
        "input": "3 2",
        "expectedOutput": "12"
      },
      {
        "testIndex": 3,
        "input": "1 4",
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
    "id": "learn:nested-loops:upper-triangle-score",
    "slug": "upper-triangle-score",
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Upper Triangle Score",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Using nested loops over `1<=r<=n` and `1<=c<=m`, sum `(r+c+2) mod 5`.",
    "inputFormat": "One line contains positive integers `n m`.",
    "outputFormat": "Print the nested-loop sum.",
    "constraints": "1 <= n,m <= 1000.",
    "examples": [
      {
        "input": "2 3",
        "output": "8",
        "explanation": "Summing `(r+c+2) mod 5` over all 6 grid positions gives 8."
      },
      {
        "input": "3 2",
        "output": "8",
        "explanation": "Summing `(r+c+2) mod 5` over all 6 grid positions gives 8."
      },
      {
        "input": "1 4",
        "output": "7",
        "explanation": "Summing `(r+c+2) mod 5` over all 4 grid positions gives 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "3 2",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "1 4",
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
    "id": "learn:nested-loops:lower-triangle-score",
    "slug": "lower-triangle-score",
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Lower Triangle Score",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Using nested loops over `1<=r<=n` and `1<=c<=m`, sum `(r+c+3) mod 5`.",
    "inputFormat": "One line contains positive integers `n m`.",
    "outputFormat": "Print the nested-loop sum.",
    "constraints": "1 <= n,m <= 1000.",
    "examples": [
      {
        "input": "2 3",
        "output": "9",
        "explanation": "Summing `(r+c+3) mod 5` over all 6 grid positions gives 9."
      },
      {
        "input": "3 2",
        "output": "9",
        "explanation": "Summing `(r+c+3) mod 5` over all 6 grid positions gives 9."
      },
      {
        "input": "1 4",
        "output": "6",
        "explanation": "Summing `(r+c+3) mod 5` over all 4 grid positions gives 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "3 2",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "1 4",
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
    "id": "learn:nested-loops:ordered-pair-score",
    "slug": "ordered-pair-score",
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Ordered Pair Score",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Using nested loops over `1<=r<=n` and `1<=c<=m`, sum `(r+c+4) mod 5`.",
    "inputFormat": "One line contains positive integers `n m`.",
    "outputFormat": "Print the nested-loop sum.",
    "constraints": "1 <= n,m <= 1000.",
    "examples": [
      {
        "input": "2 3",
        "output": "15",
        "explanation": "Summing `(r+c+4) mod 5` over all 6 grid positions gives 15."
      },
      {
        "input": "3 2",
        "output": "15",
        "explanation": "Summing `(r+c+4) mod 5` over all 6 grid positions gives 15."
      },
      {
        "input": "1 4",
        "output": "10",
        "explanation": "Summing `(r+c+4) mod 5` over all 4 grid positions gives 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "15"
      },
      {
        "testIndex": 2,
        "input": "3 2",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "1 4",
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
    "id": "learn:nested-loops:multiplication-grid-score",
    "slug": "multiplication-grid-score",
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Multiplication Grid Score",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Using nested loops over `1<=r<=n` and `1<=c<=m`, sum `(r+c+5) mod 5`.",
    "inputFormat": "One line contains positive integers `n m`.",
    "outputFormat": "Print the nested-loop sum.",
    "constraints": "1 <= n,m <= 1000.",
    "examples": [
      {
        "input": "2 3",
        "output": "16",
        "explanation": "Summing `(r+c+5) mod 5` over all 6 grid positions gives 16."
      },
      {
        "input": "3 2",
        "output": "16",
        "explanation": "Summing `(r+c+5) mod 5` over all 6 grid positions gives 16."
      },
      {
        "input": "1 4",
        "output": "9",
        "explanation": "Summing `(r+c+5) mod 5` over all 4 grid positions gives 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "16"
      },
      {
        "testIndex": 2,
        "input": "3 2",
        "expectedOutput": "16"
      },
      {
        "testIndex": 3,
        "input": "1 4",
        "expectedOutput": "9"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:nested-loops:diagonal-pair-score",
    "slug": "diagonal-pair-score",
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Diagonal Pair Score",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Using nested loops over `1<=r<=n` and `1<=c<=m`, sum `(r+c+6) mod 5`.",
    "inputFormat": "One line contains positive integers `n m`.",
    "outputFormat": "Print the nested-loop sum.",
    "constraints": "1 <= n,m <= 1000.",
    "examples": [
      {
        "input": "2 3",
        "output": "12",
        "explanation": "Summing `(r+c+6) mod 5` over all 6 grid positions gives 12."
      },
      {
        "input": "3 2",
        "output": "12",
        "explanation": "Summing `(r+c+6) mod 5` over all 6 grid positions gives 12."
      },
      {
        "input": "1 4",
        "output": "8",
        "explanation": "Summing `(r+c+6) mod 5` over all 4 grid positions gives 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "12"
      },
      {
        "testIndex": 2,
        "input": "3 2",
        "expectedOutput": "12"
      },
      {
        "testIndex": 3,
        "input": "1 4",
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
    "id": "learn:nested-loops:border-visit-score",
    "slug": "border-visit-score",
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Border Visit Score",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Using nested loops over `1<=r<=n` and `1<=c<=m`, sum `(r+c+7) mod 5`.",
    "inputFormat": "One line contains positive integers `n m`.",
    "outputFormat": "Print the nested-loop sum.",
    "constraints": "1 <= n,m <= 1000.",
    "examples": [
      {
        "input": "2 3",
        "output": "8",
        "explanation": "Summing `(r+c+7) mod 5` over all 6 grid positions gives 8."
      },
      {
        "input": "3 2",
        "output": "8",
        "explanation": "Summing `(r+c+7) mod 5` over all 6 grid positions gives 8."
      },
      {
        "input": "1 4",
        "output": "7",
        "explanation": "Summing `(r+c+7) mod 5` over all 4 grid positions gives 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "3 2",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "1 4",
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
    "id": "learn:nested-loops:checkerboard-visit-score",
    "slug": "checkerboard-visit-score",
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Checkerboard Visit Score",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Using nested loops over `1<=r<=n` and `1<=c<=m`, sum `(r+c+8) mod 5`.",
    "inputFormat": "One line contains positive integers `n m`.",
    "outputFormat": "Print the nested-loop sum.",
    "constraints": "1 <= n,m <= 1000.",
    "examples": [
      {
        "input": "2 3",
        "output": "9",
        "explanation": "Summing `(r+c+8) mod 5` over all 6 grid positions gives 9."
      },
      {
        "input": "3 2",
        "output": "9",
        "explanation": "Summing `(r+c+8) mod 5` over all 6 grid positions gives 9."
      },
      {
        "input": "1 4",
        "output": "6",
        "explanation": "Summing `(r+c+8) mod 5` over all 4 grid positions gives 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "3 2",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "1 4",
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
    "id": "learn:nested-loops:divisibility-pair-score",
    "slug": "divisibility-pair-score",
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Divisibility Pair Score",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Using nested loops over `1<=r<=n` and `1<=c<=m`, sum `(r+c+9) mod 5`.",
    "inputFormat": "One line contains positive integers `n m`.",
    "outputFormat": "Print the nested-loop sum.",
    "constraints": "1 <= n,m <= 1000.",
    "examples": [
      {
        "input": "2 3",
        "output": "15",
        "explanation": "Summing `(r+c+9) mod 5` over all 6 grid positions gives 15."
      },
      {
        "input": "3 2",
        "output": "15",
        "explanation": "Summing `(r+c+9) mod 5` over all 6 grid positions gives 15."
      },
      {
        "input": "1 4",
        "output": "10",
        "explanation": "Summing `(r+c+9) mod 5` over all 4 grid positions gives 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "15"
      },
      {
        "testIndex": 2,
        "input": "3 2",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "1 4",
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
    "id": "learn:nested-loops:nested-coordinate-score",
    "slug": "nested-coordinate-score",
    "topicId": "nested-loops",
    "topicSlug": "nested-loops",
    "topicTitle": "Nested Loops",
    "title": "Nested Coordinate Score",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Using nested loops over `1<=r<=n` and `1<=c<=m`, sum `(r+c+10) mod 5`.",
    "inputFormat": "One line contains positive integers `n m`.",
    "outputFormat": "Print the nested-loop sum.",
    "constraints": "1 <= n,m <= 1000.",
    "examples": [
      {
        "input": "2 3",
        "output": "16",
        "explanation": "Summing `(r+c+10) mod 5` over all 6 grid positions gives 16."
      },
      {
        "input": "3 2",
        "output": "16",
        "explanation": "Summing `(r+c+10) mod 5` over all 6 grid positions gives 16."
      },
      {
        "input": "1 4",
        "output": "9",
        "explanation": "Summing `(r+c+10) mod 5` over all 4 grid positions gives 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "16"
      },
      {
        "testIndex": 2,
        "input": "3 2",
        "expectedOutput": "16"
      },
      {
        "testIndex": 3,
        "input": "1 4",
        "expectedOutput": "9"
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
