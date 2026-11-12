const C = 'pik-v12';
const ASSETS = ['./', 'index.html', 'bacaan.html', 'baca.html', 'pdfjs/pdf.min.js', 'pdfjs/pdf.worker.min.js', 'pdf/tatacara-solat.pdf', 'pdf/tatacara-wuduk-tayammum.pdf', 'artikel-zikir-pagi-petang.html', 'artikel-sayyidul-istighfar.html', 'artikel-sirah-kelahiran.html', 'artikel-talbis-iblis.html', 'style.css', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      if (new URL(e.request.url).origin === location.origin) {
        const copy = r.clone();
        caches.open(C).then(c => c.put(e.request, copy)).catch(() => {});
      }
      return r;
    }).catch(() => caches.match(e.request).then(m => m || caches.match(e.request.url.includes('bacaan') ? 'bacaan.html' : 'index.html')))
  );
});
