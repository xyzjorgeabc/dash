function controller(e){
    const inputType = e.type === 'keydown';
    const key = +e.which; 
    if(key === 17 || key === 37 || key === 38 || key === 39 || key === 40){
        map.controller[key] = inputType;
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