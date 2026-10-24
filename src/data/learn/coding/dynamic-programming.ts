import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-1",
    "slug": "weighted-recurrence-dp-1",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #1",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=2*dp[n-1]+3*dp[n-3]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "11",
        "explanation": "Filling the recurrence states through 3 gives 11."
      },
      {
        "input": "5",
        "output": "68",
        "explanation": "Filling the recurrence states through 5 gives 68."
      },
      {
        "input": "7",
        "output": "422",
        "explanation": "Filling the recurrence states through 7 gives 422."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "11"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "68"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "422"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-2",
    "slug": "weighted-recurrence-dp-2",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #2",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=3*dp[n-1]+4*dp[n-4]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "27",
        "explanation": "Filling the recurrence states through 3 gives 27."
      },
      {
        "input": "5",
        "output": "267",
        "explanation": "Filling the recurrence states through 5 gives 267."
      },
      {
        "input": "7",
        "output": "2619",
        "explanation": "Filling the recurrence states through 7 gives 2619."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "27"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "267"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "2619"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-3",
    "slug": "weighted-recurrence-dp-3",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #3",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=4*dp[n-1]+5*dp[n-2]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "104",
        "explanation": "Filling the recurrence states through 3 gives 104."
      },
      {
        "input": "5",
        "output": "2604",
        "explanation": "Filling the recurrence states through 5 gives 2604."
      },
      {
        "input": "7",
        "output": "65104",
        "explanation": "Filling the recurrence states through 7 gives 65104."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "104"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "2604"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "65104"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-4",
    "slug": "weighted-recurrence-dp-4",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #4",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=1*dp[n-1]+1*dp[n-3]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "2",
        "explanation": "Filling the recurrence states through 3 gives 2."
      },
      {
        "input": "5",
        "output": "4",
        "explanation": "Filling the recurrence states through 5 gives 4."
      },
      {
        "input": "7",
        "output": "9",
        "explanation": "Filling the recurrence states through 7 gives 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "7",
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
    "id": "learn:dynamic-programming:weighted-recurrence-dp-5",
    "slug": "weighted-recurrence-dp-5",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #5",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=2*dp[n-1]+2*dp[n-4]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "8",
        "explanation": "Filling the recurrence states through 3 gives 8."
      },
      {
        "input": "5",
        "output": "40",
        "explanation": "Filling the recurrence states through 5 gives 40."
      },
      {
        "input": "7",
        "output": "192",
        "explanation": "Filling the recurrence states through 7 gives 192."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "40"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "192"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-6",
    "slug": "weighted-recurrence-dp-6",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #6",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=3*dp[n-1]+3*dp[n-2]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "45",
        "explanation": "Filling the recurrence states through 3 gives 45."
      },
      {
        "input": "5",
        "output": "648",
        "explanation": "Filling the recurrence states through 5 gives 648."
      },
      {
        "input": "7",
        "output": "9315",
        "explanation": "Filling the recurrence states through 7 gives 9315."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "45"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "648"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "9315"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-7",
    "slug": "weighted-recurrence-dp-7",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #7",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=4*dp[n-1]+4*dp[n-3]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "68",
        "explanation": "Filling the recurrence states through 3 gives 68."
      },
      {
        "input": "5",
        "output": "1216",
        "explanation": "Filling the recurrence states through 5 gives 1216."
      },
      {
        "input": "7",
        "output": "21696",
        "explanation": "Filling the recurrence states through 7 gives 21696."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "68"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "1216"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "21696"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-8",
    "slug": "weighted-recurrence-dp-8",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #8",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=1*dp[n-1]+5*dp[n-4]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "1",
        "explanation": "Filling the recurrence states through 3 gives 1."
      },
      {
        "input": "5",
        "output": "11",
        "explanation": "Filling the recurrence states through 5 gives 11."
      },
      {
        "input": "7",
        "output": "21",
        "explanation": "Filling the recurrence states through 7 gives 21."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "11"
      },
      {
        "testIndex": 3,
        "input": "7",
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
    "id": "learn:dynamic-programming:weighted-recurrence-dp-9",
    "slug": "weighted-recurrence-dp-9",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #9",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=2*dp[n-1]+1*dp[n-2]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "12",
        "explanation": "Filling the recurrence states through 3 gives 12."
      },
      {
        "input": "5",
        "output": "70",
        "explanation": "Filling the recurrence states through 5 gives 70."
      },
      {
        "input": "7",
        "output": "408",
        "explanation": "Filling the recurrence states through 7 gives 408."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "12"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "70"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "408"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-10",
    "slug": "weighted-recurrence-dp-10",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #10",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=3*dp[n-1]+2*dp[n-3]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "29",
        "explanation": "Filling the recurrence states through 3 gives 29."
      },
      {
        "input": "5",
        "output": "297",
        "explanation": "Filling the recurrence states through 5 gives 297."
      },
      {
        "input": "7",
        "output": "3033",
        "explanation": "Filling the recurrence states through 7 gives 3033."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "29"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "297"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "3033"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-11",
    "slug": "weighted-recurrence-dp-11",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #11",
    "order": 11,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=4*dp[n-1]+3*dp[n-4]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "64",
        "explanation": "Filling the recurrence states through 3 gives 64."
      },
      {
        "input": "5",
        "output": "1048",
        "explanation": "Filling the recurrence states through 5 gives 1048."
      },
      {
        "input": "7",
        "output": "17152",
        "explanation": "Filling the recurrence states through 7 gives 17152."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "64"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "1048"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "17152"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-12",
    "slug": "weighted-recurrence-dp-12",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #12",
    "order": 12,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=1*dp[n-1]+4*dp[n-2]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "9",
        "explanation": "Filling the recurrence states through 3 gives 9."
      },
      {
        "input": "5",
        "output": "65",
        "explanation": "Filling the recurrence states through 5 gives 65."
      },
      {
        "input": "7",
        "output": "441",
        "explanation": "Filling the recurrence states through 7 gives 441."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "65"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "441"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-13",
    "slug": "weighted-recurrence-dp-13",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #13",
    "order": 13,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=2*dp[n-1]+5*dp[n-3]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "13",
        "explanation": "Filling the recurrence states through 3 gives 13."
      },
      {
        "input": "5",
        "output": "92",
        "explanation": "Filling the recurrence states through 5 gives 92."
      },
      {
        "input": "7",
        "output": "678",
        "explanation": "Filling the recurrence states through 7 gives 678."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "13"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "92"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "678"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-14",
    "slug": "weighted-recurrence-dp-14",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #14",
    "order": 14,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=3*dp[n-1]+1*dp[n-4]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "27",
        "explanation": "Filling the recurrence states through 3 gives 27."
      },
      {
        "input": "5",
        "output": "249",
        "explanation": "Filling the recurrence states through 5 gives 249."
      },
      {
        "input": "7",
        "output": "2295",
        "explanation": "Filling the recurrence states through 7 gives 2295."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "27"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "249"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "2295"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-15",
    "slug": "weighted-recurrence-dp-15",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #15",
    "order": 15,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=4*dp[n-1]+2*dp[n-2]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "80",
        "explanation": "Filling the recurrence states through 3 gives 80."
      },
      {
        "input": "5",
        "output": "1584",
        "explanation": "Filling the recurrence states through 5 gives 1584."
      },
      {
        "input": "7",
        "output": "31360",
        "explanation": "Filling the recurrence states through 7 gives 31360."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "80"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "1584"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "31360"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-16",
    "slug": "weighted-recurrence-dp-16",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #16",
    "order": 16,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=1*dp[n-1]+3*dp[n-3]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "4",
        "explanation": "Filling the recurrence states through 3 gives 4."
      },
      {
        "input": "5",
        "output": "10",
        "explanation": "Filling the recurrence states through 5 gives 10."
      },
      {
        "input": "7",
        "output": "43",
        "explanation": "Filling the recurrence states through 7 gives 43."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "43"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-17",
    "slug": "weighted-recurrence-dp-17",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #17",
    "order": 17,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=2*dp[n-1]+4*dp[n-4]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "8",
        "explanation": "Filling the recurrence states through 3 gives 8."
      },
      {
        "input": "5",
        "output": "48",
        "explanation": "Filling the recurrence states through 5 gives 48."
      },
      {
        "input": "7",
        "output": "256",
        "explanation": "Filling the recurrence states through 7 gives 256."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "48"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "256"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-18",
    "slug": "weighted-recurrence-dp-18",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #18",
    "order": 18,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=3*dp[n-1]+5*dp[n-2]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "57",
        "explanation": "Filling the recurrence states through 3 gives 57."
      },
      {
        "input": "5",
        "output": "1008",
        "explanation": "Filling the recurrence states through 5 gives 1008."
      },
      {
        "input": "7",
        "output": "17727",
        "explanation": "Filling the recurrence states through 7 gives 17727."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "57"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "1008"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "17727"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-19",
    "slug": "weighted-recurrence-dp-19",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #19",
    "order": 19,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=4*dp[n-1]+1*dp[n-3]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "65",
        "explanation": "Filling the recurrence states through 3 gives 65."
      },
      {
        "input": "5",
        "output": "1072",
        "explanation": "Filling the recurrence states through 5 gives 1072."
      },
      {
        "input": "7",
        "output": "17676",
        "explanation": "Filling the recurrence states through 7 gives 17676."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "65"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "1072"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "17676"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-20",
    "slug": "weighted-recurrence-dp-20",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #20",
    "order": 20,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=1*dp[n-1]+2*dp[n-4]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "1",
        "explanation": "Filling the recurrence states through 3 gives 1."
      },
      {
        "input": "5",
        "output": "5",
        "explanation": "Filling the recurrence states through 5 gives 5."
      },
      {
        "input": "7",
        "output": "9",
        "explanation": "Filling the recurrence states through 7 gives 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "7",
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
    "id": "learn:dynamic-programming:weighted-recurrence-dp-21",
    "slug": "weighted-recurrence-dp-21",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #21",
    "order": 21,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=2*dp[n-1]+3*dp[n-2]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "20",
        "explanation": "Filling the recurrence states through 3 gives 20."
      },
      {
        "input": "5",
        "output": "182",
        "explanation": "Filling the recurrence states through 5 gives 182."
      },
      {
        "input": "7",
        "output": "1640",
        "explanation": "Filling the recurrence states through 7 gives 1640."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "20"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "182"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "1640"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-22",
    "slug": "weighted-recurrence-dp-22",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #22",
    "order": 22,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=3*dp[n-1]+4*dp[n-3]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "31",
        "explanation": "Filling the recurrence states through 3 gives 31."
      },
      {
        "input": "5",
        "output": "351",
        "explanation": "Filling the recurrence states through 5 gives 351."
      },
      {
        "input": "7",
        "output": "3951",
        "explanation": "Filling the recurrence states through 7 gives 3951."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "31"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "351"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "3951"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-23",
    "slug": "weighted-recurrence-dp-23",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #23",
    "order": 23,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=4*dp[n-1]+5*dp[n-4]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "64",
        "explanation": "Filling the recurrence states through 3 gives 64."
      },
      {
        "input": "5",
        "output": "1064",
        "explanation": "Filling the recurrence states through 5 gives 1064."
      },
      {
        "input": "7",
        "output": "17664",
        "explanation": "Filling the recurrence states through 7 gives 17664."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "64"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "1064"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "17664"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-24",
    "slug": "weighted-recurrence-dp-24",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #24",
    "order": 24,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=1*dp[n-1]+1*dp[n-2]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "3",
        "explanation": "Filling the recurrence states through 3 gives 3."
      },
      {
        "input": "5",
        "output": "8",
        "explanation": "Filling the recurrence states through 5 gives 8."
      },
      {
        "input": "7",
        "output": "21",
        "explanation": "Filling the recurrence states through 7 gives 21."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "7",
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
    "id": "learn:dynamic-programming:weighted-recurrence-dp-25",
    "slug": "weighted-recurrence-dp-25",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #25",
    "order": 25,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=2*dp[n-1]+2*dp[n-3]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "10",
        "explanation": "Filling the recurrence states through 3 gives 10."
      },
      {
        "input": "5",
        "output": "56",
        "explanation": "Filling the recurrence states through 5 gives 56."
      },
      {
        "input": "7",
        "output": "312",
        "explanation": "Filling the recurrence states through 7 gives 312."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "56"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "312"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-26",
    "slug": "weighted-recurrence-dp-26",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #26",
    "order": 26,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=3*dp[n-1]+3*dp[n-4]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "27",
        "explanation": "Filling the recurrence states through 3 gives 27."
      },
      {
        "input": "5",
        "output": "261",
        "explanation": "Filling the recurrence states through 5 gives 261."
      },
      {
        "input": "7",
        "output": "2511",
        "explanation": "Filling the recurrence states through 7 gives 2511."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "27"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "261"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "2511"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-27",
    "slug": "weighted-recurrence-dp-27",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #27",
    "order": 27,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=4*dp[n-1]+4*dp[n-2]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "96",
        "explanation": "Filling the recurrence states through 3 gives 96."
      },
      {
        "input": "5",
        "output": "2240",
        "explanation": "Filling the recurrence states through 5 gives 2240."
      },
      {
        "input": "7",
        "output": "52224",
        "explanation": "Filling the recurrence states through 7 gives 52224."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "96"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "2240"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "52224"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-28",
    "slug": "weighted-recurrence-dp-28",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #28",
    "order": 28,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=1*dp[n-1]+5*dp[n-3]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "6",
        "explanation": "Filling the recurrence states through 3 gives 6."
      },
      {
        "input": "5",
        "output": "16",
        "explanation": "Filling the recurrence states through 5 gives 16."
      },
      {
        "input": "7",
        "output": "101",
        "explanation": "Filling the recurrence states through 7 gives 101."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "16"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "101"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-29",
    "slug": "weighted-recurrence-dp-29",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #29",
    "order": 29,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=2*dp[n-1]+1*dp[n-4]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "8",
        "explanation": "Filling the recurrence states through 3 gives 8."
      },
      {
        "input": "5",
        "output": "36",
        "explanation": "Filling the recurrence states through 5 gives 36."
      },
      {
        "input": "7",
        "output": "160",
        "explanation": "Filling the recurrence states through 7 gives 160."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "36"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "160"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-30",
    "slug": "weighted-recurrence-dp-30",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #30",
    "order": 30,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=3*dp[n-1]+2*dp[n-2]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "39",
        "explanation": "Filling the recurrence states through 3 gives 39."
      },
      {
        "input": "5",
        "output": "495",
        "explanation": "Filling the recurrence states through 5 gives 495."
      },
      {
        "input": "7",
        "output": "6279",
        "explanation": "Filling the recurrence states through 7 gives 6279."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "39"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "495"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "6279"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-31",
    "slug": "weighted-recurrence-dp-31",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #31",
    "order": 31,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=4*dp[n-1]+3*dp[n-3]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "67",
        "explanation": "Filling the recurrence states through 3 gives 67."
      },
      {
        "input": "5",
        "output": "1168",
        "explanation": "Filling the recurrence states through 5 gives 1168."
      },
      {
        "input": "7",
        "output": "20332",
        "explanation": "Filling the recurrence states through 7 gives 20332."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "67"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "1168"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "20332"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-32",
    "slug": "weighted-recurrence-dp-32",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #32",
    "order": 32,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=1*dp[n-1]+4*dp[n-4]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "1",
        "explanation": "Filling the recurrence states through 3 gives 1."
      },
      {
        "input": "5",
        "output": "9",
        "explanation": "Filling the recurrence states through 5 gives 9."
      },
      {
        "input": "7",
        "output": "17",
        "explanation": "Filling the recurrence states through 7 gives 17."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "7",
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
    "id": "learn:dynamic-programming:weighted-recurrence-dp-33",
    "slug": "weighted-recurrence-dp-33",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #33",
    "order": 33,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=2*dp[n-1]+5*dp[n-2]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "28",
        "explanation": "Filling the recurrence states through 3 gives 28."
      },
      {
        "input": "5",
        "output": "342",
        "explanation": "Filling the recurrence states through 5 gives 342."
      },
      {
        "input": "7",
        "output": "4088",
        "explanation": "Filling the recurrence states through 7 gives 4088."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "28"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "342"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "4088"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-34",
    "slug": "weighted-recurrence-dp-34",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #34",
    "order": 34,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=3*dp[n-1]+1*dp[n-3]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "28",
        "explanation": "Filling the recurrence states through 3 gives 28."
      },
      {
        "input": "5",
        "output": "270",
        "explanation": "Filling the recurrence states through 5 gives 270."
      },
      {
        "input": "7",
        "output": "2601",
        "explanation": "Filling the recurrence states through 7 gives 2601."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "28"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "270"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "2601"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-35",
    "slug": "weighted-recurrence-dp-35",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #35",
    "order": 35,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=4*dp[n-1]+2*dp[n-4]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "64",
        "explanation": "Filling the recurrence states through 3 gives 64."
      },
      {
        "input": "5",
        "output": "1040",
        "explanation": "Filling the recurrence states through 5 gives 1040."
      },
      {
        "input": "7",
        "output": "16896",
        "explanation": "Filling the recurrence states through 7 gives 16896."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "64"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "1040"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "16896"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-36",
    "slug": "weighted-recurrence-dp-36",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #36",
    "order": 36,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=1*dp[n-1]+3*dp[n-2]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "7",
        "explanation": "Filling the recurrence states through 3 gives 7."
      },
      {
        "input": "5",
        "output": "40",
        "explanation": "Filling the recurrence states through 5 gives 40."
      },
      {
        "input": "7",
        "output": "217",
        "explanation": "Filling the recurrence states through 7 gives 217."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "40"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "217"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-37",
    "slug": "weighted-recurrence-dp-37",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #37",
    "order": 37,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=2*dp[n-1]+4*dp[n-3]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "12",
        "explanation": "Filling the recurrence states through 3 gives 12."
      },
      {
        "input": "5",
        "output": "80",
        "explanation": "Filling the recurrence states through 5 gives 80."
      },
      {
        "input": "7",
        "output": "544",
        "explanation": "Filling the recurrence states through 7 gives 544."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "12"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "80"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "544"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-38",
    "slug": "weighted-recurrence-dp-38",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #38",
    "order": 38,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=3*dp[n-1]+5*dp[n-4]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "27",
        "explanation": "Filling the recurrence states through 3 gives 27."
      },
      {
        "input": "5",
        "output": "273",
        "explanation": "Filling the recurrence states through 5 gives 273."
      },
      {
        "input": "7",
        "output": "2727",
        "explanation": "Filling the recurrence states through 7 gives 2727."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "27"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "273"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "2727"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-39",
    "slug": "weighted-recurrence-dp-39",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #39",
    "order": 39,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=4*dp[n-1]+1*dp[n-2]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "72",
        "explanation": "Filling the recurrence states through 3 gives 72."
      },
      {
        "input": "5",
        "output": "1292",
        "explanation": "Filling the recurrence states through 5 gives 1292."
      },
      {
        "input": "7",
        "output": "23184",
        "explanation": "Filling the recurrence states through 7 gives 23184."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "72"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "1292"
      },
      {
        "testIndex": 3,
        "input": "7",
        "expectedOutput": "23184"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:weighted-recurrence-dp-40",
    "slug": "weighted-recurrence-dp-40",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Weighted Recurrence DP #40",
    "order": 40,
    "difficulty": "Easy",
    "problemStatement": "Let `dp[0]=1`. For n>0, `dp[n]=1*dp[n-1]+2*dp[n-3]`, omitting terms with negative indices. Compute dp[n].",
    "inputFormat": "One line contains integer `n`.",
    "outputFormat": "Print dp[n].",
    "constraints": "0 <= n <= 35; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "3",
        "output": "3",
        "explanation": "Filling the recurrence states through 3 gives 3."
      },
      {
        "input": "5",
        "output": "7",
        "explanation": "Filling the recurrence states through 5 gives 7."
      },
      {
        "input": "7",
        "output": "23",
        "explanation": "Filling the recurrence states through 7 gives 23."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "5",
        "expectedOutput": "7"
      },
      {
        "testIndex": 3,
        "input": "7",
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
    "id": "learn:dynamic-programming:line-minimum-cost-dp-1",
    "slug": "line-minimum-cost-dp-1",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #1",
    "order": 41,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+3. Landing on even index costs an extra 1. Find minimum total landing cost including index 0.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "7",
        "explanation": "The minimum line-DP cost is 7; adding setup fee 0 gives 7."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "11",
        "explanation": "The minimum line-DP cost is 11; adding setup fee 0 gives 11."
      },
      {
        "input": "3\n7 2 3",
        "output": "14",
        "explanation": "The minimum line-DP cost is 14; adding setup fee 0 gives 14."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "11"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
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
    "id": "learn:dynamic-programming:line-minimum-cost-dp-2",
    "slug": "line-minimum-cost-dp-2",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #2",
    "order": 42,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+4. Landing on even index costs an extra 2. Find minimum total landing cost including index 0.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "16",
        "explanation": "The minimum line-DP cost is 16; adding setup fee 0 gives 16."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "12",
        "explanation": "The minimum line-DP cost is 12; adding setup fee 0 gives 12."
      },
      {
        "input": "3\n7 2 3",
        "output": "16",
        "explanation": "The minimum line-DP cost is 16; adding setup fee 0 gives 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "16"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "12"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
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
    "id": "learn:dynamic-programming:line-minimum-cost-dp-3",
    "slug": "line-minimum-cost-dp-3",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #3",
    "order": 43,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+5. Landing on even index costs an extra 3. Find minimum total landing cost including index 0.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "18",
        "explanation": "The minimum line-DP cost is 18; adding setup fee 0 gives 18."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "26",
        "explanation": "The minimum line-DP cost is 26; adding setup fee 0 gives 26."
      },
      {
        "input": "3\n7 2 3",
        "output": "18",
        "explanation": "The minimum line-DP cost is 18; adding setup fee 0 gives 18."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "18"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "26"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
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
    "id": "learn:dynamic-programming:line-minimum-cost-dp-4",
    "slug": "line-minimum-cost-dp-4",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #4",
    "order": 44,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+2. Landing on even index costs an extra 4. Find minimum total landing cost including index 0.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "15",
        "explanation": "The minimum line-DP cost is 15; adding setup fee 0 gives 15."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "19",
        "explanation": "The minimum line-DP cost is 19; adding setup fee 0 gives 19."
      },
      {
        "input": "3\n7 2 3",
        "output": "18",
        "explanation": "The minimum line-DP cost is 18; adding setup fee 0 gives 18."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "15"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "19"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
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
    "id": "learn:dynamic-programming:line-minimum-cost-dp-5",
    "slug": "line-minimum-cost-dp-5",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #5",
    "order": 45,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+3. Landing on even index costs an extra 5. Find minimum total landing cost including index 0.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "11",
        "explanation": "The minimum line-DP cost is 11; adding setup fee 0 gives 11."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "19",
        "explanation": "The minimum line-DP cost is 19; adding setup fee 0 gives 19."
      },
      {
        "input": "3\n7 2 3",
        "output": "22",
        "explanation": "The minimum line-DP cost is 22; adding setup fee 0 gives 22."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "11"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "19"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "22"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-6",
    "slug": "line-minimum-cost-dp-6",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #6",
    "order": 46,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+4. Landing on even index costs an extra 0. Find minimum total landing cost including index 0.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "12",
        "explanation": "The minimum line-DP cost is 12; adding setup fee 0 gives 12."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "8",
        "explanation": "The minimum line-DP cost is 8; adding setup fee 0 gives 8."
      },
      {
        "input": "3\n7 2 3",
        "output": "12",
        "explanation": "The minimum line-DP cost is 12; adding setup fee 0 gives 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "12"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
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
    "id": "learn:dynamic-programming:line-minimum-cost-dp-7",
    "slug": "line-minimum-cost-dp-7",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #7",
    "order": 47,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+5. Landing on even index costs an extra 1. Find minimum total landing cost including index 0.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "14",
        "explanation": "The minimum line-DP cost is 14; adding setup fee 0 gives 14."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "20",
        "explanation": "The minimum line-DP cost is 20; adding setup fee 0 gives 20."
      },
      {
        "input": "3\n7 2 3",
        "output": "14",
        "explanation": "The minimum line-DP cost is 14; adding setup fee 0 gives 14."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "14"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "20"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
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
    "id": "learn:dynamic-programming:line-minimum-cost-dp-8",
    "slug": "line-minimum-cost-dp-8",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #8",
    "order": 48,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+2. Landing on even index costs an extra 2. Find minimum total landing cost including index 0.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "11",
        "explanation": "The minimum line-DP cost is 11; adding setup fee 0 gives 11."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "15",
        "explanation": "The minimum line-DP cost is 15; adding setup fee 0 gives 15."
      },
      {
        "input": "3\n7 2 3",
        "output": "14",
        "explanation": "The minimum line-DP cost is 14; adding setup fee 0 gives 14."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "11"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
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
    "id": "learn:dynamic-programming:line-minimum-cost-dp-9",
    "slug": "line-minimum-cost-dp-9",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #9",
    "order": 49,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+3. Landing on even index costs an extra 3. Find minimum total landing cost including index 0.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "9",
        "explanation": "The minimum line-DP cost is 9; adding setup fee 0 gives 9."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "15",
        "explanation": "The minimum line-DP cost is 15; adding setup fee 0 gives 15."
      },
      {
        "input": "3\n7 2 3",
        "output": "18",
        "explanation": "The minimum line-DP cost is 18; adding setup fee 0 gives 18."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
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
    "id": "learn:dynamic-programming:line-minimum-cost-dp-10",
    "slug": "line-minimum-cost-dp-10",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #10",
    "order": 50,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+4. Landing on even index costs an extra 4. Find minimum total landing cost including index 0.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "20",
        "explanation": "The minimum line-DP cost is 20; adding setup fee 0 gives 20."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "16",
        "explanation": "The minimum line-DP cost is 16; adding setup fee 0 gives 16."
      },
      {
        "input": "3\n7 2 3",
        "output": "20",
        "explanation": "The minimum line-DP cost is 20; adding setup fee 0 gives 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "20"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "16"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
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
    "id": "learn:dynamic-programming:line-minimum-cost-dp-11",
    "slug": "line-minimum-cost-dp-11",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #11",
    "order": 51,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+5. Landing on even index costs an extra 5. Find minimum total landing cost including index 0.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "22",
        "explanation": "The minimum line-DP cost is 22; adding setup fee 0 gives 22."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "32",
        "explanation": "The minimum line-DP cost is 32; adding setup fee 0 gives 32."
      },
      {
        "input": "3\n7 2 3",
        "output": "22",
        "explanation": "The minimum line-DP cost is 22; adding setup fee 0 gives 22."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "22"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "32"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "22"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-12",
    "slug": "line-minimum-cost-dp-12",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #12",
    "order": 52,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+2. Landing on even index costs an extra 0. Find minimum total landing cost including index 0.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "7",
        "explanation": "The minimum line-DP cost is 7; adding setup fee 0 gives 7."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "11",
        "explanation": "The minimum line-DP cost is 11; adding setup fee 0 gives 11."
      },
      {
        "input": "3\n7 2 3",
        "output": "10",
        "explanation": "The minimum line-DP cost is 10; adding setup fee 0 gives 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "11"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
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
    "id": "learn:dynamic-programming:line-minimum-cost-dp-13",
    "slug": "line-minimum-cost-dp-13",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #13",
    "order": 53,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+3. Landing on even index costs an extra 1. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 653; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "660",
        "explanation": "The minimum line-DP cost is 7; adding setup fee 653 gives 660."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "664",
        "explanation": "The minimum line-DP cost is 11; adding setup fee 653 gives 664."
      },
      {
        "input": "3\n7 2 3",
        "output": "667",
        "explanation": "The minimum line-DP cost is 14; adding setup fee 653 gives 667."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "660"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "664"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "667"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-14",
    "slug": "line-minimum-cost-dp-14",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #14",
    "order": 54,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+4. Landing on even index costs an extra 2. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 654; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "670",
        "explanation": "The minimum line-DP cost is 16; adding setup fee 654 gives 670."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "666",
        "explanation": "The minimum line-DP cost is 12; adding setup fee 654 gives 666."
      },
      {
        "input": "3\n7 2 3",
        "output": "670",
        "explanation": "The minimum line-DP cost is 16; adding setup fee 654 gives 670."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "670"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "666"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "670"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-15",
    "slug": "line-minimum-cost-dp-15",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #15",
    "order": 55,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+5. Landing on even index costs an extra 3. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 655; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "673",
        "explanation": "The minimum line-DP cost is 18; adding setup fee 655 gives 673."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "681",
        "explanation": "The minimum line-DP cost is 26; adding setup fee 655 gives 681."
      },
      {
        "input": "3\n7 2 3",
        "output": "673",
        "explanation": "The minimum line-DP cost is 18; adding setup fee 655 gives 673."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "673"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "681"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "673"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-16",
    "slug": "line-minimum-cost-dp-16",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #16",
    "order": 56,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+2. Landing on even index costs an extra 4. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 656; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "671",
        "explanation": "The minimum line-DP cost is 15; adding setup fee 656 gives 671."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "675",
        "explanation": "The minimum line-DP cost is 19; adding setup fee 656 gives 675."
      },
      {
        "input": "3\n7 2 3",
        "output": "674",
        "explanation": "The minimum line-DP cost is 18; adding setup fee 656 gives 674."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "671"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "675"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "674"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-17",
    "slug": "line-minimum-cost-dp-17",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #17",
    "order": 57,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+3. Landing on even index costs an extra 5. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 657; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "668",
        "explanation": "The minimum line-DP cost is 11; adding setup fee 657 gives 668."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "676",
        "explanation": "The minimum line-DP cost is 19; adding setup fee 657 gives 676."
      },
      {
        "input": "3\n7 2 3",
        "output": "679",
        "explanation": "The minimum line-DP cost is 22; adding setup fee 657 gives 679."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "668"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "676"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "679"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-18",
    "slug": "line-minimum-cost-dp-18",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #18",
    "order": 58,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+4. Landing on even index costs an extra 0. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 658; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "670",
        "explanation": "The minimum line-DP cost is 12; adding setup fee 658 gives 670."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "666",
        "explanation": "The minimum line-DP cost is 8; adding setup fee 658 gives 666."
      },
      {
        "input": "3\n7 2 3",
        "output": "670",
        "explanation": "The minimum line-DP cost is 12; adding setup fee 658 gives 670."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "670"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "666"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "670"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-19",
    "slug": "line-minimum-cost-dp-19",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #19",
    "order": 59,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+5. Landing on even index costs an extra 1. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 659; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "673",
        "explanation": "The minimum line-DP cost is 14; adding setup fee 659 gives 673."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "679",
        "explanation": "The minimum line-DP cost is 20; adding setup fee 659 gives 679."
      },
      {
        "input": "3\n7 2 3",
        "output": "673",
        "explanation": "The minimum line-DP cost is 14; adding setup fee 659 gives 673."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "673"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "679"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "673"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-20",
    "slug": "line-minimum-cost-dp-20",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #20",
    "order": 60,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+2. Landing on even index costs an extra 2. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 660; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "671",
        "explanation": "The minimum line-DP cost is 11; adding setup fee 660 gives 671."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "675",
        "explanation": "The minimum line-DP cost is 15; adding setup fee 660 gives 675."
      },
      {
        "input": "3\n7 2 3",
        "output": "674",
        "explanation": "The minimum line-DP cost is 14; adding setup fee 660 gives 674."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "671"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "675"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "674"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-21",
    "slug": "line-minimum-cost-dp-21",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #21",
    "order": 61,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+3. Landing on even index costs an extra 3. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 661; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "670",
        "explanation": "The minimum line-DP cost is 9; adding setup fee 661 gives 670."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "676",
        "explanation": "The minimum line-DP cost is 15; adding setup fee 661 gives 676."
      },
      {
        "input": "3\n7 2 3",
        "output": "679",
        "explanation": "The minimum line-DP cost is 18; adding setup fee 661 gives 679."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "670"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "676"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "679"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-22",
    "slug": "line-minimum-cost-dp-22",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #22",
    "order": 62,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+4. Landing on even index costs an extra 4. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 662; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "682",
        "explanation": "The minimum line-DP cost is 20; adding setup fee 662 gives 682."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "678",
        "explanation": "The minimum line-DP cost is 16; adding setup fee 662 gives 678."
      },
      {
        "input": "3\n7 2 3",
        "output": "682",
        "explanation": "The minimum line-DP cost is 20; adding setup fee 662 gives 682."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "682"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "678"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "682"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-23",
    "slug": "line-minimum-cost-dp-23",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #23",
    "order": 63,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+5. Landing on even index costs an extra 5. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 663; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "685",
        "explanation": "The minimum line-DP cost is 22; adding setup fee 663 gives 685."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "695",
        "explanation": "The minimum line-DP cost is 32; adding setup fee 663 gives 695."
      },
      {
        "input": "3\n7 2 3",
        "output": "685",
        "explanation": "The minimum line-DP cost is 22; adding setup fee 663 gives 685."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "685"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "695"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "685"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-24",
    "slug": "line-minimum-cost-dp-24",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #24",
    "order": 64,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+2. Landing on even index costs an extra 0. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 664; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "671",
        "explanation": "The minimum line-DP cost is 7; adding setup fee 664 gives 671."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "675",
        "explanation": "The minimum line-DP cost is 11; adding setup fee 664 gives 675."
      },
      {
        "input": "3\n7 2 3",
        "output": "674",
        "explanation": "The minimum line-DP cost is 10; adding setup fee 664 gives 674."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "671"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "675"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "674"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-25",
    "slug": "line-minimum-cost-dp-25",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #25",
    "order": 65,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+3. Landing on even index costs an extra 1. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 665; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "672",
        "explanation": "The minimum line-DP cost is 7; adding setup fee 665 gives 672."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "676",
        "explanation": "The minimum line-DP cost is 11; adding setup fee 665 gives 676."
      },
      {
        "input": "3\n7 2 3",
        "output": "679",
        "explanation": "The minimum line-DP cost is 14; adding setup fee 665 gives 679."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "672"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "676"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "679"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-26",
    "slug": "line-minimum-cost-dp-26",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #26",
    "order": 66,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+4. Landing on even index costs an extra 2. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 666; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "682",
        "explanation": "The minimum line-DP cost is 16; adding setup fee 666 gives 682."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "678",
        "explanation": "The minimum line-DP cost is 12; adding setup fee 666 gives 678."
      },
      {
        "input": "3\n7 2 3",
        "output": "682",
        "explanation": "The minimum line-DP cost is 16; adding setup fee 666 gives 682."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "682"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "678"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "682"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-27",
    "slug": "line-minimum-cost-dp-27",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #27",
    "order": 67,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+5. Landing on even index costs an extra 3. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 667; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "685",
        "explanation": "The minimum line-DP cost is 18; adding setup fee 667 gives 685."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "693",
        "explanation": "The minimum line-DP cost is 26; adding setup fee 667 gives 693."
      },
      {
        "input": "3\n7 2 3",
        "output": "685",
        "explanation": "The minimum line-DP cost is 18; adding setup fee 667 gives 685."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "685"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "693"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "685"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-28",
    "slug": "line-minimum-cost-dp-28",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #28",
    "order": 68,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+2. Landing on even index costs an extra 4. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 668; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "683",
        "explanation": "The minimum line-DP cost is 15; adding setup fee 668 gives 683."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "687",
        "explanation": "The minimum line-DP cost is 19; adding setup fee 668 gives 687."
      },
      {
        "input": "3\n7 2 3",
        "output": "686",
        "explanation": "The minimum line-DP cost is 18; adding setup fee 668 gives 686."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "683"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "687"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "686"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-29",
    "slug": "line-minimum-cost-dp-29",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #29",
    "order": 69,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+3. Landing on even index costs an extra 5. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 669; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "680",
        "explanation": "The minimum line-DP cost is 11; adding setup fee 669 gives 680."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "688",
        "explanation": "The minimum line-DP cost is 19; adding setup fee 669 gives 688."
      },
      {
        "input": "3\n7 2 3",
        "output": "691",
        "explanation": "The minimum line-DP cost is 22; adding setup fee 669 gives 691."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "680"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "688"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "691"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:line-minimum-cost-dp-30",
    "slug": "line-minimum-cost-dp-30",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Line Minimum Cost DP #30",
    "order": 70,
    "difficulty": "Easy",
    "problemStatement": "Move from index 0 to n-1. From index x you may move to x+1 or x+4. Landing on even index costs an extra 0. Find minimum total landing cost including index 0. Before any move, pay a one-time setup fee of 670; include this fee in the minimum total.",
    "inputFormat": "First line contains `n`; second line contains n non-negative costs.",
    "outputFormat": "Print the minimum including the setup fee total cost.",
    "constraints": "1 <= n <= 1000; 0 <= cost[i] <= 10^6.",
    "examples": [
      {
        "input": "4\n2 5 1 4",
        "output": "682",
        "explanation": "The minimum line-DP cost is 12; adding setup fee 670 gives 682."
      },
      {
        "input": "5\n3 1 6 2 5",
        "output": "678",
        "explanation": "The minimum line-DP cost is 8; adding setup fee 670 gives 678."
      },
      {
        "input": "3\n7 2 3",
        "output": "682",
        "explanation": "The minimum line-DP cost is 12; adding setup fee 670 gives 682."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "4\n2 5 1 4",
        "expectedOutput": "682"
      },
      {
        "testIndex": 2,
        "input": "5\n3 1 6 2 5",
        "expectedOutput": "678"
      },
      {
        "testIndex": 3,
        "input": "3\n7 2 3",
        "expectedOutput": "682"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-1",
    "slug": "grid-minimum-path-dp-1",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #1",
    "order": 71,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 1 when row+column is even. Find the minimum top-left to bottom-right cost.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "9",
        "explanation": "The minimum grid-DP cost is 9; adding setup fee 0 gives 9."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "8",
        "explanation": "The minimum grid-DP cost is 8; adding setup fee 0 gives 8."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "7",
        "explanation": "The minimum grid-DP cost is 7; adding setup fee 0 gives 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
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
    "id": "learn:dynamic-programming:grid-minimum-path-dp-2",
    "slug": "grid-minimum-path-dp-2",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #2",
    "order": 72,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 2 when row+column is even. Find the minimum top-left to bottom-right cost.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "11",
        "explanation": "The minimum grid-DP cost is 11; adding setup fee 0 gives 11."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "10",
        "explanation": "The minimum grid-DP cost is 10; adding setup fee 0 gives 10."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "9",
        "explanation": "The minimum grid-DP cost is 9; adding setup fee 0 gives 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "11"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
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
    "id": "learn:dynamic-programming:grid-minimum-path-dp-3",
    "slug": "grid-minimum-path-dp-3",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #3",
    "order": 73,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 3 when row+column is even. Find the minimum top-left to bottom-right cost.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "13",
        "explanation": "The minimum grid-DP cost is 13; adding setup fee 0 gives 13."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "12",
        "explanation": "The minimum grid-DP cost is 12; adding setup fee 0 gives 12."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "11",
        "explanation": "The minimum grid-DP cost is 11; adding setup fee 0 gives 11."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "13"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "12"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
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
    "id": "learn:dynamic-programming:grid-minimum-path-dp-4",
    "slug": "grid-minimum-path-dp-4",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #4",
    "order": 74,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 4 when row+column is even. Find the minimum top-left to bottom-right cost.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "15",
        "explanation": "The minimum grid-DP cost is 15; adding setup fee 0 gives 15."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "14",
        "explanation": "The minimum grid-DP cost is 14; adding setup fee 0 gives 14."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "13",
        "explanation": "The minimum grid-DP cost is 13; adding setup fee 0 gives 13."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "15"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "14"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "13"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-5",
    "slug": "grid-minimum-path-dp-5",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #5",
    "order": 75,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 5 when row+column is even. Find the minimum top-left to bottom-right cost.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "17",
        "explanation": "The minimum grid-DP cost is 17; adding setup fee 0 gives 17."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "16",
        "explanation": "The minimum grid-DP cost is 16; adding setup fee 0 gives 16."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "15",
        "explanation": "The minimum grid-DP cost is 15; adding setup fee 0 gives 15."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "17"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "16"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
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
    "id": "learn:dynamic-programming:grid-minimum-path-dp-6",
    "slug": "grid-minimum-path-dp-6",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #6",
    "order": 76,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 6 when row+column is even. Find the minimum top-left to bottom-right cost.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "19",
        "explanation": "The minimum grid-DP cost is 19; adding setup fee 0 gives 19."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "18",
        "explanation": "The minimum grid-DP cost is 18; adding setup fee 0 gives 18."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "17",
        "explanation": "The minimum grid-DP cost is 17; adding setup fee 0 gives 17."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "19"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "18"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
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
    "id": "learn:dynamic-programming:grid-minimum-path-dp-7",
    "slug": "grid-minimum-path-dp-7",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #7",
    "order": 77,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 0 when row+column is even. Find the minimum top-left to bottom-right cost.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "7",
        "explanation": "The minimum grid-DP cost is 7; adding setup fee 0 gives 7."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "6",
        "explanation": "The minimum grid-DP cost is 6; adding setup fee 0 gives 6."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "5",
        "explanation": "The minimum grid-DP cost is 5; adding setup fee 0 gives 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
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
    "id": "learn:dynamic-programming:grid-minimum-path-dp-8",
    "slug": "grid-minimum-path-dp-8",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #8",
    "order": 78,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 1 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 678; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "687",
        "explanation": "The minimum grid-DP cost is 9; adding setup fee 678 gives 687."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "686",
        "explanation": "The minimum grid-DP cost is 8; adding setup fee 678 gives 686."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "685",
        "explanation": "The minimum grid-DP cost is 7; adding setup fee 678 gives 685."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "687"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "686"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "685"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-9",
    "slug": "grid-minimum-path-dp-9",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #9",
    "order": 79,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 2 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 679; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "690",
        "explanation": "The minimum grid-DP cost is 11; adding setup fee 679 gives 690."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "689",
        "explanation": "The minimum grid-DP cost is 10; adding setup fee 679 gives 689."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "688",
        "explanation": "The minimum grid-DP cost is 9; adding setup fee 679 gives 688."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "690"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "689"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "688"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-10",
    "slug": "grid-minimum-path-dp-10",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #10",
    "order": 80,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 3 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 680; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "693",
        "explanation": "The minimum grid-DP cost is 13; adding setup fee 680 gives 693."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "692",
        "explanation": "The minimum grid-DP cost is 12; adding setup fee 680 gives 692."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "691",
        "explanation": "The minimum grid-DP cost is 11; adding setup fee 680 gives 691."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "693"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "692"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "691"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-11",
    "slug": "grid-minimum-path-dp-11",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #11",
    "order": 81,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 4 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 681; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "696",
        "explanation": "The minimum grid-DP cost is 15; adding setup fee 681 gives 696."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "695",
        "explanation": "The minimum grid-DP cost is 14; adding setup fee 681 gives 695."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "694",
        "explanation": "The minimum grid-DP cost is 13; adding setup fee 681 gives 694."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "696"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "695"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "694"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-12",
    "slug": "grid-minimum-path-dp-12",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #12",
    "order": 82,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 5 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 682; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "699",
        "explanation": "The minimum grid-DP cost is 17; adding setup fee 682 gives 699."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "698",
        "explanation": "The minimum grid-DP cost is 16; adding setup fee 682 gives 698."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "697",
        "explanation": "The minimum grid-DP cost is 15; adding setup fee 682 gives 697."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "699"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "698"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "697"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-13",
    "slug": "grid-minimum-path-dp-13",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #13",
    "order": 83,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 6 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 683; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "702",
        "explanation": "The minimum grid-DP cost is 19; adding setup fee 683 gives 702."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "701",
        "explanation": "The minimum grid-DP cost is 18; adding setup fee 683 gives 701."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "700",
        "explanation": "The minimum grid-DP cost is 17; adding setup fee 683 gives 700."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "702"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "701"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "700"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-14",
    "slug": "grid-minimum-path-dp-14",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #14",
    "order": 84,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 0 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 684; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "691",
        "explanation": "The minimum grid-DP cost is 7; adding setup fee 684 gives 691."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "690",
        "explanation": "The minimum grid-DP cost is 6; adding setup fee 684 gives 690."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "689",
        "explanation": "The minimum grid-DP cost is 5; adding setup fee 684 gives 689."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "691"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "690"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "689"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-15",
    "slug": "grid-minimum-path-dp-15",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #15",
    "order": 85,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 1 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 685; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "694",
        "explanation": "The minimum grid-DP cost is 9; adding setup fee 685 gives 694."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "693",
        "explanation": "The minimum grid-DP cost is 8; adding setup fee 685 gives 693."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "692",
        "explanation": "The minimum grid-DP cost is 7; adding setup fee 685 gives 692."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "694"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "693"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "692"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-16",
    "slug": "grid-minimum-path-dp-16",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #16",
    "order": 86,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 2 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 686; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "697",
        "explanation": "The minimum grid-DP cost is 11; adding setup fee 686 gives 697."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "696",
        "explanation": "The minimum grid-DP cost is 10; adding setup fee 686 gives 696."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "695",
        "explanation": "The minimum grid-DP cost is 9; adding setup fee 686 gives 695."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "697"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "696"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "695"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-17",
    "slug": "grid-minimum-path-dp-17",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #17",
    "order": 87,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 3 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 687; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "700",
        "explanation": "The minimum grid-DP cost is 13; adding setup fee 687 gives 700."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "699",
        "explanation": "The minimum grid-DP cost is 12; adding setup fee 687 gives 699."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "698",
        "explanation": "The minimum grid-DP cost is 11; adding setup fee 687 gives 698."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "700"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "699"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "698"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-18",
    "slug": "grid-minimum-path-dp-18",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #18",
    "order": 88,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 4 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 688; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "703",
        "explanation": "The minimum grid-DP cost is 15; adding setup fee 688 gives 703."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "702",
        "explanation": "The minimum grid-DP cost is 14; adding setup fee 688 gives 702."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "701",
        "explanation": "The minimum grid-DP cost is 13; adding setup fee 688 gives 701."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "703"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "702"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "701"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-19",
    "slug": "grid-minimum-path-dp-19",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #19",
    "order": 89,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 5 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 689; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "706",
        "explanation": "The minimum grid-DP cost is 17; adding setup fee 689 gives 706."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "705",
        "explanation": "The minimum grid-DP cost is 16; adding setup fee 689 gives 705."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "704",
        "explanation": "The minimum grid-DP cost is 15; adding setup fee 689 gives 704."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "706"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "705"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "704"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-20",
    "slug": "grid-minimum-path-dp-20",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #20",
    "order": 90,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 6 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 690; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "709",
        "explanation": "The minimum grid-DP cost is 19; adding setup fee 690 gives 709."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "708",
        "explanation": "The minimum grid-DP cost is 18; adding setup fee 690 gives 708."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "707",
        "explanation": "The minimum grid-DP cost is 17; adding setup fee 690 gives 707."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "709"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "708"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "707"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-21",
    "slug": "grid-minimum-path-dp-21",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #21",
    "order": 91,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 0 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 691; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "698",
        "explanation": "The minimum grid-DP cost is 7; adding setup fee 691 gives 698."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "697",
        "explanation": "The minimum grid-DP cost is 6; adding setup fee 691 gives 697."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "696",
        "explanation": "The minimum grid-DP cost is 5; adding setup fee 691 gives 696."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "698"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "697"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "696"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-22",
    "slug": "grid-minimum-path-dp-22",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #22",
    "order": 92,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 1 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 692; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "701",
        "explanation": "The minimum grid-DP cost is 9; adding setup fee 692 gives 701."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "700",
        "explanation": "The minimum grid-DP cost is 8; adding setup fee 692 gives 700."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "699",
        "explanation": "The minimum grid-DP cost is 7; adding setup fee 692 gives 699."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "701"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "700"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "699"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-23",
    "slug": "grid-minimum-path-dp-23",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #23",
    "order": 93,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 2 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 693; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "704",
        "explanation": "The minimum grid-DP cost is 11; adding setup fee 693 gives 704."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "703",
        "explanation": "The minimum grid-DP cost is 10; adding setup fee 693 gives 703."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "702",
        "explanation": "The minimum grid-DP cost is 9; adding setup fee 693 gives 702."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "704"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "703"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "702"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-24",
    "slug": "grid-minimum-path-dp-24",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #24",
    "order": 94,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 3 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 694; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "707",
        "explanation": "The minimum grid-DP cost is 13; adding setup fee 694 gives 707."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "706",
        "explanation": "The minimum grid-DP cost is 12; adding setup fee 694 gives 706."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "705",
        "explanation": "The minimum grid-DP cost is 11; adding setup fee 694 gives 705."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "707"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "706"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "705"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-25",
    "slug": "grid-minimum-path-dp-25",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #25",
    "order": 95,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 4 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 695; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "710",
        "explanation": "The minimum grid-DP cost is 15; adding setup fee 695 gives 710."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "709",
        "explanation": "The minimum grid-DP cost is 14; adding setup fee 695 gives 709."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "708",
        "explanation": "The minimum grid-DP cost is 13; adding setup fee 695 gives 708."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "710"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "709"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "708"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-26",
    "slug": "grid-minimum-path-dp-26",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #26",
    "order": 96,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 5 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 696; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "713",
        "explanation": "The minimum grid-DP cost is 17; adding setup fee 696 gives 713."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "712",
        "explanation": "The minimum grid-DP cost is 16; adding setup fee 696 gives 712."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "711",
        "explanation": "The minimum grid-DP cost is 15; adding setup fee 696 gives 711."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "713"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "712"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "711"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-27",
    "slug": "grid-minimum-path-dp-27",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #27",
    "order": 97,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 6 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 697; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "716",
        "explanation": "The minimum grid-DP cost is 19; adding setup fee 697 gives 716."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "715",
        "explanation": "The minimum grid-DP cost is 18; adding setup fee 697 gives 715."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "714",
        "explanation": "The minimum grid-DP cost is 17; adding setup fee 697 gives 714."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "716"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "715"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "714"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-28",
    "slug": "grid-minimum-path-dp-28",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #28",
    "order": 98,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 0 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 698; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "705",
        "explanation": "The minimum grid-DP cost is 7; adding setup fee 698 gives 705."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "704",
        "explanation": "The minimum grid-DP cost is 6; adding setup fee 698 gives 704."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "703",
        "explanation": "The minimum grid-DP cost is 5; adding setup fee 698 gives 703."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "705"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "704"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "703"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-29",
    "slug": "grid-minimum-path-dp-29",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #29",
    "order": 99,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 1 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 699; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "708",
        "explanation": "The minimum grid-DP cost is 9; adding setup fee 699 gives 708."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "707",
        "explanation": "The minimum grid-DP cost is 8; adding setup fee 699 gives 707."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "706",
        "explanation": "The minimum grid-DP cost is 7; adding setup fee 699 gives 706."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "708"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "707"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "706"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:dynamic-programming:grid-minimum-path-dp-30",
    "slug": "grid-minimum-path-dp-30",
    "topicId": "dynamic-programming",
    "topicSlug": "dynamic-programming",
    "topicTitle": "Dynamic Programming",
    "title": "Grid Minimum Path DP #30",
    "order": 100,
    "difficulty": "Easy",
    "problemStatement": "Move only right or down. Entering a cell costs its value plus 2 when row+column is even. Find the minimum top-left to bottom-right cost. Before any move, pay a one-time setup fee of 700; include this fee in the minimum total.",
    "inputFormat": "First line contains `r c`; next r lines contain c non-negative integers.",
    "outputFormat": "Print the minimum including the setup fee path cost.",
    "constraints": "1 <= r,c <= 100; cell values <= 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "711",
        "explanation": "The minimum grid-DP cost is 11; adding setup fee 700 gives 711."
      },
      {
        "input": "2 3\n2 1 3\n4 2 1",
        "output": "710",
        "explanation": "The minimum grid-DP cost is 10; adding setup fee 700 gives 710."
      },
      {
        "input": "3 2\n0 5\n2 1\n3 2",
        "output": "709",
        "explanation": "The minimum grid-DP cost is 9; adding setup fee 700 gives 709."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "711"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 1 3\n4 2 1",
        "expectedOutput": "710"
      },
      {
        "testIndex": 3,
        "input": "3 2\n0 5\n2 1\n3 2",
        "expectedOutput": "709"
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
