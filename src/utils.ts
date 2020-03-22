import { AliveEntity, Generic_Entity } from "./entities";

const ASSET_DIR = './sprites';

export function read_sprite(nombre_archivo: string): Promise<HTMLImageElement> {

  return fetch (ASSET_DIR + nombre_archivo)
  .then(function (resp){

    if (resp.ok) return resp.blob();
  })
  .then(function (blob) {
    const blob_url = URL.createObjectURL(blob);
    const image = new Image();
    image.src = blob_url;
    return image;
  });

}

export function get_valid_acc(actor: AliveEntity, acc: Vector): Vector {
  const delta_vel = actor.vel.clone().add(acc);
  const valid_acc = acc.clone();
  if (Math.sign(acc.x) === Math.sign(actor.vel.x) && Math.abs(delta_vel.x) >= Math.abs(actor.max_vel.x)) valid_acc.x = 0;
  if (Math.sign(acc.y) === Math.sign(actor.vel.y) && Math.abs(delta_vel.y) >= Math.abs(actor.max_vel.y)) valid_acc.y = 0;
  return valid_acc;
}

export function overlap(ent1_pos: Vector, ent1_size: Vector, ent2_pos: Vector, ent2_size: Vector) {

  const ent1left  = ent1_pos.x - ent1_size.x/2;
  const ent1right = ent1_pos.x + ent1_size.x/2;
  const ent1top   = ent1_pos.y - ent1_size.y/2;
  const ent1bot   = ent1_pos.y + ent1_size.y/2;

  const ent2left  = ent2_pos.x - ent2_size.x/2;
  const ent2right = ent2_pos.x + ent2_size.x/2;
  const ent2top   = ent2_pos.y - ent2_size.y/2;
  const ent2bot   = ent2_pos.y + ent2_size.y/2;

  return ent1left  <= ent2right &&
         ent1right >= ent2left &&
         ent1top   <= ent2bot &&
         ent1bot   >= ent2top;
}

export interface Suscripcion {
  desuscrirbir: Function;
}

export class Emisor {

  private listeners: Set<Function>;

  constructor () {
    this.listeners = new Set();
  }
  public suscribir (func: Function): Suscripcion {
    this.listeners.add(func);
    return {
      desuscrirbir: () => {
        this.listeners.delete(func);
      }
    }
  }
  public emitir(data: any): void {
    this.listeners.forEach((func: Function)=>{
      func(data);
    });
  }
}

export class EventManager {
  private shotEventEmiter: Emisor;
  private deadEventEmiter: Emisor;
  private pauseEventEmiter: Emisor;
  private resumeEventEmiter: Emisor;

  constructor() {
    this.shotEventEmiter = new Emisor();
    this.deadEventEmiter = new Emisor();
    this.pauseEventEmiter = new Emisor();
    this.resumeEventEmiter = new Emisor();
  }
}

export class Vector {
  public x: number;
  public y: number;
  static BASE_RAD = Math.PI * 2;
  constructor(x = 0,y = 0){
      this.x = x;
      this.y = y;
  }
  public add(v: Vector){
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  public subs(v: Vector){
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  public mult(x = 1, y = 1){
    this.x *= x;
    this.y *= y;
    return this;
  }
  public fix(n: number){
    this.x = +this.x.toFixed(n);
    this.y = +this.y.toFixed(n);
    return this;
  }
  public diffTo(v: Vector){
      const x = v.x - this.x;
      const y = v.y - this.y;
      return new Vector(x,y);
  }
  public relativeVelTo(v: Vector){
      const diff = this.diffTo(v);
      const rDir = Math.atan2(diff.y, diff.x) + Vector.BASE_RAD;
      return new Vector(Math.cos(rDir), Math.sin(rDir));
  }
  public clone(){
      return new Vector(this.x,this.y);
  }
  public round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }
  public ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }  
  public floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }
}

export class Timer {
  private start: number;
  constructor(){
    this.start = Date.now();
  }
  public restart(){
    this.start = Date.now();
  }
  get elapsed (): number {
    return Date.now() - this.start;
  }
}

class Map_node {
  public entity: Generic_Entity;
  public pos: Vector;
  constructor (pos: Vector) {
    this.pos = pos;
  }
}

export class Map {
  private entities: Map_node[];
  constructor (size: Vector, scale: number) {
    const base = Math.floor(scale / 2);
    for (let i = 0; i < size.y; i++) {

      for (let j = 0; j < size.x; j++) {

        //this.entities.push(new Map_node());

      }

    }

  }

}