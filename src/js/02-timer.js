// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dataTimeInput: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  // timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.addEventListener('click', onClick);
refs.btnStart.disabled = true;

const options = {
  isActive: false,
  deltaTime: null,
  intervalId: null,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    Notify.success('The date is correct');
    refs.btnStart.disabled = false;

    const startTime = options.defaultDate;
    const endTime = selectedDates[0];
    options.deltaTime = endTime - startTime;
    const time = convertMs(options.deltaTime);
    updateClockFace(time);
  },
  startTimer() {
    // if (options.isActive) {
    //   return;
    // }
    refs.dataTimeInput.disabled = true;
    if (!refs.btnStart.disabled) {
      refs.dataTimeInput.disabled = true;
    }

    if (refs.dataTimeInput.disabled) {
      refs.btnStart.disabled = true;
    }

    if (options.isActive) {
      return;
    }

    options.isActive = true;

    const endTimer = options.deltaTime + Date.now();

    options.intervalId = setInterval(() => {
      if (
        refs.days.textContent === '00' &&
        refs.hours.textContent === '00' &&
        refs.minutes.textContent === '00' &&
        refs.seconds.textContent === '00'
      ) {
        refs.dataTimeInput.disabled = false;
        options.isActive = false;
        return clearInterval(options.intervalId);
      }

      const deltaTimer = endTimer - Date.now();
      const timer = convertMs(deltaTimer);
      updateClockFace(timer);
    }, 1000);
  },
};

flatpickr(refs.dataTimeInput, options);

function onClick(event) {
  options.startTimer();
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
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
