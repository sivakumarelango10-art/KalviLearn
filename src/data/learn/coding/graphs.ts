import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:graphs:graph-count-degree-zero-1",
    "slug": "graph-count-degree-zero-1",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Degree Zero #1",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree zero** and compute **count** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-label-sum-degree-zero-2",
    "slug": "graph-label-sum-degree-zero-2",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Degree Zero #2",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree zero** and compute **label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-degree-sum-degree-zero-3",
    "slug": "graph-degree-sum-degree-zero-3",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Degree Zero #3",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree zero** and compute **degree sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-max-label-degree-zero-4",
    "slug": "graph-max-label-degree-zero-4",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Degree Zero #4",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree zero** and compute **max label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "-1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is -1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "-1",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is -1."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "-1",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-min-label-degree-zero-5",
    "slug": "graph-min-label-degree-zero-5",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Degree Zero #5",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree zero** and compute **min label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "-1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is -1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "-1",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is -1."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "-1",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-square-label-sum-degree-zero-6",
    "slug": "graph-square-label-sum-degree-zero-6",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Degree Zero #6",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree zero** and compute **square label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-degree-zero-7",
    "slug": "graph-degree-square-sum-degree-zero-7",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Degree Zero #7",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree zero** and compute **degree square sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-label-degree-product-sum-degree-zero-8",
    "slug": "graph-label-degree-product-sum-degree-zero-8",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Degree Zero #8",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree zero** and compute **label-degree product sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-parity-score-degree-zero-9",
    "slug": "graph-parity-score-degree-zero-9",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Degree Zero #9",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree zero** and compute **parity score** over the selected vertices. The parity score is (number of selected vertices with an even label) minus (number of selected vertices with an odd label).",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-weighted-count-degree-zero-10",
    "slug": "graph-weighted-count-degree-zero-10",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Degree Zero #10",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree zero** and compute **weighted count** over the selected vertices. The weighted count is the sum of (degree + 1) over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-count-degree-one-11",
    "slug": "graph-count-degree-one-11",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Degree One #11",
    "order": 11,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree one** and compute **count** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-sum-degree-one-12",
    "slug": "graph-label-sum-degree-one-12",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Degree One #12",
    "order": 12,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree one** and compute **label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "9",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 9."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "13",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 13."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-sum-degree-one-13",
    "slug": "graph-degree-sum-degree-one-13",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Degree One #13",
    "order": 13,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree one** and compute **degree sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-max-label-degree-one-14",
    "slug": "graph-max-label-degree-one-14",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Degree One #14",
    "order": 14,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree one** and compute **max label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "5",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-min-label-degree-one-15",
    "slug": "graph-min-label-degree-one-15",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Degree One #15",
    "order": 15,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree one** and compute **min label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "1",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-square-label-sum-degree-one-16",
    "slug": "graph-square-label-sum-degree-one-16",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Degree One #16",
    "order": 16,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree one** and compute **square label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "29",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 29."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "9",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 9."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "51",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 51."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "29"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "51"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-degree-one-17",
    "slug": "graph-degree-square-sum-degree-one-17",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Degree One #17",
    "order": 17,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree one** and compute **degree square sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-degree-product-sum-degree-one-18",
    "slug": "graph-label-degree-product-sum-degree-one-18",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Degree One #18",
    "order": 18,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree one** and compute **label-degree product sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "9",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 9."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "13",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 13."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-parity-score-degree-one-19",
    "slug": "graph-parity-score-degree-one-19",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Degree One #19",
    "order": 19,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree one** and compute **parity score** over the selected vertices. The parity score is (number of selected vertices with an even label) minus (number of selected vertices with an odd label).",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "2",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 2."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "-2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-weighted-count-degree-one-20",
    "slug": "graph-weighted-count-degree-one-20",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Degree One #20",
    "order": 20,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree one** and compute **weighted count** over the selected vertices. The weighted count is the sum of (degree + 1) over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "8",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 8."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "4",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 4."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "8",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-count-degree-two-21",
    "slug": "graph-count-degree-two-21",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Degree Two #21",
    "order": 21,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree two** and compute **count** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-sum-degree-two-22",
    "slug": "graph-label-sum-degree-two-22",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Degree Two #22",
    "order": 22,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree two** and compute **label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-sum-degree-two-23",
    "slug": "graph-degree-sum-degree-two-23",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Degree Two #23",
    "order": 23,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree two** and compute **degree sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "2",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 2."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "4",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 4."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-max-label-degree-two-24",
    "slug": "graph-max-label-degree-two-24",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Degree Two #24",
    "order": 24,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree two** and compute **max label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-min-label-degree-two-25",
    "slug": "graph-min-label-degree-two-25",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Degree Two #25",
    "order": 25,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree two** and compute **min label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "1",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 1."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-square-label-sum-degree-two-26",
    "slug": "graph-square-label-sum-degree-two-26",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Degree Two #26",
    "order": 26,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree two** and compute **square label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "5",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 5."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-square-sum-degree-two-27",
    "slug": "graph-degree-square-sum-degree-two-27",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Degree Two #27",
    "order": 27,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree two** and compute **degree square sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "8",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 8."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "8",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-degree-product-sum-degree-two-28",
    "slug": "graph-label-degree-product-sum-degree-two-28",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Degree Two #28",
    "order": 28,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree two** and compute **label-degree product sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "2",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 2."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "6",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 6."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-parity-score-degree-two-29",
    "slug": "graph-parity-score-degree-two-29",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Degree Two #29",
    "order": 29,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree two** and compute **parity score** over the selected vertices. The parity score is (number of selected vertices with an even label) minus (number of selected vertices with an odd label).",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "-1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is -1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-weighted-count-degree-two-30",
    "slug": "graph-weighted-count-degree-two-30",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Degree Two #30",
    "order": 30,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree two** and compute **weighted count** over the selected vertices. The weighted count is the sum of (degree + 1) over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "3",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 3."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "6",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 6."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "6",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-count-degree-at-least-two-31",
    "slug": "graph-count-degree-at-least-two-31",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Degree At Least Two #31",
    "order": 31,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at least two** and compute **count** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-sum-degree-at-least-two-32",
    "slug": "graph-label-sum-degree-at-least-two-32",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Degree At Least Two #32",
    "order": 32,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at least two** and compute **label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-sum-degree-at-least-two-33",
    "slug": "graph-degree-sum-degree-at-least-two-33",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Degree At Least Two #33",
    "order": 33,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at least two** and compute **degree sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "2",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 2."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "4",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 4."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-max-label-degree-at-least-two-34",
    "slug": "graph-max-label-degree-at-least-two-34",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Degree At Least Two #34",
    "order": 34,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at least two** and compute **max label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-min-label-degree-at-least-two-35",
    "slug": "graph-min-label-degree-at-least-two-35",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Degree At Least Two #35",
    "order": 35,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at least two** and compute **min label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "1",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 1."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-square-label-sum-degree-at-least-two-36",
    "slug": "graph-square-label-sum-degree-at-least-two-36",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Degree At Least Two #36",
    "order": 36,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at least two** and compute **square label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "5",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 5."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-square-sum-degree-at-least-two-37",
    "slug": "graph-degree-square-sum-degree-at-least-two-37",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Degree At Least Two #37",
    "order": 37,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at least two** and compute **degree square sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "8",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 8."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "8",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-degree-product-sum-degree-at-least-two-38",
    "slug": "graph-label-degree-product-sum-degree-at-least-two-38",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Degree At Least Two #38",
    "order": 38,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at least two** and compute **label-degree product sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "2",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 2."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "6",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 6."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-parity-score-degree-at-least-two-39",
    "slug": "graph-parity-score-degree-at-least-two-39",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Degree At Least Two #39",
    "order": 39,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at least two** and compute **parity score** over the selected vertices. The parity score is (number of selected vertices with an even label) minus (number of selected vertices with an odd label).",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "-1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is -1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-weighted-count-degree-at-least-two-40",
    "slug": "graph-weighted-count-degree-at-least-two-40",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Degree At Least Two #40",
    "order": 40,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at least two** and compute **weighted count** over the selected vertices. The weighted count is the sum of (degree + 1) over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "3",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 3."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "6",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 6."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "6",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-count-even-degree-41",
    "slug": "graph-count-even-degree-41",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Even Degree #41",
    "order": 41,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **even degree** and compute **count** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-sum-even-degree-42",
    "slug": "graph-label-sum-even-degree-42",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Even Degree #42",
    "order": 42,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **even degree** and compute **label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-sum-even-degree-43",
    "slug": "graph-degree-sum-even-degree-43",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Even Degree #43",
    "order": 43,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **even degree** and compute **degree sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "2",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 2."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "4",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 4."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-max-label-even-degree-44",
    "slug": "graph-max-label-even-degree-44",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Even Degree #44",
    "order": 44,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **even degree** and compute **max label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-min-label-even-degree-45",
    "slug": "graph-min-label-even-degree-45",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Even Degree #45",
    "order": 45,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **even degree** and compute **min label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "1",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 1."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-square-label-sum-even-degree-46",
    "slug": "graph-square-label-sum-even-degree-46",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Even Degree #46",
    "order": 46,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **even degree** and compute **square label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "5",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 5."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-square-sum-even-degree-47",
    "slug": "graph-degree-square-sum-even-degree-47",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Even Degree #47",
    "order": 47,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **even degree** and compute **degree square sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "8",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 8."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "8",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-degree-product-sum-even-degree-48",
    "slug": "graph-label-degree-product-sum-even-degree-48",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Even Degree #48",
    "order": 48,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **even degree** and compute **label-degree product sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "2",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 2."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "6",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 6."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-parity-score-even-degree-49",
    "slug": "graph-parity-score-even-degree-49",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Even Degree #49",
    "order": 49,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **even degree** and compute **parity score** over the selected vertices. The parity score is (number of selected vertices with an even label) minus (number of selected vertices with an odd label).",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "-1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is -1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-weighted-count-even-degree-50",
    "slug": "graph-weighted-count-even-degree-50",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Even Degree #50",
    "order": 50,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **even degree** and compute **weighted count** over the selected vertices. The weighted count is the sum of (degree + 1) over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "3",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 3."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "6",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 6."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "6",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-count-odd-degree-51",
    "slug": "graph-count-odd-degree-51",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Odd Degree #51",
    "order": 51,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **odd degree** and compute **count** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-sum-odd-degree-52",
    "slug": "graph-label-sum-odd-degree-52",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Odd Degree #52",
    "order": 52,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **odd degree** and compute **label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "9",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 9."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "13",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 13."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-sum-odd-degree-53",
    "slug": "graph-degree-sum-odd-degree-53",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Odd Degree #53",
    "order": 53,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **odd degree** and compute **degree sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-max-label-odd-degree-54",
    "slug": "graph-max-label-odd-degree-54",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Odd Degree #54",
    "order": 54,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **odd degree** and compute **max label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "5",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-min-label-odd-degree-55",
    "slug": "graph-min-label-odd-degree-55",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Odd Degree #55",
    "order": 55,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **odd degree** and compute **min label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "1",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-square-label-sum-odd-degree-56",
    "slug": "graph-square-label-sum-odd-degree-56",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Odd Degree #56",
    "order": 56,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **odd degree** and compute **square label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "29",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 29."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "9",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 9."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "51",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 51."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "29"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "51"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-odd-degree-57",
    "slug": "graph-degree-square-sum-odd-degree-57",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Odd Degree #57",
    "order": 57,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **odd degree** and compute **degree square sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-degree-product-sum-odd-degree-58",
    "slug": "graph-label-degree-product-sum-odd-degree-58",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Odd Degree #58",
    "order": 58,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **odd degree** and compute **label-degree product sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "9",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 9."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "13",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 13."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-parity-score-odd-degree-59",
    "slug": "graph-parity-score-odd-degree-59",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Odd Degree #59",
    "order": 59,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **odd degree** and compute **parity score** over the selected vertices. The parity score is (number of selected vertices with an even label) minus (number of selected vertices with an odd label).",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "2",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 2."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "-2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-weighted-count-odd-degree-60",
    "slug": "graph-weighted-count-odd-degree-60",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Odd Degree #60",
    "order": 60,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **odd degree** and compute **weighted count** over the selected vertices. The weighted count is the sum of (degree + 1) over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "8",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 3, 4]; the requested aggregate is 8."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "4",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 4."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "8",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 4, 5]; the requested aggregate is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-count-degree-at-most-two-61",
    "slug": "graph-count-degree-at-most-two-61",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Degree At Most Two #61",
    "order": 61,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at most two** and compute **count** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "5",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 5."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "4",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 4."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "6",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-sum-degree-at-most-two-62",
    "slug": "graph-label-sum-degree-at-most-two-62",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Degree At Most Two #62",
    "order": 62,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at most two** and compute **label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "10",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 10."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "6",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 6."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "15",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 15."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-sum-degree-at-most-two-63",
    "slug": "graph-degree-sum-degree-at-most-two-63",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Degree At Most Two #63",
    "order": 63,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at most two** and compute **degree sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "6",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 6."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "6",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 6."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "8",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-max-label-degree-at-most-two-64",
    "slug": "graph-max-label-degree-at-most-two-64",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Degree At Most Two #64",
    "order": 64,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at most two** and compute **max label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "5",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-min-label-degree-at-most-two-65",
    "slug": "graph-min-label-degree-at-most-two-65",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Degree At Most Two #65",
    "order": 65,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at most two** and compute **min label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-square-label-sum-degree-at-most-two-66",
    "slug": "graph-square-label-sum-degree-at-most-two-66",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Degree At Most Two #66",
    "order": 66,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at most two** and compute **square label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "30",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 30."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "14",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 14."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "55",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 55."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "30"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "14"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "55"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-degree-at-most-two-67",
    "slug": "graph-degree-square-sum-degree-at-most-two-67",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Degree At Most Two #67",
    "order": 67,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at most two** and compute **degree square sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "8",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 8."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "10",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 10."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "12",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-degree-product-sum-degree-at-most-two-68",
    "slug": "graph-label-degree-product-sum-degree-at-most-two-68",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Degree At Most Two #68",
    "order": 68,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at most two** and compute **label-degree product sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "11",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 11."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "9",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 9."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "17",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 17."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "11"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-parity-score-degree-at-most-two-69",
    "slug": "graph-parity-score-degree-at-most-two-69",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Degree At Most Two #69",
    "order": 69,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at most two** and compute **parity score** over the selected vertices. The parity score is (number of selected vertices with an even label) minus (number of selected vertices with an odd label).",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-weighted-count-degree-at-most-two-70",
    "slug": "graph-weighted-count-degree-at-most-two-70",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Degree At Most Two #70",
    "order": 70,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree at most two** and compute **weighted count** over the selected vertices. The weighted count is the sum of (degree + 1) over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "11",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 11."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "10",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 10."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "14",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 14."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "11"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-count-degree-divisible-by-three-71",
    "slug": "graph-count-degree-divisible-by-three-71",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Degree Divisible By Three #71",
    "order": 71,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree divisible by three** and compute **count** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-label-sum-degree-divisible-by-three-72",
    "slug": "graph-label-sum-degree-divisible-by-three-72",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Degree Divisible By Three #72",
    "order": 72,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree divisible by three** and compute **label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-degree-sum-degree-divisible-by-three-73",
    "slug": "graph-degree-sum-degree-divisible-by-three-73",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Degree Divisible By Three #73",
    "order": 73,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree divisible by three** and compute **degree sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-max-label-degree-divisible-by-three-74",
    "slug": "graph-max-label-degree-divisible-by-three-74",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Degree Divisible By Three #74",
    "order": 74,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree divisible by three** and compute **max label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "-1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is -1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "-1",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is -1."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "-1",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-min-label-degree-divisible-by-three-75",
    "slug": "graph-min-label-degree-divisible-by-three-75",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Degree Divisible By Three #75",
    "order": 75,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree divisible by three** and compute **min label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "-1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is -1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "-1",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is -1."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "-1",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is -1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-square-label-sum-degree-divisible-by-three-76",
    "slug": "graph-square-label-sum-degree-divisible-by-three-76",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Degree Divisible By Three #76",
    "order": 76,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree divisible by three** and compute **square label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-degree-divisible-by-three-77",
    "slug": "graph-degree-square-sum-degree-divisible-by-three-77",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Degree Divisible By Three #77",
    "order": 77,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree divisible by three** and compute **degree square sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-label-degree-product-sum-degree-divisible-by-three-78",
    "slug": "graph-label-degree-product-sum-degree-divisible-by-three-78",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Degree Divisible By Three #78",
    "order": 78,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree divisible by three** and compute **label-degree product sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-parity-score-degree-divisible-by-three-79",
    "slug": "graph-parity-score-degree-divisible-by-three-79",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Degree Divisible By Three #79",
    "order": 79,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree divisible by three** and compute **parity score** over the selected vertices. The parity score is (number of selected vertices with an even label) minus (number of selected vertices with an odd label).",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-weighted-count-degree-divisible-by-three-80",
    "slug": "graph-weighted-count-degree-divisible-by-three-80",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Degree Divisible By Three #80",
    "order": 80,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree divisible by three** and compute **weighted count** over the selected vertices. The weighted count is the sum of (degree + 1) over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are []; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are []; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-count-non-zero-degree-81",
    "slug": "graph-count-non-zero-degree-81",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Non-Zero Degree #81",
    "order": 81,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **non-zero degree** and compute **count** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "5",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 5."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "4",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 4."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "6",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-sum-non-zero-degree-82",
    "slug": "graph-label-sum-non-zero-degree-82",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Non-Zero Degree #82",
    "order": 82,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **non-zero degree** and compute **label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "10",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 10."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "6",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 6."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "15",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 15."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-sum-non-zero-degree-83",
    "slug": "graph-degree-sum-non-zero-degree-83",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Non-Zero Degree #83",
    "order": 83,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **non-zero degree** and compute **degree sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "6",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 6."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "6",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 6."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "8",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-max-label-non-zero-degree-84",
    "slug": "graph-max-label-non-zero-degree-84",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Non-Zero Degree #84",
    "order": 84,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **non-zero degree** and compute **max label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "5",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-min-label-non-zero-degree-85",
    "slug": "graph-min-label-non-zero-degree-85",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Non-Zero Degree #85",
    "order": 85,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **non-zero degree** and compute **min label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-square-label-sum-non-zero-degree-86",
    "slug": "graph-square-label-sum-non-zero-degree-86",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Non-Zero Degree #86",
    "order": 86,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **non-zero degree** and compute **square label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "30",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 30."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "14",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 14."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "55",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 55."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "30"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "14"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "55"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-non-zero-degree-87",
    "slug": "graph-degree-square-sum-non-zero-degree-87",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Non-Zero Degree #87",
    "order": 87,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **non-zero degree** and compute **degree square sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "8",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 8."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "10",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 10."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "12",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 12."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-degree-product-sum-non-zero-degree-88",
    "slug": "graph-label-degree-product-sum-non-zero-degree-88",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Non-Zero Degree #88",
    "order": 88,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **non-zero degree** and compute **label-degree product sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "11",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 11."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "9",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 9."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "17",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 17."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "11"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-parity-score-non-zero-degree-89",
    "slug": "graph-parity-score-non-zero-degree-89",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Non-Zero Degree #89",
    "order": 89,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **non-zero degree** and compute **parity score** over the selected vertices. The parity score is (number of selected vertices with an even label) minus (number of selected vertices with an odd label).",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-weighted-count-non-zero-degree-90",
    "slug": "graph-weighted-count-non-zero-degree-90",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Non-Zero Degree #90",
    "order": 90,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **non-zero degree** and compute **weighted count** over the selected vertices. The weighted count is the sum of (degree + 1) over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "11",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4]; the requested aggregate is 11."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "10",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 1, 2, 3]; the requested aggregate is 10."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "14",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 1, 2, 3, 4, 5]; the requested aggregate is 14."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "11"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-count-degree-not-one-91",
    "slug": "graph-count-degree-not-one-91",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Degree Not One #91",
    "order": 91,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree not one** and compute **count** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-sum-degree-not-one-92",
    "slug": "graph-label-sum-degree-not-one-92",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Degree Not One #92",
    "order": 92,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree not one** and compute **label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-sum-degree-not-one-93",
    "slug": "graph-degree-sum-degree-not-one-93",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Degree Not One #93",
    "order": 93,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree not one** and compute **degree sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "2",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 2."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "4",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 4."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-max-label-degree-not-one-94",
    "slug": "graph-max-label-degree-not-one-94",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Degree Not One #94",
    "order": 94,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree not one** and compute **max label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-min-label-degree-not-one-95",
    "slug": "graph-min-label-degree-not-one-95",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Degree Not One #95",
    "order": 95,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree not one** and compute **min label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "1",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 1."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-square-label-sum-degree-not-one-96",
    "slug": "graph-square-label-sum-degree-not-one-96",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Degree Not One #96",
    "order": 96,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree not one** and compute **square label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "5",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 5."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-square-sum-degree-not-one-97",
    "slug": "graph-degree-square-sum-degree-not-one-97",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Degree Not One #97",
    "order": 97,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree not one** and compute **degree square sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "8",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 8."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "8",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "8"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-degree-product-sum-degree-not-one-98",
    "slug": "graph-label-degree-product-sum-degree-not-one-98",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Degree Not One #98",
    "order": 98,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree not one** and compute **label-degree product sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "2",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 2."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "6",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 6."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-parity-score-degree-not-one-99",
    "slug": "graph-parity-score-degree-not-one-99",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Degree Not One #99",
    "order": 99,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree not one** and compute **parity score** over the selected vertices. The parity score is (number of selected vertices with an even label) minus (number of selected vertices with an odd label).",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "-1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is -1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-weighted-count-degree-not-one-100",
    "slug": "graph-weighted-count-degree-not-one-100",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Degree Not One #100",
    "order": 100,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **degree not one** and compute **weighted count** over the selected vertices. The weighted count is the sum of (degree + 1) over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "3",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1]; the requested aggregate is 3."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "6",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 2]; the requested aggregate is 6."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "6",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2]; the requested aggregate is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-count-label-even-101",
    "slug": "graph-count-label-even-101",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Label Even #101",
    "order": 101,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label even** and compute **count** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "3",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 3."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "3",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-sum-label-even-102",
    "slug": "graph-label-sum-label-even-102",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Label Even #102",
    "order": 102,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label even** and compute **label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "6",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 6."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "6",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-sum-label-even-103",
    "slug": "graph-degree-sum-label-even-103",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Label Even #103",
    "order": 103,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label even** and compute **degree sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "3",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 3."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 2]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "5",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-max-label-label-even-104",
    "slug": "graph-max-label-label-even-104",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Label Even #104",
    "order": 104,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label even** and compute **max label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "4",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-min-label-label-even-105",
    "slug": "graph-min-label-label-even-105",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Label Even #105",
    "order": 105,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label even** and compute **min label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 2]; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-square-label-sum-label-even-106",
    "slug": "graph-square-label-sum-label-even-106",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Label Even #106",
    "order": 106,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label even** and compute **square label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "20",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 20."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "4",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 2]; the requested aggregate is 4."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "20",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 20."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "20"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-square-sum-label-even-107",
    "slug": "graph-degree-square-sum-label-even-107",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Label Even #107",
    "order": 107,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label even** and compute **degree square sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "3",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 3."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "5",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 2]; the requested aggregate is 5."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "9",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-degree-product-sum-label-even-108",
    "slug": "graph-label-degree-product-sum-label-even-108",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Label Even #108",
    "order": 108,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label even** and compute **label-degree product sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "6",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 6."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "4",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 2]; the requested aggregate is 4."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "8",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-parity-score-label-even-109",
    "slug": "graph-parity-score-label-even-109",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Label Even #109",
    "order": 109,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label even** and compute **parity score** over the selected vertices. The parity score is (number of selected vertices with an even label) minus (number of selected vertices with an odd label).",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "3",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 3."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 2]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "3",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-weighted-count-label-even-110",
    "slug": "graph-weighted-count-label-even-110",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Label Even #110",
    "order": 110,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label even** and compute **weighted count** over the selected vertices. The weighted count is the sum of (degree + 1) over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "6",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 6."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "5",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 2]; the requested aggregate is 5."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "8",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 2, 4]; the requested aggregate is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-count-label-odd-111",
    "slug": "graph-count-label-odd-111",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Label Odd #111",
    "order": 111,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label odd** and compute **count** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "2",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1, 3]; the requested aggregate is 2."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 3]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "3",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 5]; the requested aggregate is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-sum-label-odd-112",
    "slug": "graph-label-sum-label-odd-112",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Label Odd #112",
    "order": 112,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label odd** and compute **label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1, 3]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "4",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 3]; the requested aggregate is 4."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "9",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 5]; the requested aggregate is 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-sum-label-odd-113",
    "slug": "graph-degree-sum-label-odd-113",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Label Odd #113",
    "order": 113,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label odd** and compute **degree sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "3",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1, 3]; the requested aggregate is 3."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 3]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "3",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 5]; the requested aggregate is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-max-label-label-odd-114",
    "slug": "graph-max-label-label-odd-114",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Label Odd #114",
    "order": 114,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label odd** and compute **max label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "3",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1, 3]; the requested aggregate is 3."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 3]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "5",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 5]; the requested aggregate is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-min-label-label-odd-115",
    "slug": "graph-min-label-label-odd-115",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Label Odd #115",
    "order": 115,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label odd** and compute **min label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "1",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1, 3]; the requested aggregate is 1."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "1",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 3]; the requested aggregate is 1."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "1",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 5]; the requested aggregate is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-square-label-sum-label-odd-116",
    "slug": "graph-square-label-sum-label-odd-116",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Label Odd #116",
    "order": 116,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label odd** and compute **square label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "10",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1, 3]; the requested aggregate is 10."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "10",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 3]; the requested aggregate is 10."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "35",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 5]; the requested aggregate is 35."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "10"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-square-sum-label-odd-117",
    "slug": "graph-degree-square-sum-label-odd-117",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Label Odd #117",
    "order": 117,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label odd** and compute **degree square sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "5",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1, 3]; the requested aggregate is 5."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "5",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 3]; the requested aggregate is 5."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "3",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 5]; the requested aggregate is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-degree-product-sum-label-odd-118",
    "slug": "graph-label-degree-product-sum-label-odd-118",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Label Odd #118",
    "order": 118,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label odd** and compute **label-degree product sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "5",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1, 3]; the requested aggregate is 5."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "5",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 3]; the requested aggregate is 5."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "9",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 5]; the requested aggregate is 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-parity-score-label-odd-119",
    "slug": "graph-parity-score-label-odd-119",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Label Odd #119",
    "order": 119,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label odd** and compute **parity score** over the selected vertices. The parity score is (number of selected vertices with an even label) minus (number of selected vertices with an odd label).",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "-2",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1, 3]; the requested aggregate is -2."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "-2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 3]; the requested aggregate is -2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "-3",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 5]; the requested aggregate is -3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "-2"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "-2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-weighted-count-label-odd-120",
    "slug": "graph-weighted-count-label-odd-120",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Label Odd #120",
    "order": 120,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label odd** and compute **weighted count** over the selected vertices. The weighted count is the sum of (degree + 1) over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "5",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [1, 3]; the requested aggregate is 5."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "5",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [1, 3]; the requested aggregate is 5."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "6",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [1, 3, 5]; the requested aggregate is 6."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-count-label-divisible-by-three-121",
    "slug": "graph-count-label-divisible-by-three-121",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Label Divisible By Three #121",
    "order": 121,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label divisible by three** and compute **count** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "2",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 2."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "2",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-sum-label-divisible-by-three-122",
    "slug": "graph-label-sum-label-divisible-by-three-122",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Label Divisible By Three #122",
    "order": 122,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label divisible by three** and compute **label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "3",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "3",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-sum-label-divisible-by-three-123",
    "slug": "graph-degree-sum-label-divisible-by-three-123",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Label Divisible By Three #123",
    "order": 123,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label divisible by three** and compute **degree sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "2",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 2."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "3",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-max-label-label-divisible-by-three-124",
    "slug": "graph-max-label-label-divisible-by-three-124",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Label Divisible By Three #124",
    "order": 124,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label divisible by three** and compute **max label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "3",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "3",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-min-label-label-divisible-by-three-125",
    "slug": "graph-min-label-label-divisible-by-three-125",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Label Divisible By Three #125",
    "order": 125,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label divisible by three** and compute **min label** over the selected vertices. If no vertex is selected, print -1.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-square-label-sum-label-divisible-by-three-126",
    "slug": "graph-square-label-sum-label-divisible-by-three-126",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Label Divisible By Three #126",
    "order": 126,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label divisible by three** and compute **square label sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "9",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 9."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "9",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 9."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "9",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 9."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "9"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-degree-square-sum-label-divisible-by-three-127",
    "slug": "graph-degree-square-sum-label-divisible-by-three-127",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Label Divisible By Three #127",
    "order": 127,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label divisible by three** and compute **degree square sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "2",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 2."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "2",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 2."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "5",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-label-degree-product-sum-label-divisible-by-three-128",
    "slug": "graph-label-degree-product-sum-label-divisible-by-three-128",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Label Divisible By Three #128",
    "order": 128,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label divisible by three** and compute **label-degree product sum** over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "3",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "3",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "3",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
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
    "id": "learn:graphs:graph-parity-score-label-divisible-by-three-129",
    "slug": "graph-parity-score-label-divisible-by-three-129",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Label Divisible By Three #129",
    "order": 129,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label divisible by three** and compute **parity score** over the selected vertices. The parity score is (number of selected vertices with an even label) minus (number of selected vertices with an odd label).",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "0",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 0."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "0",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 0."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "0",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:graphs:graph-weighted-count-label-divisible-by-three-130",
    "slug": "graph-weighted-count-label-divisible-by-three-130",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Label Divisible By Three #130",
    "order": 130,
    "difficulty": "Easy",
    "problemStatement": "In an undirected graph, select vertices satisfying **label divisible by three** and compute **weighted count** over the selected vertices. The weighted count is the sum of (degree + 1) over the selected vertices.",
    "inputFormat": "The first line contains `n m`; each of the next m lines contains an undirected edge `u v`.",
    "outputFormat": "Print one integer.",
    "constraints": "1 <= n <= 100000; 0 <= m <= 200000; vertices are 0..n-1.",
    "examples": [
      {
        "input": "5 3\n0 1\n1 2\n3 4",
        "output": "4",
        "explanation": "Degrees are [1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 4."
      },
      {
        "input": "4 3\n0 1\n1 2\n2 3",
        "output": "4",
        "explanation": "Degrees are [1, 2, 2, 1]; selected vertices are [0, 3]; the requested aggregate is 4."
      },
      {
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "output": "5",
        "explanation": "Degrees are [2, 1, 2, 1, 1, 1]; selected vertices are [0, 3]; the requested aggregate is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5 3\n0 1\n1 2\n3 4",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "4 3\n0 1\n1 2\n2 3",
        "expectedOutput": "4"
      },
      {
        "testIndex": 3,
        "input": "6 4\n0 1\n0 2\n2 3\n4 5",
        "expectedOutput": "5"
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
