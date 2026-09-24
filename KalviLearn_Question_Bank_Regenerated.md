# KalviLearn — Regenerated Concept-Aligned Question Bank

## Global formatting and correctness rules

- Every input block contains raw values only. Labels such as `Input:` and `Output:` never appear inside input or output blocks.
- Independent scalar parameters are placed on separate lines; arrays are placed on one line after their size; matrices use one row per line; records and commands use one per line when required.
- Output contains only the required result, except where the problem explicitly defines a multi-line labeled output format.
- Every example follows the exact input order stated by its problem.
- Every explanation describes how the shown input is transformed into the shown output; every constraint is specific to the problem and its intended algorithm.

### M1-LU1 — Variables and assignment

A warehouse account starts with a stock count and receives three signed changes during the day. Compute the closing stock after applying every change in the given order.

**Input Format**

Read four integers on separate lines: initial_stock, change_1, change_2, and change_3.

**Output Format**

Print the closing stock as one integer.

**Constraints**

0 ≤ initial_stock ≤ 1,000,000; -100,000 ≤ each change ≤ 100,000. The final result fits in a signed 64-bit integer.

**Worked Example 1**

**Example Input**
```text
15
138
79
123
```

**Output**
```text
355
```

**Explanation**

Start with 15 and apply the changes in order: 15 + (138) + (79) + (123) = 355.

**Worked Example 2**

**Example Input**
```text
718
-126
86
91
```

**Output**
```text
769
```

**Explanation**

Start with 718 and apply the changes in order: 718 + (-126) + (86) + (91) = 769.

### M1-LU2 — Input and output handling

A delivery desk receives the number of parcels followed by their weights. Print the total weight exactly once.

**Input Format**

Read n on the first line. Read n integer weights on the second line.

**Output Format**

Print the sum of all n weights.

**Constraints**

1 ≤ n ≤ 100,000; 0 ≤ weight ≤ 10,000. The second line contains exactly n weights.

**Worked Example 1**

**Example Input**
```text
5
59 28 64 76 63
```

**Output**
```text
290
```

**Explanation**

The n weights are added without changing their order. For this input, their total is 290.

**Worked Example 2**

**Example Input**
```text
8
57 55 57 35 4 71 21 70
```

**Output**
```text
370
```

**Explanation**

The n weights are added without changing their order. For this input, their total is 370.

### M1-LU3 — Data types

A navigation device stores a whole-number distance and a decimal calibration factor. When the sensor status is active, output the calibrated distance to two decimal places; otherwise report SENSOR_OFF.

**Input Format**

Read distance as an integer, factor as a decimal number, and status as an integer on three separate lines.

**Output Format**

If status is 1, print distance × factor with exactly two decimal places. If status is 0, print SENSOR_OFF.

**Constraints**

0 ≤ distance ≤ 1,000,000; 0.01 ≤ factor ≤ 100; status is 0 or 1.

**Worked Example 1**

**Example Input**
```text
767
1.64
1
```

**Output**
```text
1257.88
```

**Explanation**

The status is 1. The active reading is calibrated as 767 × 1.64 = 1257.88, so that value is printed.

**Worked Example 2**

**Example Input**
```text
385
1.77
0
```

**Output**
```text
SENSOR_OFF
```

**Explanation**

The status is 0. Because it is inactive, no calibration is performed and SENSOR_OFF is printed.

### M1-LU4 — Arithmetic, relational, and logical operators

A lab access gate opens only when the visitor is at least 18 years old, has a clearance score of at least 7, and the badge is active.

**Input Format**

Read age, clearance_score, and badge_active on separate lines.

**Output Format**

Print ALLOWED only when all three conditions are true; otherwise print DENIED.

**Constraints**

0 ≤ age ≤ 120; 0 ≤ clearance_score ≤ 10; badge_active is 0 or 1.

**Worked Example 1**

**Example Input**
```text
16
8
0
```

**Output**
```text
DENIED
```

**Explanation**

Age condition (16 ≥ 18), score condition (8 ≥ 7), and badge condition (0 = 1) are evaluated together. The combined result is DENIED.

**Worked Example 2**

**Example Input**
```text
21
9
1
```

**Output**
```text
ALLOWED
```

**Explanation**

Age condition (21 ≥ 18), score condition (9 ≥ 7), and badge condition (1 = 1) are evaluated together. The combined result is ALLOWED.

### M1-LU5 — Type conversion

A cafe records a bill and a service-charge percentage. Calculate the final amount after applying the percentage and print it as currency with two decimal places.

**Input Format**

Read bill and service_rate as decimal values on separate lines.

**Output Format**

Print bill + bill × service_rate / 100 rounded to exactly two decimal places.

**Constraints**

0.00 ≤ bill ≤ 1,000,000.00; 0.00 ≤ service_rate ≤ 100.00. Use decimal arithmetic suitable for currency.

**Worked Example 1**

**Example Input**
```text
908.48
5.56
```

**Output**
```text
958.99
```

**Explanation**

The service charge is 908.48 × 5.56 / 100 = 50.51. Adding it to the bill gives 958.99.

**Worked Example 2**

**Example Input**
```text
909.97
12.92
```

**Output**
```text
1027.54
```

**Explanation**

The service charge is 909.97 × 12.92 / 100 = 117.57. Adding it to the bill gives 1027.54.

### M1-LU6 — Operator precedence

A scoring device combines four integer readings using the fixed expression (a + b) × c - d. Evaluate that expression exactly; do not rearrange its operations.

**Input Format**

Read integers a, b, c, and d on four separate lines.

**Output Format**

Print the integer value of (a + b) × c - d.

**Constraints**

-10,000 ≤ a,b,c,d ≤ 10,000. The result fits in a signed 64-bit integer.

**Worked Example 1**

**Example Input**
```text
16
-8
-14
17
```

**Output**
```text
-129
```

**Explanation**

First add 16 and -8, obtaining 8. Multiply by -14 and subtract 17, giving -129.

**Worked Example 2**

**Example Input**
```text
0
4
6
-3
```

**Output**
```text
27
```

**Explanation**

First add 0 and 4, obtaining 4. Multiply by 6 and subtract -3, giving 27.

### M1-LU7 — Variable scope awareness

A configuration routine has an outer setting and creates a temporary inner setting. The inner setting is changed, but the outer setting must remain unchanged. Print the outer setting followed by the final inner setting.

**Input Format**

Read outer and inner on the first two lines, then read replacement_inner on the third line.

**Output Format**

Print outer and replacement_inner separated by one space.

**Constraints**

-1,000,000 ≤ all three values ≤ 1,000,000. The replacement changes only the inner value.

**Worked Example 1**

**Example Input**
```text
-13
6
20
```

**Output**
```text
-13 20
```

**Explanation**

The replacement applies only to the inner variable, so the outer value stays -13 while the inner value becomes 20.

**Worked Example 2**

**Example Input**
```text
-20
13
18
```

**Output**
```text
-20 18
```

**Explanation**

The replacement applies only to the inner variable, so the outer value stays -20 while the inner value becomes 18.

### M1-LU8 — Boolean expressions

A server is considered READY when CPU usage is below 80%, memory usage is below 90%, and either a backup is complete or maintenance mode is enabled.

**Input Format**

Read cpu, memory, backup_complete, and maintenance_mode on separate lines.

**Output Format**

Print READY when the Boolean condition is true; otherwise print NOT_READY.

**Constraints**

0 ≤ cpu,memory ≤ 100; backup_complete and maintenance_mode are each 0 or 1.

**Worked Example 1**

**Example Input**
```text
73
58
1
1
```

**Output**
```text
READY
```

**Explanation**

CPU<80 is True, memory<90 is True, and backup-or-maintenance is True. Combining them gives READY.

**Worked Example 2**

**Example Input**
```text
22
89
0
0
```

**Output**
```text
NOT_READY
```

**Explanation**

CPU<80 is True, memory<90 is True, and backup-or-maintenance is False. Combining them gives NOT_READY.

### M1-LU9 — Conditionals

Classify a package weight as LIGHT, STANDARD, or HEAVY: below 5 kg is LIGHT, 5 through 20 kg is STANDARD, and above 20 kg is HEAVY.

**Input Format**

Read one decimal package weight.

**Output Format**

Print LIGHT, STANDARD, or HEAVY according to the stated ranges.

**Constraints**

0.0 ≤ weight ≤ 1,000.0. The input contains at most one decimal place.

**Worked Example 1**

**Example Input**
```text
14
```

**Output**
```text
STANDARD
```

**Explanation**

The weight 14.0 is compared with 5 and 20, so it belongs to the STANDARD range.

**Worked Example 2**

**Example Input**
```text
1
```

**Output**
```text
LIGHT
```

**Explanation**

The weight 1.0 is compared with 5 and 20, so it belongs to the LIGHT range.

### M1-LU10 — Switch statement

A cafeteria kiosk receives a menu code. Code 1 means IDLI, 2 means DOSA, 3 means RICE, and 4 means TEA. Any other code is invalid.

**Input Format**

Read one integer code.

**Output Format**

Print the item name for codes 1–4, otherwise print INVALID.

**Constraints**

The code is an integer between -100 and 100.

**Worked Example 1**

**Example Input**
```text
2
```

**Output**
```text
DOSA
```

**Explanation**

The code 2 is matched against the four menu cases; the selected result is DOSA.

**Worked Example 2**

**Example Input**
```text
0
```

**Output**
```text
INVALID
```

**Explanation**

The code 0 is matched against the four menu cases; the selected result is INVALID.

### M1-LU11 — Basic debugging

A monitoring program should add all four sensor corrections, including negative corrections. Compute the correct total rather than skipping negative values.

**Input Format**

Read four integers on separate lines.

**Output Format**

Print their algebraic sum.

**Constraints**

-100,000 ≤ each correction ≤ 100,000. Negative values must be included in the sum.

**Worked Example 1**

**Example Input**
```text
34
-7
29
-34
```

**Output**
```text
22
```

**Explanation**

Every correction is included, including negatives: 34 + -7 + 29 + -34 = 22.

**Worked Example 2**

**Example Input**
```text
41
31
-47
-31
```

**Output**
```text
-6
```

**Explanation**

Every correction is included, including negatives: 41 + 31 + -47 + -31 = -6.

### M2-LU1 — For, while, and do-while loops

A quality-control batch contains n readings. Add only the readings divisible by 3.

**Input Format**

Read n, then n integers on the next line.

**Output Format**

Print the sum of all readings divisible by 3.

**Constraints**

1 ≤ n ≤ 100,000; -1,000,000 ≤ each reading ≤ 1,000,000.

**Worked Example 1**

**Example Input**
```text
8
-30 -12 -5 2 24 13 -8 -27
```

**Output**
```text
-45
```

**Explanation**

Scan the readings once and add only values with remainder 0 when divided by 3. The qualifying values sum to -45.

