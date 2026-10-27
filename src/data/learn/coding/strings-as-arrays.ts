import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:strings-as-arrays:length-by-character-traversal",
    "bankId": "T09-Q01",
    "slug": "length-by-character-traversal",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Length by Character Traversal",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Read a single line of text from standard input. Count and print the total number of characters in the string.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the integer character count.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "9",
        "explanation": "The string \"algorithm\" has length 9."
      },
      {
        "input": "",
        "output": "0",
        "explanation": "The string \"\" has length 0."
      },
      {
        "input": "a",
        "output": "1",
        "explanation": "The string \"a\" has length 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "9"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "a",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:reverse-characters",
    "bankId": "T09-Q02",
    "slug": "reverse-characters",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Reverse Characters",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Read a single line of text from standard input. Reverse the characters of the string and print the reversed string.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the reversed string.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "mhtirogla",
        "explanation": "Reversing \"algorithm\" yields \"mhtirogla\"."
      },
      {
        "input": "",
        "output": "",
        "explanation": "Reversing \"\" yields \"\"."
      },
      {
        "input": "a",
        "output": "a",
        "explanation": "Reversing \"a\" yields \"a\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "mhtirogla"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": ""
      },
      {
        "testIndex": 3,
        "input": "a",
        "expectedOutput": "a"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:count-vowel-characters",
    "bankId": "T09-Q03",
    "slug": "count-vowel-characters",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Count Vowel Characters",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Read a single line of text from standard input. Count and print the number of vowel characters (a, e, i, o, u, case-insensitive) in the string.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the count of vowel characters.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "3",
        "explanation": "\"algorithm\" contains 3 vowel(s)."
      },
      {
        "input": "",
        "output": "0",
        "explanation": "\"\" contains 0 vowel(s)."
      },
      {
        "input": "a",
        "output": "1",
        "explanation": "\"a\" contains 1 vowel(s)."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "a",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:count-consonant-characters",
    "bankId": "T09-Q04",
    "slug": "count-consonant-characters",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Count Consonant Characters",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Read a single line of text from standard input. Count and print the number of consonant letters (alphabetic letters not in {a, e, i, o, u}, case-insensitive) in the string.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the count of consonant characters.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "6",
        "explanation": "\"algorithm\" contains 6 consonant(s)."
      },
      {
        "input": "",
        "output": "0",
        "explanation": "\"\" contains 0 consonant(s)."
      },
      {
        "input": "racecar",
        "output": "4",
        "explanation": "\"racecar\" contains 4 consonant(s)."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "6"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "racecar",
        "expectedOutput": "4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:palindrome-string",
    "bankId": "T09-Q05",
    "slug": "palindrome-string",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Palindrome String",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Read a single line of text from standard input. Determine whether the string is a palindrome (reads identically forwards and backwards). Print \"true\" if it is, or \"false\" otherwise.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print \"true\" if the string is a palindrome, otherwise \"false\".",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "false",
        "explanation": "\"algorithm\" is a palindrome: false."
      },
      {
        "input": "",
        "output": "true",
        "explanation": "\"\" is a palindrome: true."
      },
      {
        "input": "a",
        "output": "true",
        "explanation": "\"a\" is a palindrome: true."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "false"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": "true"
      },
      {
        "testIndex": 3,
        "input": "a",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:first-character-or-null",
    "bankId": "T09-Q06",
    "slug": "first-character-or-null",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "First Character or Null",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Read a single line of text from standard input. Print the first character of the string. If the string is empty, print null.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the first character, or null if empty.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "a",
        "explanation": "First character of \"algorithm\" is a."
      },
      {
        "input": "",
        "output": "null",
        "explanation": "The string is empty, so first character is null."
      },
      {
        "input": "racecar",
        "output": "r",
        "explanation": "First character of \"racecar\" is r."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "a"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "racecar",
        "expectedOutput": "r"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:last-character-or-null",
    "bankId": "T09-Q07",
    "slug": "last-character-or-null",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Last Character or Null",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Read a single line of text from standard input. Print the last character of the string. If the string is empty, print null.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the last character, or null if empty.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "m",
        "explanation": "Last character of \"algorithm\" is m."
      },
      {
        "input": "",
        "output": "null",
        "explanation": "The string is empty, so last character is null."
      },
      {
        "input": "a",
        "output": "a",
        "explanation": "Last character of \"a\" is a."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "m"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "a",
        "expectedOutput": "a"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:unique-characters-first-seen",
    "bankId": "T09-Q08",
    "slug": "unique-characters-first-seen",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Unique Characters First Seen",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Read a single line of text from standard input. Construct and print a new string containing the unique characters of the input in the order they first appear.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the string of unique characters in first-appearance order.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "algorithm",
        "explanation": "Unique characters of \"algorithm\" in order of appearance: \"algorithm\"."
      },
      {
        "input": "",
        "output": "",
        "explanation": "Unique characters of \"\" in order of appearance: \"\"."
      },
      {
        "input": "a",
        "output": "a",
        "explanation": "Unique characters of \"a\" in order of appearance: \"a\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "algorithm"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": ""
      },
      {
        "testIndex": 3,
        "input": "a",
        "expectedOutput": "a"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:sorted-unique-characters",
    "bankId": "T09-Q09",
    "slug": "sorted-unique-characters",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Sorted Unique Characters",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Read a single line of text from standard input. Find all unique characters in the string, sort them in ascending ASCII order, and print the resulting string.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the sorted string of unique characters.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "aghilmort",
        "explanation": "Sorted distinct characters of \"algorithm\": \"aghilmort\"."
      },
      {
        "input": "",
        "output": "",
        "explanation": "Sorted distinct characters of \"\": \"\"."
      },
      {
        "input": "a",
        "output": "a",
        "explanation": "Sorted distinct characters of \"a\": \"a\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "aghilmort"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": ""
      },
      {
        "testIndex": 3,
        "input": "a",
        "expectedOutput": "a"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:first-nonrepeating-character",
    "bankId": "T09-Q10",
    "slug": "first-nonrepeating-character",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "First Nonrepeating Character",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Read a single line of text from standard input. Find the first character that occurs exactly once in the string. If no unique character exists, print null.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the first non-repeating character, or null if none exists.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "a",
        "explanation": "First non-repeating character in \"algorithm\" is a."
      },
      {
        "input": "",
        "output": "null",
        "explanation": "First non-repeating character in \"\" is null."
      },
      {
        "input": "racecar",
        "output": "e",
        "explanation": "First non-repeating character in \"racecar\" is e."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "a"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": "null"
      },
      {
        "testIndex": 3,
        "input": "racecar",
        "expectedOutput": "e"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:run-length-character-groups",
    "bankId": "T09-Q11",
    "slug": "run-length-character-groups",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Run Length Character Groups",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Read a single line of text from standard input. Perform run-length grouping on consecutive identical characters, and print each run as \"char count\" space-separated on a single line. If the string is empty, print \"EMPTY\".",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print \"char count\" pairs space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "a 1 l 1 g 1 o 1 r 1 i 1 t 1 h 1 m 1",
        "explanation": "Run-length grouping of \"algorithm\": a 1 l 1 g 1 o 1 r 1 i 1 t 1 h 1 m 1."
      },
      {
        "input": "",
        "output": "EMPTY",
        "explanation": "String is empty, output is EMPTY."
      },
      {
        "input": "a",
        "output": "a 1",
        "explanation": "Run-length grouping of \"a\": a 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "a 1 l 1 g 1 o 1 r 1 i 1 t 1 h 1 m 1"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "a",
        "expectedOutput": "a 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:alphabet-position-sum",
    "bankId": "T09-Q12",
    "slug": "alphabet-position-sum",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Alphabet Position Sum",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Read a single line of text from standard input. Treating lowercase letters a=1, b=2, ..., z=26, compute and print the sum of letter positions for all lowercase alphabetic characters in the string. (Ignore other characters).",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the total alphabet position sum.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "103",
        "explanation": "Sum of alphabet positions in \"algorithm\" is 103."
      },
      {
        "input": "",
        "output": "0",
        "explanation": "Sum of alphabet positions in \"\" is 0."
      },
      {
        "input": "a",
        "output": "1",
        "explanation": "Sum of alphabet positions in \"a\" is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "103"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "a",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:character-frequency-sorted",
    "bankId": "T09-Q13",
    "slug": "character-frequency-sorted",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Character Frequency Sorted",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Read a single line of text from standard input. Count the frequency of each distinct character, and print them as \"char count\" space-separated on a single line in ascending ASCII order of character. If the string is empty, print \"EMPTY\".",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print \"char count\" pairs sorted by character, or \"EMPTY\".",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "a 1 g 1 h 1 i 1 l 1 m 1 o 1 r 1 t 1",
        "explanation": "Frequencies in \"algorithm\": a 1 g 1 h 1 i 1 l 1 m 1 o 1 r 1 t 1."
      },
      {
        "input": "",
        "output": "EMPTY",
        "explanation": "String is empty, output is EMPTY."
      },
      {
        "input": "a",
        "output": "a 1",
        "explanation": "Frequencies in \"a\": a 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "a 1 g 1 h 1 i 1 l 1 m 1 o 1 r 1 t 1"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": "EMPTY"
      },
      {
        "testIndex": 3,
        "input": "a",
        "expectedOutput": "a 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:adjacent-equal-pair-count",
    "bankId": "T09-Q14",
    "slug": "adjacent-equal-pair-count",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Adjacent Equal Pair Count",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Read a single line of text from standard input. Count and print how many indices i satisfy text[i] == text[i+1] (adjacent equal character pairs).",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the count of adjacent equal pairs.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "0",
        "explanation": "In \"algorithm\", there are 0 adjacent equal pair(s)."
      },
      {
        "input": "aaaa",
        "output": "3",
        "explanation": "In \"aaaa\", there are 3 adjacent equal pair(s)."
      },
      {
        "input": "hello",
        "output": "1",
        "explanation": "In \"hello\", there are 1 adjacent equal pair(s)."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "aaaa",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "hello",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:mirror-pair-matches",
    "bankId": "T09-Q15",
    "slug": "mirror-pair-matches",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Mirror Pair Matches",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Read a single line of text from standard input. Compare text[i] and text[n - 1 - i] for all i < n // 2. Count and print how many mirror pairs match.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the count of matching mirror pairs.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "0",
        "explanation": "In \"algorithm\", there are 0 matching mirror pair(s)."
      },
      {
        "input": "aaaa",
        "output": "2",
        "explanation": "In \"aaaa\", there are 2 matching mirror pair(s)."
      },
      {
        "input": "racecar",
        "output": "3",
        "explanation": "In \"racecar\", there are 3 matching mirror pair(s)."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "aaaa",
        "expectedOutput": "2"
      },
      {
        "testIndex": 3,
        "input": "racecar",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:longest-equal-character-run",
    "bankId": "T09-Q16",
    "slug": "longest-equal-character-run",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Longest Equal Character Run",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Read a single line of text from standard input. Find the maximum length of an uninterrupted run of the same character. If the string is empty, print 0.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the maximum run length of identical characters.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "1",
        "explanation": "Longest run of repeated characters in \"algorithm\" is 1."
      },
      {
        "input": "",
        "output": "0",
        "explanation": "Longest run of repeated characters in \"\" is 0."
      },
      {
        "input": "aaaa",
        "output": "4",
        "explanation": "Longest run of repeated characters in \"aaaa\" is 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "aaaa",
        "expectedOutput": "4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:rotate-first-letter-to-end",
    "bankId": "T09-Q17",
    "slug": "rotate-first-letter-to-end",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Rotate First Letter to End",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Read a single line of text from standard input. Move the first character of the string to the end (cyclically rotate left by 1), and print the resulting string. If the string is empty, print an empty line.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the rotated string.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "lgorithma",
        "explanation": "Moving first character of \"algorithm\" to the end gives \"lgorithma\"."
      },
      {
        "input": "",
        "output": "",
        "explanation": "Moving first character of \"\" to the end gives \"\"."
      },
      {
        "input": "a",
        "output": "a",
        "explanation": "Moving first character of \"a\" to the end gives \"a\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "lgorithma"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": ""
      },
      {
        "testIndex": 3,
        "input": "a",
        "expectedOutput": "a"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:reverse-each-two-character-block",
    "bankId": "T09-Q18",
    "slug": "reverse-each-two-character-block",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Reverse Each Two Character Block",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Read a single line of text from standard input. Swap characters within successive non-overlapping pairs (text[0] with text[1], text[2] with text[3], etc.). If the string length is odd, leave the final character unchanged. Print the resulting string.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the transformed string.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "laogirhtm",
        "explanation": "Swapping pairs in \"algorithm\" gives \"laogirhtm\"."
      },
      {
        "input": "",
        "output": "",
        "explanation": "Swapping pairs in \"\" gives \"\"."
      },
      {
        "input": "a",
        "output": "a",
        "explanation": "Swapping pairs in \"a\" gives \"a\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "laogirhtm"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": ""
      },
      {
        "testIndex": 3,
        "input": "a",
        "expectedOutput": "a"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:longest-proper-prefix-suffix",
    "bankId": "T09-Q19",
    "slug": "longest-proper-prefix-suffix",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Longest Proper Prefix Suffix",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Read a single line of text from standard input. Find the length of the longest proper prefix of the string that is also a suffix (a proper prefix cannot equal the entire string). If no such prefix-suffix exists, print 0.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the length of the longest proper prefix that is also a suffix.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "0",
        "explanation": "Longest proper prefix-suffix length for \"algorithm\" is 0."
      },
      {
        "input": "aaaa",
        "output": "3",
        "explanation": "Longest proper prefix-suffix length for \"aaaa\" is 3."
      },
      {
        "input": "racecar",
        "output": "1",
        "explanation": "Longest proper prefix-suffix length for \"racecar\" is 1."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "0"
      },
      {
        "testIndex": 2,
        "input": "aaaa",
        "expectedOutput": "3"
      },
      {
        "testIndex": 3,
        "input": "racecar",
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
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:strings-as-arrays:lexicographically-smallest-rotation",
    "bankId": "T09-Q20",
    "slug": "lexicographically-smallest-rotation",
    "topicId": "strings-as-arrays",
    "topicSlug": "strings-as-arrays",
    "topicTitle": "Strings as Arrays",
    "title": "Lexicographically Smallest Rotation",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Read a single line of text from standard input. Find and print the lexicographically smallest cyclic rotation of the string. If the string is empty, print an empty line.",
    "inputFormat": "A single line containing a string text.",
    "outputFormat": "Print the lexicographically smallest rotation.",
    "constraints": "0 ≤ length(text) ≤ 10^5",
    "examples": [
      {
        "input": "algorithm",
        "output": "algorithm",
        "explanation": "Smallest rotation of \"algorithm\" is \"algorithm\"."
      },
      {
        "input": "",
        "output": "",
        "explanation": "Smallest rotation of \"\" is \"\"."
      },
      {
        "input": "a",
        "output": "a",
        "explanation": "Smallest rotation of \"a\" is \"a\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "algorithm",
        "expectedOutput": "algorithm"
      },
      {
        "testIndex": 2,
        "input": "",
        "expectedOutput": ""
      },
      {
        "testIndex": 3,
        "input": "a",
        "expectedOutput": "a"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    # TODO: Write your solution here\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n// TODO: Write your solution here\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        // TODO: Write your solution here\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    // TODO: Write your solution here\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
