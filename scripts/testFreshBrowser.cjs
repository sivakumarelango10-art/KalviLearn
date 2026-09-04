const { spawn } = require('child_process');

async function main() {
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--user-data-dir=C:\\Users\\sivak\\AppData\\Local\\Temp\\chrome-fresh-' + Date.now(),
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const targets = await fetch('http://127.0.0.1:9222/json/list').then(r => r.json());
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);

  ws.onopen = () => {
    ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
    ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
    ws.send(JSON.stringify({ id: 4, method: 'Page.navigate', params: { url: 'https://kalvicode.vercel.app/' } }));
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
          params: { expression: 'JSON.stringify({ title: document.title, url: location.href, body: document.body.innerHTML })' }
        }));
      }, 2500);
    }
    if (m.id === 10) {
      const parsed = JSON.parse(m.result.result.value);
      console.log('Fresh navigation result:');
      console.log('Title:', parsed.title);
      console.log('URL:', parsed.url);
      console.log('Body length:', parsed.body.length);
      console.log('Body snippet:', parsed.body.slice(0, 400));
      ws.close();
      chromeProc.kill();
      process.exit(0);
    }
  };
}

main().catch(console.error);
