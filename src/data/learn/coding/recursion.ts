import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:recursion:recursive-factorial",
    "bankId": "T17-Q01",
    "slug": "recursive-factorial",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Factorial",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Given an integer n, compute n! (factorial of n) recursively using the base case factorial(0) = 1. Print the result as an integer.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print n! as an integer.",
    "constraints": "0 ≤ n ≤ 20",
    "examples": [
      {
        "input": "5",
        "output": "120",
        "explanation": "Factorial of 5 is 120."
      },
      {
        "input": "0",
        "output": "1",
        "explanation": "Factorial of 0 is 1."
      },
      {
        "input": "8",
        "output": "40320",
        "explanation": "Factorial of 8 is 40320."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "120"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "40320"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef fact(n):\n    # TODO: Implement recursive factorial\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(fact(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-sum-through-n",
    "bankId": "T17-Q02",
    "slug": "recursive-sum-through-n",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Sum Through N",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Given an integer n, compute the sum of integers from 1 through n (1 + 2 + ... + n) recursively with S(0) = 0 and S(n) = n + S(n - 1). Print the sum as an integer.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print the sum 1 + ... + n as an integer.",
    "constraints": "0 ≤ n ≤ 1000",
    "examples": [
      {
        "input": "5",
        "output": "15",
        "explanation": "Sum 1 through 5 is 15."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Sum 1 through 0 is 0."
      },
      {
        "input": "8",
        "output": "36",
        "explanation": "Sum 1 through 8 is 36."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "15"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "36"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef rec_sum(n):\n    # TODO: Compute 1 + 2 + ... + n recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(rec_sum(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-fibonacci",
    "bankId": "T17-Q03",
    "slug": "recursive-fibonacci",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Fibonacci",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Given an integer n, compute the nth Fibonacci number F(n) recursively, where F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2). Print F(n) as an integer.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print F(n) as an integer.",
    "constraints": "0 ≤ n ≤ 30",
    "examples": [
      {
        "input": "5",
        "output": "5",
        "explanation": "Fibonacci number F(5) is 5."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Fibonacci number F(0) is 0."
      },
      {
        "input": "8",
        "output": "21",
        "explanation": "Fibonacci number F(8) is 21."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "21"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef fib(n):\n    # TODO: Compute F(n) recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(fib(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-powers-of-two",
    "bankId": "T17-Q04",
    "slug": "recursive-powers-of-two",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Powers of Two",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Given an integer n, compute 2^n recursively using power(0) = 1 and power(n) = 2 * power(n - 1). Print the result as an integer.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print 2^n as an integer.",
    "constraints": "0 ≤ n ≤ 30",
    "examples": [
      {
        "input": "5",
        "output": "32",
        "explanation": "2^5 = 32."
      },
      {
        "input": "0",
        "output": "1",
        "explanation": "2^0 = 1."
      },
      {
        "input": "8",
        "output": "256",
        "explanation": "2^8 = 256."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "32"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "256"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef power2(n):\n    # TODO: Compute 2^n recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(power2(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-sum-of-squares",
    "bankId": "T17-Q05",
    "slug": "recursive-sum-of-squares",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Sum of Squares",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Given an integer n, compute the sum of squares 1² + 2² + ... + n² recursively with base case 0 for n = 0. Print the sum as an integer.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print the sum of squares as an integer.",
    "constraints": "0 ≤ n ≤ 1000",
    "examples": [
      {
        "input": "5",
        "output": "55",
        "explanation": "Sum of squares 1² + ... + 5² is 55."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Sum of squares 1² + ... + 0² is 0."
      },
      {
        "input": "8",
        "output": "204",
        "explanation": "Sum of squares 1² + ... + 8² is 204."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "55"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "204"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef sum_sq(n):\n    # TODO: Compute 1^2 + ... + n^2 recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(sum_sq(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-digit-sum",
    "bankId": "T17-Q06",
    "slug": "recursive-digit-sum",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Digit Sum",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Given an integer n ≥ 0, compute the sum of its decimal digits recursively using n % 10 and n // 10. Print the digit sum as an integer.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print the sum of decimal digits of n.",
    "constraints": "0 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "5",
        "output": "5",
        "explanation": "Digit sum of 5 is 5."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Digit sum of 0 is 0."
      },
      {
        "input": "8",
        "output": "8",
        "explanation": "Digit sum of 8 is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef digit_sum(n):\n    # TODO: Compute sum of digits recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(digit_sum(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-digit-product",
    "bankId": "T17-Q07",
    "slug": "recursive-digit-product",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Digit Product",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Given an integer n ≥ 0, compute the product of its decimal digits recursively. The product of digits in 0 is 0. Print the digit product as an integer.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print the product of decimal digits of n.",
    "constraints": "0 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "5",
        "output": "5",
        "explanation": "Product of digits of 5 is 5."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Product of digits of 0 is 0."
      },
      {
        "input": "8",
        "output": "8",
        "explanation": "Product of digits of 8 is 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef digit_prod(n):\n    # TODO: Compute product of digits recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(digit_prod(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-digit-count",
    "bankId": "T17-Q08",
    "slug": "recursive-digit-count",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Digit Count",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Given an integer n ≥ 0, count the number of decimal digits recursively using repeated division by 10. Note that 0 has 1 digit. Print the count as an integer.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print the number of digits in n.",
    "constraints": "0 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "5",
        "output": "1",
        "explanation": "Number of decimal digits in 5 is 1."
      },
      {
        "input": "10",
        "output": "2",
        "explanation": "Number of decimal digits in 10 is 2."
      },
      {
        "input": "0",
        "output": "1",
        "explanation": "Number of decimal digits in 0 is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "10",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef count_digits(n):\n    # TODO: Count digits of n recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(count_digits(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-reverse-digits",
    "bankId": "T17-Q09",
    "slug": "recursive-reverse-digits",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Reverse Digits",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Given an integer n ≥ 0, reverse its decimal digits recursively and return the resulting integer (dropping any leading zeroes). Print the reversed integer.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print the integer formed by reversing digits of n.",
    "constraints": "0 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "5",
        "output": "5",
        "explanation": "Reversing digits of 5 yields 5."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Reversing digits of 0 yields 0."
      },
      {
        "input": "8",
        "output": "8",
        "explanation": "Reversing digits of 8 yields 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef rev(n):\n    # TODO: Reverse digits of n recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(rev(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-numeric-palindrome",
    "bankId": "T17-Q10",
    "slug": "recursive-numeric-palindrome",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Numeric Palindrome",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Given an integer n ≥ 0, determine whether its decimal digits read the same forward and backward (palindrome) recursively. Print true or false.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print true if n is a palindrome, else false.",
    "constraints": "0 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "5",
        "output": "true",
        "explanation": "Is 5 a decimal palindrome? true."
      },
      {
        "input": "10",
        "output": "false",
        "explanation": "Is 10 a decimal palindrome? false."
      },
      {
        "input": "0",
        "output": "true",
        "explanation": "Is 0 a decimal palindrome? true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "10",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef is_palindrome(s):\n    # TODO: Check if palindrome recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    print(\"true\" if is_palindrome(data[0]) else \"false\")\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-binary-string",
    "bankId": "T17-Q11",
    "slug": "recursive-binary-string",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Binary String",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Given an integer n ≥ 0, compute its binary string representation recursively using n % 2 and n // 2. For n = 0, print 0. Print the binary string.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print the binary representation of n.",
    "constraints": "0 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "5",
        "output": "101",
        "explanation": "Binary representation of 5 is 101."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Binary representation of 0 is 0."
      },
      {
        "input": "8",
        "output": "1000",
        "explanation": "Binary representation of 8 is 1000."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "101"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "1000"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef to_bin(n):\n    # TODO: Compute binary string recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(to_bin(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-count-set-bits",
    "bankId": "T17-Q12",
    "slug": "recursive-count-set-bits",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Count Set Bits",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Given an integer n ≥ 0, count the number of set bits (1 bits) in its binary representation recursively using n % 2 and n // 2. Print the count as an integer.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print the count of set bits in n.",
    "constraints": "0 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "5",
        "output": "2",
        "explanation": "Count of 1 bits in 5 is 2."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Count of 1 bits in 0 is 0."
      },
      {
        "input": "8",
        "output": "1",
        "explanation": "Count of 1 bits in 8 is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "2"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
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
      "python": "# Language: Python 3\nimport sys\n\ndef count_bits(n):\n    # TODO: Count set bits recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(count_bits(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-count-down-list",
    "bankId": "T17-Q13",
    "slug": "recursive-count-down-list",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Count Down List",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Given an integer n ≥ 0, generate the countdown sequence n, n-1, ..., 0 recursively. Print the integers separated by spaces.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print the countdown numbers from n to 0 separated by space.",
    "constraints": "0 ≤ n ≤ 1000",
    "examples": [
      {
        "input": "5",
        "output": "5 4 3 2 1 0",
        "explanation": "Countdown from 5: 5 4 3 2 1 0."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Countdown from 0: 0."
      },
      {
        "input": "8",
        "output": "8 7 6 5 4 3 2 1 0",
        "explanation": "Countdown from 8: 8 7 6 5 4 3 2 1 0."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "5 4 3 2 1 0"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "8 7 6 5 4 3 2 1 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef countdown(n):\n    # TODO: Build countdown list recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(\" \".join(str(x) for x in countdown(n)))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-count-up-list",
    "bankId": "T17-Q14",
    "slug": "recursive-count-up-list",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Count Up List",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Given an integer n ≥ 0, generate the count-up sequence 0, 1, ..., n recursively using the unwind phase of recursion. Print the integers separated by spaces.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print the count-up numbers from 0 to n separated by space.",
    "constraints": "0 ≤ n ≤ 1000",
    "examples": [
      {
        "input": "5",
        "output": "0 1 2 3 4 5",
        "explanation": "Count-up to 5: 0 1 2 3 4 5."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Count-up to 0: 0."
      },
      {
        "input": "8",
        "output": "0 1 2 3 4 5 6 7 8",
        "explanation": "Count-up to 8: 0 1 2 3 4 5 6 7 8."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "0 1 2 3 4 5"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "0 1 2 3 4 5 6 7 8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef countup(n):\n    # TODO: Build count-up list recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(\" \".join(str(x) for x in countup(n)))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-palindrome-of-binary-digits",
    "bankId": "T17-Q15",
    "slug": "recursive-palindrome-of-binary-digits",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Palindrome of Binary Digits",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Given an integer n ≥ 0, determine whether the binary representation of n is a palindrome recursively. Print true or false.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print true if the binary representation is a palindrome, else false.",
    "constraints": "0 ≤ n ≤ 10^9",
    "examples": [
      {
        "input": "5",
        "output": "true",
        "explanation": "Is binary representation of 5 a palindrome? true."
      },
      {
        "input": "8",
        "output": "false",
        "explanation": "Is binary representation of 8 a palindrome? false."
      },
      {
        "input": "0",
        "output": "true",
        "explanation": "Is binary representation of 0 a palindrome? true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "8",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "0",
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
      "python": "# Language: Python 3\nimport sys\n\ndef is_bin_pal(n):\n    # TODO: Check if bin(n) is palindrome recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(\"true\" if is_bin_pal(n) else \"false\")\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:count-one-or-two-step-stairways",
    "bankId": "T17-Q16",
    "slug": "count-one-or-two-step-stairways",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Count One or Two Step Stairways",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Given an integer n ≥ 0 representing the number of stairs, count the number of distinct ways to climb to the top taking steps of size 1 or 2 recursively. Note that for n = 0 there is 1 way (doing nothing). Print the count as an integer.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print the number of ways to climb n stairs.",
    "constraints": "0 ≤ n ≤ 30",
    "examples": [
      {
        "input": "5",
        "output": "8",
        "explanation": "Distinct ways to climb 5 steps (1 or 2 steps): 8."
      },
      {
        "input": "0",
        "output": "1",
        "explanation": "Distinct ways to climb 0 steps (1 or 2 steps): 1."
      },
      {
        "input": "8",
        "output": "34",
        "explanation": "Distinct ways to climb 8 steps (1 or 2 steps): 34."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "34"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef climb(n):\n    # TODO: Count ways to climb with steps 1 or 2 recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(climb(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:count-one-two-or-three-step-stairways",
    "bankId": "T17-Q17",
    "slug": "count-one-two-or-three-step-stairways",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Count One Two or Three Step Stairways",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Given an integer n ≥ 0 representing the number of stairs, count the number of distinct ways to climb to the top taking steps of size 1, 2, or 3 recursively. For n = 0, there is 1 way. Print the count as an integer.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print the number of ways to climb n stairs.",
    "constraints": "0 ≤ n ≤ 30",
    "examples": [
      {
        "input": "5",
        "output": "13",
        "explanation": "Distinct ways to climb 5 steps (1, 2, or 3 steps): 13."
      },
      {
        "input": "0",
        "output": "1",
        "explanation": "Distinct ways to climb 0 steps (1, 2, or 3 steps): 1."
      },
      {
        "input": "8",
        "output": "81",
        "explanation": "Distinct ways to climb 8 steps (1, 2, or 3 steps): 81."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "13"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "81"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef climb3(n):\n    # TODO: Count ways to climb with steps 1, 2, or 3 recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(climb3(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-catalan-number",
    "bankId": "T17-Q18",
    "slug": "recursive-catalan-number",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Catalan Number",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Given an integer n ≥ 0, compute the nth Catalan number C_n recursively using C_0 = 1 and C_n = sum(C_i * C_{n-1-i}) for i from 0 to n-1. Print C_n as an integer.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print the nth Catalan number as an integer.",
    "constraints": "0 ≤ n ≤ 15",
    "examples": [
      {
        "input": "5",
        "output": "42",
        "explanation": "Catalan number C_5 is 42."
      },
      {
        "input": "0",
        "output": "1",
        "explanation": "Catalan number C_0 is 1."
      },
      {
        "input": "8",
        "output": "1430",
        "explanation": "Catalan number C_8 is 1430."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "42"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "1430"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef catalan(n):\n    # TODO: Compute nth Catalan number recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(catalan(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:central-binomial-coefficient",
    "bankId": "T17-Q19",
    "slug": "central-binomial-coefficient",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Central Binomial Coefficient",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Given an integer n ≥ 0, compute the central binomial coefficient (n choose floor(n / 2)) using Pascal recursion: C(n, k) = C(n-1, k-1) + C(n-1, k) with C(n, 0) = C(n, n) = 1. Print the value as an integer.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print n choose floor(n / 2) as an integer.",
    "constraints": "0 ≤ n ≤ 25",
    "examples": [
      {
        "input": "5",
        "output": "10",
        "explanation": "Central binomial coefficient for n = 5 is 10."
      },
      {
        "input": "0",
        "output": "1",
        "explanation": "Central binomial coefficient for n = 0 is 1."
      },
      {
        "input": "8",
        "output": "70",
        "explanation": "Central binomial coefficient for n = 8 is 70."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "1"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "70"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef central_binomial(n):\n    # TODO: Compute n choose floor(n/2) recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(central_binomial(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:recursion:recursive-tribonacci-sequence",
    "bankId": "T17-Q20",
    "slug": "recursive-tribonacci-sequence",
    "topicId": "recursion",
    "topicSlug": "recursion",
    "topicTitle": "Recursion",
    "title": "Recursive Tribonacci Sequence",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Given an integer n ≥ 0, compute the nth Tribonacci number T(n) recursively, where T(0) = 0, T(1) = 1, T(2) = 1, and T(n) = T(n-1) + T(n-2) + T(n-3). Print T(n) as an integer.",
    "inputFormat": "The first line contains an integer n.",
    "outputFormat": "Print T(n) as an integer.",
    "constraints": "0 ≤ n ≤ 30",
    "examples": [
      {
        "input": "5",
        "output": "7",
        "explanation": "Tribonacci number T(5) is 7."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Tribonacci number T(0) is 0."
      },
      {
        "input": "8",
        "output": "44",
        "explanation": "Tribonacci number T(8) is 44."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "5",
        "expectedOutput": "7"
      },
      {
        "testIndex": 2,
        "input": "0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "8",
        "expectedOutput": "44"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef trib(n):\n    # TODO: Compute nth Tribonacci number recursively\n    pass\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    print(trib(n))\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (data.length >= 1 && data[0] !== '') {\n    const n = parseInt(data[0], 10);\n    // TODO: Write your recursive solution here\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        // TODO: Write your recursive solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        // TODO: Write your recursive solution here\n    }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
