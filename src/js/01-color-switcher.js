const refs = {
  bodyEl: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
const bcgInterval = 1000;

refs.btnStart.addEventListener('click', onClickStartBtn);
refs.btnStop.addEventListener('click', onClickStopBtn);

function onClickStartBtn(event) {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  timeId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, bcgInterval);
}

function onClickStopBtn(event) {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  clearInterval(timeId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
