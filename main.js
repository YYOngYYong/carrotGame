"use strict";
//시작 버튼 클릭 시 gamefield에 당근 5개 벌레 5개 생성해서 배치
const startBtn = document.querySelector(".fa-play");
const stopBtn = document.querySelector(".fa-stop");
const gameField = document.querySelector(".game__field");
const fieldRect = gameField.getBoundingClientRect();
const popUp = document.querySelector(".pop-up");

let sec = 10;
//플레이버튼 클릭 시 실행
startBtn.addEventListener("click", () => {
  initGame();

  startBtn.classList.add("played");
  stopBtn.classList.add("visible");
  var timer = setInterval(function () {
    document.querySelector(".game__timer").innerHTML = sec;
    sec--;

    //타임아웃시
    if (sec < 0) {
      clearInterval(timer);
      popUp.classList.add("pop-up--visible");
    }
  }, 1000);
});

//게임시작
function initGame() {
  //벌레와 당근을 생성한 뒤 field에 추가해줌
  addItem("bug", 5, "img/bug.png");
  addItem("carrot", 5, "img/carrot.png");
}

const carrotSize = 80;
function addItem(name, count, imgPath) {
  const x1 = 0;
  const x2 = fieldRect.width - carrotSize;
  const y1 = 0;
  const y2 = fieldRect.height - carrotSize;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", name);
    item.setAttribute("src", imgPath);
    //positon 걸어주지 않으면 body로 잡혀리는것 기억.
    item.style.position = "absolute";
    //랜덤 좌표로 이미지 배치
    const x = `${Math.random() * (x2 - x1) + x1}px`;
    const y = `${Math.random() * (y2 - y1) + y1}px`;
    item.style.left = x;
    item.style.top = y;
    gameField.appendChild(item);
  }
}
