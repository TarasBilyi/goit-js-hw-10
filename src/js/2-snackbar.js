import iziToast from 'izitoast';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(refs.delayInput.value);
  const selectedState = document.querySelector('input[name="state"]:checked');
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState.value === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({
        title: 'Success',
        message: value,
        position: 'topRight',
        timeout: 3000,
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: error,
        position: 'topRight',
        timeout: 3000,
      });
    });

  refs.form.reset();
});
