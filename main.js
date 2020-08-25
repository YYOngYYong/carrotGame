"use strict";

const startBtn = document.querySelector(".fa-play");
const stopBtn = document.querySelector(".fa-stop");
const gameField = document.querySelector(".game__field");
const fieldRect = gameField.getBoundingClientRect();
const popUp = document.querySelector(".pop-up");
const refreshyBtn = document.querySelector(".refresh");
const game__score = document.querySelector(".game__score");
let sec = 10;
let start = false;
let carrotCount = 5;
let score = 0;

gameField.addEventListener("click", onEventClick);
//시작 버튼 클릭 시 gamefield에 당근 5개 벌레 5개 생성해서 배치
start = true;
startBtn.addEventListener("click", () => {
  initGame();
  startBtn.classList.add("played");
  stopBtn.classList.add("visible");
  var timer = setInterval(function () {
    document.querySelector(".game__timer").innerHTML = sec;
    sec--;

    //정지 버튼 누를 시
    stopBtn.addEventListener("click", () => {
      clearInterval(timer);
      start = false;
      startBtn.classList.remove("played");
      stopBtn.classList.remove("visible");
    });
    //타임아웃시 팝업창 발생
    if (sec < 0) {
      clearInterval(timer);
      score = 0;
      popUp.classList.add("pop-up--visible");
      //시간 초과시 refresh 버튼 활성화
      refreshyBtn.addEventListener("click", () => {
        gameField.innerHTML = "";
        start = true;
        popUp.classList.remove("pop-up--visible");
        sec = 10;
        var timer = setInterval(function () {
          document.querySelector(".game__timer").innerHTML = sec;
          sec--;

          //타임아웃시 팝업창 발생
          if (sec < 0) {
            clearInterval(timer);
            popUp.classList.add("pop-up--visible");
            //시간 초과시 refresh 버튼 활성화
            refreshyBtn.addEventListener("click", () => {
              gameField.innerHTML = "";
              popUp.classList.remove("pop-up--visible");
              sec = 10;
              initGame();
            });
          }
        }, 1000);

        initGame();
      });
    }
  }, 1000);
});

//게임시작
function initGame() {
  if (start === true) {
    addItem("bug", 5, "img/bug.png");
    addItem("carrot", 5, "img/carrot.png");
  }

  //벌레와 당근을 생성한 뒤 field에 추가해줌
}

//게임필드 클릭

function onEventClick(event) {
  const target = event.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    game__score.innerText = score;
    if (score == 5) {
      popUp.classList.add("pop-up--visible");
      score = 0;
      game__score.innerText = "";
      refreshyBtn.addEventListener("click", () => {
        gameField.innerHTML = "";
        popUp.classList.remove("pop-up--visible");
        sec = 10;
        initGame();
      });
    }
  }
}

const carrotSize = 80;

//벌레 , 당근 아이템 필드에 랜덤으로 추가
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
