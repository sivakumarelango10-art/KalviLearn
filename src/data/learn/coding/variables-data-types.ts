import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:variables-data-types:profile-echo",
    "slug": "profile-echo",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Profile Echo",
    "order": 1,
    "problemStatement": "Read a single-word name, an integer age, and an integer height, then print them on one line.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "Asha\n19\n162",
        "output": "Asha 19 162",
        "explanation": "The three stored fields are printed in the order name, age, height."
      },
      {
        "input": "Ravi\n21\n175",
        "output": "Ravi 21 175",
        "explanation": "The three stored fields are printed in the order name, age, height."
      },
      {
        "input": "Mira\n18\n158",
        "output": "Mira 18 158",
        "explanation": "The three stored fields are printed in the order name, age, height."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "Asha\n19\n162",
        "expectedOutput": "Asha 19 162"
      },
      {
        "testIndex": 2,
        "input": "Ravi\n21\n175",
        "expectedOutput": "Ravi 21 175"
      },
      {
        "testIndex": 3,
        "input": "Mira\n18\n158",
        "expectedOutput": "Mira 18 158"
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
    "id": "learn:variables-data-types:swap-stored-integers",
    "slug": "swap-stored-integers",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Swap Stored Integers",
    "order": 2,
    "problemStatement": "Read two integers, exchange the values stored in the two variables, and print the swapped values.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "4 9",
        "output": "9 4",
        "explanation": "Swapping makes the second value `9` come first and `4` come second."
      },
      {
        "input": "-2 5",
        "output": "5 -2",
        "explanation": "Swapping makes the second value `5` come first and `-2` come second."
      },
      {
        "input": "7 7",
        "output": "7 7",
        "explanation": "Swapping makes the second value `7` come first and `7` come second."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4 9",
        "expectedOutput": "9 4"
      },
      {
        "testIndex": 2,
        "input": "-2 5",
        "expectedOutput": "5 -2"
      },
      {
        "testIndex": 3,
        "input": "7 7",
        "expectedOutput": "7 7"
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
    "id": "learn:variables-data-types:character-code",
    "slug": "character-code",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Character Code",
    "order": 3,
    "problemStatement": "Read one ASCII character and print its integer ASCII code.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "A",
        "output": "65",
        "explanation": "ASCII code of `A` is `65`."
      },
      {
        "input": "a",
        "output": "97",
        "explanation": "ASCII code of `a` is `97`."
      },
      {
        "input": "0",
        "output": "48",
        "explanation": "ASCII code of `0` is `48`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "A",
        "expectedOutput": "65"
      },
      {
        "testIndex": 2,
        "input": "a",
        "expectedOutput": "97"
      },
      {
        "testIndex": 3,
        "input": "0",
        "expectedOutput": "48"
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
    "id": "learn:variables-data-types:digit-character",
    "slug": "digit-character",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Digit Character",
    "order": 4,
    "problemStatement": "Read an integer from 0 to 9 and print the corresponding digit character.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "7",
        "output": "7",
        "explanation": "Digit value `7` converts to character `7`."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Digit value `0` converts to character `0`."
      },
      {
        "input": "9",
        "output": "9",
        "explanation": "Digit value `9` converts to character `9`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "9",
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
    "id": "learn:variables-data-types:boolean-conversion",
    "slug": "boolean-conversion",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Boolean Conversion",
    "order": 5,
    "problemStatement": "Read integer x and print FALSE when x is zero; otherwise print TRUE.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "0",
        "output": "FALSE",
        "explanation": "Zero maps to FALSE."
      },
      {
        "input": "7",
        "output": "TRUE",
        "explanation": "The value is non-zero, so it maps to TRUE."
      },
      {
        "input": "-3",
        "output": "TRUE",
        "explanation": "The value is non-zero, so it maps to TRUE."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "0",
        "expectedOutput": "FALSE"
      },
      {
        "testIndex": 2,
        "input": "7",
        "expectedOutput": "TRUE"
      },
      {
        "testIndex": 3,
        "input": "-3",
        "expectedOutput": "TRUE"
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
    "id": "learn:variables-data-types:integer-fraction-split",
    "slug": "integer-fraction-split",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer Fraction Split",
    "order": 6,
    "problemStatement": "Read a non-negative decimal x and print its integer part and fractional part to three decimal places.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "12.375",
        "output": "12 0.375",
        "explanation": "The integer part is 12; the remaining fractional part is 0.375."
      },
      {
        "input": "8.5",
        "output": "8 0.500",
        "explanation": "The integer part is 8; the remaining fractional part is 0.500."
      },
      {
        "input": "0.125",
        "output": "0 0.125",
        "explanation": "The integer part is 0; the remaining fractional part is 0.125."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "12.375",
        "expectedOutput": "12 0.375"
      },
      {
        "testIndex": 2,
        "input": "8.5",
        "expectedOutput": "8 0.500"
      },
      {
        "testIndex": 3,
        "input": "0.125",
        "expectedOutput": "0 0.125"
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
    "id": "learn:variables-data-types:high-low-byte",
    "slug": "high-low-byte",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "High Low Byte",
    "order": 7,
    "problemStatement": "Read integer n from 0 to 65535 and print n//256 and n%256.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "513",
        "output": "2 1",
        "explanation": "513//256=2 and 513%256=1."
      },
      {
        "input": "1",
        "output": "0 1",
        "explanation": "1//256=0 and 1%256=1."
      },
      {
        "input": "65535",
        "output": "255 255",
        "explanation": "65535//256=255 and 65535%256=255."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "513",
        "expectedOutput": "2 1"
      },
      {
        "testIndex": 2,
        "input": "1",
        "expectedOutput": "0 1"
      },
      {
        "testIndex": 3,
        "input": "65535",
        "expectedOutput": "255 255"
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
    "id": "learn:variables-data-types:rupees-paise-split",
    "slug": "rupees-paise-split",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Rupees Paise Split",
    "order": 8,
    "problemStatement": "Read an amount in paise and print full rupees and remaining paise.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "12345",
        "output": "123 45",
        "explanation": "12345 paise contains 123 full rupees and 45 paise."
      },
      {
        "input": "99",
        "output": "0 99",
        "explanation": "99 paise contains 0 full rupees and 99 paise."
      },
      {
        "input": "500",
        "output": "5 0",
        "explanation": "500 paise contains 5 full rupees and 0 paise."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "12345",
        "expectedOutput": "123 45"
      },
      {
        "testIndex": 2,
        "input": "99",
        "expectedOutput": "0 99"
      },
      {
        "testIndex": 3,
        "input": "500",
        "expectedOutput": "5 0"
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
    "id": "learn:variables-data-types:two-digit-split",
    "slug": "two-digit-split",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Two Digit Split",
    "order": 9,
    "problemStatement": "Read a two-digit integer and print its tens digit and ones digit.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "47",
        "output": "4 7",
        "explanation": "The tens digit is 4 and the ones digit is 7."
      },
      {
        "input": "10",
        "output": "1 0",
        "explanation": "The tens digit is 1 and the ones digit is 0."
      },
      {
        "input": "99",
        "output": "9 9",
        "explanation": "The tens digit is 9 and the ones digit is 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "47",
        "expectedOutput": "4 7"
      },
      {
        "testIndex": 2,
        "input": "10",
        "expectedOutput": "1 0"
      },
      {
        "testIndex": 3,
        "input": "99",
        "expectedOutput": "9 9"
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
    "id": "learn:variables-data-types:coordinate-formatting",
    "slug": "coordinate-formatting",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Coordinate Formatting",
    "order": 10,
    "problemStatement": "Read integer x and y and print them in the exact form (x,y).",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "3 4",
        "output": "(3,4)",
        "explanation": "The coordinates are formatted exactly as `(3,4)`."
      },
      {
        "input": "-2 5",
        "output": "(-2,5)",
        "explanation": "The coordinates are formatted exactly as `(-2,5)`."
      },
      {
        "input": "0 0",
        "output": "(0,0)",
        "explanation": "The coordinates are formatted exactly as `(0,0)`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 4",
        "expectedOutput": "(3,4)"
      },
      {
        "testIndex": 2,
        "input": "-2 5",
        "expectedOutput": "(-2,5)"
      },
      {
        "testIndex": 3,
        "input": "0 0",
        "expectedOutput": "(0,0)"
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
    "id": "learn:variables-data-types:signed-magnitude",
    "slug": "signed-magnitude",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Signed Magnitude",
    "order": 11,
    "problemStatement": "Read integer n and print its sign marker (+, -, or 0) followed by its absolute magnitude.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "-17",
        "output": "- 17",
        "explanation": "The sign marker and absolute magnitude of -17 are printed."
      },
      {
        "input": "5",
        "output": "+ 5",
        "explanation": "The sign marker and absolute magnitude of 5 are printed."
      },
      {
        "input": "0",
        "output": "0 0",
        "explanation": "The sign marker and absolute magnitude of 0 are printed."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "-17",
        "expectedOutput": "- 17"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "+ 5"
      },
      {
        "testIndex": 3,
        "input": "0",
        "expectedOutput": "0 0"
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
    "id": "learn:variables-data-types:hours-to-minutes",
    "slug": "hours-to-minutes",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Hours to Minutes",
    "order": 12,
    "problemStatement": "Read a decimal number of hours and print the equivalent whole number of minutes.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "1.5",
        "output": "90",
        "explanation": "1.5 hours × 60 = 90 minutes."
      },
      {
        "input": "2",
        "output": "120",
        "explanation": "2 hours × 60 = 120 minutes."
      },
      {
        "input": "0.25",
        "output": "15",
        "explanation": "0.25 hours × 60 = 15 minutes."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "1.5",
        "expectedOutput": "90"
      },
      {
        "testIndex": 2,
        "input": "2",
        "expectedOutput": "120"
      },
      {
        "testIndex": 3,
        "input": "0.25",
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
    "id": "learn:variables-data-types:scientific-pair-value",
    "slug": "scientific-pair-value",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Scientific Pair Value",
    "order": 13,
    "problemStatement": "Read integers a and b and print a multiplied by 10 raised to b.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "3 2",
        "output": "300",
        "explanation": "3 × 10^2 = 300."
      },
      {
        "input": "-12 1",
        "output": "-120",
        "explanation": "-12 × 10^1 = -120."
      },
      {
        "input": "7 0",
        "output": "7",
        "explanation": "7 × 10^0 = 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 2",
        "expectedOutput": "300"
      },
      {
        "testIndex": 2,
        "input": "-12 1",
        "expectedOutput": "-120"
      },
      {
        "testIndex": 3,
        "input": "7 0",
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
    "id": "learn:variables-data-types:date-field-formatting",
    "slug": "date-field-formatting",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Date Field Formatting",
    "order": 14,
    "problemStatement": "Read day, month, and year and print YYYY-MM-DD using two digits for day and month.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "6 10 2026",
        "output": "2026-10-06",
        "explanation": "Formatting year-month-day gives `2026-10-06`."
      },
      {
        "input": "1 1 2000",
        "output": "2000-01-01",
        "explanation": "Formatting year-month-day gives `2000-01-01`."
      },
      {
        "input": "31 12 1999",
        "output": "1999-12-31",
        "explanation": "Formatting year-month-day gives `1999-12-31`."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "6 10 2026",
        "expectedOutput": "2026-10-06"
      },
      {
        "testIndex": 2,
        "input": "1 1 2000",
        "expectedOutput": "2000-01-01"
      },
      {
        "testIndex": 3,
        "input": "31 12 1999",
        "expectedOutput": "1999-12-31"
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
    "id": "learn:variables-data-types:celsius-fahrenheit-pair",
    "slug": "celsius-fahrenheit-pair",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Celsius Fahrenheit Pair",
    "order": 15,
    "problemStatement": "Read integer Celsius c and print c followed by its Fahrenheit value with one decimal place.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "0",
        "output": "0 32.0",
        "explanation": "F = C×9/5+32 = 32.0."
      },
      {
        "input": "100",
        "output": "100 212.0",
        "explanation": "F = C×9/5+32 = 212.0."
      },
      {
        "input": "-40",
        "output": "-40 -40.0",
        "explanation": "F = C×9/5+32 = -40.0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "0",
        "expectedOutput": "0 32.0"
      },
      {
        "testIndex": 2,
        "input": "100",
        "expectedOutput": "100 212.0"
      },
      {
        "testIndex": 3,
        "input": "-40",
        "expectedOutput": "-40 -40.0"
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
    "id": "learn:variables-data-types:quotient-two-decimals",
    "slug": "quotient-two-decimals",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Quotient Two Decimals",
    "order": 16,
    "problemStatement": "Read integers a and non-zero b and print a/b with exactly two decimal places.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "5 2",
        "output": "2.50",
        "explanation": "5/2 = 2.50 when shown with two decimals."
      },
      {
        "input": "1 4",
        "output": "0.25",
        "explanation": "1/4 = 0.25 when shown with two decimals."
      },
      {
        "input": "-3 2",
        "output": "-1.50",
        "explanation": "-3/2 = -1.50 when shown with two decimals."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 2",
        "expectedOutput": "2.50"
      },
      {
        "testIndex": 2,
        "input": "1 4",
        "expectedOutput": "0.25"
      },
      {
        "testIndex": 3,
        "input": "-3 2",
        "expectedOutput": "-1.50"
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
    "id": "learn:variables-data-types:binary-flags-to-words",
    "slug": "binary-flags-to-words",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Binary Flags to Words",
    "order": 17,
    "problemStatement": "Read two values that are each 0 or 1 and print FALSE/TRUE for each.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "0 1",
        "output": "FALSE TRUE",
        "explanation": "Each 0 maps to FALSE and each 1 maps to TRUE."
      },
      {
        "input": "1 0",
        "output": "TRUE FALSE",
        "explanation": "Each 0 maps to FALSE and each 1 maps to TRUE."
      },
      {
        "input": "0 0",
        "output": "FALSE FALSE",
        "explanation": "Each 0 maps to FALSE and each 1 maps to TRUE."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "0 1",
        "expectedOutput": "FALSE TRUE"
      },
      {
        "testIndex": 2,
        "input": "1 0",
        "expectedOutput": "TRUE FALSE"
      },
      {
        "testIndex": 3,
        "input": "0 0",
        "expectedOutput": "FALSE FALSE"
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
    "id": "learn:variables-data-types:typed-record",
    "slug": "typed-record",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Typed Record",
    "order": 18,
    "problemStatement": "Read integer id, decimal score, and character grade; print them separated by vertical bars.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "17 88.5 A",
        "output": "17|88.5|A",
        "explanation": "The fields are printed in ID|score|grade format."
      },
      {
        "input": "3 70 B",
        "output": "3|70|B",
        "explanation": "The fields are printed in ID|score|grade format."
      },
      {
        "input": "999 0 F",
        "output": "999|0|F",
        "explanation": "The fields are printed in ID|score|grade format."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "17 88.5 A",
        "expectedOutput": "17|88.5|A"
      },
      {
        "testIndex": 2,
        "input": "3 70 B",
        "expectedOutput": "3|70|B"
      },
      {
        "testIndex": 3,
        "input": "999 0 F",
        "expectedOutput": "999|0|F"
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
    "id": "learn:variables-data-types:cyclic-uppercase-offset",
    "slug": "cyclic-uppercase-offset",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Cyclic Uppercase Offset",
    "order": 19,
    "problemStatement": "Read uppercase character c and offset k and move k positions forward cyclically in A..Z.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "Z 1",
        "output": "A",
        "explanation": "Moving 1 positions cyclically from Z gives A."
      },
      {
        "input": "A 2",
        "output": "C",
        "explanation": "Moving 2 positions cyclically from A gives C."
      },
      {
        "input": "M 13",
        "output": "Z",
        "explanation": "Moving 13 positions cyclically from M gives Z."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "Z 1",
        "expectedOutput": "A"
      },
      {
        "testIndex": 2,
        "input": "A 2",
        "expectedOutput": "C"
      },
      {
        "testIndex": 3,
        "input": "M 13",
        "expectedOutput": "Z"
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
    "id": "learn:variables-data-types:rounded-whole-value",
    "slug": "rounded-whole-value",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Rounded Whole Value",
    "order": 20,
    "problemStatement": "Read decimal x and round to nearest integer, with exact .5 values rounded away from zero.",
    "inputFormat": "The input contains exactly the value(s) described in the problem statement.",
    "outputFormat": "Print exactly the requested converted or formatted value.",
    "constraints": "All numeric results fit in signed 64-bit range.",
    "examples": [
      {
        "input": "3.49",
        "output": "3",
        "explanation": "Rounding 3.49 to nearest integer with .5 away from zero gives 3."
      },
      {
        "input": "3.5",
        "output": "4",
        "explanation": "Rounding 3.5 to nearest integer with .5 away from zero gives 4."
      },
      {
        "input": "-2.5",
        "output": "-3",
        "explanation": "Rounding -2.5 to nearest integer with .5 away from zero gives -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3.49",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "3.5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "-2.5",
        "expectedOutput": "-3"
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
    "id": "learn:variables-data-types:integer-to-decimal-string",
    "bankId": "T01-Q01",
    "slug": "integer-to-decimal-string",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer to Decimal String",
    "order": 21,
    "difficulty": "Easy",
    "problemStatement": "Convert the integer value to its signed decimal string representation.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "7",
        "explanation": "Start from value=7. Convert the integer value to its signed decimal string representation. Therefore the expected JSON output is \"7\"."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Convert the integer value to its signed decimal string representation. Therefore the expected JSON output is \"0\"."
      },
      {
        "input": "{\"value\":12}",
        "output": "12",
        "explanation": "Start from value=12. Convert the integer value to its signed decimal string representation. Therefore the expected JSON output is \"12\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
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
    "id": "learn:variables-data-types:integer-to-binary-digits",
    "bankId": "T01-Q02",
    "slug": "integer-to-binary-digits",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer to Binary Digits",
    "order": 22,
    "difficulty": "Easy",
    "problemStatement": "Convert value to its unsigned binary digits, prefixed by a minus sign when negative; zero is \"0\".",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "111",
        "explanation": "Start from value=7. Convert value to its unsigned binary digits, prefixed by a minus sign when negative; zero is \"0\". Therefore the expected JSON output is \"111\"."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Convert value to its unsigned binary digits, prefixed by a minus sign when negative; zero is \"0\". Therefore the expected JSON output is \"0\"."
      },
      {
        "input": "{\"value\":12}",
        "output": "1100",
        "explanation": "Start from value=12. Convert value to its unsigned binary digits, prefixed by a minus sign when negative; zero is \"0\". Therefore the expected JSON output is \"1100\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "111"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "1100"
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
    "id": "learn:variables-data-types:integer-to-hexadecimal",
    "bankId": "T01-Q03",
    "slug": "integer-to-hexadecimal",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer to Hexadecimal",
    "order": 23,
    "difficulty": "Easy",
    "problemStatement": "Convert value to lowercase hexadecimal without a 0x prefix; preserve a leading minus for negative inputs.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "7",
        "explanation": "Start from value=7. Convert value to lowercase hexadecimal without a 0x prefix; preserve a leading minus for negative inputs. Therefore the expected JSON output is \"7\"."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Convert value to lowercase hexadecimal without a 0x prefix; preserve a leading minus for negative inputs. Therefore the expected JSON output is \"0\"."
      },
      {
        "input": "{\"value\":12}",
        "output": "c",
        "explanation": "Start from value=12. Convert value to lowercase hexadecimal without a 0x prefix; preserve a leading minus for negative inputs. Therefore the expected JSON output is \"c\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "c"
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
    "id": "learn:variables-data-types:integer-to-octal",
    "bankId": "T01-Q04",
    "slug": "integer-to-octal",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer to Octal",
    "order": 24,
    "difficulty": "Easy",
    "problemStatement": "Convert value to octal digits without a prefix, preserving a leading minus if needed.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "7",
        "explanation": "Start from value=7. Convert value to octal digits without a prefix, preserving a leading minus if needed. Therefore the expected JSON output is \"7\"."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Convert value to octal digits without a prefix, preserving a leading minus if needed. Therefore the expected JSON output is \"0\"."
      },
      {
        "input": "{\"value\":12}",
        "output": "14",
        "explanation": "Start from value=12. Convert value to octal digits without a prefix, preserving a leading minus if needed. Therefore the expected JSON output is \"14\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "14"
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
    "id": "learn:variables-data-types:absolute-value-assignment",
    "bankId": "T01-Q05",
    "slug": "absolute-value-assignment",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Absolute Value Assignment",
    "order": 25,
    "difficulty": "Easy",
    "problemStatement": "Store value as a nonnegative integer by taking its absolute value.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "7",
        "explanation": "Start from value=7. Store value as a nonnegative integer by taking its absolute value. Therefore the expected JSON output is 7."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Store value as a nonnegative integer by taking its absolute value. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "12",
        "explanation": "Start from value=12. Store value as a nonnegative integer by taking its absolute value. Therefore the expected JSON output is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
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
    "id": "learn:variables-data-types:boolean-from-integer",
    "bankId": "T01-Q06",
    "slug": "boolean-from-integer",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Boolean From Integer",
    "order": 26,
    "difficulty": "Easy",
    "problemStatement": "Convert value to a Boolean: zero is false, every nonzero integer is true.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "true",
        "explanation": "Start from value=7. Convert value to a Boolean: zero is false, every nonzero integer is true. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"value\":0}",
        "output": "false",
        "explanation": "Start from value=0. Convert value to a Boolean: zero is false, every nonzero integer is true. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"value\":12}",
        "output": "true",
        "explanation": "Start from value=12. Convert value to a Boolean: zero is false, every nonzero integer is true. Therefore the expected JSON output is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
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
    "id": "learn:variables-data-types:sign-as-integer",
    "bankId": "T01-Q07",
    "slug": "sign-as-integer",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Sign as Integer",
    "order": 27,
    "difficulty": "Easy",
    "problemStatement": "Encode a negative input as -1, zero as 0, and a positive input as 1.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "1",
        "explanation": "Start from value=7. Encode a negative input as -1, zero as 0, and a positive input as 1. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Encode a negative input as -1, zero as 0, and a positive input as 1. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":-1}",
        "output": "-1",
        "explanation": "Start from value=-1. Encode a negative input as -1, zero as 0, and a positive input as 1. Therefore the expected JSON output is -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":-1}",
        "expectedOutput": "-1"
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
    "id": "learn:variables-data-types:square-as-numeric-value",
    "bankId": "T01-Q08",
    "slug": "square-as-numeric-value",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Square as Numeric Value",
    "order": 28,
    "difficulty": "Medium",
    "problemStatement": "Convert value to its exact squared integer.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "49",
        "explanation": "Start from value=7. Convert value to its exact squared integer. Therefore the expected JSON output is 49."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Convert value to its exact squared integer. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "144",
        "explanation": "Start from value=12. Convert value to its exact squared integer. Therefore the expected JSON output is 144."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "49"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "144"
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
    "id": "learn:variables-data-types:truncated-half",
    "bankId": "T01-Q09",
    "slug": "truncated-half",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Truncated Half",
    "order": 29,
    "difficulty": "Medium",
    "problemStatement": "Divide value by two and truncate toward zero (not floor toward negative infinity).",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "3",
        "explanation": "Start from value=7. Divide value by two and truncate toward zero (not floor toward negative infinity). Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Divide value by two and truncate toward zero (not floor toward negative infinity). Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "6",
        "explanation": "Start from value=12. Divide value by two and truncate toward zero (not floor toward negative infinity). Therefore the expected JSON output is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "6"
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
    "id": "learn:variables-data-types:floor-half",
    "bankId": "T01-Q10",
    "slug": "floor-half",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Floor Half",
    "order": 30,
    "difficulty": "Medium",
    "problemStatement": "Divide value by two and round downward to the nearest integer.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "3",
        "explanation": "Start from value=7. Divide value by two and round downward to the nearest integer. Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Divide value by two and round downward to the nearest integer. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "6",
        "explanation": "Start from value=12. Divide value by two and round downward to the nearest integer. Therefore the expected JSON output is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "6"
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
    "id": "learn:variables-data-types:decimal-digit-count",
    "bankId": "T01-Q11",
    "slug": "decimal-digit-count",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Decimal Digit Count",
    "order": 31,
    "difficulty": "Medium",
    "problemStatement": "Count decimal digits in the absolute integer; zero has one digit.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "1",
        "explanation": "Start from value=7. Count decimal digits in the absolute integer; zero has one digit. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"value\":12}",
        "output": "2",
        "explanation": "Start from value=12. Count decimal digits in the absolute integer; zero has one digit. Therefore the expected JSON output is 2."
      },
      {
        "input": "{\"value\":100}",
        "output": "3",
        "explanation": "Start from value=100. Count decimal digits in the absolute integer; zero has one digit. Therefore the expected JSON output is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":12}",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":100}",
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
    "id": "learn:variables-data-types:unit-digit-extraction",
    "bankId": "T01-Q12",
    "slug": "unit-digit-extraction",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Unit Digit Extraction",
    "order": 32,
    "difficulty": "Medium",
    "problemStatement": "Extract the nonnegative units digit of the absolute integer.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "7",
        "explanation": "Start from value=7. Extract the nonnegative units digit of the absolute integer. Therefore the expected JSON output is 7."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Extract the nonnegative units digit of the absolute integer. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "2",
        "explanation": "Start from value=12. Extract the nonnegative units digit of the absolute integer. Therefore the expected JSON output is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
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
    "id": "learn:variables-data-types:tens-digit-extraction",
    "bankId": "T01-Q13",
    "slug": "tens-digit-extraction",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Tens Digit Extraction",
    "order": 33,
    "difficulty": "Medium",
    "problemStatement": "Extract the tens digit of the absolute integer, using zero when absent.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "0",
        "explanation": "Start from value=7. Extract the tens digit of the absolute integer, using zero when absent. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "1",
        "explanation": "Start from value=12. Extract the tens digit of the absolute integer, using zero when absent. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"value\":45}",
        "output": "4",
        "explanation": "Start from value=45. Extract the tens digit of the absolute integer, using zero when absent. Therefore the expected JSON output is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":12}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":45}",
        "expectedOutput": "4"
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
    "id": "learn:variables-data-types:minutes-to-seconds",
    "bankId": "T01-Q14",
    "slug": "minutes-to-seconds",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Minutes to Seconds",
    "order": 34,
    "difficulty": "Medium",
    "problemStatement": "Treat the absolute value as a number of minutes and convert it into seconds.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "420",
        "explanation": "Start from value=7. Treat the absolute value as a number of minutes and convert it into seconds. Therefore the expected JSON output is 420."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Treat the absolute value as a number of minutes and convert it into seconds. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "720",
        "explanation": "Start from value=12. Treat the absolute value as a number of minutes and convert it into seconds. Therefore the expected JSON output is 720."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "420"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "720"
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
    "id": "learn:variables-data-types:celsius-to-fahrenheit-number",
    "bankId": "T01-Q15",
    "slug": "celsius-to-fahrenheit-number",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Celsius to Fahrenheit Number",
    "order": 35,
    "difficulty": "Medium",
    "problemStatement": "Treat value as an integral Celsius reading and convert to Fahrenheit using F = 9*C/5 + 32; return a JSON number.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "44.6",
        "explanation": "Start from value=7. Treat value as an integral Celsius reading and convert to Fahrenheit using F = 9*C/5 + 32; return a JSON number. Therefore the expected JSON output is 44.6."
      },
      {
        "input": "{\"value\":0}",
        "output": "32",
        "explanation": "Start from value=0. Treat value as an integral Celsius reading and convert to Fahrenheit using F = 9*C/5 + 32; return a JSON number. Therefore the expected JSON output is 32.0."
      },
      {
        "input": "{\"value\":12}",
        "output": "53.6",
        "explanation": "Start from value=12. Treat value as an integral Celsius reading and convert to Fahrenheit using F = 9*C/5 + 32; return a JSON number. Therefore the expected JSON output is 53.6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "44.6"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "32"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "53.6"
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
    "id": "learn:variables-data-types:parity-as-text",
    "bankId": "T01-Q16",
    "slug": "parity-as-text",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Parity as Text",
    "order": 36,
    "difficulty": "Hard",
    "problemStatement": "Convert the integer to the string \"even\" or \"odd\" according to parity.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "odd",
        "explanation": "Start from value=7. Convert the integer to the string \"even\" or \"odd\" according to parity. Therefore the expected JSON output is \"odd\"."
      },
      {
        "input": "{\"value\":0}",
        "output": "even",
        "explanation": "Start from value=0. Convert the integer to the string \"even\" or \"odd\" according to parity. Therefore the expected JSON output is \"even\"."
      },
      {
        "input": "{\"value\":12}",
        "output": "even",
        "explanation": "Start from value=12. Convert the integer to the string \"even\" or \"odd\" according to parity. Therefore the expected JSON output is \"even\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "odd"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "even"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "even"
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
    "id": "learn:variables-data-types:lowest-eight-bits",
    "bankId": "T01-Q17",
    "slug": "lowest-eight-bits",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Lowest Eight Bits",
    "order": 37,
    "difficulty": "Hard",
    "problemStatement": "Represent value as an eight-bit binary string using value modulo 256 (two’s-complement low byte).",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "00000111",
        "explanation": "Start from value=7. Represent value as an eight-bit binary string using value modulo 256 (two’s-complement low byte). Therefore the expected JSON output is \"00000111\"."
      },
      {
        "input": "{\"value\":0}",
        "output": "00000000",
        "explanation": "Start from value=0. Represent value as an eight-bit binary string using value modulo 256 (two’s-complement low byte). Therefore the expected JSON output is \"00000000\"."
      },
      {
        "input": "{\"value\":12}",
        "output": "00001100",
        "explanation": "Start from value=12. Represent value as an eight-bit binary string using value modulo 256 (two’s-complement low byte). Therefore the expected JSON output is \"00001100\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "00000111"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "00000000"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "00001100"
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
    "id": "learn:variables-data-types:number-of-set-bits",
    "bankId": "T01-Q18",
    "slug": "number-of-set-bits",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Number of Set Bits",
    "order": 38,
    "difficulty": "Hard",
    "problemStatement": "Count the 1 bits in the standard binary representation of abs(value).",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "3",
        "explanation": "Start from value=7. Count the 1 bits in the standard binary representation of abs(value). Therefore the expected JSON output is 3."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Count the 1 bits in the standard binary representation of abs(value). Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "2",
        "explanation": "Start from value=12. Count the 1 bits in the standard binary representation of abs(value). Therefore the expected JSON output is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
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
    "id": "learn:variables-data-types:reverse-decimal-digits",
    "bankId": "T01-Q19",
    "slug": "reverse-decimal-digits",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Reverse Decimal Digits",
    "order": 39,
    "difficulty": "Hard",
    "problemStatement": "Reverse the digits of abs(value), returning a signed integer with the original sign; any leading zeroes disappear.",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "7",
        "explanation": "Start from value=7. Reverse the digits of abs(value), returning a signed integer with the original sign; any leading zeroes disappear. Therefore the expected JSON output is 7."
      },
      {
        "input": "{\"value\":0}",
        "output": "0",
        "explanation": "Start from value=0. Reverse the digits of abs(value), returning a signed integer with the original sign; any leading zeroes disappear. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"value\":12}",
        "output": "21",
        "explanation": "Start from value=12. Reverse the digits of abs(value), returning a signed integer with the original sign; any leading zeroes disappear. Therefore the expected JSON output is 21."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "21"
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
    "id": "learn:variables-data-types:integer-to-string-type-tag",
    "bankId": "T01-Q20",
    "slug": "integer-to-string-type-tag",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer to String Type Tag",
    "order": 40,
    "difficulty": "Hard",
    "problemStatement": "Return an object with fields \"text\" (decimal string of value), \"length\" (its string length including minus), and \"type\" (the literal \"string\").",
    "inputFormat": "A single JSON object: {\"value\": integer}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "-256 ≤ value ≤ 256; all computations use exact integer arithmetic unless conversion explicitly requested.",
    "examples": [
      {
        "input": "{\"value\":7}",
        "output": "{\"text\":\"7\",\"length\":1,\"type\":\"string\"}",
        "explanation": "Start from value=7. Return an object with fields \"text\" (decimal string of value), \"length\" (its string length including minus), and \"type\" (the literal \"string\"). Therefore the expected JSON output is {\"text\":\"7\",\"length\":1,\"type\":\"string\"}."
      },
      {
        "input": "{\"value\":0}",
        "output": "{\"text\":\"0\",\"length\":1,\"type\":\"string\"}",
        "explanation": "Start from value=0. Return an object with fields \"text\" (decimal string of value), \"length\" (its string length including minus), and \"type\" (the literal \"string\"). Therefore the expected JSON output is {\"text\":\"0\",\"length\":1,\"type\":\"string\"}."
      },
      {
        "input": "{\"value\":12}",
        "output": "{\"text\":\"12\",\"length\":2,\"type\":\"string\"}",
        "explanation": "Start from value=12. Return an object with fields \"text\" (decimal string of value), \"length\" (its string length including minus), and \"type\" (the literal \"string\"). Therefore the expected JSON output is {\"text\":\"12\",\"length\":2,\"type\":\"string\"}."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"value\":7}",
        "expectedOutput": "{\"text\":\"7\",\"length\":1,\"type\":\"string\"}"
      },
      {
        "testIndex": 2,
        "input": "{\"value\":0}",
        "expectedOutput": "{\"text\":\"0\",\"length\":1,\"type\":\"string\"}"
      },
      {
        "testIndex": 3,
        "input": "{\"value\":12}",
        "expectedOutput": "{\"text\":\"12\",\"length\":2,\"type\":\"string\"}"
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
