Belt 1 — Module 1

Belt 1 goal: Build the concepts in this module in order. The coding questions in Belt 1 use the same LU IDs, so learners apply each concept immediately after learning it.

M1-LU1 — Variables & assignment

Concept

A variable gives a name to a value so the program can use that value later. Assignment stores a value in the variable; assigning again replaces the old value. Separate the idea of the name (a) from the current value stored in it (10).

How to approach this LU

Translate the statement into variables and one small expression or decision.
Trace one sample by hand before running the program.
Check boundary values and the exact spelling/capitalization of the required output.

Code syntax / core snippet

Python

a = 10
b = 5
total = a + b
print(total)

C++

int a = 10, b = 5;
int total = a + b;
cout << total;

Java

int a = 10, b = 5;
int total = a + b;
System.out.println(total);

JavaScript

let a = 10, b = 5;
const total = a + b;
console.log(total);

Input and Output Format

Input: Two integers a and b.

Output: Print a + b.

Worked examples

Example 1

Example Input

4 9

Output

13

Explanation

4 + 9 = 13.

Example 2

Example Input

10 -3

Output

7

Explanation

10 + (-3) = 7.

M1-LU2 — Input/ Output handling

Concept

Competitive-programming programs normally follow a simple pipeline: read the input, store it, process it, and print the answer. Input may contain spaces or multiple lines, but the required output format must be followed exactly. Learning reliable parsing early prevents many otherwise-correct solutions from failing.

How to approach this LU

Translate the statement into variables and one small expression or decision.
Trace one sample by hand before running the program.
Check boundary values and the exact spelling/capitalization of the required output.

Code syntax / core snippet

Python

n = int(input())
print(n * 2)

C++

int n;
cin >> n;
cout << n * 2;

Java

Scanner sc = new Scanner(System.in);
int n = sc.nextInt();
System.out.println(n * 2);

JavaScript

const fs = require('fs');
const n = Number(fs.readFileSync(0, 'utf8').trim());
console.log(n * 2);

Input and Output Format

Input: One integer n.

Output: Print 2 × n.

Worked examples

Example 1

Example Input

7

Output

14

Explanation

7 × 2 = 14.

Example 2

Example Input

-5

Output

-10

Explanation

-5 × 2 = -10.

M1-LU3 — Data types

Concept

A data type tells the language what kind of value is being stored and what operations make sense for it. Integers are useful for counts, floating-point values for measurements, strings for text, and booleans for true/false decisions. Choose a type large or precise enough for the problem.

How to approach this LU

Translate the statement into variables and one small expression or decision.
Trace one sample by hand before running the program.
Check boundary values and the exact spelling/capitalization of the required output.

Code syntax / core snippet

Python

count = 5          # int
price = 2.5      # float
name = "Kalvi"   # str
ready = True      # bool

C++

int count = 5;
double price = 2.5;
string name = "Kalvi";
bool ready = true;

Java

int count = 5;
double price = 2.5;
String name = "Kalvi";
boolean ready = true;

JavaScript

let count = 5;
let price = 2.5;
let name = "Kalvi";
let ready = true;

Input and Output Format

Input: One integer a and one decimal number b.

Output: Print a + b as a decimal value.

Worked examples

Example 1

Example Input

5 2.5

Output

7.5

Explanation

5 + 2.5 = 7.5.

Example 2

Example Input

10 0.25

Output

10.25

Explanation

10 + 0.25 = 10.25.

M1-LU4 — Arithmetic/ Relational/ Logical operators

Concept

Arithmetic operators calculate numbers, relational operators compare values, and logical operators combine Boolean conditions. A typical decision expression is built from comparisons such as a > 0 and then combined with and/&&. Read a condition from left to right and check its truth value before coding.

How to approach this LU

Translate the statement into variables and one small expression or decision.
Trace one sample by hand before running the program.
Check boundary values and the exact spelling/capitalization of the required output.

Code syntax / core snippet

Python

a, b = 4, 9
ok = a > 0 and b > 0
print(ok)

C++

int a = 4, b = 9;
bool ok = a > 0 && b > 0;
cout << boolalpha << ok;

Java

int a = 4, b = 9;
boolean ok = a > 0 && b > 0;
System.out.println(ok);

JavaScript

const a = 4, b = 9;
const ok = a > 0 && b > 0;
console.log(ok);

Input and Output Format

Input: Two integers a and b.

Output: Print true if both are greater than 0; otherwise print false.

Worked examples

Example 1

Example Input

4 9

Output

true

Explanation

Both values are greater than zero.

Example 2

Example Input

0 5

Output

false

Explanation

0 is not positive.

M1-LU5 — Type conversion

Concept

Conversion is needed when an operation requires a different type. A classic example is average: integer division can discard the fractional part in some languages, so at least one operand should be converted to a floating-point value. Convert deliberately and remember that narrowing conversions may lose information.

How to approach this LU

Translate the statement into variables and one small expression or decision.
Trace one sample by hand before running the program.
Check boundary values and the exact spelling/capitalization of the required output.

Code syntax / core snippet

Python

a, b = 5, 8
avg = (a + b) / 2.0
print(avg)

C++

int a = 5, b = 8;
double avg = (a + b) / 2.0;
cout << avg;

Java

int a = 5, b = 8;
double avg = (a + b) / 2.0;
System.out.println(avg);

JavaScript

const a = 5, b = 8;
const avg = (a + b) / 2;
console.log(avg);

Input and Output Format

Input: Two integers a and b.

Output: Print their average as a decimal.

Worked examples

Example 1

Example Input

5 8

Output

6.5

Explanation

13 ÷ 2 = 6.5.

Example 2

Example Input

2 3

Output

2.5

Explanation

5 ÷ 2 = 2.5.

M1-LU6 — Operator precedence (basic)

Concept

Expressions contain several operators, and precedence determines which operation happens first. Multiplication, division and remainder normally bind more tightly than addition and subtraction. Parentheses are the safest way to communicate the intended order, especially when an expression will be maintained later.

How to approach this LU

Translate the statement into variables and one small expression or decision.
Trace one sample by hand before running the program.
Check boundary values and the exact spelling/capitalization of the required output.

Code syntax / core snippet

Python

a, b, c = 2, 3, 4
result = a + b * c
print(result)

C++

int a=2,b=3,c=4;
int result = a + b * c;
cout << result;

Java

int a=2,b=3,c=4;
int result = a + b * c;
System.out.println(result);

JavaScript

const a=2,b=3,c=4;
const result = a + b * c;
console.log(result);

Input and Output Format

Input: Three integers a, b and c.

Output: Print a + (b × c).

Worked examples

Example 1

Example Input

2 3 4

Output

14

Explanation

Multiplication happens first: 2 + 12 = 14.

Example 2

Example Input

10 2 5

Output

20

Explanation

10 + 10 = 20.

M1-LU7 — Variable scope (block-level awareness)

Concept

Scope defines where a variable name is visible. In C++, Java and JavaScript, a variable declared with block-scoped declarations is limited to its block; Python's ordinary if and for blocks do not create a new local scope. Understanding this difference prevents accidental shadowing and incorrect assumptions when moving code between languages.

How to approach this LU

Translate the statement into variables and one small expression or decision.
Trace one sample by hand before running the program.
Check boundary values and the exact spelling/capitalization of the required output.

Code syntax / core snippet

Python

x = 10
if True:
    y = 20
print(x)

C++

int x = 10;
{
    int y = 20;
}
cout << x;

Java

int x = 10;
{
    int y = 20;
}
System.out.println(x);

JavaScript

let x = 10;
{
  let y = 20;
}
console.log(x);

Input and Output Format

Input: Two integers: outer value x and inner-block value y.

Output: Print the outer value x after the inner block ends.

Worked examples

Example 1

Example Input

10 20

Output

10

Explanation

The inner variable has block scope, so the outer x remains 10.

Example 2

Example Input

5 99

Output

5

Explanation

The inner value does not replace the outer value.

M1-LU8 — Working Boolean expressions

Concept

A Boolean expression has only two logical results: true or false. Comparisons create Boolean values, and logical operators combine them. When a condition becomes hard to read, name intermediate Boolean values so the program's intention is obvious.

How to approach this LU

Translate the statement into variables and one small expression or decision.
Trace one sample by hand before running the program.
Check boundary values and the exact spelling/capitalization of the required output.

Code syntax / core snippet

Python

age = 18
is_adult = age >= 18
print(is_adult)

C++

int age = 18;
bool isAdult = age >= 18;
cout << boolalpha << isAdult;

Java

int age = 18;
boolean isAdult = age >= 18;
System.out.println(isAdult);

JavaScript

const age = 18;
const isAdult = age >= 18;
console.log(isAdult);

Input and Output Format

Input: One integer age.

Output: Print true if age >= 18; otherwise print false.

Worked examples

Example 1

Example Input

18

Output

true

Explanation

18 meets the condition age >= 18.

Example 2

Example Input

17

Output

false

Explanation

17 does not meet the condition.

M1-LU9 — Conditionals (if, if–else, nested)

Concept

Conditionals let a program choose a path based on data. if handles a condition, if–else provides an alternative, and nested conditions make a second decision after the first one. Always consider boundaries such as equality, zero, the smallest input and the largest input.

How to approach this LU

Translate the statement into variables and one small expression or decision.
Trace one sample by hand before running the program.
Check boundary values and the exact spelling/capitalization of the required output.

Code syntax / core snippet

Python

if n > 0:
    print("positive")
elif n < 0:
    print("negative")
else:
    print("zero")

C++

if (n > 0) cout << "positive";
else if (n < 0) cout << "negative";
else cout << "zero";

Java

if (n > 0) System.out.println("positive");
else if (n < 0) System.out.println("negative");
else System.out.println("zero");

JavaScript

if (n > 0) console.log("positive");
else if (n < 0) console.log("negative");
else console.log("zero");

Input and Output Format

Input: One integer n.

Output: Print positive, negative, or zero.

Worked examples

Example 1

Example Input

8

Output

positive

Explanation

8 > 0.

Example 2

Example Input

-3

Output

negative

Explanation

-3 < 0.

Example 3

Example Input

0

Output

zero

Explanation

0 is neither positive nor negative.

M1-LU10 — Switch statement

Concept

A switch is useful when one expression is compared with several fixed choices. Each case represents one choice and default handles everything else. In C++/older JavaScript syntax, break prevents accidental fall-through; modern Java switch arrows avoid that issue.

How to approach this LU

Translate the statement into variables and one small expression or decision.
Trace one sample by hand before running the program.
Check boundary values and the exact spelling/capitalization of the required output.

Code syntax / core snippet

Python

match n:
    case 1: print("One")
    case 2: print("Two")
    case 3: print("Three")
    case _: print("Invalid")

C++

switch (n) {
  case 1: cout << "One"; break;
  case 2: cout << "Two"; break;
  case 3: cout << "Three"; break;
  default: cout << "Invalid";
}

Java

switch (n) {
  case 1 -> System.out.println("One");
  case 2 -> System.out.println("Two");
  case 3 -> System.out.println("Three");
  default -> System.out.println("Invalid");
}

JavaScript

switch (n) {
  case 1: console.log("One"); break;
  case 2: console.log("Two"); break;
  case 3: console.log("Three"); break;
  default: console.log("Invalid");
}

Input and Output Format

Input: One integer n.

Output: Print One, Two, Three for 1, 2, 3 respectively; otherwise print Invalid.

Worked examples

Example 1

Example Input

1

Output

One

Explanation

1 selects the first case.

Example 2

Example Input

3

Output

Three

Explanation

3 selects the third case.

Example 3

Example Input

7

Output

Invalid

Explanation

7 matches no listed case.

M1-LU11 — Basic debugging

Concept

Debugging is systematic checking, not random code changes. First verify the input is parsed correctly, then trace the important variables, conditions and loop boundaries. Compare the program's actual state with what should happen for a tiny hand-worked example.

How to approach this LU

Translate the statement into variables and one small expression or decision.
Trace one sample by hand before running the program.
Check boundary values and the exact spelling/capitalization of the required output.

Code syntax / core snippet

Python

a, b = 9, 4
print(a - b)  # check order

C++

int a=9,b=4;
cout << a - b; // not b - a

Java

int a=9,b=4;
System.out.println(a - b);

JavaScript

const a=9,b=4;
console.log(a - b);

Input and Output Format

Input: Two integers a and b.

Output: Print a - b.

Worked examples

Example 1

Example Input

9 4

Output

5

Explanation

9 - 4 = 5.

Example 2

Example Input

4 9

Output

-5

Explanation

4 - 9 = -5.

Belt 2 — Module 2

Belt 2 goal: Build the concepts in this module in order. The coding questions in Belt 2 use the same LU IDs, so learners apply each concept immediately after learning it.

M2-LU1 — For/ While/ Do while loops

Concept

A loop repeats a block of work. Use a for loop when the number or range of iterations is naturally count-based, while when continuation depends on a condition, and do-while when the body must execute at least once. A loop should always have a clear progress rule toward termination.

How to approach this LU

Identify what one iteration should do.
Write the initialization, continuation condition, and update separately.
Trace the first, middle, and final iterations to prove that the loop stops.

Code syntax / core snippet

Python

for i in range(1, n + 1):
    print(i)

C++

for (int i=1; i<=n; ++i) cout << i << '\n';

Java

for (int i=1; i<=n; i++) System.out.println(i);

JavaScript

for (let i=1; i<=n; i++) console.log(i);

Input and Output Format

Input: One integer n.

Output: Print integers 1 through n, one per line.

Worked examples

Example 1

Example Input

3

Output

1
2
3

Explanation

The loop performs three iterations.

Example 2

Example Input

1

Output

1

Explanation

Only one iteration is needed.

M2-LU2 — Break/ Continue

Concept

break stops the nearest loop immediately; continue skips the rest of the current iteration and moves to the next one. They are useful for early termination and filtering, but overusing them can hide the loop's main logic. Keep the stopping condition understandable.

How to approach this LU

Identify what one iteration should do.
Write the initialization, continuation condition, and update separately.
Trace the first, middle, and final iterations to prove that the loop stops.

Code syntax / core snippet

Python

for i in range(1, n+1):
    if i % 3 == 0: continue
    print(i)

C++

for (int i=1;i<=n;++i) {
  if (i%3==0) continue;
  cout << i << ' ';
}

Java

for (int i=1;i<=n;i++) {
  if (i%3==0) continue;
  System.out.print(i+" ");
}

JavaScript

for (let i=1;i<=n;i++) {
  if (i%3===0) continue;
  console.log(i);
}

Input and Output Format

Input: One integer n.

Output: Print integers from 1 through n except multiples of 3, one per line.

Worked examples

Example 1

Example Input

6

Output

1
2
4
5

Explanation

3 and 6 are skipped.

Example 2

Example Input

3

Output

1
2

Explanation

3 is skipped.

M2-LU3 — Nested loops

Concept

A nested loop performs an inner loop for each outer iteration. This is ideal for grids, tables and pair generation. If both loops run about n times, the total work is about n², so nested loops deserve a quick complexity check.

How to approach this LU

Identify what one iteration should do.
Write the initialization, continuation condition, and update separately.
Trace the first, middle, and final iterations to prove that the loop stops.

Code syntax / core snippet