**Worked Example 2**

**Example Input**
```text
6
22 -16 -22 27 19 -7
```

**Output**
```text
27
```

**Explanation**

Scan the readings once and add only values with remainder 0 when divided by 3. The qualifying values sum to 27.

### M2-LU2 — Break and continue

A sensor stream ends at the first value -1. Ignore zero readings, add nonzero readings, and stop immediately at the sentinel.

**Input Format**

Read n, then n integers on one line. Values after the first -1 are ignored.

**Output Format**

Print the sum of nonzero values processed before the first -1.

**Constraints**

1 ≤ n ≤ 100,000; values are between -1 and 1,000,000; -1 is the sentinel.

**Worked Example 1**

**Example Input**
```text
6
16 4 -1 2 14 7
```

**Output**
```text
20
```

**Explanation**

Values are processed until the first -1. Zeros are skipped, and the remaining processed values total 20.

**Worked Example 2**

**Example Input**
```text
6
5 5 6 15 9 -1
```

**Output**
```text
40
```

**Explanation**

Values are processed until the first -1. Zeros are skipped, and the remaining processed values total 40.

### M2-LU3 — Nested loops

A seating hall has r rows and c columns. Count seats whose zero-based row index plus column index is even.

**Input Format**

Read r and c on separate lines.

**Output Format**

Print the number of qualifying seats.

**Constraints**

1 ≤ r,c ≤ 10,000; count must fit in a signed 64-bit integer.

**Worked Example 1**

**Example Input**
```text
3
5
```

**Output**
```text
8
```

**Explanation**

Each of the 15 cells is checked by its zero-based row+column parity. Exactly 8 have an even sum.

**Worked Example 2**

**Example Input**
```text
7
2
```

**Output**
```text
7
```

**Explanation**

Each of the 14 cells is checked by its zero-based row+column parity. Exactly 7 have an even sum.

### M2-LU4 — Loop tracing

A test counter starts at start and repeatedly adds step while the next value stays within the limit. Print every visited value.

**Input Format**

Read start, step, and limit on separate lines. step is positive.

**Output Format**

Print the visited values separated by single spaces.

**Constraints**

1 ≤ start ≤ limit ≤ 1,000,000; 1 ≤ step ≤ 1,000,000.

**Worked Example 1**

**Example Input**
```text
6
5
15
```

**Output**
```text
6 11
```

**Explanation**

Starting at 6, add 5 while the value does not exceed 15. The resulting trace is 6 11.

**Worked Example 2**

**Example Input**
```text
8
5
25
```

**Output**
```text
8 13 18 23
```

**Explanation**

Starting at 8, add 5 while the value does not exceed 25. The resulting trace is 8 13 18 23.

### M2-LU5 — Pattern problems

A display prints a left-aligned number staircase. Row i contains the integers 1 through i, separated by one space.

**Input Format**

Read height h.

**Output Format**

Print h rows; row i contains 1 through i.

**Constraints**

1 ≤ h ≤ 50. No trailing spaces are allowed.

**Worked Example 1**

**Example Input**
```text
11
```

**Output**
```text
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
1 2 3 4 5 6
1 2 3 4 5 6 7
1 2 3 4 5 6 7 8
1 2 3 4 5 6 7 8 9
1 2 3 4 5 6 7 8 9 10
1 2 3 4 5 6 7 8 9 10 11
```

**Explanation**

For each row r from 1 to 11, print the sequence 1 through r. This creates 11 rows in order.

**Worked Example 2**

**Example Input**
```text
8
```

**Output**
```text
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
1 2 3 4 5 6
1 2 3 4 5 6 7
1 2 3 4 5 6 7 8
```

**Explanation**

For each row r from 1 to 8, print the sequence 1 through r. This creates 8 rows in order.

### M2-LU6 — Sentinel-controlled loops

Read scores until the sentinel 999 appears. Report the largest score seen before the sentinel.

**Input Format**

Read one integer per line; 999 ends the input and is not a score.

**Output Format**

Print the maximum score before 999, or EMPTY if the sentinel is the first value.

**Constraints**

The sentinel 999 appears exactly once; every real score is between -1000 and 1000.

**Worked Example 1**

**Example Input**
```text
3
-18
15
34
-13
999
```

**Output**
```text
34
```

**Explanation**

All values before 999 are considered; their maximum is 34.

**Worked Example 2**

**Example Input**
```text
35
-3
-1
17
7
-6
999
```

**Output**
```text
35
```

**Explanation**

All values before 999 are considered; their maximum is 35.

### M2-LU7 — Input-driven loop termination

A machine processes jobs until either it reaches its energy budget or all listed jobs are processed. Count how many jobs actually run.

**Input Format**

Read n and budget on separate lines, then n non-negative job costs on one line.

**Output Format**

Print the number of jobs processed before the cumulative cost first reaches or exceeds the budget.

**Constraints**

1 ≤ n ≤ 100,000; 1 ≤ budget ≤ 10^9; 0 ≤ each cost ≤ 10^6.

**Worked Example 1**

**Example Input**
```text
2
17
7 4
```

**Output**
```text
2
```

**Explanation**

Add job costs in order and stop once the running total reaches 17. The stop point processes 2 jobs.

**Worked Example 2**

**Example Input**
```text
4
27
2 3 4 1
```

**Output**
```text
4
```

**Explanation**

Add job costs in order and stop once the running total reaches 27. The stop point processes 4 jobs.

### M2-LU8 — Count-based versus condition-based loops

A battery can execute at most n tasks, but execution must stop earlier if cumulative energy reaches the limit. Count completed tasks.

**Input Format**

Read n and energy_limit on separate lines, then n non-negative task energies on one line.

**Output Format**

Print the number of tasks executed.

**Constraints**

1 ≤ n ≤ 100,000; 1 ≤ energy_limit ≤ 10^9; each task energy is between 0 and 10^6.

**Worked Example 1**

**Example Input**
```text
8
14
5 3 10 8 12 5 7 3
```

**Output**
```text
3
```

**Explanation**

The loop has both a count limit (8) and an energy condition (14). The first condition reached after processing gives 3 completed tasks.

**Worked Example 2**

**Example Input**
```text
6
26
8 11 9 3 3 3
```

**Output**
```text
3
```

**Explanation**

The loop has both a count limit (6) and an energy condition (26). The first condition reached after processing gives 3 completed tasks.

### M2-LU9 — Complexity intuition with arrays and strings

A security scanner must report the first character whose second appearance occurs earliest in the text. If no character repeats, print NONE.

**Input Format**

Read one lowercase string.

**Output Format**

Print the repeated character whose second occurrence has the smallest index, or NONE.

**Constraints**

1 ≤ length ≤ 100,000; the string contains only lowercase English letters.

**Worked Example 1**

**Example Input**
```text
adec
```

**Output**
```text
NONE
```

**Explanation**

Every character appears only once, so NONE is printed.

**Worked Example 2**

**Example Input**
```text
ffdcbbfdded
```

**Output**
```text
f
```

**Explanation**

Scan left to right while recording seen characters. The first character encountered for the second time is f.

### M3-LU1 — Arrays

A weather station stores daily temperatures. Find the maximum temperature and the zero-based index of its first occurrence.

**Input Format**

Read n, then n integers on the next line.

**Output Format**

Print maximum_temperature and its first index separated by one space.

**Constraints**

1 ≤ n ≤ 100,000; -100 ≤ each temperature ≤ 100.

**Worked Example 1**

**Example Input**
```text
5
17 8 35 -1 -11
```

**Output**
```text
(35, 2)
```

**Explanation**

The maximum value is (35,, and its first occurrence is at zero-based index 2).

**Worked Example 2**

**Example Input**
```text
8
18 31 -8 -13 13 -13 31 -15
```

**Output**
```text
(31, 1)
```

**Explanation**

The maximum value is (31,, and its first occurrence is at zero-based index 1).

### M3-LU2 — Strings

A text normalizer removes all lowercase vowels from a string while preserving every other character and its order.

**Input Format**

Read one lowercase string without spaces.

**Output Format**

Print the string after removing a, e, i, o, and u.

**Constraints**

1 ≤ length ≤ 100,000; input contains lowercase English letters only.

**Worked Example 1**

**Example Input**
```text
nkpq
```

**Output**
```text
nkpq
```

**Explanation**

Each character is inspected once; vowels are discarded and all other characters remain in order, producing nkpq.

**Worked Example 2**

**Example Input**
```text
lwdnlmi
```

**Output**
```text
lwdnlm
```

**Explanation**

Each character is inspected once; vowels are discarded and all other characters remain in order, producing lwdnlm.

### M3-LU3 — Matrices

A square sensor grid stores readings. Compute the sum of the main diagonal from top-left to bottom-right.

**Input Format**

Read n, then n rows containing n integers each.

**Output Format**

Print the main-diagonal sum.

**Constraints**

1 ≤ n ≤ 500; -10^6 ≤ each entry ≤ 10^6.

**Worked Example 1**

**Example Input**
```text
1
4
```

**Output**
```text
4
```

**Explanation**

Take entries where row index equals column index and add them. The diagonal total is 4.

**Worked Example 2**

**Example Input**
```text
5
0 -9 6 -3 4
1 2 -6 6 -4
-8 9 6 -4 2
-1 6 0 0 -4
4 -3 -9 0 7
```

**Output**
```text
15
```

**Explanation**

Take entries where row index equals column index and add them. The diagonal total is 15.

### M3-LU4 — Indexing and bounds

A log stores values in an array and receives query indices. For each query, print the value if the index is valid; otherwise print -1.

**Input Format**

Read n and the n array values. Read q and then q query indices, one per line.

**Output Format**

Print one result per query in the same order.

**Constraints**

1 ≤ n,q ≤ 100,000; array values fit in signed 32-bit integers; each query index is between -n and 2n.

**Worked Example 1**

**Example Input**
```text
5
5 8 3 1 12
1
1
```

**Output**
```text
8
```

**Explanation**

Each query is checked against 0 ≤ index < 5. Valid indices return the stored value; invalid indices return -1.

**Worked Example 2**

**Example Input**
```text
5
16 -10 -6 -9 -14
3
0
5
0
```

**Output**
```text
16
-1
16
```

**Explanation**

Each query is checked against 0 ≤ index < 5. Valid indices return the stored value; invalid indices return -1.

### M3-LU5 — Traversal

A display buffer must be printed from the last element to the first without modifying the stored order.

**Input Format**

Read n and n integers.

**Output Format**

Print the values in reverse order separated by single spaces.

**Constraints**

1 ≤ n ≤ 100,000; each value fits in signed 32-bit integer.

**Worked Example 1**

**Example Input**
```text
3
-13 4 -15
```

**Output**
```text
-15 4 -13
```

**Explanation**

Traversal starts at the final element and moves toward index 0, so the output is -15 4 -13.

