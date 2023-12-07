const checkoutForm = document.getElementById('checkoutForm');
const emailInput = document.getElementById('email');

checkoutForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateEmail(emailInput.value)) {
        sendFormData(emailInput.value);
      } else {
        alert('Please, please enter the correct email!');
      }
    });

function validateEmail(email) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
      };

function sendFormData(email) {
    const serverUrl = 'https://food-boutique.b.goit.study/api';

}



async function addBook(book) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  };

  const response = await fetch(`${BASE_URL}/books`, options);
  const newBook = await response.json();

  return newBook
}