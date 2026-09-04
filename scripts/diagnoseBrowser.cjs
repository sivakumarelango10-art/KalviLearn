const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9222;
  const userDataDir = 'C:\\Users\\sivak\\AppData\\Local\\Temp\\chrome-debug-profile-' + Date.now();

  console.log('Launching Chrome with remote debugging on port', port);
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ], { stdio: 'ignore' });

  await new Promise((resolve) => setTimeout(resolve, 1500));

  try {
    const versionRes = await fetch(`http://127.0.0.1:${port}/json/list`);
    const targets = await versionRes.json();
    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    const wsUrl = pageTarget.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        const cb = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        cb(msg);
      }
      if (msg.method === 'Console.messageAdded') {
        console.log('[BROWSER CONSOLE]', msg.params.message.level, msg.params.message.text);
      }
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('[BROWSER CONSOLE]', msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('[BROWSER EXCEPTION]', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
      }
    };

    function sendCommand(method, params = {}) {
      const id = msgId++;
      return new Promise((resolve) => {
        callbacks.set(id, resolve);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await sendCommand('Console.enable');
    await sendCommand('Runtime.enable');
    await sendCommand('Page.enable');

    console.log('\n--- TEST: Authenticated Mentor navigating to http://localhost:5173/mentor ---');
    const mentorUser = {
      id: 'e95272bc-633d-4fbd-8bf0-7801426fd0f6',
      email: 'sivakumarelango10@gmail.com',
      name: 'Sivakumar Elango',
      role: 'MENTOR',
      status: 'ACTIVE'
    };

    await sendCommand('Page.navigate', { url: 'http://localhost:5173/login' });
    await new Promise((r) => setTimeout(r, 1500));

    // Set verified mentor user in localStorage
    await sendCommand('Runtime.evaluate', {
      expression: `
        localStorage.setItem('kalvi_active_user', '${JSON.stringify(mentorUser)}');
        location.href = 'http://localhost:5173/mentor';
      `
    });

    await new Promise((r) => setTimeout(r, 3500));

    let evalRes = await sendCommand('Runtime.evaluate', {
      expression: 'document.title + " | " + location.href + " | body len: " + document.body.innerHTML.length'
    });
    console.log('Mentor View URL & Title:', evalRes.result?.value);

    let htmlRes = await sendCommand('Runtime.evaluate', {
      expression: 'document.getElementById("root")?.innerText?.slice(0, 400)'
    });
    console.log('Mentor View text content:\n', htmlRes.result?.value);

    // Test Students tab
    console.log('\n--- TEST: Navigating to /mentor/students ---');
    await sendCommand('Runtime.evaluate', { expression: `location.href = 'http://localhost:5173/mentor/students';` });
    await new Promise((r) => setTimeout(r, 3000));

    evalRes = await sendCommand('Runtime.evaluate', {
      expression: 'document.title + " | " + location.href + " | body len: " + document.body.innerHTML.length'
    });
    console.log('Students Tab URL:', evalRes.result?.value);

    htmlRes = await sendCommand('Runtime.evaluate', {
      expression: 'document.getElementById("root")?.innerText?.slice(0, 400)'
    });
    console.log('Students Tab text content:\n', htmlRes.result?.value);

    // Test Submissions tab
    console.log('\n--- TEST: Navigating to /mentor/submissions ---');
    await sendCommand('Runtime.evaluate', { expression: `location.href = 'http://localhost:5173/mentor/submissions';` });
    await new Promise((r) => setTimeout(r, 3000));

    evalRes = await sendCommand('Runtime.evaluate', {
      expression: 'document.title + " | " + location.href + " | body len: " + document.body.innerHTML.length'
    });
    console.log('Submissions Tab URL:', evalRes.result?.value);

    htmlRes = await sendCommand('Runtime.evaluate', {
      expression: 'document.getElementById("root")?.innerText?.slice(0, 400)'
    });
    console.log('Submissions Tab text content:\n', htmlRes.result?.value);

    ws.close();
  } catch (err) {
    console.error('Diagnosis error:', err);
  } finally {
    chromeProc.kill();
    console.log('Chrome process exited.');
  }
}

main();
