const refs = {
  startBtnRef: document.querySelector('button[data-start]'),
  stopBtnRef: document.querySelector('button[data-stop]'),
  bodyRef: document.querySelector('body'),
};
console.log(refs.bodyRef);
idInterval = null;
refs.startBtnRef.addEventListener('click', onStartBtnClick);
refs.stopBtnRef.addEventListener('click', onStopBtnClick);
refs.stopBtnRef.disabled = true;

function onStartBtnClick() {
  let color = getRandomHexColor();
  idInterval = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = `${color}`;
  }, 1000);
  //   refs.stopBtnRef.disabled = false;
  //   refs.startBtnRef.disabled = true;
  btnTogler();
}

function onStopBtnClick() {
  clearInterval(idInterval);
  //   refs.stopBtnRef.disabled = true;
  //   refs.startBtnRef.disabled = false;
  btnTogler();
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function btnTogler() {
  if (!refs.startBtnRef.disabled) {
    refs.startBtnRef.disabled = true;
    refs.stopBtnRef.disabled = false;
  } else {
    refs.startBtnRef.disabled = false;
    refs.stopBtnRef.disabled = true;
  }
}
