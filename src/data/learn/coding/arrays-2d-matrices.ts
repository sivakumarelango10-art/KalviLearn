import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:arrays-2d-matrices:matrix-total",
    "slug": "matrix-total",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Matrix Total",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "For each matrix cell `(r,c)`, add `matrix[r][c] + 1*(r+c)` using zero-based indices. Print the total.",
    "inputFormat": "First line contains `rows cols`; next rows lines contain cols integers.",
    "outputFormat": "Print one integer total.",
    "constraints": "1 <= rows,cols <= 500; cell values are between -10^6 and 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "14",
        "explanation": "Summing `cell + 1*(row+column)` across the matrix gives 14."
      },
      {
        "input": "2 3\n2 0 1\n4 3 5",
        "output": "24",
        "explanation": "Summing `cell + 1*(row+column)` across the matrix gives 24."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Summing `cell + 1*(row+column)` across the matrix gives 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "14"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 0 1\n4 3 5",
        "expectedOutput": "24"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
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
    "id": "learn:arrays-2d-matrices:primary-diagonal-metric",
    "slug": "primary-diagonal-metric",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Primary Diagonal Metric",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "For each matrix cell `(r,c)`, add `matrix[r][c] + 2*(r+c)` using zero-based indices. Print the total.",
    "inputFormat": "First line contains `rows cols`; next rows lines contain cols integers.",
    "outputFormat": "Print one integer total.",
    "constraints": "1 <= rows,cols <= 500; cell values are between -10^6 and 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "18",
        "explanation": "Summing `cell + 2*(row+column)` across the matrix gives 18."
      },
      {
        "input": "2 3\n2 0 1\n4 3 5",
        "output": "33",
        "explanation": "Summing `cell + 2*(row+column)` across the matrix gives 33."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Summing `cell + 2*(row+column)` across the matrix gives 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "18"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 0 1\n4 3 5",
        "expectedOutput": "33"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
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
    "id": "learn:arrays-2d-matrices:secondary-diagonal-metric",
    "slug": "secondary-diagonal-metric",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Secondary Diagonal Metric",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "For each matrix cell `(r,c)`, add `matrix[r][c] + 3*(r+c)` using zero-based indices. Print the total.",
    "inputFormat": "First line contains `rows cols`; next rows lines contain cols integers.",
    "outputFormat": "Print one integer total.",
    "constraints": "1 <= rows,cols <= 500; cell values are between -10^6 and 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "22",
        "explanation": "Summing `cell + 3*(row+column)` across the matrix gives 22."
      },
      {
        "input": "2 3\n2 0 1\n4 3 5",
        "output": "42",
        "explanation": "Summing `cell + 3*(row+column)` across the matrix gives 42."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Summing `cell + 3*(row+column)` across the matrix gives 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "22"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 0 1\n4 3 5",
        "expectedOutput": "42"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
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
    "id": "learn:arrays-2d-matrices:row-maximum-metric",
    "slug": "row-maximum-metric",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Row Maximum Metric",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "For each matrix cell `(r,c)`, add `matrix[r][c] + 4*(r+c)` using zero-based indices. Print the total.",
    "inputFormat": "First line contains `rows cols`; next rows lines contain cols integers.",
    "outputFormat": "Print one integer total.",
    "constraints": "1 <= rows,cols <= 500; cell values are between -10^6 and 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "26",
        "explanation": "Summing `cell + 4*(row+column)` across the matrix gives 26."
      },
      {
        "input": "2 3\n2 0 1\n4 3 5",
        "output": "51",
        "explanation": "Summing `cell + 4*(row+column)` across the matrix gives 51."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Summing `cell + 4*(row+column)` across the matrix gives 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "26"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 0 1\n4 3 5",
        "expectedOutput": "51"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
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
    "id": "learn:arrays-2d-matrices:column-minimum-metric",
    "slug": "column-minimum-metric",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Column Minimum Metric",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "For each matrix cell `(r,c)`, add `matrix[r][c] + 5*(r+c)` using zero-based indices. Print the total.",
    "inputFormat": "First line contains `rows cols`; next rows lines contain cols integers.",
    "outputFormat": "Print one integer total.",
    "constraints": "1 <= rows,cols <= 500; cell values are between -10^6 and 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "30",
        "explanation": "Summing `cell + 5*(row+column)` across the matrix gives 30."
      },
      {
        "input": "2 3\n2 0 1\n4 3 5",
        "output": "60",
        "explanation": "Summing `cell + 5*(row+column)` across the matrix gives 60."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Summing `cell + 5*(row+column)` across the matrix gives 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "30"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 0 1\n4 3 5",
        "expectedOutput": "60"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
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
    "id": "learn:arrays-2d-matrices:transpose-score",
    "slug": "transpose-score",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Transpose Score",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "For each matrix cell `(r,c)`, add `matrix[r][c] + 6*(r+c)` using zero-based indices. Print the total.",
    "inputFormat": "First line contains `rows cols`; next rows lines contain cols integers.",
    "outputFormat": "Print one integer total.",
    "constraints": "1 <= rows,cols <= 500; cell values are between -10^6 and 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "34",
        "explanation": "Summing `cell + 6*(row+column)` across the matrix gives 34."
      },
      {
        "input": "2 3\n2 0 1\n4 3 5",
        "output": "69",
        "explanation": "Summing `cell + 6*(row+column)` across the matrix gives 69."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Summing `cell + 6*(row+column)` across the matrix gives 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "34"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 0 1\n4 3 5",
        "expectedOutput": "69"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
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
    "id": "learn:arrays-2d-matrices:boundary-metric",
    "slug": "boundary-metric",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Boundary Metric",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "For each matrix cell `(r,c)`, add `matrix[r][c] + 7*(r+c)` using zero-based indices. Print the total.",
    "inputFormat": "First line contains `rows cols`; next rows lines contain cols integers.",
    "outputFormat": "Print one integer total.",
    "constraints": "1 <= rows,cols <= 500; cell values are between -10^6 and 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "38",
        "explanation": "Summing `cell + 7*(row+column)` across the matrix gives 38."
      },
      {
        "input": "2 3\n2 0 1\n4 3 5",
        "output": "78",
        "explanation": "Summing `cell + 7*(row+column)` across the matrix gives 78."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Summing `cell + 7*(row+column)` across the matrix gives 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "38"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 0 1\n4 3 5",
        "expectedOutput": "78"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
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
    "id": "learn:arrays-2d-matrices:local-peak-metric",
    "slug": "local-peak-metric",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Local Peak Metric",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "For each matrix cell `(r,c)`, add `matrix[r][c] + 8*(r+c)` using zero-based indices. Print the total.",
    "inputFormat": "First line contains `rows cols`; next rows lines contain cols integers.",
    "outputFormat": "Print one integer total.",
    "constraints": "1 <= rows,cols <= 500; cell values are between -10^6 and 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "42",
        "explanation": "Summing `cell + 8*(row+column)` across the matrix gives 42."
      },
      {
        "input": "2 3\n2 0 1\n4 3 5",
        "output": "87",
        "explanation": "Summing `cell + 8*(row+column)` across the matrix gives 87."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Summing `cell + 8*(row+column)` across the matrix gives 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "42"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 0 1\n4 3 5",
        "expectedOutput": "87"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
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
    "id": "learn:arrays-2d-matrices:zero-row-metric",
    "slug": "zero-row-metric",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Zero Row Metric",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "For each matrix cell `(r,c)`, add `matrix[r][c] + 9*(r+c)` using zero-based indices. Print the total.",
    "inputFormat": "First line contains `rows cols`; next rows lines contain cols integers.",
    "outputFormat": "Print one integer total.",
    "constraints": "1 <= rows,cols <= 500; cell values are between -10^6 and 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "46",
        "explanation": "Summing `cell + 9*(row+column)` across the matrix gives 46."
      },
      {
        "input": "2 3\n2 0 1\n4 3 5",
        "output": "96",
        "explanation": "Summing `cell + 9*(row+column)` across the matrix gives 96."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Summing `cell + 9*(row+column)` across the matrix gives 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "46"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 0 1\n4 3 5",
        "expectedOutput": "96"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
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
    "id": "learn:arrays-2d-matrices:chessboard-metric",
    "slug": "chessboard-metric",
    "topicId": "arrays-2d-matrices",
    "topicSlug": "arrays-2d-matrices",
    "topicTitle": "2D Arrays / Matrices",
    "title": "Chessboard Metric",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "For each matrix cell `(r,c)`, add `matrix[r][c] + 10*(r+c)` using zero-based indices. Print the total.",
    "inputFormat": "First line contains `rows cols`; next rows lines contain cols integers.",
    "outputFormat": "Print one integer total.",
    "constraints": "1 <= rows,cols <= 500; cell values are between -10^6 and 10^6.",
    "examples": [
      {
        "input": "2 2\n1 2\n3 4",
        "output": "50",
        "explanation": "Summing `cell + 10*(row+column)` across the matrix gives 50."
      },
      {
        "input": "2 3\n2 0 1\n4 3 5",
        "output": "105",
        "explanation": "Summing `cell + 10*(row+column)` across the matrix gives 105."
      },
      {
        "input": "1 1\n7",
        "output": "7",
        "explanation": "Summing `cell + 10*(row+column)` across the matrix gives 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 2\n1 2\n3 4",
        "expectedOutput": "50"
      },
      {
        "testIndex": 2,
        "input": "2 3\n2 0 1\n4 3 5",
        "expectedOutput": "105"
      },
      {
        "testIndex": 3,
        "input": "1 1\n7",
        "expectedOutput": "7"
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
