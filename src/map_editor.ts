import { Generic_Entity, Dash, Block } from "./entities";
import { Map, Vector } from "./utils";
import { Render, RENDER } from "./render";

export class Game_editor {
  private selected_entity: Generic_Entity;
  private entities: Generic_Entity[];
  private render: Render;
  private map: Map;
  constructor () {
    this.render = RENDER;
    this.map = new Map(new Vector(500,500), 50);
    this.selected_entity = null;
    this.entities = [];

    window.addEventListener('mousemove', (mouse) => {
      if ( this.selected_entity === null ) return void 0;
      this.selected_entity.pos.x = mouse.x;
      this.selected_entity.pos.y = mouse.y;
      const sprite = this.selected_entity.get_sprite();
      sprite.static = true;
      this.render.add_sprite(sprite);
      this.render.render();
    });
    (document.getElementById('new-block') as HTMLButtonElement).addEventListener('click', ()=>{
      this.selected_entity = new Block(50, 50, 1);
      this.render.canvas.addEventListener('click', () => {

        this.selected_entity = null;
        

      }, {once: true});
    });

  }




}