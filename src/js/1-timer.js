import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  dataInput: document.querySelector('.date-input'),
  startBtn: document.querySelector('[data-start]'),
};

refs.startBtn.disabled = true;
refs.dataInput.classList.add('disable-input');

let userSelectedDate = null;
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selected = selectedDates[0];

    if (!selected) {
      refs.startBtn.disabled = true;
      userSelectedDate = null;
      return;
    }

    if (selected > new Date()) {
      userSelectedDate = selected;
      refs.startBtn.disabled = false;
      refs.dataInput.classList.remove('disable-input');
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      refs.startBtn.disabled = true;
      refs.dataInput.classList.add('disable-input');
      userSelectedDate = null;
    }
  },
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
