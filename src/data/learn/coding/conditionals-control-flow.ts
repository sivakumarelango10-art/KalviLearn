import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:conditionals-control-flow:middle-of-three",
    "slug": "middle-of-three",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Middle of Three",
    "order": 1,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:conditionals-control-flow:divisible-by-both",
    "slug": "divisible-by-both",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Divisible by Both",
    "order": 2,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:conditionals-control-flow:sign-of-product",
    "slug": "sign-of-product",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Sign of Product",
    "order": 3,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:conditionals-control-flow:inside-closed-range",
    "slug": "inside-closed-range",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Inside Closed Range",
    "order": 4,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:conditionals-control-flow:three-way-compare",
    "slug": "three-way-compare",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Three Way Compare",
    "order": 5,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:conditionals-control-flow:parity-class",
    "slug": "parity-class",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Parity Class",
    "order": 6,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:conditionals-control-flow:threshold-band",
    "slug": "threshold-band",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Threshold Band",
    "order": 7,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:conditionals-control-flow:triangle-validity",
    "slug": "triangle-validity",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Triangle Validity",
    "order": 8,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:conditionals-control-flow:equal-count",
    "slug": "equal-count",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Equal Count",
    "order": 9,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:conditionals-control-flow:all-positive",
    "slug": "all-positive",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "All Positive",
    "order": 10,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:conditionals-control-flow:exactly-one-negative",
    "slug": "exactly-one-negative",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Exactly One Negative",
    "order": 11,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:conditionals-control-flow:ordered-strictly-increasing",
    "slug": "ordered-strictly-increasing",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Ordered Strictly Increasing",
    "order": 12,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:conditionals-control-flow:closest-to-zero",
    "slug": "closest-to-zero",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Closest to Zero",
    "order": 13,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:conditionals-control-flow:maximum-frequency-class",
    "slug": "maximum-frequency-class",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Maximum Frequency Class",
    "order": 14,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:conditionals-control-flow:maximum-of-three",
    "bankId": "T03-Q01",
    "slug": "maximum-of-three",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Maximum of Three",
    "order": 15,
    "difficulty": "Easy",
    "problemStatement": "Return the greatest of a, b, and c.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "5",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Return the greatest of a, b, and c. Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "0",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Return the greatest of a, b, and c. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "output": "9",
        "explanation": "Compare a=9, b=4, c=1 (sorted: [1, 4, 9]). Return the greatest of a, b, and c. Therefore the expected JSON output is 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "expectedOutput": "9"
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
    "id": "learn:conditionals-control-flow:minimum-of-three",
    "bankId": "T03-Q02",
    "slug": "minimum-of-three",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Minimum of Three",
    "order": 16,
    "difficulty": "Easy",
    "problemStatement": "Return the least of a, b, and c.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "3",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Return the least of a, b, and c. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "0",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Return the least of a, b, and c. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "output": "1",
        "explanation": "Compare a=9, b=4, c=1 (sorted: [1, 4, 9]). Return the least of a, b, and c. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
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
    "id": "learn:conditionals-control-flow:median-of-three",
    "bankId": "T03-Q03",
    "slug": "median-of-three",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Median of Three",
    "order": 17,
    "difficulty": "Easy",
    "problemStatement": "Sort a, b, c and return the middle value.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "4",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Sort a, b, c and return the middle value. Therefore the expected JSON output is 4."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "0",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Sort a, b, c and return the middle value. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":1,\"b\":1,\"c\":2}",
        "output": "1",
        "explanation": "Compare a=1, b=1, c=2 (sorted: [1, 1, 2]). Sort a, b, c and return the middle value. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":1,\"b\":1,\"c\":2}",
        "expectedOutput": "1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
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
    "id": "learn:conditionals-control-flow:all-three-equal",
    "bankId": "T03-Q04",
    "slug": "all-three-equal",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "All Three Equal",
    "order": 18,
    "difficulty": "Easy",
    "problemStatement": "Return true exactly when a=b=c.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "false",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Return true exactly when a=b=c. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "true",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Return true exactly when a=b=c. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "output": "false",
        "explanation": "Compare a=9, b=4, c=1 (sorted: [1, 4, 9]). Return true exactly when a=b=c. Therefore the expected JSON output is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "expectedOutput": "false"
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
    "id": "learn:conditionals-control-flow:exactly-two-equal",
    "bankId": "T03-Q05",
    "slug": "exactly-two-equal",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Exactly Two Equal",
    "order": 19,
    "difficulty": "Easy",
    "problemStatement": "Return true if exactly two values are equal and the third differs.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "false",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Return true if exactly two values are equal and the third differs. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"a\":1,\"b\":1,\"c\":2}",
        "output": "true",
        "explanation": "Compare a=1, b=1, c=2 (sorted: [1, 1, 2]). Return true if exactly two values are equal and the third differs. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "false",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Return true if exactly two values are equal and the third differs. Therefore the expected JSON output is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":1,\"b\":1,\"c\":2}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "false"
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
    "id": "learn:conditionals-control-flow:strict-increasing-order",
    "bankId": "T03-Q06",
    "slug": "strict-increasing-order",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Strict Increasing Order",
    "order": 20,
    "difficulty": "Easy",
    "problemStatement": "Return true only when a < b < c.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "true",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Return true only when a < b < c. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "false",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Return true only when a < b < c. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "output": "false",
        "explanation": "Compare a=9, b=4, c=1 (sorted: [1, 4, 9]). Return true only when a < b < c. Therefore the expected JSON output is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "expectedOutput": "false"
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
    "id": "learn:conditionals-control-flow:nondecreasing-order",
    "bankId": "T03-Q07",
    "slug": "nondecreasing-order",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Nondecreasing Order",
    "order": 21,
    "difficulty": "Easy",
    "problemStatement": "Return true only when a ≤ b ≤ c.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "true",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Return true only when a ≤ b ≤ c. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "output": "false",
        "explanation": "Compare a=9, b=4, c=1 (sorted: [1, 4, 9]). Return true only when a ≤ b ≤ c. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "true",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Return true only when a ≤ b ≤ c. Therefore the expected JSON output is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
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
    "id": "learn:conditionals-control-flow:classify-sum-sign",
    "bankId": "T03-Q08",
    "slug": "classify-sum-sign",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Classify Sum Sign",
    "order": 22,
    "difficulty": "Medium",
    "problemStatement": "Return \"negative\", \"zero\", or \"positive\" according to a+b+c.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "positive",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Return \"negative\", \"zero\", or \"positive\" according to a+b+c. Therefore the expected JSON output is \"positive\"."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "zero",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Return \"negative\", \"zero\", or \"positive\" according to a+b+c. Therefore the expected JSON output is \"zero\"."
      },
      {
        "input": "{\"a\":-4,\"b\":-2,\"c\":-3}",
        "output": "negative",
        "explanation": "Compare a=-4, b=-2, c=-3 (sorted: [-4, -3, -2]). Return \"negative\", \"zero\", or \"positive\" according to a+b+c. Therefore the expected JSON output is \"negative\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "positive"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "zero"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":-4,\"b\":-2,\"c\":-3}",
        "expectedOutput": "negative"
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
    "id": "learn:conditionals-control-flow:largest-absolute-value",
    "bankId": "T03-Q09",
    "slug": "largest-absolute-value",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Largest Absolute Value",
    "order": 23,
    "difficulty": "Medium",
    "problemStatement": "Return the largest of |a|, |b| and |c|.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "5",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Return the largest of |a|, |b| and |c|. Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "0",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Return the largest of |a|, |b| and |c|. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "output": "9",
        "explanation": "Compare a=9, b=4, c=1 (sorted: [1, 4, 9]). Return the largest of |a|, |b| and |c|. Therefore the expected JSON output is 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "expectedOutput": "9"
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
    "id": "learn:conditionals-control-flow:count-positive-numbers",
    "bankId": "T03-Q10",
    "slug": "count-positive-numbers",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Count Positive Numbers",
    "order": 24,
    "difficulty": "Medium",
    "problemStatement": "Count the values strictly greater than zero.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "3",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Count the values strictly greater than zero. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "0",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Count the values strictly greater than zero. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":-3,\"b\":2,\"c\":5}",
        "output": "2",
        "explanation": "Compare a=-3, b=2, c=5 (sorted: [-3, 2, 5]). Count the values strictly greater than zero. Therefore the expected JSON output is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":-3,\"b\":2,\"c\":5}",
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
    "id": "learn:conditionals-control-flow:count-even-numbers",
    "bankId": "T03-Q11",
    "slug": "count-even-numbers",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Count Even Numbers",
    "order": 25,
    "difficulty": "Medium",
    "problemStatement": "Count how many among a, b, c are even.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "1",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Count how many among a, b, c are even. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "3",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Count how many among a, b, c are even. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"a\":5,\"b\":5,\"c\":5}",
        "output": "0",
        "explanation": "Compare a=5, b=5, c=5 (sorted: [5, 5, 5]). Count how many among a, b, c are even. Therefore the expected JSON output is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":5,\"b\":5,\"c\":5}",
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
    "id": "learn:conditionals-control-flow:triangle-possibility",
    "bankId": "T03-Q12",
    "slug": "triangle-possibility",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Triangle Possibility",
    "order": 26,
    "difficulty": "Medium",
    "problemStatement": "Treat a,b,c as side lengths; return true iff all are positive and form a nondegenerate triangle.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "true",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Treat a,b,c as side lengths; return true iff all are positive and form a nondegenerate triangle. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "false",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Treat a,b,c as side lengths; return true iff all are positive and form a nondegenerate triangle. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "output": "false",
        "explanation": "Compare a=9, b=4, c=1 (sorted: [1, 4, 9]). Treat a,b,c as side lengths; return true iff all are positive and form a nondegenerate triangle. Therefore the expected JSON output is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "expectedOutput": "false"
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
    "id": "learn:conditionals-control-flow:right-triangle-test",
    "bankId": "T03-Q13",
    "slug": "right-triangle-test",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Right Triangle Test",
    "order": 27,
    "difficulty": "Medium",
    "problemStatement": "Return true iff the three positive integer sides can form a right triangle (order arbitrary).",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "true",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Return true iff the three positive integer sides can form a right triangle (order arbitrary). Therefore the expected JSON output is true."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "false",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Return true iff the three positive integer sides can form a right triangle (order arbitrary). Therefore the expected JSON output is false."
      },
      {
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "output": "false",
        "explanation": "Compare a=9, b=4, c=1 (sorted: [1, 4, 9]). Return true iff the three positive integer sides can form a right triangle (order arbitrary). Therefore the expected JSON output is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "expectedOutput": "false"
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
    "id": "learn:conditionals-control-flow:range-inclusive-check",
    "bankId": "T03-Q14",
    "slug": "range-inclusive-check",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Range Inclusive Check",
    "order": 28,
    "difficulty": "Medium",
    "problemStatement": "Return true iff a lies in the closed interval between b and c, independent of endpoint order.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "false",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Return true iff a lies in the closed interval between b and c, independent of endpoint order. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "true",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Return true iff a lies in the closed interval between b and c, independent of endpoint order. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "output": "false",
        "explanation": "Compare a=9, b=4, c=1 (sorted: [1, 4, 9]). Return true iff a lies in the closed interval between b and c, independent of endpoint order. Therefore the expected JSON output is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "expectedOutput": "false"
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
    "id": "learn:conditionals-control-flow:parity-majority",
    "bankId": "T03-Q15",
    "slug": "parity-majority",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Parity Majority",
    "order": 29,
    "difficulty": "Medium",
    "problemStatement": "Return \"even\" if at least two values are even; otherwise return \"odd\".",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "odd",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Return \"even\" if at least two values are even; otherwise return \"odd\". Therefore the expected JSON output is \"odd\"."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "even",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Return \"even\" if at least two values are even; otherwise return \"odd\". Therefore the expected JSON output is \"even\"."
      },
      {
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "output": "odd",
        "explanation": "Compare a=9, b=4, c=1 (sorted: [1, 4, 9]). Return \"even\" if at least two values are even; otherwise return \"odd\". Therefore the expected JSON output is \"odd\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "odd"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "even"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "expectedOutput": "odd"
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
    "id": "learn:conditionals-control-flow:choose-nearest-to-target",
    "bankId": "T03-Q16",
    "slug": "choose-nearest-to-target",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Choose Nearest to Target",
    "order": 30,
    "difficulty": "Hard",
    "problemStatement": "Return whichever of a and b is closer to c; break ties by choosing the smaller of a and b.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "4",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Return whichever of a and b is closer to c; break ties by choosing the smaller of a and b. Therefore the expected JSON output is 4."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "0",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Return whichever of a and b is closer to c; break ties by choosing the smaller of a and b. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":1,\"b\":1,\"c\":2}",
        "output": "1",
        "explanation": "Compare a=1, b=1, c=2 (sorted: [1, 1, 2]). Return whichever of a and b is closer to c; break ties by choosing the smaller of a and b. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":1,\"b\":1,\"c\":2}",
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
    "id": "learn:conditionals-control-flow:basic-triangle-classification",
    "bankId": "T03-Q17",
    "slug": "basic-triangle-classification",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Basic Triangle Classification",
    "order": 31,
    "difficulty": "Hard",
    "problemStatement": "Return \"invalid\" unless sides form a positive triangle; otherwise return \"equilateral\", \"isosceles\", or \"scalene\".",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "scalene",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Return \"invalid\" unless sides form a positive triangle; otherwise return \"equilateral\", \"isosceles\", or \"scalene\". Therefore the expected JSON output is \"scalene\"."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "invalid",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Return \"invalid\" unless sides form a positive triangle; otherwise return \"equilateral\", \"isosceles\", or \"scalene\". Therefore the expected JSON output is \"invalid\"."
      },
      {
        "input": "{\"a\":5,\"b\":5,\"c\":5}",
        "output": "equilateral",
        "explanation": "Compare a=5, b=5, c=5 (sorted: [5, 5, 5]). Return \"invalid\" unless sides form a positive triangle; otherwise return \"equilateral\", \"isosceles\", or \"scalene\". Therefore the expected JSON output is \"equilateral\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "scalene"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "invalid"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":5,\"b\":5,\"c\":5}",
        "expectedOutput": "equilateral"
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
    "id": "learn:conditionals-control-flow:select-first-maximum-variable",
    "bankId": "T03-Q18",
    "slug": "select-first-maximum-variable",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Select First Maximum Variable",
    "order": 32,
    "difficulty": "Hard",
    "problemStatement": "Return \"a\", \"b\", or \"c\" naming the first variable (a before b before c) holding the maximum value.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "c",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Return \"a\", \"b\", or \"c\" naming the first variable (a before b before c) holding the maximum value. Therefore the expected JSON output is \"c\"."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "a",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Return \"a\", \"b\", or \"c\" naming the first variable (a before b before c) holding the maximum value. Therefore the expected JSON output is \"a\"."
      },
      {
        "input": "{\"a\":-4,\"b\":-2,\"c\":-3}",
        "output": "b",
        "explanation": "Compare a=-4, b=-2, c=-3 (sorted: [-4, -3, -2]). Return \"a\", \"b\", or \"c\" naming the first variable (a before b before c) holding the maximum value. Therefore the expected JSON output is \"b\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "c"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "a"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":-4,\"b\":-2,\"c\":-3}",
        "expectedOutput": "b"
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
    "id": "learn:conditionals-control-flow:all-values-same-sign",
    "bankId": "T03-Q19",
    "slug": "all-values-same-sign",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "All Values Same Sign",
    "order": 33,
    "difficulty": "Hard",
    "problemStatement": "Return true only if all three numbers are strictly positive or all three strictly negative.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "true",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Return true only if all three numbers are strictly positive or all three strictly negative. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "false",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Return true only if all three numbers are strictly positive or all three strictly negative. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
        "output": "true",
        "explanation": "Compare a=9, b=4, c=1 (sorted: [1, 4, 9]). Return true only if all three numbers are strictly positive or all three strictly negative. Therefore the expected JSON output is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":9,\"b\":4,\"c\":1}",
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
    "id": "learn:conditionals-control-flow:clamp-to-dynamic-bounds",
    "bankId": "T03-Q20",
    "slug": "clamp-to-dynamic-bounds",
    "topicId": "conditionals-control-flow",
    "topicSlug": "conditionals-control-flow",
    "topicTitle": "Conditionals / Control Flow",
    "title": "Clamp to Dynamic Bounds",
    "order": 34,
    "difficulty": "Hard",
    "problemStatement": "Clamp a into the closed interval with endpoints b and c.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer, \"c\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b,c ≤ 100; use exact comparisons and the declared tie-break rules.",
    "examples": [
      {
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "output": "4",
        "explanation": "Compare a=3, b=4, c=5 (sorted: [3, 4, 5]). Clamp a into the closed interval with endpoints b and c. Therefore the expected JSON output is 4."
      },
      {
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "output": "0",
        "explanation": "Compare a=0, b=0, c=0 (sorted: [0, 0, 0]). Clamp a into the closed interval with endpoints b and c. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":1,\"b\":1,\"c\":2}",
        "output": "1",
        "explanation": "Compare a=1, b=1, c=2 (sorted: [1, 1, 2]). Clamp a into the closed interval with endpoints b and c. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":3,\"b\":4,\"c\":5}",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":0,\"c\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":1,\"b\":1,\"c\":2}",
        "expectedOutput": "1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
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
