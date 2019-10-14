class Entity {

  constructor(x,y,size){

      this.pos  = new Vector(x,y);
      this.size = new Vector(size, size);
      this.sprites = [];

  }
}

class Movable extends Entity{

  constructor(x,y,size){
      super(x,y,size);
      this.vel    = new Vector();
      this.maxVel = new Vector(5,5);
      this.defAcc = new Vector();
  }
  outOfMapDetection(v){
      // devuelve boolean;
  }
  drawImage(ctx){
      ctx.drawImage(this.img,this.pos.x - this.size.x/2, this.pos.y - this.size.y/2, this.size.x, this.size.y);
  }
}

class Bouncer extends Entity{

  constructor(x, y){

      super(x,y,50);
      this.img = ASSETS.bouncer;
      this.pos.y += this.size.y / 2;
      this.pos.y -= this.size.y / 5;
      this.size.y /= 2;
      this.points = {
          p1: new Vector(this.pos.x - this.size.x/2, this.pos.y - this.size.y/2),
          p2: new Vector(this.pos.x + this.size.x/2, this.pos.y - this.size.y/2),
          p3: new Vector(this.pos.x + this.size.x/2, this.pos.y + this.size.y/2),
          p4: new Vector(this.pos.x - this.size.x/2, this.pos.y + this.size.y/2)
      };
  }
  draw(ctx){
      ctx.drawImage(this.img,this.points.p1.x, this.points.p1.y, this.size.x, this.size.y);
  }
}

class spike extends Entity {

  constructor(x,y){
      super(x,y,50);

      this.points = {
          p1: new Vector(x - this.size.x/2, y + this.size.y/2),
          p2: new Vector(x, y - this.size.y/2),
          p3: new Vector(x + this.size.x/2, y + this.size.y/2)
      };
  }
  draw(ctx){
      ctx.beginPath();
      ctx.moveTo(this.points.p1.x, this.points.p1.y);
      ctx.lineTo(this.points.p2.x, this.points.p2.y);
      ctx.lineTo(this.points.p3.x, this.points.p3.y);
      ctx.fill();
      ctx.closePath();
  }
  frame(){

  }
}

class Block extends Entity{

  constructor(x,y, bits){
      super(x,y,50);
      this.img = ASSETS.block[bits];
      this.points = {
          p1: new Vector(x - this.size.x/2, y - this.size.y/2),
          p2: new Vector(x + this.size.x/2, y - this.size.y/2),
          p3: new Vector(x + this.size.x/2, y + this.size.y/2),
          p4: new Vector(x - this.size.x/2, y + this.size.y/2)
      };
  }
  get rectDiag(){
      const x = Math.pow(this.size.x/2, 2);
      const y = Math.pow(this.size.y/2, 2);

      return Math.sqrt(x+y);
  }
  draw(ctx){
      ctx.drawImage(this.img,this.points.p1.x, this.points.p1.y, this.size.x, this.size.y);
  }
}


class Coin extends Movable{

  constructor(x, y){

      super(x,y, 50);
      this.sprite = ASSETS.coin;
      this.spriteIndex = 1;
      this.acc = new Vector(0, 0.05);
      this.maxVel = new Vector(1,1);
  }
  get img(){
      if(Math.ceil(this.spriteIndex) > this.sprite.length-1) this.spriteIndex = 1;
      this.spriteIndex += 0.05;
      return this.sprite[Math.floor(this.spriteIndex)];
  }
  applyForces(){
      
      if(Math.abs(this.vel.x) >= this.maxVel.x)
          this.acc.x = -this.acc.x;

      if(Math.abs(this.vel.y) >= this.maxVel.y)
          this.acc.y = -this.acc.y;
      
      this.vel.add(this.acc);
      this.pos.add(this.vel);
  }
  draw(ctx){

      ctx.drawImage(this.img, this.pos.x - this.size.x/2, this.pos.y - this.size.y/2, this.size.x, this.size.y);
  }
  frame(){

      this.applyForces();

  }
}

