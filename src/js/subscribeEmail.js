const checkoutForm = document.getElementById('checkoutForm');
const emailInput = document.getElementById('email');

checkoutForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateEmail(emailInput.value)) {
        alert('The order has been accepted!'); 
      } else {
        alert('Please, please enter the correct email!');
      }
    });

function validateEmail(email) {
        var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
      }
