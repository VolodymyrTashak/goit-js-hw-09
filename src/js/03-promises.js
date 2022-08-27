import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  btnSubmit: document.querySelector('[name="submit"]'),
};

refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('intup', onInput);

let formData = {};
let counterPosition = 0;

// function onSubmit(event) {
//   event.preventDefault();
//   refs.btnSubmit.disabled = true;
//   setTimeout(() => {
//     let counterDelay = Number(formData.delay);
//     console.log(formData.delay);
//   });
// }

function onInput(event) {
  formData[event.target.value] = event.target.value;
  console.log(event.target.value);
}

// return createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     Notify.error(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, reject });
    }
  });
}
