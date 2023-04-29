import Reel from "./Reel.js";
import Symbol from "./Symbol.js";

export default class Slot {
  constructor(domElement, config = {}) {
    Symbol.preload();

    this.currentSymbols = [
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
    ];

    this.nextSymbols = [
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, this.currentSymbols[idx])
    );

    this.spinButton = document.getElementById("spin");
    this.spinButton.addEventListener("click", () => this.spin());

    this.autoPlayCheckbox = document.getElementById("autoplay");

    if (config.inverted) {
      this.container.classList.add("inverted");
    }

    this.config = config;
  }

  spin() {
    this.currentSymbols = this.nextSymbols;
    this.nextSymbols = this.getNextSymbols();

    this.onSpinStart(this.nextSymbols);

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      })
    ).then(() => this.onSpinEnd(this.nextSymbols));
  }

  onSpinStart(symbols) {
    this.spinButton.disabled = true;

    this.config.onSpinStart?.(symbols);
  }

  onSpinEnd(symbols) {
    this.spinButton.disabled = false;

    this.config.onSpinEnd?.(symbols);

    // if (this.autoPlayCheckbox.checked) {
    //   return window.setTimeout(() => this.spin(), 200);
    // }
  }

  // 渲染下一次中獎
  getNextSymbols() {
    // 中獎獎項
    let award = this.getAwards();
    // console.log("key" + award.key);
    let r = award.key
      ? [
          [award.name, "at_at", "at_at"],
          [award.name, "at_at", "at_at"],
          [award.name, "at_at", "at_at"],
        ]
      : [
          [award.name, Symbol.random(), Symbol.random()],
          [award.notMapName, Symbol.random(), Symbol.random()],
          [Symbol.random(), Symbol.random(), Symbol.random()],
          ];
    if (award.key) {
      console.log("===中獎===" + award.name);
      console.log("===中獎1===", award);
    } else {
      
      console.log("未中獎", r);
      console.log("未中獎1", award);
    }
    return r;
  }

  // 取得獎項
  getAwards() {
    // 可中獎獎項以及機率
    let setDefaultSymbols = [
      { name: "at_at", probability: 50 },
      { name: "c3po", probability: 10 },
    ];

    let array = [];

    // 填入中獎資料
    setDefaultSymbols.map((item) => {
      for (let i = 0; i < item.probability; i++) {
        array.push({ key: true, name: item.name });
      }
    });

    // 填入未中獎機率
    let total = 100 - array.length;
    for (let i = 0; i < total; i++) {
      let mapName = Symbol.random();
      array.push({
        key: false,
        name: mapName,
        notMapName: this.getNotMapName(mapName),
      });
    }

    // let json = JSON.stringify(array);
    // console.log('get array '+ json);
    // console.log('get floor' +Math.floor(Math.random() * 100));
    let randomCount = Math.floor(Math.random() * array.length);
    let result = array[randomCount];
    console.clear();
    return result;
  }

  getNotMapName(name) {
    for (let i = 0; i < 100000; i++) {
      let mapName = Symbol.random();
      if (mapName != name) {
        return mapName;
      }
    }
  }
}
