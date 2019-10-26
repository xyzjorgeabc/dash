class Render {
  constructor(canvas){
    this.canvas = canvas;
    this.cx = canvas.getContext("2d");
    this._sprites = new Set();
    this.focusOffset = new Vector(0,0);
    this.focusObjetivo = null;
    this.focusVel = null;
  }
  addSprite (sprite) {
    const canvas = {
      pos: new Vector(this.focusOffset.x + this.canvas.width/2, this.focusOffset.y + this.canvas.height/2),
      size: new Vector(this.canvas.width, this.canvas.height)
    };
    if ( overlap( canvas, sprite) ) {
      this._sprites.add(sprite);
    }
  }
  clearSprites(){
    this._sprites.clear();
  }
  setFocus(sprite){
    const focused_area = {
      pos: new Vector (this.focusOffset.x + this.canvas.width/2, this.focusOffset.y + this.canvas.height/2 ),
      size: new Vector(this.canvas.width, this.canvas.height)
    };
    if (!overlap(focused_area, sprite)) {
      this.focusObjetivo = sprite;
    }
  }
  render(){
    this._sprites.forEach((sprite) => {
      const rPos = new Vector(this.sprite.pos.x - this.focusOffset.x, this.sprite.pos.y - this.focusOffset.y);
      this.cx.save();
      this.cx.translate(rPos.x, rPos.y);
      this.cx.scale(sprite.scale.x, sprite.scale.y);
      this.cx.rotation(sprite.rotation);
      this.cx.drawImage(sprite.image, rPos.x - sprite.size.x, rPos.y - sprite.size.y, rPos.x + sprite.size.x, rPos.y + sprite.size.y);
      this.cx.save();
    });
  }


}