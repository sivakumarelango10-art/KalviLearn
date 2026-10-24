import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:arrays-1d-lists:array-sum-even-indices-raw-1",
    "slug": "array-sum-even-indices-raw-1",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Even Indices / Raw #1",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **raw**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [3, 6, -5]; their sum is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "11",
        "explanation": "Selected transformed values are [5, -3, 9]; their sum is 11."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "10",
        "explanation": "Selected transformed values are [2, 7, 1]; their sum is 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "11"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-even-indices-raw-2",
    "slug": "array-count-even-indices-raw-2",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Even Indices / Raw #2",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **raw**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [3, 6, -5]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [5, -3, 9]; their count is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "3",
        "explanation": "Selected transformed values are [2, 7, 1]; their count is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-even-indices-raw-3",
    "slug": "array-maximum-even-indices-raw-3",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Even Indices / Raw #3",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **raw**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "6",
        "explanation": "Selected transformed values are [3, 6, -5]; their maximum is 6."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [5, -3, 9]; their maximum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "7",
        "explanation": "Selected transformed values are [2, 7, 1]; their maximum is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-even-indices-raw-4",
    "slug": "array-minimum-even-indices-raw-4",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Even Indices / Raw #4",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **raw**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-5",
        "explanation": "Selected transformed values are [3, 6, -5]; their minimum is -5."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-3",
        "explanation": "Selected transformed values are [5, -3, 9]; their minimum is -3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [2, 7, 1]; their minimum is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-even-indices-raw-5",
    "slug": "array-xor-even-indices-raw-5",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Even Indices / Raw #5",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **raw**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-2",
        "explanation": "Selected transformed values are [3, 6, -5]; their xor is -2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-15",
        "explanation": "Selected transformed values are [5, -3, 9]; their xor is -15."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [2, 7, 1]; their xor is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-15"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-even-indices-absolute-6",
    "slug": "array-sum-even-indices-absolute-6",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Even Indices / Absolute #6",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **absolute**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "14",
        "explanation": "Selected transformed values are [3, 6, 5]; their sum is 14."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "17",
        "explanation": "Selected transformed values are [5, 3, 9]; their sum is 17."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "10",
        "explanation": "Selected transformed values are [2, 7, 1]; their sum is 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "14"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "17"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-even-indices-absolute-7",
    "slug": "array-count-even-indices-absolute-7",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Even Indices / Absolute #7",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **absolute**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [3, 6, 5]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [5, 3, 9]; their count is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "3",
        "explanation": "Selected transformed values are [2, 7, 1]; their count is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-even-indices-absolute-8",
    "slug": "array-maximum-even-indices-absolute-8",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Even Indices / Absolute #8",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **absolute**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "6",
        "explanation": "Selected transformed values are [3, 6, 5]; their maximum is 6."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [5, 3, 9]; their maximum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "7",
        "explanation": "Selected transformed values are [2, 7, 1]; their maximum is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-even-indices-absolute-9",
    "slug": "array-minimum-even-indices-absolute-9",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Even Indices / Absolute #9",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **absolute**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [3, 6, 5]; their minimum is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [5, 3, 9]; their minimum is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [2, 7, 1]; their minimum is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-even-indices-absolute-10",
    "slug": "array-xor-even-indices-absolute-10",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Even Indices / Absolute #10",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **absolute**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "0",
        "explanation": "Selected transformed values are [3, 6, 5]; their xor is 0."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "15",
        "explanation": "Selected transformed values are [5, 3, 9]; their xor is 15."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [2, 7, 1]; their xor is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-even-indices-square-11",
    "slug": "array-sum-even-indices-square-11",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Even Indices / Square #11",
    "order": 11,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **square**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "70",
        "explanation": "Selected transformed values are [9, 36, 25]; their sum is 70."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "115",
        "explanation": "Selected transformed values are [25, 9, 81]; their sum is 115."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "54",
        "explanation": "Selected transformed values are [4, 49, 1]; their sum is 54."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "70"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "115"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "54"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-count-even-indices-square-12",
    "slug": "array-count-even-indices-square-12",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Even Indices / Square #12",
    "order": 12,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **square**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [9, 36, 25]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [25, 9, 81]; their count is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "3",
        "explanation": "Selected transformed values are [4, 49, 1]; their count is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-even-indices-square-13",
    "slug": "array-maximum-even-indices-square-13",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Even Indices / Square #13",
    "order": 13,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **square**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "36",
        "explanation": "Selected transformed values are [9, 36, 25]; their maximum is 36."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "81",
        "explanation": "Selected transformed values are [25, 9, 81]; their maximum is 81."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "49",
        "explanation": "Selected transformed values are [4, 49, 1]; their maximum is 49."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "36"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "81"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-even-indices-square-14",
    "slug": "array-minimum-even-indices-square-14",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Even Indices / Square #14",
    "order": 14,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **square**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "9",
        "explanation": "Selected transformed values are [9, 36, 25]; their minimum is 9."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [25, 9, 81]; their minimum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [4, 49, 1]; their minimum is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-even-indices-square-15",
    "slug": "array-xor-even-indices-square-15",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Even Indices / Square #15",
    "order": 15,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **square**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "52",
        "explanation": "Selected transformed values are [9, 36, 25]; their xor is 52."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "65",
        "explanation": "Selected transformed values are [25, 9, 81]; their xor is 65."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "52",
        "explanation": "Selected transformed values are [4, 49, 1]; their xor is 52."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "52"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "65"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "52"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-even-indices-value-plus-index-16",
    "slug": "array-sum-even-indices-value-plus-index-16",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Even Indices / Value Plus Index #16",
    "order": 16,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **value plus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "10",
        "explanation": "Selected transformed values are [3, 8, -1]; their sum is 10."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "17",
        "explanation": "Selected transformed values are [5, -1, 13]; their sum is 17."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "16",
        "explanation": "Selected transformed values are [2, 9, 5]; their sum is 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "17"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-even-indices-value-plus-index-17",
    "slug": "array-count-even-indices-value-plus-index-17",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Even Indices / Value Plus Index #17",
    "order": 17,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **value plus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [3, 8, -1]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [5, -1, 13]; their count is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "3",
        "explanation": "Selected transformed values are [2, 9, 5]; their count is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-even-indices-value-plus-index-18",
    "slug": "array-maximum-even-indices-value-plus-index-18",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Even Indices / Value Plus Index #18",
    "order": 18,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **value plus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "8",
        "explanation": "Selected transformed values are [3, 8, -1]; their maximum is 8."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "13",
        "explanation": "Selected transformed values are [5, -1, 13]; their maximum is 13."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "9",
        "explanation": "Selected transformed values are [2, 9, 5]; their maximum is 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "13"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-even-indices-value-plus-index-19",
    "slug": "array-minimum-even-indices-value-plus-index-19",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Even Indices / Value Plus Index #19",
    "order": 19,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **value plus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-1",
        "explanation": "Selected transformed values are [3, 8, -1]; their minimum is -1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-1",
        "explanation": "Selected transformed values are [5, -1, 13]; their minimum is -1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [2, 9, 5]; their minimum is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-even-indices-value-plus-index-20",
    "slug": "array-xor-even-indices-value-plus-index-20",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Even Indices / Value Plus Index #20",
    "order": 20,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **value plus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-12",
        "explanation": "Selected transformed values are [3, 8, -1]; their xor is -12."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-9",
        "explanation": "Selected transformed values are [5, -1, 13]; their xor is -9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "14",
        "explanation": "Selected transformed values are [2, 9, 5]; their xor is 14."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-12"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-even-indices-value-minus-index-21",
    "slug": "array-sum-even-indices-value-minus-index-21",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Even Indices / Value Minus Index #21",
    "order": 21,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **value minus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-2",
        "explanation": "Selected transformed values are [3, 4, -9]; their sum is -2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, -5, 5]; their sum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [2, 5, -3]; their sum is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-even-indices-value-minus-index-22",
    "slug": "array-count-even-indices-value-minus-index-22",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Even Indices / Value Minus Index #22",
    "order": 22,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **value minus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [3, 4, -9]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [5, -5, 5]; their count is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "3",
        "explanation": "Selected transformed values are [2, 5, -3]; their count is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-even-indices-value-minus-index-23",
    "slug": "array-maximum-even-indices-value-minus-index-23",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Even Indices / Value Minus Index #23",
    "order": 23,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **value minus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [3, 4, -9]; their maximum is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, -5, 5]; their maximum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "5",
        "explanation": "Selected transformed values are [2, 5, -3]; their maximum is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-even-indices-value-minus-index-24",
    "slug": "array-minimum-even-indices-value-minus-index-24",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Even Indices / Value Minus Index #24",
    "order": 24,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **value minus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-9",
        "explanation": "Selected transformed values are [3, 4, -9]; their minimum is -9."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-5",
        "explanation": "Selected transformed values are [5, -5, 5]; their minimum is -5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-3",
        "explanation": "Selected transformed values are [2, 5, -3]; their minimum is -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-9"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-even-indices-value-minus-index-25",
    "slug": "array-xor-even-indices-value-minus-index-25",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Even Indices / Value Minus Index #25",
    "order": 25,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even indices**. Transform each selected value using **value minus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-16",
        "explanation": "Selected transformed values are [3, 4, -9]; their xor is -16."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-5",
        "explanation": "Selected transformed values are [5, -5, 5]; their xor is -5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-6",
        "explanation": "Selected transformed values are [2, 5, -3]; their xor is -6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-16"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-6"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-odd-indices-raw-26",
    "slug": "array-sum-odd-indices-raw-26",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Odd Indices / Raw #26",
    "order": 26,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **raw**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [-2, 1, 4]; their sum is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 0]; their sum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [-4, 8]; their sum is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-odd-indices-raw-27",
    "slug": "array-count-odd-indices-raw-27",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Odd Indices / Raw #27",
    "order": 27,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **raw**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [-2, 1, 4]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "2",
        "explanation": "Selected transformed values are [5, 0]; their count is 2."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [-4, 8]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-odd-indices-raw-28",
    "slug": "array-maximum-odd-indices-raw-28",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Odd Indices / Raw #28",
    "order": 28,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **raw**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [-2, 1, 4]; their maximum is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 0]; their maximum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "8",
        "explanation": "Selected transformed values are [-4, 8]; their maximum is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-odd-indices-raw-29",
    "slug": "array-minimum-odd-indices-raw-29",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Odd Indices / Raw #29",
    "order": 29,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **raw**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-2",
        "explanation": "Selected transformed values are [-2, 1, 4]; their minimum is -2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [5, 0]; their minimum is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-4",
        "explanation": "Selected transformed values are [-4, 8]; their minimum is -4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-odd-indices-raw-30",
    "slug": "array-xor-odd-indices-raw-30",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Odd Indices / Raw #30",
    "order": 30,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **raw**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-5",
        "explanation": "Selected transformed values are [-2, 1, 4]; their xor is -5."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 0]; their xor is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-12",
        "explanation": "Selected transformed values are [-4, 8]; their xor is -12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-12"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-odd-indices-absolute-31",
    "slug": "array-sum-odd-indices-absolute-31",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Odd Indices / Absolute #31",
    "order": 31,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **absolute**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "7",
        "explanation": "Selected transformed values are [2, 1, 4]; their sum is 7."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 0]; their sum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "12",
        "explanation": "Selected transformed values are [4, 8]; their sum is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-odd-indices-absolute-32",
    "slug": "array-count-odd-indices-absolute-32",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Odd Indices / Absolute #32",
    "order": 32,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **absolute**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [2, 1, 4]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "2",
        "explanation": "Selected transformed values are [5, 0]; their count is 2."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [4, 8]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-odd-indices-absolute-33",
    "slug": "array-maximum-odd-indices-absolute-33",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Odd Indices / Absolute #33",
    "order": 33,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **absolute**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [2, 1, 4]; their maximum is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 0]; their maximum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "8",
        "explanation": "Selected transformed values are [4, 8]; their maximum is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-odd-indices-absolute-34",
    "slug": "array-minimum-odd-indices-absolute-34",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Odd Indices / Absolute #34",
    "order": 34,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **absolute**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "1",
        "explanation": "Selected transformed values are [2, 1, 4]; their minimum is 1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [5, 0]; their minimum is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [4, 8]; their minimum is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-odd-indices-absolute-35",
    "slug": "array-xor-odd-indices-absolute-35",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Odd Indices / Absolute #35",
    "order": 35,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **absolute**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "7",
        "explanation": "Selected transformed values are [2, 1, 4]; their xor is 7."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 0]; their xor is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "12",
        "explanation": "Selected transformed values are [4, 8]; their xor is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-odd-indices-square-36",
    "slug": "array-sum-odd-indices-square-36",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Odd Indices / Square #36",
    "order": 36,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **square**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "21",
        "explanation": "Selected transformed values are [4, 1, 16]; their sum is 21."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "25",
        "explanation": "Selected transformed values are [25, 0]; their sum is 25."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "80",
        "explanation": "Selected transformed values are [16, 64]; their sum is 80."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "25"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "80"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-count-odd-indices-square-37",
    "slug": "array-count-odd-indices-square-37",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Odd Indices / Square #37",
    "order": 37,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **square**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [4, 1, 16]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "2",
        "explanation": "Selected transformed values are [25, 0]; their count is 2."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [16, 64]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-odd-indices-square-38",
    "slug": "array-maximum-odd-indices-square-38",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Odd Indices / Square #38",
    "order": 38,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **square**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "16",
        "explanation": "Selected transformed values are [4, 1, 16]; their maximum is 16."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "25",
        "explanation": "Selected transformed values are [25, 0]; their maximum is 25."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "64",
        "explanation": "Selected transformed values are [16, 64]; their maximum is 64."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "16"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "25"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "64"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-odd-indices-square-39",
    "slug": "array-minimum-odd-indices-square-39",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Odd Indices / Square #39",
    "order": 39,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **square**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "1",
        "explanation": "Selected transformed values are [4, 1, 16]; their minimum is 1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [25, 0]; their minimum is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "16",
        "explanation": "Selected transformed values are [16, 64]; their minimum is 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-odd-indices-square-40",
    "slug": "array-xor-odd-indices-square-40",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Odd Indices / Square #40",
    "order": 40,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **square**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "21",
        "explanation": "Selected transformed values are [4, 1, 16]; their xor is 21."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "25",
        "explanation": "Selected transformed values are [25, 0]; their xor is 25."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "80",
        "explanation": "Selected transformed values are [16, 64]; their xor is 80."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "25"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "80"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-odd-indices-value-plus-index-41",
    "slug": "array-sum-odd-indices-value-plus-index-41",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Odd Indices / Value Plus Index #41",
    "order": 41,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **value plus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "12",
        "explanation": "Selected transformed values are [-1, 4, 9]; their sum is 12."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [6, 3]; their sum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "8",
        "explanation": "Selected transformed values are [-3, 11]; their sum is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "12"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-odd-indices-value-plus-index-42",
    "slug": "array-count-odd-indices-value-plus-index-42",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Odd Indices / Value Plus Index #42",
    "order": 42,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **value plus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [-1, 4, 9]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "2",
        "explanation": "Selected transformed values are [6, 3]; their count is 2."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [-3, 11]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-odd-indices-value-plus-index-43",
    "slug": "array-maximum-odd-indices-value-plus-index-43",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Odd Indices / Value Plus Index #43",
    "order": 43,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **value plus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "9",
        "explanation": "Selected transformed values are [-1, 4, 9]; their maximum is 9."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "6",
        "explanation": "Selected transformed values are [6, 3]; their maximum is 6."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "11",
        "explanation": "Selected transformed values are [-3, 11]; their maximum is 11."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "11"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-odd-indices-value-plus-index-44",
    "slug": "array-minimum-odd-indices-value-plus-index-44",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Odd Indices / Value Plus Index #44",
    "order": 44,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **value plus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-1",
        "explanation": "Selected transformed values are [-1, 4, 9]; their minimum is -1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [6, 3]; their minimum is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-3",
        "explanation": "Selected transformed values are [-3, 11]; their minimum is -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-odd-indices-value-plus-index-45",
    "slug": "array-xor-odd-indices-value-plus-index-45",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Odd Indices / Value Plus Index #45",
    "order": 45,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **value plus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-14",
        "explanation": "Selected transformed values are [-1, 4, 9]; their xor is -14."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [6, 3]; their xor is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-10",
        "explanation": "Selected transformed values are [-3, 11]; their xor is -10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-14"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-10"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-odd-indices-value-minus-index-46",
    "slug": "array-sum-odd-indices-value-minus-index-46",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Odd Indices / Value Minus Index #46",
    "order": 46,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **value minus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-6",
        "explanation": "Selected transformed values are [-3, -2, -1]; their sum is -6."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [4, -3]; their sum is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "0",
        "explanation": "Selected transformed values are [-5, 5]; their sum is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-6"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-odd-indices-value-minus-index-47",
    "slug": "array-count-odd-indices-value-minus-index-47",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Odd Indices / Value Minus Index #47",
    "order": 47,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **value minus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [-3, -2, -1]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "2",
        "explanation": "Selected transformed values are [4, -3]; their count is 2."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [-5, 5]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-odd-indices-value-minus-index-48",
    "slug": "array-maximum-odd-indices-value-minus-index-48",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Odd Indices / Value Minus Index #48",
    "order": 48,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **value minus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-1",
        "explanation": "Selected transformed values are [-3, -2, -1]; their maximum is -1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "4",
        "explanation": "Selected transformed values are [4, -3]; their maximum is 4."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "5",
        "explanation": "Selected transformed values are [-5, 5]; their maximum is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-odd-indices-value-minus-index-49",
    "slug": "array-minimum-odd-indices-value-minus-index-49",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Odd Indices / Value Minus Index #49",
    "order": 49,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **value minus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-3",
        "explanation": "Selected transformed values are [-3, -2, -1]; their minimum is -3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-3",
        "explanation": "Selected transformed values are [4, -3]; their minimum is -3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-5",
        "explanation": "Selected transformed values are [-5, 5]; their minimum is -5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-odd-indices-value-minus-index-50",
    "slug": "array-xor-odd-indices-value-minus-index-50",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Odd Indices / Value Minus Index #50",
    "order": 50,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd indices**. Transform each selected value using **value minus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-4",
        "explanation": "Selected transformed values are [-3, -2, -1]; their xor is -4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-7",
        "explanation": "Selected transformed values are [4, -3]; their xor is -7."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-2",
        "explanation": "Selected transformed values are [-5, 5]; their xor is -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-7"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-positive-values-raw-51",
    "slug": "array-sum-positive-values-raw-51",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Positive Values / Raw #51",
    "order": 51,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **raw**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "14",
        "explanation": "Selected transformed values are [3, 6, 1, 4]; their sum is 14."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "19",
        "explanation": "Selected transformed values are [5, 5, 9]; their sum is 19."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "18",
        "explanation": "Selected transformed values are [2, 7, 8, 1]; their sum is 18."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "14"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "19"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-positive-values-raw-52",
    "slug": "array-count-positive-values-raw-52",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Positive Values / Raw #52",
    "order": 52,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **raw**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [3, 6, 1, 4]; their count is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [5, 5, 9]; their count is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [2, 7, 8, 1]; their count is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-maximum-positive-values-raw-53",
    "slug": "array-maximum-positive-values-raw-53",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Positive Values / Raw #53",
    "order": 53,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **raw**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "6",
        "explanation": "Selected transformed values are [3, 6, 1, 4]; their maximum is 6."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [5, 5, 9]; their maximum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "8",
        "explanation": "Selected transformed values are [2, 7, 8, 1]; their maximum is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-positive-values-raw-54",
    "slug": "array-minimum-positive-values-raw-54",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Positive Values / Raw #54",
    "order": 54,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **raw**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "1",
        "explanation": "Selected transformed values are [3, 6, 1, 4]; their minimum is 1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 5, 9]; their minimum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [2, 7, 8, 1]; their minimum is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-positive-values-raw-55",
    "slug": "array-xor-positive-values-raw-55",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Positive Values / Raw #55",
    "order": 55,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **raw**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "0",
        "explanation": "Selected transformed values are [3, 6, 1, 4]; their xor is 0."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [5, 5, 9]; their xor is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "12",
        "explanation": "Selected transformed values are [2, 7, 8, 1]; their xor is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-positive-values-absolute-56",
    "slug": "array-sum-positive-values-absolute-56",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Positive Values / Absolute #56",
    "order": 56,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **absolute**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "14",
        "explanation": "Selected transformed values are [3, 6, 1, 4]; their sum is 14."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "19",
        "explanation": "Selected transformed values are [5, 5, 9]; their sum is 19."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "18",
        "explanation": "Selected transformed values are [2, 7, 8, 1]; their sum is 18."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "14"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "19"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-positive-values-absolute-57",
    "slug": "array-count-positive-values-absolute-57",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Positive Values / Absolute #57",
    "order": 57,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **absolute**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [3, 6, 1, 4]; their count is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [5, 5, 9]; their count is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [2, 7, 8, 1]; their count is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-maximum-positive-values-absolute-58",
    "slug": "array-maximum-positive-values-absolute-58",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Positive Values / Absolute #58",
    "order": 58,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **absolute**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "6",
        "explanation": "Selected transformed values are [3, 6, 1, 4]; their maximum is 6."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [5, 5, 9]; their maximum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "8",
        "explanation": "Selected transformed values are [2, 7, 8, 1]; their maximum is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-positive-values-absolute-59",
    "slug": "array-minimum-positive-values-absolute-59",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Positive Values / Absolute #59",
    "order": 59,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **absolute**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "1",
        "explanation": "Selected transformed values are [3, 6, 1, 4]; their minimum is 1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 5, 9]; their minimum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [2, 7, 8, 1]; their minimum is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-positive-values-absolute-60",
    "slug": "array-xor-positive-values-absolute-60",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Positive Values / Absolute #60",
    "order": 60,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **absolute**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "0",
        "explanation": "Selected transformed values are [3, 6, 1, 4]; their xor is 0."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [5, 5, 9]; their xor is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "12",
        "explanation": "Selected transformed values are [2, 7, 8, 1]; their xor is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-positive-values-square-61",
    "slug": "array-sum-positive-values-square-61",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Positive Values / Square #61",
    "order": 61,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **square**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "62",
        "explanation": "Selected transformed values are [9, 36, 1, 16]; their sum is 62."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "131",
        "explanation": "Selected transformed values are [25, 25, 81]; their sum is 131."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "118",
        "explanation": "Selected transformed values are [4, 49, 64, 1]; their sum is 118."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "62"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "131"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "118"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-count-positive-values-square-62",
    "slug": "array-count-positive-values-square-62",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Positive Values / Square #62",
    "order": 62,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **square**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [9, 36, 1, 16]; their count is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [25, 25, 81]; their count is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [4, 49, 64, 1]; their count is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-maximum-positive-values-square-63",
    "slug": "array-maximum-positive-values-square-63",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Positive Values / Square #63",
    "order": 63,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **square**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "36",
        "explanation": "Selected transformed values are [9, 36, 1, 16]; their maximum is 36."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "81",
        "explanation": "Selected transformed values are [25, 25, 81]; their maximum is 81."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "64",
        "explanation": "Selected transformed values are [4, 49, 64, 1]; their maximum is 64."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "36"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "81"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "64"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-positive-values-square-64",
    "slug": "array-minimum-positive-values-square-64",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Positive Values / Square #64",
    "order": 64,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **square**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "1",
        "explanation": "Selected transformed values are [9, 36, 1, 16]; their minimum is 1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "25",
        "explanation": "Selected transformed values are [25, 25, 81]; their minimum is 25."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [4, 49, 64, 1]; their minimum is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "25"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-positive-values-square-65",
    "slug": "array-xor-positive-values-square-65",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Positive Values / Square #65",
    "order": 65,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **square**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "60",
        "explanation": "Selected transformed values are [9, 36, 1, 16]; their xor is 60."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "81",
        "explanation": "Selected transformed values are [25, 25, 81]; their xor is 81."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "116",
        "explanation": "Selected transformed values are [4, 49, 64, 1]; their xor is 116."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "60"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "81"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "116"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-positive-values-value-plus-index-66",
    "slug": "array-sum-positive-values-value-plus-index-66",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Positive Values / Value Plus Index #66",
    "order": 66,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **value plus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "24",
        "explanation": "Selected transformed values are [3, 8, 4, 9]; their sum is 24."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "24",
        "explanation": "Selected transformed values are [5, 6, 13]; their sum is 24."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "27",
        "explanation": "Selected transformed values are [2, 9, 11, 5]; their sum is 27."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "24"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "24"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "27"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-count-positive-values-value-plus-index-67",
    "slug": "array-count-positive-values-value-plus-index-67",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Positive Values / Value Plus Index #67",
    "order": 67,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **value plus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [3, 8, 4, 9]; their count is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [5, 6, 13]; their count is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [2, 9, 11, 5]; their count is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-maximum-positive-values-value-plus-index-68",
    "slug": "array-maximum-positive-values-value-plus-index-68",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Positive Values / Value Plus Index #68",
    "order": 68,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **value plus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "9",
        "explanation": "Selected transformed values are [3, 8, 4, 9]; their maximum is 9."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "13",
        "explanation": "Selected transformed values are [5, 6, 13]; their maximum is 13."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "11",
        "explanation": "Selected transformed values are [2, 9, 11, 5]; their maximum is 11."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "13"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "11"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-positive-values-value-plus-index-69",
    "slug": "array-minimum-positive-values-value-plus-index-69",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Positive Values / Value Plus Index #69",
    "order": 69,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **value plus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [3, 8, 4, 9]; their minimum is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 6, 13]; their minimum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [2, 9, 11, 5]; their minimum is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-positive-values-value-plus-index-70",
    "slug": "array-xor-positive-values-value-plus-index-70",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Positive Values / Value Plus Index #70",
    "order": 70,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **value plus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "6",
        "explanation": "Selected transformed values are [3, 8, 4, 9]; their xor is 6."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "14",
        "explanation": "Selected transformed values are [5, 6, 13]; their xor is 14."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "5",
        "explanation": "Selected transformed values are [2, 9, 11, 5]; their xor is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "14"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-positive-values-value-minus-index-71",
    "slug": "array-sum-positive-values-value-minus-index-71",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Positive Values / Value Minus Index #71",
    "order": 71,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **value minus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [3, 4, -2, -1]; their sum is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "14",
        "explanation": "Selected transformed values are [5, 4, 5]; their sum is 14."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "9",
        "explanation": "Selected transformed values are [2, 5, 5, -3]; their sum is 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "14"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-positive-values-value-minus-index-72",
    "slug": "array-count-positive-values-value-minus-index-72",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Positive Values / Value Minus Index #72",
    "order": 72,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **value minus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [3, 4, -2, -1]; their count is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [5, 4, 5]; their count is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [2, 5, 5, -3]; their count is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-maximum-positive-values-value-minus-index-73",
    "slug": "array-maximum-positive-values-value-minus-index-73",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Positive Values / Value Minus Index #73",
    "order": 73,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **value minus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [3, 4, -2, -1]; their maximum is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 4, 5]; their maximum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "5",
        "explanation": "Selected transformed values are [2, 5, 5, -3]; their maximum is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-positive-values-value-minus-index-74",
    "slug": "array-minimum-positive-values-value-minus-index-74",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Positive Values / Value Minus Index #74",
    "order": 74,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **value minus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-2",
        "explanation": "Selected transformed values are [3, 4, -2, -1]; their minimum is -2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "4",
        "explanation": "Selected transformed values are [5, 4, 5]; their minimum is 4."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-3",
        "explanation": "Selected transformed values are [2, 5, 5, -3]; their minimum is -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-positive-values-value-minus-index-75",
    "slug": "array-xor-positive-values-value-minus-index-75",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Positive Values / Value Minus Index #75",
    "order": 75,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **positive values**. Transform each selected value using **value minus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "6",
        "explanation": "Selected transformed values are [3, 4, -2, -1]; their xor is 6."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "4",
        "explanation": "Selected transformed values are [5, 4, 5]; their xor is 4."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-1",
        "explanation": "Selected transformed values are [2, 5, 5, -3]; their xor is -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-negative-values-raw-76",
    "slug": "array-sum-negative-values-raw-76",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Negative Values / Raw #76",
    "order": 76,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **raw**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-7",
        "explanation": "Selected transformed values are [-2, -5]; their sum is -7."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their sum is -3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-4",
        "explanation": "Selected transformed values are [-4]; their sum is -4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-7"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-count-negative-values-raw-77",
    "slug": "array-count-negative-values-raw-77",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Negative Values / Raw #77",
    "order": 77,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **raw**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [-2, -5]; their count is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [-3]; their count is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [-4]; their count is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-maximum-negative-values-raw-78",
    "slug": "array-maximum-negative-values-raw-78",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Negative Values / Raw #78",
    "order": 78,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **raw**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-2",
        "explanation": "Selected transformed values are [-2, -5]; their maximum is -2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their maximum is -3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-4",
        "explanation": "Selected transformed values are [-4]; their maximum is -4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-negative-values-raw-79",
    "slug": "array-minimum-negative-values-raw-79",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Negative Values / Raw #79",
    "order": 79,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **raw**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-5",
        "explanation": "Selected transformed values are [-2, -5]; their minimum is -5."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their minimum is -3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-4",
        "explanation": "Selected transformed values are [-4]; their minimum is -4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-negative-values-raw-80",
    "slug": "array-xor-negative-values-raw-80",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Negative Values / Raw #80",
    "order": 80,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **raw**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "5",
        "explanation": "Selected transformed values are [-2, -5]; their xor is 5."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their xor is -3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-4",
        "explanation": "Selected transformed values are [-4]; their xor is -4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-negative-values-absolute-81",
    "slug": "array-sum-negative-values-absolute-81",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Negative Values / Absolute #81",
    "order": 81,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **absolute**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "7",
        "explanation": "Selected transformed values are [2, 5]; their sum is 7."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [3]; their sum is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [4]; their sum is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-negative-values-absolute-82",
    "slug": "array-count-negative-values-absolute-82",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Negative Values / Absolute #82",
    "order": 82,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **absolute**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [2, 5]; their count is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [3]; their count is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [4]; their count is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-maximum-negative-values-absolute-83",
    "slug": "array-maximum-negative-values-absolute-83",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Negative Values / Absolute #83",
    "order": 83,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **absolute**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "5",
        "explanation": "Selected transformed values are [2, 5]; their maximum is 5."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [3]; their maximum is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [4]; their maximum is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-negative-values-absolute-84",
    "slug": "array-minimum-negative-values-absolute-84",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Negative Values / Absolute #84",
    "order": 84,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **absolute**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [2, 5]; their minimum is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [3]; their minimum is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [4]; their minimum is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-negative-values-absolute-85",
    "slug": "array-xor-negative-values-absolute-85",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Negative Values / Absolute #85",
    "order": 85,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **absolute**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "7",
        "explanation": "Selected transformed values are [2, 5]; their xor is 7."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [3]; their xor is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [4]; their xor is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-negative-values-square-86",
    "slug": "array-sum-negative-values-square-86",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Negative Values / Square #86",
    "order": 86,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **square**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "29",
        "explanation": "Selected transformed values are [4, 25]; their sum is 29."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [9]; their sum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "16",
        "explanation": "Selected transformed values are [16]; their sum is 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "29"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-negative-values-square-87",
    "slug": "array-count-negative-values-square-87",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Negative Values / Square #87",
    "order": 87,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **square**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [4, 25]; their count is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [9]; their count is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [16]; their count is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-maximum-negative-values-square-88",
    "slug": "array-maximum-negative-values-square-88",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Negative Values / Square #88",
    "order": 88,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **square**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "25",
        "explanation": "Selected transformed values are [4, 25]; their maximum is 25."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [9]; their maximum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "16",
        "explanation": "Selected transformed values are [16]; their maximum is 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "25"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-negative-values-square-89",
    "slug": "array-minimum-negative-values-square-89",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Negative Values / Square #89",
    "order": 89,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **square**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [4, 25]; their minimum is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [9]; their minimum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "16",
        "explanation": "Selected transformed values are [16]; their minimum is 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-negative-values-square-90",
    "slug": "array-xor-negative-values-square-90",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Negative Values / Square #90",
    "order": 90,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **square**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "29",
        "explanation": "Selected transformed values are [4, 25]; their xor is 29."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [9]; their xor is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "16",
        "explanation": "Selected transformed values are [16]; their xor is 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "29"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-negative-values-value-plus-index-91",
    "slug": "array-sum-negative-values-value-plus-index-91",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Negative Values / Value Plus Index #91",
    "order": 91,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **value plus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-2",
        "explanation": "Selected transformed values are [-1, -1]; their sum is -2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-1",
        "explanation": "Selected transformed values are [-1]; their sum is -1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their sum is -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-count-negative-values-value-plus-index-92",
    "slug": "array-count-negative-values-value-plus-index-92",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Negative Values / Value Plus Index #92",
    "order": 92,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **value plus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [-1, -1]; their count is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [-1]; their count is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [-3]; their count is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-maximum-negative-values-value-plus-index-93",
    "slug": "array-maximum-negative-values-value-plus-index-93",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Negative Values / Value Plus Index #93",
    "order": 93,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **value plus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-1",
        "explanation": "Selected transformed values are [-1, -1]; their maximum is -1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-1",
        "explanation": "Selected transformed values are [-1]; their maximum is -1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their maximum is -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-negative-values-value-plus-index-94",
    "slug": "array-minimum-negative-values-value-plus-index-94",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Negative Values / Value Plus Index #94",
    "order": 94,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **value plus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-1",
        "explanation": "Selected transformed values are [-1, -1]; their minimum is -1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-1",
        "explanation": "Selected transformed values are [-1]; their minimum is -1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their minimum is -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-negative-values-value-plus-index-95",
    "slug": "array-xor-negative-values-value-plus-index-95",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Negative Values / Value Plus Index #95",
    "order": 95,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **value plus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "0",
        "explanation": "Selected transformed values are [-1, -1]; their xor is 0."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-1",
        "explanation": "Selected transformed values are [-1]; their xor is -1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their xor is -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-negative-values-value-minus-index-96",
    "slug": "array-sum-negative-values-value-minus-index-96",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Negative Values / Value Minus Index #96",
    "order": 96,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **value minus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-12",
        "explanation": "Selected transformed values are [-3, -9]; their sum is -12."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-5",
        "explanation": "Selected transformed values are [-5]; their sum is -5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-5",
        "explanation": "Selected transformed values are [-5]; their sum is -5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-12"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-negative-values-value-minus-index-97",
    "slug": "array-count-negative-values-value-minus-index-97",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Negative Values / Value Minus Index #97",
    "order": 97,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **value minus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [-3, -9]; their count is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [-5]; their count is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [-5]; their count is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-maximum-negative-values-value-minus-index-98",
    "slug": "array-maximum-negative-values-value-minus-index-98",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Negative Values / Value Minus Index #98",
    "order": 98,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **value minus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-3",
        "explanation": "Selected transformed values are [-3, -9]; their maximum is -3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-5",
        "explanation": "Selected transformed values are [-5]; their maximum is -5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-5",
        "explanation": "Selected transformed values are [-5]; their maximum is -5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-negative-values-value-minus-index-99",
    "slug": "array-minimum-negative-values-value-minus-index-99",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Negative Values / Value Minus Index #99",
    "order": 99,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **value minus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-9",
        "explanation": "Selected transformed values are [-3, -9]; their minimum is -9."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-5",
        "explanation": "Selected transformed values are [-5]; their minimum is -5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-5",
        "explanation": "Selected transformed values are [-5]; their minimum is -5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-9"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-negative-values-value-minus-index-100",
    "slug": "array-xor-negative-values-value-minus-index-100",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Negative Values / Value Minus Index #100",
    "order": 100,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **negative values**. Transform each selected value using **value minus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "10",
        "explanation": "Selected transformed values are [-3, -9]; their xor is 10."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-5",
        "explanation": "Selected transformed values are [-5]; their xor is -5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-5",
        "explanation": "Selected transformed values are [-5]; their xor is -5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-even-values-raw-101",
    "slug": "array-sum-even-values-raw-101",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Even Values / Raw #101",
    "order": 101,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **raw**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "8",
        "explanation": "Selected transformed values are [-2, 6, 4]; their sum is 8."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [0]; their sum is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "6",
        "explanation": "Selected transformed values are [2, -4, 8]; their sum is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-even-values-raw-102",
    "slug": "array-count-even-values-raw-102",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Even Values / Raw #102",
    "order": 102,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **raw**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [-2, 6, 4]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [0]; their count is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "3",
        "explanation": "Selected transformed values are [2, -4, 8]; their count is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-even-values-raw-103",
    "slug": "array-maximum-even-values-raw-103",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Even Values / Raw #103",
    "order": 103,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **raw**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "6",
        "explanation": "Selected transformed values are [-2, 6, 4]; their maximum is 6."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [0]; their maximum is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "8",
        "explanation": "Selected transformed values are [2, -4, 8]; their maximum is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-even-values-raw-104",
    "slug": "array-minimum-even-values-raw-104",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Even Values / Raw #104",
    "order": 104,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **raw**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-2",
        "explanation": "Selected transformed values are [-2, 6, 4]; their minimum is -2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [0]; their minimum is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-4",
        "explanation": "Selected transformed values are [2, -4, 8]; their minimum is -4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-even-values-raw-105",
    "slug": "array-xor-even-values-raw-105",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Even Values / Raw #105",
    "order": 105,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **raw**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-4",
        "explanation": "Selected transformed values are [-2, 6, 4]; their xor is -4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [0]; their xor is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-10",
        "explanation": "Selected transformed values are [2, -4, 8]; their xor is -10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-10"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-even-values-absolute-106",
    "slug": "array-sum-even-values-absolute-106",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Even Values / Absolute #106",
    "order": 106,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **absolute**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "12",
        "explanation": "Selected transformed values are [2, 6, 4]; their sum is 12."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [0]; their sum is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "14",
        "explanation": "Selected transformed values are [2, 4, 8]; their sum is 14."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "12"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-even-values-absolute-107",
    "slug": "array-count-even-values-absolute-107",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Even Values / Absolute #107",
    "order": 107,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **absolute**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [2, 6, 4]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [0]; their count is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "3",
        "explanation": "Selected transformed values are [2, 4, 8]; their count is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-even-values-absolute-108",
    "slug": "array-maximum-even-values-absolute-108",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Even Values / Absolute #108",
    "order": 108,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **absolute**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "6",
        "explanation": "Selected transformed values are [2, 6, 4]; their maximum is 6."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [0]; their maximum is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "8",
        "explanation": "Selected transformed values are [2, 4, 8]; their maximum is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-even-values-absolute-109",
    "slug": "array-minimum-even-values-absolute-109",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Even Values / Absolute #109",
    "order": 109,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **absolute**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [2, 6, 4]; their minimum is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [0]; their minimum is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [2, 4, 8]; their minimum is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-even-values-absolute-110",
    "slug": "array-xor-even-values-absolute-110",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Even Values / Absolute #110",
    "order": 110,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **absolute**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "0",
        "explanation": "Selected transformed values are [2, 6, 4]; their xor is 0."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [0]; their xor is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "14",
        "explanation": "Selected transformed values are [2, 4, 8]; their xor is 14."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-even-values-square-111",
    "slug": "array-sum-even-values-square-111",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Even Values / Square #111",
    "order": 111,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **square**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "56",
        "explanation": "Selected transformed values are [4, 36, 16]; their sum is 56."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [0]; their sum is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "84",
        "explanation": "Selected transformed values are [4, 16, 64]; their sum is 84."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "56"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "84"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-count-even-values-square-112",
    "slug": "array-count-even-values-square-112",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Even Values / Square #112",
    "order": 112,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **square**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [4, 36, 16]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [0]; their count is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "3",
        "explanation": "Selected transformed values are [4, 16, 64]; their count is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-even-values-square-113",
    "slug": "array-maximum-even-values-square-113",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Even Values / Square #113",
    "order": 113,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **square**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "36",
        "explanation": "Selected transformed values are [4, 36, 16]; their maximum is 36."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [0]; their maximum is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "64",
        "explanation": "Selected transformed values are [4, 16, 64]; their maximum is 64."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "36"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "64"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-even-values-square-114",
    "slug": "array-minimum-even-values-square-114",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Even Values / Square #114",
    "order": 114,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **square**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [4, 36, 16]; their minimum is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [0]; their minimum is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [4, 16, 64]; their minimum is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-even-values-square-115",
    "slug": "array-xor-even-values-square-115",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Even Values / Square #115",
    "order": 115,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **square**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "48",
        "explanation": "Selected transformed values are [4, 36, 16]; their xor is 48."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [0]; their xor is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "84",
        "explanation": "Selected transformed values are [4, 16, 64]; their xor is 84."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "48"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "84"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-even-values-value-plus-index-116",
    "slug": "array-sum-even-values-value-plus-index-116",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Even Values / Value Plus Index #116",
    "order": 116,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **value plus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "16",
        "explanation": "Selected transformed values are [-1, 8, 9]; their sum is 16."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [3]; their sum is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "10",
        "explanation": "Selected transformed values are [2, -3, 11]; their sum is 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "16"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-even-values-value-plus-index-117",
    "slug": "array-count-even-values-value-plus-index-117",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Even Values / Value Plus Index #117",
    "order": 117,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **value plus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [-1, 8, 9]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [3]; their count is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "3",
        "explanation": "Selected transformed values are [2, -3, 11]; their count is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-even-values-value-plus-index-118",
    "slug": "array-maximum-even-values-value-plus-index-118",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Even Values / Value Plus Index #118",
    "order": 118,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **value plus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "9",
        "explanation": "Selected transformed values are [-1, 8, 9]; their maximum is 9."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [3]; their maximum is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "11",
        "explanation": "Selected transformed values are [2, -3, 11]; their maximum is 11."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "11"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-even-values-value-plus-index-119",
    "slug": "array-minimum-even-values-value-plus-index-119",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Even Values / Value Plus Index #119",
    "order": 119,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **value plus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-1",
        "explanation": "Selected transformed values are [-1, 8, 9]; their minimum is -1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [3]; their minimum is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-3",
        "explanation": "Selected transformed values are [2, -3, 11]; their minimum is -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-even-values-value-plus-index-120",
    "slug": "array-xor-even-values-value-plus-index-120",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Even Values / Value Plus Index #120",
    "order": 120,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **value plus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-2",
        "explanation": "Selected transformed values are [-1, 8, 9]; their xor is -2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [3]; their xor is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-12",
        "explanation": "Selected transformed values are [2, -3, 11]; their xor is -12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-12"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-even-values-value-minus-index-121",
    "slug": "array-sum-even-values-value-minus-index-121",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Even Values / Value Minus Index #121",
    "order": 121,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **value minus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "0",
        "explanation": "Selected transformed values are [-3, 4, -1]; their sum is 0."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their sum is -3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [2, -5, 5]; their sum is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-count-even-values-value-minus-index-122",
    "slug": "array-count-even-values-value-minus-index-122",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Even Values / Value Minus Index #122",
    "order": 122,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **value minus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [-3, 4, -1]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [-3]; their count is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "3",
        "explanation": "Selected transformed values are [2, -5, 5]; their count is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-even-values-value-minus-index-123",
    "slug": "array-maximum-even-values-value-minus-index-123",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Even Values / Value Minus Index #123",
    "order": 123,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **value minus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [-3, 4, -1]; their maximum is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their maximum is -3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "5",
        "explanation": "Selected transformed values are [2, -5, 5]; their maximum is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-even-values-value-minus-index-124",
    "slug": "array-minimum-even-values-value-minus-index-124",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Even Values / Value Minus Index #124",
    "order": 124,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **value minus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-3",
        "explanation": "Selected transformed values are [-3, 4, -1]; their minimum is -3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their minimum is -3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-5",
        "explanation": "Selected transformed values are [2, -5, 5]; their minimum is -5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-even-values-value-minus-index-125",
    "slug": "array-xor-even-values-value-minus-index-125",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Even Values / Value Minus Index #125",
    "order": 125,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **even values**. Transform each selected value using **value minus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "6",
        "explanation": "Selected transformed values are [-3, 4, -1]; their xor is 6."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their xor is -3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-4",
        "explanation": "Selected transformed values are [2, -5, 5]; their xor is -4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-odd-values-raw-126",
    "slug": "array-sum-odd-values-raw-126",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Odd Values / Raw #126",
    "order": 126,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **raw**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-1",
        "explanation": "Selected transformed values are [3, 1, -5]; their sum is -1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "16",
        "explanation": "Selected transformed values are [5, 5, -3, 9]; their sum is 16."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "8",
        "explanation": "Selected transformed values are [7, 1]; their sum is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "16"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-odd-values-raw-127",
    "slug": "array-count-odd-values-raw-127",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Odd Values / Raw #127",
    "order": 127,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **raw**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [3, 1, -5]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "4",
        "explanation": "Selected transformed values are [5, 5, -3, 9]; their count is 4."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [7, 1]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-odd-values-raw-128",
    "slug": "array-maximum-odd-values-raw-128",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Odd Values / Raw #128",
    "order": 128,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **raw**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [3, 1, -5]; their maximum is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [5, 5, -3, 9]; their maximum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "7",
        "explanation": "Selected transformed values are [7, 1]; their maximum is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-odd-values-raw-129",
    "slug": "array-minimum-odd-values-raw-129",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Odd Values / Raw #129",
    "order": 129,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **raw**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-5",
        "explanation": "Selected transformed values are [3, 1, -5]; their minimum is -5."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-3",
        "explanation": "Selected transformed values are [5, 5, -3, 9]; their minimum is -3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [7, 1]; their minimum is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-odd-values-raw-130",
    "slug": "array-xor-odd-values-raw-130",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Odd Values / Raw #130",
    "order": 130,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **raw**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-7",
        "explanation": "Selected transformed values are [3, 1, -5]; their xor is -7."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-12",
        "explanation": "Selected transformed values are [5, 5, -3, 9]; their xor is -12."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "6",
        "explanation": "Selected transformed values are [7, 1]; their xor is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-7"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-12"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-odd-values-absolute-131",
    "slug": "array-sum-odd-values-absolute-131",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Odd Values / Absolute #131",
    "order": 131,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **absolute**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "9",
        "explanation": "Selected transformed values are [3, 1, 5]; their sum is 9."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "22",
        "explanation": "Selected transformed values are [5, 5, 3, 9]; their sum is 22."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "8",
        "explanation": "Selected transformed values are [7, 1]; their sum is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "22"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-odd-values-absolute-132",
    "slug": "array-count-odd-values-absolute-132",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Odd Values / Absolute #132",
    "order": 132,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **absolute**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [3, 1, 5]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "4",
        "explanation": "Selected transformed values are [5, 5, 3, 9]; their count is 4."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [7, 1]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-odd-values-absolute-133",
    "slug": "array-maximum-odd-values-absolute-133",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Odd Values / Absolute #133",
    "order": 133,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **absolute**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "5",
        "explanation": "Selected transformed values are [3, 1, 5]; their maximum is 5."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [5, 5, 3, 9]; their maximum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "7",
        "explanation": "Selected transformed values are [7, 1]; their maximum is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-odd-values-absolute-134",
    "slug": "array-minimum-odd-values-absolute-134",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Odd Values / Absolute #134",
    "order": 134,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **absolute**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "1",
        "explanation": "Selected transformed values are [3, 1, 5]; their minimum is 1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [5, 5, 3, 9]; their minimum is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [7, 1]; their minimum is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-odd-values-absolute-135",
    "slug": "array-xor-odd-values-absolute-135",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Odd Values / Absolute #135",
    "order": 135,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **absolute**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "7",
        "explanation": "Selected transformed values are [3, 1, 5]; their xor is 7."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "10",
        "explanation": "Selected transformed values are [5, 5, 3, 9]; their xor is 10."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "6",
        "explanation": "Selected transformed values are [7, 1]; their xor is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-odd-values-square-136",
    "slug": "array-sum-odd-values-square-136",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Odd Values / Square #136",
    "order": 136,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **square**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "35",
        "explanation": "Selected transformed values are [9, 1, 25]; their sum is 35."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "140",
        "explanation": "Selected transformed values are [25, 25, 9, 81]; their sum is 140."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "50",
        "explanation": "Selected transformed values are [49, 1]; their sum is 50."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "35"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "140"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "50"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-count-odd-values-square-137",
    "slug": "array-count-odd-values-square-137",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Odd Values / Square #137",
    "order": 137,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **square**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [9, 1, 25]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "4",
        "explanation": "Selected transformed values are [25, 25, 9, 81]; their count is 4."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [49, 1]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-odd-values-square-138",
    "slug": "array-maximum-odd-values-square-138",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Odd Values / Square #138",
    "order": 138,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **square**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "25",
        "explanation": "Selected transformed values are [9, 1, 25]; their maximum is 25."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "81",
        "explanation": "Selected transformed values are [25, 25, 9, 81]; their maximum is 81."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "49",
        "explanation": "Selected transformed values are [49, 1]; their maximum is 49."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "25"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "81"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-odd-values-square-139",
    "slug": "array-minimum-odd-values-square-139",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Odd Values / Square #139",
    "order": 139,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **square**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "1",
        "explanation": "Selected transformed values are [9, 1, 25]; their minimum is 1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [25, 25, 9, 81]; their minimum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [49, 1]; their minimum is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-odd-values-square-140",
    "slug": "array-xor-odd-values-square-140",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Odd Values / Square #140",
    "order": 140,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **square**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "17",
        "explanation": "Selected transformed values are [9, 1, 25]; their xor is 17."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "88",
        "explanation": "Selected transformed values are [25, 25, 9, 81]; their xor is 88."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "48",
        "explanation": "Selected transformed values are [49, 1]; their xor is 48."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "17"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "88"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "48"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-odd-values-value-plus-index-141",
    "slug": "array-sum-odd-values-value-plus-index-141",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Odd Values / Value Plus Index #141",
    "order": 141,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **value plus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "6",
        "explanation": "Selected transformed values are [3, 4, -1]; their sum is 6."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "23",
        "explanation": "Selected transformed values are [5, 6, -1, 13]; their sum is 23."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "14",
        "explanation": "Selected transformed values are [9, 5]; their sum is 14."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "23"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-odd-values-value-plus-index-142",
    "slug": "array-count-odd-values-value-plus-index-142",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Odd Values / Value Plus Index #142",
    "order": 142,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **value plus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [3, 4, -1]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "4",
        "explanation": "Selected transformed values are [5, 6, -1, 13]; their count is 4."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [9, 5]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-odd-values-value-plus-index-143",
    "slug": "array-maximum-odd-values-value-plus-index-143",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Odd Values / Value Plus Index #143",
    "order": 143,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **value plus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [3, 4, -1]; their maximum is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "13",
        "explanation": "Selected transformed values are [5, 6, -1, 13]; their maximum is 13."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "9",
        "explanation": "Selected transformed values are [9, 5]; their maximum is 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "13"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-odd-values-value-plus-index-144",
    "slug": "array-minimum-odd-values-value-plus-index-144",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Odd Values / Value Plus Index #144",
    "order": 144,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **value plus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-1",
        "explanation": "Selected transformed values are [3, 4, -1]; their minimum is -1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-1",
        "explanation": "Selected transformed values are [5, 6, -1, 13]; their minimum is -1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "5",
        "explanation": "Selected transformed values are [9, 5]; their minimum is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-odd-values-value-plus-index-145",
    "slug": "array-xor-odd-values-value-plus-index-145",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Odd Values / Value Plus Index #145",
    "order": 145,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **value plus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-8",
        "explanation": "Selected transformed values are [3, 4, -1]; their xor is -8."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-15",
        "explanation": "Selected transformed values are [5, 6, -1, 13]; their xor is -15."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "12",
        "explanation": "Selected transformed values are [9, 5]; their xor is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-8"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-15"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-odd-values-value-minus-index-146",
    "slug": "array-sum-odd-values-value-minus-index-146",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Odd Values / Value Minus Index #146",
    "order": 146,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **value minus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-8",
        "explanation": "Selected transformed values are [3, -2, -9]; their sum is -8."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [5, 4, -5, 5]; their sum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [5, -3]; their sum is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-8"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-count-odd-values-value-minus-index-147",
    "slug": "array-count-odd-values-value-minus-index-147",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Odd Values / Value Minus Index #147",
    "order": 147,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **value minus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [3, -2, -9]; their count is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "4",
        "explanation": "Selected transformed values are [5, 4, -5, 5]; their count is 4."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [5, -3]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-odd-values-value-minus-index-148",
    "slug": "array-maximum-odd-values-value-minus-index-148",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Odd Values / Value Minus Index #148",
    "order": 148,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **value minus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [3, -2, -9]; their maximum is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 4, -5, 5]; their maximum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "5",
        "explanation": "Selected transformed values are [5, -3]; their maximum is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-odd-values-value-minus-index-149",
    "slug": "array-minimum-odd-values-value-minus-index-149",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Odd Values / Value Minus Index #149",
    "order": 149,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **value minus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-9",
        "explanation": "Selected transformed values are [3, -2, -9]; their minimum is -9."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-5",
        "explanation": "Selected transformed values are [5, 4, -5, 5]; their minimum is -5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-3",
        "explanation": "Selected transformed values are [5, -3]; their minimum is -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-9"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-odd-values-value-minus-index-150",
    "slug": "array-xor-odd-values-value-minus-index-150",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Odd Values / Value Minus Index #150",
    "order": 150,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **odd values**. Transform each selected value using **value minus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "10",
        "explanation": "Selected transformed values are [3, -2, -9]; their xor is 10."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-1",
        "explanation": "Selected transformed values are [5, 4, -5, 5]; their xor is -1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-8",
        "explanation": "Selected transformed values are [5, -3]; their xor is -8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-values-greater-than-first-raw-151",
    "slug": "array-sum-values-greater-than-first-raw-151",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Values Greater Than First / Raw #151",
    "order": 151,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **raw**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "10",
        "explanation": "Selected transformed values are [6, 4]; their sum is 10."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [9]; their sum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "15",
        "explanation": "Selected transformed values are [7, 8]; their sum is 15."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "15"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-count-values-greater-than-first-raw-152",
    "slug": "array-count-values-greater-than-first-raw-152",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Values Greater Than First / Raw #152",
    "order": 152,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **raw**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [6, 4]; their count is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [9]; their count is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [7, 8]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-values-greater-than-first-raw-153",
    "slug": "array-maximum-values-greater-than-first-raw-153",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Values Greater Than First / Raw #153",
    "order": 153,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **raw**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "6",
        "explanation": "Selected transformed values are [6, 4]; their maximum is 6."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [9]; their maximum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "8",
        "explanation": "Selected transformed values are [7, 8]; their maximum is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-values-greater-than-first-raw-154",
    "slug": "array-minimum-values-greater-than-first-raw-154",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Values Greater Than First / Raw #154",
    "order": 154,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **raw**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [6, 4]; their minimum is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [9]; their minimum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "7",
        "explanation": "Selected transformed values are [7, 8]; their minimum is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-values-greater-than-first-raw-155",
    "slug": "array-xor-values-greater-than-first-raw-155",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Values Greater Than First / Raw #155",
    "order": 155,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **raw**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [6, 4]; their xor is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [9]; their xor is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "15",
        "explanation": "Selected transformed values are [7, 8]; their xor is 15."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "15"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-values-greater-than-first-absolute-156",
    "slug": "array-sum-values-greater-than-first-absolute-156",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Values Greater Than First / Absolute #156",
    "order": 156,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **absolute**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "10",
        "explanation": "Selected transformed values are [6, 4]; their sum is 10."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [9]; their sum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "15",
        "explanation": "Selected transformed values are [7, 8]; their sum is 15."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "15"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-count-values-greater-than-first-absolute-157",
    "slug": "array-count-values-greater-than-first-absolute-157",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Values Greater Than First / Absolute #157",
    "order": 157,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **absolute**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [6, 4]; their count is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [9]; their count is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [7, 8]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-values-greater-than-first-absolute-158",
    "slug": "array-maximum-values-greater-than-first-absolute-158",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Values Greater Than First / Absolute #158",
    "order": 158,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **absolute**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "6",
        "explanation": "Selected transformed values are [6, 4]; their maximum is 6."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [9]; their maximum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "8",
        "explanation": "Selected transformed values are [7, 8]; their maximum is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-values-greater-than-first-absolute-159",
    "slug": "array-minimum-values-greater-than-first-absolute-159",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Values Greater Than First / Absolute #159",
    "order": 159,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **absolute**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [6, 4]; their minimum is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [9]; their minimum is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "7",
        "explanation": "Selected transformed values are [7, 8]; their minimum is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-values-greater-than-first-absolute-160",
    "slug": "array-xor-values-greater-than-first-absolute-160",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Values Greater Than First / Absolute #160",
    "order": 160,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **absolute**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [6, 4]; their xor is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [9]; their xor is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "15",
        "explanation": "Selected transformed values are [7, 8]; their xor is 15."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "15"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-values-greater-than-first-square-161",
    "slug": "array-sum-values-greater-than-first-square-161",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Values Greater Than First / Square #161",
    "order": 161,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **square**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "52",
        "explanation": "Selected transformed values are [36, 16]; their sum is 52."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "81",
        "explanation": "Selected transformed values are [81]; their sum is 81."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "113",
        "explanation": "Selected transformed values are [49, 64]; their sum is 113."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "52"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "81"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "113"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-count-values-greater-than-first-square-162",
    "slug": "array-count-values-greater-than-first-square-162",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Values Greater Than First / Square #162",
    "order": 162,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **square**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [36, 16]; their count is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [81]; their count is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [49, 64]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-values-greater-than-first-square-163",
    "slug": "array-maximum-values-greater-than-first-square-163",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Values Greater Than First / Square #163",
    "order": 163,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **square**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "36",
        "explanation": "Selected transformed values are [36, 16]; their maximum is 36."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "81",
        "explanation": "Selected transformed values are [81]; their maximum is 81."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "64",
        "explanation": "Selected transformed values are [49, 64]; their maximum is 64."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "36"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "81"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "64"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-values-greater-than-first-square-164",
    "slug": "array-minimum-values-greater-than-first-square-164",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Values Greater Than First / Square #164",
    "order": 164,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **square**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "16",
        "explanation": "Selected transformed values are [36, 16]; their minimum is 16."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "81",
        "explanation": "Selected transformed values are [81]; their minimum is 81."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "49",
        "explanation": "Selected transformed values are [49, 64]; their minimum is 49."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "16"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "81"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-values-greater-than-first-square-165",
    "slug": "array-xor-values-greater-than-first-square-165",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Values Greater Than First / Square #165",
    "order": 165,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **square**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "52",
        "explanation": "Selected transformed values are [36, 16]; their xor is 52."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "81",
        "explanation": "Selected transformed values are [81]; their xor is 81."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "113",
        "explanation": "Selected transformed values are [49, 64]; their xor is 113."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "52"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "81"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "113"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-values-greater-than-first-value-plus-index-166",
    "slug": "array-sum-values-greater-than-first-value-plus-index-166",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Values Greater Than First / Value Plus Index #166",
    "order": 166,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **value plus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "17",
        "explanation": "Selected transformed values are [8, 9]; their sum is 17."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "13",
        "explanation": "Selected transformed values are [13]; their sum is 13."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "20",
        "explanation": "Selected transformed values are [9, 11]; their sum is 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "17"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "13"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-values-greater-than-first-value-plus-index-167",
    "slug": "array-count-values-greater-than-first-value-plus-index-167",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Values Greater Than First / Value Plus Index #167",
    "order": 167,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **value plus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [8, 9]; their count is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [13]; their count is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [9, 11]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-values-greater-than-first-value-plus-index-168",
    "slug": "array-maximum-values-greater-than-first-value-plus-index-168",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Values Greater Than First / Value Plus Index #168",
    "order": 168,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **value plus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "9",
        "explanation": "Selected transformed values are [8, 9]; their maximum is 9."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "13",
        "explanation": "Selected transformed values are [13]; their maximum is 13."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "11",
        "explanation": "Selected transformed values are [9, 11]; their maximum is 11."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "13"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "11"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-values-greater-than-first-value-plus-index-169",
    "slug": "array-minimum-values-greater-than-first-value-plus-index-169",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Values Greater Than First / Value Plus Index #169",
    "order": 169,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **value plus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "8",
        "explanation": "Selected transformed values are [8, 9]; their minimum is 8."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "13",
        "explanation": "Selected transformed values are [13]; their minimum is 13."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "9",
        "explanation": "Selected transformed values are [9, 11]; their minimum is 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "13"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-values-greater-than-first-value-plus-index-170",
    "slug": "array-xor-values-greater-than-first-value-plus-index-170",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Values Greater Than First / Value Plus Index #170",
    "order": 170,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **value plus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "1",
        "explanation": "Selected transformed values are [8, 9]; their xor is 1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "13",
        "explanation": "Selected transformed values are [13]; their xor is 13."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [9, 11]; their xor is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "13"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-values-greater-than-first-value-minus-index-171",
    "slug": "array-sum-values-greater-than-first-value-minus-index-171",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Values Greater Than First / Value Minus Index #171",
    "order": 171,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **value minus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [4, -1]; their sum is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5]; their sum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "10",
        "explanation": "Selected transformed values are [5, 5]; their sum is 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-values-greater-than-first-value-minus-index-172",
    "slug": "array-count-values-greater-than-first-value-minus-index-172",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Values Greater Than First / Value Minus Index #172",
    "order": 172,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **value minus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [4, -1]; their count is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [5]; their count is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [5, 5]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-values-greater-than-first-value-minus-index-173",
    "slug": "array-maximum-values-greater-than-first-value-minus-index-173",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Values Greater Than First / Value Minus Index #173",
    "order": 173,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **value minus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [4, -1]; their maximum is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5]; their maximum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "5",
        "explanation": "Selected transformed values are [5, 5]; their maximum is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-values-greater-than-first-value-minus-index-174",
    "slug": "array-minimum-values-greater-than-first-value-minus-index-174",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Values Greater Than First / Value Minus Index #174",
    "order": 174,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **value minus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-1",
        "explanation": "Selected transformed values are [4, -1]; their minimum is -1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5]; their minimum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "5",
        "explanation": "Selected transformed values are [5, 5]; their minimum is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-values-greater-than-first-value-minus-index-175",
    "slug": "array-xor-values-greater-than-first-value-minus-index-175",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Values Greater Than First / Value Minus Index #175",
    "order": 175,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values greater than first**. Transform each selected value using **value minus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-5",
        "explanation": "Selected transformed values are [4, -1]; their xor is -5."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5]; their xor is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "0",
        "explanation": "Selected transformed values are [5, 5]; their xor is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-values-less-than-last-raw-176",
    "slug": "array-sum-values-less-than-last-raw-176",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Values Less Than Last / Raw #176",
    "order": 176,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **raw**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-3",
        "explanation": "Selected transformed values are [3, -2, 1, -5]; their sum is -3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "7",
        "explanation": "Selected transformed values are [5, 5, -3, 0]; their sum is 7."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-4",
        "explanation": "Selected transformed values are [-4]; their sum is -4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-count-values-less-than-last-raw-177",
    "slug": "array-count-values-less-than-last-raw-177",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Values Less Than Last / Raw #177",
    "order": 177,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **raw**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [3, -2, 1, -5]; their count is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "4",
        "explanation": "Selected transformed values are [5, 5, -3, 0]; their count is 4."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [-4]; their count is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-maximum-values-less-than-last-raw-178",
    "slug": "array-maximum-values-less-than-last-raw-178",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Values Less Than Last / Raw #178",
    "order": 178,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **raw**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [3, -2, 1, -5]; their maximum is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 5, -3, 0]; their maximum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-4",
        "explanation": "Selected transformed values are [-4]; their maximum is -4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-values-less-than-last-raw-179",
    "slug": "array-minimum-values-less-than-last-raw-179",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Values Less Than Last / Raw #179",
    "order": 179,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **raw**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-5",
        "explanation": "Selected transformed values are [3, -2, 1, -5]; their minimum is -5."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-3",
        "explanation": "Selected transformed values are [5, 5, -3, 0]; their minimum is -3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-4",
        "explanation": "Selected transformed values are [-4]; their minimum is -4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-values-less-than-last-raw-180",
    "slug": "array-xor-values-less-than-last-raw-180",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Values Less Than Last / Raw #180",
    "order": 180,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **raw**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "7",
        "explanation": "Selected transformed values are [3, -2, 1, -5]; their xor is 7."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-3",
        "explanation": "Selected transformed values are [5, 5, -3, 0]; their xor is -3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-4",
        "explanation": "Selected transformed values are [-4]; their xor is -4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-values-less-than-last-absolute-181",
    "slug": "array-sum-values-less-than-last-absolute-181",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Values Less Than Last / Absolute #181",
    "order": 181,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **absolute**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "11",
        "explanation": "Selected transformed values are [3, 2, 1, 5]; their sum is 11."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "13",
        "explanation": "Selected transformed values are [5, 5, 3, 0]; their sum is 13."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [4]; their sum is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "11"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "13"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-values-less-than-last-absolute-182",
    "slug": "array-count-values-less-than-last-absolute-182",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Values Less Than Last / Absolute #182",
    "order": 182,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **absolute**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [3, 2, 1, 5]; their count is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "4",
        "explanation": "Selected transformed values are [5, 5, 3, 0]; their count is 4."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [4]; their count is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-maximum-values-less-than-last-absolute-183",
    "slug": "array-maximum-values-less-than-last-absolute-183",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Values Less Than Last / Absolute #183",
    "order": 183,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **absolute**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "5",
        "explanation": "Selected transformed values are [3, 2, 1, 5]; their maximum is 5."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 5, 3, 0]; their maximum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [4]; their maximum is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-values-less-than-last-absolute-184",
    "slug": "array-minimum-values-less-than-last-absolute-184",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Values Less Than Last / Absolute #184",
    "order": 184,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **absolute**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "1",
        "explanation": "Selected transformed values are [3, 2, 1, 5]; their minimum is 1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [5, 5, 3, 0]; their minimum is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [4]; their minimum is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-values-less-than-last-absolute-185",
    "slug": "array-xor-values-less-than-last-absolute-185",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Values Less Than Last / Absolute #185",
    "order": 185,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **absolute**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "5",
        "explanation": "Selected transformed values are [3, 2, 1, 5]; their xor is 5."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "3",
        "explanation": "Selected transformed values are [5, 5, 3, 0]; their xor is 3."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "4",
        "explanation": "Selected transformed values are [4]; their xor is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-values-less-than-last-square-186",
    "slug": "array-sum-values-less-than-last-square-186",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Values Less Than Last / Square #186",
    "order": 186,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **square**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "39",
        "explanation": "Selected transformed values are [9, 4, 1, 25]; their sum is 39."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "59",
        "explanation": "Selected transformed values are [25, 25, 9, 0]; their sum is 59."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "16",
        "explanation": "Selected transformed values are [16]; their sum is 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "39"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "59"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-values-less-than-last-square-187",
    "slug": "array-count-values-less-than-last-square-187",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Values Less Than Last / Square #187",
    "order": 187,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **square**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [9, 4, 1, 25]; their count is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "4",
        "explanation": "Selected transformed values are [25, 25, 9, 0]; their count is 4."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [16]; their count is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-maximum-values-less-than-last-square-188",
    "slug": "array-maximum-values-less-than-last-square-188",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Values Less Than Last / Square #188",
    "order": 188,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **square**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "25",
        "explanation": "Selected transformed values are [9, 4, 1, 25]; their maximum is 25."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "25",
        "explanation": "Selected transformed values are [25, 25, 9, 0]; their maximum is 25."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "16",
        "explanation": "Selected transformed values are [16]; their maximum is 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "25"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "25"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-values-less-than-last-square-189",
    "slug": "array-minimum-values-less-than-last-square-189",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Values Less Than Last / Square #189",
    "order": 189,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **square**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "1",
        "explanation": "Selected transformed values are [9, 4, 1, 25]; their minimum is 1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [25, 25, 9, 0]; their minimum is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "16",
        "explanation": "Selected transformed values are [16]; their minimum is 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-values-less-than-last-square-190",
    "slug": "array-xor-values-less-than-last-square-190",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Values Less Than Last / Square #190",
    "order": 190,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **square**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "21",
        "explanation": "Selected transformed values are [9, 4, 1, 25]; their xor is 21."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "9",
        "explanation": "Selected transformed values are [25, 25, 9, 0]; their xor is 9."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "16",
        "explanation": "Selected transformed values are [16]; their xor is 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-values-less-than-last-value-plus-index-191",
    "slug": "array-sum-values-less-than-last-value-plus-index-191",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Values Less Than Last / Value Plus Index #191",
    "order": 191,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **value plus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "5",
        "explanation": "Selected transformed values are [3, -1, 4, -1]; their sum is 5."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "13",
        "explanation": "Selected transformed values are [5, 6, -1, 3]; their sum is 13."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their sum is -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "13"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-count-values-less-than-last-value-plus-index-192",
    "slug": "array-count-values-less-than-last-value-plus-index-192",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Values Less Than Last / Value Plus Index #192",
    "order": 192,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **value plus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [3, -1, 4, -1]; their count is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "4",
        "explanation": "Selected transformed values are [5, 6, -1, 3]; their count is 4."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [-3]; their count is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-maximum-values-less-than-last-value-plus-index-193",
    "slug": "array-maximum-values-less-than-last-value-plus-index-193",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Values Less Than Last / Value Plus Index #193",
    "order": 193,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **value plus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [3, -1, 4, -1]; their maximum is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "6",
        "explanation": "Selected transformed values are [5, 6, -1, 3]; their maximum is 6."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their maximum is -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-minimum-values-less-than-last-value-plus-index-194",
    "slug": "array-minimum-values-less-than-last-value-plus-index-194",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Values Less Than Last / Value Plus Index #194",
    "order": 194,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **value plus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-1",
        "explanation": "Selected transformed values are [3, -1, 4, -1]; their minimum is -1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-1",
        "explanation": "Selected transformed values are [5, 6, -1, 3]; their minimum is -1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their minimum is -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-values-less-than-last-value-plus-index-195",
    "slug": "array-xor-values-less-than-last-value-plus-index-195",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Values Less Than Last / Value Plus Index #195",
    "order": 195,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **value plus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "7",
        "explanation": "Selected transformed values are [3, -1, 4, -1]; their xor is 7."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-1",
        "explanation": "Selected transformed values are [5, 6, -1, 3]; their xor is -1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-3",
        "explanation": "Selected transformed values are [-3]; their xor is -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "-3"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-sum-values-less-than-last-value-minus-index-196",
    "slug": "array-sum-values-less-than-last-value-minus-index-196",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Values Less Than Last / Value Minus Index #196",
    "order": 196,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **value minus index**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-11",
        "explanation": "Selected transformed values are [3, -3, -2, -9]; their sum is -11."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "1",
        "explanation": "Selected transformed values are [5, 4, -5, -3]; their sum is 1."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-5",
        "explanation": "Selected transformed values are [-5]; their sum is -5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-11"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-values-less-than-last-value-minus-index-197",
    "slug": "array-count-values-less-than-last-value-minus-index-197",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Values Less Than Last / Value Minus Index #197",
    "order": 197,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **value minus index**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [3, -3, -2, -9]; their count is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "4",
        "explanation": "Selected transformed values are [5, 4, -5, -3]; their count is 4."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "1",
        "explanation": "Selected transformed values are [-5]; their count is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-maximum-values-less-than-last-value-minus-index-198",
    "slug": "array-maximum-values-less-than-last-value-minus-index-198",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Values Less Than Last / Value Minus Index #198",
    "order": 198,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **value minus index**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [3, -3, -2, -9]; their maximum is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 4, -5, -3]; their maximum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-5",
        "explanation": "Selected transformed values are [-5]; their maximum is -5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-values-less-than-last-value-minus-index-199",
    "slug": "array-minimum-values-less-than-last-value-minus-index-199",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Values Less Than Last / Value Minus Index #199",
    "order": 199,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **value minus index**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-9",
        "explanation": "Selected transformed values are [3, -3, -2, -9]; their minimum is -9."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "-5",
        "explanation": "Selected transformed values are [5, 4, -5, -3]; their minimum is -5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-5",
        "explanation": "Selected transformed values are [-5]; their minimum is -5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-9"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-xor-values-less-than-last-value-minus-index-200",
    "slug": "array-xor-values-less-than-last-value-minus-index-200",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Values Less Than Last / Value Minus Index #200",
    "order": 200,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **values less than last**. Transform each selected value using **value minus index**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "-9",
        "explanation": "Selected transformed values are [3, -3, -2, -9]; their xor is -9."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "7",
        "explanation": "Selected transformed values are [5, 4, -5, -3]; their xor is 7."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "-5",
        "explanation": "Selected transformed values are [-5]; their xor is -5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "-9"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-sum-indices-divisible-by-3-raw-201",
    "slug": "array-sum-indices-divisible-by-3-raw-201",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Sum — Indices Divisible By 3 / Raw #201",
    "order": 201,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **indices divisible by 3**. Transform each selected value using **raw**. Print the **sum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required sum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "4",
        "explanation": "Selected transformed values are [3, 1]; their sum is 4."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 0]; their sum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "10",
        "explanation": "Selected transformed values are [2, 8]; their sum is 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-count-indices-divisible-by-3-raw-202",
    "slug": "array-count-indices-divisible-by-3-raw-202",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Count — Indices Divisible By 3 / Raw #202",
    "order": 202,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **indices divisible by 3**. Transform each selected value using **raw**. Print the **count** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required count.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [3, 1]; their count is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "2",
        "explanation": "Selected transformed values are [5, 0]; their count is 2."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [2, 8]; their count is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-maximum-indices-divisible-by-3-raw-203",
    "slug": "array-maximum-indices-divisible-by-3-raw-203",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Maximum — Indices Divisible By 3 / Raw #203",
    "order": 203,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **indices divisible by 3**. Transform each selected value using **raw**. Print the **maximum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required maximum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "3",
        "explanation": "Selected transformed values are [3, 1]; their maximum is 3."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 0]; their maximum is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "8",
        "explanation": "Selected transformed values are [2, 8]; their maximum is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
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
    "id": "learn:arrays-1d-lists:array-minimum-indices-divisible-by-3-raw-204",
    "slug": "array-minimum-indices-divisible-by-3-raw-204",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Minimum — Indices Divisible By 3 / Raw #204",
    "order": 204,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **indices divisible by 3**. Transform each selected value using **raw**. Print the **minimum** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required minimum.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "1",
        "explanation": "Selected transformed values are [3, 1]; their minimum is 1."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "0",
        "explanation": "Selected transformed values are [5, 0]; their minimum is 0."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "2",
        "explanation": "Selected transformed values are [2, 8]; their minimum is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:arrays-1d-lists:array-xor-indices-divisible-by-3-raw-205",
    "slug": "array-xor-indices-divisible-by-3-raw-205",
    "topicId": "arrays-1d-lists",
    "topicSlug": "arrays-1d-lists",
    "topicTitle": "1D Arrays / Lists",
    "title": "Array Xor — Indices Divisible By 3 / Raw #205",
    "order": 205,
    "difficulty": "Easy",
    "problemStatement": "Select array positions matching **indices divisible by 3**. Transform each selected value using **raw**. Print the **xor** of the transformed values. For maximum/minimum/XOR on an empty selection, output 0.",
    "inputFormat": "The first line contains integer `n`. The second line contains `n` integers. Indices are zero-based.",
    "outputFormat": "Print one integer: the required xor.",
    "constraints": "1 <= n <= 100000; -10000 <= a[i] <= 10000; transformed values fit signed 64-bit integer.",
    "examples": [
      {
        "input": "6\n3 -2 6 1 -5 4",
        "output": "2",
        "explanation": "Selected transformed values are [3, 1]; their xor is 2."
      },
      {
        "input": "5\n5 5 -3 0 9",
        "output": "5",
        "explanation": "Selected transformed values are [5, 0]; their xor is 5."
      },
      {
        "input": "5\n2 -4 7 8 1",
        "output": "10",
        "explanation": "Selected transformed values are [2, 8]; their xor is 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6\n3 -2 6 1 -5 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5\n5 5 -3 0 9",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "5\n2 -4 7 8 1",
        "expectedOutput": "10"
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
