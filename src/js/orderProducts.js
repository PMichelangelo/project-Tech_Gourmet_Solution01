import axios from 'axios';

const checkoutForm = document.querySelector('.checkoutForm');
const emailInput = document.querySelector('.placeholder-email');

checkoutForm.addEventListener('submit', onsubmit)

function onsubmit(event) {
  event.preventDefault();
    if (validateEmail(emailInput.value)) {
        sendFormData(emailInput.value);
      } else {
        alert('Please, please enter the correct email!');
      }
    };

function validateEmail(email) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
      };

function sendFormData(email) {
    const serverUrl = 'https://food-boutique.b.goit.study/api/orders';

    const formData = {
      email: email
    };

    axios.post(serverUrl, formData)
          .then(response => {
            alert('Welcome to the Food Boutique! 🥦🍓 With Food Boutique, youre not just subscribing to food, youre signing up for a fresher, fitter, and happier you. Get ready to elevate your wellness journey, one bite at a time!');
          })
          .catch(error => {
            console.error(error);
          });
      }


