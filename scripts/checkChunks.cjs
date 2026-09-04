const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
const importRegex = /from\s*['"](\.\/[^'"]+)['"]/g;

const graph = {};
for (const f of files) {
  const code = fs.readFileSync('dist/assets/' + f, 'utf8');
  graph[f] = [];
  let m;
  while ((m = importRegex.exec(code)) !== null) {
    const imported = m[1].replace('./', '');
    graph[f].push(imported);
  }
}

console.log('Chunk dependency graph:');
for (const [f, deps] of Object.entries(graph)) {
  if (deps.length > 0) {
    console.log(f, '->', deps);
  }
}
