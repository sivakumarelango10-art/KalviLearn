"""
Independent judge-data oracle for the coding bank (740 questions x 10 cases).

For every question whose statement belongs to a recognised template family, the expected output of EVERY test case
(visible and hidden) is recomputed from the statement with real Python semantics and compared with the stored
expected output (same normalisation as the server judge). Families are recognised by statement text only; nothing
here reads the stored expected output to decide what to compute (hypothesis families are reported as such).

Usage:  python scripts/judge_oracle.py            (exit 1 on any confirmed mismatch)
Prints metadata only (question ids, case numbers) - never hidden inputs or outputs.
"""
import json
import math
from decimal import Decimal, ROUND_HALF_UP, ROUND_FLOOR
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BANK = json.loads((ROOT / "src/server/data/codingTestCases.json").read_text(encoding="utf8"))
QUESTIONS = json.loads((ROOT / "src/data/coding/questions.json").read_text(encoding="utf8"))
if isinstance(QUESTIONS, dict):
    QUESTIONS = list(QUESTIONS.values())


def norm(s: str) -> str:
    lines = s.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    return "\n".join(l.rstrip(" \t") for l in lines).strip()


def ints(text):
    return [int(t) for t in text.split()]


def bold(stmt):
    return re.findall(r"\*\*([^*]+)\*\*", stmt)


def ticks(stmt):
    return re.findall(r"`([^`]+)`", stmt)


def num_after(pattern, stmt):
    m = re.search(pattern, stmt)
    return int(m.group(1)) if m else None


# ------------------------------------------------------------------------------------------------ array family
ARRAY_SELECT = {
    "even indices": lambda i, v, a: i % 2 == 0,
    "odd indices": lambda i, v, a: i % 2 == 1,
    "positive values": lambda i, v, a: v > 0,
    "negative values": lambda i, v, a: v < 0,
    "even values": lambda i, v, a: v % 2 == 0,
    "odd values": lambda i, v, a: v % 2 != 0,
    "values greater than first": lambda i, v, a: v > a[0],
    "values less than last": lambda i, v, a: v < a[-1],
    "indices divisible by 3": lambda i, v, a: i % 3 == 0,
}
ARRAY_TRANSFORM = {
    "raw": lambda i, v: v,
    "absolute": lambda i, v: abs(v),
    "square": lambda i, v: v * v,
    "value plus index": lambda i, v: v + i,
    "value minus index": lambda i, v: v - i,
}


def xor_all(xs):
    r = 0
    for x in xs:
        r ^= x
    return r


ARRAY_AGG = {
    "sum": sum,
    "count": len,
    "maximum": lambda xs: max(xs) if xs else 0,
    "minimum": lambda xs: min(xs) if xs else 0,
    "xor": xor_all,
}


def solve_array(stmt, inp):
    p, t, g = bold(stmt)[:3]
    tok = ints(inp)
    n, a = tok[0], tok[1 : 1 + tok[0]]
    picked = [ARRAY_TRANSFORM[t](i, v) for i, v in enumerate(a) if ARRAY_SELECT[p](i, v, a)]
    return str(ARRAY_AGG[g](picked))


