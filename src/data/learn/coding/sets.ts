import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:sets:unique-count",
    "slug": "unique-count",
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Unique Count",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Build the union set of the two collections. Sum `(value+1) mod 11` over the distinct values.",
    "inputFormat": "First line contains `n m`; second line contains n integers; third line contains m integers.",
    "outputFormat": "Print the requested set score.",
    "constraints": "0 <= n,m <= 100000; n+m >= 1.",
    "examples": [
      {
        "input": "4 2\n1 2 2 3\n2 4",
        "output": "14",
        "explanation": "The union is [1, 2, 3, 4]; applying the score to its distinct values gives 14."
      },
      {
        "input": "2 2\n5 5\n5 6",
        "output": "13",
        "explanation": "The union is [5, 6]; applying the score to its distinct values gives 13."
      },
      {
        "input": "3 2\n-1 0 1\n2 3",
        "output": "10",
        "explanation": "The union is [-1, 0, 1, 2, 3]; applying the score to its distinct values gives 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4 2\n1 2 2 3\n2 4",
        "expectedOutput": "14"
      },
      {
        "testIndex": 2,
        "input": "2 2\n5 5\n5 6",
        "expectedOutput": "13"
      },
      {
        "testIndex": 3,
        "input": "3 2\n-1 0 1\n2 3",
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
    "id": "learn:sets:union-metric",
    "slug": "union-metric",
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Union Metric",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Build the union set of the two collections. Sum `(value+2) mod 11` over the distinct values.",
    "inputFormat": "First line contains `n m`; second line contains n integers; third line contains m integers.",
    "outputFormat": "Print the requested set score.",
    "constraints": "0 <= n,m <= 100000; n+m >= 1.",
    "examples": [
      {
        "input": "4 2\n1 2 2 3\n2 4",
        "output": "18",
        "explanation": "The union is [1, 2, 3, 4]; applying the score to its distinct values gives 18."
      },
      {
        "input": "2 2\n5 5\n5 6",
        "output": "15",
        "explanation": "The union is [5, 6]; applying the score to its distinct values gives 15."
      },
      {
        "input": "3 2\n-1 0 1\n2 3",
        "output": "15",
        "explanation": "The union is [-1, 0, 1, 2, 3]; applying the score to its distinct values gives 15."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4 2\n1 2 2 3\n2 4",
        "expectedOutput": "18"
      },
      {
        "testIndex": 2,
        "input": "2 2\n5 5\n5 6",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "3 2\n-1 0 1\n2 3",
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
    "id": "learn:sets:intersection-metric",
    "slug": "intersection-metric",
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Intersection Metric",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Build the union set of the two collections. Sum `(value+3) mod 11` over the distinct values.",
    "inputFormat": "First line contains `n m`; second line contains n integers; third line contains m integers.",
    "outputFormat": "Print the requested set score.",
    "constraints": "0 <= n,m <= 100000; n+m >= 1.",
    "examples": [
      {
        "input": "4 2\n1 2 2 3\n2 4",
        "output": "22",
        "explanation": "The union is [1, 2, 3, 4]; applying the score to its distinct values gives 22."
      },
      {
        "input": "2 2\n5 5\n5 6",
        "output": "17",
        "explanation": "The union is [5, 6]; applying the score to its distinct values gives 17."
      },
      {
        "input": "3 2\n-1 0 1\n2 3",
        "output": "20",
        "explanation": "The union is [-1, 0, 1, 2, 3]; applying the score to its distinct values gives 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4 2\n1 2 2 3\n2 4",
        "expectedOutput": "22"
      },
      {
        "testIndex": 2,
        "input": "2 2\n5 5\n5 6",
        "expectedOutput": "17"
      },
      {
        "testIndex": 3,
        "input": "3 2\n-1 0 1\n2 3",
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
    "id": "learn:sets:symmetric-difference-metric",
    "slug": "symmetric-difference-metric",
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Symmetric Difference Metric",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Build the union set of the two collections. Sum `(value+4) mod 11` over the distinct values.",
    "inputFormat": "First line contains `n m`; second line contains n integers; third line contains m integers.",
    "outputFormat": "Print the requested set score.",
    "constraints": "0 <= n,m <= 100000; n+m >= 1.",
    "examples": [
      {
        "input": "4 2\n1 2 2 3\n2 4",
        "output": "26",
        "explanation": "The union is [1, 2, 3, 4]; applying the score to its distinct values gives 26."
      },
      {
        "input": "2 2\n5 5\n5 6",
        "output": "19",
        "explanation": "The union is [5, 6]; applying the score to its distinct values gives 19."
      },
      {
        "input": "3 2\n-1 0 1\n2 3",
        "output": "25",
        "explanation": "The union is [-1, 0, 1, 2, 3]; applying the score to its distinct values gives 25."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4 2\n1 2 2 3\n2 4",
        "expectedOutput": "26"
      },
      {
        "testIndex": 2,
        "input": "2 2\n5 5\n5 6",
        "expectedOutput": "19"
      },
      {
        "testIndex": 3,
        "input": "3 2\n-1 0 1\n2 3",
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
    "id": "learn:sets:subset-membership",
    "slug": "subset-membership",
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Subset Membership",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Build the union set of the two collections. Sum `(value+5) mod 11` over the distinct values.",
    "inputFormat": "First line contains `n m`; second line contains n integers; third line contains m integers.",
    "outputFormat": "Print the requested set score.",
    "constraints": "0 <= n,m <= 100000; n+m >= 1.",
    "examples": [
      {
        "input": "4 2\n1 2 2 3\n2 4",
        "output": "30",
        "explanation": "The union is [1, 2, 3, 4]; applying the score to its distinct values gives 30."
      },
      {
        "input": "2 2\n5 5\n5 6",
        "output": "10",
        "explanation": "The union is [5, 6]; applying the score to its distinct values gives 10."
      },
      {
        "input": "3 2\n-1 0 1\n2 3",
        "output": "30",
        "explanation": "The union is [-1, 0, 1, 2, 3]; applying the score to its distinct values gives 30."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4 2\n1 2 2 3\n2 4",
        "expectedOutput": "30"
      },
      {
        "testIndex": 2,
        "input": "2 2\n5 5\n5 6",
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "3 2\n-1 0 1\n2 3",
        "expectedOutput": "30"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:sets:first-repeat",
    "slug": "first-repeat",
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "First Repeat",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Build the union set of the two collections. Sum `(value+6) mod 11` over the distinct values.",
    "inputFormat": "First line contains `n m`; second line contains n integers; third line contains m integers.",
    "outputFormat": "Print the requested set score.",
    "constraints": "0 <= n,m <= 100000; n+m >= 1.",
    "examples": [
      {
        "input": "4 2\n1 2 2 3\n2 4",
        "output": "34",
        "explanation": "The union is [1, 2, 3, 4]; applying the score to its distinct values gives 34."
      },
      {
        "input": "2 2\n5 5\n5 6",
        "output": "1",
        "explanation": "The union is [5, 6]; applying the score to its distinct values gives 1."
      },
      {
        "input": "3 2\n-1 0 1\n2 3",
        "output": "35",
        "explanation": "The union is [-1, 0, 1, 2, 3]; applying the score to its distinct values gives 35."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4 2\n1 2 2 3\n2 4",
        "expectedOutput": "34"
      },
      {
        "testIndex": 2,
        "input": "2 2\n5 5\n5 6",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "3 2\n-1 0 1\n2 3",
        "expectedOutput": "35"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:sets:disjointness",
    "slug": "disjointness",
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Disjointness",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Build the union set of the two collections. Sum `(value+7) mod 11` over the distinct values.",
    "inputFormat": "First line contains `n m`; second line contains n integers; third line contains m integers.",
    "outputFormat": "Print the requested set score.",
    "constraints": "0 <= n,m <= 100000; n+m >= 1.",
    "examples": [
      {
        "input": "4 2\n1 2 2 3\n2 4",
        "output": "27",
        "explanation": "The union is [1, 2, 3, 4]; applying the score to its distinct values gives 27."
      },
      {
        "input": "2 2\n5 5\n5 6",
        "output": "3",
        "explanation": "The union is [5, 6]; applying the score to its distinct values gives 3."
      },
      {
        "input": "3 2\n-1 0 1\n2 3",
        "output": "40",
        "explanation": "The union is [-1, 0, 1, 2, 3]; applying the score to its distinct values gives 40."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4 2\n1 2 2 3\n2 4",
        "expectedOutput": "27"
      },
      {
        "testIndex": 2,
        "input": "2 2\n5 5\n5 6",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "3 2\n-1 0 1\n2 3",
        "expectedOutput": "40"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:sets:missing-range-values",
    "slug": "missing-range-values",
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Missing Range Values",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Build the union set of the two collections. Sum `(value+8) mod 11` over the distinct values.",
    "inputFormat": "First line contains `n m`; second line contains n integers; third line contains m integers.",
    "outputFormat": "Print the requested set score.",
    "constraints": "0 <= n,m <= 100000; n+m >= 1.",
    "examples": [
      {
        "input": "4 2\n1 2 2 3\n2 4",
        "output": "20",
        "explanation": "The union is [1, 2, 3, 4]; applying the score to its distinct values gives 20."
      },
      {
        "input": "2 2\n5 5\n5 6",
        "output": "5",
        "explanation": "The union is [5, 6]; applying the score to its distinct values gives 5."
      },
      {
        "input": "3 2\n-1 0 1\n2 3",
        "output": "34",
        "explanation": "The union is [-1, 0, 1, 2, 3]; applying the score to its distinct values gives 34."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4 2\n1 2 2 3\n2 4",
        "expectedOutput": "20"
      },
      {
        "testIndex": 2,
        "input": "2 2\n5 5\n5 6",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "3 2\n-1 0 1\n2 3",
        "expectedOutput": "34"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:sets:consecutive-run",
    "slug": "consecutive-run",
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Consecutive Run",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Build the union set of the two collections. Sum `(value+9) mod 11` over the distinct values.",
    "inputFormat": "First line contains `n m`; second line contains n integers; third line contains m integers.",
    "outputFormat": "Print the requested set score.",
    "constraints": "0 <= n,m <= 100000; n+m >= 1.",
    "examples": [
      {
        "input": "4 2\n1 2 2 3\n2 4",
        "output": "13",
        "explanation": "The union is [1, 2, 3, 4]; applying the score to its distinct values gives 13."
      },
      {
        "input": "2 2\n5 5\n5 6",
        "output": "7",
        "explanation": "The union is [5, 6]; applying the score to its distinct values gives 7."
      },
      {
        "input": "3 2\n-1 0 1\n2 3",
        "output": "28",
        "explanation": "The union is [-1, 0, 1, 2, 3]; applying the score to its distinct values gives 28."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4 2\n1 2 2 3\n2 4",
        "expectedOutput": "13"
      },
      {
        "testIndex": 2,
        "input": "2 2\n5 5\n5 6",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "3 2\n-1 0 1\n2 3",
        "expectedOutput": "28"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:sets:exactly-one-collection",
    "slug": "exactly-one-collection",
    "topicId": "sets",
    "topicSlug": "sets",
    "topicTitle": "Sets",
    "title": "Exactly One Collection",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Build the union set of the two collections. Sum `(value+10) mod 11` over the distinct values.",
    "inputFormat": "First line contains `n m`; second line contains n integers; third line contains m integers.",
    "outputFormat": "Print the requested set score.",
    "constraints": "0 <= n,m <= 100000; n+m >= 1.",
    "examples": [
      {
        "input": "4 2\n1 2 2 3\n2 4",
        "output": "6",
        "explanation": "The union is [1, 2, 3, 4]; applying the score to its distinct values gives 6."
      },
      {
        "input": "2 2\n5 5\n5 6",
        "output": "9",
        "explanation": "The union is [5, 6]; applying the score to its distinct values gives 9."
      },
      {
        "input": "3 2\n-1 0 1\n2 3",
        "output": "22",
        "explanation": "The union is [-1, 0, 1, 2, 3]; applying the score to its distinct values gives 22."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4 2\n1 2 2 3\n2 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "2 2\n5 5\n5 6",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "3 2\n-1 0 1\n2 3",
        "expectedOutput": "22"
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
