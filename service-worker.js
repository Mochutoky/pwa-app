const CACHE_NAME = "bonus-pwa-cache-v1";
const urlsToCache = [
  "index.html",
  "bonus.html",
  "scanner.html",
  "profile.html",
  "css/style.css",
  "js/bonus.js",
  "js/profile.js",
  "img/coke.png",
  "img/avatar.png",
  "manifest.json"
];

// Установка SW и кэширование файлов
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Обработка запросов
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
