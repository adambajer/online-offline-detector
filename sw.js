const CHECK_URL = '/ping.txt';
let isOnline = true;

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

setInterval(async () => {
  try {
    await fetch(CHECK_URL, { cache: 'no-cache' });
    if (!isOnline) notifyAll('connected');
    isOnline = true;
  } catch {
    if (isOnline) notifyAll('disconnected');
    isOnline = false;
  }
}, 1000);

function notifyAll(status) {
  self.clients.matchAll().then(clients => {
    clients.forEach(c => c.postMessage({ type: 'connection-status', status }));
  });
}