# ------------------------------------------------------------------------------------------------ graph family
GRAPH_SELECT = {
    "degree zero": lambda v, d: d == 0,
    "degree one": lambda v, d: d == 1,
    "degree two": lambda v, d: d == 2,
    "degree at least two": lambda v, d: d >= 2,
    "even degree": lambda v, d: d % 2 == 0,
    "odd degree": lambda v, d: d % 2 == 1,
    "degree at most two": lambda v, d: d <= 2,
    "degree divisible by three": lambda v, d: d % 3 == 0,
    "non-zero degree": lambda v, d: d != 0,
    "degree not one": lambda v, d: d != 1,
    "label even": lambda v, d: v % 2 == 0,
    "label odd": lambda v, d: v % 2 == 1,
    "label divisible by three": lambda v, d: v % 3 == 0,
}
GRAPH_AGG = {
    "count": lambda S, deg: len(S),
    "label sum": lambda S, deg: sum(S),
    "degree sum": lambda S, deg: sum(deg[v] for v in S),
    # Empty selection -> -1 (stated only in the worked-example explanations, not in the statement).
    "max label": lambda S, deg: max(S) if S else -1,
    "min label": lambda S, deg: min(S) if S else -1,
    "square label sum": lambda S, deg: sum(v * v for v in S),
    "degree square sum": lambda S, deg: sum(deg[v] ** 2 for v in S),
    "label-degree product sum": lambda S, deg: sum(v * deg[v] for v in S),
    # Defined in the statements since 2026-10-07 (previously undefined; data matched exactly these definitions).
    "parity score": lambda S, deg: sum(1 if v % 2 == 0 else -1 for v in S),
    "weighted count": lambda S, deg: sum(deg[v] + 1 for v in S),
}
# Aggregates the statements never define: candidate interpretations, reported per hypothesis.
GRAPH_HYPOTHESES = {
    "parity score": {
        "sum(label % 2)": lambda S, deg: sum(v % 2 for v in S),
        "sum(degree % 2)": lambda S, deg: sum(deg[v] % 2 for v in S),
        "#even-label - #odd-label": lambda S, deg: sum(1 if v % 2 == 0 else -1 for v in S),
        "#even-degree - #odd-degree": lambda S, deg: sum(1 if deg[v] % 2 == 0 else -1 for v in S),
        "sum((label + degree) % 2)": lambda S, deg: sum((v + deg[v]) % 2 for v in S),
    },
    "weighted count": {
        "sum(degree + 1)": lambda S, deg: sum(deg[v] + 1 for v in S),
        "sum(label + 1)": lambda S, deg: sum(v + 1 for v in S),
        "count * 2": lambda S, deg: 2 * len(S),
        "sum(label * degree + 1)": lambda S, deg: sum(v * deg[v] + 1 for v in S),
        "count + degree sum": lambda S, deg: len(S) + sum(deg[v] for v in S),
    },
}


def graph_parse(inp):
    tok = ints(inp)
    n, m = tok[0], tok[1]
    deg = [0] * n
    for i in range(m):
        u, v = tok[2 + 2 * i], tok[3 + 2 * i]
        deg[u] += 1
        deg[v] += 1
    return n, deg


def solve_graph(stmt, inp, agg_fn=None):
    p, g = bold(stmt)[:2]
    n, deg = graph_parse(inp)
    S = [v for v in range(n) if GRAPH_SELECT[p](v, deg[v])]
    return str((agg_fn or GRAPH_AGG[g])(S, deg))