**Worked Example 2**

**Example Input**
```text
7
20 -20 8 19 8 -13 16
```

**Output**
```text
16 -13 8 19 8 -20 20
```

**Explanation**

Traversal starts at the final element and moves toward index 0, so the output is 16 -13 8 19 8 -20 20.

### M3-LU6 — Simple transformations

A cleaning system replaces every negative measurement with 0 and leaves non-negative measurements unchanged.

**Input Format**

Read n and n integers.

**Output Format**

Print the transformed array on one line.

**Constraints**

1 ≤ n ≤ 100,000; each measurement fits in signed 32-bit integer.

**Worked Example 1**

**Example Input**
```text
8
-5 13 -1 18 -11 7 9 -13
```

**Output**
```text
0 13 0 18 0 7 9 0
```

**Explanation**

Each negative value is replaced by 0; non-negative values pass through unchanged. The transformed sequence is 0 13 0 18 0 7 9 0.

**Worked Example 2**

**Example Input**
```text
3
10 -2 -18
```

**Output**
```text
10 0 0
```

**Explanation**

Each negative value is replaced by 0; non-negative values pass through unchanged. The transformed sequence is 10 0 0.

### M3-LU7 — Basic string operations

A circular text display rotates a string left by k positions. Rotations wrap around the end of the string.

**Input Format**

Read a lowercase string on the first line and integer k on the second line.

**Output Format**

Print the left-rotated string.

**Constraints**

1 ≤ length ≤ 100,000; 0 ≤ k ≤ 10^9; string contains lowercase English letters only.

**Worked Example 1**

**Example Input**
```text
bdbfdac
29
```

**Output**
```text
dbfdacb
```

**Explanation**

A left rotation by 29 is equivalent to 1 positions after taking k modulo the string length, producing dbfdacb.

**Worked Example 2**

**Example Input**
```text
f
15
```

**Output**
```text
f
```

**Explanation**

A left rotation by 15 is equivalent to 0 positions after taking k modulo the string length, producing f.

### M3-LU8 — Frequency counting

A poll stores integer responses. Print the value with the highest frequency; if several values tie, choose the smallest value.

**Input Format**

Read n and n integers.

**Output Format**

Print the selected value.

**Constraints**

1 ≤ n ≤ 100,000; each value is between -10^9 and 10^9.

**Worked Example 1**

**Example Input**
```text
1
-2
```

**Output**
```text
-2
```

**Explanation**

Count each distinct response, then maximize frequency and use the smaller value to break ties. The selected value is -2.

**Worked Example 2**

**Example Input**
```text
9
-3 1 -1 2 3 -3 2 2 -2
```

**Output**
```text
2
```

**Explanation**

Count each distinct response, then maximize frequency and use the smaller value to break ties. The selected value is 2.

### M3-LU9 — Why nested loops are slow

A duplicate detector counts equal index pairs (i,j) with i < j. Report how many such pairs exist.

**Input Format**

Read n and n integers.

**Output Format**

Print the number of equal pairs.

**Constraints**

1 ≤ n ≤ 100,000; each value is between -10^9 and 10^9; the answer fits in 64-bit.

**Worked Example 1**

**Example Input**
```text
7
0 0 0 2 4 3 2
```

**Output**
```text
4
```

**Explanation**

For every value appearing f times, there are f(f-1)/2 equal index pairs. Summing those contributions gives 4.

**Worked Example 2**

**Example Input**
```text
9
3 2 0 1 1 1 2 1 4
```

**Output**
```text
7
```

**Explanation**

For every value appearing f times, there are f(f-1)/2 equal index pairs. Summing those contributions gives 7.

### M3-LU10 — Growth rates

For a given n, report n, n², and 2n so that the three growth expressions can be compared directly.

**Input Format**

Read one non-negative integer n.

**Output Format**

Print n, n², and 2n on one line separated by spaces.

**Constraints**

0 ≤ n ≤ 1,000,000; n² fits in a signed 64-bit integer.

**Worked Example 1**

**Example Input**
```text
44
```

**Output**
```text
44 1936 88
```

**Explanation**

For n=44, linear growth is n=44, quadratic growth is n²=1936, and doubling gives 2n=88.

**Worked Example 2**

**Example Input**
```text
92
```

**Output**
```text
92 8464 184
```

**Explanation**

For n=92, linear growth is n=92, quadratic growth is n²=8464, and doubling gives 2n=184.

### M4-LU1 — Subarrays

A monitoring sequence contains gains and losses. Find the largest sum obtainable from any non-empty contiguous segment.

**Input Format**

Read n and n integers.

**Output Format**

Print the maximum contiguous-subarray sum.

**Constraints**

1 ≤ n ≤ 100,000; each value is between -10^9 and 10^9; the answer fits in 64-bit.

**Worked Example 1**

**Example Input**
```text
1
7
```

**Output**
```text
7
```

**Explanation**

Consider contiguous segments only and keep the largest segment sum. The maximum attainable sum is 7.

**Worked Example 2**

**Example Input**
```text
3
6 -3 9
```

**Output**
```text
12
```

**Explanation**

Consider contiguous segments only and keep the largest segment sum. The maximum attainable sum is 12.

### M4-LU2 — Prefix and suffix sums

For every position in a sequence, compute prefix_sum(i) + suffix_sum(i), where both include the value at i.

**Input Format**

Read n and n integers.

**Output Format**

Print one combined value for each position on one line.

**Constraints**

1 ≤ n ≤ 100,000; values are between -10^6 and 10^6; results fit in 64-bit.

**Worked Example 1**

**Example Input**
```text
5
3 4 -8 -8 2
```

**Output**
```text
-4 -3 -15 -15 -5
```

**Explanation**

At each index, add the sum from the beginning through that index to the sum from that index through the end. The resulting sequence is -4 -3 -15 -15 -5.

**Worked Example 2**

**Example Input**
```text
6
-3 8 2 3 -8 5
```

**Output**
```text
4 15 9 10 -1 12
```

**Explanation**

At each index, add the sum from the beginning through that index to the sum from that index through the end. The resulting sequence is 4 15 9 10 -1 12.

### M4-LU3 — Hashing

A ticket system must determine whether two different ticket values add up to a target.

**Input Format**

Read n and target on separate lines, then n integers.

**Output Format**

Print YES if two distinct positions contain values whose sum is target; otherwise print NO.

**Constraints**

1 ≤ n ≤ 100,000; values and target are between -10^9 and 10^9.

**Worked Example 1**

**Example Input**
```text
9
-10
5 0 -10 7 -10 -7 -6 4 -3
```

**Output**
```text
YES
```

**Explanation**

Check whether any pair of distinct positions sums to -10. The pair-existence result is YES.

**Worked Example 2**

**Example Input**
```text
7
-4
-9 -5 5 -9 -5 5 10
```

**Output**
```text
YES
```

**Explanation**

Check whether any pair of distinct positions sums to -4. The pair-existence result is YES.

### M4-LU4 — Kadane's algorithm

Find the maximum-sum contiguous segment and report its sum plus the start and end indices. If several segments have the same maximum sum, choose the one with the smallest start index.

**Input Format**

Read n and n integers.

**Output Format**

Print maximum_sum, start_index, and end_index separated by spaces.

**Constraints**

1 ≤ n ≤ 100,000; each value is between -10^9 and 10^9; indices are zero-based.

**Worked Example 1**

**Example Input**
```text
1
1
```

**Output**
```text
1 0 0
```

**Explanation**

The best contiguous segment is selected by maximum sum, then smallest start index on ties. The resulting sum and boundaries are 1 0 0.

**Worked Example 2**

**Example Input**
```text
3
-9 -8 5
```

**Output**
```text
5 2 2
```

**Explanation**

The best contiguous segment is selected by maximum sum, then smallest start index on ties. The resulting sum and boundaries are 5 2 2.

### M4-LU5 — Dutch National Flag

A three-color sensor stores only codes 0, 1, and 2. Rearrange them in ascending order.

**Input Format**

Read n and n values, each 0, 1, or 2.

**Output Format**

Print the sorted sequence.

**Constraints**

1 ≤ n ≤ 100,000; every value is exactly 0, 1, or 2.

**Worked Example 1**

**Example Input**
```text
12
2 1 2 0 1 2 1 0 2 2 2 2
```

**Output**
```text
0 0 1 1 1 2 2 2 2 2 2 2
```

**Explanation**

All 0s are placed before 1s and all 1s before 2s. The ordered sequence is 0 0 1 1 1 2 2 2 2 2 2 2.

**Worked Example 2**

**Example Input**
```text
5
0 0 0 0 2
```

**Output**
```text
0 0 0 0 2
```

**Explanation**

All 0s are placed before 1s and all 1s before 2s. The ordered sequence is 0 0 0 0 2.

### M4-LU6 — Moore's voting

A committee log may contain a candidate appearing more than half the time. Find that strict majority value, or NONE if no such value exists.

**Input Format**

Read n and n integer candidate IDs.

**Output Format**

Print the strict majority ID or NONE.

**Constraints**

1 ≤ n ≤ 100,000; IDs are between -10^9 and 10^9.

**Worked Example 1**

**Example Input**
```text
7
2 2 1 2 2 2 2
```

**Output**
```text
2
```

**Explanation**

A value must occur more than 3 times. Counting the candidates shows the majority result is 2.

**Worked Example 2**

**Example Input**
```text
8
2 1 1 2 2 3 3 1
```

**Output**
```text
NONE
```

**Explanation**

A value must occur more than 4 times. Counting the candidates shows the majority result is NONE.

### M4-LU7 — Sorting algorithms

A leaderboard contains player names and scores. Sort by score ascending; players with equal scores must keep their original input order.

**Input Format**

Read n, then n records as name|score, one per line.

**Output Format**

Print the sorted records one per line in the format name|score.

**Constraints**

1 ≤ n ≤ 100,000; names contain letters and underscores only; scores are integers from 0 to 1,000,000.

**Worked Example 1**

**Example Input**
```text
7
B0|11
B1|12
B2|15
D3|13
B4|6
B5|18
A6|6
```

**Output**
```text
B4|6
A6|6
B0|11
B1|12
D3|13
B2|15
B5|18
```

**Explanation**

Records are ordered by increasing score. Python-style stable ordering means equal scores retain their original order, producing the shown sequence.

**Worked Example 2**

**Example Input**
```text
1
C0|15
```

**Output**
```text
C0|15
```

**Explanation**

Records are ordered by increasing score. Python-style stable ordering means equal scores retain their original order, producing the shown sequence.

### M4-LU8 — Sliding window

Find the largest sum among all windows containing exactly k consecutive readings.

**Input Format**

Read n and k on separate lines, then n integers.

**Output Format**

Print the maximum window sum.

**Constraints**

1 ≤ k ≤ n ≤ 100,000; each value is between -10^6 and 10^6.

