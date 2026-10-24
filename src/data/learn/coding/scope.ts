import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:scope:local-shadows-global",
    "slug": "local-shadows-global",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Local Shadows Global",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "A global value `g` exists. Inside a function/block, create a local value `x+1` without modifying `g`. Print the local result followed by unchanged `g`.",
    "inputFormat": "One line contains integers `g x`.",
    "outputFormat": "Print `local_value g`.",
    "constraints": "-10^9 <= g,x <= 10^9.",
    "examples": [
      {
        "input": "10 4",
        "output": "5 10",
        "explanation": "The local value is 4+1=5; global g remains 10."
      },
      {
        "input": "3 7",
        "output": "8 3",
        "explanation": "The local value is 7+1=8; global g remains 3."
      },
      {
        "input": "-2 5",
        "output": "6 -2",
        "explanation": "The local value is 5+1=6; global g remains -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4",
        "expectedOutput": "5 10"
      },
      {
        "testIndex": 2,
        "input": "3 7",
        "expectedOutput": "8 3"
      },
      {
        "testIndex": 3,
        "input": "-2 5",
        "expectedOutput": "6 -2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:scope:global-counter-update",
    "slug": "global-counter-update",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Global Counter Update",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "A global value `g` exists. Inside a function/block, create a local value `x+2` without modifying `g`. Print the local result followed by unchanged `g`.",
    "inputFormat": "One line contains integers `g x`.",
    "outputFormat": "Print `local_value g`.",
    "constraints": "-10^9 <= g,x <= 10^9.",
    "examples": [
      {
        "input": "10 4",
        "output": "6 10",
        "explanation": "The local value is 4+2=6; global g remains 10."
      },
      {
        "input": "3 7",
        "output": "9 3",
        "explanation": "The local value is 7+2=9; global g remains 3."
      },
      {
        "input": "-2 5",
        "output": "7 -2",
        "explanation": "The local value is 5+2=7; global g remains -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4",
        "expectedOutput": "6 10"
      },
      {
        "testIndex": 2,
        "input": "3 7",
        "expectedOutput": "9 3"
      },
      {
        "testIndex": 3,
        "input": "-2 5",
        "expectedOutput": "7 -2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:scope:parameter-copy-isolation",
    "slug": "parameter-copy-isolation",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Parameter Copy Isolation",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "A global value `g` exists. Inside a function/block, create a local value `x+3` without modifying `g`. Print the local result followed by unchanged `g`.",
    "inputFormat": "One line contains integers `g x`.",
    "outputFormat": "Print `local_value g`.",
    "constraints": "-10^9 <= g,x <= 10^9.",
    "examples": [
      {
        "input": "10 4",
        "output": "7 10",
        "explanation": "The local value is 4+3=7; global g remains 10."
      },
      {
        "input": "3 7",
        "output": "10 3",
        "explanation": "The local value is 7+3=10; global g remains 3."
      },
      {
        "input": "-2 5",
        "output": "8 -2",
        "explanation": "The local value is 5+3=8; global g remains -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4",
        "expectedOutput": "7 10"
      },
      {
        "testIndex": 2,
        "input": "3 7",
        "expectedOutput": "10 3"
      },
      {
        "testIndex": 3,
        "input": "-2 5",
        "expectedOutput": "8 -2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:scope:enclosing-variable-read",
    "slug": "enclosing-variable-read",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Enclosing Variable Read",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "A global value `g` exists. Inside a function/block, create a local value `x+4` without modifying `g`. Print the local result followed by unchanged `g`.",
    "inputFormat": "One line contains integers `g x`.",
    "outputFormat": "Print `local_value g`.",
    "constraints": "-10^9 <= g,x <= 10^9.",
    "examples": [
      {
        "input": "10 4",
        "output": "8 10",
        "explanation": "The local value is 4+4=8; global g remains 10."
      },
      {
        "input": "3 7",
        "output": "11 3",
        "explanation": "The local value is 7+4=11; global g remains 3."
      },
      {
        "input": "-2 5",
        "output": "9 -2",
        "explanation": "The local value is 5+4=9; global g remains -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4",
        "expectedOutput": "8 10"
      },
      {
        "testIndex": 2,
        "input": "3 7",
        "expectedOutput": "11 3"
      },
      {
        "testIndex": 3,
        "input": "-2 5",
        "expectedOutput": "9 -2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:scope:enclosing-variable-update",
    "slug": "enclosing-variable-update",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Enclosing Variable Update",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "A global value `g` exists. Inside a function/block, create a local value `x+5` without modifying `g`. Print the local result followed by unchanged `g`.",
    "inputFormat": "One line contains integers `g x`.",
    "outputFormat": "Print `local_value g`.",
    "constraints": "-10^9 <= g,x <= 10^9.",
    "examples": [
      {
        "input": "10 4",
        "output": "9 10",
        "explanation": "The local value is 4+5=9; global g remains 10."
      },
      {
        "input": "3 7",
        "output": "12 3",
        "explanation": "The local value is 7+5=12; global g remains 3."
      },
      {
        "input": "-2 5",
        "output": "10 -2",
        "explanation": "The local value is 5+5=10; global g remains -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4",
        "expectedOutput": "9 10"
      },
      {
        "testIndex": 2,
        "input": "3 7",
        "expectedOutput": "12 3"
      },
      {
        "testIndex": 3,
        "input": "-2 5",
        "expectedOutput": "10 -2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:scope:block-local-shadow",
    "slug": "block-local-shadow",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Block Local Shadow",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "A global value `g` exists. Inside a function/block, create a local value `x+6` without modifying `g`. Print the local result followed by unchanged `g`.",
    "inputFormat": "One line contains integers `g x`.",
    "outputFormat": "Print `local_value g`.",
    "constraints": "-10^9 <= g,x <= 10^9.",
    "examples": [
      {
        "input": "10 4",
        "output": "10 10",
        "explanation": "The local value is 4+6=10; global g remains 10."
      },
      {
        "input": "3 7",
        "output": "13 3",
        "explanation": "The local value is 7+6=13; global g remains 3."
      },
      {
        "input": "-2 5",
        "output": "11 -2",
        "explanation": "The local value is 5+6=11; global g remains -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4",
        "expectedOutput": "10 10"
      },
      {
        "testIndex": 2,
        "input": "3 7",
        "expectedOutput": "13 3"
      },
      {
        "testIndex": 3,
        "input": "-2 5",
        "expectedOutput": "11 -2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:scope:global-constant-read",
    "slug": "global-constant-read",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Global Constant Read",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "A global value `g` exists. Inside a function/block, create a local value `x+7` without modifying `g`. Print the local result followed by unchanged `g`.",
    "inputFormat": "One line contains integers `g x`.",
    "outputFormat": "Print `local_value g`.",
    "constraints": "-10^9 <= g,x <= 10^9.",
    "examples": [
      {
        "input": "10 4",
        "output": "11 10",
        "explanation": "The local value is 4+7=11; global g remains 10."
      },
      {
        "input": "3 7",
        "output": "14 3",
        "explanation": "The local value is 7+7=14; global g remains 3."
      },
      {
        "input": "-2 5",
        "output": "12 -2",
        "explanation": "The local value is 5+7=12; global g remains -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4",
        "expectedOutput": "11 10"
      },
      {
        "testIndex": 2,
        "input": "3 7",
        "expectedOutput": "14 3"
      },
      {
        "testIndex": 3,
        "input": "-2 5",
        "expectedOutput": "12 -2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:scope:independent-local-calls",
    "slug": "independent-local-calls",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Independent Local Calls",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "A global value `g` exists. Inside a function/block, create a local value `x+8` without modifying `g`. Print the local result followed by unchanged `g`.",
    "inputFormat": "One line contains integers `g x`.",
    "outputFormat": "Print `local_value g`.",
    "constraints": "-10^9 <= g,x <= 10^9.",
    "examples": [
      {
        "input": "10 4",
        "output": "12 10",
        "explanation": "The local value is 4+8=12; global g remains 10."
      },
      {
        "input": "3 7",
        "output": "15 3",
        "explanation": "The local value is 7+8=15; global g remains 3."
      },
      {
        "input": "-2 5",
        "output": "13 -2",
        "explanation": "The local value is 5+8=13; global g remains -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4",
        "expectedOutput": "12 10"
      },
      {
        "testIndex": 2,
        "input": "3 7",
        "expectedOutput": "15 3"
      },
      {
        "testIndex": 3,
        "input": "-2 5",
        "expectedOutput": "13 -2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:scope:local-accumulator-reset",
    "slug": "local-accumulator-reset",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Local Accumulator Reset",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "A global value `g` exists. Inside a function/block, create a local value `x+9` without modifying `g`. Print the local result followed by unchanged `g`.",
    "inputFormat": "One line contains integers `g x`.",
    "outputFormat": "Print `local_value g`.",
    "constraints": "-10^9 <= g,x <= 10^9.",
    "examples": [
      {
        "input": "10 4",
        "output": "13 10",
        "explanation": "The local value is 4+9=13; global g remains 10."
      },
      {
        "input": "3 7",
        "output": "16 3",
        "explanation": "The local value is 7+9=16; global g remains 3."
      },
      {
        "input": "-2 5",
        "output": "14 -2",
        "explanation": "The local value is 5+9=14; global g remains -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4",
        "expectedOutput": "13 10"
      },
      {
        "testIndex": 2,
        "input": "3 7",
        "expectedOutput": "16 3"
      },
      {
        "testIndex": 3,
        "input": "-2 5",
        "expectedOutput": "14 -2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:scope:scope-lookup-priority",
    "slug": "scope-lookup-priority",
    "topicId": "scope",
    "topicSlug": "scope",
    "topicTitle": "Scope",
    "title": "Scope Lookup Priority",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "A global value `g` exists. Inside a function/block, create a local value `x+10` without modifying `g`. Print the local result followed by unchanged `g`.",
    "inputFormat": "One line contains integers `g x`.",
    "outputFormat": "Print `local_value g`.",
    "constraints": "-10^9 <= g,x <= 10^9.",
    "examples": [
      {
        "input": "10 4",
        "output": "14 10",
        "explanation": "The local value is 4+10=14; global g remains 10."
      },
      {
        "input": "3 7",
        "output": "17 3",
        "explanation": "The local value is 7+10=17; global g remains 3."
      },
      {
        "input": "-2 5",
        "output": "15 -2",
        "explanation": "The local value is 5+10=15; global g remains -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4",
        "expectedOutput": "14 10"
      },
      {
        "testIndex": 2,
        "input": "3 7",
        "expectedOutput": "17 3"
      },
      {
        "testIndex": 3,
        "input": "-2 5",
        "expectedOutput": "15 -2"
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
