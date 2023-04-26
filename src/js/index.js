import Slot from "./Slot.js";

let name;

const config = {
  inverted: false, // true: reels spin from top to bottom; false: reels spin from bottom to top
  onSpinStart: (symbols) => {
    console.log("onSpinStart", symbols);
  },
  onSpinEnd: (symbols) => {
    console.log("onSpinEnd", symbols);
    console.log(symbols[0][0], symbols[1][0], symbols[2][0]);
    if (symbols[0][0] == symbols[1][0] && symbols[1][0] == symbols[2][0]) {
      name = symbols[0][0];
      win();
    }
  },
};

function win() {
  console.log("win");
  const win = document.getElementById("getWin");
  win.innerHTML =`"<div id='win'><div id='card'><img src= 'http://localhost:5000/3392ebef20e51148368e.svg'/><div id='title'><h1>恭喜得到${name}!!!!</h1></div><button id='checkWin' type='button'>領取</button></div></div>"`;
  const getWin = document.getElementById("checkWin");
  getWin.addEventListener("click", removeAlert);
}

function removeAlert() {
  const win = document.getElementById("win");
  win.remove();
}

const slot = new Slot(document.getElementById("slot"), config);
