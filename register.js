document.addEventListener('DOMContentLoaded', () => {
  const formRegister = document.querySelector('#formRegister');

  const inputFirstName = document.querySelector('#firstName');
  const firstNameHelp = document.querySelector('#firstNameHelp');

  const inputSecondName = document.querySelector('#secondName');
  const secondNameHelp = document.querySelector('#secondNameHelp');

  const inputFatherLastname = document.querySelector('#fatherLastname');
  const fatherLastnameHelp = document.querySelector('#fatherLastnameHelp');

  const inputMotherLastname = document.querySelector('#motherLastname');
  const motherLastnameHelp = document.querySelector('#motherLastnameHelp');

  const inputPhone = document.querySelector('#phone');
  const phoneHelp = document.querySelector('#phoneHelp');
  const phoneHelp2 = document.querySelector('#phoneHelp2');

  const inputAddress = document.querySelector('#address');
  const addressHelp = document.querySelector('#addressHelp');

  const inputPostalCode = document.querySelector('#postalCode');
  const postalCodeHelp = document.querySelector('#postalCodeHelp');
  const postalCodeHelp2 = document.querySelector('#postalCodeHelp2');

  const alertSuccess = document.querySelector('#alertSuccess');
  const alertError = document.querySelector('#alertError');

  const isInformed = (value) => {
    if (value === null || value === undefined || value === '') return false;
    return true;
  }

  const isValidPostalCode = (value) => {
    if (value.length != 5 || isNaN(value)) return false;
    return true;
  }

  const isValidPhone = (value) => {
    if (value.length < 8 || value.length > 10 || isNaN(value)) return false;
    return true;
  }

  const register = (event) => {
    const phone = inputPhone.value;
    const postalCode = inputPostalCode.value;

    let isValid = true;
    // console.log(isInformed(inputFirstName.value));

    let miPrimeraPromise = new Promise((resolve, reject) => {
      setTimeout(function(){
        !isInformed(inputFirstName.value) ? firstNameHelp.removeAttribute('hidden') : firstNameHelp.setAttribute('hidden', true);;
        resolve(isInformed(inputFirstName.value));
      }, 250);
    });

    let miSegundaPromise = new Promise((resolve, reject) => {
      setTimeout(function(){
        !isInformed(inputFatherLastname.value) ? fatherLastnameHelp.removeAttribute('hidden') : fatherLastnameHelp.setAttribute('hidden', true);;
        resolve(isInformed(inputFatherLastname.value));
      }, 250);
    });

    let miTerceraPromise = new Promise((resolve, reject) => {
      setTimeout(function(){
        !isInformed(inputMotherLastname.value) ? motherLastnameHelp.removeAttribute('hidden') : motherLastnameHelp.setAttribute('hidden', true);;
        resolve(isInformed(inputMotherLastname.value));
      }, 250);
    });

    let miCuartaPromise = new Promise((resolve, reject) => {
      setTimeout(function(){
        !isInformed(inputPhone.value) ? phoneHelp.removeAttribute('hidden') : phoneHelp.setAttribute('hidden', true);;
        resolve(isInformed(inputPhone.value));
      }, 250);
    });

    let miQuintaPromise = new Promise((resolve, reject) => {
      setTimeout(function(){
        !isInformed(inputPostalCode.value) ? postalCodeHelp.removeAttribute('hidden') : postalCodeHelp.setAttribute('hidden', true);;
        resolve(isInformed(inputPostalCode.value));
      }, 250);
    });

    let miSextaPromise = new Promise((resolve, reject) => {
      setTimeout(function(){
        !isValidPostalCode(inputPostalCode.value) ? postalCodeHelp2.removeAttribute('hidden') : postalCodeHelp2.setAttribute('hidden', true);;
        resolve(isValidPostalCode(inputPostalCode.value));
      }, 250);
    });

    let miSeptimaPromise = new Promise((resolve, reject) => {
      setTimeout(function(){
        !isValidPhone(inputPhone.value) ? phoneHelp2.removeAttribute('hidden') : phoneHelp2.setAttribute('hidden', true);;
        resolve(isValidPhone(inputPhone.value));
      }, 250);
    });

    Promise.all([miPrimeraPromise, miSegundaPromise, miTerceraPromise, miCuartaPromise, miQuintaPromise, miSextaPromise, miSeptimaPromise])
      .then(responses=>{
        if (!responses.includes(false)) {
          const data = {
            firstName: inputFirstName.value,
            secondName: inputSecondName.value,
            fatherLastname: inputFatherLastname.value,
            motherLastname: inputMotherLastname.value,
            phone: inputPhone.value,
            address: inputAddress.value,
            postalCode: inputPostalCode.value,
          };

          axios
            .post('https://demo7460034.mockable.io/users', data)
              .then(response => {
                if (response.data.success) {
                  alertSuccess.removeAttribute('hidden');
                }
                else {
                  alertError.removeAttribute('hidden');
                }
              })
        }
      })
    event.preventDefault();
  };

  formRegister.addEventListener('submit', register);
})