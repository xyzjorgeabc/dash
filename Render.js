class Sprite {
  constructor(tipo, resrc, pos, statico, size, scale, rotation){
    this.type = tipo;
    this.resource = resrc;
    this.pos = pos;
    this.static = statico;
    this.size = size;
    this.scale = scale || new Vector(1,1);
    this.rotation = rotation || 0;
  }
}

Sprite.TEXT_SPRITE = 1;
Sprite.IMAGE_SPRITE = 2;

class Render {
  constructor(canvas){
    this.canvas = canvas;
    this.cx = canvas.getContext("2d");
    this.cx.font = '50px Pixeleris';
    this.cx.fillStyle = 'white';
    this._sprites = new Set();
    this.focusOffset = new Vector(0,0);
    this.focusObjetivo = new Vector(0,0);
  }
  addSprite (sprite) {
    if(!sprite.resource){
      debugger;
    }
    const canvas = {
      pos: new Vector(this.focusOffset.x + this.canvas.width / 2, this.focusOffset.y + this.canvas.height / 2),
      size: new Vector(this.canvas.width, this.canvas.height)
    };
    if ( sprite.static || overlap( canvas, sprite ) ) {
      this._sprites.add(sprite);
    }
  }
  clearSprites(){
    this._sprites.clear();
  }
  setFocus(sprite){
    /*  const focused_area = {
      pos: new Vector (this.focusOffset.x + this.canvas.width/2, this.focusOffset.y + this.canvas.height/2 ),
      size: new Vector(this.canvas.width - 200, this.canvas.height - 200)
    };
    if ( !overlap(focused_area, sprite) ) {
      this.focusOffset = sprite.pos;
    }*/
    const focusPos = new Vector(this.canvas.width/2, this.canvas.height - 75);
    this.focusOffset = sprite.pos.clone();
    this.focusOffset.subs(focusPos);
    
  }
  render(){
    this.cx.clearRect(0,0,this.canvas.width, this.canvas.height);
    this.cx.save();
    this._sprites.forEach((sprite) => {
      let rPos;
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
        this.cx.fillText(sprite.resource, -sprite.size.x/2, -sprite.size.y/2, 4000);
      }
      else if (sprite.type === Sprite.IMAGE_SPRITE) {
        this.cx.drawImage(sprite.resource, -sprite.size.x/2, -sprite.size.y/2, sprite.size.x, sprite.size.y);
      }
      // dbug
      this. cx.fillStyle = "#FF0000";
      this. cx.fillRect(-4, -4, 4, 4);
      
      this.cx.restore();
    });
    this.cx.restore();
    this.clearSprites();
  }
}
