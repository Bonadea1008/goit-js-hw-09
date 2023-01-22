const refs = {
  startBtn: document.querySelector('button[data-start'),
  stopBtn: document.querySelector('button[data-stop'),
  bodyEl: document.querySelector('body'),
};
let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick(evt) {
  intervalId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.disabled = true;
}

function onStopBtnClick(evt) {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
}
