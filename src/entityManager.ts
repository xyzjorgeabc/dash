import { Dash, Block, Coin, Spike, Bouncer, Minion, Boss, Throwable, AliveEntity, StaticEntity, Generic_Entity, Genie, Platform } from './entities';
import { QuadTree } from './quadtree';
import { Vector } from './utils';
import { Dash_forces, Charge_to_dash, Shot_burst, Passive_shooting, Death_explosion, Bounce, Watch_over, GenieBehaviorState, Throw, Levitation } from './behavior';

export class EntityManager {
  public dash: Dash;
  public blocks: Set<Block>;
  public coins: Set<Coin>;
  public spikes: Set<Spike>;
  public bouncers: Set<Bouncer>;
  public minions: Set<Minion>;
  public bosses: Set<Boss>;
  public throwables: Set<Throwable>;
  public platform: Set<any>;
  public quad_tree: QuadTree;
  
  constructor (map: number[][], scale: number) {
    this.quad_tree = new QuadTree(new Vector(map[0].length * scale, map.length * scale));
    this.dash = null;
    this.blocks = new Set();
    this.coins = new Set();
    this.spikes = new Set();
    this.bouncers = new Set();
    this.minions = new Set();
    this.bosses = new Set();
    this.throwables = new Set();
    this.platform = new Set();
    this.read_map(map, scale);
  }
  public getAllTypes(): Set<Block | Coin | Spike | Bouncer | Minion | Boss | Throwable> {
    const tmp = [].concat(
      Array.from(this.platform),
      Array.from(this.blocks),
      Array.from(this.coins),
      Array.from(this.spikes),
      Array.from(this.bouncers),
      Array.from(this.minions),
      Array.from(this.bosses),
      Array.from(this.throwables),
      Array.from(this.platform)
    );
    return new Set(tmp);
  }
  public get_static_entities (): Set<StaticEntity> {
    const tmp = [].concat(
      Array.from(this.blocks),
      Array.from(this.spikes),
      Array.from(this.bouncers)
    );
    return new Set(tmp);
  }
  public get_alive_entities (): Set<AliveEntity> {
    const tmp = [].concat(
      this.dash,
      Array.from(this.coins),
      Array.from(this.minions),
      Array.from(this.bosses),
      Array.from(this.throwables),
      Array.from(this.platform)
    );
    return new Set(tmp);

  }
  public add_entity(ent: Generic_Entity) {

    if (ent instanceof Block) {
      this.blocks.add(ent);
    }
    else if (ent instanceof Coin) {
      ent.death_event_emiter.suscribir(()=>{this.coins.delete(ent);});
      this.coins.add(ent);
    }
    else if (ent instanceof Spike) {
      this.spikes.add(ent);
    }
    else if (ent instanceof Bouncer) {
      this.bouncers.add(ent);
    }
    else if (ent instanceof Minion) {
      this.minions.add(ent);
    }
    else if (ent instanceof Boss) {
      this.bosses.add(ent);
    }
    else if (ent instanceof Throwable) {
      this.throwables.add(ent);
    }
  }
  public update(){

    this.bosses.forEach((boss: Boss) => {
      if ((boss.pos.x - this.dash.pos.x) < 800 ) boss.state = Boss.STATE_AWAKEN;
    });
    this.platform.forEach(Levitation.step);
    
    this.coins.forEach((actor: Coin) => {
      if (actor.state === Coin.STATE_DEAD) this.coins.delete(actor);
      else Bounce.step(actor);
    })
    this.minions.forEach((actor: Minion) => {
      if (actor.state === Minion.STATE_DEAD) this.minions.delete(actor);
      else Watch_over.step(actor);
    });
    this.bosses.forEach((boss) => {
      if ( boss instanceof Genie ){
        switch (boss.behavior_state) {
          case GenieBehaviorState.Charge_to_dash:
            Charge_to_dash.step(boss, this);
          break;
          case GenieBehaviorState.Shot_burst:
            Shot_burst.step(boss, this);
          break;
          case GenieBehaviorState.Passive_shooting:
            Passive_shooting.step(boss, this);
          break;
          case GenieBehaviorState.Death_explosion:
            Death_explosion.step(boss, this);
        }
      }
    });
    this.throwables.forEach((actor: Throwable) => {
      if (actor.state === Coin.STATE_DEAD) this.throwables.delete(actor);
      else Throw.step(actor);
    });
    this.getAllTypes().forEach((ent: Generic_Entity) => {
      this.quad_tree.insert(ent);
    });
    Dash_forces.step(this.dash, this);
    this.quad_tree.flush();
  }
  private read_map(map: number[][], scale: number){

    const base = Math.ceil(scale/2);

    this.dash = new Dash(base * 4, base + (map.length - 2) * scale);
    this.dash = this.dash;
    
    for(let i = 0; i < map.length; i++){

      for(let ind = 0; ind < map[i].length; ind++){
        const type = map[i][ind];
        let ent: any;
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
                ent = new Block(base + ind * scale, base + i * scale, bits);
                this.blocks.add(ent);
                break;
              case 2:
                ent = new Spike(base + ind * scale, base + i * scale);
                this.spikes.add(ent);
                break;
              case 3:
                ent = new Bouncer(base + ind * scale, base + i * scale);
                this.bouncers.add(ent);
                break;
              case 4:
                ent = new Coin(base + ind * scale, base + i * scale);
                this.coins.add(ent);
                break;
              case 5:
                  this.platform.add(new Platform(base + ind * scale, base + i * scale, new Vector(200,200), Platform.vertical ));
                break;
              case 6:
                const displacement = Minion.calcMaxDisplacement(map, scale, ind ,i);
                ent = new Minion(base + ind * scale, base + i * scale, displacement);
                this.minions.add(ent);
                break;
              default: //boss
                ent = new Genie(base + ind * scale, base + i * scale);
                this.bosses.add(ent);
                break;
          }
        }
      }
    }
  }
}

