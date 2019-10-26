class Mapa {

  constructor(){
      eventManager = new EventManager();
      this.EventManager = eventManager;
      this.viewport = {
          scale: 50,
          size: new Vector(c.width, c.height),
          c: c,
          ctx: c.getContext("2d"),
          offSet: new Vector(0,0),
      };
      this.viewport.ctx.font = '50px Pixeleris';
      this.viewport.ctx.fillStyle = 'white';
      this.map = {
          lvl: LVL1,
          size: new Vector(LVL1[0].length * this.viewport.scale, LVL1.length * this.viewport.scale)
      };
      this.entities = {
          dash: void 0,
          blocks: new Set(),
          coins: new Set(),
          spikes: new Set(),
          bouncers: new Set(),
          minions: new Set(),
          bosses: new Set(),
          throwables: new Set(),
          meteors: new Set()
      };
      this.state = null;
      this.EventManager.shotEventEmiter.suscribir((pos) => {
          this.entities.throwables.add(new Throwable(pos.x, pos.y, this.entities.dash.pos, ASSETS.fire));
      });
      this.EventManager.deadEventEmiter.suscribir(() => {
          
      });
      this.EventManager.pauseEventEmiter.suscribir(() => {
          this.state = PAUSE;
      });
      this.EventManager.resumeEventEmiter.suscribir(() => {
          this.state = RESUME;
      });
  }
  detectCollision(){
      const dash       = this.entities.dash;
      const spikes     = this.entities.spikes;
      const throwables = this.entities.throwables;
      const coins      = this.entities.coins;
      const blocks     = this.entities.blocks;
      const bouncers   = this.entities.bouncers;
      const minions    = this.entities.minions;

      throwables.forEach(function(throwable){
        if(dash.isCollidingWith(throwable)){
          throwables.delete(throwable);
          dash.hp--;
        }
      });
      spikes.forEach( function(spike){
        dash.isCollidingWith(spike);
      } );
      coins.forEach(function(coin){
        if (dash.isCollidingWith(coin)){
          coins.delete(coin);
          dash.coins++;
        }
      });
      minions.forEach(function(minion) {
        dash.isCollidingWith(minion);
      });
      blocks.forEach(function(block){
        dash.isCollidingWith(block);
      });
      bouncers.forEach(function(bouncer) {
        dash.isCollidingWith(bouncer);
      });
  }
  drawEntities(){
    const ctx     = this.viewport.ctx;
    const scale   = this.viewport.scale;
    const pad     = new Vector(this.viewport.size.x/3,75);
    const offSet  = this.viewport.offSet;
    const dashPos = this.entities.dash.pos;
    const offSetVelX = Math.abs(this.entities.dash.vel.x) || this.entities.dash.maxVel.x;
    const offSetVelY = Math.abs(this.entities.dash.vel.y) || this.entities.dash.maxVel.y;
    const maxOffSetX = this.map.size.x * scale - this.viewport.size.x;
    const maxOffSetY = this.map.size.y * scale - this.viewport.size.y;
    
    if(dashPos.x > this.viewport.size.x - pad.x + offSet.x && offSet.x < maxOffSetX){
        offSet.x += offSetVelX;
    }
    else if(dashPos.x < offSet.x + pad.x && offSet.x > 0){
        offSet.x -= offSetVelX;
    }
    if(dashPos.y > this.viewport.size.y - pad.y + offSet.y && offSet.y < maxOffSetY ){
        offSet.y += offSetVelY;
    }
    else if(dashPos.y < pad.y + offSet.y && offSet.y > 0){
        offSet.y -= offSetVelY;
    }
    
    ctx.clearRect(0,0,this.viewport.size.x, this.viewport.size.y);
    ctx.save();
    ctx.translate(-offSet.x, -offSet.y);
    this.entities.spikes.forEach(function(spike){
      spike.draw(ctx);
    });
    this.entities.coins.forEach(function (coin) {
      coin.draw(ctx);
    });
    this.entities.blocks.forEach( function(block) {
      block.draw(ctx);
    });
    this.entities.bouncers.forEach(function(bouncer){
      bouncer.draw(ctx);
    });
    this.entities.minions.forEach(function(minion){
      minion.draw(ctx);
    });
    this.entities.bosses.forEach(function(boss){
      boss.draw(ctx);
    });
    this.entities.throwables.forEach(function(throwable){
      throwable.draw(ctx);
    });
    this.entities.dash.draw(ctx);

    ctx.restore();
    this.drawGUI();
  }
  drawGUI(){
      const ctx   = this.viewport.ctx;
      const hp    = this.entities.dash.hp;
      const coins = this.entities.dash.coins;
      const pxl   = Math.floor(Math.log10(coins + 1));
      for(let i = 1; i <= hp; i++){
          ctx.drawImage(ASSETS.hp, this.viewport.size.x - (this.viewport.scale * i + 20),
              this.viewport.size.y - this.viewport.scale, this.viewport.scale, this.viewport.scale);
      }
      ctx.drawImage(ASSETS.coin[1], this.viewport.size.x - (this.viewport.scale + 20),
              this.viewport.size.y - this.viewport.scale * 2, this.viewport.scale, this.viewport.scale);
      

      ctx.fillText(coins + "X", this.viewport.size.x - (this.viewport.scale * 2 + 20 + 25 * pxl),
              this.viewport.size.y - this.viewport.scale);

  }
  readMap(map){

      const base  = Math.ceil(this.viewport.scale/2);
      const scale = this.viewport.scale;

      for(let i = 0; i < map.length; i++){
          
          for(let ind = 0; ind < map[i].length; ind++){
              const type  = map[i][ind];
              if(type){

                  switch(type){

                      case 1:
                          //bitmasking
                          let bits = 0;

                          if(map[i-1] && map[i-1][ind] === 1) bits++;
                          if(map[i][ind-1] === 1) bits+=2;
                          if(map[i][ind+1] === 1) bits+=4;
                          if(map[i+1] && map[i+1][ind] === 1) bits+=8;
                          else if(map[i+1] === undefined) bits+=8;
                          
                          if(bits === 15){
                              if(map[i-1] && map[i-1][ind-1] !== 1 &&
                                  map[i-1] && map[i-1][ind+1] !== 1
                                  ) bits--;
                              else if(map[i-1] && map[i-1][ind-1] !== 1)bits++;
                              else if(map[i-1] && map[i-1][ind+1] !== 1)bits+=2;
                              else if(map[i+1] && map[i+1][ind+1] !== 1)bits+=3;
                              else if(map[i+1] && map[i+1][ind-1] !== 1)bits+=4;
                          }
                          this.entities.blocks.add(new Block(base + ind * scale, base + i * scale, bits));
                          break; 
                      case 2:
                          this.entities.spikes.add(new spike(base + ind * scale, base + i * scale));
                          break;
                      case 3:
                          this.entities.bouncers.add(new Bouncer(base + ind * scale, base + i * scale));
                          break; 
                      case 4:
                          this.entities.coins.add(new Coin(base + ind * scale, base + i * scale));
                          break;
                      case 5:
                          this.entities.meteors.add(new Entity(base + ind * scale, base + i * scale));
                          break;
                      case 6:
                          const displacement = Minion.calcMaxDisplacement(map, scale, ind ,i);
                          this.entities.minions.add(new Minion(base + ind * scale, base + i * scale, displacement));
                          break;
                      default: //boss
                          this.entities.bosses.add(new Genie(base + ind * scale, base + i * scale));
                          break;
                  }
              }
          } 
      }
      
      this.entities.dash = new Dash(base, base + (map.length - 2) * scale);
  }   
  activateBoss(){
      this.entities.bosses.forEach((boss)=>{
        if(boss.state === null){
          const diff = this.viewport.offSet.diffTo(boss.pos);
          if(diff.x < this.viewport.size.x - 100) boss.activate();
      }
      });
  }
  frame(){
      this.activateBoss();
      if(this.state !== PAUSE){
          this.detectCollision();
          this.entities.dash.outOfMapDetection(this.map.size);
          this.entities.coins.forEach(function(coin){
            coin.frame();
          });
          this.entities.bosses.forEach(function(boss){
            boss.frame();
          });
          this.entities.minions.forEach(function(minion){
            minion.frame();
          });
          this.entities.throwables.forEach(function(throwable){
            throwable.frame();
          });
          this.entities.dash.frame();
      }
      this.drawEntities();
  }
}