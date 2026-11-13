const V='fekah-v15',A=['./','index.html','audio.js','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png','logo.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.origin!==location.origin||u.pathname.includes('/audio/')||r.headers.has('range'))return;
 e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(y=>y.put(r,c));return x}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
});
