"""
Independent oracle for the 500-question practice bank (src/server/data/serverTestCases.json).

Every expected output (visible AND hidden, all 10 cases per question) is recomputed from the problem statement with
real Python semantics and compared with the stored value. The script also lints each input against its stated
format so a hidden case cannot rely on an undocumented interpretation:

  - array / graph sizes must match the counts on the first line
  - tree inputs must be unambiguous: the array-index level order the examples use (children of i at 2i+1, 2i+2)
    and the compact LeetCode-style level order must give the same answer; otherwise the statement must say which
  - values that the statement does not define (division by zero, negative distance, ...) are reported

Usage: python scripts/practice_oracle.py [--verbose]
Exit code 0 only when there are no mismatches and no invalid inputs.
"""
import heapq
import json
import os
import re
import sys
from collections import deque

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VERBOSE = '--verbose' in sys.argv


class Invalid(Exception):
    """The input does not satisfy the stated format/constraints."""


def norm(s):
    return '\n'.join(line.rstrip() for line in s.replace('\r\n', '\n').split('\n')).strip()


def ints(line):
    return [int(x) for x in line.split()]


def lines_of(inp):
    return inp.replace('\r\n', '\n').split('\n')


def head_and_array(inp, head_len):
    ls = [l for l in lines_of(inp) if l.strip() != '']
    head = ints(ls[0])
    if len(head) != head_len:
        raise Invalid(f'first line has {len(head)} values, expected {head_len}')
    arr = ints(ls[1]) if len(ls) > 1 else []
    if len(arr) != head[0]:
        raise Invalid(f'n={head[0]} but {len(arr)} values given')
    if len(ls) > 2:
        raise Invalid('unexpected extra lines')
    return head, arr


def single_line(inp, k):
    ls = [l for l in lines_of(inp) if l.strip() != '']
    if len(ls) != 1:
        raise Invalid(f'expected one line, got {len(ls)}')
    v = ints(ls[0])
    if len(v) != k:
        raise Invalid(f'expected {k} integers, got {len(v)}')
    return v


def yn(b):
    return 'YES' if b else 'NO'


# ---------------------------------------------------------------- belt 1: arithmetic / conditionals
def f_arithmetic(inp):
    a, b, c = single_line(inp, 3)
    return str((a + b) * c - b)


def f_absdiff(inp):
    a, b = single_line(inp, 2)
    return str(abs(a - b))


def f_largest3(inp):
    return str(max(single_line(inp, 3)))


def f_middle(inp):
    v = single_line(inp, 3)
    if len(set(v)) != 3:
        raise Invalid('values are not distinct')
    return str(sorted(v)[1])


def f_divisibility(inp):
    n, a, b = single_line(inp, 3)
    if a == 0 or b == 0:
        raise Invalid('divisor is zero (undefined by the statement)')
    return yn(n % a == 0 and n % b == 0)


def f_sign(inp):
    a, b = single_line(inp, 2)
    p = a * b
    return 'POSITIVE' if p > 0 else 'NEGATIVE' if p < 0 else 'ZERO'


def f_range(inp):
    x, l, r = single_line(inp, 3)
    if l > r:
        raise Invalid('l > r')
    return yn(l <= x <= r)


def f_fare(inp):
    (d,) = single_line(inp, 1)
    if d < 0:
        raise Invalid('negative distance')
    return str(50 if d <= 5 else 50 + 12 * (d - 5))


def f_precedence(inp):
    a, b, c, d, e = single_line(inp, 5)
    return str((a + b) * (c - d) + e)


def f_compare(inp):
    a, b = single_line(inp, 2)
    return 'LESS' if a < b else 'EQUAL' if a == b else 'GREATER'


def f_sum2(inp):
    v = ints(inp)
    if len(v) != 2:
        raise Invalid('expected two integers')
    return str(v[0] + v[1])


# ---------------------------------------------------------------- belt 2: arrays
def arr1(inp):
    return head_and_array(inp, 1)[1]


def f_array_sum(inp):
    return str(sum(arr1(inp)))