**Worked Example 1**

**Example Input**
```text
5
1
-4 6 2 -9 -3
```

**Output**
```text
6
```

**Explanation**

Slide a window of exactly 1 elements across the array and compare its sums. The largest window sum is 6.

**Worked Example 2**

**Example Input**
```text
7
5
-5 6 5 -2 -6 5 5
```

**Output**
```text
8
```

**Explanation**

Slide a window of exactly 5 elements across the array and compare its sums. The largest window sum is 8.

### M5-LU1 — Linked lists

Two sorted contact lists are stored as linked sequences. Merge them into one sorted sequence without changing the relative order of equal values.

**Input Format**

Read n and the first sorted list, then m and the second sorted list.

**Output Format**

Print the merged values on one line.

**Constraints**

0 ≤ n,m ≤ 100,000; both input lists are sorted non-decreasingly; values fit in 32-bit integers.

**Worked Example 1**

**Example Input**
```text
2
9 15
6
8 11 11 16 19 19
```

**Output**
```text
8 9 11 11 15 16 19 19
```

**Explanation**

Merge the two already sorted sequences by repeatedly taking the smaller front value. The merged order is 8 9 11 11 15 16 19 19.

**Worked Example 2**

**Example Input**
```text
0

1
16
```

**Output**
```text
16
```

**Explanation**

Merge the two already sorted sequences by repeatedly taking the smaller front value. The merged order is 16.

### M5-LU2 — Stacks

Validate whether a sequence of brackets is balanced using (), [], and {}.

**Input Format**

Read one bracket string.

**Output Format**

Print BALANCED if every opening bracket is correctly closed; otherwise print UNBALANCED.

**Constraints**

0 ≤ length ≤ 100,000; the string contains only (), [], {}.

**Worked Example 1**

**Example Input**
```text
}}])(
```

**Output**
```text
UNBALANCED
```

**Explanation**

Scan left to right with a stack: opening brackets are pushed and each closing bracket must match the latest opening bracket. The final balance result is UNBALANCED.

**Worked Example 2**

**Example Input**
```text
}(}[{()[]
```

**Output**
```text
UNBALANCED
```

**Explanation**

Scan left to right with a stack: opening brackets are pushed and each closing bracket must match the latest opening bracket. The final balance result is UNBALANCED.

### M5-LU3 — Queues

Simulate a service queue. ENQUEUE x adds x to the back; DEQUEUE removes and prints the front, or prints EMPTY if the queue is empty.

**Input Format**

Read q followed by q commands, one command per line.

**Output Format**

Print one line for every DEQUEUE command.

**Constraints**

1 ≤ q ≤ 100,000; x is an integer between -10^9 and 10^9.

**Worked Example 1**

**Example Input**
```text
4
ENQUEUE 19
DEQUEUE
ENQUEUE 12
DEQUEUE
```

**Output**
```text
19
12
```

**Explanation**

Commands are processed in order: ENQUEUE adds to the back, while DEQUEUE removes the oldest queued value or reports EMPTY.

**Worked Example 2**

**Example Input**
```text
5
ENQUEUE 12
ENQUEUE 13
ENQUEUE 13
ENQUEUE 8
DEQUEUE
```

**Output**
```text
12
```

**Explanation**

Commands are processed in order: ENQUEUE adds to the back, while DEQUEUE removes the oldest queued value or reports EMPTY.

### M5-LU4 — Monotonic stack

For every temperature, report the first strictly higher temperature to its right; print -1 when none exists.

**Input Format**

Read n and n temperatures.

**Output Format**

Print the next-greater value for each position on one line.

**Constraints**

1 ≤ n ≤ 100,000; temperatures are between -100 and 100.

**Worked Example 1**

**Example Input**
```text
3
1 13 6
```

**Output**
```text
13 -1 -1
```

**Explanation**

For each position, search to the right for the first strictly larger value. If none exists, output -1; the resulting sequence is 13 -1 -1.

**Worked Example 2**

**Example Input**
```text
3
20 10 13
```

**Output**
```text
-1 13 -1
```

**Explanation**

For each position, search to the right for the first strictly larger value. If none exists, output -1; the resulting sequence is -1 13 -1.

### M5-LU5 — Two pointers

Given a sorted array, determine whether two different positions contain values whose sum equals target.

**Input Format**

Read n and target on separate lines, then n sorted integers.

**Output Format**

Print YES if such a pair exists; otherwise print NO.

**Constraints**

2 ≤ n ≤ 100,000; array is sorted non-decreasingly; values and target fit in signed 32-bit integers.

**Worked Example 1**

**Example Input**
```text
9
17
0 0 1 2 5 6 8 9 15
```

**Output**
```text
YES
```

**Explanation**

Use the sorted order to move two pointers inward while comparing their sum with 17. The pair-existence answer is YES.

**Worked Example 2**

**Example Input**
```text
7
6
2 6 7 7 8 14 14
```

**Output**
```text
NO
```

**Explanation**

Use the sorted order to move two pointers inward while comparing their sum with 6. The pair-existence answer is NO.

### M5-LU6 — Hare-tortoise method

A linked structure is represented by next pointers. Starting at node 0, determine whether following pointers eventually revisits a node.

**Input Format**

Read n and n next indices. Start at node 0. Index -1 means null; otherwise next[i] is the next node index.

**Output Format**

Print CYCLE if a cycle exists, otherwise NO_CYCLE.

**Constraints**

1 ≤ n ≤ 100,000; each next index is -1 or between 0 and n-1.

**Worked Example 1**

**Example Input**
```text
4
-1 -1 2 2
```

**Output**
```text
NO_CYCLE
```

**Explanation**

Follow next pointers from node 0 while remembering visited nodes. Revisiting a node would prove a cycle; otherwise reaching -1 proves termination, giving NO_CYCLE.

**Worked Example 2**

**Example Input**
```text
6
-1 3 5 2 2 4
```

**Output**
```text
NO_CYCLE
```

**Explanation**

Follow next pointers from node 0 while remembering visited nodes. Revisiting a node would prove a cycle; otherwise reaching -1 proves termination, giving NO_CYCLE.

### M6-LU1 — Recursion fundamentals

A package audit recursively adds all integers from 1 through n. Compute the final total.

**Input Format**

Read n.

**Output Format**

Print 1 + 2 + ... + n.

**Constraints**

0 ≤ n ≤ 100,000.

**Worked Example 1**

**Example Input**
```text
28
```

**Output**
```text
406
```

**Explanation**

The recursive definition adds n to the result for n-1, with base case 0. Thus the total from 1 through 28 is 406.

**Worked Example 2**

**Example Input**
```text
18
```

**Output**
```text
171
```

**Explanation**

The recursive definition adds n to the result for n-1, with base case 0. Thus the total from 1 through 18 is 171.

### M6-LU2 — Base and recursive cases

Compute the greatest common divisor of two non-negative integers using the Euclidean recurrence.

**Input Format**

Read a and b on separate lines.

**Output Format**

Print gcd(a,b).

**Constraints**

0 ≤ a,b ≤ 10^18; at least one value is non-zero.

**Worked Example 1**

**Example Input**
```text
293
571
```

**Output**
```text
1
```

**Explanation**

Repeatedly replace (a,b) with (b,a mod b) until b becomes 0. The remaining value is gcd(293,571) = 1.

**Worked Example 2**

**Example Input**
```text
507
937
```

**Output**
```text
1
```

**Explanation**

Repeatedly replace (a,b) with (b,a mod b) until b becomes 0. The remaining value is gcd(507,937) = 1.

### M6-LU3 — Recursion tree intuition

A naive recursive Fibonacci function makes one call for n=0 or n=1, and otherwise calls itself for n-1 and n-2. Count every function call made for input n.

**Input Format**

Read n.

**Output Format**

Print the total number of function calls.

**Constraints**

0 ≤ n ≤ 35.

**Worked Example 1**

**Example Input**
```text
3
```

**Output**
```text
5
```

**Explanation**

F(3) makes one call at each base case and one call for the current invocation plus its two recursive branches. Counting the full recursion tree gives 5 calls.

**Worked Example 2**

**Example Input**
```text
1
```

**Output**
```text
1
```

**Explanation**

F(1) makes one call at each base case and one call for the current invocation plus its two recursive branches. Counting the full recursion tree gives 1 calls.

### M6-LU4 — Backtracking

On an n×n chessboard, count the arrangements of n queens in which no two queens share a row, column, or diagonal.

**Input Format**

Read n.

**Output Format**

Print the number of valid queen arrangements.

**Constraints**

1 ≤ n ≤ 10.

**Worked Example 1**

**Example Input**
```text
9
```

**Output**
```text
352
```

**Explanation**

Backtracking places one queen per row and rejects any column or diagonal conflict. Exhausting the valid choices gives 352 arrangements.

**Worked Example 2**

**Example Input**
```text
2
```

**Output**
```text
0
```

**Explanation**

Backtracking places one queen per row and rejects any column or diagonal conflict. Exhausting the valid choices gives 0 arrangements.

### M6-LU5 — Subsets

Given distinct integers, count non-empty subsets whose elements sum exactly to target.

**Input Format**

Read n and target on separate lines, then n integers.

**Output Format**

Print the number of non-empty subsets with sum target.

**Constraints**

1 ≤ n ≤ 20; values are between -20 and 20; target is between -100 and 100.

**Worked Example 1**

**Example Input**
```text
5
14
-1 2 5 -1 -4
```

**Output**
```text
0
```

**Explanation**

Consider every non-empty subset and add its chosen values. Exactly 0 subsets have sum 14.

**Worked Example 2**

**Example Input**
```text
10
13
-4 8 5 4 4 6 -4 -4 2 -2
```

**Output**
```text
52
```

**Explanation**

Consider every non-empty subset and add its chosen values. Exactly 52 subsets have sum 13.

### M6-LU6 — Subsequences

Count how many subsequences of a source string are exactly equal to a target string. Characters must remain in order, but need not be contiguous.

**Input Format**

Read source on the first line and target on the second line.

**Output Format**

Print the number of matching subsequences.

**Constraints**

1 ≤ lengths ≤ 30; both strings contain lowercase English letters.

**Worked Example 1**

**Example Input**
```text
abcb
acb
```

**Output**
```text
1
```

**Explanation**

Scan the source while keeping the target order. At each character, either use it for the current target position or skip it; the total number of matches is 1.

**Worked Example 2**

**Example Input**
```text
ca
b
```

**Output**
```text
0
```

**Explanation**

Scan the source while keeping the target order. At each character, either use it for the current target position or skip it; the total number of matches is 0.

### M6-LU7 — Permutations

Print every permutation of a string in lexicographic order.

**Input Format**

Read one string of distinct lowercase letters.

**Output Format**

Print one permutation per line in lexicographic order.

**Constraints**

