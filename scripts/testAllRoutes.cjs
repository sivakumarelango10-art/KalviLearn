const { spawn } = require('child_process');

async function testBrowserRoutes() {
  const port = 9333;
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=C:\\Users\\sivak\\AppData\\Local\\Temp\\chrome-all-routes-' + Date.now(),
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then(r => r.json());
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);

  const testMentorUser = JSON.stringify({
    id: 'e95272bc-633d-4fbd-8bf0-7801426fd0f6',
    email: 'sivakumarelango10@gmail.com',
    role: 'MENTOR',
    status: 'ACTIVE',
    name: 'Sivakumar Elango'
  });

  const routes = [
    { url: 'http://localhost:4173/login', name: 'Common Login' },
    { url: 'http://localhost:4173/mentor', name: 'Mentor Dashboard', auth: true },
    { url: 'http://localhost:4173/mentor/students', name: 'Mentor Students Roster', auth: true },
    { url: 'http://localhost:4173/mentor/submissions', name: 'Mentor Submissions Stream', auth: true },
    { url: 'http://localhost:4173/mentor/profile', name: 'Mentor Profile', auth: true },
    { url: 'http://localhost:4173/mentor/curriculum', name: 'Mentor Curriculum', auth: true },
    { url: 'http://localhost:4173/mentor/announcements', name: 'Mentor Announcements', auth: true },
    { url: 'http://localhost:4173/dashboard', name: 'Student Dashboard' },
    { url: 'http://localhost:4173/practice', name: 'Practice Arena' },
    { url: 'http://localhost:4173/practice/python', name: 'Python Practice' },
    { url: 'http://localhost:4173/revise', name: 'Revise Solution Vault' },
    { url: 'http://localhost:4173/non-existent-404-check', name: '404 Error Page' }
  ];

  await new Promise((resolve, reject) => {
    ws.onopen = async () => {
      ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));

      // First, set localStorage with verified mentor credentials
      ws.send(JSON.stringify({
        id: 4,
        method: 'Page.navigate',
        params: { url: 'http://localhost:4173/' }
      }));
      await new Promise(r => setTimeout(r, 1000));

      const setStorage = `localStorage.setItem('kalvi_active_user', '${testMentorUser.replace(/'/g, "\\'")}');`;
      ws.send(JSON.stringify({ id: 5, method: 'Runtime.evaluate', params: { expression: setStorage } }));

      // Now iterate through all routes
      for (let i = 0; i < routes.length; i++) {
        const r = routes[i];
        console.log(`\nTesting [${i + 1}/${routes.length}]: ${r.name} -> ${r.url}`);

        ws.send(JSON.stringify({
          id: 10 + i,
          method: 'Page.navigate',
          params: { url: r.url }
        }));

        // Allow route bundle to load and render
        await new Promise(res => setTimeout(res, 1200));

        let evalResult = null;
        const msgPromise = new Promise(evalDone => {
          const handler = (e) => {
            const m = JSON.parse(e.data);
            if (m.id === 1000 + i) {
              evalResult = m.result?.result?.value;
              ws.removeEventListener('message', handler);
              evalDone();
            }
          };
          ws.addEventListener('message', handler);
        });

        ws.send(JSON.stringify({
          id: 1000 + i,
          method: 'Runtime.evaluate',
          params: {
            expression: `JSON.stringify({
              title: document.title,
              url: location.href,
              rootHasHtml: (document.getElementById('root')?.innerHTML || '').trim().length > 0,
              textSnippet: document.body.innerText.slice(0, 180).replace(/\\s+/g, ' ')
            })`
          }
        }));

        await msgPromise;

        if (evalResult) {
          const parsed = JSON.parse(evalResult);
          console.log(`  Title: ${parsed.title}`);
          console.log(`  Content Mounted: ${parsed.rootHasHtml ? 'PASS (Rendered)' : 'FAIL (BLANK)'}`);
          console.log(`  Text: "${parsed.textSnippet}..."`);

          if (!parsed.rootHasHtml) {
            reject(new Error(`White screen detected on route: ${r.name}`));
            return;
          }
        }
      }

      console.log('\n======================================================');
      console.log('ALL 12 ROUTES VERIFIED CLEANLY: ZERO WHITE SCREENS!');
      console.log('======================================================');
      ws.close();
      chromeProc.kill();
      resolve();
    };
  });
}

testBrowserRoutes()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[BROWSER ROUTE TEST ERROR]:', err);
    process.exit(1);
  });
