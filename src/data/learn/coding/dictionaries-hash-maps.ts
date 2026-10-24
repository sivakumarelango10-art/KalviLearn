import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:dictionaries-hash-maps:frequency-map",
    "slug": "frequency-map",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Frequency Map",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Build a frequency dictionary. For every distinct value `v` with count `c`, add `v*(c+1)`; print the total.",
    "inputFormat": "First line contains `n`; second line contains n integers.",
    "outputFormat": "Print the dictionary-based score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n1 2 2 3",
        "output": "14",
        "explanation": "The frequency map is {1: 1, 2: 2, 3: 1}; the score is 14."
      },
      {
        "input": "3\n5 5 5",
        "output": "20",
        "explanation": "The frequency map is {5: 3}; the score is 20."
      },
      {
        "input": "4\n0 -1 0 2",
        "output": "2",
        "explanation": "The frequency map is {0: 2, -1: 1, 2: 1}; the score is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3",
        "expectedOutput": "14"
      },
      {
        "testIndex": 2,
        "input": "3\n5 5 5",
        "expectedOutput": "20"
      },
      {
        "testIndex": 3,
        "input": "4\n0 -1 0 2",
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
    "id": "learn:dictionaries-hash-maps:word-frequency",
    "slug": "word-frequency",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Word Frequency",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Build a frequency dictionary. For every distinct value `v` with count `c`, add `v*(c+2)`; print the total.",
    "inputFormat": "First line contains `n`; second line contains n integers.",
    "outputFormat": "Print the dictionary-based score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n1 2 2 3",
        "output": "20",
        "explanation": "The frequency map is {1: 1, 2: 2, 3: 1}; the score is 20."
      },
      {
        "input": "3\n5 5 5",
        "output": "25",
        "explanation": "The frequency map is {5: 3}; the score is 25."
      },
      {
        "input": "4\n0 -1 0 2",
        "output": "3",
        "explanation": "The frequency map is {0: 2, -1: 1, 2: 1}; the score is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3",
        "expectedOutput": "20"
      },
      {
        "testIndex": 2,
        "input": "3\n5 5 5",
        "expectedOutput": "25"
      },
      {
        "testIndex": 3,
        "input": "4\n0 -1 0 2",
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
    "id": "learn:dictionaries-hash-maps:first-unique-value",
    "slug": "first-unique-value",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "First Unique Value",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Build a frequency dictionary. For every distinct value `v` with count `c`, add `v*(c+3)`; print the total.",
    "inputFormat": "First line contains `n`; second line contains n integers.",
    "outputFormat": "Print the dictionary-based score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n1 2 2 3",
        "output": "26",
        "explanation": "The frequency map is {1: 1, 2: 2, 3: 1}; the score is 26."
      },
      {
        "input": "3\n5 5 5",
        "output": "30",
        "explanation": "The frequency map is {5: 3}; the score is 30."
      },
      {
        "input": "4\n0 -1 0 2",
        "output": "4",
        "explanation": "The frequency map is {0: 2, -1: 1, 2: 1}; the score is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3",
        "expectedOutput": "26"
      },
      {
        "testIndex": 2,
        "input": "3\n5 5 5",
        "expectedOutput": "30"
      },
      {
        "testIndex": 3,
        "input": "4\n0 -1 0 2",
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
    "id": "learn:dictionaries-hash-maps:equal-pair-count",
    "slug": "equal-pair-count",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Equal Pair Count",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Build a frequency dictionary. For every distinct value `v` with count `c`, add `v*(c+4)`; print the total.",
    "inputFormat": "First line contains `n`; second line contains n integers.",
    "outputFormat": "Print the dictionary-based score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n1 2 2 3",
        "output": "32",
        "explanation": "The frequency map is {1: 1, 2: 2, 3: 1}; the score is 32."
      },
      {
        "input": "3\n5 5 5",
        "output": "35",
        "explanation": "The frequency map is {5: 3}; the score is 35."
      },
      {
        "input": "4\n0 -1 0 2",
        "output": "5",
        "explanation": "The frequency map is {0: 2, -1: 1, 2: 1}; the score is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3",
        "expectedOutput": "32"
      },
      {
        "testIndex": 2,
        "input": "3\n5 5 5",
        "expectedOutput": "35"
      },
      {
        "testIndex": 3,
        "input": "4\n0 -1 0 2",
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
    "id": "learn:dictionaries-hash-maps:anagram-signature",
    "slug": "anagram-signature",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Anagram Signature",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Build a frequency dictionary. For every distinct value `v` with count `c`, add `v*(c+5)`; print the total.",
    "inputFormat": "First line contains `n`; second line contains n integers.",
    "outputFormat": "Print the dictionary-based score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n1 2 2 3",
        "output": "38",
        "explanation": "The frequency map is {1: 1, 2: 2, 3: 1}; the score is 38."
      },
      {
        "input": "3\n5 5 5",
        "output": "40",
        "explanation": "The frequency map is {5: 3}; the score is 40."
      },
      {
        "input": "4\n0 -1 0 2",
        "output": "6",
        "explanation": "The frequency map is {0: 2, -1: 1, 2: 1}; the score is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3",
        "expectedOutput": "38"
      },
      {
        "testIndex": 2,
        "input": "3\n5 5 5",
        "expectedOutput": "40"
      },
      {
        "testIndex": 3,
        "input": "4\n0 -1 0 2",
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
    "id": "learn:dictionaries-hash-maps:prefix-frequency",
    "slug": "prefix-frequency",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Prefix Frequency",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Build a frequency dictionary. For every distinct value `v` with count `c`, add `v*(c+6)`; print the total.",
    "inputFormat": "First line contains `n`; second line contains n integers.",
    "outputFormat": "Print the dictionary-based score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n1 2 2 3",
        "output": "44",
        "explanation": "The frequency map is {1: 1, 2: 2, 3: 1}; the score is 44."
      },
      {
        "input": "3\n5 5 5",
        "output": "45",
        "explanation": "The frequency map is {5: 3}; the score is 45."
      },
      {
        "input": "4\n0 -1 0 2",
        "output": "7",
        "explanation": "The frequency map is {0: 2, -1: 1, 2: 1}; the score is 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3",
        "expectedOutput": "44"
      },
      {
        "testIndex": 2,
        "input": "3\n5 5 5",
        "expectedOutput": "45"
      },
      {
        "testIndex": 3,
        "input": "4\n0 -1 0 2",
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
    "id": "learn:dictionaries-hash-maps:inventory-map",
    "slug": "inventory-map",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Inventory Map",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Build a frequency dictionary. For every distinct value `v` with count `c`, add `v*(c+7)`; print the total.",
    "inputFormat": "First line contains `n`; second line contains n integers.",
    "outputFormat": "Print the dictionary-based score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n1 2 2 3",
        "output": "50",
        "explanation": "The frequency map is {1: 1, 2: 2, 3: 1}; the score is 50."
      },
      {
        "input": "3\n5 5 5",
        "output": "50",
        "explanation": "The frequency map is {5: 3}; the score is 50."
      },
      {
        "input": "4\n0 -1 0 2",
        "output": "8",
        "explanation": "The frequency map is {0: 2, -1: 1, 2: 1}; the score is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3",
        "expectedOutput": "50"
      },
      {
        "testIndex": 2,
        "input": "3\n5 5 5",
        "expectedOutput": "50"
      },
      {
        "testIndex": 3,
        "input": "4\n0 -1 0 2",
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
    "id": "learn:dictionaries-hash-maps:common-frequency-product",
    "slug": "common-frequency-product",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Common Frequency Product",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Build a frequency dictionary. For every distinct value `v` with count `c`, add `v*(c+8)`; print the total.",
    "inputFormat": "First line contains `n`; second line contains n integers.",
    "outputFormat": "Print the dictionary-based score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n1 2 2 3",
        "output": "56",
        "explanation": "The frequency map is {1: 1, 2: 2, 3: 1}; the score is 56."
      },
      {
        "input": "3\n5 5 5",
        "output": "55",
        "explanation": "The frequency map is {5: 3}; the score is 55."
      },
      {
        "input": "4\n0 -1 0 2",
        "output": "9",
        "explanation": "The frequency map is {0: 2, -1: 1, 2: 1}; the score is 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3",
        "expectedOutput": "56"
      },
      {
        "testIndex": 2,
        "input": "3\n5 5 5",
        "expectedOutput": "55"
      },
      {
        "testIndex": 3,
        "input": "4\n0 -1 0 2",
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
    "id": "learn:dictionaries-hash-maps:character-histogram",
    "slug": "character-histogram",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Character Histogram",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Build a frequency dictionary. For every distinct value `v` with count `c`, add `v*(c+9)`; print the total.",
    "inputFormat": "First line contains `n`; second line contains n integers.",
    "outputFormat": "Print the dictionary-based score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n1 2 2 3",
        "output": "62",
        "explanation": "The frequency map is {1: 1, 2: 2, 3: 1}; the score is 62."
      },
      {
        "input": "3\n5 5 5",
        "output": "60",
        "explanation": "The frequency map is {5: 3}; the score is 60."
      },
      {
        "input": "4\n0 -1 0 2",
        "output": "10",
        "explanation": "The frequency map is {0: 2, -1: 1, 2: 1}; the score is 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3",
        "expectedOutput": "62"
      },
      {
        "testIndex": 2,
        "input": "3\n5 5 5",
        "expectedOutput": "60"
      },
      {
        "testIndex": 3,
        "input": "4\n0 -1 0 2",
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
    "id": "learn:dictionaries-hash-maps:difference-histogram",
    "slug": "difference-histogram",
    "topicId": "dictionaries-hash-maps",
    "topicSlug": "dictionaries-hash-maps",
    "topicTitle": "Dictionaries / Hash Maps",
    "title": "Difference Histogram",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Build a frequency dictionary. For every distinct value `v` with count `c`, add `v*(c+10)`; print the total.",
    "inputFormat": "First line contains `n`; second line contains n integers.",
    "outputFormat": "Print the dictionary-based score.",
    "constraints": "1 <= n <= 100000.",
    "examples": [
      {
        "input": "4\n1 2 2 3",
        "output": "68",
        "explanation": "The frequency map is {1: 1, 2: 2, 3: 1}; the score is 68."
      },
      {
        "input": "3\n5 5 5",
        "output": "65",
        "explanation": "The frequency map is {5: 3}; the score is 65."
      },
      {
        "input": "4\n0 -1 0 2",
        "output": "11",
        "explanation": "The frequency map is {0: 2, -1: 1, 2: 1}; the score is 11."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n1 2 2 3",
        "expectedOutput": "68"
      },
      {
        "testIndex": 2,
        "input": "3\n5 5 5",
        "expectedOutput": "65"
      },
      {
        "testIndex": 3,
        "input": "4\n0 -1 0 2",
        "expectedOutput": "11"
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