1 ≤ length ≤ 8; all characters are distinct lowercase English letters.

**Worked Example 1**

**Example Input**
```text
cdabgf
```

**Output**
```text
abcdfg
abcdgf
abcfdg
abcfgd
abcgdf
abcgfd
abdcfg
abdcgf
abdfcg
abdfgc
abdgcf
abdgfc
abfcdg
abfcgd
abfdcg
abfdgc
abfgcd
abfgdc
abgcdf
abgcfd
abgdcf
abgdfc
abgfcd
abgfdc
acbdfg
acbdgf
acbfdg
acbfgd
acbgdf
acbgfd
acdbfg
acdbgf
acdfbg
acdfgb
acdgbf
acdgfb
acfbdg
acfbgd
acfdbg
acfdgb
acfgbd
acfgdb
acgbdf
acgbfd
acgdbf
acgdfb
acgfbd
acgfdb
adbcfg
adbcgf
adbfcg
adbfgc
adbgcf
adbgfc
adcbfg
adcbgf
adcfbg
adcfgb
adcgbf
adcgfb
adfbcg
adfbgc
adfcbg
adfcgb
adfgbc
adfgcb
adgbcf
adgbfc
adgcbf
adgcfb
adgfbc
adgfcb
afbcdg
afbcgd
afbdcg
afbdgc
afbgcd
afbgdc
afcbdg
afcbgd
afcdbg
afcdgb
afcgbd
afcgdb
afdbcg
afdbgc
afdcbg
afdcgb
afdgbc
afdgcb
afgbcd
afgbdc
afgcbd
afgcdb
afgdbc
afgdcb
agbcdf
agbcfd
agbdcf
agbdfc
agbfcd
agbfdc
agcbdf
agcbfd
agcdbf
agcdfb
agcfbd
agcfdb
agdbcf
agdbfc
agdcbf
agdcfb
agdfbc
agdfcb
agfbcd
agfbdc
agfcbd
agfcdb
agfdbc
agfdcb
bacdfg
bacdgf
bacfdg
bacfgd
bacgdf
bacgfd
badcfg
badcgf
badfcg
badfgc
badgcf
badgfc
bafcdg
bafcgd
bafdcg
bafdgc
bafgcd
bafgdc
bagcdf
bagcfd
bagdcf
bagdfc
bagfcd
bagfdc
bcadfg
bcadgf
bcafdg
bcafgd
bcagdf
bcagfd
bcdafg
bcdagf
bcdfag
bcdfga
bcdgaf
bcdgfa
bcfadg
bcfagd
bcfdag
bcfdga
bcfgad
bcfgda
bcgadf
bcgafd
bcgdaf
bcgdfa
bcgfad
bcgfda
bdacfg
bdacgf
bdafcg
bdafgc
bdagcf
bdagfc
bdcafg
bdcagf
bdcfag
bdcfga
bdcgaf
bdcgfa
bdfacg
bdfagc
bdfcag
bdfcga
bdfgac
bdfgca
bdgacf
bdgafc
bdgcaf
bdgcfa
bdgfac
bdgfca
bfacdg
bfacgd
bfadcg
bfadgc
bfagcd
bfagdc
bfcadg
bfcagd
bfcdag
bfcdga
bfcgad
bfcgda
bfdacg
bfdagc
bfdcag
bfdcga
bfdgac
bfdgca
bfgacd
bfgadc
bfgcad
bfgcda
bfgdac
bfgdca
bgacdf
bgacfd
bgadcf
bgadfc
bgafcd
bgafdc
bgcadf
bgcafd
bgcdaf
bgcdfa
bgcfad
bgcfda
bgdacf
bgdafc
bgdcaf
bgdcfa
bgdfac
bgdfca
bgfacd
bgfadc
bgfcad
bgfcda
bgfdac
bgfdca
cabdfg
cabdgf
cabfdg
cabfgd
cabgdf
cabgfd
cadbfg
cadbgf
cadfbg
cadfgb
cadgbf
cadgfb
cafbdg
cafbgd
cafdbg
cafdgb
cafgbd
cafgdb
cagbdf
cagbfd
cagdbf
cagdfb
cagfbd
cagfdb
cbadfg
cbadgf
cbafdg
cbafgd
cbagdf
cbagfd
cbdafg
cbdagf
cbdfag
cbdfga
cbdgaf
cbdgfa
cbfadg
cbfagd
cbfdag
cbfdga
cbfgad
cbfgda
cbgadf
cbgafd
cbgdaf
cbgdfa
cbgfad
cbgfda
cdabfg
cdabgf
cdafbg
cdafgb
cdagbf
cdagfb
cdbafg
cdbagf
cdbfag
cdbfga
cdbgaf
cdbgfa
cdfabg
cdfagb
cdfbag
cdfbga
cdfgab
cdfgba
cdgabf
cdgafb
cdgbaf
cdgbfa
cdgfab
cdgfba
cfabdg
cfabgd
cfadbg
cfadgb
cfagbd
cfagdb
cfbadg
cfbagd
cfbdag
cfbdga
cfbgad
cfbgda
cfdabg
cfdagb
cfdbag
cfdbga
cfdgab
cfdgba
cfgabd
cfgadb
cfgbad
cfgbda
cfgdab
cfgdba
cgabdf
cgabfd
cgadbf
cgadfb
cgafbd
cgafdb
cgbadf
cgbafd
cgbdaf
cgbdfa
cgbfad
cgbfda
cgdabf
cgdafb
cgdbaf
cgdbfa
cgdfab
cgdfba
cgfabd
cgfadb
cgfbad
cgfbda
cgfdab
cgfdba
dabcfg
dabcgf
dabfcg
dabfgc
dabgcf
dabgfc
dacbfg
dacbgf
dacfbg
dacfgb
dacgbf
dacgfb
dafbcg
dafbgc
dafcbg
dafcgb
dafgbc
dafgcb
dagbcf
dagbfc
dagcbf
dagcfb
dagfbc
dagfcb
dbacfg
dbacgf
dbafcg
dbafgc
dbagcf
dbagfc
dbcafg
dbcagf
dbcfag
dbcfga
dbcgaf
dbcgfa
dbfacg
dbfagc
dbfcag
dbfcga
dbfgac
dbfgca
dbgacf
dbgafc
dbgcaf
dbgcfa
dbgfac
dbgfca
dcabfg
dcabgf
dcafbg
dcafgb
dcagbf
dcagfb
dcbafg
dcbagf
dcbfag
dcbfga
dcbgaf
dcbgfa
dcfabg
dcfagb
dcfbag
dcfbga
dcfgab
dcfgba
dcgabf
dcgafb
dcgbaf
dcgbfa
dcgfab
dcgfba
dfabcg
dfabgc
dfacbg
dfacgb
dfagbc
dfagcb
dfbacg
dfbagc
dfbcag
dfbcga
dfbgac
dfbgca
dfcabg
dfcagb
dfcbag
dfcbga
dfcgab
dfcgba
dfgabc
dfgacb
dfgbac
dfgbca
dfgcab
dfgcba
dgabcf
dgabfc
dgacbf
dgacfb
dgafbc
dgafcb
dgbacf
dgbafc
dgbcaf
dgbcfa
dgbfac
dgbfca
dgcabf
dgcafb
dgcbaf
dgcbfa
dgcfab
dgcfba
dgfabc
dgfacb
dgfbac
dgfbca
dgfcab
dgfcba
fabcdg
fabcgd
fabdcg
fabdgc
fabgcd
fabgdc
facbdg
facbgd
facdbg
facdgb
facgbd
facgdb
fadbcg
fadbgc
fadcbg
fadcgb
fadgbc
fadgcb
fagbcd
fagbdc
fagcbd
fagcdb
fagdbc
fagdcb
fbacdg
fbacgd
fbadcg
fbadgc
fbagcd
fbagdc
fbcadg
fbcagd
fbcdag
fbcdga
fbcgad
fbcgda
fbdacg
fbdagc
fbdcag
fbdcga
fbdgac
fbdgca
fbgacd
fbgadc
fbgcad
fbgcda
fbgdac
fbgdca
fcabdg
fcabgd
fcadbg
fcadgb
fcagbd
fcagdb
fcbadg
fcbagd
fcbdag
fcbdga
fcbgad
fcbgda
fcdabg
fcdagb
fcdbag
fcdbga
fcdgab
fcdgba
fcgabd
fcgadb
fcgbad
fcgbda
fcgdab
fcgdba
fdabcg
fdabgc
fdacbg
fdacgb
fdagbc
fdagcb
fdbacg
fdbagc
fdbcag
fdbcga
fdbgac
fdbgca
fdcabg
fdcagb
fdcbag
fdcbga
fdcgab
fdcgba
fdgabc
fdgacb
fdgbac
fdgbca
fdgcab
fdgcba
fgabcd
fgabdc
fgacbd
fgacdb
fgadbc
fgadcb
fgbacd
fgbadc
fgbcad
fgbcda
fgbdac
fgbdca
fgcabd
fgcadb
fgcbad
fgcbda
fgcdab
fgcdba
fgdabc
fgdacb
fgdbac
fgdbca
fgdcab
fgdcba
gabcdf
gabcfd
gabdcf
gabdfc
gabfcd
gabfdc
gacbdf
gacbfd
gacdbf
gacdfb
gacfbd
gacfdb
gadbcf
gadbfc
gadcbf
gadcfb
gadfbc
gadfcb
gafbcd
gafbdc
gafcbd
gafcdb
gafdbc
gafdcb
gbacdf
gbacfd
gbadcf
gbadfc
gbafcd
gbafdc
gbcadf
gbcafd
gbcdaf
gbcdfa
gbcfad
gbcfda
gbdacf
gbdafc
gbdcaf
gbdcfa
gbdfac
gbdfca
gbfacd
gbfadc
gbfcad
gbfcda
gbfdac
gbfdca
gcabdf
gcabfd
gcadbf
gcadfb
gcafbd
gcafdb
gcbadf
gcbafd
gcbdaf
gcbdfa
gcbfad
gcbfda
gcdabf
gcdafb
gcdbaf
gcdbfa
gcdfab
gcdfba
gcfabd
gcfadb
gcfbad
gcfbda
gcfdab
gcfdba
gdabcf
gdabfc
gdacbf
gdacfb
gdafbc
gdafcb
gdbacf
gdbafc
gdbcaf
gdbcfa
gdbfac
gdbfca
gdcabf
gdcafb
gdcbaf
gdcbfa
gdcfab
gdcfba
gdfabc
gdfacb
gdfbac
gdfbca
gdfcab
gdfcba
gfabcd
gfabdc
gfacbd
gfacdb
gfadbc
gfadcb
gfbacd
gfbadc
gfbcad
gfbcda
gfbdac
gfbdca
gfcabd
gfcadb
gfcbad
gfcbda
gfcdab
gfcdba
gfdabc
gfdacb
gfdbac
gfdbca
gfdcab
gfdcba
```

