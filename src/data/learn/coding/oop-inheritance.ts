import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:oop-inheritance:basic-overridden-double",
    "bankId": "T24-Q01",
    "slug": "basic-overridden-double",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Basic Overridden Double",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Define a class Base with a method compute() that returns a + b. Define a derived class Derived inheriting from Base that overrides compute() to return 2 * (a + b). Instantiate both Base and Derived with a and b, call compute() on each, and print the two resulting integers separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print two space-separated integers: Base.compute() and Derived.compute().",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "10 20",
        "explanation": "For a = 7 and b = 3, Base.compute() returns 7 + 3 = 10. Derived overrides compute() to return 2 * (7 + 3) = 20. The program prints \"10 20\"."
      },
      {
        "input": "0 5",
        "output": "5 10",
        "explanation": "For a = 0 and b = 5, Base.compute() returns 0 + 5 = 5. Derived overrides compute() to return 2 * (0 + 5) = 10. The program prints \"5 10\"."
      },
      {
        "input": "12 4",
        "output": "16 32",
        "explanation": "For a = 12 and b = 4, Base.compute() returns 12 + 4 = 16. Derived overrides compute() to return 2 * (12 + 4) = 32. The program prints \"16 32\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "10 20"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5 10"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16 32"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n\n    def compute(self):\n        # TODO: Return a + b\n        pass\n\nclass Derived(Base):\n    def compute(self):\n        # TODO: Override to return 2 * (a + b)\n        pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n    # TODO: Instantiate Base and Derived, call compute(), and print results\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:inherit-without-override",
    "bankId": "T24-Q02",
    "slug": "inherit-without-override",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Inherit Without Override",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Define a class Base with a method total() that returns a + b. Define a subclass Child that inherits from Base without overriding total(). Call total() on an instance of Base and an instance of Child, and print both results separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print two space-separated integers representing Base.total() and Child.total().",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "10 10",
        "explanation": "For a = 7 and b = 3, Base.total() returns 7 + 3 = 10. Child inherits total() directly without overriding it, so Child.total() also returns 10. Output is \"10 10\"."
      },
      {
        "input": "0 5",
        "output": "5 5",
        "explanation": "For a = 0 and b = 5, Base.total() returns 0 + 5 = 5. Child inherits total() directly without overriding it, so Child.total() also returns 5. Output is \"5 5\"."
      },
      {
        "input": "12 4",
        "output": "16 16",
        "explanation": "For a = 12 and b = 4, Base.total() returns 12 + 4 = 16. Child inherits total() directly without overriding it, so Child.total() also returns 16. Output is \"16 16\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "10 10"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5 5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16 16"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n\n    def total(self):\n        # TODO: Return sum a + b\n        pass\n\nclass Child(Base):\n    # TODO: Inherit without overriding\n    pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:override-changes-subtraction",
    "bankId": "T24-Q03",
    "slug": "override-changes-subtraction",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Override Changes Subtraction",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Define a class Base with a method evaluate() that returns a + b. Define a subclass Child that overrides evaluate() to return a - b. Call evaluate() on Base and Child instances, and print the two resulting integers separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print two space-separated integers: Base.evaluate() and Child.evaluate().",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "10 4",
        "explanation": "For a = 7 and b = 3, Base.evaluate() gives 7 + 3 = 10, while Child.evaluate() overrides it to compute 7 - 3 = 4. Output is \"10 4\"."
      },
      {
        "input": "0 5",
        "output": "5 -5",
        "explanation": "For a = 0 and b = 5, Base.evaluate() gives 0 + 5 = 5, while Child.evaluate() overrides it to compute 0 - 5 = -5. Output is \"5 -5\"."
      },
      {
        "input": "12 4",
        "output": "16 8",
        "explanation": "For a = 12 and b = 4, Base.evaluate() gives 12 + 4 = 16, while Child.evaluate() overrides it to compute 12 - 4 = 8. Output is \"16 8\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "10 4"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5 -5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16 8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n\n    def evaluate(self):\n        # TODO: Return a + b\n        pass\n\nclass Child(Base):\n    def evaluate(self):\n        # TODO: Override to return a - b\n        pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:super-method-extension",
    "bankId": "T24-Q04",
    "slug": "super-method-extension",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Super Method Extension",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Define a class Base with a method value() returning a * b. Define a subclass Child inheriting from Base whose value() method calls super().value() and adds a to the result. Print the returned integer from Child.value().",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer result returned by Child.value().",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "28",
        "explanation": "For a = 7 and b = 3, Base.value() calculates 7 * 3 = 21. Child.value() invokes super().value() + 7 = 21 + 7 = 28."
      },
      {
        "input": "0 5",
        "output": "0",
        "explanation": "For a = 0 and b = 5, Base.value() calculates 0 * 5 = 0. Child.value() invokes super().value() + 0 = 0 + 0 = 0."
      },
      {
        "input": "12 4",
        "output": "60",
        "explanation": "For a = 12 and b = 4, Base.value() calculates 12 * 4 = 48. Child.value() invokes super().value() + 12 = 48 + 12 = 60."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "28"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "60"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n\n    def value(self):\n        # TODO: Return a * b\n        pass\n\nclass Child(Base):\n    def value(self):\n        # TODO: Return super().value() + self.a\n        pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:three-level-method-chain",
    "bankId": "T24-Q05",
    "slug": "three-level-method-chain",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Three Level Method Chain",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Create a three-level inheritance chain: Base with f() returning a, Mid(Base) with f() returning super().f() + b, and Leaf(Mid) with f() returning 2 * super().f(). Print the results of Base.f(), Mid.f(), and Leaf.f() separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print three space-separated integers: Base.f(), Mid.f(), and Leaf.f().",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "7 10 20",
        "explanation": "For a = 7 and b = 3, Base.f() = 7. Mid.f() = super().f() + 3 = 10. Leaf.f() = 2 * super().f() = 2 * 10 = 20. The output is \"7 10 20\"."
      },
      {
        "input": "0 5",
        "output": "0 5 10",
        "explanation": "For a = 0 and b = 5, Base.f() = 0. Mid.f() = super().f() + 5 = 5. Leaf.f() = 2 * super().f() = 2 * 5 = 10. The output is \"0 5 10\"."
      },
      {
        "input": "12 4",
        "output": "12 16 32",
        "explanation": "For a = 12 and b = 4, Base.f() = 12. Mid.f() = super().f() + 4 = 16. Leaf.f() = 2 * super().f() = 2 * 16 = 32. The output is \"12 16 32\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "7 10 20"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "0 5 10"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "12 16 32"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n    def f(self):\n        pass\n\nclass Mid(Base):\n    def f(self):\n        pass\n\nclass Leaf(Mid):\n    def f(self):\n        pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:runtime-polymorphism",
    "bankId": "T24-Q06",
    "slug": "runtime-polymorphism",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Runtime Polymorphism",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input (provided for consistency). Define a class Base with a method label() returning \"base\", and a subclass Child(Base) that overrides label() to return \"child\". Construct a list [Base(), Child(), Base()], iterate over each object, invoke label(), and print the resulting labels separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the three labels separated by spaces: \"base child base\".",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "base child base",
        "explanation": "Iterating through the list of instances [Base(), Child(), Base()] calls each object's dynamic dispatch method: Base.label() returns \"base\", Child.label() returns \"child\", and Base.label() returns \"base\". Output is \"base child base\"."
      },
      {
        "input": "0 5",
        "output": "base child base",
        "explanation": "Iterating through the list of instances [Base(), Child(), Base()] calls each object's dynamic dispatch method: Base.label() returns \"base\", Child.label() returns \"child\", and Base.label() returns \"base\". Output is \"base child base\"."
      },
      {
        "input": "12 4",
        "output": "base child base",
        "explanation": "Iterating through the list of instances [Base(), Child(), Base()] calls each object's dynamic dispatch method: Base.label() returns \"base\", Child.label() returns \"child\", and Base.label() returns \"base\". Output is \"base child base\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "base child base"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "base child base"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "base child base"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def label(self):\n        return \"base\"\n\nclass Child(Base):\n    def label(self):\n        return \"child\"\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    # TODO: Create [Base(), Child(), Base()] and print their labels\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:constructor-field-inheritance",
    "bankId": "T24-Q07",
    "slug": "constructor-field-inheritance",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Constructor Field Inheritance",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Read two integers a and b from standard input. Define Base with constructor setting self.x = a and method total() returning self.x. Define Derived(Base) whose constructor calls super().__init__(a) and sets self.y = b, and whose total() returns self.x + self.y. Print Base.total() and Derived.total() separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print two space-separated integers: Base.total() and Derived.total().",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "7 10",
        "explanation": "For a = 7 and b = 3, Base.total() returns self.x = 7. Derived.total() returns self.x + self.y = 7 + 3 = 10. The output is \"7 10\"."
      },
      {
        "input": "0 5",
        "output": "0 5",
        "explanation": "For a = 0 and b = 5, Base.total() returns self.x = 0. Derived.total() returns self.x + self.y = 0 + 5 = 5. The output is \"0 5\"."
      },
      {
        "input": "12 4",
        "output": "12 16",
        "explanation": "For a = 12 and b = 4, Base.total() returns self.x = 12. Derived.total() returns self.x + self.y = 12 + 4 = 16. The output is \"12 16\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "7 10"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "0 5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "12 16"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, x):\n        self.x = x\n    def total(self):\n        pass\n\nclass Derived(Base):\n    def __init__(self, x, y):\n        super().__init__(x)\n        self.y = y\n    def total(self):\n        pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:overridden-property-of-shape",
    "bankId": "T24-Q08",
    "slug": "overridden-property-of-shape",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Overridden Property of Shape",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Define a class Rectangle with width a and height b whose method area() returns a * b. Define a subclass Square(Rectangle) initialized with side length a (passing a as both width and height to super) whose area() returns a * a. Print the rectangle area and square area separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print two space-separated integers: rectangle area and square area.",
    "constraints": "-10^4 ≤ a, b ≤ 10^4",
    "examples": [
      {
        "input": "7 3",
        "output": "21 49",
        "explanation": "For a = 7 and b = 3, the rectangle area is 7 * 3 = 21, and the square area with side 7 is 7 * 7 = 49. Output is \"21 49\"."
      },
      {
        "input": "0 5",
        "output": "0 0",
        "explanation": "For a = 0 and b = 5, the rectangle area is 0 * 5 = 0, and the square area with side 0 is 0 * 0 = 0. Output is \"0 0\"."
      },
      {
        "input": "12 4",
        "output": "48 144",
        "explanation": "For a = 12 and b = 4, the rectangle area is 12 * 4 = 48, and the square area with side 12 is 12 * 12 = 144. Output is \"48 144\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "21 49"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "0 0"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "48 144"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Rectangle:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n    def area(self):\n        pass\n\nclass Square(Rectangle):\n    def __init__(self, a):\n        super().__init__(a, a)\n    def area(self):\n        pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:parent-vs-child-multiplier",
    "bankId": "T24-Q09",
    "slug": "parent-vs-child-multiplier",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Parent vs Child Multiplier",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Define Base with method scale(x) returning x * a. Define Child(Base) that overrides scale(x) to return x * b. Evaluate scale(x) on an instance of Base and Child using x = a + b. Print the two resulting integers separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print two space-separated integers: Base.scale(a+b) and Child.scale(a+b).",
    "constraints": "-10^4 ≤ a, b ≤ 10^4",
    "examples": [
      {
        "input": "7 3",
        "output": "70 30",
        "explanation": "For a = 7 and b = 3, let x = 7 + 3 = 10. Base.scale(10) returns 10 * 7 = 70. Child.scale(10) returns 10 * 3 = 30. Output is \"70 30\"."
      },
      {
        "input": "0 5",
        "output": "0 25",
        "explanation": "For a = 0 and b = 5, let x = 0 + 5 = 5. Base.scale(5) returns 5 * 0 = 0. Child.scale(5) returns 5 * 5 = 25. Output is \"0 25\"."
      },
      {
        "input": "12 4",
        "output": "192 64",
        "explanation": "For a = 12 and b = 4, let x = 12 + 4 = 16. Base.scale(16) returns 16 * 12 = 192. Child.scale(16) returns 16 * 4 = 64. Output is \"192 64\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "70 30"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "0 25"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "192 64"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, a):\n        self.a = a\n    def scale(self, x):\n        pass\n\nclass Child(Base):\n    def __init__(self, b):\n        self.b = b\n    def scale(self, x):\n        pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:super-call-twice",
    "bankId": "T24-Q10",
    "slug": "super-call-twice",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Super Call Twice",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Define a class Base with a method f() returning a - b. Define Child(Base) where method f() calls super().f() twice and returns the sum of the two calls. Print the integer returned by Child.f().",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer result returned by Child.f().",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "8",
        "explanation": "For a = 7 and b = 3, Base.f() computes 7 - 3 = 4. Child.f() invokes super().f() + super().f() = 4 + 4 = 8."
      },
      {
        "input": "0 5",
        "output": "-10",
        "explanation": "For a = 0 and b = 5, Base.f() computes 0 - 5 = -5. Child.f() invokes super().f() + super().f() = -5 + -5 = -10."
      },
      {
        "input": "12 4",
        "output": "16",
        "explanation": "For a = 12 and b = 4, Base.f() computes 12 - 4 = 8. Child.f() invokes super().f() + super().f() = 8 + 8 = 16."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "8"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "-10"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n    def f(self):\n        pass\n\nclass Child(Base):\n    def f(self):\n        # TODO: Call super().f() twice and return their sum\n        pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:inherited-helper-used-by-override",
    "bankId": "T24-Q11",
    "slug": "inherited-helper-used-by-override",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Inherited Helper Used by Override",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Define a class Base with a helper method helper() that returns a * a. Define a subclass Derived(Base) with a method result() that returns self.helper() + b * b. Call Derived.result() and print the resulting integer.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer result returned by Derived.result().",
    "constraints": "-10^4 ≤ a, b ≤ 10^4",
    "examples": [
      {
        "input": "7 3",
        "output": "58",
        "explanation": "For a = 7 and b = 3, inherited self.helper() calculates 7 * 7 = 49. Then Derived.result() evaluates 49 + (3 * 3) = 58."
      },
      {
        "input": "0 5",
        "output": "25",
        "explanation": "For a = 0 and b = 5, inherited self.helper() calculates 0 * 0 = 0. Then Derived.result() evaluates 0 + (5 * 5) = 25."
      },
      {
        "input": "12 4",
        "output": "160",
        "explanation": "For a = 12 and b = 4, inherited self.helper() calculates 12 * 12 = 144. Then Derived.result() evaluates 144 + (4 * 4) = 160."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "58"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "25"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "160"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n    def helper(self):\n        pass\n\nclass Derived(Base):\n    def result(self):\n        # TODO: Return self.helper() + b * b\n        pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:derived-helper-overrides-parent-helper",
    "bankId": "T24-Q12",
    "slug": "derived-helper-overrides-parent-helper",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Derived Helper Overrides Parent Helper",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Define Base with helper() returning a, and compute() returning self.helper() + b. Define Child(Base) that overrides helper() to return 2 * a without modifying compute(). Print Base.compute() and Child.compute() separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print two space-separated integers: Base.compute() and Child.compute().",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "10 17",
        "explanation": "For a = 7 and b = 3, Base.compute() calls its own helper(), giving 7 + 3 = 10. In Child, polymorphic lookup resolves self.helper() to 2 * 7 = 14, so compute() returns 14 + 3 = 17. Output is \"10 17\"."
      },
      {
        "input": "0 5",
        "output": "5 5",
        "explanation": "For a = 0 and b = 5, Base.compute() calls its own helper(), giving 0 + 5 = 5. In Child, polymorphic lookup resolves self.helper() to 2 * 0 = 0, so compute() returns 0 + 5 = 5. Output is \"5 5\"."
      },
      {
        "input": "12 4",
        "output": "16 28",
        "explanation": "For a = 12 and b = 4, Base.compute() calls its own helper(), giving 12 + 4 = 16. In Child, polymorphic lookup resolves self.helper() to 2 * 12 = 24, so compute() returns 24 + 4 = 28. Output is \"16 28\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "10 17"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5 5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16 28"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n    def helper(self):\n        pass\n    def compute(self):\n        return self.helper() + self.b\n\nclass Child(Base):\n    def helper(self):\n        # TODO: Override to return 2 * a\n        pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:grandchild-uses-parent-override",
    "bankId": "T24-Q13",
    "slug": "grandchild-uses-parent-override",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Grandchild Uses Parent Override",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Define Base with f() returning a, Child(Base) overriding f() to return a + b, and Grandchild(Child) that does not override f(). Call f() on Child and Grandchild instances, and print the two resulting integers separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print two space-separated integers: Child.f() and Grandchild.f().",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "10 10",
        "explanation": "For a = 7 and b = 3, Child.f() overrides Base.f() to return 7 + 3 = 10. Grandchild inherits this override from Child, so Grandchild.f() also returns 10. Output is \"10 10\"."
      },
      {
        "input": "0 5",
        "output": "5 5",
        "explanation": "For a = 0 and b = 5, Child.f() overrides Base.f() to return 0 + 5 = 5. Grandchild inherits this override from Child, so Grandchild.f() also returns 5. Output is \"5 5\"."
      },
      {
        "input": "12 4",
        "output": "16 16",
        "explanation": "For a = 12 and b = 4, Child.f() overrides Base.f() to return 12 + 4 = 16. Grandchild inherits this override from Child, so Grandchild.f() also returns 16. Output is \"16 16\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "10 10"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5 5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16 16"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n    def f(self):\n        return self.a\n\nclass Child(Base):\n    def f(self):\n        # TODO: Override to return a + b\n        pass\n\nclass Grandchild(Child):\n    pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:class-hierarchy-type-flags",
    "bankId": "T24-Q14",
    "slug": "class-hierarchy-type-flags",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Class Hierarchy Type Flags",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input (provided for consistency). Define a class hierarchy Base, Child(Base), Grandchild(Child), and an unrelated class Other. Determine whether Grandchild is a subclass of Base, whether Other is a subclass of Base, and whether Child is a subclass of Child using issubclass(). Print the three boolean values separated by spaces.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print three space-separated booleans: \"True False True\".",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "True False True",
        "explanation": "Grandchild inherits from Child which inherits from Base, so issubclass(Grandchild, Base) is True. Other does not inherit from Base, so issubclass(Other, Base) is False. Every class is considered a subclass of itself in Python, so issubclass(Child, Child) is True. Output is \"True False True\"."
      },
      {
        "input": "0 5",
        "output": "True False True",
        "explanation": "Grandchild inherits from Child which inherits from Base, so issubclass(Grandchild, Base) is True. Other does not inherit from Base, so issubclass(Other, Base) is False. Every class is considered a subclass of itself in Python, so issubclass(Child, Child) is True. Output is \"True False True\"."
      },
      {
        "input": "12 4",
        "output": "True False True",
        "explanation": "Grandchild inherits from Child which inherits from Base, so issubclass(Grandchild, Base) is True. Other does not inherit from Base, so issubclass(Other, Base) is False. Every class is considered a subclass of itself in Python, so issubclass(Child, Child) is True. Output is \"True False True\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "True False True"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "True False True"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "True False True"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    pass\n\nclass Child(Base):\n    pass\n\nclass Grandchild(Child):\n    pass\n\nclass Other:\n    pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    # TODO: Print issubclass checks for (Grandchild, Base), (Other, Base), and (Child, Child)\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:template-method-dispatch",
    "bankId": "T24-Q15",
    "slug": "template-method-dispatch",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Template Method Dispatch",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Read two integers a and b from standard input. Define a class Base implementing the template method pattern: process() returns self.transform(a) + b, with default transform(x) returning x. Define Child(Base) that overrides transform(x) to return 2 * x. Print Base.process() and Child.process() separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print two space-separated integers: Base.process() and Child.process().",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "10 17",
        "explanation": "For a = 7 and b = 3, Base.process() computes transform(7) + 3 = 7 + 3 = 10. In Child, transform(7) is overridden to return 2 * 7 = 14, yielding 14 + 3 = 17. Output is \"10 17\"."
      },
      {
        "input": "0 5",
        "output": "5 5",
        "explanation": "For a = 0 and b = 5, Base.process() computes transform(0) + 5 = 0 + 5 = 5. In Child, transform(0) is overridden to return 2 * 0 = 0, yielding 0 + 5 = 5. Output is \"5 5\"."
      },
      {
        "input": "12 4",
        "output": "16 28",
        "explanation": "For a = 12 and b = 4, Base.process() computes transform(12) + 4 = 12 + 4 = 16. In Child, transform(12) is overridden to return 2 * 12 = 24, yielding 24 + 4 = 28. Output is \"16 28\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "10 17"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5 5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "16 28"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 12,
      "totalCount": 15
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n    def transform(self, x):\n        return x\n    def process(self):\n        return self.transform(self.a) + self.b\n\nclass Child(Base):\n    def transform(self, x):\n        # TODO: Override to return 2 * x\n        pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:override-with-conditional",
    "bankId": "T24-Q16",
    "slug": "override-with-conditional",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Override with Conditional",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. Define Base with method classify() returning \"positive\" if a > 0 else \"nonpositive\". Define Child(Base) overriding classify() to check if a + b > 0 instead, returning \"positive\" if true else \"nonpositive\". Print Base.classify() and Child.classify() separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print two space-separated strings: Base.classify() and Child.classify().",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "positive positive",
        "explanation": "For a = 7 and b = 3, Base.classify() checks a > 0 (7 > 0), giving \"positive\". Child.classify() checks a + b > 0 (10 > 0), giving \"positive\". Output is \"positive positive\"."
      },
      {
        "input": "0 5",
        "output": "nonpositive positive",
        "explanation": "For a = 0 and b = 5, Base.classify() checks a > 0 (0 > 0), giving \"nonpositive\". Child.classify() checks a + b > 0 (5 > 0), giving \"positive\". Output is \"nonpositive positive\"."
      },
      {
        "input": "-8 3",
        "output": "nonpositive nonpositive",
        "explanation": "For a = -8 and b = 3, Base.classify() checks a > 0 (-8 > 0), giving \"nonpositive\". Child.classify() checks a + b > 0 (-5 > 0), giving \"nonpositive\". Output is \"nonpositive nonpositive\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "positive positive"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "nonpositive positive"
      },
      {
        "testIndex": 3,
        "input": "-8 3",
        "expectedOutput": "nonpositive nonpositive"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n    def classify(self):\n        return \"positive\" if self.a > 0 else \"nonpositive\"\n\nclass Child(Base):\n    def classify(self):\n        # TODO: Return \"positive\" if self.a + self.b > 0 else \"nonpositive\"\n        pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:grandchild-super-chain",
    "bankId": "T24-Q17",
    "slug": "grandchild-super-chain",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Grandchild Super Chain",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. Define a three-level hierarchy: Base with f() returning a, Mid(Base) with f() returning super().f() + b, and Grandchild(Mid) with f() returning super().f() - a. Call f() on a Grandchild instance and print the resulting integer.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer result returned by Grandchild.f().",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "3",
        "explanation": "For a = 7 and b = 3, Base.f() is 7, Mid.f() is 7 + 3 = 10, and Grandchild.f() evaluates 10 - 7 = 3."
      },
      {
        "input": "0 5",
        "output": "5",
        "explanation": "For a = 0 and b = 5, Base.f() is 0, Mid.f() is 0 + 5 = 5, and Grandchild.f() evaluates 5 - 0 = 5."
      },
      {
        "input": "12 4",
        "output": "4",
        "explanation": "For a = 12 and b = 4, Base.f() is 12, Mid.f() is 12 + 4 = 16, and Grandchild.f() evaluates 16 - 12 = 4."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "3"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "5"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "4"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n    def f(self):\n        return self.a\n\nclass Mid(Base):\n    def f(self):\n        return super().f() + self.b\n\nclass Grandchild(Mid):\n    def f(self):\n        # TODO: Return super().f() - self.a\n        pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:cooperative-diamond-inheritance",
    "bankId": "T24-Q18",
    "slug": "cooperative-diamond-inheritance",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Cooperative Diamond Inheritance",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. Implement a cooperative diamond inheritance hierarchy in Python: class A has method f() returning a; class B(A) has f() returning super().f() + b; class C(A) has f() returning 2 * super().f(); and class D(B, C) has f() returning super().f() + 1. Following Python Method Resolution Order (MRO: D -> B -> C -> A), call D.f() and print the resulting integer.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the integer result returned by D.f().",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "18",
        "explanation": "By Python's C3 linearization MRO (D -> B -> C -> A), D.f() calls B.f(), which calls C.f(), which calls A.f() returning 7. C returns 2 * 7 = 14, B adds 3 to get 17, and D adds 1 to get 18."
      },
      {
        "input": "0 5",
        "output": "6",
        "explanation": "By Python's C3 linearization MRO (D -> B -> C -> A), D.f() calls B.f(), which calls C.f(), which calls A.f() returning 0. C returns 2 * 0 = 0, B adds 5 to get 5, and D adds 1 to get 6."
      },
      {
        "input": "12 4",
        "output": "29",
        "explanation": "By Python's C3 linearization MRO (D -> B -> C -> A), D.f() calls B.f(), which calls C.f(), which calls A.f() returning 12. C returns 2 * 12 = 24, B adds 4 to get 28, and D adds 1 to get 29."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "18"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "6"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "29"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass A:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n    def f(self):\n        return self.a\n\nclass C(A):\n    def f(self):\n        return 2 * super().f()\n\nclass B(A):\n    def f(self):\n        return super().f() + self.b\n\nclass D(B, C):\n    def f(self):\n        # TODO: Return super().f() + 1 following cooperative MRO\n        pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:subclass-method-calls-another-override",
    "bankId": "T24-Q19",
    "slug": "subclass-method-calls-another-override",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Subclass Method Calls Another Override",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. Define Base with method value() returning a, and double() returning 2 * self.value(). Define Child(Base) that overrides value() to return b, inheriting double() unchanged. Print Base.double() and Child.double() separated by a space.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print two space-separated integers: Base.double() and Child.double().",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "14 6",
        "explanation": "For a = 7 and b = 3, Base.double() calls self.value() = 7, yielding 2 * 7 = 14. For Child, polymorphic dispatch resolves self.value() to the overridden value 3, yielding 2 * 3 = 6. Output is \"14 6\"."
      },
      {
        "input": "0 5",
        "output": "0 10",
        "explanation": "For a = 0 and b = 5, Base.double() calls self.value() = 0, yielding 2 * 0 = 0. For Child, polymorphic dispatch resolves self.value() to the overridden value 5, yielding 2 * 5 = 10. Output is \"0 10\"."
      },
      {
        "input": "12 4",
        "output": "24 8",
        "explanation": "For a = 12 and b = 4, Base.double() calls self.value() = 12, yielding 2 * 12 = 24. For Child, polymorphic dispatch resolves self.value() to the overridden value 4, yielding 2 * 4 = 8. Output is \"24 8\"."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "14 6"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "0 10"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "24 8"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n    def value(self):\n        return self.a\n    def double(self):\n        return 2 * self.value()\n\nclass Child(Base):\n    def value(self):\n        # TODO: Override to return self.b\n        pass\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-inheritance:polymorphic-aggregate",
    "bankId": "T24-Q20",
    "slug": "polymorphic-aggregate",
    "topicId": "oop-inheritance",
    "topicSlug": "oop-inheritance",
    "topicTitle": "OOP — Inheritance",
    "title": "Polymorphic Aggregate",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Read two integers a and b from standard input. Define a hierarchy: Base with score() returning a, Child(Base) with score() returning a + b, and Grandchild(Child) with score() returning a + 2 * b. Instantiate [Base(a, b), Child(a, b), Grandchild(a, b)], iterate through them, sum the return values of score(), and print the total sum.",
    "inputFormat": "A single line containing two space-separated integers a and b.",
    "outputFormat": "Print the total integer sum of score() across the three instances.",
    "constraints": "-10^6 ≤ a, b ≤ 10^6",
    "examples": [
      {
        "input": "7 3",
        "output": "30",
        "explanation": "For a = 7 and b = 3, Base.score() = 7, Child.score() = 10, and Grandchild.score() = 13. The sum across all three polymorphic instances is 7 + 10 + 13 = 30."
      },
      {
        "input": "0 5",
        "output": "15",
        "explanation": "For a = 0 and b = 5, Base.score() = 0, Child.score() = 5, and Grandchild.score() = 10. The sum across all three polymorphic instances is 0 + 5 + 10 = 15."
      },
      {
        "input": "12 4",
        "output": "48",
        "explanation": "For a = 12 and b = 4, Base.score() = 12, Child.score() = 16, and Grandchild.score() = 20. The sum across all three polymorphic instances is 12 + 16 + 20 = 48."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "7 3",
        "expectedOutput": "30"
      },
      {
        "testIndex": 2,
        "input": "0 5",
        "expectedOutput": "15"
      },
      {
        "testIndex": 3,
        "input": "12 4",
        "expectedOutput": "48"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": true,
    "pythonOnlyNote": "This topic focuses on Python-specific language semantics.",
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Base:\n    def __init__(self, a, b):\n        self.a = a\n        self.b = b\n    def score(self):\n        return self.a\n\nclass Child(Base):\n    def score(self):\n        return self.a + self.b\n\nclass Grandchild(Child):\n    def score(self):\n        return self.a + 2 * self.b\n\ndef main():\n    parts = sys.stdin.read().split()\n    if not parts:\n        return\n    a, b = int(parts[0]), int(parts[1])\n    # TODO: Create instances and print sum of score()\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// This topic focuses on Python-specific inheritance semantics.",
      "java": "// This topic focuses on Python-specific inheritance semantics.",
      "cpp": "// This topic focuses on Python-specific inheritance semantics."
    },
    "inputMode": "plain",
  }
]
