class Character {
  static _counter = 0;
  constructor() {
    if (this.constructor === Character) {
      throw new Error("Character klasa nemoze da se instancuje.");
    }
    console.log("entering character constructor");
    this._x = Math.floor(Math.random() * 10); //moram donju crtu ovde da stavim ili baca TypeError: Cannot set property x of #<Character>?
    this._y = Math.floor(Math.random() * 10);
    Character.increment();
    console.log(Character.count);
  }

  static increment() {
    Character._counter += 1;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  static get count() {
    return Character._counter;
  }

  setCoordiantes(x, y) {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      throw new Error("Invalid coordinates");
    }
    this._x = x;
    this._y = y;
  }
}

class PC extends Character {
  constructor() {
    super();
  }
}

class NPC extends Character {
  constructor() {
    super();
  }
}

let player = new PC();
let npc = new NPC();

player.setCoordiantes(3, 3);

console.log(player);
console.log(npc);
