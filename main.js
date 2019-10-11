let sqa,sqb,sqc,sqd;
const LVL1 = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,6,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,6,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

class Vector{
    
    constructor(x = 0,y = 0){
        this.x = x;
        this.y = y;
    }
    get baseR(){
        return Math.PI * 2 ;
    }
    add(v){
        this.x += v.x;
        this.y += v.y;
    }
    subs(v){
        this.x -= v.x;
        this.y -= v.y;
    }
    mult(x = 1, y = 1){
        this.x *= x;
        this.y *= y;
    }
    fix(n){
        this.x = +this.x.toFixed(n);
        this.y = +this.y.toFixed(n);
    }
    diffTo(v){
        const x = v.x - this.x;
        const y = v.y - this.y;
        return new Vector(x,y);
    }
    relativeVelTo(v){
        const diff = this.diffTo(v);
        const rDir = Math.atan2(diff.y, diff.x) + this.baseR;
        return new Vector(Math.cos(rDir), Math.sin(rDir));
    }
    clone(){
        return new Vector(this.x,this.y);
    }
}

class EventDispatcher{

    constructor(){
        this.observer = map;
        this.eventQueue = [];
    }
    addEvent(ev, ent){
        this.eventQueue.push({type: ev, entity: ent});
    }
    clearQueue(){
        this.eventQueue = [];
    }
    getEvents(type){
        if(type)
        return this.eventQueue.filter( function(ev){
            return ev.type === type;
        });
        else return this.eventQueue;
    }
    static get shot(){
        return 1;
    };
    static get onScreen(){
        return 2;
    }
    static get dead(){
        return 3;
    }
    static get pause(){
        return 4;
    }
    static get resume(){
        return 5;
    }
}

class map{

