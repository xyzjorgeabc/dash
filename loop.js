function controller(e){

    const inputType = e.type === 'keydown';
    const key = +e.which; 
    
    if(key === 17 || key === 37 || key === 38 || key === 39 || key === 40){

        b.controller[key] = inputType;

    }
}

document.addEventListener('keydown', controller);
document.addEventListener('keyup', controller);
document.addEventListener('click', function(){
    if(b.state === "ready"){
        b.readMap(LVL1);
        requestAnimationFrame(loop);
        b.state = "on"
    }
});



function loop(){
    requestAnimationFrame(loop);
    b.frame();
}
