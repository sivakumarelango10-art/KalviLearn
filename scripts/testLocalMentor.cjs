const { spawn } = require('child_process');

async function main() {
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--user-data-dir=C:\\Users\\sivak\\AppData\\Local\\Temp\\chrome-local-mentor-' + Date.now(),
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const targets = await fetch('http://127.0.0.1:9222/json/list').then(r => r.json());
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);

  ws.onopen = () => {
    ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
    ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
    // Navigate directly to /mentor
    ws.send(JSON.stringify({ id: 4, method: 'Page.navigate', params: { url: 'http://localhost:5173/mentor' } }));
  };

  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.method === 'Console.messageAdded' || m.method === 'Runtime.consoleAPICalled') {
      console.log('CONSOLE:', JSON.stringify(m.params));
    }
    if (m.method === 'Runtime.exceptionThrown') {
      console.error('EXCEPTION:', JSON.stringify(m.params));
    }
    if (m.method === 'Page.loadEventFired') {
      setTimeout(() => {
        ws.send(JSON.stringify({
          id: 10,
          method: 'Runtime.evaluate',
          params: { expression: 'JSON.stringify({ title: document.title, url: location.href, html: document.body.innerHTML.slice(0, 800) })' }
        }));
      }, 2000);
    }
    if (m.id === 10) {
      console.log('Mentor Direct Nav Result:', m.result.result.value);
      ws.close();
      chromeProc.kill();
      process.exit(0);
    }
  };
}

main().catch(console.error);
