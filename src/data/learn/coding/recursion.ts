import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:recursion:recursive-sum",
    "slug": "recursive-sum",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Sum",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Define recursively `F(0)=0` and `F(n)=((n*1) mod 13)+F(n-1)` for n>0. Compute F(n).",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print F(n).",
    "constraints": "0 <= n <= 10000.",
    "examples": [
      {
        "input": "3",
        "output": "6",
        "explanation": "Applying the recurrence from 1 through 3 gives 6."
      },
      {
        "input": "5",
        "output": "15",
        "explanation": "Applying the recurrence from 1 through 5 gives 15."
      },
      {
        "input": "7",
        "output": "28",
        "explanation": "Applying the recurrence from 1 through 7 gives 28."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "28"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:recursion:recursive-power",
    "slug": "recursive-power",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Power",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Define recursively `F(0)=0` and `F(n)=((n*2) mod 13)+F(n-1)` for n>0. Compute F(n).",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print F(n).",
    "constraints": "0 <= n <= 10000.",
    "examples": [
      {
        "input": "3",
        "output": "12",
        "explanation": "Applying the recurrence from 1 through 3 gives 12."
      },
      {
        "input": "5",
        "output": "30",
        "explanation": "Applying the recurrence from 1 through 5 gives 30."
      },
      {
        "input": "7",
        "output": "43",
        "explanation": "Applying the recurrence from 1 through 7 gives 43."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "12"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "30"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "43"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:recursion:recursive-digit-product",
    "slug": "recursive-digit-product",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Digit Product",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Define recursively `F(0)=0` and `F(n)=((n*3) mod 13)+F(n-1)` for n>0. Compute F(n).",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print F(n).",
    "constraints": "0 <= n <= 10000.",
    "examples": [
      {
        "input": "3",
        "output": "18",
        "explanation": "Applying the recurrence from 1 through 3 gives 18."
      },
      {
        "input": "5",
        "output": "32",
        "explanation": "Applying the recurrence from 1 through 5 gives 32."
      },
      {
        "input": "7",
        "output": "45",
        "explanation": "Applying the recurrence from 1 through 7 gives 45."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "18"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "32"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "45"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:recursion:recursive-array-sum",
    "slug": "recursive-array-sum",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Array Sum",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Define recursively `F(0)=0` and `F(n)=((n*4) mod 13)+F(n-1)` for n>0. Compute F(n).",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print F(n).",
    "constraints": "0 <= n <= 10000.",
    "examples": [
      {
        "input": "3",
        "output": "24",
        "explanation": "Applying the recurrence from 1 through 3 gives 24."
      },
      {
        "input": "5",
        "output": "34",
        "explanation": "Applying the recurrence from 1 through 5 gives 34."
      },
      {
        "input": "7",
        "output": "47",
        "explanation": "Applying the recurrence from 1 through 7 gives 47."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "24"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "34"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "47"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:recursion:recursive-maximum",
    "slug": "recursive-maximum",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Maximum",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Define recursively `F(0)=0` and `F(n)=((n*5) mod 13)+F(n-1)` for n>0. Compute F(n).",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print F(n).",
    "constraints": "0 <= n <= 10000.",
    "examples": [
      {
        "input": "3",
        "output": "17",
        "explanation": "Applying the recurrence from 1 through 3 gives 17."
      },
      {
        "input": "5",
        "output": "36",
        "explanation": "Applying the recurrence from 1 through 5 gives 36."
      },
      {
        "input": "7",
        "output": "49",
        "explanation": "Applying the recurrence from 1 through 7 gives 49."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "17"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "36"
      },
      {
        "testIndex": 3,
        "input": "7",
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
    "id": "learn:recursion:recursive-palindrome",
    "slug": "recursive-palindrome",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Palindrome",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Define recursively `F(0)=0` and `F(n)=((n*6) mod 13)+F(n-1)` for n>0. Compute F(n).",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print F(n).",
    "constraints": "0 <= n <= 10000.",
    "examples": [
      {
        "input": "3",
        "output": "23",
        "explanation": "Applying the recurrence from 1 through 3 gives 23."
      },
      {
        "input": "5",
        "output": "38",
        "explanation": "Applying the recurrence from 1 through 5 gives 38."
      },
      {
        "input": "7",
        "output": "51",
        "explanation": "Applying the recurrence from 1 through 7 gives 51."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "23"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "38"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "51"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:recursion:recursive-gcd",
    "slug": "recursive-gcd",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive GCD",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Define recursively `F(0)=0` and `F(n)=((n*7) mod 13)+F(n-1)` for n>0. Compute F(n).",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print F(n).",
    "constraints": "0 <= n <= 10000.",
    "examples": [
      {
        "input": "3",
        "output": "16",
        "explanation": "Applying the recurrence from 1 through 3 gives 16."
      },
      {
        "input": "5",
        "output": "27",
        "explanation": "Applying the recurrence from 1 through 5 gives 27."
      },
      {
        "input": "7",
        "output": "40",
        "explanation": "Applying the recurrence from 1 through 7 gives 40."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "16"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "27"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "40"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:recursion:recursive-bit-count",
    "slug": "recursive-bit-count",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Bit Count",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Define recursively `F(0)=0` and `F(n)=((n*8) mod 13)+F(n-1)` for n>0. Compute F(n).",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print F(n).",
    "constraints": "0 <= n <= 10000.",
    "examples": [
      {
        "input": "3",
        "output": "22",
        "explanation": "Applying the recurrence from 1 through 3 gives 22."
      },
      {
        "input": "5",
        "output": "29",
        "explanation": "Applying the recurrence from 1 through 5 gives 29."
      },
      {
        "input": "7",
        "output": "42",
        "explanation": "Applying the recurrence from 1 through 7 gives 42."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "22"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "29"
      },
      {
        "testIndex": 3,
        "input": "7",
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
    "id": "learn:recursion:recursive-string-length",
    "slug": "recursive-string-length",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive String Length",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Define recursively `F(0)=0` and `F(n)=((n*9) mod 13)+F(n-1)` for n>0. Compute F(n).",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print F(n).",
    "constraints": "0 <= n <= 10000.",
    "examples": [
      {
        "input": "3",
        "output": "15",
        "explanation": "Applying the recurrence from 1 through 3 gives 15."
      },
      {
        "input": "5",
        "output": "31",
        "explanation": "Applying the recurrence from 1 through 5 gives 31."
      },
      {
        "input": "7",
        "output": "44",
        "explanation": "Applying the recurrence from 1 through 7 gives 44."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "15"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "31"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "44"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:recursion:recursive-target-count",
    "slug": "recursive-target-count",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Target Count",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Define recursively `F(0)=0` and `F(n)=((n*10) mod 13)+F(n-1)` for n>0. Compute F(n).",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print F(n).",
    "constraints": "0 <= n <= 10000.",
    "examples": [
      {
        "input": "3",
        "output": "21",
        "explanation": "Applying the recurrence from 1 through 3 gives 21."
      },
      {
        "input": "5",
        "output": "33",
        "explanation": "Applying the recurrence from 1 through 5 gives 33."
      },
      {
        "input": "7",
        "output": "46",
        "explanation": "Applying the recurrence from 1 through 7 gives 46."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "33"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "46"
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