def f_array_min(inp):
    return str(min(arr1(inp)))


def f_count_above(inp):
    (n, t), a = head_and_array(inp, 2)
    return str(sum(1 for x in a if x > t))


def f_reverse(inp):
    return ' '.join(map(str, arr1(inp)[::-1]))


def f_rotate(inp):
    (n, k), a = head_and_array(inp, 2)
    if k < 0:
        raise Invalid('negative k')
    k %= n
    return ' '.join(map(str, a[k:] + a[:k]))


def f_second_largest(inp):
    d = sorted(set(arr1(inp)), reverse=True)
    return str(d[1]) if len(d) >= 2 else 'NONE'


def f_prefix(inp):
    out, s = [], 0
    for x in arr1(inp):
        s += x
        out.append(s)
    return ' '.join(map(str, out))


def f_distinct(inp):
    return str(len(set(arr1(inp))))


def f_longest_run(inp):
    a = arr1(inp)
    best = cur = 1
    for i in range(1, len(a)):
        cur = cur + 1 if a[i] == a[i - 1] else 1
        best = max(best, cur)
    return str(best)


def f_pair_sum(inp):
    (n, t), a = head_and_array(inp, 2)
    seen = set()
    for x in a:
        if t - x in seen:
            return 'YES'
        seen.add(x)
    return 'NO'


def f_move_zeroes(inp):
    a = arr1(inp)
    nz = [x for x in a if x != 0]
    return ' '.join(map(str, nz + [0] * (len(a) - len(nz))))


def f_merge(inp):
    ls = [l for l in lines_of(inp) if l.strip() != '']
    n, m = ints(ls[0])
    a = ints(ls[1]) if n else []
    b = ints(ls[2]) if m and len(ls) > 2 else (ints(ls[1]) if m and not n else [])
    if len(a) != n or len(b) != m:
        raise Invalid('array lengths do not match n m')
    if a != sorted(a) or b != sorted(b):
        raise Invalid('input arrays are not sorted')
    return ' '.join(map(str, sorted(a + b)))


def f_freq(inp):
    (n, t), a = head_and_array(inp, 2)
    return str(a.count(t))


def f_first_max(inp):
    a = arr1(inp)
    return str(a.index(max(a)))


def f_alternating(inp):
    a = arr1(inp)
    return str(sum(a[0::2]) - sum(a[1::2]))


# ---------------------------------------------------------------- DP
def f_climbing(inp):
    c = arr1(inp)
    n = len(c)
    INF = float('inf')
    dp = {-2: INF, -1: 0}
    for i in range(n):
        dp[i] = c[i] + min(dp[i - 1], dp[i - 2])
    return str(min(dp[n - 1], dp[n - 2]))


def f_robber(inp):
    a = arr1(inp)
    take, skip = 0, 0
    for x in a:
        take, skip = skip + x, max(take, skip)
    return str(max(take, skip))


def f_coin(inp):
    (n, T), coins = head_and_array(inp, 2)
    INF = float('inf')
    dp = [0] + [INF] * T
    for v in range(1, T + 1):
        for c in coins:
            if c <= v and dp[v - c] + 1 < dp[v]:
                dp[v] = dp[v - c] + 1
    return str(dp[T] if dp[T] != INF else -1)


def f_lis(inp):
    import bisect
    tails = []
    for x in arr1(inp):
        i = bisect.bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return str(len(tails))


