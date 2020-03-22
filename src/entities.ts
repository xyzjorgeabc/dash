import { Vector, Emisor, Timer } from "./utils";
import { assets } from './assets';
import { Sprite } from './render';
import { GenieBehaviorState } from './behavior';

export class StaticEntity {

  public pos: Vector;
  public size: Vector;
  constructor(pos_x: number, pos_y: number, size_x: number, size_y: number){
    this.pos = new Vector(pos_x, pos_y);
    this.size = new Vector(size_x, size_y);
  }
}
 
export class AliveEntity {

  public pos: Vector;
  public size: Vector;
  public vel: Vector;
  public max_vel: Vector;
  public state: number;
  public hp: number;
  public death_event_emiter: Emisor;
  public static STATE_SLEEP = 1;
  public static STATE_AWAKEN = 2;
  public static STATE_DEAD = 3;
  public static acc: Vector = new Vector(.5 ,.5);
  constructor (pos_x: number, pos_y: number, size_x: number, size_y: number, hp: number) {
    this.pos = new Vector(pos_x, pos_y);
    this.size = new Vector(size_x, size_y);
    this.vel = new Vector(0,0);
    this.max_vel = new Vector(5,5);
    this.hp = hp;
    this.death_event_emiter = new Emisor();
    this.state = AliveEntity.STATE_SLEEP;
  }
}

export class Bouncer extends StaticEntity {

  constructor(pos_x: number, pos_y: number) {
    super(pos_x, pos_y, 50, 25);
  }
  public get_sprite (): Sprite {
    return new Sprite(Sprite.IMAGE_SPRITE, assets.bouncer, this.pos.clone(), false, this.size.clone());
  }
}

export class Spike extends StaticEntity {

  constructor(pos_x: number, pos_y: number) {
    super(pos_x, pos_y, 50, 50);
  }

  public get_sprite (): Sprite {
    return new Sprite(Sprite.IMAGE_SPRITE, assets.spike, this.pos.clone(), false, this.size.clone());
  }
}

export class Block extends StaticEntity {

  private bits: number;

  constructor (pos_x: number, pos_y: number, bits: number) {
    super(pos_x, pos_y, 50, 50);
    this.bits = bits;
  }
  public get_sprite(): Sprite {
    return new Sprite(Sprite.IMAGE_SPRITE, assets.block[this.bits], this.pos.clone(), false, this.size.clone());
  }
}

export class Platform extends AliveEntity {
  public acc: Vector;
  public initial_pos: Vector;
  public max_displacement: Vector;
  public type: number;
  public static vertical = 1;
  public static horizontal = 2;
  constructor (pos_x: number, pos_y: number, max_disp: Vector, type: number) {
    super(pos_x, pos_y, 50, 25, 1);
    this.initial_pos = this.pos.clone();
    this.type = type;
    this.max_displacement = max_disp;
    if (Platform.vertical) this.acc = new Vector(0, .5);
    else this.acc = new Vector( .5, 0);
  }
  public get_sprite (): Sprite {
    return new Sprite(Sprite.IMAGE_SPRITE, assets.bouncer, this.pos.clone(), false, this.size.clone());
  }
}

export class Coin extends AliveEntity {
  
  private coin_side_timer: Timer;
  public acc: Vector;
  constructor (pos_x: number, pos_y: number ) {

    super(pos_x, pos_y, 50, 50, 1);
    this.max_vel.x = 1;
    this.max_vel.y = 1;
    this.coin_side_timer = new Timer();
    this.acc = new Vector(0, .05);
  }
  public get_sprite (): Sprite {

    const FRAME_TIME = 300;
    const FRAMES_COUNT = 6;
    let frame_i = Math.ceil(this.coin_side_timer.elapsed / FRAME_TIME);
    
    if ( frame_i > FRAMES_COUNT ) {
      this.coin_side_timer.restart();
      frame_i = 1;
    }
    return new Sprite(Sprite.IMAGE_SPRITE, assets.coin[frame_i], this.pos.clone(), false, this.size.clone());

  }
}

export class Dash extends AliveEntity {

  public attack_timer: Timer;
  public shield_timer: Timer;
  public inmunity_timer: Timer;
  public coins: number;
  public static ATTACK_COOLDOWN = 500;
  public static SHIELD_COOLDOWN = 500;
  public static INMUNITY_COOLDOWN = 1000;