Python

for r in range(n):
    for c in range(n):
        print('*', end='')
    print()

C++

for(int r=0;r<n;++r){
  for(int c=0;c<n;++c) cout << '*';
  cout << '\n';
}

Java

for(int r=0;r<n;r++){
  for(int c=0;c<n;c++) System.out.print('*');
  System.out.println();
}

JavaScript

for(let r=0;r<n;r++){
  let row='';
  for(let c=0;c<n;c++) row+='*';
  console.log(row);
}

Input and Output Format

Input: One integer n.

Output: Print an n×n square of * characters.

Worked examples

Example 1

Example Input

2

Output

Explanation

Two rows each contain two stars.

Example 2

Example Input

3

Output

*
*
*

Explanation

Three rows each contain three stars.

M2-LU4 — Loop tracing

Concept

Loop tracing means writing down the key variable values after each iteration. It turns a loop from something abstract into a small table of state changes. Trace the first few iterations and the final iteration, paying special attention to the update expression.

How to approach this LU

Identify what one iteration should do.
Write the initialization, continuation condition, and update separately.
Trace the first, middle, and final iterations to prove that the loop stops.

Code syntax / core snippet

Python

for i in range(1, n+1):
    value = i * i
    print(value)

C++

for(int i=1;i<=n;++i){
  int value=i*i;
  cout << value << '\n';
}

Java

for(int i=1;i<=n;i++){
  int value=i*i;
  System.out.println(value);
}

JavaScript

for(let i=1;i<=n;i++){
  const value=i*i;
  console.log(value);
}

Input and Output Format

Input: One integer n.

Output: Print i² for i = 1 through n, one per line.

Worked examples

Example 1

Example Input

3

Output

1
4
9

Explanation

The loop prints 1², 2² and 3².

Example 2

Example Input

4

Output

1
4
9
16

Explanation

The fourth iteration prints 4² = 16.

M2-LU5 — Pattern problems

Concept

Pattern printing becomes easier when you separate rows from columns. The outer loop chooses the row; the inner loop decides what appears inside that row. For triangles, the inner-loop limit often depends on the current row number.

How to approach this LU

Identify what one iteration should do.
Write the initialization, continuation condition, and update separately.
Trace the first, middle, and final iterations to prove that the loop stops.

Code syntax / core snippet

Python

for i in range(1, n+1):
    print('*' * i)

C++

for(int i=1;i<=n;++i){
  for(int j=1;j<=i;++j) cout << '*';
  cout << '\n';
}

Java

for(int i=1;i<=n;i++){
  for(int j=1;j<=i;j++) System.out.print('*');
  System.out.println();
}

JavaScript

for(let i=1;i<=n;i++) console.log('*'.repeat(i));

Input and Output Format

Input: One integer n.

Output: Print n rows; row i contains i stars.

Worked examples

Example 1

Example Input

3

Output

*

*

Explanation

Rows contain 1, 2 and 3 stars.

Example 2

Example Input

4

Output

*

*

Explanation

Each row adds one star.

M2-LU6 — Sentinel-controlled loops

Concept

A sentinel is a special input value used only to terminate a sequence. The key decision is whether the sentinel should be processed; here it should not. Read the value, check for the sentinel, then update the answer only for normal values.

How to approach this LU

Identify what one iteration should do.
Write the initialization, continuation condition, and update separately.
Trace the first, middle, and final iterations to prove that the loop stops.

Code syntax / core snippet

Python

total = 0
x = int(input())
while x != -1:
    total += x
    x = int(input())

C++

int x, total=0;
while(cin >> x && x != -1) total += x;

Java

int total=0, x=sc.nextInt();
while(x!=-1){ total+=x; x=sc.nextInt(); }

JavaScript

let total=0;
for (const x of nums) { if (x===-1) break; total+=x; }

Input and Output Format

Input: A sequence of integers ending with sentinel -1.

Output: Print the sum of all values before -1.

Worked examples

Example 1

Example Input

5 2 7 -1

Output

14

Explanation

5 + 2 + 7 = 14; -1 stops the loop.

Example 2

Example Input

-1

Output

0

Explanation

The sentinel appears first, so the sum is 0.

M2-LU7 — Input-driven loop termination

Concept

When the number of inputs is unknown, a value in the stream can control when the loop ends. The termination value belongs to the control protocol, not to the data being counted or summed. This pattern is common in interactive-style or sequence-processing problems.

How to approach this LU

Identify what one iteration should do.
Write the initialization, continuation condition, and update separately.
Trace the first, middle, and final iterations to prove that the loop stops.

Code syntax / core snippet

Python

count = 0
x = int(input())
while x != 0:
    count += 1
    x = int(input())

C++

int x,count=0;
while(cin>>x && x!=0) ++count;

Java

int x=sc.nextInt(), count=0;
while(x!=0){ count++; x=sc.nextInt(); }

JavaScript

let count=0;
for(const x of nums){ if(x===0) break; count++; }

Input and Output Format

Input: A sequence of integers ending with 0.

Output: Print how many non-zero values appear before 0.

Worked examples

Example 1

Example Input

5 7 0

Output

2

Explanation

5 and 7 are counted; 0 stops the loop.

Example 2

Example Input

1 -1 2 0

Output

3

Explanation

Three non-zero values occur before 0.

M2-LU8 — Difference between count-based vs condition-based loops

Concept

A count-based loop answers 'how many times?', while a condition-based loop answers 'while what is true?'. Recognizing the question helps you choose the loop structure. Count-based loops are often simpler when n is known; condition-based loops are natural when termination depends on input or state.

How to approach this LU

Identify what one iteration should do.
Write the initialization, continuation condition, and update separately.
Trace the first, middle, and final iterations to prove that the loop stops.

Code syntax / core snippet

Python

for i in range(1, n+1):
    print(2*i)

C++

for(int i=1;i<=n;++i) cout << 2*i << '\n';

Java

for(int i=1;i<=n;i++) System.out.println(2*i);

JavaScript

for(let i=1;i<=n;i++) console.log(2*i);

Input and Output Format

Input: One integer n.

Output: Print the first n positive even numbers, one per line.

Worked examples

Example 1

Example Input

3

Output

2
4
6

Explanation

The first three positive even numbers are 2, 4 and 6.

Example 2

Example Input

1

Output

2

Explanation

The first positive even number is 2.

M2-LU9 — Basic complexity intuition & problems using Arrays and Strings

Concept

Complexity is a way to predict how an algorithm scales as the input grows. A single pass through n values is usually O(n), while comparing every pair is usually O(n²). The goal is not to memorize formulas but to count how many times the main operation can run.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

largest = a[0]
for x in a[1:]:
    largest = max(largest, x)

C++

int largest=a[0];
for(int i=1;i<n;++i) largest=max(largest,a[i]);

Java

int largest=a[0];
for(int i=1;i<a.length;i++) largest=Math.max(largest,a[i]);

JavaScript

let largest=a[0];
for(let i=1;i<a.length;i++) largest=Math.max(largest,a[i]);

Input and Output Format

Input: n followed by n integers.

Output: Print the largest array value.

Worked examples

Example 1

Example Input

5
2 9 4 7 3

Output

9

Explanation

A single scan keeps 9 as the largest value.

Example 2

Example Input

3
-4 -2 -8

Output

-2

Explanation

-2 is greater than -4 and -8.

Belt 3 — Module 3

Belt 3 goal: Build the concepts in this module in order. The coding questions in Belt 3 use the same LU IDs, so learners apply each concept immediately after learning it.

M3-LU1 — Arrays

Concept

An array stores elements in contiguous indexed positions conceptually exposed through an index. With zero-based indexing, the first element is at index 0 and the last at n-1. Arrays are excellent when you need fast direct access by position.

How to approach this LU

Define exactly what one element/cell/character represents.
Choose the simplest traversal that visits each required position once.
Test the first position, last position, empty/small cases where allowed, and repeated values.

Code syntax / core snippet

Python

a = [2, 5, 1, 7]
total = sum(a)

C++

vector<int> a={2,5,1,7};
int total=0;
for(int x:a) total+=x;

Java

int[] a={2,5,1,7};
int total=0;
for(int x:a) total+=x;

JavaScript

const a=[2,5,1,7];
const total=a.reduce((s,x)=>s+x,0);

Input and Output Format

Input: n followed by n integers.

Output: Print the sum of the n integers.

Worked examples

Example 1

Example Input

4
2 5 1 7

Output

15

Explanation

2+5+1+7 = 15.

Example 2

Example Input

3
-1 4 2

Output

5

Explanation

-1+4+2 = 5.

M3-LU2 — Strings

Concept

A string is an ordered sequence of characters. You will repeatedly need to inspect characters, measure length, compare text, search for patterns, and build transformed strings. Be aware that string indexing and mutability differ between languages.

How to approach this LU

Define exactly what one element/cell/character represents.
Choose the simplest traversal that visits each required position once.
Test the first position, last position, empty/small cases where allowed, and repeated values.

Code syntax / core snippet

Python

s = "hello"
print(s[::-1])

C++

string s="hello";
reverse(s.begin(),s.end());
cout << s;

Java

String s="hello";
String rev=new StringBuilder(s).reverse().toString();

JavaScript

const s="hello";
console.log([...s].reverse().join(''));

Input and Output Format

Input: One string s.

Output: Print s in reverse order.

Worked examples

Example 1

Example Input

hello

Output

olleh

Explanation

Characters are read from the last position to the first.

Example 2

Example Input

abc

Output

cba

Explanation

The reverse of abc is cba.

M3-LU3 — Matrices

Concept

A matrix is a rectangular grid with rows and columns. Represent it as a two-dimensional array and use one loop for rows plus one loop for columns. Always keep the row/column order consistent when reading and printing cells.

How to approach this LU

Define exactly what one element/cell/character represents.
Choose the simplest traversal that visits each required position once.
Test the first position, last position, empty/small cases where allowed, and repeated values.

Code syntax / core snippet

Python

a = [[1,2],[3,4]]
total = sum(sum(row) for row in a)

C++

int a[2][2]={{1,2},{3,4}};
int total=0;
for(int i=0;i<2;i++) for(int j=0;j<2;j++) total+=a[i][j];

Java

int[][] a={{1,2},{3,4}};
int total=0;
for(int[] row:a) for(int x:row) total+=x;

JavaScript

const a=[[1,2],[3,4]];
let total=0;
for(const row of a) for(const x of row) total+=x;

Input and Output Format

Input: Two rows containing two integers each.

Output: Print the sum of all four cells.

Worked examples

Example 1

Example Input

1 2
3 4

Output

10

Explanation

1+2+3+4 = 10.

Example 2

Example Input

5 0
-2 3

Output

6

Explanation

5+0-2+3 = 6.

M3-LU4 — Indexing & bounds

Concept

An index must refer to an existing position. For a length-n zero-based sequence, valid positions are 0 through n-1. Most indexing bugs are boundary mistakes, so explicitly test the first and last valid index.

How to approach this LU

Define exactly what one element/cell/character represents.
Choose the simplest traversal that visits each required position once.
Test the first position, last position, empty/small cases where allowed, and repeated values.

Code syntax / core snippet

Python

a = [10,20,30,40]
i = 2
print(a[i])

C++

vector<int> a={10,20,30,40};
int i=2;
cout << a[i];

Java

int[] a={10,20,30,40};
int i=2;
System.out.println(a[i]);

JavaScript

const a=[10,20,30,40];
const i=2;
console.log(a[i]);

Input and Output Format

Input: n, followed by n integers, followed by a valid zero-based index i.

Output: Print the element at index i.

Worked examples

Example 1

Example Input

5
10 20 30 40 50
3

Output

40

Explanation

Index 3 contains 40.

Example 2

Example Input

3
4 9 2
0

Output

4

Explanation

Index 0 contains the first element, 4.

M3-LU5 — Traversal

Concept

Traversal means visiting each required element exactly in the order the problem asks for. A simple array traversal uses one loop; a matrix traversal uses nested row/column loops. While traversing, update only the state needed for the final answer.

How to approach this LU

Define exactly what one element/cell/character represents.
Choose the simplest traversal that visits each required position once.
Test the first position, last position, empty/small cases where allowed, and repeated values.

Code syntax / core snippet

Python

for x in a:
    print(2*x, end=' ')

C++

for(int x:a) cout << 2*x << ' ';

Java

for(int x:a) System.out.print(2*x+" ");

JavaScript

for(const x of a) process.stdout.write((2*x)+' ');

Input and Output Format

Input: n followed by n integers.

Output: Print every value multiplied by 2, in the same order.

Worked examples

Example 1

Example Input

3
2 4 6

Output

4 8 12

Explanation

Each value is multiplied by 2.

Example 2

Example Input

2
-1 5

Output

-2 10

Explanation

-1×2=-2 and 5×2=10.

M3-LU6 — Simple transformations

Concept

A transformation replaces each element according to the same rule. Examples include adding a constant, doubling values, changing case, or reversing a sequence. If the output must preserve order, transform each position without changing the traversal order.

How to approach this LU

Define exactly what one element/cell/character represents.
Choose the simplest traversal that visits each required position once.
Test the first position, last position, empty/small cases where allowed, and repeated values.

Code syntax / core snippet

Python

a = [x + 5 for x in a]

C++

for(int &x:a) x += 5;

Java

for(int i=0;i<a.length;i++) a[i]+=5;

JavaScript

for(let i=0;i<a.length;i++) a[i]+=5;

Input and Output Format

Input: n followed by n integers.

Output: Add 5 to every value and print the transformed array.

Worked examples

Example 1

Example Input

3
1 4 7

Output

6 9 12

Explanation

5 is added to each element.

Example 2

Example Input

2
-5 0

Output

0 5

Explanation

-5+5=0 and 0+5=5.

M3-LU7 — Basic string operations

Concept

String operations are the small building blocks behind larger text algorithms. Learn how to obtain length, access a character, concatenate, slice/substr, search, and compare. The method names differ, but the underlying operations are the same across languages.

How to approach this LU

Define exactly what one element/cell/character represents.
Choose the simplest traversal that visits each required position once.
Test the first position, last position, empty/small cases where allowed, and repeated values.

Code syntax / core snippet

Python

s, t = "hello", "world"
print(s + " " + t)

C++

string s="hello", t="world";
cout << s << ' ' << t;

Java

String s="hello", t="world";
System.out.println(s + " " + t);

JavaScript

const s="hello", t="world";
console.log(s + " " + t);

Input and Output Format

Input: Two strings s and t.

Output: Print s and t separated by one space.

Worked examples

Example 1

Example Input

hello world

Output

hello world

Explanation

The strings are joined with one space.

Example 2

Example Input

Kalvi Learn

Output

Kalvi Learn

Explanation

The input words are preserved in order.

M3-LU8 — Frequency counting in Arrays and Strings

Concept

Frequency counting converts repeated observations into a compact table of counts. A map/dictionary is ideal when the values are not limited to a tiny known range. The basic update is 'look up the current count, then add one'.

How to approach this LU

Define exactly what one element/cell/character represents.
Choose the simplest traversal that visits each required position once.
Test the first position, last position, empty/small cases where allowed, and repeated values.

Code syntax / core snippet

Python

freq = {}
for ch in s: freq[ch] = freq.get(ch,0) + 1