def f_partition(inp):
    a = arr1(inp)
    s = sum(a)
    if s % 2:
        return 'NO'
    reach = 1
    for x in a:
        reach |= reach << x
    return yn((reach >> (s // 2)) & 1)


def f_grid(inp):
    ls = [l for l in lines_of(inp) if l.strip() != '']
    r, c = ints(ls[0])
    g = [ints(l) for l in ls[1:]]
    if len(g) != r or any(len(row) != c for row in g):
        raise Invalid('grid shape does not match r c')
    dp = [[0] * c for _ in range(r)]
    for i in range(r):
        for j in range(c):
            if i == 0 and j == 0:
                dp[i][j] = g[0][0]
            else:
                dp[i][j] = g[i][j] + min(dp[i - 1][j] if i else float('inf'), dp[i][j - 1] if j else float('inf'))
    return str(dp[-1][-1])


def f_edit(inp):
    ls = lines_of(inp)
    if len(ls) < 2:
        # A missing second line makes `input()` / `readLine()` fail; an empty string must still be its own line.
        raise Invalid(f'edit distance input has {len(ls)} line(s); both strings must be present as lines')
    a, b = ls[0], ls[1]
    if len(ls) > 2 and any(l.strip() for l in ls[2:]):
        raise Invalid('extra lines')
    if a != a.strip() or b != b.strip():
        raise Invalid('string has surrounding whitespace')
    prev = list(range(len(b) + 1))
    for i in range(1, len(a) + 1):
        cur = [i] + [0] * len(b)
        for j in range(1, len(b) + 1):
            cur[j] = min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] != b[j - 1]))
        prev = cur
    return str(prev[-1])


def f_max_product(inp):
    a = arr1(inp)
    best = hi = lo = a[0]
    for x in a[1:]:
        cand = (x, hi * x, lo * x)
        hi, lo = max(cand), min(cand)
        best = max(best, hi)
    return str(best)


def f_decode(inp):
    ls = [l for l in lines_of(inp) if l.strip() != '']
    if len(ls) != 1 or not re.fullmatch(r'\d+', ls[0].strip()):
        raise Invalid('expected a single non-empty digit string')
    s = ls[0].strip()
    prev2, prev1 = 1, 1 if s[0] != '0' else 0
    for i in range(1, len(s)):
        cur = 0
        if s[i] != '0':
            cur += prev1
        if s[i - 1] != '0' and 10 <= int(s[i - 1:i + 1]) <= 26:
            cur += prev2
        prev2, prev1 = prev1, cur
    return str(prev1)


# ---------------------------------------------------------------- graphs
def graph(inp, head_len, weighted):
    ls = [l for l in lines_of(inp) if l.strip() != '']
    head = ints(ls[0])
    if len(head) != head_len:
        raise Invalid(f'first line has {len(head)} values, expected {head_len}')
    n, m = head[0], head[1]
    edges = [ints(l) for l in ls[1:]]
    if len(edges) != m:
        raise Invalid(f'm={m} but {len(edges)} edge lines')
    for e in edges:
        if len(e) != (3 if weighted else 2):
            raise Invalid('malformed edge line')
        if not (0 <= e[0] < n and 0 <= e[1] < n):
            raise Invalid('vertex index out of range')
        if weighted and e[2] < 0 and head_len == 3 and not weighted == 'any':
            pass
    for v in head[2:]:
        if not (0 <= v < n):
            raise Invalid('source/target out of range')
    return head, edges


class DSU:
    def __init__(self, n):
        self.p = list(range(n))

    def find(self, x):
        while self.p[x] != x:
            self.p[x] = self.p[self.p[x]]
            x = self.p[x]
        return x

    def union(self, a, b):
        a, b = self.find(a), self.find(b)
        if a == b:
            return False
        self.p[a] = b
        return True


def f_components(inp):
    (n, m), edges = graph(inp, 2, False)
    d = DSU(n)
    for u, v in edges:
        d.union(u, v)
    return str(len({d.find(i) for i in range(n)}))


def f_bipartite(inp):
    (n, m), edges = graph(inp, 2, False)
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    color = [-1] * n
    for s in range(n):
        if color[s] != -1:
            continue
        color[s] = 0
        q = deque([s])
        while q:
            u = q.popleft()
            for v in adj[u]:
                if color[v] == -1:
                    color[v] = color[u] ^ 1
                    q.append(v)
                elif color[v] == color[u]:
                    return 'NO'
    return 'YES'