**Explanation**

The characters are arranged in lexicographic order, and all 720 distinct permutations are printed one per line.

**Worked Example 2**

**Example Input**
```text
bgda
```

**Output**
```text
abdg
abgd
adbg
adgb
agbd
agdb
badg
bagd
bdag
bdga
bgad
bgda
dabg
dagb
dbag
dbga
dgab
dgba
gabd
gadb
gbad
gbda
gdab
gdba
```

**Explanation**

The characters are arranged in lexicographic order, and all 24 distinct permutations are printed one per line.

### M6-LU8 — Power set

Print every subset of a sorted array of distinct values in increasing bit-mask order. Print EMPTY for the empty subset.

**Input Format**

Read n and n distinct sorted integers.

**Output Format**

Print one subset per line. Within a subset, values remain in array order; the empty subset is EMPTY.

**Constraints**

0 ≤ n ≤ 12; values are distinct integers between -10^6 and 10^6 and are sorted increasingly.

**Worked Example 1**

**Example Input**
```text
3
-10 -7 20
```

**Output**
```text
EMPTY
-10
-7
-10 -7
20
-10 20
-7 20
-10 -7 20
```

**Explanation**

Each bit mask chooses whether its corresponding array element is included. Masks run from 0 to 2^3-1, producing 8 subsets.

**Worked Example 2**

**Example Input**
```text
3
-8 13 14
```

**Output**
```text
EMPTY
-8
13
-8 13
14
-8 14
13 14
-8 13 14
```

**Explanation**

Each bit mask chooses whether its corresponding array element is included. Masks run from 0 to 2^3-1, producing 8 subsets.

### M6-LU9 — Recursion depth and stack limits

Compute x^n using recursive exponentiation by squaring.

**Input Format**

Read integer x and non-negative integer n on separate lines.

**Output Format**

Print x^n.

**Constraints**

-10 ≤ x ≤ 10; 0 ≤ n ≤ 60; the exact result fits in signed 64-bit.

**Worked Example 1**

**Example Input**
```text
-3
```

**Output**
```text
-19683
```

**Explanation**

Exponentiation by squaring recursively halves the exponent, multiplying an extra x only for odd exponents. The final power is -19683.

**Worked Example 2**

**Example Input**
```text
-1
```

**Output**
```text
1
```

**Explanation**

Exponentiation by squaring recursively halves the exponent, multiplying an extra x only for odd exponents. The final power is 1.

### M6-LU10 — Duplicate handling

Given a sorted multiset, count how many distinct subsets exist when equal values are indistinguishable.

**Input Format**

Read n and n sorted integers.

**Output Format**

Print the number of distinct subsets.

**Constraints**

0 ≤ n ≤ 30; values are sorted and each is between -10^9 and 10^9.

**Worked Example 1**

**Example Input**
```text
2
0 3
```

**Output**
```text
4
```

**Explanation**

If a value occurs f times, it contributes f+1 choices for how many copies are selected. Multiplying these choices for all distinct values gives 4.

**Worked Example 2**

**Example Input**
```text
4
0 1 2 3
```

**Output**
```text
16
```

**Explanation**

If a value occurs f times, it contributes f+1 choices for how many copies are selected. Multiplying these choices for all distinct values gives 16.

### M7-LU1 — Binary search

A sorted inventory list is queried for a product ID. Return its zero-based index or -1 when absent.

**Input Format**

Read n and target on separate lines, then n sorted integers.

**Output Format**

Print the zero-based index of target, or -1.

**Constraints**

1 ≤ n ≤ 100,000; array is sorted non-decreasingly; values fit in signed 32-bit integers.

**Worked Example 1**

**Example Input**
```text
2
7
5 15
```

**Output**
```text
-1
```

**Explanation**

Binary search repeatedly halves the sorted search interval until target 7 is found or the interval becomes empty. The returned index is -1.

**Worked Example 2**

**Example Input**
```text
6
16
0 8 11 12 13 22
```

**Output**
```text
-1
```

**Explanation**

Binary search repeatedly halves the sorted search interval until target 16 is found or the interval becomes empty. The returned index is -1.

### M7-LU2 — Bounds

In a sorted list, find the first and last zero-based positions of a target value.

**Input Format**

Read n and target on separate lines, then n sorted integers.

**Output Format**

Print first_index and last_index, or -1 -1 if target is absent.

**Constraints**

1 ≤ n ≤ 100,000; array is sorted non-decreasingly.

**Worked Example 1**

**Example Input**
```text
2
5
2 8
```

**Output**
```text
-1 -1
```

**Explanation**

The lower bound identifies the first occurrence and the upper bound identifies the position after the last; converting that to an index gives -1 -1.

**Worked Example 2**

**Example Input**
```text
8
3
0 2 3 5 6 6 7 8
```

**Output**
```text
2 2
```

**Explanation**

The lower bound identifies the first occurrence and the upper bound identifies the position after the last; converting that to an index gives 2 2.

### M7-LU3 — Binary search on answer space

A courier must ship packages in their given order within at most d days. Find the minimum daily capacity that makes this possible.

**Input Format**

Read n and d on separate lines, then n positive package weights.

**Output Format**

Print the minimum feasible capacity.

**Constraints**

1 ≤ n ≤ 100,000; 1 ≤ d ≤ n; each weight is 1..10^6; total weight fits in 64-bit.

**Worked Example 1**

**Example Input**
```text
3
1
15 16 11
```

**Output**
```text
42
```

**Explanation**

Test capacities from the largest single package upward conceptually; a capacity is feasible when the ordered packages can be split into at most 1 days. The minimum feasible capacity is 42.

**Worked Example 2**

**Example Input**
```text
7
2
16 3 4 11 18 3 7
```

**Output**
```text
34
```

**Explanation**

Test capacities from the largest single package upward conceptually; a capacity is feasible when the ordered packages can be split into at most 2 days. The minimum feasible capacity is 34.

### M7-LU4 — Greedy algorithms

A room can host non-overlapping talks. Select the maximum number of talks so that each selected talk starts at or after the previous talk finishes.

**Input Format**

Read n, then n lines containing start and finish times.

**Output Format**

Print the maximum number of non-overlapping talks.

**Constraints**

1 ≤ n ≤ 100,000; 0 ≤ start < finish ≤ 10^9.

**Worked Example 1**

**Example Input**
```text
2
17 19
20 24
```

**Output**
```text
2
```

**Explanation**

Sort talks by finishing time and greedily accept a talk whenever its start is at least the finish of the last accepted talk. This produces 2 talks.

**Worked Example 2**

**Example Input**
```text
5
3 8
9 10
15 16
19 26
21 23
```

**Output**
```text
4
```

**Explanation**

Sort talks by finishing time and greedily accept a talk whenever its start is at least the finish of the last accepted talk. This produces 4 talks.

### M7-LU5 — Feasibility and optimization checks

Place k Wi-Fi routers in sorted house positions so that the minimum distance between any two routers is as large as possible.

**Input Format**

Read n and k on separate lines, then n sorted house positions.

**Output Format**

Print the maximum achievable minimum distance.

**Constraints**

2 ≤ k ≤ n ≤ 100,000; positions are distinct integers from 0 to 10^9 and sorted increasingly.

**Worked Example 1**

**Example Input**
```text
2
2
2 14
```

**Output**
```text
12
```

**Explanation**

Binary-search the candidate minimum distance and check greedily whether 2 routers can be placed with at least that separation. The largest feasible distance is 12.

**Worked Example 2**

**Example Input**
```text
7
6
10 12 14 19 24 30 33
```

**Output**
```text
3
```

**Explanation**

Binary-search the candidate minimum distance and check greedily whether 6 routers can be placed with at least that separation. The largest feasible distance is 3.

### M8-LU1 — Tree representations

A rooted tree is given by a parent index for every node. Print each node’s direct children in ascending order.

**Input Format**

Read n and then n parent indices. The root has parent -1.

**Output Format**

Print n lines in the form i: child1 child2 ...; print EMPTY after the colon when a node has no children.

**Constraints**

1 ≤ n ≤ 100,000; exactly one parent is -1; every other parent is between 0 and n-1 and describes a valid rooted tree.

**Worked Example 1**

**Example Input**
```text
3
-1 0 1
```

**Output**
```text
0: 1
1: 2
2: EMPTY
```

**Explanation**

For each node, append it to the child list of its parent. Sorting is already achieved by processing node indices in increasing order, giving the listed child sets.

**Worked Example 2**

**Example Input**
```text
7
-1 0 0 0 2 0 3
```

**Output**
```text
0: 1 2 3 5
1: EMPTY
2: 4
3: 6
4: EMPTY
5: EMPTY
6: EMPTY
```

**Explanation**

For each node, append it to the child list of its parent. Sorting is already achieved by processing node indices in increasing order, giving the listed child sets.

### M8-LU2 — Tree properties

A binary tree is encoded in level order with -1 for missing nodes. Compute its height, where an empty tree has height 0 and a leaf has height 1.

**Input Format**

Read n followed by n level-order entries; -1 denotes a missing node.

**Output Format**

Print the tree height.

**Constraints**

1 ≤ n ≤ 100,000; the encoding represents a valid binary tree; values other than -1 fit in 32-bit signed integers.

**Worked Example 1**

**Example Input**
```text
8
1 2 3 4 5 6 7 8
```

**Output**
```text
3
```

**Explanation**

Starting from the root, each level adds one to the depth; missing nodes do not create children. The deepest existing node determines the height 3.

**Worked Example 2**

**Example Input**
```text
6
1 2 3 4 5 6
```

**Output**
```text
3
```

**Explanation**

Starting from the root, each level adds one to the depth; missing nodes do not create children. The deepest existing node determines the height 3.

### M8-LU3 — BFS

A binary tree is stored in level-order form with -1 for missing nodes. Print its breadth-first traversal, skipping missing entries.

**Input Format**

Read n followed by n level-order entries; -1 means missing.

**Output Format**

Print all existing node values in level-order separated by spaces.

**Constraints**

1 ≤ n ≤ 100,000; the level-order encoding is valid.

**Worked Example 1**

**Example Input**
```text
1
1
```

**Output**
```text
1
```

**Explanation**

BFS visits nodes level by level. Removing the missing-node markers leaves the traversal 1.

**Worked Example 2**

**Example Input**
```text
6
1 2 3 4 5 6
```

**Output**
```text
1 2 3 4 5 6
```

**Explanation**

BFS visits nodes level by level. Removing the missing-node markers leaves the traversal 1 2 3 4 5 6.

### M8-LU4 — DFS

A binary tree is encoded in level order. Print its preorder traversal, visiting root, then left subtree, then right subtree.

**Input Format**

Read n followed by n level-order entries; -1 means missing.

