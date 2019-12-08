const ASSET_DIR = './sprites/';
function read_sprite(nombre_archivo) {
  return fetch(ASSET_DIR + nombre_archivo)
  .then(function(resp) {
      if (resp.ok) {
        return resp.blob({type: 'image/png'});
      }
  })
  .then(function (blob) {
    return URL.createObjectURL(blob);
  });
}

function overlap(ent1, ent2) {

  const ent1left  = ent1.pos.x - ent1.size.x/2;
  const ent1right = ent1.pos.x + ent1.size.x/2;
  const ent1top   = ent1.pos.y - ent1.size.y/2;
  const ent1bot   = ent1.pos.y + ent1.size.y/2;

  const ent2left  = ent2.pos.x - ent2.size.x/2;
  const ent2right = ent2.pos.x + ent2.size.x/2;
  const ent2top   = ent2.pos.y - ent2.size.y/2;
  const ent2bot   = ent2.pos.y + ent2.size.y/2;

  return ent1left  <= ent2right &&
         ent1right >= ent2left &&
         ent1top   <= ent2bot &&
         ent1bot   >= ent2top;
}

class Emisor {

  constructor () {
    this.listeners = new Set();
  }
  suscribir (func) {
    this.listeners.add(func);
    return {
      desuscribir: () => {
        this.listeners.delete(func);
      }
    };
  }
  emitir(data) {
    this.listeners.forEach((func)=>{
      func(data);
    });
  }
}

class EventManager {
  constructor() {
      this.shotEventEmiter = new Emisor();
      this.deadEventEmiter = new Emisor();
      this.pauseEventEmiter = new Emisor();
      this.resumeEventEmiter = new Emisor();
  }
}

class Vector{

  constructor(x = 0,y = 0){
      this.x = x;
      this.y = y;
  }
  get baseR(){
      return Math.PI * 2 ;
  }
  add(v){
      this.x += v.x;
      this.y += v.y;
  }
  subs(v){
      this.x -= v.x;
      this.y -= v.y;
  }
  mult(x = 1, y = 1){
      this.x *= x;
      this.y *= y;
  }
  fix(n){
      this.x = +this.x.toFixed(n);
      this.y = +this.y.toFixed(n);
  }
  diffTo(v){
      const x = v.x - this.x;
      const y = v.y - this.y;
      return new Vector(x,y);
  }
  relativeVelTo(v){
      const diff = this.diffTo(v);
      const rDir = Math.atan2(diff.y, diff.x) + this.baseR;
      return new Vector(Math.cos(rDir), Math.sin(rDir));
  }
  clone(){
      return new Vector(this.x,this.y);
  }
}

class Timer {
  constructor(){
    this.start = Date.now();
  }
  restart(){
    this.start = Date.now();
  }
  get elapsed () {
    return Date.now() - this.start;
  }
}

class Controller {
  constructor(){
    this.jump = false;
    this.attack = false;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
  }
}