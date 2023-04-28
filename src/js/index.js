import Slot from "./Slot.js";
import {Symbol, Jeff} from "./Symbol.js";
import audioFile from '../assets/audio/slot.mp3';

let name;

const config = {
  inverted: false, // true: reels spin from top to bottom; false: reels spin from bottom to top
  onSpinStart: (symbols) => {
  const audio = document.getElementById("autoplay");
  audio.load();
  audio.play();
    // console.log("onSpinStart", symbols);
  },
  onSpinEnd: (symbols) => {
    console.log("onSpinEnd", symbols);
    // console.log(symbols[0][0], symbols[1][0], symbols[2][0]);
    if (symbols[0][0] == symbols[1][0] && symbols[1][0] == symbols[2][0]) {
      name = symbols[0][0];
      win();
    }
    const audio = document.getElementById("autoplay");
    audio.pause();
  },
};

function win() {
  let imgUrl = Jeff.getDic(name);
  // const audio = document.getElementById("autoplay");
  // audio.play();
  const win = document.getElementById("getWin");
  win.innerHTML =`"<div id='win'><div id='card'><img src= '${imgUrl}'/><div id='title'><h1>恭喜得到${name}!!!!</h1></div><button id='checkWin' type='button'>領取</button></div></div>"`;
  const getWin = document.getElementById("checkWin");
  getWin.addEventListener("click", removeAlert);

}

function removeAlert() {
  const win = document.getElementById("win");
  // const audio = document.getElementById("audio");
  win.remove();
  // audio.pause();
}

// function playAudio() {
//   const audio = new Audio("./assets/slot.mp3");
//   audio.play();
// }

const slot = new Slot(document.getElementById("slot"), config);