C++

unordered_map<char,int> freq;
for(char ch:s) ++freq[ch];

Java

Map<Character,Integer> freq=new HashMap<>();
for(char ch:s) freq.put(ch,freq.getOrDefault(ch,0)+1);

JavaScript

const freq=new Map();
for(const ch of s) freq.set(ch,(freq.get(ch)||0)+1);

Input and Output Format

Input: One lowercase string s.

Output: Print the number of occurrences of character 'a'.

Worked examples

Example 1

Example Input

banana

Output

3

Explanation

There are three a characters.

Example 2

Example Input

apple

Output

1

Explanation

There is one a.

M3-LU9 — Understanding why nested loops are slow

Concept

Two complete loops nested inside each other often mean every outer item is paired with every inner item. That creates n×n operations, or O(n²). Seeing this multiplication is the first step toward replacing repeated work with hashing, sorting or two pointers when possible.

How to approach this LU

Identify what one iteration should do.
Write the initialization, continuation condition, and update separately.
Trace the first, middle, and final iterations to prove that the loop stops.

Code syntax / core snippet

Python

for i in range(n):
    for j in range(n):
        print(i, j)

C++

for(int i=0;i<n;i++) for(int j=0;j<n;j++) cout<<i<<' '<<j<<'\n';

Java

for(int i=0;i<n;i++) for(int j=0;j<n;j++) System.out.println(i+" "+j);

JavaScript

for(let i=0;i<n;i++) for(let j=0;j<n;j++) console.log(i,j);

Input and Output Format

Input: One integer n.

Output: Print every ordered pair (i,j) for 1 ≤ i,j ≤ n, one pair per line.

Worked examples

Example 1

Example Input

2

Output

1 1
1 2
2 1
2 2

Explanation

There are 2×2 = 4 pairs.

Example 2

Example Input

3

Output

1 1
1 2
1 3
2 1
2 2
2 3
3 1
3 2
3 3

Explanation

There are 3×3 = 9 pairs.

M3-LU10 — Distinguishing constant vs linear vs quadratic growth

Concept

O(1) work stays roughly the same as n grows; O(n) grows proportionally with n; O(n²) grows with the square of n. Constants matter for real performance, but Big-O focuses on the dominant growth pattern. This is why a seemingly small change in loop structure can have a large effect.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

pairs = 0
for i in range(n):
    for j in range(i+1,n):
        if a[i] == a[j]: pairs += 1

C++

long long pairs=0;
for(int i=0;i<n;i++) for(int j=i+1;j<n;j++) if(a[i]==a[j]) ++pairs;

Java

long pairs=0;
for(int i=0;i<n;i++) for(int j=i+1;j<n;j++) if(a[i]==a[j]) pairs++;

JavaScript

let pairs=0;
for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) if(a[i]===a[j]) pairs++;

Input and Output Format

Input: n followed by n integers.

Output: Print the number of equal index pairs (i,j) with i < j.

Worked examples

Example 1

Example Input

4
1 1 2 3

Output

1

Explanation

Only the two 1s form an equal pair.

Example 2

Example Input

5
2 2 2 3 3

Output

4

Explanation

Three 2s make 3 pairs and two 3s make 1 pair.

Belt 4 — Module 4

Belt 4 goal: Build the concepts in this module in order. The coding questions in Belt 4 use the same LU IDs, so learners apply each concept immediately after learning it.

M4-LU1 — Subarrays

Concept

A subarray is contiguous, so once you choose its left and right endpoints every element between them belongs to it. This distinction matters because subsequences may skip elements. Many subarray problems become efficient when we maintain information about a moving range or a best segment ending at the current position.

How to approach this LU

State the information that must be maintained while scanning.
Ask whether previous work can be reused instead of recomputed.
Write down the invariant: what does each pointer, counter, or table entry mean?

Code syntax / core snippet

Python

best = cur = a[0]
for x in a[1:]:
    cur = max(x, cur + x)
    best = max(best, cur)

C++

long long cur=a[0], best=a[0];
for(int i=1;i<n;i++){ cur=max<long long>(a[i],cur+a[i]); best=max(best,cur); }

Java

long cur=a[0], best=a[0];
for(int i=1;i<a.length;i++){ cur=Math.max(a[i],cur+a[i]); best=Math.max(best,cur); }

JavaScript

let cur=a[0], best=a[0];
for(let i=1;i<a.length;i++){ cur=Math.max(a[i],cur+a[i]); best=Math.max(best,cur); }

Input and Output Format

Input: n followed by n integers.

Output: Print the maximum sum of a non-empty contiguous subarray.

Worked examples

Example 1

Example Input

5
-2 3 -1 5 -4

Output

7

Explanation

3 + (-1) + 5 = 7 is the best contiguous sum.

Example 2

Example Input

3
-5 -2 -8

Output

-2

Explanation

For a non-empty answer, -2 is the largest possible sum.

M4-LU2 — Prefix/ Suffix sums

Concept

A prefix-sum array stores cumulative totals so a range can be recovered by subtracting two prefix values. For inclusive range [l,r], the sum is prefix[r+1] - prefix[l] when prefix has a leading zero. Suffix sums use the same idea from the opposite direction.

How to approach this LU

State the information that must be maintained while scanning.
Ask whether previous work can be reused instead of recomputed.
Write down the invariant: what does each pointer, counter, or table entry mean?

Code syntax / core snippet

Python

prefix = [0]
for x in a:
    prefix.append(prefix[-1] + x)
range_sum = prefix[r+1] - prefix[l]

C++

vector<long long> pref(n+1);
for(int i=0;i<n;i++) pref[i+1]=pref[i]+a[i];
long long sum=pref[r+1]-pref[l];

Java

long[] pref=new long[n+1];
for(int i=0;i<n;i++) pref[i+1]=pref[i]+a[i];
long sum=pref[r+1]-pref[l];

JavaScript

const pref=Array(n+1).fill(0);
for(let i=0;i<n;i++) pref[i+1]=pref[i]+a[i];
const sum=pref[r+1]-pref[l];

Input and Output Format

Input: n, q, n array values, then q lines each containing l and r (0-based, inclusive).

Output: Print one range sum per query.

Worked examples

Example 1

Example Input

5 3
1 2 3 4 5
0 2
1 3
2 4

Output

6
9
12

Explanation

The ranges sum to 1+2+3=6, 2+3+4=9, and 3+4+5=12.

Example 2

Example Input

4 2
1 -1 2 3
0 1
2 3

Output

0
5

Explanation

1-1=0 and 2+3=5.

M4-LU3 — Hashing (frequency maps)

Concept

A hash map associates a key with a value and provides average O(1) lookup and update. Frequency maps use each distinct number or character as a key and its count as the value. This often changes a repeated-search solution from quadratic time to linear expected time.

How to approach this LU

State the information that must be maintained while scanning.
Ask whether previous work can be reused instead of recomputed.
Write down the invariant: what does each pointer, counter, or table entry mean?

Code syntax / core snippet

Python

from collections import Counter
freq = Counter(a)
answer = freq[x]

C++

unordered_map<int,int> freq;
for(int x:a) ++freq[x];
cout << freq[target];

Java

Map<Integer,Integer> freq=new HashMap<>();
for(int x:a) freq.put(x,freq.getOrDefault(x,0)+1);

JavaScript

const freq=new Map();
for(const x of a) freq.set(x,(freq.get(x)||0)+1);

Input and Output Format

Input: n and x, followed by n integers.

Output: Print how many times x occurs.

Worked examples

Example 1

Example Input

6 2
2 5 2 7 2 5

Output

3

Explanation

2 occurs three times.

Example 2

Example Input

4 9
1 2 3 4

Output

0

Explanation

9 does not occur.

M4-LU4 — Kadane’s algorithm

Concept

Kadane's algorithm tracks the best subarray sum that ends at the current position. At each value, either start a new segment here or extend the previous segment. Keeping both the current best ending here and the global best gives an O(n) solution.

How to approach this LU

State the information that must be maintained while scanning.
Ask whether previous work can be reused instead of recomputed.
Write down the invariant: what does each pointer, counter, or table entry mean?

Code syntax / core snippet

Python

best = cur = a[0]
for x in a[1:]:
    cur = max(x, cur + x)
    best = max(best, cur)

C++

long long cur=a[0], best=a[0];
for(int i=1;i<n;i++){ cur=max<long long>(a[i],cur+a[i]); best=max(best,cur); }

Java

long cur=a[0], best=a[0];
for(int i=1;i<a.length;i++){ cur=Math.max(a[i],cur+a[i]); best=Math.max(best,cur); }

JavaScript

let cur=a[0], best=a[0];
for(let i=1;i<a.length;i++){ cur=Math.max(a[i],cur+a[i]); best=Math.max(best,cur); }

Input and Output Format

Input: n followed by n integers.

Output: Print the maximum non-empty contiguous subarray sum.

Worked examples

Example 1

Example Input

5
-2 3 -1 5 -4

Output

7

Explanation

The best segment is [3,-1,5].

Example 2

Example Input

4
1 2 -1 4

Output

6

Explanation

The whole array has sum 6.

M4-LU5 — Dutch National Flag

Concept

For values limited to 0, 1 and 2, maintain three regions: processed 0s, processed 1s, and unprocessed values, with 2s collected at the end. The low, mid, and high pointers move the boundaries without using another array.

How to approach this LU

State the information that must be maintained while scanning.
Ask whether previous work can be reused instead of recomputed.
Write down the invariant: what does each pointer, counter, or table entry mean?

Code syntax / core snippet

Python

low = mid = 0
high = len(a) - 1
while mid <= high:
    if a[mid] == 0: a[low],a[mid]=a[mid],a[low]; low+=1; mid+=1
    elif a[mid] == 1: mid+=1
    else: a[mid],a[high]=a[high],a[mid]; high-=1

C++

int low=0,mid=0,high=n-1;
while(mid<=high){ if(a[mid]==0) swap(a[low++],a[mid++]); else if(a[mid]==1) ++mid; else swap(a[mid],a[high--]); }

Java

int low=0,mid=0,high=a.length-1;
while(mid<=high){ if(a[mid]==0){int t=a[low];a[low++]=a[mid];a[mid++]=t;} else if(a[mid]==1) mid++; else {int t=a[mid];a[mid]=a[high];a[high--]=t;} }

JavaScript

let low=0,mid=0,high=a.length-1;
while(mid<=high){ if(a[mid]===0){[a[low++],a[mid++]]=[a[mid],a[low]];} else if(a[mid]===1) mid++; else {[a[mid],a[high--]]=[a[high],a[mid]];} }

Input and Output Format

Input: n followed by n values, each 0, 1, or 2.

Output: Print the values sorted as all 0s, then 1s, then 2s.

Worked examples

Example 1

Example Input

6
2 0 2 1 1 0

Output

0 0 1 1 2 2

Explanation

Zeros, then ones, then twos are placed in order.

Example 2

Example Input

5
2 2 0 1 0

Output

0 0 1 2 2

Explanation

The values are partitioned into the three groups.

M4-LU6 — Moore’s Voting

Concept

When a true majority exists, its occurrences outnumber all other values combined. Moore's Voting pairs different values conceptually and cancels them, leaving a candidate. If a majority is not guaranteed, a second pass is required to verify the candidate's count.

How to approach this LU

State the information that must be maintained while scanning.
Ask whether previous work can be reused instead of recomputed.
Write down the invariant: what does each pointer, counter, or table entry mean?

Code syntax / core snippet

Python

candidate = None; count = 0
for x in a:
    if count == 0: candidate = x
    count += 1 if x == candidate else -1

C++

int candidate=0,count=0;
for(int x:a){ if(count==0) candidate=x; count += (x==candidate ? 1 : -1); }

Java

int candidate=0,count=0;
for(int x:a){ if(count==0) candidate=x; count += (x==candidate ? 1 : -1); }

JavaScript

let candidate=0,count=0;
for(const x of a){ if(count===0) candidate=x; count += x===candidate ? 1 : -1; }

Input and Output Format

Input: n followed by n integers.

Output: Print the value occurring more than n/2 times, or -1 if no such value exists.

Worked examples

Example 1

Example Input

7
2 2 1 2 3 2 2

Output

2

Explanation

2 occurs five times, more than half of 7.

Example 2

Example Input

4
1 2 3 4

Output

-1

Explanation

No value occurs more than 2 times.

M4-LU7 — Basic sorting algorithms (Selection/ Bubble/ Insertion/ Quick/ Merge)

Concept

Sorting is the foundation for many later techniques. Selection sort repeatedly places the smallest remaining value, bubble sort swaps adjacent inversions, insertion sort grows a sorted prefix, merge sort divides and merges in O(n log n), and quicksort partitions around a pivot with average O(n log n).

How to approach this LU

State the information that must be maintained while scanning.
Ask whether previous work can be reused instead of recomputed.
Write down the invariant: what does each pointer, counter, or table entry mean?

Code syntax / core snippet

Python

a.sort()  # built-in sort

# Insertion-sort core:
for i in range(1, len(a)):
    key = a[i]
    j = i - 1
    while j >= 0 and a[j] > key:
        a[j + 1] = a[j]
        j -= 1
    a[j + 1] = key

C++

sort(a.begin(),a.end());
// Insertion-sort core:
for(int i=1;i<n;i++){ int key=a[i],j=i-1; while(j>=0&&a[j]>key){a[j+1]=a[j];--j;} a[j+1]=key; }

Java

Arrays.sort(a);
// Insertion-sort core:
for(int i=1;i<a.length;i++){ int key=a[i],j=i-1; while(j>=0&&a[j]>key){a[j+1]=a[j];j--;} a[j+1]=key; }

JavaScript

a.sort((x,y)=>x-y);
// Numeric comparator is important for JavaScript.

Input and Output Format

Input: n followed by n integers.

Output: Print the integers in nondecreasing order.

Worked examples

Example 1

Example Input

5
5 1 4 2 3

Output

1 2 3 4 5

Explanation

Sorting rearranges the values from smallest to largest.

Example 2

Example Input

4
7 7 2 1

Output

1 2 7 7

Explanation

Both copies of 7 remain after sorting.

M4-LU8 — Sliding Window

Concept

A sliding window represents a contiguous range with two boundaries. When the window moves one position, remove the element leaving and add the element entering instead of recomputing the whole sum. This turns many fixed-size window problems into O(n).

How to approach this LU

State the information that must be maintained while scanning.
Ask whether previous work can be reused instead of recomputed.
Write down the invariant: what does each pointer, counter, or table entry mean?

Code syntax / core snippet

Python

window = sum(a[:k])
best = window
for r in range(k, len(a)):
    window += a[r] - a[r-k]
    best = max(best, window)

C++

long long window=0;
for(int i=0;i<k;i++) window+=a[i];
long long best=window;
for(int r=k;r<n;r++){ window+=a[r]-a[r-k]; best=max(best,window); }

Java

long window=0;
for(int i=0;i<k;i++) window+=a[i];
long best=window;
for(int r=k;r<a.length;r++){ window+=a[r]-a[r-k]; best=Math.max(best,window); }

JavaScript

let window=0;
for(let i=0;i<k;i++) window+=a[i];
let best=window;
for(let r=k;r<a.length;r++){ window+=a[r]-a[r-k]; best=Math.max(best,window); }

