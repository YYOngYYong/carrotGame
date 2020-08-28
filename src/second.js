"use strict";
import PopUp from "./popUp.js";
import Field from "./field.js";
import Game from "./game.js";

const gameBtn = document.querySelector(".game__button");
const gameScore = document.querySelector(".game__score");
const gameTimer = document.querySelector(".game__timer");

let sec = 5;

const gameBanner = new PopUp();

const game = new Game(5, 5, 5);
game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case "cancel":
      message = "REPLAY?";
      break;
    case "win":
      message = "YOU WON!";
      break;
    case "lose":
      message = "YOU LOSE!";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameBanner.showWithText(message);
});

gameBanner.setClickListener(() => {
  game.start();
});
