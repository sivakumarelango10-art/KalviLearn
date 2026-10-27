import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:oop-classes-objects:construct-student-summaries",
    "bankId": "T22-Q01",
    "slug": "construct-student-summaries",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Construct Student Summaries",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Define a Student class with name (string) and score (integer) fields. Instantiate a Student object for each given record in order. Serialize each object to \"name:score\". Print the serialized strings separated by spaces, or EMPTY if no records are provided.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and their score separated by a space.",
    "outputFormat": "Print the serialized student summaries separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "Anu:82 Bala:65 Charu:82",
        "explanation": "Constructed student summaries: Anu:82 Bala:65 Charu:82."
      },
      {
        "input": "0 50",
        "output": "EMPTY",
        "explanation": "Constructed student summaries: EMPTY."
      },
      {
        "input": "1 100\nA 100",
        "output": "A:100",
        "explanation": "Constructed student summaries: A:100."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "Anu:82 Bala:65 Charu:82"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "A:100"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Instantiate Student objects and print \"name:score\" summaries\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nclass Student {\n    constructor(name, score) {\n        this.name = name;\n        this.score = score;\n    }\n}\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\nclass Student {\n    String name;\n    int score;\n    public Student(String name, int score) {\n        this.name = name;\n        this.score = score;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int score;\n    Student(string n, int s) : name(n), score(s) {}\n};\n\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:count-constructed-objects",
    "bankId": "T22-Q02",
    "slug": "count-constructed-objects",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Count Constructed Objects",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Define a Student class with name and score fields. Instantiate a Student object for each record provided and return the total count of instantiated objects. Print the count as an integer.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print the count of instantiated objects.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "3",
        "explanation": "Count of instantiated Student objects: 3."
      },
      {
        "input": "0 50",
        "output": "0",
        "explanation": "Count of instantiated Student objects: 0."
      },
      {
        "input": "1 100\nA 100",
        "output": "1",
        "explanation": "Count of instantiated Student objects: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print number of instantiated objects\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10);\n    console.log(n);\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) System.out.println(sc.nextInt());\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n;\n    if (cin >> n) cout << n << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:highest-scoring-student",
    "bankId": "T22-Q03",
    "slug": "highest-scoring-student",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Highest Scoring Student",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Define a Student class with name and score fields. Find the student object with the highest score. If there is a tie, choose the earliest record. Print its 0-based index, name, and score separated by spaces, or null if no records exist.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print index name score separated by space, or null if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "0 Anu 82",
        "explanation": "Highest scoring student: 0 Anu 82."
      },
      {
        "input": "0 50",
        "output": "null",
        "explanation": "Highest scoring student: null."
      },
      {
        "input": "1 100\nA 100",
        "output": "0 A 100",
        "explanation": "Highest scoring student: 0 A 100."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "0 Anu 82"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "0 A 100"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print highest scoring student (index name score) or null\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:lowest-scoring-student",
    "bankId": "T22-Q04",
    "slug": "lowest-scoring-student",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Lowest Scoring Student",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Define a Student class with name and score fields. Find the student object with the lowest score. If there is a tie, choose the earliest record. Print its 0-based index, name, and score separated by spaces, or null if no records exist.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print index name score separated by space, or null if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "1 Bala 65",
        "explanation": "Lowest scoring student: 1 Bala 65."
      },
      {
        "input": "0 50",
        "output": "null",
        "explanation": "Lowest scoring student: null."
      },
      {
        "input": "1 100\nA 100",
        "output": "0 A 100",
        "explanation": "Lowest scoring student: 0 A 100."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "1 Bala 65"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "0 A 100"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print lowest scoring student (index name score) or null\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:passing-students",
    "bankId": "T22-Q05",
    "slug": "passing-students",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Passing Students",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Define a Student class with name and score fields. Find the names of all students whose score is at least threshold (score ≥ threshold), preserving original roster order. Print the passing student names separated by spaces, or EMPTY if none pass.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print names of passing students separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "Anu Charu",
        "explanation": "Passing students (score >= threshold): Anu Charu."
      },
      {
        "input": "0 50",
        "output": "EMPTY",
        "explanation": "Passing students (score >= threshold): EMPTY."
      },
      {
        "input": "1 100\nA 100",
        "output": "A",
        "explanation": "Passing students (score >= threshold): A."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "Anu Charu"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "A"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n    def is_passing(self, threshold: int) -> bool:\n        return self.score >= threshold\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print passing student names\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:failing-students",
    "bankId": "T22-Q06",
    "slug": "failing-students",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Failing Students",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Define a Student class with name and score fields. Find the names of all students whose score is strictly below threshold (score < threshold), preserving original roster order. Print the failing student names separated by spaces, or EMPTY if none fail.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print names of failing students separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "Bala",
        "explanation": "Failing students (score < threshold): Bala."
      },
      {
        "input": "0 50",
        "output": "EMPTY",
        "explanation": "Failing students (score < threshold): EMPTY."
      },
      {
        "input": "1 1\nMira 0",
        "output": "Mira",
        "explanation": "Failing students (score < threshold): Mira."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "Bala"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 1\nMira 0",
        "expectedOutput": "Mira"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n    def is_failing(self, threshold: int) -> bool:\n        return self.score < threshold\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print failing student names\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:count-passing-objects",
    "bankId": "T22-Q07",
    "slug": "count-passing-objects",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Count Passing Objects",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Define a Student class with name and score fields. Count the number of student objects whose score is at least threshold (score ≥ threshold). Print the count as an integer.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print the count of passing students.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "2",
        "explanation": "Count of students with score >= threshold: 2."
      },
      {
        "input": "0 50",
        "output": "0",
        "explanation": "Count of students with score >= threshold: 0."
      },
      {
        "input": "1 100\nA 100",
        "output": "1",
        "explanation": "Count of students with score >= threshold: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print count of passing students\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:average-object-score-fraction",
    "bankId": "T22-Q08",
    "slug": "average-object-score-fraction",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Average Object Score Fraction",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields. Compute the exact average score across all student objects as a reduced fraction with a positive denominator. Print the numerator and denominator separated by a space, or null if no students exist.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print numerator and denominator separated by space, or null if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "229 3",
        "explanation": "Average score fraction: 229 3."
      },
      {
        "input": "0 50",
        "output": "null",
        "explanation": "Average score fraction: null."
      },
      {
        "input": "1 100\nA 100",
        "output": "100 1",
        "explanation": "Average score fraction: 100 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "229 3"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "100 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys, math\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print exact average score as reduced fraction (num den) or null\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:total-marks-across-objects",
    "bankId": "T22-Q09",
    "slug": "total-marks-across-objects",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Total Marks Across Objects",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields. Compute the total sum of the scores of all student objects. Print the sum as an integer.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print the sum of all student scores.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "229",
        "explanation": "Sum of all student scores: 229."
      },
      {
        "input": "0 50",
        "output": "0",
        "explanation": "Sum of all student scores: 0."
      },
      {
        "input": "1 100\nA 100",
        "output": "100",
        "explanation": "Sum of all student scores: 100."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "229"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "100"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print sum of all student scores\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:maximum-score-gap",
    "bankId": "T22-Q10",
    "slug": "maximum-score-gap",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Maximum Score Gap",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields. Find the maximum score gap (highest score minus lowest score among all student objects). For fewer than two students, print 0.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print the maximum score gap.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "17",
        "explanation": "Maximum score gap: 17."
      },
      {
        "input": "0 50",
        "output": "0",
        "explanation": "Maximum score gap: 0."
      },
      {
        "input": "3 75\nZed 20\nYam 80\nXia 100",
        "output": "80",
        "explanation": "Maximum score gap: 80."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "17"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "3 75\nZed 20\nYam 80\nXia 100",
        "expectedOutput": "80"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print max score minus min score, or 0\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:rank-objects-by-score",
    "bankId": "T22-Q11",
    "slug": "rank-objects-by-score",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Rank Objects by Score",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields. Rank the student objects by descending score, breaking ties by original roster index. Print the ranked student names separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print student names sorted by descending score, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "Anu Charu Bala",
        "explanation": "Student names ranked by score: Anu Charu Bala."
      },
      {
        "input": "0 50",
        "output": "EMPTY",
        "explanation": "Student names ranked by score: EMPTY."
      },
      {
        "input": "1 100\nA 100",
        "output": "A",
        "explanation": "Student names ranked by score: A."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "Anu Charu Bala"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "A"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int, index: int):\n        self.name = name\n        self.score = score\n        self.index = index\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print student names sorted by descending score\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:alphabetical-object-display",
    "bankId": "T22-Q12",
    "slug": "alphabetical-object-display",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Alphabetical Object Display",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields. Display all student objects sorted alphabetically by name (case-sensitive), breaking ties by original roster index. For each student, print name and score separated by a space on a new line, or EMPTY if empty.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print each student name and score on a new line sorted by name, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "Anu 82\nBala 65\nCharu 82",
        "explanation": "Alphabetical student list:\nAnu 82\nBala 65\nCharu 82"
      },
      {
        "input": "0 50",
        "output": "EMPTY",
        "explanation": "Alphabetical student list:\nEMPTY"
      },
      {
        "input": "1 100\nA 100",
        "output": "A 100",
        "explanation": "Alphabetical student list:\nA 100"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "Anu 82\nBala 65\nCharu 82"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "A 100"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int, index: int):\n        self.name = name\n        self.score = score\n        self.index = index\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print students sorted alphabetically by name\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:score-as-letter-grade",
    "bankId": "T22-Q13",
    "slug": "score-as-letter-grade",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Score as Letter Grade",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields, and a method to convert score to a letter grade: A (score ≥ 90), B (80 ≤ score < 90), C (70 ≤ score < 80), D (60 ≤ score < 70), and F (score < 60). Print the letter grades in original roster order separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print the letter grades separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "B D B",
        "explanation": "Student letter grades: B D B."
      },
      {
        "input": "0 50",
        "output": "EMPTY",
        "explanation": "Student letter grades: EMPTY."
      },
      {
        "input": "1 100\nA 100",
        "output": "A",
        "explanation": "Student letter grades: A."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "B D B"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "A"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n    def get_letter_grade(self) -> str:\n        if self.score >= 90: return 'A'\n        if self.score >= 80: return 'B'\n        if self.score >= 70: return 'C'\n        if self.score >= 60: return 'D'\n        return 'F'\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print letter grades in original order\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:pass-fail-status-for-objects",
    "bankId": "T22-Q14",
    "slug": "pass-fail-status-for-objects",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Pass Fail Status for Objects",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields. Count how many student objects passed (score ≥ threshold) and how many failed (score < threshold). Print the passed count and failed count separated by a space.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print passed and failed counts separated by space.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "2 1",
        "explanation": "Pass / Fail counts: 2 1."
      },
      {
        "input": "0 50",
        "output": "0 0",
        "explanation": "Pass / Fail counts: 0 0."
      },
      {
        "input": "1 100\nA 100",
        "output": "1 0",
        "explanation": "Pass / Fail counts: 1 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "2 1"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "0 0"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "1 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print passed and failed counts separated by space\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:clone-scores-with-bonus",
    "bankId": "T22-Q15",
    "slug": "clone-scores-with-bonus",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Clone Scores with Bonus",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Define a Student class with name and score fields. Clone each Student object and add a bonus of 5 points to each cloned student score (capped at a maximum of 100). Print the cloned scores in original order separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print the cloned scores separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "87 70 87",
        "explanation": "Cloned scores with bonus: 87 70 87."
      },
      {
        "input": "0 50",
        "output": "EMPTY",
        "explanation": "Cloned scores with bonus: EMPTY."
      },
      {
        "input": "1 100\nA 100",
        "output": "100",
        "explanation": "Cloned scores with bonus: 100."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "87 70 87"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "100"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n    def clone_with_bonus(self):\n        return Student(self.name, min(100, self.score + 5))\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Clone students with bonus and print cloned scores\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:copy-independence-check",
    "bankId": "T22-Q16",
    "slug": "copy-independence-check",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Copy Independence Check",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Define a Student class with name and score fields. Construct clones of each Student object with score capped at min(100, score + 5). Print the original scores on the first line and the cloned scores on the second line to verify that the original instances remain unchanged, or EMPTY on both lines if empty.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print original scores on line 1 and cloned scores on line 2, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "82 65 82\n87 70 87",
        "explanation": "Original and cloned scores:\n82 65 82\n87 70 87"
      },
      {
        "input": "0 50",
        "output": "EMPTY\nEMPTY",
        "explanation": "Original and cloned scores:\nEMPTY\nEMPTY"
      },
      {
        "input": "1 100\nA 100",
        "output": "100\n100",
        "explanation": "Original and cloned scores:\n100\n100"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "82 65 82\n87 70 87"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "EMPTY\nEMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "100\n100"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print original scores on line 1, cloned scores on line 2\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:distinct-student-names",
    "bankId": "T22-Q17",
    "slug": "distinct-student-names",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Distinct Student Names",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Define a Student class with name and score fields. Count the number of distinct student names among all instantiated objects. Print the count as an integer.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print the count of distinct student names.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "3",
        "explanation": "Number of distinct student names: 3."
      },
      {
        "input": "0 50",
        "output": "0",
        "explanation": "Number of distinct student names: 0."
      },
      {
        "input": "1 100\nA 100",
        "output": "1",
        "explanation": "Number of distinct student names: 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print count of distinct student names\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:threshold-score-distance",
    "bankId": "T22-Q18",
    "slug": "threshold-score-distance",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Threshold Score Distance",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Define a Student class with name and score fields. For each Student object, compute its score distance to threshold (score - threshold). Values may be negative. Print the distances separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print the score distances (score - threshold) separated by space, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "12 -5 12",
        "explanation": "Score distances from threshold: 12 -5 12."
      },
      {
        "input": "0 50",
        "output": "EMPTY",
        "explanation": "Score distances from threshold: EMPTY."
      },
      {
        "input": "1 100\nA 100",
        "output": "0",
        "explanation": "Score distances from threshold: 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "12 -5 12"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
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
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n    def distance_to_threshold(self, threshold: int) -> int:\n        return self.score - threshold\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print score - threshold for each student\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:sort-objects-by-distance-to-pass",
    "bankId": "T22-Q19",
    "slug": "sort-objects-by-distance-to-pass",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Sort Objects by Distance to Pass",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Define a Student class with name and score fields. Sort the student objects primarily by increasing distance to threshold (abs(score - threshold)). Break ties by descending score, then by original roster index. Print the student names separated by spaces, or EMPTY if empty.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print student names sorted by distance to pass, or EMPTY if empty.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "Bala Anu Charu",
        "explanation": "Student names sorted by distance to pass: Bala Anu Charu."
      },
      {
        "input": "0 50",
        "output": "EMPTY",
        "explanation": "Student names sorted by distance to pass: EMPTY."
      },
      {
        "input": "1 100\nA 100",
        "output": "A",
        "explanation": "Student names sorted by distance to pass: A."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "Bala Anu Charu"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "A"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int, index: int):\n        self.name = name\n        self.score = score\n        self.index = index\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print student names sorted by distance to pass\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-classes-objects:roster-grade-histogram",
    "bankId": "T22-Q20",
    "slug": "roster-grade-histogram",
    "topicId": "oop-classes-objects",
    "topicSlug": "oop-classes-objects",
    "topicTitle": "OOP — Classes & Objects",
    "title": "Roster Grade Histogram",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Define a Student class with name and score fields. Construct a grade histogram counting how many students earned each letter grade: A (≥90), B (80-89), C (70-79), D (60-69), and F (<60). Print the 5 counts for A, B, C, D, and F separated by spaces.",
    "inputFormat": "The first line contains two integers n and threshold. Each of the next n lines contains a student name and score.",
    "outputFormat": "Print counts for grades A, B, C, D, F separated by space.",
    "constraints": "0 ≤ n ≤ 10^4, 0 ≤ score, threshold ≤ 100",
    "examples": [
      {
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "output": "0 2 0 1 0",
        "explanation": "Grade histogram (A B C D F counts): 0 2 0 1 0."
      },
      {
        "input": "0 50",
        "output": "0 0 0 0 0",
        "explanation": "Grade histogram (A B C D F counts): 0 0 0 0 0."
      },
      {
        "input": "1 100\nA 100",
        "output": "1 0 0 0 0",
        "explanation": "Grade histogram (A B C D F counts): 1 0 0 0 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "3 70\nAnu 82\nBala 65\nCharu 82",
        "expectedOutput": "0 2 0 1 0"
      },
      {
        "testIndex": 2,
        "input": "0 50",
        "expectedOutput": "0 0 0 0 0"
      },
      {
        "testIndex": 3,
        "input": "1 100\nA 100",
        "expectedOutput": "1 0 0 0 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Student:\n    def __init__(self, name: str, score: int):\n        self.name = name\n        self.score = score\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n, threshold = int(data[0]), int(data[1])\n    # TODO: Print counts for grades A, B, C, D, F separated by space\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 2) {\n    const n = parseInt(data[0], 10), threshold = parseInt(data[1], 10);\n    // TODO: Write your solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int threshold = sc.nextInt();\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, threshold;\n    if (cin >> n >> threshold) {\n        // TODO: Write your solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