Input and Output Format

Input: n, k, followed by n integers.

Output: Print the maximum sum of any contiguous subarray of length k.

Worked examples

Example 1

Example Input

5 3
2 1 5 1 3

Output

9

Explanation

Window sums are 8, 7 and 9; the maximum is 9.

Example 2

Example Input

4 2
-1 4 2 3

Output

6

Explanation

Window sums are 3, 6 and 5.

Belt 5 — Module 5

Belt 5 goal: Build the concepts in this module in order. The coding questions in Belt 5 use the same LU IDs, so learners apply each concept immediately after learning it.

M5-LU1 — Linked lists (Singly/ Doubly/ Circular)

Concept

A linked list stores nodes connected by references rather than relying on contiguous positions. Singly linked nodes point forward, doubly linked nodes point both ways, and circular lists connect the tail back into the list. Linked lists make insertion/deletion at known nodes convenient but do not provide array-style O(1) random indexing.

How to approach this LU

Draw the structure before changing pointers or boundaries.
State what each pointer/reference represents after every operation.
Test tiny structures: empty/one node, two nodes, and a case that exercises the special condition.

Code syntax / core snippet

Python

class Node:
    def __init__(self, value):
        self.value, self.next = value, None

C++

struct Node { int data; Node* next; Node(int x):data(x),next(nullptr){} };

Java

class Node { int data; Node next; Node(int x){ data=x; } }

JavaScript

class Node { constructor(data){ this.data=data; this.next=null; } }

Input and Output Format

Input: n followed by n integers.

Output: Build a singly linked list in input order and print it from head to tail.

Worked examples

Example 1

Example Input

4
10 20 30 40

Visual representation

  10  →  20  →  30  →  40  →  NULL

Output

10 20 30 40

Explanation

Nodes are linked in input order and traversal follows next references.

Example 2

Example Input

3
-2 5 0

Visual representation

  -2  →  5  →  0  →  NULL

Output

-2 5 0

Explanation

Traversal visits the three nodes in order.

M5-LU2 — Stacks

Concept

A stack follows LIFO: the most recently pushed item is removed first. The main operations are push, pop and peek/top. Stacks naturally model nested structures such as parentheses, function-call order and undo history.

How to approach this LU

Draw the structure before changing pointers or boundaries.
State what each pointer/reference represents after every operation.
Test tiny structures: empty/one node, two nodes, and a case that exercises the special condition.

Code syntax / core snippet

Python

stack=[]
stack.append('(')
top=stack.pop()

C++

stack<char> st;
st.push('(');
char top=st.top(); st.pop();

Java

Stack<Character> st=new Stack<>();
st.push('(');
char top=st.pop();

JavaScript

const stack=[];
stack.push('(');
const top=stack.pop();

Input and Output Format

Input: One parentheses string containing '(' and ')'.

Output: Print Balanced if every parenthesis is correctly matched; otherwise print Not Balanced.

Worked examples

Example 1

Example Input

()()

Output

Balanced

Explanation

Each opening parenthesis is matched by the next closing parenthesis.

Example 2

Example Input

(()

Output

Not Balanced

Explanation

One opening parenthesis remains unmatched.

M5-LU3 — Queues

Concept

A queue follows FIFO: the earliest inserted item leaves first. The main operations are enqueue and dequeue. Queues are the natural structure for level-order traversal and breadth-first search because they preserve discovery order.

How to approach this LU

Draw the structure before changing pointers or boundaries.
State what each pointer/reference represents after every operation.
Test tiny structures: empty/one node, two nodes, and a case that exercises the special condition.

Code syntax / core snippet

Python

from collections import deque
q=deque()
q.append(10)
x=q.popleft()

C++

queue<int> q;
q.push(10);
int x=q.front(); q.pop();

Java

Queue<Integer> q=new ArrayDeque<>();
q.add(10);
int x=q.remove();

JavaScript

const q=[];
q.push(10);
const x=q.shift();

Input and Output Format

Input: n followed by n integers.

Output: Enqueue all values, dequeue them, and print them in FIFO order.

Worked examples

Example 1

Example Input

4
3 1 4 2

Output

3 1 4 2

Explanation

FIFO order is the same as insertion order.

Example 2

Example Input

3
-1 5 7

Output

-1 5 7

Explanation

The first inserted value leaves first.

M5-LU4 — Monotonic stack

Concept

A monotonic stack stores candidates in increasing or decreasing order. When a new value breaks the order, smaller or larger candidates can be resolved immediately and removed. Because each element is pushed and popped at most once, many next-greater/smaller problems become O(n).

How to approach this LU

Draw the structure before changing pointers or boundaries.
State what each pointer/reference represents after every operation.
Test tiny structures: empty/one node, two nodes, and a case that exercises the special condition.

Code syntax / core snippet

Python

stack=[]
for i,x in enumerate(a):
    while stack and a[stack[-1]] < x:
        ans[stack.pop()] = x
    stack.append(i)

C++

vector<int> st,ans(n,-1);
for(int i=0;i<n;i++){ while(!st.empty()&&a[st.back()]<a[i]){ans[st.back()]=a[i];st.pop_back();} st.push_back(i); }

Java

Deque<Integer> st=new ArrayDeque<>();
for(int i=0;i<a.length;i++){ while(!st.isEmpty()&&a[st.peek()]<a[i]) ans[st.pop()]=a[i]; st.push(i); }

JavaScript

const st=[], ans=Array(a.length).fill(-1);
for(let i=0;i<a.length;i++){ while(st.length&&a[st.at(-1)]<a[i]) ans[st.pop()]=a[i]; st.push(i); }

Input and Output Format

Input: n followed by n integers.

Output: For each value, print its next greater value to the right, or -1.

Worked examples

Example 1

Example Input

4
2 1 3 2

Output

3 3 -1 -1

Explanation

2→3, 1→3, and no greater value exists for 3 or 2.

Example 2

Example Input

3
1 2 3

Output

2 3 -1

Explanation

Each value finds the next larger value, except 3.

M5-LU5 — Two-pointer technique

Concept

Two pointers maintain two positions and move them according to information already known about the data. In a sorted array, if a pair sum is too small, moving the left pointer right increases the sum; if it is too large, moving the right pointer left decreases it. This is why sorting can turn pair search into a linear scan.

How to approach this LU

Draw the structure before changing pointers or boundaries.
State what each pointer/reference represents after every operation.
Test tiny structures: empty/one node, two nodes, and a case that exercises the special condition.

Code syntax / core snippet

Python

l, r = 0, len(a)-1
while l < r:
    s = a[l] + a[r]
    if s == target: break
    if s < target: l += 1
    else: r -= 1

C++

int l=0,r=n-1;
while(l<r){ int s=a[l]+a[r]; if(s==target) break; if(s<target) ++l; else --r; }

Java

int l=0,r=a.length-1;
while(l<r){ int s=a[l]+a[r]; if(s==target) break; if(s<target) l++; else r--; }

JavaScript

let l=0,r=a.length-1;
while(l<r){ const s=a[l]+a[r]; if(s===target) break; if(s<target) l++; else r--; }

Input and Output Format

Input: n, n sorted integers, then target x.

Output: Print YES if two different elements sum to x; otherwise print NO.

Worked examples

Example 1

Example Input

5
1 2 4 7 11
9

Output

YES

Explanation

2 + 7 = 9.

Example 2

Example Input

4
1 3 5 8
10

Output

NO

Explanation

No pair sums to 10.

M5-LU6 — Hare–tortoise method

Concept

The slow pointer moves one step while the fast pointer moves two. In a cyclic linked list, the faster pointer eventually catches the slower one; in an acyclic list, fast reaches null. This gives cycle detection with O(1) extra space.

How to approach this LU

Draw the structure before changing pointers or boundaries.
State what each pointer/reference represents after every operation.
Test tiny structures: empty/one node, two nodes, and a case that exercises the special condition.

Code syntax / core snippet

Python

slow = head
fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next

C++

Node *slow=head, *fast=head;
while(fast && fast->next){ slow=slow->next; fast=fast->next->next; }

Java

Node slow=head, fast=head;
while(fast!=null && fast.next!=null){ slow=slow.next; fast=fast.next.next; }

JavaScript

let slow=head, fast=head;
while(fast && fast.next){ slow=slow.next; fast=fast.next.next; }

Input and Output Format

Input: A linked-list description containing node values and next references as specified by the implementation.

Output: Print YES if a cycle exists; otherwise print NO.

Worked examples

Example 1

Example Input

4
1 2 3 2

Output

YES

Explanation

The final node points back to an earlier node, so slow and fast meet.

Example 2

Example Input

3
1 2 3 -1

Output

NO

Explanation

The list ends at null, so the pointers cannot cycle.

Belt 6 — Module 6

Belt 6 goal: Build the concepts in this module in order. The coding questions in Belt 6 use the same LU IDs, so learners apply each concept immediately after learning it.

M6-LU1 — Recursion fundamentals

Concept

Recursion expresses a solution in terms of a smaller version of the same problem. A call should make measurable progress toward a base case. The call stack stores the unfinished work, so recursive depth is part of the algorithm's space cost.

How to approach this LU

Define the recursive state and the smallest solvable case.
Write the recursive transition before adding optimization.
Draw the first few levels of the call tree and verify that every path reaches the base case.

Code syntax / core snippet

Python

def factorial(n):
    if n == 0: return 1
    return n * factorial(n-1)

C++

long long factorial(int n){
  if(n==0) return 1;
  return n*factorial(n-1);
}

Java

long factorial(int n){
  if(n==0) return 1;
  return n*factorial(n-1);
}

JavaScript

function factorial(n){
  if(n===0) return 1;
  return n*factorial(n-1);
}

Input and Output Format

Input: One non-negative integer n.

Output: Print n!.

Worked examples

Example 1

Example Input

5

Output

120

Explanation

5×4×3×2×1 = 120.

Example 2

Example Input

3

Output

6

Explanation

3×2×1 = 6.

M6-LU2 — Base/recursive cases

Concept

Every recursive function needs a base case that can be answered directly and a recursive case that reduces the problem. If the recursive case does not move toward the base case, the function may never terminate. Writing the base case first is a useful habit.

How to approach this LU

Define the recursive state and the smallest solvable case.
Write the recursive transition before adding optimization.
Draw the first few levels of the call tree and verify that every path reaches the base case.

Code syntax / core snippet

Python

def sum_to(n):
    if n == 0: return 0
    return n + sum_to(n-1)

C++

int sumTo(int n){ if(n==0) return 0; return n+sumTo(n-1); }

Java

int sumTo(int n){ if(n==0) return 0; return n+sumTo(n-1); }

JavaScript

function sumTo(n){ if(n===0) return 0; return n+sumTo(n-1); }

Input and Output Format

Input: One non-negative integer n.

Output: Print 1 + 2 + ... + n.

Worked examples

Example 1

Example Input

5

Output

15

Explanation

5+4+3+2+1 = 15.

Example 2

Example Input

3

Output

6

Explanation

3+2+1 = 6.

M6-LU3 — Recursion tree intuition

Concept

A recursion tree expands one node for each call and branches when a function makes multiple recursive calls. The tree reveals how many subproblems are created and where repeated work occurs. Fibonacci is a classic example because the same smaller values are recomputed many times.

How to approach this LU

Define the recursive state and the smallest solvable case.
Write the recursive transition before adding optimization.
Draw the first few levels of the call tree and verify that every path reaches the base case.

Code syntax / core snippet

Python

def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)

C++

int fib(int n){ if(n<2) return n; return fib(n-1)+fib(n-2); }

Java

int fib(int n){ if(n<2) return n; return fib(n-1)+fib(n-2); }

JavaScript

function fib(n){ if(n<2) return n; return fib(n-1)+fib(n-2); }

Input and Output Format

Input: One non-negative integer n.

Output: Print Fibonacci(n), with F(0)=0 and F(1)=1.

Worked examples

Example 1

Example Input

5

Output

5

Explanation

Fibonacci values are 0,1,1,2,3,5.

Example 2

Example Input

6

Output

8

Explanation

F(6)=F(5)+F(4)=5+3=8.

M6-LU4 — Backtracking

Concept

Backtracking explores a decision tree while maintaining a partial solution. The standard cycle is choose a candidate, recurse, then undo the choice before trying the next candidate. The undo step is what allows one mutable path to represent many possibilities.

How to approach this LU

Define the recursive state and the smallest solvable case.
Write the recursive transition before adding optimization.
Draw the first few levels of the call tree and verify that every path reaches the base case.

Code syntax / core snippet

Python

def gen(i, cur):
    if i == n: print(''.join(cur)); return
    for ch in '01':
        cur.append(ch); gen(i+1,cur); cur.pop()

C++

void gen(int i,string &cur){ if(i==n){cout<<cur<<'\n';return;} for(char c:{'0','1'}){cur.push_back(c);gen(i+1,cur);cur.pop_back();} }

Java

void gen(int i,StringBuilder cur){ if(i==n){System.out.println(cur);return;} for(char c:new char[]{'0','1'}){cur.append(c);gen(i+1,cur);cur.deleteCharAt(cur.length()-1);} }

JavaScript

function gen(i,cur){ if(i===n){ console.log(cur); return; } for(const ch of ['0','1']) gen(i+1,cur+ch); }

Input and Output Format

Input: One integer n.

Output: Print every binary string of length n in lexicographic order.

Worked examples

Example 1

Example Input

2

Output

00
01
10
11

Explanation

Each position chooses 0 or 1.

Example 2

Example Input

3

Output

000
001
010
011
100
101
110
111

Explanation

Three positions create 2³ = 8 strings.

M6-LU5 — Subsets

Concept

For every element, a subset has exactly two choices: exclude it or include it. That creates 2^n possible subsets for n distinct elements. The recursion tree is therefore a binary tree of depth n.

How to approach this LU

Define the recursive state and the smallest solvable case.
Write the recursive transition before adding optimization.
Draw the first few levels of the call tree and verify that every path reaches the base case.

Code syntax / core snippet

Python

def subsets(i, cur):
    if i == len(a):
        print(cur); return
    subsets(i+1, cur)
    subsets(i+1, cur+[a[i]])

C++

void subsets(int i,vector<int>&cur){ if(i==n){print(cur);return;} subsets(i+1,cur); cur.push_back(a[i]); subsets(i+1,cur); cur.pop_back(); }

Java

void subsets(int i,List<Integer> cur){ if(i==a.length){System.out.println(cur);return;} subsets(i+1,cur); cur.add(a[i]); subsets(i+1,cur); cur.remove(cur.size()-1); }

JavaScript

function subsets(i,cur){ if(i===a.length){ console.log(cur); return; } subsets(i+1,cur); subsets(i+1,[...cur,a[i]]); }

Input and Output Format

Input: n followed by n distinct integers.

Output: Print all subsets using exclude-then-include order.

Worked examples

Example 1

Example Input

2
1 2

Output

[]
[2]
[1]
[1, 2]

Explanation

Each element is either skipped or selected.

Example 2

Example Input

1
5

Output

[]
[5]

Explanation

There are exactly two subsets.

M6-LU6 — Subsequences

Concept

A subsequence preserves relative order but may skip characters. Each character creates a skip/take decision, producing 2^n subsequences for n positions when duplicates are not merged. The empty subsequence is normally included.

