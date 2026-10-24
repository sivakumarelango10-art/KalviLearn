import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:strings-as-arrays:vowel-count",
    "slug": "vowel-count",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Vowel Count",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Treat the input string as an array of characters. For each character `ch`, add `(ASCII(ch)+1) mod 7`; print the total.",
    "inputFormat": "One line contains a non-empty ASCII string with no spaces.",
    "outputFormat": "Print the integer character-array score.",
    "constraints": "1 <= |s| <= 100000.",
    "examples": [
      {
        "input": "abca",
        "output": "3",
        "explanation": "Adding `(ASCII+1) mod 7` for each character gives the printed total."
      },
      {
        "input": "HELLO",
        "output": "6",
        "explanation": "Adding `(ASCII+1) mod 7` for each character gives the printed total."
      },
      {
        "input": "a1b22",
        "output": "6",
        "explanation": "Adding `(ASCII+1) mod 7` for each character gives the printed total."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "abca",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "HELLO",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "a1b22",
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
    "id": "learn:strings-as-arrays:reverse-by-index",
    "slug": "reverse-by-index",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Reverse by Index",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Treat the input string as an array of characters. For each character `ch`, add `(ASCII(ch)+2) mod 7`; print the total.",
    "inputFormat": "One line contains a non-empty ASCII string with no spaces.",
    "outputFormat": "Print the integer character-array score.",
    "constraints": "1 <= |s| <= 100000.",
    "examples": [
      {
        "input": "abca",
        "output": "7",
        "explanation": "Adding `(ASCII+2) mod 7` for each character gives the printed total."
      },
      {
        "input": "HELLO",
        "output": "11",
        "explanation": "Adding `(ASCII+2) mod 7` for each character gives the printed total."
      },
      {
        "input": "a1b22",
        "output": "11",
        "explanation": "Adding `(ASCII+2) mod 7` for each character gives the printed total."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "abca",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "HELLO",
        "expectedOutput": "11"
      },
      {
        "testIndex": 3,
        "input": "a1b22",
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
    "id": "learn:strings-as-arrays:first-unique-character",
    "slug": "first-unique-character",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "First Unique Character",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Treat the input string as an array of characters. For each character `ch`, add `(ASCII(ch)+3) mod 7`; print the total.",
    "inputFormat": "One line contains a non-empty ASCII string with no spaces.",
    "outputFormat": "Print the integer character-array score.",
    "constraints": "1 <= |s| <= 100000.",
    "examples": [
      {
        "input": "abca",
        "output": "11",
        "explanation": "Adding `(ASCII+3) mod 7` for each character gives the printed total."
      },
      {
        "input": "HELLO",
        "output": "16",
        "explanation": "Adding `(ASCII+3) mod 7` for each character gives the printed total."
      },
      {
        "input": "a1b22",
        "output": "16",
        "explanation": "Adding `(ASCII+3) mod 7` for each character gives the printed total."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "abca",
        "expectedOutput": "11"
      },
      {
        "testIndex": 2,
        "input": "HELLO",
        "expectedOutput": "16"
      },
      {
        "testIndex": 3,
        "input": "a1b22",
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
    "id": "learn:strings-as-arrays:equal-run-count",
    "slug": "equal-run-count",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Equal Run Count",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Treat the input string as an array of characters. For each character `ch`, add `(ASCII(ch)+4) mod 7`; print the total.",
    "inputFormat": "One line contains a non-empty ASCII string with no spaces.",
    "outputFormat": "Print the integer character-array score.",
    "constraints": "1 <= |s| <= 100000.",
    "examples": [
      {
        "input": "abca",
        "output": "15",
        "explanation": "Adding `(ASCII+4) mod 7` for each character gives the printed total."
      },
      {
        "input": "HELLO",
        "output": "21",
        "explanation": "Adding `(ASCII+4) mod 7` for each character gives the printed total."
      },
      {
        "input": "a1b22",
        "output": "21",
        "explanation": "Adding `(ASCII+4) mod 7` for each character gives the printed total."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "abca",
        "expectedOutput": "15"
      },
      {
        "testIndex": 2,
        "input": "HELLO",
        "expectedOutput": "21"
      },
      {
        "testIndex": 3,
        "input": "a1b22",
        "expectedOutput": "21"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:strings-as-arrays:upper-lower-balance",
    "slug": "upper-lower-balance",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Upper Lower Balance",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Treat the input string as an array of characters. For each character `ch`, add `(ASCII(ch)+5) mod 7`; print the total.",
    "inputFormat": "One line contains a non-empty ASCII string with no spaces.",
    "outputFormat": "Print the integer character-array score.",
    "constraints": "1 <= |s| <= 100000.",
    "examples": [
      {
        "input": "abca",
        "output": "19",
        "explanation": "Adding `(ASCII+5) mod 7` for each character gives the printed total."
      },
      {
        "input": "HELLO",
        "output": "12",
        "explanation": "Adding `(ASCII+5) mod 7` for each character gives the printed total."
      },
      {
        "input": "a1b22",
        "output": "26",
        "explanation": "Adding `(ASCII+5) mod 7` for each character gives the printed total."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "abca",
        "expectedOutput": "19"
      },
      {
        "testIndex": 2,
        "input": "HELLO",
        "expectedOutput": "12"
      },
      {
        "testIndex": 3,
        "input": "a1b22",
        "expectedOutput": "26"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:strings-as-arrays:circular-left-shift",
    "slug": "circular-left-shift",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Circular Left Shift",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Treat the input string as an array of characters. For each character `ch`, add `(ASCII(ch)+6) mod 7`; print the total.",
    "inputFormat": "One line contains a non-empty ASCII string with no spaces.",
    "outputFormat": "Print the integer character-array score.",
    "constraints": "1 <= |s| <= 100000.",
    "examples": [
      {
        "input": "abca",
        "output": "16",
        "explanation": "Adding `(ASCII+6) mod 7` for each character gives the printed total."
      },
      {
        "input": "HELLO",
        "output": "17",
        "explanation": "Adding `(ASCII+6) mod 7` for each character gives the printed total."
      },
      {
        "input": "a1b22",
        "output": "17",
        "explanation": "Adding `(ASCII+6) mod 7` for each character gives the printed total."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "abca",
        "expectedOutput": "16"
      },
      {
        "testIndex": 2,
        "input": "HELLO",
        "expectedOutput": "17"
      },
      {
        "testIndex": 3,
        "input": "a1b22",
        "expectedOutput": "17"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:strings-as-arrays:longest-digit-block",
    "slug": "longest-digit-block",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Longest Digit Block",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Treat the input string as an array of characters. For each character `ch`, add `(ASCII(ch)+7) mod 7`; print the total.",
    "inputFormat": "One line contains a non-empty ASCII string with no spaces.",
    "outputFormat": "Print the integer character-array score.",
    "constraints": "1 <= |s| <= 100000.",
    "examples": [
      {
        "input": "abca",
        "output": "13",
        "explanation": "Adding `(ASCII+7) mod 7` for each character gives the printed total."
      },
      {
        "input": "HELLO",
        "output": "22",
        "explanation": "Adding `(ASCII+7) mod 7` for each character gives the printed total."
      },
      {
        "input": "a1b22",
        "output": "8",
        "explanation": "Adding `(ASCII+7) mod 7` for each character gives the printed total."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "abca",
        "expectedOutput": "13"
      },
      {
        "testIndex": 2,
        "input": "HELLO",
        "expectedOutput": "22"
      },
      {
        "testIndex": 3,
        "input": "a1b22",
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
    "id": "learn:strings-as-arrays:adjacent-pair-removal",
    "slug": "adjacent-pair-removal",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Adjacent Pair Removal",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Treat the input string as an array of characters. For each character `ch`, add `(ASCII(ch)+8) mod 7`; print the total.",
    "inputFormat": "One line contains a non-empty ASCII string with no spaces.",
    "outputFormat": "Print the integer character-array score.",
    "constraints": "1 <= |s| <= 100000.",
    "examples": [
      {
        "input": "abca",
        "output": "3",
        "explanation": "Adding `(ASCII+8) mod 7` for each character gives the printed total."
      },
      {
        "input": "HELLO",
        "output": "6",
        "explanation": "Adding `(ASCII+8) mod 7` for each character gives the printed total."
      },
      {
        "input": "a1b22",
        "output": "6",
        "explanation": "Adding `(ASCII+8) mod 7` for each character gives the printed total."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "abca",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "HELLO",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "a1b22",
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
    "id": "learn:strings-as-arrays:lexicographically-smaller-half",
    "slug": "lexicographically-smaller-half",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Lexicographically Smaller Half",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Treat the input string as an array of characters. For each character `ch`, add `(ASCII(ch)+9) mod 7`; print the total.",
    "inputFormat": "One line contains a non-empty ASCII string with no spaces.",
    "outputFormat": "Print the integer character-array score.",
    "constraints": "1 <= |s| <= 100000.",
    "examples": [
      {
        "input": "abca",
        "output": "7",
        "explanation": "Adding `(ASCII+9) mod 7` for each character gives the printed total."
      },
      {
        "input": "HELLO",
        "output": "11",
        "explanation": "Adding `(ASCII+9) mod 7` for each character gives the printed total."
      },
      {
        "input": "a1b22",
        "output": "11",
        "explanation": "Adding `(ASCII+9) mod 7` for each character gives the printed total."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "abca",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "HELLO",
        "expectedOutput": "11"
      },
      {
        "testIndex": 3,
        "input": "a1b22",
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
    "id": "learn:strings-as-arrays:cyclic-alphabet-distance",
    "slug": "cyclic-alphabet-distance",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Cyclic Alphabet Distance",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Treat the input string as an array of characters. For each character `ch`, add `(ASCII(ch)+10) mod 7`; print the total.",
    "inputFormat": "One line contains a non-empty ASCII string with no spaces.",
    "outputFormat": "Print the integer character-array score.",
    "constraints": "1 <= |s| <= 100000.",
    "examples": [
      {
        "input": "abca",
        "output": "11",
        "explanation": "Adding `(ASCII+10) mod 7` for each character gives the printed total."
      },
      {
        "input": "HELLO",
        "output": "16",
        "explanation": "Adding `(ASCII+10) mod 7` for each character gives the printed total."
      },
      {
        "input": "a1b22",
        "output": "16",
        "explanation": "Adding `(ASCII+10) mod 7` for each character gives the printed total."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "abca",
        "expectedOutput": "11"
      },
      {
        "testIndex": 2,
        "input": "HELLO",
        "expectedOutput": "16"
      },
      {
        "testIndex": 3,
        "input": "a1b22",
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
