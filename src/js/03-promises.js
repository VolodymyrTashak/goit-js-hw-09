import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  btnSubmit: document.querySelector('[type="submit"]'),
};

refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('input', onInput);

let formData = {};
let positionCounter = 0;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function onSubmit(evt) {
  evt.preventDefault();
  refs.btnSubmit.disabled = true;
  setTimeout(() => {
    let counterDelay = Number(formData.delay);
    let intervalId = null;
    intervalId = setInterval(() => {
      if (positionCounter !== Number(formData.amount)) {
        positionCounter += 1;
        counterDelay += Number(formData.step);
        return createPromise(positionCounter, counterDelay)
          .then(({ position, delay }) => {
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          });
      }
      clearInterval(intervalId);
      refs.btnSubmit.disabled = false;
      positionCounter = 0;
    }, formData.step);
  }, formData.delay);
  evt.currentTarget.reset();
}

function onInput(evt) {
  formData[evt.target.name] = evt.target.value;
}
