import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  myInput: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};
let timerId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      options.defaultDate = selectedDates[0];
      refs.startBtn.disabled = false;
    }
  },
};
const fp = flatpickr(refs.myInput, options);

refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);

// //по натисканню на старт запускаэться таймер. від даного часу відняти поточний, запихнути у йункцію convertMs
// const selectedDate = fp.selectedDates[0];

// function onStartBtnClick(evt) {
//   timerId = setInterval(() => {
//     const startTime = new Date();
//     const countdown = selectedDate - startTime;
//     refs.startBtn.disabled = true;

//     if (countdown < 0) {
//       clearInterval(timerId);
//       return;
//     }
//     updateTimerFace(convertMs(countdown));
//   }, 1_000);
// }

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function updateTimerFields({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = days;
  refs.timerHours.textContent = addLeadingZero(hours);
  refs.timerMinutes.textContent = addLeadingZero(minutes);
  refs.timerSeconds.textContent = addLeadingZero(seconds);
}

function onStartBtnClick() {
  const selectedDate = fp.selectedDates[0];

  timerId = setInterval(() => {
    const startTime = new Date();
    const countdown = selectedDate - startTime;
    refs.startBtn.disabled = true;

    if (countdown < 0) {
      clearInterval(timerId);
      return;
    }
    updateTimerFields(convertMs(countdown));
  }, 1000);
}