How to approach this LU

Define the recursive state and the smallest solvable case.
Write the recursive transition before adding optimization.
Draw the first few levels of the call tree and verify that every path reaches the base case.

Code syntax / core snippet

Python

def subseq(i, cur):
    if i == len(s): print(cur); return
    subseq(i+1, cur)
    subseq(i+1, cur+s[i])

C++

void subseq(int i,string &cur){ if(i==s.size()){cout<<cur<<'\n';return;} subseq(i+1,cur); cur+=s[i]; subseq(i+1,cur); cur.pop_back(); }

Java

void subseq(int i,String cur){ if(i==s.length()){System.out.println(cur);return;} subseq(i+1,cur); subseq(i+1,cur+s.charAt(i)); }

JavaScript

function subseq(i,cur){ if(i===s.length){ console.log(cur); return; } subseq(i+1,cur); subseq(i+1,cur+s[i]); }

Input and Output Format

Input: n followed by a string of length n.

Output: Print all subsequences using skip-then-take order.

Worked examples

Example 1

Example Input

2
ab

Output

b
a
ab

Explanation

For each character, choose skip or take. The empty subsequence is printed first, followed by b, a, and ab in the requested skip-then-take order.

Example 2

Example Input

1
a

Output

a

Explanation

There are two choices for one character: skip it (empty) or take it (a).

M6-LU7 — Permutations

Concept

A permutation arranges every element exactly once, so at each depth you choose one unused element. For n distinct elements there are n! permutations. This factorial growth is why permutation generation is usually limited to small n.

How to approach this LU

Define the recursive state and the smallest solvable case.
Write the recursive transition before adding optimization.
Draw the first few levels of the call tree and verify that every path reaches the base case.

Code syntax / core snippet

Python

def permute(path, used):
    if len(path)==len(a): print(path); return
    for i,x in enumerate(a):
        if not used[i]: used[i]=True; permute(path+[x],used); used[i]=False

C++

void permute(vector<int>&cur,vector<bool>&used){ if(cur.size()==a.size()){print(cur);return;} for(int i=0;i<a.size();i++) if(!used[i]){used[i]=1;cur.push_back(a[i]);permute(cur,used);cur.pop_back();used[i]=0;} }

Java

void permute(List<Integer> cur,boolean[] used){ if(cur.size()==a.length){System.out.println(cur);return;} for(int i=0;i<a.length;i++) if(!used[i]){used[i]=true;cur.add(a[i]);permute(cur,used);cur.remove(cur.size()-1);used[i]=false;} }

JavaScript

function permute(cur,used){ if(cur.length===a.length){console.log(cur);return;} for(let i=0;i<a.length;i++) if(!used[i]){used[i]=true;permute([...cur,a[i]],used);used[i]=false;} }

Input and Output Format

Input: n followed by n distinct integers.

Output: Print all permutations.

Worked examples

Example 1

Example Input

3
1 2 3

Output

123
132
213
231
312
321

Explanation

There are 3! = 6 different orders.

Example 2

Example Input

2
1 2

Output

12
21

Explanation

There are 2! = 2 orders.

M6-LU8 — Power set

Concept

The power set is the complete collection of all subsets of a set. For n elements it contains 2^n subsets, including the empty set and the full set. Thinking in terms of include/exclude decisions makes this count immediate.

How to approach this LU

Define the recursive state and the smallest solvable case.
Write the recursive transition before adding optimization.
Draw the first few levels of the call tree and verify that every path reaches the base case.

Code syntax / core snippet

Python

def subsets(i, cur):
    if i == len(a):
        print(cur); return
    subsets(i+1, cur)
    subsets(i+1, cur+[a[i]])

C++

void subsets(int i,vector<int>&cur){ if(i==n){print(cur);return;} subsets(i+1,cur); cur.push_back(a[i]); subsets(i+1,cur); cur.pop_back(); }

Java

void subsets(int i,List<Integer> cur){ if(i==a.length){System.out.println(cur);return;} subsets(i+1,cur); cur.add(a[i]); subsets(i+1,cur); cur.remove(cur.size()-1); }

JavaScript

function subsets(i,cur){ if(i===a.length){ console.log(cur); return; } subsets(i+1,cur); subsets(i+1,[...cur,a[i]]); }

Input and Output Format

Input: One non-negative integer n.

Output: Print 2^n, the number of subsets of an n-element set.

Worked examples

Example 1

Example Input

2

Output

4

Explanation

2² = 4 subsets.

Example 2

Example Input

4

Output

16

Explanation

2⁴ = 16 subsets.

M6-LU9 — Recursion depth & stack limits

Concept

Each active recursive call consumes call-stack space. A mathematically simple O(n) recursive algorithm can still fail when n is very large because the call stack has a finite limit. When recursion depth is large and no recursive structure is required, an iterative solution is often safer.

How to approach this LU

Define the recursive state and the smallest solvable case.
Write the recursive transition before adding optimization.
Draw the first few levels of the call tree and verify that every path reaches the base case.

Code syntax / core snippet

Python

total = 0
for i in range(1, n+1):
    total += i

C++

long long total=0;
for(int i=1;i<=n;i++) total+=i;

Java

long total=0;
for(int i=1;i<=n;i++) total+=i;

JavaScript

let total=0;
for(let i=1;i<=n;i++) total+=i;

Input and Output Format

Input: One non-negative integer n.

Output: Print 1 + 2 + ... + n using an iterative approach.

Worked examples

Example 1

Example Input

5

Output

15

Explanation

The loop adds 1 through 5 without recursive stack growth.

Example 2

Example Input

100

Output

5050

Explanation

100×101÷2 = 5050.

M6-LU10 — Duplicate handling in permutations/ Subsets

Concept

Duplicate input values can cause the same result to be generated through different choices. Sorting places equal values next to each other, making it possible to skip a duplicate choice at the same recursion depth. This removes duplicate results without removing legitimate repeated values at deeper levels.

How to approach this LU

Define the recursive state and the smallest solvable case.
Write the recursive transition before adding optimization.
Draw the first few levels of the call tree and verify that every path reaches the base case.

Code syntax / core snippet

Python

a.sort()
for i in range(start, len(a)):
    if i > start and a[i] == a[i-1]: continue

C++

sort(a.begin(),a.end());
for(int i=start;i<n;i++){
  if(i>start && a[i]==a[i-1]) continue;
  // choose a[i]
}

Java

Arrays.sort(a);
for(int i=start;i<a.length;i++){
  if(i>start && a[i]==a[i-1]) continue;
  // choose a[i]
}

JavaScript

a.sort((x,y)=>x-y);
for(let i=start;i<a.length;i++){
  if(i>start && a[i]===a[i-1]) continue;
  // choose a[i]
}

Input and Output Format

Input: n followed by a sorted array that may contain duplicates.

Output: Print the number of distinct subsets.

Worked examples

Example 1

Example Input

2
1 1

Output

3

Explanation

Distinct subsets are [], [1], [1,1].

Example 2

Example Input

3
1 1 1

Output

4

Explanation

The possible counts of 1 are 0,1,2,3, giving 4 subsets.

Belt 7 — Module 7

Belt 7 goal: Build the concepts in this module in order. The coding questions in Belt 7 use the same LU IDs, so learners apply each concept immediately after learning it.

M7-LU1 — Binary search

Concept

Binary search works because the search space is ordered. After checking the middle value, one entire half can be discarded. Each step halves the remaining range, giving O(log n) time.

How to approach this LU

Write the condition that separates the valid and invalid regions.
State exactly what the left and right boundaries mean.
Test the smallest, largest, and boundary transition cases.

Code syntax / core snippet

Python

lo, hi = 0, len(a)-1
while lo <= hi:
    mid = (lo + hi) // 2
    if a[mid] < x: lo = mid + 1
    else: hi = mid - 1

C++

int lo=0,hi=n-1;
while(lo<=hi){ int mid=lo+(hi-lo)/2; if(a[mid]<x) lo=mid+1; else hi=mid-1; }

Java

int lo=0,hi=a.length-1;
while(lo<=hi){ int mid=lo+(hi-lo)/2; if(a[mid]<x) lo=mid+1; else hi=mid-1; }

JavaScript

let lo=0,hi=a.length-1;
while(lo<=hi){ const mid=Math.floor((lo+hi)/2); if(a[mid]<x) lo=mid+1; else hi=mid-1; }

Input and Output Format

Input: n, a sorted array of n integers, then target x.

Output: Print the index of x, or -1 if x is absent.

Worked examples

Example 1

Example Input

5
1 3 5 7 9
7

Output

3

Explanation

7 is at index 3.

Example 2

Example Input

4
2 4 6 8
5

Output

-1

Explanation

5 is not in the array.

M7-LU2 — Bounds

Concept

A bound search asks for a boundary position rather than an exact match. 'First value >= x' is a lower-bound style query. The most reliable implementation maintains an answer range and carefully decides which half can still contain the first valid position.

How to approach this LU

Write the condition that separates the valid and invalid regions.
State exactly what the left and right boundaries mean.
Test the smallest, largest, and boundary transition cases.

Code syntax / core snippet

Python

lo, hi = 0, len(a)-1
while lo <= hi:
    mid = (lo + hi) // 2
    if a[mid] < x: lo = mid + 1
    else: hi = mid - 1

C++

int lo=0,hi=n-1;
while(lo<=hi){ int mid=lo+(hi-lo)/2; if(a[mid]<x) lo=mid+1; else hi=mid-1; }

Java

int lo=0,hi=a.length-1;
while(lo<=hi){ int mid=lo+(hi-lo)/2; if(a[mid]<x) lo=mid+1; else hi=mid-1; }

JavaScript

let lo=0,hi=a.length-1;
while(lo<=hi){ const mid=Math.floor((lo+hi)/2); if(a[mid]<x) lo=mid+1; else hi=mid-1; }

Input and Output Format

Input: n, a sorted array of n integers, then x.

Output: Print the first index whose value is at least x, or -1 if none exists.

Worked examples

Example 1

Example Input

5
1 2 4 4 7
4

Output

2

Explanation

Index 2 is the first value ≥4.

Example 2

Example Input

4
1 3 5 7
6

Output

3

Explanation

7 at index 3 is the first value ≥6.

M7-LU3 — Binary search on answer space

Concept

The binary-search idea can be applied to possible answers, not just array indices. If a candidate capacity is feasible, every larger capacity is also feasible, creating a monotonic true/false pattern. Binary search then finds the smallest feasible answer.

How to approach this LU

Write the condition that separates the valid and invalid regions.
State exactly what the left and right boundaries mean.
Test the smallest, largest, and boundary transition cases.

Code syntax / core snippet

Python

lo, hi = max(a), sum(a)
while lo < hi:
    mid=(lo+hi)//2
    if feasible(mid): hi=mid
    else: lo=mid+1

C++

long long lo=*max_element(a.begin(),a.end()), hi=accumulate(a.begin(),a.end(),0LL);
while(lo<hi){ auto mid=(lo+hi)/2; if(feasible(mid)) hi=mid; else lo=mid+1; }

Java

long lo=Arrays.stream(a).max().getAsInt(), hi=Arrays.stream(a).asLongStream().sum();
while(lo<hi){ long mid=(lo+hi)/2; if(feasible(mid)) hi=mid; else lo=mid+1; }

JavaScript

let lo=Math.max(...a), hi=a.reduce((s,x)=>s+x,0);
while(lo<hi){ const mid=Math.floor((lo+hi)/2); if(feasible(mid)) hi=mid; else lo=mid+1; }

Input and Output Format

Input: n, day limit d, followed by n positive weights.

Output: Print the minimum ship capacity that can ship all weights in order within d days.

Worked examples

Example 1

Example Input

5 2
5 4 3 2 1

Output

9

Explanation

Capacity 9 can split as 5+4 and 3+2+1.

Example 2

Example Input

3 1
1 2 3

Output

6

Explanation

One day requires carrying all 6 units.

M7-LU4 — Greedy algorithms

Concept

A greedy algorithm commits to the best-looking local choice without revisiting it. Greedy is not automatically correct; the problem must have a structure that makes the local choice safe. Interval scheduling is a classic example where choosing the earliest finishing meeting leaves maximum room for future meetings.

How to approach this LU

Write the condition that separates the valid and invalid regions.
State exactly what the left and right boundaries mean.
Test the smallest, largest, and boundary transition cases.

Code syntax / core snippet

Python

meetings.sort(key=lambda p: p[1])
last = -float('inf')
for start, end in meetings:
    if start >= last: last=end

C++

sort(v.begin(),v.end(),[](auto&a,auto&b){return a.second<b.second;});
int last=-1, count=0;

Java

intervals.sort(Comparator.comparingInt(x -> x[1]));
int last=-1, count=0;

JavaScript

meetings.sort((a,b)=>a[1]-b[1]);
let last=-Infinity, count=0;

Input and Output Format

Input: n followed by n meeting intervals [start,end].

Output: Print the maximum number of non-overlapping meetings.

Worked examples

Example 1

Example Input

3
1 3
2 4
3 5

Output

2

Explanation

Choose [1,3], then [3,5].

Example 2

Example Input

4
1 2
2 3
3 4
4 5

Output

4

Explanation

Every meeting ends exactly when the next begins.

M7-LU5 — Feasibility & optimization checks

Concept

Many optimization problems become easier when you separate 'is this answer possible?' from 'what is the best answer?'. If feasibility is monotonic, binary search can locate the optimal boundary. The feasibility function must itself be correct and efficient.

How to approach this LU

Write the condition that separates the valid and invalid regions.
State exactly what the left and right boundaries mean.
Test the smallest, largest, and boundary transition cases.

Code syntax / core snippet

Python

def feasible(cap):
    painters, load = 1, 0
    for x in boards:
        if load + x > cap: painters += 1; load = x
        else: load += x
    return painters <= k

C++

bool feasible(long long cap){ int painters=1; long long load=0; for(auto x:a){ if(load+x>cap){++painters;load=x;} else load+=x; } return painters<=k; }

Java

boolean feasible(long cap){ int painters=1; long load=0; for(int x:a){ if(load+x>cap){painters++;load=x;} else load+=x;} return painters<=k; }

JavaScript

function feasible(cap){ let painters=1,load=0; for(const x of a){ if(load+x>cap){painters++;load=x;} else load+=x; } return painters<=k; }

Input and Output Format

Input: n, number of painters k, followed by n board lengths.

Output: Print the minimum possible maximum workload when each painter gets a contiguous group.

Worked examples

Example 1

Example Input

4 2
10 20 30 40

Output

60

Explanation

A split 10+20+30 and 40 gives maximum 60.

Example 2

Example Input

3 1
5 5 5

Output

15

Explanation

One painter must handle all 15 units.

Belt 8 — Module 8

Belt 8 goal: Build the concepts in this module in order. The coding questions in Belt 8 use the same LU IDs, so learners apply each concept immediately after learning it.

M8-LU1 — Tree representations

Concept

A tree can be represented with nodes and child references, which mirrors the logical structure directly. Complete trees can also use array positions: for zero-based indexing, children of i are 2i+1 and 2i+2. Choosing the representation affects how naturally operations such as traversal are expressed.

How to approach this LU

