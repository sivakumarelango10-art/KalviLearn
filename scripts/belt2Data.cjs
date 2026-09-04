// Belt 2: 30 Problems (Loops, Digits, Factors, Series, Patterns)
module.exports = [
  {
    order: 1,
    title: "Print Numbers from 1 to N",
    difficulty: "Medium",
    description: "Given a positive integer N, print all integers from 1 to N in increasing order.",
    inputFormat: "A single integer N.",
    outputFormat: "Print the integers from 1 to N separated by spaces.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      return Array.from({ length: n }, (_, i) => i + 1).join(" ");
    },
    testInputs: ["5", "8", "1", "3", "10", "15", "2", "6", "12", "20"]
  },
  {
    order: 2,
    title: "Print Numbers from N to 1",
    difficulty: "Medium",
    description: "Given a positive integer N, print all integers from N down to 1.",
    inputFormat: "A single integer N.",
    outputFormat: "Print the integers from N to 1 separated by spaces.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      const res = [];
      for (let i = n; i >= 1; i--) res.push(i);
      return res.join(" ");
    },
    testInputs: ["5", "7", "1", "2", "10", "12", "4", "6", "15", "20"]
  },
  {
    order: 3,
    title: "Sum of First N Natural Numbers",
    difficulty: "Medium",
    description: "Given a positive integer N, calculate the sum of all natural numbers from 1 to N.",
    inputFormat: "A single integer N.",
    outputFormat: "Print the sum of the numbers from 1 to N.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      return String((n * (n + 1)) / 2);
    },
    testInputs: ["5", "10", "1", "2", "20", "50", "100", "7", "15", "30"]
  },
  {
    order: 4,
    title: "Sum of Even Numbers",
    difficulty: "Medium",
    description: "Given a positive integer N, calculate the sum of all even numbers from 1 to N.",
    inputFormat: "A single integer N.",
    outputFormat: "Print the sum of all even numbers from 1 to N.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      let sum = 0;
      for (let i = 2; i <= n; i += 2) sum += i;
      return String(sum);
    },
    testInputs: ["10", "15", "1", "2", "20", "5", "30", "50", "7", "12"]
  },
  {
    order: 5,
    title: "Sum of Odd Numbers",
    difficulty: "Medium",
    description: "Given a positive integer N, calculate the sum of all odd numbers from 1 to N.",
    inputFormat: "A single integer N.",
    outputFormat: "Print the sum of all odd numbers from 1 to N.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      let sum = 0;
      for (let i = 1; i <= n; i += 2) sum += i;
      return String(sum);
    },
    testInputs: ["10", "15", "1", "2", "20", "5", "7", "30", "50", "11"]
  },
  {
    order: 6,
    title: "Multiplication Table",
    difficulty: "Medium",
    description: "Given an integer N, print its multiplication table from 1 to 10.",
    inputFormat: "A single integer N.",
    outputFormat: "Print the first ten multiples of N, separated by spaces.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      return Array.from({ length: 10 }, (_, i) => (i + 1) * n).join(" ");
    },
    testInputs: ["5", "7", "1", "2", "10", "12", "9", "3", "15", "25"]
  },
  {
    order: 7,
    title: "Count Digits",
    difficulty: "Medium",
    description: "Given a positive integer, count how many digits it contains.",
    inputFormat: "A single positive integer N.",
    outputFormat: "Print the number of digits in N.",
    solve: (input) => {
      const s = input.trim();
      return String(s.length);
    },
    testInputs: ["5832", "90751", "5", "10", "100000", "999", "12345678", "42", "700", "1000000"]
  },
  {
    order: 8,
    title: "Sum of Digits",
    difficulty: "Medium",
    description: "Given a positive integer, calculate the sum of all its digits.",
    inputFormat: "A single positive integer N.",
    outputFormat: "Print the sum of the digits of N.",
    solve: (input) => {
      const digits = input.trim().split("");
      const sum = digits.reduce((acc, d) => acc + parseInt(d, 10), 0);
      return String(sum);
    },
    testInputs: ["5832", "9075", "123", "9999", "100", "5", "7890", "4444", "10101", "88"]
  },
  {
    order: 9,
    title: "Reverse a Number",
    difficulty: "Medium",
    description: "Given a positive integer, print its digits in reverse order.",
    inputFormat: "A single positive integer N.",
    outputFormat: "Print the reversed number.",
    solve: (input) => {
      const rev = input.trim().split("").reverse().join("");
      return String(parseInt(rev, 10));
    },
    testInputs: ["12345", "708", "100", "9", "456", "9876", "1200", "555", "10203", "84"]
  },
  {
    order: 10,
    title: "Count Even Digits",
    difficulty: "Medium",
    description: "Given a positive integer, count how many of its digits are even.",
    inputFormat: "A single positive integer N.",
    outputFormat: "Print the number of even digits in N.",
    solve: (input) => {
      const digits = input.trim().split("").map(Number);
      const evens = digits.filter(d => d % 2 === 0).length;
      return String(evens);
    },
    testInputs: ["482731", "13579", "24680", "12345", "0", "888", "1024", "9999", "2048", "77"]
  },
  {
    order: 11,
    title: "Count Odd Digits",
    difficulty: "Medium",
    description: "Given a positive integer, count how many of its digits are odd.",
    inputFormat: "A single positive integer N.",
    outputFormat: "Print the number of odd digits in N.",
    solve: (input) => {
      const digits = input.trim().split("").map(Number);
      const odds = digits.filter(d => d % 2 !== 0).length;
      return String(odds);
    },
    testInputs: ["482731", "24680", "13579", "12345", "999", "888", "707", "1024", "55", "2"]
  },
  {
    order: 12,
    title: "Find the Largest Digit",
    difficulty: "Medium",
    description: "Given a positive integer, find and print its largest digit.",
    inputFormat: "A single positive integer N.",
    outputFormat: "Print the largest digit present in N.",
    solve: (input) => {
      const digits = input.trim().split("").map(Number);
      return String(Math.max(...digits));
    },
    testInputs: ["58321", "70496", "111", "90", "5", "2384", "8899", "1000", "753", "642"]
  },
  {
    order: 13,
    title: "Find the Smallest Digit",
    difficulty: "Medium",
    description: "Given a positive integer, find and print its smallest digit.",
    inputFormat: "A single positive integer N.",
    outputFormat: "Print the smallest digit present in N.",
    solve: (input) => {
      const digits = input.trim().split("").map(Number);
      return String(Math.min(...digits));
    },
    testInputs: ["58321", "70496", "999", "123", "5", "846", "375", "100", "444", "82"]
  },
  {
    order: 14,
    title: "Check Palindrome Number",
    difficulty: "Medium",
    description: "Given a positive integer, determine whether it reads the same from left to right and right to left.",
    inputFormat: "A single positive integer N.",
    outputFormat: "Print Palindrome if the number reads the same in reverse. Otherwise, print Not Palindrome.",
    solve: (input) => {
      const s = input.trim();
      const rev = s.split("").reverse().join("");
      return s === rev ? "Palindrome" : "Not Palindrome";
    },
    testInputs: ["1221", "1234", "121", "7", "1001", "10", "99999", "12321", "4554", "789"]
  },
  {
    order: 15,
    title: "Calculate Factorial",
    difficulty: "Medium",
    description: "Given a non-negative integer N, calculate its factorial.",
    inputFormat: "A single integer N.",
    outputFormat: "Print N!.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      let fact = 1n;
      for (let i = 2n; i <= BigInt(n); i++) fact *= i;
      return fact.toString();
    },
    testInputs: ["5", "4", "0", "1", "3", "6", "7", "8", "9", "10"]
  },
  {
    order: 16,
    title: "Count Multiples",
    difficulty: "Medium",
    description: "Given two positive integers N and K, count how many numbers from 1 to N are divisible by K.",
    inputFormat: "A single line containing two integers N and K.",
    outputFormat: "Print the number of integers between 1 and N that are divisible by K.",
    solve: (input) => {
      const [n, k] = input.trim().split(/\s+/).map(Number);
      return String(Math.floor(n / k));
    },
    testInputs: ["20 5", "30 4", "10 2", "15 3", "7 8", "50 10", "100 7", "25 6", "1 1", "40 9"]
  },
  {
    order: 17,
    title: "Print Multiples",
    difficulty: "Medium",
    description: "Given two positive integers N and K, print all multiples of K from 1 to N.",
    inputFormat: "A single line containing two integers N and K.",
    outputFormat: "Print all multiples of K that are less than or equal to N, separated by spaces.",
    solve: (input) => {
      const [n, k] = input.trim().split(/\s+/).map(Number);
      const res = [];
      for (let i = k; i <= n; i += k) res.push(i);
      return res.join(" ");
    },
    testInputs: ["20 5", "25 4", "10 2", "15 3", "30 7", "12 4", "50 15", "8 3", "100 25", "16 5"]
  },
  {
    order: 18,
    title: "Calculate Power",
    difficulty: "Medium",
    description: "Given two non-negative integers A and B, calculate A raised to the power B.",
    inputFormat: "A single line containing two integers A and B.",
    outputFormat: "Print A^B.",
    solve: (input) => {
      const [a, b] = input.trim().split(/\s+/).map(BigInt);
      return (a ** b).toString();
    },
    testInputs: ["2 5", "3 4", "5 0", "10 3", "2 10", "4 3", "7 2", "1 50", "9 2", "6 3"]
  },
  {
    order: 19,
    title: "Check Prime Number",
    difficulty: "Medium",
    description: "Given an integer greater than 1, determine whether it is a prime number.",
    inputFormat: "A single integer N.",
    outputFormat: "Print Prime if N is prime. Otherwise, print Not Prime.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      if (n <= 1) return "Not Prime";
      for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return "Not Prime";
      }
      return "Prime";
    },
    testInputs: ["17", "21", "2", "3", "4", "29", "97", "100", "49", "31"]
  },
  {
    order: 20,
    title: "Count Factors",
    difficulty: "Medium",
    description: "Given a positive integer N, count the number of positive factors of N.",
    inputFormat: "A single integer N.",
    outputFormat: "Print the number of positive factors of N.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      let count = 0;
      for (let i = 1; i <= n; i++) {
        if (n % i === 0) count++;
      }
      return String(count);
    },
    testInputs: ["12", "16", "1", "2", "7", "24", "36", "100", "15", "50"]
  },
  {
    order: 21,
    title: "Find GCD of Two Numbers",
    difficulty: "Medium",
    description: "Given two positive integers, find their greatest common divisor (GCD).",
    inputFormat: "A single line containing two positive integers A and B.",
    outputFormat: "Print the GCD of A and B.",
    solve: (input) => {
      let [a, b] = input.trim().split(/\s+/).map(Number);
      while (b) {
        const t = b;
        b = a % b;
        a = t;
      }
      return String(a);
    },
    testInputs: ["24 36", "18 30", "12 15", "7 13", "100 50", "45 60", "8 32", "14 28", "21 35", "9 27"]
  },
  {
    order: 22,
    title: "Find LCM of Two Numbers",
    difficulty: "Medium",
    description: "Given two positive integers, find their least common multiple (LCM).",
    inputFormat: "A single line containing two positive integers A and B.",
    outputFormat: "Print the LCM of A and B.",
    solve: (input) => {
      const [a, b] = input.trim().split(/\s+/).map(Number);
      let x = a, y = b;
      while (y) {
        const t = y;
        y = x % y;
        x = t;
      }
      const gcd = x;
      return String((a * b) / gcd);
    },
    testInputs: ["4 6", "5 8", "12 18", "7 9", "10 15", "3 5", "6 8", "14 21", "20 30", "25 15"]
  },
  {
    order: 23,
    title: "Print Fibonacci Sequence",
    difficulty: "Medium",
    description: "Given an integer N, print the first N terms of the Fibonacci sequence starting with 0 and 1.",
    inputFormat: "A single positive integer N.",
    outputFormat: "Print the first N Fibonacci terms separated by spaces.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      if (n === 1) return "0";
      const fib = [0, 1];
      for (let i = 2; i < n; i++) fib.push(fib[i - 1] + fib[i - 2]);
      return fib.slice(0, n).join(" ");
    },
    testInputs: ["6", "8", "1", "2", "3", "5", "10", "12", "4", "7"]
  },
  {
    order: 24,
    title: "Sum of Fibonacci Terms",
    difficulty: "Medium",
    description: "Given an integer N, calculate the sum of the first N Fibonacci terms starting with 0 and 1.",
    inputFormat: "A single positive integer N.",
    outputFormat: "Print the sum of the first N Fibonacci terms.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      if (n === 1) return "0";
      const fib = [0, 1];
      for (let i = 2; i < n; i++) fib.push(fib[i - 1] + fib[i - 2]);
      const sum = fib.slice(0, n).reduce((a, b) => a + b, 0);
      return String(sum);
    },
    testInputs: ["6", "8", "1", "2", "3", "5", "10", "4", "7", "9"]
  },
  {
    order: 25,
    title: "Count Occurrences of a Digit",
    difficulty: "Medium",
    description: "Given a positive integer and a digit, count how many times that digit appears in the number.",
    inputFormat: "A single line containing a positive integer N and a digit D.",
    outputFormat: "Print the number of times D occurs in N.",
    solve: (input) => {
      const [nStr, dStr] = input.trim().split(/\s+/);
      const count = nStr.split("").filter(ch => ch === dStr).length;
      return String(count);
    },
    testInputs: ["1223342 2", "505050 5", "11111 1", "98765 0", "40404 4", "12345 9", "777 7", "2020 0", "85858 8", "100 1"]
  },
  {
    order: 26,
    title: "Sum Digits at Even Positions",
    difficulty: "Medium",
    description: "Given a positive integer, number its digits from left to right starting at position 1. Calculate the sum of the digits at even positions.",
    inputFormat: "A single positive integer N.",
    outputFormat: "Print the sum of the digits located at positions 2, 4, 6, ...",
    solve: (input) => {
      const s = input.trim();
      let sum = 0;
      for (let i = 1; i < s.length; i += 2) {
        sum += parseInt(s[i], 10);
      }
      return String(sum);
    },
    testInputs: ["123456", "98765", "10", "2468", "13579", "5", "482731", "9090", "111111", "54321"]
  },
  {
    order: 27,
    title: "Number Pattern",
    difficulty: "Medium",
    description: "Given a positive integer N, print a pattern where the number i is printed i times on the i-th line.",
    inputFormat: "A single integer N.",
    outputFormat: "Print the required pattern for N lines.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      const lines = [];
      for (let i = 1; i <= n; i++) {
        lines.push(Array(i).fill(i).join(" "));
      }
      return lines.join("\n");
    },
    testInputs: ["4", "3", "1", "2", "5", "6", "7", "8", "9", "10"]
  },
  {
    order: 28,
    title: "Increasing Star Pattern",
    difficulty: "Medium",
    description: "Given a positive integer N, print N lines of stars, where each line contains one more star than the previous line.",
    inputFormat: "A single integer N.",
    outputFormat: "Print the star pattern with N lines.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      const lines = [];
      for (let i = 1; i <= n; i++) {
        lines.push("*".repeat(i));
      }
      return lines.join("\n");
    },
    testInputs: ["4", "5", "1", "2", "3", "6", "7", "8", "9", "10"]
  },
  {
    order: 29,
    title: "Decreasing Star Pattern",
    difficulty: "Medium",
    description: "Given a positive integer N, print N lines of stars, where each line contains one fewer star than the previous line.",
    inputFormat: "A single integer N.",
    outputFormat: "Print the star pattern with N lines.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      const lines = [];
      for (let i = n; i >= 1; i--) {
        lines.push("*".repeat(i));
      }
      return lines.join("\n");
    },
    testInputs: ["4", "5", "1", "2", "3", "6", "7", "8", "9", "10"]
  },
  {
    order: 30,
    title: "First Number Divisible by Both",
    difficulty: "Medium",
    description: "Given three positive integers N, A, and B, find the smallest integer greater than or equal to N that is divisible by both A and B.",
    inputFormat: "A single line containing three positive integers N, A, and B.",
    outputFormat: "Print the smallest number greater than or equal to N that is divisible by both A and B.",
    solve: (input) => {
      const [n, a, b] = input.trim().split(/\s+/).map(Number);
      let x = a, y = b;
      while (y) {
        const t = y;
        y = x % y;
        x = t;
      }
      const lcm = (a * b) / x;
      const rem = n % lcm;
      return String(rem === 0 ? n : n + (lcm - rem));
    },
    testInputs: ["20 4 6", "25 5 8", "10 2 3", "30 3 5", "50 7 2", "15 4 5", "1 3 4", "100 10 15", "45 6 9", "12 4 6"]
  }
];
