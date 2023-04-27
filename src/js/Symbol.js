const cache = {};

export default class Symbol {
  constructor(name = Symbol.random()) {
    this.name = name;

    if (cache[name]) {
      this.img = cache[name].cloneNode();
    } else {
      this.img = new Image();
      this.img.src = require(`../assets/symbols/${name}.svg`);
      // this.img.src = $`../assets/symbols/${name}.svg`;
      Jeff.set(name, this.img.src);
      cache[name] = this.img;
    }
  }

  static preload() {
    Symbol.symbols.forEach((symbol) => new Symbol(symbol));
  }

  static get symbols() {
    return [
      "at_at",
      "at_at",
      "c3po",
      // "darth_vader",
      // "death_star",
      // "falcon",
      // "r2d2",
      // "stormtrooper",
      // "tie_ln",
      // "yoda",
    ];
  }

  static random() {
    console.log(this.symbols[Math.floor(Math.random() * this.symbols.length)]);
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }

  static get getDic() {
    console.log(window.dic[key]);
    return window.dic[key];
  }

  // static randomv2() {
  //   return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  // }
}

export class Jeff {
  constructor() {
  }

  static set(key, value) {

    var item = localStorage.getItem('cat');

    var obj = {};
    if(item != null){
       obj = JSON.parse(item);
    }
    obj[key] =value;
    
    var json = JSON.stringify(obj);

    localStorage.setItem('cat', json);
  }

  static getDic(key) {
    var item = localStorage.getItem('cat');
    var obj = JSON.parse(item);

    console.log(key + obj);
    return obj[key];
  }
}
