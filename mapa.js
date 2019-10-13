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
          Dash: void 0,
          block: [],
          coin: [],
          spike: [],
          bouncer: [],
          minion: [],
          boss: [],
          throwable: [],
          meteor: []
      };
      this.controller = {
          37: false,
          38: false,
          39: false,
          40: false,
          17: false
      };
      this.assets = {
          dash: [],
          spike: void 0,
          coin: [],
          block: [],
          bouncer: void 0,
          minion: [],
          blueGenie:[],
          pots: [],
          hp: void 0,
          fire: void 0
      };
      this.state = null;
      this.EventManager.shotEventEmiter.suscribir((pos) => {
          this.entities.throwable.push(new Throwable(pos.x, pos.y, this.entities.dash.pos, ASSETS.fire));
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
      const dash      = this.entities.dash;
      const spike     = this.entities.spike;
      const throwable = this.entities.throwable;
      const coin      = this.entities.coin;
      const block     = this.entities.block;
      const bouncer   = this.entities.bouncer;
      
      for(let i = 0; i < throwable.length; i++){
          if(dash.isCollidingWith(throwable[i])){
              dash.hp--;
              this.entities.throwable.splice(i, 1);
              i--;
          }
      }
      for(let i = 0; i < spike.length; i++){
          if(dash.isCollidingWith(spike[i]));
      }
      for(let i = 0; i < coin.length; i++){
          if (dash.isCollidingWith(coin[i])){
              this.entities.coin.splice(i, 1);
              dash.coins++;
              i--;
          }
      }
      for(let i = 0; i < block.length; i++){
          if (dash.isCollidingWith(block[i]));
      }
      for(let i = 0; i < bouncer.length; i++){
          if (dash.isCollidingWith(bouncer[i]));
      }
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
      
      for(let i = 0; i < this.entities.spike.length; i++){
          this.entities.spike[i].draw(ctx);
      }

      for(let i = 0; i < this.entities.coin.length; i++){
          this.entities.coin[i].draw(ctx);
      }

      for(let i = 0; i < this.entities.block.length; i++){
          this.entities.block[i].draw(ctx);
      }

      for(let i = 0; i < this.entities.bouncer.length; i++){
          this.entities.bouncer[i].draw(ctx);
      }
      
      for(let i = 0; i < this.entities.minion.length; i++){
          this.entities.minion[i].draw(ctx);
      }
      
      for(let i = 0; i < this.entities.boss.length; i++){
          this.entities.boss[i].draw(ctx);
      }

      for(let i = 0; i < this.entities.throwable.length; i++){
          this.entities.throwable[i].draw(ctx);
      }

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
                          this.entities.block.push(new Block(base + ind * scale, base + i * scale, bits));
                          break; 
                      case 2:
                          this.entities.spike.push(new spike(base + ind * scale, base + i * scale));
                          break;
                      case 3:
                          this.entities.bouncer.push(new Bouncer(base + ind * scale, base + i * scale));
                          break; 
                      case 4:
                          this.entities.coin.push(new Coin(base + ind * scale, base + i * scale));
                          break;
                      case 5:
                          this.entities.meteor.push(new Entity(base + ind * scale, base + i * scale));
                          break;
                      case 6:
                          const displacement = Minion.calcMaxDisplacement(map, scale, ind ,i);
                          this.entities.minion.push(new Minion(base + ind * scale, base + i * scale, displacement));
                          break;
                      default: //boss
                          this.entities.boss.push(new Genie(base + ind * scale, base + i * scale));
                          break;
                  }
              }
          }
      }
      
      this.entities.dash = new Dash(base, base + (map.length - 2) * scale);
  }   
  activateBoss(){
      const bosses = this.entities.boss;
      
      for(let i = 0; i < bosses.length; i++){

          if(bosses[i].state === null){
              const diff = this.viewport.offSet.diffTo(bosses[i].pos);
              if(diff.x < this.viewport.size.x - 100) bosses[i].activate();
          }

      }
  }
  frame(){
      this.activateBoss();
      if(this.state !== PAUSE){
          this.detectCollision();
          this.entities.dash.outOfMapDetection(this.map.size);
          for(let i = 0; i < this.entities.coin.length; i++){
              this.entities.coin[i].frame();
          }
          for(let i = 0; i < this.entities.boss.length; i++)
              this.entities.boss[i].frame();
          
          for(let i = 0; i < this.entities.minion.length; i++)
              this.entities.minion[i].frame();
  
          for(let i = 0; i < this.entities.throwable.length; i++)
              this.entities.throwable[i].frame();
          
          this.entities.dash.frame(this.controller);
      }
      this.drawEntities();
  }
}