**Output Format**

Print preorder values separated by spaces.

**Constraints**

1 ≤ n ≤ 100,000; encoding is valid.

**Worked Example 1**

**Example Input**
```text
8
1 2 3 4 5 6 7 8
```

**Output**
```text
1 2 4 8 5 3 6 7
```

**Explanation**

DFS visits each node in root-left-right order. The resulting preorder sequence is 1 2 4 8 5 3 6 7.

**Worked Example 2**

**Example Input**
```text
4
1 2 3 4
```

**Output**
```text
1 2 4 3
```

**Explanation**

DFS visits each node in root-left-right order. The resulting preorder sequence is 1 2 4 3.

### M8-LU5 — BST operations

Insert distinct keys into a binary search tree in the given order. Print the inorder traversal after all insertions.

**Input Format**

Read n and n distinct integers.

**Output Format**

Print the inorder traversal separated by spaces.

**Constraints**

0 ≤ n ≤ 100,000; keys are distinct signed 32-bit integers.

**Worked Example 1**

**Example Input**
```text
6
9 19 31 -10 -8 -9
```

**Output**
```text
-10 -9 -8 9 19 31
```

**Explanation**

BST insertion places smaller keys left and larger keys right. Inorder traversal therefore visits keys in ascending order: -10 -9 -8 9 19 31.

**Worked Example 2**

**Example Input**
```text
5
-3 -6 22 3 14
```

**Output**
```text
-6 -3 3 14 22
```

**Explanation**

BST insertion places smaller keys left and larger keys right. Inorder traversal therefore visits keys in ascending order: -6 -3 3 14 22.

### M8-LU6 — Recursive versus iterative traversals

Given a binary tree in level-order form, print its inorder, preorder, and postorder traversals.

**Input Format**

Read n followed by n level-order entries; -1 means missing.

**Output Format**

Print three lines beginning INORDER:, PREORDER:, and POSTORDER:, followed by values separated by spaces.

**Constraints**

1 ≤ n ≤ 100,000; encoding is valid.

**Worked Example 1**

**Example Input**
```text
10
1 2 3 4 5 6 7 8 9 10
```

**Output**
```text
INORDER: 8 4 9 2 10 5 1 6 3 7
PREORDER: 1 2 4 8 9 5 10 3 6 7
POSTORDER: 8 9 4 10 5 2 6 7 3 1
```

**Explanation**

The same tree is traversed in three orders: left-root-right, root-left-right, and left-right-root. The three resulting sequences are printed on separate labeled lines.

**Worked Example 2**

**Example Input**
```text
5
1 2 3 4 5
```

**Output**
```text
INORDER: 4 2 5 1 3
PREORDER: 1 2 4 5 3
POSTORDER: 4 5 2 3 1
```

**Explanation**

The same tree is traversed in three orders: left-root-right, root-left-right, and left-right-root. The three resulting sequences are printed on separate labeled lines.

### M8-LU7 — Morris traversal

Insert distinct values into a binary search tree and print its inorder traversal. The intended traversal technique is Morris traversal, which uses O(1) auxiliary traversal space.

**Input Format**

Read n and n distinct insertion values.

**Output Format**

Print inorder traversal.

**Constraints**

0 ≤ n ≤ 100,000; keys are distinct signed 32-bit integers.

**Worked Example 1**

**Example Input**
```text
3
27 -23 8
```

**Output**
```text
-23 8 27
```

**Explanation**

Morris traversal temporarily links each node to its inorder predecessor and removes the link after visiting. The final inorder sequence is -23 8 27.

**Worked Example 2**

**Example Input**
```text
4
10 5 8 -28
```

**Output**
```text
-28 5 8 10
```

**Explanation**

Morris traversal temporarily links each node to its inorder predecessor and removes the link after visiting. The final inorder sequence is -28 5 8 10.

### M9-LU1 — Graph representations

Build an undirected graph and print the neighbors of every vertex in ascending order.

**Input Format**

Read n and m, then m undirected edges u v, one per line.

**Output Format**

Print n lines as i: neighbors. Print EMPTY when a vertex has no neighbors.

**Constraints**

1 ≤ n ≤ 100,000; 0 ≤ m ≤ n(n-1)/2; no self-loops; vertices are 0..n-1.

**Worked Example 1**

**Example Input**
```text
3
1
0 1
```

**Output**
```text
0: 1
1: 0
2: EMPTY
```

**Explanation**

Each undirected edge is added to both endpoint lists. Sorting each list gives the required adjacency representation.

**Worked Example 2**

**Example Input**
```text
4
5
0 1
1 2
1 3
2 3
0 3
```

**Output**
```text
0: 1 3
1: 0 2 3
2: 1 3
3: 0 1 2
```

**Explanation**

Each undirected edge is added to both endpoint lists. Sorting each list gives the required adjacency representation.

### M9-LU2 — Graph BFS and DFS

For an undirected graph, print the BFS visitation order starting from the given source. Visit smaller-numbered neighbors first.

**Input Format**

Read n and m, then m edges, then source.

**Output Format**

Print the BFS visitation order.

**Constraints**

1 ≤ n ≤ 100,000; 0 ≤ m ≤ 200,000; no self-loops; vertices are 0..n-1.

**Worked Example 1**

**Example Input**
```text
6
3
1 3
0 4
1 5
3
```

**Output**
```text
3 1 5
```

**Explanation**

BFS uses a queue and visits each reachable neighbor once, always taking smaller neighbors first. The resulting order is 3 1 5.

**Worked Example 2**

**Example Input**
```text
6
2
4 5
2 5
4
```

**Output**
```text
4 5 2
```

**Explanation**

BFS uses a queue and visits each reachable neighbor once, always taking smaller neighbors first. The resulting order is 4 5 2.

### M9-LU3 — Cycle detection

Determine whether an undirected graph contains a cycle.

**Input Format**

Read n and m, then m undirected edges.

**Output Format**

Print CYCLE or ACYCLIC.

**Constraints**

1 ≤ n ≤ 100,000; 0 ≤ m ≤ 200,000; no self-loops or duplicate edges.

**Worked Example 1**

**Example Input**
```text
2
1
0 1
```

**Output**
```text
ACYCLIC
```

**Explanation**

Use graph traversal with parent tracking. Encountering an already visited vertex that is not the current parent proves a cycle; otherwise the graph is acyclic, giving ACYCLIC.

**Worked Example 2**

**Example Input**
```text
5
1
0 3
```

**Output**
```text
ACYCLIC
```

**Explanation**

Use graph traversal with parent tracking. Encountering an already visited vertex that is not the current parent proves a cycle; otherwise the graph is acyclic, giving ACYCLIC.

### M9-LU4 — Bipartite check

Determine whether an undirected graph can be colored with two colors so that every edge joins different colors.

**Input Format**

Read n and m, then m undirected edges.

**Output Format**

Print BIPARTITE or NOT_BIPARTITE.

**Constraints**

1 ≤ n ≤ 100,000; 0 ≤ m ≤ 200,000; no self-loops.

**Worked Example 1**

**Example Input**
```text
4
1
0 3
```

**Output**
```text
BIPARTITE
```

**Explanation**

Color each connected component by alternating colors along edges. A conflict means two adjacent vertices need the same color; the result is BIPARTITE.

**Worked Example 2**

**Example Input**
```text
5
5
1 3
0 3
2 3
0 2
3 4
```

**Output**
```text
NOT_BIPARTITE
```

**Explanation**

Color each connected component by alternating colors along edges. A conflict means two adjacent vertices need the same color; the result is NOT_BIPARTITE.

### M9-LU5 — Topological sort

Produce the lexicographically smallest topological ordering of a directed acyclic graph.

**Input Format**

Read n and m, then m directed edges u v.

**Output Format**

Print the ordering, or INVALID if the graph contains a cycle.

**Constraints**

1 ≤ n ≤ 100,000; 0 ≤ m ≤ 200,000; no self-loops. A cycle is allowed and must produce INVALID.

**Worked Example 1**

**Example Input**
```text
3
3
1 2
0 1
0 2
```

**Output**
```text
0 1 2
```

**Explanation**

Repeatedly choose the smallest currently zero-indegree vertex. If all vertices are removed, that sequence is the lexicographically smallest topological order; otherwise a cycle exists and INVALID is printed.

**Worked Example 2**

**Example Input**
```text
4
3
0 1
1 0
2 0
```

**Output**
```text
INVALID
```

**Explanation**

Repeatedly choose the smallest currently zero-indegree vertex. If all vertices are removed, that sequence is the lexicographically smallest topological order; otherwise a cycle exists and INVALID is printed.

### M9-LU6 — Directed versus undirected graphs

In a directed graph, determine whether target is reachable from source by following edge directions.

**Input Format**

Read n and m, then m directed edges, then source and target.

**Output Format**

Print REACHABLE or UNREACHABLE.

**Constraints**

1 ≤ n ≤ 100,000; 0 ≤ m ≤ 200,000; vertices are 0..n-1.

**Worked Example 1**

**Example Input**
```text
2
0
0
1
```

**Output**
```text
UNREACHABLE
```

**Explanation**

Starting at 0, follow only directed outgoing edges. If 1 is visited, the result is REACHABLE; otherwise it is UNREACHABLE.

**Worked Example 2**

**Example Input**
```text
5
6
2 0
4 1
3 2
3 1
1 2
4 0
4
4
```

**Output**
```text
REACHABLE
```

**Explanation**

Starting at 4, follow only directed outgoing edges. If 4 is visited, the result is REACHABLE; otherwise it is UNREACHABLE.

### M9-LU7 — Weighted versus unweighted graphs

For an unweighted undirected graph, find the minimum number of edges needed to travel from source to target.

**Input Format**

Read n and m, then m undirected edges, then source and target.

**Output Format**

Print the shortest edge count, or -1 if target is unreachable.

**Constraints**

1 ≤ n ≤ 100,000; 0 ≤ m ≤ 200,000; no self-loops.

**Worked Example 1**

**Example Input**
```text
2
0
0
1
```

**Output**
```text
-1
```

**Explanation**

Because every edge has equal cost, BFS reaches vertices in nondecreasing edge distance. The first distance assigned to target is -1.

**Worked Example 2**

**Example Input**
```text
7
3
4 5
5 6
3 5
0
6
```

**Output**
```text
-1
```

**Explanation**

Because every edge has equal cost, BFS reaches vertices in nondecreasing edge distance. The first distance assigned to target is -1.

### M9-LU8 — Sparse versus dense graphs

Classify an undirected graph as SPARSE when m < n; otherwise classify it as DENSE.

**Input Format**

Read n and m on separate lines.

**Output Format**

Print SPARSE if m < n; otherwise print DENSE.

**Constraints**

1 ≤ n ≤ 100,000; 0 ≤ m ≤ n(n-1)/2.

