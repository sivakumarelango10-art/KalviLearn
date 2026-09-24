# KalviLearn — 10-Belt Programming Question Bank
## 500 Progressive Programming Problems

**Single source of truth.**

### Question Counts
Belt 1: **20** · Belt 2: **30** · Belt 3: **35** · Belt 4: **40** · Belt 5: **40** · Belt 6: **40** · Belt 7: **60** · Belt 8: **65** · Belt 9: **80** · Belt 10: **90**

**Total: 500 questions**

### Exact Structure
Every question contains, in this exact order:
1. Problem Statement
2. Input Format
3. Output Format
4. Constraints
5. Worked Example 1
6. Explanation
7. Worked Example 2
8. Explanation
9. Test Cases

### Test Case Formatting
Test cases are **not tables**. Each test case has separate `Input` and `Expected Output` code blocks. Multi-line inputs remain multi-line, matching the declared input format exactly.

### Difficulty
The bank starts with beginner-friendly logic and increases through repetition, structured data, standard techniques, data structures, recursion, optimization, trees, graphs, dynamic programming, and advanced algorithmic reasoning. Within each belt, the later questions are harder than the earlier questions.

---

# Belt 1 — Yellow Belt
**Difficulty:** Easy / Foundational



## Subdivision 1.1 — Variables, Operators, and Conditional Logic

## Question 1 — Arithmetic Check — Variant 1
**Difficulty:** Easy

### Problem Statement
Given integers a, b, and c, compute `(a+b)*c - b`.

### Input Format
The first line contains three space-separated integers `a b c`.

### Output Format
Print the resulting integer.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
2 -3 1
```

**Output**
```text
2
```

**Explanation**
The program reads 2 -3 1. Applying the stated rule gives `2`.

### Worked Example 2

**Input**
```text
5 -4 3
```

**Output**
```text
7
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `7`.

### Test Cases

#### Test Case 1

**Input**
```text
2 -3 1
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
5 -4 3
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
1 2 3
```

**Expected Output**
```text
7
```

#### Test Case 4

**Input**
```text
0 5 2
```

**Expected Output**
```text
5
```

#### Test Case 5

**Input**
```text
-3 4 5
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
7 -2 1
```

**Expected Output**
```text
7
```

#### Test Case 7

**Input**
```text
10 10 10
```

**Expected Output**
```text
190
```

#### Test Case 8

**Input**
```text
-5 -2 3
```

**Expected Output**
```text
-19
```

#### Test Case 9

**Input**
```text
2 0 9
```

**Expected Output**
```text
18
```

#### Test Case 10

**Input**
```text
100 -4 2
```

**Expected Output**
```text
196
```


## Question 2 — Absolute Difference — Variant 1
**Difficulty:** Easy

### Problem Statement
Given two integers, print their absolute difference.

### Input Format
The first line contains two space-separated integers `a b`.

### Output Format
Print `|a-b|`.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
3 -4
```

**Output**
```text
7
```

**Explanation**
The program reads 3 -4. Applying the stated rule gives `7`.

### Worked Example 2

**Input**
```text
10 3
```

**Output**
```text
7
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `7`.

### Test Cases

#### Test Case 1

**Input**
```text
3 -4
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
10 3
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
-5 7
```

**Expected Output**
```text
12
```

#### Test Case 4

**Input**
```text
0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
100 -50
```

**Expected Output**
```text
150
```

#### Test Case 6

**Input**
```text
-100 -1
```

**Expected Output**
```text
99
```

#### Test Case 7

**Input**
```text
7 12
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
1 -9
```

**Expected Output**
```text
10
```

#### Test Case 9

**Input**
```text
42 42
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
999 1
```

**Expected Output**
```text
998
```


## Question 3 — Largest of Three — Variant 1
**Difficulty:** Easy

### Problem Statement
Given three integers, print the largest value.

### Input Format
The first line contains three space-separated integers `a b c`.

### Output Format
Print the largest value.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
1 9 4
```

**Output**
```text
9
```

**Explanation**
The program reads 1 9 4. Applying the stated rule gives `9`.

### Worked Example 2

**Input**
```text
3 2 8
```

**Output**
```text
8
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `8`.

### Test Cases

#### Test Case 1

**Input**
```text
1 9 4
```

**Expected Output**
```text
9
```

#### Test Case 2

**Input**
```text
3 2 8
```

**Expected Output**
```text
8
```

#### Test Case 3

**Input**
```text
-1 -7 -3
```

**Expected Output**
```text
-1
```

#### Test Case 4

**Input**
```text
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
100 99 98
```

**Expected Output**
```text
100
```

#### Test Case 6

**Input**
```text
-5 4 -2
```

**Expected Output**
```text
4
```

#### Test Case 7

**Input**
```text
7 7 2
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
1 9 9
```

**Expected Output**
```text
9
```

#### Test Case 9

**Input**
```text
20 -20 0
```

**Expected Output**
```text
20
```

#### Test Case 10

**Input**
```text
5 4 6
```

**Expected Output**
```text
6
```


## Question 4 — Middle Value — Variant 1
**Difficulty:** Easy

### Problem Statement
Given three distinct integers, print the value that is neither the minimum nor the maximum.

### Input Format
The first line contains three distinct space-separated integers `a b c`.

### Output Format
Print the middle value.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
1 9 4
```

**Output**
```text
4
```

**Explanation**
The program reads 1 9 4. Applying the stated rule gives `4`.

### Worked Example 2

**Input**
```text
3 2 8
```

**Output**
```text
3
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `3`.

### Test Cases

#### Test Case 1

**Input**
```text
1 9 4
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
3 2 8
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
-1 -7 -3
```

**Expected Output**
```text
-3
```

#### Test Case 4

**Input**
```text
10 1 6
```

**Expected Output**
```text
6
```

#### Test Case 5

**Input**
```text
100 99 98
```

**Expected Output**
```text
99
```

#### Test Case 6

**Input**
```text
-5 4 -2
```

**Expected Output**
```text
-2
```

#### Test Case 7

**Input**
```text
7 1 2
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
1 9 5
```

**Expected Output**
```text
5
```

#### Test Case 9

**Input**
```text
20 -20 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
5 4 6
```

**Expected Output**
```text
5
```


## Question 5 — Divisibility Report — Variant 1
**Difficulty:** Easy

### Problem Statement
Given `n`, print `YES` if it is divisible by both `a` and `b`; otherwise print `NO`.

### Input Format
The first line contains three integers `n a b`.

### Output Format
Print `YES` or `NO`.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
12 3 4
```

**Output**
```text
YES
```

**Explanation**
The program reads 12 3 4. Applying the stated rule gives `YES`.

### Worked Example 2

**Input**
```text
24 3 4
```

**Output**
```text
YES
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
12 3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
24 3 4
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
25 5 2
```

**Expected Output**
```text
NO
```

#### Test Case 4

**Input**
```text
0 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
100 10 5
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
45 5 3
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
42 6 7
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
18 3 9
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
11 1 11
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
72 8 9
```

**Expected Output**
```text
YES
```


## Question 6 — Sign Product — Variant 1
**Difficulty:** Easy

### Problem Statement
Given two integers, determine whether their product is positive, negative, or zero without needing to print the product.

### Input Format
The first line contains two integers `a b`.

### Output Format
Print `POSITIVE`, `NEGATIVE`, or `ZERO`.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
1 -1
```

**Output**
```text
NEGATIVE
```

**Explanation**
The program reads 1 -1. Applying the stated rule gives `NEGATIVE`.

### Worked Example 2

**Input**
```text
-3 -4
```

**Output**
```text
POSITIVE
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `POSITIVE`.

### Test Cases

#### Test Case 1

**Input**
```text
1 -1
```

**Expected Output**
```text
NEGATIVE
```

#### Test Case 2

**Input**
```text
-3 -4
```

**Expected Output**
```text
POSITIVE
```

#### Test Case 3

**Input**
```text
0 5
```

**Expected Output**
```text
ZERO
```

#### Test Case 4

**Input**
```text
-1 0
```

**Expected Output**
```text
ZERO
```

#### Test Case 5

**Input**
```text
8 2
```

**Expected Output**
```text
POSITIVE
```

#### Test Case 6

**Input**
```text
-7 3
```

**Expected Output**
```text
NEGATIVE
```

#### Test Case 7

**Input**
```text
0 0
```

**Expected Output**
```text
ZERO
```

#### Test Case 8

**Input**
```text
-5 -2
```

**Expected Output**
```text
POSITIVE
```

#### Test Case 9

**Input**
```text
9 -2
```

**Expected Output**
```text
NEGATIVE
```

#### Test Case 10

**Input**
```text
4 0
```

**Expected Output**
```text
ZERO
```


## Question 7 — Range Membership — Variant 1
**Difficulty:** Easy

### Problem Statement
Given `x, l, r`, determine whether `x` lies in the inclusive range `[l,r]`.

### Input Format
The first line contains three integers `x l r`, with `l ≤ r`.

### Output Format
Print `YES` or `NO`.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
2 0 10
```

**Output**
```text
YES
```

**Explanation**
The program reads 2 0 10. Applying the stated rule gives `YES`.

### Worked Example 2

**Input**
```text
5 1 5
```

**Output**
```text
YES
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
2 0 10
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 1 5
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
0 1 5
```

**Expected Output**
```text
NO
```

#### Test Case 4

**Input**
```text
10 0 10
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
-1 -5 -2
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
8 9 12
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
12 0 12
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 3 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 -2 2
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
7 5 8
```

**Expected Output**
```text
YES
```


## Question 8 — Piecewise Fare — Variant 1
**Difficulty:** Easy

### Problem Statement
A ride costs 50 for the first 5 km and 12 for every additional km. Given distance `d`, calculate the fare.

### Input Format
The first line contains integer `d`.

### Output Format
Print the fare as an integer.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
1
```

**Output**
```text
50
```

**Explanation**
The program reads 1. Applying the stated rule gives `50`.

### Worked Example 2

**Input**
```text
5
```

**Output**
```text
50
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `50`.

### Test Cases

#### Test Case 1

**Input**
```text
1
```

**Expected Output**
```text
50
```

#### Test Case 2

**Input**
```text
5
```

**Expected Output**
```text
50
```

#### Test Case 3

**Input**
```text
6
```

**Expected Output**
```text
62
```

#### Test Case 4

**Input**
```text
0
```

**Expected Output**
```text
50
```

#### Test Case 5

**Input**
```text
10
```

**Expected Output**
```text
110
```

#### Test Case 6

**Input**
```text
20
```

**Expected Output**
```text
230
```

#### Test Case 7

**Input**
```text
1
```

**Expected Output**
```text
50
```

#### Test Case 8

**Input**
```text
50
```

**Expected Output**
```text
590
```

#### Test Case 9

**Input**
```text
100
```

**Expected Output**
```text
1190
```

#### Test Case 10

**Input**
```text
7
```

**Expected Output**
```text
74
```


## Question 9 — Operator Precedence — Variant 1
**Difficulty:** Easy

### Problem Statement
Evaluate `(a + b) * (c - d) + e` exactly as written.

### Input Format
The first line contains five integers `a b c d e`.

### Output Format
Print the result.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
1 2 5 3 4
```

**Output**
```text
10
```

**Explanation**
The program reads 1 2 5 3 4. Applying the stated rule gives `10`.

### Worked Example 2

**Input**
```text
3 4 2 1 5
```

**Output**
```text
12
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `12`.

### Test Cases

#### Test Case 1

**Input**
```text
1 2 5 3 4
```

**Expected Output**
```text
10
```

#### Test Case 2

**Input**
```text
3 4 2 1 5
```

**Expected Output**
```text
12
```

#### Test Case 3

**Input**
```text
-2 5 7 3 1
```

**Expected Output**
```text
13
```

#### Test Case 4

**Input**
```text
0 0 0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
10 2 3 4 5
```

**Expected Output**
```text
-7
```

#### Test Case 6

**Input**
```text
5 -2 8 1 9
```

**Expected Output**
```text
30
```

#### Test Case 7

**Input**
```text
-5 -3 4 2 7
```

**Expected Output**
```text
-9
```

#### Test Case 8

**Input**
```text
7 1 10 8 0
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
2 9 -1 3 6
```

**Expected Output**
```text
-38
```

#### Test Case 10

**Input**
```text
100 -4 2 5 8
```

**Expected Output**
```text
-280
```


## Question 10 — Three-Way Comparison — Variant 1
**Difficulty:** Easy

### Problem Statement
Compare `a` and `b` and print `LESS`, `EQUAL`, or `GREATER`.

### Input Format
The first line contains two integers `a b`.

### Output Format
Print one comparison word.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
0 1
```

**Output**
```text
LESS
```

**Explanation**
The program reads 0 1. Applying the stated rule gives `LESS`.

### Worked Example 2

**Input**
```text
5 5
```

**Output**
```text
EQUAL
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `EQUAL`.

### Test Cases

#### Test Case 1

**Input**
```text
0 1
```

**Expected Output**
```text
LESS
```

#### Test Case 2

**Input**
```text
5 5
```

**Expected Output**
```text
EQUAL
```

#### Test Case 3

**Input**
```text
-2 3
```

**Expected Output**
```text
LESS
```

#### Test Case 4

**Input**
```text
0 0
```

**Expected Output**
```text
EQUAL
```

#### Test Case 5

**Input**
```text
100 -1
```

**Expected Output**
```text
GREATER
```

#### Test Case 6

**Input**
```text
-5 -5
```

**Expected Output**
```text
EQUAL
```

#### Test Case 7

**Input**
```text
7 2
```

**Expected Output**
```text
GREATER
```

#### Test Case 8

**Input**
```text
2 9
```

**Expected Output**
```text
LESS
```

#### Test Case 9

**Input**
```text
42 42
```

**Expected Output**
```text
EQUAL
```

#### Test Case 10

**Input**
```text
999 1
```

**Expected Output**
```text
GREATER
```


## Question 11 — Arithmetic Check — Variant 2
**Difficulty:** Easy–Medium

### Problem Statement
Given integers a, b, and c, compute `(a+b)*c - b`.

### Input Format
The first line contains three space-separated integers `a b c`.

### Output Format
Print the resulting integer.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
3 -2 2
```

**Output**
```text
4
```

**Explanation**
The program reads 3 -2 2. Applying the stated rule gives `4`.

### Worked Example 2

**Input**
```text
6 -3 4
```

**Output**
```text
15
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `15`.

### Test Cases

#### Test Case 1

**Input**
```text
3 -2 2
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
6 -3 4
```

**Expected Output**
```text
15
```

#### Test Case 3

**Input**
```text
1 2 3
```

**Expected Output**
```text
7
```

#### Test Case 4

**Input**
```text
0 5 2
```

**Expected Output**
```text
5
```

#### Test Case 5

**Input**
```text
-3 4 5
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
7 -2 1
```

**Expected Output**
```text
7
```

#### Test Case 7

**Input**
```text
10 10 10
```

**Expected Output**
```text
190
```

#### Test Case 8

**Input**
```text
-5 -2 3
```

**Expected Output**
```text
-19
```

#### Test Case 9

**Input**
```text
2 0 9
```

**Expected Output**
```text
18
```

#### Test Case 10

**Input**
```text
100 -4 2
```

**Expected Output**
```text
196
```


## Question 12 — Absolute Difference — Variant 2
**Difficulty:** Easy–Medium

### Problem Statement
Given two integers, print their absolute difference.

### Input Format
The first line contains two space-separated integers `a b`.

### Output Format
Print `|a-b|`.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
4 -3
```

**Output**
```text
7
```

**Explanation**
The program reads 4 -3. Applying the stated rule gives `7`.

### Worked Example 2

**Input**
```text
10 3
```

**Output**
```text
7
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `7`.

### Test Cases

#### Test Case 1

**Input**
```text
4 -3
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
10 3
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
-5 7
```

**Expected Output**
```text
12
```

#### Test Case 4

**Input**
```text
0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
100 -50
```

**Expected Output**
```text
150
```

#### Test Case 6

**Input**
```text
-100 -1
```

**Expected Output**
```text
99
```

#### Test Case 7

**Input**
```text
7 12
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
1 -9
```

**Expected Output**
```text
10
```

#### Test Case 9

**Input**
```text
42 42
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
999 1
```

**Expected Output**
```text
998
```


## Question 13 — Largest of Three — Variant 2
**Difficulty:** Easy–Medium

### Problem Statement
Given three integers, print the largest value.

### Input Format
The first line contains three space-separated integers `a b c`.

### Output Format
Print the largest value.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
2 9 4
```

**Output**
```text
9
```

**Explanation**
The program reads 2 9 4. Applying the stated rule gives `9`.

### Worked Example 2

**Input**
```text
3 2 8
```

**Output**
```text
8
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `8`.

### Test Cases

#### Test Case 1

**Input**
```text
2 9 4
```

**Expected Output**
```text
9
```

#### Test Case 2

**Input**
```text
3 2 8
```

**Expected Output**
```text
8
```

#### Test Case 3

**Input**
```text
-1 -7 -3
```

**Expected Output**
```text
-1
```

#### Test Case 4

**Input**
```text
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
100 99 98
```

**Expected Output**
```text
100
```

#### Test Case 6

**Input**
```text
-5 4 -2
```

**Expected Output**
```text
4
```

#### Test Case 7

**Input**
```text
7 7 2
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
1 9 9
```

**Expected Output**
```text
9
```

#### Test Case 9

**Input**
```text
20 -20 0
```

**Expected Output**
```text
20
```

#### Test Case 10

**Input**
```text
5 4 6
```

**Expected Output**
```text
6
```


## Question 14 — Middle Value — Variant 2
**Difficulty:** Easy–Medium

### Problem Statement
Given three distinct integers, print the value that is neither the minimum nor the maximum.

### Input Format
The first line contains three distinct space-separated integers `a b c`.

### Output Format
Print the middle value.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
2 9 4
```

**Output**
```text
4
```

**Explanation**
The program reads 2 9 4. Applying the stated rule gives `4`.

### Worked Example 2

**Input**
```text
3 2 8
```

**Output**
```text
3
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `3`.

### Test Cases

#### Test Case 1

**Input**
```text
2 9 4
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
3 2 8
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
-1 -7 -3
```

**Expected Output**
```text
-3
```

#### Test Case 4

**Input**
```text
10 1 6
```

**Expected Output**
```text
6
```

#### Test Case 5

**Input**
```text
100 99 98
```

**Expected Output**
```text
99
```

#### Test Case 6

**Input**
```text
-5 4 -2
```

**Expected Output**
```text
-2
```

#### Test Case 7

**Input**
```text
7 1 2
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
1 9 5
```

**Expected Output**
```text
5
```

#### Test Case 9

**Input**
```text
20 -20 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
5 4 6
```

**Expected Output**
```text
5
```


## Question 15 — Divisibility Report — Variant 2
**Difficulty:** Easy–Medium

### Problem Statement
Given `n`, print `YES` if it is divisible by both `a` and `b`; otherwise print `NO`.

### Input Format
The first line contains three integers `n a b`.

### Output Format
Print `YES` or `NO`.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
13 3 4
```

**Output**
```text
NO
```

**Explanation**
The program reads 13 3 4. Applying the stated rule gives `NO`.

### Worked Example 2

**Input**
```text
24 3 4
```

**Output**
```text
YES
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
13 3 4
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
24 3 4
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
25 5 2
```

**Expected Output**
```text
NO
```

#### Test Case 4

**Input**
```text
0 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
100 10 5
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
45 5 3
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
42 6 7
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
18 3 9
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
11 1 11
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
72 8 9
```

**Expected Output**
```text
YES
```


## Question 16 — Sign Product — Variant 2
**Difficulty:** Easy–Medium

### Problem Statement
Given two integers, determine whether their product is positive, negative, or zero without needing to print the product.

### Input Format
The first line contains two integers `a b`.

### Output Format
Print `POSITIVE`, `NEGATIVE`, or `ZERO`.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
2 -1
```

**Output**
```text
NEGATIVE
```

**Explanation**
The program reads 2 -1. Applying the stated rule gives `NEGATIVE`.

### Worked Example 2

**Input**
```text
-3 -4
```

**Output**
```text
POSITIVE
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `POSITIVE`.

### Test Cases

#### Test Case 1

**Input**
```text
2 -1
```

**Expected Output**
```text
NEGATIVE
```

#### Test Case 2

**Input**
```text
-3 -4
```

**Expected Output**
```text
POSITIVE
```

#### Test Case 3

**Input**
```text
0 5
```

**Expected Output**
```text
ZERO
```

#### Test Case 4

**Input**
```text
-1 0
```

**Expected Output**
```text
ZERO
```

#### Test Case 5

**Input**
```text
8 2
```

**Expected Output**
```text
POSITIVE
```

#### Test Case 6

**Input**
```text
-7 3
```

**Expected Output**
```text
NEGATIVE
```

#### Test Case 7

**Input**
```text
0 0
```

**Expected Output**
```text
ZERO
```

#### Test Case 8

**Input**
```text
-5 -2
```

**Expected Output**
```text
POSITIVE
```

#### Test Case 9

**Input**
```text
9 -2
```

**Expected Output**
```text
NEGATIVE
```

#### Test Case 10

**Input**
```text
4 0
```

**Expected Output**
```text
ZERO
```


## Question 17 — Range Membership — Variant 2
**Difficulty:** Easy–Medium

### Problem Statement
Given `x, l, r`, determine whether `x` lies in the inclusive range `[l,r]`.

### Input Format
The first line contains three integers `x l r`, with `l ≤ r`.

### Output Format
Print `YES` or `NO`.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
3 0 10
```

**Output**
```text
YES
```

**Explanation**
The program reads 3 0 10. Applying the stated rule gives `YES`.

### Worked Example 2

**Input**
```text
5 1 5
```

**Output**
```text
YES
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
3 0 10
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 1 5
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
0 1 5
```

**Expected Output**
```text
NO
```

#### Test Case 4

**Input**
```text
10 0 10
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
-1 -5 -2
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
8 9 12
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
12 0 12
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 3 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 -2 2
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
7 5 8
```

**Expected Output**
```text
YES
```


## Question 18 — Piecewise Fare — Variant 2
**Difficulty:** Easy–Medium

### Problem Statement
A ride costs 50 for the first 5 km and 12 for every additional km. Given distance `d`, calculate the fare.

### Input Format
The first line contains integer `d`.

### Output Format
Print the fare as an integer.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
2
```

**Output**
```text
50
```

**Explanation**
The program reads 2. Applying the stated rule gives `50`.

### Worked Example 2

**Input**
```text
5
```

**Output**
```text
50
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `50`.

### Test Cases

#### Test Case 1

**Input**
```text
2
```

**Expected Output**
```text
50
```

#### Test Case 2

**Input**
```text
5
```

**Expected Output**
```text
50
```

#### Test Case 3

**Input**
```text
6
```

**Expected Output**
```text
62
```

#### Test Case 4

**Input**
```text
0
```

**Expected Output**
```text
50
```

#### Test Case 5

**Input**
```text
10
```

**Expected Output**
```text
110
```

#### Test Case 6

**Input**
```text
20
```

**Expected Output**
```text
230
```

#### Test Case 7

**Input**
```text
1
```

**Expected Output**
```text
50
```

#### Test Case 8

**Input**
```text
50
```

**Expected Output**
```text
590
```

#### Test Case 9

**Input**
```text
100
```

**Expected Output**
```text
1190
```

#### Test Case 10

**Input**
```text
7
```

**Expected Output**
```text
74
```


## Question 19 — Operator Precedence — Variant 2
**Difficulty:** Easy–Medium

### Problem Statement
Evaluate `(a + b) * (c - d) + e` exactly as written.

### Input Format
The first line contains five integers `a b c d e`.

### Output Format
Print the result.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
2 2 5 3 4
```

**Output**
```text
12
```

**Explanation**
The program reads 2 2 5 3 4. Applying the stated rule gives `12`.

### Worked Example 2

**Input**
```text
3 4 2 1 5
```

**Output**
```text
12
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `12`.

### Test Cases

#### Test Case 1

**Input**
```text
2 2 5 3 4
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
3 4 2 1 5
```

**Expected Output**
```text
12
```

#### Test Case 3

**Input**
```text
-2 5 7 3 1
```

**Expected Output**
```text
13
```

#### Test Case 4

**Input**
```text
0 0 0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
10 2 3 4 5
```

**Expected Output**
```text
-7
```

#### Test Case 6

**Input**
```text
5 -2 8 1 9
```

**Expected Output**
```text
30
```

#### Test Case 7

**Input**
```text
-5 -3 4 2 7
```

**Expected Output**
```text
-9
```

#### Test Case 8

**Input**
```text
7 1 10 8 0
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
2 9 -1 3 6
```

**Expected Output**
```text
-38
```

#### Test Case 10

**Input**
```text
100 -4 2 5 8
```

**Expected Output**
```text
-280
```


## Question 20 — Three-Way Comparison — Variant 2
**Difficulty:** Easy–Medium

### Problem Statement
Compare `a` and `b` and print `LESS`, `EQUAL`, or `GREATER`.

### Input Format
The first line contains two integers `a b`.

### Output Format
Print one comparison word.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
1 2
```

**Output**
```text
LESS
```

**Explanation**
The program reads 1 2. Applying the stated rule gives `LESS`.

### Worked Example 2

**Input**
```text
5 5
```

**Output**
```text
EQUAL
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `EQUAL`.

### Test Cases

#### Test Case 1

**Input**
```text
1 2
```

**Expected Output**
```text
LESS
```

#### Test Case 2

**Input**
```text
5 5
```

**Expected Output**
```text
EQUAL
```

#### Test Case 3

**Input**
```text
-2 3
```

**Expected Output**
```text
LESS
```

#### Test Case 4

**Input**
```text
0 0
```

**Expected Output**
```text
EQUAL
```

#### Test Case 5

**Input**
```text
100 -1
```

**Expected Output**
```text
GREATER
```

#### Test Case 6

**Input**
```text
-5 -5
```

**Expected Output**
```text
EQUAL
```

#### Test Case 7

**Input**
```text
7 2
```

**Expected Output**
```text
GREATER
```

#### Test Case 8

**Input**
```text
2 9
```

**Expected Output**
```text
LESS
```

#### Test Case 9

**Input**
```text
42 42
```

**Expected Output**
```text
EQUAL
```

#### Test Case 10

**Input**
```text
999 1
```

**Expected Output**
```text
GREATER
```



# Belt 2 — Orange Belt
**Difficulty:** Easy–Medium



## Subdivision 2.1 — Loop Logic

## Question 21 — Arithmetic Check — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Given integers a, b, and c, compute `(a+b)*c - b`.

### Input Format
The first line contains three space-separated integers `a b c`.

### Output Format
Print the resulting integer.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
2 -3 1
```

**Output**
```text
2
```

**Explanation**
The program reads 2 -3 1. Applying the stated rule gives `2`.

### Worked Example 2

**Input**
```text
5 -4 3
```

**Output**
```text
7
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `7`.

### Test Cases

#### Test Case 1

**Input**
```text
2 -3 1
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
5 -4 3
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
1 2 3
```

**Expected Output**
```text
7
```

#### Test Case 4

**Input**
```text
0 5 2
```

**Expected Output**
```text
5
```

#### Test Case 5

**Input**
```text
-3 4 5
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
7 -2 1
```

**Expected Output**
```text
7
```

#### Test Case 7

**Input**
```text
10 10 10
```

**Expected Output**
```text
190
```

#### Test Case 8

**Input**
```text
-5 -2 3
```

**Expected Output**
```text
-19
```

#### Test Case 9

**Input**
```text
2 0 9
```

**Expected Output**
```text
18
```

#### Test Case 10

**Input**
```text
100 -4 2
```

**Expected Output**
```text
196
```


## Question 22 — Absolute Difference — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Given two integers, print their absolute difference.

### Input Format
The first line contains two space-separated integers `a b`.

### Output Format
Print `|a-b|`.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
3 -4
```

**Output**
```text
7
```

**Explanation**
The program reads 3 -4. Applying the stated rule gives `7`.

### Worked Example 2

**Input**
```text
10 3
```

**Output**
```text
7
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `7`.

### Test Cases

#### Test Case 1

**Input**
```text
3 -4
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
10 3
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
-5 7
```

**Expected Output**
```text
12
```

#### Test Case 4

**Input**
```text
0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
100 -50
```

**Expected Output**
```text
150
```

#### Test Case 6

**Input**
```text
-100 -1
```

**Expected Output**
```text
99
```

#### Test Case 7

**Input**
```text
7 12
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
1 -9
```

**Expected Output**
```text
10
```

#### Test Case 9

**Input**
```text
42 42
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
999 1
```

**Expected Output**
```text
998
```


## Question 23 — Largest of Three — Variant 1
**Difficulty:** Medium

### Problem Statement
Given three integers, print the largest value.

### Input Format
The first line contains three space-separated integers `a b c`.

### Output Format
Print the largest value.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
1 9 4
```

**Output**
```text
9
```

**Explanation**
The program reads 1 9 4. Applying the stated rule gives `9`.

### Worked Example 2

**Input**
```text
3 2 8
```

**Output**
```text
8
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `8`.

### Test Cases

#### Test Case 1

**Input**
```text
1 9 4
```

**Expected Output**
```text
9
```

#### Test Case 2

**Input**
```text
3 2 8
```

**Expected Output**
```text
8
```

#### Test Case 3

**Input**
```text
-1 -7 -3
```

**Expected Output**
```text
-1
```

#### Test Case 4

**Input**
```text
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
100 99 98
```

**Expected Output**
```text
100
```

#### Test Case 6

**Input**
```text
-5 4 -2
```

**Expected Output**
```text
4
```

#### Test Case 7

**Input**
```text
7 7 2
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
1 9 9
```

**Expected Output**
```text
9
```

#### Test Case 9

**Input**
```text
20 -20 0
```

**Expected Output**
```text
20
```

#### Test Case 10

**Input**
```text
5 4 6
```

**Expected Output**
```text
6
```


## Question 24 — Middle Value — Variant 1
**Difficulty:** Medium

### Problem Statement
Given three distinct integers, print the value that is neither the minimum nor the maximum.

### Input Format
The first line contains three distinct space-separated integers `a b c`.

### Output Format
Print the middle value.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
1 9 4
```

**Output**
```text
4
```

**Explanation**
The program reads 1 9 4. Applying the stated rule gives `4`.

### Worked Example 2

**Input**
```text
3 2 8
```

**Output**
```text
3
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `3`.

### Test Cases

#### Test Case 1

**Input**
```text
1 9 4
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
3 2 8
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
-1 -7 -3
```

**Expected Output**
```text
-3
```

#### Test Case 4

**Input**
```text
10 1 6
```

**Expected Output**
```text
6
```

#### Test Case 5

**Input**
```text
100 99 98
```

**Expected Output**
```text
99
```

#### Test Case 6

**Input**
```text
-5 4 -2
```

**Expected Output**
```text
-2
```

#### Test Case 7

**Input**
```text
7 1 2
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
1 9 5
```

**Expected Output**
```text
5
```

#### Test Case 9

**Input**
```text
20 -20 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
5 4 6
```

**Expected Output**
```text
5
```


## Question 25 — Divisibility Report — Variant 1
**Difficulty:** Medium

### Problem Statement
Given `n`, print `YES` if it is divisible by both `a` and `b`; otherwise print `NO`.

### Input Format
The first line contains three integers `n a b`.

### Output Format
Print `YES` or `NO`.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
12 3 4
```

**Output**
```text
YES
```

**Explanation**
The program reads 12 3 4. Applying the stated rule gives `YES`.

### Worked Example 2

**Input**
```text
24 3 4
```

**Output**
```text
YES
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
12 3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
24 3 4
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
25 5 2
```

**Expected Output**
```text
NO
```

#### Test Case 4

**Input**
```text
0 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
100 10 5
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
45 5 3
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
42 6 7
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
18 3 9
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
11 1 11
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
72 8 9
```

**Expected Output**
```text
YES
```


## Question 26 — Sign Product — Variant 1
**Difficulty:** Medium

### Problem Statement
Given two integers, determine whether their product is positive, negative, or zero without needing to print the product.

### Input Format
The first line contains two integers `a b`.

### Output Format
Print `POSITIVE`, `NEGATIVE`, or `ZERO`.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
1 -1
```

**Output**
```text
NEGATIVE
```

**Explanation**
The program reads 1 -1. Applying the stated rule gives `NEGATIVE`.

### Worked Example 2

**Input**
```text
-3 -4
```

**Output**
```text
POSITIVE
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `POSITIVE`.

### Test Cases

#### Test Case 1

**Input**
```text
1 -1
```

**Expected Output**
```text
NEGATIVE
```

#### Test Case 2

**Input**
```text
-3 -4
```

**Expected Output**
```text
POSITIVE
```

#### Test Case 3

**Input**
```text
0 5
```

**Expected Output**
```text
ZERO
```

#### Test Case 4

**Input**
```text
-1 0
```

**Expected Output**
```text
ZERO
```

#### Test Case 5

**Input**
```text
8 2
```

**Expected Output**
```text
POSITIVE
```

#### Test Case 6

**Input**
```text
-7 3
```

**Expected Output**
```text
NEGATIVE
```

#### Test Case 7

**Input**
```text
0 0
```

**Expected Output**
```text
ZERO
```

#### Test Case 8

**Input**
```text
-5 -2
```

**Expected Output**
```text
POSITIVE
```

#### Test Case 9

**Input**
```text
9 -2
```

**Expected Output**
```text
NEGATIVE
```

#### Test Case 10

**Input**
```text
4 0
```

**Expected Output**
```text
ZERO
```


## Question 27 — Range Membership — Variant 1
**Difficulty:** Medium

### Problem Statement
Given `x, l, r`, determine whether `x` lies in the inclusive range `[l,r]`.

### Input Format
The first line contains three integers `x l r`, with `l ≤ r`.

### Output Format
Print `YES` or `NO`.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
2 0 10
```

**Output**
```text
YES
```

**Explanation**
The program reads 2 0 10. Applying the stated rule gives `YES`.

### Worked Example 2

**Input**
```text
5 1 5
```

**Output**
```text
YES
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
2 0 10
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 1 5
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
0 1 5
```

**Expected Output**
```text
NO
```

#### Test Case 4

**Input**
```text
10 0 10
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
-1 -5 -2
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
8 9 12
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
12 0 12
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 3 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 -2 2
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
7 5 8
```

**Expected Output**
```text
YES
```


## Question 28 — Piecewise Fare — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
A ride costs 50 for the first 5 km and 12 for every additional km. Given distance `d`, calculate the fare.

### Input Format
The first line contains integer `d`.

### Output Format
Print the fare as an integer.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
1
```

**Output**
```text
50
```

**Explanation**
The program reads 1. Applying the stated rule gives `50`.

### Worked Example 2

**Input**
```text
5
```

**Output**
```text
50
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `50`.

### Test Cases

#### Test Case 1

**Input**
```text
1
```

**Expected Output**
```text
50
```

#### Test Case 2

**Input**
```text
5
```

**Expected Output**
```text
50
```

#### Test Case 3

**Input**
```text
6
```

**Expected Output**
```text
62
```

#### Test Case 4

**Input**
```text
0
```

**Expected Output**
```text
50
```

#### Test Case 5

**Input**
```text
10
```

**Expected Output**
```text
110
```

#### Test Case 6

**Input**
```text
20
```

**Expected Output**
```text
230
```

#### Test Case 7

**Input**
```text
1
```

**Expected Output**
```text
50
```

#### Test Case 8

**Input**
```text
50
```

**Expected Output**
```text
590
```

#### Test Case 9

**Input**
```text
100
```

**Expected Output**
```text
1190
```

#### Test Case 10

**Input**
```text
7
```

**Expected Output**
```text
74
```


## Question 29 — Operator Precedence — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
Evaluate `(a + b) * (c - d) + e` exactly as written.

### Input Format
The first line contains five integers `a b c d e`.

### Output Format
Print the result.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
1 2 5 3 4
```

**Output**
```text
10
```

**Explanation**
The program reads 1 2 5 3 4. Applying the stated rule gives `10`.

### Worked Example 2

**Input**
```text
3 4 2 1 5
```

**Output**
```text
12
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `12`.

### Test Cases

#### Test Case 1

**Input**
```text
1 2 5 3 4
```

**Expected Output**
```text
10
```

#### Test Case 2

**Input**
```text
3 4 2 1 5
```

**Expected Output**
```text
12
```

#### Test Case 3

**Input**
```text
-2 5 7 3 1
```

**Expected Output**
```text
13
```

#### Test Case 4

**Input**
```text
0 0 0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
10 2 3 4 5
```

**Expected Output**
```text
-7
```

#### Test Case 6

**Input**
```text
5 -2 8 1 9
```

**Expected Output**
```text
30
```

#### Test Case 7

**Input**
```text
-5 -3 4 2 7
```

**Expected Output**
```text
-9
```

#### Test Case 8

**Input**
```text
7 1 10 8 0
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
2 9 -1 3 6
```

**Expected Output**
```text
-38
```

#### Test Case 10

**Input**
```text
100 -4 2 5 8
```

**Expected Output**
```text
-280
```


## Question 30 — Three-Way Comparison — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
Compare `a` and `b` and print `LESS`, `EQUAL`, or `GREATER`.

### Input Format
The first line contains two integers `a b`.

### Output Format
Print one comparison word.

### Constraints
-10^9 ≤ every integer input ≤ 10^9.

### Worked Example 1

**Input**
```text
0 1
```

**Output**
```text
LESS
```

**Explanation**
The program reads 0 1. Applying the stated rule gives `LESS`.

### Worked Example 2

**Input**
```text
5 5
```

**Output**
```text
EQUAL
```

**Explanation**
For the second case, the same rule is applied to the supplied values, producing `EQUAL`.

### Test Cases

#### Test Case 1

**Input**
```text
0 1
```

**Expected Output**
```text
LESS
```

#### Test Case 2

**Input**
```text
5 5
```

**Expected Output**
```text
EQUAL
```

#### Test Case 3

**Input**
```text
-2 3
```

**Expected Output**
```text
LESS
```

#### Test Case 4

**Input**
```text
0 0
```

**Expected Output**
```text
EQUAL
```

#### Test Case 5

**Input**
```text
100 -1
```

**Expected Output**
```text
GREATER
```

#### Test Case 6

**Input**
```text
-5 -5
```

**Expected Output**
```text
EQUAL
```

#### Test Case 7

**Input**
```text
7 2
```

**Expected Output**
```text
GREATER
```

#### Test Case 8

**Input**
```text
2 9
```

**Expected Output**
```text
LESS
```

#### Test Case 9

**Input**
```text
42 42
```

**Expected Output**
```text
EQUAL
```

#### Test Case 10

**Input**
```text
999 1
```

**Expected Output**
```text
GREATER
```


## Subdivision 2.2 — Introductory Arrays

## Question 31 — Array Sum — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
-2 1 3 -1 2
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
-2 1 3 -1 2
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
1 4 -2
```

**Expected Output**
```text
3
```


## Question 32 — Array Minimum — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
3 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
3 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
0 0 5
```

**Expected Output**
```text
0
```


## Question 33 — Count Above Threshold — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
0 1 9
```

**Expected Output**
```text
1
```


## Question 34 — Reverse Array — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
0 1 2
```

**Expected Output**
```text
2 1 0
```


## Question 35 — Rotate Left — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 0
1 2 3 4
```

**Expected Output**
```text
1 2 3 4
```


## Question 36 — Second Largest — Variant 1
**Difficulty:** Medium

### Problem Statement
Find the second distinct largest value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the second distinct largest value, or `NONE` if fewer than two distinct values exist.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 5 3 5
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
2
1 2
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 3 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
2
1 2
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
5 5 5
```

**Expected Output**
```text
NONE
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-2
```

#### Test Case 5

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
9
```

#### Test Case 6

**Input**
```text
4
7 3 7 2
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3
0 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
75
```

#### Test Case 9

**Input**
```text
3
2 1 0
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3
0 2 1
```

**Expected Output**
```text
1
```


## Question 37 — Prefix Running Sum — Variant 1
**Difficulty:** Medium

### Problem Statement
For every position, report the sum from index 0 through that position.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the running sum after each element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
1 3 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 6`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 3 6
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 4

**Input**
```text
4
-1 2 -3 4
```

**Expected Output**
```text
-1 1 -2 2
```

#### Test Case 5

**Input**
```text
3
10 -5 2
```

**Expected Output**
```text
10 5 7
```

#### Test Case 6

**Input**
```text
2
7 7
```

**Expected Output**
```text
7 14
```

#### Test Case 7

**Input**
```text
3
100 -100 5
```

**Expected Output**
```text
100 0 5
```

#### Test Case 8

**Input**
```text
3
-2 -2 -2
```

**Expected Output**
```text
-2 -4 -6
```

#### Test Case 9

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 2 2
```

#### Test Case 10

**Input**
```text
3
0 1 2
```

**Expected Output**
```text
0 1 3
```


## Question 38 — Distinct Count — Variant 1
**Difficulty:** Medium

### Problem Statement
Count how many distinct integer values occur.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the number of distinct values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 1 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3
-1 -2 -1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
0

```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
3
7 8 9
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
5
2 2 3 3 4
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
4
10 9 10 8
```

**Expected Output**
```text
3
```


## Question 39 — Longest Equal Run — Variant 1
**Difficulty:** Medium

### Problem Statement
Find the longest consecutive run containing the same value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum length of a consecutive run of equal values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
6
1 1 2 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
6
1 1 2 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
5
1 1 2 1 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
4
-1 -1 -1 0
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
4
7 7 8 8
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
6
1 2 2 3 3 3
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
5
0 0 1 1 1
```

**Expected Output**
```text
3
```


## Question 40 — Pair Sum Exists — Variant 1
**Difficulty:** Medium

### Problem Statement
Determine whether two distinct array positions contain values whose sum equals the target.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print `YES` if two distinct elements sum to `t`; otherwise print `NO`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 6
1 2 4
```

**Output**
```text
YES
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `YES`.

### Worked Example 2

**Input**
```text
3 10
1 2 3
```

**Output**
```text
NO
```

**Explanation**
For the second case, applying the same rule gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
3 6
1 2 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 10
1 2 3
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2 0
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
3 3
-1 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
3 4
2 2 2
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
1 1
1
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
3 14
5 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 -7
-5 -2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
2 25
10 20
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 1
0 1 2
```

**Expected Output**
```text
YES
```


## Question 41 — Move Zeroes — Variant 1
**Difficulty:** Medium

### Problem Statement
Move all zeroes to the end while preserving non-zero order.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the array with all zeroes moved to the end while preserving the relative order of non-zero values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
0 1 0 3 12
```

**Output**
```text
1 3 12 0 0
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 12 0 0`.

### Worked Example 2

**Input**
```text
3
0 0 1
```

**Output**
```text
1 0 0
```

**Explanation**
For the second case, applying the same rule gives `1 0 0`.

### Test Cases

#### Test Case 1

**Input**
```text
5
0 1 0 3 12
```

**Expected Output**
```text
1 3 12 0 0
```

#### Test Case 2

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
1 0 0
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
2
0 0
```

**Expected Output**
```text
0 0
```

#### Test Case 6

**Input**
```text
5
1 0 2 0 3
```

**Expected Output**
```text
1 2 3 0 0
```

#### Test Case 7

**Input**
```text
3
-1 0 -2
```

**Expected Output**
```text
-1 -2 0
```

#### Test Case 8

**Input**
```text
3
5 0 5
```

**Expected Output**
```text
5 5 0
```

#### Test Case 9

**Input**
```text
5
0 1 0 0 2
```

**Expected Output**
```text
1 2 0 0 0
```

#### Test Case 10

**Input**
```text
4
0 0 1 0
```

**Expected Output**
```text
1 0 0 0
```


## Question 42 — Merge Sorted Arrays — Variant 1
**Difficulty:** Medium

### Problem Statement
Merge two sorted arrays into one sorted sequence.

### Input Format
The first line contains `n m`. The second line contains `n` sorted integers. The third line contains `m` sorted integers.

### Output Format
Print the merged sorted sequence.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Output**
```text
1 2 3 4 5 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 2 3 4 5 6`.

### Worked Example 2

**Input**
```text
1 1
1
2
```

**Output**
```text
1 2
```

**Explanation**
For the second case, applying the same rule gives `1 2`.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Expected Output**
```text
1 2 3 4 5 6
```

#### Test Case 2

**Input**
```text
1 1
1
2
```

**Expected Output**
```text
1 2
```

#### Test Case 3

**Input**
```text
0 2

1 2
```

**Expected Output**
```text
1 2
```

#### Test Case 4

**Input**
```text
2 2
-3 0
-2 4
```

**Expected Output**
```text
-3 -2 0 4
```

#### Test Case 5

**Input**
```text
2 2
1 1
1 2
```

**Expected Output**
```text
1 1 1 2
```

#### Test Case 6

**Input**
```text
2 2
5 6
1 2
```

**Expected Output**
```text
1 2 5 6
```

#### Test Case 7

**Input**
```text
1 1
0
0
```

**Expected Output**
```text
0 0
```

#### Test Case 8

**Input**
```text
3 1
2 7 9
3
```

**Expected Output**
```text
2 3 7 9
```

#### Test Case 9

**Input**
```text
2 2
-5 -1
-4 -2
```

**Expected Output**
```text
-5 -4 -2 -1
```

#### Test Case 10

**Input**
```text
2 2
0 10
1 11
```

**Expected Output**
```text
0 1 10 11
```


## Question 43 — Frequency of Target — Variant 1
**Difficulty:** Medium

### Problem Statement
Count occurrences of a target value.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print the number of occurrences of `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 1
1 2 1 1
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3 5
5 5 5
```

**Output**
```text
3
```

**Explanation**
For the second case, applying the same rule gives `3`.

### Test Cases

#### Test Case 1

**Input**
```text
4 1
1 2 1 1
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
3 -1
-1 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
1 7
7
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
4 2
1 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
3 9
10 9 8
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
3 0
0 1 0
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
0 0

```

**Expected Output**
```text
0
```


## Question 44 — First Maximum Index — Variant 1
**Difficulty:** Medium

### Problem Statement
Find the first zero-based index of the maximum value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the zero-based index of the first occurrence of the maximum value.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 9 3
```

**Output**
```text
1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
0
```

**Explanation**
For the second case, applying the same rule gives `0`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 9 3
```

**Expected Output**
```text
1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
2 2 1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
0 4 4
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
7 1 7
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
0 3 3
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
3 2 5 5
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3
100 -1 100
```

**Expected Output**
```text
0
```


## Question 45 — Alternating Sum — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
Compute the sum at even indices minus the sum at odd indices.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of elements at even indices minus the sum at odd indices.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 3 4
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
2 4 6
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
3
10 1 5
```

**Expected Output**
```text
14
```

#### Test Case 6

**Input**
```text
3
-1 2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
-2
```

#### Test Case 8

**Input**
```text
2
7 3
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
4
0 1 2 3
```

**Expected Output**
```text
-2
```


## Question 46 — Array Sum — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
-1 2 3 -1 2
```

**Output**
```text
5
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `5`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
-1 2 3 -1 2
```

**Expected Output**
```text
5
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
2 4 -2
```

**Expected Output**
```text
4
```


## Question 47 — Array Minimum — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
4 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
4 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
1 -1 5
```

**Expected Output**
```text
-1
```


## Question 48 — Count Above Threshold — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
1 1 9
```

**Expected Output**
```text
1
```


## Question 49 — Reverse Array — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```


## Question 50 — Rotate Left — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 1
2 2 3 4
```

**Expected Output**
```text
2 3 4 2
```



# Belt 3 — Green Belt
**Difficulty:** Medium



## Subdivision — Structured Problem Solving

## Question 51 — Array Sum — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
-2 1 3 -1 2
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
-2 1 3 -1 2
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
1 4 -2
```

**Expected Output**
```text
3
```


## Question 52 — Array Minimum — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
3 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
3 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
0 0 5
```

**Expected Output**
```text
0
```


## Question 53 — Count Above Threshold — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
0 1 9
```

**Expected Output**
```text
1
```


## Question 54 — Reverse Array — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
0 1 2
```

**Expected Output**
```text
2 1 0
```


## Question 55 — Rotate Left — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 0
1 2 3 4
```

**Expected Output**
```text
1 2 3 4
```


## Question 56 — Second Largest — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Find the second distinct largest value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the second distinct largest value, or `NONE` if fewer than two distinct values exist.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 5 3 5
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
2
1 2
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 3 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
2
1 2
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
5 5 5
```

**Expected Output**
```text
NONE
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-2
```

#### Test Case 5

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
9
```

#### Test Case 6

**Input**
```text
4
7 3 7 2
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3
0 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
75
```

#### Test Case 9

**Input**
```text
3
2 1 0
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3
0 2 1
```

**Expected Output**
```text
1
```


## Question 57 — Prefix Running Sum — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
For every position, report the sum from index 0 through that position.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the running sum after each element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
1 3 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 6`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 3 6
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 4

**Input**
```text
4
-1 2 -3 4
```

**Expected Output**
```text
-1 1 -2 2
```

#### Test Case 5

**Input**
```text
3
10 -5 2
```

**Expected Output**
```text
10 5 7
```

#### Test Case 6

**Input**
```text
2
7 7
```

**Expected Output**
```text
7 14
```

#### Test Case 7

**Input**
```text
3
100 -100 5
```

**Expected Output**
```text
100 0 5
```

#### Test Case 8

**Input**
```text
3
-2 -2 -2
```

**Expected Output**
```text
-2 -4 -6
```

#### Test Case 9

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 2 2
```

#### Test Case 10

**Input**
```text
3
0 1 2
```

**Expected Output**
```text
0 1 3
```


## Question 58 — Distinct Count — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Count how many distinct integer values occur.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the number of distinct values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 1 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3
-1 -2 -1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
0

```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
3
7 8 9
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
5
2 2 3 3 4
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
4
10 9 10 8
```

**Expected Output**
```text
3
```


## Question 59 — Longest Equal Run — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Find the longest consecutive run containing the same value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum length of a consecutive run of equal values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
6
1 1 2 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
6
1 1 2 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
5
1 1 2 1 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
4
-1 -1 -1 0
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
4
7 7 8 8
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
6
1 2 2 3 3 3
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
5
0 0 1 1 1
```

**Expected Output**
```text
3
```


## Question 60 — Pair Sum Exists — Variant 1
**Difficulty:** Easy–Medium

### Problem Statement
Determine whether two distinct array positions contain values whose sum equals the target.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print `YES` if two distinct elements sum to `t`; otherwise print `NO`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 6
1 2 4
```

**Output**
```text
YES
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `YES`.

### Worked Example 2

**Input**
```text
3 10
1 2 3
```

**Output**
```text
NO
```

**Explanation**
For the second case, applying the same rule gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
3 6
1 2 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 10
1 2 3
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2 0
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
3 3
-1 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
3 4
2 2 2
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
1 1
1
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
3 14
5 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 -7
-5 -2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
2 25
10 20
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 1
0 1 2
```

**Expected Output**
```text
YES
```


## Question 61 — Move Zeroes — Variant 1
**Difficulty:** Medium

### Problem Statement
Move all zeroes to the end while preserving non-zero order.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the array with all zeroes moved to the end while preserving the relative order of non-zero values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
0 1 0 3 12
```

**Output**
```text
1 3 12 0 0
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 12 0 0`.

### Worked Example 2

**Input**
```text
3
0 0 1
```

**Output**
```text
1 0 0
```

**Explanation**
For the second case, applying the same rule gives `1 0 0`.

### Test Cases

#### Test Case 1

**Input**
```text
5
0 1 0 3 12
```

**Expected Output**
```text
1 3 12 0 0
```

#### Test Case 2

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
1 0 0
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
2
0 0
```

**Expected Output**
```text
0 0
```

#### Test Case 6

**Input**
```text
5
1 0 2 0 3
```

**Expected Output**
```text
1 2 3 0 0
```

#### Test Case 7

**Input**
```text
3
-1 0 -2
```

**Expected Output**
```text
-1 -2 0
```

#### Test Case 8

**Input**
```text
3
5 0 5
```

**Expected Output**
```text
5 5 0
```

#### Test Case 9

**Input**
```text
5
0 1 0 0 2
```

**Expected Output**
```text
1 2 0 0 0
```

#### Test Case 10

**Input**
```text
4
0 0 1 0
```

**Expected Output**
```text
1 0 0 0
```


## Question 62 — Merge Sorted Arrays — Variant 1
**Difficulty:** Medium

### Problem Statement
Merge two sorted arrays into one sorted sequence.

### Input Format
The first line contains `n m`. The second line contains `n` sorted integers. The third line contains `m` sorted integers.

### Output Format
Print the merged sorted sequence.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Output**
```text
1 2 3 4 5 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 2 3 4 5 6`.

### Worked Example 2

**Input**
```text
1 1
1
2
```

**Output**
```text
1 2
```

**Explanation**
For the second case, applying the same rule gives `1 2`.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Expected Output**
```text
1 2 3 4 5 6
```

#### Test Case 2

**Input**
```text
1 1
1
2
```

**Expected Output**
```text
1 2
```

#### Test Case 3

**Input**
```text
0 2

1 2
```

**Expected Output**
```text
1 2
```

#### Test Case 4

**Input**
```text
2 2
-3 0
-2 4
```

**Expected Output**
```text
-3 -2 0 4
```

#### Test Case 5

**Input**
```text
2 2
1 1
1 2
```

**Expected Output**
```text
1 1 1 2
```

#### Test Case 6

**Input**
```text
2 2
5 6
1 2
```

**Expected Output**
```text
1 2 5 6
```

#### Test Case 7

**Input**
```text
1 1
0
0
```

**Expected Output**
```text
0 0
```

#### Test Case 8

**Input**
```text
3 1
2 7 9
3
```

**Expected Output**
```text
2 3 7 9
```

#### Test Case 9

**Input**
```text
2 2
-5 -1
-4 -2
```

**Expected Output**
```text
-5 -4 -2 -1
```

#### Test Case 10

**Input**
```text
2 2
0 10
1 11
```

**Expected Output**
```text
0 1 10 11
```


## Question 63 — Frequency of Target — Variant 1
**Difficulty:** Medium

### Problem Statement
Count occurrences of a target value.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print the number of occurrences of `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 1
1 2 1 1
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3 5
5 5 5
```

**Output**
```text
3
```

**Explanation**
For the second case, applying the same rule gives `3`.

### Test Cases

#### Test Case 1

**Input**
```text
4 1
1 2 1 1
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
3 -1
-1 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
1 7
7
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
4 2
1 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
3 9
10 9 8
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
3 0
0 1 0
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
0 0

```

**Expected Output**
```text
0
```


## Question 64 — First Maximum Index — Variant 1
**Difficulty:** Medium

### Problem Statement
Find the first zero-based index of the maximum value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the zero-based index of the first occurrence of the maximum value.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 9 3
```

**Output**
```text
1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
0
```

**Explanation**
For the second case, applying the same rule gives `0`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 9 3
```

**Expected Output**
```text
1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
2 2 1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
0 4 4
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
7 1 7
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
0 3 3
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
3 2 5 5
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3
100 -1 100
```

**Expected Output**
```text
0
```


## Question 65 — Alternating Sum — Variant 1
**Difficulty:** Medium

### Problem Statement
Compute the sum at even indices minus the sum at odd indices.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of elements at even indices minus the sum at odd indices.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 3 4
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
2 4 6
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
3
10 1 5
```

**Expected Output**
```text
14
```

#### Test Case 6

**Input**
```text
3
-1 2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
-2
```

#### Test Case 8

**Input**
```text
2
7 3
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
4
0 1 2 3
```

**Expected Output**
```text
-2
```


## Question 66 — Array Sum — Variant 2
**Difficulty:** Medium

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
-1 2 3 -1 2
```

**Output**
```text
5
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `5`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
-1 2 3 -1 2
```

**Expected Output**
```text
5
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
2 4 -2
```

**Expected Output**
```text
4
```


## Question 67 — Array Minimum — Variant 2
**Difficulty:** Medium

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
4 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
4 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
1 -1 5
```

**Expected Output**
```text
-1
```


## Question 68 — Count Above Threshold — Variant 2
**Difficulty:** Medium

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
1 1 9
```

**Expected Output**
```text
1
```


## Question 69 — Reverse Array — Variant 2
**Difficulty:** Medium

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```


## Question 70 — Rotate Left — Variant 2
**Difficulty:** Medium

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 1
2 2 3 4
```

**Expected Output**
```text
2 3 4 2
```


## Question 71 — Second Largest — Variant 2
**Difficulty:** Medium

### Problem Statement
Find the second distinct largest value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the second distinct largest value, or `NONE` if fewer than two distinct values exist.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 5 3 5
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
2
1 2
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 3 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
2
1 2
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
5 5 5
```

**Expected Output**
```text
NONE
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-2
```

#### Test Case 5

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
9
```

#### Test Case 6

**Input**
```text
4
7 3 7 2
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3
0 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
75
```

#### Test Case 9

**Input**
```text
3
2 1 0
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3
1 3 2
```

**Expected Output**
```text
2
```


## Question 72 — Prefix Running Sum — Variant 2
**Difficulty:** Medium

### Problem Statement
For every position, report the sum from index 0 through that position.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the running sum after each element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
1 3 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 6`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 3 6
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 4

**Input**
```text
4
-1 2 -3 4
```

**Expected Output**
```text
-1 1 -2 2
```

#### Test Case 5

**Input**
```text
3
10 -5 2
```

**Expected Output**
```text
10 5 7
```

#### Test Case 6

**Input**
```text
2
7 7
```

**Expected Output**
```text
7 14
```

#### Test Case 7

**Input**
```text
3
100 -100 5
```

**Expected Output**
```text
100 0 5
```

#### Test Case 8

**Input**
```text
3
-2 -2 -2
```

**Expected Output**
```text
-2 -4 -6
```

#### Test Case 9

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 2 2
```

#### Test Case 10

**Input**
```text
3
1 1 2
```

**Expected Output**
```text
1 2 4
```


## Question 73 — Distinct Count — Variant 2
**Difficulty:** Medium

### Problem Statement
Count how many distinct integer values occur.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the number of distinct values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 1 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3
-1 -2 -1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
0

```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
3
7 8 9
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
5
2 2 3 3 4
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
3
1 1 2
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
4
10 9 10 8
```

**Expected Output**
```text
3
```


## Question 74 — Longest Equal Run — Variant 2
**Difficulty:** Medium

### Problem Statement
Find the longest consecutive run containing the same value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum length of a consecutive run of equal values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
6
1 1 2 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
6
1 1 2 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
5
1 1 2 1 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
4
-1 -1 -1 0
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
4
7 7 8 8
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
6
1 2 2 3 3 3
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
5
1 1 2 2 2
```

**Expected Output**
```text
3
```


## Question 75 — Pair Sum Exists — Variant 2
**Difficulty:** Medium

### Problem Statement
Determine whether two distinct array positions contain values whose sum equals the target.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print `YES` if two distinct elements sum to `t`; otherwise print `NO`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 6
1 2 4
```

**Output**
```text
YES
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `YES`.

### Worked Example 2

**Input**
```text
3 10
1 2 3
```

**Output**
```text
NO
```

**Explanation**
For the second case, applying the same rule gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
3 6
1 2 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 10
1 2 3
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2 0
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
3 3
-1 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
3 4
2 2 2
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
1 1
1
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
3 14
5 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 -7
-5 -2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
2 25
10 20
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
1 1 2
```

**Expected Output**
```text
YES
```


## Question 76 — Move Zeroes — Variant 2
**Difficulty:** Medium

### Problem Statement
Move all zeroes to the end while preserving non-zero order.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the array with all zeroes moved to the end while preserving the relative order of non-zero values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
0 1 0 3 12
```

**Output**
```text
1 3 12 0 0
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 12 0 0`.

### Worked Example 2

**Input**
```text
3
0 0 1
```

**Output**
```text
1 0 0
```

**Explanation**
For the second case, applying the same rule gives `1 0 0`.

### Test Cases

#### Test Case 1

**Input**
```text
5
0 1 0 3 12
```

**Expected Output**
```text
1 3 12 0 0
```

#### Test Case 2

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
1 0 0
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
2
0 0
```

**Expected Output**
```text
0 0
```

#### Test Case 6

**Input**
```text
5
1 0 2 0 3
```

**Expected Output**
```text
1 2 3 0 0
```

#### Test Case 7

**Input**
```text
3
-1 0 -2
```

**Expected Output**
```text
-1 -2 0
```

#### Test Case 8

**Input**
```text
3
5 0 5
```

**Expected Output**
```text
5 5 0
```

#### Test Case 9

**Input**
```text
5
0 1 0 0 2
```

**Expected Output**
```text
1 2 0 0 0
```

#### Test Case 10

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 0 0
```


## Question 77 — Merge Sorted Arrays — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Merge two sorted arrays into one sorted sequence.

### Input Format
The first line contains `n m`. The second line contains `n` sorted integers. The third line contains `m` sorted integers.

### Output Format
Print the merged sorted sequence.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Output**
```text
1 2 3 4 5 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 2 3 4 5 6`.

### Worked Example 2

**Input**
```text
1 1
1
2
```

**Output**
```text
1 2
```

**Explanation**
For the second case, applying the same rule gives `1 2`.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Expected Output**
```text
1 2 3 4 5 6
```

#### Test Case 2

**Input**
```text
1 1
1
2
```

**Expected Output**
```text
1 2
```

#### Test Case 3

**Input**
```text
0 2

1 2
```

**Expected Output**
```text
1 2
```

#### Test Case 4

**Input**
```text
2 2
-3 0
-2 4
```

**Expected Output**
```text
-3 -2 0 4
```

#### Test Case 5

**Input**
```text
2 2
1 1
1 2
```

**Expected Output**
```text
1 1 1 2
```

#### Test Case 6

**Input**
```text
2 2
5 6
1 2
```

**Expected Output**
```text
1 2 5 6
```

#### Test Case 7

**Input**
```text
1 1
0
0
```

**Expected Output**
```text
0 0
```

#### Test Case 8

**Input**
```text
3 1
2 7 9
3
```

**Expected Output**
```text
2 3 7 9
```

#### Test Case 9

**Input**
```text
2 2
-5 -1
-4 -2
```

**Expected Output**
```text
-5 -4 -2 -1
```

#### Test Case 10

**Input**
```text
2 2
1 10
1 11
```

**Expected Output**
```text
1 1 10 11
```


## Question 78 — Frequency of Target — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Count occurrences of a target value.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print the number of occurrences of `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 1
1 2 1 1
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3 5
5 5 5
```

**Output**
```text
3
```

**Explanation**
For the second case, applying the same rule gives `3`.

### Test Cases

#### Test Case 1

**Input**
```text
4 1
1 2 1 1
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
3 -1
-1 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
1 7
7
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
4 2
1 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
3 9
10 9 8
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
3 1
1 1 1
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
0 0

```

**Expected Output**
```text
0
```


## Question 79 — First Maximum Index — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Find the first zero-based index of the maximum value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the zero-based index of the first occurrence of the maximum value.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 9 3
```

**Output**
```text
1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
0
```

**Explanation**
For the second case, applying the same rule gives `0`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 9 3
```

**Expected Output**
```text
1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
2 2 1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
0 4 4
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
7 1 7
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
1 4 4
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
3 2 5 5
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3
100 -1 100
```

**Expected Output**
```text
0
```


## Question 80 — Alternating Sum — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Compute the sum at even indices minus the sum at odd indices.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of elements at even indices minus the sum at odd indices.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 3 4
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
2 4 6
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
3
10 1 5
```

**Expected Output**
```text
14
```

#### Test Case 6

**Input**
```text
3
-1 2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
-2
```

#### Test Case 8

**Input**
```text
2
7 3
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
4
1 1 2 3
```

**Expected Output**
```text
-1
```


## Question 81 — Array Sum — Variant 3
**Difficulty:** Medium–Hard

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
0 3 3 -1 2
```

**Output**
```text
7
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `7`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
0 3 3 -1 2
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
3 4 -2
```

**Expected Output**
```text
5
```


## Question 82 — Array Minimum — Variant 3
**Difficulty:** Medium–Hard

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
5 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
5 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
2 -2 5
```

**Expected Output**
```text
-2
```


## Question 83 — Count Above Threshold — Variant 3
**Difficulty:** Medium–Hard

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
2 1 9
```

**Expected Output**
```text
1
```


## Question 84 — Reverse Array — Variant 3
**Difficulty:** Medium–Hard

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
2 3 4
```

**Expected Output**
```text
4 3 2
```


## Question 85 — Rotate Left — Variant 3
**Difficulty:** Medium–Hard

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 2
3 2 3 4
```

**Expected Output**
```text
3 4 3 2
```



# Belt 4 — Purple Belt
**Difficulty:** Medium–Hard



## Subdivision — Structured Problem Solving

## Question 86 — Array Sum — Variant 1
**Difficulty:** Medium

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
-2 1 3 -1 2
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
-2 1 3 -1 2
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
1 4 -2
```

**Expected Output**
```text
3
```


## Question 87 — Array Minimum — Variant 1
**Difficulty:** Medium

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
3 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
3 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
0 0 5
```

**Expected Output**
```text
0
```


## Question 88 — Count Above Threshold — Variant 1
**Difficulty:** Medium

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
0 1 9
```

**Expected Output**
```text
1
```


## Question 89 — Reverse Array — Variant 1
**Difficulty:** Medium

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
0 1 2
```

**Expected Output**
```text
2 1 0
```


## Question 90 — Rotate Left — Variant 1
**Difficulty:** Medium

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 0
1 2 3 4
```

**Expected Output**
```text
1 2 3 4
```


## Question 91 — Second Largest — Variant 1
**Difficulty:** Medium

### Problem Statement
Find the second distinct largest value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the second distinct largest value, or `NONE` if fewer than two distinct values exist.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 5 3 5
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
2
1 2
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 3 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
2
1 2
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
5 5 5
```

**Expected Output**
```text
NONE
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-2
```

#### Test Case 5

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
9
```

#### Test Case 6

**Input**
```text
4
7 3 7 2
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3
0 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
75
```

#### Test Case 9

**Input**
```text
3
2 1 0
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3
0 2 1
```

**Expected Output**
```text
1
```


## Question 92 — Prefix Running Sum — Variant 1
**Difficulty:** Medium

### Problem Statement
For every position, report the sum from index 0 through that position.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the running sum after each element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
1 3 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 6`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 3 6
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 4

**Input**
```text
4
-1 2 -3 4
```

**Expected Output**
```text
-1 1 -2 2
```

#### Test Case 5

**Input**
```text
3
10 -5 2
```

**Expected Output**
```text
10 5 7
```

#### Test Case 6

**Input**
```text
2
7 7
```

**Expected Output**
```text
7 14
```

#### Test Case 7

**Input**
```text
3
100 -100 5
```

**Expected Output**
```text
100 0 5
```

#### Test Case 8

**Input**
```text
3
-2 -2 -2
```

**Expected Output**
```text
-2 -4 -6
```

#### Test Case 9

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 2 2
```

#### Test Case 10

**Input**
```text
3
0 1 2
```

**Expected Output**
```text
0 1 3
```


## Question 93 — Distinct Count — Variant 1
**Difficulty:** Medium

### Problem Statement
Count how many distinct integer values occur.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the number of distinct values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 1 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3
-1 -2 -1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
0

```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
3
7 8 9
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
5
2 2 3 3 4
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
4
10 9 10 8
```

**Expected Output**
```text
3
```


## Question 94 — Longest Equal Run — Variant 1
**Difficulty:** Medium

### Problem Statement
Find the longest consecutive run containing the same value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum length of a consecutive run of equal values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
6
1 1 2 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
6
1 1 2 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
5
1 1 2 1 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
4
-1 -1 -1 0
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
4
7 7 8 8
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
6
1 2 2 3 3 3
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
5
0 0 1 1 1
```

**Expected Output**
```text
3
```


## Question 95 — Pair Sum Exists — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
Determine whether two distinct array positions contain values whose sum equals the target.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print `YES` if two distinct elements sum to `t`; otherwise print `NO`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 6
1 2 4
```

**Output**
```text
YES
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `YES`.

### Worked Example 2

**Input**
```text
3 10
1 2 3
```

**Output**
```text
NO
```

**Explanation**
For the second case, applying the same rule gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
3 6
1 2 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 10
1 2 3
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2 0
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
3 3
-1 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
3 4
2 2 2
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
1 1
1
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
3 14
5 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 -7
-5 -2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
2 25
10 20
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 1
0 1 2
```

**Expected Output**
```text
YES
```


## Question 96 — Move Zeroes — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
Move all zeroes to the end while preserving non-zero order.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the array with all zeroes moved to the end while preserving the relative order of non-zero values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
0 1 0 3 12
```

**Output**
```text
1 3 12 0 0
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 12 0 0`.

### Worked Example 2

**Input**
```text
3
0 0 1
```

**Output**
```text
1 0 0
```

**Explanation**
For the second case, applying the same rule gives `1 0 0`.

### Test Cases

#### Test Case 1

**Input**
```text
5
0 1 0 3 12
```

**Expected Output**
```text
1 3 12 0 0
```

#### Test Case 2

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
1 0 0
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
2
0 0
```

**Expected Output**
```text
0 0
```

#### Test Case 6

**Input**
```text
5
1 0 2 0 3
```

**Expected Output**
```text
1 2 3 0 0
```

#### Test Case 7

**Input**
```text
3
-1 0 -2
```

**Expected Output**
```text
-1 -2 0
```

#### Test Case 8

**Input**
```text
3
5 0 5
```

**Expected Output**
```text
5 5 0
```

#### Test Case 9

**Input**
```text
5
0 1 0 0 2
```

**Expected Output**
```text
1 2 0 0 0
```

#### Test Case 10

**Input**
```text
4
0 0 1 0
```

**Expected Output**
```text
1 0 0 0
```


## Question 97 — Merge Sorted Arrays — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
Merge two sorted arrays into one sorted sequence.

### Input Format
The first line contains `n m`. The second line contains `n` sorted integers. The third line contains `m` sorted integers.

### Output Format
Print the merged sorted sequence.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Output**
```text
1 2 3 4 5 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 2 3 4 5 6`.

### Worked Example 2

**Input**
```text
1 1
1
2
```

**Output**
```text
1 2
```

**Explanation**
For the second case, applying the same rule gives `1 2`.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Expected Output**
```text
1 2 3 4 5 6
```

#### Test Case 2

**Input**
```text
1 1
1
2
```

**Expected Output**
```text
1 2
```

#### Test Case 3

**Input**
```text
0 2

1 2
```

**Expected Output**
```text
1 2
```

#### Test Case 4

**Input**
```text
2 2
-3 0
-2 4
```

**Expected Output**
```text
-3 -2 0 4
```

#### Test Case 5

**Input**
```text
2 2
1 1
1 2
```

**Expected Output**
```text
1 1 1 2
```

#### Test Case 6

**Input**
```text
2 2
5 6
1 2
```

**Expected Output**
```text
1 2 5 6
```

#### Test Case 7

**Input**
```text
1 1
0
0
```

**Expected Output**
```text
0 0
```

#### Test Case 8

**Input**
```text
3 1
2 7 9
3
```

**Expected Output**
```text
2 3 7 9
```

#### Test Case 9

**Input**
```text
2 2
-5 -1
-4 -2
```

**Expected Output**
```text
-5 -4 -2 -1
```

#### Test Case 10

**Input**
```text
2 2
0 10
1 11
```

**Expected Output**
```text
0 1 10 11
```


## Question 98 — Frequency of Target — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
Count occurrences of a target value.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print the number of occurrences of `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 1
1 2 1 1
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3 5
5 5 5
```

**Output**
```text
3
```

**Explanation**
For the second case, applying the same rule gives `3`.

### Test Cases

#### Test Case 1

**Input**
```text
4 1
1 2 1 1
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
3 -1
-1 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
1 7
7
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
4 2
1 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
3 9
10 9 8
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
3 0
0 1 0
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
0 0

```

**Expected Output**
```text
0
```


## Question 99 — First Maximum Index — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
Find the first zero-based index of the maximum value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the zero-based index of the first occurrence of the maximum value.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 9 3
```

**Output**
```text
1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
0
```

**Explanation**
For the second case, applying the same rule gives `0`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 9 3
```

**Expected Output**
```text
1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
2 2 1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
0 4 4
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
7 1 7
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
0 3 3
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
3 2 5 5
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3
100 -1 100
```

**Expected Output**
```text
0
```


## Question 100 — Alternating Sum — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
Compute the sum at even indices minus the sum at odd indices.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of elements at even indices minus the sum at odd indices.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 3 4
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
2 4 6
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
3
10 1 5
```

**Expected Output**
```text
14
```

#### Test Case 6

**Input**
```text
3
-1 2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
-2
```

#### Test Case 8

**Input**
```text
2
7 3
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
4
0 1 2 3
```

**Expected Output**
```text
-2
```


## Question 101 — Array Sum — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
-1 2 3 -1 2
```

**Output**
```text
5
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `5`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
-1 2 3 -1 2
```

**Expected Output**
```text
5
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
2 4 -2
```

**Expected Output**
```text
4
```


## Question 102 — Array Minimum — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
4 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
4 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
1 -1 5
```

**Expected Output**
```text
-1
```


## Question 103 — Count Above Threshold — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
1 1 9
```

**Expected Output**
```text
1
```


## Question 104 — Reverse Array — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```


## Question 105 — Rotate Left — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 1
2 2 3 4
```

**Expected Output**
```text
2 3 4 2
```


## Question 106 — Second Largest — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Find the second distinct largest value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the second distinct largest value, or `NONE` if fewer than two distinct values exist.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 5 3 5
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
2
1 2
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 3 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
2
1 2
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
5 5 5
```

**Expected Output**
```text
NONE
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-2
```

#### Test Case 5

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
9
```

#### Test Case 6

**Input**
```text
4
7 3 7 2
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3
0 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
75
```

#### Test Case 9

**Input**
```text
3
2 1 0
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3
1 3 2
```

**Expected Output**
```text
2
```


## Question 107 — Prefix Running Sum — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
For every position, report the sum from index 0 through that position.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the running sum after each element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
1 3 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 6`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 3 6
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 4

**Input**
```text
4
-1 2 -3 4
```

**Expected Output**
```text
-1 1 -2 2
```

#### Test Case 5

**Input**
```text
3
10 -5 2
```

**Expected Output**
```text
10 5 7
```

#### Test Case 6

**Input**
```text
2
7 7
```

**Expected Output**
```text
7 14
```

#### Test Case 7

**Input**
```text
3
100 -100 5
```

**Expected Output**
```text
100 0 5
```

#### Test Case 8

**Input**
```text
3
-2 -2 -2
```

**Expected Output**
```text
-2 -4 -6
```

#### Test Case 9

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 2 2
```

#### Test Case 10

**Input**
```text
3
1 1 2
```

**Expected Output**
```text
1 2 4
```


## Question 108 — Distinct Count — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Count how many distinct integer values occur.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the number of distinct values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 1 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3
-1 -2 -1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
0

```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
3
7 8 9
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
5
2 2 3 3 4
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
3
1 1 2
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
4
10 9 10 8
```

**Expected Output**
```text
3
```


## Question 109 — Longest Equal Run — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Find the longest consecutive run containing the same value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum length of a consecutive run of equal values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
6
1 1 2 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
6
1 1 2 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
5
1 1 2 1 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
4
-1 -1 -1 0
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
4
7 7 8 8
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
6
1 2 2 3 3 3
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
5
1 1 2 2 2
```

**Expected Output**
```text
3
```


## Question 110 — Pair Sum Exists — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Determine whether two distinct array positions contain values whose sum equals the target.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print `YES` if two distinct elements sum to `t`; otherwise print `NO`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 6
1 2 4
```

**Output**
```text
YES
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `YES`.

### Worked Example 2

**Input**
```text
3 10
1 2 3
```

**Output**
```text
NO
```

**Explanation**
For the second case, applying the same rule gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
3 6
1 2 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 10
1 2 3
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2 0
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
3 3
-1 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
3 4
2 2 2
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
1 1
1
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
3 14
5 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 -7
-5 -2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
2 25
10 20
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
1 1 2
```

**Expected Output**
```text
YES
```


## Question 111 — Move Zeroes — Variant 2
**Difficulty:** Hard

### Problem Statement
Move all zeroes to the end while preserving non-zero order.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the array with all zeroes moved to the end while preserving the relative order of non-zero values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
0 1 0 3 12
```

**Output**
```text
1 3 12 0 0
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 12 0 0`.

### Worked Example 2

**Input**
```text
3
0 0 1
```

**Output**
```text
1 0 0
```

**Explanation**
For the second case, applying the same rule gives `1 0 0`.

### Test Cases

#### Test Case 1

**Input**
```text
5
0 1 0 3 12
```

**Expected Output**
```text
1 3 12 0 0
```

#### Test Case 2

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
1 0 0
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
2
0 0
```

**Expected Output**
```text
0 0
```

#### Test Case 6

**Input**
```text
5
1 0 2 0 3
```

**Expected Output**
```text
1 2 3 0 0
```

#### Test Case 7

**Input**
```text
3
-1 0 -2
```

**Expected Output**
```text
-1 -2 0
```

#### Test Case 8

**Input**
```text
3
5 0 5
```

**Expected Output**
```text
5 5 0
```

#### Test Case 9

**Input**
```text
5
0 1 0 0 2
```

**Expected Output**
```text
1 2 0 0 0
```

#### Test Case 10

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 0 0
```


## Question 112 — Merge Sorted Arrays — Variant 2
**Difficulty:** Hard

### Problem Statement
Merge two sorted arrays into one sorted sequence.

### Input Format
The first line contains `n m`. The second line contains `n` sorted integers. The third line contains `m` sorted integers.

### Output Format
Print the merged sorted sequence.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Output**
```text
1 2 3 4 5 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 2 3 4 5 6`.

### Worked Example 2

**Input**
```text
1 1
1
2
```

**Output**
```text
1 2
```

**Explanation**
For the second case, applying the same rule gives `1 2`.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Expected Output**
```text
1 2 3 4 5 6
```

#### Test Case 2

**Input**
```text
1 1
1
2
```

**Expected Output**
```text
1 2
```

#### Test Case 3

**Input**
```text
0 2

1 2
```

**Expected Output**
```text
1 2
```

#### Test Case 4

**Input**
```text
2 2
-3 0
-2 4
```

**Expected Output**
```text
-3 -2 0 4
```

#### Test Case 5

**Input**
```text
2 2
1 1
1 2
```

**Expected Output**
```text
1 1 1 2
```

#### Test Case 6

**Input**
```text
2 2
5 6
1 2
```

**Expected Output**
```text
1 2 5 6
```

#### Test Case 7

**Input**
```text
1 1
0
0
```

**Expected Output**
```text
0 0
```

#### Test Case 8

**Input**
```text
3 1
2 7 9
3
```

**Expected Output**
```text
2 3 7 9
```

#### Test Case 9

**Input**
```text
2 2
-5 -1
-4 -2
```

**Expected Output**
```text
-5 -4 -2 -1
```

#### Test Case 10

**Input**
```text
2 2
1 10
1 11
```

**Expected Output**
```text
1 1 10 11
```


## Question 113 — Frequency of Target — Variant 2
**Difficulty:** Hard

### Problem Statement
Count occurrences of a target value.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print the number of occurrences of `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 1
1 2 1 1
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3 5
5 5 5
```

**Output**
```text
3
```

**Explanation**
For the second case, applying the same rule gives `3`.

### Test Cases

#### Test Case 1

**Input**
```text
4 1
1 2 1 1
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
3 -1
-1 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
1 7
7
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
4 2
1 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
3 9
10 9 8
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
3 1
1 1 1
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
0 0

```

**Expected Output**
```text
0
```


## Question 114 — First Maximum Index — Variant 2
**Difficulty:** Hard

### Problem Statement
Find the first zero-based index of the maximum value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the zero-based index of the first occurrence of the maximum value.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 9 3
```

**Output**
```text
1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
0
```

**Explanation**
For the second case, applying the same rule gives `0`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 9 3
```

**Expected Output**
```text
1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
2 2 1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
0 4 4
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
7 1 7
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
1 4 4
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
3 2 5 5
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3
100 -1 100
```

**Expected Output**
```text
0
```


## Question 115 — Alternating Sum — Variant 2
**Difficulty:** Hard

### Problem Statement
Compute the sum at even indices minus the sum at odd indices.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of elements at even indices minus the sum at odd indices.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 3 4
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
2 4 6
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
3
10 1 5
```

**Expected Output**
```text
14
```

#### Test Case 6

**Input**
```text
3
-1 2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
-2
```

#### Test Case 8

**Input**
```text
2
7 3
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
4
1 1 2 3
```

**Expected Output**
```text
-1
```


## Question 116 — Array Sum — Variant 3
**Difficulty:** Hard

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
0 3 3 -1 2
```

**Output**
```text
7
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `7`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
0 3 3 -1 2
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
3 4 -2
```

**Expected Output**
```text
5
```


## Question 117 — Array Minimum — Variant 3
**Difficulty:** Hard

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
5 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
5 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
2 -2 5
```

**Expected Output**
```text
-2
```


## Question 118 — Count Above Threshold — Variant 3
**Difficulty:** Hard

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
2 1 9
```

**Expected Output**
```text
1
```


## Question 119 — Reverse Array — Variant 3
**Difficulty:** Hard

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
2 3 4
```

**Expected Output**
```text
4 3 2
```


## Question 120 — Rotate Left — Variant 3
**Difficulty:** Hard

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 2
3 2 3 4
```

**Expected Output**
```text
3 4 3 2
```


## Question 121 — Second Largest — Variant 3
**Difficulty:** Hard

### Problem Statement
Find the second distinct largest value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the second distinct largest value, or `NONE` if fewer than two distinct values exist.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 5 3 5
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
2
1 2
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 3 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
2
1 2
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
5 5 5
```

**Expected Output**
```text
NONE
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-2
```

#### Test Case 5

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
9
```

#### Test Case 6

**Input**
```text
4
7 3 7 2
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3
0 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
75
```

#### Test Case 9

**Input**
```text
3
2 1 0
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3
2 4 3
```

**Expected Output**
```text
3
```


## Question 122 — Prefix Running Sum — Variant 3
**Difficulty:** Hard

### Problem Statement
For every position, report the sum from index 0 through that position.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the running sum after each element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
1 3 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 6`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 3 6
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 4

**Input**
```text
4
-1 2 -3 4
```

**Expected Output**
```text
-1 1 -2 2
```

#### Test Case 5

**Input**
```text
3
10 -5 2
```

**Expected Output**
```text
10 5 7
```

#### Test Case 6

**Input**
```text
2
7 7
```

**Expected Output**
```text
7 14
```

#### Test Case 7

**Input**
```text
3
100 -100 5
```

**Expected Output**
```text
100 0 5
```

#### Test Case 8

**Input**
```text
3
-2 -2 -2
```

**Expected Output**
```text
-2 -4 -6
```

#### Test Case 9

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 2 2
```

#### Test Case 10

**Input**
```text
3
2 1 2
```

**Expected Output**
```text
2 3 5
```


## Question 123 — Distinct Count — Variant 3
**Difficulty:** Hard

### Problem Statement
Count how many distinct integer values occur.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the number of distinct values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 1 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3
-1 -2 -1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
0

```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
3
7 8 9
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
5
2 2 3 3 4
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
3
2 2 3
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
4
10 9 10 8
```

**Expected Output**
```text
3
```


## Question 124 — Longest Equal Run — Variant 3
**Difficulty:** Hard

### Problem Statement
Find the longest consecutive run containing the same value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum length of a consecutive run of equal values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
6
1 1 2 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
6
1 1 2 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
5
1 1 2 1 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
4
-1 -1 -1 0
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
4
7 7 8 8
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
6
1 2 2 3 3 3
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
5
2 2 3 3 3
```

**Expected Output**
```text
3
```


## Question 125 — Pair Sum Exists — Variant 3
**Difficulty:** Hard

### Problem Statement
Determine whether two distinct array positions contain values whose sum equals the target.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print `YES` if two distinct elements sum to `t`; otherwise print `NO`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 6
1 2 4
```

**Output**
```text
YES
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `YES`.

### Worked Example 2

**Input**
```text
3 10
1 2 3
```

**Output**
```text
NO
```

**Explanation**
For the second case, applying the same rule gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
3 6
1 2 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 10
1 2 3
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2 0
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
3 3
-1 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
3 4
2 2 2
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
1 1
1
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
3 14
5 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 -7
-5 -2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
2 25
10 20
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 3
2 1 2
```

**Expected Output**
```text
YES
```



# Belt 5 — Blue Belt
**Difficulty:** Hard



## Subdivision — Structured Problem Solving

## Question 126 — Array Sum — Variant 1
**Difficulty:** Medium

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
-2 1 3 -1 2
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
-2 1 3 -1 2
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
1 4 -2
```

**Expected Output**
```text
3
```


## Question 127 — Array Minimum — Variant 1
**Difficulty:** Medium

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
3 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
3 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
0 0 5
```

**Expected Output**
```text
0
```


## Question 128 — Count Above Threshold — Variant 1
**Difficulty:** Medium

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
0 1 9
```

**Expected Output**
```text
1
```


## Question 129 — Reverse Array — Variant 1
**Difficulty:** Medium

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
0 1 2
```

**Expected Output**
```text
2 1 0
```


## Question 130 — Rotate Left — Variant 1
**Difficulty:** Medium

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 0
1 2 3 4
```

**Expected Output**
```text
1 2 3 4
```


## Question 131 — Second Largest — Variant 1
**Difficulty:** Medium

### Problem Statement
Find the second distinct largest value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the second distinct largest value, or `NONE` if fewer than two distinct values exist.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 5 3 5
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
2
1 2
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 3 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
2
1 2
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
5 5 5
```

**Expected Output**
```text
NONE
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-2
```

#### Test Case 5

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
9
```

#### Test Case 6

**Input**
```text
4
7 3 7 2
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3
0 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
75
```

#### Test Case 9

**Input**
```text
3
2 1 0
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3
0 2 1
```

**Expected Output**
```text
1
```


## Question 132 — Prefix Running Sum — Variant 1
**Difficulty:** Medium

### Problem Statement
For every position, report the sum from index 0 through that position.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the running sum after each element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
1 3 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 6`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 3 6
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 4

**Input**
```text
4
-1 2 -3 4
```

**Expected Output**
```text
-1 1 -2 2
```

#### Test Case 5

**Input**
```text
3
10 -5 2
```

**Expected Output**
```text
10 5 7
```

#### Test Case 6

**Input**
```text
2
7 7
```

**Expected Output**
```text
7 14
```

#### Test Case 7

**Input**
```text
3
100 -100 5
```

**Expected Output**
```text
100 0 5
```

#### Test Case 8

**Input**
```text
3
-2 -2 -2
```

**Expected Output**
```text
-2 -4 -6
```

#### Test Case 9

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 2 2
```

#### Test Case 10

**Input**
```text
3
0 1 2
```

**Expected Output**
```text
0 1 3
```


## Question 133 — Distinct Count — Variant 1
**Difficulty:** Medium

### Problem Statement
Count how many distinct integer values occur.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the number of distinct values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 1 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3
-1 -2 -1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
0

```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
3
7 8 9
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
5
2 2 3 3 4
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
4
10 9 10 8
```

**Expected Output**
```text
3
```


## Question 134 — Longest Equal Run — Variant 1
**Difficulty:** Medium

### Problem Statement
Find the longest consecutive run containing the same value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum length of a consecutive run of equal values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
6
1 1 2 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
6
1 1 2 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
5
1 1 2 1 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
4
-1 -1 -1 0
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
4
7 7 8 8
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
6
1 2 2 3 3 3
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
5
0 0 1 1 1
```

**Expected Output**
```text
3
```


## Question 135 — Pair Sum Exists — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
Determine whether two distinct array positions contain values whose sum equals the target.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print `YES` if two distinct elements sum to `t`; otherwise print `NO`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 6
1 2 4
```

**Output**
```text
YES
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `YES`.

### Worked Example 2

**Input**
```text
3 10
1 2 3
```

**Output**
```text
NO
```

**Explanation**
For the second case, applying the same rule gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
3 6
1 2 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 10
1 2 3
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2 0
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
3 3
-1 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
3 4
2 2 2
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
1 1
1
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
3 14
5 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 -7
-5 -2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
2 25
10 20
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 1
0 1 2
```

**Expected Output**
```text
YES
```


## Question 136 — Move Zeroes — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
Move all zeroes to the end while preserving non-zero order.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the array with all zeroes moved to the end while preserving the relative order of non-zero values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
0 1 0 3 12
```

**Output**
```text
1 3 12 0 0
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 12 0 0`.

### Worked Example 2

**Input**
```text
3
0 0 1
```

**Output**
```text
1 0 0
```

**Explanation**
For the second case, applying the same rule gives `1 0 0`.

### Test Cases

#### Test Case 1

**Input**
```text
5
0 1 0 3 12
```

**Expected Output**
```text
1 3 12 0 0
```

#### Test Case 2

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
1 0 0
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
2
0 0
```

**Expected Output**
```text
0 0
```

#### Test Case 6

**Input**
```text
5
1 0 2 0 3
```

**Expected Output**
```text
1 2 3 0 0
```

#### Test Case 7

**Input**
```text
3
-1 0 -2
```

**Expected Output**
```text
-1 -2 0
```

#### Test Case 8

**Input**
```text
3
5 0 5
```

**Expected Output**
```text
5 5 0
```

#### Test Case 9

**Input**
```text
5
0 1 0 0 2
```

**Expected Output**
```text
1 2 0 0 0
```

#### Test Case 10

**Input**
```text
4
0 0 1 0
```

**Expected Output**
```text
1 0 0 0
```


## Question 137 — Merge Sorted Arrays — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
Merge two sorted arrays into one sorted sequence.

### Input Format
The first line contains `n m`. The second line contains `n` sorted integers. The third line contains `m` sorted integers.

### Output Format
Print the merged sorted sequence.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Output**
```text
1 2 3 4 5 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 2 3 4 5 6`.

### Worked Example 2

**Input**
```text
1 1
1
2
```

**Output**
```text
1 2
```

**Explanation**
For the second case, applying the same rule gives `1 2`.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Expected Output**
```text
1 2 3 4 5 6
```

#### Test Case 2

**Input**
```text
1 1
1
2
```

**Expected Output**
```text
1 2
```

#### Test Case 3

**Input**
```text
0 2

1 2
```

**Expected Output**
```text
1 2
```

#### Test Case 4

**Input**
```text
2 2
-3 0
-2 4
```

**Expected Output**
```text
-3 -2 0 4
```

#### Test Case 5

**Input**
```text
2 2
1 1
1 2
```

**Expected Output**
```text
1 1 1 2
```

#### Test Case 6

**Input**
```text
2 2
5 6
1 2
```

**Expected Output**
```text
1 2 5 6
```

#### Test Case 7

**Input**
```text
1 1
0
0
```

**Expected Output**
```text
0 0
```

#### Test Case 8

**Input**
```text
3 1
2 7 9
3
```

**Expected Output**
```text
2 3 7 9
```

#### Test Case 9

**Input**
```text
2 2
-5 -1
-4 -2
```

**Expected Output**
```text
-5 -4 -2 -1
```

#### Test Case 10

**Input**
```text
2 2
0 10
1 11
```

**Expected Output**
```text
0 1 10 11
```


## Question 138 — Frequency of Target — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
Count occurrences of a target value.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print the number of occurrences of `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 1
1 2 1 1
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3 5
5 5 5
```

**Output**
```text
3
```

**Explanation**
For the second case, applying the same rule gives `3`.

### Test Cases

#### Test Case 1

**Input**
```text
4 1
1 2 1 1
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
3 -1
-1 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
1 7
7
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
4 2
1 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
3 9
10 9 8
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
3 0
0 1 0
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
0 0

```

**Expected Output**
```text
0
```


## Question 139 — First Maximum Index — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
Find the first zero-based index of the maximum value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the zero-based index of the first occurrence of the maximum value.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 9 3
```

**Output**
```text
1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
0
```

**Explanation**
For the second case, applying the same rule gives `0`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 9 3
```

**Expected Output**
```text
1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
2 2 1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
0 4 4
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
7 1 7
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
0 3 3
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
3 2 5 5
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3
100 -1 100
```

**Expected Output**
```text
0
```


## Question 140 — Alternating Sum — Variant 1
**Difficulty:** Medium–Hard

### Problem Statement
Compute the sum at even indices minus the sum at odd indices.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of elements at even indices minus the sum at odd indices.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 3 4
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
2 4 6
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
3
10 1 5
```

**Expected Output**
```text
14
```

#### Test Case 6

**Input**
```text
3
-1 2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
-2
```

#### Test Case 8

**Input**
```text
2
7 3
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
4
0 1 2 3
```

**Expected Output**
```text
-2
```


## Question 141 — Array Sum — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
-1 2 3 -1 2
```

**Output**
```text
5
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `5`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
-1 2 3 -1 2
```

**Expected Output**
```text
5
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
2 4 -2
```

**Expected Output**
```text
4
```


## Question 142 — Array Minimum — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
4 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
4 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
1 -1 5
```

**Expected Output**
```text
-1
```


## Question 143 — Count Above Threshold — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
1 1 9
```

**Expected Output**
```text
1
```


## Question 144 — Reverse Array — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```


## Question 145 — Rotate Left — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 1
2 2 3 4
```

**Expected Output**
```text
2 3 4 2
```


## Question 146 — Second Largest — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Find the second distinct largest value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the second distinct largest value, or `NONE` if fewer than two distinct values exist.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 5 3 5
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
2
1 2
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 3 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
2
1 2
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
5 5 5
```

**Expected Output**
```text
NONE
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-2
```

#### Test Case 5

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
9
```

#### Test Case 6

**Input**
```text
4
7 3 7 2
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3
0 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
75
```

#### Test Case 9

**Input**
```text
3
2 1 0
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3
1 3 2
```

**Expected Output**
```text
2
```


## Question 147 — Prefix Running Sum — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
For every position, report the sum from index 0 through that position.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the running sum after each element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
1 3 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 6`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 3 6
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 4

**Input**
```text
4
-1 2 -3 4
```

**Expected Output**
```text
-1 1 -2 2
```

#### Test Case 5

**Input**
```text
3
10 -5 2
```

**Expected Output**
```text
10 5 7
```

#### Test Case 6

**Input**
```text
2
7 7
```

**Expected Output**
```text
7 14
```

#### Test Case 7

**Input**
```text
3
100 -100 5
```

**Expected Output**
```text
100 0 5
```

#### Test Case 8

**Input**
```text
3
-2 -2 -2
```

**Expected Output**
```text
-2 -4 -6
```

#### Test Case 9

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 2 2
```

#### Test Case 10

**Input**
```text
3
1 1 2
```

**Expected Output**
```text
1 2 4
```


## Question 148 — Distinct Count — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Count how many distinct integer values occur.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the number of distinct values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 1 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3
-1 -2 -1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
0

```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
3
7 8 9
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
5
2 2 3 3 4
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
3
1 1 2
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
4
10 9 10 8
```

**Expected Output**
```text
3
```


## Question 149 — Longest Equal Run — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Find the longest consecutive run containing the same value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum length of a consecutive run of equal values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
6
1 1 2 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
6
1 1 2 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
5
1 1 2 1 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
4
-1 -1 -1 0
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
4
7 7 8 8
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
6
1 2 2 3 3 3
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
5
1 1 2 2 2
```

**Expected Output**
```text
3
```


## Question 150 — Pair Sum Exists — Variant 2
**Difficulty:** Medium–Hard

### Problem Statement
Determine whether two distinct array positions contain values whose sum equals the target.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print `YES` if two distinct elements sum to `t`; otherwise print `NO`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 6
1 2 4
```

**Output**
```text
YES
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `YES`.

### Worked Example 2

**Input**
```text
3 10
1 2 3
```

**Output**
```text
NO
```

**Explanation**
For the second case, applying the same rule gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
3 6
1 2 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 10
1 2 3
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2 0
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
3 3
-1 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
3 4
2 2 2
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
1 1
1
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
3 14
5 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 -7
-5 -2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
2 25
10 20
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
1 1 2
```

**Expected Output**
```text
YES
```


## Question 151 — Move Zeroes — Variant 2
**Difficulty:** Hard

### Problem Statement
Move all zeroes to the end while preserving non-zero order.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the array with all zeroes moved to the end while preserving the relative order of non-zero values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
0 1 0 3 12
```

**Output**
```text
1 3 12 0 0
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 12 0 0`.

### Worked Example 2

**Input**
```text
3
0 0 1
```

**Output**
```text
1 0 0
```

**Explanation**
For the second case, applying the same rule gives `1 0 0`.

### Test Cases

#### Test Case 1

**Input**
```text
5
0 1 0 3 12
```

**Expected Output**
```text
1 3 12 0 0
```

#### Test Case 2

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
1 0 0
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
2
0 0
```

**Expected Output**
```text
0 0
```

#### Test Case 6

**Input**
```text
5
1 0 2 0 3
```

**Expected Output**
```text
1 2 3 0 0
```

#### Test Case 7

**Input**
```text
3
-1 0 -2
```

**Expected Output**
```text
-1 -2 0
```

#### Test Case 8

**Input**
```text
3
5 0 5
```

**Expected Output**
```text
5 5 0
```

#### Test Case 9

**Input**
```text
5
0 1 0 0 2
```

**Expected Output**
```text
1 2 0 0 0
```

#### Test Case 10

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 0 0
```


## Question 152 — Merge Sorted Arrays — Variant 2
**Difficulty:** Hard

### Problem Statement
Merge two sorted arrays into one sorted sequence.

### Input Format
The first line contains `n m`. The second line contains `n` sorted integers. The third line contains `m` sorted integers.

### Output Format
Print the merged sorted sequence.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Output**
```text
1 2 3 4 5 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 2 3 4 5 6`.

### Worked Example 2

**Input**
```text
1 1
1
2
```

**Output**
```text
1 2
```

**Explanation**
For the second case, applying the same rule gives `1 2`.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Expected Output**
```text
1 2 3 4 5 6
```

#### Test Case 2

**Input**
```text
1 1
1
2
```

**Expected Output**
```text
1 2
```

#### Test Case 3

**Input**
```text
0 2

1 2
```

**Expected Output**
```text
1 2
```

#### Test Case 4

**Input**
```text
2 2
-3 0
-2 4
```

**Expected Output**
```text
-3 -2 0 4
```

#### Test Case 5

**Input**
```text
2 2
1 1
1 2
```

**Expected Output**
```text
1 1 1 2
```

#### Test Case 6

**Input**
```text
2 2
5 6
1 2
```

**Expected Output**
```text
1 2 5 6
```

#### Test Case 7

**Input**
```text
1 1
0
0
```

**Expected Output**
```text
0 0
```

#### Test Case 8

**Input**
```text
3 1
2 7 9
3
```

**Expected Output**
```text
2 3 7 9
```

#### Test Case 9

**Input**
```text
2 2
-5 -1
-4 -2
```

**Expected Output**
```text
-5 -4 -2 -1
```

#### Test Case 10

**Input**
```text
2 2
1 10
1 11
```

**Expected Output**
```text
1 1 10 11
```


## Question 153 — Frequency of Target — Variant 2
**Difficulty:** Hard

### Problem Statement
Count occurrences of a target value.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print the number of occurrences of `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 1
1 2 1 1
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3 5
5 5 5
```

**Output**
```text
3
```

**Explanation**
For the second case, applying the same rule gives `3`.

### Test Cases

#### Test Case 1

**Input**
```text
4 1
1 2 1 1
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
3 -1
-1 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
1 7
7
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
4 2
1 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
3 9
10 9 8
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
3 1
1 1 1
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
0 0

```

**Expected Output**
```text
0
```


## Question 154 — First Maximum Index — Variant 2
**Difficulty:** Hard

### Problem Statement
Find the first zero-based index of the maximum value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the zero-based index of the first occurrence of the maximum value.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 9 3
```

**Output**
```text
1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
0
```

**Explanation**
For the second case, applying the same rule gives `0`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 9 3
```

**Expected Output**
```text
1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
2 2 1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
0 4 4
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
7 1 7
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
1 4 4
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
3 2 5 5
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3
100 -1 100
```

**Expected Output**
```text
0
```


## Question 155 — Alternating Sum — Variant 2
**Difficulty:** Hard

### Problem Statement
Compute the sum at even indices minus the sum at odd indices.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of elements at even indices minus the sum at odd indices.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 3 4
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
2 4 6
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
3
10 1 5
```

**Expected Output**
```text
14
```

#### Test Case 6

**Input**
```text
3
-1 2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
-2
```

#### Test Case 8

**Input**
```text
2
7 3
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
4
1 1 2 3
```

**Expected Output**
```text
-1
```


## Question 156 — Array Sum — Variant 3
**Difficulty:** Hard

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
0 3 3 -1 2
```

**Output**
```text
7
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `7`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
0 3 3 -1 2
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
3 4 -2
```

**Expected Output**
```text
5
```


## Question 157 — Array Minimum — Variant 3
**Difficulty:** Hard

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
5 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
5 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
2 -2 5
```

**Expected Output**
```text
-2
```


## Question 158 — Count Above Threshold — Variant 3
**Difficulty:** Hard

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
2 1 9
```

**Expected Output**
```text
1
```


## Question 159 — Reverse Array — Variant 3
**Difficulty:** Hard

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
2 3 4
```

**Expected Output**
```text
4 3 2
```


## Question 160 — Rotate Left — Variant 3
**Difficulty:** Hard

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 2
3 2 3 4
```

**Expected Output**
```text
3 4 3 2
```


## Question 161 — Second Largest — Variant 3
**Difficulty:** Hard

### Problem Statement
Find the second distinct largest value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the second distinct largest value, or `NONE` if fewer than two distinct values exist.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 5 3 5
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
2
1 2
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 3 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
2
1 2
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
5 5 5
```

**Expected Output**
```text
NONE
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-2
```

#### Test Case 5

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
9
```

#### Test Case 6

**Input**
```text
4
7 3 7 2
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3
0 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
75
```

#### Test Case 9

**Input**
```text
3
2 1 0
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3
2 4 3
```

**Expected Output**
```text
3
```


## Question 162 — Prefix Running Sum — Variant 3
**Difficulty:** Hard

### Problem Statement
For every position, report the sum from index 0 through that position.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the running sum after each element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
1 3 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 6`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 3 6
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 4

**Input**
```text
4
-1 2 -3 4
```

**Expected Output**
```text
-1 1 -2 2
```

#### Test Case 5

**Input**
```text
3
10 -5 2
```

**Expected Output**
```text
10 5 7
```

#### Test Case 6

**Input**
```text
2
7 7
```

**Expected Output**
```text
7 14
```

#### Test Case 7

**Input**
```text
3
100 -100 5
```

**Expected Output**
```text
100 0 5
```

#### Test Case 8

**Input**
```text
3
-2 -2 -2
```

**Expected Output**
```text
-2 -4 -6
```

#### Test Case 9

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 2 2
```

#### Test Case 10

**Input**
```text
3
2 1 2
```

**Expected Output**
```text
2 3 5
```


## Question 163 — Distinct Count — Variant 3
**Difficulty:** Hard

### Problem Statement
Count how many distinct integer values occur.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the number of distinct values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 1 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3
-1 -2 -1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
0

```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
3
7 8 9
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
5
2 2 3 3 4
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
3
2 2 3
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
4
10 9 10 8
```

**Expected Output**
```text
3
```


## Question 164 — Longest Equal Run — Variant 3
**Difficulty:** Hard

### Problem Statement
Find the longest consecutive run containing the same value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum length of a consecutive run of equal values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
6
1 1 2 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
6
1 1 2 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
5
1 1 2 1 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
4
-1 -1 -1 0
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
4
7 7 8 8
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
6
1 2 2 3 3 3
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
5
2 2 3 3 3
```

**Expected Output**
```text
3
```


## Question 165 — Pair Sum Exists — Variant 3
**Difficulty:** Hard

### Problem Statement
Determine whether two distinct array positions contain values whose sum equals the target.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print `YES` if two distinct elements sum to `t`; otherwise print `NO`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 6
1 2 4
```

**Output**
```text
YES
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `YES`.

### Worked Example 2

**Input**
```text
3 10
1 2 3
```

**Output**
```text
NO
```

**Explanation**
For the second case, applying the same rule gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
3 6
1 2 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 10
1 2 3
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2 0
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
3 3
-1 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
3 4
2 2 2
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
1 1
1
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
3 14
5 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 -7
-5 -2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
2 25
10 20
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 3
2 1 2
```

**Expected Output**
```text
YES
```



# Belt 6 — Brown Belt
**Difficulty:** Hard

## Subdivision — Recursion and State

## Question 166 — Climbing Cost — Variant 1
**Difficulty:** Hard

### Problem Statement
Starting before platform 0, move forward by one or two positions. Landing on a platform incurs its cost; reaching position `n` costs nothing. Find the minimum total cost.

### Input Format
The first line contains `n`. The second line contains `n` non-negative landing costs.

### Output Format
Print the minimum cost to reach position `n`, where each move advances 1 or 2 positions and landing on platform `i` costs `cost[i]`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
10 15 20 5 8
```

**Output**
```text
20
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `20`.

### Worked Example 2

**Input**
```text
4
1 100 1 1
```

**Output**
```text
2
```

**Explanation**
The second input produces `2` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
10 15 20 5 8
```

**Expected Output**
```text
20
```

#### Test Case 2

**Input**
```text
4
1 100 1 1
```

**Expected Output**
```text
2
```

#### Test Case 3

**Input**
```text
5
0 5 0 5 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
2
5 5
```

**Expected Output**
```text
5
```

#### Test Case 5

**Input**
```text
4
3 2 1 10
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
5
7 1 7 1 7
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
4
9 8 1 8
```

**Expected Output**
```text
9
```

#### Test Case 8

**Input**
```text
5
2 9 2 9 2
```

**Expected Output**
```text
6
```

#### Test Case 9

**Input**
```text
5
1 2 3 4 5
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
4
1 3 1 4
```

**Expected Output**
```text
2
```


## Question 167 — House Robber — Variant 1
**Difficulty:** Hard

### Problem Statement
Choose a set of non-adjacent houses to maximize collected value. Print the maximum possible total.

### Input Format
The first line contains `n`. The second line contains `n` non-negative house values.

### Output Format
Print the maximum sum obtained by choosing values with no two chosen positions adjacent.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
4
2 1 1 2
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
4
2 1 1 2
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
4
1 2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 6

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
5
4 10 3 1 5
```

**Expected Output**
```text
15
```

#### Test Case 8

**Input**
```text
4
6 6 6 6
```

**Expected Output**
```text
12
```

#### Test Case 9

**Input**
```text
3
9 1 9
```

**Expected Output**
```text
18
```

#### Test Case 10

**Input**
```text
4
0 2 7 3
```

**Expected Output**
```text
7
```


## Question 168 — Coin Change Minimum — Variant 1
**Difficulty:** Hard

### Problem Statement
Unlimited copies of each denomination are available. Find the minimum number of coins required to make the exact target.

### Input Format
The first line contains `n` and target `T`. The second line contains `n` distinct positive coin denominations.

### Output Format
Print the minimum number of coins needed to form exactly `T`, or `-1` if impossible.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 11
1 2 5
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
1 3
2
```

**Output**
```text
-1
```

**Explanation**
The second input produces `-1` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 11
1 2 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1 3
2
```

**Expected Output**
```text
-1
```

#### Test Case 3

**Input**
```text
1 0
1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 27
2 5 10
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
2 14
3 7
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 6
1 3 4
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
2 1
5 7
```

**Expected Output**
```text
-1
```

#### Test Case 8

**Input**
```text
2 8
2 4
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
4 11
1 5 6 8
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3 13
2 3 7
```

**Expected Output**
```text
3
```


## Question 169 — Longest Increasing Subsequence — Variant 1
**Difficulty:** Hard

### Problem Statement
A subsequence keeps original order but may skip elements. Find the maximum possible length of a strictly increasing subsequence.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the length of the longest strictly increasing subsequence.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Output**
```text
4
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `4`.

### Worked Example 2

**Input**
```text
6
0 1 0 3 2 3
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
6
0 1 0 3 2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
4 3 2 1
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
-1 0 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
5
3 10 2 1 20
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
6
5 4 11 1 16 8
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
4
2 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
6
0 3 1 5 2 6
```

**Expected Output**
```text
4
```


## Question 170 — Partition Equal Sum — Variant 1
**Difficulty:** Hard

### Problem Statement
Each array element must belong to exactly one of two groups. Determine whether the two group sums can be equal.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print `YES` if the array can be split into two groups with equal sums, otherwise `NO`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
1 5 11 5
```

**Output**
```text
YES
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `YES`.

### Worked Example 2

**Input**
```text
4
1 2 3 5
```

**Output**
```text
NO
```

**Explanation**
The second input produces `NO` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 11 5
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
4
1 2 3 5
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2
2 2
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1
1
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
5
3 3 3 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
2
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5
7 3 2 5 1
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4
10 10 1 1
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4
0 1 2 3
```

**Expected Output**
```text
YES
```


## Question 171 — Grid Minimum Path — Variant 1
**Difficulty:** Hard

### Problem Statement
Find the least-cost path through a non-negative grid when movement is restricted to right and down.

### Input Format
The first line contains `r c`. The next `r` lines contain `c` non-negative integers.

### Output Format
Print the minimum sum of a path from the top-left cell to the bottom-right cell, moving only right or down.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Output**
```text
7
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `7`.

### Worked Example 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Output**
```text
12
```

**Explanation**
The second input produces `12` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 3

**Input**
```text
1 1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
2 2
1 2
1 1
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
2 3
0 1 0
1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 3
2 8 1
1 3 2
4 2 1
```

**Expected Output**
```text
9
```

#### Test Case 7

**Input**
```text
3 2
9 1
1 9
1 1
```

**Expected Output**
```text
12
```

#### Test Case 8

**Input**
```text
1 4
3 1 7 2
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
3 1
1
2
3
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
2 2
1 2
3 1
```

**Expected Output**
```text
4
```


## Question 172 — String Edit Distance — Variant 1
**Difficulty:** Hard

### Problem Statement
Compute the Levenshtein edit distance between two strings.

### Input Format
The first line contains string `a`. The second line contains string `b`. Either string may be empty.

### Output Format
Print the minimum number of single-character insertions, deletions, or substitutions needed to transform `a` into `b`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
horse
ros
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
intention
execution
```

**Output**
```text
5
```

**Explanation**
The second input produces `5` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
horse
ros
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
intention
execution
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
a
a
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
a
b
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text

abc
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
abc

```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
kitten
sitting
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
flaw
lawn
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
abc
abc
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
book
back
```

**Expected Output**
```text
2
```


## Question 173 — Maximum Product Subarray — Variant 1
**Difficulty:** Hard

### Problem Statement
Find the contiguous subarray with the largest product; the subarray must contain at least one element.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum product of any non-empty contiguous subarray.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
2 3 -2 4
```

**Output**
```text
6
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `6`.

### Worked Example 2

**Input**
```text
3
-2 0 -1
```

**Output**
```text
0
```

**Explanation**
The second input produces `0` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
2 3 -2 4
```

**Expected Output**
```text
6
```

#### Test Case 2

**Input**
```text
3
-2 0 -1
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
-2 3 -4
```

**Expected Output**
```text
24
```

#### Test Case 4

**Input**
```text
2
0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
-2 -3 -4
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 7

**Input**
```text
4
-1 -2 -3 0
```

**Expected Output**
```text
6
```

#### Test Case 8

**Input**
```text
5
2 -5 -2 -4 3
```

**Expected Output**
```text
24
```

#### Test Case 9

**Input**
```text
1
-1
```

**Expected Output**
```text
-1
```

#### Test Case 10

**Input**
```text
3
1 -2 3
```

**Expected Output**
```text
3
```


## Question 174 — Decode Digit String — Variant 1
**Difficulty:** Hard

### Problem Statement
Count how many different letter decodings can be formed from the digit string.

### Input Format
One line contains a string of decimal digits. A code maps `1→A` through `26→Z`; a zero can only be part of a valid two-digit code.

### Output Format
Print the number of valid decodings. Print `0` when the string cannot be decoded.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
12
```

**Output**
```text
2
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `2`.

### Worked Example 2

**Input**
```text
226
```

**Output**
```text
3
```

**Explanation**
The second input produces `3` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
12
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
226
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
06
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
11106
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
10
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
27
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
101
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
2611055971756562
```

**Expected Output**
```text
4
```

#### Test Case 10

**Input**
```text
123456
```

**Expected Output**
```text
3
```


## Question 175 — Maximum Sum Non-Adjacent — Variant 1
**Difficulty:** Hard

### Problem Statement
Select non-adjacent values to maximize their sum. Adjacent positions cannot both be selected.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print the maximum sum obtainable without choosing adjacent positions.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
6
2 7 9 3 1 4
```

**Output**
```text
15
```

**Explanation**
The second input produces `15` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
6
2 7 9 3 1 4
```

**Expected Output**
```text
15
```

#### Test Case 3

**Input**
```text
6
5 5 10 100 10 5
```

**Expected Output**
```text
110
```

#### Test Case 4

**Input**
```text
5
3 2 5 10 7
```

**Expected Output**
```text
15
```

#### Test Case 5

**Input**
```text
6
1 2 3 4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 7

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4
8 1 8 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
3
9 9 1
```

**Expected Output**
```text
10
```

#### Test Case 10

**Input**
```text
4
1 4 7 2
```

**Expected Output**
```text
8
```


## Question 176 — Climbing Cost — Variant 2
**Difficulty:** Hard

### Problem Statement
Starting before platform 0, move forward by one or two positions. Landing on a platform incurs its cost; reaching position `n` costs nothing. Find the minimum total cost.

### Input Format
The first line contains `n`. The second line contains `n` non-negative landing costs.

### Output Format
Print the minimum cost to reach position `n`, where each move advances 1 or 2 positions and landing on platform `i` costs `cost[i]`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
10 15 20 5 8
```

**Output**
```text
20
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `20`.

### Worked Example 2

**Input**
```text
4
1 100 1 1
```

**Output**
```text
2
```

**Explanation**
The second input produces `2` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
10 15 20 5 8
```

**Expected Output**
```text
20
```

#### Test Case 2

**Input**
```text
4
1 100 1 1
```

**Expected Output**
```text
2
```

#### Test Case 3

**Input**
```text
5
0 5 0 5 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
2
5 5
```

**Expected Output**
```text
5
```

#### Test Case 5

**Input**
```text
4
3 2 1 10
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
5
7 1 7 1 7
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
4
9 8 1 8
```

**Expected Output**
```text
9
```

#### Test Case 8

**Input**
```text
5
2 9 2 9 2
```

**Expected Output**
```text
6
```

#### Test Case 9

**Input**
```text
5
1 2 3 4 5
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
4
2 3 1 4
```

**Expected Output**
```text
3
```


## Question 177 — House Robber — Variant 2
**Difficulty:** Hard

### Problem Statement
Choose a set of non-adjacent houses to maximize collected value. Print the maximum possible total.

### Input Format
The first line contains `n`. The second line contains `n` non-negative house values.

### Output Format
Print the maximum sum obtained by choosing values with no two chosen positions adjacent.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
4
2 1 1 2
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
4
2 1 1 2
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
4
1 2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 6

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
5
4 10 3 1 5
```

**Expected Output**
```text
15
```

#### Test Case 8

**Input**
```text
4
6 6 6 6
```

**Expected Output**
```text
12
```

#### Test Case 9

**Input**
```text
3
9 1 9
```

**Expected Output**
```text
18
```

#### Test Case 10

**Input**
```text
4
1 2 7 3
```

**Expected Output**
```text
8
```


## Question 178 — Coin Change Minimum — Variant 2
**Difficulty:** Hard

### Problem Statement
Unlimited copies of each denomination are available. Find the minimum number of coins required to make the exact target.

### Input Format
The first line contains `n` and target `T`. The second line contains `n` distinct positive coin denominations.

### Output Format
Print the minimum number of coins needed to form exactly `T`, or `-1` if impossible.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 11
1 2 5
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
1 3
2
```

**Output**
```text
-1
```

**Explanation**
The second input produces `-1` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 11
1 2 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1 3
2
```

**Expected Output**
```text
-1
```

#### Test Case 3

**Input**
```text
1 0
1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 27
2 5 10
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
2 14
3 7
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 6
1 3 4
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
2 1
5 7
```

**Expected Output**
```text
-1
```

#### Test Case 8

**Input**
```text
2 8
2 4
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
4 11
1 5 6 8
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3 13
2 3 7
```

**Expected Output**
```text
3
```


## Question 179 — Longest Increasing Subsequence — Variant 2
**Difficulty:** Hard

### Problem Statement
A subsequence keeps original order but may skip elements. Find the maximum possible length of a strictly increasing subsequence.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the length of the longest strictly increasing subsequence.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Output**
```text
4
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `4`.

### Worked Example 2

**Input**
```text
6
0 1 0 3 2 3
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
6
0 1 0 3 2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
4 3 2 1
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
-1 0 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
5
3 10 2 1 20
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
6
5 4 11 1 16 8
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
4
2 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
6
1 3 1 5 2 6
```

**Expected Output**
```text
4
```


## Question 180 — Partition Equal Sum — Variant 2
**Difficulty:** Hard

### Problem Statement
Each array element must belong to exactly one of two groups. Determine whether the two group sums can be equal.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print `YES` if the array can be split into two groups with equal sums, otherwise `NO`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
1 5 11 5
```

**Output**
```text
YES
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `YES`.

### Worked Example 2

**Input**
```text
4
1 2 3 5
```

**Output**
```text
NO
```

**Explanation**
The second input produces `NO` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 11 5
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
4
1 2 3 5
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2
2 2
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1
1
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
5
3 3 3 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
2
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5
7 3 2 5 1
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4
10 10 1 1
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4
1 1 2 3
```

**Expected Output**
```text
NO
```


## Question 181 — Grid Minimum Path — Variant 2
**Difficulty:** Hard

### Problem Statement
Find the least-cost path through a non-negative grid when movement is restricted to right and down.

### Input Format
The first line contains `r c`. The next `r` lines contain `c` non-negative integers.

### Output Format
Print the minimum sum of a path from the top-left cell to the bottom-right cell, moving only right or down.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Output**
```text
7
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `7`.

### Worked Example 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Output**
```text
12
```

**Explanation**
The second input produces `12` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 3

**Input**
```text
1 1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
2 2
1 2
1 1
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
2 3
0 1 0
1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 3
2 8 1
1 3 2
4 2 1
```

**Expected Output**
```text
9
```

#### Test Case 7

**Input**
```text
3 2
9 1
1 9
1 1
```

**Expected Output**
```text
12
```

#### Test Case 8

**Input**
```text
1 4
3 1 7 2
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
3 1
1
2
3
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
2 2
2 2
3 1
```

**Expected Output**
```text
5
```


## Question 182 — String Edit Distance — Variant 2
**Difficulty:** Hard

### Problem Statement
Compute the Levenshtein edit distance between two strings.

### Input Format
The first line contains string `a`. The second line contains string `b`. Either string may be empty.

### Output Format
Print the minimum number of single-character insertions, deletions, or substitutions needed to transform `a` into `b`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
horse
ros
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
intention
execution
```

**Output**
```text
5
```

**Explanation**
The second input produces `5` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
horse
ros
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
intention
execution
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
a
a
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
a
b
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text

abc
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
abc

```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
kitten
sitting
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
flaw
lawn
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
abc
abc
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
book
back
```

**Expected Output**
```text
2
```


## Question 183 — Maximum Product Subarray — Variant 2
**Difficulty:** Hard+

### Problem Statement
Find the contiguous subarray with the largest product; the subarray must contain at least one element.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum product of any non-empty contiguous subarray.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
2 3 -2 4
```

**Output**
```text
6
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `6`.

### Worked Example 2

**Input**
```text
3
-2 0 -1
```

**Output**
```text
0
```

**Explanation**
The second input produces `0` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
2 3 -2 4
```

**Expected Output**
```text
6
```

#### Test Case 2

**Input**
```text
3
-2 0 -1
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
-2 3 -4
```

**Expected Output**
```text
24
```

#### Test Case 4

**Input**
```text
2
0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
-2 -3 -4
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 7

**Input**
```text
4
-1 -2 -3 0
```

**Expected Output**
```text
6
```

#### Test Case 8

**Input**
```text
5
2 -5 -2 -4 3
```

**Expected Output**
```text
24
```

#### Test Case 9

**Input**
```text
1
-1
```

**Expected Output**
```text
-1
```

#### Test Case 10

**Input**
```text
3
1 -2 3
```

**Expected Output**
```text
3
```


## Question 184 — Decode Digit String — Variant 2
**Difficulty:** Hard+

### Problem Statement
Count how many different letter decodings can be formed from the digit string.

### Input Format
One line contains a string of decimal digits. A code maps `1→A` through `26→Z`; a zero can only be part of a valid two-digit code.

### Output Format
Print the number of valid decodings. Print `0` when the string cannot be decoded.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
12
```

**Output**
```text
2
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `2`.

### Worked Example 2

**Input**
```text
226
```

**Output**
```text
3
```

**Explanation**
The second input produces `3` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
12
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
226
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
06
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
11106
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
10
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
27
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
101
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
2611055971756562
```

**Expected Output**
```text
4
```

#### Test Case 10

**Input**
```text
123456
```

**Expected Output**
```text
3
```


## Question 185 — Maximum Sum Non-Adjacent — Variant 2
**Difficulty:** Hard+

### Problem Statement
Select non-adjacent values to maximize their sum. Adjacent positions cannot both be selected.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print the maximum sum obtainable without choosing adjacent positions.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
6
2 7 9 3 1 4
```

**Output**
```text
15
```

**Explanation**
The second input produces `15` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
6
2 7 9 3 1 4
```

**Expected Output**
```text
15
```

#### Test Case 3

**Input**
```text
6
5 5 10 100 10 5
```

**Expected Output**
```text
110
```

#### Test Case 4

**Input**
```text
5
3 2 5 10 7
```

**Expected Output**
```text
15
```

#### Test Case 5

**Input**
```text
6
1 2 3 4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 7

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4
8 1 8 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
3
9 9 1
```

**Expected Output**
```text
10
```

#### Test Case 10

**Input**
```text
4
2 4 7 2
```

**Expected Output**
```text
9
```


## Question 186 — Climbing Cost — Variant 3
**Difficulty:** Hard+

### Problem Statement
Starting before platform 0, move forward by one or two positions. Landing on a platform incurs its cost; reaching position `n` costs nothing. Find the minimum total cost.

### Input Format
The first line contains `n`. The second line contains `n` non-negative landing costs.

### Output Format
Print the minimum cost to reach position `n`, where each move advances 1 or 2 positions and landing on platform `i` costs `cost[i]`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
10 15 20 5 8
```

**Output**
```text
20
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `20`.

### Worked Example 2

**Input**
```text
4
1 100 1 1
```

**Output**
```text
2
```

**Explanation**
The second input produces `2` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
10 15 20 5 8
```

**Expected Output**
```text
20
```

#### Test Case 2

**Input**
```text
4
1 100 1 1
```

**Expected Output**
```text
2
```

#### Test Case 3

**Input**
```text
5
0 5 0 5 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
2
5 5
```

**Expected Output**
```text
5
```

#### Test Case 5

**Input**
```text
4
3 2 1 10
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
5
7 1 7 1 7
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
4
9 8 1 8
```

**Expected Output**
```text
9
```

#### Test Case 8

**Input**
```text
5
2 9 2 9 2
```

**Expected Output**
```text
6
```

#### Test Case 9

**Input**
```text
5
1 2 3 4 5
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
4
3 3 1 4
```

**Expected Output**
```text
4
```


## Question 187 — House Robber — Variant 3
**Difficulty:** Hard+

### Problem Statement
Choose a set of non-adjacent houses to maximize collected value. Print the maximum possible total.

### Input Format
The first line contains `n`. The second line contains `n` non-negative house values.

### Output Format
Print the maximum sum obtained by choosing values with no two chosen positions adjacent.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
4
2 1 1 2
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
4
2 1 1 2
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
4
1 2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 6

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
5
4 10 3 1 5
```

**Expected Output**
```text
15
```

#### Test Case 8

**Input**
```text
4
6 6 6 6
```

**Expected Output**
```text
12
```

#### Test Case 9

**Input**
```text
3
9 1 9
```

**Expected Output**
```text
18
```

#### Test Case 10

**Input**
```text
4
2 2 7 3
```

**Expected Output**
```text
9
```


## Question 188 — Coin Change Minimum — Variant 3
**Difficulty:** Hard+

### Problem Statement
Unlimited copies of each denomination are available. Find the minimum number of coins required to make the exact target.

### Input Format
The first line contains `n` and target `T`. The second line contains `n` distinct positive coin denominations.

### Output Format
Print the minimum number of coins needed to form exactly `T`, or `-1` if impossible.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 11
1 2 5
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
1 3
2
```

**Output**
```text
-1
```

**Explanation**
The second input produces `-1` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 11
1 2 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1 3
2
```

**Expected Output**
```text
-1
```

#### Test Case 3

**Input**
```text
1 0
1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 27
2 5 10
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
2 14
3 7
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 6
1 3 4
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
2 1
5 7
```

**Expected Output**
```text
-1
```

#### Test Case 8

**Input**
```text
2 8
2 4
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
4 11
1 5 6 8
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3 13
2 3 7
```

**Expected Output**
```text
3
```


## Question 189 — Longest Increasing Subsequence — Variant 3
**Difficulty:** Hard+

### Problem Statement
A subsequence keeps original order but may skip elements. Find the maximum possible length of a strictly increasing subsequence.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the length of the longest strictly increasing subsequence.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Output**
```text
4
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `4`.

### Worked Example 2

**Input**
```text
6
0 1 0 3 2 3
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
6
0 1 0 3 2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
4 3 2 1
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
-1 0 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
5
3 10 2 1 20
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
6
5 4 11 1 16 8
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
4
2 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
6
2 3 1 5 2 6
```

**Expected Output**
```text
4
```


## Question 190 — Partition Equal Sum — Variant 3
**Difficulty:** Hard+

### Problem Statement
Each array element must belong to exactly one of two groups. Determine whether the two group sums can be equal.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print `YES` if the array can be split into two groups with equal sums, otherwise `NO`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
1 5 11 5
```

**Output**
```text
YES
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `YES`.

### Worked Example 2

**Input**
```text
4
1 2 3 5
```

**Output**
```text
NO
```

**Explanation**
The second input produces `NO` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 11 5
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
4
1 2 3 5
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2
2 2
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1
1
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
5
3 3 3 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
2
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5
7 3 2 5 1
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4
10 10 1 1
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4
2 1 2 3
```

**Expected Output**
```text
YES
```


## Question 191 — Grid Minimum Path — Variant 3
**Difficulty:** Hard+

### Problem Statement
Find the least-cost path through a non-negative grid when movement is restricted to right and down.

### Input Format
The first line contains `r c`. The next `r` lines contain `c` non-negative integers.

### Output Format
Print the minimum sum of a path from the top-left cell to the bottom-right cell, moving only right or down.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Output**
```text
7
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `7`.

### Worked Example 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Output**
```text
12
```

**Explanation**
The second input produces `12` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 3

**Input**
```text
1 1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
2 2
1 2
1 1
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
2 3
0 1 0
1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 3
2 8 1
1 3 2
4 2 1
```

**Expected Output**
```text
9
```

#### Test Case 7

**Input**
```text
3 2
9 1
1 9
1 1
```

**Expected Output**
```text
12
```

#### Test Case 8

**Input**
```text
1 4
3 1 7 2
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
3 1
1
2
3
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
2 2
3 2
3 1
```

**Expected Output**
```text
6
```


## Question 192 — String Edit Distance — Variant 3
**Difficulty:** Hard+

### Problem Statement
Compute the Levenshtein edit distance between two strings.

### Input Format
The first line contains string `a`. The second line contains string `b`. Either string may be empty.

### Output Format
Print the minimum number of single-character insertions, deletions, or substitutions needed to transform `a` into `b`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
horse
ros
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
intention
execution
```

**Output**
```text
5
```

**Explanation**
The second input produces `5` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
horse
ros
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
intention
execution
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
a
a
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
a
b
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text

abc
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
abc

```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
kitten
sitting
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
flaw
lawn
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
abc
abc
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
book
back
```

**Expected Output**
```text
2
```


## Question 193 — Maximum Product Subarray — Variant 3
**Difficulty:** Hard+

### Problem Statement
Find the contiguous subarray with the largest product; the subarray must contain at least one element.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum product of any non-empty contiguous subarray.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
2 3 -2 4
```

**Output**
```text
6
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `6`.

### Worked Example 2

**Input**
```text
3
-2 0 -1
```

**Output**
```text
0
```

**Explanation**
The second input produces `0` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
2 3 -2 4
```

**Expected Output**
```text
6
```

#### Test Case 2

**Input**
```text
3
-2 0 -1
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
-2 3 -4
```

**Expected Output**
```text
24
```

#### Test Case 4

**Input**
```text
2
0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
-2 -3 -4
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 7

**Input**
```text
4
-1 -2 -3 0
```

**Expected Output**
```text
6
```

#### Test Case 8

**Input**
```text
5
2 -5 -2 -4 3
```

**Expected Output**
```text
24
```

#### Test Case 9

**Input**
```text
1
-1
```

**Expected Output**
```text
-1
```

#### Test Case 10

**Input**
```text
3
2 -2 3
```

**Expected Output**
```text
3
```


## Question 194 — Decode Digit String — Variant 3
**Difficulty:** Hard+

### Problem Statement
Count how many different letter decodings can be formed from the digit string.

### Input Format
One line contains a string of decimal digits. A code maps `1→A` through `26→Z`; a zero can only be part of a valid two-digit code.

### Output Format
Print the number of valid decodings. Print `0` when the string cannot be decoded.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
12
```

**Output**
```text
2
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `2`.

### Worked Example 2

**Input**
```text
226
```

**Output**
```text
3
```

**Explanation**
The second input produces `3` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
12
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
226
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
06
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
11106
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
10
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
27
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
101
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
2611055971756562
```

**Expected Output**
```text
4
```

#### Test Case 10

**Input**
```text
123456
```

**Expected Output**
```text
3
```


## Question 195 — Maximum Sum Non-Adjacent — Variant 3
**Difficulty:** Hard+

### Problem Statement
Select non-adjacent values to maximize their sum. Adjacent positions cannot both be selected.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print the maximum sum obtainable without choosing adjacent positions.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
6
2 7 9 3 1 4
```

**Output**
```text
15
```

**Explanation**
The second input produces `15` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
6
2 7 9 3 1 4
```

**Expected Output**
```text
15
```

#### Test Case 3

**Input**
```text
6
5 5 10 100 10 5
```

**Expected Output**
```text
110
```

#### Test Case 4

**Input**
```text
5
3 2 5 10 7
```

**Expected Output**
```text
15
```

#### Test Case 5

**Input**
```text
6
1 2 3 4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 7

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4
8 1 8 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
3
9 9 1
```

**Expected Output**
```text
10
```

#### Test Case 10

**Input**
```text
4
3 4 7 2
```

**Expected Output**
```text
10
```


## Question 196 — Climbing Cost — Variant 4
**Difficulty:** Hard+

### Problem Statement
Starting before platform 0, move forward by one or two positions. Landing on a platform incurs its cost; reaching position `n` costs nothing. Find the minimum total cost.

### Input Format
The first line contains `n`. The second line contains `n` non-negative landing costs.

### Output Format
Print the minimum cost to reach position `n`, where each move advances 1 or 2 positions and landing on platform `i` costs `cost[i]`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
10 15 20 5 8
```

**Output**
```text
20
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `20`.

### Worked Example 2

**Input**
```text
4
1 100 1 1
```

**Output**
```text
2
```

**Explanation**
The second input produces `2` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
10 15 20 5 8
```

**Expected Output**
```text
20
```

#### Test Case 2

**Input**
```text
4
1 100 1 1
```

**Expected Output**
```text
2
```

#### Test Case 3

**Input**
```text
5
0 5 0 5 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
2
5 5
```

**Expected Output**
```text
5
```

#### Test Case 5

**Input**
```text
4
3 2 1 10
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
5
7 1 7 1 7
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
4
9 8 1 8
```

**Expected Output**
```text
9
```

#### Test Case 8

**Input**
```text
5
2 9 2 9 2
```

**Expected Output**
```text
6
```

#### Test Case 9

**Input**
```text
5
1 2 3 4 5
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
4
4 3 1 4
```

**Expected Output**
```text
4
```


## Question 197 — House Robber — Variant 4
**Difficulty:** Hard+

### Problem Statement
Choose a set of non-adjacent houses to maximize collected value. Print the maximum possible total.

### Input Format
The first line contains `n`. The second line contains `n` non-negative house values.

### Output Format
Print the maximum sum obtained by choosing values with no two chosen positions adjacent.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
4
2 1 1 2
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
4
2 1 1 2
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
4
1 2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 6

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
5
4 10 3 1 5
```

**Expected Output**
```text
15
```

#### Test Case 8

**Input**
```text
4
6 6 6 6
```

**Expected Output**
```text
12
```

#### Test Case 9

**Input**
```text
3
9 1 9
```

**Expected Output**
```text
18
```

#### Test Case 10

**Input**
```text
4
3 2 7 3
```

**Expected Output**
```text
10
```


## Question 198 — Coin Change Minimum — Variant 4
**Difficulty:** Hard+

### Problem Statement
Unlimited copies of each denomination are available. Find the minimum number of coins required to make the exact target.

### Input Format
The first line contains `n` and target `T`. The second line contains `n` distinct positive coin denominations.

### Output Format
Print the minimum number of coins needed to form exactly `T`, or `-1` if impossible.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 11
1 2 5
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
1 3
2
```

**Output**
```text
-1
```

**Explanation**
The second input produces `-1` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 11
1 2 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1 3
2
```

**Expected Output**
```text
-1
```

#### Test Case 3

**Input**
```text
1 0
1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 27
2 5 10
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
2 14
3 7
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 6
1 3 4
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
2 1
5 7
```

**Expected Output**
```text
-1
```

#### Test Case 8

**Input**
```text
2 8
2 4
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
4 11
1 5 6 8
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3 13
2 3 7
```

**Expected Output**
```text
3
```


## Question 199 — Longest Increasing Subsequence — Variant 4
**Difficulty:** Hard+

### Problem Statement
A subsequence keeps original order but may skip elements. Find the maximum possible length of a strictly increasing subsequence.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the length of the longest strictly increasing subsequence.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Output**
```text
4
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `4`.

### Worked Example 2

**Input**
```text
6
0 1 0 3 2 3
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
6
0 1 0 3 2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
4 3 2 1
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
-1 0 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
5
3 10 2 1 20
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
6
5 4 11 1 16 8
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
4
2 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
6
3 3 1 5 2 6
```

**Expected Output**
```text
3
```


## Question 200 — Partition Equal Sum — Variant 4
**Difficulty:** Hard+

### Problem Statement
Each array element must belong to exactly one of two groups. Determine whether the two group sums can be equal.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print `YES` if the array can be split into two groups with equal sums, otherwise `NO`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
1 5 11 5
```

**Output**
```text
YES
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `YES`.

### Worked Example 2

**Input**
```text
4
1 2 3 5
```

**Output**
```text
NO
```

**Explanation**
The second input produces `NO` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 11 5
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
4
1 2 3 5
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2
2 2
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1
1
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
5
3 3 3 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
2
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5
7 3 2 5 1
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4
10 10 1 1
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4
3 1 2 3
```

**Expected Output**
```text
NO
```


## Question 201 — Grid Minimum Path — Variant 4
**Difficulty:** Hard+

### Problem Statement
Find the least-cost path through a non-negative grid when movement is restricted to right and down.

### Input Format
The first line contains `r c`. The next `r` lines contain `c` non-negative integers.

### Output Format
Print the minimum sum of a path from the top-left cell to the bottom-right cell, moving only right or down.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Output**
```text
7
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `7`.

### Worked Example 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Output**
```text
12
```

**Explanation**
The second input produces `12` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 3

**Input**
```text
1 1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
2 2
1 2
1 1
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
2 3
0 1 0
1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 3
2 8 1
1 3 2
4 2 1
```

**Expected Output**
```text
9
```

#### Test Case 7

**Input**
```text
3 2
9 1
1 9
1 1
```

**Expected Output**
```text
12
```

#### Test Case 8

**Input**
```text
1 4
3 1 7 2
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
3 1
1
2
3
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
2 2
4 2
3 1
```

**Expected Output**
```text
7
```


## Question 202 — String Edit Distance — Variant 4
**Difficulty:** Hard+

### Problem Statement
Compute the Levenshtein edit distance between two strings.

### Input Format
The first line contains string `a`. The second line contains string `b`. Either string may be empty.

### Output Format
Print the minimum number of single-character insertions, deletions, or substitutions needed to transform `a` into `b`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
horse
ros
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
intention
execution
```

**Output**
```text
5
```

**Explanation**
The second input produces `5` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
horse
ros
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
intention
execution
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
a
a
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
a
b
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text

abc
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
abc

```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
kitten
sitting
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
flaw
lawn
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
abc
abc
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
book
back
```

**Expected Output**
```text
2
```


## Question 203 — Maximum Product Subarray — Variant 4
**Difficulty:** Hard+

### Problem Statement
Find the contiguous subarray with the largest product; the subarray must contain at least one element.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum product of any non-empty contiguous subarray.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
2 3 -2 4
```

**Output**
```text
6
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `6`.

### Worked Example 2

**Input**
```text
3
-2 0 -1
```

**Output**
```text
0
```

**Explanation**
The second input produces `0` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
2 3 -2 4
```

**Expected Output**
```text
6
```

#### Test Case 2

**Input**
```text
3
-2 0 -1
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
-2 3 -4
```

**Expected Output**
```text
24
```

#### Test Case 4

**Input**
```text
2
0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
-2 -3 -4
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 7

**Input**
```text
4
-1 -2 -3 0
```

**Expected Output**
```text
6
```

#### Test Case 8

**Input**
```text
5
2 -5 -2 -4 3
```

**Expected Output**
```text
24
```

#### Test Case 9

**Input**
```text
1
-1
```

**Expected Output**
```text
-1
```

#### Test Case 10

**Input**
```text
3
3 -2 3
```

**Expected Output**
```text
3
```


## Question 204 — Decode Digit String — Variant 4
**Difficulty:** Hard+

### Problem Statement
Count how many different letter decodings can be formed from the digit string.

### Input Format
One line contains a string of decimal digits. A code maps `1→A` through `26→Z`; a zero can only be part of a valid two-digit code.

### Output Format
Print the number of valid decodings. Print `0` when the string cannot be decoded.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
12
```

**Output**
```text
2
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `2`.

### Worked Example 2

**Input**
```text
226
```

**Output**
```text
3
```

**Explanation**
The second input produces `3` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
12
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
226
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
06
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
11106
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
10
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
27
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
101
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
2611055971756562
```

**Expected Output**
```text
4
```

#### Test Case 10

**Input**
```text
123456
```

**Expected Output**
```text
3
```


## Question 205 — Maximum Sum Non-Adjacent — Variant 4
**Difficulty:** Hard+

### Problem Statement
Select non-adjacent values to maximize their sum. Adjacent positions cannot both be selected.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print the maximum sum obtainable without choosing adjacent positions.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
6
2 7 9 3 1 4
```

**Output**
```text
15
```

**Explanation**
The second input produces `15` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
6
2 7 9 3 1 4
```

**Expected Output**
```text
15
```

#### Test Case 3

**Input**
```text
6
5 5 10 100 10 5
```

**Expected Output**
```text
110
```

#### Test Case 4

**Input**
```text
5
3 2 5 10 7
```

**Expected Output**
```text
15
```

#### Test Case 5

**Input**
```text
6
1 2 3 4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 7

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4
8 1 8 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
3
9 9 1
```

**Expected Output**
```text
10
```

#### Test Case 10

**Input**
```text
4
4 4 7 2
```

**Expected Output**
```text
11
```



# Belt 7 — Sr. Brown Belt
**Difficulty:** Hard

## Subdivision — Search and Optimization

## Question 206 — Array Sum — Variant 1
**Difficulty:** Hard

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
-2 1 3 -1 2
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
-2 1 3 -1 2
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
1 4 -2
```

**Expected Output**
```text
3
```


## Question 207 — Array Minimum — Variant 1
**Difficulty:** Hard

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
3 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
3 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
0 0 5
```

**Expected Output**
```text
0
```


## Question 208 — Count Above Threshold — Variant 1
**Difficulty:** Hard

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
0 1 9
```

**Expected Output**
```text
1
```


## Question 209 — Reverse Array — Variant 1
**Difficulty:** Hard

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
0 1 2
```

**Expected Output**
```text
2 1 0
```


## Question 210 — Rotate Left — Variant 1
**Difficulty:** Hard

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 0
1 2 3 4
```

**Expected Output**
```text
1 2 3 4
```


## Question 211 — Second Largest — Variant 1
**Difficulty:** Hard

### Problem Statement
Find the second distinct largest value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the second distinct largest value, or `NONE` if fewer than two distinct values exist.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 5 3 5
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
2
1 2
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 3 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
2
1 2
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
5 5 5
```

**Expected Output**
```text
NONE
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-2
```

#### Test Case 5

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
9
```

#### Test Case 6

**Input**
```text
4
7 3 7 2
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3
0 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
75
```

#### Test Case 9

**Input**
```text
3
2 1 0
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3
0 2 1
```

**Expected Output**
```text
1
```


## Question 212 — Prefix Running Sum — Variant 1
**Difficulty:** Hard

### Problem Statement
For every position, report the sum from index 0 through that position.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the running sum after each element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
1 3 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 6`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 3 6
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 4

**Input**
```text
4
-1 2 -3 4
```

**Expected Output**
```text
-1 1 -2 2
```

#### Test Case 5

**Input**
```text
3
10 -5 2
```

**Expected Output**
```text
10 5 7
```

#### Test Case 6

**Input**
```text
2
7 7
```

**Expected Output**
```text
7 14
```

#### Test Case 7

**Input**
```text
3
100 -100 5
```

**Expected Output**
```text
100 0 5
```

#### Test Case 8

**Input**
```text
3
-2 -2 -2
```

**Expected Output**
```text
-2 -4 -6
```

#### Test Case 9

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 2 2
```

#### Test Case 10

**Input**
```text
3
0 1 2
```

**Expected Output**
```text
0 1 3
```


## Question 213 — Distinct Count — Variant 1
**Difficulty:** Hard

### Problem Statement
Count how many distinct integer values occur.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the number of distinct values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 1 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3
-1 -2 -1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
0

```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
3
7 8 9
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
5
2 2 3 3 4
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
4
10 9 10 8
```

**Expected Output**
```text
3
```


## Question 214 — Longest Equal Run — Variant 1
**Difficulty:** Hard+

### Problem Statement
Find the longest consecutive run containing the same value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum length of a consecutive run of equal values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
6
1 1 2 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
6
1 1 2 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
5
1 1 2 1 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
4
-1 -1 -1 0
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
4
7 7 8 8
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
6
1 2 2 3 3 3
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
5
0 0 1 1 1
```

**Expected Output**
```text
3
```


## Question 215 — Pair Sum Exists — Variant 1
**Difficulty:** Hard+

### Problem Statement
Determine whether two distinct array positions contain values whose sum equals the target.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print `YES` if two distinct elements sum to `t`; otherwise print `NO`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 6
1 2 4
```

**Output**
```text
YES
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `YES`.

### Worked Example 2

**Input**
```text
3 10
1 2 3
```

**Output**
```text
NO
```

**Explanation**
For the second case, applying the same rule gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
3 6
1 2 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 10
1 2 3
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2 0
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
3 3
-1 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
3 4
2 2 2
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
1 1
1
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
3 14
5 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 -7
-5 -2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
2 25
10 20
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 1
0 1 2
```

**Expected Output**
```text
YES
```


## Question 216 — Move Zeroes — Variant 1
**Difficulty:** Hard+

### Problem Statement
Move all zeroes to the end while preserving non-zero order.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the array with all zeroes moved to the end while preserving the relative order of non-zero values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
0 1 0 3 12
```

**Output**
```text
1 3 12 0 0
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 12 0 0`.

### Worked Example 2

**Input**
```text
3
0 0 1
```

**Output**
```text
1 0 0
```

**Explanation**
For the second case, applying the same rule gives `1 0 0`.

### Test Cases

#### Test Case 1

**Input**
```text
5
0 1 0 3 12
```

**Expected Output**
```text
1 3 12 0 0
```

#### Test Case 2

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
1 0 0
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
2
0 0
```

**Expected Output**
```text
0 0
```

#### Test Case 6

**Input**
```text
5
1 0 2 0 3
```

**Expected Output**
```text
1 2 3 0 0
```

#### Test Case 7

**Input**
```text
3
-1 0 -2
```

**Expected Output**
```text
-1 -2 0
```

#### Test Case 8

**Input**
```text
3
5 0 5
```

**Expected Output**
```text
5 5 0
```

#### Test Case 9

**Input**
```text
5
0 1 0 0 2
```

**Expected Output**
```text
1 2 0 0 0
```

#### Test Case 10

**Input**
```text
4
0 0 1 0
```

**Expected Output**
```text
1 0 0 0
```


## Question 217 — Merge Sorted Arrays — Variant 1
**Difficulty:** Hard+

### Problem Statement
Merge two sorted arrays into one sorted sequence.

### Input Format
The first line contains `n m`. The second line contains `n` sorted integers. The third line contains `m` sorted integers.

### Output Format
Print the merged sorted sequence.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Output**
```text
1 2 3 4 5 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 2 3 4 5 6`.

### Worked Example 2

**Input**
```text
1 1
1
2
```

**Output**
```text
1 2
```

**Explanation**
For the second case, applying the same rule gives `1 2`.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Expected Output**
```text
1 2 3 4 5 6
```

#### Test Case 2

**Input**
```text
1 1
1
2
```

**Expected Output**
```text
1 2
```

#### Test Case 3

**Input**
```text
0 2

1 2
```

**Expected Output**
```text
1 2
```

#### Test Case 4

**Input**
```text
2 2
-3 0
-2 4
```

**Expected Output**
```text
-3 -2 0 4
```

#### Test Case 5

**Input**
```text
2 2
1 1
1 2
```

**Expected Output**
```text
1 1 1 2
```

#### Test Case 6

**Input**
```text
2 2
5 6
1 2
```

**Expected Output**
```text
1 2 5 6
```

#### Test Case 7

**Input**
```text
1 1
0
0
```

**Expected Output**
```text
0 0
```

#### Test Case 8

**Input**
```text
3 1
2 7 9
3
```

**Expected Output**
```text
2 3 7 9
```

#### Test Case 9

**Input**
```text
2 2
-5 -1
-4 -2
```

**Expected Output**
```text
-5 -4 -2 -1
```

#### Test Case 10

**Input**
```text
2 2
0 10
1 11
```

**Expected Output**
```text
0 1 10 11
```


## Question 218 — Frequency of Target — Variant 1
**Difficulty:** Hard+

### Problem Statement
Count occurrences of a target value.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print the number of occurrences of `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 1
1 2 1 1
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3 5
5 5 5
```

**Output**
```text
3
```

**Explanation**
For the second case, applying the same rule gives `3`.

### Test Cases

#### Test Case 1

**Input**
```text
4 1
1 2 1 1
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
3 -1
-1 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
1 7
7
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
4 2
1 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
3 9
10 9 8
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
3 0
0 1 0
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
0 0

```

**Expected Output**
```text
0
```


## Question 219 — First Maximum Index — Variant 1
**Difficulty:** Hard+

### Problem Statement
Find the first zero-based index of the maximum value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the zero-based index of the first occurrence of the maximum value.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 9 3
```

**Output**
```text
1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
0
```

**Explanation**
For the second case, applying the same rule gives `0`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 9 3
```

**Expected Output**
```text
1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
2 2 1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
0 4 4
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
7 1 7
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
0 3 3
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
3 2 5 5
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3
100 -1 100
```

**Expected Output**
```text
0
```


## Question 220 — Alternating Sum — Variant 1
**Difficulty:** Hard+

### Problem Statement
Compute the sum at even indices minus the sum at odd indices.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of elements at even indices minus the sum at odd indices.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 3 4
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
2 4 6
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
3
10 1 5
```

**Expected Output**
```text
14
```

#### Test Case 6

**Input**
```text
3
-1 2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
-2
```

#### Test Case 8

**Input**
```text
2
7 3
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
4
0 1 2 3
```

**Expected Output**
```text
-2
```


## Question 221 — Array Sum — Variant 2
**Difficulty:** Hard+

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
-1 2 3 -1 2
```

**Output**
```text
5
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `5`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
-1 2 3 -1 2
```

**Expected Output**
```text
5
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
2 4 -2
```

**Expected Output**
```text
4
```


## Question 222 — Array Minimum — Variant 2
**Difficulty:** Hard+

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
4 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
4 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
1 -1 5
```

**Expected Output**
```text
-1
```


## Question 223 — Count Above Threshold — Variant 2
**Difficulty:** Hard+

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
1 1 9
```

**Expected Output**
```text
1
```


## Question 224 — Reverse Array — Variant 2
**Difficulty:** Hard+

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```


## Question 225 — Rotate Left — Variant 2
**Difficulty:** Hard+

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 1
2 2 3 4
```

**Expected Output**
```text
2 3 4 2
```


## Subdivision — Feasibility and Graph Models

## Question 226 — Components — Variant 1
**Difficulty:** Hard

### Problem Statement
Given an undirected graph, count its connected components.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print the number of connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 0
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 0
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
6 2
0 1
2 3
```

**Expected Output**
```text
4
```

#### Test Case 4

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
7 3
0 1
1 2
4 5
```

**Expected Output**
```text
4
```

#### Test Case 6

**Input**
```text
5 3
0 4
1 2
2 3
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
8 4
0 1
2 3
4 5
6 7
```

**Expected Output**
```text
4
```

#### Test Case 8

**Input**
```text
3 1
0 2
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
3 1
0 1
```

**Expected Output**
```text
2
```


## Question 227 — Bipartite — Variant 1
**Difficulty:** Hard

### Problem Statement
Determine whether vertices can be split into two groups so every edge crosses between the groups.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print `YES` if the graph is bipartite; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
4 4
0 1
0 2
0 3
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
6 5
0 1
1 2
2 3
3 4
4 5
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
YES
```


## Question 228 — Shortest Path — Variant 1
**Difficulty:** Hard

### Problem Statement
Compute single-source shortest paths in a directed graph with non-negative edge weights.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains directed edge `u v w` with non-negative weight `w`.

### Output Format
Print `n` shortest distances from source `s`; print `-1` for unreachable vertices.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Output**
```text
0 3 1 4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 3 1 4`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
0 5 11
```

**Explanation**
In the second graph, the same definition gives `0 5 11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Expected Output**
```text
0 3 1 4
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
0 5 11
```

#### Test Case 3

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 10
2 3 1
```

**Expected Output**
```text
0 2 5 6 -1
```

#### Test Case 4

**Input**
```text
4 2 1
1 2 5
2 3 2
```

**Expected Output**
```text
-1 0 5 7
```

#### Test Case 5

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 6

**Input**
```text
5 4 2
2 0 7
2 1 2
1 3 3
3 4 1
```

**Expected Output**
```text
7 2 0 5 6
```

#### Test Case 7

**Input**
```text
4 3 3
3 0 1
0 1 1
1 2 1
```

**Expected Output**
```text
1 2 3 0
```

#### Test Case 8

**Input**
```text
4 0 0
```

**Expected Output**
```text
0 -1 -1 -1
```

#### Test Case 9

**Input**
```text
3 2 0
0 1 2
0 1 5
```

**Expected Output**
```text
0 2 -1
```

#### Test Case 10

**Input**
```text
5 3 0
0 1 10
0 2 1
2 1 1
```

**Expected Output**
```text
0 2 1 -1 -1
```


## Question 229 — Topological Order — Variant 1
**Difficulty:** Hard

### Problem Statement
Schedule all vertices so every directed edge points forward. When several vertices are available, choose the smallest index.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v` meaning `u` must precede `v`.

### Output Format
Print the lexicographically smallest valid topological ordering, or `IMPOSSIBLE` if a cycle exists.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Output**
```text
0 1 2 3
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 1 2 3`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
IMPOSSIBLE
```

**Explanation**
In the second graph, the same definition gives `IMPOSSIBLE`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 3

**Input**
```text
3 2
0 2
1 2
```

**Expected Output**
```text
0 1 2
```

#### Test Case 4

**Input**
```text
4 2
2 3
0 1
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 5

**Input**
```text
1 0
```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
5 4
0 2
1 2
2 3
2 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 7

**Input**
```text
4 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 8

**Input**
```text
2 1
1 0
```

**Expected Output**
```text
1 0
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 10

**Input**
```text
4 3
0 2
1 2
2 3
```

**Expected Output**
```text
0 1 2 3
```


## Question 230 — MST — Variant 1
**Difficulty:** Hard

### Problem Statement
Connect every vertex with minimum total edge weight and no cycle.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected weighted edge `u v w`. The graph is connected.

### Output Format
Print the total weight of a minimum spanning tree.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Output**
```text
4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `4`.

### Worked Example 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Output**
```text
7
```

**Explanation**
In the second graph, the same definition gives `7`.

### Test Cases

#### Test Case 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
1 0

```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4 3
0 1 1
1 2 2
2 3 3
```

**Expected Output**
```text
6
```

#### Test Case 5

**Input**
```text
5 7
0 1 2
0 2 5
1 2 1
1 3 4
2 3 2
2 4 3
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 6
0 1 1
0 2 1
0 3 1
1 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3 3
0 1 0
1 2 0
0 2 5
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4 4
0 1 9
1 2 8
2 3 7
0 3 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
5 6
0 1 4
0 2 3
1 2 2
1 3 6
2 4 5
3 4 1
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
4 4
0 1 3
1 2 4
2 3 1
0 3 10
```

**Expected Output**
```text
8
```


## Question 231 — SCC — Variant 1
**Difficulty:** Hard

### Problem Statement
Count maximal sets of vertices where every vertex can reach every other vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print the number of strongly connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4 4
0 1
1 0
2 3
3 2
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
5 5
0 1
1 2
2 3
3 1
3 4
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
1 0
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
4 5
0 1
1 2
2 0
2 3
3 2
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
6 6
0 1
1 2
2 0
3 4
4 5
5 3
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
5 7
0 1
1 0
1 2
2 3
3 2
3 4
4 3
```

**Expected Output**
```text
2
```


## Question 232 — Cycle Detection — Variant 1
**Difficulty:** Hard

### Problem Statement
Detect whether following directed edges can return to a previously active vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if the directed graph contains a cycle, otherwise `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
NO
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `NO`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
YES
```

**Explanation**
In the second graph, the same definition gives `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
4 4
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1 0
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
2 1
0 1
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
3 2
0 2
2 1
```

**Expected Output**
```text
NO
```


## Question 233 — Reachability — Variant 1
**Difficulty:** Hard

### Problem Statement
Determine whether a directed path exists from source `s` to target `t`.

### Input Format
The first line contains `n m s t`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if `t` is reachable from `s`; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 0 0 0
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 4 3 0
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
3 2 2 0
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 1 0 4
0 4
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 2 1 3
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 1 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4 2 0 3
0 2
2 3
```

**Expected Output**
```text
YES
```


## Question 234 — DAG Longest Path — Variant 1
**Difficulty:** Hard

### Problem Statement
In a directed acyclic graph, find the maximum total edge weight of any path starting from source `s`.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains a directed weighted edge `u v w`. The graph is a DAG.

### Output Format
Print the maximum path weight starting at `s`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Output**
```text
12
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `12`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
11
```

**Explanation**
In the second graph, the same definition gives `11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
11
```

#### Test Case 3

**Input**
```text
4 4 0
0 1 1
0 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
1 0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 5
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 3 0
0 1 10
1 2 1
0 2 5
```

**Expected Output**
```text
11
```

#### Test Case 7

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
5 5 0
0 1 7
0 2 2
2 3 8
1 4 1
3 4 3
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
4 2 1
1 2 5
2 3 6
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
6 5 0
0 1 1
1 2 2
0 3 4
3 4 5
4 5 6
```

**Expected Output**
```text
15
```


## Question 235 — DSU Connectivity — Variant 1
**Difficulty:** Hard

### Problem Statement
Process the undirected edges as unions and determine whether two requested vertices belong to the same component.

### Input Format
The first line contains `n m s t`. The next `m` lines contain undirected edges `u v`.

### Output Format
Print `YES` if `s` and `t` are connected after all edges are added; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 0 1
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 3 0 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 3 0 2
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
3 0 0 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 3 3 4
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 0 3
0 1
1 3
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
6 3 4 5
0 1
2 3
4 5
```

**Expected Output**
```text
YES
```


## Question 236 — Components — Variant 2
**Difficulty:** Hard

### Problem Statement
Given an undirected graph, count its connected components.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print the number of connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 0
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 0
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
6 2
0 1
2 3
```

**Expected Output**
```text
4
```

#### Test Case 4

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
7 3
0 1
1 2
4 5
```

**Expected Output**
```text
4
```

#### Test Case 6

**Input**
```text
5 3
0 4
1 2
2 3
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
8 4
0 1
2 3
4 5
6 7
```

**Expected Output**
```text
4
```

#### Test Case 8

**Input**
```text
3 1
0 2
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
4 1
0 1
```

**Expected Output**
```text
3
```


## Question 237 — Bipartite — Variant 2
**Difficulty:** Hard

### Problem Statement
Determine whether vertices can be split into two groups so every edge crosses between the groups.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print `YES` if the graph is bipartite; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
4 4
0 1
0 2
0 3
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
6 5
0 1
1 2
2 3
3 4
4 5
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
YES
```


## Question 238 — Shortest Path — Variant 2
**Difficulty:** Hard

### Problem Statement
Compute single-source shortest paths in a directed graph with non-negative edge weights.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains directed edge `u v w` with non-negative weight `w`.

### Output Format
Print `n` shortest distances from source `s`; print `-1` for unreachable vertices.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Output**
```text
0 3 1 4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 3 1 4`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
0 5 11
```

**Explanation**
In the second graph, the same definition gives `0 5 11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Expected Output**
```text
0 3 1 4
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
0 5 11
```

#### Test Case 3

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 10
2 3 1
```

**Expected Output**
```text
0 2 5 6 -1
```

#### Test Case 4

**Input**
```text
4 2 1
1 2 5
2 3 2
```

**Expected Output**
```text
-1 0 5 7
```

#### Test Case 5

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 6

**Input**
```text
5 4 2
2 0 7
2 1 2
1 3 3
3 4 1
```

**Expected Output**
```text
7 2 0 5 6
```

#### Test Case 7

**Input**
```text
4 3 3
3 0 1
0 1 1
1 2 1
```

**Expected Output**
```text
1 2 3 0
```

#### Test Case 8

**Input**
```text
4 0 0
```

**Expected Output**
```text
0 -1 -1 -1
```

#### Test Case 9

**Input**
```text
3 2 0
0 1 2
0 1 5
```

**Expected Output**
```text
0 2 -1
```

#### Test Case 10

**Input**
```text
5 3 0
0 1 10
0 2 1
2 1 1
```

**Expected Output**
```text
0 2 1 -1 -1
```


## Question 239 — Topological Order — Variant 2
**Difficulty:** Hard

### Problem Statement
Schedule all vertices so every directed edge points forward. When several vertices are available, choose the smallest index.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v` meaning `u` must precede `v`.

### Output Format
Print the lexicographically smallest valid topological ordering, or `IMPOSSIBLE` if a cycle exists.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Output**
```text
0 1 2 3
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 1 2 3`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
IMPOSSIBLE
```

**Explanation**
In the second graph, the same definition gives `IMPOSSIBLE`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 3

**Input**
```text
3 2
0 2
1 2
```

**Expected Output**
```text
0 1 2
```

#### Test Case 4

**Input**
```text
4 2
2 3
0 1
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 5

**Input**
```text
1 0
```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
5 4
0 2
1 2
2 3
2 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 7

**Input**
```text
4 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 8

**Input**
```text
2 1
1 0
```

**Expected Output**
```text
1 0
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 10

**Input**
```text
4 3
0 2
1 2
2 3
```

**Expected Output**
```text
0 1 2 3
```


## Question 240 — MST — Variant 2
**Difficulty:** Hard

### Problem Statement
Connect every vertex with minimum total edge weight and no cycle.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected weighted edge `u v w`. The graph is connected.

### Output Format
Print the total weight of a minimum spanning tree.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Output**
```text
4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `4`.

### Worked Example 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Output**
```text
7
```

**Explanation**
In the second graph, the same definition gives `7`.

### Test Cases

#### Test Case 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
1 0

```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4 3
0 1 1
1 2 2
2 3 3
```

**Expected Output**
```text
6
```

#### Test Case 5

**Input**
```text
5 7
0 1 2
0 2 5
1 2 1
1 3 4
2 3 2
2 4 3
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 6
0 1 1
0 2 1
0 3 1
1 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3 3
0 1 0
1 2 0
0 2 5
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4 4
0 1 9
1 2 8
2 3 7
0 3 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
5 6
0 1 4
0 2 3
1 2 2
1 3 6
2 4 5
3 4 1
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
4 4
0 1 3
1 2 4
2 3 1
0 3 10
```

**Expected Output**
```text
8
```


## Question 241 — SCC — Variant 2
**Difficulty:** Hard

### Problem Statement
Count maximal sets of vertices where every vertex can reach every other vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print the number of strongly connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4 4
0 1
1 0
2 3
3 2
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
5 5
0 1
1 2
2 3
3 1
3 4
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
1 0
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
4 5
0 1
1 2
2 0
2 3
3 2
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
6 6
0 1
1 2
2 0
3 4
4 5
5 3
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
5 7
0 1
1 0
1 2
2 3
3 2
3 4
4 3
```

**Expected Output**
```text
2
```


## Question 242 — Cycle Detection — Variant 2
**Difficulty:** Hard

### Problem Statement
Detect whether following directed edges can return to a previously active vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if the directed graph contains a cycle, otherwise `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
NO
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `NO`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
YES
```

**Explanation**
In the second graph, the same definition gives `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
4 4
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1 0
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
2 1
0 1
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
3 2
0 2
2 1
```

**Expected Output**
```text
NO
```


## Question 243 — Reachability — Variant 2
**Difficulty:** Hard+

### Problem Statement
Determine whether a directed path exists from source `s` to target `t`.

### Input Format
The first line contains `n m s t`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if `t` is reachable from `s`; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 0 0 0
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 4 3 0
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
3 2 2 0
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 1 0 4
0 4
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 2 1 3
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 1 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4 2 0 3
0 2
2 3
```

**Expected Output**
```text
YES
```


## Question 244 — DAG Longest Path — Variant 2
**Difficulty:** Hard+

### Problem Statement
In a directed acyclic graph, find the maximum total edge weight of any path starting from source `s`.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains a directed weighted edge `u v w`. The graph is a DAG.

### Output Format
Print the maximum path weight starting at `s`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Output**
```text
12
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `12`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
11
```

**Explanation**
In the second graph, the same definition gives `11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
11
```

#### Test Case 3

**Input**
```text
4 4 0
0 1 1
0 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
1 0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 5
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 3 0
0 1 10
1 2 1
0 2 5
```

**Expected Output**
```text
11
```

#### Test Case 7

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
5 5 0
0 1 7
0 2 2
2 3 8
1 4 1
3 4 3
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
4 2 1
1 2 5
2 3 6
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
6 5 0
0 1 1
1 2 2
0 3 4
3 4 5
4 5 6
```

**Expected Output**
```text
15
```


## Question 245 — DSU Connectivity — Variant 2
**Difficulty:** Hard+

### Problem Statement
Process the undirected edges as unions and determine whether two requested vertices belong to the same component.

### Input Format
The first line contains `n m s t`. The next `m` lines contain undirected edges `u v`.

### Output Format
Print `YES` if `s` and `t` are connected after all edges are added; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 0 1
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 3 0 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 3 0 2
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
3 0 0 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 3 3 4
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 0 3
0 1
1 3
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
6 3 4 5
0 1
2 3
4 5
```

**Expected Output**
```text
YES
```


## Question 246 — Components — Variant 3
**Difficulty:** Hard+

### Problem Statement
Given an undirected graph, count its connected components.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print the number of connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 0
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 0
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
6 2
0 1
2 3
```

**Expected Output**
```text
4
```

#### Test Case 4

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
7 3
0 1
1 2
4 5
```

**Expected Output**
```text
4
```

#### Test Case 6

**Input**
```text
5 3
0 4
1 2
2 3
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
8 4
0 1
2 3
4 5
6 7
```

**Expected Output**
```text
4
```

#### Test Case 8

**Input**
```text
3 1
0 2
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
5 1
0 1
```

**Expected Output**
```text
4
```


## Question 247 — Bipartite — Variant 3
**Difficulty:** Hard+

### Problem Statement
Determine whether vertices can be split into two groups so every edge crosses between the groups.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print `YES` if the graph is bipartite; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
4 4
0 1
0 2
0 3
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
6 5
0 1
1 2
2 3
3 4
4 5
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
YES
```


## Question 248 — Shortest Path — Variant 3
**Difficulty:** Hard+

### Problem Statement
Compute single-source shortest paths in a directed graph with non-negative edge weights.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains directed edge `u v w` with non-negative weight `w`.

### Output Format
Print `n` shortest distances from source `s`; print `-1` for unreachable vertices.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Output**
```text
0 3 1 4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 3 1 4`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
0 5 11
```

**Explanation**
In the second graph, the same definition gives `0 5 11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Expected Output**
```text
0 3 1 4
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
0 5 11
```

#### Test Case 3

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 10
2 3 1
```

**Expected Output**
```text
0 2 5 6 -1
```

#### Test Case 4

**Input**
```text
4 2 1
1 2 5
2 3 2
```

**Expected Output**
```text
-1 0 5 7
```

#### Test Case 5

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 6

**Input**
```text
5 4 2
2 0 7
2 1 2
1 3 3
3 4 1
```

**Expected Output**
```text
7 2 0 5 6
```

#### Test Case 7

**Input**
```text
4 3 3
3 0 1
0 1 1
1 2 1
```

**Expected Output**
```text
1 2 3 0
```

#### Test Case 8

**Input**
```text
4 0 0
```

**Expected Output**
```text
0 -1 -1 -1
```

#### Test Case 9

**Input**
```text
3 2 0
0 1 2
0 1 5
```

**Expected Output**
```text
0 2 -1
```

#### Test Case 10

**Input**
```text
5 3 0
0 1 10
0 2 1
2 1 1
```

**Expected Output**
```text
0 2 1 -1 -1
```


## Question 249 — Topological Order — Variant 3
**Difficulty:** Hard+

### Problem Statement
Schedule all vertices so every directed edge points forward. When several vertices are available, choose the smallest index.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v` meaning `u` must precede `v`.

### Output Format
Print the lexicographically smallest valid topological ordering, or `IMPOSSIBLE` if a cycle exists.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Output**
```text
0 1 2 3
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 1 2 3`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
IMPOSSIBLE
```

**Explanation**
In the second graph, the same definition gives `IMPOSSIBLE`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 3

**Input**
```text
3 2
0 2
1 2
```

**Expected Output**
```text
0 1 2
```

#### Test Case 4

**Input**
```text
4 2
2 3
0 1
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 5

**Input**
```text
1 0
```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
5 4
0 2
1 2
2 3
2 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 7

**Input**
```text
4 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 8

**Input**
```text
2 1
1 0
```

**Expected Output**
```text
1 0
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 10

**Input**
```text
4 3
0 2
1 2
2 3
```

**Expected Output**
```text
0 1 2 3
```


## Question 250 — MST — Variant 3
**Difficulty:** Hard+

### Problem Statement
Connect every vertex with minimum total edge weight and no cycle.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected weighted edge `u v w`. The graph is connected.

### Output Format
Print the total weight of a minimum spanning tree.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Output**
```text
4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `4`.

### Worked Example 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Output**
```text
7
```

**Explanation**
In the second graph, the same definition gives `7`.

### Test Cases

#### Test Case 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
1 0

```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4 3
0 1 1
1 2 2
2 3 3
```

**Expected Output**
```text
6
```

#### Test Case 5

**Input**
```text
5 7
0 1 2
0 2 5
1 2 1
1 3 4
2 3 2
2 4 3
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 6
0 1 1
0 2 1
0 3 1
1 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3 3
0 1 0
1 2 0
0 2 5
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4 4
0 1 9
1 2 8
2 3 7
0 3 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
5 6
0 1 4
0 2 3
1 2 2
1 3 6
2 4 5
3 4 1
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
4 4
0 1 3
1 2 4
2 3 1
0 3 10
```

**Expected Output**
```text
8
```


## Question 251 — SCC — Variant 3
**Difficulty:** Hard+

### Problem Statement
Count maximal sets of vertices where every vertex can reach every other vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print the number of strongly connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4 4
0 1
1 0
2 3
3 2
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
5 5
0 1
1 2
2 3
3 1
3 4
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
1 0
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
4 5
0 1
1 2
2 0
2 3
3 2
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
6 6
0 1
1 2
2 0
3 4
4 5
5 3
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
5 7
0 1
1 0
1 2
2 3
3 2
3 4
4 3
```

**Expected Output**
```text
2
```


## Question 252 — Cycle Detection — Variant 3
**Difficulty:** Hard+

### Problem Statement
Detect whether following directed edges can return to a previously active vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if the directed graph contains a cycle, otherwise `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
NO
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `NO`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
YES
```

**Explanation**
In the second graph, the same definition gives `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
4 4
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1 0
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
2 1
0 1
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
3 2
0 2
2 1
```

**Expected Output**
```text
NO
```


## Question 253 — Reachability — Variant 3
**Difficulty:** Hard+

### Problem Statement
Determine whether a directed path exists from source `s` to target `t`.

### Input Format
The first line contains `n m s t`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if `t` is reachable from `s`; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 0 0 0
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 4 3 0
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
3 2 2 0
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 1 0 4
0 4
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 2 1 3
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 1 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4 2 0 3
0 2
2 3
```

**Expected Output**
```text
YES
```


## Question 254 — DAG Longest Path — Variant 3
**Difficulty:** Hard+

### Problem Statement
In a directed acyclic graph, find the maximum total edge weight of any path starting from source `s`.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains a directed weighted edge `u v w`. The graph is a DAG.

### Output Format
Print the maximum path weight starting at `s`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Output**
```text
12
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `12`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
11
```

**Explanation**
In the second graph, the same definition gives `11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
11
```

#### Test Case 3

**Input**
```text
4 4 0
0 1 1
0 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
1 0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 5
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 3 0
0 1 10
1 2 1
0 2 5
```

**Expected Output**
```text
11
```

#### Test Case 7

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
5 5 0
0 1 7
0 2 2
2 3 8
1 4 1
3 4 3
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
4 2 1
1 2 5
2 3 6
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
6 5 0
0 1 1
1 2 2
0 3 4
3 4 5
4 5 6
```

**Expected Output**
```text
15
```


## Question 255 — DSU Connectivity — Variant 3
**Difficulty:** Hard+

### Problem Statement
Process the undirected edges as unions and determine whether two requested vertices belong to the same component.

### Input Format
The first line contains `n m s t`. The next `m` lines contain undirected edges `u v`.

### Output Format
Print `YES` if `s` and `t` are connected after all edges are added; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 0 1
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 3 0 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 3 0 2
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
3 0 0 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 3 3 4
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 0 3
0 1
1 3
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
6 3 4 5
0 1
2 3
4 5
```

**Expected Output**
```text
YES
```


## Question 256 — Components — Variant 4
**Difficulty:** Hard+

### Problem Statement
Given an undirected graph, count its connected components.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print the number of connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 0
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 0
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
6 2
0 1
2 3
```

**Expected Output**
```text
4
```

#### Test Case 4

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
7 3
0 1
1 2
4 5
```

**Expected Output**
```text
4
```

#### Test Case 6

**Input**
```text
5 3
0 4
1 2
2 3
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
8 4
0 1
2 3
4 5
6 7
```

**Expected Output**
```text
4
```

#### Test Case 8

**Input**
```text
3 1
0 2
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
6 1
0 1
```

**Expected Output**
```text
5
```


## Question 257 — Bipartite — Variant 4
**Difficulty:** Hard+

### Problem Statement
Determine whether vertices can be split into two groups so every edge crosses between the groups.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print `YES` if the graph is bipartite; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
4 4
0 1
0 2
0 3
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
6 5
0 1
1 2
2 3
3 4
4 5
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
YES
```


## Question 258 — Shortest Path — Variant 4
**Difficulty:** Hard+

### Problem Statement
Compute single-source shortest paths in a directed graph with non-negative edge weights.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains directed edge `u v w` with non-negative weight `w`.

### Output Format
Print `n` shortest distances from source `s`; print `-1` for unreachable vertices.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Output**
```text
0 3 1 4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 3 1 4`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
0 5 11
```

**Explanation**
In the second graph, the same definition gives `0 5 11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Expected Output**
```text
0 3 1 4
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
0 5 11
```

#### Test Case 3

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 10
2 3 1
```

**Expected Output**
```text
0 2 5 6 -1
```

#### Test Case 4

**Input**
```text
4 2 1
1 2 5
2 3 2
```

**Expected Output**
```text
-1 0 5 7
```

#### Test Case 5

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 6

**Input**
```text
5 4 2
2 0 7
2 1 2
1 3 3
3 4 1
```

**Expected Output**
```text
7 2 0 5 6
```

#### Test Case 7

**Input**
```text
4 3 3
3 0 1
0 1 1
1 2 1
```

**Expected Output**
```text
1 2 3 0
```

#### Test Case 8

**Input**
```text
4 0 0
```

**Expected Output**
```text
0 -1 -1 -1
```

#### Test Case 9

**Input**
```text
3 2 0
0 1 2
0 1 5
```

**Expected Output**
```text
0 2 -1
```

#### Test Case 10

**Input**
```text
5 3 0
0 1 10
0 2 1
2 1 1
```

**Expected Output**
```text
0 2 1 -1 -1
```


## Question 259 — Topological Order — Variant 4
**Difficulty:** Hard+

### Problem Statement
Schedule all vertices so every directed edge points forward. When several vertices are available, choose the smallest index.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v` meaning `u` must precede `v`.

### Output Format
Print the lexicographically smallest valid topological ordering, or `IMPOSSIBLE` if a cycle exists.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Output**
```text
0 1 2 3
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 1 2 3`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
IMPOSSIBLE
```

**Explanation**
In the second graph, the same definition gives `IMPOSSIBLE`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 3

**Input**
```text
3 2
0 2
1 2
```

**Expected Output**
```text
0 1 2
```

#### Test Case 4

**Input**
```text
4 2
2 3
0 1
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 5

**Input**
```text
1 0
```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
5 4
0 2
1 2
2 3
2 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 7

**Input**
```text
4 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 8

**Input**
```text
2 1
1 0
```

**Expected Output**
```text
1 0
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 10

**Input**
```text
4 3
0 2
1 2
2 3
```

**Expected Output**
```text
0 1 2 3
```


## Question 260 — MST — Variant 4
**Difficulty:** Hard+

### Problem Statement
Connect every vertex with minimum total edge weight and no cycle.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected weighted edge `u v w`. The graph is connected.

### Output Format
Print the total weight of a minimum spanning tree.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Output**
```text
4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `4`.

### Worked Example 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Output**
```text
7
```

**Explanation**
In the second graph, the same definition gives `7`.

### Test Cases

#### Test Case 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
1 0

```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4 3
0 1 1
1 2 2
2 3 3
```

**Expected Output**
```text
6
```

#### Test Case 5

**Input**
```text
5 7
0 1 2
0 2 5
1 2 1
1 3 4
2 3 2
2 4 3
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 6
0 1 1
0 2 1
0 3 1
1 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3 3
0 1 0
1 2 0
0 2 5
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4 4
0 1 9
1 2 8
2 3 7
0 3 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
5 6
0 1 4
0 2 3
1 2 2
1 3 6
2 4 5
3 4 1
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
4 4
0 1 3
1 2 4
2 3 1
0 3 10
```

**Expected Output**
```text
8
```


## Question 261 — SCC — Variant 4
**Difficulty:** Hard+

### Problem Statement
Count maximal sets of vertices where every vertex can reach every other vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print the number of strongly connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4 4
0 1
1 0
2 3
3 2
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
5 5
0 1
1 2
2 3
3 1
3 4
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
1 0
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
4 5
0 1
1 2
2 0
2 3
3 2
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
6 6
0 1
1 2
2 0
3 4
4 5
5 3
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
5 7
0 1
1 0
1 2
2 3
3 2
3 4
4 3
```

**Expected Output**
```text
2
```


## Question 262 — Cycle Detection — Variant 4
**Difficulty:** Hard+

### Problem Statement
Detect whether following directed edges can return to a previously active vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if the directed graph contains a cycle, otherwise `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
NO
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `NO`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
YES
```

**Explanation**
In the second graph, the same definition gives `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
4 4
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1 0
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
2 1
0 1
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
3 2
0 2
2 1
```

**Expected Output**
```text
NO
```


## Question 263 — Reachability — Variant 4
**Difficulty:** Hard+

### Problem Statement
Determine whether a directed path exists from source `s` to target `t`.

### Input Format
The first line contains `n m s t`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if `t` is reachable from `s`; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 0 0 0
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 4 3 0
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
3 2 2 0
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 1 0 4
0 4
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 2 1 3
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 1 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4 2 0 3
0 2
2 3
```

**Expected Output**
```text
YES
```


## Question 264 — DAG Longest Path — Variant 4
**Difficulty:** Hard+

### Problem Statement
In a directed acyclic graph, find the maximum total edge weight of any path starting from source `s`.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains a directed weighted edge `u v w`. The graph is a DAG.

### Output Format
Print the maximum path weight starting at `s`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Output**
```text
12
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `12`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
11
```

**Explanation**
In the second graph, the same definition gives `11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
11
```

#### Test Case 3

**Input**
```text
4 4 0
0 1 1
0 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
1 0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 5
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 3 0
0 1 10
1 2 1
0 2 5
```

**Expected Output**
```text
11
```

#### Test Case 7

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
5 5 0
0 1 7
0 2 2
2 3 8
1 4 1
3 4 3
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
4 2 1
1 2 5
2 3 6
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
6 5 0
0 1 1
1 2 2
0 3 4
3 4 5
4 5 6
```

**Expected Output**
```text
15
```


## Question 265 — DSU Connectivity — Variant 4
**Difficulty:** Hard+

### Problem Statement
Process the undirected edges as unions and determine whether two requested vertices belong to the same component.

### Input Format
The first line contains `n m s t`. The next `m` lines contain undirected edges `u v`.

### Output Format
Print `YES` if `s` and `t` are connected after all edges are added; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 0 1
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 3 0 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 3 0 2
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
3 0 0 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 3 3 4
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 0 3
0 1
1 3
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
6 3 4 5
0 1
2 3
4 5
```

**Expected Output**
```text
YES
```



# Belt 8 — Red Belt
**Difficulty:** Hard

## Subdivision — Trees

## Question 266 — Height — Variant 1
**Difficulty:** Hard

### Problem Statement
Find the number of nodes on the longest root-to-leaf path.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the height of the binary tree.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Output**
```text
3
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `3`.

### Worked Example 2

**Input**
```text
1
1
```

**Output**
```text
1
```

**Explanation**
The second tree follows the same representation and produces `1`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3
```

#### Test Case 4

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
3
```


## Question 267 — Leaf Count — Variant 1
**Difficulty:** Hard

### Problem Statement
Count nodes with no non-null children.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the number of leaf nodes.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
1
1
```

**Output**
```text
1
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `1`.

### Worked Example 2

**Input**
```text
4
1 2 -1 3
```

**Output**
```text
1
```

**Explanation**
The second tree follows the same representation and produces `1`.

### Test Cases

#### Test Case 1

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 2

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
4
```

#### Test Case 4

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
4
```

#### Test Case 8

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
4
```

#### Test Case 10

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
3
```


## Question 268 — Balance — Variant 1
**Difficulty:** Hard

### Problem Statement
A binary tree is balanced when every node's left and right subtree heights differ by at most one.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `YES` if the tree is height-balanced, otherwise `NO`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 -1 3
```

**Output**
```text
NO
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `NO`.

### Worked Example 2

**Input**
```text
7
1 2 3 4 5 6 7
```

**Output**
```text
YES
```

**Explanation**
The second tree follows the same representation and produces `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
NO
```

#### Test Case 4

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
1
1
```

**Expected Output**
```text
YES
```


## Question 269 — Preorder — Variant 1
**Difficulty:** Hard

### Problem Statement
Traverse the tree using preorder order.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the preorder traversal.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 4 5 6 7
```

**Output**
```text
1 2 4 5 3 6 7
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `1 2 4 5 3 6 7`.

### Worked Example 2

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Output**
```text
10 20 15 25
```

**Explanation**
The second tree follows the same representation and produces `10 20 15 25`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
1 2 4 5 3 6 7
```

#### Test Case 2

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
10 20 15 25
```

#### Test Case 3

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
1 2 4 3 5
```

#### Test Case 4

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
5 4 3 6 7
```

#### Test Case 5

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
1 2 3 4 2 4 3
```

#### Test Case 6

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
8 3 1 6 10 14
```

#### Test Case 7

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
5 3 2 4 7 6 8
```

#### Test Case 8

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
1 2 4 5 3 7
```

#### Test Case 9

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
1 2 3
```


## Question 270 — Inorder — Variant 1
**Difficulty:** Hard

### Problem Statement
Traverse the tree using inorder order.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the inorder traversal.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Output**
```text
10 15 20 25
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `10 15 20 25`.

### Worked Example 2

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Output**
```text
2 4 1 3 5
```

**Explanation**
The second tree follows the same representation and produces `2 4 1 3 5`.

### Test Cases

#### Test Case 1

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
10 15 20 25
```

#### Test Case 2

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
2 4 1 3 5
```

#### Test Case 3

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
3 4 5 6 7
```

#### Test Case 4

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
3 2 4 1 4 2 3
```

#### Test Case 5

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
1 3 6 8 10 14
```

#### Test Case 6

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
2 3 4 5 6 7 8
```

#### Test Case 7

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
4 2 5 1 3 7
```

#### Test Case 8

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 10

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
4 2 5 1 6 3 7
```


## Question 271 — Postorder — Variant 1
**Difficulty:** Hard

### Problem Statement
Traverse the tree using postorder order.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the postorder traversal.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Output**
```text
4 2 5 3 1
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `4 2 5 3 1`.

### Worked Example 2

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Output**
```text
3 4 7 6 5
```

**Explanation**
The second tree follows the same representation and produces `3 4 7 6 5`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
4 2 5 3 1
```

#### Test Case 2

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
3 4 7 6 5
```

#### Test Case 3

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
3 4 2 4 3 2 1
```

#### Test Case 4

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
1 6 3 14 10 8
```

#### Test Case 5

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
2 4 3 6 8 7 5
```

#### Test Case 6

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
4 5 2 7 3 1
```

#### Test Case 7

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 9

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
4 5 2 6 7 3 1
```

#### Test Case 10

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
15 25 20 10
```


## Question 272 — Level Sum — Variant 1
**Difficulty:** Hard

### Problem Statement
Find the tree level with the largest sum of node values; ties use the smallest level.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the zero-based level with maximum sum, followed by the sum.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Output**
```text
1 10
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `1 10`.

### Worked Example 2

**Input**
```text
7
1 2 2 3 4 4 3
```

**Output**
```text
2 14
```

**Explanation**
The second tree follows the same representation and produces `2 14`.

### Test Cases

#### Test Case 1

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
1 10
```

#### Test Case 2

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
2 14
```

#### Test Case 3

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
2 21
```

#### Test Case 4

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
2 20
```

#### Test Case 5

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
2 16
```

#### Test Case 6

**Input**
```text
1
1
```

**Expected Output**
```text
0 1
```

#### Test Case 7

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
2 3
```

#### Test Case 8

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
2 22
```

#### Test Case 9

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
2 40
```

#### Test Case 10

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
2 9
```


## Question 273 — Diameter — Variant 1
**Difficulty:** Hard

### Problem Statement
Find the longest simple path between two nodes.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the diameter measured in number of nodes.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 2 3 4 4 3
```

**Output**
```text
5
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `5`.

### Worked Example 2

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Output**
```text
5
```

**Explanation**
The second tree follows the same representation and produces `5`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
5
```

#### Test Case 2

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
5
```

#### Test Case 5

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
5
```


## Question 274 — BST Validity — Variant 1
**Difficulty:** Hard

### Problem Statement
Check whether every left-subtree value is smaller and every right-subtree value is larger than its node.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `VALID` or `INVALID`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Output**
```text
VALID
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `VALID`.

### Worked Example 2

**Input**
```text
7
5 3 7 2 4 6 8
```

**Output**
```text
VALID
```

**Explanation**
The second tree follows the same representation and produces `VALID`.

### Test Cases

#### Test Case 1

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
VALID
```

#### Test Case 2

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
VALID
```

#### Test Case 3

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
INVALID
```

#### Test Case 4

**Input**
```text
1
1
```

**Expected Output**
```text
VALID
```

#### Test Case 5

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
INVALID
```

#### Test Case 6

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
INVALID
```

#### Test Case 7

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
VALID
```

#### Test Case 8

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
INVALID
```

#### Test Case 9

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
VALID
```

#### Test Case 10

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
INVALID
```


## Question 275 — BST Lower Bound — Variant 1
**Difficulty:** Hard

### Problem Statement
For each target, find the smallest tree value greater than or equal to it.

### Input Format
The first line contains `n`. The second line contains `n` values inserted into the BST. The third line contains `q`. The fourth line contains `q` query values.

### Output Format
Print one lower-bound result per query.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
5 3 7 2 4 6 8
4
-1 2 6 9
```

**Output**
```text
2
2
6
-1
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `2
2
6
-1`.

### Worked Example 2

**Input**
```text
7
1 2 3 4 5 -1 7
4
-1 2 6 9
```

**Output**
```text
1
2
7
-1
```

**Explanation**
The second tree follows the same representation and produces `1
2
7
-1`.

### Test Cases

#### Test Case 1

**Input**
```text
7
5 3 7 2 4 6 8
4
-1 2 6 9
```

**Expected Output**
```text
2
2
6
-1
```

#### Test Case 2

**Input**
```text
7
1 2 3 4 5 -1 7
4
-1 2 6 9
```

**Expected Output**
```text
1
2
7
-1
```

#### Test Case 3

**Input**
```text
1
1
4
-1 2 6 9
```

**Expected Output**
```text
1
-1
-1
-1
```

#### Test Case 4

**Input**
```text
4
1 2 -1 3
4
-1 2 6 9
```

**Expected Output**
```text
1
2
-1
-1
```

#### Test Case 5

**Input**
```text
7
1 2 3 4 5 6 7
4
-1 2 6 9
```

**Expected Output**
```text
1
2
6
-1
```

#### Test Case 6

**Input**
```text
7
10 -1 20 -1 -1 15 25
4
-1 2 6 9
```

**Expected Output**
```text
10
10
10
10
```

#### Test Case 7

**Input**
```text
7
1 2 3 -1 4 -1 5
4
-1 2 6 9
```

**Expected Output**
```text
1
2
-1
-1
```

#### Test Case 8

**Input**
```text
7
5 4 6 3 -1 -1 7
4
-1 2 6 9
```

**Expected Output**
```text
3
3
6
-1
```

#### Test Case 9

**Input**
```text
7
1 2 2 3 4 4 3
4
-1 2 6 9
```

**Expected Output**
```text
1
2
-1
-1
```

#### Test Case 10

**Input**
```text
7
8 3 10 1 6 -1 14
4
-1 2 6 9
```

**Expected Output**
```text
1
3
6
10
```


## Question 276 — Root-to-Leaf Sum — Variant 1
**Difficulty:** Hard

### Problem Statement
Determine whether a root-to-leaf path has the requested sum.

### Input Format
The first line contains `n` and the target. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `YES` if a root-to-leaf path has exactly the target sum; otherwise `NO`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7 22
1 2 3 4 5 -1 7
```

**Output**
```text
NO
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `NO`.

### Worked Example 2

**Input**
```text
1 7
1
```

**Output**
```text
NO
```

**Explanation**
The second tree follows the same representation and produces `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
7 22
1 2 3 4 5 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
1 7
1
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 6
1 2 -1 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
7 7
1 2 3 4 5 6 7
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
7 70
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
7 7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
7 25
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 8

**Input**
```text
7 7
1 2 2 3 4 4 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
7 42
8 3 10 1 6 -1 14
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
7 7
5 3 7 2 4 6 8
```

**Expected Output**
```text
NO
```


## Question 277 — Symmetry — Variant 1
**Difficulty:** Hard

### Problem Statement
Determine whether the tree mirrors itself around its root.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `YES` if the tree is symmetric, otherwise `NO`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
1
1
```

**Output**
```text
YES
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `YES`.

### Worked Example 2

**Input**
```text
4
1 2 -1 3
```

**Output**
```text
NO
```

**Explanation**
The second tree follows the same representation and produces `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
1
1
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
NO
```

#### Test Case 4

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
NO
```

#### Test Case 9

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
NO
```


## Question 278 — Zigzag — Variant 1
**Difficulty:** Hard

### Problem Statement
Traverse levels alternately from left-to-right and right-to-left.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print each zigzag level on its own line.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 -1 3
```

**Output**
```text
1
2
3
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `1
2
3`.

### Worked Example 2

**Input**
```text
7
1 2 3 4 5 6 7
```

**Output**
```text
1
3 2
4 5 6 7
```

**Explanation**
The second tree follows the same representation and produces `1
3 2
4 5 6 7`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
1
2
3
```

#### Test Case 2

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
1
3 2
4 5 6 7
```

#### Test Case 3

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
10
20
15 25
```

#### Test Case 4

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
1
3 2
4 5
```

#### Test Case 5

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
5
6 4
3 7
```

#### Test Case 6

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
1
2 2
3 4 4 3
```

#### Test Case 7

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
8
10 3
1 6 14
```

#### Test Case 8

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
5
7 3
2 4 6 8
```

#### Test Case 9

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
1
3 2
4 5 7
```

#### Test Case 10

**Input**
```text
1
1
```

**Expected Output**
```text
1
```


## Question 279 — Height — Variant 2
**Difficulty:** Hard

### Problem Statement
Find the number of nodes on the longest root-to-leaf path.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the height of the binary tree.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Output**
```text
3
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `3`.

### Worked Example 2

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Output**
```text
3
```

**Explanation**
The second tree follows the same representation and produces `3`.

### Test Cases

#### Test Case 1

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
3
```

#### Test Case 4

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
3
```


## Question 280 — Leaf Count — Variant 2
**Difficulty:** Hard

### Problem Statement
Count nodes with no non-null children.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the number of leaf nodes.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Output**
```text
2
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `2`.

### Worked Example 2

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Output**
```text
2
```

**Explanation**
The second tree follows the same representation and produces `2`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
2
```

#### Test Case 3

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
4
```

#### Test Case 4

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
4
```

#### Test Case 6

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
4
```

#### Test Case 10

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
2
```


## Question 281 — Balance — Variant 2
**Difficulty:** Hard

### Problem Statement
A binary tree is balanced when every node's left and right subtree heights differ by at most one.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `YES` if the tree is height-balanced, otherwise `NO`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Output**
```text
YES
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `YES`.

### Worked Example 2

**Input**
```text
7
1 2 2 3 4 4 3
```

**Output**
```text
YES
```

**Explanation**
The second tree follows the same representation and produces `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
1
1
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
NO
```

#### Test Case 8

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
YES
```


## Question 282 — Preorder — Variant 2
**Difficulty:** Hard

### Problem Statement
Traverse the tree using preorder order.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the preorder traversal.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 2 3 4 4 3
```

**Output**
```text
1 2 3 4 2 4 3
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `1 2 3 4 2 4 3`.

### Worked Example 2

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Output**
```text
8 3 1 6 10 14
```

**Explanation**
The second tree follows the same representation and produces `8 3 1 6 10 14`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
1 2 3 4 2 4 3
```

#### Test Case 2

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
8 3 1 6 10 14
```

#### Test Case 3

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
5 3 2 4 7 6 8
```

#### Test Case 4

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
1 2 4 5 3 7
```

#### Test Case 5

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 7

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
1 2 4 5 3 6 7
```

#### Test Case 8

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
10 20 15 25
```

#### Test Case 9

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
1 2 4 3 5
```

#### Test Case 10

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
5 4 3 6 7
```


## Question 283 — Inorder — Variant 2
**Difficulty:** Hard

### Problem Statement
Traverse the tree using inorder order.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the inorder traversal.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Output**
```text
1 3 6 8 10 14
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `1 3 6 8 10 14`.

### Worked Example 2

**Input**
```text
7
5 3 7 2 4 6 8
```

**Output**
```text
2 3 4 5 6 7 8
```

**Explanation**
The second tree follows the same representation and produces `2 3 4 5 6 7 8`.

### Test Cases

#### Test Case 1

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
1 3 6 8 10 14
```

#### Test Case 2

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
2 3 4 5 6 7 8
```

#### Test Case 3

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
4 2 5 1 3 7
```

#### Test Case 4

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 6

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
4 2 5 1 6 3 7
```

#### Test Case 7

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
10 15 20 25
```

#### Test Case 8

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
2 4 1 3 5
```

#### Test Case 9

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
3 4 5 6 7
```

#### Test Case 10

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
3 2 4 1 4 2 3
```


## Question 284 — Postorder — Variant 2
**Difficulty:** Hard

### Problem Statement
Traverse the tree using postorder order.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the postorder traversal.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
5 3 7 2 4 6 8
```

**Output**
```text
2 4 3 6 8 7 5
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `2 4 3 6 8 7 5`.

### Worked Example 2

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Output**
```text
4 5 2 7 3 1
```

**Explanation**
The second tree follows the same representation and produces `4 5 2 7 3 1`.

### Test Cases

#### Test Case 1

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
2 4 3 6 8 7 5
```

#### Test Case 2

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
4 5 2 7 3 1
```

#### Test Case 3

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 5

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
4 5 2 6 7 3 1
```

#### Test Case 6

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
15 25 20 10
```

#### Test Case 7

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
4 2 5 3 1
```

#### Test Case 8

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
3 4 7 6 5
```

#### Test Case 9

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
3 4 2 4 3 2 1
```

#### Test Case 10

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
1 6 3 14 10 8
```


## Question 285 — Level Sum — Variant 2
**Difficulty:** Hard

### Problem Statement
Find the tree level with the largest sum of node values; ties use the smallest level.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the zero-based level with maximum sum, followed by the sum.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Output**
```text
2 16
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `2 16`.

### Worked Example 2

**Input**
```text
1
1
```

**Output**
```text
0 1
```

**Explanation**
The second tree follows the same representation and produces `0 1`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
2 16
```

#### Test Case 2

**Input**
```text
1
1
```

**Expected Output**
```text
0 1
```

#### Test Case 3

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
2 3
```

#### Test Case 4

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
2 22
```

#### Test Case 5

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
2 40
```

#### Test Case 6

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
2 9
```

#### Test Case 7

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
1 10
```

#### Test Case 8

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
2 14
```

#### Test Case 9

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
2 21
```

#### Test Case 10

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
2 20
```


## Question 286 — Diameter — Variant 2
**Difficulty:** Hard

### Problem Statement
Find the longest simple path between two nodes.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the diameter measured in number of nodes.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
1
1
```

**Output**
```text
1
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `1`.

### Worked Example 2

**Input**
```text
4
1 2 -1 3
```

**Output**
```text
3
```

**Explanation**
The second tree follows the same representation and produces `3`.

### Test Cases

#### Test Case 1

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 2

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
5
```

#### Test Case 6

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
5
```

#### Test Case 7

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
5
```

#### Test Case 9

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
5
```


## Question 287 — BST Validity — Variant 2
**Difficulty:** Hard

### Problem Statement
Check whether every left-subtree value is smaller and every right-subtree value is larger than its node.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `VALID` or `INVALID`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 -1 3
```

**Output**
```text
INVALID
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `INVALID`.

### Worked Example 2

**Input**
```text
7
1 2 3 4 5 6 7
```

**Output**
```text
INVALID
```

**Explanation**
The second tree follows the same representation and produces `INVALID`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
INVALID
```

#### Test Case 2

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
INVALID
```

#### Test Case 3

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
VALID
```

#### Test Case 4

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
INVALID
```

#### Test Case 5

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
VALID
```

#### Test Case 6

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
INVALID
```

#### Test Case 7

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
VALID
```

#### Test Case 8

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
VALID
```

#### Test Case 9

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
INVALID
```

#### Test Case 10

**Input**
```text
1
1
```

**Expected Output**
```text
VALID
```


## Question 288 — BST Lower Bound — Variant 2
**Difficulty:** Hard

### Problem Statement
For each target, find the smallest tree value greater than or equal to it.

### Input Format
The first line contains `n`. The second line contains `n` values inserted into the BST. The third line contains `q`. The fourth line contains `q` query values.

### Output Format
Print one lower-bound result per query.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 4 5 6 7
4
-1 2 6 9
```

**Output**
```text
1
2
6
-1
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `1
2
6
-1`.

### Worked Example 2

**Input**
```text
7
10 -1 20 -1 -1 15 25
4
-1 2 6 9
```

**Output**
```text
10
10
10
10
```

**Explanation**
The second tree follows the same representation and produces `10
10
10
10`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 4 5 6 7
4
-1 2 6 9
```

**Expected Output**
```text
1
2
6
-1
```

#### Test Case 2

**Input**
```text
7
10 -1 20 -1 -1 15 25
4
-1 2 6 9
```

**Expected Output**
```text
10
10
10
10
```

#### Test Case 3

**Input**
```text
7
1 2 3 -1 4 -1 5
4
-1 2 6 9
```

**Expected Output**
```text
1
2
-1
-1
```

#### Test Case 4

**Input**
```text
7
5 4 6 3 -1 -1 7
4
-1 2 6 9
```

**Expected Output**
```text
3
3
6
-1
```

#### Test Case 5

**Input**
```text
7
1 2 2 3 4 4 3
4
-1 2 6 9
```

**Expected Output**
```text
1
2
-1
-1
```

#### Test Case 6

**Input**
```text
7
8 3 10 1 6 -1 14
4
-1 2 6 9
```

**Expected Output**
```text
1
3
6
10
```

#### Test Case 7

**Input**
```text
7
5 3 7 2 4 6 8
4
-1 2 6 9
```

**Expected Output**
```text
2
2
6
-1
```

#### Test Case 8

**Input**
```text
7
1 2 3 4 5 -1 7
4
-1 2 6 9
```

**Expected Output**
```text
1
2
7
-1
```

#### Test Case 9

**Input**
```text
1
1
4
-1 2 6 9
```

**Expected Output**
```text
1
-1
-1
-1
```

#### Test Case 10

**Input**
```text
4
1 2 -1 3
4
-1 2 6 9
```

**Expected Output**
```text
1
2
-1
-1
```


## Question 289 — Root-to-Leaf Sum — Variant 2
**Difficulty:** Hard

### Problem Statement
Determine whether a root-to-leaf path has the requested sum.

### Input Format
The first line contains `n` and the target. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `YES` if a root-to-leaf path has exactly the target sum; otherwise `NO`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7 70
10 -1 20 -1 -1 15 25
```

**Output**
```text
NO
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `NO`.

### Worked Example 2

**Input**
```text
7 7
1 2 3 -1 4 -1 5
```

**Output**
```text
YES
```

**Explanation**
The second tree follows the same representation and produces `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
7 70
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
7 7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
7 25
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 4

**Input**
```text
7 7
1 2 2 3 4 4 3
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
7 42
8 3 10 1 6 -1 14
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
7 7
5 3 7 2 4 6 8
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
7 22
1 2 3 4 5 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 8

**Input**
```text
1 7
1
```

**Expected Output**
```text
NO
```

#### Test Case 9

**Input**
```text
4 6
1 2 -1 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
7 7
1 2 3 4 5 6 7
```

**Expected Output**
```text
YES
```


## Question 290 — Symmetry — Variant 2
**Difficulty:** Hard

### Problem Statement
Determine whether the tree mirrors itself around its root.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `YES` if the tree is symmetric, otherwise `NO`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Output**
```text
NO
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `NO`.

### Worked Example 2

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Output**
```text
NO
```

**Explanation**
The second tree follows the same representation and produces `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
1
1
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
NO
```

#### Test Case 9

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
NO
```


## Question 291 — Zigzag — Variant 2
**Difficulty:** Hard

### Problem Statement
Traverse levels alternately from left-to-right and right-to-left.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print each zigzag level on its own line.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Output**
```text
5
6 4
3 7
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `5
6 4
3 7`.

### Worked Example 2

**Input**
```text
7
1 2 2 3 4 4 3
```

**Output**
```text
1
2 2
3 4 4 3
```

**Explanation**
The second tree follows the same representation and produces `1
2 2
3 4 4 3`.

### Test Cases

#### Test Case 1

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
5
6 4
3 7
```

#### Test Case 2

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
1
2 2
3 4 4 3
```

#### Test Case 3

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
8
10 3
1 6 14
```

#### Test Case 4

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
5
7 3
2 4 6 8
```

#### Test Case 5

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
1
3 2
4 5 7
```

#### Test Case 6

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
1
2
3
```

#### Test Case 8

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
1
3 2
4 5 6 7
```

#### Test Case 9

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
10
20
15 25
```

#### Test Case 10

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
1
3 2
4 5
```


## Question 292 — Height — Variant 3
**Difficulty:** Hard

### Problem Statement
Find the number of nodes on the longest root-to-leaf path.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the height of the binary tree.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Output**
```text
3
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `3`.

### Worked Example 2

**Input**
```text
7
5 3 7 2 4 6 8
```

**Output**
```text
3
```

**Explanation**
The second tree follows the same representation and produces `3`.

### Test Cases

#### Test Case 1

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
3
```

#### Test Case 4

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
3
```


## Question 293 — Leaf Count — Variant 3
**Difficulty:** Hard

### Problem Statement
Count nodes with no non-null children.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the number of leaf nodes.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
5 3 7 2 4 6 8
```

**Output**
```text
4
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `4`.

### Worked Example 2

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Output**
```text
3
```

**Explanation**
The second tree follows the same representation and produces `3`.

### Test Cases

#### Test Case 1

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
4
```

#### Test Case 6

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
4
```

#### Test Case 10

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
3
```


## Question 294 — Balance — Variant 3
**Difficulty:** Hard

### Problem Statement
A binary tree is balanced when every node's left and right subtree heights differ by at most one.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `YES` if the tree is height-balanced, otherwise `NO`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Output**
```text
YES
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `YES`.

### Worked Example 2

**Input**
```text
1
1
```

**Output**
```text
YES
```

**Explanation**
The second tree follows the same representation and produces `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
1
1
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
NO
```

#### Test Case 4

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
YES
```


## Question 295 — Preorder — Variant 3
**Difficulty:** Hard+

### Problem Statement
Traverse the tree using preorder order.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the preorder traversal.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
1
1
```

**Output**
```text
1
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `1`.

### Worked Example 2

**Input**
```text
4
1 2 -1 3
```

**Output**
```text
1 2 3
```

**Explanation**
The second tree follows the same representation and produces `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 2

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
1 2 4 5 3 6 7
```

#### Test Case 4

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
10 20 15 25
```

#### Test Case 5

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
1 2 4 3 5
```

#### Test Case 6

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
5 4 3 6 7
```

#### Test Case 7

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
1 2 3 4 2 4 3
```

#### Test Case 8

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
8 3 1 6 10 14
```

#### Test Case 9

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
5 3 2 4 7 6 8
```

#### Test Case 10

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
1 2 4 5 3 7
```


## Question 296 — Inorder — Variant 3
**Difficulty:** Hard+

### Problem Statement
Traverse the tree using inorder order.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the inorder traversal.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 -1 3
```

**Output**
```text
3 2 1
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `3 2 1`.

### Worked Example 2

**Input**
```text
7
1 2 3 4 5 6 7
```

**Output**
```text
4 2 5 1 6 3 7
```

**Explanation**
The second tree follows the same representation and produces `4 2 5 1 6 3 7`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
4 2 5 1 6 3 7
```

#### Test Case 3

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
10 15 20 25
```

#### Test Case 4

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
2 4 1 3 5
```

#### Test Case 5

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
3 4 5 6 7
```

#### Test Case 6

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
3 2 4 1 4 2 3
```

#### Test Case 7

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
1 3 6 8 10 14
```

#### Test Case 8

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
2 3 4 5 6 7 8
```

#### Test Case 9

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
4 2 5 1 3 7
```

#### Test Case 10

**Input**
```text
1
1
```

**Expected Output**
```text
1
```


## Question 297 — Postorder — Variant 3
**Difficulty:** Hard+

### Problem Statement
Traverse the tree using postorder order.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the postorder traversal.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 4 5 6 7
```

**Output**
```text
4 5 2 6 7 3 1
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `4 5 2 6 7 3 1`.

### Worked Example 2

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Output**
```text
15 25 20 10
```

**Explanation**
The second tree follows the same representation and produces `15 25 20 10`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
4 5 2 6 7 3 1
```

#### Test Case 2

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
15 25 20 10
```

#### Test Case 3

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
4 2 5 3 1
```

#### Test Case 4

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
3 4 7 6 5
```

#### Test Case 5

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
3 4 2 4 3 2 1
```

#### Test Case 6

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
1 6 3 14 10 8
```

#### Test Case 7

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
2 4 3 6 8 7 5
```

#### Test Case 8

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
4 5 2 7 3 1
```

#### Test Case 9

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3 2 1
```


## Question 298 — Level Sum — Variant 3
**Difficulty:** Hard+

### Problem Statement
Find the tree level with the largest sum of node values; ties use the smallest level.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the zero-based level with maximum sum, followed by the sum.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Output**
```text
2 40
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `2 40`.

### Worked Example 2

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Output**
```text
2 9
```

**Explanation**
The second tree follows the same representation and produces `2 9`.

### Test Cases

#### Test Case 1

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
2 40
```

#### Test Case 2

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
2 9
```

#### Test Case 3

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
1 10
```

#### Test Case 4

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
2 14
```

#### Test Case 5

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
2 21
```

#### Test Case 6

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
2 20
```

#### Test Case 7

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
2 16
```

#### Test Case 8

**Input**
```text
1
1
```

**Expected Output**
```text
0 1
```

#### Test Case 9

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
2 3
```

#### Test Case 10

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
2 22
```


## Question 299 — Diameter — Variant 3
**Difficulty:** Hard+

### Problem Statement
Find the longest simple path between two nodes.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the diameter measured in number of nodes.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Output**
```text
5
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `5`.

### Worked Example 2

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Output**
```text
5
```

**Explanation**
The second tree follows the same representation and produces `5`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
5
```

#### Test Case 2

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
5
```

#### Test Case 5

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
5
```

#### Test Case 6

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
5
```

#### Test Case 7

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
3
```


## Question 300 — BST Validity — Variant 3
**Difficulty:** Hard+

### Problem Statement
Check whether every left-subtree value is smaller and every right-subtree value is larger than its node.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `VALID` or `INVALID`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Output**
```text
VALID
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `VALID`.

### Worked Example 2

**Input**
```text
7
1 2 2 3 4 4 3
```

**Output**
```text
INVALID
```

**Explanation**
The second tree follows the same representation and produces `INVALID`.

### Test Cases

#### Test Case 1

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
VALID
```

#### Test Case 2

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
INVALID
```

#### Test Case 3

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
VALID
```

#### Test Case 4

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
VALID
```

#### Test Case 5

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
INVALID
```

#### Test Case 6

**Input**
```text
1
1
```

**Expected Output**
```text
VALID
```

#### Test Case 7

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
INVALID
```

#### Test Case 8

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
INVALID
```

#### Test Case 9

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
VALID
```

#### Test Case 10

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
INVALID
```


## Question 301 — BST Lower Bound — Variant 3
**Difficulty:** Hard+

### Problem Statement
For each target, find the smallest tree value greater than or equal to it.

### Input Format
The first line contains `n`. The second line contains `n` values inserted into the BST. The third line contains `q`. The fourth line contains `q` query values.

### Output Format
Print one lower-bound result per query.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 2 3 4 4 3
4
-1 2 6 9
```

**Output**
```text
1
2
-1
-1
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `1
2
-1
-1`.

### Worked Example 2

**Input**
```text
7
8 3 10 1 6 -1 14
4
-1 2 6 9
```

**Output**
```text
1
3
6
10
```

**Explanation**
The second tree follows the same representation and produces `1
3
6
10`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 2 3 4 4 3
4
-1 2 6 9
```

**Expected Output**
```text
1
2
-1
-1
```

#### Test Case 2

**Input**
```text
7
8 3 10 1 6 -1 14
4
-1 2 6 9
```

**Expected Output**
```text
1
3
6
10
```

#### Test Case 3

**Input**
```text
7
5 3 7 2 4 6 8
4
-1 2 6 9
```

**Expected Output**
```text
2
2
6
-1
```

#### Test Case 4

**Input**
```text
7
1 2 3 4 5 -1 7
4
-1 2 6 9
```

**Expected Output**
```text
1
2
7
-1
```

#### Test Case 5

**Input**
```text
1
1
4
-1 2 6 9
```

**Expected Output**
```text
1
-1
-1
-1
```

#### Test Case 6

**Input**
```text
4
1 2 -1 3
4
-1 2 6 9
```

**Expected Output**
```text
1
2
-1
-1
```

#### Test Case 7

**Input**
```text
7
1 2 3 4 5 6 7
4
-1 2 6 9
```

**Expected Output**
```text
1
2
6
-1
```

#### Test Case 8

**Input**
```text
7
10 -1 20 -1 -1 15 25
4
-1 2 6 9
```

**Expected Output**
```text
10
10
10
10
```

#### Test Case 9

**Input**
```text
7
1 2 3 -1 4 -1 5
4
-1 2 6 9
```

**Expected Output**
```text
1
2
-1
-1
```

#### Test Case 10

**Input**
```text
7
5 4 6 3 -1 -1 7
4
-1 2 6 9
```

**Expected Output**
```text
3
3
6
-1
```


## Question 302 — Root-to-Leaf Sum — Variant 3
**Difficulty:** Hard+

### Problem Statement
Determine whether a root-to-leaf path has the requested sum.

### Input Format
The first line contains `n` and the target. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `YES` if a root-to-leaf path has exactly the target sum; otherwise `NO`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7 42
8 3 10 1 6 -1 14
```

**Output**
```text
NO
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `NO`.

### Worked Example 2

**Input**
```text
7 7
5 3 7 2 4 6 8
```

**Output**
```text
NO
```

**Explanation**
The second tree follows the same representation and produces `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
7 42
8 3 10 1 6 -1 14
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
7 7
5 3 7 2 4 6 8
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
7 22
1 2 3 4 5 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 4

**Input**
```text
1 7
1
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
4 6
1 2 -1 3
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
7 7
1 2 3 4 5 6 7
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
7 70
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
NO
```

#### Test Case 8

**Input**
```text
7 7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
7 25
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
7 7
1 2 2 3 4 4 3
```

**Expected Output**
```text
YES
```


## Question 303 — Symmetry — Variant 3
**Difficulty:** Hard+

### Problem Statement
Determine whether the tree mirrors itself around its root.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `YES` if the tree is symmetric, otherwise `NO`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
5 3 7 2 4 6 8
```

**Output**
```text
NO
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `NO`.

### Worked Example 2

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Output**
```text
NO
```

**Explanation**
The second tree follows the same representation and produces `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
1
1
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
NO
```

#### Test Case 8

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 9

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
NO
```


## Question 304 — Zigzag — Variant 3
**Difficulty:** Hard+

### Problem Statement
Traverse levels alternately from left-to-right and right-to-left.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print each zigzag level on its own line.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Output**
```text
1
3 2
4 5 7
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `1
3 2
4 5 7`.

### Worked Example 2

**Input**
```text
1
1
```

**Output**
```text
1
```

**Explanation**
The second tree follows the same representation and produces `1`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
1
3 2
4 5 7
```

#### Test Case 2

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
1
2
3
```

#### Test Case 4

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
1
3 2
4 5 6 7
```

#### Test Case 5

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
10
20
15 25
```

#### Test Case 6

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
1
3 2
4 5
```

#### Test Case 7

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
5
6 4
3 7
```

#### Test Case 8

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
1
2 2
3 4 4 3
```

#### Test Case 9

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
8
10 3
1 6 14
```

#### Test Case 10

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
5
7 3
2 4 6 8
```


## Question 305 — Height — Variant 4
**Difficulty:** Hard+

### Problem Statement
Find the number of nodes on the longest root-to-leaf path.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the height of the binary tree.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 -1 3
```

**Output**
```text
3
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `3`.

### Worked Example 2

**Input**
```text
7
1 2 3 4 5 6 7
```

**Output**
```text
3
```

**Explanation**
The second tree follows the same representation and produces `3`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
3
```

#### Test Case 4

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
1
1
```

**Expected Output**
```text
1
```


## Question 306 — Leaf Count — Variant 4
**Difficulty:** Hard+

### Problem Statement
Count nodes with no non-null children.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the number of leaf nodes.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 4 5 6 7
```

**Output**
```text
4
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `4`.

### Worked Example 2

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Output**
```text
2
```

**Explanation**
The second tree follows the same representation and produces `2`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
2
```

#### Test Case 3

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
4
```

#### Test Case 6

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
4
```

#### Test Case 8

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
1
```


## Question 307 — Balance — Variant 4
**Difficulty:** Hard+

### Problem Statement
A binary tree is balanced when every node's left and right subtree heights differ by at most one.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `YES` if the tree is height-balanced, otherwise `NO`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Output**
```text
NO
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `NO`.

### Worked Example 2

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Output**
```text
YES
```

**Explanation**
The second tree follows the same representation and produces `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
1
1
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
YES
```


## Question 308 — Preorder — Variant 4
**Difficulty:** Hard+

### Problem Statement
Traverse the tree using preorder order.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the preorder traversal.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Output**
```text
1 2 4 3 5
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `1 2 4 3 5`.

### Worked Example 2

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Output**
```text
5 4 3 6 7
```

**Explanation**
The second tree follows the same representation and produces `5 4 3 6 7`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
1 2 4 3 5
```

#### Test Case 2

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
5 4 3 6 7
```

#### Test Case 3

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
1 2 3 4 2 4 3
```

#### Test Case 4

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
8 3 1 6 10 14
```

#### Test Case 5

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
5 3 2 4 7 6 8
```

#### Test Case 6

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
1 2 4 5 3 7
```

#### Test Case 7

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 9

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
1 2 4 5 3 6 7
```

#### Test Case 10

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
10 20 15 25
```


## Question 309 — Inorder — Variant 4
**Difficulty:** Hard+

### Problem Statement
Traverse the tree using inorder order.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the inorder traversal.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Output**
```text
3 4 5 6 7
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `3 4 5 6 7`.

### Worked Example 2

**Input**
```text
7
1 2 2 3 4 4 3
```

**Output**
```text
3 2 4 1 4 2 3
```

**Explanation**
The second tree follows the same representation and produces `3 2 4 1 4 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
3 4 5 6 7
```

#### Test Case 2

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
3 2 4 1 4 2 3
```

#### Test Case 3

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
1 3 6 8 10 14
```

#### Test Case 4

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
2 3 4 5 6 7 8
```

#### Test Case 5

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
4 2 5 1 3 7
```

#### Test Case 6

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 8

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
4 2 5 1 6 3 7
```

#### Test Case 9

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
10 15 20 25
```

#### Test Case 10

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
2 4 1 3 5
```


## Question 310 — Postorder — Variant 4
**Difficulty:** Hard+

### Problem Statement
Traverse the tree using postorder order.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the postorder traversal.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 2 3 4 4 3
```

**Output**
```text
3 4 2 4 3 2 1
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `3 4 2 4 3 2 1`.

### Worked Example 2

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Output**
```text
1 6 3 14 10 8
```

**Explanation**
The second tree follows the same representation and produces `1 6 3 14 10 8`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
3 4 2 4 3 2 1
```

#### Test Case 2

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
1 6 3 14 10 8
```

#### Test Case 3

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
2 4 3 6 8 7 5
```

#### Test Case 4

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
4 5 2 7 3 1
```

#### Test Case 5

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 7

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
4 5 2 6 7 3 1
```

#### Test Case 8

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
15 25 20 10
```

#### Test Case 9

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
4 2 5 3 1
```

#### Test Case 10

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
3 4 7 6 5
```


## Question 311 — Level Sum — Variant 4
**Difficulty:** Hard+

### Problem Statement
Find the tree level with the largest sum of node values; ties use the smallest level.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the zero-based level with maximum sum, followed by the sum.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Output**
```text
2 21
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `2 21`.

### Worked Example 2

**Input**
```text
7
5 3 7 2 4 6 8
```

**Output**
```text
2 20
```

**Explanation**
The second tree follows the same representation and produces `2 20`.

### Test Cases

#### Test Case 1

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
2 21
```

#### Test Case 2

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
2 20
```

#### Test Case 3

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
2 16
```

#### Test Case 4

**Input**
```text
1
1
```

**Expected Output**
```text
0 1
```

#### Test Case 5

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
2 3
```

#### Test Case 6

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
2 22
```

#### Test Case 7

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
2 40
```

#### Test Case 8

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
2 9
```

#### Test Case 9

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
1 10
```

#### Test Case 10

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
2 14
```


## Question 312 — Diameter — Variant 4
**Difficulty:** Hard+

### Problem Statement
Find the longest simple path between two nodes.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the diameter measured in number of nodes.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
5 3 7 2 4 6 8
```

**Output**
```text
5
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `5`.

### Worked Example 2

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Output**
```text
5
```

**Explanation**
The second tree follows the same representation and produces `5`.

### Test Cases

#### Test Case 1

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
5
```

#### Test Case 2

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
5
```

#### Test Case 6

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
5
```

#### Test Case 9

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
5
```


## Question 313 — BST Validity — Variant 4
**Difficulty:** Hard+

### Problem Statement
Check whether every left-subtree value is smaller and every right-subtree value is larger than its node.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `VALID` or `INVALID`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Output**
```text
INVALID
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `INVALID`.

### Worked Example 2

**Input**
```text
1
1
```

**Output**
```text
VALID
```

**Explanation**
The second tree follows the same representation and produces `VALID`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
INVALID
```

#### Test Case 2

**Input**
```text
1
1
```

**Expected Output**
```text
VALID
```

#### Test Case 3

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
INVALID
```

#### Test Case 4

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
INVALID
```

#### Test Case 5

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
VALID
```

#### Test Case 6

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
INVALID
```

#### Test Case 7

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
VALID
```

#### Test Case 8

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
INVALID
```

#### Test Case 9

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
VALID
```

#### Test Case 10

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
VALID
```


## Question 314 — BST Lower Bound — Variant 4
**Difficulty:** Hard+

### Problem Statement
For each target, find the smallest tree value greater than or equal to it.

### Input Format
The first line contains `n`. The second line contains `n` values inserted into the BST. The third line contains `q`. The fourth line contains `q` query values.

### Output Format
Print one lower-bound result per query.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
1
1
4
-1 2 6 9
```

**Output**
```text
1
-1
-1
-1
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `1
-1
-1
-1`.

### Worked Example 2

**Input**
```text
4
1 2 -1 3
4
-1 2 6 9
```

**Output**
```text
1
2
-1
-1
```

**Explanation**
The second tree follows the same representation and produces `1
2
-1
-1`.

### Test Cases

#### Test Case 1

**Input**
```text
1
1
4
-1 2 6 9
```

**Expected Output**
```text
1
-1
-1
-1
```

#### Test Case 2

**Input**
```text
4
1 2 -1 3
4
-1 2 6 9
```

**Expected Output**
```text
1
2
-1
-1
```

#### Test Case 3

**Input**
```text
7
1 2 3 4 5 6 7
4
-1 2 6 9
```

**Expected Output**
```text
1
2
6
-1
```

#### Test Case 4

**Input**
```text
7
10 -1 20 -1 -1 15 25
4
-1 2 6 9
```

**Expected Output**
```text
10
10
10
10
```

#### Test Case 5

**Input**
```text
7
1 2 3 -1 4 -1 5
4
-1 2 6 9
```

**Expected Output**
```text
1
2
-1
-1
```

#### Test Case 6

**Input**
```text
7
5 4 6 3 -1 -1 7
4
-1 2 6 9
```

**Expected Output**
```text
3
3
6
-1
```

#### Test Case 7

**Input**
```text
7
1 2 2 3 4 4 3
4
-1 2 6 9
```

**Expected Output**
```text
1
2
-1
-1
```

#### Test Case 8

**Input**
```text
7
8 3 10 1 6 -1 14
4
-1 2 6 9
```

**Expected Output**
```text
1
3
6
10
```

#### Test Case 9

**Input**
```text
7
5 3 7 2 4 6 8
4
-1 2 6 9
```

**Expected Output**
```text
2
2
6
-1
```

#### Test Case 10

**Input**
```text
7
1 2 3 4 5 -1 7
4
-1 2 6 9
```

**Expected Output**
```text
1
2
7
-1
```


## Question 315 — Root-to-Leaf Sum — Variant 4
**Difficulty:** Hard+

### Problem Statement
Determine whether a root-to-leaf path has the requested sum.

### Input Format
The first line contains `n` and the target. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `YES` if a root-to-leaf path has exactly the target sum; otherwise `NO`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 6
1 2 -1 3
```

**Output**
```text
YES
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `YES`.

### Worked Example 2

**Input**
```text
7 7
1 2 3 4 5 6 7
```

**Output**
```text
YES
```

**Explanation**
The second tree follows the same representation and produces `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
4 6
1 2 -1 3
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
7 7
1 2 3 4 5 6 7
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
7 70
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
NO
```

#### Test Case 4

**Input**
```text
7 7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
7 25
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
7 7
1 2 2 3 4 4 3
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
7 42
8 3 10 1 6 -1 14
```

**Expected Output**
```text
NO
```

#### Test Case 8

**Input**
```text
7 7
5 3 7 2 4 6 8
```

**Expected Output**
```text
NO
```

#### Test Case 9

**Input**
```text
7 22
1 2 3 4 5 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
1 7
1
```

**Expected Output**
```text
NO
```


## Question 316 — Symmetry — Variant 4
**Difficulty:** Hard+

### Problem Statement
Determine whether the tree mirrors itself around its root.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `YES` if the tree is symmetric, otherwise `NO`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 4 5 6 7
```

**Output**
```text
NO
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `NO`.

### Worked Example 2

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Output**
```text
NO
```

**Explanation**
The second tree follows the same representation and produces `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
NO
```

#### Test Case 4

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
NO
```

#### Test Case 8

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 9

**Input**
```text
1
1
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
NO
```


## Question 317 — Zigzag — Variant 4
**Difficulty:** Hard+

### Problem Statement
Traverse levels alternately from left-to-right and right-to-left.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print each zigzag level on its own line.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Output**
```text
10
20
15 25
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `10
20
15 25`.

### Worked Example 2

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Output**
```text
1
3 2
4 5
```

**Explanation**
The second tree follows the same representation and produces `1
3 2
4 5`.

### Test Cases

#### Test Case 1

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
10
20
15 25
```

#### Test Case 2

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
1
3 2
4 5
```

#### Test Case 3

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
5
6 4
3 7
```

#### Test Case 4

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
1
2 2
3 4 4 3
```

#### Test Case 5

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
8
10 3
1 6 14
```

#### Test Case 6

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
5
7 3
2 4 6 8
```

#### Test Case 7

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
1
3 2
4 5 7
```

#### Test Case 8

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
1
2
3
```

#### Test Case 10

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
1
3 2
4 5 6 7
```


## Question 318 — Height — Variant 5
**Difficulty:** Hard+

### Problem Statement
Find the number of nodes on the longest root-to-leaf path.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the height of the binary tree.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Output**
```text
3
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `3`.

### Worked Example 2

**Input**
```text
7
1 2 2 3 4 4 3
```

**Output**
```text
3
```

**Explanation**
The second tree follows the same representation and produces `3`.

### Test Cases

#### Test Case 1

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
3
```

#### Test Case 4

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
3
```


## Question 319 — Leaf Count — Variant 5
**Difficulty:** Hard+

### Problem Statement
Count nodes with no non-null children.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the number of leaf nodes.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 2 3 4 4 3
```

**Output**
```text
4
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `4`.

### Worked Example 2

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Output**
```text
3
```

**Explanation**
The second tree follows the same representation and produces `3`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
4
```

#### Test Case 4

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
4
```

#### Test Case 8

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
2
```


## Question 320 — Balance — Variant 5
**Difficulty:** Hard+

### Problem Statement
A binary tree is balanced when every node's left and right subtree heights differ by at most one.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `YES` if the tree is height-balanced, otherwise `NO`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Output**
```text
YES
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `YES`.

### Worked Example 2

**Input**
```text
7
5 3 7 2 4 6 8
```

**Output**
```text
YES
```

**Explanation**
The second tree follows the same representation and produces `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1
1
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
NO
```

#### Test Case 8

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
YES
```


## Question 321 — Preorder — Variant 5
**Difficulty:** Hard+

### Problem Statement
Traverse the tree using preorder order.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the preorder traversal.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
5 3 7 2 4 6 8
```

**Output**
```text
5 3 2 4 7 6 8
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `5 3 2 4 7 6 8`.

### Worked Example 2

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Output**
```text
1 2 4 5 3 7
```

**Explanation**
The second tree follows the same representation and produces `1 2 4 5 3 7`.

### Test Cases

#### Test Case 1

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
5 3 2 4 7 6 8
```

#### Test Case 2

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
1 2 4 5 3 7
```

#### Test Case 3

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 5

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
1 2 4 5 3 6 7
```

#### Test Case 6

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
10 20 15 25
```

#### Test Case 7

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
1 2 4 3 5
```

#### Test Case 8

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
5 4 3 6 7
```

#### Test Case 9

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
1 2 3 4 2 4 3
```

#### Test Case 10

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
8 3 1 6 10 14
```


## Question 322 — Inorder — Variant 5
**Difficulty:** Hard+

### Problem Statement
Traverse the tree using inorder order.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the inorder traversal.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Output**
```text
4 2 5 1 3 7
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `4 2 5 1 3 7`.

### Worked Example 2

**Input**
```text
1
1
```

**Output**
```text
1
```

**Explanation**
The second tree follows the same representation and produces `1`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
4 2 5 1 3 7
```

#### Test Case 2

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 4

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
4 2 5 1 6 3 7
```

#### Test Case 5

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
10 15 20 25
```

#### Test Case 6

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
2 4 1 3 5
```

#### Test Case 7

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
3 4 5 6 7
```

#### Test Case 8

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
3 2 4 1 4 2 3
```

#### Test Case 9

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
1 3 6 8 10 14
```

#### Test Case 10

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
2 3 4 5 6 7 8
```


## Question 323 — Postorder — Variant 5
**Difficulty:** Hard+

### Problem Statement
Traverse the tree using postorder order.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the postorder traversal.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
1
1
```

**Output**
```text
1
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `1`.

### Worked Example 2

**Input**
```text
4
1 2 -1 3
```

**Output**
```text
3 2 1
```

**Explanation**
The second tree follows the same representation and produces `3 2 1`.

### Test Cases

#### Test Case 1

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 2

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 3

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
4 5 2 6 7 3 1
```

#### Test Case 4

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
15 25 20 10
```

#### Test Case 5

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
4 2 5 3 1
```

#### Test Case 6

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
3 4 7 6 5
```

#### Test Case 7

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
3 4 2 4 3 2 1
```

#### Test Case 8

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
1 6 3 14 10 8
```

#### Test Case 9

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
2 4 3 6 8 7 5
```

#### Test Case 10

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
4 5 2 7 3 1
```


## Question 324 — Level Sum — Variant 5
**Difficulty:** Hard+

### Problem Statement
Find the tree level with the largest sum of node values; ties use the smallest level.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the zero-based level with maximum sum, followed by the sum.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 -1 3
```

**Output**
```text
2 3
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `2 3`.

### Worked Example 2

**Input**
```text
7
1 2 3 4 5 6 7
```

**Output**
```text
2 22
```

**Explanation**
The second tree follows the same representation and produces `2 22`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
2 3
```

#### Test Case 2

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
2 22
```

#### Test Case 3

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
2 40
```

#### Test Case 4

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
2 9
```

#### Test Case 5

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
1 10
```

#### Test Case 6

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
2 14
```

#### Test Case 7

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
2 21
```

#### Test Case 8

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
2 20
```

#### Test Case 9

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
2 16
```

#### Test Case 10

**Input**
```text
1
1
```

**Expected Output**
```text
0 1
```


## Question 325 — Diameter — Variant 5
**Difficulty:** Hard+

### Problem Statement
Find the longest simple path between two nodes.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print the diameter measured in number of nodes.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 4 5 6 7
```

**Output**
```text
5
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `5`.

### Worked Example 2

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Output**
```text
3
```

**Explanation**
The second tree follows the same representation and produces `3`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
5
```

#### Test Case 2

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
5
```

#### Test Case 5

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
5
```

#### Test Case 6

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
5
```

#### Test Case 7

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
5
```

#### Test Case 9

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
3
```


## Question 326 — BST Validity — Variant 5
**Difficulty:** Hard+

### Problem Statement
Check whether every left-subtree value is smaller and every right-subtree value is larger than its node.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `VALID` or `INVALID`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Output**
```text
VALID
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `VALID`.

### Worked Example 2

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Output**
```text
INVALID
```

**Explanation**
The second tree follows the same representation and produces `INVALID`.

### Test Cases

#### Test Case 1

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
VALID
```

#### Test Case 2

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
INVALID
```

#### Test Case 3

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
VALID
```

#### Test Case 4

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
INVALID
```

#### Test Case 5

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
VALID
```

#### Test Case 6

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
VALID
```

#### Test Case 7

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
INVALID
```

#### Test Case 8

**Input**
```text
1
1
```

**Expected Output**
```text
VALID
```

#### Test Case 9

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
INVALID
```

#### Test Case 10

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
INVALID
```


## Question 327 — BST Lower Bound — Variant 5
**Difficulty:** Hard+

### Problem Statement
For each target, find the smallest tree value greater than or equal to it.

### Input Format
The first line contains `n`. The second line contains `n` values inserted into the BST. The third line contains `q`. The fourth line contains `q` query values.

### Output Format
Print one lower-bound result per query.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 3 -1 4 -1 5
4
-1 2 6 9
```

**Output**
```text
1
2
-1
-1
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `1
2
-1
-1`.

### Worked Example 2

**Input**
```text
7
5 4 6 3 -1 -1 7
4
-1 2 6 9
```

**Output**
```text
3
3
6
-1
```

**Explanation**
The second tree follows the same representation and produces `3
3
6
-1`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 3 -1 4 -1 5
4
-1 2 6 9
```

**Expected Output**
```text
1
2
-1
-1
```

#### Test Case 2

**Input**
```text
7
5 4 6 3 -1 -1 7
4
-1 2 6 9
```

**Expected Output**
```text
3
3
6
-1
```

#### Test Case 3

**Input**
```text
7
1 2 2 3 4 4 3
4
-1 2 6 9
```

**Expected Output**
```text
1
2
-1
-1
```

#### Test Case 4

**Input**
```text
7
8 3 10 1 6 -1 14
4
-1 2 6 9
```

**Expected Output**
```text
1
3
6
10
```

#### Test Case 5

**Input**
```text
7
5 3 7 2 4 6 8
4
-1 2 6 9
```

**Expected Output**
```text
2
2
6
-1
```

#### Test Case 6

**Input**
```text
7
1 2 3 4 5 -1 7
4
-1 2 6 9
```

**Expected Output**
```text
1
2
7
-1
```

#### Test Case 7

**Input**
```text
1
1
4
-1 2 6 9
```

**Expected Output**
```text
1
-1
-1
-1
```

#### Test Case 8

**Input**
```text
4
1 2 -1 3
4
-1 2 6 9
```

**Expected Output**
```text
1
2
-1
-1
```

#### Test Case 9

**Input**
```text
7
1 2 3 4 5 6 7
4
-1 2 6 9
```

**Expected Output**
```text
1
2
6
-1
```

#### Test Case 10

**Input**
```text
7
10 -1 20 -1 -1 15 25
4
-1 2 6 9
```

**Expected Output**
```text
10
10
10
10
```


## Question 328 — Root-to-Leaf Sum — Variant 5
**Difficulty:** Hard+

### Problem Statement
Determine whether a root-to-leaf path has the requested sum.

### Input Format
The first line contains `n` and the target. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `YES` if a root-to-leaf path has exactly the target sum; otherwise `NO`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7 25
5 4 6 3 -1 -1 7
```

**Output**
```text
NO
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `NO`.

### Worked Example 2

**Input**
```text
7 7
1 2 2 3 4 4 3
```

**Output**
```text
YES
```

**Explanation**
The second tree follows the same representation and produces `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
7 25
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
7 7
1 2 2 3 4 4 3
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
7 42
8 3 10 1 6 -1 14
```

**Expected Output**
```text
NO
```

#### Test Case 4

**Input**
```text
7 7
5 3 7 2 4 6 8
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
7 22
1 2 3 4 5 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
1 7
1
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
4 6
1 2 -1 3
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
7 7
1 2 3 4 5 6 7
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
7 70
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
7 7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
YES
```


## Question 329 — Symmetry — Variant 5
**Difficulty:** Hard+

### Problem Statement
Determine whether the tree mirrors itself around its root.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print `YES` if the tree is symmetric, otherwise `NO`.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
1 2 2 3 4 4 3
```

**Output**
```text
YES
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `YES`.

### Worked Example 2

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Output**
```text
NO
```

**Explanation**
The second tree follows the same representation and produces `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
NO
```

#### Test Case 4

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
1
1
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
NO
```

#### Test Case 8

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
NO
```

#### Test Case 9

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
NO
```


## Question 330 — Zigzag — Variant 5
**Difficulty:** Hard+

### Problem Statement
Traverse levels alternately from left-to-right and right-to-left.

### Input Format
The first line contains `n`. The second line contains `n` level-order values; `-1` denotes a missing node.

### Output Format
Print each zigzag level on its own line.

### Constraints
1 ≤ n ≤ 100000; node values are integers between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Output**
```text
8
10 3
1 6 14
```

**Explanation**
The tree is read in level order and the requested property is computed directly, producing `8
10 3
1 6 14`.

### Worked Example 2

**Input**
```text
7
5 3 7 2 4 6 8
```

**Output**
```text
5
7 3
2 4 6 8
```

**Explanation**
The second tree follows the same representation and produces `5
7 3
2 4 6 8`.

### Test Cases

#### Test Case 1

**Input**
```text
7
8 3 10 1 6 -1 14
```

**Expected Output**
```text
8
10 3
1 6 14
```

#### Test Case 2

**Input**
```text
7
5 3 7 2 4 6 8
```

**Expected Output**
```text
5
7 3
2 4 6 8
```

#### Test Case 3

**Input**
```text
7
1 2 3 4 5 -1 7
```

**Expected Output**
```text
1
3 2
4 5 7
```

#### Test Case 4

**Input**
```text
1
1
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
4
1 2 -1 3
```

**Expected Output**
```text
1
2
3
```

#### Test Case 6

**Input**
```text
7
1 2 3 4 5 6 7
```

**Expected Output**
```text
1
3 2
4 5 6 7
```

#### Test Case 7

**Input**
```text
7
10 -1 20 -1 -1 15 25
```

**Expected Output**
```text
10
20
15 25
```

#### Test Case 8

**Input**
```text
7
1 2 3 -1 4 -1 5
```

**Expected Output**
```text
1
3 2
4 5
```

#### Test Case 9

**Input**
```text
7
5 4 6 3 -1 -1 7
```

**Expected Output**
```text
5
6 4
3 7
```

#### Test Case 10

**Input**
```text
7
1 2 2 3 4 4 3
```

**Expected Output**
```text
1
2 2
3 4 4 3
```



# Belt 9 — Sr. Red Belt
**Difficulty:** Very Hard

## Subdivision — Graph Algorithms

## Question 331 — Components — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Given an undirected graph, count its connected components.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print the number of connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 0
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 0
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
6 2
0 1
2 3
```

**Expected Output**
```text
4
```

#### Test Case 4

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
7 3
0 1
1 2
4 5
```

**Expected Output**
```text
4
```

#### Test Case 6

**Input**
```text
5 3
0 4
1 2
2 3
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
8 4
0 1
2 3
4 5
6 7
```

**Expected Output**
```text
4
```

#### Test Case 8

**Input**
```text
3 1
0 2
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
3 1
0 1
```

**Expected Output**
```text
2
```


## Question 332 — Bipartite — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Determine whether vertices can be split into two groups so every edge crosses between the groups.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print `YES` if the graph is bipartite; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
4 4
0 1
0 2
0 3
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
6 5
0 1
1 2
2 3
3 4
4 5
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
YES
```


## Question 333 — Shortest Path — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Compute single-source shortest paths in a directed graph with non-negative edge weights.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains directed edge `u v w` with non-negative weight `w`.

### Output Format
Print `n` shortest distances from source `s`; print `-1` for unreachable vertices.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Output**
```text
0 3 1 4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 3 1 4`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
0 5 11
```

**Explanation**
In the second graph, the same definition gives `0 5 11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Expected Output**
```text
0 3 1 4
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
0 5 11
```

#### Test Case 3

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 10
2 3 1
```

**Expected Output**
```text
0 2 5 6 -1
```

#### Test Case 4

**Input**
```text
4 2 1
1 2 5
2 3 2
```

**Expected Output**
```text
-1 0 5 7
```

#### Test Case 5

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 6

**Input**
```text
5 4 2
2 0 7
2 1 2
1 3 3
3 4 1
```

**Expected Output**
```text
7 2 0 5 6
```

#### Test Case 7

**Input**
```text
4 3 3
3 0 1
0 1 1
1 2 1
```

**Expected Output**
```text
1 2 3 0
```

#### Test Case 8

**Input**
```text
4 0 0
```

**Expected Output**
```text
0 -1 -1 -1
```

#### Test Case 9

**Input**
```text
3 2 0
0 1 2
0 1 5
```

**Expected Output**
```text
0 2 -1
```

#### Test Case 10

**Input**
```text
5 3 0
0 1 10
0 2 1
2 1 1
```

**Expected Output**
```text
0 2 1 -1 -1
```


## Question 334 — Topological Order — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Schedule all vertices so every directed edge points forward. When several vertices are available, choose the smallest index.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v` meaning `u` must precede `v`.

### Output Format
Print the lexicographically smallest valid topological ordering, or `IMPOSSIBLE` if a cycle exists.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Output**
```text
0 1 2 3
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 1 2 3`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
IMPOSSIBLE
```

**Explanation**
In the second graph, the same definition gives `IMPOSSIBLE`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 3

**Input**
```text
3 2
0 2
1 2
```

**Expected Output**
```text
0 1 2
```

#### Test Case 4

**Input**
```text
4 2
2 3
0 1
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 5

**Input**
```text
1 0
```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
5 4
0 2
1 2
2 3
2 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 7

**Input**
```text
4 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 8

**Input**
```text
2 1
1 0
```

**Expected Output**
```text
1 0
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 10

**Input**
```text
4 3
0 2
1 2
2 3
```

**Expected Output**
```text
0 1 2 3
```


## Question 335 — MST — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Connect every vertex with minimum total edge weight and no cycle.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected weighted edge `u v w`. The graph is connected.

### Output Format
Print the total weight of a minimum spanning tree.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Output**
```text
4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `4`.

### Worked Example 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Output**
```text
7
```

**Explanation**
In the second graph, the same definition gives `7`.

### Test Cases

#### Test Case 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
1 0

```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4 3
0 1 1
1 2 2
2 3 3
```

**Expected Output**
```text
6
```

#### Test Case 5

**Input**
```text
5 7
0 1 2
0 2 5
1 2 1
1 3 4
2 3 2
2 4 3
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 6
0 1 1
0 2 1
0 3 1
1 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3 3
0 1 0
1 2 0
0 2 5
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4 4
0 1 9
1 2 8
2 3 7
0 3 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
5 6
0 1 4
0 2 3
1 2 2
1 3 6
2 4 5
3 4 1
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
4 4
0 1 3
1 2 4
2 3 1
0 3 10
```

**Expected Output**
```text
8
```


## Question 336 — SCC — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Count maximal sets of vertices where every vertex can reach every other vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print the number of strongly connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4 4
0 1
1 0
2 3
3 2
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
5 5
0 1
1 2
2 3
3 1
3 4
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
1 0
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
4 5
0 1
1 2
2 0
2 3
3 2
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
6 6
0 1
1 2
2 0
3 4
4 5
5 3
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
5 7
0 1
1 0
1 2
2 3
3 2
3 4
4 3
```

**Expected Output**
```text
2
```


## Question 337 — Cycle Detection — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Detect whether following directed edges can return to a previously active vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if the directed graph contains a cycle, otherwise `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
NO
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `NO`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
YES
```

**Explanation**
In the second graph, the same definition gives `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
4 4
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1 0
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
2 1
0 1
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
3 2
0 2
2 1
```

**Expected Output**
```text
NO
```


## Question 338 — Reachability — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Determine whether a directed path exists from source `s` to target `t`.

### Input Format
The first line contains `n m s t`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if `t` is reachable from `s`; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 0 0 0
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 4 3 0
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
3 2 2 0
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 1 0 4
0 4
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 2 1 3
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 1 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4 2 0 3
0 2
2 3
```

**Expected Output**
```text
YES
```


## Question 339 — DAG Longest Path — Variant 1
**Difficulty:** Very Hard

### Problem Statement
In a directed acyclic graph, find the maximum total edge weight of any path starting from source `s`.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains a directed weighted edge `u v w`. The graph is a DAG.

### Output Format
Print the maximum path weight starting at `s`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Output**
```text
12
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `12`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
11
```

**Explanation**
In the second graph, the same definition gives `11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
11
```

#### Test Case 3

**Input**
```text
4 4 0
0 1 1
0 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
1 0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 5
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 3 0
0 1 10
1 2 1
0 2 5
```

**Expected Output**
```text
11
```

#### Test Case 7

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
5 5 0
0 1 7
0 2 2
2 3 8
1 4 1
3 4 3
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
4 2 1
1 2 5
2 3 6
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
6 5 0
0 1 1
1 2 2
0 3 4
3 4 5
4 5 6
```

**Expected Output**
```text
15
```


## Question 340 — DSU Connectivity — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Process the undirected edges as unions and determine whether two requested vertices belong to the same component.

### Input Format
The first line contains `n m s t`. The next `m` lines contain undirected edges `u v`.

### Output Format
Print `YES` if `s` and `t` are connected after all edges are added; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 0 1
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 3 0 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 3 0 2
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
3 0 0 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 3 3 4
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 0 3
0 1
1 3
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
6 3 4 5
0 1
2 3
4 5
```

**Expected Output**
```text
YES
```


## Question 341 — Components — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Given an undirected graph, count its connected components.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print the number of connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 0
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 0
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
6 2
0 1
2 3
```

**Expected Output**
```text
4
```

#### Test Case 4

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
7 3
0 1
1 2
4 5
```

**Expected Output**
```text
4
```

#### Test Case 6

**Input**
```text
5 3
0 4
1 2
2 3
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
8 4
0 1
2 3
4 5
6 7
```

**Expected Output**
```text
4
```

#### Test Case 8

**Input**
```text
3 1
0 2
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
4 1
0 1
```

**Expected Output**
```text
3
```


## Question 342 — Bipartite — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Determine whether vertices can be split into two groups so every edge crosses between the groups.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print `YES` if the graph is bipartite; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
4 4
0 1
0 2
0 3
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
6 5
0 1
1 2
2 3
3 4
4 5
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
YES
```


## Question 343 — Shortest Path — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Compute single-source shortest paths in a directed graph with non-negative edge weights.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains directed edge `u v w` with non-negative weight `w`.

### Output Format
Print `n` shortest distances from source `s`; print `-1` for unreachable vertices.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Output**
```text
0 3 1 4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 3 1 4`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
0 5 11
```

**Explanation**
In the second graph, the same definition gives `0 5 11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Expected Output**
```text
0 3 1 4
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
0 5 11
```

#### Test Case 3

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 10
2 3 1
```

**Expected Output**
```text
0 2 5 6 -1
```

#### Test Case 4

**Input**
```text
4 2 1
1 2 5
2 3 2
```

**Expected Output**
```text
-1 0 5 7
```

#### Test Case 5

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 6

**Input**
```text
5 4 2
2 0 7
2 1 2
1 3 3
3 4 1
```

**Expected Output**
```text
7 2 0 5 6
```

#### Test Case 7

**Input**
```text
4 3 3
3 0 1
0 1 1
1 2 1
```

**Expected Output**
```text
1 2 3 0
```

#### Test Case 8

**Input**
```text
4 0 0
```

**Expected Output**
```text
0 -1 -1 -1
```

#### Test Case 9

**Input**
```text
3 2 0
0 1 2
0 1 5
```

**Expected Output**
```text
0 2 -1
```

#### Test Case 10

**Input**
```text
5 3 0
0 1 10
0 2 1
2 1 1
```

**Expected Output**
```text
0 2 1 -1 -1
```


## Question 344 — Topological Order — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Schedule all vertices so every directed edge points forward. When several vertices are available, choose the smallest index.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v` meaning `u` must precede `v`.

### Output Format
Print the lexicographically smallest valid topological ordering, or `IMPOSSIBLE` if a cycle exists.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Output**
```text
0 1 2 3
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 1 2 3`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
IMPOSSIBLE
```

**Explanation**
In the second graph, the same definition gives `IMPOSSIBLE`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 3

**Input**
```text
3 2
0 2
1 2
```

**Expected Output**
```text
0 1 2
```

#### Test Case 4

**Input**
```text
4 2
2 3
0 1
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 5

**Input**
```text
1 0
```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
5 4
0 2
1 2
2 3
2 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 7

**Input**
```text
4 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 8

**Input**
```text
2 1
1 0
```

**Expected Output**
```text
1 0
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 10

**Input**
```text
4 3
0 2
1 2
2 3
```

**Expected Output**
```text
0 1 2 3
```


## Question 345 — MST — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Connect every vertex with minimum total edge weight and no cycle.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected weighted edge `u v w`. The graph is connected.

### Output Format
Print the total weight of a minimum spanning tree.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Output**
```text
4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `4`.

### Worked Example 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Output**
```text
7
```

**Explanation**
In the second graph, the same definition gives `7`.

### Test Cases

#### Test Case 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
1 0

```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4 3
0 1 1
1 2 2
2 3 3
```

**Expected Output**
```text
6
```

#### Test Case 5

**Input**
```text
5 7
0 1 2
0 2 5
1 2 1
1 3 4
2 3 2
2 4 3
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 6
0 1 1
0 2 1
0 3 1
1 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3 3
0 1 0
1 2 0
0 2 5
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4 4
0 1 9
1 2 8
2 3 7
0 3 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
5 6
0 1 4
0 2 3
1 2 2
1 3 6
2 4 5
3 4 1
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
4 4
0 1 3
1 2 4
2 3 1
0 3 10
```

**Expected Output**
```text
8
```


## Question 346 — SCC — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Count maximal sets of vertices where every vertex can reach every other vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print the number of strongly connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4 4
0 1
1 0
2 3
3 2
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
5 5
0 1
1 2
2 3
3 1
3 4
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
1 0
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
4 5
0 1
1 2
2 0
2 3
3 2
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
6 6
0 1
1 2
2 0
3 4
4 5
5 3
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
5 7
0 1
1 0
1 2
2 3
3 2
3 4
4 3
```

**Expected Output**
```text
2
```


## Question 347 — Cycle Detection — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Detect whether following directed edges can return to a previously active vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if the directed graph contains a cycle, otherwise `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
NO
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `NO`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
YES
```

**Explanation**
In the second graph, the same definition gives `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
4 4
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1 0
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
2 1
0 1
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
3 2
0 2
2 1
```

**Expected Output**
```text
NO
```


## Question 348 — Reachability — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Determine whether a directed path exists from source `s` to target `t`.

### Input Format
The first line contains `n m s t`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if `t` is reachable from `s`; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 0 0 0
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 4 3 0
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
3 2 2 0
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 1 0 4
0 4
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 2 1 3
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 1 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4 2 0 3
0 2
2 3
```

**Expected Output**
```text
YES
```


## Question 349 — DAG Longest Path — Variant 2
**Difficulty:** Very Hard

### Problem Statement
In a directed acyclic graph, find the maximum total edge weight of any path starting from source `s`.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains a directed weighted edge `u v w`. The graph is a DAG.

### Output Format
Print the maximum path weight starting at `s`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Output**
```text
12
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `12`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
11
```

**Explanation**
In the second graph, the same definition gives `11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
11
```

#### Test Case 3

**Input**
```text
4 4 0
0 1 1
0 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
1 0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 5
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 3 0
0 1 10
1 2 1
0 2 5
```

**Expected Output**
```text
11
```

#### Test Case 7

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
5 5 0
0 1 7
0 2 2
2 3 8
1 4 1
3 4 3
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
4 2 1
1 2 5
2 3 6
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
6 5 0
0 1 1
1 2 2
0 3 4
3 4 5
4 5 6
```

**Expected Output**
```text
15
```


## Question 350 — DSU Connectivity — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Process the undirected edges as unions and determine whether two requested vertices belong to the same component.

### Input Format
The first line contains `n m s t`. The next `m` lines contain undirected edges `u v`.

### Output Format
Print `YES` if `s` and `t` are connected after all edges are added; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 0 1
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 3 0 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 3 0 2
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
3 0 0 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 3 3 4
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 0 3
0 1
1 3
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
6 3 4 5
0 1
2 3
4 5
```

**Expected Output**
```text
YES
```


## Question 351 — Components — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Given an undirected graph, count its connected components.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print the number of connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 0
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 0
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
6 2
0 1
2 3
```

**Expected Output**
```text
4
```

#### Test Case 4

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
7 3
0 1
1 2
4 5
```

**Expected Output**
```text
4
```

#### Test Case 6

**Input**
```text
5 3
0 4
1 2
2 3
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
8 4
0 1
2 3
4 5
6 7
```

**Expected Output**
```text
4
```

#### Test Case 8

**Input**
```text
3 1
0 2
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
5 1
0 1
```

**Expected Output**
```text
4
```


## Question 352 — Bipartite — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Determine whether vertices can be split into two groups so every edge crosses between the groups.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print `YES` if the graph is bipartite; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
4 4
0 1
0 2
0 3
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
6 5
0 1
1 2
2 3
3 4
4 5
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
YES
```


## Question 353 — Shortest Path — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Compute single-source shortest paths in a directed graph with non-negative edge weights.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains directed edge `u v w` with non-negative weight `w`.

### Output Format
Print `n` shortest distances from source `s`; print `-1` for unreachable vertices.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Output**
```text
0 3 1 4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 3 1 4`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
0 5 11
```

**Explanation**
In the second graph, the same definition gives `0 5 11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Expected Output**
```text
0 3 1 4
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
0 5 11
```

#### Test Case 3

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 10
2 3 1
```

**Expected Output**
```text
0 2 5 6 -1
```

#### Test Case 4

**Input**
```text
4 2 1
1 2 5
2 3 2
```

**Expected Output**
```text
-1 0 5 7
```

#### Test Case 5

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 6

**Input**
```text
5 4 2
2 0 7
2 1 2
1 3 3
3 4 1
```

**Expected Output**
```text
7 2 0 5 6
```

#### Test Case 7

**Input**
```text
4 3 3
3 0 1
0 1 1
1 2 1
```

**Expected Output**
```text
1 2 3 0
```

#### Test Case 8

**Input**
```text
4 0 0
```

**Expected Output**
```text
0 -1 -1 -1
```

#### Test Case 9

**Input**
```text
3 2 0
0 1 2
0 1 5
```

**Expected Output**
```text
0 2 -1
```

#### Test Case 10

**Input**
```text
5 3 0
0 1 10
0 2 1
2 1 1
```

**Expected Output**
```text
0 2 1 -1 -1
```


## Question 354 — Topological Order — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Schedule all vertices so every directed edge points forward. When several vertices are available, choose the smallest index.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v` meaning `u` must precede `v`.

### Output Format
Print the lexicographically smallest valid topological ordering, or `IMPOSSIBLE` if a cycle exists.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Output**
```text
0 1 2 3
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 1 2 3`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
IMPOSSIBLE
```

**Explanation**
In the second graph, the same definition gives `IMPOSSIBLE`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 3

**Input**
```text
3 2
0 2
1 2
```

**Expected Output**
```text
0 1 2
```

#### Test Case 4

**Input**
```text
4 2
2 3
0 1
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 5

**Input**
```text
1 0
```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
5 4
0 2
1 2
2 3
2 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 7

**Input**
```text
4 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 8

**Input**
```text
2 1
1 0
```

**Expected Output**
```text
1 0
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 10

**Input**
```text
4 3
0 2
1 2
2 3
```

**Expected Output**
```text
0 1 2 3
```


## Question 355 — MST — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Connect every vertex with minimum total edge weight and no cycle.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected weighted edge `u v w`. The graph is connected.

### Output Format
Print the total weight of a minimum spanning tree.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Output**
```text
4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `4`.

### Worked Example 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Output**
```text
7
```

**Explanation**
In the second graph, the same definition gives `7`.

### Test Cases

#### Test Case 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
1 0

```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4 3
0 1 1
1 2 2
2 3 3
```

**Expected Output**
```text
6
```

#### Test Case 5

**Input**
```text
5 7
0 1 2
0 2 5
1 2 1
1 3 4
2 3 2
2 4 3
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 6
0 1 1
0 2 1
0 3 1
1 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3 3
0 1 0
1 2 0
0 2 5
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4 4
0 1 9
1 2 8
2 3 7
0 3 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
5 6
0 1 4
0 2 3
1 2 2
1 3 6
2 4 5
3 4 1
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
4 4
0 1 3
1 2 4
2 3 1
0 3 10
```

**Expected Output**
```text
8
```


## Question 356 — SCC — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Count maximal sets of vertices where every vertex can reach every other vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print the number of strongly connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4 4
0 1
1 0
2 3
3 2
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
5 5
0 1
1 2
2 3
3 1
3 4
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
1 0
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
4 5
0 1
1 2
2 0
2 3
3 2
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
6 6
0 1
1 2
2 0
3 4
4 5
5 3
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
5 7
0 1
1 0
1 2
2 3
3 2
3 4
4 3
```

**Expected Output**
```text
2
```


## Question 357 — Cycle Detection — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Detect whether following directed edges can return to a previously active vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if the directed graph contains a cycle, otherwise `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
NO
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `NO`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
YES
```

**Explanation**
In the second graph, the same definition gives `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
4 4
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1 0
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
2 1
0 1
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
3 2
0 2
2 1
```

**Expected Output**
```text
NO
```


## Question 358 — Reachability — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Determine whether a directed path exists from source `s` to target `t`.

### Input Format
The first line contains `n m s t`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if `t` is reachable from `s`; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 0 0 0
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 4 3 0
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
3 2 2 0
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 1 0 4
0 4
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 2 1 3
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 1 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4 2 0 3
0 2
2 3
```

**Expected Output**
```text
YES
```


## Question 359 — DAG Longest Path — Variant 3
**Difficulty:** Very Hard

### Problem Statement
In a directed acyclic graph, find the maximum total edge weight of any path starting from source `s`.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains a directed weighted edge `u v w`. The graph is a DAG.

### Output Format
Print the maximum path weight starting at `s`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Output**
```text
12
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `12`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
11
```

**Explanation**
In the second graph, the same definition gives `11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
11
```

#### Test Case 3

**Input**
```text
4 4 0
0 1 1
0 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
1 0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 5
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 3 0
0 1 10
1 2 1
0 2 5
```

**Expected Output**
```text
11
```

#### Test Case 7

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
5 5 0
0 1 7
0 2 2
2 3 8
1 4 1
3 4 3
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
4 2 1
1 2 5
2 3 6
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
6 5 0
0 1 1
1 2 2
0 3 4
3 4 5
4 5 6
```

**Expected Output**
```text
15
```


## Question 360 — DSU Connectivity — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Process the undirected edges as unions and determine whether two requested vertices belong to the same component.

### Input Format
The first line contains `n m s t`. The next `m` lines contain undirected edges `u v`.

### Output Format
Print `YES` if `s` and `t` are connected after all edges are added; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 0 1
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 3 0 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 3 0 2
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
3 0 0 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 3 3 4
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 0 3
0 1
1 3
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
6 3 4 5
0 1
2 3
4 5
```

**Expected Output**
```text
YES
```


## Question 361 — Components — Variant 4
**Difficulty:** Very Hard

### Problem Statement
Given an undirected graph, count its connected components.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print the number of connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 0
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 0
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
6 2
0 1
2 3
```

**Expected Output**
```text
4
```

#### Test Case 4

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
7 3
0 1
1 2
4 5
```

**Expected Output**
```text
4
```

#### Test Case 6

**Input**
```text
5 3
0 4
1 2
2 3
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
8 4
0 1
2 3
4 5
6 7
```

**Expected Output**
```text
4
```

#### Test Case 8

**Input**
```text
3 1
0 2
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
6 1
0 1
```

**Expected Output**
```text
5
```


## Question 362 — Bipartite — Variant 4
**Difficulty:** Very Hard

### Problem Statement
Determine whether vertices can be split into two groups so every edge crosses between the groups.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print `YES` if the graph is bipartite; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
4 4
0 1
0 2
0 3
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
6 5
0 1
1 2
2 3
3 4
4 5
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
YES
```


## Question 363 — Shortest Path — Variant 4
**Difficulty:** Very Hard

### Problem Statement
Compute single-source shortest paths in a directed graph with non-negative edge weights.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains directed edge `u v w` with non-negative weight `w`.

### Output Format
Print `n` shortest distances from source `s`; print `-1` for unreachable vertices.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Output**
```text
0 3 1 4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 3 1 4`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
0 5 11
```

**Explanation**
In the second graph, the same definition gives `0 5 11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Expected Output**
```text
0 3 1 4
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
0 5 11
```

#### Test Case 3

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 10
2 3 1
```

**Expected Output**
```text
0 2 5 6 -1
```

#### Test Case 4

**Input**
```text
4 2 1
1 2 5
2 3 2
```

**Expected Output**
```text
-1 0 5 7
```

#### Test Case 5

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 6

**Input**
```text
5 4 2
2 0 7
2 1 2
1 3 3
3 4 1
```

**Expected Output**
```text
7 2 0 5 6
```

#### Test Case 7

**Input**
```text
4 3 3
3 0 1
0 1 1
1 2 1
```

**Expected Output**
```text
1 2 3 0
```

#### Test Case 8

**Input**
```text
4 0 0
```

**Expected Output**
```text
0 -1 -1 -1
```

#### Test Case 9

**Input**
```text
3 2 0
0 1 2
0 1 5
```

**Expected Output**
```text
0 2 -1
```

#### Test Case 10

**Input**
```text
5 3 0
0 1 10
0 2 1
2 1 1
```

**Expected Output**
```text
0 2 1 -1 -1
```


## Question 364 — Topological Order — Variant 4
**Difficulty:** Very Hard

### Problem Statement
Schedule all vertices so every directed edge points forward. When several vertices are available, choose the smallest index.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v` meaning `u` must precede `v`.

### Output Format
Print the lexicographically smallest valid topological ordering, or `IMPOSSIBLE` if a cycle exists.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Output**
```text
0 1 2 3
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 1 2 3`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
IMPOSSIBLE
```

**Explanation**
In the second graph, the same definition gives `IMPOSSIBLE`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 3

**Input**
```text
3 2
0 2
1 2
```

**Expected Output**
```text
0 1 2
```

#### Test Case 4

**Input**
```text
4 2
2 3
0 1
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 5

**Input**
```text
1 0
```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
5 4
0 2
1 2
2 3
2 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 7

**Input**
```text
4 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 8

**Input**
```text
2 1
1 0
```

**Expected Output**
```text
1 0
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 10

**Input**
```text
4 3
0 2
1 2
2 3
```

**Expected Output**
```text
0 1 2 3
```


## Question 365 — MST — Variant 4
**Difficulty:** Very Hard

### Problem Statement
Connect every vertex with minimum total edge weight and no cycle.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected weighted edge `u v w`. The graph is connected.

### Output Format
Print the total weight of a minimum spanning tree.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Output**
```text
4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `4`.

### Worked Example 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Output**
```text
7
```

**Explanation**
In the second graph, the same definition gives `7`.

### Test Cases

#### Test Case 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
1 0

```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4 3
0 1 1
1 2 2
2 3 3
```

**Expected Output**
```text
6
```

#### Test Case 5

**Input**
```text
5 7
0 1 2
0 2 5
1 2 1
1 3 4
2 3 2
2 4 3
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 6
0 1 1
0 2 1
0 3 1
1 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3 3
0 1 0
1 2 0
0 2 5
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4 4
0 1 9
1 2 8
2 3 7
0 3 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
5 6
0 1 4
0 2 3
1 2 2
1 3 6
2 4 5
3 4 1
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
4 4
0 1 3
1 2 4
2 3 1
0 3 10
```

**Expected Output**
```text
8
```


## Question 366 — SCC — Variant 4
**Difficulty:** Very Hard

### Problem Statement
Count maximal sets of vertices where every vertex can reach every other vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print the number of strongly connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4 4
0 1
1 0
2 3
3 2
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
5 5
0 1
1 2
2 3
3 1
3 4
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
1 0
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
4 5
0 1
1 2
2 0
2 3
3 2
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
6 6
0 1
1 2
2 0
3 4
4 5
5 3
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
5 7
0 1
1 0
1 2
2 3
3 2
3 4
4 3
```

**Expected Output**
```text
2
```


## Question 367 — Cycle Detection — Variant 4
**Difficulty:** Very Hard

### Problem Statement
Detect whether following directed edges can return to a previously active vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if the directed graph contains a cycle, otherwise `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
NO
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `NO`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
YES
```

**Explanation**
In the second graph, the same definition gives `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
4 4
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1 0
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
2 1
0 1
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
3 2
0 2
2 1
```

**Expected Output**
```text
NO
```


## Question 368 — Reachability — Variant 4
**Difficulty:** Very Hard

### Problem Statement
Determine whether a directed path exists from source `s` to target `t`.

### Input Format
The first line contains `n m s t`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if `t` is reachable from `s`; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 0 0 0
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 4 3 0
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
3 2 2 0
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 1 0 4
0 4
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 2 1 3
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 1 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4 2 0 3
0 2
2 3
```

**Expected Output**
```text
YES
```


## Question 369 — DAG Longest Path — Variant 4
**Difficulty:** Very Hard

### Problem Statement
In a directed acyclic graph, find the maximum total edge weight of any path starting from source `s`.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains a directed weighted edge `u v w`. The graph is a DAG.

### Output Format
Print the maximum path weight starting at `s`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Output**
```text
12
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `12`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
11
```

**Explanation**
In the second graph, the same definition gives `11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
11
```

#### Test Case 3

**Input**
```text
4 4 0
0 1 1
0 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
1 0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 5
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 3 0
0 1 10
1 2 1
0 2 5
```

**Expected Output**
```text
11
```

#### Test Case 7

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
5 5 0
0 1 7
0 2 2
2 3 8
1 4 1
3 4 3
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
4 2 1
1 2 5
2 3 6
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
6 5 0
0 1 1
1 2 2
0 3 4
3 4 5
4 5 6
```

**Expected Output**
```text
15
```


## Question 370 — DSU Connectivity — Variant 4
**Difficulty:** Very Hard

### Problem Statement
Process the undirected edges as unions and determine whether two requested vertices belong to the same component.

### Input Format
The first line contains `n m s t`. The next `m` lines contain undirected edges `u v`.

### Output Format
Print `YES` if `s` and `t` are connected after all edges are added; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 0 1
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 3 0 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 3 0 2
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
3 0 0 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 3 3 4
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 0 3
0 1
1 3
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
6 3 4 5
0 1
2 3
4 5
```

**Expected Output**
```text
YES
```


## Question 371 — Components — Variant 5
**Difficulty:** Very Hard

### Problem Statement
Given an undirected graph, count its connected components.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print the number of connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 0
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 0
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
6 2
0 1
2 3
```

**Expected Output**
```text
4
```

#### Test Case 4

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
7 3
0 1
1 2
4 5
```

**Expected Output**
```text
4
```

#### Test Case 6

**Input**
```text
5 3
0 4
1 2
2 3
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
8 4
0 1
2 3
4 5
6 7
```

**Expected Output**
```text
4
```

#### Test Case 8

**Input**
```text
3 1
0 2
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
7 1
0 1
```

**Expected Output**
```text
6
```


## Question 372 — Bipartite — Variant 5
**Difficulty:** Very Hard

### Problem Statement
Determine whether vertices can be split into two groups so every edge crosses between the groups.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print `YES` if the graph is bipartite; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
4 4
0 1
0 2
0 3
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
6 5
0 1
1 2
2 3
3 4
4 5
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
YES
```


## Question 373 — Shortest Path — Variant 5
**Difficulty:** Very Hard

### Problem Statement
Compute single-source shortest paths in a directed graph with non-negative edge weights.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains directed edge `u v w` with non-negative weight `w`.

### Output Format
Print `n` shortest distances from source `s`; print `-1` for unreachable vertices.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Output**
```text
0 3 1 4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 3 1 4`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
0 5 11
```

**Explanation**
In the second graph, the same definition gives `0 5 11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Expected Output**
```text
0 3 1 4
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
0 5 11
```

#### Test Case 3

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 10
2 3 1
```

**Expected Output**
```text
0 2 5 6 -1
```

#### Test Case 4

**Input**
```text
4 2 1
1 2 5
2 3 2
```

**Expected Output**
```text
-1 0 5 7
```

#### Test Case 5

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 6

**Input**
```text
5 4 2
2 0 7
2 1 2
1 3 3
3 4 1
```

**Expected Output**
```text
7 2 0 5 6
```

#### Test Case 7

**Input**
```text
4 3 3
3 0 1
0 1 1
1 2 1
```

**Expected Output**
```text
1 2 3 0
```

#### Test Case 8

**Input**
```text
4 0 0
```

**Expected Output**
```text
0 -1 -1 -1
```

#### Test Case 9

**Input**
```text
3 2 0
0 1 2
0 1 5
```

**Expected Output**
```text
0 2 -1
```

#### Test Case 10

**Input**
```text
5 3 0
0 1 10
0 2 1
2 1 1
```

**Expected Output**
```text
0 2 1 -1 -1
```


## Question 374 — Topological Order — Variant 5
**Difficulty:** Very Hard

### Problem Statement
Schedule all vertices so every directed edge points forward. When several vertices are available, choose the smallest index.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v` meaning `u` must precede `v`.

### Output Format
Print the lexicographically smallest valid topological ordering, or `IMPOSSIBLE` if a cycle exists.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Output**
```text
0 1 2 3
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 1 2 3`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
IMPOSSIBLE
```

**Explanation**
In the second graph, the same definition gives `IMPOSSIBLE`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 3

**Input**
```text
3 2
0 2
1 2
```

**Expected Output**
```text
0 1 2
```

#### Test Case 4

**Input**
```text
4 2
2 3
0 1
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 5

**Input**
```text
1 0
```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
5 4
0 2
1 2
2 3
2 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 7

**Input**
```text
4 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 8

**Input**
```text
2 1
1 0
```

**Expected Output**
```text
1 0
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 10

**Input**
```text
4 3
0 2
1 2
2 3
```

**Expected Output**
```text
0 1 2 3
```


## Question 375 — MST — Variant 5
**Difficulty:** Very Hard

### Problem Statement
Connect every vertex with minimum total edge weight and no cycle.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected weighted edge `u v w`. The graph is connected.

### Output Format
Print the total weight of a minimum spanning tree.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Output**
```text
4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `4`.

### Worked Example 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Output**
```text
7
```

**Explanation**
In the second graph, the same definition gives `7`.

### Test Cases

#### Test Case 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
1 0

```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4 3
0 1 1
1 2 2
2 3 3
```

**Expected Output**
```text
6
```

#### Test Case 5

**Input**
```text
5 7
0 1 2
0 2 5
1 2 1
1 3 4
2 3 2
2 4 3
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 6
0 1 1
0 2 1
0 3 1
1 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3 3
0 1 0
1 2 0
0 2 5
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4 4
0 1 9
1 2 8
2 3 7
0 3 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
5 6
0 1 4
0 2 3
1 2 2
1 3 6
2 4 5
3 4 1
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
4 4
0 1 3
1 2 4
2 3 1
0 3 10
```

**Expected Output**
```text
8
```


## Question 376 — SCC — Variant 5
**Difficulty:** Very Hard

### Problem Statement
Count maximal sets of vertices where every vertex can reach every other vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print the number of strongly connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4 4
0 1
1 0
2 3
3 2
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
5 5
0 1
1 2
2 3
3 1
3 4
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
1 0
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
4 5
0 1
1 2
2 0
2 3
3 2
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
6 6
0 1
1 2
2 0
3 4
4 5
5 3
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
5 7
0 1
1 0
1 2
2 3
3 2
3 4
4 3
```

**Expected Output**
```text
2
```


## Question 377 — Cycle Detection — Variant 5
**Difficulty:** Very Hard

### Problem Statement
Detect whether following directed edges can return to a previously active vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if the directed graph contains a cycle, otherwise `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
NO
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `NO`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
YES
```

**Explanation**
In the second graph, the same definition gives `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
4 4
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1 0
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
2 1
0 1
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
3 2
0 2
2 1
```

**Expected Output**
```text
NO
```


## Question 378 — Reachability — Variant 5
**Difficulty:** Very Hard

### Problem Statement
Determine whether a directed path exists from source `s` to target `t`.

### Input Format
The first line contains `n m s t`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if `t` is reachable from `s`; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 0 0 0
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 4 3 0
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
3 2 2 0
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 1 0 4
0 4
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 2 1 3
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 1 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4 2 0 3
0 2
2 3
```

**Expected Output**
```text
YES
```


## Question 379 — DAG Longest Path — Variant 5
**Difficulty:** Very Hard

### Problem Statement
In a directed acyclic graph, find the maximum total edge weight of any path starting from source `s`.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains a directed weighted edge `u v w`. The graph is a DAG.

### Output Format
Print the maximum path weight starting at `s`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Output**
```text
12
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `12`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
11
```

**Explanation**
In the second graph, the same definition gives `11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
11
```

#### Test Case 3

**Input**
```text
4 4 0
0 1 1
0 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
1 0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 5
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 3 0
0 1 10
1 2 1
0 2 5
```

**Expected Output**
```text
11
```

#### Test Case 7

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
5 5 0
0 1 7
0 2 2
2 3 8
1 4 1
3 4 3
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
4 2 1
1 2 5
2 3 6
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
6 5 0
0 1 1
1 2 2
0 3 4
3 4 5
4 5 6
```

**Expected Output**
```text
15
```


## Question 380 — DSU Connectivity — Variant 5
**Difficulty:** Very Hard

### Problem Statement
Process the undirected edges as unions and determine whether two requested vertices belong to the same component.

### Input Format
The first line contains `n m s t`. The next `m` lines contain undirected edges `u v`.

### Output Format
Print `YES` if `s` and `t` are connected after all edges are added; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 0 1
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 3 0 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 3 0 2
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
3 0 0 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 3 3 4
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 0 3
0 1
1 3
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
6 3 4 5
0 1
2 3
4 5
```

**Expected Output**
```text
YES
```


## Question 381 — Components — Variant 6
**Difficulty:** Very Hard

### Problem Statement
Given an undirected graph, count its connected components.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print the number of connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 0
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 0
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
6 2
0 1
2 3
```

**Expected Output**
```text
4
```

#### Test Case 4

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
7 3
0 1
1 2
4 5
```

**Expected Output**
```text
4
```

#### Test Case 6

**Input**
```text
5 3
0 4
1 2
2 3
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
8 4
0 1
2 3
4 5
6 7
```

**Expected Output**
```text
4
```

#### Test Case 8

**Input**
```text
3 1
0 2
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
8 1
0 1
```

**Expected Output**
```text
7
```


## Question 382 — Bipartite — Variant 6
**Difficulty:** Very Hard / Challenge

### Problem Statement
Determine whether vertices can be split into two groups so every edge crosses between the groups.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print `YES` if the graph is bipartite; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
4 4
0 1
0 2
0 3
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
6 5
0 1
1 2
2 3
3 4
4 5
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
YES
```


## Question 383 — Shortest Path — Variant 6
**Difficulty:** Very Hard / Challenge

### Problem Statement
Compute single-source shortest paths in a directed graph with non-negative edge weights.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains directed edge `u v w` with non-negative weight `w`.

### Output Format
Print `n` shortest distances from source `s`; print `-1` for unreachable vertices.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Output**
```text
0 3 1 4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 3 1 4`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
0 5 11
```

**Explanation**
In the second graph, the same definition gives `0 5 11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Expected Output**
```text
0 3 1 4
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
0 5 11
```

#### Test Case 3

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 10
2 3 1
```

**Expected Output**
```text
0 2 5 6 -1
```

#### Test Case 4

**Input**
```text
4 2 1
1 2 5
2 3 2
```

**Expected Output**
```text
-1 0 5 7
```

#### Test Case 5

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 6

**Input**
```text
5 4 2
2 0 7
2 1 2
1 3 3
3 4 1
```

**Expected Output**
```text
7 2 0 5 6
```

#### Test Case 7

**Input**
```text
4 3 3
3 0 1
0 1 1
1 2 1
```

**Expected Output**
```text
1 2 3 0
```

#### Test Case 8

**Input**
```text
4 0 0
```

**Expected Output**
```text
0 -1 -1 -1
```

#### Test Case 9

**Input**
```text
3 2 0
0 1 2
0 1 5
```

**Expected Output**
```text
0 2 -1
```

#### Test Case 10

**Input**
```text
5 3 0
0 1 10
0 2 1
2 1 1
```

**Expected Output**
```text
0 2 1 -1 -1
```


## Question 384 — Topological Order — Variant 6
**Difficulty:** Very Hard / Challenge

### Problem Statement
Schedule all vertices so every directed edge points forward. When several vertices are available, choose the smallest index.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v` meaning `u` must precede `v`.

### Output Format
Print the lexicographically smallest valid topological ordering, or `IMPOSSIBLE` if a cycle exists.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Output**
```text
0 1 2 3
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 1 2 3`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
IMPOSSIBLE
```

**Explanation**
In the second graph, the same definition gives `IMPOSSIBLE`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 3

**Input**
```text
3 2
0 2
1 2
```

**Expected Output**
```text
0 1 2
```

#### Test Case 4

**Input**
```text
4 2
2 3
0 1
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 5

**Input**
```text
1 0
```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
5 4
0 2
1 2
2 3
2 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 7

**Input**
```text
4 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 8

**Input**
```text
2 1
1 0
```

**Expected Output**
```text
1 0
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 10

**Input**
```text
4 3
0 2
1 2
2 3
```

**Expected Output**
```text
0 1 2 3
```


## Question 385 — MST — Variant 6
**Difficulty:** Very Hard / Challenge

### Problem Statement
Connect every vertex with minimum total edge weight and no cycle.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected weighted edge `u v w`. The graph is connected.

### Output Format
Print the total weight of a minimum spanning tree.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Output**
```text
4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `4`.

### Worked Example 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Output**
```text
7
```

**Explanation**
In the second graph, the same definition gives `7`.

### Test Cases

#### Test Case 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
1 0

```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4 3
0 1 1
1 2 2
2 3 3
```

**Expected Output**
```text
6
```

#### Test Case 5

**Input**
```text
5 7
0 1 2
0 2 5
1 2 1
1 3 4
2 3 2
2 4 3
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 6
0 1 1
0 2 1
0 3 1
1 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3 3
0 1 0
1 2 0
0 2 5
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4 4
0 1 9
1 2 8
2 3 7
0 3 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
5 6
0 1 4
0 2 3
1 2 2
1 3 6
2 4 5
3 4 1
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
4 4
0 1 3
1 2 4
2 3 1
0 3 10
```

**Expected Output**
```text
8
```


## Question 386 — SCC — Variant 6
**Difficulty:** Very Hard / Challenge

### Problem Statement
Count maximal sets of vertices where every vertex can reach every other vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print the number of strongly connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4 4
0 1
1 0
2 3
3 2
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
5 5
0 1
1 2
2 3
3 1
3 4
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
1 0
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
4 5
0 1
1 2
2 0
2 3
3 2
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
6 6
0 1
1 2
2 0
3 4
4 5
5 3
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
5 7
0 1
1 0
1 2
2 3
3 2
3 4
4 3
```

**Expected Output**
```text
2
```


## Question 387 — Cycle Detection — Variant 6
**Difficulty:** Very Hard / Challenge

### Problem Statement
Detect whether following directed edges can return to a previously active vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if the directed graph contains a cycle, otherwise `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
NO
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `NO`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
YES
```

**Explanation**
In the second graph, the same definition gives `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
4 4
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1 0
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
2 1
0 1
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
3 2
0 2
2 1
```

**Expected Output**
```text
NO
```


## Question 388 — Reachability — Variant 6
**Difficulty:** Very Hard / Challenge

### Problem Statement
Determine whether a directed path exists from source `s` to target `t`.

### Input Format
The first line contains `n m s t`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if `t` is reachable from `s`; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 0 0 0
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 4 3 0
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
3 2 2 0
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 1 0 4
0 4
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 2 1 3
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 1 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4 2 0 3
0 2
2 3
```

**Expected Output**
```text
YES
```


## Question 389 — DAG Longest Path — Variant 6
**Difficulty:** Very Hard / Challenge

### Problem Statement
In a directed acyclic graph, find the maximum total edge weight of any path starting from source `s`.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains a directed weighted edge `u v w`. The graph is a DAG.

### Output Format
Print the maximum path weight starting at `s`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Output**
```text
12
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `12`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
11
```

**Explanation**
In the second graph, the same definition gives `11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
11
```

#### Test Case 3

**Input**
```text
4 4 0
0 1 1
0 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
1 0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 5
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 3 0
0 1 10
1 2 1
0 2 5
```

**Expected Output**
```text
11
```

#### Test Case 7

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
5 5 0
0 1 7
0 2 2
2 3 8
1 4 1
3 4 3
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
4 2 1
1 2 5
2 3 6
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
6 5 0
0 1 1
1 2 2
0 3 4
3 4 5
4 5 6
```

**Expected Output**
```text
15
```


## Question 390 — DSU Connectivity — Variant 6
**Difficulty:** Very Hard / Challenge

### Problem Statement
Process the undirected edges as unions and determine whether two requested vertices belong to the same component.

### Input Format
The first line contains `n m s t`. The next `m` lines contain undirected edges `u v`.

### Output Format
Print `YES` if `s` and `t` are connected after all edges are added; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 0 1
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 3 0 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 3 0 2
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
3 0 0 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 3 3 4
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 0 3
0 1
1 3
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
6 3 4 5
0 1
2 3
4 5
```

**Expected Output**
```text
YES
```


## Question 391 — Components — Variant 7
**Difficulty:** Very Hard / Challenge

### Problem Statement
Given an undirected graph, count its connected components.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print the number of connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 0
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 0
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
6 2
0 1
2 3
```

**Expected Output**
```text
4
```

#### Test Case 4

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
7 3
0 1
1 2
4 5
```

**Expected Output**
```text
4
```

#### Test Case 6

**Input**
```text
5 3
0 4
1 2
2 3
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
8 4
0 1
2 3
4 5
6 7
```

**Expected Output**
```text
4
```

#### Test Case 8

**Input**
```text
3 1
0 2
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
9 1
0 1
```

**Expected Output**
```text
8
```


## Question 392 — Bipartite — Variant 7
**Difficulty:** Very Hard / Challenge

### Problem Statement
Determine whether vertices can be split into two groups so every edge crosses between the groups.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print `YES` if the graph is bipartite; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
4 4
0 1
0 2
0 3
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
6 5
0 1
1 2
2 3
3 4
4 5
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
YES
```


## Question 393 — Shortest Path — Variant 7
**Difficulty:** Very Hard / Challenge

### Problem Statement
Compute single-source shortest paths in a directed graph with non-negative edge weights.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains directed edge `u v w` with non-negative weight `w`.

### Output Format
Print `n` shortest distances from source `s`; print `-1` for unreachable vertices.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Output**
```text
0 3 1 4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 3 1 4`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
0 5 11
```

**Explanation**
In the second graph, the same definition gives `0 5 11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Expected Output**
```text
0 3 1 4
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
0 5 11
```

#### Test Case 3

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 10
2 3 1
```

**Expected Output**
```text
0 2 5 6 -1
```

#### Test Case 4

**Input**
```text
4 2 1
1 2 5
2 3 2
```

**Expected Output**
```text
-1 0 5 7
```

#### Test Case 5

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 6

**Input**
```text
5 4 2
2 0 7
2 1 2
1 3 3
3 4 1
```

**Expected Output**
```text
7 2 0 5 6
```

#### Test Case 7

**Input**
```text
4 3 3
3 0 1
0 1 1
1 2 1
```

**Expected Output**
```text
1 2 3 0
```

#### Test Case 8

**Input**
```text
4 0 0
```

**Expected Output**
```text
0 -1 -1 -1
```

#### Test Case 9

**Input**
```text
3 2 0
0 1 2
0 1 5
```

**Expected Output**
```text
0 2 -1
```

#### Test Case 10

**Input**
```text
5 3 0
0 1 10
0 2 1
2 1 1
```

**Expected Output**
```text
0 2 1 -1 -1
```


## Question 394 — Topological Order — Variant 7
**Difficulty:** Very Hard / Challenge

### Problem Statement
Schedule all vertices so every directed edge points forward. When several vertices are available, choose the smallest index.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v` meaning `u` must precede `v`.

### Output Format
Print the lexicographically smallest valid topological ordering, or `IMPOSSIBLE` if a cycle exists.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Output**
```text
0 1 2 3
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 1 2 3`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
IMPOSSIBLE
```

**Explanation**
In the second graph, the same definition gives `IMPOSSIBLE`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 3

**Input**
```text
3 2
0 2
1 2
```

**Expected Output**
```text
0 1 2
```

#### Test Case 4

**Input**
```text
4 2
2 3
0 1
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 5

**Input**
```text
1 0
```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
5 4
0 2
1 2
2 3
2 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 7

**Input**
```text
4 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 8

**Input**
```text
2 1
1 0
```

**Expected Output**
```text
1 0
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 10

**Input**
```text
4 3
0 2
1 2
2 3
```

**Expected Output**
```text
0 1 2 3
```


## Question 395 — MST — Variant 7
**Difficulty:** Very Hard / Challenge

### Problem Statement
Connect every vertex with minimum total edge weight and no cycle.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected weighted edge `u v w`. The graph is connected.

### Output Format
Print the total weight of a minimum spanning tree.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Output**
```text
4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `4`.

### Worked Example 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Output**
```text
7
```

**Explanation**
In the second graph, the same definition gives `7`.

### Test Cases

#### Test Case 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
1 0

```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4 3
0 1 1
1 2 2
2 3 3
```

**Expected Output**
```text
6
```

#### Test Case 5

**Input**
```text
5 7
0 1 2
0 2 5
1 2 1
1 3 4
2 3 2
2 4 3
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 6
0 1 1
0 2 1
0 3 1
1 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3 3
0 1 0
1 2 0
0 2 5
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4 4
0 1 9
1 2 8
2 3 7
0 3 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
5 6
0 1 4
0 2 3
1 2 2
1 3 6
2 4 5
3 4 1
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
4 4
0 1 3
1 2 4
2 3 1
0 3 10
```

**Expected Output**
```text
8
```


## Question 396 — SCC — Variant 7
**Difficulty:** Very Hard / Challenge

### Problem Statement
Count maximal sets of vertices where every vertex can reach every other vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print the number of strongly connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4 4
0 1
1 0
2 3
3 2
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
5 5
0 1
1 2
2 3
3 1
3 4
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
1 0
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
4 5
0 1
1 2
2 0
2 3
3 2
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
6 6
0 1
1 2
2 0
3 4
4 5
5 3
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
5 7
0 1
1 0
1 2
2 3
3 2
3 4
4 3
```

**Expected Output**
```text
2
```


## Question 397 — Cycle Detection — Variant 7
**Difficulty:** Very Hard / Challenge

### Problem Statement
Detect whether following directed edges can return to a previously active vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if the directed graph contains a cycle, otherwise `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
NO
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `NO`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
YES
```

**Explanation**
In the second graph, the same definition gives `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
4 4
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1 0
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
2 1
0 1
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
3 2
0 2
2 1
```

**Expected Output**
```text
NO
```


## Question 398 — Reachability — Variant 7
**Difficulty:** Very Hard / Challenge

### Problem Statement
Determine whether a directed path exists from source `s` to target `t`.

### Input Format
The first line contains `n m s t`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if `t` is reachable from `s`; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 0 0 0
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 4 3 0
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
3 2 2 0
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 1 0 4
0 4
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 2 1 3
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 1 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4 2 0 3
0 2
2 3
```

**Expected Output**
```text
YES
```


## Question 399 — DAG Longest Path — Variant 7
**Difficulty:** Very Hard / Challenge

### Problem Statement
In a directed acyclic graph, find the maximum total edge weight of any path starting from source `s`.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains a directed weighted edge `u v w`. The graph is a DAG.

### Output Format
Print the maximum path weight starting at `s`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Output**
```text
12
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `12`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
11
```

**Explanation**
In the second graph, the same definition gives `11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
11
```

#### Test Case 3

**Input**
```text
4 4 0
0 1 1
0 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
1 0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 5
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 3 0
0 1 10
1 2 1
0 2 5
```

**Expected Output**
```text
11
```

#### Test Case 7

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
5 5 0
0 1 7
0 2 2
2 3 8
1 4 1
3 4 3
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
4 2 1
1 2 5
2 3 6
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
6 5 0
0 1 1
1 2 2
0 3 4
3 4 5
4 5 6
```

**Expected Output**
```text
15
```


## Question 400 — DSU Connectivity — Variant 7
**Difficulty:** Very Hard / Challenge

### Problem Statement
Process the undirected edges as unions and determine whether two requested vertices belong to the same component.

### Input Format
The first line contains `n m s t`. The next `m` lines contain undirected edges `u v`.

### Output Format
Print `YES` if `s` and `t` are connected after all edges are added; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 0 1
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 3 0 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 3 0 2
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
3 0 0 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 3 3 4
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 0 3
0 1
1 3
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
6 3 4 5
0 1
2 3
4 5
```

**Expected Output**
```text
YES
```


## Question 401 — Components — Variant 8
**Difficulty:** Very Hard / Challenge

### Problem Statement
Given an undirected graph, count its connected components.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print the number of connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 0
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3
0 1
1 2
3 4
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 0
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
6 2
0 1
2 3
```

**Expected Output**
```text
4
```

#### Test Case 4

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text
7 3
0 1
1 2
4 5
```

**Expected Output**
```text
4
```

#### Test Case 6

**Input**
```text
5 3
0 4
1 2
2 3
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
8 4
0 1
2 3
4 5
6 7
```

**Expected Output**
```text
4
```

#### Test Case 8

**Input**
```text
3 1
0 2
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
10 1
0 1
```

**Expected Output**
```text
9
```


## Question 402 — Bipartite — Variant 8
**Difficulty:** Very Hard / Challenge

### Problem Statement
Determine whether vertices can be split into two groups so every edge crosses between the groups.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected edge `u v`.

### Output Format
Print `YES` if the graph is bipartite; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
0 1
1 2
2 3
3 0
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
4 4
0 1
0 2
0 3
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
6 5
0 1
1 2
2 3
3 4
4 5
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
6 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
0 1
1 2
```

**Expected Output**
```text
YES
```


## Question 403 — Shortest Path — Variant 8
**Difficulty:** Very Hard / Challenge

### Problem Statement
Compute single-source shortest paths in a directed graph with non-negative edge weights.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains directed edge `u v w` with non-negative weight `w`.

### Output Format
Print `n` shortest distances from source `s`; print `-1` for unreachable vertices.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Output**
```text
0 3 1 4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 3 1 4`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
0 5 11
```

**Explanation**
In the second graph, the same definition gives `0 5 11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 4
0 2 1
2 1 2
1 3 1
```

**Expected Output**
```text
0 3 1 4
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
0 5 11
```

#### Test Case 3

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 10
2 3 1
```

**Expected Output**
```text
0 2 5 6 -1
```

#### Test Case 4

**Input**
```text
4 2 1
1 2 5
2 3 2
```

**Expected Output**
```text
-1 0 5 7
```

#### Test Case 5

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 6

**Input**
```text
5 4 2
2 0 7
2 1 2
1 3 3
3 4 1
```

**Expected Output**
```text
7 2 0 5 6
```

#### Test Case 7

**Input**
```text
4 3 3
3 0 1
0 1 1
1 2 1
```

**Expected Output**
```text
1 2 3 0
```

#### Test Case 8

**Input**
```text
4 0 0
```

**Expected Output**
```text
0 -1 -1 -1
```

#### Test Case 9

**Input**
```text
3 2 0
0 1 2
0 1 5
```

**Expected Output**
```text
0 2 -1
```

#### Test Case 10

**Input**
```text
5 3 0
0 1 10
0 2 1
2 1 1
```

**Expected Output**
```text
0 2 1 -1 -1
```


## Question 404 — Topological Order — Variant 8
**Difficulty:** Very Hard / Challenge

### Problem Statement
Schedule all vertices so every directed edge points forward. When several vertices are available, choose the smallest index.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v` meaning `u` must precede `v`.

### Output Format
Print the lexicographically smallest valid topological ordering, or `IMPOSSIBLE` if a cycle exists.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Output**
```text
0 1 2 3
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `0 1 2 3`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
IMPOSSIBLE
```

**Explanation**
In the second graph, the same definition gives `IMPOSSIBLE`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
0 2
1 3
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 3

**Input**
```text
3 2
0 2
1 2
```

**Expected Output**
```text
0 1 2
```

#### Test Case 4

**Input**
```text
4 2
2 3
0 1
```

**Expected Output**
```text
0 1 2 3
```

#### Test Case 5

**Input**
```text
1 0
```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
5 4
0 2
1 2
2 3
2 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 7

**Input**
```text
4 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
IMPOSSIBLE
```

#### Test Case 8

**Input**
```text
2 1
1 0
```

**Expected Output**
```text
1 0
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
0 1 2 3 4
```

#### Test Case 10

**Input**
```text
4 3
0 2
1 2
2 3
```

**Expected Output**
```text
0 1 2 3
```


## Question 405 — MST — Variant 8
**Difficulty:** Very Hard / Challenge

### Problem Statement
Connect every vertex with minimum total edge weight and no cycle.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains an undirected weighted edge `u v w`. The graph is connected.

### Output Format
Print the total weight of a minimum spanning tree.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Output**
```text
4
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `4`.

### Worked Example 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Output**
```text
7
```

**Explanation**
In the second graph, the same definition gives `7`.

### Test Cases

#### Test Case 1

**Input**
```text
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
3 3
0 1 10
1 2 3
0 2 4
```

**Expected Output**
```text
7
```

#### Test Case 3

**Input**
```text
1 0

```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4 3
0 1 1
1 2 2
2 3 3
```

**Expected Output**
```text
6
```

#### Test Case 5

**Input**
```text
5 7
0 1 2
0 2 5
1 2 1
1 3 4
2 3 2
2 4 3
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 6
0 1 1
0 2 1
0 3 1
1 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3 3
0 1 0
1 2 0
0 2 5
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4 4
0 1 9
1 2 8
2 3 7
0 3 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
5 6
0 1 4
0 2 3
1 2 2
1 3 6
2 4 5
3 4 1
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
4 4
0 1 3
1 2 4
2 3 1
0 3 10
```

**Expected Output**
```text
8
```


## Question 406 — SCC — Variant 8
**Difficulty:** Very Hard / Challenge

### Problem Statement
Count maximal sets of vertices where every vertex can reach every other vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print the number of strongly connected components.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Output**
```text
2
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `2`.

### Worked Example 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
4
```

**Explanation**
In the second graph, the same definition gives `4`.

### Test Cases

#### Test Case 1

**Input**
```text
5 6
0 1
1 2
2 0
2 3
3 4
4 3
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4 4
0 1
1 0
2 3
3 2
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
5 5
0 1
1 2
2 3
3 1
3 4
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
1 0
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
5 0
```

**Expected Output**
```text
5
```

#### Test Case 8

**Input**
```text
4 5
0 1
1 2
2 0
2 3
3 2
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
6 6
0 1
1 2
2 0
3 4
4 5
5 3
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
5 7
0 1
1 0
1 2
2 3
3 2
3 4
4 3
```

**Expected Output**
```text
2
```


## Question 407 — Cycle Detection — Variant 8
**Difficulty:** Very Hard / Challenge

### Problem Statement
Detect whether following directed edges can return to a previously active vertex.

### Input Format
The first line contains `n m`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if the directed graph contains a cycle, otherwise `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Output**
```text
NO
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `NO`.

### Worked Example 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Output**
```text
YES
```

**Explanation**
In the second graph, the same definition gives `YES`.

### Test Cases

#### Test Case 1

**Input**
```text
4 3
0 1
1 2
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 2

**Input**
```text
3 3
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 3

**Input**
```text
4 4
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1 0
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
2 1
0 1
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
5 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 4
0 1
1 2
2 3
3 1
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
4 2
0 1
1 0
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
5 4
0 1
1 2
2 0
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
3 2
0 2
2 1
```

**Expected Output**
```text
NO
```


## Question 408 — Reachability — Variant 8
**Difficulty:** Very Hard / Challenge

### Problem Statement
Determine whether a directed path exists from source `s` to target `t`.

### Input Format
The first line contains `n m s t`. Each of the next `m` lines contains a directed edge `u v`.

### Output Format
Print `YES` if `t` is reachable from `s`; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 4 0 4
0 1
1 2
2 3
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 0 0 0
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 4 3 0
0 1
1 2
2 0
2 3
```

**Expected Output**
```text
NO
```

#### Test Case 6

**Input**
```text
3 2 2 0
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 1 0 4
0 4
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 2 1 3
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 1 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4 2 0 3
0 2
2 3
```

**Expected Output**
```text
YES
```


## Question 409 — DAG Longest Path — Variant 8
**Difficulty:** Very Hard / Challenge

### Problem Statement
In a directed acyclic graph, find the maximum total edge weight of any path starting from source `s`.

### Input Format
The first line contains `n m s`. Each of the next `m` lines contains a directed weighted edge `u v w`. The graph is a DAG.

### Output Format
Print the maximum path weight starting at `s`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Output**
```text
12
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `12`.

### Worked Example 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Output**
```text
11
```

**Explanation**
In the second graph, the same definition gives `11`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4 0
0 1 3
0 2 2
1 3 4
2 3 10
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
3 2 0
0 1 5
1 2 6
```

**Expected Output**
```text
11
```

#### Test Case 3

**Input**
```text
4 4 0
0 1 1
0 2 1
1 3 1
2 3 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
1 0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
5 4 0
0 1 2
1 2 3
0 3 5
3 4 1
```

**Expected Output**
```text
6
```

#### Test Case 6

**Input**
```text
4 3 0
0 1 10
1 2 1
0 2 5
```

**Expected Output**
```text
11
```

#### Test Case 7

**Input**
```text
3 2 0
0 1 0
1 2 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
5 5 0
0 1 7
0 2 2
2 3 8
1 4 1
3 4 3
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
4 2 1
1 2 5
2 3 6
```

**Expected Output**
```text
11
```

#### Test Case 10

**Input**
```text
6 5 0
0 1 1
1 2 2
0 3 4
3 4 5
4 5 6
```

**Expected Output**
```text
15
```


## Question 410 — DSU Connectivity — Variant 8
**Difficulty:** Very Hard / Challenge

### Problem Statement
Process the undirected edges as unions and determine whether two requested vertices belong to the same component.

### Input Format
The first line contains `n m s t`. The next `m` lines contain undirected edges `u v`.

### Output Format
Print `YES` if `s` and `t` are connected after all edges are added; otherwise print `NO`.

### Constraints
0 ≤ vertex index < n. Graph sizes are large enough that linear or near-linear graph algorithms are expected.

**Target complexity:** Typically O(n+m) or O((n+m) log n), depending on the algorithm.

### Worked Example 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Output**
```text
YES
```

**Explanation**
The graph is built exactly from the listed edges. Applying the required graph operation gives `YES`.

### Worked Example 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Output**
```text
NO
```

**Explanation**
In the second graph, the same definition gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
5 3 0 2
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
5 2 0 4
0 1
1 2
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
4 2 0 1
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
4 3 0 3
0 1
1 2
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
6 3 0 2
0 1
1 2
2 0
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
3 0 0 2
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
5 2 2 3
0 1
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5 3 3 4
0 1
1 2
3 4
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4 3 0 3
0 1
1 3
2 3
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
6 3 4 5
0 1
2 3
4 5
```

**Expected Output**
```text
YES
```



# Belt 10 — Black Belt
**Difficulty:** Very Hard

## Subdivision — Advanced DP

## Question 411 — Climbing Cost — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Starting before platform 0, move forward by one or two positions. Landing on a platform incurs its cost; reaching position `n` costs nothing. Find the minimum total cost.

### Input Format
The first line contains `n`. The second line contains `n` non-negative landing costs.

### Output Format
Print the minimum cost to reach position `n`, where each move advances 1 or 2 positions and landing on platform `i` costs `cost[i]`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
10 15 20 5 8
```

**Output**
```text
20
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `20`.

### Worked Example 2

**Input**
```text
4
1 100 1 1
```

**Output**
```text
2
```

**Explanation**
The second input produces `2` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
10 15 20 5 8
```

**Expected Output**
```text
20
```

#### Test Case 2

**Input**
```text
4
1 100 1 1
```

**Expected Output**
```text
2
```

#### Test Case 3

**Input**
```text
5
0 5 0 5 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
2
5 5
```

**Expected Output**
```text
5
```

#### Test Case 5

**Input**
```text
4
3 2 1 10
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
5
7 1 7 1 7
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
4
9 8 1 8
```

**Expected Output**
```text
9
```

#### Test Case 8

**Input**
```text
5
2 9 2 9 2
```

**Expected Output**
```text
6
```

#### Test Case 9

**Input**
```text
5
1 2 3 4 5
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
4
1 3 1 4
```

**Expected Output**
```text
2
```


## Question 412 — House Robber — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Choose a set of non-adjacent houses to maximize collected value. Print the maximum possible total.

### Input Format
The first line contains `n`. The second line contains `n` non-negative house values.

### Output Format
Print the maximum sum obtained by choosing values with no two chosen positions adjacent.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
4
2 1 1 2
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
4
2 1 1 2
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
4
1 2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 6

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
5
4 10 3 1 5
```

**Expected Output**
```text
15
```

#### Test Case 8

**Input**
```text
4
6 6 6 6
```

**Expected Output**
```text
12
```

#### Test Case 9

**Input**
```text
3
9 1 9
```

**Expected Output**
```text
18
```

#### Test Case 10

**Input**
```text
4
0 2 7 3
```

**Expected Output**
```text
7
```


## Question 413 — Coin Change Minimum — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Unlimited copies of each denomination are available. Find the minimum number of coins required to make the exact target.

### Input Format
The first line contains `n` and target `T`. The second line contains `n` distinct positive coin denominations.

### Output Format
Print the minimum number of coins needed to form exactly `T`, or `-1` if impossible.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 11
1 2 5
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
1 3
2
```

**Output**
```text
-1
```

**Explanation**
The second input produces `-1` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 11
1 2 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1 3
2
```

**Expected Output**
```text
-1
```

#### Test Case 3

**Input**
```text
1 0
1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 27
2 5 10
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
2 14
3 7
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 6
1 3 4
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
2 1
5 7
```

**Expected Output**
```text
-1
```

#### Test Case 8

**Input**
```text
2 8
2 4
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
4 11
1 5 6 8
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3 13
2 3 7
```

**Expected Output**
```text
3
```


## Question 414 — Longest Increasing Subsequence — Variant 1
**Difficulty:** Very Hard

### Problem Statement
A subsequence keeps original order but may skip elements. Find the maximum possible length of a strictly increasing subsequence.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the length of the longest strictly increasing subsequence.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Output**
```text
4
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `4`.

### Worked Example 2

**Input**
```text
6
0 1 0 3 2 3
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
6
0 1 0 3 2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
4 3 2 1
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
-1 0 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
5
3 10 2 1 20
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
6
5 4 11 1 16 8
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
4
2 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
6
0 3 1 5 2 6
```

**Expected Output**
```text
4
```


## Question 415 — Partition Equal Sum — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Each array element must belong to exactly one of two groups. Determine whether the two group sums can be equal.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print `YES` if the array can be split into two groups with equal sums, otherwise `NO`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
1 5 11 5
```

**Output**
```text
YES
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `YES`.

### Worked Example 2

**Input**
```text
4
1 2 3 5
```

**Output**
```text
NO
```

**Explanation**
The second input produces `NO` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 11 5
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
4
1 2 3 5
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2
2 2
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1
1
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
5
3 3 3 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
2
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5
7 3 2 5 1
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4
10 10 1 1
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4
0 1 2 3
```

**Expected Output**
```text
YES
```


## Question 416 — Grid Minimum Path — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Find the least-cost path through a non-negative grid when movement is restricted to right and down.

### Input Format
The first line contains `r c`. The next `r` lines contain `c` non-negative integers.

### Output Format
Print the minimum sum of a path from the top-left cell to the bottom-right cell, moving only right or down.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Output**
```text
7
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `7`.

### Worked Example 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Output**
```text
12
```

**Explanation**
The second input produces `12` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 3

**Input**
```text
1 1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
2 2
1 2
1 1
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
2 3
0 1 0
1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 3
2 8 1
1 3 2
4 2 1
```

**Expected Output**
```text
9
```

#### Test Case 7

**Input**
```text
3 2
9 1
1 9
1 1
```

**Expected Output**
```text
12
```

#### Test Case 8

**Input**
```text
1 4
3 1 7 2
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
3 1
1
2
3
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
2 2
1 2
3 1
```

**Expected Output**
```text
4
```


## Question 417 — String Edit Distance — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Compute the Levenshtein edit distance between two strings.

### Input Format
The first line contains string `a`. The second line contains string `b`. Either string may be empty.

### Output Format
Print the minimum number of single-character insertions, deletions, or substitutions needed to transform `a` into `b`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
horse
ros
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
intention
execution
```

**Output**
```text
5
```

**Explanation**
The second input produces `5` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
horse
ros
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
intention
execution
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
a
a
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
a
b
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text

abc
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
abc

```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
kitten
sitting
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
flaw
lawn
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
abc
abc
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
book
back
```

**Expected Output**
```text
2
```


## Question 418 — Maximum Product Subarray — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Find the contiguous subarray with the largest product; the subarray must contain at least one element.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum product of any non-empty contiguous subarray.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
2 3 -2 4
```

**Output**
```text
6
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `6`.

### Worked Example 2

**Input**
```text
3
-2 0 -1
```

**Output**
```text
0
```

**Explanation**
The second input produces `0` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
2 3 -2 4
```

**Expected Output**
```text
6
```

#### Test Case 2

**Input**
```text
3
-2 0 -1
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
-2 3 -4
```

**Expected Output**
```text
24
```

#### Test Case 4

**Input**
```text
2
0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
-2 -3 -4
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 7

**Input**
```text
4
-1 -2 -3 0
```

**Expected Output**
```text
6
```

#### Test Case 8

**Input**
```text
5
2 -5 -2 -4 3
```

**Expected Output**
```text
24
```

#### Test Case 9

**Input**
```text
1
-1
```

**Expected Output**
```text
-1
```

#### Test Case 10

**Input**
```text
3
1 -2 3
```

**Expected Output**
```text
3
```


## Question 419 — Decode Digit String — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Count how many different letter decodings can be formed from the digit string.

### Input Format
One line contains a string of decimal digits. A code maps `1→A` through `26→Z`; a zero can only be part of a valid two-digit code.

### Output Format
Print the number of valid decodings. Print `0` when the string cannot be decoded.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
12
```

**Output**
```text
2
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `2`.

### Worked Example 2

**Input**
```text
226
```

**Output**
```text
3
```

**Explanation**
The second input produces `3` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
12
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
226
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
06
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
11106
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
10
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
27
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
101
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
2611055971756562
```

**Expected Output**
```text
4
```

#### Test Case 10

**Input**
```text
123456
```

**Expected Output**
```text
3
```


## Question 420 — Maximum Sum Non-Adjacent — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Select non-adjacent values to maximize their sum. Adjacent positions cannot both be selected.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print the maximum sum obtainable without choosing adjacent positions.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
6
2 7 9 3 1 4
```

**Output**
```text
15
```

**Explanation**
The second input produces `15` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
6
2 7 9 3 1 4
```

**Expected Output**
```text
15
```

#### Test Case 3

**Input**
```text
6
5 5 10 100 10 5
```

**Expected Output**
```text
110
```

#### Test Case 4

**Input**
```text
5
3 2 5 10 7
```

**Expected Output**
```text
15
```

#### Test Case 5

**Input**
```text
6
1 2 3 4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 7

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4
8 1 8 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
3
9 9 1
```

**Expected Output**
```text
10
```

#### Test Case 10

**Input**
```text
4
1 4 7 2
```

**Expected Output**
```text
8
```


## Question 421 — Climbing Cost — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Starting before platform 0, move forward by one or two positions. Landing on a platform incurs its cost; reaching position `n` costs nothing. Find the minimum total cost.

### Input Format
The first line contains `n`. The second line contains `n` non-negative landing costs.

### Output Format
Print the minimum cost to reach position `n`, where each move advances 1 or 2 positions and landing on platform `i` costs `cost[i]`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
10 15 20 5 8
```

**Output**
```text
20
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `20`.

### Worked Example 2

**Input**
```text
4
1 100 1 1
```

**Output**
```text
2
```

**Explanation**
The second input produces `2` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
10 15 20 5 8
```

**Expected Output**
```text
20
```

#### Test Case 2

**Input**
```text
4
1 100 1 1
```

**Expected Output**
```text
2
```

#### Test Case 3

**Input**
```text
5
0 5 0 5 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
2
5 5
```

**Expected Output**
```text
5
```

#### Test Case 5

**Input**
```text
4
3 2 1 10
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
5
7 1 7 1 7
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
4
9 8 1 8
```

**Expected Output**
```text
9
```

#### Test Case 8

**Input**
```text
5
2 9 2 9 2
```

**Expected Output**
```text
6
```

#### Test Case 9

**Input**
```text
5
1 2 3 4 5
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
4
2 3 1 4
```

**Expected Output**
```text
3
```


## Question 422 — House Robber — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Choose a set of non-adjacent houses to maximize collected value. Print the maximum possible total.

### Input Format
The first line contains `n`. The second line contains `n` non-negative house values.

### Output Format
Print the maximum sum obtained by choosing values with no two chosen positions adjacent.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
4
2 1 1 2
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
4
2 1 1 2
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
4
1 2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 6

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
5
4 10 3 1 5
```

**Expected Output**
```text
15
```

#### Test Case 8

**Input**
```text
4
6 6 6 6
```

**Expected Output**
```text
12
```

#### Test Case 9

**Input**
```text
3
9 1 9
```

**Expected Output**
```text
18
```

#### Test Case 10

**Input**
```text
4
1 2 7 3
```

**Expected Output**
```text
8
```


## Question 423 — Coin Change Minimum — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Unlimited copies of each denomination are available. Find the minimum number of coins required to make the exact target.

### Input Format
The first line contains `n` and target `T`. The second line contains `n` distinct positive coin denominations.

### Output Format
Print the minimum number of coins needed to form exactly `T`, or `-1` if impossible.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 11
1 2 5
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
1 3
2
```

**Output**
```text
-1
```

**Explanation**
The second input produces `-1` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 11
1 2 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1 3
2
```

**Expected Output**
```text
-1
```

#### Test Case 3

**Input**
```text
1 0
1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 27
2 5 10
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
2 14
3 7
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 6
1 3 4
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
2 1
5 7
```

**Expected Output**
```text
-1
```

#### Test Case 8

**Input**
```text
2 8
2 4
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
4 11
1 5 6 8
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3 13
2 3 7
```

**Expected Output**
```text
3
```


## Question 424 — Longest Increasing Subsequence — Variant 2
**Difficulty:** Very Hard

### Problem Statement
A subsequence keeps original order but may skip elements. Find the maximum possible length of a strictly increasing subsequence.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the length of the longest strictly increasing subsequence.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Output**
```text
4
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `4`.

### Worked Example 2

**Input**
```text
6
0 1 0 3 2 3
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
6
0 1 0 3 2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
4 3 2 1
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
-1 0 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
5
3 10 2 1 20
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
6
5 4 11 1 16 8
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
4
2 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
6
1 3 1 5 2 6
```

**Expected Output**
```text
4
```


## Question 425 — Partition Equal Sum — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Each array element must belong to exactly one of two groups. Determine whether the two group sums can be equal.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print `YES` if the array can be split into two groups with equal sums, otherwise `NO`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
1 5 11 5
```

**Output**
```text
YES
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `YES`.

### Worked Example 2

**Input**
```text
4
1 2 3 5
```

**Output**
```text
NO
```

**Explanation**
The second input produces `NO` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 11 5
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
4
1 2 3 5
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2
2 2
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1
1
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
5
3 3 3 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
2
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5
7 3 2 5 1
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4
10 10 1 1
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4
1 1 2 3
```

**Expected Output**
```text
NO
```


## Question 426 — Grid Minimum Path — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Find the least-cost path through a non-negative grid when movement is restricted to right and down.

### Input Format
The first line contains `r c`. The next `r` lines contain `c` non-negative integers.

### Output Format
Print the minimum sum of a path from the top-left cell to the bottom-right cell, moving only right or down.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Output**
```text
7
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `7`.

### Worked Example 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Output**
```text
12
```

**Explanation**
The second input produces `12` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 3

**Input**
```text
1 1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
2 2
1 2
1 1
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
2 3
0 1 0
1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 3
2 8 1
1 3 2
4 2 1
```

**Expected Output**
```text
9
```

#### Test Case 7

**Input**
```text
3 2
9 1
1 9
1 1
```

**Expected Output**
```text
12
```

#### Test Case 8

**Input**
```text
1 4
3 1 7 2
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
3 1
1
2
3
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
2 2
2 2
3 1
```

**Expected Output**
```text
5
```


## Question 427 — String Edit Distance — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Compute the Levenshtein edit distance between two strings.

### Input Format
The first line contains string `a`. The second line contains string `b`. Either string may be empty.

### Output Format
Print the minimum number of single-character insertions, deletions, or substitutions needed to transform `a` into `b`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
horse
ros
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
intention
execution
```

**Output**
```text
5
```

**Explanation**
The second input produces `5` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
horse
ros
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
intention
execution
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
a
a
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
a
b
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text

abc
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
abc

```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
kitten
sitting
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
flaw
lawn
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
abc
abc
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
book
back
```

**Expected Output**
```text
2
```


## Question 428 — Maximum Product Subarray — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Find the contiguous subarray with the largest product; the subarray must contain at least one element.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum product of any non-empty contiguous subarray.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
2 3 -2 4
```

**Output**
```text
6
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `6`.

### Worked Example 2

**Input**
```text
3
-2 0 -1
```

**Output**
```text
0
```

**Explanation**
The second input produces `0` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
2 3 -2 4
```

**Expected Output**
```text
6
```

#### Test Case 2

**Input**
```text
3
-2 0 -1
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
-2 3 -4
```

**Expected Output**
```text
24
```

#### Test Case 4

**Input**
```text
2
0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
-2 -3 -4
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 7

**Input**
```text
4
-1 -2 -3 0
```

**Expected Output**
```text
6
```

#### Test Case 8

**Input**
```text
5
2 -5 -2 -4 3
```

**Expected Output**
```text
24
```

#### Test Case 9

**Input**
```text
1
-1
```

**Expected Output**
```text
-1
```

#### Test Case 10

**Input**
```text
3
1 -2 3
```

**Expected Output**
```text
3
```


## Question 429 — Decode Digit String — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Count how many different letter decodings can be formed from the digit string.

### Input Format
One line contains a string of decimal digits. A code maps `1→A` through `26→Z`; a zero can only be part of a valid two-digit code.

### Output Format
Print the number of valid decodings. Print `0` when the string cannot be decoded.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
12
```

**Output**
```text
2
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `2`.

### Worked Example 2

**Input**
```text
226
```

**Output**
```text
3
```

**Explanation**
The second input produces `3` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
12
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
226
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
06
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
11106
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
10
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
27
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
101
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
2611055971756562
```

**Expected Output**
```text
4
```

#### Test Case 10

**Input**
```text
123456
```

**Expected Output**
```text
3
```


## Question 430 — Maximum Sum Non-Adjacent — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Select non-adjacent values to maximize their sum. Adjacent positions cannot both be selected.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print the maximum sum obtainable without choosing adjacent positions.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
6
2 7 9 3 1 4
```

**Output**
```text
15
```

**Explanation**
The second input produces `15` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
6
2 7 9 3 1 4
```

**Expected Output**
```text
15
```

#### Test Case 3

**Input**
```text
6
5 5 10 100 10 5
```

**Expected Output**
```text
110
```

#### Test Case 4

**Input**
```text
5
3 2 5 10 7
```

**Expected Output**
```text
15
```

#### Test Case 5

**Input**
```text
6
1 2 3 4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 7

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4
8 1 8 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
3
9 9 1
```

**Expected Output**
```text
10
```

#### Test Case 10

**Input**
```text
4
2 4 7 2
```

**Expected Output**
```text
9
```


## Question 431 — Climbing Cost — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Starting before platform 0, move forward by one or two positions. Landing on a platform incurs its cost; reaching position `n` costs nothing. Find the minimum total cost.

### Input Format
The first line contains `n`. The second line contains `n` non-negative landing costs.

### Output Format
Print the minimum cost to reach position `n`, where each move advances 1 or 2 positions and landing on platform `i` costs `cost[i]`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
10 15 20 5 8
```

**Output**
```text
20
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `20`.

### Worked Example 2

**Input**
```text
4
1 100 1 1
```

**Output**
```text
2
```

**Explanation**
The second input produces `2` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
10 15 20 5 8
```

**Expected Output**
```text
20
```

#### Test Case 2

**Input**
```text
4
1 100 1 1
```

**Expected Output**
```text
2
```

#### Test Case 3

**Input**
```text
5
0 5 0 5 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
2
5 5
```

**Expected Output**
```text
5
```

#### Test Case 5

**Input**
```text
4
3 2 1 10
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
5
7 1 7 1 7
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
4
9 8 1 8
```

**Expected Output**
```text
9
```

#### Test Case 8

**Input**
```text
5
2 9 2 9 2
```

**Expected Output**
```text
6
```

#### Test Case 9

**Input**
```text
5
1 2 3 4 5
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
4
3 3 1 4
```

**Expected Output**
```text
4
```


## Question 432 — House Robber — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Choose a set of non-adjacent houses to maximize collected value. Print the maximum possible total.

### Input Format
The first line contains `n`. The second line contains `n` non-negative house values.

### Output Format
Print the maximum sum obtained by choosing values with no two chosen positions adjacent.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
4
2 1 1 2
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
4
2 1 1 2
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
4
1 2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 6

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
5
4 10 3 1 5
```

**Expected Output**
```text
15
```

#### Test Case 8

**Input**
```text
4
6 6 6 6
```

**Expected Output**
```text
12
```

#### Test Case 9

**Input**
```text
3
9 1 9
```

**Expected Output**
```text
18
```

#### Test Case 10

**Input**
```text
4
2 2 7 3
```

**Expected Output**
```text
9
```


## Question 433 — Coin Change Minimum — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Unlimited copies of each denomination are available. Find the minimum number of coins required to make the exact target.

### Input Format
The first line contains `n` and target `T`. The second line contains `n` distinct positive coin denominations.

### Output Format
Print the minimum number of coins needed to form exactly `T`, or `-1` if impossible.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 11
1 2 5
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
1 3
2
```

**Output**
```text
-1
```

**Explanation**
The second input produces `-1` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 11
1 2 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1 3
2
```

**Expected Output**
```text
-1
```

#### Test Case 3

**Input**
```text
1 0
1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 27
2 5 10
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
2 14
3 7
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 6
1 3 4
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
2 1
5 7
```

**Expected Output**
```text
-1
```

#### Test Case 8

**Input**
```text
2 8
2 4
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
4 11
1 5 6 8
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3 13
2 3 7
```

**Expected Output**
```text
3
```


## Question 434 — Longest Increasing Subsequence — Variant 3
**Difficulty:** Very Hard

### Problem Statement
A subsequence keeps original order but may skip elements. Find the maximum possible length of a strictly increasing subsequence.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the length of the longest strictly increasing subsequence.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Output**
```text
4
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `4`.

### Worked Example 2

**Input**
```text
6
0 1 0 3 2 3
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
6
0 1 0 3 2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
4 3 2 1
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
-1 0 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
5
3 10 2 1 20
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
6
5 4 11 1 16 8
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
4
2 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
6
2 3 1 5 2 6
```

**Expected Output**
```text
4
```


## Question 435 — Partition Equal Sum — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Each array element must belong to exactly one of two groups. Determine whether the two group sums can be equal.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print `YES` if the array can be split into two groups with equal sums, otherwise `NO`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
1 5 11 5
```

**Output**
```text
YES
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `YES`.

### Worked Example 2

**Input**
```text
4
1 2 3 5
```

**Output**
```text
NO
```

**Explanation**
The second input produces `NO` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 11 5
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
4
1 2 3 5
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2
2 2
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1
1
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
5
3 3 3 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
2
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5
7 3 2 5 1
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4
10 10 1 1
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4
2 1 2 3
```

**Expected Output**
```text
YES
```


## Question 436 — Grid Minimum Path — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Find the least-cost path through a non-negative grid when movement is restricted to right and down.

### Input Format
The first line contains `r c`. The next `r` lines contain `c` non-negative integers.

### Output Format
Print the minimum sum of a path from the top-left cell to the bottom-right cell, moving only right or down.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Output**
```text
7
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `7`.

### Worked Example 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Output**
```text
12
```

**Explanation**
The second input produces `12` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 3

**Input**
```text
1 1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
2 2
1 2
1 1
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
2 3
0 1 0
1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 3
2 8 1
1 3 2
4 2 1
```

**Expected Output**
```text
9
```

#### Test Case 7

**Input**
```text
3 2
9 1
1 9
1 1
```

**Expected Output**
```text
12
```

#### Test Case 8

**Input**
```text
1 4
3 1 7 2
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
3 1
1
2
3
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
2 2
3 2
3 1
```

**Expected Output**
```text
6
```


## Question 437 — String Edit Distance — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Compute the Levenshtein edit distance between two strings.

### Input Format
The first line contains string `a`. The second line contains string `b`. Either string may be empty.

### Output Format
Print the minimum number of single-character insertions, deletions, or substitutions needed to transform `a` into `b`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
horse
ros
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
intention
execution
```

**Output**
```text
5
```

**Explanation**
The second input produces `5` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
horse
ros
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
intention
execution
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
a
a
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
a
b
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text

abc
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
abc

```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
kitten
sitting
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
flaw
lawn
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
abc
abc
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
book
back
```

**Expected Output**
```text
2
```


## Question 438 — Maximum Product Subarray — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Find the contiguous subarray with the largest product; the subarray must contain at least one element.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum product of any non-empty contiguous subarray.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
2 3 -2 4
```

**Output**
```text
6
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `6`.

### Worked Example 2

**Input**
```text
3
-2 0 -1
```

**Output**
```text
0
```

**Explanation**
The second input produces `0` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
2 3 -2 4
```

**Expected Output**
```text
6
```

#### Test Case 2

**Input**
```text
3
-2 0 -1
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
-2 3 -4
```

**Expected Output**
```text
24
```

#### Test Case 4

**Input**
```text
2
0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
-2 -3 -4
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 7

**Input**
```text
4
-1 -2 -3 0
```

**Expected Output**
```text
6
```

#### Test Case 8

**Input**
```text
5
2 -5 -2 -4 3
```

**Expected Output**
```text
24
```

#### Test Case 9

**Input**
```text
1
-1
```

**Expected Output**
```text
-1
```

#### Test Case 10

**Input**
```text
3
2 -2 3
```

**Expected Output**
```text
3
```


## Question 439 — Decode Digit String — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Count how many different letter decodings can be formed from the digit string.

### Input Format
One line contains a string of decimal digits. A code maps `1→A` through `26→Z`; a zero can only be part of a valid two-digit code.

### Output Format
Print the number of valid decodings. Print `0` when the string cannot be decoded.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
12
```

**Output**
```text
2
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `2`.

### Worked Example 2

**Input**
```text
226
```

**Output**
```text
3
```

**Explanation**
The second input produces `3` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
12
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
226
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
06
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
11106
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
10
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
27
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
101
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
2611055971756562
```

**Expected Output**
```text
4
```

#### Test Case 10

**Input**
```text
123456
```

**Expected Output**
```text
3
```


## Question 440 — Maximum Sum Non-Adjacent — Variant 3
**Difficulty:** Very Hard

### Problem Statement
Select non-adjacent values to maximize their sum. Adjacent positions cannot both be selected.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print the maximum sum obtainable without choosing adjacent positions.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
6
2 7 9 3 1 4
```

**Output**
```text
15
```

**Explanation**
The second input produces `15` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
6
2 7 9 3 1 4
```

**Expected Output**
```text
15
```

#### Test Case 3

**Input**
```text
6
5 5 10 100 10 5
```

**Expected Output**
```text
110
```

#### Test Case 4

**Input**
```text
5
3 2 5 10 7
```

**Expected Output**
```text
15
```

#### Test Case 5

**Input**
```text
6
1 2 3 4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 7

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4
8 1 8 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
3
9 9 1
```

**Expected Output**
```text
10
```

#### Test Case 10

**Input**
```text
4
3 4 7 2
```

**Expected Output**
```text
10
```


## Question 441 — Climbing Cost — Variant 4
**Difficulty:** Very Hard

### Problem Statement
Starting before platform 0, move forward by one or two positions. Landing on a platform incurs its cost; reaching position `n` costs nothing. Find the minimum total cost.

### Input Format
The first line contains `n`. The second line contains `n` non-negative landing costs.

### Output Format
Print the minimum cost to reach position `n`, where each move advances 1 or 2 positions and landing on platform `i` costs `cost[i]`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
10 15 20 5 8
```

**Output**
```text
20
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `20`.

### Worked Example 2

**Input**
```text
4
1 100 1 1
```

**Output**
```text
2
```

**Explanation**
The second input produces `2` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
10 15 20 5 8
```

**Expected Output**
```text
20
```

#### Test Case 2

**Input**
```text
4
1 100 1 1
```

**Expected Output**
```text
2
```

#### Test Case 3

**Input**
```text
5
0 5 0 5 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
2
5 5
```

**Expected Output**
```text
5
```

#### Test Case 5

**Input**
```text
4
3 2 1 10
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
5
7 1 7 1 7
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
4
9 8 1 8
```

**Expected Output**
```text
9
```

#### Test Case 8

**Input**
```text
5
2 9 2 9 2
```

**Expected Output**
```text
6
```

#### Test Case 9

**Input**
```text
5
1 2 3 4 5
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
4
4 3 1 4
```

**Expected Output**
```text
4
```


## Question 442 — House Robber — Variant 4
**Difficulty:** Very Hard

### Problem Statement
Choose a set of non-adjacent houses to maximize collected value. Print the maximum possible total.

### Input Format
The first line contains `n`. The second line contains `n` non-negative house values.

### Output Format
Print the maximum sum obtained by choosing values with no two chosen positions adjacent.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
4
2 1 1 2
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
4
2 1 1 2
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
4
1 2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 6

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
5
4 10 3 1 5
```

**Expected Output**
```text
15
```

#### Test Case 8

**Input**
```text
4
6 6 6 6
```

**Expected Output**
```text
12
```

#### Test Case 9

**Input**
```text
3
9 1 9
```

**Expected Output**
```text
18
```

#### Test Case 10

**Input**
```text
4
3 2 7 3
```

**Expected Output**
```text
10
```


## Question 443 — Coin Change Minimum — Variant 4
**Difficulty:** Very Hard / Challenge

### Problem Statement
Unlimited copies of each denomination are available. Find the minimum number of coins required to make the exact target.

### Input Format
The first line contains `n` and target `T`. The second line contains `n` distinct positive coin denominations.

### Output Format
Print the minimum number of coins needed to form exactly `T`, or `-1` if impossible.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 11
1 2 5
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
1 3
2
```

**Output**
```text
-1
```

**Explanation**
The second input produces `-1` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 11
1 2 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1 3
2
```

**Expected Output**
```text
-1
```

#### Test Case 3

**Input**
```text
1 0
1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 27
2 5 10
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
2 14
3 7
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 6
1 3 4
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
2 1
5 7
```

**Expected Output**
```text
-1
```

#### Test Case 8

**Input**
```text
2 8
2 4
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
4 11
1 5 6 8
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3 13
2 3 7
```

**Expected Output**
```text
3
```


## Question 444 — Longest Increasing Subsequence — Variant 4
**Difficulty:** Very Hard / Challenge

### Problem Statement
A subsequence keeps original order but may skip elements. Find the maximum possible length of a strictly increasing subsequence.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the length of the longest strictly increasing subsequence.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Output**
```text
4
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `4`.

### Worked Example 2

**Input**
```text
6
0 1 0 3 2 3
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
6
0 1 0 3 2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
4 3 2 1
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
-1 0 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
5
3 10 2 1 20
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
6
5 4 11 1 16 8
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
4
2 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
6
3 3 1 5 2 6
```

**Expected Output**
```text
3
```


## Question 445 — Partition Equal Sum — Variant 4
**Difficulty:** Very Hard / Challenge

### Problem Statement
Each array element must belong to exactly one of two groups. Determine whether the two group sums can be equal.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print `YES` if the array can be split into two groups with equal sums, otherwise `NO`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
1 5 11 5
```

**Output**
```text
YES
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `YES`.

### Worked Example 2

**Input**
```text
4
1 2 3 5
```

**Output**
```text
NO
```

**Explanation**
The second input produces `NO` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 11 5
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
4
1 2 3 5
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2
2 2
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1
1
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
5
3 3 3 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
2
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5
7 3 2 5 1
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4
10 10 1 1
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4
3 1 2 3
```

**Expected Output**
```text
NO
```


## Question 446 — Grid Minimum Path — Variant 4
**Difficulty:** Very Hard / Challenge

### Problem Statement
Find the least-cost path through a non-negative grid when movement is restricted to right and down.

### Input Format
The first line contains `r c`. The next `r` lines contain `c` non-negative integers.

### Output Format
Print the minimum sum of a path from the top-left cell to the bottom-right cell, moving only right or down.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Output**
```text
7
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `7`.

### Worked Example 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Output**
```text
12
```

**Explanation**
The second input produces `12` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 3

**Input**
```text
1 1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
2 2
1 2
1 1
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
2 3
0 1 0
1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 3
2 8 1
1 3 2
4 2 1
```

**Expected Output**
```text
9
```

#### Test Case 7

**Input**
```text
3 2
9 1
1 9
1 1
```

**Expected Output**
```text
12
```

#### Test Case 8

**Input**
```text
1 4
3 1 7 2
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
3 1
1
2
3
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
2 2
4 2
3 1
```

**Expected Output**
```text
7
```


## Question 447 — String Edit Distance — Variant 4
**Difficulty:** Very Hard / Challenge

### Problem Statement
Compute the Levenshtein edit distance between two strings.

### Input Format
The first line contains string `a`. The second line contains string `b`. Either string may be empty.

### Output Format
Print the minimum number of single-character insertions, deletions, or substitutions needed to transform `a` into `b`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
horse
ros
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
intention
execution
```

**Output**
```text
5
```

**Explanation**
The second input produces `5` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
horse
ros
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
intention
execution
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
a
a
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
a
b
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text

abc
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
abc

```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
kitten
sitting
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
flaw
lawn
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
abc
abc
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
book
back
```

**Expected Output**
```text
2
```


## Question 448 — Maximum Product Subarray — Variant 4
**Difficulty:** Very Hard / Challenge

### Problem Statement
Find the contiguous subarray with the largest product; the subarray must contain at least one element.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum product of any non-empty contiguous subarray.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
2 3 -2 4
```

**Output**
```text
6
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `6`.

### Worked Example 2

**Input**
```text
3
-2 0 -1
```

**Output**
```text
0
```

**Explanation**
The second input produces `0` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
2 3 -2 4
```

**Expected Output**
```text
6
```

#### Test Case 2

**Input**
```text
3
-2 0 -1
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
-2 3 -4
```

**Expected Output**
```text
24
```

#### Test Case 4

**Input**
```text
2
0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
-2 -3 -4
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 7

**Input**
```text
4
-1 -2 -3 0
```

**Expected Output**
```text
6
```

#### Test Case 8

**Input**
```text
5
2 -5 -2 -4 3
```

**Expected Output**
```text
24
```

#### Test Case 9

**Input**
```text
1
-1
```

**Expected Output**
```text
-1
```

#### Test Case 10

**Input**
```text
3
3 -2 3
```

**Expected Output**
```text
3
```


## Question 449 — Decode Digit String — Variant 4
**Difficulty:** Very Hard / Challenge

### Problem Statement
Count how many different letter decodings can be formed from the digit string.

### Input Format
One line contains a string of decimal digits. A code maps `1→A` through `26→Z`; a zero can only be part of a valid two-digit code.

### Output Format
Print the number of valid decodings. Print `0` when the string cannot be decoded.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
12
```

**Output**
```text
2
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `2`.

### Worked Example 2

**Input**
```text
226
```

**Output**
```text
3
```

**Explanation**
The second input produces `3` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
12
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
226
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
06
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
11106
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
10
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
27
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
101
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
2611055971756562
```

**Expected Output**
```text
4
```

#### Test Case 10

**Input**
```text
123456
```

**Expected Output**
```text
3
```


## Question 450 — Maximum Sum Non-Adjacent — Variant 4
**Difficulty:** Very Hard / Challenge

### Problem Statement
Select non-adjacent values to maximize their sum. Adjacent positions cannot both be selected.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print the maximum sum obtainable without choosing adjacent positions.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
6
2 7 9 3 1 4
```

**Output**
```text
15
```

**Explanation**
The second input produces `15` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
6
2 7 9 3 1 4
```

**Expected Output**
```text
15
```

#### Test Case 3

**Input**
```text
6
5 5 10 100 10 5
```

**Expected Output**
```text
110
```

#### Test Case 4

**Input**
```text
5
3 2 5 10 7
```

**Expected Output**
```text
15
```

#### Test Case 5

**Input**
```text
6
1 2 3 4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 7

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4
8 1 8 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
3
9 9 1
```

**Expected Output**
```text
10
```

#### Test Case 10

**Input**
```text
4
4 4 7 2
```

**Expected Output**
```text
11
```


## Question 451 — Climbing Cost — Variant 5
**Difficulty:** Very Hard / Challenge

### Problem Statement
Starting before platform 0, move forward by one or two positions. Landing on a platform incurs its cost; reaching position `n` costs nothing. Find the minimum total cost.

### Input Format
The first line contains `n`. The second line contains `n` non-negative landing costs.

### Output Format
Print the minimum cost to reach position `n`, where each move advances 1 or 2 positions and landing on platform `i` costs `cost[i]`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
10 15 20 5 8
```

**Output**
```text
20
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `20`.

### Worked Example 2

**Input**
```text
4
1 100 1 1
```

**Output**
```text
2
```

**Explanation**
The second input produces `2` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
10 15 20 5 8
```

**Expected Output**
```text
20
```

#### Test Case 2

**Input**
```text
4
1 100 1 1
```

**Expected Output**
```text
2
```

#### Test Case 3

**Input**
```text
5
0 5 0 5 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
2
5 5
```

**Expected Output**
```text
5
```

#### Test Case 5

**Input**
```text
4
3 2 1 10
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
5
7 1 7 1 7
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
4
9 8 1 8
```

**Expected Output**
```text
9
```

#### Test Case 8

**Input**
```text
5
2 9 2 9 2
```

**Expected Output**
```text
6
```

#### Test Case 9

**Input**
```text
5
1 2 3 4 5
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
4
5 3 1 4
```

**Expected Output**
```text
4
```


## Question 452 — House Robber — Variant 5
**Difficulty:** Very Hard / Challenge

### Problem Statement
Choose a set of non-adjacent houses to maximize collected value. Print the maximum possible total.

### Input Format
The first line contains `n`. The second line contains `n` non-negative house values.

### Output Format
Print the maximum sum obtained by choosing values with no two chosen positions adjacent.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
4
2 1 1 2
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
4
2 1 1 2
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
4
1 2 3 1
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 6

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
5
4 10 3 1 5
```

**Expected Output**
```text
15
```

#### Test Case 8

**Input**
```text
4
6 6 6 6
```

**Expected Output**
```text
12
```

#### Test Case 9

**Input**
```text
3
9 1 9
```

**Expected Output**
```text
18
```

#### Test Case 10

**Input**
```text
4
4 2 7 3
```

**Expected Output**
```text
11
```


## Question 453 — Coin Change Minimum — Variant 5
**Difficulty:** Very Hard / Challenge

### Problem Statement
Unlimited copies of each denomination are available. Find the minimum number of coins required to make the exact target.

### Input Format
The first line contains `n` and target `T`. The second line contains `n` distinct positive coin denominations.

### Output Format
Print the minimum number of coins needed to form exactly `T`, or `-1` if impossible.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 11
1 2 5
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
1 3
2
```

**Output**
```text
-1
```

**Explanation**
The second input produces `-1` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 11
1 2 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1 3
2
```

**Expected Output**
```text
-1
```

#### Test Case 3

**Input**
```text
1 0
1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 27
2 5 10
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
2 14
3 7
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 6
1 3 4
```

**Expected Output**
```text
2
```

#### Test Case 7

**Input**
```text
2 1
5 7
```

**Expected Output**
```text
-1
```

#### Test Case 8

**Input**
```text
2 8
2 4
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
4 11
1 5 6 8
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3 13
2 3 7
```

**Expected Output**
```text
3
```


## Question 454 — Longest Increasing Subsequence — Variant 5
**Difficulty:** Very Hard / Challenge

### Problem Statement
A subsequence keeps original order but may skip elements. Find the maximum possible length of a strictly increasing subsequence.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the length of the longest strictly increasing subsequence.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Output**
```text
4
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `4`.

### Worked Example 2

**Input**
```text
6
0 1 0 3 2 3
```

**Output**
```text
4
```

**Explanation**
The second input produces `4` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
8
10 9 2 5 3 7 101 18
```

**Expected Output**
```text
4
```

#### Test Case 2

**Input**
```text
6
0 1 0 3 2 3
```

**Expected Output**
```text
4
```

#### Test Case 3

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
4
4 3 2 1
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
-1 0 1
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
5
3 10 2 1 20
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
6
5 4 11 1 16 8
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
4
2 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
6
4 3 1 5 2 6
```

**Expected Output**
```text
3
```


## Question 455 — Partition Equal Sum — Variant 5
**Difficulty:** Very Hard / Challenge

### Problem Statement
Each array element must belong to exactly one of two groups. Determine whether the two group sums can be equal.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print `YES` if the array can be split into two groups with equal sums, otherwise `NO`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
1 5 11 5
```

**Output**
```text
YES
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `YES`.

### Worked Example 2

**Input**
```text
4
1 2 3 5
```

**Output**
```text
NO
```

**Explanation**
The second input produces `NO` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 11 5
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
4
1 2 3 5
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2
2 2
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
1
1
```

**Expected Output**
```text
NO
```

#### Test Case 5

**Input**
```text
5
3 3 3 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
2
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 7

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
5
7 3 2 5 1
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
4
10 10 1 1
```

**Expected Output**
```text
YES
```

#### Test Case 10

**Input**
```text
4
4 1 2 3
```

**Expected Output**
```text
YES
```


## Question 456 — Grid Minimum Path — Variant 5
**Difficulty:** Very Hard / Challenge

### Problem Statement
Find the least-cost path through a non-negative grid when movement is restricted to right and down.

### Input Format
The first line contains `r c`. The next `r` lines contain `c` non-negative integers.

### Output Format
Print the minimum sum of a path from the top-left cell to the bottom-right cell, moving only right or down.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Output**
```text
7
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `7`.

### Worked Example 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Output**
```text
12
```

**Explanation**
The second input produces `12` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 1
1 5 1
4 2 1
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
2 3
1 2 3
4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 3

**Input**
```text
1 1
5
```

**Expected Output**
```text
5
```

#### Test Case 4

**Input**
```text
2 2
1 2
1 1
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
2 3
0 1 0
1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
3 3
2 8 1
1 3 2
4 2 1
```

**Expected Output**
```text
9
```

#### Test Case 7

**Input**
```text
3 2
9 1
1 9
1 1
```

**Expected Output**
```text
12
```

#### Test Case 8

**Input**
```text
1 4
3 1 7 2
```

**Expected Output**
```text
13
```

#### Test Case 9

**Input**
```text
3 1
1
2
3
```

**Expected Output**
```text
6
```

#### Test Case 10

**Input**
```text
2 2
1 2
3 1
```

**Expected Output**
```text
4
```


## Question 457 — String Edit Distance — Variant 5
**Difficulty:** Very Hard / Challenge

### Problem Statement
Compute the Levenshtein edit distance between two strings.

### Input Format
The first line contains string `a`. The second line contains string `b`. Either string may be empty.

### Output Format
Print the minimum number of single-character insertions, deletions, or substitutions needed to transform `a` into `b`.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
horse
ros
```

**Output**
```text
3
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `3`.

### Worked Example 2

**Input**
```text
intention
execution
```

**Output**
```text
5
```

**Explanation**
The second input produces `5` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
horse
ros
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
intention
execution
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
a
a
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
a
b
```

**Expected Output**
```text
1
```

#### Test Case 5

**Input**
```text

abc
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
abc

```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
kitten
sitting
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
flaw
lawn
```

**Expected Output**
```text
2
```

#### Test Case 9

**Input**
```text
abc
abc
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
book
back
```

**Expected Output**
```text
2
```


## Question 458 — Maximum Product Subarray — Variant 5
**Difficulty:** Very Hard / Challenge

### Problem Statement
Find the contiguous subarray with the largest product; the subarray must contain at least one element.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum product of any non-empty contiguous subarray.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
4
2 3 -2 4
```

**Output**
```text
6
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `6`.

### Worked Example 2

**Input**
```text
3
-2 0 -1
```

**Output**
```text
0
```

**Explanation**
The second input produces `0` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
4
2 3 -2 4
```

**Expected Output**
```text
6
```

#### Test Case 2

**Input**
```text
3
-2 0 -1
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
-2 3 -4
```

**Expected Output**
```text
24
```

#### Test Case 4

**Input**
```text
2
0 0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
-2 -3 -4
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 7

**Input**
```text
4
-1 -2 -3 0
```

**Expected Output**
```text
6
```

#### Test Case 8

**Input**
```text
5
2 -5 -2 -4 3
```

**Expected Output**
```text
24
```

#### Test Case 9

**Input**
```text
1
-1
```

**Expected Output**
```text
-1
```

#### Test Case 10

**Input**
```text
3
4 -2 3
```

**Expected Output**
```text
4
```


## Question 459 — Decode Digit String — Variant 5
**Difficulty:** Very Hard / Challenge

### Problem Statement
Count how many different letter decodings can be formed from the digit string.

### Input Format
One line contains a string of decimal digits. A code maps `1→A` through `26→Z`; a zero can only be part of a valid two-digit code.

### Output Format
Print the number of valid decodings. Print `0` when the string cannot be decoded.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
12
```

**Output**
```text
2
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `2`.

### Worked Example 2

**Input**
```text
226
```

**Output**
```text
3
```

**Explanation**
The second input produces `3` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
12
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
226
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
06
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
11106
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
10
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
27
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
101
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
2611055971756562
```

**Expected Output**
```text
4
```

#### Test Case 10

**Input**
```text
123456
```

**Expected Output**
```text
3
```


## Question 460 — Maximum Sum Non-Adjacent — Variant 5
**Difficulty:** Very Hard / Challenge

### Problem Statement
Select non-adjacent values to maximize their sum. Adjacent positions cannot both be selected.

### Input Format
The first line contains `n`. The second line contains `n` non-negative integers.

### Output Format
Print the maximum sum obtainable without choosing adjacent positions.

### Constraints
Use exact integer arithmetic. Input sizes are chosen so an efficient dynamic-programming formulation is required.

### Worked Example 1

**Input**
```text
5
2 7 9 3 1
```

**Output**
```text
12
```

**Explanation**
The first input is processed from its initial state; the resulting optimal value is `12`.

### Worked Example 2

**Input**
```text
6
2 7 9 3 1 4
```

**Output**
```text
15
```

**Explanation**
The second input produces `15` after applying the same state/transition definition.

### Test Cases

#### Test Case 1

**Input**
```text
5
2 7 9 3 1
```

**Expected Output**
```text
12
```

#### Test Case 2

**Input**
```text
6
2 7 9 3 1 4
```

**Expected Output**
```text
15
```

#### Test Case 3

**Input**
```text
6
5 5 10 100 10 5
```

**Expected Output**
```text
110
```

#### Test Case 4

**Input**
```text
5
3 2 5 10 7
```

**Expected Output**
```text
15
```

#### Test Case 5

**Input**
```text
6
1 2 3 4 5 6
```

**Expected Output**
```text
12
```

#### Test Case 6

**Input**
```text
4
10 1 1 10
```

**Expected Output**
```text
20
```

#### Test Case 7

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
4
8 1 8 1
```

**Expected Output**
```text
16
```

#### Test Case 9

**Input**
```text
3
9 9 1
```

**Expected Output**
```text
10
```

#### Test Case 10

**Input**
```text
4
5 4 7 2
```

**Expected Output**
```text
12
```


## Subdivision — Advanced Sequences and Bitwise Reasoning

## Question 461 — Array Sum — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
-2 1 3 -1 2
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
-2 1 3 -1 2
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
1 4 -2
```

**Expected Output**
```text
3
```


## Question 462 — Array Minimum — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
3 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
3 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
0 0 5
```

**Expected Output**
```text
0
```


## Question 463 — Count Above Threshold — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
0 1 9
```

**Expected Output**
```text
1
```


## Question 464 — Reverse Array — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
0 1 2
```

**Expected Output**
```text
2 1 0
```


## Question 465 — Rotate Left — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 0
1 2 3 4
```

**Expected Output**
```text
1 2 3 4
```


## Question 466 — Second Largest — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Find the second distinct largest value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the second distinct largest value, or `NONE` if fewer than two distinct values exist.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 5 3 5
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
2
1 2
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 3 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
2
1 2
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
5 5 5
```

**Expected Output**
```text
NONE
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-2
```

#### Test Case 5

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
9
```

#### Test Case 6

**Input**
```text
4
7 3 7 2
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3
0 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
75
```

#### Test Case 9

**Input**
```text
3
2 1 0
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3
0 2 1
```

**Expected Output**
```text
1
```


## Question 467 — Prefix Running Sum — Variant 1
**Difficulty:** Very Hard

### Problem Statement
For every position, report the sum from index 0 through that position.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the running sum after each element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
1 3 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 6`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 3 6
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 4

**Input**
```text
4
-1 2 -3 4
```

**Expected Output**
```text
-1 1 -2 2
```

#### Test Case 5

**Input**
```text
3
10 -5 2
```

**Expected Output**
```text
10 5 7
```

#### Test Case 6

**Input**
```text
2
7 7
```

**Expected Output**
```text
7 14
```

#### Test Case 7

**Input**
```text
3
100 -100 5
```

**Expected Output**
```text
100 0 5
```

#### Test Case 8

**Input**
```text
3
-2 -2 -2
```

**Expected Output**
```text
-2 -4 -6
```

#### Test Case 9

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 2 2
```

#### Test Case 10

**Input**
```text
3
0 1 2
```

**Expected Output**
```text
0 1 3
```


## Question 468 — Distinct Count — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Count how many distinct integer values occur.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the number of distinct values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 1 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3
-1 -2 -1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
0

```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
3
7 8 9
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
5
2 2 3 3 4
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
4
10 9 10 8
```

**Expected Output**
```text
3
```


## Question 469 — Longest Equal Run — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Find the longest consecutive run containing the same value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum length of a consecutive run of equal values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
6
1 1 2 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
6
1 1 2 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
5
1 1 2 1 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
4
-1 -1 -1 0
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
4
7 7 8 8
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
6
1 2 2 3 3 3
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
5
0 0 1 1 1
```

**Expected Output**
```text
3
```


## Question 470 — Pair Sum Exists — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Determine whether two distinct array positions contain values whose sum equals the target.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print `YES` if two distinct elements sum to `t`; otherwise print `NO`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 6
1 2 4
```

**Output**
```text
YES
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `YES`.

### Worked Example 2

**Input**
```text
3 10
1 2 3
```

**Output**
```text
NO
```

**Explanation**
For the second case, applying the same rule gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
3 6
1 2 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 10
1 2 3
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2 0
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
3 3
-1 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
3 4
2 2 2
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
1 1
1
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
3 14
5 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 -7
-5 -2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
2 25
10 20
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 1
0 1 2
```

**Expected Output**
```text
YES
```


## Question 471 — Move Zeroes — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Move all zeroes to the end while preserving non-zero order.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the array with all zeroes moved to the end while preserving the relative order of non-zero values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
0 1 0 3 12
```

**Output**
```text
1 3 12 0 0
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 12 0 0`.

### Worked Example 2

**Input**
```text
3
0 0 1
```

**Output**
```text
1 0 0
```

**Explanation**
For the second case, applying the same rule gives `1 0 0`.

### Test Cases

#### Test Case 1

**Input**
```text
5
0 1 0 3 12
```

**Expected Output**
```text
1 3 12 0 0
```

#### Test Case 2

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
1 0 0
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
2
0 0
```

**Expected Output**
```text
0 0
```

#### Test Case 6

**Input**
```text
5
1 0 2 0 3
```

**Expected Output**
```text
1 2 3 0 0
```

#### Test Case 7

**Input**
```text
3
-1 0 -2
```

**Expected Output**
```text
-1 -2 0
```

#### Test Case 8

**Input**
```text
3
5 0 5
```

**Expected Output**
```text
5 5 0
```

#### Test Case 9

**Input**
```text
5
0 1 0 0 2
```

**Expected Output**
```text
1 2 0 0 0
```

#### Test Case 10

**Input**
```text
4
0 0 1 0
```

**Expected Output**
```text
1 0 0 0
```


## Question 472 — Merge Sorted Arrays — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Merge two sorted arrays into one sorted sequence.

### Input Format
The first line contains `n m`. The second line contains `n` sorted integers. The third line contains `m` sorted integers.

### Output Format
Print the merged sorted sequence.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Output**
```text
1 2 3 4 5 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 2 3 4 5 6`.

### Worked Example 2

**Input**
```text
1 1
1
2
```

**Output**
```text
1 2
```

**Explanation**
For the second case, applying the same rule gives `1 2`.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Expected Output**
```text
1 2 3 4 5 6
```

#### Test Case 2

**Input**
```text
1 1
1
2
```

**Expected Output**
```text
1 2
```

#### Test Case 3

**Input**
```text
0 2

1 2
```

**Expected Output**
```text
1 2
```

#### Test Case 4

**Input**
```text
2 2
-3 0
-2 4
```

**Expected Output**
```text
-3 -2 0 4
```

#### Test Case 5

**Input**
```text
2 2
1 1
1 2
```

**Expected Output**
```text
1 1 1 2
```

#### Test Case 6

**Input**
```text
2 2
5 6
1 2
```

**Expected Output**
```text
1 2 5 6
```

#### Test Case 7

**Input**
```text
1 1
0
0
```

**Expected Output**
```text
0 0
```

#### Test Case 8

**Input**
```text
3 1
2 7 9
3
```

**Expected Output**
```text
2 3 7 9
```

#### Test Case 9

**Input**
```text
2 2
-5 -1
-4 -2
```

**Expected Output**
```text
-5 -4 -2 -1
```

#### Test Case 10

**Input**
```text
2 2
0 10
1 11
```

**Expected Output**
```text
0 1 10 11
```


## Question 473 — Frequency of Target — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Count occurrences of a target value.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print the number of occurrences of `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 1
1 2 1 1
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3 5
5 5 5
```

**Output**
```text
3
```

**Explanation**
For the second case, applying the same rule gives `3`.

### Test Cases

#### Test Case 1

**Input**
```text
4 1
1 2 1 1
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
3 -1
-1 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
1 7
7
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
4 2
1 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
3 9
10 9 8
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
3 0
0 1 0
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
0 0

```

**Expected Output**
```text
0
```


## Question 474 — First Maximum Index — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Find the first zero-based index of the maximum value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the zero-based index of the first occurrence of the maximum value.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 9 3
```

**Output**
```text
1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
0
```

**Explanation**
For the second case, applying the same rule gives `0`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 9 3
```

**Expected Output**
```text
1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
2 2 1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
0 4 4
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
7 1 7
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
0 3 3
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
3 2 5 5
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3
100 -1 100
```

**Expected Output**
```text
0
```


## Question 475 — Alternating Sum — Variant 1
**Difficulty:** Very Hard

### Problem Statement
Compute the sum at even indices minus the sum at odd indices.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of elements at even indices minus the sum at odd indices.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 3 4
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
2 4 6
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
3
10 1 5
```

**Expected Output**
```text
14
```

#### Test Case 6

**Input**
```text
3
-1 2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
-2
```

#### Test Case 8

**Input**
```text
2
7 3
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
4
0 1 2 3
```

**Expected Output**
```text
-2
```


## Question 476 — Array Sum — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
-1 2 3 -1 2
```

**Output**
```text
5
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `5`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
-1 2 3 -1 2
```

**Expected Output**
```text
5
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
2 4 -2
```

**Expected Output**
```text
4
```


## Question 477 — Array Minimum — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
4 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
4 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
1 -1 5
```

**Expected Output**
```text
-1
```


## Question 478 — Count Above Threshold — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
1 1 9
```

**Expected Output**
```text
1
```


## Question 479 — Reverse Array — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```


## Question 480 — Rotate Left — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 1
2 2 3 4
```

**Expected Output**
```text
2 3 4 2
```


## Question 481 — Second Largest — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Find the second distinct largest value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the second distinct largest value, or `NONE` if fewer than two distinct values exist.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 5 3 5
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
2
1 2
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 3 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
2
1 2
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
5 5 5
```

**Expected Output**
```text
NONE
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-2
```

#### Test Case 5

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
9
```

#### Test Case 6

**Input**
```text
4
7 3 7 2
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3
0 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
75
```

#### Test Case 9

**Input**
```text
3
2 1 0
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3
1 3 2
```

**Expected Output**
```text
2
```


## Question 482 — Prefix Running Sum — Variant 2
**Difficulty:** Very Hard

### Problem Statement
For every position, report the sum from index 0 through that position.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the running sum after each element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
1 3 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 6`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 3 6
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 4

**Input**
```text
4
-1 2 -3 4
```

**Expected Output**
```text
-1 1 -2 2
```

#### Test Case 5

**Input**
```text
3
10 -5 2
```

**Expected Output**
```text
10 5 7
```

#### Test Case 6

**Input**
```text
2
7 7
```

**Expected Output**
```text
7 14
```

#### Test Case 7

**Input**
```text
3
100 -100 5
```

**Expected Output**
```text
100 0 5
```

#### Test Case 8

**Input**
```text
3
-2 -2 -2
```

**Expected Output**
```text
-2 -4 -6
```

#### Test Case 9

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 2 2
```

#### Test Case 10

**Input**
```text
3
1 1 2
```

**Expected Output**
```text
1 2 4
```


## Question 483 — Distinct Count — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Count how many distinct integer values occur.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the number of distinct values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 1 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3
-1 -2 -1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
0

```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
3
7 8 9
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
5
2 2 3 3 4
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
3
1 1 2
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
4
10 9 10 8
```

**Expected Output**
```text
3
```


## Question 484 — Longest Equal Run — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Find the longest consecutive run containing the same value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum length of a consecutive run of equal values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
6
1 1 2 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
6
1 1 2 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
5
1 1 2 1 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
4
-1 -1 -1 0
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
4
7 7 8 8
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
6
1 2 2 3 3 3
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
5
1 1 2 2 2
```

**Expected Output**
```text
3
```


## Question 485 — Pair Sum Exists — Variant 2
**Difficulty:** Very Hard

### Problem Statement
Determine whether two distinct array positions contain values whose sum equals the target.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print `YES` if two distinct elements sum to `t`; otherwise print `NO`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 6
1 2 4
```

**Output**
```text
YES
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `YES`.

### Worked Example 2

**Input**
```text
3 10
1 2 3
```

**Output**
```text
NO
```

**Explanation**
For the second case, applying the same rule gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
3 6
1 2 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 10
1 2 3
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2 0
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
3 3
-1 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
3 4
2 2 2
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
1 1
1
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
3 14
5 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 -7
-5 -2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
2 25
10 20
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 2
1 1 2
```

**Expected Output**
```text
YES
```


## Question 486 — Move Zeroes — Variant 2
**Difficulty:** Very Hard / Challenge

### Problem Statement
Move all zeroes to the end while preserving non-zero order.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the array with all zeroes moved to the end while preserving the relative order of non-zero values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
0 1 0 3 12
```

**Output**
```text
1 3 12 0 0
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 12 0 0`.

### Worked Example 2

**Input**
```text
3
0 0 1
```

**Output**
```text
1 0 0
```

**Explanation**
For the second case, applying the same rule gives `1 0 0`.

### Test Cases

#### Test Case 1

**Input**
```text
5
0 1 0 3 12
```

**Expected Output**
```text
1 3 12 0 0
```

#### Test Case 2

**Input**
```text
3
0 0 1
```

**Expected Output**
```text
1 0 0
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
2
0 0
```

**Expected Output**
```text
0 0
```

#### Test Case 6

**Input**
```text
5
1 0 2 0 3
```

**Expected Output**
```text
1 2 3 0 0
```

#### Test Case 7

**Input**
```text
3
-1 0 -2
```

**Expected Output**
```text
-1 -2 0
```

#### Test Case 8

**Input**
```text
3
5 0 5
```

**Expected Output**
```text
5 5 0
```

#### Test Case 9

**Input**
```text
5
0 1 0 0 2
```

**Expected Output**
```text
1 2 0 0 0
```

#### Test Case 10

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 0 0
```


## Question 487 — Merge Sorted Arrays — Variant 2
**Difficulty:** Very Hard / Challenge

### Problem Statement
Merge two sorted arrays into one sorted sequence.

### Input Format
The first line contains `n m`. The second line contains `n` sorted integers. The third line contains `m` sorted integers.

### Output Format
Print the merged sorted sequence.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Output**
```text
1 2 3 4 5 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 2 3 4 5 6`.

### Worked Example 2

**Input**
```text
1 1
1
2
```

**Output**
```text
1 2
```

**Explanation**
For the second case, applying the same rule gives `1 2`.

### Test Cases

#### Test Case 1

**Input**
```text
3 3
1 3 5
2 4 6
```

**Expected Output**
```text
1 2 3 4 5 6
```

#### Test Case 2

**Input**
```text
1 1
1
2
```

**Expected Output**
```text
1 2
```

#### Test Case 3

**Input**
```text
0 2

1 2
```

**Expected Output**
```text
1 2
```

#### Test Case 4

**Input**
```text
2 2
-3 0
-2 4
```

**Expected Output**
```text
-3 -2 0 4
```

#### Test Case 5

**Input**
```text
2 2
1 1
1 2
```

**Expected Output**
```text
1 1 1 2
```

#### Test Case 6

**Input**
```text
2 2
5 6
1 2
```

**Expected Output**
```text
1 2 5 6
```

#### Test Case 7

**Input**
```text
1 1
0
0
```

**Expected Output**
```text
0 0
```

#### Test Case 8

**Input**
```text
3 1
2 7 9
3
```

**Expected Output**
```text
2 3 7 9
```

#### Test Case 9

**Input**
```text
2 2
-5 -1
-4 -2
```

**Expected Output**
```text
-5 -4 -2 -1
```

#### Test Case 10

**Input**
```text
2 2
1 10
1 11
```

**Expected Output**
```text
1 1 10 11
```


## Question 488 — Frequency of Target — Variant 2
**Difficulty:** Very Hard / Challenge

### Problem Statement
Count occurrences of a target value.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print the number of occurrences of `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 1
1 2 1 1
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3 5
5 5 5
```

**Output**
```text
3
```

**Explanation**
For the second case, applying the same rule gives `3`.

### Test Cases

#### Test Case 1

**Input**
```text
4 1
1 2 1 1
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
3
```

#### Test Case 3

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
3 -1
-1 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
1 7
7
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
4 2
1 2 1 2
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
3 9
10 9 8
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
3 1
1 1 1
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
0 0

```

**Expected Output**
```text
0
```


## Question 489 — First Maximum Index — Variant 2
**Difficulty:** Very Hard / Challenge

### Problem Statement
Find the first zero-based index of the maximum value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the zero-based index of the first occurrence of the maximum value.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 9 3
```

**Output**
```text
1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
0
```

**Explanation**
For the second case, applying the same rule gives `0`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 9 3
```

**Expected Output**
```text
1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
0
```

#### Test Case 3

**Input**
```text
3
2 2 1
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
0 4 4
```

**Expected Output**
```text
1
```

#### Test Case 6

**Input**
```text
3
7 1 7
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
1 4 4
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
3 2 5 5
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
3
100 -1 100
```

**Expected Output**
```text
0
```


## Question 490 — Alternating Sum — Variant 2
**Difficulty:** Very Hard / Challenge

### Problem Statement
Compute the sum at even indices minus the sum at odd indices.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of elements at even indices minus the sum at odd indices.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 3 4
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 3 4
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
2 4 6
```

**Expected Output**
```text
4
```

#### Test Case 5

**Input**
```text
3
10 1 5
```

**Expected Output**
```text
14
```

#### Test Case 6

**Input**
```text
3
-1 2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
-2
```

#### Test Case 8

**Input**
```text
2
7 3
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
4
1 1 2 3
```

**Expected Output**
```text
-1
```


## Question 491 — Array Sum — Variant 3
**Difficulty:** Very Hard / Challenge

### Problem Statement
Calculate the sum of all values in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the sum of all array elements.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5
0 3 3 -1 2
```

**Output**
```text
7
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `7`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
6
```

**Explanation**
For the second case, applying the same rule gives `6`.

### Test Cases

#### Test Case 1

**Input**
```text
5
0 3 3 -1 2
```

**Expected Output**
```text
7
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
6
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0
```

#### Test Case 4

**Input**
```text
4
-5 2 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
1
10
```

**Expected Output**
```text
10
```

#### Test Case 6

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-6
```

#### Test Case 7

**Input**
```text
4
5 5 5 5
```

**Expected Output**
```text
20
```

#### Test Case 8

**Input**
```text
3
100 -100 1
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
4
2 0 7 -4
```

**Expected Output**
```text
5
```

#### Test Case 10

**Input**
```text
3
3 4 -2
```

**Expected Output**
```text
5
```


## Question 492 — Array Minimum — Variant 3
**Difficulty:** Very Hard / Challenge

### Problem Statement
Find the smallest value in an integer array.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the smallest element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
5 4 -2 8
```

**Output**
```text
-2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `-2`.

### Worked Example 2

**Input**
```text
3
1 2 3
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
5 4 -2 8
```

**Expected Output**
```text
-2
```

#### Test Case 2

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
-5 -1 -8
```

**Expected Output**
```text
-8
```

#### Test Case 4

**Input**
```text
1
0
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
50
```

#### Test Case 6

**Input**
```text
3
-10 -20 0
```

**Expected Output**
```text
-20
```

#### Test Case 7

**Input**
```text
3
7 7 7
```

**Expected Output**
```text
7
```

#### Test Case 8

**Input**
```text
3
2 -2 4
```

**Expected Output**
```text
-2
```

#### Test Case 9

**Input**
```text
4
9 1 9 0
```

**Expected Output**
```text
0
```

#### Test Case 10

**Input**
```text
3
2 -2 5
```

**Expected Output**
```text
-2
```


## Question 493 — Count Above Threshold — Variant 3
**Difficulty:** Very Hard / Challenge

### Problem Statement
Count values strictly greater than a supplied threshold.

### Input Format
The first line contains `n` and threshold `t`. The second line contains `n` integers.

### Output Format
Print how many elements are strictly greater than `t`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4 4
1 5 7 2
```

**Output**
```text
2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `2`.

### Worked Example 2

**Input**
```text
3 0
0 0 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4 4
1 5 7 2
```

**Expected Output**
```text
2
```

#### Test Case 2

**Input**
```text
3 0
0 0 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3 -2
-3 -1 2
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3 5
5 5 5
```

**Expected Output**
```text
0
```

#### Test Case 5

**Input**
```text
4 7
10 1 9 8
```

**Expected Output**
```text
3
```

#### Test Case 6

**Input**
```text
3 4
1 2 3
```

**Expected Output**
```text
0
```

#### Test Case 7

**Input**
```text
3 -4
-5 -4 -3
```

**Expected Output**
```text
1
```

#### Test Case 8

**Input**
```text
2 150
100 200
```

**Expected Output**
```text
1
```

#### Test Case 9

**Input**
```text
1 6
7
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3 3
2 1 9
```

**Expected Output**
```text
1
```


## Question 494 — Reverse Array — Variant 3
**Difficulty:** Very Hard / Challenge

### Problem Statement
Reverse the array without changing the values.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the elements in reverse order.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
3 2 1
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 2 1`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
3 2 1
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 1 0
```

**Expected Output**
```text
0 1 0
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-3 -2 -1
```

#### Test Case 5

**Input**
```text
4
10 20 30 40
```

**Expected Output**
```text
40 30 20 10
```

#### Test Case 6

**Input**
```text
3
7 7 8
```

**Expected Output**
```text
8 7 7
```

#### Test Case 7

**Input**
```text
0

```

**Expected Output**
```text

```

#### Test Case 8

**Input**
```text
2
100 -1
```

**Expected Output**
```text
-1 100
```

#### Test Case 9

**Input**
```text
4
2 4 6 8
```

**Expected Output**
```text
8 6 4 2
```

#### Test Case 10

**Input**
```text
3
2 3 4
```

**Expected Output**
```text
4 3 2
```


## Question 495 — Rotate Left — Variant 3
**Difficulty:** Very Hard / Challenge

### Problem Statement
Rotate the array left by `k` positions; rotations larger than `n` wrap around.

### Input Format
The first line contains `n` and `k`. The second line contains `n` integers.

### Output Format
Print the array after rotating it left by `k` positions.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
5 2
1 2 3 4 5
```

**Output**
```text
3 4 5 1 2
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3 4 5 1 2`.

### Worked Example 2

**Input**
```text
3 0
1 2 3
```

**Output**
```text
1 2 3
```

**Explanation**
For the second case, applying the same rule gives `1 2 3`.

### Test Cases

#### Test Case 1

**Input**
```text
5 2
1 2 3 4 5
```

**Expected Output**
```text
3 4 5 1 2
```

#### Test Case 2

**Input**
```text
3 0
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 3

**Input**
```text
3 3
1 2 3
```

**Expected Output**
```text
1 2 3
```

#### Test Case 4

**Input**
```text
1 5
7
```

**Expected Output**
```text
7
```

#### Test Case 5

**Input**
```text
4 1
1 2 3 4
```

**Expected Output**
```text
2 3 4 1
```

#### Test Case 6

**Input**
```text
3 2
-1 -2 -3
```

**Expected Output**
```text
-3 -1 -2
```

#### Test Case 7

**Input**
```text
4 3
5 4 3 2
```

**Expected Output**
```text
2 5 4 3
```

#### Test Case 8

**Input**
```text
2 1
9 8
```

**Expected Output**
```text
8 9
```

#### Test Case 9

**Input**
```text
3 1
1 1 2
```

**Expected Output**
```text
1 2 1
```

#### Test Case 10

**Input**
```text
4 2
3 2 3 4
```

**Expected Output**
```text
3 4 3 2
```


## Question 496 — Second Largest — Variant 3
**Difficulty:** Very Hard / Challenge

### Problem Statement
Find the second distinct largest value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the second distinct largest value, or `NONE` if fewer than two distinct values exist.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 5 3 5
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
2
1 2
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 5 3 5
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
2
1 2
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
5 5 5
```

**Expected Output**
```text
NONE
```

#### Test Case 4

**Input**
```text
3
-1 -2 -3
```

**Expected Output**
```text
-2
```

#### Test Case 5

**Input**
```text
3
10 9 8
```

**Expected Output**
```text
9
```

#### Test Case 6

**Input**
```text
4
7 3 7 2
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
3
0 -1 4
```

**Expected Output**
```text
0
```

#### Test Case 8

**Input**
```text
3
100 50 75
```

**Expected Output**
```text
75
```

#### Test Case 9

**Input**
```text
3
2 1 0
```

**Expected Output**
```text
1
```

#### Test Case 10

**Input**
```text
3
2 4 3
```

**Expected Output**
```text
3
```


## Question 497 — Prefix Running Sum — Variant 3
**Difficulty:** Very Hard / Challenge

### Problem Statement
For every position, report the sum from index 0 through that position.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the running sum after each element.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3
1 2 3
```

**Output**
```text
1 3 6
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `1 3 6`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
5
```

**Explanation**
For the second case, applying the same rule gives `5`.

### Test Cases

#### Test Case 1

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1 3 6
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
5
```

#### Test Case 3

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
0 0 0
```

#### Test Case 4

**Input**
```text
4
-1 2 -3 4
```

**Expected Output**
```text
-1 1 -2 2
```

#### Test Case 5

**Input**
```text
3
10 -5 2
```

**Expected Output**
```text
10 5 7
```

#### Test Case 6

**Input**
```text
2
7 7
```

**Expected Output**
```text
7 14
```

#### Test Case 7

**Input**
```text
3
100 -100 5
```

**Expected Output**
```text
100 0 5
```

#### Test Case 8

**Input**
```text
3
-2 -2 -2
```

**Expected Output**
```text
-2 -4 -6
```

#### Test Case 9

**Input**
```text
4
1 0 1 0
```

**Expected Output**
```text
1 1 2 2
```

#### Test Case 10

**Input**
```text
3
2 1 2
```

**Expected Output**
```text
2 3 5
```


## Question 498 — Distinct Count — Variant 3
**Difficulty:** Very Hard / Challenge

### Problem Statement
Count how many distinct integer values occur.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the number of distinct values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
4
1 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
3
1 1 1
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
4
1 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
3
1 1 1
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
4
0 1 0 1
```

**Expected Output**
```text
2
```

#### Test Case 4

**Input**
```text
3
-1 -2 -1
```

**Expected Output**
```text
2
```

#### Test Case 5

**Input**
```text
0

```

**Expected Output**
```text
0
```

#### Test Case 6

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 7

**Input**
```text
3
7 8 9
```

**Expected Output**
```text
3
```

#### Test Case 8

**Input**
```text
5
2 2 3 3 4
```

**Expected Output**
```text
3
```

#### Test Case 9

**Input**
```text
3
2 2 3
```

**Expected Output**
```text
2
```

#### Test Case 10

**Input**
```text
4
10 9 10 8
```

**Expected Output**
```text
3
```


## Question 499 — Longest Equal Run — Variant 3
**Difficulty:** Very Hard / Challenge

### Problem Statement
Find the longest consecutive run containing the same value.

### Input Format
The first line contains `n`. The second line contains `n` integers.

### Output Format
Print the maximum length of a consecutive run of equal values.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
6
1 1 2 2 2 3
```

**Output**
```text
3
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `3`.

### Worked Example 2

**Input**
```text
1
5
```

**Output**
```text
1
```

**Explanation**
For the second case, applying the same rule gives `1`.

### Test Cases

#### Test Case 1

**Input**
```text
6
1 1 2 2 2 3
```

**Expected Output**
```text
3
```

#### Test Case 2

**Input**
```text
1
5
```

**Expected Output**
```text
1
```

#### Test Case 3

**Input**
```text
3
1 2 3
```

**Expected Output**
```text
1
```

#### Test Case 4

**Input**
```text
3
0 0 0
```

**Expected Output**
```text
3
```

#### Test Case 5

**Input**
```text
5
1 1 2 1 1
```

**Expected Output**
```text
2
```

#### Test Case 6

**Input**
```text
4
-1 -1 -1 0
```

**Expected Output**
```text
3
```

#### Test Case 7

**Input**
```text
4
7 7 8 8
```

**Expected Output**
```text
2
```

#### Test Case 8

**Input**
```text
4
2 2 2 2
```

**Expected Output**
```text
4
```

#### Test Case 9

**Input**
```text
6
1 2 2 3 3 3
```

**Expected Output**
```text
3
```

#### Test Case 10

**Input**
```text
5
2 2 3 3 3
```

**Expected Output**
```text
3
```


## Question 500 — Pair Sum Exists — Variant 3
**Difficulty:** Very Hard / Challenge

### Problem Statement
Determine whether two distinct array positions contain values whose sum equals the target.

### Input Format
The first line contains `n` and target `t`. The second line contains `n` integers.

### Output Format
Print `YES` if two distinct elements sum to `t`; otherwise print `NO`.

### Constraints
1 ≤ n ≤ 100000; integer values are between -10^9 and 10^9.

### Worked Example 1

**Input**
```text
3 6
1 2 4
```

**Output**
```text
YES
```

**Explanation**
For the first case, the array values are processed exactly in the stated order. The required result is `YES`.

### Worked Example 2

**Input**
```text
3 10
1 2 3
```

**Output**
```text
NO
```

**Explanation**
For the second case, applying the same rule gives `NO`.

### Test Cases

#### Test Case 1

**Input**
```text
3 6
1 2 4
```

**Expected Output**
```text
YES
```

#### Test Case 2

**Input**
```text
3 10
1 2 3
```

**Expected Output**
```text
NO
```

#### Test Case 3

**Input**
```text
2 0
0 0
```

**Expected Output**
```text
YES
```

#### Test Case 4

**Input**
```text
3 3
-1 4 5
```

**Expected Output**
```text
YES
```

#### Test Case 5

**Input**
```text
3 4
2 2 2
```

**Expected Output**
```text
YES
```

#### Test Case 6

**Input**
```text
1 1
1
```

**Expected Output**
```text
NO
```

#### Test Case 7

**Input**
```text
3 14
5 7 9
```

**Expected Output**
```text
YES
```

#### Test Case 8

**Input**
```text
3 -7
-5 -2 3
```

**Expected Output**
```text
YES
```

#### Test Case 9

**Input**
```text
2 25
10 20
```

**Expected Output**
```text
NO
```

#### Test Case 10

**Input**
```text
3 3
2 1 2
```

**Expected Output**
```text
YES
```