  constructor (pos_x: number, pos_y: number) {
    super(pos_x, pos_y, 45, 45, 5);
    this.inmunity_timer = new Timer();
    this.attack_timer = new Timer();
    this.shield_timer = new Timer();
    this.coins = 0;
  }
  public get_sprite (): Sprite {

    const img = this.attack_timer.elapsed < 101 ? assets.dash : assets.dash_attack;

    return new Sprite(
      Sprite.IMAGE_SPRITE,
      this.attack_timer.elapsed < 101 ? assets.dash_attack : assets.dash,
      this.pos.clone(),
      false,
      this.size.clone());
  }
  public hit (hp: number) {
    if (this.inmunity_timer.elapsed > Dash.INMUNITY_COOLDOWN) {
      this.hp -= hp;
      this.inmunity_timer.restart();
    }
  }
  public heal (hp: number) :void {
    this.hp += hp;
  }
}

export class Throwable extends AliveEntity {
  private rotation: number;
  private animation_timer: Timer;

  constructor (pos_x: number, pos_y: number, relativeVel: Vector) {

    super(pos_x, pos_y, 50, 50 , 1);
    this.rotation = Math.atan2(relativeVel.y, relativeVel.x) + Vector.BASE_RAD;
    this.max_vel.x = 15;
    this.max_vel.y = 15;
    this.vel.x = this.max_vel.x * relativeVel.x;
    this.vel.y = this.max_vel.y * relativeVel.y;
    this.animation_timer = new Timer();
  }
  public get_sprite(): Sprite {

    const FRAME_TIME = 200;
    const FRAMES_COUNT = 6;
    let frame_i = Math.floor((this.animation_timer.elapsed / FRAME_TIME) + 1 );
    if ( frame_i >= FRAMES_COUNT ) {
      this.animation_timer.restart();
      frame_i = 1;
    }
    return new Sprite(
      Sprite.IMAGE_SPRITE,
      assets.fire_ball[frame_i],
      this.pos.clone(),
      false,
      this.size.clone(),
      new Vector(1,1),
      this.rotation);
  }
}

export abstract class Enemy extends AliveEntity {

  public attack_damage: number;

  constructor (pos_x: number, pos_y: number, size_x: number, size_y: number, hp: number, AD: number) {
    super(pos_x, pos_y, size_x, size_y, hp);
    this.attack_damage = AD;
  }
}

export abstract class Boss extends Enemy {

  public attack_cooldown: Timer;
  public initial_pos: Vector;
  public last_transition_timer: Timer;
  public last_attack_timer: Timer;
  public attack_delta_pos: Vector;
  public behavior_state: GenieBehaviorState;
  public behavior_initalized: GenieBehaviorState;
  protected dialogue: string[];
  constructor (pos_x: number, pos_y: number, dialogue: string[]) {
    super(pos_x, pos_y, 100, 100, 7, 2);
    this.dialogue = dialogue;
    this.initial_pos = new Vector(pos_x, pos_y);
    this.attack_cooldown = new Timer();
    this.last_attack_timer = new Timer();
    this.last_transition_timer = new Timer();
    this.attack_delta_pos = null;
    this.behavior_state = GenieBehaviorState.Charge_to_dash;
    this.behavior_initalized = null;
  }
  abstract get_sprite(): Sprite;
}

export class Genie extends Boss {

  constructor (pos_x: number, pos_y: number) {
    super(pos_x, pos_y, ['hello', 'bye']);
  }
  public get_sprite(): Sprite {
    return new Sprite(
      Sprite.IMAGE_SPRITE,
      this.vel.x > 0 ? assets.genie_right : assets.genie_left,
      this.pos.clone(),
      false,
      this.size.clone());
  }
}

export class Minion extends Enemy {

  public displacement: {left_max: number, right_max: number};

  constructor (pos_x: number, pos_y: number, displacement?: {left_max: number, right_max: number}) {
    super(pos_x, pos_y, 50, 50, 1, 1);
    this.vel.x = 3;
    this.displacement = displacement || null;
  }
  public get_sprite (): Sprite {
    return new Sprite(
      Sprite.IMAGE_SPRITE,
      this.vel.x >= 0 ? assets.minion_right : assets.minion_left,
      this.pos.clone(),
      false,
      this.size.clone());
  }
  static calcMaxDisplacement(map: any, scale: number, pos_x: number, pos_y: number): {left_max: number, right_max: number}{

    let left_max: number;
    let right_max: number;

    for(let i = pos_x - 1; !left_max && pos_x > 0; i--){
        if(map[pos_y][i] === 1)
            left_max = i * scale;
    }
    for(let i = pos_x + 1; !right_max && i < map[pos_y].length; i++){
        if(map[pos_y][i] === 1)
            right_max = i * scale;
    }

    return {left_max: left_max + scale, right_max: right_max};
  }
}

export type Generic_Entity = Bouncer | Spike | Block | Coin | Dash | Throwable | Genie | Minion;
