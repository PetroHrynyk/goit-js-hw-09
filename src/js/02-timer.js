import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const input = document.getElementById('datetime-picker');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

let timerTime = 0;
let selDate = new Date();
let countdown = 0;

updateCountValue();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selDate = selectedDates[0].getTime();

    if (selectedDates[0] <= new Date()) {
      Notify.warning('Будь-ласка виберіть дату в майбутньому', {
        position: 'center-center',
        timeout: 4000,
        clickToClose: true,
      });
    } else {
      startBtn.removeAttribute('disabled');
      input.setAttribute('disabled', true);
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', startTimer);
startBtn.setAttribute('disabled', true);

function startTimer() {
  countdown = setInterval(updateCountValue, 1000);
  startBtn.setAttribute('disabled', true);
  Notify.success('Починаю відлік!', {
    position: 'center-center',
    timeout: 1000,
    clickToClose: true,
    showOnlyTheLastOne: true,
  });
}

function updateCountValue() {
  timerTime = selDate - new Date().getTime();
  const t = convertMs(timerTime);
  console.log('timerTime', timerTime);
  console.log('t', t);

  if (timerTime < 0) {
    clearInterval(countdown);
    Notify.success('Відлік завершено', {
      position: 'center-center',
      timeout: 4000,
      clickToClose: true,
      showOnlyTheLastOne: true,
    });
    input.removeAttribute('disabled');
    return;
  }

  spanDays.innerHTML = t.days.toString().padStart(2, '0');
  spanHours.innerHTML = t.hours.toString().padStart(2, '0');
  spanMinutes.innerHTML = t.minutes.toString().padStart(2, '0');
  spanSeconds.innerHTML = t.seconds.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
