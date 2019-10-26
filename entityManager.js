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
  getAllTypes (){
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
}