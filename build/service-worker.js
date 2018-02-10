"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/agency/build/index.html","d78fd6aa76d3fd89ab21dd034aef46a8"],["/agency/build/static/css/main.53e66c65.css","503c687fe3df6ec2591313859b7e9a20"],["/agency/build/static/js/main.2bb99c06.js","c41f38255d1311d7e5495dad739cea54"],["/agency/build/static/media/bg1.5dd0d62b.jpg","5dd0d62b79b3b7b1c0a6e2c041e23dc6"],["/agency/build/static/media/bg2.feb3c5f2.jpg","feb3c5f2ec8d6931b122dbf4b09a4908"],["/agency/build/static/media/bg3.0bfc61f1.jpg","0bfc61f1d8bc5dd91831963c19ed77c0"],["/agency/build/static/media/bg4.66dc5950.jpg","66dc595079770c3c202f05c34f7778bb"],["/agency/build/static/media/desktop1-1.292271a9.jpg","292271a9375aea06b22dbbca4ffd4c5f"],["/agency/build/static/media/desktop1-2.34d1719d.jpg","34d1719d6e121f9d0f2635b3a64b4acb"],["/agency/build/static/media/desktop1-3.32a75ee2.jpg","32a75ee20cca093d3531e9b014f304e3"],["/agency/build/static/media/desktop1-4.7e6b464f.jpg","7e6b464f72cd0d08877a85effea2199f"],["/agency/build/static/media/desktop2-1.9e99e707.jpg","9e99e707cc64956b07f703e0b1f9c261"],["/agency/build/static/media/desktop2-2.5bb93e43.jpg","5bb93e43c24b8ff1ca40ce89bcec38ac"],["/agency/build/static/media/desktop2-3.ff924f5b.jpg","ff924f5bfd06d46b4933920fd9b164d9"],["/agency/build/static/media/desktop2-4.31281ebe.jpg","31281ebe38179928c1397b967278392d"],["/agency/build/static/media/desktop3-1.ee85cf21.jpg","ee85cf2163660a4dfa3bddac13f64d09"],["/agency/build/static/media/desktop3-2.cc894119.jpg","cc894119fa55e408b5a64018d4956c1e"],["/agency/build/static/media/desktop3-3.9c2668ff.jpg","9c2668ff420f1cecb997b8d5c264fdfe"],["/agency/build/static/media/desktop3-4.3c992316.jpg","3c99231630c84ad7b6f839672632dd4c"],["/agency/build/static/media/desktop4-1.e2797187.jpg","e2797187550e465554901255c69d6131"],["/agency/build/static/media/desktop4-2.d78f1f92.jpg","d78f1f928a4eda00e210a8808b1154a6"],["/agency/build/static/media/desktop4-3.23539d83.jpg","23539d83065a0f4f5ca284509c1c0b1c"],["/agency/build/static/media/desktop4-4.c77ed979.jpg","c77ed97913ee8367ed4ff3187f3172a2"],["/agency/build/static/media/mobile1.aeda4ca1.png","aeda4ca1e5eb98bcc963830d6d235a9e"],["/agency/build/static/media/mobile2.4ff37d41.png","4ff37d4149e47c95f86ff6c78e9ce34e"],["/agency/build/static/media/mobile3.5811d583.png","5811d58301b82dc72a7d5cb00058dcec"],["/agency/build/static/media/mobile4.027afa28.png","027afa284c172eef2ce1010004732bd9"],["/agency/build/static/media/project1.676362d2.jpg","676362d258aad223672243ac3c83fddc"],["/agency/build/static/media/project2.41425ccc.jpg","41425ccc33075e8a3407e6d962f6e746"],["/agency/build/static/media/project3.e9933d65.jpg","e9933d65a3e02a17242eab4811ba0cf9"],["/agency/build/static/media/project4.eb5f888b.jpg","eb5f888bb9d5845e7a3b236d2a70cb40"],["/agency/build/static/media/web.3e5f47fc.png","3e5f47fca07f314447fe875cf548d7e8"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/agency/build/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});