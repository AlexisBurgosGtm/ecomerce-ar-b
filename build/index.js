
var m = document.querySelector("a-marker")
m.addEventListener("markerFound", (e)=>{
console.log("found")
//var v = document.querySelector('#mivideo').play();
window.navigator.vibrate(200);

})
m.addEventListener("markerLost", (e)=>{
console.log("lost")
//var v = document.querySelector('#mivideo').pause();
window.navigator.vibrate(200);
})


function getImagenPiso(codigo){
  let imgPiso1 = document.getElementById('imgPiso1');
  let imgPiso2 = document.getElementById('imgPiso2');
  let imgPiso3 = document.getElementById('imgPiso3');
  let imgPiso4 = document.getElementById('imgPiso4');
  
  switch (codigo.toString()) {
    case "1":
      imgPiso1.style = "visibility:visible";
      imgPiso2.style = "visibility:hidden";
      imgPiso3.style = "visibility:hidden";
      imgPiso4.style = "visibility:hidden";  
      break;
    case "2":
      imgPiso1.style = "visibility:hidden";
      imgPiso2.style = "visibility:visible";
      imgPiso3.style = "visibility:hidden";
      imgPiso4.style = "visibility:hidden";  
      break;
    case "3":
      imgPiso1.style = "visibility:hidden";
      imgPiso2.style = "visibility:hidden";
      imgPiso3.style = "visibility:visible";
      imgPiso4.style = "visibility:hidden";  
      break;
    case "4":
      imgPiso1.style = "visibility:hidden";
      imgPiso2.style = "visibility:hidden";
      imgPiso3.style = "visibility:hidden";
      imgPiso4.style = "visibility:visible";  
      break;
    default:
      break;
  };
  
};


document.getElementById("btn1").addEventListener("click", (e)=>{
getImagenPiso( 1);
});
document.getElementById("btn2").addEventListener("click", (e)=>{
getImagenPiso(2);
});
document.getElementById("btn3").addEventListener("click", (e)=>{
getImagenPiso(3);
});
document.getElementById("btn4").addEventListener("click", (e)=>{
getImagenPiso(4);
});

let btnCerrarModal = document.getElementById('btnCerrarModal');
btnCerrarModal.addEventListener('click',()=>{
  $('#modalMenu').modal('hide');
})

let btnMenu = document.getElementById('btnMenu');
btnMenu.addEventListener('click',()=>{
  //$('#modalMenu').modal('show');

  document.getElementById('root').innerHTML = `
      <a-scene embedded arjs="debugUIEnabled: false;" vr-mode-ui="enabled: false">   
        <a-marker preset="hiro">
          <a-image src="./piso2.jpg" id="imgPiso2" style="visibility: hidden;"></a-image>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
  `

})


function install_sw(){
  function InicializarServiceWorkerNotif(){
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () =>
     navigator.serviceWorker.register('sw.js')
      .then(registration => console.log('Service Worker registered'))
      .catch(err => 'SW registration failed'));
    };
    
    requestPermission();
  }
  
  if ('Notification' in window) {};
  
  function requestPermission() {
    if (!('Notification' in window)) {
      funciones.Aviso('Notification API not supported!');
      return;
    }
    
    Notification.requestPermission(function (result) {
      //$status.innerText = result;
    });
  }

  InicializarServiceWorkerNotif();
  
  const options = {
      body : titulo,
      icon: "../favicon.png",
      vibrate: [1,2,3],
    }
    //image: "../favicon.png",
       if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
        console.log('Persistent Notification API not supported!');
        return;
      }
      
      try {
        navigator.serviceWorker.getRegistration()
          .then(reg => 
                  reg.showNotification(msn, options)
              )
          .catch(err => console.log('Service Worker registration error: ' + err));
      } catch (err) {
        console.log('Notification API error: ' + err);
      }
    
}