**Worked Example 1**

**Example Input**
```text
4
2
```

**Output**
```text
SPARSE
```

**Explanation**

Compare the number of edges 2 with the vertex count 4. Since the rule is m<n for sparse graphs, the classification is SPARSE.

**Worked Example 2**

**Example Input**
```text
8
12
```

**Output**
```text
DENSE
```

**Explanation**

Compare the number of edges 12 with the vertex count 8. Since the rule is m<n for sparse graphs, the classification is DENSE.

### M9-LU9 — Shortest paths

Compute shortest distances from source 0 in a directed graph whose edge weights are non-negative.

**Input Format**

Read n and m, then m weighted directed edges u v w.

**Output Format**

Print n distances from source 0 separated by spaces; print INF for unreachable vertices.

**Constraints**

1 ≤ n ≤ 100,000; 0 ≤ m ≤ 200,000; 0 ≤ w ≤ 10^9; no self-loops.

**Worked Example 1**

**Example Input**
```text
4
4
2 1 7
3 2 3
1 0 3
0 3 7
```

**Output**
```text
0 17 10 7
```

**Explanation**

Dijkstra repeatedly finalizes the unvisited vertex with the smallest tentative distance and relaxes its outgoing edges. The resulting distances from source 0 are 0 17 10 7.

**Worked Example 2**

**Example Input**
```text
3
6
2 1 7
0 1 2
2 0 6
1 0 7
0 2 6
1 2 3
```

**Output**
```text
0 2 5
```

**Explanation**

Dijkstra repeatedly finalizes the unvisited vertex with the smallest tentative distance and relaxes its outgoing edges. The resulting distances from source 0 are 0 2 5.

### M9-LU10 — Minimum spanning tree with Prim's algorithm

Find the total weight of a minimum spanning tree of a connected undirected weighted graph.

**Input Format**

Read n and m, then m edges u v w.

**Output Format**

Print the total MST weight.

**Constraints**

1 ≤ n ≤ 100,000; n-1 ≤ m ≤ 200,000; graph is connected; weights are non-negative integers ≤ 10^9.

**Worked Example 1**

**Example Input**
```text
2
1
0 1 6
```

**Output**
```text
6
```

**Explanation**

Prim's algorithm grows one connected tree by repeatedly taking the cheapest edge from the tree to an unvisited vertex. The selected edge weights sum to 6.

**Worked Example 2**

**Example Input**
```text
4
6
0 1 3
1 2 7
2 3 2
0 3 5
0 2 6
1 3 4
```

**Output**
```text
9
```

**Explanation**

Prim's algorithm grows one connected tree by repeatedly taking the cheapest edge from the tree to an unvisited vertex. The selected edge weights sum to 9.

### M9-LU11 — Disjoint sets

Process union operations and connectivity queries on numbered users.

**Input Format**

Read n and q. Each of the next q lines is either UNION a b or QUERY a b.

**Output Format**

Print YES/NO for each QUERY in order.

**Constraints**

1 ≤ n,q ≤ 100,000; 0 ≤ a,b < n.

**Worked Example 1**

**Example Input**
```text
8
4
QUERY 0 0
UNION 3 4
QUERY 2 3
UNION 3 4
```

**Output**
```text
YES
NO
```

**Explanation**

Union operations merge sets; each query checks whether both users have the same representative. The query results are printed in their original order.

**Worked Example 2**

**Example Input**
```text
5
5
QUERY 0 0
QUERY 1 1
UNION 4 3
QUERY 4 1
QUERY 2 0
```

**Output**
```text
YES
YES
NO
NO
```

**Explanation**

Union operations merge sets; each query checks whether both users have the same representative. The query results are printed in their original order.

### M9-LU12 — Kosaraju's algorithm

Count the strongly connected components of a directed graph.

**Input Format**

Read n and m, then m directed edges.

**Output Format**

Print the number of strongly connected components.

**Constraints**

1 ≤ n ≤ 100,000; 0 ≤ m ≤ 200,000; vertices are 0..n-1.

**Worked Example 1**

**Example Input**
```text
5
4
4 3
2 1
2 4
0 3
```

**Output**
```text
5
```

**Explanation**

Kosaraju performs DFS ordering on the graph, then DFS on the reversed graph in decreasing finish order. Each second-pass tree is one strongly connected component, giving 5 components.

**Worked Example 2**

**Example Input**
```text
4
6
3 1
2 1
0 2
1 0
3 0
2 3
```

**Output**
```text
1
```

**Explanation**

Kosaraju performs DFS ordering on the graph, then DFS on the reversed graph in decreasing finish order. Each second-pass tree is one strongly connected component, giving 1 components.

### M9-LU13 — Choosing shortest-path algorithms

Given weighted directed edges, choose Dijkstra when every edge weight is non-negative; otherwise choose Bellman-Ford.

**Input Format**

Read n and m, then m weighted directed edges u v w.

**Output Format**

Print DIJKSTRA if all weights are non-negative; otherwise BELLMAN_FORD.

**Constraints**

1 ≤ n ≤ 100,000; 0 ≤ m ≤ 200,000; weights are between -10^9 and 10^9.

**Worked Example 1**

**Example Input**
```text
5
6
4 2 6
4 1 8
2 4 6
0 2 1
2 0 -1
4 2 5
```

**Output**
```text
BELLMAN_FORD
```

**Explanation**

Dijkstra is safe only when no edge has a negative weight. The edge list therefore selects BELLMAN_FORD.

**Worked Example 2**

**Example Input**
```text
4
2
3 2 -1
0 0 2
```

**Output**
```text
BELLMAN_FORD
```

**Explanation**

Dijkstra is safe only when no edge has a negative weight. The edge list therefore selects BELLMAN_FORD.

### M10-LU1 — Dynamic programming

A robot moves from the top-left to the bottom-right of a grid, moving only right or down. Find the maximum sum of visited cell values.

**Input Format**

Read r and c, then r rows of c integers.

**Output Format**

Print the maximum path sum.

**Constraints**

1 ≤ r,c ≤ 500; each cell is between -10^6 and 10^6; the result fits in 64-bit.

**Worked Example 1**

**Example Input**
```text
4
3
2 7 7
5 5 -4
-3 8 9
-3 1 -3
```

**Output**
```text
28
```

**Explanation**

For each cell, keep the best sum reaching it from the top or left, then add the cell value. The bottom-right state is the maximum path sum 28.

**Worked Example 2**

**Example Input**
```text
1
3
4 4 -5
```

**Output**
```text
3
```

**Explanation**

For each cell, keep the best sum reaching it from the top or left, then add the cell value. The bottom-right state is the maximum path sum 3.

### M10-LU2 — Tries

Store a set of words in a trie and count how many inserted words start with the given prefix.

**Input Format**

Read n, then n lowercase words, then one prefix.

**Output Format**

Print the number of inserted words beginning with the prefix.

**Constraints**

1 ≤ n ≤ 100,000; total characters across all words ≤ 1,000,000; prefix contains lowercase letters.

**Worked Example 1**

**Example Input**
```text
3
apple
app
apply
ba
```

**Output**
```text
0
```

**Explanation**

A trie follows the prefix character by character; every word ending below that prefix contributes one count. The number of matching inserted words is 0.

**Worked Example 2**

**Example Input**
```text
3
apple
app
apply
app
```

**Output**
```text
3
```

**Explanation**

A trie follows the prefix character by character; every word ending below that prefix contributes one count. The number of matching inserted words is 3.

### M10-LU3 — Heaps and priority queues

A scheduler receives jobs with a priority value. Process the smallest priority first; ties are resolved by earlier input order.

**Input Format**

Read n, then n lines containing job_id|priority.

**Output Format**

Print job IDs in processing order, one per line.

**Constraints**

1 ≤ n ≤ 100,000; job IDs contain letters/digits; priority is an integer between -10^9 and 10^9; IDs are unique.

**Worked Example 1**

**Example Input**
```text
2
J0|4
J1|1
```

**Output**
```text
J1
J0
```

**Explanation**

A min-priority queue repeatedly removes the smallest priority. Python's stable ordering by the original tuple list preserves input order among equal priorities, giving the shown job sequence.

**Worked Example 2**

**Example Input**
```text
4
J0|3
J1|2
J2|5
J3|3
```

**Output**
```text
J1
J0
J3
J2
```

**Explanation**

A min-priority queue repeatedly removes the smallest priority. Python's stable ordering by the original tuple list preserves input order among equal priorities, giving the shown job sequence.

### M10-LU4 — Bit manipulation

For each integer, count its set bits and print the total number of 1-bits across all inputs.

**Input Format**

Read n and n non-negative integers.

**Output Format**

Print the total set-bit count.

**Constraints**

1 ≤ n ≤ 100,000; 0 ≤ each value < 2^31.

**Worked Example 1**

**Example Input**
```text
5
134 106 106 170 201
```

**Output**
```text
19
```

**Explanation**

Each integer is represented in binary and its 1-bits are counted. Adding those counts across all 5 integers gives 19.

**Worked Example 2**

**Example Input**
```text
6
214 157 109 219 63 193
```

**Output**
```text
30
```

**Explanation**

Each integer is represented in binary and its 1-bits are counted. Adding those counts across all 6 integers gives 30.

### M10-LU5 — String algorithms

Find the first zero-based occurrence of a pattern in a text using exact character matching. Print -1 when the pattern does not occur.

**Input Format**

Read text on the first line and pattern on the second line; both contain no spaces.

**Output Format**

Print the first zero-based index where pattern starts in text, or -1.

**Constraints**

1 ≤ pattern length ≤ text length ≤ 100,000; lowercase English letters only.

**Worked Example 1**

**Example Input**
```text
babacaba
a
```

**Output**
```text
1
```

**Explanation**

Compare the pattern against text positions from left to right. The first exact match starts at index 1, or -1 if no position matches.

**Worked Example 2**

**Example Input**
```text
abaabcacabb
a
```

**Output**
```text
0
```

**Explanation**

Compare the pattern against text positions from left to right. The first exact match starts at index 0, or -1 if no position matches.

### M10-LU6 — Advanced recursion

For the Tower of Hanoi with n disks, report the minimum number of moves required to transfer all disks from one peg to another.

**Input Format**

Read n.

**Output Format**

Print the minimum number of moves.

**Constraints**

0 ≤ n ≤ 63; the result fits in unsigned 64-bit arithmetic.

**Worked Example 1**

**Example Input**
```text
0
```

**Output**
```text
0
```

**Explanation**

The recurrence is T(n)=2T(n-1)+1 with T(0)=0. Solving it gives 2^0-1 = 0 moves.

**Worked Example 2**

**Example Input**
```text
8
```

**Output**
```text
255
```

**Explanation**

The recurrence is T(n)=2T(n-1)+1 with T(0)=0. Solving it gives 2^8-1 = 255 moves.
