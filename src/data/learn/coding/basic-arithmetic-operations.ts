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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:weighted-triple",
    "slug": "weighted-triple",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Weighted Triple",
    "order": 2,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:square-expansion",
    "slug": "square-expansion",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Square Expansion",
    "order": 3,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:rectangle-measure-sum",
    "slug": "rectangle-measure-sum",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Rectangle Measure Sum",
    "order": 4,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:linear-combination",
    "slug": "linear-combination",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Linear Combination",
    "order": 5,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:difference-product",
    "slug": "difference-product",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Difference Product",
    "order": 6,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:triple-sum-square",
    "slug": "triple-sum-square",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Triple Sum Square",
    "order": 7,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:pair-product-sum",
    "slug": "pair-product-sum",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Pair Product Sum",
    "order": 8,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:remainder-expression",
    "slug": "remainder-expression",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Remainder Expression",
    "order": 9,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:scaled-difference",
    "slug": "scaled-difference",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Scaled Difference",
    "order": 10,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:cubic-mix",
    "slug": "cubic-mix",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Cubic Mix",
    "order": 11,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:absolute-triple-difference",
    "slug": "absolute-triple-difference",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Absolute Triple Difference",
    "order": 12,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:average-numerator",
    "slug": "average-numerator",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Average Numerator",
    "order": 13,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:progression-term",
    "slug": "progression-term",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Progression Term",
    "order": 14,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:product-minus-sum",
    "slug": "product-minus-sum",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Product Minus Sum",
    "order": 15,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:nested-multiply-add",
    "slug": "nested-multiply-add",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Nested Multiply Add",
    "order": 16,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:difference-of-squares",
    "slug": "difference-of-squares",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Difference of Squares",
    "order": 17,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:modulo-product",
    "slug": "modulo-product",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Modulo Product",
    "order": 18,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:double-then-add",
    "slug": "double-then-add",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Double Then Add",
    "order": 19,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:three-stage-arithmetic",
    "slug": "three-stage-arithmetic",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Three Stage Arithmetic",
    "order": 20,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:basic-arithmetic-operations:add-two-integers",
    "bankId": "T02-Q01",
    "slug": "add-two-integers",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Add Two Integers",
    "order": 21,
    "difficulty": "Easy",
    "problemStatement": "Return a + b.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "10",
        "explanation": "Substitute a=7 and b=3. Return a + b. Therefore the expected JSON output is 10."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Return a + b. Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "16",
        "explanation": "Substitute a=12 and b=4. Return a + b. Therefore the expected JSON output is 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "16"
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
    "id": "learn:basic-arithmetic-operations:subtract-b-from-a",
    "bankId": "T02-Q02",
    "slug": "subtract-b-from-a",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Subtract B from A",
    "order": 22,
    "difficulty": "Easy",
    "problemStatement": "Return a - b.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "4",
        "explanation": "Substitute a=7 and b=3. Return a - b. Therefore the expected JSON output is 4."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "-5",
        "explanation": "Substitute a=0 and b=5. Return a - b. Therefore the expected JSON output is -5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "8",
        "explanation": "Substitute a=12 and b=4. Return a - b. Therefore the expected JSON output is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "-5"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "8"
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
    "id": "learn:basic-arithmetic-operations:product-of-two-values",
    "bankId": "T02-Q03",
    "slug": "product-of-two-values",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Product of Two Values",
    "order": 23,
    "difficulty": "Easy",
    "problemStatement": "Return a × b.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "21",
        "explanation": "Substitute a=7 and b=3. Return a × b. Therefore the expected JSON output is 21."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "0",
        "explanation": "Substitute a=0 and b=5. Return a × b. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "48",
        "explanation": "Substitute a=12 and b=4. Return a × b. Therefore the expected JSON output is 48."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "48"
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
    "id": "learn:basic-arithmetic-operations:square-sum-formula",
    "bankId": "T02-Q04",
    "slug": "square-sum-formula",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Square Sum Formula",
    "order": 24,
    "difficulty": "Easy",
    "problemStatement": "Return (a + b)² using integer arithmetic.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "100",
        "explanation": "Substitute a=7 and b=3. Return (a + b)² using integer arithmetic. Therefore the expected JSON output is 100."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "25",
        "explanation": "Substitute a=0 and b=5. Return (a + b)² using integer arithmetic. Therefore the expected JSON output is 25."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "256",
        "explanation": "Substitute a=12 and b=4. Return (a + b)² using integer arithmetic. Therefore the expected JSON output is 256."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "100"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "25"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "256"
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
    "id": "learn:basic-arithmetic-operations:t02-q05-difference-of-squares",
    "bankId": "T02-Q05",
    "slug": "t02-q05-difference-of-squares",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Difference of Squares",
    "order": 25,
    "difficulty": "Easy",
    "problemStatement": "Return a² - b².",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "40",
        "explanation": "Substitute a=7 and b=3. Return a² - b². Therefore the expected JSON output is 40."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "-25",
        "explanation": "Substitute a=0 and b=5. Return a² - b². Therefore the expected JSON output is -25."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "128",
        "explanation": "Substitute a=12 and b=4. Return a² - b². Therefore the expected JSON output is 128."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "40"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "-25"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "128"
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
    "id": "learn:basic-arithmetic-operations:sum-of-individual-squares",
    "bankId": "T02-Q06",
    "slug": "sum-of-individual-squares",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Sum of Individual Squares",
    "order": 26,
    "difficulty": "Easy",
    "problemStatement": "Return a² + b².",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "58",
        "explanation": "Substitute a=7 and b=3. Return a² + b². Therefore the expected JSON output is 58."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "25",
        "explanation": "Substitute a=0 and b=5. Return a² + b². Therefore the expected JSON output is 25."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "160",
        "explanation": "Substitute a=12 and b=4. Return a² + b². Therefore the expected JSON output is 160."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "58"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "25"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "160"
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
    "id": "learn:basic-arithmetic-operations:absolute-difference",
    "bankId": "T02-Q07",
    "slug": "absolute-difference",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Absolute Difference",
    "order": 27,
    "difficulty": "Easy",
    "problemStatement": "Return the nonnegative difference |a-b|.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "4",
        "explanation": "Substitute a=7 and b=3. Return the nonnegative difference |a-b|. Therefore the expected JSON output is 4."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Return the nonnegative difference |a-b|. Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "8",
        "explanation": "Substitute a=12 and b=4. Return the nonnegative difference |a-b|. Therefore the expected JSON output is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "8"
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
    "id": "learn:basic-arithmetic-operations:floor-division-with-zero-rule",
    "bankId": "T02-Q08",
    "slug": "floor-division-with-zero-rule",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Floor Division With Zero Rule",
    "order": 28,
    "difficulty": "Medium",
    "problemStatement": "Return floor(a/b), or null if b is zero.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "2",
        "explanation": "Substitute a=7 and b=3. Return floor(a/b), or null if b is zero. Therefore the expected JSON output is 2."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "0",
        "explanation": "Substitute a=0 and b=5. Return floor(a/b), or null if b is zero. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "3",
        "explanation": "Substitute a=12 and b=4. Return floor(a/b), or null if b is zero. Therefore the expected JSON output is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "3"
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
    "id": "learn:basic-arithmetic-operations:remainder-with-zero-rule",
    "bankId": "T02-Q09",
    "slug": "remainder-with-zero-rule",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Remainder With Zero Rule",
    "order": 29,
    "difficulty": "Medium",
    "problemStatement": "Return a modulo |b| as a nonnegative remainder, or null when b is zero.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "1",
        "explanation": "Substitute a=7 and b=3. Return a modulo |b| as a nonnegative remainder, or null when b is zero. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "0",
        "explanation": "Substitute a=0 and b=5. Return a modulo |b| as a nonnegative remainder, or null when b is zero. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":-7,\"b\":-3}",
        "output": "2",
        "explanation": "Substitute a=-7 and b=-3. Return a modulo |b| as a nonnegative remainder, or null when b is zero. Therefore the expected JSON output is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":-7,\"b\":-3}",
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
    "id": "learn:basic-arithmetic-operations:division-quotient-and-remainder",
    "bankId": "T02-Q10",
    "slug": "division-quotient-and-remainder",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Division Quotient and Remainder",
    "order": 30,
    "difficulty": "Medium",
    "problemStatement": "For b != 0, use positive divisor |b| and return {\"quotient\": floor(a/|b|), \"remainder\": a modulo |b|}; return null if b = 0.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "{\"quotient\":2,\"remainder\":1}",
        "explanation": "Substitute a=7 and b=3. For b != 0, use positive divisor |b| and return {\"quotient\": floor(a/|b|), \"remainder\": a modulo |b|}; return null if b = 0. Therefore the expected JSON output is {\"quotient\":2,\"remainder\":1}."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "{\"quotient\":0,\"remainder\":0}",
        "explanation": "Substitute a=0 and b=5. For b != 0, use positive divisor |b| and return {\"quotient\": floor(a/|b|), \"remainder\": a modulo |b|}; return null if b = 0. Therefore the expected JSON output is {\"quotient\":0,\"remainder\":0}."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "{\"quotient\":3,\"remainder\":0}",
        "explanation": "Substitute a=12 and b=4. For b != 0, use positive divisor |b| and return {\"quotient\": floor(a/|b|), \"remainder\": a modulo |b|}; return null if b = 0. Therefore the expected JSON output is {\"quotient\":3,\"remainder\":0}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "{\"quotient\":2,\"remainder\":1}"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "{\"quotient\":0,\"remainder\":0}"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "{\"quotient\":3,\"remainder\":0}"
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
    "id": "learn:basic-arithmetic-operations:euclidean-gcd",
    "bankId": "T02-Q11",
    "slug": "euclidean-gcd",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Euclidean GCD",
    "order": 31,
    "difficulty": "Medium",
    "problemStatement": "Return the greatest common divisor of |a| and |b|, with gcd(0,0)=0.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "1",
        "explanation": "Substitute a=7 and b=3. Return the greatest common divisor of |a| and |b|, with gcd(0,0)=0. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Return the greatest common divisor of |a| and |b|, with gcd(0,0)=0. Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "4",
        "explanation": "Substitute a=12 and b=4. Return the greatest common divisor of |a| and |b|, with gcd(0,0)=0. Therefore the expected JSON output is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "4"
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
    "id": "learn:basic-arithmetic-operations:least-common-multiple",
    "bankId": "T02-Q12",
    "slug": "least-common-multiple",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Least Common Multiple",
    "order": 32,
    "difficulty": "Medium",
    "problemStatement": "Return lcm(|a|,|b|), or zero if either number is zero.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "21",
        "explanation": "Substitute a=7 and b=3. Return lcm(|a|,|b|), or zero if either number is zero. Therefore the expected JSON output is 21."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "0",
        "explanation": "Substitute a=0 and b=5. Return lcm(|a|,|b|), or zero if either number is zero. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "12",
        "explanation": "Substitute a=12 and b=4. Return lcm(|a|,|b|), or zero if either number is zero. Therefore the expected JSON output is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "12"
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
    "id": "learn:basic-arithmetic-operations:weighted-sum",
    "bankId": "T02-Q13",
    "slug": "weighted-sum",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Weighted Sum",
    "order": 33,
    "difficulty": "Medium",
    "problemStatement": "Return 2a + 3b.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "23",
        "explanation": "Substitute a=7 and b=3. Return 2a + 3b. Therefore the expected JSON output is 23."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "15",
        "explanation": "Substitute a=0 and b=5. Return 2a + 3b. Therefore the expected JSON output is 15."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "36",
        "explanation": "Substitute a=12 and b=4. Return 2a + 3b. Therefore the expected JSON output is 36."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "23"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "36"
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
    "id": "learn:basic-arithmetic-operations:average-as-reduced-fraction",
    "bankId": "T02-Q14",
    "slug": "average-as-reduced-fraction",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Average as Reduced Fraction",
    "order": 34,
    "difficulty": "Medium",
    "problemStatement": "Represent the average (a+b)/2 as a reduced object {\"numerator\":p,\"denominator\":q}, with q positive.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "{\"numerator\":5,\"denominator\":1}",
        "explanation": "Substitute a=7 and b=3. Represent the average (a+b)/2 as a reduced object {\"numerator\":p,\"denominator\":q}, with q positive. Therefore the expected JSON output is {\"numerator\":5,\"denominator\":1}."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "{\"numerator\":5,\"denominator\":2}",
        "explanation": "Substitute a=0 and b=5. Represent the average (a+b)/2 as a reduced object {\"numerator\":p,\"denominator\":q}, with q positive. Therefore the expected JSON output is {\"numerator\":5,\"denominator\":2}."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "{\"numerator\":8,\"denominator\":1}",
        "explanation": "Substitute a=12 and b=4. Represent the average (a+b)/2 as a reduced object {\"numerator\":p,\"denominator\":q}, with q positive. Therefore the expected JSON output is {\"numerator\":8,\"denominator\":1}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "{\"numerator\":5,\"denominator\":1}"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "{\"numerator\":5,\"denominator\":2}"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "{\"numerator\":8,\"denominator\":1}"
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
    "id": "learn:basic-arithmetic-operations:closest-multiple-of-five",
    "bankId": "T02-Q15",
    "slug": "closest-multiple-of-five",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Closest Multiple of Five",
    "order": 35,
    "difficulty": "Medium",
    "problemStatement": "Return the multiple of five closest to a+b; ties round toward the smaller multiple.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "10",
        "explanation": "Substitute a=7 and b=3. Return the multiple of five closest to a+b; ties round toward the smaller multiple. Therefore the expected JSON output is 10."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "5",
        "explanation": "Substitute a=0 and b=5. Return the multiple of five closest to a+b; ties round toward the smaller multiple. Therefore the expected JSON output is 5."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "15",
        "explanation": "Substitute a=12 and b=4. Return the multiple of five closest to a+b; ties round toward the smaller multiple. Therefore the expected JSON output is 15."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "15"
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
    "id": "learn:basic-arithmetic-operations:three-consecutive-multiples",
    "bankId": "T02-Q16",
    "slug": "three-consecutive-multiples",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Three Consecutive Multiples",
    "order": 36,
    "difficulty": "Hard",
    "problemStatement": "Return [a*b, a*(b+1), a*(b+2)].",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "[21,28,35]",
        "explanation": "Substitute a=7 and b=3. Return [a*b, a*(b+1), a*(b+2)]. Therefore the expected JSON output is [21,28,35]."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "[0,0,0]",
        "explanation": "Substitute a=0 and b=5. Return [a*b, a*(b+1), a*(b+2)]. Therefore the expected JSON output is [0,0,0]."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "[48,60,72]",
        "explanation": "Substitute a=12 and b=4. Return [a*b, a*(b+1), a*(b+2)]. Therefore the expected JSON output is [48,60,72]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "[21,28,35]"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "[0,0,0]"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "[48,60,72]"
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
    "id": "learn:basic-arithmetic-operations:rectangle-perimeter",
    "bankId": "T02-Q17",
    "slug": "rectangle-perimeter",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Rectangle Perimeter",
    "order": 37,
    "difficulty": "Hard",
    "problemStatement": "Treat |a| and |b| as rectangle side lengths; return its perimeter.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "20",
        "explanation": "Substitute a=7 and b=3. Treat |a| and |b| as rectangle side lengths; return its perimeter. Therefore the expected JSON output is 20."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "10",
        "explanation": "Substitute a=0 and b=5. Treat |a| and |b| as rectangle side lengths; return its perimeter. Therefore the expected JSON output is 10."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "32",
        "explanation": "Substitute a=12 and b=4. Treat |a| and |b| as rectangle side lengths; return its perimeter. Therefore the expected JSON output is 32."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "20"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "32"
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
    "id": "learn:basic-arithmetic-operations:rectangle-area",
    "bankId": "T02-Q18",
    "slug": "rectangle-area",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Rectangle Area",
    "order": 38,
    "difficulty": "Hard",
    "problemStatement": "Treat |a| and |b| as rectangle side lengths; return the area.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "21",
        "explanation": "Substitute a=7 and b=3. Treat |a| and |b| as rectangle side lengths; return the area. Therefore the expected JSON output is 21."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "0",
        "explanation": "Substitute a=0 and b=5. Treat |a| and |b| as rectangle side lengths; return the area. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "48",
        "explanation": "Substitute a=12 and b=4. Treat |a| and |b| as rectangle side lengths; return the area. Therefore the expected JSON output is 48."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "21"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "48"
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
    "id": "learn:basic-arithmetic-operations:power-with-bounded-exponent",
    "bankId": "T02-Q19",
    "slug": "power-with-bounded-exponent",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Power With Bounded Exponent",
    "order": 39,
    "difficulty": "Hard",
    "problemStatement": "Return a raised to the nonnegative exponent abs(b) modulo 7.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "0",
        "explanation": "Substitute a=7 and b=3. Return a raised to the nonnegative exponent abs(b) modulo 7. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "2",
        "explanation": "Substitute a=12 and b=4. Return a raised to the nonnegative exponent abs(b) modulo 7. Therefore the expected JSON output is 2."
      },
      {
        "input": "{\"a\":1,\"b\":1}",
        "output": "1",
        "explanation": "Substitute a=1 and b=1. Return a raised to the nonnegative exponent abs(b) modulo 7. Therefore the expected JSON output is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":1,\"b\":1}",
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
    "id": "learn:basic-arithmetic-operations:digit-sum-of-product",
    "bankId": "T02-Q20",
    "slug": "digit-sum-of-product",
    "topicId": "basic-arithmetic-operations",
    "topicSlug": "basic-arithmetic-operations",
    "topicTitle": "Basic Arithmetic Operations",
    "title": "Digit Sum of Product",
    "order": 40,
    "difficulty": "Hard",
    "problemStatement": "Multiply a and b, then add all decimal digits of its absolute value.",
    "inputFormat": "A single JSON object: {\"a\": integer, \"b\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-100 ≤ a,b ≤ 100; operations specify their own zero-handling; outputs are exact integers or JSON objects.",
    "examples": [
      {
        "input": "{\"a\":7,\"b\":3}",
        "output": "3",
        "explanation": "Substitute a=7 and b=3. Multiply a and b, then add all decimal digits of its absolute value. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"a\":0,\"b\":5}",
        "output": "0",
        "explanation": "Substitute a=0 and b=5. Multiply a and b, then add all decimal digits of its absolute value. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"a\":12,\"b\":4}",
        "output": "12",
        "explanation": "Substitute a=12 and b=4. Multiply a and b, then add all decimal digits of its absolute value. Therefore the expected JSON output is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"a\":7,\"b\":3}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"a\":0,\"b\":5}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"a\":12,\"b\":4}",
        "expectedOutput": "12"
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
  }
]

export default questions
