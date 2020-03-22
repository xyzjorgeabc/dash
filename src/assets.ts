import { read_sprite } from './utils';

class Assets {

  public dash: HTMLImageElement;
  public dash_attack: HTMLImageElement;
  public spike: HTMLImageElement;
  public coin: HTMLImageElement[];
  public block: HTMLImageElement[];
  public bouncer: HTMLImageElement;
  public minion_left: HTMLImageElement;
  public minion_right: HTMLImageElement;
  public genie_left: HTMLImageElement;
  public genie_right: HTMLImageElement;
  public red_pot: HTMLImageElement;
  public purple_pot: HTMLImageElement;
  public hp: HTMLImageElement;
  public fire: HTMLImageElement;
  public fire_ball: HTMLImageElement[];
  public is_loaded: boolean;

  constructor () {

    this.dash = null;
    this.dash_attack = null;
    this.spike = null;
    this.coin = [];
    this.block = [];
    this.bouncer = null;
    this.minion_left = null;
    this.minion_right = null;
    this.genie_left = null;
    this.genie_right = null;
    this.red_pot = null;
    this.purple_pot = null;
    this.hp = null;
    this.fire = null;
    this.fire_ball = [];
    this.is_loaded = false;
  }

  public load () {

    const cloud = read_sprite('/../../sprites/cloud.png')
    .then((img: HTMLImageElement) => {
      this.bouncer = img;
    });
    const redPot = read_sprite('/../../sprites/red_pot.png')
    .then((img: HTMLImageElement) => {
      this.red_pot = img;
    });
    const purplePot = read_sprite('/../../sprites/purple_pot.png')
    .then((img: HTMLImageElement) => {
      this.purple_pot = img;
    });
    const hp = read_sprite('/../../sprites/hp.png')
    .then((img: HTMLImageElement) => {
      this.hp = img;
    });
    const fire_ball = [];
    for(let i = 1; i <= 6; i++){
      fire_ball.push(read_sprite('/../../sprites/fireball' + i + '.png')
      .then( (img: HTMLImageElement) => {
        this.fire_ball[i] = img;
      }));
    }
    const fire = read_sprite('/../../sprites/flame_sprite.png')
    .then((img: HTMLImageElement) => {
      this.fire = img;
    });
    const ghost = read_sprite('/../../sprites/ghost.png')
    .then((img: HTMLImageElement) => {
      this.dash = img;
    });
    const ghostAttack = read_sprite('/../../sprites/ghost_attack.png')
    .then((img: HTMLImageElement) => {
      this.dash_attack = img;
    });
    const spike = read_sprite('/../../sprites/spike.png')
    .then((img: HTMLImageElement) => {
      this.spike = img;
    });
    const tiles = [];
    for(let i = 0; i <= 18; i++){
      tiles.push(read_sprite('/../../sprites/Tile' + i + '.png')
      .then( (img: HTMLImageElement) => {
        this.block[i] = img;
      }));
    }
    const coin = [];
    for(let i = 1; i <= 6; i++){
      coin.push(read_sprite("/../../sprites/coin" + i + ".png")
      .then((img: HTMLImageElement) => {
        this.coin[i] = img;
      }));
    }
    const minion = [];
    minion.push(read_sprite('/../../sprites/soul_left.png')
    .then((img: HTMLImageElement) => {
      this.minion_left = img;
    }));
    minion.push(read_sprite('/../../sprites/soul_right.png')
    .then((img: HTMLImageElement) => {
      this.minion_right = img;
    }));
    const genie = [];
    genie.push(read_sprite('/../../sprites/genie_red_left.png')
    .then((img: HTMLImageElement) => {
      this.genie_left = img;
    }));
    genie.push(read_sprite('/../../sprites/genie_red_right.png')
    .then((img: HTMLImageElement) => {
      this.genie_right = img;
    }));

    let allProm: Array<Promise<any>> = [cloud, redPot, purplePot, hp, fire, ghost, ghostAttack, spike];
    allProm = allProm.concat(tiles, coin, genie, fire_ball);
    Promise.all(allProm).then(()=> this.is_loaded = true );

  }

}

export const assets = new Assets();
assets.load();
