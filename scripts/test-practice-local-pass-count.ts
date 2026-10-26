/**
 * Permanent regression suite for Practice Java and C++ execution on the LOCAL engine.
 *
 * Verifies that the in-repo regex transpiler / sandbox worker maintains 100% pass rate
 * on standard competitive-programming solutions across Belt 1 (10/10 for Java, 10/10 for C++).
 * Fails if the pass count drops.
 */
import assert from 'node:assert'
import { localEngine } from '../src/server/judge/engines'
import { resolveQuestion } from '../src/server/judge/testRepository'
import { outputsMatch } from '../src/lib/judge/compare'

interface PracticeReference {
  slug: string
  title: string
  java: string
  cpp: string
}

export const BELT_1_PRACTICE_REFERENCES: PracticeReference[] = [
  // Q1: Arithmetic Check (Variant 1) -> (a + b) * c - b
  {
    slug: 'belt-1-q1-arithmetic-check-v1',
    title: 'Arithmetic Check (Variant 1)',
    java: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    if (sc.hasNextLong()) {
      long a = sc.nextLong();
      long b = sc.nextLong();
      long c = sc.nextLong();
      System.out.println((a + b) * c - b);
    }
  }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
  long long a, b, c;
  if (cin >> a >> b >> c) {
    cout << (a + b) * c - b << endl;
  }
  return 0;
}`,
  },
  // Q2: Absolute Difference (Variant 1) -> |a - b|
  {
    slug: 'belt-1-q2-absolute-difference-v1',
    title: 'Absolute Difference (Variant 1)',
    java: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    if (sc.hasNextLong()) {
      long a = sc.nextLong();
      long b = sc.nextLong();
      System.out.println(Math.abs(a - b));
    }
  }
}`,
    cpp: `#include <iostream>
#include <cmath>
using namespace std;
int main() {
  long long a, b;
  if (cin >> a >> b) {
    cout << abs(a - b) << endl;
  }
  return 0;
}`,
  },
  // Q3: Largest of Three (Variant 1) -> max(a, b, c)
  {
    slug: 'belt-1-q3-largest-of-three-v1',
    title: 'Largest of Three (Variant 1)',
    java: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    if (sc.hasNextLong()) {
      long a = sc.nextLong();
      long b = sc.nextLong();
      long c = sc.nextLong();
      System.out.println(Math.max(a, Math.max(b, c)));
    }
  }
}`,
    cpp: `#include <iostream>
#include <algorithm>
using namespace std;
int main() {
  long long a, b, c;
  if (cin >> a >> b >> c) {
    cout << max(a, max(b, c)) << endl;
  }
  return 0;
}`,
  },
  // Q4: Middle Value (Variant 1) -> middle of 3 values
  {
    slug: 'belt-1-q4-middle-value-v1',
    title: 'Middle Value (Variant 1)',
    java: `import java.util.Scanner;
