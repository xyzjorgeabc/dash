import { Vector, overlap } from "./utils";

export class Sprite {

  public type: number;
  public resource: HTMLImageElement | string;
  public pos: Vector;
  public static: boolean;
  public size: Vector;
  public scale: Vector;
  public rotation: number;
  public static TEXT_SPRITE = 1;
  public static IMAGE_SPRITE = 2;

  constructor(tipo: number, resrc: HTMLImageElement | string, pos: Vector,
  statico?: boolean, size?: Vector, scale?: Vector, rotation?: number) {

    this.type = tipo;
    this.resource = resrc;
    this.pos = pos;
    this.static = statico;
    this.size = size;
    this.scale = scale || new Vector(1,1);
    this.rotation = rotation || 0;

  }
}

export class Render {
  public scale: number;
  public canvas: HTMLCanvasElement;
  public cx: CanvasRenderingContext2D;
  private sprites: Set<Sprite>;
  public focusOffset: Vector;

  constructor(){
    this.canvas = document.getElementById('c') as HTMLCanvasElement;
    this.cx = this.canvas.getContext("2d");
    this.cx.font = '50px Pixeleris';
    this.cx.fillStyle = 'white';
    this.sprites = new Set();
    this.focusOffset = new Vector(this.canvas.width / 2, this.canvas.height / 2);
    this.scale = 50;
    window.addEventListener('resize' , () => {
      this.set_canvas_size();
    })
    this.set_canvas_size();
  }
  get size (){
    return new Vector(this.canvas.width, this.canvas.height);
  }
  private set_canvas_size() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  public add_sprite (sprite: Sprite) {
    if(!sprite.resource){
      debugger;
    }
    const canvas = {
      pos: new Vector(this.focusOffset.x + this.canvas.width / 2, this.focusOffset.y + this.canvas.height / 2),
      size: new Vector(this.canvas.width, this.canvas.height)
    };
    if ( sprite.static || overlap( canvas.pos, canvas.size, sprite.pos, sprite.size ) ) {
      this.sprites.add(sprite);
    }
  }
  public set_focus(sprite: Sprite, speed: Vector){

    const focused_area = {
      pos: new Vector (this.focusOffset.x + this.canvas.width/2, this.focusOffset.y + this.canvas.height/2 ),
      size: new Vector(200, 300)
    };

    if ( !overlap(focused_area.pos, focused_area.size, sprite.pos, sprite.size) ) {

      const diff = sprite.pos.clone().subs(focused_area.pos);
      let xdistance: number;
      let ydistance: number;

      if ( Math.abs(diff.x) > focused_area.size.x ) {
        if ( Math.abs(speed.x) >= 0.001 && Math.sign(speed.x) === Math.sign(diff.x)) xdistance = speed.x;
        else if (diff.x !== 0 ) xdistance = diff.x < 0 ? -5 : 5;
      }

      if( Math.abs(diff.y) > focused_area.size.y ) {
        if ( Math.abs(speed.y) >= 0.001 && Math.sign(speed.y) === Math.sign(diff.y) ) ydistance = speed.y;
        else if (diff.y !== 0 ) ydistance = diff.y < 0 ? -5 : 5;
      }

      this.focusOffset.add(new Vector(xdistance, ydistance));
    }

  }
  public render(){
    this.cx.font = '50px Pixeleris';
    this.cx.fillStyle = 'white';
    this.cx.clearRect(0,0,this.canvas.width, this.canvas.height);
    this.cx.save();
    this.sprites.forEach((sprite: Sprite) => {
      let rPos: Vector;
      if (sprite.static) {
        rPos = sprite.pos.clone();
      }
      else {
        rPos = new Vector(sprite.pos.x - this.focusOffset.x, sprite.pos.y - this.focusOffset.y);
      }
      this.cx.save();
      this.cx.translate(rPos.x, rPos.y);
      this.cx.scale(sprite.scale.x, sprite.scale.y);
      this.cx.rotate(sprite.rotation);

      if (sprite.type === Sprite.TEXT_SPRITE) {
        this.cx.fillText(sprite.resource as string, -sprite.size.x/2, -sprite.size.y/2, 4000);
      }
      else if (sprite.type === Sprite.IMAGE_SPRITE) {
        this.cx.drawImage(sprite.resource as HTMLImageElement, -sprite.size.x/2, -sprite.size.y/2, sprite.size.x, sprite.size.y);
      }
      // dbug
      //this.cx.fillStyle = "#FF0000";
      //this.cx.fillRect(-(sprite.size.x / 2), -(sprite.size.y / 2), sprite.size.x, sprite.size.y);
      this. cx.fillRect(-4, -4, 4, 4);

      this.cx.restore();
    });

    this.cx.restore();
    this.sprites.clear();
  }
}

export const RENDER = new Render();