Draw the tree and label left/right children before coding.
Choose the traversal order that matches the question.
Trace a tiny tree with a missing child and verify that every node is processed exactly as intended.

Code syntax / core snippet

Python

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

root = Node(1)
root.left = Node(2)
root.right = Node(3)

C++

struct Node { int data; Node *left,*right; Node(int x):data(x),left(nullptr),right(nullptr){} };

Java

class Node { int data; Node left,right; Node(int x){data=x;} }

JavaScript

class Node { constructor(data){this.data=data;this.left=null;this.right=null;} }

Input and Output Format

Input: A complete binary tree given in level order as n values.

Output: Print its preorder traversal.

Worked examples

Example 1

Example Input

7
1 2 3 4 5 6 7

Visual representation

      1
     / \
    2   3
  / \   / \
4   5   6   7

Output

1 2 4 5 3 6 7

Explanation

The tree is complete, so 2 and 3 are children of 1; 4 and 5 belong to 2; 6 and 7 belong to 3. Preorder is root → left subtree → right subtree.

Example 2

Example Input

3
1 2 3

Visual representation

  1
 / \
2   3

Output

1 2 3

Explanation

The root is 1, with 2 as its left child and 3 as its right child. Preorder visits 1, then 2, then 3.

M8-LU2 — Tree properties (height, balance etc)

Concept

Tree properties summarize structure. Height can be measured in edges or nodes, so a problem must state the convention; here height is the number of nodes on the longest root-to-leaf path. Balance compares subtree heights and is important because balanced trees keep operations shallow.

How to approach this LU

Draw the tree and label left/right children before coding.
Choose the traversal order that matches the question.
Trace a tiny tree with a missing child and verify that every node is processed exactly as intended.

Code syntax / core snippet

Python

def height(node):
    if node is None: return 0
    return 1 + max(height(node.left), height(node.right))

C++

int height(Node* n){ if(!n) return 0; return 1+max(height(n->left),height(n->right)); }

Java

int height(Node n){ if(n==null) return 0; return 1+Math.max(height(n.left),height(n.right)); }

JavaScript

function height(n){ if(!n) return 0; return 1+Math.max(height(n.left),height(n.right)); }

Input and Output Format

Input: A binary tree given in level order; -1 denotes a missing child.

Output: Print its height in number of nodes on the longest root-to-leaf path.

Worked examples

Example 1

Example Input

7
1 2 3 4 5 6 7

Visual representation

      1
     / \
    2   3
  / \   / \
4   5   6   7

Output

3

Explanation

The longest root-to-leaf path contains three nodes: for example 1 → 2 → 4.

Example 2

Example Input

3
1 2 -1

Visual representation

  1
 / \
2   ·

Output

2

Explanation

The tree has root 1 and only a left child 2, so the longest root-to-leaf path contains two nodes.

M8-LU3 — BFS

Concept

Breadth-first search processes a tree level by level. A queue stores the frontier: remove the oldest discovered node, process it, then add its children. BFS is especially useful when the answer depends on depth or the first minimum number of edges.

How to approach this LU

Draw the tree and label left/right children before coding.
Choose the traversal order that matches the question.
Trace a tiny tree with a missing child and verify that every node is processed exactly as intended.

Code syntax / core snippet

Python

from collections import deque
q=deque([root])
while q:
    node=q.popleft()
    if node.left: q.append(node.left)
    if node.right: q.append(node.right)

C++

queue<Node*> q;
q.push(root);
while (!q.empty()) {
    Node* n = q.front();
    q.pop();
    cout << n->data << ' ';
    if (n->left) q.push(n->left);
    if (n->right) q.push(n->right);
}

Java

import java.util.ArrayDeque;
import java.util.Queue;

Queue<Node> q = new ArrayDeque<>();
q.add(root);

while (!q.isEmpty()) {
    Node n = q.remove();
    System.out.print(n.data + " ");
    if (n.left != null) q.add(n.left);
    if (n.right != null) q.add(n.right);
}

JavaScript

const q = [root];
let head = 0;

while (head < q.length) {
    const n = q[head++];
    console.log(n.data);
    if (n.left) q.push(n.left);
    if (n.right) q.push(n.right);
}

Input and Output Format

Input: A binary tree given in level order.

Output: Print its level-order traversal.

Worked examples

Example 1

Example Input

7
1 2 3 4 5 6 7

Visual representation

      1
     / \
    2   3
  / \   / \
4   5   6   7

Output

1 2 3 4 5 6 7

Explanation

BFS visits the root, then all nodes on level 2, then all nodes on level 3.

Example 2

Example Input

5
1 2 3 4 -1

Visual representation

  1
 / \
2   3
/ \   / \
4   ·

Output

1 2 3 4

Explanation

The tree has 1 at the root, 2 and 3 on the next level, and 4 as the left child of 2.

M8-LU4 — DFS

Concept

Depth-first search follows one branch as far as possible before returning. Tree DFS naturally produces preorder, inorder and postorder depending on when the root is processed. Recursive DFS uses the call stack; iterative DFS uses an explicit stack.

How to approach this LU

Draw the tree and label left/right children before coding.
Choose the traversal order that matches the question.
Trace a tiny tree with a missing child and verify that every node is processed exactly as intended.

Code syntax / core snippet

Python

def preorder(node):
    if not node: return
    print(node.value)
    preorder(node.left); preorder(node.right)

C++

void preorder(Node* n){ if(!n)return; cout<<n->data<<' '; preorder(n->left); preorder(n->right); }

Java

void preorder(Node n){ if(n==null)return; System.out.print(n.data+" "); preorder(n.left); preorder(n.right); }

JavaScript

function preorder(n){ if(!n)return; console.log(n.data); preorder(n.left); preorder(n.right); }

Input and Output Format

Input: A binary tree given in level order.

Output: Print its preorder traversal.

Worked examples

Example 1

Example Input

7
1 2 3 4 5 6 7

Visual representation

      1
     / \
    2   3
  / \   / \
4   5   6   7

Output

1 2 4 5 3 6 7

Explanation

Preorder DFS visits root → left subtree → right subtree.

Example 2

Example Input

5
1 2 3 4 -1

Visual representation

  1
 / \
2   3
/ \   / \
4   ·

Output

1 2 4 3

Explanation

DFS reaches 4 through the left branch before returning to visit 3.

M8-LU5 — BST operations

Concept

A binary search tree maintains an ordering rule: smaller keys go left and larger keys go right under the distinct-key convention. Search and insertion follow one path from the root. Inorder traversal visits keys in sorted order.

How to approach this LU

Draw the tree and label left/right children before coding.
Choose the traversal order that matches the question.
Trace a tiny tree with a missing child and verify that every node is processed exactly as intended.

Code syntax / core snippet

Python

def insert(root, x):
    if root is None: return Node(x)
    if x < root.value: root.left=insert(root.left,x)
    else: root.right=insert(root.right,x)
    return root

C++

Node* insert(Node* r,int x){ if(!r)return new Node(x); if(x<r->data)r->left=insert(r->left,x); else r->right=insert(r->right,x); return r; }

Java

Node insert(Node r,int x){ if(r==null)return new Node(x); if(x<r.data)r.left=insert(r.left,x); else r.right=insert(r.right,x); return r; }

JavaScript

function insert(r,x){ if(!r)return new Node(x); if(x<r.data)r.left=insert(r.left,x); else r.right=insert(r.right,x); return r; }

Input and Output Format

Input: n followed by n distinct integers to insert into a BST.

Output: Print the inorder traversal.

Worked examples

Example 1

Example Input

5
5 3 7 2 4

Visual representation

  5
 / \
3   7
/ \   / \
2   4

Output

2 3 4 5 7

Explanation

The inserted values form a BST. Inorder traversal visits every left subtree, then the node, then the right subtree, producing sorted order.

Example 2

Example Input

3
2 1 3

Visual representation

  2
 / \
1   3

Output

1 2 3

Explanation

1 is inserted to the left of 2 and 3 to the right, so inorder is 1 2 3.

M8-LU6 — Recursive vs iterative traversals

Concept

Recursive traversal relies on the language call stack to remember where to return. Iterative traversal makes that state explicit with a stack. The two approaches can produce the same traversal order; the iterative form gives more control when recursion depth is a concern.

How to approach this LU

Draw the tree and label left/right children before coding.
Choose the traversal order that matches the question.
Trace a tiny tree with a missing child and verify that every node is processed exactly as intended.

Code syntax / core snippet

Python

stack=[]; cur=root
while stack or cur:
    while cur: stack.append(cur); cur=cur.left
    cur=stack.pop(); print(cur.value); cur=cur.right

C++

stack<Node*> st; Node* cur=root;
while(cur||!st.empty()){ while(cur){st.push(cur);cur=cur->left;} cur=st.top();st.pop();cout<<cur->data<<' ';cur=cur->right; }

Java

Deque<Node> st=new ArrayDeque<>(); Node cur=root;
while(cur!=null||!st.isEmpty()){ while(cur!=null){st.push(cur);cur=cur.left;} cur=st.pop();System.out.print(cur.data+" ");cur=cur.right; }

JavaScript

const st=[]; let cur=root;
while(cur||st.length){ while(cur){st.push(cur);cur=cur.left;} cur=st.pop();console.log(cur.data);cur=cur.right; }

Input and Output Format

Input: A binary tree given in level order.

Output: Print its inorder traversal using an explicit stack.

Worked examples

Example 1

Example Input

5
4 2 6 1 3

Visual representation

  4
 / \
2   6
/ \   / \
1   3

Output

1 2 4 6 3

Explanation

The tree is 4 with children 2 and 6; 2 has children 1 and 3. Inorder is left → root → right.

Example 2

Example Input

3
2 1 3

Visual representation

  2
 / \
1   3

Output

1 2 3

Explanation

The explicit stack reproduces the same left → root → right order as recursive inorder.

M8-LU7 — Morris traversal

Concept

Morris traversal performs inorder traversal without an auxiliary stack or recursion. It temporarily connects a node's inorder predecessor back to the current node, uses that link to return later, and then removes the link. Correct restoration is essential because the original tree must remain unchanged.

How to approach this LU

Draw the tree and label left/right children before coding.
Choose the traversal order that matches the question.
Trace a tiny tree with a missing child and verify that every node is processed exactly as intended.

Code syntax / core snippet

Python

cur = root
while cur:
    if cur.left is None:
        print(cur.value, end=" ")
        cur = cur.right
    else:
        pred = cur.left
        while pred.right and pred.right is not cur:
            pred = pred.right
        if pred.right is None:
            pred.right = cur
            cur = cur.left
        else:
            pred.right = None
            print(cur.value, end=" ")
            cur = cur.right

C++

Node* cur = root;
while (cur) {
    if (!cur->left) {
        cout << cur->data << ' ';
        cur = cur->right;
    } else {
        Node* pred = cur->left;
        while (pred->right && pred->right != cur) pred = pred->right;
        if (!pred->right) {
            pred->right = cur;
            cur = cur->left;
        } else {
            pred->right = nullptr;
            cout << cur->data << ' ';
            cur = cur->right;
        }
    }
}

Java

Node cur = root;
while (cur != null) {
    if (cur.left == null) {
        System.out.print(cur.data + " ");
        cur = cur.right;
    } else {
        Node pred = cur.left;
        while (pred.right != null && pred.right != cur) pred = pred.right;
        if (pred.right == null) {
            pred.right = cur;
            cur = cur.left;
        } else {
            pred.right = null;
            System.out.print(cur.data + " ");
            cur = cur.right;
        }
    }
}

JavaScript

let cur = root;
while (cur) {
    if (!cur.left) {
        console.log(cur.data);
        cur = cur.right;
    } else {
        let pred = cur.left;
        while (pred.right && pred.right !== cur) pred = pred.right;
        if (!pred.right) {
            pred.right = cur;
            cur = cur.left;
        } else {
            pred.right = null;
            console.log(cur.data);
            cur = cur.right;
        }
    }
}

Input and Output Format

Input: A binary tree given in level order.

Output: Print its inorder traversal using O(1) auxiliary space.

Worked examples

Example 1

Example Input

5
4 2 6 1 3

Visual representation

  4
 / \
2   6
/ \   / \
1   3

Output

1 2 4 6 3

Explanation

Morris traversal produces the same inorder sequence while temporarily threading predecessors and restoring the tree afterward.

Example 2

Example Input

3
2 1 3

Visual representation

  2
 / \
1   3

Output

1 2 3

Explanation

The traversal uses temporary links instead of a recursion stack, then removes those links.

Belt 9 — Module 9

Belt 9 goal: Build the concepts in this module in order. The coding questions in Belt 9 use the same LU IDs, so learners apply each concept immediately after learning it.

M9-LU1 — Graph representations

Concept

An adjacency list stores the neighbors of each vertex and is efficient for sparse graphs. An adjacency matrix stores a V×V table and provides direct edge lookup at the cost of O(V²) space. Choose the representation based on the graph's density and the operations you need.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

graph=[[] for _ in range(V)]
graph[u].append(v); graph[v].append(u)

C++

vector<vector<int>> graph(V);
graph[u].push_back(v); graph[v].push_back(u);

Java

List<List<Integer>> graph = new ArrayList<>();
for (int i = 0; i < V; i++) graph.add(new ArrayList<>());
graph.get(u).add(v);
graph.get(v).add(u);

JavaScript

const graph=Array.from({length:V},()=>[]);
graph[u].push(v); graph[v].push(u);

Input and Output Format

Input: V, E followed by E undirected edges u v.

Output: Print the degree of every vertex from 0 to V-1.

Worked examples

Example 1

Example Input

3 2
0 1
0 2

Visual representation

Edges: 0 — 1, 0 — 2

Output

2 1 1

Explanation

Vertex 0 has two neighbors; 1 and 2 have one each.

Example 2

Example Input

2 1
0 1

Visual representation

Edges: 0 — 1

Output

1 1

Explanation

Each endpoint has degree one.

M9-LU2 — BFS/DFS

Concept

Graph BFS and DFS differ mainly in the data structure controlling the frontier: a queue for BFS and a stack/recursion for DFS. Both need a visited structure so cycles and repeated paths do not cause infinite processing. With adjacency lists, a full traversal is O(V+E).

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

from collections import deque
q=deque([start]); seen={start}
while q:
    u=q.popleft()
    for v in graph[u]:
        if v not in seen: seen.add(v); q.append(v)

C++

queue<int> q; vector<bool> seen(V); q.push(s);seen[s]=1;
while(!q.empty()){int u=q.front();q.pop();for(int v:g[u])if(!seen[v])seen[v]=1,q.push(v);}

Java

Queue<Integer> q=new ArrayDeque<>(); boolean[] seen=new boolean[V]; q.add(s);seen[s]=true;
while(!q.isEmpty()){int u=q.remove();for(int v:g.get(u))if(!seen[v]){seen[v]=true;q.add(v);}}

JavaScript

const q=[s], seen=Array(V).fill(false); seen[s]=true;
while(q.length){const u=q.shift();for(const v of graph[u])if(!seen[v]){seen[v]=true;q.push(v);}}

Input and Output Format

Input: V, E, E undirected edges, then start vertex s.

Output: Print the BFS traversal from s.

Worked examples

Example 1

Example Input

4 4
0 1
0 2
1 3
2 3
0

