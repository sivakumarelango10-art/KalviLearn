import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:basic-arithmetic-operations:arithmetic-check",
    "slug": "arithmetic-check",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Arithmetic Check",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `(a+b)*c-b`. This arithmetic objective is **Arithmetic Check**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "17",
        "explanation": "Substituting into `(a+b)*c-b` gives `17`."
      },
      {
        "input": "5 -2 3",
        "output": "11",
        "explanation": "Substituting into `(a+b)*c-b` gives `11`."
      },
      {
        "input": "7 1 2",
        "output": "15",
        "explanation": "Substituting into `(a+b)*c-b` gives `15`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "17"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "11"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
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
    "id": "learn:basic-arithmetic-operations:weighted-triple",
    "slug": "weighted-triple",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Weighted Triple",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `2*a+3*b+5*c`. This arithmetic objective is **Weighted Triple**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "33",
        "explanation": "Substituting into `2*a+3*b+5*c` gives `33`."
      },
      {
        "input": "5 -2 3",
        "output": "19",
        "explanation": "Substituting into `2*a+3*b+5*c` gives `19`."
      },
      {
        "input": "7 1 2",
        "output": "27",
        "explanation": "Substituting into `2*a+3*b+5*c` gives `27`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "33"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "19"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
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
    "id": "learn:basic-arithmetic-operations:square-expansion",
    "slug": "square-expansion",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Square Expansion",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `a^2+2ab+b^2+c`. This arithmetic objective is **Square Expansion**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "29",
        "explanation": "Substituting into `a^2+2ab+b^2+c` gives `29`."
      },
      {
        "input": "5 -2 3",
        "output": "12",
        "explanation": "Substituting into `a^2+2ab+b^2+c` gives `12`."
      },
      {
        "input": "7 1 2",
        "output": "66",
        "explanation": "Substituting into `a^2+2ab+b^2+c` gives `66`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "29"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "12"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
        "expectedOutput": "66"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:basic-arithmetic-operations:rectangle-measure-sum",
    "slug": "rectangle-measure-sum",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Rectangle Measure Sum",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `area + perimeter + c`. This arithmetic objective is **Rectangle Measure Sum**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "20",
        "explanation": "Substituting into `area + perimeter + c` gives `20`."
      },
      {
        "input": "5 -2 3",
        "output": "-1",
        "explanation": "Substituting into `area + perimeter + c` gives `-1`."
      },
      {
        "input": "7 1 2",
        "output": "25",
        "explanation": "Substituting into `area + perimeter + c` gives `25`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "20"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
        "expectedOutput": "25"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:basic-arithmetic-operations:linear-combination",
    "slug": "linear-combination",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Linear Combination",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `a*b+c`. This arithmetic objective is **Linear Combination**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "10",
        "explanation": "Substituting into `a*b+c` gives `10`."
      },
      {
        "input": "5 -2 3",
        "output": "-7",
        "explanation": "Substituting into `a*b+c` gives `-7`."
      },
      {
        "input": "7 1 2",
        "output": "9",
        "explanation": "Substituting into `a*b+c` gives `9`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "-7"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
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
    "id": "learn:basic-arithmetic-operations:difference-product",
    "slug": "difference-product",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Difference Product",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `(a-b)*(b-c)`. This arithmetic objective is **Difference Product**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "1",
        "explanation": "Substituting into `(a-b)*(b-c)` gives `1`."
      },
      {
        "input": "5 -2 3",
        "output": "-35",
        "explanation": "Substituting into `(a-b)*(b-c)` gives `-35`."
      },
      {
        "input": "7 1 2",
        "output": "-6",
        "explanation": "Substituting into `(a-b)*(b-c)` gives `-6`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "-35"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
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
    "id": "learn:basic-arithmetic-operations:triple-sum-square",
    "slug": "triple-sum-square",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Triple Sum Square",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `(a+b+c)^2`. This arithmetic objective is **Triple Sum Square**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "81",
        "explanation": "Substituting into `(a+b+c)^2` gives `81`."
      },
      {
        "input": "5 -2 3",
        "output": "36",
        "explanation": "Substituting into `(a+b+c)^2` gives `36`."
      },
      {
        "input": "7 1 2",
        "output": "100",
        "explanation": "Substituting into `(a+b+c)^2` gives `100`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "81"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "36"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
        "expectedOutput": "100"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:basic-arithmetic-operations:pair-product-sum",
    "slug": "pair-product-sum",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Pair Product Sum",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `ab+bc+ca`. This arithmetic objective is **Pair Product Sum**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "26",
        "explanation": "Substituting into `ab+bc+ca` gives `26`."
      },
      {
        "input": "5 -2 3",
        "output": "-1",
        "explanation": "Substituting into `ab+bc+ca` gives `-1`."
      },
      {
        "input": "7 1 2",
        "output": "23",
        "explanation": "Substituting into `ab+bc+ca` gives `23`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "26"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
        "expectedOutput": "23"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:basic-arithmetic-operations:remainder-expression",
    "slug": "remainder-expression",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Remainder Expression",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `a%b+c`. This arithmetic objective is **Remainder Expression**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "6",
        "explanation": "Substituting into `a%b+c` gives `6`."
      },
      {
        "input": "5 -2 3",
        "output": "2",
        "explanation": "Substituting into `a%b+c` gives `2`."
      },
      {
        "input": "7 1 2",
        "output": "2",
        "explanation": "Substituting into `a%b+c` gives `2`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
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
    "id": "learn:basic-arithmetic-operations:scaled-difference",
    "slug": "scaled-difference",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Scaled Difference",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `(a-b)*c`. This arithmetic objective is **Scaled Difference**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "-4",
        "explanation": "Substituting into `(a-b)*c` gives `-4`."
      },
      {
        "input": "5 -2 3",
        "output": "21",
        "explanation": "Substituting into `(a-b)*c` gives `21`."
      },
      {
        "input": "7 1 2",
        "output": "12",
        "explanation": "Substituting into `(a-b)*c` gives `12`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "-4"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "21"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
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
    "id": "learn:basic-arithmetic-operations:cubic-mix",
    "slug": "cubic-mix",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Cubic Mix",
    "order": 11,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `a^3+b^2+c`. This arithmetic objective is **Cubic Mix**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "21",
        "explanation": "Substituting into `a^3+b^2+c` gives `21`."
      },
      {
        "input": "5 -2 3",
        "output": "132",
        "explanation": "Substituting into `a^3+b^2+c` gives `132`."
      },
      {
        "input": "7 1 2",
        "output": "346",
        "explanation": "Substituting into `a^3+b^2+c` gives `346`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "132"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
        "expectedOutput": "346"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:basic-arithmetic-operations:absolute-triple-difference",
    "slug": "absolute-triple-difference",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Absolute Triple Difference",
    "order": 12,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `|a-b|+|b-c|`. This arithmetic objective is **Absolute Triple Difference**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "2",
        "explanation": "Substituting into `|a-b|+|b-c|` gives `2`."
      },
      {
        "input": "5 -2 3",
        "output": "12",
        "explanation": "Substituting into `|a-b|+|b-c|` gives `12`."
      },
      {
        "input": "7 1 2",
        "output": "7",
        "explanation": "Substituting into `|a-b|+|b-c|` gives `7`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "12"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
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
    "id": "learn:basic-arithmetic-operations:average-numerator",
    "slug": "average-numerator",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Average Numerator",
    "order": 13,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `sum used as the numerator of the mean`. This arithmetic objective is **Average Numerator**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "9",
        "explanation": "Substituting into `sum used as the numerator of the mean` gives `9`."
      },
      {
        "input": "5 -2 3",
        "output": "6",
        "explanation": "Substituting into `sum used as the numerator of the mean` gives `6`."
      },
      {
        "input": "7 1 2",
        "output": "10",
        "explanation": "Substituting into `sum used as the numerator of the mean` gives `10`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
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
    "id": "learn:basic-arithmetic-operations:progression-term",
    "slug": "progression-term",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Progression Term",
    "order": 14,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `a+(c-1)*b`. This arithmetic objective is **Progression Term**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "11",
        "explanation": "Substituting into `a+(c-1)*b` gives `11`."
      },
      {
        "input": "5 -2 3",
        "output": "1",
        "explanation": "Substituting into `a+(c-1)*b` gives `1`."
      },
      {
        "input": "7 1 2",
        "output": "8",
        "explanation": "Substituting into `a+(c-1)*b` gives `8`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "11"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
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
    "id": "learn:basic-arithmetic-operations:product-minus-sum",
    "slug": "product-minus-sum",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Product Minus Sum",
    "order": 15,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `abc-(a+b+c)`. This arithmetic objective is **Product Minus Sum**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "15",
        "explanation": "Substituting into `abc-(a+b+c)` gives `15`."
      },
      {
        "input": "5 -2 3",
        "output": "-36",
        "explanation": "Substituting into `abc-(a+b+c)` gives `-36`."
      },
      {
        "input": "7 1 2",
        "output": "4",
        "explanation": "Substituting into `abc-(a+b+c)` gives `4`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "15"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "-36"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
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
    "id": "learn:basic-arithmetic-operations:nested-multiply-add",
    "slug": "nested-multiply-add",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Nested Multiply Add",
    "order": 16,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `(ab+c)b`. This arithmetic objective is **Nested Multiply Add**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "30",
        "explanation": "Substituting into `(ab+c)b` gives `30`."
      },
      {
        "input": "5 -2 3",
        "output": "14",
        "explanation": "Substituting into `(ab+c)b` gives `14`."
      },
      {
        "input": "7 1 2",
        "output": "9",
        "explanation": "Substituting into `(ab+c)b` gives `9`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "30"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "14"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
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
    "id": "learn:basic-arithmetic-operations:difference-of-squares",
    "slug": "difference-of-squares",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Difference of Squares",
    "order": 17,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `a^2-b^2+c`. This arithmetic objective is **Difference of Squares**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "-1",
        "explanation": "Substituting into `a^2-b^2+c` gives `-1`."
      },
      {
        "input": "5 -2 3",
        "output": "24",
        "explanation": "Substituting into `a^2-b^2+c` gives `24`."
      },
      {
        "input": "7 1 2",
        "output": "50",
        "explanation": "Substituting into `a^2-b^2+c` gives `50`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "24"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
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
    "id": "learn:basic-arithmetic-operations:modulo-product",
    "slug": "modulo-product",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Modulo Product",
    "order": 18,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `(a*b)%c`. This arithmetic objective is **Modulo Product**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "2",
        "explanation": "Substituting into `(a*b)%c` gives `2`."
      },
      {
        "input": "5 -2 3",
        "output": "2",
        "explanation": "Substituting into `(a*b)%c` gives `2`."
      },
      {
        "input": "7 1 2",
        "output": "1",
        "explanation": "Substituting into `(a*b)%c` gives `1`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
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
    "id": "learn:basic-arithmetic-operations:double-then-add",
    "slug": "double-then-add",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Double Then Add",
    "order": 19,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `2a+2b+c`. This arithmetic objective is **Double Then Add**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "14",
        "explanation": "Substituting into `2a+2b+c` gives `14`."
      },
      {
        "input": "5 -2 3",
        "output": "9",
        "explanation": "Substituting into `2a+2b+c` gives `9`."
      },
      {
        "input": "7 1 2",
        "output": "18",
        "explanation": "Substituting into `2a+2b+c` gives `18`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "14"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
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
    "id": "learn:basic-arithmetic-operations:three-stage-arithmetic",
    "slug": "three-stage-arithmetic",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Three Stage Arithmetic",
    "order": 20,
    "difficulty": "Easy",
    "problemStatement": "Given integers `a`, `b`, and `c`, compute `(a+c)(b+1)-c`. This arithmetic objective is **Three Stage Arithmetic**.",
    "inputFormat": "One line contains three integers `a b c`.",
    "outputFormat": "Print the resulting integer.",
    "constraints": "-10^6 <= a,b,c <= 10^6; whenever a divisor/modulus is used, the supplied divisor is non-zero.",
    "examples": [
      {
        "input": "2 3 4",
        "output": "20",
        "explanation": "Substituting into `(a+c)(b+1)-c` gives `20`."
      },
      {
        "input": "5 -2 3",
        "output": "-11",
        "explanation": "Substituting into `(a+c)(b+1)-c` gives `-11`."
      },
      {
        "input": "7 1 2",
        "output": "16",
        "explanation": "Substituting into `(a+c)(b+1)-c` gives `16`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3 4",
        "expectedOutput": "20"
      },
      {
        "testIndex": 2,
        "input": "5 -2 3",
        "expectedOutput": "-11"
      },
      {
        "testIndex": 3,
        "input": "7 1 2",
        "expectedOutput": "16"
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