def f_shortest(inp):
    (n, m, s), edges = graph(inp, 3, True)
    if any(w < 0 for _, _, w in edges):
        raise Invalid('negative weight')
    adj = [[] for _ in range(n)]
    for u, v, w in edges:
        adj[u].append((v, w))
    dist = [None] * n
    dist[s] = 0
    pq = [(0, s)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in adj[u]:
            if dist[v] is None or d + w < dist[v]:
                dist[v] = d + w
                heapq.heappush(pq, (dist[v], v))
    return ' '.join(str(-1 if x is None else x) for x in dist)


def f_topo(inp):
    (n, m), edges = graph(inp, 2, False)
    adj = [[] for _ in range(n)]
    indeg = [0] * n
    for u, v in edges:
        adj[u].append(v)
        indeg[v] += 1
    pq = [i for i in range(n) if indeg[i] == 0]
    heapq.heapify(pq)
    order = []
    while pq:
        u = heapq.heappop(pq)
        order.append(u)
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                heapq.heappush(pq, v)
    return ' '.join(map(str, order)) if len(order) == n else 'IMPOSSIBLE'


def f_mst(inp):
    (n, m), edges = graph(inp, 2, True)
    d = DSU(n)
    total, used = 0, 0
    for u, v, w in sorted(edges, key=lambda e: e[2]):
        if d.union(u, v):
            total += w
            used += 1
    if used != n - 1:
        raise Invalid('graph is not connected')
    return str(total)


def scc_count(n, edges):
    adj = [[] for _ in range(n)]
    radj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        radj[v].append(u)
    seen, order = [False] * n, []
    for s in range(n):
        if seen[s]:
            continue
        stack = [(s, 0)]
        seen[s] = True
        while stack:
            u, i = stack.pop()
            if i < len(adj[u]):
                stack.append((u, i + 1))
                v = adj[u][i]
                if not seen[v]:
                    seen[v] = True
                    stack.append((v, 0))
            else:
                order.append(u)
    comp = [-1] * n
    c = 0
    for s in reversed(order):
        if comp[s] != -1:
            continue
        stack = [s]
        comp[s] = c
        while stack:
            u = stack.pop()
            for v in radj[u]:
                if comp[v] == -1:
                    comp[v] = c
                    stack.append(v)
        c += 1
    return c, comp


def f_scc(inp):
    (n, m), edges = graph(inp, 2, False)
    return str(scc_count(n, edges)[0])


def f_cycle(inp):
    (n, m), edges = graph(inp, 2, False)
    if any(u == v for u, v in edges):
        return 'YES'
    c, _ = scc_count(n, edges)
    return yn(c < n)


def reach(n, edges, s):
    adj = [[] for _ in range(n)]
    for e in edges:
        adj[e[0]].append(e[1])
    seen = {s}
    q = deque([s])
    while q:
        u = q.popleft()
        for v in adj[u]:
            if v not in seen:
                seen.add(v)
                q.append(v)
    return seen


def f_reach(inp):
    (n, m, s, t), edges = graph(inp, 4, False)
    return yn(t in reach(n, edges, s))


def f_dag_longest(inp):
    (n, m, s), edges = graph(inp, 3, True)
    c, _ = scc_count(n, [(u, v) for u, v, _ in edges])
    if c < n or any(u == v for u, v, _ in edges):
        raise Invalid('graph is not a DAG')
    adj = [[] for _ in range(n)]
    indeg = [0] * n
    for u, v, w in edges:
        adj[u].append((v, w))
        indeg[v] += 1
    order, q = [], deque(i for i in range(n) if indeg[i] == 0)
    while q:
        u = q.popleft()
        order.append(u)
        for v, _ in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)
    best = [None] * n
    best[s] = 0
    for u in order:
        if best[u] is None:
            continue
        for v, w in adj[u]:
            if best[v] is None or best[u] + w > best[v]:
                best[v] = best[u] + w
    return str(max(x for x in best if x is not None))


def f_dsu(inp):
    (n, m, s, t), edges = graph(inp, 4, False)
    d = DSU(n)
    for u, v in edges:
        d.union(u, v)
    return yn(d.find(s) == d.find(t))


# ---------------------------------------------------------------- trees
class Node:
    __slots__ = ('val', 'left', 'right')

    def __init__(self, val):
        self.val, self.left, self.right = val, None, None


