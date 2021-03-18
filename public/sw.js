const filesToCache = ["/", "stylesheets/style.css", "index.html"];

const staticCacheName = "FlickrCache";

self.addEventListener("install", (event) => {
  console.log("Attempting to install service worker and cache static assets");
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("Successfully installed sw");
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    })
  );
});

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches.open(staticCacheName).then(function (cache) {
//       return cache.match(event.request).then(function (response) {
//         if (response) {
//           console.log("SW: Cached data found, returning response");
//           return response;
//         } else {
//           console.log("SW: Cached data NOT found, falling back to network");

//           fetch(event.request).then(function (response) {
//             cache.put(event.request, response.clone());
//             return response;
//           });
//         }
//         // return (
//         //   response ||

//         // );
//       });
//     })
//   );
// });
