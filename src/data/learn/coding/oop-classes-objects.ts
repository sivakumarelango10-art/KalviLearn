import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:oop-classes-objects:student-object",
    "slug": "student-object",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Student Object",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Model the inputs as fields of an object and compute the requested derived field. For this task, compute `(a+1)*b-1`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "8",
        "explanation": "Applying the question's stated computation gives (2+1)×3-1 = 8."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Applying the question's stated computation gives (5+1)×1-1 = 5."
      },
      {
        "input": "-2 4",
        "output": "-5",
        "explanation": "Applying the question's stated computation gives (-2+1)×4-1 = -5."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
        "expectedOutput": "-5"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:oop-classes-objects:rectangle-object",
    "slug": "rectangle-object",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Rectangle Object",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Model the inputs as fields of an object and compute the requested derived field. For this task, compute `(a+2)*b-2`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "10",
        "explanation": "Applying the question's stated computation gives (2+2)×3-2 = 10."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Applying the question's stated computation gives (5+2)×1-2 = 5."
      },
      {
        "input": "-2 4",
        "output": "-2",
        "explanation": "Applying the question's stated computation gives (-2+2)×4-2 = -2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
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
    "id": "learn:oop-classes-objects:point-object",
    "slug": "point-object",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Point Object",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Model the inputs as fields of an object and compute the requested derived field. For this task, compute `(a+3)*b-3`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "12",
        "explanation": "Applying the question's stated computation gives (2+3)×3-3 = 12."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Applying the question's stated computation gives (5+3)×1-3 = 5."
      },
      {
        "input": "-2 4",
        "output": "1",
        "explanation": "Applying the question's stated computation gives (-2+3)×4-3 = 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "12"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
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
    "id": "learn:oop-classes-objects:book-object",
    "slug": "book-object",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Book Object",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Model the inputs as fields of an object and compute the requested derived field. For this task, compute `(a+4)*b-4`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "14",
        "explanation": "Applying the question's stated computation gives (2+4)×3-4 = 14."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Applying the question's stated computation gives (5+4)×1-4 = 5."
      },
      {
        "input": "-2 4",
        "output": "4",
        "explanation": "Applying the question's stated computation gives (-2+4)×4-4 = 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "14"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
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
    "id": "learn:oop-classes-objects:employee-object",
    "slug": "employee-object",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Employee Object",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Model the inputs as fields of an object and compute the requested derived field. For this task, compute `(a+5)*b-5`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "16",
        "explanation": "Applying the question's stated computation gives (2+5)×3-5 = 16."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Applying the question's stated computation gives (5+5)×1-5 = 5."
      },
      {
        "input": "-2 4",
        "output": "7",
        "explanation": "Applying the question's stated computation gives (-2+5)×4-5 = 7."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "16"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
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
    "id": "learn:oop-classes-objects:car-object",
    "slug": "car-object",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Car Object",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Model the inputs as fields of an object and compute the requested derived field. For this task, compute `(a+6)*b-6`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "18",
        "explanation": "Applying the question's stated computation gives (2+6)×3-6 = 18."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Applying the question's stated computation gives (5+6)×1-6 = 5."
      },
      {
        "input": "-2 4",
        "output": "10",
        "explanation": "Applying the question's stated computation gives (-2+6)×4-6 = 10."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "18"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
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
    "id": "learn:oop-classes-objects:product-object",
    "slug": "product-object",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Product Object",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Model the inputs as fields of an object and compute the requested derived field. For this task, compute `(a+7)*b-7`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "20",
        "explanation": "Applying the question's stated computation gives (2+7)×3-7 = 20."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Applying the question's stated computation gives (5+7)×1-7 = 5."
      },
      {
        "input": "-2 4",
        "output": "13",
        "explanation": "Applying the question's stated computation gives (-2+7)×4-7 = 13."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "20"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
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
    "id": "learn:oop-classes-objects:time-object",
    "slug": "time-object",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Time Object",
    "order": 8,
    "difficulty": "Easy",
    "problemStatement": "Model the inputs as fields of an object and compute the requested derived field. For this task, compute `(a+8)*b-8`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "22",
        "explanation": "Applying the question's stated computation gives (2+8)×3-8 = 22."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Applying the question's stated computation gives (5+8)×1-8 = 5."
      },
      {
        "input": "-2 4",
        "output": "16",
        "explanation": "Applying the question's stated computation gives (-2+8)×4-8 = 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "22"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
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
    "id": "learn:oop-classes-objects:fraction-object",
    "slug": "fraction-object",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Fraction Object",
    "order": 9,
    "difficulty": "Easy",
    "problemStatement": "Model the inputs as fields of an object and compute the requested derived field. For this task, compute `(a+9)*b-9`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "24",
        "explanation": "Applying the question's stated computation gives (2+9)×3-9 = 24."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Applying the question's stated computation gives (5+9)×1-9 = 5."
      },
      {
        "input": "-2 4",
        "output": "19",
        "explanation": "Applying the question's stated computation gives (-2+9)×4-9 = 19."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "24"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
        "expectedOutput": "19"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 7,
      "totalCount": 10
    }
  },
  {
    "id": "learn:oop-classes-objects:circle-object",
    "slug": "circle-object",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Circle Object",
    "order": 10,
    "difficulty": "Easy",
    "problemStatement": "Model the inputs as fields of an object and compute the requested derived field. For this task, compute `(a+10)*b-10`.",
    "inputFormat": "One line contains integers `a b`.",
    "outputFormat": "Print the computed integer.",
    "constraints": "-10^6 <= a,b <= 10^6; result fits signed 64-bit integer.",
    "examples": [
      {
        "input": "2 3",
        "output": "26",
        "explanation": "Applying the question's stated computation gives (2+10)×3-10 = 26."
      },
      {
        "input": "5 1",
        "output": "5",
        "explanation": "Applying the question's stated computation gives (5+10)×1-10 = 5."
      },
      {
        "input": "-2 4",
        "output": "22",
        "explanation": "Applying the question's stated computation gives (-2+10)×4-10 = 22."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "2 3",
        "expectedOutput": "26"
      },
      {
        "testIndex": 2,
        "input": "5 1",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "-2 4",
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
