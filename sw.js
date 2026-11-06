/* Service worker — Ficha de Busca Ativa (modo aplicativo / offline)
   Estratégia: a ficha inteira fica em cache na primeira abertura com internet.
   Depois disso abre e funciona sem sinal (expedições nos rios).
   Ao publicar uma nova versão, AUMENTE o número em VERSAO — o app avisa
   o técnico e atualiza no próximo toque em "Atualizar". */
const VERSAO = 'v3.5.1';
const CACHE = 'busca-ativa-' + VERSAO;
const ARQUIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(chaves => Promise.all(chaves.filter(k => k.startsWith('busca-ativa-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'atualizar') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Página: rede primeiro (pega correções), cache se estiver sem sinal
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(resp => { const copia = resp.clone(); caches.open(CACHE).then(c => c.put('./index.html', copia)); return resp; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  // Demais arquivos: cache primeiro
  e.respondWith(caches.match(req).then(r => r || fetch(req)));
});