class Dash extends Movable{
  constructor(x,y){
      super(x,y,50);
      this.imgs = ASSETS.dash;
      this.defAcc = new Vector(0.5,0.5);
      this.collision = {
          top: null,
          bottom: null,
          right: null,
          left: null,
          is: function is(){
              if(this.top !== null || this.bottom !== null || this.right !== null || this.left !== null) return true;
              else return false;
          },
          reset: function(){
              this.top    = null;
              this.bottom = null;
              this.right  = null;
              this.left   = null;
          }
      };
      this.attackTimer = new Timer();
      this.imnunityTimer = new Timer();
      this.hp = 5;
      this.coins = 0;
  }   
  get acc(){
      return new Vector(0.5,0.5);
  }
  isCollidingWith(ent){
      const v    = this.pos;
      const dv   = v.clone(); dv.add(this.vel); dv.add(this.acc);
      const ev   = ent.pos;
      const pad  = this.size.x/2;
      const epadY = ent.size.y/2;
      const epadX = ent.size.x/2;
      const dvleft   = dv.x - pad;
      const dvright  = dv.x + pad;
      const dvtop    = dv.y - pad;
      const dvbottom = dv.y + pad;
      
      const evleft   = ev.x - epadX;
      const evright  = ev.x + epadX;
      const evtop    = ev.y - epadY;
      const evbottom = ev.y + epadY;

      const isColliding = dvright  >= evleft &&
                          dvleft   <= evright &&
                          dvbottom >= evtop &&
                          dvtop    <= evbottom;
      
      if(isColliding) {
          const left   = this.vel.x <= 0 && dvright >= evright && Math.abs(dv.y - ev.y) < (pad + epadY);
          const right  = this.vel.x >= 0 && dvright <= evright && Math.abs(dv.y - ev.y) < (pad + epadY);
          const bottom = this.vel.y >= 0 && dvtop <= evtop && Math.abs(dv.x - ev.x) < (pad + epadX);
          const top    = this.vel.y <= 0 && dvbottom >= evbottom && Math.abs(dv.x - ev.x) < (pad + epadX);
          const xdiff =  Math.abs(ev.x - dv.x);
          const ydiff =  Math.abs(ev.y - dv.y); 
          // refactor? simplicidad.
          if(xdiff > ydiff){

              if(right && !(ent instanceof Movable) && !this.collision.right){
                  if(ent instanceof Bouncer) void 0;
                  else this.onCollision("right", ev.x - v.x - (pad + epadX), true);
              }
              if(left && !(ent instanceof Movable) && !this.collision.left){
                  if(ent instanceof Bouncer) void 0;
                  else this.onCollision("left", ev.x - v.x + (pad + epadX), true);
              }
          }else {

              if(top && !(ent instanceof Movable) && !this.collision.top){
                  if(ent instanceof Bouncer) this.onCollision("top", -10, false);
                  else this.onCollision("top", ev.y - v.y + (pad + epadY), true);
              } 
              if(bottom && !(ent instanceof Movable) && !this.collision.bottom){
                  if(ent instanceof Bouncer) this.onCollision("bottom", -12, false);
                  else this.onCollision("bottom", ev.y - v.y - (pad + epadY), true);
              }
          }
          if ( ent instanceof Throwable || ent instanceof Minion) {
            if (this.imnunityTimer.elapsed > 1000) {
              this.hp--;
              this.imnunityTimer.restart();
            }
          }
          return right||bottom||top||left;
      }
 }
  onCollision(side, mtd, stop){
      switch(side){
          case "top":
              this.collision.top = stop;
              this.vel.y = mtd;
              break;
          case "bottom":
              this.collision.bottom = stop;
              this.vel.y = mtd;
              break;
          case "right":
              this.collision.right = stop;
              this.vel.x = mtd;
              break;
          case "left":
              this.collision.left = stop;
              this.vel.x = mtd;
              break;
      }
  }
  outOfMapDetection(v){
      const dPos = new Vector(this.pos.x + this.vel.x, this.pos.y + this.vel.y); dPos.add(this.acc);
      const diff = dPos.diffTo(v);
      const pad  = new Vector(this.size.x,this.size.y); pad.mult(0.5,0.5);
      
      if(Math.abs(diff.x) <= pad.x){
          this.onCollision("right", diff.x - pad.x + this.vel.x);
      }
      if(Math.abs(diff.y) <= pad.y){
          if(diff.y >= 0) this.onCollision("bottom", diff.y - pad.y + this.vel.y);
          else this.onCollision("top", diff.y - pad. y + this.vel.y);
      }
  
  }
  attack(){
      if(this.attackTimer.elapsed > 500){
          this.attackTimer.restart();
      }
  }
  applyForces(){

      this.applyFriction();
      this.applyGravity();
      
      if(controller.up) this.jump();
      if(controller.attack) this.attack();

      let xDir = 0;
      let yDir = 0;
      const acc = this.acc;
      if(Math.abs(this.vel.x) + acc.x < this.maxVel.x){
          if(controller.left) xDir = -1;
          else if(controller.right) xDir = 1;
      }
      if(Math.abs(this.vel.y) + acc.y > this.maxVel.y){
          if(controller.up) yDir = 1;
      }
      
      acc.mult(xDir, yDir);
      this.vel.add(acc);
      this.pos.add(this.vel);
  }
  applyGravity(){
      if(this.collision.bottom) return void 0;
      const gravity = new Vector(0, 0.4);
      this.vel.add(gravity);
  }
  applyFriction(){
      this.vel.mult(0.97);
  }
  jump(){
      if(this.collision.bottom !== null) this.vel.y = -9;
  }
  getRectDiag(){

      const x = Math.pow(this.size.x/2, 2);
      const y = Math.pow(this.size.y/2, 2);
      
      return Math.sqrt(x+y);
  }
  get img(){
      if(this.attackTimer.elapsed < 101) return this.imgs[1];
      else return this.imgs[0];
  }
  draw(ctx){
      
      this.drawImage(ctx);
      ctx.save();
      ctx.translate(Math.ceil(this.pos.x), Math.ceil(this.pos.y));
      ctx.restore();
  }
  frame(){
     
      this.applyForces();
      this.collision.reset();
  }
  
}

