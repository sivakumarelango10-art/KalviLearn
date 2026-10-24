import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:conditionals-control-flow:largest-of-three",
    "slug": "largest-of-three",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Largest of Three",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, print the largest of the three values.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "7",
        "explanation": "Evaluating the condition on (3,5,7) produces `7`."
      },
      {
        "input": "8 2 4",
        "output": "8",
        "explanation": "Evaluating the condition on (8,2,4) produces `8`."
      },
      {
        "input": "-3 6 1",
        "output": "6",
        "explanation": "Evaluating the condition on (-3,6,1) produces `6`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
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
    "id": "learn:conditionals-control-flow:middle-of-three",
    "slug": "middle-of-three",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Middle of Three",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, print the median value.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "5",
        "explanation": "Evaluating the condition on (3,5,7) produces `5`."
      },
      {
        "input": "8 2 4",
        "output": "4",
        "explanation": "Evaluating the condition on (8,2,4) produces `4`."
      },
      {
        "input": "-3 6 1",
        "output": "1",
        "explanation": "Evaluating the condition on (-3,6,1) produces `1`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
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
    "id": "learn:conditionals-control-flow:divisible-by-both",
    "slug": "divisible-by-both",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Divisible by Both",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, print YES if a is divisible by both b and c.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "NO",
        "explanation": "Evaluating the condition on (3,5,7) produces `NO`."
      },
      {
        "input": "8 2 4",
        "output": "YES",
        "explanation": "Evaluating the condition on (8,2,4) produces `YES`."
      },
      {
        "input": "-3 6 1",
        "output": "NO",
        "explanation": "Evaluating the condition on (-3,6,1) produces `NO`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "NO"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "YES"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
        "expectedOutput": "NO"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:conditionals-control-flow:sign-of-product",
    "slug": "sign-of-product",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Sign of Product",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, classify the sign of a*b.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "POSITIVE",
        "explanation": "Evaluating the condition on (3,5,7) produces `POSITIVE`."
      },
      {
        "input": "8 2 4",
        "output": "POSITIVE",
        "explanation": "Evaluating the condition on (8,2,4) produces `POSITIVE`."
      },
      {
        "input": "-3 6 1",
        "output": "NEGATIVE",
        "explanation": "Evaluating the condition on (-3,6,1) produces `NEGATIVE`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "POSITIVE"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "POSITIVE"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
        "expectedOutput": "NEGATIVE"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:conditionals-control-flow:inside-closed-range",
    "slug": "inside-closed-range",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Inside Closed Range",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, test whether a lies between b and c inclusive.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "NO",
        "explanation": "Evaluating the condition on (3,5,7) produces `NO`."
      },
      {
        "input": "8 2 4",
        "output": "NO",
        "explanation": "Evaluating the condition on (8,2,4) produces `NO`."
      },
      {
        "input": "-3 6 1",
        "output": "NO",
        "explanation": "Evaluating the condition on (-3,6,1) produces `NO`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "NO"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "NO"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
        "expectedOutput": "NO"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:conditionals-control-flow:three-way-compare",
    "slug": "three-way-compare",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Three Way Compare",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, compare a with b.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "LESS",
        "explanation": "Evaluating the condition on (3,5,7) produces `LESS`."
      },
      {
        "input": "8 2 4",
        "output": "GREATER",
        "explanation": "Evaluating the condition on (8,2,4) produces `GREATER`."
      },
      {
        "input": "-3 6 1",
        "output": "LESS",
        "explanation": "Evaluating the condition on (-3,6,1) produces `LESS`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "LESS"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "GREATER"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
        "expectedOutput": "LESS"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:conditionals-control-flow:parity-class",
    "slug": "parity-class",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Parity Class",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, classify a by parity.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "ODD",
        "explanation": "Evaluating the condition on (3,5,7) produces `ODD`."
      },
      {
        "input": "8 2 4",
        "output": "EVEN",
        "explanation": "Evaluating the condition on (8,2,4) produces `EVEN`."
      },
      {
        "input": "-3 6 1",
        "output": "ODD",
        "explanation": "Evaluating the condition on (-3,6,1) produces `ODD`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "ODD"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "EVEN"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
        "expectedOutput": "ODD"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:conditionals-control-flow:threshold-band",
    "slug": "threshold-band",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Threshold Band",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, print LOW if a<b, MID if b<=a<c, otherwise HIGH.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "LOW",
        "explanation": "Evaluating the condition on (3,5,7) produces `LOW`."
      },
      {
        "input": "8 2 4",
        "output": "HIGH",
        "explanation": "Evaluating the condition on (8,2,4) produces `HIGH`."
      },
      {
        "input": "-3 6 1",
        "output": "LOW",
        "explanation": "Evaluating the condition on (-3,6,1) produces `LOW`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "LOW"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "HIGH"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
        "expectedOutput": "LOW"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:conditionals-control-flow:triangle-validity",
    "slug": "triangle-validity",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Triangle Validity",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, test whether the three positive values can be triangle sides.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "YES",
        "explanation": "Evaluating the condition on (3,5,7) produces `YES`."
      },
      {
        "input": "8 2 4",
        "output": "NO",
        "explanation": "Evaluating the condition on (8,2,4) produces `NO`."
      },
      {
        "input": "-3 6 1",
        "output": "NO",
        "explanation": "Evaluating the condition on (-3,6,1) produces `NO`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "YES"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "NO"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
        "expectedOutput": "NO"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:conditionals-control-flow:equal-count",
    "slug": "equal-count",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Equal Count",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, print the largest multiplicity among the three values.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "1",
        "explanation": "Evaluating the condition on (3,5,7) produces `1`."
      },
      {
        "input": "8 2 4",
        "output": "1",
        "explanation": "Evaluating the condition on (8,2,4) produces `1`."
      },
      {
        "input": "-3 6 1",
        "output": "1",
        "explanation": "Evaluating the condition on (-3,6,1) produces `1`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
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
    "id": "learn:conditionals-control-flow:maximum-absolute",
    "slug": "maximum-absolute",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Maximum Absolute",
    "order": 11,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, print the value with greatest absolute magnitude, breaking ties by larger numeric value.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "7",
        "explanation": "Evaluating the condition on (3,5,7) produces `7`."
      },
      {
        "input": "8 2 4",
        "output": "8",
        "explanation": "Evaluating the condition on (8,2,4) produces `8`."
      },
      {
        "input": "-3 6 1",
        "output": "6",
        "explanation": "Evaluating the condition on (-3,6,1) produces `6`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
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
    "id": "learn:conditionals-control-flow:all-positive",
    "slug": "all-positive",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "All Positive",
    "order": 12,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, print YES only when all inputs are positive.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "YES",
        "explanation": "Evaluating the condition on (3,5,7) produces `YES`."
      },
      {
        "input": "8 2 4",
        "output": "YES",
        "explanation": "Evaluating the condition on (8,2,4) produces `YES`."
      },
      {
        "input": "-3 6 1",
        "output": "NO",
        "explanation": "Evaluating the condition on (-3,6,1) produces `NO`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "YES"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "YES"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
        "expectedOutput": "NO"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:conditionals-control-flow:exactly-one-negative",
    "slug": "exactly-one-negative",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Exactly One Negative",
    "order": 13,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, print YES exactly when one input is negative.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "NO",
        "explanation": "Evaluating the condition on (3,5,7) produces `NO`."
      },
      {
        "input": "8 2 4",
        "output": "NO",
        "explanation": "Evaluating the condition on (8,2,4) produces `NO`."
      },
      {
        "input": "-3 6 1",
        "output": "YES",
        "explanation": "Evaluating the condition on (-3,6,1) produces `YES`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "NO"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "NO"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
        "expectedOutput": "YES"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:conditionals-control-flow:majority-even",
    "slug": "majority-even",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Majority Even",
    "order": 14,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, print YES when at least two values are even.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "NO",
        "explanation": "Evaluating the condition on (3,5,7) produces `NO`."
      },
      {
        "input": "8 2 4",
        "output": "YES",
        "explanation": "Evaluating the condition on (8,2,4) produces `YES`."
      },
      {
        "input": "-3 6 1",
        "output": "NO",
        "explanation": "Evaluating the condition on (-3,6,1) produces `NO`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "NO"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "YES"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
        "expectedOutput": "NO"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:conditionals-control-flow:ordered-strictly-increasing",
    "slug": "ordered-strictly-increasing",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Ordered Strictly Increasing",
    "order": 15,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, print YES only when `a` is strictly less than `b` and `b` is strictly less than `c`; otherwise print NO.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "YES",
        "explanation": "Evaluating the condition on (3,5,7) produces `YES`."
      },
      {
        "input": "8 2 4",
        "output": "NO",
        "explanation": "Evaluating the condition on (8,2,4) produces `NO`."
      },
      {
        "input": "-3 6 1",
        "output": "NO",
        "explanation": "Evaluating the condition on (-3,6,1) produces `NO`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "YES"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "NO"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
        "expectedOutput": "NO"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:conditionals-control-flow:ordered-nondecreasing",
    "slug": "ordered-nondecreasing",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Ordered Nondecreasing",
    "order": 16,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, print YES when `a` is less than or equal to `b` and `b` is less than or equal to `c`; otherwise print NO.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "YES",
        "explanation": "Evaluating the condition on (3,5,7) produces `YES`."
      },
      {
        "input": "8 2 4",
        "output": "NO",
        "explanation": "Evaluating the condition on (8,2,4) produces `NO`."
      },
      {
        "input": "-3 6 1",
        "output": "NO",
        "explanation": "Evaluating the condition on (-3,6,1) produces `NO`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "YES"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "NO"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
        "expectedOutput": "NO"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:conditionals-control-flow:closest-to-zero",
    "slug": "closest-to-zero",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Closest to Zero",
    "order": 17,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, print the value closest to zero, breaking ties by smaller numeric value.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "3",
        "explanation": "Evaluating the condition on (3,5,7) produces `3`."
      },
      {
        "input": "8 2 4",
        "output": "2",
        "explanation": "Evaluating the condition on (8,2,4) produces `2`."
      },
      {
        "input": "-3 6 1",
        "output": "1",
        "explanation": "Evaluating the condition on (-3,6,1) produces `1`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
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
    "id": "learn:conditionals-control-flow:same-sign",
    "slug": "same-sign",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Same Sign",
    "order": 18,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, print YES when all three non-zero values have the same sign.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "YES",
        "explanation": "Evaluating the condition on (3,5,7) produces `YES`."
      },
      {
        "input": "8 2 4",
        "output": "YES",
        "explanation": "Evaluating the condition on (8,2,4) produces `YES`."
      },
      {
        "input": "-3 6 1",
        "output": "NO",
        "explanation": "Evaluating the condition on (-3,6,1) produces `NO`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "YES"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "YES"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
        "expectedOutput": "NO"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:conditionals-control-flow:between-other-two-strict",
    "slug": "between-other-two-strict",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Between Other Two Strict",
    "order": 19,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, print YES when a lies strictly between b and c.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "NO",
        "explanation": "Evaluating the condition on (3,5,7) produces `NO`."
      },
      {
        "input": "8 2 4",
        "output": "NO",
        "explanation": "Evaluating the condition on (8,2,4) produces `NO`."
      },
      {
        "input": "-3 6 1",
        "output": "NO",
        "explanation": "Evaluating the condition on (-3,6,1) produces `NO`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "NO"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "NO"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
        "expectedOutput": "NO"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:conditionals-control-flow:maximum-frequency-class",
    "slug": "maximum-frequency-class",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Maximum Frequency Class",
    "order": 20,
    "difficulty": "Easy",
    "problemStatement": "Given three integers `a`, `b`, and `c`, classify the triple as ALL, PAIR, or DISTINCT.",
    "inputFormat": "One line contains integers `a b c`.",
    "outputFormat": "Print the classification or value requested in the statement.",
    "constraints": "-10^9 <= a,b,c <= 10^9. Inputs satisfy any positivity/non-zero requirement explicitly stated.",
    "examples": [
      {
        "input": "3 5 7",
        "output": "DISTINCT",
        "explanation": "Evaluating the condition on (3,5,7) produces `DISTINCT`."
      },
      {
        "input": "8 2 4",
        "output": "DISTINCT",
        "explanation": "Evaluating the condition on (8,2,4) produces `DISTINCT`."
      },
      {
        "input": "-3 6 1",
        "output": "DISTINCT",
        "explanation": "Evaluating the condition on (-3,6,1) produces `DISTINCT`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5 7",
        "expectedOutput": "DISTINCT"
      },
      {
        "testIndex": 2,
        "input": "8 2 4",
        "expectedOutput": "DISTINCT"
      },
      {
        "testIndex": 3,
        "input": "-3 6 1",
        "expectedOutput": "DISTINCT"
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
