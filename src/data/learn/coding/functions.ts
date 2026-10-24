import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:functions:two-argument-maximum-function",
    "slug": "two-argument-maximum-function",
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Two Argument Maximum Function",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Write a function `f(a,b)` that returns `(a*1+b)//1` and print the returned value.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the value returned by `f`.",
    "constraints": "-10^6 <= a,b <= 10^6.",
    "examples": [
      {
        "input": "3 5",
        "output": "8",
        "explanation": "The function returns `(a*1+b)//1` = 8."
      },
      {
        "input": "8 2",
        "output": "10",
        "explanation": "The function returns `(a*1+b)//1` = 10."
      },
      {
        "input": "-4 7",
        "output": "3",
        "explanation": "The function returns `(a*1+b)//1` = 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "8 2",
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "-4 7",
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
    "id": "learn:functions:clamp-function",
    "slug": "clamp-function",
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Clamp Function",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Write a function `f(a,b)` that returns `(a*2+b)//2` and print the returned value.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the value returned by `f`.",
    "constraints": "-10^6 <= a,b <= 10^6.",
    "examples": [
      {
        "input": "3 5",
        "output": "5",
        "explanation": "The function returns `(a*2+b)//2` = 5."
      },
      {
        "input": "8 2",
        "output": "9",
        "explanation": "The function returns `(a*2+b)//2` = 9."
      },
      {
        "input": "-4 7",
        "output": "-1",
        "explanation": "The function returns `(a*2+b)//2` = -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "8 2",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "-4 7",
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
    "id": "learn:functions:digit-score-function",
    "slug": "digit-score-function",
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Digit Score Function",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Write a function `f(a,b)` that returns `(a*3+b)//3` and print the returned value.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the value returned by `f`.",
    "constraints": "-10^6 <= a,b <= 10^6.",
    "examples": [
      {
        "input": "3 5",
        "output": "4",
        "explanation": "The function returns `(a*3+b)//3` = 4."
      },
      {
        "input": "8 2",
        "output": "8",
        "explanation": "The function returns `(a*3+b)//3` = 8."
      },
      {
        "input": "-4 7",
        "output": "-2",
        "explanation": "The function returns `(a*3+b)//3` = -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "8 2",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "-4 7",
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
    "id": "learn:functions:range-formula-function",
    "slug": "range-formula-function",
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Range Formula Function",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Write a function `f(a,b)` that returns `(a*4+b)//4` and print the returned value.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the value returned by `f`.",
    "constraints": "-10^6 <= a,b <= 10^6.",
    "examples": [
      {
        "input": "3 5",
        "output": "4",
        "explanation": "The function returns `(a*4+b)//4` = 4."
      },
      {
        "input": "8 2",
        "output": "8",
        "explanation": "The function returns `(a*4+b)//4` = 8."
      },
      {
        "input": "-4 7",
        "output": "-3",
        "explanation": "The function returns `(a*4+b)//4` = -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "8 2",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "-4 7",
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
    "id": "learn:functions:transform-function",
    "slug": "transform-function",
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Transform Function",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Write a function `f(a,b)` that returns `(a*5+b)//5` and print the returned value.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the value returned by `f`.",
    "constraints": "-10^6 <= a,b <= 10^6.",
    "examples": [
      {
        "input": "3 5",
        "output": "4",
        "explanation": "The function returns `(a*5+b)//5` = 4."
      },
      {
        "input": "8 2",
        "output": "8",
        "explanation": "The function returns `(a*5+b)//5` = 8."
      },
      {
        "input": "-4 7",
        "output": "-3",
        "explanation": "The function returns `(a*5+b)//5` = -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "8 2",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "-4 7",
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
    "id": "learn:functions:three-argument-helper",
    "slug": "three-argument-helper",
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Three Argument Helper",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Write a function `f(a,b)` that returns `(a*6+b)//6` and print the returned value.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the value returned by `f`.",
    "constraints": "-10^6 <= a,b <= 10^6.",
    "examples": [
      {
        "input": "3 5",
        "output": "3",
        "explanation": "The function returns `(a*6+b)//6` = 3."
      },
      {
        "input": "8 2",
        "output": "8",
        "explanation": "The function returns `(a*6+b)//6` = 8."
      },
      {
        "input": "-4 7",
        "output": "-3",
        "explanation": "The function returns `(a*6+b)//6` = -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "8 2",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "-4 7",
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
    "id": "learn:functions:reusable-tax-function",
    "slug": "reusable-tax-function",
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Reusable Tax Function",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Write a function `f(a,b)` that returns `(a*7+b)//7` and print the returned value.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the value returned by `f`.",
    "constraints": "-10^6 <= a,b <= 10^6.",
    "examples": [
      {
        "input": "3 5",
        "output": "3",
        "explanation": "The function returns `(a*7+b)//7` = 3."
      },
      {
        "input": "8 2",
        "output": "8",
        "explanation": "The function returns `(a*7+b)//7` = 8."
      },
      {
        "input": "-4 7",
        "output": "-3",
        "explanation": "The function returns `(a*7+b)//7` = -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "8 2",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "-4 7",
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
    "id": "learn:functions:normalization-function",
    "slug": "normalization-function",
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Normalization Function",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Write a function `f(a,b)` that returns `(a*8+b)//8` and print the returned value.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the value returned by `f`.",
    "constraints": "-10^6 <= a,b <= 10^6.",
    "examples": [
      {
        "input": "3 5",
        "output": "3",
        "explanation": "The function returns `(a*8+b)//8` = 3."
      },
      {
        "input": "8 2",
        "output": "8",
        "explanation": "The function returns `(a*8+b)//8` = 8."
      },
      {
        "input": "-4 7",
        "output": "-4",
        "explanation": "The function returns `(a*8+b)//8` = -4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "8 2",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "-4 7",
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
    "id": "learn:functions:composition-function",
    "slug": "composition-function",
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Composition Function",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Write a function `f(a,b)` that returns `(a*9+b)//9` and print the returned value.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the value returned by `f`.",
    "constraints": "-10^6 <= a,b <= 10^6.",
    "examples": [
      {
        "input": "3 5",
        "output": "3",
        "explanation": "The function returns `(a*9+b)//9` = 3."
      },
      {
        "input": "8 2",
        "output": "8",
        "explanation": "The function returns `(a*9+b)//9` = 8."
      },
      {
        "input": "-4 7",
        "output": "-4",
        "explanation": "The function returns `(a*9+b)//9` = -4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "8 2",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "-4 7",
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
    "id": "learn:functions:piecewise-helper-function",
    "slug": "piecewise-helper-function",
    "topicId": "functions",
    "topicSlug": "functions",
    "topicTitle": "Functions",
    "title": "Piecewise Helper Function",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Write a function `f(a,b)` that returns `(a*10+b)//10` and print the returned value.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the value returned by `f`.",
    "constraints": "-10^6 <= a,b <= 10^6.",
    "examples": [
      {
        "input": "3 5",
        "output": "3",
        "explanation": "The function returns `(a*10+b)//10` = 3."
      },
      {
        "input": "8 2",
        "output": "8",
        "explanation": "The function returns `(a*10+b)//10` = 8."
      },
      {
        "input": "-4 7",
        "output": "-4",
        "explanation": "The function returns `(a*10+b)//10` = -4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 5",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "8 2",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "-4 7",
        "expectedOutput": "-4"
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
