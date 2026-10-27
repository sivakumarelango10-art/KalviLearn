import type { LearnQuestion } from './types'

export const questions: LearnQuestion[] = [
  {
    "id": "learn:oop-methods:counter-increment-and-decrement",
    "bankId": "T23-Q01",
    "slug": "counter-increment-and-decrement",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Counter Increment and Decrement",
    "order": 1,
    "difficulty": "Easy",
    "problemStatement": "Design a Counter class initialized with an integer value. Implement two methods: increment(v) which adds v to the counter, and decrement(v) which subtracts v from the counter. Read the initial value and a sequence of commands, execute them in order, and print the final counter value.",
    "inputFormat": "The first line contains two integers: initial (the starting counter value) and q (the number of commands). The next q lines each contain a command in the format \"method value\", where method is either \"increment\" or \"decrement\".",
    "outputFormat": "Print the final integer counter value.",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\nincrement 3\ndecrement 4\nincrement 2\ndecrement 1",
        "output": "10",
        "explanation": "Starting at 10, processing all increment/decrement commands yields final counter value 10."
      },
      {
        "input": "0 0",
        "output": "0",
        "explanation": "Starting at 0, processing all increment/decrement commands yields final counter value 0."
      },
      {
        "input": "1 1\nincrement 1",
        "output": "2",
        "explanation": "Starting at 1, processing all increment/decrement commands yields final counter value 2."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\nincrement 3\ndecrement 4\nincrement 2\ndecrement 1",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 1\nincrement 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Counter:\n    def __init__(self, initial: int):\n        # TODO: Initialize counter\n        self.val = initial\n\n    def increment(self, v: int):\n        # TODO: Implement increment\n        pass\n\n    def decrement(self, v: int):\n        # TODO: Implement decrement\n        pass\n\n    def get_value(self) -> int:\n        return self.val\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    initial = int(lines[0])\n    q = int(lines[1])\n    counter = Counter(initial)\n    idx = 2\n    for _ in range(q):\n        m = lines[idx]; v = int(lines[idx+1]); idx += 2\n        if m == 'increment': counter.increment(v)\n        elif m == 'decrement': counter.decrement(v)\n    print(counter.get_value())\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\n\nclass Counter {\n    constructor(initial) {\n        this.val = initial;\n    }\n    increment(v) { /* TODO */ }\n    decrement(v) { /* TODO */ }\n    getValue() { return this.val; }\n}\n\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const initial = parseInt(tokens[0], 10);\n    const q = parseInt(tokens[1], 10);\n    const counter = new Counter(initial);\n    let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'increment') counter.increment(v);\n        else if (m === 'decrement') counter.decrement(v);\n    }\n    console.log(counter.getValue());\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\nclass Counter {\n    private int val;\n    public Counter(int initial) { this.val = initial; }\n    public void increment(int v) { /* TODO */ }\n    public void decrement(int v) { /* TODO */ }\n    public int getValue() { return val; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int initial = sc.nextInt();\n        int q = sc.nextInt();\n        Counter counter = new Counter(initial);\n        for (int i = 0; i < q; i++) {\n            String m = sc.next();\n            int v = sc.nextInt();\n            if (m.equals(\"increment\")) counter.increment(v);\n            else if (m.equals(\"decrement\")) counter.decrement(v);\n        }\n        System.out.println(counter.getValue());\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Counter {\n    int val;\npublic:\n    Counter(int initial) : val(initial) {}\n    void increment(int v) { /* TODO */ }\n    void decrement(int v) { /* TODO */ }\n    int getValue() const { return val; }\n};\n\nint main() {\n    int initial, q;\n    if (!(cin >> initial >> q)) return 0;\n    Counter counter(initial);\n    for (int i = 0; i < q; i++) {\n        string m; int v;\n        cin >> m >> v;\n        if (m == \"increment\") counter.increment(v);\n        else if (m == \"decrement\") counter.decrement(v);\n    }\n    cout << counter.getValue() << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:bankaccount-deposit-and-withdraw",
    "bankId": "T23-Q02",
    "slug": "bankaccount-deposit-and-withdraw",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "BankAccount Deposit and Withdraw",
    "order": 2,
    "difficulty": "Easy",
    "problemStatement": "Design a BankAccount class initialized with an initial balance. Implement two methods: deposit(v) which adds v to the balance, and withdraw(v) which subtracts v only if balance ≥ v; otherwise, the withdrawal is rejected and a rejected counter increments. Print the final balance and rejected count separated by a space.",
    "inputFormat": "The first line contains two integers: initial (the starting balance) and q (the number of commands). The next q lines each contain \"method value\", where method is \"deposit\" or \"withdraw\".",
    "outputFormat": "Print \"balance rejected\" separated by a space.",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\ndeposit 3\nwithdraw 4\ndeposit 2\nwithdraw 1",
        "output": "10 0",
        "explanation": "Processing all deposits and valid withdrawals results in a final balance of 10 with 0 rejected transaction(s)."
      },
      {
        "input": "0 0",
        "output": "0 0",
        "explanation": "Processing all deposits and valid withdrawals results in a final balance of 0 with 0 rejected transaction(s)."
      },
      {
        "input": "1 1\ndeposit 1",
        "output": "2 0",
        "explanation": "Processing all deposits and valid withdrawals results in a final balance of 2 with 0 rejected transaction(s)."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\ndeposit 3\nwithdraw 4\ndeposit 2\nwithdraw 1",
        "expectedOutput": "10 0"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0 0"
      },
      {
        "testIndex": 3,
        "input": "1 1\ndeposit 1",
        "expectedOutput": "2 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass BankAccount:\n    def __init__(self, initial: int):\n        self.balance = initial\n        self.rejected = 0\n    def deposit(self, v: int): pass\n    def withdraw(self, v: int): pass\n    def get_status(self): return self.balance, self.rejected\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    acc = BankAccount(int(lines[0]))\n    q = int(lines[1])\n    idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'deposit': acc.deposit(v)\n        elif m == 'withdraw': acc.withdraw(v)\n    b, r = acc.get_status()\n    print(f\"{b} {r}\")\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass BankAccount {\n    constructor(initial) { this.balance = initial; this.rejected = 0; }\n    deposit(v) { /* TODO */ }\n    withdraw(v) { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const acc = new BankAccount(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10);\n    let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'deposit') acc.deposit(v); else if (m === 'withdraw') acc.withdraw(v);\n    }\n    console.log(`${acc.balance} ${acc.rejected}`);\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nclass BankAccount {\n    int balance, rejected = 0;\n    public BankAccount(int initial) { this.balance = initial; }\n    public void deposit(int v) { /* TODO */ }\n    public void withdraw(int v) { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        BankAccount acc = new BankAccount(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"deposit\")) acc.deposit(v); else if (m.equals(\"withdraw\")) acc.withdraw(v);\n        }\n        System.out.println(acc.balance + \" \" + acc.rejected);\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\nclass BankAccount {\npublic:\n    int balance, rejected = 0;\n    BankAccount(int initial) : balance(initial) {}\n    void deposit(int v) { /* TODO */ }\n    void withdraw(int v) { /* TODO */ }\n};\nint main() {\n    int init, q;\n    if (!(cin >> init >> q)) return 0;\n    BankAccount acc(init);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"deposit\") acc.deposit(v); else if (m == \"withdraw\") acc.withdraw(v);\n    }\n    cout << acc.balance << \" \" << acc.rejected << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:stack-push-and-pop",
    "bankId": "T23-Q03",
    "slug": "stack-push-and-pop",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Stack Push and Pop",
    "order": 3,
    "difficulty": "Easy",
    "problemStatement": "Design a Stack class. The stack is initialized with one element: initial. Implement push(v) which pushes v onto the stack, and pop(v) which pops the top element (if any) and records it. Print two lines: line 1 contains the remaining stack elements from bottom to top (or \"EMPTY\"), and line 2 contains the popped elements in the order they were popped (or \"EMPTY\").",
    "inputFormat": "The first line contains initial and q. The next q lines each contain \"method value\" where method is \"push\" or \"pop\".",
    "outputFormat": "Line 1: space-separated remaining stack elements, or \"EMPTY\". Line 2: space-separated popped elements, or \"EMPTY\".",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\npush 3\npop 4\npush 2\npop 1",
        "output": "10\n3 2",
        "explanation": "After all stack push and pop operations, the remaining items and popped items are:\n10\n3 2"
      },
      {
        "input": "0 0",
        "output": "0\nEMPTY",
        "explanation": "After all stack push and pop operations, the remaining items and popped items are:\n0\nEMPTY"
      },
      {
        "input": "1 1\npush 1",
        "output": "1 1\nEMPTY",
        "explanation": "After all stack push and pop operations, the remaining items and popped items are:\n1 1\nEMPTY"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\npush 3\npop 4\npush 2\npop 1",
        "expectedOutput": "10\n3 2"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0\nEMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 1\npush 1",
        "expectedOutput": "1 1\nEMPTY"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nclass Stack:\n    def __init__(self, initial):\n        self.items = [initial]\n        self.popped = []\n    def push(self, v): pass\n    def pop(self, v=None): pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    s = Stack(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'push': s.push(v)\n        elif m == 'pop': s.pop(v)\n    print(\" \".join(map(str, s.items)) if s.items else \"EMPTY\")\n    print(\" \".join(map(str, s.popped)) if s.popped else \"EMPTY\")\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass Stack {\n    constructor(initial) { this.items = [initial]; this.popped = []; }\n    push(v) { /* TODO */ }\n    pop(v) { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const s = new Stack(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'push') s.push(v); else if (m === 'pop') s.pop(v);\n    }\n    console.log(s.items.length ? s.items.join(' ') : 'EMPTY');\n    console.log(s.popped.length ? s.popped.join(' ') : 'EMPTY');\n}\n",
      "java": "// Language: Java 17\nimport java.util.*;\nclass StackClass {\n    List<Integer> items = new ArrayList<>(), popped = new ArrayList<>();\n    public StackClass(int init) { items.add(init); }\n    public void push(int v) { /* TODO */ }\n    public void pop(int v) { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        StackClass s = new StackClass(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"push\")) s.push(v); else if (m.equals(\"pop\")) s.pop(v);\n        }\n        if (s.items.isEmpty()) System.out.println(\"EMPTY\");\n        else { for (int i=0;i<s.items.size();i++) System.out.print(s.items.get(i)+(i==s.items.size()-1?\"\\n\":\" \")); }\n        if (s.popped.isEmpty()) System.out.println(\"EMPTY\");\n        else { for (int i=0;i<s.popped.size();i++) System.out.print(s.popped.get(i)+(i==s.popped.size()-1?\"\\n\":\" \")); }\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nclass StackClass {\npublic:\n    vector<int> items, popped;\n    StackClass(int init) { items.push_back(init); }\n    void push(int v) { /* TODO */ }\n    void pop(int v) { /* TODO */ }\n};\nint main() {\n    int init, q; if (!(cin >> init >> q)) return 0;\n    StackClass s(init);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"push\") s.push(v); else if (m == \"pop\") s.pop(v);\n    }\n    if (s.items.empty()) cout << \"EMPTY\\n\";\n    else { for (size_t i=0;i<s.items.size();i++) cout << s.items[i] << (i+1==s.items.size()?\"\\n\":\" \"); }\n    if (s.popped.empty()) cout << \"EMPTY\\n\";\n    else { for (size_t i=0;i<s.popped.size();i++) cout << s.popped[i] << (i+1==s.popped.size()?\"\\n\":\" \"); }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:queue-enqueue-and-dequeue",
    "bankId": "T23-Q04",
    "slug": "queue-enqueue-and-dequeue",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Queue Enqueue and Dequeue",
    "order": 4,
    "difficulty": "Easy",
    "problemStatement": "Design a Queue class initialized with one element: initial. Implement enqueue(v) which adds v to the back of the queue, and dequeue(v) which removes and records the element at the front. Print two lines: line 1 contains remaining queue elements front to back (or \"EMPTY\"), and line 2 contains dequeued elements in order (or \"EMPTY\").",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"enqueue\" or \"dequeue\".",
    "outputFormat": "Line 1: remaining queue items or \"EMPTY\". Line 2: dequeued items or \"EMPTY\".",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\nenqueue 3\ndequeue 4\nenqueue 2\ndequeue 1",
        "output": "2\n10 3",
        "explanation": "Queue operations result in:\n2\n10 3"
      },
      {
        "input": "0 0",
        "output": "0\nEMPTY",
        "explanation": "Queue operations result in:\n0\nEMPTY"
      },
      {
        "input": "1 1\nenqueue 1",
        "output": "1 1\nEMPTY",
        "explanation": "Queue operations result in:\n1 1\nEMPTY"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\nenqueue 3\ndequeue 4\nenqueue 2\ndequeue 1",
        "expectedOutput": "2\n10 3"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0\nEMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 1\nenqueue 1",
        "expectedOutput": "1 1\nEMPTY"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nclass Queue:\n    def __init__(self, init):\n        self.queue = [init]\n        self.dequeued = []\n    def enqueue(self, v): pass\n    def dequeue(self, v=None): pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    q = Queue(int(lines[0]))\n    num_cmds = int(lines[1]); idx = 2\n    for _ in range(num_cmds):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'enqueue': q.enqueue(v)\n        elif m == 'dequeue': q.dequeue(v)\n    print(\" \".join(map(str, q.queue)) if q.queue else \"EMPTY\")\n    print(\" \".join(map(str, q.dequeued)) if q.dequeued else \"EMPTY\")\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass Queue {\n    constructor(init) { this.queue = [init]; this.dequeued = []; }\n    enqueue(v) { /* TODO */ }\n    dequeue(v) { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const q = new Queue(parseInt(tokens[0], 10));\n    const numCmds = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < numCmds; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'enqueue') q.enqueue(v); else if (m === 'dequeue') q.dequeue(v);\n    }\n    console.log(q.queue.length ? q.queue.join(' ') : 'EMPTY');\n    console.log(q.dequeued.length ? q.dequeued.join(' ') : 'EMPTY');\n}\n",
      "java": "// Language: Java 17\nimport java.util.*;\nclass QueueClass {\n    List<Integer> queue = new ArrayList<>(), dequeued = new ArrayList<>();\n    public QueueClass(int init) { queue.add(init); }\n    public void enqueue(int v) { /* TODO */ }\n    public void dequeue(int v) { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        QueueClass q = new QueueClass(sc.nextInt());\n        int numCmds = sc.nextInt();\n        for (int i = 0; i < numCmds; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"enqueue\")) q.enqueue(v); else if (m.equals(\"dequeue\")) q.dequeue(v);\n        }\n        if (q.queue.isEmpty()) System.out.println(\"EMPTY\");\n        else { for (int i=0;i<q.queue.size();i++) System.out.print(q.queue.get(i)+(i==q.queue.size()-1?\"\\n\":\" \")); }\n        if (q.dequeued.isEmpty()) System.out.println(\"EMPTY\");\n        else { for (int i=0;i<q.dequeued.size();i++) System.out.print(q.dequeued.get(i)+(i==q.dequeued.size()-1?\"\\n\":\" \")); }\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nclass QueueClass {\npublic:\n    vector<int> queue, dequeued;\n    QueueClass(int init) { queue.push_back(init); }\n    void enqueue(int v) { /* TODO */ }\n    void dequeue(int v) { /* TODO */ }\n};\nint main() {\n    int init, numCmds; if (!(cin >> init >> numCmds)) return 0;\n    QueueClass q(init);\n    for (int i = 0; i < numCmds; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"enqueue\") q.enqueue(v); else if (m == \"dequeue\") q.dequeue(v);\n    }\n    if (q.queue.empty()) cout << \"EMPTY\\n\";\n    else { for (size_t i=0;i<q.queue.size();i++) cout << q.queue[i] << (i+1==q.queue.size()?\"\\n\":\" \"); }\n    if (q.dequeued.empty()) cout << \"EMPTY\\n\";\n    else { for (size_t i=0;i<q.dequeued.size();i++) cout << q.dequeued[i] << (i+1==q.dequeued.size()?\"\\n\":\" \"); }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:inventory-restock-and-sell",
    "bankId": "T23-Q05",
    "slug": "inventory-restock-and-sell",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Inventory Restock and Sell",
    "order": 5,
    "difficulty": "Easy",
    "problemStatement": "Design an Inventory class with an initial stock. Implement restock(v) which adds v units to stock, and sell(v) which sells as many units as available up to v; any excess units that cannot be fulfilled are accumulated as unfilled units. Print the final stock and total unfilled units separated by a space.",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"restock\" or \"sell\".",
    "outputFormat": "Print \"stock unfilled_units\".",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\nrestock 3\nsell 4\nrestock 2\nsell 1",
        "output": "10 0",
        "explanation": "Inventory state ends with: 10 0"
      },
      {
        "input": "0 0",
        "output": "0 0",
        "explanation": "Inventory state ends with: 0 0"
      },
      {
        "input": "1 1\nrestock 1",
        "output": "2 0",
        "explanation": "Inventory state ends with: 2 0"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\nrestock 3\nsell 4\nrestock 2\nsell 1",
        "expectedOutput": "10 0"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0 0"
      },
      {
        "testIndex": 3,
        "input": "1 1\nrestock 1",
        "expectedOutput": "2 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nclass Inventory:\n    def __init__(self, init):\n        self.stock = init; self.unfilled = 0\n    def restock(self, v): pass\n    def sell(self, v): pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    inv = Inventory(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'restock': inv.restock(v)\n        elif m == 'sell': inv.sell(v)\n    print(f\"{inv.stock} {inv.unfilled}\")\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass Inventory {\n    constructor(init) { this.stock = init; this.unfilled = 0; }\n    restock(v) { /* TODO */ }\n    sell(v) { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const inv = new Inventory(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'restock') inv.restock(v); else if (m === 'sell') inv.sell(v);\n    }\n    console.log(`${inv.stock} ${inv.unfilled}`);\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nclass Inventory {\n    int stock, unfilled = 0;\n    public Inventory(int init) { this.stock = init; }\n    public void restock(int v) { /* TODO */ }\n    public void sell(int v) { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        Inventory inv = new Inventory(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"restock\")) inv.restock(v); else if (m.equals(\"sell\")) inv.sell(v);\n        }\n        System.out.println(inv.stock + \" \" + inv.unfilled);\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\nclass Inventory {\npublic:\n    int stock, unfilled = 0;\n    Inventory(int init) : stock(init) {}\n    void restock(int v) { /* TODO */ }\n    void sell(int v) { /* TODO */ }\n};\nint main() {\n    int init, q; if (!(cin >> init >> q)) return 0;\n    Inventory inv(init);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"restock\") inv.restock(v); else if (m == \"sell\") inv.sell(v);\n    }\n    cout << inv.stock << \" \" << inv.unfilled << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:lamp-toggle-and-explicit-states",
    "bankId": "T23-Q06",
    "slug": "lamp-toggle-and-explicit-states",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Lamp Toggle and Explicit States",
    "order": 6,
    "difficulty": "Easy",
    "problemStatement": "Design a Lamp class with an initial state (true for on, false for off). Implement toggle(v) which toggles state, turn_on(v) which turns it on, and turn_off(v) which turns it off. Print \"true\" if the lamp is on, or \"false\" if it is off.",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"toggle\", \"turn_on\", or \"turn_off\".",
    "outputFormat": "Print true or false in lowercase.",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100",
    "examples": [
      {
        "input": "10 4\ntoggle 3\nturn_on 4\nturn_off 2\ntoggle 1",
        "output": "true",
        "explanation": "After toggles and state updates, lamp is true."
      },
      {
        "input": "0 0",
        "output": "false",
        "explanation": "After toggles and state updates, lamp is false."
      },
      {
        "input": "1 1\nturn_off 1",
        "output": "false",
        "explanation": "After toggles and state updates, lamp is false."
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\ntoggle 3\nturn_on 4\nturn_off 2\ntoggle 1",
        "expectedOutput": "true"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "false"
      },
      {
        "testIndex": 3,
        "input": "1 1\nturn_off 1",
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
      "python": "# Language: Python 3\nimport sys\nclass Lamp:\n    def __init__(self, init):\n        self.is_on = init != 0\n    def toggle(self, v=None): pass\n    def turn_on(self, v=None): pass\n    def turn_off(self, v=None): pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    lamp = Lamp(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'toggle': lamp.toggle(v)\n        elif m == 'turn_on': lamp.turn_on(v)\n        elif m == 'turn_off': lamp.turn_off(v)\n    print(\"true\" if lamp.is_on else \"false\")\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass Lamp {\n    constructor(init) { this.isOn = init !== 0; }\n    toggle() { /* TODO */ }\n    turn_on() { /* TODO */ }\n    turn_off() { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const lamp = new Lamp(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx]; idx += 2;\n        if (m === 'toggle') lamp.toggle(); else if (m === 'turn_on') lamp.turn_on(); else if (m === 'turn_off') lamp.turn_off();\n    }\n    console.log(lamp.isOn ? 'true' : 'false');\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nclass Lamp {\n    boolean isOn;\n    public Lamp(int init) { this.isOn = init != 0; }\n    public void toggle() { /* TODO */ }\n    public void turn_on() { /* TODO */ }\n    public void turn_off() { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        Lamp lamp = new Lamp(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); sc.nextInt();\n            if (m.equals(\"toggle\")) lamp.toggle(); else if (m.equals(\"turn_on\")) lamp.turn_on(); else if (m.equals(\"turn_off\")) lamp.turn_off();\n        }\n        System.out.println(lamp.isOn ? \"true\" : \"false\");\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\nclass Lamp {\npublic:\n    bool isOn;\n    Lamp(int init) : isOn(init != 0) {}\n    void toggle() { /* TODO */ }\n    void turn_on() { /* TODO */ }\n    void turn_off() { /* TODO */ }\n};\nint main() {\n    int init, q; if (!(cin >> init >> q)) return 0;\n    Lamp lamp(init);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"toggle\") lamp.toggle(); else if (m == \"turn_on\") lamp.turn_on(); else if (m == \"turn_off\") lamp.turn_off();\n    }\n    cout << (lamp.isOn ? \"true\" : \"false\") << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:thermometer-methods",
    "bankId": "T23-Q07",
    "slug": "thermometer-methods",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Thermometer Methods",
    "order": 7,
    "difficulty": "Easy",
    "problemStatement": "Design a Thermometer class with an initial temperature in Celsius. Implement raise_c(v) which increases Celsius by v, and lower_c(v) which decreases Celsius by v. Fahrenheit is computed as 9 * C / 5 + 32, and fahrenheit_x5 is 5 * Fahrenheit = 9 * C + 160. Print the final Celsius temperature and fahrenheit_x5 separated by a space.",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"raise_c\" or \"lower_c\".",
    "outputFormat": "Print \"celsius fahrenheit_x5\".",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\nraise_c 3\nlower_c 4\nraise_c 2\nlower_c 1",
        "output": "10 250",
        "explanation": "Final thermometer readings are: 10 250"
      },
      {
        "input": "0 0",
        "output": "0 160",
        "explanation": "Final thermometer readings are: 0 160"
      },
      {
        "input": "1 1\nraise_c 1",
        "output": "2 178",
        "explanation": "Final thermometer readings are: 2 178"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\nraise_c 3\nlower_c 4\nraise_c 2\nlower_c 1",
        "expectedOutput": "10 250"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0 160"
      },
      {
        "testIndex": 3,
        "input": "1 1\nraise_c 1",
        "expectedOutput": "2 178"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nclass Thermometer:\n    def __init__(self, init): self.c = init\n    def raise_c(self, v): pass\n    def lower_c(self, v): pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    t = Thermometer(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'raise_c': t.raise_c(v)\n        elif m == 'lower_c': t.lower_c(v)\n    print(f\"{t.c} {9 * t.c + 160}\")\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass Thermometer {\n    constructor(init) { this.c = init; }\n    raise_c(v) { /* TODO */ }\n    lower_c(v) { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const t = new Thermometer(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'raise_c') t.raise_c(v); else if (m === 'lower_c') t.lower_c(v);\n    }\n    console.log(`${t.c} ${9 * t.c + 160}`);\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nclass Thermometer {\n    int c;\n    public Thermometer(int init) { this.c = init; }\n    public void raise_c(int v) { /* TODO */ }\n    public void lower_c(int v) { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        Thermometer t = new Thermometer(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"raise_c\")) t.raise_c(v); else if (m.equals(\"lower_c\")) t.lower_c(v);\n        }\n        System.out.println(t.c + \" \" + (9 * t.c + 160));\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\nclass Thermometer {\npublic:\n    int c;\n    Thermometer(int init) : c(init) {}\n    void raise_c(int v) { /* TODO */ }\n    void lower_c(int v) { /* TODO */ }\n};\nint main() {\n    int init, q; if (!(cin >> init >> q)) return 0;\n    Thermometer t(init);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"raise_c\") t.raise_c(v); else if (m == \"lower_c\") t.lower_c(v);\n    }\n    cout << t.c << \" \" << (9 * t.c + 160) << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:shopping-cart-item-methods",
    "bankId": "T23-Q08",
    "slug": "shopping-cart-item-methods",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Shopping Cart Item Methods",
    "order": 8,
    "difficulty": "Medium",
    "problemStatement": "Design a ShoppingCart class initialized with one item of id initial. Implement add_item(v) which adds 1 unit of item id v, and remove_item(v) which removes 1 unit of item id v (if in cart). Print each item and its final count on a separate line (\"itemId count\") sorted by itemId ascending. If the cart is empty, print \"EMPTY\".",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"add_item\" or \"remove_item\".",
    "outputFormat": "Print each item \"itemId count\" on a separate line sorted by itemId ascending, or \"EMPTY\".",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\nadd_item 3\nremove_item 4\nadd_item 2\nremove_item 1",
        "output": "2 1\n3 1\n10 1",
        "explanation": "Cart items and counts are:\n2 1\n3 1\n10 1"
      },
      {
        "input": "0 0",
        "output": "0 1",
        "explanation": "Cart items and counts are:\n0 1"
      },
      {
        "input": "1 1\nadd_item 1",
        "output": "1 2",
        "explanation": "Cart items and counts are:\n1 2"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\nadd_item 3\nremove_item 4\nadd_item 2\nremove_item 1",
        "expectedOutput": "2 1\n3 1\n10 1"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0 1"
      },
      {
        "testIndex": 3,
        "input": "1 1\nadd_item 1",
        "expectedOutput": "1 2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nclass ShoppingCart:\n    def __init__(self, init):\n        self.items = {init: 1}\n    def add_item(self, v): pass\n    def remove_item(self, v): pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    cart = ShoppingCart(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'add_item': cart.add_item(v)\n        elif m == 'remove_item': cart.remove_item(v)\n    if not cart.items:\n        print(\"EMPTY\")\n    else:\n        for k in sorted(cart.items.keys()):\n            print(f\"{k} {cart.items[k]}\")\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass ShoppingCart {\n    constructor(init) { this.items = { [init]: 1 }; }\n    add_item(v) { /* TODO */ }\n    remove_item(v) { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const cart = new ShoppingCart(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'add_item') cart.add_item(v); else if (m === 'remove_item') cart.remove_item(v);\n    }\n    const keys = Object.keys(cart.items).map(Number).sort((a,b)=>a-b);\n    if (!keys.length) console.log('EMPTY');\n    else keys.forEach(k => console.log(`${k} ${cart.items[k]}`));\n}\n",
      "java": "// Language: Java 17\nimport java.util.*;\nclass ShoppingCart {\n    Map<Integer, Integer> items = new TreeMap<>();\n    public ShoppingCart(int init) { items.put(init, 1); }\n    public void add_item(int v) { /* TODO */ }\n    public void remove_item(int v) { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        ShoppingCart cart = new ShoppingCart(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"add_item\")) cart.add_item(v); else if (m.equals(\"remove_item\")) cart.remove_item(v);\n        }\n        if (cart.items.isEmpty()) System.out.println(\"EMPTY\");\n        else for (var e : cart.items.entrySet()) System.out.println(e.getKey() + \" \" + e.getValue());\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\nclass ShoppingCart {\npublic:\n    map<int, int> items;\n    ShoppingCart(int init) { items[init] = 1; }\n    void add_item(int v) { /* TODO */ }\n    void remove_item(int v) { /* TODO */ }\n};\nint main() {\n    int init, q; if (!(cin >> init >> q)) return 0;\n    ShoppingCart cart(init);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"add_item\") cart.add_item(v); else if (m == \"remove_item\") cart.remove_item(v);\n    }\n    if (cart.items.empty()) cout << \"EMPTY\\n\";\n    else for (auto& p : cart.items) cout << p.first << \" \" << p.second << \"\\n\";\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:unique-collection-methods",
    "bankId": "T23-Q09",
    "slug": "unique-collection-methods",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Unique Collection Methods",
    "order": 9,
    "difficulty": "Medium",
    "problemStatement": "Design a UniqueCollection class initialized with one element: initial. Implement add(v) which inserts v if not already present, and remove(v) which removes v if present. Print the sorted elements of the collection space-separated on a single line. If empty, print \"EMPTY\".",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"add\" or \"remove\".",
    "outputFormat": "Print sorted unique elements space-separated on one line, or \"EMPTY\".",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\nadd 3\nremove 4\nadd 2\nremove 1",
        "output": "2 3 10",
        "explanation": "Unique sorted elements in the collection are: 2 3 10"
      },
      {
        "input": "0 0",
        "output": "0",
        "explanation": "Unique sorted elements in the collection are: 0"
      },
      {
        "input": "1 1\nadd 1",
        "output": "1",
        "explanation": "Unique sorted elements in the collection are: 1"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\nadd 3\nremove 4\nadd 2\nremove 1",
        "expectedOutput": "2 3 10"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 1\nadd 1",
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
      "python": "# Language: Python 3\nimport sys\nclass UniqueCollection:\n    def __init__(self, init): self.items = {init}\n    def add(self, v): pass\n    def remove(self, v): pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    c = UniqueCollection(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'add': c.add(v)\n        elif m == 'remove': c.remove(v)\n    print(\" \".join(map(str, sorted(c.items))) if c.items else \"EMPTY\")\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass UniqueCollection {\n    constructor(init) { this.items = new Set([init]); }\n    add(v) { /* TODO */ }\n    remove(v) { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const c = new UniqueCollection(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'add') c.add(v); else if (m === 'remove') c.remove(v);\n    }\n    const arr = Array.from(c.items).sort((a,b)=>a-b);\n    console.log(arr.length ? arr.join(' ') : 'EMPTY');\n}\n",
      "java": "// Language: Java 17\nimport java.util.*;\nclass UniqueCollection {\n    Set<Integer> items = new TreeSet<>();\n    public UniqueCollection(int init) { items.add(init); }\n    public void add(int v) { /* TODO */ }\n    public void remove(int v) { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        UniqueCollection c = new UniqueCollection(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"add\")) c.add(v); else if (m.equals(\"remove\")) c.remove(v);\n        }\n        if (c.items.isEmpty()) System.out.println(\"EMPTY\");\n        else { var it = c.items.iterator(); while (it.hasNext()) System.out.print(it.next() + (it.hasNext() ? \" \" : \"\\n\")); }\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <set>\n#include <string>\nusing namespace std;\nclass UniqueCollection {\npublic:\n    set<int> items;\n    UniqueCollection(int init) { items.insert(init); }\n    void add(int v) { /* TODO */ }\n    void remove(int v) { /* TODO */ }\n};\nint main() {\n    int init, q; if (!(cin >> init >> q)) return 0;\n    UniqueCollection c(init);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"add\") c.add(v); else if (m == \"remove\") c.remove(v);\n    }\n    if (c.items.empty()) cout << \"EMPTY\\n\";\n    else { auto it = c.items.begin(); while (it != c.items.end()) { cout << *it; ++it; cout << (it != c.items.end() ? \" \" : \"\\n\"); } }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:undoable-calculator",
    "bankId": "T23-Q10",
    "slug": "undoable-calculator",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Undoable Calculator",
    "order": 10,
    "difficulty": "Medium",
    "problemStatement": "Design an UndoableCalculator class with an initial value. Implement add(v) and subtract(v) which save a snapshot of the current value and update it, and undo() which restores the most recent snapshot if any. Print the final value and remaining snapshot count separated by a space.",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"add\", \"subtract\", or \"undo\".",
    "outputFormat": "Print \"value undo_depth\".",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\nadd 3\nsubtract 4\nundo 2\nadd 1",
        "output": "14 2",
        "explanation": "Calculator final state: 14 2"
      },
      {
        "input": "0 0",
        "output": "0 0",
        "explanation": "Calculator final state: 0 0"
      },
      {
        "input": "1 1\nundo 1",
        "output": "1 0",
        "explanation": "Calculator final state: 1 0"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\nadd 3\nsubtract 4\nundo 2\nadd 1",
        "expectedOutput": "14 2"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0 0"
      },
      {
        "testIndex": 3,
        "input": "1 1\nundo 1",
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
      "python": "# Language: Python 3\nimport sys\nclass UndoableCalculator:\n    def __init__(self, init):\n        self.val = init\n        self.snapshots = []\n    def add(self, v):\n        # TODO: Save snapshot and add v\n        pass\n    def subtract(self, v):\n        # TODO: Save snapshot and subtract v\n        pass\n    def undo(self):\n        # TODO: Restore most recent snapshot\n        pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    calc = UndoableCalculator(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'add': calc.add(v)\n        elif m == 'subtract': calc.subtract(v)\n        elif m == 'undo': calc.undo()\n    print(f\"{calc.val} {len(calc.snapshots)}\")\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass UndoableCalculator {\n    constructor(init) { this.val = init; this.snapshots = []; }\n    add(v) { /* TODO */ }\n    subtract(v) { /* TODO */ }\n    undo() { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const calc = new UndoableCalculator(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'add') calc.add(v); else if (m === 'subtract') calc.subtract(v); else if (m === 'undo') calc.undo();\n    }\n    console.log(`${calc.val} ${calc.snapshots.length}`);\n}\n",
      "java": "// Language: Java 17\nimport java.util.*;\nclass UndoableCalculator {\n    int val; Stack<Integer> snapshots = new Stack<>();\n    public UndoableCalculator(int init) { this.val = init; }\n    public void add(int v) { /* TODO */ }\n    public void subtract(int v) { /* TODO */ }\n    public void undo() { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        UndoableCalculator calc = new UndoableCalculator(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"add\")) calc.add(v); else if (m.equals(\"subtract\")) calc.subtract(v); else if (m.equals(\"undo\")) calc.undo();\n        }\n        System.out.println(calc.val + \" \" + calc.snapshots.size());\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nclass UndoableCalculator {\npublic:\n    int val; vector<int> snapshots;\n    UndoableCalculator(int init) : val(init) {}\n    void add(int v) { /* TODO */ }\n    void subtract(int v) { /* TODO */ }\n    void undo() { /* TODO */ }\n};\nint main() {\n    int init, q; if (!(cin >> init >> q)) return 0;\n    UndoableCalculator calc(init);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"add\") calc.add(v); else if (m == \"subtract\") calc.subtract(v); else if (m == \"undo\") calc.undo();\n    }\n    cout << calc.val << \" \" << calc.snapshots.size() << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:clamped-gradebook-score",
    "bankId": "T23-Q11",
    "slug": "clamped-gradebook-score",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Clamped GradeBook Score",
    "order": 11,
    "difficulty": "Medium",
    "problemStatement": "Design a ClampedGradeBook class with an initial score clamped between 0 and 100. Implement award(v) which adds v (score cannot exceed 100), and penalty(v) which subtracts v (score cannot drop below 0). Print the final score as an integer.",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"award\" or \"penalty\".",
    "outputFormat": "Print the final clamped score.",
    "constraints": "0 ≤ initial ≤ 100, 0 ≤ q ≤ 100, 0 ≤ value ≤ 100",
    "examples": [
      {
        "input": "10 4\naward 3\npenalty 4\naward 2\npenalty 1",
        "output": "10",
        "explanation": "Final score after clamps is: 10"
      },
      {
        "input": "0 0",
        "output": "0",
        "explanation": "Final score after clamps is: 0"
      },
      {
        "input": "1 1\naward 1",
        "output": "2",
        "explanation": "Final score after clamps is: 2"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\naward 3\npenalty 4\naward 2\npenalty 1",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 1\naward 1",
        "expectedOutput": "2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nclass ClampedGradeBook:\n    def __init__(self, init): self.score = max(0, min(100, init))\n    def award(self, v): pass\n    def penalty(self, v): pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    gb = ClampedGradeBook(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'award': gb.award(v)\n        elif m == 'penalty': gb.penalty(v)\n    print(gb.score)\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass ClampedGradeBook {\n    constructor(init) { this.score = Math.max(0, Math.min(100, init)); }\n    award(v) { /* TODO */ }\n    penalty(v) { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const gb = new ClampedGradeBook(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'award') gb.award(v); else if (m === 'penalty') gb.penalty(v);\n    }\n    console.log(gb.score);\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nclass ClampedGradeBook {\n    int score;\n    public ClampedGradeBook(int init) { this.score = Math.max(0, Math.min(100, init)); }\n    public void award(int v) { /* TODO */ }\n    public void penalty(int v) { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        ClampedGradeBook gb = new ClampedGradeBook(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"award\")) gb.award(v); else if (m.equals(\"penalty\")) gb.penalty(v);\n        }\n        System.out.println(gb.score);\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <algorithm>\n#include <string>\nusing namespace std;\nclass ClampedGradeBook {\npublic:\n    int score;\n    ClampedGradeBook(int init) : score(max(0, min(100, init))) {}\n    void award(int v) { /* TODO */ }\n    void penalty(int v) { /* TODO */ }\n};\nint main() {\n    int init, q; if (!(cin >> init >> q)) return 0;\n    ClampedGradeBook gb(init);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"award\") gb.award(v); else if (m == \"penalty\") gb.penalty(v);\n    }\n    cout << gb.score << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:digitalclock-time-methods",
    "bankId": "T23-Q12",
    "slug": "digitalclock-time-methods",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "DigitalClock Time Methods",
    "order": 12,
    "difficulty": "Medium",
    "problemStatement": "Design a DigitalClock class with an initial time of (0, initial % 60). Implement forward(v) which advances time by v minutes, and back(v) which moves time back by v minutes (wrapping around 24 hours). Print the final hour and minute separated by a space.",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"forward\" or \"back\".",
    "outputFormat": "Print \"hour minute\".",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\nforward 3\nback 4\nforward 2\nback 1",
        "output": "0 10",
        "explanation": "Final clock time is: 0 10"
      },
      {
        "input": "0 0",
        "output": "0 0",
        "explanation": "Final clock time is: 0 0"
      },
      {
        "input": "1 1\nforward 1",
        "output": "0 2",
        "explanation": "Final clock time is: 0 2"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\nforward 3\nback 4\nforward 2\nback 1",
        "expectedOutput": "0 10"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0 0"
      },
      {
        "testIndex": 3,
        "input": "1 1\nforward 1",
        "expectedOutput": "0 2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nclass DigitalClock:\n    def __init__(self, init): self.total = init % (24 * 60)\n    def forward(self, v): pass\n    def back(self, v): pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    clock = DigitalClock(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'forward': clock.forward(v)\n        elif m == 'back': clock.back(v)\n    print(f\"{clock.total // 60} {clock.total % 60}\")\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass DigitalClock {\n    constructor(init) { this.total = init % (24 * 60); }\n    forward(v) { /* TODO */ }\n    back(v) { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const clock = new DigitalClock(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'forward') clock.forward(v); else if (m === 'back') clock.back(v);\n    }\n    console.log(`${Math.floor(clock.total / 60)} ${clock.total % 60}`);\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nclass DigitalClock {\n    int total;\n    public DigitalClock(int init) { this.total = init % (24 * 60); }\n    public void forward(int v) { /* TODO */ }\n    public void back(int v) { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        DigitalClock clock = new DigitalClock(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"forward\")) clock.forward(v); else if (m.equals(\"back\")) clock.back(v);\n        }\n        System.out.println((clock.total / 60) + \" \" + (clock.total % 60));\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\nclass DigitalClock {\npublic:\n    int total;\n    DigitalClock(int init) : total(init % (24 * 60)) {}\n    void forward(int v) { /* TODO */ }\n    void back(int v) { /* TODO */ }\n};\nint main() {\n    int init, q; if (!(cin >> init >> q)) return 0;\n    DigitalClock clock(init);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"forward\") clock.forward(v); else if (m == \"back\") clock.back(v);\n    }\n    cout << (clock.total / 60) << \" \" << (clock.total % 60) << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:stringbuilder-append-and-delete",
    "bankId": "T23-Q13",
    "slug": "stringbuilder-append-and-delete",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "StringBuilder Append and Delete",
    "order": 13,
    "difficulty": "Medium",
    "problemStatement": "Design a StringBuilder class initialized with a string of the initial integer. Implement append_digit(v) which appends the last decimal digit of v to the string, and delete_last() which removes the final character if any. Print the resulting string.",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"append_digit\" or \"delete_last\".",
    "outputFormat": "Print the resulting string.",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\nappend_digit 3\ndelete_last 4\nappend_digit 2\ndelete_last 1",
        "output": "10",
        "explanation": "Final string is: 10"
      },
      {
        "input": "0 0",
        "output": "0",
        "explanation": "Final string is: 0"
      },
      {
        "input": "1 1\nappend_digit 1",
        "output": "11",
        "explanation": "Final string is: 11"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\nappend_digit 3\ndelete_last 4\nappend_digit 2\ndelete_last 1",
        "expectedOutput": "10"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 1\nappend_digit 1",
        "expectedOutput": "11"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nclass StringBuilder:\n    def __init__(self, init):\n        self.s = str(init)\n    def append_digit(self, v: int):\n        # TODO: Append last decimal digit of v\n        pass\n    def delete_last(self):\n        # TODO: Remove final character if any\n        pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    sb = StringBuilder(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'append_digit': sb.append_digit(v)\n        elif m == 'delete_last': sb.delete_last()\n    print(sb.s)\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass StringBuilder {\n    constructor(init) { this.s = String(init); }\n    append_digit(v) { /* TODO */ }\n    delete_last() { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const sb = new StringBuilder(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'append_digit') sb.append_digit(v); else if (m === 'delete_last') sb.delete_last();\n    }\n    console.log(sb.s);\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nclass StringBuilderClass {\n    String s;\n    public StringBuilderClass(int init) { this.s = String.valueOf(init); }\n    public void append_digit(int v) { /* TODO */ }\n    public void delete_last() { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        StringBuilderClass sb = new StringBuilderClass(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"append_digit\")) sb.append_digit(v); else if (m.equals(\"delete_last\")) sb.delete_last();\n        }\n        System.out.println(sb.s);\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\nclass StringBuilderClass {\npublic:\n    string s;\n    StringBuilderClass(int init) : s(to_string(init)) {}\n    void append_digit(int v) { /* TODO */ }\n    void delete_last() { /* TODO */ }\n};\nint main() {\n    int init, q; if (!(cin >> init >> q)) return 0;\n    StringBuilderClass sb(init);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"append_digit\") sb.append_digit(v); else if (m == \"delete_last\") sb.delete_last();\n    }\n    cout << sb.s << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:priorityqueue-min-methods",
    "bankId": "T23-Q14",
    "slug": "priorityqueue-min-methods",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "PriorityQueue Min Methods",
    "order": 14,
    "difficulty": "Medium",
    "problemStatement": "Design a PriorityQueue class initialized with one element: initial. Implement insert(v) which adds v, and extract_min(v) which removes and records the minimum element. Print two lines: line 1 contains remaining elements sorted ascending (or \"EMPTY\"), and line 2 contains removed minimum elements in order (or \"EMPTY\").",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"insert\" or \"extract_min\".",
    "outputFormat": "Line 1: remaining items sorted or \"EMPTY\". Line 2: removed minimums or \"EMPTY\".",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\ninsert 3\nextract_min 4\ninsert 2\nextract_min 1",
        "output": "10\n3 2",
        "explanation": "Priority queue outcome is:\n10\n3 2"
      },
      {
        "input": "0 0",
        "output": "0\nEMPTY",
        "explanation": "Priority queue outcome is:\n0\nEMPTY"
      },
      {
        "input": "1 1\ninsert 1",
        "output": "1 1\nEMPTY",
        "explanation": "Priority queue outcome is:\n1 1\nEMPTY"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\ninsert 3\nextract_min 4\ninsert 2\nextract_min 1",
        "expectedOutput": "10\n3 2"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0\nEMPTY"
      },
      {
        "testIndex": 3,
        "input": "1 1\ninsert 1",
        "expectedOutput": "1 1\nEMPTY"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys, heapq\nclass PriorityQueue:\n    def __init__(self, init): self.h = [init]; self.removed = []\n    def insert(self, v): pass\n    def extract_min(self, v=None): pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    pq = PriorityQueue(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'insert': pq.insert(v)\n        elif m == 'extract_min': pq.extract_min(v)\n    print(\" \".join(map(str, sorted(pq.h))) if pq.h else \"EMPTY\")\n    print(\" \".join(map(str, pq.removed)) if pq.removed else \"EMPTY\")\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass PriorityQueue {\n    constructor(init) { this.items = [init]; this.removed = []; }\n    insert(v) { /* TODO */ }\n    extract_min() { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const pq = new PriorityQueue(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'insert') pq.insert(v); else if (m === 'extract_min') pq.extract_min();\n    }\n    pq.items.sort((a,b)=>a-b);\n    console.log(pq.items.length ? pq.items.join(' ') : 'EMPTY');\n    console.log(pq.removed.length ? pq.removed.join(' ') : 'EMPTY');\n}\n",
      "java": "// Language: Java 17\nimport java.util.*;\nclass PriorityQueueClass {\n    PriorityQueue<Integer> pq = new PriorityQueue<>(); List<Integer> removed = new ArrayList<>();\n    public PriorityQueueClass(int init) { pq.add(init); }\n    public void insert(int v) { /* TODO */ }\n    public void extract_min() { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        PriorityQueueClass pq = new PriorityQueueClass(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"insert\")) pq.insert(v); else if (m.equals(\"extract_min\")) pq.extract_min();\n        }\n        List<Integer> rem = new ArrayList<>(pq.pq); Collections.sort(rem);\n        if (rem.isEmpty()) System.out.println(\"EMPTY\"); else { for (int i=0;i<rem.size();i++) System.out.print(rem.get(i)+(i==rem.size()-1?\"\\n\":\" \")); }\n        if (pq.removed.isEmpty()) System.out.println(\"EMPTY\"); else { for (int i=0;i<pq.removed.size();i++) System.out.print(pq.removed.get(i)+(i==pq.removed.size()-1?\"\\n\":\" \")); }\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <vector>\n#include <queue>\n#include <algorithm>\n#include <string>\nusing namespace std;\nclass PriorityQueueClass {\npublic:\n    vector<int> items, removed;\n    PriorityQueueClass(int init) { items.push_back(init); }\n    void insert(int v) { /* TODO */ }\n    void extract_min() { /* TODO */ }\n};\nint main() {\n    int init, q; if (!(cin >> init >> q)) return 0;\n    PriorityQueueClass pq(init);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"insert\") pq.insert(v); else if (m == \"extract_min\") pq.extract_min();\n    }\n    sort(pq.items.begin(), pq.items.end());\n    if (pq.items.empty()) cout << \"EMPTY\\n\"; else { for (size_t i=0;i<pq.items.size();i++) cout << pq.items[i] << (i+1==pq.items.size()?\"\\n\":\" \"); }\n    if (pq.removed.empty()) cout << \"EMPTY\\n\"; else { for (size_t i=0;i<pq.removed.size();i++) cout << pq.removed[i] << (i+1==pq.removed.size()?\"\\n\":\" \"); }\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:accumulator-add-multiply-reset",
    "bankId": "T23-Q15",
    "slug": "accumulator-add-multiply-reset",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Accumulator Add Multiply Reset",
    "order": 15,
    "difficulty": "Medium",
    "problemStatement": "Design an Accumulator class with an initial value. Implement add(v) which adds v, multiply(v) which multiplies value by v, and reset(v) which resets value to 0. Print the final integer value.",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"add\", \"multiply\", or \"reset\".",
    "outputFormat": "Print the final integer value.",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\nadd 3\nmultiply 4\nreset 2\nadd 1",
        "output": "1",
        "explanation": "Final accumulator value: 1"
      },
      {
        "input": "0 0",
        "output": "0",
        "explanation": "Final accumulator value: 0"
      },
      {
        "input": "20 3\nmultiply 12\nreset 7\nadd 15",
        "output": "15",
        "explanation": "Final accumulator value: 15"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\nadd 3\nmultiply 4\nreset 2\nadd 1",
        "expectedOutput": "1"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "20 3\nmultiply 12\nreset 7\nadd 15",
        "expectedOutput": "15"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nclass Accumulator:\n    def __init__(self, init): self.val = init\n    def add(self, v): pass\n    def multiply(self, v): pass\n    def reset(self, v=None): pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    acc = Accumulator(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'add': acc.add(v)\n        elif m == 'multiply': acc.multiply(v)\n        elif m == 'reset': acc.reset(v)\n    print(acc.val)\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass Accumulator {\n    constructor(init) { this.val = init; }\n    add(v) { /* TODO */ }\n    multiply(v) { /* TODO */ }\n    reset() { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const acc = new Accumulator(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'add') acc.add(v); else if (m === 'multiply') acc.multiply(v); else if (m === 'reset') acc.reset();\n    }\n    console.log(acc.val);\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nclass Accumulator {\n    int val;\n    public Accumulator(int init) { this.val = init; }\n    public void add(int v) { /* TODO */ }\n    public void multiply(int v) { /* TODO */ }\n    public void reset() { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        Accumulator acc = new Accumulator(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"add\")) acc.add(v); else if (m.equals(\"multiply\")) acc.multiply(v); else if (m.equals(\"reset\")) acc.reset();\n        }\n        System.out.println(acc.val);\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\nclass Accumulator {\npublic:\n    int val;\n    Accumulator(int init) : val(init) {}\n    void add(int v) { /* TODO */ }\n    void multiply(int v) { /* TODO */ }\n    void reset() { /* TODO */ }\n};\nint main() {\n    int init, q; if (!(cin >> init >> q)) return 0;\n    Accumulator acc(init);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"add\") acc.add(v); else if (m == \"multiply\") acc.multiply(v); else if (m == \"reset\") acc.reset();\n    }\n    cout << acc.val << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:seat-reservation-object",
    "bankId": "T23-Q16",
    "slug": "seat-reservation-object",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Seat Reservation Object",
    "order": 16,
    "difficulty": "Hard",
    "problemStatement": "Design a SeatReservation class for a venue with fixed capacity 20, initialized with an initial number of reserved seats. Implement reserve(v) which reserves v seats if available (otherwise increments a rejected count), and cancel(v) which cancels up to min(v, reserved) seats. Print the final reserved seat count and total rejected count separated by a space.",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"reserve\" or \"cancel\".",
    "outputFormat": "Print \"reserved rejected\".",
    "constraints": "0 ≤ initial ≤ 20, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\nreserve 3\ncancel 4\nreserve 2\ncancel 1",
        "output": "10 0",
        "explanation": "Reservation results: 10 0"
      },
      {
        "input": "0 0",
        "output": "0 0",
        "explanation": "Reservation results: 0 0"
      },
      {
        "input": "1 1\nreserve 1",
        "output": "2 0",
        "explanation": "Reservation results: 2 0"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\nreserve 3\ncancel 4\nreserve 2\ncancel 1",
        "expectedOutput": "10 0"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0 0"
      },
      {
        "testIndex": 3,
        "input": "1 1\nreserve 1",
        "expectedOutput": "2 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nclass SeatReservation:\n    def __init__(self, initial: int):\n        self.capacity = 20\n        self.reserved = initial\n        self.rejected = 0\n    def reserve(self, v: int):\n        # TODO: Reserve seats if within capacity\n        pass\n    def cancel(self, v: int):\n        # TODO: Cancel up to min(v, reserved) seats\n        pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    sr = SeatReservation(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'reserve': sr.reserve(v)\n        elif m == 'cancel': sr.cancel(v)\n    print(f\"{sr.reserved} {sr.rejected}\")\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass SeatReservation {\n    constructor(initial) { this.capacity = 20; this.reserved = initial; this.rejected = 0; }\n    reserve(v) { /* TODO */ }\n    cancel(v) { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const sr = new SeatReservation(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'reserve') sr.reserve(v); else if (m === 'cancel') sr.cancel(v);\n    }\n    console.log(`${sr.reserved} ${sr.rejected}`);\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nclass SeatReservation {\n    int capacity = 20, reserved, rejected = 0;\n    public SeatReservation(int initial) { this.reserved = initial; }\n    public void reserve(int v) { /* TODO */ }\n    public void cancel(int v) { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        SeatReservation sr = new SeatReservation(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"reserve\")) sr.reserve(v); else if (m.equals(\"cancel\")) sr.cancel(v);\n        }\n        System.out.println(sr.reserved + \" \" + sr.rejected);\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\nclass SeatReservation {\npublic:\n    int capacity = 20, reserved, rejected = 0;\n    SeatReservation(int initial) : reserved(initial) {}\n    void reserve(int v) { /* TODO */ }\n    void cancel(int v) { /* TODO */ }\n};\nint main() {\n    int initial, q; if (!(cin >> initial >> q)) return 0;\n    SeatReservation sr(initial);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"reserve\") sr.reserve(v); else if (m == \"cancel\") sr.cancel(v);\n    }\n    cout << sr.reserved << \" \" << sr.rejected << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:circular-playlist-cursor-methods",
    "bankId": "T23-Q17",
    "slug": "circular-playlist-cursor-methods",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Circular Playlist Cursor Methods",
    "order": 17,
    "difficulty": "Hard",
    "problemStatement": "Design a CircularPlaylist class where playlist length = (initial % 5) + 1 and cursor starts at 0. Implement next(v) which moves cursor forward by v positions modulo length, and previous(v) which moves cursor backward by v positions modulo length. Print the playlist length and final cursor index separated by a space.",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"next\" or \"previous\".",
    "outputFormat": "Print \"length cursor\".",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\nnext 3\nprevious 4\nnext 2\nprevious 1",
        "output": "1 0",
        "explanation": "Playlist cursor position: 1 0"
      },
      {
        "input": "1 1\nnext 1",
        "output": "2 1",
        "explanation": "Playlist cursor position: 2 1"
      },
      {
        "input": "8 5\nprevious 2\nnext 2\nprevious 2\nnext 2\nprevious 2",
        "output": "4 2",
        "explanation": "Playlist cursor position: 4 2"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\nnext 3\nprevious 4\nnext 2\nprevious 1",
        "expectedOutput": "1 0"
      },
      {
        "testIndex": 2,
        "input": "1 1\nnext 1",
        "expectedOutput": "2 1"
      },
      {
        "testIndex": 3,
        "input": "8 5\nprevious 2\nnext 2\nprevious 2\nnext 2\nprevious 2",
        "expectedOutput": "4 2"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nclass CircularPlaylist:\n    def __init__(self, initial: int):\n        self.length = (initial % 5) + 1\n        self.cursor = 0\n    def next(self, v: int): pass\n    def previous(self, v: int): pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    cp = CircularPlaylist(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'next': cp.next(v)\n        elif m == 'previous': cp.previous(v)\n    print(f\"{cp.length} {cp.cursor}\")\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass CircularPlaylist {\n    constructor(initial) { this.length = (initial % 5) + 1; this.cursor = 0; }\n    next(v) { /* TODO */ }\n    previous(v) { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const cp = new CircularPlaylist(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'next') cp.next(v); else if (m === 'previous') cp.previous(v);\n    }\n    console.log(`${cp.length} ${cp.cursor}`);\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nclass CircularPlaylist {\n    int length, cursor = 0;\n    public CircularPlaylist(int initial) { this.length = (initial % 5) + 1; }\n    public void next(int v) { /* TODO */ }\n    public void previous(int v) { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        CircularPlaylist cp = new CircularPlaylist(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"next\")) cp.next(v); else if (m.equals(\"previous\")) cp.previous(v);\n        }\n        System.out.println(cp.length + \" \" + cp.cursor);\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\nclass CircularPlaylist {\npublic:\n    int length, cursor = 0;\n    CircularPlaylist(int initial) : length((initial % 5) + 1) {}\n    void next(int v) { /* TODO */ }\n    void previous(int v) { /* TODO */ }\n};\nint main() {\n    int initial, q; if (!(cin >> initial >> q)) return 0;\n    CircularPlaylist cp(initial);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"next\") cp.next(v); else if (m == \"previous\") cp.previous(v);\n    }\n    cout << cp.length << \" \" << cp.cursor << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:flagregister-bit-methods",
    "bankId": "T23-Q18",
    "slug": "flagregister-bit-methods",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "FlagRegister Bit Methods",
    "order": 18,
    "difficulty": "Hard",
    "problemStatement": "Design an 8-bit FlagRegister class initialized to initial % 256. Implement set_bit(v) which sets bit index (v % 8), clear_bit(v) which clears bit index (v % 8), and toggle_bit(v) which flips bit index (v % 8). Print the final unsigned byte integer.",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"set_bit\", \"clear_bit\", or \"toggle_bit\".",
    "outputFormat": "Print the final integer byte value.",
    "constraints": "0 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ value ≤ 10^4",
    "examples": [
      {
        "input": "10 4\nset_bit 3\nclear_bit 4\ntoggle_bit 2\nset_bit 1",
        "output": "14",
        "explanation": "Final bitmask integer: 14"
      },
      {
        "input": "0 0",
        "output": "0",
        "explanation": "Final bitmask integer: 0"
      },
      {
        "input": "1 1\ntoggle_bit 1",
        "output": "3",
        "explanation": "Final bitmask integer: 3"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\nset_bit 3\nclear_bit 4\ntoggle_bit 2\nset_bit 1",
        "expectedOutput": "14"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0"
      },
      {
        "testIndex": 3,
        "input": "1 1\ntoggle_bit 1",
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
      "python": "# Language: Python 3\nimport sys\nclass FlagRegister:\n    def __init__(self, init):\n        self.mask = init % 256\n    def set_bit(self, v: int): pass\n    def clear_bit(self, v: int): pass\n    def toggle_bit(self, v: int): pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    fr = FlagRegister(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'set_bit': fr.set_bit(v)\n        elif m == 'clear_bit': fr.clear_bit(v)\n        elif m == 'toggle_bit': fr.toggle_bit(v)\n    print(fr.mask)\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass FlagRegister {\n    constructor(init) { this.mask = init % 256; }\n    set_bit(v) { /* TODO */ }\n    clear_bit(v) { /* TODO */ }\n    toggle_bit(v) { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const fr = new FlagRegister(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx], v = parseInt(tokens[idx+1], 10); idx += 2;\n        if (m === 'set_bit') fr.set_bit(v); else if (m === 'clear_bit') fr.clear_bit(v); else if (m === 'toggle_bit') fr.toggle_bit(v);\n    }\n    console.log(fr.mask);\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nclass FlagRegister {\n    int mask;\n    public FlagRegister(int init) { this.mask = init % 256; }\n    public void set_bit(int v) { /* TODO */ }\n    public void clear_bit(int v) { /* TODO */ }\n    public void toggle_bit(int v) { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        FlagRegister fr = new FlagRegister(sc.nextInt());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); int v = sc.nextInt();\n            if (m.equals(\"set_bit\")) fr.set_bit(v); else if (m.equals(\"clear_bit\")) fr.clear_bit(v); else if (m.equals(\"toggle_bit\")) fr.toggle_bit(v);\n        }\n        System.out.println(fr.mask);\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\nclass FlagRegister {\npublic:\n    int mask;\n    FlagRegister(int init) : mask(init % 256) {}\n    void set_bit(int v) { /* TODO */ }\n    void clear_bit(int v) { /* TODO */ }\n    void toggle_bit(int v) { /* TODO */ }\n};\nint main() {\n    int init, q; if (!(cin >> init >> q)) return 0;\n    FlagRegister fr(init);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"set_bit\") fr.set_bit(v); else if (m == \"clear_bit\") fr.clear_bit(v); else if (m == \"toggle_bit\") fr.toggle_bit(v);\n    }\n    cout << fr.mask << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:robot-2d-movement-methods",
    "bankId": "T23-Q19",
    "slug": "robot-2d-movement-methods",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Robot 2D Movement Methods",
    "order": 19,
    "difficulty": "Hard",
    "problemStatement": "Design a Robot class representing a robot on a 2D coordinate grid starting at position (initial, 0). Implement movement methods: east(v) which increases x by v, west(v) which decreases x by v, north(v) which increases y by v, and south(v) which decreases y by v. Read the starting x-coordinate and a sequence of movement commands, and print the robot's final x and y coordinates separated by a space.",
    "inputFormat": "The first line contains two integers: initial (the starting x-coordinate) and q (the number of commands). The next q lines each contain \"direction distance\", where direction is one of east, west, north, or south, and distance is an integer.",
    "outputFormat": "Print \"x y\" representing the final 2D coordinates.",
    "constraints": "-10^5 ≤ initial ≤ 10^5, 0 ≤ q ≤ 100, 0 ≤ distance ≤ 10^4",
    "examples": [
      {
        "input": "10 4\neast 3\nnorth 4\nwest 2\nsouth 1",
        "output": "11 3",
        "explanation": "Start at (10, 0). east 3 -> (13, 0). north 4 -> (13, 4). west 2 -> (11, 4). south 1 -> (11, 3). Answer: 11 3"
      },
      {
        "input": "0 0",
        "output": "0 0",
        "explanation": "Start at (0, 0). Answer: 0 0"
      },
      {
        "input": "5 3\nsouth 0\neast 0\nnorth 0",
        "output": "5 0",
        "explanation": "Start at (5, 0). south 0 -> (5, 0). east 0 -> (5, 0). north 0 -> (5, 0). Answer: 5 0"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\neast 3\nnorth 4\nwest 2\nsouth 1",
        "expectedOutput": "11 3"
      },
      {
        "testIndex": 2,
        "input": "0 0",
        "expectedOutput": "0 0"
      },
      {
        "testIndex": 3,
        "input": "5 3\nsouth 0\neast 0\nnorth 0",
        "expectedOutput": "5 0"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\n\nclass Robot:\n    def __init__(self, initial_x: int):\n        self.x = initial_x\n        self.y = 0\n\n    def east(self, distance: int):\n        # TODO: Move east by distance\n        pass\n\n    def west(self, distance: int):\n        # TODO: Move west by distance\n        pass\n\n    def north(self, distance: int):\n        # TODO: Move north by distance\n        pass\n\n    def south(self, distance: int):\n        # TODO: Move south by distance\n        pass\n\n    def get_position(self):\n        return self.x, self.y\n\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    initial = int(lines[0])\n    q = int(lines[1])\n    robot = Robot(initial)\n    idx = 2\n    for _ in range(q):\n        dir_name = lines[idx]\n        dist = int(lines[idx + 1])\n        idx += 2\n        if dir_name == 'east': robot.east(dist)\n        elif dir_name == 'west': robot.west(dist)\n        elif dir_name == 'north': robot.north(dist)\n        elif dir_name == 'south': robot.south(dist)\n    x, y = robot.get_position()\n    print(f\"{x} {y}\")\n\nif __name__ == '__main__':\n    main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\n\nclass Robot {\n    constructor(initialX) {\n        this.x = initialX;\n        this.y = 0;\n    }\n    east(distance) { /* TODO */ }\n    west(distance) { /* TODO */ }\n    north(distance) { /* TODO */ }\n    south(distance) { /* TODO */ }\n    getPosition() { return [this.x, this.y]; }\n}\n\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const initial = parseInt(tokens[0], 10);\n    const q = parseInt(tokens[1], 10);\n    const robot = new Robot(initial);\n    let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const dir = tokens[idx], dist = parseInt(tokens[idx + 1], 10);\n        idx += 2;\n        if (dir === 'east') robot.east(dist);\n        else if (dir === 'west') robot.west(dist);\n        else if (dir === 'north') robot.north(dist);\n        else if (dir === 'south') robot.south(dist);\n    }\n    const [x, y] = robot.getPosition();\n    console.log(`${x} ${y}`);\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\n\nclass Robot {\n    int x, y;\n    public Robot(int initialX) {\n        this.x = initialX;\n        this.y = 0;\n    }\n    public void east(int distance) { /* TODO */ }\n    public void west(int distance) { /* TODO */ }\n    public void north(int distance) { /* TODO */ }\n    public void south(int distance) { /* TODO */ }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int initial = sc.nextInt();\n        int q = sc.nextInt();\n        Robot robot = new Robot(initial);\n        for (int i = 0; i < q; i++) {\n            String dir = sc.next();\n            int dist = sc.nextInt();\n            if (dir.equals(\"east\")) robot.east(dist);\n            else if (dir.equals(\"west\")) robot.west(dist);\n            else if (dir.equals(\"north\")) robot.north(dist);\n            else if (dir.equals(\"south\")) robot.south(dist);\n        }\n        System.out.println(robot.x + \" \" + robot.y);\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Robot {\npublic:\n    int x, y;\n    Robot(int initialX) : x(initialX), y(0) {}\n    void east(int distance) { /* TODO */ }\n    void west(int distance) { /* TODO */ }\n    void north(int distance) { /* TODO */ }\n    void south(int distance) { /* TODO */ }\n};\n\nint main() {\n    int initial, q;\n    if (!(cin >> initial >> q)) return 0;\n    Robot robot(initial);\n    for (int i = 0; i < q; i++) {\n        string dir; int dist;\n        cin >> dir >> dist;\n        if (dir == \"east\") robot.east(dist);\n        else if (dir == \"west\") robot.west(dist);\n        else if (dir == \"north\") robot.north(dist);\n        else if (dir == \"south\") robot.south(dist);\n    }\n    cout << robot.x << \" \" << robot.y << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  },
  {
    "id": "learn:oop-methods:door-state-machine-methods",
    "bankId": "T23-Q20",
    "slug": "door-state-machine-methods",
    "languages": ["python"],
    "topicId": "oop-methods",
    "topicSlug": "oop-methods",
    "topicTitle": "OOP — Methods",
    "title": "Door State Machine Methods",
    "order": 20,
    "difficulty": "Hard",
    "problemStatement": "Design a Door state machine class that begins open if initial is odd, else closed. Implement open(), close(), lock(), and unlock(). open() and close() are disallowed when locked; lock() requires closed; unlock() requires locked and sets state to closed. Any disallowed method call leaves the state unchanged and increments an invalid_actions counter. Print the final door state and invalid action count separated by a space.",
    "inputFormat": "Line 1: initial and q. Next q lines: \"method value\" where method is \"open\", \"close\", \"lock\", or \"unlock\".",
    "outputFormat": "Print \"state invalid_actions\".",
    "constraints": "0 ≤ q ≤ 100",
    "examples": [
      {
        "input": "10 4\nopen 3\nclose 4\nlock 2\nunlock 1",
        "output": "closed 0",
        "explanation": "Door state machine ends in: closed 0"
      },
      {
        "input": "1 1\nlock 1",
        "output": "open 1",
        "explanation": "Door state machine ends in: open 1"
      },
      {
        "input": "5 3\nunlock 0\nopen 0\nclose 0",
        "output": "closed 1",
        "explanation": "Door state machine ends in: closed 1"
      }
    ],
    "visibleTests": [
      {
        "testIndex": 1,
        "input": "10 4\nopen 3\nclose 4\nlock 2\nunlock 1",
        "expectedOutput": "closed 0"
      },
      {
        "testIndex": 2,
        "input": "1 1\nlock 1",
        "expectedOutput": "open 1"
      },
      {
        "testIndex": 3,
        "input": "5 3\nunlock 0\nopen 0\nclose 0",
        "expectedOutput": "closed 1"
      }
    ],
    "testCaseMeta": {
      "visibleCount": 3,
      "hiddenCount": 10,
      "totalCount": 13
    },
    "isPythonOnly": false,
    "starterCodes": {
      "python": "# Language: Python 3\nimport sys\nclass Door:\n    def __init__(self, initial: int):\n        self.state = 'open' if (initial % 2 != 0) else 'closed'\n        self.invalid = 0\n    def open(self): pass\n    def close(self): pass\n    def lock(self): pass\n    def unlock(self): pass\ndef main():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    door = Door(int(lines[0]))\n    q = int(lines[1]); idx = 2\n    for _ in range(q):\n        m, v = lines[idx], int(lines[idx+1]); idx += 2\n        if m == 'open': door.open()\n        elif m == 'close': door.close()\n        elif m == 'lock': door.lock()\n        elif m == 'unlock': door.unlock()\n    print(f\"{door.state} {door.invalid}\")\nif __name__ == '__main__': main()\n",
      "nodejs": "// Language: JavaScript (Node.js)\nconst fs = require('fs');\nclass Door {\n    constructor(initial) { this.state = (initial % 2 !== 0) ? 'open' : 'closed'; this.invalid = 0; }\n    open() { /* TODO */ }\n    close() { /* TODO */ }\n    lock() { /* TODO */ }\n    unlock() { /* TODO */ }\n}\nconst tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nif (tokens.length >= 2) {\n    const door = new Door(parseInt(tokens[0], 10));\n    const q = parseInt(tokens[1], 10); let idx = 2;\n    for (let i = 0; i < q; i++) {\n        const m = tokens[idx]; idx += 2;\n        if (m === 'open') door.open(); else if (m === 'close') door.close(); else if (m === 'lock') door.lock(); else if (m === 'unlock') door.unlock();\n    }\n    console.log(`${door.state} ${door.invalid}`);\n}\n",
      "java": "// Language: Java 17\nimport java.util.Scanner;\nclass Door {\n    String state; int invalid = 0;\n    public Door(int initial) { this.state = (initial % 2 != 0) ? \"open\" : \"closed\"; }\n    public void open() { /* TODO */ }\n    public void close() { /* TODO */ }\n    public void lock() { /* TODO */ }\n    public void unlock() { /* TODO */ }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int initial = sc.nextInt();\n        int q = sc.nextInt();\n        Door door = new Door(initial);\n        for (int i = 0; i < q; i++) {\n            String m = sc.next(); sc.nextInt();\n            if (m.equals(\"open\")) door.open(); else if (m.equals(\"close\")) door.close(); else if (m.equals(\"lock\")) door.lock(); else if (m.equals(\"unlock\")) door.unlock();\n        }\n        System.out.println(door.state + \" \" + door.invalid);\n    }\n}\n",
      "cpp": "// Language: C++20\n#include <iostream>\n#include <string>\nusing namespace std;\nclass Door {\npublic:\n    string state; int invalid = 0;\n    Door(int initial) : state((initial % 2 != 0) ? \"open\" : \"closed\") {}\n    void open() { /* TODO */ }\n    void close() { /* TODO */ }\n    void lock() { /* TODO */ }\n    void unlock() { /* TODO */ }\n};\nint main() {\n    int initial, q; if (!(cin >> initial >> q)) return 0;\n    Door door(initial);\n    for (int i = 0; i < q; i++) {\n        string m; int v; cin >> m >> v;\n        if (m == \"open\") door.open(); else if (m == \"close\") door.close(); else if (m == \"lock\") door.lock(); else if (m == \"unlock\") door.unlock();\n    }\n    cout << door.state << \" \" << door.invalid << endl;\n    return 0;\n}\n"
    },
    "inputMode": "plain",
  }
]
