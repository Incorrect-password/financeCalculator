var log = console.log.bind(console);//bind our console to a variable
var version = "0.0.1";
var cacheName = "financeCalculator";
var cache = cacheName + "-" + version;
var filesToCache = [
    "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
    "https://code.jquery.com/jquery-3.3.1.slim.min.js",
    "http://localhost:1234/financeCalculator/app/css/style.css",
    "http://localhost:1234/financeCalculator/app/js/dist/main.js",
    "http://localhost:1234/financeCalculator/app/js/localforage.js",
    "http://localhost:1234/financeCalculator/app/images/icons/_favicon.ico",
    "http://localhost:1234/financeCalculator/app/images/icons/apple-icon-144x144.png",
    "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.4.2/handlebars.js",
    "http://localhost:1234/financeCalculator/app/manifest.json",
    "http://localhost:1234/financeCalculator/app/",
    "http://localhost:1234/financeCalculator/app/index.html"
];

importScripts('js/localforage.js');

self.addEventListener("install", function(event) {
    log('[ServiceWorker] Installing....');

    event.waitUntil(caches
        .open(cache) //opens cache and returns a promise
        .then(function(swcaches) { //
            log('[ServiceWorker] Caching files');
            log(swcaches)
            return swcaches.addAll(filesToCache);
        })
    )
})

self.addEventListener("fetch", function(event) {
    if (filesToCache.includes(event.request.url)){
        event.respondWith(
            caches.match(event.request)
                .then(function(response) {
                 if(response) {
                     log("Fulfilling " + event.request.url + "from cache.")
                     return response;
                 }else{
                     log(event.request.url + "not found in cache, fetching from network");

                     return fetch(event.request)
                 }
                })
        )
    }

})
