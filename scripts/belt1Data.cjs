// Belt 1: 20 Problems (Basics, Conditionals, Operators)
module.exports = [
  {
    order: 1,
    title: "Sum of Two Numbers",
    difficulty: "Easy",
    description: "Given two integers, calculate and print their sum.",
    inputFormat: "A single line containing two integers A and B.",
    outputFormat: "Print the sum of A and B.",
    explanation: "Read the two integers and compute A + B.",
    solve: (input) => {
      const [a, b] = input.trim().split(/\s+/).map(Number);
      return String(a + b);
    },
    testInputs: [
      "15 27", "100 250", "8 12", "0 0", "-5 10",
      "-20 -30", "999 1", "450 550", "-100 100", "12345 67890"
    ]
  },
  {
    order: 2,
    title: "Difference of Two Numbers",
    difficulty: "Easy",
    description: "Given two integers, calculate and print the difference between the first number and the second number.",
    inputFormat: "A single line containing two integers A and B.",
    outputFormat: "Print the result of A - B.",
    explanation: "Read the two integers and compute A - B.",
    solve: (input) => {
      const [a, b] = input.trim().split(/\s+/).map(Number);
      return String(a - b);
    },
    testInputs: [
      "50 20", "25 40", "100 100", "0 15", "15 0",
      "-10 -20", "-30 15", "500 250", "1234 234", "99 -99"
    ]
  },
  {
    order: 3,
    title: "Product of Two Numbers",
    difficulty: "Easy",
    description: "Given two integers, calculate and print their product.",
    inputFormat: "A single line containing two integers A and B.",
    outputFormat: "Print the product of A and B.",
    explanation: "Read the two integers and compute A * B.",
    solve: (input) => {
      const [a, b] = input.trim().split(/\s+/).map(Number);
      return String(a * b);
    },
    testInputs: [
      "8 7", "12 5", "0 100", "9 9", "-4 5",
      "-6 -7", "25 4", "100 50", "15 15", "1 9999"
    ]
  },
  {
    order: 4,
    title: "Calculate Rectangle Area",
    difficulty: "Easy",
    description: "Given the length and width of a rectangle, calculate and print its area.",
    inputFormat: "A single line containing two integers L and W, representing the length and width of the rectangle.",
    outputFormat: "Print the area of the rectangle.",
    explanation: "Area of rectangle = length * width.",
    solve: (input) => {
      const [l, w] = input.trim().split(/\s+/).map(Number);
      return String(l * w);
    },
    testInputs: [
      "10 5", "12 8", "1 1", "20 15", "100 200",
      "50 50", "7 23", "99 10", "35 12", "40 25"
    ]
  },
  {
    order: 5,
    title: "Calculate Total Marks",
    difficulty: "Easy",
    description: "Given the marks obtained by a student in three subjects, calculate and print the total marks.",
    inputFormat: "A single line containing three integers representing the marks obtained in three subjects.",
    outputFormat: "Print the total marks.",
    explanation: "Sum of three subject marks.",
    solve: (input) => {
      const [a, b, c] = input.trim().split(/\s+/).map(Number);
      return String(a + b + c);
    },
    testInputs: [
      "78 85 92", "65 70 80", "100 100 100", "0 0 0", "50 60 70",
      "90 80 85", "40 45 50", "95 98 92", "33 35 40", "88 77 66"
    ]
  },
  {
    order: 6,
    title: "Calculate Average",
    difficulty: "Easy",
    description: "Given the marks obtained in three subjects, calculate and print their average.",
    inputFormat: "A single line containing three integers representing the marks in three subjects.",
    outputFormat: "Print the average of the three marks.",
    explanation: "Average = (mark1 + mark2 + mark3) / 3.",
    solve: (input) => {
      const [a, b, c] = input.trim().split(/\s+/).map(Number);
      const avg = (a + b + c) / 3;
      return Number.isInteger(avg) ? String(avg) : String(Math.floor(avg));
    },
    testInputs: [
      "80 90 70", "75 85 95", "60 60 60", "90 90 90", "100 100 100",
      "50 60 70", "70 80 90", "30 40 50", "85 85 85", "45 55 65"
    ]
  },
  {
    order: 7,
    title: "Convert Minutes to Hours and Minutes",
    difficulty: "Easy",
    description: "Given a total number of minutes, convert it into complete hours and remaining minutes.",
    inputFormat: "A single integer M representing the total number of minutes.",
    outputFormat: "Print the number of complete hours followed by the remaining minutes in the format hours minutes.",
    explanation: "Hours = M / 60, Minutes = M % 60.",
    solve: (input) => {
      const m = parseInt(input.trim(), 10);
      const hours = Math.floor(m / 60);
      const mins = m % 60;
      return `${hours} ${mins}`;
    },
    testInputs: [
      "135", "200", "60", "59", "120",
      "350", "0", "720", "1445", "45"
    ]
  },
  {
    order: 8,
    title: "Check Even or Odd",
    difficulty: "Easy",
    description: "Given an integer, determine whether the number is even or odd.",
    inputFormat: "A single integer N.",
    outputFormat: "Print Even if the number is even; otherwise, print Odd.",
    explanation: "A number divisible by 2 is Even, otherwise Odd.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      return n % 2 === 0 ? "Even" : "Odd";
    },
    testInputs: [
      "24", "37", "0", "1", "100",
      "999", "2", "-4", "-7", "42"
    ]
  },
  {
    order: 9,
    title: "Check Positive, Negative, or Zero",
    difficulty: "Easy",
    description: "Given an integer, determine whether it is positive, negative, or zero.",
    inputFormat: "A single integer N.",
    outputFormat: "Print Positive, Negative, or Zero.",
    explanation: "Check whether N > 0, N < 0, or N === 0.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      if (n > 0) return "Positive";
      if (n < 0) return "Negative";
      return "Zero";
    },
    testInputs: [
      "25", "-14", "0", "1", "-1",
      "1000", "-500", "99", "-88", "42"
    ]
  },
  {
    order: 10,
    title: "Compare Two Numbers",
    difficulty: "Easy",
    description: "Given two integers, determine whether the first number is greater than, less than, or equal to the second number.",
    inputFormat: "A single line containing two integers A and B.",
    outputFormat: "Print Greater, Less, or Equal.",
    explanation: "Compare A and B.",
    solve: (input) => {
      const [a, b] = input.trim().split(/\s+/).map(Number);
      if (a > b) return "Greater";
      if (a < b) return "Less";
      return "Equal";
    },
    testInputs: [
      "45 30", "25 25", "10 50", "0 0", "-5 5",
      "100 -100", "-20 -10", "-15 -30", "999 999", "12 13"
    ]
  },
  {
    order: 11,
    title: "Check Voting Eligibility",
    difficulty: "Easy",
    description: "Given a person's age, determine whether the person is eligible to vote. A person is eligible if their age is at least 18.",
    inputFormat: "A single integer Age.",
    outputFormat: "Print Eligible if the age is 18 or above. Otherwise, print Not Eligible.",
    explanation: "Eligible if Age >= 18.",
    solve: (input) => {
      const age = parseInt(input.trim(), 10);
      return age >= 18 ? "Eligible" : "Not Eligible";
    },
    testInputs: [
      "21", "16", "18", "17", "65",
      "5", "100", "19", "12", "40"
    ]
  },
  {
    order: 12,
    title: "Find the Larger Number",
    difficulty: "Easy",
    description: "Given two integers, find and print the larger number.",
    inputFormat: "A single line containing two integers A and B.",
    outputFormat: "Print the larger number.",
    explanation: "Return max(A, B).",
    solve: (input) => {
      const [a, b] = input.trim().split(/\s+/).map(Number);
      return String(Math.max(a, b));
    },
    testInputs: [
      "35 72", "90 45", "50 50", "-10 -5", "-20 10",
      "0 15", "999 1000", "7 2", "-50 -100", "123 321"
    ]
  },
  {
    order: 13,
    title: "Check Divisibility",
    difficulty: "Easy",
    description: "Given two integers A and B, determine whether A is completely divisible by B.",
    inputFormat: "A single line containing two integers A and B.",
    outputFormat: "Print Divisible if A is completely divisible by B; otherwise, print Not Divisible.",
    explanation: "Check if A % B === 0.",
    solve: (input) => {
      const [a, b] = input.trim().split(/\s+/).map(Number);
      return a % b === 0 ? "Divisible" : "Not Divisible";
    },
    testInputs: [
      "40 8", "35 6", "100 10", "25 5", "49 7",
      "15 4", "50 25", "13 3", "81 9", "100 3"
    ]
  },
  {
    order: 14,
    title: "Check Number Range",
    difficulty: "Easy",
    description: "Given an integer, determine whether it lies between 10 and 50, including both limits.",
    inputFormat: "A single integer N.",
    outputFormat: "Print In Range if the number is between 10 and 50, inclusive. Otherwise, print Out of Range.",
    explanation: "In Range if 10 <= N <= 50.",
    solve: (input) => {
      const n = parseInt(input.trim(), 10);
      return (n >= 10 && n <= 50) ? "In Range" : "Out of Range";
    },
    testInputs: [
      "35", "65", "10", "50", "9",
      "51", "25", "0", "-15", "42"
    ]
  },
  {
    order: 15,
    title: "Pass or Fail",
    difficulty: "Easy",
    description: "Given a student's marks, determine whether the student passes or fails. A student passes if their marks are at least 40.",
    inputFormat: "A single integer representing the student's marks.",
    outputFormat: "Print Pass if the marks are 40 or above. Otherwise, print Fail.",
    explanation: "Pass if marks >= 40.",
    solve: (input) => {
      const marks = parseInt(input.trim(), 10);
      return marks >= 40 ? "Pass" : "Fail";
    },
    testInputs: [
      "68", "35", "40", "39", "100",
      "0", "41", "85", "25", "50"
    ]
  },
  {
    order: 16,
    title: "Largest of Three Numbers",
    difficulty: "Easy",
    description: "Given three integers, find and print the largest number.",
    inputFormat: "A single line containing three integers A, B, and C.",
    outputFormat: "Print the largest of the three numbers.",
    explanation: "Return max(A, B, C).",
    solve: (input) => {
      const [a, b, c] = input.trim().split(/\s+/).map(Number);
      return String(Math.max(a, b, c));
    },
    testInputs: [
      "15 42 28", "90 75 88", "10 20 30", "30 20 10", "5 5 5",
      "-10 -5 -2", "100 50 200", "0 0 1", "45 85 65", "-20 0 20"
    ]
  },
  {
    order: 17,
    title: "Grade Calculator",
    difficulty: "Easy",
    description: "Given a student's marks, assign a grade using the rules: 90-100: A, 75-89: B, 60-74: C, 40-59: D, Below 40: F.",
    inputFormat: "A single integer representing the student's marks.",
    outputFormat: "Print the corresponding grade.",
    explanation: "Range checks for A, B, C, D, F.",
    solve: (input) => {
      const m = parseInt(input.trim(), 10);
      if (m >= 90) return "A";
      if (m >= 75) return "B";
      if (m >= 60) return "C";
      if (m >= 40) return "D";
      return "F";
    },
    testInputs: [
      "92", "68", "100", "90", "89",
      "75", "74", "60", "59", "35"
    ]
  },
  {
    order: 18,
    title: "Simple Calculator",
    difficulty: "Easy",
    description: "Given two numbers and an arithmetic operator (+, -, *, /), perform the calculation.",
    inputFormat: "A single line containing two numbers A and B, followed by an arithmetic operator.",
    outputFormat: "Print the result of applying the given operator to A and B.",
    explanation: "Perform A op B.",
    solve: (input) => {
      const parts = input.trim().split(/\s+/);
      const a = parseInt(parts[0], 10);
      const b = parseInt(parts[1], 10);
      const op = parts[2].replace('\\', '');
      if (op === '+') return String(a + b);
      if (op === '-') return String(a - b);
      if (op === '*') return String(a * b);
      if (op === '/') return String(Math.floor(a / b));
      return "0";
    },
    testInputs: [
      "20 5 *", "50 10 /", "15 30 +", "80 25 -", "12 4 *",
      "100 4 /", "7 8 +", "45 15 /", "10 10 -", "6 7 *"
    ]
  },
  {
    order: 19,
    title: "Determine Triangle Type",
    difficulty: "Easy",
    description: "Given three sides of a valid triangle, determine whether it is Equilateral, Isosceles, or Scalene.",
    inputFormat: "A single line containing three integers representing the three sides of the triangle.",
    outputFormat: "Print Equilateral, Isosceles, or Scalene.",
    explanation: "Equilateral: all equal. Isosceles: two equal. Scalene: all different.",
    solve: (input) => {
      const [a, b, c] = input.trim().split(/\s+/).map(Number);
      if (a === b && b === c) return "Equilateral";
      if (a === b || b === c || a === c) return "Isosceles";
      return "Scalene";
    },
    testInputs: [
      "6 6 6", "5 5 8", "3 4 5", "10 10 10", "7 9 7",
      "8 12 12", "6 8 10", "15 15 20", "5 6 7", "9 9 9"
    ]
  },
  {
    order: 20,
    title: "Electricity Bill",
    difficulty: "Easy",
    description: "Calculate bill: First 100 units at 2/unit, Next 100 units at 3/unit, Above 200 units at 5/unit.",
    inputFormat: "A single integer representing the number of electricity units consumed.",
    outputFormat: "Print the total electricity bill.",
    explanation: "Compute slab-based tariff.",
    solve: (input) => {
      const units = parseInt(input.trim(), 10);
      let bill = 0;
      if (units <= 100) {
        bill = units * 2;
      } else if (units <= 200) {
        bill = 100 * 2 + (units - 100) * 3;
      } else {
        bill = 100 * 2 + 100 * 3 + (units - 200) * 5;
      }
      return String(bill);
    },
    testInputs: [
      "150", "250", "50", "100", "200",
      "300", "0", "120", "180", "500"
    ]
  }
];
