import { Timer, Vector, get_valid_acc } from './utils';
import { EntityManager } from './entityManager';
import { AliveEntity, Throwable, Boss, Bouncer, Coin, Minion, Dash, StaticEntity, Spike, Platform, Enemy} from './entities';
import { CONTROLLER } from './controller';

export abstract class Behavior {
  abstract step(actor: AliveEntity, entity_manager?: EntityManager): Behavior;
}

export enum GenieBehaviorState {
  Charge_to_dash,
  Shot_burst,
  Passive_shooting,
  Death_explosion,
  Stomp_dash
}

export class Charge_to_dash {
  constructor () {
  }
  public static step(actor: Boss, entity_manager: EntityManager): Behavior {
    if (actor.state !== Boss.STATE_AWAKEN) return void 0;
    if (actor.behavior_initalized !== GenieBehaviorState.Charge_to_dash) Charge_to_dash.behavior_init(actor, entity_manager);
    if (actor.last_transition_timer.elapsed < 2000) return void 0;
    
    const relative_vel = actor.pos.relativeVelTo(actor.attack_delta_pos);
    relative_vel.mult(actor.max_vel.x, actor.max_vel.y);
    relative_vel.mult(4,4);
    const diff = actor.pos.diffTo(actor.attack_delta_pos);
    
    if( Math.abs(diff.x) <= Math.abs(relative_vel.x) && Math.abs(diff.y) <= Math.abs(relative_vel.y) ) {
      actor.vel = new Vector(0,0);
      actor.pos = actor.initial_pos.clone();
      actor.behavior_state = GenieBehaviorState.Shot_burst;
    }
    else {
      actor.vel = relative_vel;
      actor.pos.add(actor.vel);
    }
  }
  private static behavior_init(actor: Boss, entity_manager: EntityManager): void {
    const dash = entity_manager.dash;
    actor.last_transition_timer.restart();
    actor.attack_delta_pos = dash.pos.clone();
    actor.initial_pos = actor.pos.clone();
    actor.behavior_initalized = GenieBehaviorState.Charge_to_dash;
  }
}

export class Shot_burst {
  constructor () {
  }
  public static step (actor: Boss, entity_manager: EntityManager): void {
    if (actor.behavior_initalized !== GenieBehaviorState.Shot_burst) Shot_burst.behavior_init(actor);
    if (actor.last_transition_timer.elapsed < 1000) return void 0;
    if (actor.last_transition_timer.elapsed > 3000) actor.behavior_state = GenieBehaviorState.Passive_shooting;
    
    if ( actor.attack_cooldown.elapsed > 200 ) {
      entity_manager.throwables.add(new Throwable(
        actor.pos.x,
        actor.pos.y,
        actor.pos.relativeVelTo(entity_manager.dash.pos)
        )
      );
      actor.attack_cooldown.restart();
    }
  }
  private static behavior_init(actor: Boss): void {
    actor.last_transition_timer.restart();
    actor.behavior_initalized = GenieBehaviorState.Shot_burst;
  }
}

export class Passive_shooting {
  constructor () {
  }
  public static step (actor: Boss, entity_manager: EntityManager): void {
    if (actor.behavior_initalized !== GenieBehaviorState.Passive_shooting) Passive_shooting.behavior_init(actor);
    if (actor.last_transition_timer.elapsed < 1000) return void 0;
    if (actor.last_transition_timer.elapsed > 8000) actor.behavior_state = GenieBehaviorState.Death_explosion;

    if ( actor.attack_cooldown.elapsed > 1200 ) {
      entity_manager.throwables.add(new Throwable(
        actor.pos.x,
        actor.pos.y,
        actor.pos.relativeVelTo(entity_manager.dash.pos)
        )
      );
      actor.attack_cooldown.restart();
    }
  }
  private static behavior_init(actor: Boss): void {
    actor.last_transition_timer.restart();
    actor.behavior_initalized = GenieBehaviorState.Passive_shooting;
  }
}