def tree_values(inp, extra_head=0):
    ls = [l for l in lines_of(inp) if l.strip() != '']
    head = ints(ls[0])
    if len(head) != 1 + extra_head:
        raise Invalid('unexpected first line')
    vals = ints(ls[1]) if len(ls) > 1 else []
    if len(vals) != head[0]:
        raise Invalid(f'n={head[0]} but {len(vals)} values')
    return head, vals, ls


def build_index(vals):
    """Array-index level order (the format the statements' examples use): children of i are 2i+1 and 2i+2."""
    n = len(vals)
    if not n or vals[0] == -1:
        return None
    nodes = [Node(v) if v != -1 else None for v in vals]
    for i in range(n):
        if nodes[i] is None:
            continue
        if i and nodes[(i - 1) // 2] is None:
            raise Invalid(f'value at index {i} has a missing parent (not a valid array-index tree)')
        l, r = 2 * i + 1, 2 * i + 2
        nodes[i].left = nodes[l] if l < n else None
        nodes[i].right = nodes[r] if r < n else None
    return nodes[0]


def build_compact(vals):
    """Compact level order (LeetCode style): values are assigned to the children of existing nodes only."""
    if not vals or vals[0] == -1:
        return None
    root = Node(vals[0])
    q, i = deque([root]), 1
    while q and i < len(vals):
        node = q.popleft()
        if i < len(vals) and vals[i] != -1:
            node.left = Node(vals[i])
            q.append(node.left)
        i += 1
        if i < len(vals) and vals[i] != -1:
            node.right = Node(vals[i])
            q.append(node.right)
        i += 1
    return root


def height(t):
    return 0 if t is None else 1 + max(height(t.left), height(t.right))


def t_height(t, _):
    return str(height(t))


def t_leaves(t, _):
    if t is None:
        return '0'
    stack, c = [t], 0
    while stack:
        u = stack.pop()
        if not u.left and not u.right:
            c += 1
        stack += [x for x in (u.left, u.right) if x]
    return str(c)


def t_balance(t, _):
    def h(u):
        if u is None:
            return 0
        a, b = h(u.left), h(u.right)
        if a < 0 or b < 0 or abs(a - b) > 1:
            return -1
        return 1 + max(a, b)

    return yn(h(t) >= 0)


def walk(t, kind):
    out = []

    def go(u):
        if u is None:
            return
        if kind == 'pre':
            out.append(u.val)
        go(u.left)
        if kind == 'in':
            out.append(u.val)
        go(u.right)
        if kind == 'post':
            out.append(u.val)

    go(t)
    return ' '.join(map(str, out))


def levels(t):
    res, q = [], deque([t] if t else [])
    while q:
        res.append([u.val for u in q])
        q = deque(c for u in q for c in (u.left, u.right) if c)
    return res


def t_level_sum(t, _):
    sums = [sum(l) for l in levels(t)]
    if not sums:
        raise Invalid('empty tree')
    best = max(sums)
    return f'{sums.index(best)} {best}'


def t_diameter(t, _):
    best = 0

    def h(u):
        nonlocal best
        if u is None:
            return 0
        a, b = h(u.left), h(u.right)
        best = max(best, a + b + 1)
        return 1 + max(a, b)

    h(t)
    return str(best)


def t_bst(t, _):
    def ok(u, lo, hi):
        if u is None:
            return True
        if not (lo < u.val < hi):
            return False
        return ok(u.left, lo, u.val) and ok(u.right, u.val, hi)

    return 'VALID' if ok(t, float('-inf'), float('inf')) else 'INVALID'


def t_path_sum(t, head):
    target = head[1]
    if t is None:
        return 'NO'
    stack = [(t, t.val)]
    while stack:
        u, s = stack.pop()
        if not u.left and not u.right and s == target:
            return 'YES'
        stack += [(c, s + c.val) for c in (u.left, u.right) if c]
    return 'NO'


def t_symmetric(t, _):
    def mirror(a, b):
        if a is None or b is None:
            return a is b
        return a.val == b.val and mirror(a.left, b.right) and mirror(a.right, b.left)

    return yn(t is None or mirror(t.left, t.right))


def t_zigzag(t, _):
    return '\n'.join(' '.join(map(str, l if i % 2 == 0 else l[::-1])) for i, l in enumerate(levels(t)))


FORMAT_DEPENDENT = {'count': 0}


def tree_family(fn, extra_head=0):
    def run(inp, statement=''):
        head, vals, _ = tree_values(inp, extra_head)
        a = fn(build_index(vals), head)
        if fn(build_compact(vals), head) != a:
            # The answer depends on how the level order is read; legitimate only if the statement documents it.
            if 'array level order' not in statement:
                raise Invalid('ambiguous tree format: statement does not document array (2i+1, 2i+2) level order')
            FORMAT_DEPENDENT['count'] += 1
        return a

    run.wants_statement = True
    return run


def f_lower_bound(inp, statement=''):
    ls = [l for l in lines_of(inp) if l.strip() != '']
    n = ints(ls[0])
    if len(n) != 1:
        raise Invalid('unexpected first line')
    vals = ints(ls[1])
    if len(vals) != n[0]:
        raise Invalid('n does not match values')
    q = ints(ls[2])
    queries = ints(ls[3]) if len(ls) > 3 else []
    if len(q) != 1 or len(queries) != q[0]:
        raise Invalid('q does not match queries')
    keys = sorted(set(v for v in vals if v != -1))
    import bisect
    out = []
    for x in queries:
        i = bisect.bisect_left(keys, x)
        out.append(str(keys[i]) if i < len(keys) else '-1')
    if -1 in vals:
        with_minus = sorted(set(vals))
        alt = []
        for x in queries:
            i = bisect.bisect_left(with_minus, x)
            alt.append(str(with_minus[i]) if i < len(with_minus) else '-1')
        if alt != out:
            if 'except `-1`' not in statement:
                raise Invalid('ambiguous: result depends on whether -1 is a missing node or a value')
            FORMAT_DEPENDENT['count'] += 1
    return '\n'.join(out)


FAMILIES = {
    'arithmetic-check': f_arithmetic,
    'absolute-difference': f_absdiff,
    'largest-of-three': f_largest3,
    'middle-value': f_middle,
    'divisibility-report': f_divisibility,
    'sign-product': f_sign,
    'range-membership': f_range,
    'piecewise-fare': f_fare,
    'operator-precedence': f_precedence,
    'three-way-comparison': f_compare,
    'sum-of-two-numbers': f_sum2,
    'array-sum': f_array_sum,
    'array-minimum': f_array_min,
    'count-above-threshold': f_count_above,
    'reverse-array': f_reverse,
    'rotate-left': f_rotate,
    'second-largest': f_second_largest,
    'prefix-running-sum': f_prefix,
    'distinct-count': f_distinct,
    'longest-equal-run': f_longest_run,
    'pair-sum-exists': f_pair_sum,
    'move-zeroes': f_move_zeroes,
    'merge-sorted-arrays': f_merge,
    'frequency-of-target': f_freq,
    'first-maximum-index': f_first_max,
    'alternating-sum': f_alternating,
    'climbing-cost': f_climbing,
    'house-robber': f_robber,
    'coin-change-minimum': f_coin,
    'longest-increasing-subsequence': f_lis,
    'partition-equal-sum': f_partition,
    'grid-minimum-path': f_grid,
    'string-edit-distance': f_edit,
    'maximum-product-subarray': f_max_product,
    'decode-digit-string': f_decode,
    'maximum-sum-non-adjacent': f_robber,
    'components': f_components,
    'bipartite': f_bipartite,
    'shortest-path': f_shortest,
    'topological-order': f_topo,
    'mst': f_mst,
    'scc': f_scc,
    'cycle-detection': f_cycle,
    'reachability': f_reach,
    'dag-longest-path': f_dag_longest,
    'dsu-connectivity': f_dsu,
    'height': tree_family(t_height),
    'leaf-count': tree_family(t_leaves),
    'balance': tree_family(t_balance),
    'preorder': tree_family(lambda t, _: walk(t, 'pre')),
    'inorder': tree_family(lambda t, _: walk(t, 'in')),
    'postorder': tree_family(lambda t, _: walk(t, 'post')),
    'level-sum': tree_family(t_level_sum),
    'diameter': tree_family(t_diameter),
    'bst-validity': tree_family(t_bst),
    'bst-lower-bound': f_lower_bound,
    'root-to-leaf-sum': tree_family(t_path_sum, extra_head=1),
    'symmetry': tree_family(t_symmetric),
    'zigzag': tree_family(t_zigzag),
}


def family_of(key):
    return re.sub(r'-v\d+$', '', re.sub(r'^belt-\d+-q\d+-', '', key))


f_lower_bound.wants_statement = True


def main():
    sys.setrecursionlimit(1_000_000)
    with open(os.path.join(ROOT, 'src', 'server', 'data', 'serverTestCases.json'), encoding='utf8') as fh:
        bank = json.load(fh)
    with open(os.path.join(ROOT, 'src', 'data', 'problems.json'), encoding='utf8') as fh:
        statements = {p['slug']: p.get('inputFormat', '') for belt in json.load(fh) for p in belt['problems']}
    stats = {'questions': 0, 'cases': 0, 'mismatch': 0, 'invalid': 0, 'shape': 0}
    per_family = {}
    findings = []
    for key, entry in bank.items():
        fam = family_of(key)
        fn = FAMILIES.get(fam)
        cases = entry['testCases'] if isinstance(entry, dict) else entry
        stats['questions'] += 1
        pf = per_family.setdefault(fam, {'q': 0, 'cases': 0, 'bad': 0})
        pf['q'] += 1
        idx = sorted(c['testIndex'] for c in cases)
        visible = [c['testIndex'] for c in cases if not c.get('isHidden')]
        if fn is None:
            findings.append((key, 0, 'NO ORACLE', fam))
            continue
        if idx != list(range(1, 11)) or visible != [1, 2, 3]:
            stats['shape'] += 1
            findings.append((key, 0, 'SHAPE', f'indexes={idx} visible={visible}'))
        for c in cases:
            stats['cases'] += 1
            pf['cases'] += 1
            try:
                got = fn(c['input'], statements.get(key, '')) if getattr(fn, 'wants_statement', False) else fn(c['input'])
            except Invalid as e:
                stats['invalid'] += 1
                pf['bad'] += 1
                findings.append((key, c['testIndex'], 'INVALID', str(e)))
                continue
            if norm(got) != norm(c['expectedOutput']):
                stats['mismatch'] += 1
                pf['bad'] += 1
                findings.append((key, c['testIndex'], 'MISMATCH', f'stored={c["expectedOutput"]!r} oracle={got!r}'))

    for fam, pf in per_family.items():
        print(f"{fam:34s} questions={pf['q']:4d} cases={pf['cases']:5d}  {'OK' if not pf['bad'] else 'FINDINGS: ' + str(pf['bad'])}")
    print('-' * 76)
    print(f"Questions checked: {stats['questions']}  |  test cases recomputed: {stats['cases']}")
    print(f"Format-dependent cases (documented in the statement, verified under that format): {FORMAT_DEPENDENT['count']}")
    print(f"Expected-output mismatches: {stats['mismatch']}  |  invalid/ambiguous inputs: {stats['invalid']}  |  shape errors: {stats['shape']}")
    shown = findings if VERBOSE else findings[:40]
    for key, i, kind, msg in shown:
        # Hidden-case contents are never printed; only the question, case number and the kind of problem.
        print(f'  {kind:8s} {key} case {i}: {msg if VERBOSE or kind != "MISMATCH" else "(values hidden; use --verbose)"}')
    if len(findings) > len(shown):
        print(f'  ... {len(findings) - len(shown)} more (use --verbose)')
    sys.exit(1 if findings else 0)


if __name__ == '__main__':
    main()