import java.util.Arrays;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    if (sc.hasNextLong()) {
      long[] arr = {sc.nextLong(), sc.nextLong(), sc.nextLong()};
      Arrays.sort(arr);
      System.out.println(arr[1]);
    }
  }
}`,
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
  long long a, b, c;
  if (cin >> a >> b >> c) {
    vector<long long> v = {a, b, c};
    sort(v.begin(), v.end());
    cout << v[1] << endl;
  }
  return 0;
}`,
  },
  // Q5: Divisibility Report (Variant 1) -> YES if n % a == 0 && n % b == 0 else NO
  {
    slug: 'belt-1-q5-divisibility-report-v1',
    title: 'Divisibility Report (Variant 1)',
    java: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    if (sc.hasNextLong()) {
      long n = sc.nextLong();
      long a = sc.nextLong();
      long b = sc.nextLong();
      if (a != 0 && b != 0 && n % a == 0 && n % b == 0) {
        System.out.println("YES");
      } else {
        System.out.println("NO");
      }
    }
  }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
  long long n, a, b;
  if (cin >> n >> a >> b) {
    if (a != 0 && b != 0 && n % a == 0 && n % b == 0) {
      cout << "YES" << endl;
    } else {
      cout << "NO" << endl;
    }
  }
  return 0;
}`,
  },
  // Q6: Sign Product (Variant 1) -> POSITIVE, NEGATIVE, or ZERO
  {
    slug: 'belt-1-q6-sign-product-v1',
    title: 'Sign Product (Variant 1)',
    java: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    if (sc.hasNextLong()) {
      long a = sc.nextLong();
      long b = sc.nextLong();
      if (a == 0 || b == 0) {
        System.out.println("ZERO");
      } else if ((a > 0 && b > 0) || (a < 0 && b < 0)) {
        System.out.println("POSITIVE");
      } else {
        System.out.println("NEGATIVE");
      }
    }
  }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
  long long a, b;
  if (cin >> a >> b) {
    if (a == 0 || b == 0) {
      cout << "ZERO" << endl;
    } else if ((a > 0 && b > 0) || (a < 0 && b < 0)) {
      cout << "POSITIVE" << endl;
    } else {
      cout << "NEGATIVE" << endl;
    }
  }
  return 0;
}`,
  },
  // Q7: Range Membership (Variant 1) -> YES if x in [l, r] else NO
  {
    slug: 'belt-1-q7-range-membership-v1',
    title: 'Range Membership (Variant 1)',
    java: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    if (sc.hasNextLong()) {
      long x = sc.nextLong();
      long l = sc.nextLong();
      long r = sc.nextLong();
      if (x >= l && x <= r) {
        System.out.println("YES");
      } else {
        System.out.println("NO");
      }
    }
  }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
  long long x, l, r;
  if (cin >> x >> l >> r) {
    if (x >= l && x <= r) {
      cout << "YES" << endl;
    } else {
      cout << "NO" << endl;
    }
  }
  return 0;
}`,
  },
  // Q8: Piecewise Fare (Variant 1) -> 50 if d <= 5 else 50 + (d - 5) * 12
  {
    slug: 'belt-1-q8-piecewise-fare-v1',
    title: 'Piecewise Fare (Variant 1)',
    java: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    if (sc.hasNextLong()) {
      long d = sc.nextLong();
      if (d <= 5) {
        System.out.println(50);
      } else {
        System.out.println(50 + (d - 5) * 12);
      }
    }
  }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
  long long d;
  if (cin >> d) {
    if (d <= 5) {
      cout << 50 << endl;
    } else {
      cout << 50 + (d - 5) * 12 << endl;
    }
  }
  return 0;
}`,
  },
  // Q9: Operator Precedence (Variant 1) -> (a + b) * (c - d) + e
  {
    slug: 'belt-1-q9-operator-precedence-v1',
    title: 'Operator Precedence (Variant 1)',
    java: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    if (sc.hasNextLong()) {
      long a = sc.nextLong();
      long b = sc.nextLong();
      long c = sc.nextLong();
      long d = sc.nextLong();
      long e = sc.nextLong();
      System.out.println((a + b) * (c - d) + e);
    }
  }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
  long long a, b, c, d, e;
  if (cin >> a >> b >> c >> d >> e) {
    cout << (a + b) * (c - d) + e << endl;
  }
  return 0;
}`,
  },
  // Q10: Three-Way Comparison (Variant 1) -> LESS, EQUAL, or GREATER
  {
    slug: 'belt-1-q10-three-way-comparison-v1',
    title: 'Three-Way Comparison (Variant 1)',
    java: `import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    if (sc.hasNextLong()) {
      long a = sc.nextLong();
      long b = sc.nextLong();
      if (a < b) {
        System.out.println("LESS");
      } else if (a == b) {
        System.out.println("EQUAL");
      } else {
        System.out.println("GREATER");
      }
    }
  }
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
  long long a, b;
  if (cin >> a >> b) {
    if (a < b) {
      cout << "LESS" << endl;
    } else if (a == b) {
      cout << "EQUAL" << endl;
    } else {
      cout << "GREATER" << endl;
    }
  }
  return 0;
}`,
  },
]

async function run() {
  console.log('========================================================================')
  console.log('🧪 PRACTICE JAVA & C++ LOCAL ENGINE PERMANENT REGRESSION SUITE')
  console.log('========================================================================\n')

  let javaPassed = 0
  let cppPassed = 0
  const expectedTotal = BELT_1_PRACTICE_REFERENCES.length

  for (const ref of BELT_1_PRACTICE_REFERENCES) {
    const res = resolveQuestion(ref.slug)
    assert('suite' in res, `Problem ${ref.slug} must exist in question registry`)
    const suite = res.suite
    const inputs = suite.testCases.map((tc) => tc.input)

    // Java Evaluation on Local Engine
    const jOutcome = await localEngine.run({ code: ref.java, language: 'java', inputs })
    let jCasesOk = 0
    if (jOutcome.kind === 'ran') {
      for (let i = 0; i < suite.testCases.length; i++) {
        if (outputsMatch(jOutcome.cases[i]?.output || '', suite.testCases[i].expectedOutput)) {
          jCasesOk++
        }
      }
    }
    const jSuccess = jCasesOk === suite.testCases.length
    if (jSuccess) javaPassed++
    console.log(
      `  ${jSuccess ? '✅ [PASS]' : '❌ [FAIL]'} Java: ${ref.slug} -> ${jCasesOk}/${suite.testCases.length}` +
        (jSuccess ? '' : ` (${jOutcome.kind === 'ran' ? jOutcome.cases[0]?.error : jOutcome.kind})`)
    )

    // C++ Evaluation on Local Engine
    const cOutcome = await localEngine.run({ code: ref.cpp, language: 'cpp', inputs })
    let cCasesOk = 0
    if (cOutcome.kind === 'ran') {
      for (let i = 0; i < suite.testCases.length; i++) {
        if (outputsMatch(cOutcome.cases[i]?.output || '', suite.testCases[i].expectedOutput)) {
          cCasesOk++
        }
      }
    }
    const cSuccess = cCasesOk === suite.testCases.length
    if (cSuccess) cppPassed++
    console.log(
      `  ${cSuccess ? '✅ [PASS]' : '❌ [FAIL]'} C++ : ${ref.slug} -> ${cCasesOk}/${suite.testCases.length}` +
        (cSuccess ? '' : ` (${cOutcome.kind === 'ran' ? cOutcome.cases[0]?.error : cOutcome.kind})`)
    )
  }

  console.log('\n------------------------------------------------------------------------')
  console.log(`Summary: Java Passed: ${javaPassed}/${expectedTotal}, C++ Passed: ${cppPassed}/${expectedTotal}`)
  console.log('------------------------------------------------------------------------')

  // Permanent threshold assertions: pass counts MUST NOT drop below 10/10
  assert.strictEqual(
    javaPassed,
    expectedTotal,
    `Java pass count on local engine must remain at least ${expectedTotal}/${expectedTotal} (got ${javaPassed})`
  )
  assert.strictEqual(
    cppPassed,
    expectedTotal,
    `C++ pass count on local engine must remain at least ${expectedTotal}/${expectedTotal} (got ${cppPassed})`
  )

  console.log('✅ All Practice Java and C++ reference solutions passed on the LOCAL engine with 100% accuracy!\n')
}

run().catch((err) => {
  console.error('Fatal error in practice local regression suite:', err)
  process.exit(1)
})
