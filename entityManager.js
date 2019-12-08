class EntityManager {
  constructor(){
    this.dash = null;
    this.blocks = new Set();
    this.coins = new Set();
    this.spikes = new Set();
    this.bouncers = new Set();
    this.minions = new Set();
    this.bosses = new Set();
    this.throwables = new Set();
    this.meteors = new Set();
  }

  getAllTypes() {
    const tmp = [].concat(
      this.dash,
      this.blocks.entries(),
      this.coins.entries(),
      this.spikes.entries(),
      this.bouncers.entries(),
      this.minions.entries(),
      this.bosses.entries(),
      this.throwables.entries(),
      this.meteors.entries()
    );
    return new Set(tmp);
  }
  addEntity(ent) {
    switch (ent.constructor) {
      case Block:
        this.blocks.add(ent);
        break;
      case Coin:
        ent.deathEventEmiter.suscrirbir(()=>{this.coins.delete(ent);});
        this.coins.add(ent);
        break;
      case Spike:
        this.spikes.add(ent);
        break;
      case Bouncer:
        this.bouncers.add(ent);
        break;
      case Minion:
        ent.deathEventEmiter.suscrirbir(()=>{this.minions.delete(ent);});
        this.minions.add(ent);
        break;
      case Boss:
        ent.deathEventEmiter.suscrirbir(()=>{this.bosses.delete(ent);});
        this.bosses.add(ent);
        break;
      case Throwable:
        ent.deathEventEmiter.suscrirbir(()=>{this.throwables.delete(ent);});
        this.throwables.add(ent);
        break;
      case "Meteor":
        ent.deathEventEmiter.suscrirbir(()=>{this.meteors.delete(ent);});
        this.meteors.add(ent);
        break;
    }
  }
  update(){
    
  }
}
