import { assets } from './assets';
import { Game } from './game';
import { LVL1 } from './constantes';
import { Timer, Vector } from './utils';
import { Sprite } from './render';
import { Game_editor } from './map_editor';

const game = new Game(LVL1, 50);
const game_editor =  new Game_editor();
document.addEventListener('click', function(){
  /*if(assets.is_loaded === true && game.state !== Game.PLAYING){
    requestAnimationFrame(loop);
    game.state = Game.PLAYING;
  }*/
});

function loop() {
  requestAnimationFrame(loop);
  if(true) {
    const start = Date.now();
    game.update();
    const ms = start - Date.now();
    game.render.add_sprite(new Sprite(Sprite.TEXT_SPRITE, ms + '        ms/frame',
    new Vector(100, 200),
    true,
    new Vector(50, 50)
    ));
  }
}

