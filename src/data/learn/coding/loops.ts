import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:loops:iterative-running-total",
    "slug": "iterative-running-total",
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Iterative Running Total",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Use an iterative loop/state update to obtain the requested final value. For this task, compute `(a+1)*b-1`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "8",
        "explanation": "Using the loop-state formula gives (2+1)×3-1 = 8."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Using the loop-state formula gives (5+1)×1-1 = 5."
      },
      {
        "input": "-2 4",
        "output": "-5",
        "explanation": "Using the loop-state formula gives (-2+1)×4-1 = -5."
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
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
        "expectedOutput": "-5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:loops:repeated-increment-score",
    "slug": "repeated-increment-score",
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Repeated Increment Score",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Use an iterative loop/state update to obtain the requested final value. For this task, compute `(a+2)*b-2`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "10",
        "explanation": "Using the loop-state formula gives (2+2)×3-2 = 10."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Using the loop-state formula gives (5+2)×1-2 = 5."
      },
      {
        "input": "-2 4",
        "output": "-2",
        "explanation": "Using the loop-state formula gives (-2+2)×4-2 = -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
        "expectedOutput": "-2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:loops:looped-difference-accumulator",
    "slug": "looped-difference-accumulator",
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Looped Difference Accumulator",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Use an iterative loop/state update to obtain the requested final value. For this task, compute `(a+3)*b-3`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "12",
        "explanation": "Using the loop-state formula gives (2+3)×3-3 = 12."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Using the loop-state formula gives (5+3)×1-3 = 5."
      },
      {
        "input": "-2 4",
        "output": "1",
        "explanation": "Using the loop-state formula gives (-2+3)×4-3 = 1."
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
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
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
    "id": "learn:loops:iteration-weighted-counter",
    "slug": "iteration-weighted-counter",
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Iteration Weighted Counter",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Use an iterative loop/state update to obtain the requested final value. For this task, compute `(a+4)*b-4`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "14",
        "explanation": "Using the loop-state formula gives (2+4)×3-4 = 14."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Using the loop-state formula gives (5+4)×1-4 = 5."
      },
      {
        "input": "-2 4",
        "output": "4",
        "explanation": "Using the loop-state formula gives (-2+4)×4-4 = 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "14"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
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
    "id": "learn:loops:loop-range-score",
    "slug": "loop-range-score",
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Loop Range Score",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Use an iterative loop/state update to obtain the requested final value. For this task, compute `(a+5)*b-5`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "16",
        "explanation": "Using the loop-state formula gives (2+5)×3-5 = 16."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Using the loop-state formula gives (5+5)×1-5 = 5."
      },
      {
        "input": "-2 4",
        "output": "7",
        "explanation": "Using the loop-state formula gives (-2+5)×4-5 = 7."
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
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
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
    "id": "learn:loops:stepwise-product-adjustment",
    "slug": "stepwise-product-adjustment",
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Stepwise Product Adjustment",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Use an iterative loop/state update to obtain the requested final value. For this task, compute `(a+6)*b-6`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "18",
        "explanation": "Using the loop-state formula gives (2+6)×3-6 = 18."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Using the loop-state formula gives (5+6)×1-6 = 5."
      },
      {
        "input": "-2 4",
        "output": "10",
        "explanation": "Using the loop-state formula gives (-2+6)×4-6 = 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "18"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
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
    "id": "learn:loops:cyclic-increment-total",
    "slug": "cyclic-increment-total",
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Cyclic Increment Total",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Use an iterative loop/state update to obtain the requested final value. For this task, compute `(a+7)*b-7`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "20",
        "explanation": "Using the loop-state formula gives (2+7)×3-7 = 20."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Using the loop-state formula gives (5+7)×1-7 = 5."
      },
      {
        "input": "-2 4",
        "output": "13",
        "explanation": "Using the loop-state formula gives (-2+7)×4-7 = 13."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "20"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
        "expectedOutput": "13"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:loops:loop-controlled-offset",
    "slug": "loop-controlled-offset",
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Loop Controlled Offset",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Use an iterative loop/state update to obtain the requested final value. For this task, compute `(a+8)*b-8`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "22",
        "explanation": "Using the loop-state formula gives (2+8)×3-8 = 22."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Using the loop-state formula gives (5+8)×1-8 = 5."
      },
      {
        "input": "-2 4",
        "output": "16",
        "explanation": "Using the loop-state formula gives (-2+8)×4-8 = 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "22"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
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
    "id": "learn:loops:repeated-linear-update",
    "slug": "repeated-linear-update",
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Repeated Linear Update",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Use an iterative loop/state update to obtain the requested final value. For this task, compute `(a+9)*b-9`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "24",
        "explanation": "Using the loop-state formula gives (2+9)×3-9 = 24."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Using the loop-state formula gives (5+9)×1-9 = 5."
      },
      {
        "input": "-2 4",
        "output": "19",
        "explanation": "Using the loop-state formula gives (-2+9)×4-9 = 19."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "24"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
        "expectedOutput": "19"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:loops:iteration-final-state",
    "slug": "iteration-final-state",
    "topicId": "loops",
    "topicSlug": "loops",
    "topicTitle": "Loops",
    "title": "Iteration Final State",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Use an iterative loop/state update to obtain the requested final value. For this task, compute `(a+10)*b-10`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "26",
        "explanation": "Using the loop-state formula gives (2+10)×3-10 = 26."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Using the loop-state formula gives (5+10)×1-10 = 5."
      },
      {
        "input": "-2 4",
        "output": "22",
        "explanation": "Using the loop-state formula gives (-2+10)×4-10 = 22."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "26"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
        "expectedOutput": "22"
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
