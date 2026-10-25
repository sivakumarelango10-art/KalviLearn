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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-sum-degree-zero-2",
    "slug": "graph-label-sum-degree-zero-2",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Degree Zero #2",
    "order": 2,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-sum-degree-zero-3",
    "slug": "graph-degree-sum-degree-zero-3",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Degree Zero #3",
    "order": 3,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-max-label-degree-zero-4",
    "slug": "graph-max-label-degree-zero-4",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Degree Zero #4",
    "order": 4,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-min-label-degree-zero-5",
    "slug": "graph-min-label-degree-zero-5",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Degree Zero #5",
    "order": 5,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-square-label-sum-degree-zero-6",
    "slug": "graph-square-label-sum-degree-zero-6",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Degree Zero #6",
    "order": 6,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-degree-zero-7",
    "slug": "graph-degree-square-sum-degree-zero-7",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Degree Zero #7",
    "order": 7,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-degree-product-sum-degree-zero-8",
    "slug": "graph-label-degree-product-sum-degree-zero-8",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Degree Zero #8",
    "order": 8,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-parity-score-degree-zero-9",
    "slug": "graph-parity-score-degree-zero-9",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Degree Zero #9",
    "order": 9,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-weighted-count-degree-zero-10",
    "slug": "graph-weighted-count-degree-zero-10",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Degree Zero #10",
    "order": 10,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-count-degree-one-11",
    "slug": "graph-count-degree-one-11",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Degree One #11",
    "order": 11,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-sum-degree-one-12",
    "slug": "graph-label-sum-degree-one-12",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Degree One #12",
    "order": 12,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-sum-degree-one-13",
    "slug": "graph-degree-sum-degree-one-13",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Degree One #13",
    "order": 13,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-max-label-degree-one-14",
    "slug": "graph-max-label-degree-one-14",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Degree One #14",
    "order": 14,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-min-label-degree-one-15",
    "slug": "graph-min-label-degree-one-15",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Degree One #15",
    "order": 15,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-square-label-sum-degree-one-16",
    "slug": "graph-square-label-sum-degree-one-16",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Degree One #16",
    "order": 16,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-degree-one-17",
    "slug": "graph-degree-square-sum-degree-one-17",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Degree One #17",
    "order": 17,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-degree-product-sum-degree-one-18",
    "slug": "graph-label-degree-product-sum-degree-one-18",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Degree One #18",
    "order": 18,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-parity-score-degree-one-19",
    "slug": "graph-parity-score-degree-one-19",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Degree One #19",
    "order": 19,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-weighted-count-degree-one-20",
    "slug": "graph-weighted-count-degree-one-20",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Degree One #20",
    "order": 20,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-count-degree-two-21",
    "slug": "graph-count-degree-two-21",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Degree Two #21",
    "order": 21,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-sum-degree-two-22",
    "slug": "graph-label-sum-degree-two-22",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Degree Two #22",
    "order": 22,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-sum-degree-two-23",
    "slug": "graph-degree-sum-degree-two-23",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Degree Two #23",
    "order": 23,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-max-label-degree-two-24",
    "slug": "graph-max-label-degree-two-24",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Degree Two #24",
    "order": 24,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-min-label-degree-two-25",
    "slug": "graph-min-label-degree-two-25",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Degree Two #25",
    "order": 25,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-square-label-sum-degree-two-26",
    "slug": "graph-square-label-sum-degree-two-26",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Degree Two #26",
    "order": 26,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-degree-two-27",
    "slug": "graph-degree-square-sum-degree-two-27",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Degree Two #27",
    "order": 27,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-degree-product-sum-degree-two-28",
    "slug": "graph-label-degree-product-sum-degree-two-28",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Degree Two #28",
    "order": 28,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-parity-score-degree-two-29",
    "slug": "graph-parity-score-degree-two-29",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Degree Two #29",
    "order": 29,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-weighted-count-degree-two-30",
    "slug": "graph-weighted-count-degree-two-30",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Degree Two #30",
    "order": 30,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-count-degree-at-least-two-31",
    "slug": "graph-count-degree-at-least-two-31",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Degree At Least Two #31",
    "order": 31,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-sum-degree-at-least-two-32",
    "slug": "graph-label-sum-degree-at-least-two-32",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Degree At Least Two #32",
    "order": 32,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-sum-degree-at-least-two-33",
    "slug": "graph-degree-sum-degree-at-least-two-33",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Degree At Least Two #33",
    "order": 33,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-max-label-degree-at-least-two-34",
    "slug": "graph-max-label-degree-at-least-two-34",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Degree At Least Two #34",
    "order": 34,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-min-label-degree-at-least-two-35",
    "slug": "graph-min-label-degree-at-least-two-35",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Degree At Least Two #35",
    "order": 35,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-square-label-sum-degree-at-least-two-36",
    "slug": "graph-square-label-sum-degree-at-least-two-36",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Degree At Least Two #36",
    "order": 36,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-degree-at-least-two-37",
    "slug": "graph-degree-square-sum-degree-at-least-two-37",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Degree At Least Two #37",
    "order": 37,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-degree-product-sum-degree-at-least-two-38",
    "slug": "graph-label-degree-product-sum-degree-at-least-two-38",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Degree At Least Two #38",
    "order": 38,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-parity-score-degree-at-least-two-39",
    "slug": "graph-parity-score-degree-at-least-two-39",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Degree At Least Two #39",
    "order": 39,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-weighted-count-degree-at-least-two-40",
    "slug": "graph-weighted-count-degree-at-least-two-40",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Degree At Least Two #40",
    "order": 40,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-count-even-degree-41",
    "slug": "graph-count-even-degree-41",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Even Degree #41",
    "order": 41,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-sum-even-degree-42",
    "slug": "graph-label-sum-even-degree-42",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Even Degree #42",
    "order": 42,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-sum-even-degree-43",
    "slug": "graph-degree-sum-even-degree-43",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Even Degree #43",
    "order": 43,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-max-label-even-degree-44",
    "slug": "graph-max-label-even-degree-44",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Even Degree #44",
    "order": 44,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-min-label-even-degree-45",
    "slug": "graph-min-label-even-degree-45",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Even Degree #45",
    "order": 45,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-square-label-sum-even-degree-46",
    "slug": "graph-square-label-sum-even-degree-46",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Even Degree #46",
    "order": 46,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-even-degree-47",
    "slug": "graph-degree-square-sum-even-degree-47",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Even Degree #47",
    "order": 47,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-degree-product-sum-even-degree-48",
    "slug": "graph-label-degree-product-sum-even-degree-48",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Even Degree #48",
    "order": 48,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-parity-score-even-degree-49",
    "slug": "graph-parity-score-even-degree-49",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Even Degree #49",
    "order": 49,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-weighted-count-even-degree-50",
    "slug": "graph-weighted-count-even-degree-50",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Even Degree #50",
    "order": 50,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-count-odd-degree-51",
    "slug": "graph-count-odd-degree-51",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Odd Degree #51",
    "order": 51,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-sum-odd-degree-52",
    "slug": "graph-label-sum-odd-degree-52",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Odd Degree #52",
    "order": 52,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-sum-odd-degree-53",
    "slug": "graph-degree-sum-odd-degree-53",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Odd Degree #53",
    "order": 53,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-max-label-odd-degree-54",
    "slug": "graph-max-label-odd-degree-54",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Odd Degree #54",
    "order": 54,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-min-label-odd-degree-55",
    "slug": "graph-min-label-odd-degree-55",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Odd Degree #55",
    "order": 55,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-square-label-sum-odd-degree-56",
    "slug": "graph-square-label-sum-odd-degree-56",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Odd Degree #56",
    "order": 56,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-odd-degree-57",
    "slug": "graph-degree-square-sum-odd-degree-57",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Odd Degree #57",
    "order": 57,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-degree-product-sum-odd-degree-58",
    "slug": "graph-label-degree-product-sum-odd-degree-58",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Odd Degree #58",
    "order": 58,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-parity-score-odd-degree-59",
    "slug": "graph-parity-score-odd-degree-59",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Odd Degree #59",
    "order": 59,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-weighted-count-odd-degree-60",
    "slug": "graph-weighted-count-odd-degree-60",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Odd Degree #60",
    "order": 60,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-count-degree-at-most-two-61",
    "slug": "graph-count-degree-at-most-two-61",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Degree At Most Two #61",
    "order": 61,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-sum-degree-at-most-two-62",
    "slug": "graph-label-sum-degree-at-most-two-62",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Degree At Most Two #62",
    "order": 62,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-sum-degree-at-most-two-63",
    "slug": "graph-degree-sum-degree-at-most-two-63",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Degree At Most Two #63",
    "order": 63,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-max-label-degree-at-most-two-64",
    "slug": "graph-max-label-degree-at-most-two-64",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Degree At Most Two #64",
    "order": 64,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-min-label-degree-at-most-two-65",
    "slug": "graph-min-label-degree-at-most-two-65",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Degree At Most Two #65",
    "order": 65,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-square-label-sum-degree-at-most-two-66",
    "slug": "graph-square-label-sum-degree-at-most-two-66",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Degree At Most Two #66",
    "order": 66,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-degree-at-most-two-67",
    "slug": "graph-degree-square-sum-degree-at-most-two-67",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Degree At Most Two #67",
    "order": 67,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-degree-product-sum-degree-at-most-two-68",
    "slug": "graph-label-degree-product-sum-degree-at-most-two-68",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Degree At Most Two #68",
    "order": 68,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-parity-score-degree-at-most-two-69",
    "slug": "graph-parity-score-degree-at-most-two-69",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Degree At Most Two #69",
    "order": 69,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-weighted-count-degree-at-most-two-70",
    "slug": "graph-weighted-count-degree-at-most-two-70",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Degree At Most Two #70",
    "order": 70,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-count-degree-divisible-by-three-71",
    "slug": "graph-count-degree-divisible-by-three-71",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Degree Divisible By Three #71",
    "order": 71,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-sum-degree-divisible-by-three-72",
    "slug": "graph-label-sum-degree-divisible-by-three-72",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Degree Divisible By Three #72",
    "order": 72,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-sum-degree-divisible-by-three-73",
    "slug": "graph-degree-sum-degree-divisible-by-three-73",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Degree Divisible By Three #73",
    "order": 73,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-max-label-degree-divisible-by-three-74",
    "slug": "graph-max-label-degree-divisible-by-three-74",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Degree Divisible By Three #74",
    "order": 74,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-min-label-degree-divisible-by-three-75",
    "slug": "graph-min-label-degree-divisible-by-three-75",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Degree Divisible By Three #75",
    "order": 75,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-square-label-sum-degree-divisible-by-three-76",
    "slug": "graph-square-label-sum-degree-divisible-by-three-76",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Degree Divisible By Three #76",
    "order": 76,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-degree-divisible-by-three-77",
    "slug": "graph-degree-square-sum-degree-divisible-by-three-77",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Degree Divisible By Three #77",
    "order": 77,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-degree-product-sum-degree-divisible-by-three-78",
    "slug": "graph-label-degree-product-sum-degree-divisible-by-three-78",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Degree Divisible By Three #78",
    "order": 78,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-parity-score-degree-divisible-by-three-79",
    "slug": "graph-parity-score-degree-divisible-by-three-79",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Degree Divisible By Three #79",
    "order": 79,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-weighted-count-degree-divisible-by-three-80",
    "slug": "graph-weighted-count-degree-divisible-by-three-80",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Degree Divisible By Three #80",
    "order": 80,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-count-non-zero-degree-81",
    "slug": "graph-count-non-zero-degree-81",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Non-Zero Degree #81",
    "order": 81,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-sum-non-zero-degree-82",
    "slug": "graph-label-sum-non-zero-degree-82",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Non-Zero Degree #82",
    "order": 82,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-sum-non-zero-degree-83",
    "slug": "graph-degree-sum-non-zero-degree-83",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Non-Zero Degree #83",
    "order": 83,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-max-label-non-zero-degree-84",
    "slug": "graph-max-label-non-zero-degree-84",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Non-Zero Degree #84",
    "order": 84,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-min-label-non-zero-degree-85",
    "slug": "graph-min-label-non-zero-degree-85",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Non-Zero Degree #85",
    "order": 85,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-square-label-sum-non-zero-degree-86",
    "slug": "graph-square-label-sum-non-zero-degree-86",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Non-Zero Degree #86",
    "order": 86,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-non-zero-degree-87",
    "slug": "graph-degree-square-sum-non-zero-degree-87",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Non-Zero Degree #87",
    "order": 87,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-degree-product-sum-non-zero-degree-88",
    "slug": "graph-label-degree-product-sum-non-zero-degree-88",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Non-Zero Degree #88",
    "order": 88,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-parity-score-non-zero-degree-89",
    "slug": "graph-parity-score-non-zero-degree-89",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Non-Zero Degree #89",
    "order": 89,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-weighted-count-non-zero-degree-90",
    "slug": "graph-weighted-count-non-zero-degree-90",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Non-Zero Degree #90",
    "order": 90,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-count-degree-not-one-91",
    "slug": "graph-count-degree-not-one-91",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Degree Not One #91",
    "order": 91,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-sum-degree-not-one-92",
    "slug": "graph-label-sum-degree-not-one-92",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Degree Not One #92",
    "order": 92,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-sum-degree-not-one-93",
    "slug": "graph-degree-sum-degree-not-one-93",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Degree Not One #93",
    "order": 93,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-max-label-degree-not-one-94",
    "slug": "graph-max-label-degree-not-one-94",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Degree Not One #94",
    "order": 94,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-min-label-degree-not-one-95",
    "slug": "graph-min-label-degree-not-one-95",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Degree Not One #95",
    "order": 95,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-square-label-sum-degree-not-one-96",
    "slug": "graph-square-label-sum-degree-not-one-96",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Degree Not One #96",
    "order": 96,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-degree-not-one-97",
    "slug": "graph-degree-square-sum-degree-not-one-97",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Degree Not One #97",
    "order": 97,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-degree-product-sum-degree-not-one-98",
    "slug": "graph-label-degree-product-sum-degree-not-one-98",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Degree Not One #98",
    "order": 98,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-parity-score-degree-not-one-99",
    "slug": "graph-parity-score-degree-not-one-99",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Degree Not One #99",
    "order": 99,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-weighted-count-degree-not-one-100",
    "slug": "graph-weighted-count-degree-not-one-100",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Degree Not One #100",
    "order": 100,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-count-label-even-101",
    "slug": "graph-count-label-even-101",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Label Even #101",
    "order": 101,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-sum-label-even-102",
    "slug": "graph-label-sum-label-even-102",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Label Even #102",
    "order": 102,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-sum-label-even-103",
    "slug": "graph-degree-sum-label-even-103",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Label Even #103",
    "order": 103,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-max-label-label-even-104",
    "slug": "graph-max-label-label-even-104",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Label Even #104",
    "order": 104,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-min-label-label-even-105",
    "slug": "graph-min-label-label-even-105",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Label Even #105",
    "order": 105,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-square-label-sum-label-even-106",
    "slug": "graph-square-label-sum-label-even-106",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Label Even #106",
    "order": 106,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-label-even-107",
    "slug": "graph-degree-square-sum-label-even-107",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Label Even #107",
    "order": 107,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-degree-product-sum-label-even-108",
    "slug": "graph-label-degree-product-sum-label-even-108",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Label Even #108",
    "order": 108,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-parity-score-label-even-109",
    "slug": "graph-parity-score-label-even-109",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Label Even #109",
    "order": 109,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-weighted-count-label-even-110",
    "slug": "graph-weighted-count-label-even-110",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Label Even #110",
    "order": 110,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-count-label-odd-111",
    "slug": "graph-count-label-odd-111",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Label Odd #111",
    "order": 111,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-sum-label-odd-112",
    "slug": "graph-label-sum-label-odd-112",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Label Odd #112",
    "order": 112,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-sum-label-odd-113",
    "slug": "graph-degree-sum-label-odd-113",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Label Odd #113",
    "order": 113,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-max-label-label-odd-114",
    "slug": "graph-max-label-label-odd-114",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Label Odd #114",
    "order": 114,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-min-label-label-odd-115",
    "slug": "graph-min-label-label-odd-115",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Label Odd #115",
    "order": 115,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-square-label-sum-label-odd-116",
    "slug": "graph-square-label-sum-label-odd-116",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Label Odd #116",
    "order": 116,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-label-odd-117",
    "slug": "graph-degree-square-sum-label-odd-117",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Label Odd #117",
    "order": 117,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-degree-product-sum-label-odd-118",
    "slug": "graph-label-degree-product-sum-label-odd-118",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Label Odd #118",
    "order": 118,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-parity-score-label-odd-119",
    "slug": "graph-parity-score-label-odd-119",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Label Odd #119",
    "order": 119,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-weighted-count-label-odd-120",
    "slug": "graph-weighted-count-label-odd-120",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Label Odd #120",
    "order": 120,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-count-label-divisible-by-three-121",
    "slug": "graph-count-label-divisible-by-three-121",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Count — Label Divisible By Three #121",
    "order": 121,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-sum-label-divisible-by-three-122",
    "slug": "graph-label-sum-label-divisible-by-three-122",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label Sum — Label Divisible By Three #122",
    "order": 122,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-sum-label-divisible-by-three-123",
    "slug": "graph-degree-sum-label-divisible-by-three-123",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Sum — Label Divisible By Three #123",
    "order": 123,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-max-label-label-divisible-by-three-124",
    "slug": "graph-max-label-label-divisible-by-three-124",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Max Label — Label Divisible By Three #124",
    "order": 124,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-min-label-label-divisible-by-three-125",
    "slug": "graph-min-label-label-divisible-by-three-125",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Min Label — Label Divisible By Three #125",
    "order": 125,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-square-label-sum-label-divisible-by-three-126",
    "slug": "graph-square-label-sum-label-divisible-by-three-126",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Square Label Sum — Label Divisible By Three #126",
    "order": 126,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-degree-square-sum-label-divisible-by-three-127",
    "slug": "graph-degree-square-sum-label-divisible-by-three-127",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Degree Square Sum — Label Divisible By Three #127",
    "order": 127,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-label-degree-product-sum-label-divisible-by-three-128",
    "slug": "graph-label-degree-product-sum-label-divisible-by-three-128",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Label-Degree Product Sum — Label Divisible By Three #128",
    "order": 128,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-parity-score-label-divisible-by-three-129",
    "slug": "graph-parity-score-label-divisible-by-three-129",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Parity Score — Label Divisible By Three #129",
    "order": 129,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:graph-weighted-count-label-divisible-by-three-130",
    "slug": "graph-weighted-count-label-divisible-by-three-130",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Graph Weighted Count — Label Divisible By Three #130",
    "order": 130,
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
    },
    "isPythonOnly": false,
    "inputMode": "line"
  },
  {
    "id": "learn:graphs:degree-of-every-vertex",
    "bankId": "T19-Q01",
    "slug": "degree-of-every-vertex",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Degree of Every Vertex",
    "order": 131,
    "difficulty": "Easy",
    "problemStatement": "Return the degree array [deg(0),...,deg(n-1)].",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "[1,2,2,2,1]",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return the degree array [deg(0),...,deg(n-1)]. Therefore the expected JSON output is [1,2,2,2,1]."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "[]",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return the degree array [deg(0),...,deg(n-1)]. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "output": "[0]",
        "explanation": "Build adjacency lists [[]]; start=0, end=0. Return the degree array [deg(0),...,deg(n-1)]. Therefore the expected JSON output is [0]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "[1,2,2,2,1]"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "expectedOutput": "[0]"
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
    "id": "learn:graphs:neighbors-of-start",
    "bankId": "T19-Q02",
    "slug": "neighbors-of-start",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Neighbors of Start",
    "order": 132,
    "difficulty": "Easy",
    "problemStatement": "Return all neighbors of vertex start sorted ascending, or [] for empty graph.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "[1]",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return all neighbors of vertex start sorted ascending, or [] for empty graph. Therefore the expected JSON output is [1]."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "[]",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return all neighbors of vertex start sorted ascending, or [] for empty graph. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"n\":3,\"edges\":[[0,1],[1,2],[0,2]],\"start\":0,\"end\":2}",
        "output": "[1,2]",
        "explanation": "Build adjacency lists [[1,2],[0,2],[0,1]]; start=0, end=2. Return all neighbors of vertex start sorted ascending, or [] for empty graph. Therefore the expected JSON output is [1,2]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "[1]"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":3,\"edges\":[[0,1],[1,2],[0,2]],\"start\":0,\"end\":2}",
        "expectedOutput": "[1,2]"
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
    "id": "learn:graphs:breadth-first-search-order",
    "bankId": "T19-Q03",
    "slug": "breadth-first-search-order",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Breadth First Search Order",
    "order": 133,
    "difficulty": "Easy",
    "problemStatement": "Return BFS visit order starting at start; neighbors are explored smallest first; empty graph returns [].",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "[0,1,2,3,4]",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return BFS visit order starting at start; neighbors are explored smallest first; empty graph returns []. Therefore the expected JSON output is [0,1,2,3,4]."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "[]",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return BFS visit order starting at start; neighbors are explored smallest first; empty graph returns []. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "output": "[0]",
        "explanation": "Build adjacency lists [[]]; start=0, end=0. Return BFS visit order starting at start; neighbors are explored smallest first; empty graph returns []. Therefore the expected JSON output is [0]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "[0,1,2,3,4]"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "expectedOutput": "[0]"
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
    "id": "learn:graphs:depth-first-search-order",
    "bankId": "T19-Q04",
    "slug": "depth-first-search-order",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Depth First Search Order",
    "order": 134,
    "difficulty": "Easy",
    "problemStatement": "Return recursive DFS visit order from start, exploring ascending neighbors.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "[0,1,2,3,4]",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return recursive DFS visit order from start, exploring ascending neighbors. Therefore the expected JSON output is [0,1,2,3,4]."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "[]",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return recursive DFS visit order from start, exploring ascending neighbors. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "output": "[0]",
        "explanation": "Build adjacency lists [[]]; start=0, end=0. Return recursive DFS visit order from start, exploring ascending neighbors. Therefore the expected JSON output is [0]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "[0,1,2,3,4]"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "expectedOutput": "[0]"
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
    "id": "learn:graphs:is-start-connected-to-end",
    "bankId": "T19-Q05",
    "slug": "is-start-connected-to-end",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Is Start Connected to End",
    "order": 135,
    "difficulty": "Easy",
    "problemStatement": "Return true when an undirected path exists from start to end; n=0 returns false.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "true",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return true when an undirected path exists from start to end; n=0 returns false. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "false",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return true when an undirected path exists from start to end; n=0 returns false. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "output": "true",
        "explanation": "Build adjacency lists [[]]; start=0, end=0. Return true when an undirected path exists from start to end; n=0 returns false. Therefore the expected JSON output is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
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
    "id": "learn:graphs:connected-component-count",
    "bankId": "T19-Q06",
    "slug": "connected-component-count",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Connected Component Count",
    "order": 136,
    "difficulty": "Easy",
    "problemStatement": "Return the number of connected components, including isolated vertices.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "1",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return the number of connected components, including isolated vertices. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "0",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return the number of connected components, including isolated vertices. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"n\":5,\"edges\":[],\"start\":2,\"end\":4}",
        "output": "5",
        "explanation": "Build adjacency lists [[],[],[],[],[]]; start=2, end=4. Return the number of connected components, including isolated vertices. Therefore the expected JSON output is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":5,\"edges\":[],\"start\":2,\"end\":4}",
        "expectedOutput": "5"
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
    "id": "learn:graphs:connected-component-sizes",
    "bankId": "T19-Q07",
    "slug": "connected-component-sizes",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Connected Component Sizes",
    "order": 137,
    "difficulty": "Easy",
    "problemStatement": "Return component sizes sorted ascending.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "[5]",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return component sizes sorted ascending. Therefore the expected JSON output is [5]."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "[]",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return component sizes sorted ascending. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "output": "[1]",
        "explanation": "Build adjacency lists [[]]; start=0, end=0. Return component sizes sorted ascending. Therefore the expected JSON output is [1]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "[5]"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "expectedOutput": "[1]"
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
    "id": "learn:graphs:all-reachable-vertices",
    "bankId": "T19-Q08",
    "slug": "all-reachable-vertices",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "All Reachable Vertices",
    "order": 138,
    "difficulty": "Medium",
    "problemStatement": "Return the vertices reachable from start sorted ascending.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "[0,1,2,3,4]",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return the vertices reachable from start sorted ascending. Therefore the expected JSON output is [0,1,2,3,4]."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "[]",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return the vertices reachable from start sorted ascending. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "output": "[0]",
        "explanation": "Build adjacency lists [[]]; start=0, end=0. Return the vertices reachable from start sorted ascending. Therefore the expected JSON output is [0]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "[0,1,2,3,4]"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "expectedOutput": "[0]"
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
    "id": "learn:graphs:shortest-edge-distance",
    "bankId": "T19-Q09",
    "slug": "shortest-edge-distance",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Shortest Edge Distance",
    "order": 139,
    "difficulty": "Medium",
    "problemStatement": "Return the smallest number of edges from start to end, or -1 when unreachable.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "4",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return the smallest number of edges from start to end, or -1 when unreachable. Therefore the expected JSON output is 4."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "-1",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return the smallest number of edges from start to end, or -1 when unreachable. Therefore the expected JSON output is -1."
      },
      {
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "output": "0",
        "explanation": "Build adjacency lists [[]]; start=0, end=0. Return the smallest number of edges from start to end, or -1 when unreachable. Therefore the expected JSON output is 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "-1"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "expectedOutput": "0"
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
    "id": "learn:graphs:lexicographically-first-shortest-path",
    "bankId": "T19-Q10",
    "slug": "lexicographically-first-shortest-path",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Lexicographically First Shortest Path",
    "order": 140,
    "difficulty": "Medium",
    "problemStatement": "Return a shortest vertex path from start to end, breaking ties lexicographically; [] if unreachable.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "[0,1,2,3,4]",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return a shortest vertex path from start to end, breaking ties lexicographically; [] if unreachable. Therefore the expected JSON output is [0,1,2,3,4]."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "[]",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return a shortest vertex path from start to end, breaking ties lexicographically; [] if unreachable. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "output": "[0]",
        "explanation": "Build adjacency lists [[]]; start=0, end=0. Return a shortest vertex path from start to end, breaking ties lexicographically; [] if unreachable. Therefore the expected JSON output is [0]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "[0,1,2,3,4]"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "expectedOutput": "[0]"
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
    "id": "learn:graphs:distances-from-start",
    "bankId": "T19-Q11",
    "slug": "distances-from-start",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Distances from Start",
    "order": 141,
    "difficulty": "Medium",
    "problemStatement": "Return BFS distance to every vertex in increasing vertex id; use -1 for unreachable.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "[0,1,2,3,4]",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return BFS distance to every vertex in increasing vertex id; use -1 for unreachable. Therefore the expected JSON output is [0,1,2,3,4]."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "[]",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return BFS distance to every vertex in increasing vertex id; use -1 for unreachable. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "output": "[0]",
        "explanation": "Build adjacency lists [[]]; start=0, end=0. Return BFS distance to every vertex in increasing vertex id; use -1 for unreachable. Therefore the expected JSON output is [0]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "[0,1,2,3,4]"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "expectedOutput": "[0]"
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
    "id": "learn:graphs:is-graph-connected",
    "bankId": "T19-Q12",
    "slug": "is-graph-connected",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Is Graph Connected",
    "order": 142,
    "difficulty": "Medium",
    "problemStatement": "Return true if n≤1, otherwise if all n vertices lie in one connected component.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "true",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return true if n≤1, otherwise if all n vertices lie in one connected component. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"n\":5,\"edges\":[],\"start\":2,\"end\":4}",
        "output": "false",
        "explanation": "Build adjacency lists [[],[],[],[],[]]; start=2, end=4. Return true if n≤1, otherwise if all n vertices lie in one connected component. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "true",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return true if n≤1, otherwise if all n vertices lie in one connected component. Therefore the expected JSON output is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":5,\"edges\":[],\"start\":2,\"end\":4}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
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
    "id": "learn:graphs:has-undirected-cycle",
    "bankId": "T19-Q13",
    "slug": "has-undirected-cycle",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Has Undirected Cycle",
    "order": 143,
    "difficulty": "Medium",
    "problemStatement": "Return true if any component contains an undirected cycle.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "false",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return true if any component contains an undirected cycle. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"n\":3,\"edges\":[[0,1],[1,2],[0,2]],\"start\":0,\"end\":2}",
        "output": "true",
        "explanation": "Build adjacency lists [[1,2],[0,2],[0,1]]; start=0, end=2. Return true if any component contains an undirected cycle. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "false",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return true if any component contains an undirected cycle. Therefore the expected JSON output is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":3,\"edges\":[[0,1],[1,2],[0,2]],\"start\":0,\"end\":2}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "false"
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
    "id": "learn:graphs:is-graph-bipartite",
    "bankId": "T19-Q14",
    "slug": "is-graph-bipartite",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Is Graph Bipartite",
    "order": 144,
    "difficulty": "Medium",
    "problemStatement": "Return true if the graph admits a two-coloring so each edge joins opposite colors.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "true",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return true if the graph admits a two-coloring so each edge joins opposite colors. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"n\":3,\"edges\":[[0,1],[1,2],[0,2]],\"start\":0,\"end\":2}",
        "output": "false",
        "explanation": "Build adjacency lists [[1,2],[0,2],[0,1]]; start=0, end=2. Return true if the graph admits a two-coloring so each edge joins opposite colors. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "true",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return true if the graph admits a two-coloring so each edge joins opposite colors. Therefore the expected JSON output is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":3,\"edges\":[[0,1],[1,2],[0,2]],\"start\":0,\"end\":2}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
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
    "id": "learn:graphs:is-an-undirected-tree",
    "bankId": "T19-Q15",
    "slug": "is-an-undirected-tree",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Is an Undirected Tree",
    "order": 145,
    "difficulty": "Medium",
    "problemStatement": "Return true only when n>0 and the graph is connected and acyclic.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "true",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return true only when n>0 and the graph is connected and acyclic. Therefore the expected JSON output is true."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "false",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return true only when n>0 and the graph is connected and acyclic. Therefore the expected JSON output is false."
      },
      {
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "output": "true",
        "explanation": "Build adjacency lists [[]]; start=0, end=0. Return true only when n>0 and the graph is connected and acyclic. Therefore the expected JSON output is true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
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
    "id": "learn:graphs:isolated-vertex-count",
    "bankId": "T19-Q16",
    "slug": "isolated-vertex-count",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Isolated Vertex Count",
    "order": 146,
    "difficulty": "Hard",
    "problemStatement": "Count vertices of degree zero.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "0",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Count vertices of degree zero. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "output": "1",
        "explanation": "Build adjacency lists [[]]; start=0, end=0. Count vertices of degree zero. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"n\":5,\"edges\":[],\"start\":2,\"end\":4}",
        "output": "5",
        "explanation": "Build adjacency lists [[],[],[],[],[]]; start=2, end=4. Count vertices of degree zero. Therefore the expected JSON output is 5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":5,\"edges\":[],\"start\":2,\"end\":4}",
        "expectedOutput": "5"
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
    "id": "learn:graphs:leaf-degree-vertex-ids",
    "bankId": "T19-Q17",
    "slug": "leaf-degree-vertex-ids",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Leaf Degree Vertex IDs",
    "order": 147,
    "difficulty": "Hard",
    "problemStatement": "Return all vertices having degree exactly one, in ascending order.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "[0,4]",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return all vertices having degree exactly one, in ascending order. Therefore the expected JSON output is [0,4]."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "[]",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return all vertices having degree exactly one, in ascending order. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[0,2],[0,3],[0,4]],\"start\":0,\"end\":4}",
        "output": "[1,2,3,4]",
        "explanation": "Build adjacency lists [[1,2,3,4],[0],[0],[0],[0]]; start=0, end=4. Return all vertices having degree exactly one, in ascending order. Therefore the expected JSON output is [1,2,3,4]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "[0,4]"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":5,\"edges\":[[0,1],[0,2],[0,3],[0,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "[1,2,3,4]"
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
    "id": "learn:graphs:triangle-count",
    "bankId": "T19-Q18",
    "slug": "triangle-count",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Triangle Count",
    "order": 148,
    "difficulty": "Hard",
    "problemStatement": "Count unordered triples of distinct vertices with all three edges present.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "0",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Count unordered triples of distinct vertices with all three edges present. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"n\":3,\"edges\":[[0,1],[1,2],[0,2]],\"start\":0,\"end\":2}",
        "output": "1",
        "explanation": "Build adjacency lists [[1,2],[0,2],[0,1]]; start=0, end=2. Count unordered triples of distinct vertices with all three edges present. Therefore the expected JSON output is 1."
      },
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]],\"start\":1,\"end\":4}",
        "output": "10",
        "explanation": "Build adjacency lists [[1,2,3,4],[0,2,3,4],[0,1,3,4],[0,1,2,4],[0,1,2,3]]; start=1, end=4. Count unordered triples of distinct vertices with all three edges present. Therefore the expected JSON output is 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":3,\"edges\":[[0,1],[1,2],[0,2]],\"start\":0,\"end\":2}",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":5,\"edges\":[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]],\"start\":1,\"end\":4}",
        "expectedOutput": "10"
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
    "id": "learn:graphs:number-of-bridges",
    "bankId": "T19-Q19",
    "slug": "number-of-bridges",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Number of Bridges",
    "order": 149,
    "difficulty": "Hard",
    "problemStatement": "Count edges whose removal increases the number of connected components.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "4",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Count edges whose removal increases the number of connected components. Therefore the expected JSON output is 4."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "0",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Count edges whose removal increases the number of connected components. Therefore the expected JSON output is 0."
      },
      {
        "input": "{\"n\":6,\"edges\":[[0,1],[1,2],[3,4]],\"start\":0,\"end\":5}",
        "output": "3",
        "explanation": "Build adjacency lists [[1],[0,2],[1],[4],[3],[]]; start=0, end=5. Count edges whose removal increases the number of connected components. Therefore the expected JSON output is 3."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "4"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":6,\"edges\":[[0,1],[1,2],[3,4]],\"start\":0,\"end\":5}",
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
    "id": "learn:graphs:adjacency-matrix",
    "bankId": "T19-Q20",
    "slug": "adjacency-matrix",
    "topicId": "graphs",
    "topicSlug": "graphs",
    "topicTitle": "Graphs",
    "title": "Adjacency Matrix",
    "order": 150,
    "difficulty": "Hard",
    "problemStatement": "Return an n×n symmetric 0/1 matrix; diagonal must be zero.",
    "inputFormat": "A single JSON object: {\"n\": number of vertices, \"edges\": undirected unique [u,v] edges, \"start\": vertex, \"end\": vertex}.",
    "outputFormat": "Print/return a single valid JSON value matching the requested result; array order matters unless stated otherwise.",
    "constraints": "0 ≤ n ≤ 7; vertices 0..n-1; 0 ≤ u < v < n; no self-loops or parallel edges; when n=0, start=end=-1; otherwise both are valid vertices; neighbor order is ascending.",
    "examples": [
      {
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "output": "[[0,1,0,0,0],[1,0,1,0,0],[0,1,0,1,0],[0,0,1,0,1],[0,0,0,1,0]]",
        "explanation": "Build adjacency lists [[1],[0,2],[1,3],[2,4],[3]]; start=0, end=4. Return an n×n symmetric 0/1 matrix; diagonal must be zero. Therefore the expected JSON output is [[0,1,0,0,0],[1,0,1,0,0],[0,1,0,1,0],[0,0,1,0,1],[0,0,0,1,0]]."
      },
      {
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "output": "[]",
        "explanation": "Build adjacency lists []; start=-1, end=-1. Return an n×n symmetric 0/1 matrix; diagonal must be zero. Therefore the expected JSON output is []."
      },
      {
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "output": "[[0]]",
        "explanation": "Build adjacency lists [[]]; start=0, end=0. Return an n×n symmetric 0/1 matrix; diagonal must be zero. Therefore the expected JSON output is [[0]]."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "{\"n\":5,\"edges\":[[0,1],[1,2],[2,3],[3,4]],\"start\":0,\"end\":4}",
        "expectedOutput": "[[0,1,0,0,0],[1,0,1,0,0],[0,1,0,1,0],[0,0,1,0,1],[0,0,0,1,0]]"
      },
      {
        "testIndex": 2,
        "input": "{\"n\":0,\"edges\":[],\"start\":-1,\"end\":-1}",
        "expectedOutput": "[]"
      },
      {
        "testIndex": 3,
        "input": "{\"n\":1,\"edges\":[],\"start\":0,\"end\":0}",
        "expectedOutput": "[[0]]"
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
