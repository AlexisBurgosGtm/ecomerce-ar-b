
var CACHE = 'arjs';
const staticAssets = [  
  './index.js',
  './favicon.png',
  './index.html',
   './sw.js'
];

self.addEventListener('install', function(evt) {
  console.log('Service worker instalado');
  evt.waitUntil(caches.open(CACHE).then(function (cache) {
    cache.addAll(staticAssets);
  }));
  
	
});

self.addEventListener('fetch', async evt => {

  var req = evt.request.clone();
  if (navigator.onLine){
    if (req.clone().method == "GET") {
      //evt.respondWith(fromCache(evt.request));
      evt.waitUntil(update(evt.request));
    }
  }else{
    if (req.clone().method == "GET") {
      evt.respondWith(fromCache(evt.request));
      //evt.waitUntil(update(evt.request));
    }
  }
  
});


function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request);
  });
}

async function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request)
        .then(function (response) {
          return cache.put(request, response.clone())
                      .then(function () {
                        //console.log('Cache actualizado');
          return response;
      });
    });
  });
}
    


//registra el tag del background sync
self.addEventListener('ready',async function(swRegistration) {
  return swRegistration.sync.register('sendSalesSync');
});

self.addEventListener('sync', function(event) {
  if (event.tag == 'sendSalesSync') {
    //event.waitUntil(dbSendPedidosBackground(GlobalUsuario).then(()=>{funciones.NotificacionPersistent('Enviando pedidos en background','sincronización sw')  }));
  }
});