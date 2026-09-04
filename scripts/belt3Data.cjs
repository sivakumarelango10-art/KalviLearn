// Belt 3: 35 Problems (Arrays, Matrices, Strings, Transformations)
module.exports = [
  {
    order: 1,
    title: "Print Array Elements",
    difficulty: "Hard",
    description: "Given an array of N integers, print all the elements in the same order in which they are given.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print all the array elements separated by spaces.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      return lines[1].trim().split(/\s+/).join(" ");
    },
    testInputs: [
      "5\n10 20 30 40 50", "4\n7 3 9 2", "1\n99", "3\n-5 0 5", "6\n1 2 3 4 5 6",
      "2\n100 200", "5\n42 42 42 42 42", "4\n-1 -2 -3 -4", "7\n9 8 7 6 5 4 3", "3\n15 25 35"
    ]
  },
  {
    order: 2,
    title: "Sum of Array Elements",
    difficulty: "Hard",
    description: "Given an array of N integers, calculate and print the sum of all its elements.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print the sum of all array elements.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/).map(Number);
      return String(arr.reduce((a, b) => a + b, 0));
    },
    testInputs: [
      "5\n10 20 30 40 50", "4\n7 3 9 2", "1\n50", "3\n-10 20 -30", "5\n0 0 0 0 0",
      "6\n1 2 3 4 5 6", "4\n100 200 300 400", "2\n-50 50", "5\n15 25 35 45 55", "3\n9 9 9"
    ]
  },
  {
    order: 3,
    title: "Find the Largest Array Element",
    difficulty: "Hard",
    description: "Given an array of N integers, find and print the largest element.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print the largest element in the array.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/).map(Number);
      return String(Math.max(...arr));
    },
    testInputs: [
      "6\n12 45 7 89 34 67", "5\n23 18 42 31 9", "1\n100", "4\n-10 -5 -20 -1", "5\n5 5 5 5 5",
      "3\n0 0 1", "7\n1 9 2 8 3 7 4", "4\n999 50 100 200", "6\n-50 -10 -20 -80 -5 -99", "2\n12 21"
    ]
  },
  {
    order: 4,
    title: "Find the Smallest Array Element",
    difficulty: "Hard",
    description: "Given an array of N integers, find and print the smallest element.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print the smallest element in the array.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/).map(Number);
      return String(Math.min(...arr));
    },
    testInputs: [
      "6\n12 45 7 89 34 67", "5\n23 18 42 31 9", "1\n42", "4\n-10 -5 -20 -1", "5\n8 8 8 8 8",
      "3\n100 50 200", "7\n15 4 8 2 9 1 6", "4\n0 10 20 30", "6\n-1 -2 -3 -4 -5 -6", "2\n5 3"
    ]
  },
  {
    order: 5,
    title: "Count Even Elements",
    difficulty: "Hard",
    description: "Given an array of N integers, count how many elements are even.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print the number of even elements.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/).map(Number);
      return String(arr.filter(x => x % 2 === 0).length);
    },
    testInputs: [
      "6\n12 7 8 15 20 9", "5\n3 5 7 9 11", "5\n2 4 6 8 10", "1\n4", "1\n5",
      "4\n0 1 2 3", "7\n14 21 28 35 42 49 56", "3\n10 11 12", "6\n-2 -4 -6 1 3 5", "4\n8 16 32 64"
    ]
  },
  {
    order: 6,
    title: "Count Odd Elements",
    difficulty: "Hard",
    description: "Given an array of N integers, count how many elements are odd.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print the number of odd elements.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/).map(Number);
      return String(arr.filter(x => Math.abs(x) % 2 === 1).length);
    },
    testInputs: [
      "6\n12 7 8 15 20 9", "5\n2 4 6 8 10", "5\n1 3 5 7 9", "1\n7", "1\n8",
      "4\n0 2 4 6", "6\n11 13 15 17 19 21", "3\n2 3 4", "5\n-1 -3 2 4 6", "4\n7 9 11 13"
    ]
  },
  {
    order: 7,
    title: "Calculate Array Average",
    difficulty: "Hard",
    description: "Given an array of N integers, calculate and print the average of all elements.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print the average of the array elements.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/).map(Number);
      const sum = arr.reduce((a, b) => a + b, 0);
      const avg = sum / arr.length;
      return Number.isInteger(avg) ? String(avg) : String(avg);
    },
    testInputs: [
      "5\n10 20 30 40 50", "4\n5 10 15 20", "1\n25", "3\n6 6 6", "2\n10 20",
      "4\n1 2 3 4", "5\n0 0 0 0 0", "6\n10 20 30 40 50 60", "2\n7 8", "4\n2 4 6 8"
    ]
  },
  {
    order: 8,
    title: "Reverse an Array",
    difficulty: "Hard",
    description: "Given an array of N integers, print its elements in reverse order.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print the array elements in reverse order.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/);
      return arr.reverse().join(" ");
    },
    testInputs: [
      "5\n10 20 30 40 50", "4\n7 3 9 2", "1\n42", "3\n1 2 3", "6\n6 5 4 3 2 1",
      "2\n99 100", "5\n1 1 2 2 3", "4\n-1 -2 -3 -4", "7\n10 20 10 20 10 20 10", "3\n8 0 8"
    ]
  },
  {
    order: 9,
    title: "Search for an Element",
    difficulty: "Hard",
    description: "Given an array and a target value, determine whether the target exists in the array.",
    inputFormat: "The first line contains an integer N. The second line contains N integers. The third line contains the target integer X.",
    outputFormat: "Print Found if X exists in the array. Otherwise, print Not Found.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/).map(Number);
      const target = Number(lines[2].trim());
      return arr.includes(target) ? "Found" : "Not Found";
    },
    testInputs: [
      "5\n10 25 30 45 50\n30", "5\n10 25 30 45 50\n35", "1\n5\n5", "1\n5\n6", "4\n1 2 3 4\n4",
      "4\n1 2 3 4\n1", "6\n-5 0 5 10 15 20\n0", "3\n8 8 8\n8", "5\n100 200 300 400 500\n250", "4\n7 14 21 28\n21"
    ]
  },
  {
    order: 10,
    title: "Find Position of an Element",
    difficulty: "Hard",
    description: "Given an array and a target value, find the position of the first occurrence of the target (1-indexed).",
    inputFormat: "The first line contains an integer N. The second line contains N integers. The third line contains the target integer X.",
    outputFormat: "Print the position of the first occurrence of X. If it does not exist, print -1.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/).map(Number);
      const target = Number(lines[2].trim());
      const idx = arr.indexOf(target);
      return String(idx !== -1 ? idx + 1 : -1);
    },
    testInputs: [
      "6\n12 8 25 8 40 50\n8", "5\n10 20 30 40 50\n35", "1\n99\n99", "1\n99\n50", "4\n5 10 15 20\n5",
      "4\n5 10 15 20\n20", "5\n2 4 6 8 10\n6", "3\n7 7 7\n7", "6\n1 3 5 7 9 11\n4", "5\n30 20 10 20 30\n20"
    ]
  },
  {
    order: 11,
    title: "Count Occurrences of an Element",
    difficulty: "Hard",
    description: "Given an array and a target value, count how many times the target appears in the array.",
    inputFormat: "The first line contains an integer N. The second line contains N integers. The third line contains the target integer X.",
    outputFormat: "Print the number of times X occurs in the array.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/).map(Number);
      const target = Number(lines[2].trim());
      return String(arr.filter(v => v === target).length);
    },
    testInputs: [
      "7\n4 2 4 7 4 9 4\n4", "6\n5 8 2 9 3 7\n5", "5\n1 1 1 1 1\n1", "4\n1 2 3 4\n5", "6\n2 4 2 4 2 4\n2",
      "3\n10 20 30\n20", "1\n8\n8", "1\n8\n9", "5\n0 0 1 0 0\n0", "6\n7 8 9 7 8 9\n9"
    ]
  },
  {
    order: 12,
    title: "Replace an Element",
    difficulty: "Hard",
    description: "Given an array, a target value, and a replacement value, replace every occurrence of the target with the replacement value.",
    inputFormat: "The first line contains an integer N. The second line contains N integers. The third line contains two integers X and Y.",
    outputFormat: "Print the modified array.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/).map(Number);
      const [target, rep] = lines[2].trim().split(/\s+/).map(Number);
      return arr.map(v => (v === target ? rep : v)).join(" ");
    },
    testInputs: [
      "6\n2 5 3 5 7 5\n5 9", "5\n4 8 2 6 10\n8 3", "3\n1 1 1\n1 0", "4\n1 2 3 4\n5 9", "5\n10 20 30 20 10\n20 25",
      "2\n7 8\n7 9", "1\n42\n42 100", "6\n0 1 0 1 0 1\n0 2", "4\n5 6 7 8\n8 88", "5\n3 3 5 3 3\n3 4"
    ]
  },
  {
    order: 13,
    title: "Copy an Array",
    difficulty: "Hard",
    description: "Given an array of N integers, create a copy of the array and print the copied elements.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print the elements of the copied array in the same order.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      return lines[1].trim().split(/\s+/).join(" ");
    },
    testInputs: [
      "5\n4 8 15 16 23", "4\n11 22 33 44", "1\n100", "3\n1 2 3", "6\n9 8 7 6 5 4",
      "2\n5 10", "4\n0 0 0 0", "5\n-1 -2 -3 -4 -5", "7\n2 4 6 8 10 12 14", "3\n42 43 44"
    ]
  },
  {
    order: 14,
    title: "Find the Second Largest Element",
    difficulty: "Hard",
    description: "Given an array, find the second largest distinct element.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print the second largest distinct element.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = Array.from(new Set(lines[1].trim().split(/\s+/).map(Number)));
      arr.sort((a, b) => b - a);
      return String(arr[1] !== undefined ? arr[1] : arr[0]);
    },
    testInputs: [
      "6\n12 45 7 89 34 67", "6\n90 25 90 18 60 75", "4\n10 20 30 40", "3\n5 1 9", "5\n100 50 100 80 20",
      "4\n-10 -5 -20 -1", "5\n7 8 9 10 11", "3\n15 30 25", "6\n4 2 7 9 5 8", "4\n100 200 300 400"
    ]
  },
  {
    order: 15,
    title: "Find the Second Smallest Element",
    difficulty: "Hard",
    description: "Given an array, find the second smallest distinct element.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print the second smallest distinct element.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = Array.from(new Set(lines[1].trim().split(/\s+/).map(Number)));
      arr.sort((a, b) => a - b);
      return String(arr[1] !== undefined ? arr[1] : arr[0]);
    },
    testInputs: [
      "6\n12 45 7 89 34 67", "6\n5 12 5 20 8 15", "4\n10 20 30 40", "3\n9 1 5", "5\n100 20 100 40 80",
      "4\n-20 -5 -10 -1", "5\n7 8 9 10 11", "3\n30 15 25", "6\n9 4 7 2 5 8", "4\n400 300 200 100"
    ]
  },
  {
    order: 16,
    title: "Count Positive and Negative Elements",
    difficulty: "Hard",
    description: "Given an array of integers, count how many elements are positive and how many are negative. Zero is not included in either count.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print the positive count followed by the negative count.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/).map(Number);
      const pos = arr.filter(x => x > 0).length;
      const neg = arr.filter(x => x < 0).length;
      return `${pos} ${neg}`;
    },
    testInputs: [
      "6\n-4 8 0 -2 7 5", "5\n-8 -3 0 4 9", "4\n1 2 3 4", "4\n-1 -2 -3 -4", "5\n0 0 0 0 0",
      "6\n-1 1 -2 2 -3 3", "3\n-5 0 5", "7\n10 -20 30 -40 50 -60 0", "2\n1 -1", "5\n-10 -20 -30 10 20"
    ]
  },
  {
    order: 17,
    title: "Move Zeros to the End",
    difficulty: "Hard",
    description: "Given an array, move all zero elements to the end while keeping the relative order of non-zero elements unchanged.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print the modified array.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/).map(Number);
      const nonZeros = arr.filter(x => x !== 0);
      const zeros = arr.filter(x => x === 0);
      return [...nonZeros, ...zeros].join(" ");
    },
    testInputs: [
      "7\n0 1 0 3 12 0 5", "6\n4 0 2 0 7 0", "5\n1 2 3 4 5", "4\n0 0 0 0", "5\n0 0 1 2 3",
      "6\n1 0 2 0 3 0", "3\n0 5 0", "4\n10 20 0 30", "5\n0 7 0 9 0", "7\n0 0 0 1 0 0 2"
    ]
  },
  {
    order: 18,
    title: "Remove Duplicate Elements",
    difficulty: "Hard",
    description: "Given an array, remove duplicate values and print each distinct element only once, keeping the order of its first occurrence.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print the distinct elements in their first-occurrence order.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/).map(Number);
      const seen = new Set();
      const res = [];
      for (const x of arr) {
        if (!seen.has(x)) {
          seen.add(x);
          res.push(x);
        }
      }
      return res.join(" ");
    },
    testInputs: [
      "8\n4 2 4 7 2 9 7 5", "6\n3 3 5 5 8 8", "4\n1 2 3 4", "5\n1 1 1 1 1", "6\n10 20 10 20 30 40",
      "7\n7 6 5 7 6 5 4", "3\n5 5 5", "5\n9 8 9 8 7", "6\n1 2 3 1 2 3", "4\n0 1 0 1"
    ]
  },
  {
    order: 19,
    title: "Check Array Palindrome",
    difficulty: "Hard",
    description: "Given an array, determine whether it reads the same from left to right and right to left.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print Palindrome if the array reads the same in both directions. Otherwise, print Not Palindrome.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/);
      const rev = [...arr].reverse();
      return arr.join(" ") === rev.join(" ") ? "Palindrome" : "Not Palindrome";
    },
    testInputs: [
      "5\n1 2 3 2 1", "5\n1 2 3 4 5", "1\n42", "4\n1 2 2 1", "4\n1 2 3 1",
      "6\n1 2 3 3 2 1", "3\n5 10 5", "3\n5 10 15", "5\n7 7 7 7 7", "6\n1 2 3 4 2 1"
    ]
  },
  {
    order: 20,
    title: "Find Common Elements",
    difficulty: "Hard",
    description: "Given two arrays, print the distinct elements that appear in both arrays.",
    inputFormat: "The first line contains integer N followed by N integers. The next line contains integer M followed by M integers.",
    outputFormat: "Print the common distinct elements.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr1 = lines[0].trim().split(/\s+/).slice(1).map(Number);
      const arr2 = lines[1].trim().split(/\s+/).slice(1).map(Number);
      const set2 = new Set(arr2);
      const common = [];
      const seen = new Set();
      for (const x of arr1) {
        if (set2.has(x) && !seen.has(x)) {
          seen.add(x);
          common.push(x);
        }
      }
      return common.join(" ");
    },
    testInputs: [
      "5 1 2 3 4 5\n4 3 4 5 6", "4 10 20 30 40\n3 5 20 40", "3 1 2 3\n3 4 5 6", "4 5 5 5 5\n2 5 6", "3 8 9 10\n3 10 9 8",
      "2 1 2\n2 1 2", "5 10 20 30 40 50\n3 20 40 60", "3 7 8 9\n2 7 9", "4 1 3 5 7\n4 2 4 6 8", "3 100 200 300\n2 200 300"
    ]
  },
  {
    order: 21,
    title: "Add Two Matrices",
    difficulty: "Hard",
    description: "Given two matrices of the same size, calculate their sum by adding corresponding elements.",
    inputFormat: "The first line contains two integers R and C. The next R lines contain the first matrix. The following R lines contain the second matrix.",
    outputFormat: "Print the resulting matrix.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const [r, c] = lines[0].trim().split(/\s+/).map(Number);
      const m1 = lines.slice(1, 1 + r).map(l => l.trim().split(/\s+/).map(Number));
      const m2 = lines.slice(1 + r, 1 + 2 * r).map(l => l.trim().split(/\s+/).map(Number));
      const res = [];
      for (let i = 0; i < r; i++) {
        const row = [];
        for (let j = 0; j < c; j++) row.push(m1[i][j] + m2[i][j]);
        res.push(row.join(" "));
      }
      return res.join("\n");
    },
    testInputs: [
      "2 2\n1 2\n3 4\n5 6\n7 8", "2 3\n1 2 3\n4 5 6\n6 5 4\n3 2 1", "1 1\n5\n10", "1 3\n1 2 3\n4 5 6", "3 1\n1\n2\n3\n4\n5\n6",
      "2 2\n0 0\n0 0\n1 1\n1 1", "2 2\n10 20\n30 40\n5 5\n5 5", "3 3\n1 1 1\n2 2 2\n3 3 3\n1 1 1\n1 1 1\n1 1 1", "2 2\n-1 -2\n-3 -4\n1 2\n3 4", "2 2\n5 10\n15 20\n10 5\n20 15"
    ]
  },
  {
    order: 22,
    title: "Sum of Each Matrix Row",
    difficulty: "Hard",
    description: "Given a matrix, calculate and print the sum of each row.",
    inputFormat: "The first line contains two integers R and C. The next R lines contain the matrix elements.",
    outputFormat: "Print the sum of each row on a separate line.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const [r, c] = lines[0].trim().split(/\s+/).map(Number);
      const res = [];
      for (let i = 1; i <= r; i++) {
        const row = lines[i].trim().split(/\s+/).map(Number);
        res.push(row.reduce((a, b) => a + b, 0));
      }
      return res.join("\n");
    },
    testInputs: [
      "2 3\n1 2 3\n4 5 6", "3 2\n5 10\n3 7\n8 2", "1 4\n10 20 30 40", "3 1\n5\n10\n15", "2 2\n0 0\n0 0",
      "3 3\n1 1 1\n2 2 2\n3 3 3", "2 2\n100 200\n300 400", "2 3\n-1 -2 -3\n1 2 3", "3 2\n1 2\n3 4\n5 6", "2 2\n25 25\n50 50"
    ]
  },
  {
    order: 23,
    title: "Sum of Each Matrix Column",
    difficulty: "Hard",
    description: "Given a matrix, calculate and print the sum of each column.",
    inputFormat: "The first line contains two integers R and C. The next R lines contain the matrix elements.",
    outputFormat: "Print the sum of each column separated by spaces.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const [r, c] = lines[0].trim().split(/\s+/).map(Number);
      const sums = Array(c).fill(0);
      for (let i = 1; i <= r; i++) {
        const row = lines[i].trim().split(/\s+/).map(Number);
        for (let j = 0; j < c; j++) sums[j] += row[j];
      }
      return sums.join(" ");
    },
    testInputs: [
      "2 3\n1 2 3\n4 5 6", "3 2\n5 10\n3 7\n8 2", "1 3\n5 10 15", "3 1\n4\n5\n6", "2 2\n1 1\n2 2",
      "3 3\n1 2 3\n4 5 6\n7 8 9", "2 2\n10 20\n30 40", "2 3\n-1 0 1\n1 0 -1", "2 2\n50 50\n50 50", "3 2\n1 2\n3 4\n5 6"
    ]
  },
  {
    order: 24,
    title: "Main Diagonal Sum",
    difficulty: "Hard",
    description: "Given a square matrix, calculate the sum of the elements on its main diagonal.",
    inputFormat: "The first line contains an integer N. The next N lines contain the square matrix.",
    outputFormat: "Print the sum of the main diagonal elements.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const n = parseInt(lines[0].trim(), 10);
      let sum = 0;
      for (let i = 1; i <= n; i++) {
        const row = lines[i].trim().split(/\s+/).map(Number);
        sum += row[i - 1];
      }
      return String(sum);
    },
    testInputs: [
      "3\n1 2 3\n4 5 6\n7 8 9", "4\n2 1 3 4\n5 6 7 8\n9 1 10 2\n3 4 5 11", "1\n42", "2\n1 2\n3 4", "3\n5 0 0\n0 5 0\n0 0 5",
      "2\n10 20\n30 40", "3\n-1 2 3\n4 -2 5\n6 7 -3", "2\n0 1\n1 0", "3\n2 0 0\n0 3 0\n0 0 4", "4\n1 0 0 0\n0 1 0 0\n0 0 1 0\n0 0 0 1"
    ]
  },
  {
    order: 25,
    title: "Transpose a Matrix",
    difficulty: "Hard",
    description: "Given a matrix with R rows and C columns, print its transpose.",
    inputFormat: "The first line contains two integers R and C. The next R lines contain the matrix elements.",
    outputFormat: "Print the transposed matrix.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const [r, c] = lines[0].trim().split(/\s+/).map(Number);
      const matrix = lines.slice(1, 1 + r).map(l => l.trim().split(/\s+/));
      const res = [];
      for (let j = 0; j < c; j++) {
        const col = [];
        for (let i = 0; i < r; i++) col.push(matrix[i][j]);
        res.push(col.join(" "));
      }
      return res.join("\n");
    },
    testInputs: [
      "2 3\n1 2 3\n4 5 6", "3 2\n7 8\n9 10\n11 12", "1 3\n10 20 30", "3 1\n1\n2\n3", "2 2\n1 2\n3 4",
      "3 3\n1 2 3\n4 5 6\n7 8 9", "2 2\n5 5\n6 6", "1 1\n42", "2 3\n9 8 7\n6 5 4", "2 2\n10 20\n30 40"
    ]
  },
  {
    order: 26,
    title: "Find String Length",
    difficulty: "Hard",
    description: "Given a string, count the number of characters in it.",
    inputFormat: "A single line containing a string.",
    outputFormat: "Print the number of characters in the string.",
    solve: (input) => {
      return String(input.trim().length);
    },
    testInputs: ["hello", "coding", "a", "algorithm", "javascript", "python", "fullstack", "kalvilearn", "developer", "practice"]
  },
  {
    order: 27,
    title: "Count Vowels in a String",
    difficulty: "Hard",
    description: "Given a string containing English letters, count the number of vowels (a, e, i, o, u, case-insensitive).",
    inputFormat: "A single line containing a string.",
    outputFormat: "Print the number of vowels in the string.",
    solve: (input) => {
      const s = input.trim().toLowerCase();
      const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
      let count = 0;
      for (const ch of s) if (vowels.has(ch)) count++;
      return String(count);
    },
    testInputs: ["education", "programming", "rhythm", "aeiou", "HELLO", "kalvi", "quick", "developer", "xyz", "opportunity"]
  },
  {
    order: 28,
    title: "Reverse a String",
    difficulty: "Hard",
    description: "Given a string, print its characters in reverse order.",
    inputFormat: "A single line containing a string.",
    outputFormat: "Print the reversed string.",
    solve: (input) => {
      return input.trim().split("").reverse().join("");
    },
    testInputs: ["hello", "coding", "world", "racecar", "kalvi", "a", "12345", "developer", "algorithm", "learn"]
  },
  {
    order: 29,
    title: "Check String Palindrome",
    difficulty: "Hard",
    description: "Given a string, determine whether it reads the same forward and backward.",
    inputFormat: "A single line containing a string.",
    outputFormat: "Print Palindrome if the string reads the same in both directions. Otherwise, print Not Palindrome.",
    solve: (input) => {
      const s = input.trim();
      const rev = s.split("").reverse().join("");
      return s === rev ? "Palindrome" : "Not Palindrome";
    },
    testInputs: ["level", "hello", "racecar", "madam", "coding", "noon", "radar", "world", "a", "abba"]
  },
  {
    order: 30,
    title: "Count Character Occurrences",
    difficulty: "Hard",
    description: "Given a string and a character, count how many times the character appears in the string.",
    inputFormat: "The first line contains a string. The second line contains a single character C.",
    outputFormat: "Print the number of times C appears in the string.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const s = lines[0].trim();
      const c = lines[1].trim();
      let count = 0;
      for (const ch of s) if (ch === c) count++;
      return String(count);
    },
    testInputs: [
      "banana\na", "programming\ng", "mississippi\ns", "hello\nl", "apple\np",
      "coding\nz", "kalvilearn\na", "javascript\nt", "developer\ne", "test\nt"
    ]
  },
  {
    order: 31,
    title: "Remove Spaces from a String",
    difficulty: "Hard",
    description: "Given a string, remove all spaces from it and print the resulting string.",
    inputFormat: "A single line containing a string that may contain spaces.",
    outputFormat: "Print the string after removing all spaces.",
    solve: (input) => {
      return input.replace(/ /g, "").trim();
    },
    testInputs: [
      "hello world", "coding is fun", "a b c d", "  kalvi learn  ", "no_spaces",
      "java script", "learn practice code grow", " 1 2 3 ", "hello", "   "
    ]
  },
  {
    order: 32,
    title: "Compare Two Strings",
    difficulty: "Hard",
    description: "Given two strings, determine whether they are exactly equal.",
    inputFormat: "The first line contains the first string. The second line contains the second string.",
    outputFormat: "Print Equal if the two strings are identical. Otherwise, print Not Equal.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      return lines[0].trim() === lines[1].trim() ? "Equal" : "Not Equal";
    },
    testInputs: [
      "hello\nhello", "hello\nHello", "coding\ncoding", "kalvi\nkalvium", "abc\nabc",
      "test\ntest ", "123\n123", "same\nsame", "different\ndiffer", "case\nCASE"
    ]
  },
  {
    order: 33,
    title: "Most Frequent Element",
    difficulty: "Hard",
    description: "Given an array, find the element that appears the most times. If multiple have the highest frequency, print the one that appears first.",
    inputFormat: "The first line contains an integer N. The second line contains N integers.",
    outputFormat: "Print the most frequently occurring element.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const arr = lines[1].trim().split(/\s+/).map(Number);
      const freq = new Map();
      let maxCount = 0;
      let ans = arr[0];
      for (const x of arr) {
        const count = (freq.get(x) || 0) + 1;
        freq.set(x, count);
        if (count > maxCount) {
          maxCount = count;
          ans = x;
        }
      }
      return String(ans);
    },
    testInputs: [
      "7\n2 4 2 7 4 2 9", "6\n5 3 5 3 8 8", "5\n1 2 3 4 5", "4\n9 9 9 9", "6\n1 2 2 3 3 4",
      "3\n10 20 20", "5\n7 7 8 8 9", "4\n-1 -1 0 1", "7\n4 5 6 4 5 4 6", "5\n100 200 100 200 100"
    ]
  },
  {
    order: 34,
    title: "Left Rotate an Array",
    difficulty: "Hard",
    description: "Given an array and an integer K, rotate the array to the left by K positions.",
    inputFormat: "The first line contains two integers N and K. The second line contains N integers.",
    outputFormat: "Print the array after left rotation by K positions.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const [n, k] = lines[0].trim().split(/\s+/).map(Number);
      const arr = lines[1].trim().split(/\s+/);
      const rot = k % n;
      const res = [...arr.slice(rot), ...arr.slice(0, rot)];
      return res.join(" ");
    },
    testInputs: [
      "5 2\n1 2 3 4 5", "6 3\n10 20 30 40 50 60", "4 1\n1 2 3 4", "5 5\n10 20 30 40 50", "3 0\n7 8 9",
      "5 7\n1 2 3 4 5", "2 1\n50 100", "4 2\n9 8 7 6", "6 2\n1 1 2 2 3 3", "5 3\n10 20 30 40 50"
    ]
  },
  {
    order: 35,
    title: "Right Rotate an Array",
    difficulty: "Hard",
    description: "Given an array and an integer K, rotate the array to the right by K positions.",
    inputFormat: "The first line contains two integers N and K. The second line contains N integers.",
    outputFormat: "Print the array after right rotation by K positions.",
    solve: (input) => {
      const lines = input.trim().split("\n");
      const [n, k] = lines[0].trim().split(/\s+/).map(Number);
      const arr = lines[1].trim().split(/\s+/);
      const rot = k % n;
      const res = [...arr.slice(n - rot), ...arr.slice(0, n - rot)];
      return res.join(" ");
    },
    testInputs: [
      "5 2\n1 2 3 4 5", "6 3\n10 20 30 40 50 60", "4 1\n1 2 3 4", "5 5\n10 20 30 40 50", "3 0\n7 8 9",
      "5 7\n1 2 3 4 5", "2 1\n50 100", "4 2\n9 8 7 6", "6 2\n1 1 2 2 3 3", "5 3\n10 20 30 40 50"
    ]
  }
];
