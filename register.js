console.log('Welcome to validations!');

document.addEventListener('DOMContentLoaded', () => {
  const formRegister = document.querySelector('#formRegister');

  const inputFirstName = document.querySelector('#firstName');
  const inputSecondName = document.querySelector('#secondName');
  const inputFatherLastname = document.querySelector('#fatherLastname');
  const inputMotherLastname = document.querySelector('#motherLastname');
  
  const inputPhone = document.querySelector('#phone');
  const phoneHelp = document.querySelector('#phoneHelp');

  const inputAddress = document.querySelector('#address');
  
  const inputPostalCode = document.querySelector('#postalCode');
  const postalCodeHelp = document.querySelector('#postalCodeHelp');

  const alertSuccess = document.querySelector('#alertSuccess');
  const alertError = document.querySelector('#alertError');

  const register = (event) => {
    const phone = inputPhone.value;
    const postalCode = inputPostalCode.value;
    let isValid = true;

    if (phone.length < 8 || phone.length > 10 || isNaN(phone)) {
      phoneHelp.removeAttribute('hidden');
      isValid = false;
    }
    else {
      phoneHelp.setAttribute('hidden', true);
    }

    if (postalCode.length !== 5 || isNaN(postalCode)) {
      postalCodeHelp.removeAttribute('hidden');
      isValid = false;
    }
    else {
      postalCodeHelp.setAttribute('hidden', true);
    }
    
    if (isValid) {
      axios
        .post('https://demo7460034.mockable.io/users')
          .then(response => {
            if (response.data.success) {
              alertSuccess.removeAttribute('hidden');
              // alert('Registro exitoso!');
            }
            else {
              alertError.removeAttribute('hidden');
              // alert('Oops! Algo salió mal al registrarte!');
            }
          })
    }
    
    event.preventDefault();
  };

  formRegister.addEventListener('submit', register);
})