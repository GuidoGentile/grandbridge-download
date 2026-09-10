const CACHE_NAME = "grandbridge-webapp-0.4.2-beta.8-v3";
const APP_ROOT = new URL("./", self.location.href).toString();
const APP_INDEX = new URL("index.html", APP_ROOT).toString();

const cacheable = (url) => {
  const parsed = new URL(url);
  return parsed.origin === self.location.origin
    && parsed.href.startsWith(APP_ROOT)
    && !parsed.search
    && !parsed.hash;
};

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME)
    .then((cache) => cache.addAll([APP_ROOT, APP_INDEX]))
    .then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((key) => key.startsWith("grandbridge-webapp-") && key !== CACHE_NAME)
      .map((key) => caches.delete(key))))
    .then(() => self.clients.claim()));
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "CACHE_URLS" || !Array.isArray(event.data.urls)) return;
  const urls = [...new Set(event.data.urls.filter((url) => typeof url === "string" && cacheable(url)))];
  event.waitUntil(caches.open(CACHE_NAME).then(async (cache) => {
    await Promise.allSettled(urls.map(async (url) => {
      const response = await fetch(url, { credentials: "same-origin", cache: "reload" });
      if (response.ok) await cache.put(url, response);
    }));
  }));
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || !cacheable(request.url)) return;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request, { cache: "no-cache" }).then(async (response) => {
      if (response.ok) await (await caches.open(CACHE_NAME)).put(APP_INDEX, response.clone());
      return response;
    }).catch(async () => (await caches.match(APP_INDEX)) ?? Response.error()));
    return;
  }
  event.respondWith(caches.match(request).then((cached) => cached ?? fetch(request, { cache: "reload" }).then(async (response) => {
    if (response.ok) await (await caches.open(CACHE_NAME)).put(request, response.clone());
    return response;
  })));
});
