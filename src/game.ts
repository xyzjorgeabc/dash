import { Render, Sprite, RENDER } from './render';
import { EntityManager } from './entityManager';
import { EventManager, Vector } from './utils';
import { assets } from './assets';

export class Game {

  public render: Render;
  private entity_manager: EntityManager;
  private event_manager: EventManager;
  public state: number;
  public static LOADING = 1;
  public static READY = 2;
  public static PAUSE = 3;
  public static PLAYING = 5;

  constructor (map: number[][], scale: number) {
    this.render = RENDER;
    this.entity_manager = new EntityManager(map, scale);
  }
  public update () {

    this.entity_manager.update();
    this.render.set_focus(this.entity_manager.dash.get_sprite(), this.entity_manager.dash.vel.clone());

    this.render.add_sprite(this.entity_manager.dash.get_sprite());
    this.entity_manager.getAllTypes().forEach((ent) => {
      this.render.add_sprite(ent.get_sprite());
    });
    this.add_GUI_sprites();
    this.render.render();
  }
  private add_GUI_sprites(): void {
    const hp    = this.entity_manager.dash.hp;
    const coins = this.entity_manager.dash.coins;

    for(let i = 1; i <= hp; i++){
      this.render.add_sprite(new Sprite(
        Sprite.IMAGE_SPRITE,
        assets.hp,
        new Vector(this.render.size.x - (this.render.scale * i - 20), this.render.size.y - this.render.scale / 2),
        true,
        new Vector(this.render.scale, this.render.scale)
      ));
    }
    this.render.add_sprite(new Sprite(
      Sprite.IMAGE_SPRITE,
      assets.coin[1],
      new Vector(this.render.size.x - this.render.scale + 20, this.render.size.y - this.render.scale * 2 + this.render.scale / 2),
      true,
      new Vector(this.render.scale, this.render.scale),
    ));
    this.render.add_sprite(new Sprite(
      Sprite.TEXT_SPRITE,
      coins + "X",
      new Vector(this.render.size.x - this.render.scale * 1.5, this.render.size.y - this.render.scale / 2),
      true,
      new Vector(this.render.scale, this.render.scale)
    ));

  }

}