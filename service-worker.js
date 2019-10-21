var log = console.log.bind(console);//bind our console to a variable
var version = "0.0.1";
var cacheName = "financeCalculator";
var cache = cacheName + "-" + version;
var filesToCache = [
    "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
    "https://localhost:1234/css/style.css",
    "http://localhost:1234:js/dist/main.js",
    "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.4.2/handlebars.js",
    "http://localhost:1234/manifest.json",
    "http://localhost:1234/",
    "http://localhost:1234/index.php",
];

importScripts('js/localforage.js');

self.addEventListener("install", function(event) {
    log('[ServiceWorker] Installing....');

    event.waitUntil(caches
        .open(cache) //opens cache and returns a promise
        .then(function(swcaches) { //
            log('[ServiceWorker] Caching files');
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

    if (event.request.url === 'http://localhost:8888/api/todo' && event.request.method == 'GET')

        event.respondWith(async function() {

            let response = await fetch(event.request).catch(async function(err) {
                var data = {success:true, msg:'',data: []};

                await localforage.iterate(function(value, key) {
                    data.data.push([key, value])
                })

                if (data.data.length > 0) {
                    log('Returning cached data');
                    return await new Response(JSON.stringify(data), {
                        headers: {"Content-Type": "application/json"}
                    })
                }
            })
            let resposeData = await response.clone().json()
            await localforage.clear()
            log (resposeData)
            await resposeData.data.forEach(function (todo) {
                localforage.setItem(todo[0],todo[1])
            })

            return response

        }())

})