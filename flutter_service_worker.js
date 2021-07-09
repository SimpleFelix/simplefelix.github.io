'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "fd6ea9dd48fa262689cdeef6026eba8e",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/images/%25E4%25BA%25AC%25E5%25B7%25B4.webp": "0b18efc1b1842617cde9b6a92089d7e7",
"assets/images/%25E5%258A%25A0%25E8%258F%25B2%25E7%258C%25AB.webp": "1d138f380e536acdb824a7b989c1bc83",
"assets/images/%25E5%258D%259A%25E7%25BE%258E.webp": "c8498c0446fae2faf56eabdf02905e83",
"assets/images/%25E5%2590%2589%25E5%25A8%2583%25E5%25A8%2583.webp": "17491c672b619c6d1647b7eb6098a540",
"assets/images/%25E5%2593%2588%25E5%25A3%25AB%25E5%25A5%2587.webp": "1ce2a90d077818b4b6ad6a2c956d60de",
"assets/images/%25E5%259C%259F%25E7%258B%2597.webp": "7acfe7b8a1eb5a6f9f3a31167a29a3f2",
"assets/images/%25E5%25A4%25A7%25E7%2599%25BD%25E7%2586%258A.webp": "72c5244b8731a65cb188ba6c118c2ec7",
"assets/images/%25E5%25AE%2589%25E5%2593%25A5%25E6%258B%2589%25E7%258C%25AB.webp": "b41357c601768e9540117c11645d01ae",
"assets/images/%25E5%25B8%2583%25E5%2581%25B6%25E7%258C%25AB.webp": "cbcd91df926c80216ab618020f7c3721",
"assets/images/%25E5%25BE%25B7%25E5%259B%25BD%25E7%2589%25A7%25E7%25BE%258A%25E7%258A%25AC.webp": "45bd3bd268284c685ba3e6b9c06ec235",
"assets/images/%25E6%2596%2597%25E7%2589%259B%25E7%258A%25AC.webp": "42af3e6af25e3b2898aad415eea19d94",
"assets/images/%25E6%259D%259C%25E5%25AE%25BE%25E7%258A%25AC.webp": "7c0d8829facaa4c107bb2ab92213f33c",
"assets/images/%25E6%259F%25AF%25E5%259F%25BA.gif": "af8e6841767c61e9367d852697ac9aec",
"assets/images/%25E6%25B3%25A2%25E6%2596%25AF%25E7%258C%25AB.webp": "c4545f07e5b8bd129c9288d81d06435b",
"assets/images/%25E7%258B%25B8%25E8%258A%25B1%25E7%258C%25AB.webp": "fa064ed1c9c36825f141856ec67beb12",
"assets/images/%25E7%25A7%258B%25E7%2594%25B0%25E7%258A%25AC.webp": "7b57d883834f1746dba021aaa1f1145b",
"assets/images/%25E7%25BE%258E%25E7%259F%25AD.webp": "6602813e35da1b006b207ecb64c94119",
"assets/images/%25E8%258B%25B1%25E7%259F%25AD.webp": "030b65c311e5c9dfcab051cdb58888cf",
"assets/images/%25E8%2590%25A8%25E6%2591%25A9%25E8%2580%25B6.webp": "f77118da3208ac01bdf2b95e8114ff48",
"assets/images/%25E8%2597%258F%25E7%258D%2592.webp": "7a3dc94eb2eb16fe457451b121426f5c",
"assets/images/%25E8%25B4%25B5%25E5%25AE%25BE%25E7%258A%25AC.webp": "c21f58b2432d778ef74586d5847e16dc",
"assets/images/%25E8%25BE%25B9%25E7%2589%25A7.webp": "d9db834055f41497aa5424a06bb8e34c",
"assets/images/%25E9%2587%2591%25E6%25AF%259B.webp": "b9f022df973f5909716ca762ef0d42e2",
"assets/NOTICES": "95d2d7a1f15efe055dcaa2ba53a3f87b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/Resources/Data.json": "aaaeaad18265be91e1fa93f8b9101c14",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "f0052080fa736c391b93755654e9435d",
"/": "f0052080fa736c391b93755654e9435d",
"main.dart.js": "c92e32258cc2e5351dd914706a877a15",
"manifest.json": "cde9142d636147c1410e02dd6308a360",
"version.json": "d3d4cfdfd2397cf2446612e4cf179d9f"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
