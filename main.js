function controller(e){
  const pressed = e.type === 'keydown';
  const key = +e.which;

  switch (key) {
    case 17:
      controller.attack = pressed;
    break;
    case 37:
      controller.left = pressed;
    break;
    case 38:
      controller.up = pressed;
    break;
    case 39:
      controller.right = pressed;
    break;
    case 40:
      controller.down = pressed;
    break;
  }

  if(key === 17 || key === 37 || key === 38 || key === 39 || key === 40){
    map.controller[key] = pressed;
    console.log(key);
  }
}

document.addEventListener('keydown', controller);
document.addEventListener('keyup', controller);
document.addEventListener('click', function(){
  if(map.state === READY){
    map.readMap(LVL1);
    requestAnimationFrame(loop);
    map.state = PLAYING;
  }
});

function loop(){
  requestAnimationFrame(loop);
  map.frame();
}

let eventManager;
const map = new Mapa();
ASSETS.load().then(function(){
  map.state = READY;
});