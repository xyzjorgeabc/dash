function keyListener(e){
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
}
function setCanvasSize() {
  c.height = window.innerHeight;
  c.width  = window.innerWidth;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);
document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);
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
const controller = new Controller();
const map = new Mapa();
ASSETS.load().then(function(){
  map.state = READY;
});