Visual representation

Edges: 0 — 1, 0 — 2, 1 — 3, 2 — 3

Output

0 1 2 3

Explanation

BFS discovers 1 and 2 from 0, then discovers 3.

Example 2

Example Input

3 2
0 1
1 2
0

Visual representation

Edges: 0 — 1, 1 — 2

Output

0 1 2

Explanation

The chain is visited from 0 through 1 to 2.

M9-LU3 — Cycle detection

Concept

The correct cycle test depends on graph direction. In an undirected graph, seeing a visited neighbor that is not the current node's parent reveals a cycle. Directed graphs commonly use recursion-state/color tracking to detect a back edge.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

def dfs(u, parent):
    seen.add(u)
    for v in graph[u]:
        if v not in seen and dfs(v,u): return True
        if v != parent and v in seen: return True
    return False

C++

bool dfs(int u,int p){vis[u]=1;for(int v:g[u]){if(!vis[v]&&dfs(v,u))return 1;if(v!=p&&vis[v])return 1;}return 0;}

Java

boolean dfs(int u,int p){vis[u]=true;for(int v:g.get(u)){if(!vis[v]&&dfs(v,u))return true;if(v!=p&&vis[v])return true;}return false;}

JavaScript

function dfs(u,p){seen[u]=true;for(const v of g[u]){if(!seen[v]&&dfs(v,u))return true;if(v!==p&&seen[v])return true;}return false;}

Input and Output Format

Input: V, E followed by E undirected edges.

Output: Print YES if the graph contains a cycle; otherwise NO.

Worked examples

Example 1

Example Input

3 3
0 1
1 2
2 0

Visual representation

Edges: 0 — 1, 1 — 2, 2 — 0

Output

YES

Explanation

The three edges form a cycle.

Example 2

Example Input

3 2
0 1
1 2

Visual representation

Edges: 0 — 1, 1 — 2

Output

NO

Explanation

A simple path has no cycle.

M9-LU4 — Bipartite check

Concept

A graph is bipartite when its vertices can be divided into two groups with every edge crossing between the groups. Assign alternating colors during BFS or DFS. An edge joining two vertices with the same color proves that the graph is not bipartite.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

from collections import deque
color = [-1] * V
color[s] = 0
q = deque([s])
while q:
    u = q.popleft()
    for v in graph[u]:
        if color[v] == -1:
            color[v] = 1 - color[u]
            q.append(v)
        elif color[v] == color[u]:
            return False

C++

vector<int> color(V, -1);
queue<int> q;
color[s] = 0;
q.push(s);
while(!q.empty()){
    int u=q.front(); q.pop();
    for(int v:g[u]){
        if(color[v]==-1) color[v]=1-color[u], q.push(v);
        else if(color[v]==color[u]) return false;
    }
}

Java

int[] color=new int[V];
Arrays.fill(color,-1);
Queue<Integer> q=new ArrayDeque<>();
color[s]=0; q.add(s);
while(!q.isEmpty()){
    int u=q.remove();
    for(int v:g.get(u)){
        if(color[v]==-1){ color[v]=1-color[u]; q.add(v); }
        else if(color[v]==color[u]) return false;
    }
}

JavaScript

const color=Array(V).fill(-1);
const q=[s]; color[s]=0;
while(q.length){
    const u=q.shift();
    for(const v of graph[u]){
        if(color[v]===-1){ color[v]=1-color[u]; q.push(v); }
        else if(color[v]===color[u]) return false;
    }
}

Input and Output Format

Input: V, E followed by E undirected edges.

Output: Print YES if the graph is bipartite; otherwise NO.

Worked examples

Example 1

Example Input

3 2
0 1
1 2

Visual representation

Edges: 0 — 1, 1 — 2

Output

YES

Explanation

The path can be colored 0,1,0.

Example 2

Example Input

3 3
0 1
1 2
2 0

Visual representation

Edges: 0 — 1, 1 — 2, 2 — 0

Output

NO

Explanation

An odd cycle cannot be colored with two colors.

M9-LU5 — Topological sort

Concept

A topological ordering places every prerequisite before the item that depends on it. It exists only for a directed acyclic graph. Kahn's algorithm repeatedly removes vertices with indegree zero; a failure to process all vertices indicates a cycle.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

from collections import deque
q=deque(i for i in range(V) if indeg[i]==0)
while q:
    u=q.popleft()
    for v in graph[u]:
        indeg[v]-=1
        if indeg[v]==0: q.append(v)

C++

queue<int> q; for(int i=0;i<V;i++)if(indeg[i]==0)q.push(i);
while(!q.empty()){int u=q.front();q.pop();for(int v:g[u])if(--indeg[v]==0)q.push(v);}

Java

Queue<Integer> q=new ArrayDeque<>(); for(int i=0;i<V;i++)if(indeg[i]==0)q.add(i);
while(!q.isEmpty()){int u=q.remove();for(int v:g.get(u))if(--indeg[v]==0)q.add(v);}

JavaScript

const q=[]; for(let i=0;i<V;i++)if(indeg[i]===0)q.push(i);
while(q.length){const u=q.shift();for(const v of g[u])if(--indeg[v]===0)q.push(v);}

Input and Output Format

Input: V, E followed by E directed edges u v.

Output: Print one valid topological ordering.

Worked examples

Example 1

Example Input

3 2
0 1
1 2

Visual representation

Edges: 0 — 1, 1 — 2

Output

0 1 2

Explanation

Both directed edges point forward in this order.

Example 2

Example Input

4 2
0 2
1 2

Visual representation

Edges: 0 — 2, 1 — 2

Output

0 1 2 3

Explanation

0 and 1 precede 2; 3 is independent.

M9-LU6 — Directed vs undirected graphs

Concept

An undirected edge u-v means movement is possible in both directions, while a directed edge u→v records only one direction. This changes adjacency-list construction, degree definitions, traversal reachability and cycle rules. Always identify the graph type before choosing an algorithm.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

graph=[[] for _ in range(V)]
graph[u].append(v)  # only u -> v

C++

vector<vector<int>> g(V);
g[u].push_back(v); // directed: do not add v -> u

Java

List<List<Integer>> g=new ArrayList<>();
g.get(u).add(v); // one-way edge

JavaScript

const g=Array.from({length:V},()=>[]);
g[u].push(v); // no reverse edge

Input and Output Format

Input: V, E followed by E directed edges u v.

Output: Print the outdegree of every vertex.

Worked examples

Example 1

Example Input

3 3
0 1
0 2
2 1

Visual representation

Edges: 0 — 1, 0 — 2, 2 — 1

Output

2 0 1

Explanation

Only outgoing edges are counted.

Example 2

Example Input

2 1
1 0

Visual representation

Edges: 1 — 0

Output

0 1

Explanation

Vertex 1 has one outgoing edge; vertex 0 has none.

M9-LU7 — Weighted vs unweighted graphs

Concept

An unweighted graph treats every edge as having equal cost, so BFS can find the minimum number of edges. Weighted graphs attach costs to edges; when weights are non-negative, Dijkstra is a common choice. The cost model determines the shortest-path algorithm.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

from collections import deque

# Unweighted shortest path: every edge costs 1.
dist = [-1] * V
dist[s] = 0
q = deque([s])

while q:
    u = q.popleft()
    for v in graph[u]:
        if dist[v] == -1:
            dist[v] = dist[u] + 1
            q.append(v)

C++

vector<int> dist(V,-1);
queue<int> q;
dist[s]=0; q.push(s);
while(!q.empty()){
    int u=q.front(); q.pop();
    for(int v:g[u]) if(dist[v]==-1){
        dist[v]=dist[u]+1; q.push(v);
    }
}

Java

int[] dist=new int[V];
Arrays.fill(dist,-1);
Queue<Integer> q=new ArrayDeque<>();
dist[s]=0; q.add(s);
while(!q.isEmpty()){
    int u=q.remove();
    for(int v:g.get(u)) if(dist[v]==-1){
        dist[v]=dist[u]+1; q.add(v);
    }
}

JavaScript

const dist=Array(V).fill(-1);
const q=[s]; dist[s]=0;
while(q.length){
    const u=q.shift();
    for(const v of graph[u]) if(dist[v]===-1){
        dist[v]=dist[u]+1; q.push(v);
    }
}

Input and Output Format

Input: V, E, E undirected edges, then source s and target t.

Output: Print the minimum number of edges from s to t.

Worked examples

Example 1

Example Input

4 4
0 1
0 2
1 3
2 3
0 3

Visual representation

Edges: 0 — 1, 0 — 2, 1 — 3, 2 — 3, 0 — 3

Output

2

Explanation

A shortest route uses two edges.

Example 2

Example Input

3 2
0 1
1 2
0 2

Visual representation

Edges: 0 — 1, 1 — 2, 0 — 2

Output

2

Explanation

The path 0→1→2 uses two edges.

M9-LU8 — Sparse vs dense graphs

Concept

A graph is sparse when it has relatively few edges compared with the maximum possible, and dense when it has many. Sparse graphs usually benefit from adjacency lists; dense graphs can make matrices practical. Complexity should be discussed in terms of both V and E.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

max_edges = V * (V - 1) // 2
print('Sparse' if E < max_edges / 2 else 'Dense')

C++

long long maxEdges=1LL*V*(V-1)/2;
cout << (E < maxEdges/2.0 ? "Sparse" : "Dense");

Java

long maxEdges=(long)V*(V-1)/2;
System.out.println(E < maxEdges/2.0 ? "Sparse" : "Dense");

JavaScript

const maxEdges=V*(V-1)/2;
console.log(E < maxEdges/2 ? 'Sparse' : 'Dense');

Input and Output Format

Input: V and E for an undirected graph.

Output: Print Sparse if E < V(V-1)/4; otherwise print Dense.

Worked examples

Example 1

Example Input

5 2

Output

Sparse

Explanation

2 < 5×4/4 = 5.

Example 2

Example Input

4 5

Output

Dense

Explanation

5 is greater than the threshold 3.

M9-LU9 — Shortest paths (Dijkstra, Bellman-Ford, Floyd-Warshall)

Concept

Shortest-path algorithms differ by the graph assumptions they support. Dijkstra is efficient for non-negative weights, Bellman-Ford handles negative edges and can detect reachable negative cycles, and Floyd-Warshall computes all-pairs shortest paths in O(V³). Matching the algorithm to the constraints is essential.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

import heapq
dist = [float('inf')] * V
dist[source] = 0
pq = [(0, source)]
while pq:
    d,u = heapq.heappop(pq)
    if d != dist[u]: continue
    for v,w in graph[u]:
        if d + w < dist[v]:
            dist[v] = d + w
            heapq.heappush(pq, (dist[v], v))

C++

vector<long long> dist(V,LLONG_MAX);
priority_queue<pair<long long,int>,vector<pair<long long,int>>,greater<pair<long long,int>>> pq;
dist[s]=0; pq.push({0,s});
while(!pq.empty()){
    auto [d,u]=pq.top(); pq.pop();
    if(d!=dist[u]) continue;
    for(auto [v,w]:g[u]) if(d+w<dist[v]){
        dist[v]=d+w; pq.push({dist[v],v});
    }
}

Java

long[] dist = new long[V];
Arrays.fill(dist, Long.MAX_VALUE);
PriorityQueue<long[]> pq =
    new PriorityQueue<>(Comparator.comparingLong(x -> x[0]));
dist[s] = 0;
pq.add(new long[]{0, s});

while (!pq.isEmpty()) {
    long[] cur = pq.remove();
    long d = cur[0];
    int u = (int) cur[1];
    if (d != dist[u]) continue;

    for (int[] edge : g.get(u)) {
        int v = edge[0];
        int w = edge[1];
        if (d + w < dist[v]) {
            dist[v] = d + w;
            pq.add(new long[]{dist[v], v});
        }
    }
}

JavaScript

const dist = Array(V).fill(Infinity);
dist[source] = 0;

const heap = [];
function push(item) {
    heap.push(item);
    let i = heap.length - 1;
    while (i > 0) {
        const p = Math.floor((i - 1) / 2);
        if (heap[p][0] <= heap[i][0]) break;
        [heap[p], heap[i]] = [heap[i], heap[p]];
        i = p;
    }
}
function pop() {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length) {
        heap[0] = last;
        let i = 0;
        while (true) {
            let c = 2 * i + 1;
            if (c >= heap.length) break;
            if (c + 1 < heap.length && heap[c + 1][0] < heap[c][0]) c++;
            if (heap[i][0] <= heap[c][0]) break;
            [heap[i], heap[c]] = [heap[c], heap[i]];
            i = c;
        }
    }
    return top;
}

push([0, source]);
while (heap.length) {
    const [d, u] = pop();
    if (d !== dist[u]) continue;
    for (const [v, w] of graph[u]) {
        if (d + w < dist[v]) {
            dist[v] = d + w;
            push([dist[v], v]);
        }
    }
}

Input and Output Format

Input: V, E, source s, followed by E weighted directed edges u v w with w >= 0.

Output: Print shortest distances from s.

Worked examples

Example 1

Example Input

4 4 0
0 1 4
0 2 1
2 1 2
1 3 1

Output

0 3 1 4

Explanation

0→2 costs 1, then 2→1 costs 2, then 1→3 costs 1.

Example 2

Example Input

3 2 0
0 1 5
1 2 2

Output

0 5 7

Explanation

The path 0→1→2 costs 5+2=7.

M9-LU10 — MST (Prim’s)

Concept

A minimum spanning tree connects all vertices of a connected undirected weighted graph using exactly V-1 edges with minimum total weight. Prim's algorithm grows one tree and repeatedly chooses the cheapest edge from the current tree to an unvisited vertex. The priority queue makes that selection efficient.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

import heapq
used = [False] * V
pq = [(0, 0)]
total = 0
while pq:
    w,u = heapq.heappop(pq)
    if used[u]: continue
    used[u] = True
    total += w
    for v,nw in graph[u]:
        if not used[v]: heapq.heappush(pq, (nw,v))

C++

vector<bool> used(V,false);
priority_queue<pair<int,int>,vector<pair<int,int>>,greater<pair<int,int>>> pq;
pq.push({0,0}); int total=0;
while(!pq.empty()){
    auto [w,u]=pq.top(); pq.pop();
    if(used[u]) continue;
    used[u]=true; total+=w;
    for(auto [v,nw]:g[u]) if(!used[v]) pq.push({nw,v});
}

Java

boolean[] used = new boolean[V];
PriorityQueue<int[]> pq =
    new PriorityQueue<>(Comparator.comparingInt(x -> x[0]));
pq.add(new int[]{0, 0});
int total = 0;

while (!pq.isEmpty()) {
    int[] cur = pq.remove();
    int w = cur[0], u = cur[1];
    if (used[u]) continue;
    used[u] = true;
    total += w;

    for (int[] edge : g.get(u)) {
        int v = edge[0], nw = edge[1];
        if (!used[v]) pq.add(new int[]{nw, v});
    }
}

JavaScript

const used = Array(V).fill(false);
const heap = [];

function push(item) {
    heap.push(item);
    let i = heap.length - 1;
    while (i > 0) {
        const p = Math.floor((i - 1) / 2);
        if (heap[p][0] <= heap[i][0]) break;
        [heap[p], heap[i]] = [heap[i], heap[p]];
        i = p;
    }
}