    constructor(){
        evm = new EventDispatcher();
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
            dash,
            block: [],
            coin: [],
            spike: [],
            bouncer: [],
            minion: [],
            boss: [],
            throwable: []
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
        };
        this.state = null;
    }
    readAssets(){

        const a = this.assets;
        const skeleton = read_sprite('Skeleton.png')
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
            a.blueGenie[0] = new Image();
            a.blueGenie[0].src = r;
        }));
        genie.push(read_sprite('genie_red_right.png')
        .then(function(r){
            a.blueGenie[1] = new Image();
            a.blueGenie[1].src = r;
        }));

        let allProm = [skeleton, redPot, purplePot, hp, fire, ghost, ghostAttack];
        allProm = allProm.concat(tiles, coin, genie);
        const self = this;
        Promise.all(allProm).then(function(){
            self.state = "ready";
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
            ctx.drawImage(this.assets.hp, this.viewport.size.x - (this.viewport.scale * i + 20),
                this.viewport.size.y - this.viewport.scale, this.viewport.scale, this.viewport.scale);
        }
        ctx.drawImage(this.assets.coin[1], this.viewport.size.x - (this.viewport.scale + 20),
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
                            this.entities.block.push(new block(base + ind * scale, base + i * scale, this.assets.block[bits]));
                            break; 
                        case 2:
                            this.entities.spike.push(new spike(base + ind * scale, base + i * scale, type));
                            break; 
                        case 3:
                            this.entities.bouncer.push(new bouncer(base + ind * scale, base + i * scale, this.assets.bouncer));
                            break; 
                        case 4:
                            this.entities.coin.push(new coin(base + ind * scale, base + i * scale, this.assets.coin));
                            break;
                        case 5:
                            this.entities.meteor.push(new entity(base + ind * scale, base + i * scale, type));
                            break;
                        case 6:
                            const displacement = minion.calcMaxDisplacement(map, scale, ind ,i);
                            this.entities.minion.push(new minion(base + ind * scale, base + i * scale, displacement, this.assets.minion));
                            break;
                        default: //boss
                            this.entities.boss.push(new genie(base + ind * scale, base + i * scale, this.assets.blueGenie, type));
                            break;
                    }
                }
            }
        }
        
        this.entities.dash = new dash(base, base + (map.length - 2) * scale, this.assets.dash);
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
    eventManagement(){

        const onsc = evm.getEvents(EventDispatcher.onScreen); 
        const shot = evm.getEvents(EventDispatcher.shot);
        const dead = evm.getEvents(EventDispatcher.dead);
        const pause = evm.getEvents(EventDispatcher.pause);
        const resume = evm.getEvents(EventDispatcher.resume);
        
        if(resume.length){
            this.state = null; // resume; 
        }
        if(pause.length){
            this.state = EventDispatcher.pause; // pause;
        }
        else if(onsc.length){
            this.state = EventDispatcher.onScreen;
        }
        for(let i = 0; i < shot.length; i++){
            this.entities.throwable.push( 
                new throwable(shot[i].entity.pos.x, shot[i].entity.pos.y, this.entities.dash.pos, this.assets.fire
                ));
        }
        for(let i = 0; i < dead.length; i++){
            let entityType;
            let ind = i;
            switch(dead[i].entity.constructor){
                case genie:
                    entityType = "boss";
                    break;
            }
            this.entities[entityType].splice(this.entities[entityType].findIndex(function(ent){
                return ent === dead[ind];
            }), 1);
        }
        evm.clearQueue();
    }
    frame(){
        this.activateBoss();
        this.eventManagement();
        if(this.state !== EventDispatcher.pause){
            this.detectCollision();
            this.entities.dash.outOfMapDetection(this.map.size);
            for(let i = 0; i < this.entities.coin.length; i++){
                this.entities.coin[i].frame();
            }
            for(let i = 0; i  < this.entities.boss.length; i++)
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

class entity {

    constructor(x,y,size){

        this.pos  = new Vector(x,y);
        this.size = new Vector(size, size);
        this.sprites = [];

    }
}

class movable extends entity{

    constructor(x,y,size){
        super(x,y,size);
        this.vel    = new Vector();
        this.maxVel = new Vector(5,5);
        this.defAcc = new Vector();
    }
    outOfMapDetection(v){
        // devuelve boolean;
    }
    drawImage(ctx){
        ctx.drawImage(this.img,this.pos.x - this.size.x/2, this.pos.y - this.size.y/2, this.size.x, this.size.y);
    }
    getPoint(num){
        return new Vector(this.pos.x + (this.rectDiag * Math.cos((this.rotation + 45 * num) * Math.PI / 180)),
                          this.pos.y + (this.rectDiag * Math.cos((this.rotation + 45 * num) * Math.PI / 180)));
    }
}

class bouncer extends entity{

    constructor(x, y, img){

        super(x,y,50);
        this.img = img;
        this.pos.y += this.size.y / 2;
        this.pos.y -= this.size.y / 5;
        this.size.y /= 2;
        this.points = {
            p1: new Vector(this.pos.x - this.size.x/2, this.pos.y - this.size.y/2),
            p2: new Vector(this.pos.x + this.size.x/2, this.pos.y - this.size.y/2),
            p3: new Vector(this.pos.x + this.size.x/2, this.pos.y + this.size.y/2),
            p4: new Vector(this.pos.x - this.size.x/2, this.pos.y + this.size.y/2)
        };
    }
    draw(ctx){
        ctx.drawImage(this.img,this.points.p1.x, this.points.p1.y, this.size.x, this.size.y);
    }
}

class spike extends entity {

    constructor(x,y){
        super(x,y,50);

        this.points = {
            p1: new Vector(x - this.size.x/2, y + this.size.y/2),
            p2: new Vector(x, y - this.size.y/2),
            p3: new Vector(x + this.size.x/2, y + this.size.y/2)
        };
    }
    draw(ctx){

        ctx.beginPath();
        ctx.moveTo(this.points.p1.x, this.points.p1.y);
        ctx.lineTo(this.points.p2.x, this.points.p2.y);
        ctx.lineTo(this.points.p3.x, this.points.p3.y);
        ctx.fill();
        ctx.closePath();
    }
    frame(){

    }
}

class block extends entity{

    constructor(x,y, img){
        super(x,y,50);
        this.img = img;
        this.points = {
            p1: new Vector(x - this.size.x/2, y - this.size.y/2),
            p2: new Vector(x + this.size.x/2, y - this.size.y/2),
            p3: new Vector(x + this.size.x/2, y + this.size.y/2),
            p4: new Vector(x - this.size.x/2, y + this.size.y/2)
        };
    }
    get rectDiag(){
        const x = Math.pow(this.size.x/2, 2);
        const y = Math.pow(this.size.y/2, 2);

        return Math.sqrt(x+y);
    }
    draw(ctx){
        ctx.drawImage(this.img,this.points.p1.x, this.points.p1.y, this.size.x, this.size.y);
    }
}


class coin extends movable{

    constructor(x, y, sprite){

        super(x,y, 50);
        this.sprite = sprite;
        this.spriteIndex = 1;
        this.acc = new Vector(0, 0.05);
        this.maxVel = new Vector(1,1);
    }
    getPoint(rad){
        const base = this.pos.clone();
        const pad  = new Vector(this.size/2 * Math.cos(rad), this.size/2 * Math.sin(rad));       
        return base.add(pad); 
    }
    get img(){
        if(Math.ceil(this.spriteIndex) > this.sprite.length-1) this.spriteIndex = 1;
        this.spriteIndex += 0.05;
        return this.sprite[Math.floor(this.spriteIndex)];
    }
    applyForces(){
        
        if(Math.abs(this.vel.x) >= this.maxVel.x)
            this.acc.x = -this.acc.x;

        if(Math.abs(this.vel.y) >= this.maxVel.y)
            this.acc.y = -this.acc.y;
        
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }
    draw(ctx){

        ctx.drawImage(this.img, this.pos.x - this.size.x/2, this.pos.y - this.size.y/2, this.size.x, this.size.y);
    }
    frame(){

        this.applyForces();

    }
}

class dash  extends movable{
    constructor(x,y,imgs){
        super(x,y,50);
        this.imgs = imgs;
        this.rotation = 0;
        this.defAcc = new Vector(0.5,0.5);
        this.collision =  {
            top: null,
            bottom: null,
            right: null,
            left: null,
            is: function is(){
                if(this.top !== null || this.bottom !== null || this.right !== null || this.left !== null) return true;
                else return false;
            },
            reset: function(){
                this.top    = null;
                this.bottom = null;
                this.right  = null;
                this.left   = null;
            }
        };
        this.attacking = false;
        this.lastAttack = Date.now();
        this.hp = 5;
        this.coins = 0;
    }   
    get acc(){
        return new Vector(0.5,0.5);
    }
    isCollidingWith(ent){
        const v    = this.pos;
        const dv   = v.clone(); dv.add(this.vel); dv.add(this.acc);
        const ev   = ent.pos;
        const pad  = this.size.x/2;
        const epadY = ent.size.y/2;
        const epadX = ent.size.x/2;
        const dvleft   = dv.x - pad;
        const dvright  = dv.x + pad;
        const dvtop    = dv.y - pad;
        const dvbottom = dv.y + pad;
        
        const evleft   = ev.x - epadX;
        const evright  = ev.x + epadX;
        const evtop    = ev.y - epadY;
        const evbottom = ev.y + epadY;

        const isColliding = dvright  >= evleft &&
                            dvleft   <= evright &&
                            dvbottom >= evtop &&
                            dvtop    <= evbottom;
        
        if(isColliding){
            const left   = this.vel.x <= 0 && dvright >= evright && Math.abs(dv.y - ev.y) < (pad + epadY);
            const right  = this.vel.x >= 0 && dvright <= evright && Math.abs(dv.y - ev.y) < (pad + epadY);
            const bottom = this.vel.y >= 0 && dvtop <= evtop && Math.abs(dv.x - ev.x) < (pad + epadX);
            const top    = this.vel.y <= 0 && dvbottom >= evbottom && Math.abs(dv.x - ev.x) < (pad + epadX);
            const xdiff =  Math.abs(ev.x - dv.x);
            const ydiff =  Math.abs(ev.y - dv.y); 
            // refactor? simplicidad.
            if(xdiff > ydiff){

                if(right && !(ent instanceof movable) && !this.collision.right){
                    if(ent instanceof bouncer) void 0;
                    else this.onCollision("right", ev.x - v.x  - (pad + epadX), true);
                }
                if(left && !(ent instanceof movable) && !this.collision.left){
                    if(ent instanceof bouncer) void 0;
                    else this.onCollision("left", ev.x - v.x  + (pad + epadX), true);
                }
            }else {

                if(top && !(ent instanceof movable) && !this.collision.top){
                    if(ent instanceof bouncer) this.onCollision("top", -10, false);
                    else this.onCollision("top", ev.y - v.y  + (pad + epadY), true);
                } 
                if(bottom && !(ent instanceof movable) && !this.collision.bottom){ 
                    if(ent instanceof bouncer) this.onCollision("bottom", -12, false);    
                    else this.onCollision("bottom", ev.y - v.y  - (pad + epadY), true);
                }
            }
            
            return right||bottom||top||left;
        }
   }
    onCollision(side, mtd, stop){
        switch(side){
            case "top":
                this.collision.top = stop;
                this.vel.y = mtd;
                break;
            case "bottom":
                this.collision.bottom = stop;
                this.vel.y = mtd;
                break;
            case "right":
                this.collision.right = stop;
                this.vel.x = mtd;
                break;
            case "left":
                this.collision.left = stop;
                this.vel.x = mtd;
                break;    
        }
    }
    outOfMapDetection(v){
        const dPos = new Vector(this.pos.x + this.vel.x, this.pos.y + this.vel.y); dPos.add(this.acc);
        const diff = dPos.diffTo(v);
        const pad  = new Vector(this.size.x,this.size.y); pad.mult(0.5,0.5);
        
        if(Math.abs(diff.x) <= pad.x){
            this.onCollision("right", diff.x - pad.x + this.vel.x);
        }
        if(Math.abs(diff.y) <= pad.y){
            if(diff.y >= 0) this.onCollision("bottom", diff.y - pad.y + this.vel.y);
            else this.onCollision("top", diff.y - pad. y + this.vel.y);
        }
    
    }
    isAttacking(){
        return this.attacking;
    }
    attack(){
        const now = Date.now();
        if(now - this.lastAttack > 500){
            this.lastAttack = now;
            this.attacking = true;
            const self = this;
            setTimeout(function(){self.attacking = false;}, 100);
        }
    }
    applyForces(ctrl){

        this.applyFriction();
        this.applyGravity();
        
        if(ctrl[38]) this.jump();
        if(ctrl[17]) this.attack();

        let xDir = 0;
        let yDir = 0;
        const acc = this.acc;
        if(Math.abs(this.vel.x) + acc.x < this.maxVel.x){
            if(ctrl[37]) xDir = -1;
            else if(ctrl[39]) xDir = 1;
        }
        if(Math.abs(this.vel.y) + acc.y > this.maxVel.y){
            if(ctrl[40]) yDir = 1;
        }
        
        acc.mult(xDir, yDir);
        this.vel.add(acc);
        this.pos.add(this.vel);
    }
    applyGravity(){
        if(this.collision.bottom) return;
        const gravity = new Vector(0, 0.4);
        this.vel.add(gravity);
    }
    applyFriction(){
        let friction = 0.1;
        let dir;
        if(Math.abs(this.vel.x) < friction){
            this.vel.x = 0;
        }

        if(this.vel.x < 0) dir = 1;
        else if (this.vel.x > 0) dir = -1;
        else dir = 0;
        friction *= dir;
        this.vel.x += friction;
    }
    jump(){
        if(this.collision.bottom !== null) this.vel.y = -8;
    }
    getRectDiag(){

        const x = Math.pow(this.size.x/2, 2);
        const y = Math.pow(this.size.y/2, 2);
        
        return Math.sqrt(x+y);
    }
    rotate(){
        if(this.rotation === 360) this.rotation = 0;
        
        if(this.vel.y !== 0 ) this.rotation += 10;
        else if (this.collision.bottom !== null && this.rotation % 90 !== 0){
            
            const r = 90 - this.rotation % 90;
            this.rotation += r < 15 ? r : 15;
        }
        
        const diag = this.getRectDiag();
        
        sqa = new Vector(this.pos.x + (diag * Math.cos((this.rotation + 45) * Math.PI / 180)), 
                         this.pos.y + (diag * Math.sin((this.rotation + 45) * Math.PI / 180)));
        sqb = new Vector(this.pos.x + (diag * Math.cos((this.rotation + 135) * Math.PI / 180)),
                         this.pos.y + (diag * Math.sin((this.rotation + 135) * Math.PI / 180)));
        sqc = new Vector(this.pos.x + (diag * Math.cos((this.rotation + 225) * Math.PI / 180)), 
                         this.pos.y + (diag * Math.sin((this.rotation + 225) * Math.PI / 180)));
        sqd = new Vector(this.pos.x + (diag * Math.cos((this.rotation + 315) * Math.PI / 180)), 
                         this.pos.y + (diag * Math.sin((this.rotation + 315) * Math.PI / 180)));
    }
    get img(){

        if(this.attacking) return this.imgs[1];
        else return this.imgs[0];
    }
    draw(ctx){
        
        this.drawImage(ctx);
        ctx.save();
        ctx.translate(Math.ceil(this.pos.x), Math.ceil(this.pos.y));
        ctx.rotate(this.rotation * Math.PI/ 180);
        ctx.restore();
        if(sqa){
            ctx.fillStyle = "red";
            ctx.fillRect(sqa.x - 4, sqa.y - 4,  8, 8);
            ctx.fillStyle = "blue";
            ctx.fillRect(sqb.x - 4, sqb.y - 4,  8, 8);
            ctx.fillStyle = "green";
            ctx.fillRect(sqc.x - 4, sqc.y - 4,  8, 8);
            ctx.fillStyle = "white";
            ctx.fillRect(sqd.x - 4, sqd.y - 4,  8, 8);
        }
    }
    frame(ctrl){
       
        this.applyForces(ctrl);
        this.rotate();
        this.collision.reset();
    }
    
}

class throwable extends movable{

    constructor(x, y, delta, sprite){
        super(x,y,50);
        const rDir  = this.pos.relativeVelTo(delta);
        this.rotation = Math.atan2(rDir.y, rDir.x);
        this.maxVel = new Vector(10,10);
        this.vel    = new Vector(this.maxVel.x * rDir.x, this.maxVel.y * rDir.y);
        this.sprite = sprite;
        this.spriteI = 0;
    }
    get spriteIndex(){
        if(Math.ceil(this.spriteI) === 6) this.spriteI = 0;
        this.spriteI += 0.2;
        return Math.floor(this.spriteI);
    }
    draw(ctx){

        ctx.save();
        ctx.translate(Math.ceil(this.pos.x), Math.ceil(this.pos.y));
        ctx.rotate(this.rotation);
        
        const i = this.spriteIndex;
        ctx.drawImage(this.sprite, this.sprite.height * i, 0, this.sprite.height, this.sprite.height, 0 - this.size.x, 0 - this.size.y, 
                    this.size.x*2, this.size.y*2);
        ctx.restore();
    }
    applyForces(){
        this.pos.add(this.vel);
    }
    frame(){
        this.applyForces();
    }
}

class boss extends movable {

    constructor(x, y, type){
        super(x, y, 100);
        this.type = type;
        this.state = null;
        this.lastAttack = Date.now();
    }
    activate(){
        this.state = "active";
        evm.addEvent(EventDispatcher.onScreen, this);
        evm.addEvent(EventDispatcher.pause, this);
        this.displayDialogue();
    }
    attack(){
        const now = Date.now();
        if(now - this.lastAttack > 1000){
            this.lastAttack = now;
            evm.addEvent(EventDispatcher.shot, this);
        }
    }
    displayDialogue(){
        const self = this;
        const dialogues = this.dialogue;
        let i = 0;
        function d(){
            console.log(dialogues[i]);
            i++;
            if(i >= dialogues.length)
                setTimeout(function(){
                    evm.addEvent(EventDispatcher.resume, self);
                }, 2000);
            else setTimeout(d, 2000);
        }
        setTimeout(d, 2000);

    }
}



class genie extends boss {
    
    constructor(x, y, imgs, type){
        super(x,y,type);
        this.acc = new Vector();
        this.defAcc =  new Vector(0.05, 0.05);
        this.basePos = this.pos.clone();
        this.imgs = imgs;
        this.dialogue = [
            "hello",
            "bye",
        ];
    }
    draw(ctx){
        //super.draw(ctx) esta gente no puede hacer nada bien.
        this.drawImage(ctx);
    }
    get img(){
        if(this.vel.x > 0) return this.imgs[1];
        else  return this.imgs[0];
    }
    applyForces(){
        const diff = this.pos.diffTo(this.basePos);
        if(diff.x <= -150){
            if(this.vel.x > 0){
                this.acc.x = -this.defAcc.x;
            }
        }
        else{
            this.acc.x = this.defAcc.x;
        }
        
        if(Math.abs(diff.y) >= 20){
            this.acc.y = -this.acc.y;
        }

        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }
    frame(){
        if(this.state === null) return;
        this.applyForces();
        this.attack();
    }
}

class minion extends movable{

    constructor(x, y, displacement, imgs){

        super(x,y, 50);
        this.vel = new Vector(2,0);
        this.maxVel = new Vector(2,0);
        this.imgs = imgs;
        this.displacement = displacement; 
    }
    static calcMaxDisplacement(map, scale, x, y){

        let leftMax;
        let rightMax;

        for(let i = x - 1; !leftMax && x > 0; i--){
            if(map[y][i] === 1)
                leftMax = i * scale;
        }
        for(let i = x + 1; !rightMax && i < map[y].length; i++){
            if(map[y][i] === 1)
                rightMax = i * scale;
        }

        return {leftMax: leftMax + scale, rightMax: rightMax};
    }
    draw(ctx){
        //super.draw(ctx)
        this.drawImage(ctx);
    }
    get img(){
        if(this.vel.x > 0) return this.imgs[1];
        else  return this.imgs[0];
    }
    applyForces(){

        if(this.vel.x > 0 ){
            if(this.pos.x + this.size.x/2 >= this.displacement.rightMax)
                this.vel.x = -this.maxVel.x;
            else if(this.pos.x + this.size.x/2 + this.vel.x > this.displacement.rightMax){
                this.vel.x = this.displacement.rightMax - this.pos.x - this.size.x/2;
            }
        }
        else if(this.vel.x < 0){
            if(this.pos.x - this.size.x/2 <= this.displacement.leftMax)
                this.vel.x = this.maxVel.x;
            else if(this.pos.x  - this.size.x/2 + this.vel.x < this.displacement.leftMax)
                this.vel.x = this.displacement.leftMax - this.pos.x + this.size.x/2;
        }
        this.pos.add(this.vel);

    }
    frame(){
        if(this.state === null) return;
        this.applyForces();
    }
}



let evm;
const b = new map();
b.readAssets();