class Throwable extends Movable{

  constructor(x, y, delta){
      super(x,y,50);
      const rDir  = this.pos.relativeVelTo(delta);
      this.rotation = Math.atan2(rDir.y, rDir.x);
      this.maxVel = new Vector(10,10);
      this.vel    = new Vector(this.maxVel.x * rDir.x, this.maxVel.y * rDir.y);
      this.sprite = ASSETS.fire;
      this.spriteI = 0;
  }
  get spriteIndex(){
      if(Math.ceil(this.spriteI) === 6) this.spriteI = 0;
      this.spriteI += 0.2;
      return Math.floor(this.spriteI);
  }
  draw(ctx){

      ctx.save();
      ctx.translate(Math.ceil(this.pos.x), Math.ceil(this.pos.y));
      ctx.rotate(this.rotation);
      
      const i = this.spriteIndex;
      ctx.drawImage(this.sprite, this.sprite.height * i, 0, this.sprite.height, this.sprite.height, 0 - this.size.x, 0 - this.size.y, 
                  this.size.x*2, this.size.y*2);
      ctx.restore();
  }
  applyForces(){
      this.pos.add(this.vel);
  }
  frame(){
      this.applyForces();
  }
}

class Boss extends Movable {

  constructor(x, y){
      super(x, y, 100);
      this.state = null;
      this.attackTimer = new Timer();
  }
  activate(){
      this.state = "active";
      eventManager.pauseEventEmiter.emitir();
      this.displayDialogue();
  }
  attack(){
      if(this.attackTimer.elapsed > 1000){
          this.attackTimer.restart();
          eventManager.shotEventEmiter.emitir(this.pos);
      }
  }
  displayDialogue() {
      const dialogues = this.dialogue;
      let i = 0;
      function d(){
          console.log(dialogues[i]);
          i++;
          if(i >= dialogues.length)
              setTimeout(function(){
                eventManager.resumeEventEmiter.emitir();
              }, 2000);
          else setTimeout(d, 2000);
      }
      setTimeout(d, 2000);

  }
}

class Genie extends Boss {
  
  constructor(x, y){
      super(x,y);
      this.acc = new Vector();
      this.defAcc =  new Vector(0.05, 0.05);
      this.basePos = this.pos.clone();
      this.imgs = ASSETS.genie;
      this.dialogue = [
          "hello",
          "bye",
      ];
  }
  draw(ctx){
      this.drawImage(ctx);
  }
  get img(){
      if(this.vel.x > 0) return this.imgs[1];
      else  return this.imgs[0];
  }
  applyForces(){
      const diff = this.pos.diffTo(this.basePos);
      if(diff.x <= -150){
          if(this.vel.x > 0){
              this.acc.x = -this.defAcc.x;
          }
      }
      else{
          this.acc.x = this.defAcc.x;
      }
      
      if(Math.abs(diff.y) >= 20){
          this.acc.y = -this.acc.y;
      }

      this.vel.add(this.acc);
      this.pos.add(this.vel);
  }
  frame(){
      if(this.state === null) return void 0;
      this.applyForces();
      this.attack();
  }
}

class Minion extends Movable{

  constructor(x, y, displacement){

      super(x,y, 50);
      this.vel = new Vector(2,0);
      this.maxVel = new Vector(2,0);
      this.imgs = ASSETS.minion;
      this.displacement = displacement; 
  }
  static calcMaxDisplacement(map, scale, x, y){

      let leftMax;
      let rightMax;

      for(let i = x - 1; !leftMax && x > 0; i--){
          if(map[y][i] === 1)
              leftMax = i * scale;
      }
      for(let i = x + 1; !rightMax && i < map[y].length; i++){
          if(map[y][i] === 1)
              rightMax = i * scale;
      }

      return {leftMax: leftMax + scale, rightMax: rightMax};
  }
  draw(ctx){
      //super.draw(ctx)
      this.drawImage(ctx);
  }
  get img(){
      if(this.vel.x > 0) return this.imgs[1];
      else  return this.imgs[0];
  }
  applyForces(){

      if(this.vel.x > 0 ){
          if(this.pos.x + this.size.x/2 >= this.displacement.rightMax)
              this.vel.x = -this.maxVel.x;
          else if(this.pos.x + this.size.x/2 + this.vel.x > this.displacement.rightMax){
              this.vel.x = this.displacement.rightMax - this.pos.x - this.size.x/2;
          }
      }
      else if(this.vel.x < 0){
          if(this.pos.x - this.size.x/2 <= this.displacement.leftMax)
              this.vel.x = this.maxVel.x;
          else if(this.pos.x  - this.size.x/2 + this.vel.x < this.displacement.leftMax)
              this.vel.x = this.displacement.leftMax - this.pos.x + this.size.x/2;
      }
      this.pos.add(this.vel);

  }
  frame(){
      if(this.state === null) return void 0;
      this.applyForces();
  }
}