export class Death_explosion {
  constructor (){
  }
  public static step(actor: Boss, entity_manager: EntityManager): void {
    if (actor.last_transition_timer.elapsed < 2000) return void 0;

    const total_rads = 6.2832 + 1.57;
    const rad_pad = 0.3927;
    for ( let i = 0; i < total_rads; i += rad_pad ) {
      const delta = new Vector(Math.cos(i), Math.sin(i));
      entity_manager.add_entity(new Throwable(actor.pos.x, actor.pos.y, delta));
    }
    actor.behavior_state = GenieBehaviorState.Stomp_dash;
  }
}

// Platform

export class Levitation {

  constructor() {
  }
  public static step (actor: Platform): void {

    const diff = actor.pos.diffTo(actor.initial_pos);
    if (actor.type === Platform.vertical) {
      if(Math.abs(diff.y) >= Math.abs(actor.max_displacement.y))
      if (diff.y > 0) actor.acc.y = Platform.acc.y;
      else actor.acc.y = -Platform.acc.y;
    }
    else if (actor.type === Platform.horizontal) {
      if(Math.abs(diff.x) >= Math.abs(actor.max_displacement.x))
      if (diff.x > 0) actor.acc.y = Platform.acc.x;
      else actor.acc.x = -Platform.acc.x;
    }

    actor.acc = get_valid_acc(actor, actor.acc);

    actor.vel.add(actor.acc);
    actor.pos.add(actor.vel);
  }
}

// Coin

export class Bounce {
  constructor() {
  }
  public static step (actor: Coin): void {

    if(Math.abs(actor.vel.y) > actor.max_vel.y)
      actor.acc.y = -actor.acc.y;

    actor.vel.add(actor.acc);
    actor.pos.add(actor.vel);
  }
}
// Throwable
export class Throw {
  constructor () {
  }
  public static step (actor: Throwable): void {
    actor.pos.add(actor.vel);
  }
}

// Minion
export class Watch_over {

  constructor () {
  }
  public static step (actor: Minion): void {
    
    if(actor.vel.x > 0 ){
      if(actor.pos.x + actor.size.x/2 >= actor.displacement.right_max)
        actor.vel.x = -actor.max_vel.x;
      else if(actor.pos.x + actor.size.x/2 + actor.vel.x > actor.displacement.right_max){
        actor.vel.x = actor.displacement.right_max - actor.pos.x - actor.size.x/2;
      }
    }
    else if(actor.vel.x < 0){
      if(actor.pos.x - actor.size.x/2 <= actor.displacement.left_max)
        actor.vel.x = actor.max_vel.x;
      else if(actor.pos.x - actor.size.x/2 + actor.vel.x < actor.displacement.left_max)
        actor.vel.x = actor.displacement.left_max - actor.pos.x + actor.size.x/2;
    }
    actor.pos.add(actor.vel);
  }
}

// Dash

class Collisions {
  public top: number | null;
  public bottom: number | null;
  public left: number | null;
  public right: number | null;
  constructor () {
    this.bottom = null;
    this.top = null;
    this.left = null;
    this.right = null;
  }
}

export class Dash_forces {

