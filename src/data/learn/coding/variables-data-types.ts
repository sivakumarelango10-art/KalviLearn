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
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:swap-stored-integers",
    "slug": "swap-stored-integers",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Swap Stored Integers",
    "order": 2,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:character-code",
    "slug": "character-code",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Character Code",
    "order": 3,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:digit-character",
    "slug": "digit-character",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Digit Character",
    "order": 4,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:boolean-conversion",
    "slug": "boolean-conversion",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Boolean Conversion",
    "order": 5,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:integer-fraction-split",
    "slug": "integer-fraction-split",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Integer Fraction Split",
    "order": 6,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:high-low-byte",
    "slug": "high-low-byte",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "High Low Byte",
    "order": 7,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:rupees-paise-split",
    "slug": "rupees-paise-split",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Rupees Paise Split",
    "order": 8,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:two-digit-split",
    "slug": "two-digit-split",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Two Digit Split",
    "order": 9,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:coordinate-formatting",
    "slug": "coordinate-formatting",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Coordinate Formatting",
    "order": 10,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:signed-magnitude",
    "slug": "signed-magnitude",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Signed Magnitude",
    "order": 11,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:hours-to-minutes",
    "slug": "hours-to-minutes",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Hours to Minutes",
    "order": 12,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:scientific-pair-value",
    "slug": "scientific-pair-value",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Scientific Pair Value",
    "order": 13,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:date-field-formatting",
    "slug": "date-field-formatting",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Date Field Formatting",
    "order": 14,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:celsius-fahrenheit-pair",
    "slug": "celsius-fahrenheit-pair",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Celsius Fahrenheit Pair",
    "order": 15,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:quotient-two-decimals",
    "slug": "quotient-two-decimals",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Quotient Two Decimals",
    "order": 16,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:binary-flags-to-words",
    "slug": "binary-flags-to-words",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Binary Flags to Words",
    "order": 17,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:typed-record",
    "slug": "typed-record",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Typed Record",
    "order": 18,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:cyclic-uppercase-offset",
    "slug": "cyclic-uppercase-offset",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Cyclic Uppercase Offset",
    "order": 19,
    "difficulty": "Easy",
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
    }
  },
  {
    "id": "learn:variables-data-types:rounded-whole-value",
    "slug": "rounded-whole-value",
    "topicId": "variables-data-types",
    "topicSlug": "variables-data-types",
    "topicTitle": "Variables & Data Types",
    "title": "Rounded Whole Value",
    "order": 20,
    "difficulty": "Easy",
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
    }
  }
]

export default questions
