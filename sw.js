// Iceman Stock Counting System - offline cache (20261027-1943)
const CACHE = 'isc-20261027-1943';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
const LIB = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).then(() => c.add(new Request(LIB, {mode: 'cors'})).catch(() => {}))));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
// network first (so updates arrive when online), cache when offline
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // only the app's own files and the database library; database calls (supabase.co) are never cached
  const u = new URL(e.request.url);
  if (u.origin !== self.location.origin && e.request.url !== LIB) return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request).then(m => m || caches.match('./index.html'))));
});