  constructor() {
  }
  public static step ( actor: Dash, entity_manager: EntityManager): void {

    const collisions = Dash_forces.check_collisions(actor, entity_manager);

    if (collisions.bottom !== null) {
      actor.pos.y = collisions.bottom;
      actor.vel.y = actor.vel.y > 0 ? 0 : actor.vel.y;
    }
    if (collisions.top !== null) {
      actor.pos.y = collisions.top;
      actor.vel.y = actor.vel.y < 0 ? 0 : actor.vel.y;
    }
    if (collisions.left !== null) {
      actor.pos.x = collisions.left;
      actor.vel.x = actor.vel.x < 0 ? 0 : actor.vel.x;
    }
    if (collisions.right !== null) {
      actor.pos.x = collisions.right;
      actor.vel.x = actor.vel.x > 0 ? 0 : actor.vel.x;
    }
    
    actor.pos.add(actor.vel);
    let xDir = 0;
    let yDir = 0;
    let acc = Dash.acc.clone();

    if (CONTROLLER.attack && (actor.attack_timer.elapsed >= Dash.ATTACK_COOLDOWN)) {
      actor.attack_timer.restart();
    }
    if (CONTROLLER.shield && actor.shield_timer.elapsed >= Dash.SHIELD_COOLDOWN) {
      actor.shield_timer.restart();
    }
    if(Math.abs(actor.vel.x) + acc.x < actor.max_vel.x){
      if(CONTROLLER.left && (collisions.left === null)) xDir = -1;
      else if(CONTROLLER.right && (collisions.right === null)) xDir = 1;
    }

    if(Math.abs(actor.vel.y) + acc.y < actor.max_vel.y && (collisions.top === null) ){
      if(CONTROLLER.up) yDir = 1;
    }
    if (CONTROLLER.up && (collisions.bottom !== null) && (collisions.top === null)) {
      acc.y = -12
    }
    acc.mult(xDir, yDir);
    if(collisions.bottom === null) {
      const gravity = new Vector(0, .5);
      acc.add(gravity);
    }
    acc = get_valid_acc(actor, acc);
    actor.vel.add(acc);
    actor.vel.mult(0.97, 1);
    
  }
  private static check_collisions(dash: Dash, entity_manager: EntityManager): Collisions {

    const collision = new Collisions();
    const entities = entity_manager.quad_tree.get_nearby_entities(dash);

    entities.forEach(function (actor) {


      const actor_size = actor.size.clone().add(dash.size);
      const dash_delta_pos = dash.pos.clone().add(dash.vel).round();
      const actor_top_left = actor.pos.clone();
      actor_top_left.x -= actor_size.x / 2;
      actor_top_left.y -= actor_size.y / 2;
      const actor_bottom_right = actor.pos.clone();
      actor_bottom_right.x += actor_size.x / 2;
      actor_bottom_right.y += actor_size.y / 2;

      const is_colliding = (
        dash_delta_pos.x >= actor_top_left.x &&
        dash_delta_pos.x <= actor_bottom_right.x &&
        dash_delta_pos.y >= actor_top_left.y &&
        dash_delta_pos.y <= actor_bottom_right.y
      );
      if (is_colliding) {

        if (actor instanceof Enemy) {
          Dash_forces.on_enemy_collision(dash, actor);
          return void 0;
        }

        if (actor instanceof Coin) {
          Dash_forces.on_coin_collision(dash, actor);
          return void 0;
        }
        
        if (actor instanceof Throwable) {
          Dash_forces.on_throwable_collision(dash, actor);
          return void 0;
        }

        let x_pos = null;
        let y_pos = null;
        let left_x = null;
        let top_y = null;

        if(dash_delta_pos.x > actor.pos.x) {
          x_pos = Math.abs(actor_bottom_right.x - dash_delta_pos.x);
        }
        else {
          x_pos = Math.abs(actor_top_left.x - dash_delta_pos.x);
          left_x = true;
        }
        if(dash_delta_pos.y > actor.pos.y) {
          y_pos = Math.abs(actor_bottom_right.y - dash_delta_pos.y);
        }
        else {
          y_pos = Math.abs(actor_top_left.y - dash_delta_pos.y);
          top_y = true;
        }

        if (x_pos < y_pos) {
          if (left_x) {
            collision.right = actor_top_left.x;
          }
          else {
            collision.left = actor_bottom_right.x;
          }
        }
        else {
          if (top_y) {
            collision.bottom = actor_top_left.y;
          }
          else {
            collision.top = actor_bottom_right.y;
          }
        }
      }
    });
    return collision;
  }
  private static on_coin_collision(actor: Dash, coin: Coin) {
    actor.coins++;
    coin.state = Coin.STATE_DEAD;
  }
  private static on_enemy_collision (actor: Dash, enemy: Enemy) {
    if (actor.inmunity_timer.elapsed < Dash.INMUNITY_COOLDOWN) return;
    if (actor.attack_timer.elapsed < Dash.ATTACK_COOLDOWN) {
      enemy.hp--;
      if (enemy.hp <= 0) enemy.state = Enemy.STATE_DEAD;
    }
    else if (actor.shield_timer.elapsed > Dash.SHIELD_COOLDOWN) {
      actor.inmunity_timer.restart();
      actor.hp -= enemy.attack_damage;
    }
  }
  private static on_throwable_collision (actor: Dash, enemy: Throwable) {
    if (actor.shield_timer.elapsed > Dash.SHIELD_COOLDOWN) {
      actor.hp--;
    }
    enemy.state = Throwable.STATE_DEAD;
  }
}