function pop() {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length) {
        heap[0] = last;
        let i = 0;
        while (true) {
            let c = 2 * i + 1;
            if (c >= heap.length) break;
            if (c + 1 < heap.length && heap[c + 1][0] < heap[c][0]) c++;
            if (heap[i][0] <= heap[c][0]) break;
            [heap[i], heap[c]] = [heap[c], heap[i]];
            i = c;
        }
    }
    return top;
}

push([0, 0]);
let total = 0;

while (heap.length) {
    const [w, u] = pop();
    if (used[u]) continue;
    used[u] = true;
    total += w;

    for (const [v, nw] of graph[u]) {
        if (!used[v]) push([nw, v]);
    }
}

Input and Output Format

Input: V, E followed by E weighted undirected edges u v w.

Output: Print the total weight of a minimum spanning tree.

Worked examples

Example 1

Example Input

4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1

Visual representation

Edges: 0 — 1, 0 — 2, 1 — 2, 1 — 3, 2 — 3

Output

4

Explanation

Choose edges of weights 1, 2 and 1 for total 4.

Example 2

Example Input

3 3
0 1 5
1 2 2
0 2 4

Visual representation

Edges: 0 — 1, 1 — 2, 0 — 2

Output

6

Explanation

The cheapest connecting edges have weights 2 and 4.

M9-LU11 — Disjoint sets

Concept

Disjoint Set Union (DSU) represents a collection of non-overlapping groups. find locates a set representative and union merges two sets. Path compression plus union by size/rank makes a long sequence of operations extremely efficient in practice.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

parent=list(range(n))
def find(x):
    if parent[x] != x: parent[x]=find(parent[x])
    return parent[x]

C++

vector<int> parent(n); iota(parent.begin(),parent.end(),0);
int find(int x){return parent[x]==x?x:parent[x]=find(parent[x]);}

Java

int[] parent=new int[n];
int find(int x){return parent[x]==x?x:(parent[x]=find(parent[x]));}

JavaScript

const parent=Array.from({length:n},(_,i)=>i);
function find(x){ return parent[x]===x ? x : (parent[x]=find(parent[x])); }

Input and Output Format

Input: n, q followed by q operations: U a b for union or Q a b for connectivity query.

Output: For each Q operation, print YES if a and b are connected, otherwise NO.

Worked examples

Example 1

Example Input

5 4
U 0 1
U 1 2
Q 0 2
Q 0 4

Output

YES
NO

Explanation

0,1,2 are merged; 4 is separate.

Example 2

Example Input

3 3
Q 0 1
U 0 1
Q 0 1

Output

NO
YES

Explanation

They start separate and become connected after union.

M9-LU12 — Kosaraju’s Algorithm

Concept

Strongly connected components are maximal groups in a directed graph where every vertex can reach every other vertex in the group. Kosaraju uses two DFS passes: record finishing order in the original graph, then traverse the reversed graph in reverse finishing order. Each second-pass traversal identifies one component.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

order = []
seen = [False] * V

def dfs(u):
    seen[u] = True
    for v in graph[u]:
        if not seen[v]:
            dfs(v)
    order.append(u)

# First pass: run dfs for every unseen vertex.
# Second pass: run DFS on the reversed graph in reversed(order).

C++

void dfs1(int u){
    vis[u]=1;
    for(int v:g[u]) if(!vis[v]) dfs1(v);
    order.push_back(u);
}
// Build transpose graph and run DFS in reverse(order).

Java

void dfs1(int u){
    seen[u]=true;
    for(int v:g.get(u)) if(!seen[v]) dfs1(v);
    order.add(u);
}
// Build the reversed graph and process vertices in reverse finishing order.

JavaScript

function dfs1(u){
  seen[u]=true;
  for(const v of g[u]) if(!seen[v]) dfs1(v);
  order.push(u);
}
// Second pass: DFS on reversed graph using reverse(order).

Input and Output Format

Input: V, E followed by E directed edges u v.

Output: Print the number of strongly connected components.

Worked examples

Example 1

Example Input

5 5
0 1
1 2
2 0
2 3
3 4

Visual representation

Edges: 0 — 1, 1 — 2, 2 — 0, 2 — 3, 3 — 4

Output

3

Explanation

The SCCs are {0,1,2}, {3}, and {4}.

Example 2

Example Input

3 3
0 1
1 2
2 0

Visual representation

Edges: 0 — 1, 1 — 2, 2 — 0

Output

1

Explanation

Every vertex reaches every other vertex.

M9-LU13 — Choosing the right shortest-path algorithm

Concept

Algorithm selection should start from the graph's properties: equal-cost edges suggest BFS; non-negative weighted single-source paths suggest Dijkstra; negative edges suggest Bellman-Ford; all-pairs distances on a small graph suggest Floyd-Warshall. Choosing by assumptions prevents subtle incorrect solutions.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

if unweighted: algorithm = 'BFS'
elif negative_edges: algorithm = 'Bellman-Ford'
elif all_pairs: algorithm = 'Floyd-Warshall'
else: algorithm = 'Dijkstra'

C++

string algorithm;
if(unweighted) algorithm="BFS"; else if(negative) algorithm="Bellman-Ford"; else if(allPairs) algorithm="Floyd-Warshall"; else algorithm="Dijkstra";

Java

String algorithm;
if(unweighted) algorithm="BFS"; else if(negative) algorithm="Bellman-Ford"; else if(allPairs) algorithm="Floyd-Warshall"; else algorithm="Dijkstra";

JavaScript

let algorithm;
if(unweighted) algorithm='BFS'; else if(negative) algorithm='Bellman-Ford'; else if(allPairs) algorithm='Floyd-Warshall'; else algorithm='Dijkstra';

Input and Output Format

Input: One graph type: unweighted, nonnegative weighted, negative edge, or all-pairs.

Output: Print BFS, Dijkstra, Bellman-Ford, or Floyd-Warshall as appropriate.

Worked examples

Example 1

Example Input

unweighted

Output

BFS

Explanation

All edges have equal cost.

Example 2

Example Input

nonnegative weighted

Output

Dijkstra

Explanation

Weights are non-negative and a single-source solution is needed.

Example 3

Example Input

negative edge

Output

Bellman-Ford

Explanation

Negative edges require an algorithm such as Bellman-Ford.

Belt 10 — Module 10

Belt 10 goal: Build the concepts in this module in order. The coding questions in Belt 10 use the same LU IDs, so learners apply each concept immediately after learning it.

M10-LU1 — Dynamic programming (State, transition, memoization, tabulation, space optimization)

Concept

Dynamic programming works when a problem has overlapping subproblems and a reusable optimal/subcount structure. Define a state, write the transition from smaller states, establish base cases, and choose memoization or tabulation. After understanding the full table, ask whether only a few previous states are needed so space can be reduced.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

dp=[0]*(n+1)
dp[0]=1
for i in range(1,n+1):
    dp[i]=(dp[i-1] + (dp[i-2] if i>=2 else 0))

C++

vector<long long> dp(n+1); dp[0]=1;
for(int i=1;i<=n;i++) dp[i]=dp[i-1]+(i>=2?dp[i-2]:0);

Java

long[] dp=new long[n+1]; dp[0]=1;
for(int i=1;i<=n;i++) dp[i]=dp[i-1]+(i>=2?dp[i-2]:0);

JavaScript

const dp=Array(n+1).fill(0); dp[0]=1;
for(let i=1;i<=n;i++) dp[i]=dp[i-1]+(i>=2?dp[i-2]:0);

Input and Output Format

Input: One non-negative integer n.

Output: Print the number of ways to climb n stairs using 1 or 2 steps.

Worked examples

Example 1

Example Input

5

Output

8

Explanation

Ways are 1,2,3,5,8 for stairs 1 through 5.

Example 2

Example Input

2

Output

2

Explanation

The choices are 1+1 or 2.

M10-LU2 — Tries

Concept

A trie stores strings by following one edge per character. Words with a common prefix share the same path, so prefix operations can depend mainly on the word length rather than the number of stored words. A terminal flag distinguishes a complete word from a prefix of another word.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False

def insert(root, word):
    cur = root
    for ch in word:
        cur = cur.children.setdefault(ch, TrieNode())
    cur.end = True

C++

struct Node{
    map<char,Node*> next;
    bool end=false;
};
void insert(Node* root,string word){
    Node* cur=root;
    for(char ch:word){
        if(!cur->next[ch]) cur->next[ch]=new Node();
        cur=cur->next[ch];
    }
    cur->end=true;
}

Java

class Node{
    Map<Character,Node> next=new HashMap<>();
    boolean end;
}
void insert(Node root,String word){
    Node cur=root;
    for(char ch:word) cur=cur.next.computeIfAbsent(ch,k->new Node());
    cur.end=true;
}

JavaScript

class Node{
  constructor(){ this.children=new Map(); this.end=false; }
}
function insert(root, word){
  let cur=root;
  for(const ch of word){
    if(!cur.children.has(ch)) cur.children.set(ch,new Node());
    cur=cur.children.get(ch);
  }
  cur.end=true;
}

Input and Output Format

Input: n words to insert, followed by q query words.

Output: For each query, print YES if it is an inserted complete word; otherwise NO.

Worked examples

Example 1

Example Input

3
cat
car
dog
3
cat
can
dog

Output

YES
NO
YES

Explanation

cat and dog were inserted; can was not.

Example 2

Example Input

1
hello
2
hello
hell

Output

YES
NO

Explanation

hello is a complete word; hell is only a prefix.

M10-LU3 — Heaps/ Priority queues

Concept

A heap maintains a partial ordering rather than a fully sorted array. In a min-heap the smallest element is at the root; in a max-heap the largest is at the root. A priority queue exposes this root efficiently while insertion and removal typically cost O(log n).

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

import heapq
heap=[]
heapq.heappush(heap, 5)
smallest=heapq.heappop(heap)

C++

priority_queue<int,vector<int>,greater<int>> pq;
pq.push(5);
int smallest=pq.top(); pq.pop();

Java

PriorityQueue<Integer> pq=new PriorityQueue<>();
pq.add(5);
int smallest=pq.remove();

JavaScript

const heap = [];

function push(x) {
    heap.push(x);
    let i = heap.length - 1;
    while (i > 0) {
        const p = Math.floor((i - 1) / 2);
        if (heap[p] <= heap[i]) break;
        [heap[p], heap[i]] = [heap[i], heap[p]];
        i = p;
    }
}

function pop() {
    const smallest = heap[0];
    const last = heap.pop();
    if (heap.length) {
        heap[0] = last;
        let i = 0;
        while (true) {
            let c = 2 * i + 1;
            if (c >= heap.length) break;
            if (c + 1 < heap.length && heap[c + 1] < heap[c]) c++;
            if (heap[i] <= heap[c]) break;
            [heap[i], heap[c]] = [heap[c], heap[i]];
            i = c;
        }
    }
    return smallest;
}

push(5);
const smallest = pop();

Input and Output Format

Input: n followed by n integers.

Output: Print the values in ascending order by repeatedly removing the minimum from a min-heap.

Worked examples

Example 1

Example Input

5
5 1 4 2 3

Output

1 2 3 4 5

Explanation

The heap always removes the smallest remaining value.

Example 2

Example Input

3
9 7 8

Output

7 8 9

Explanation

7 is removed first, then 8 and 9.

M10-LU4 — Bit manipulation

Concept

Bit manipulation operates on the binary representation of integers. AND, OR and XOR combine individual bits, while shifts move them left or right. XOR is especially useful for the single-occurrence problem because equal values cancel: x XOR x = 0 and x XOR 0 = x.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

unique = 0
for x in a:
    unique ^= x

# x ^ x == 0 and x ^ 0 == x.

C++

int unique=0;
for(int x:a) unique ^= x;

Java

int unique=0;
for(int x:a) unique ^= x;

JavaScript

let unique=0;
for(const x of a) unique ^= x;

Input and Output Format

Input: n followed by n integers where exactly one value occurs once and every other value occurs twice.

Output: Print the value that occurs once.

Worked examples

Example 1

Example Input

5
2 3 2 4 4

Output

3

Explanation

2^2 and 4^4 cancel, leaving 3.

Example 2

Example Input

3
7 5 7

Output

5

Explanation

7^7 is 0, leaving 5.

M10-LU5 — String algorithms (KMP, Z-function, Rabin–Karp)

Concept

Naive pattern matching may repeatedly compare the same characters. KMP uses a longest-prefix-suffix table to reuse previous matches, the Z-function stores how much of the prefix matches at each position, and Rabin–Karp uses rolling hashes to compare candidate substrings quickly. These techniques are designed to avoid unnecessary rechecking.

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

lps = [0] * len(pattern)
j = 0
for i in range(1, len(pattern)):
    while j and pattern[i] != pattern[j]:
        j = lps[j-1]
    if pattern[i] == pattern[j]: j += 1
    lps[i] = j

C++

vector<int> lps(pattern.size());
for(int i=1,j=0;i<pattern.size();){
    if(pattern[i]==pattern[j]) lps[i++]=++j;
    else if(j) j=lps[j-1];
    else lps[i++]=0;
}

Java

int[] lps=new int[pattern.length()];
for(int i=1,j=0;i<pattern.length();){
    if(pattern.charAt(i)==pattern.charAt(j)) lps[i++]=++j;
    else if(j>0) j=lps[j-1];
    else lps[i++]=0;
}

JavaScript

const lps=Array(pattern.length).fill(0);
for(let i=1,j=0;i<pattern.length;){
  if(pattern[i]===pattern[j]) lps[i++]=++j;
  else if(j) j=lps[j-1];
  else lps[i++]=0;
}

Input and Output Format

Input: A text string followed by a pattern string.

Output: Print the first zero-based starting index of the pattern, or -1 if absent.

Worked examples

Example 1

Example Input

ababcabc
abc

Output

2

Explanation

The first abc starts at index 2.

Example 2

Example Input

hello
ll

Output

2

Explanation

ll starts at index 2.

M10-LU6 — Advanced recursion

Concept

Advanced recursion combines the basic call/return idea with decomposition, memoization, tree structure or backtracking. The important questions are always: what is the recursive state, how does it get smaller, what work happens before/after the call, and what is the base case?

How to approach this LU

Identify the data structure or invariant that represents the problem state.
Trace a small example before optimizing.
Check the algorithm's assumptions and complexity against the input constraints.

Code syntax / core snippet

Python

def hanoi(n, src, aux, dst):
    if n == 0: return 0
    return hanoi(n-1, src, dst, aux) + 1 + hanoi(n-1, aux, src, dst)

C++

long long hanoi(int n){ if(n==0)return 0; return 2*hanoi(n-1)+1; }

Java

long hanoi(int n){ if(n==0)return 0; return 2*hanoi(n-1)+1; }

JavaScript

function hanoi(n){ if(n===0)return 0; return 2*hanoi(n-1)+1; }

Input and Output Format

Input: One positive integer n.

Output: Print the minimum number of Tower of Hanoi moves for n disks.

Worked examples

Example 1

Example Input

2

Output

3

Explanation

The minimum is 2²−1 = 3.

Example 2

Example Input

3

Output

7

Explanation

The minimum is 2³−1 = 7.
