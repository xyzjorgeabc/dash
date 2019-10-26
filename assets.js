const ASSETS = {
  dash: [],
  spike: void 0,
  coin: [],
  block: [],
  bouncer: void 0,
  minion: [],
  genie:[],
  pots: [],
  hp: void 0,
  fire: void 0,
  load: load
};

function load() {
  const a = ASSETS;
  const cloud = read_sprite('cloud.png')
  .then(function(r){
      a.bouncer = new Image();
      a.bouncer.src = r;
  });
  const redPot = read_sprite('red_pot.png')
  .then(function(r){
      a.pots[0] = new Image();
      a.pots[0].src = r;
  });
  const purplePot = read_sprite('purple_pot.png')
  .then(function(r){
      a.pots[1] = new Image();
      a.pots[1].src = r;
  });
  const hp = read_sprite('hp.png')
  .then(function(r){
      a.hp = new Image();
      a.hp.src = r;
  });
  const fire_ball = [];
  for(let i = 1; i <= 6; i++){
    fire_ball.push(read_sprite('fireball' + i + '.png')
    .then( function(r){
        a.fire_ball[i] = new Image();
        a.fire_ball[i].src = r;
    }));
}
  const fire = read_sprite('flame_sprite.png')
  .then(function(r){
      a.fire = new Image();
      a.fire.src = r;
  });
  const ghost = read_sprite('ghost.png')
  .then(function(r){
      a.dash[0] = new Image();
      a.dash[0].src = r;
  });
  const ghostAttack = read_sprite('ghost_attack.png')
  .then(function(r){
      a.dash[1] = new Image();
      a.dash[1].src = r;
  });
  const spike = read_sprite('spike.png')
  .then(function(r){
      a.spike = new Image();
      a.spike.src = r;
  });
  const tiles = [];
  for(let i = 1; i <= 18; i++){
      tiles.push(read_sprite('Tile' + i + '.png')
      .then( function(r){
          a.block[i] = new Image();
          a.block[i].src = r;
      }));
  }
  const coin = [];
  for(let i = 1; i <= 6; i++){
      coin.push(read_sprite("coin" + i + ".png")
      .then(function(r){
          a.coin[i] = new Image();
          a.coin[i].src = r;
      }));
  }
  const minion = [];
  minion.push(read_sprite('soul_left.png')
  .then(function(r){
      a.minion[0] = new Image();
      a.minion[0].src = r;
  }));
  minion.push(read_sprite('soul_right.png')
  .then(function(r){
      a.minion[1] = new Image();
      a.minion[1].src = r;
  }));
  const genie = [];
  genie.push(read_sprite('genie_red_left.png')
  .then(function(r){
      a.genie[0] = new Image();
      a.genie[0].src = r;
  }));
  genie.push(read_sprite('genie_red_right.png')
  .then(function(r){
      a.genie[1] = new Image();
      a.genie[1].src = r;
  }));

  let allProm = [cloud, redPot, purplePot, hp, fire, ghost, ghostAttack, spike, fire_ball];
  allProm = allProm.concat(tiles, coin, genie);
  return Promise.all(allProm);
}