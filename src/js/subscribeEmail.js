import axios from 'axios';
import { openSubcribeModal, openErrorModal } from './modal.js';
export { onSubmit };


let emailInput;
function onSubmit(event) {
  event.preventDefault();

  emailInput = document.querySelector('.footer-input');

  if (validateEmail(emailInput.value)) {
    sendFormData(emailInput.value);
  } else {
    alert('Please enter the correct email!');
  }
}

function validateEmail(email) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

function sendFormData(email) {
  const serverUrl = 'https://food-boutique.b.goit.study/api/subscription';

  const formData = {
    email: email,
  };

  axios
    .post(serverUrl, formData)
    .then(response => {
      openSubcribeModal();
    })
    .catch(error => {
      if (error.message.includes('409')) {
        openErrorModal();
      }
    })
    .finally(el => {
      emailInput.value = '';
    });
}
