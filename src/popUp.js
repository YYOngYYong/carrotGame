"use strict";

export default class PopUp {
  constructor() {
    this.refresh = document.querySelector(".pop-up__refresh");
    this.message = document.querySelector(".message");
    this.popUp = document.querySelector(".pop-up");
    this.refresh.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.message.innerText = text;
    this.popUp.classList.remove("pop-up--hide");
  }

  hide() {
    this.popUp.classList.add("pop-up--hide");
  }
}