# ------------------------------------------------------------------------------------------------ tree family
def tree_nodes(inp):
    tok = ints(inp)
    n = tok[0]
    vals = tok[1 : 1 + n]
    exists = [False] * n
    for i, v in enumerate(vals):
        exists[i] = v != -1 and (i == 0 or exists[(i - 1) // 2])
    nodes = []
    for i in range(n):
        if not exists[i]:
            continue
        kids = [c for c in (2 * i + 1, 2 * i + 2) if c < n and exists[c]]
        nodes.append({"v": vals[i], "depth": int(math.log2(i + 1)), "kids": len(kids)})
    root = vals[0] if n and exists[0] else None
    return nodes, root


TREE_SELECT = {
    "all nodes": lambda x, r: True,
    "leaf nodes": lambda x, r: x["kids"] == 0,
    "internal nodes": lambda x, r: x["kids"] > 0,
    "even depth nodes": lambda x, r: x["depth"] % 2 == 0,
    "odd depth nodes": lambda x, r: x["depth"] % 2 == 1,
    "even valued nodes": lambda x, r: x["v"] % 2 == 0,
    "odd valued nodes": lambda x, r: x["v"] % 2 != 0,
    "positive nodes": lambda x, r: x["v"] > 0,
    "nodes with two children": lambda x, r: x["kids"] == 2,
    "nodes with one child": lambda x, r: x["kids"] == 1,
    "nodes whose depth is at most two": lambda x, r: x["depth"] <= 2,
    "nodes whose depth is at least two": lambda x, r: x["depth"] >= 2,
    "nodes whose value is greater than or equal to the root value": lambda x, r: x["v"] >= r,
    "nodes whose value is strictly less than the root value": lambda x, r: x["v"] < r,
    "non-leaf even depth": lambda x, r: x["kids"] > 0 and x["depth"] % 2 == 0,
}
TREE_AGG = {
    "count": lambda xs: len(xs),
    "sum": lambda xs: sum(x["v"] for x in xs),
    "max": lambda xs: max((x["v"] for x in xs), default=0),
    "min": lambda xs: min((x["v"] for x in xs), default=0),
    "depth sum": lambda xs: sum(x["depth"] for x in xs),
}


def solve_tree(stmt, inp):
    m = re.search(r"Select (.+?) and print their (count|sum|max|min|depth sum)\.", stmt)
    sel, agg = m.group(1), m.group(2)
    nodes, root = tree_nodes(inp)
    picked = [x for x in nodes if TREE_SELECT[sel](x, root)]
    return str(TREE_AGG[agg](picked))


# ------------------------------------------------------------------------------------------------ DP families
def solve_dp(stmt, inp):
    m = re.search(r"dp\[0\]=(-?\d+)`.*`dp\[n\]=(-?\d+)\*dp\[n-(\d+)\]\+(-?\d+)\*dp\[n-(\d+)\]`", stmt)
    base, x, p, y, q = map(int, m.groups())
    n = ints(inp)[0]
    dp = [0] * (n + 1)
    dp[0] = base
    for i in range(1, n + 1):
        dp[i] = (x * dp[i - p] if i - p >= 0 else 0) + (y * dp[i - q] if i - q >= 0 else 0)
    return str(dp[n])


def solve_jump(stmt, inp):
    m = re.search(r"x\+(\d+) or x\+(\d+)\. Landing on even index costs an extra (\d+)", stmt)
    s1, s2, extra = map(int, m.groups())
    fee = num_after(r"setup fee of (\d+)", stmt) or 0
    tok = ints(inp)
    n, c = tok[0], tok[1 : 1 + tok[0]]
    INF = float("inf")
    dp = [INF] * n
    dp[0] = c[0] + (extra if 0 % 2 == 0 else 0)
    for x in range(1, n):
        best = min(dp[x - s] for s in (s1, s2) if x - s >= 0) if x - min(s1, s2) >= 0 else INF
        if best < INF:
            dp[x] = best + c[x] + (extra if x % 2 == 0 else 0)
    return str(dp[n - 1] + fee) if dp[n - 1] < INF else "-1"


def solve_grid(stmt, inp):
    extra = num_after(r"plus (\d+) when row\+column is even", stmt)
    fee = num_after(r"setup fee of (\d+)", stmt) or 0
    tok = ints(inp)
    r, c = tok[0], tok[1]
    g = [tok[2 + i * c : 2 + (i + 1) * c] for i in range(r)]
    cost = lambda i, j: g[i][j] + (extra if (i + j) % 2 == 0 else 0)
    dp = [[0] * c for _ in range(r)]
    for i in range(r):
        for j in range(c):
            if i == 0 and j == 0:
                dp[i][j] = cost(0, 0)
            else:
                best = min(dp[i - 1][j] if i else float("inf"), dp[i][j - 1] if j else float("inf"))
                dp[i][j] = best + cost(i, j)
    return str(dp[r - 1][c - 1] + fee)


# ------------------------------------------------------------------------------------------------ 10-question families
def k_of(expr, pattern):
    return int(re.search(pattern, expr).group(1))


def solve_ab_expr(stmt, inp):
    expr = re.search(r"compute `([^`]+)`", stmt).group(1)
    a, b = ints(inp)[:2]
    return str(eval(expr, {"__builtins__": {}}, {"a": a, "b": b}))


def solve_nested(stmt, inp):
    k = k_of(stmt, r"\(r\+c\+(\d+)\) mod 5")
    n, m = ints(inp)[:2]
    return str(sum((r + c + k) % 5 for r in range(1, n + 1) for c in range(1, m + 1)))


def solve_function(stmt, inp):
    k = k_of(stmt, r"\(a\*(\d+)\+b\)//")
    a, b = ints(inp)[:2]
    return str((a * k + b) // k)


def solve_scope(stmt, inp):
    k = k_of(stmt, r"`x\+(\d+)`")
    g, x = ints(inp)[:2]
    return f"{x + k} {g}"


def solve_string(stmt, inp):
    k = k_of(stmt, r"ASCII\(ch\)\+(\d+)\) mod 7")
    s = inp.strip()
    return str(sum((ord(ch) + k) % 7 for ch in s))


def solve_matrix(stmt, inp):
    k = k_of(stmt, r"\+ (\d+)\*\(r\+c\)")
    tok = ints(inp)
    r, c = tok[0], tok[1]
    vals = tok[2 : 2 + r * c]
    return str(sum(vals[i * c + j] + k * (i + j) for i in range(r) for j in range(c)))


def solve_linear(stmt, inp):
    k, rem = map(int, re.search(r"\(value\+(\d+)\) mod 5 = (\d+)", stmt).groups())
    tok = ints(inp)
    a = tok[1 : 1 + tok[0]]
    return str(next((i for i, v in enumerate(a) if (v + k) % 5 == rem), -1))


def solve_binary(stmt, inp):
    k = k_of(stmt, r"x\*x >= n\+(\d+)")
    n = ints(inp)[0]
    lo, hi = 0, n + k + 1
    while lo < hi:
        mid = (lo + hi) // 2
        if mid * mid >= n + k:
            hi = mid
        else:
            lo = mid + 1
    return str(lo)


def solve_sort(stmt, inp):
    k = k_of(stmt, r"\(abs\(value\)\+(\d+)\) mod 7")
    tok = ints(inp)
    a = tok[1 : 1 + tok[0]]
    return " ".join(map(str, sorted(a, key=lambda v: ((abs(v) + k) % 7, v))))


def solve_union(stmt, inp):
    k = k_of(stmt, r"\(value\+(\d+)\) mod 11")
    lines = inp.strip().split("\n")
    n, m = ints(lines[0])
    a = set(ints(lines[1])[:n]) if n else set()
    b = set(ints(lines[2])[:m]) if m and len(lines) > 2 else set()
    return str(sum((v + k) % 11 for v in a | b))


def solve_two_pointer(stmt, inp):
    k = k_of(stmt, r"abs\(right-left\)\+(\d+)")
    tok = ints(inp)
    a = tok[1 : 1 + tok[0]]
    l, r, s = 0, len(a) - 1, 0
    while l < r:
        s += abs(a[r] - a[l]) + k
        l, r = l + 1, r - 1
    return str(s)


def solve_freq(stmt, inp):
    k = k_of(stmt, r"v\*\(c\+(\d+)\)")
    tok = ints(inp)
    f = {}
    for v in tok[1 : 1 + tok[0]]:
        f[v] = f.get(v, 0) + 1
    return str(sum(v * (c + k) for v, c in f.items()))


def solve_recursion(stmt, inp):
    k = k_of(stmt, r"\(n\*(\d+)\) mod 13")
    n = ints(inp)[0]
    return str(sum((i * k) % 13 for i in range(1, n + 1)))


# ------------------------------------------------------------------------------------------------ one-off questions
def abc(inp):
    return ints(inp)[:3]


def yn(b):
    return "YES" if b else "NO"


ONE_OFF = {
    # arithmetic
    "arithmetic-check": lambda i: (lambda a, b, c: (a + b) * c - b)(*abc(i)),
    "weighted-triple": lambda i: (lambda a, b, c: 2 * a + 3 * b + 5 * c)(*abc(i)),
    "square-expansion": lambda i: (lambda a, b, c: a * a + 2 * a * b + b * b + c)(*abc(i)),
    "rectangle-measure-sum": lambda i: (lambda a, b, c: a * b + 2 * (a + b) + c)(*abc(i)),
    "linear-combination": lambda i: (lambda a, b, c: a * b + c)(*abc(i)),
    "difference-product": lambda i: (lambda a, b, c: (a - b) * (b - c))(*abc(i)),
    "triple-sum-square": lambda i: (lambda a, b, c: (a + b + c) ** 2)(*abc(i)),
    "pair-product-sum": lambda i: (lambda a, b, c: a * b + b * c + c * a)(*abc(i)),
    "remainder-expression": lambda i: (lambda a, b, c: a % b + c)(*abc(i)),
    "scaled-difference": lambda i: (lambda a, b, c: (a - b) * c)(*abc(i)),
    "cubic-mix": lambda i: (lambda a, b, c: a ** 3 + b ** 2 + c)(*abc(i)),
    "absolute-triple-difference": lambda i: (lambda a, b, c: abs(a - b) + abs(b - c))(*abc(i)),
    "average-numerator": lambda i: (lambda a, b, c: a + b + c)(*abc(i)),
    "progression-term": lambda i: (lambda a, b, c: a + (c - 1) * b)(*abc(i)),
    "product-minus-sum": lambda i: (lambda a, b, c: a * b * c - (a + b + c))(*abc(i)),
    "nested-multiply-add": lambda i: (lambda a, b, c: (a * b + c) * b)(*abc(i)),
    "difference-of-squares": lambda i: (lambda a, b, c: a * a - b * b + c)(*abc(i)),
    "modulo-product": lambda i: (lambda a, b, c: (a * b) % c)(*abc(i)),
    "double-then-add": lambda i: (lambda a, b, c: 2 * a + 2 * b + c)(*abc(i)),
    "three-stage-arithmetic": lambda i: (lambda a, b, c: (a + c) * (b + 1) - c)(*abc(i)),
    # conditionals with fully specified output words
    "largest-of-three": lambda i: max(abc(i)),
    "middle-of-three": lambda i: sorted(abc(i))[1],
    "divisible-by-both": lambda i: (lambda a, b, c: yn(a % b == 0 and a % c == 0))(*abc(i)),
    "threshold-band": lambda i: (lambda a, b, c: "LOW" if a < b else "MID" if a < c else "HIGH")(*abc(i)),
    "equal-count": lambda i: max(abc(i).count(x) for x in abc(i)),
    "maximum-absolute": lambda i: max(abc(i), key=lambda v: (abs(v), v)),
    "all-positive": lambda i: yn(all(v > 0 for v in abc(i))),
    "exactly-one-negative": lambda i: yn(sum(v < 0 for v in abc(i)) == 1),
    "majority-even": lambda i: yn(sum(v % 2 == 0 for v in abc(i)) >= 2),
    "ordered-strictly-increasing": lambda i: (lambda a, b, c: yn(a < b < c))(*abc(i)),
    "ordered-nondecreasing": lambda i: (lambda a, b, c: yn(a <= b <= c))(*abc(i)),
    "closest-to-zero": lambda i: min(abc(i), key=lambda v: (abs(v), v)),
    "maximum-frequency-class": lambda i: (lambda s: "ALL" if len(s) == 1 else "PAIR" if len(s) == 2 else "DISTINCT")(set(abc(i))),
    # variables / data types with fully specified formats
    "profile-echo": lambda i: " ".join(i.split()),
    "swap-stored-integers": lambda i: (lambda a, b: f"{b} {a}")(*ints(i)[:2]),
    "character-code": lambda i: ord(i.strip()[0]),
    "digit-character": lambda i: str(ints(i)[0]),
    "boolean-conversion": lambda i: "FALSE" if ints(i)[0] == 0 else "TRUE",
    "high-low-byte": lambda i: (lambda n: f"{n // 256} {n % 256}")(ints(i)[0]),
    "two-digit-split": lambda i: (lambda n: f"{n // 10} {n % 10}")(ints(i)[0]),
    "coordinate-formatting": lambda i: (lambda x, y: f"({x},{y})")(*ints(i)[:2]),
    "scientific-pair-value": lambda i: (lambda a, b: a * 10 ** b)(*ints(i)[:2]),
    "date-field-formatting": lambda i: (lambda d, m, y: f"{y:04d}-{m:02d}-{d:02d}")(*ints(i)[:3]),
    "binary-flags-to-words": lambda i: " ".join("TRUE" if v else "FALSE" for v in ints(i)[:2]),
    "quotient-two-decimals": lambda i: (lambda a, b: f"{a / b:.2f}")(*ints(i)[:2]),
    # remaining variables/conditionals: output vocabulary taken from the public visible examples
    "integer-fraction-split": lambda i: (lambda x: f"{int(x.to_integral_value(rounding=ROUND_FLOOR))} {x - x.to_integral_value(rounding=ROUND_FLOOR):.3f}")(Decimal(i.strip())),
    "rupees-paise-split": lambda i: (lambda n: f"{n // 100} {n % 100}")(ints(i)[0]),
    "signed-magnitude": lambda i: (lambda n: f"{'+' if n > 0 else '-' if n < 0 else '0'} {abs(n)}")(ints(i)[0]),
    "hours-to-minutes": lambda i: int((Decimal(i.strip()) * 60).to_integral_value(rounding=ROUND_FLOOR)),
    "celsius-fahrenheit-pair": lambda i: (lambda c: f"{c} {Decimal(c) * 9 / 5 + 32:.1f}")(ints(i)[0]),
    "typed-record": lambda i: "|".join(i.split()[:3]),
    "cyclic-uppercase-offset": lambda i: (lambda c, k: chr((ord(c) - 65 + int(k)) % 26 + 65))(*i.split()[:2]),
    "rounded-whole-value": lambda i: int(Decimal(i.strip()).to_integral_value(rounding=ROUND_HALF_UP)),
    "sign-of-product": lambda i: (lambda a, b, c: "POSITIVE" if a * b > 0 else "NEGATIVE" if a * b < 0 else "ZERO")(*abc(i)),
    "inside-closed-range": lambda i: (lambda a, b, c: yn(min(b, c) <= a <= max(b, c)))(*abc(i)),
    "three-way-compare": lambda i: (lambda a, b, c: "LESS" if a < b else "GREATER" if a > b else "EQUAL")(*abc(i)),
    "parity-class": lambda i: "EVEN" if abc(i)[0] % 2 == 0 else "ODD",
    "triangle-validity": lambda i: (lambda a, b, c: yn(a > 0 and b > 0 and c > 0 and a + b > c and a + c > b and b + c > a))(*abc(i)),
    "same-sign": lambda i: yn(all(v > 0 for v in abc(i)) or all(v < 0 for v in abc(i))),
    "between-other-two-strict": lambda i: (lambda a, b, c: yn(min(b, c) < a < max(b, c)))(*abc(i)),
}


# ------------------------------------------------------------------------------------------------ dispatch
def family_of(q):
    s, slug = q["problemStatement"], q["slug"]
    if slug in ONE_OFF:
        return "one-off", lambda inp: str(ONE_OFF[slug](inp))
    if s.startswith("Select array positions"):
        return "array select/transform/aggregate", lambda inp: solve_array(s, inp)
    if s.startswith("In an undirected graph"):
        g = bold(s)[1]
        if g in GRAPH_HYPOTHESES and "The " + g + " is" not in s:
            return "graph (undefined aggregate: " + g + ")", None
        return "graph", lambda inp: solve_graph(s, inp)
    if s.startswith("Build the binary tree"):
        return "tree", lambda inp: solve_tree(s, inp)
    if s.startswith("Let `dp[0]"):
        return "dp recurrence", lambda inp: solve_dp(s, inp)
    if s.startswith("Move from index 0"):
        return "jump dp", lambda inp: solve_jump(s, inp)
    if s.startswith("Move only right or down"):
        return "grid dp", lambda inp: solve_grid(s, inp)
    for prefix, fam, fn in [
        ("Use an iterative loop", "iterative (a,b) formula", solve_ab_expr),
        ("Use the named data-structure", "dsa (a,b) formula", solve_ab_expr),
        ("Model the inputs as fields", "oop classes (a,b) formula", solve_ab_expr),
        ("Implement the operation as an object method", "oop methods (a,b) formula", solve_ab_expr),
        ("Use inherited base data", "oop inheritance (a,b) formula", solve_ab_expr),
        ("Using nested loops", "nested loops", solve_nested),
        ("Write a function", "functions", solve_function),
        ("A global value", "scope", solve_scope),
        ("Treat the input string", "strings", solve_string),
        ("For each matrix cell", "matrices", solve_matrix),
        ("Linearly scan", "linear search", solve_linear),
        ("Use binary search", "binary search", solve_binary),
        ("Sort the integers", "sorting", solve_sort),
        ("Build the union set", "sets", solve_union),
        ("Given a sorted array", "two pointers", solve_two_pointer),
        ("Build a frequency dictionary", "dictionaries", solve_freq),
        ("Define recursively", "recursion", solve_recursion),
    ]:
        if s.startswith(prefix):
            return fam, (lambda f: (lambda inp: f(s, inp)))(fn)
    return "unrecognised", None


def main():
    by_family = {}
    mismatches = []
    errors = []
    covered_q = covered_cases = 0
    undefined = []
    for q in QUESTIONS:
        suite = BANK[q["slug"]]
        fam, fn = family_of(q)
        stats = by_family.setdefault(fam, {"questions": 0, "cases": 0, "bad": 0})
        stats["questions"] += 1
        if fn is None:
            if fam.startswith("graph (undefined"):
                undefined.append(q)
            continue
        covered_q += 1
        for tc in suite["testCases"]:
            stats["cases"] += 1
            covered_cases += 1
            try:
                got = fn(tc["input"])
            except Exception as e:  # malformed input for the stated format
                stats["bad"] += 1
                errors.append(f"{q['slug']}#{tc['testIndex']} ({'hidden' if tc['isHidden'] else 'visible'}): oracle could not parse input ({type(e).__name__})")
                continue
            if norm(got) != norm(tc["expectedOutput"]):
                stats["bad"] += 1
                mismatches.append(f"{q['slug']}#{tc['testIndex']} ({'hidden' if tc['isHidden'] else 'visible'})")

    # Hypothesis testing for aggregates the statements never define.
    hypothesis_report = []
    for term, hyps in GRAPH_HYPOTHESES.items():
        qs = [q for q in undefined if bold(q["problemStatement"])[1] == term]
        if not qs:
            continue
        matching = []
        for name, fn in hyps.items():
            ok = all(
                norm(solve_graph(q["problemStatement"], tc["input"], fn)) == norm(tc["expectedOutput"])
                for q in qs
                for tc in BANK[q["slug"]]["testCases"]
            )
            if ok:
                matching.append(name)
        hypothesis_report.append((term, len(qs), matching))

    print("=" * 76)
    print("JUDGE DATA ORACLE - coding bank")
    print("=" * 76)
    for fam, st in sorted(by_family.items(), key=lambda kv: -kv[1]["questions"]):
        status = "n/a (not oracle-covered)" if st["cases"] == 0 else ("OK" if st["bad"] == 0 else f"{st['bad']} MISMATCH")
        print(f"{fam:<44} questions={st['questions']:>4} cases={st['cases']:>5}  {status}")
    print("-" * 76)
    print(f"Questions oracle-verified: {covered_q}/{len(QUESTIONS)}  |  test cases recomputed: {covered_cases}")
    for term, count, matching in hypothesis_report:
        verdict = f"consistent with: {', '.join(matching)}" if matching else "NO tested interpretation matches"
        print(f"Undefined aggregate '{term}' ({count} questions, statement gives no definition): {verdict}")
    if errors:
        print(f"Input-format problems: {len(errors)}")
        for e in errors[:20]:
            print("  ! " + e)
    print(f"Expected-output mismatches: {len(mismatches)}")
    for m in mismatches[:40]:
        print("  x " + m)
    sys.exit(1 if mismatches or errors else 0)


if __name__ == "__main__":
    main()
