const userForm = document.getElementById('form');
const userName = document.getElementById('username');
const passWord = document.getElementById('password');


function showError(input, message) { 
      input.classList.add('error');
      const small = userForm.querySelector('small'); 
 small.classList.add('error');
    small.innerText = message;
}


function showSuccess(input) {
    input.classList.add('success');
    small.classList.remove('error');
  
}
//Check email is valid

function isValidEmail(input) {
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 if (re.test(input.value.trim())) 
 { showSuccess(input); } 
 else 
 { showError(input, message);
} 
}

/// Event Listeners

userForm.addEventListener('submit', function(e) {
     e.preventDefault();
  if (userName.value === '') 
  { 
      showError(userName, 'Email is reguired!') 
  } 
  else if (!isValidEmail(userName)) 
  {
    showError(userName, 'Email is not correct!') 
  } 
  else if (isValidEmail(userName)) {
     showSuccess(userName);
  }
  
  if (passWord.value === '') 
  { showError(passWord, 'Password is reguired');
 } 
  else { showSuccess(passWord);}
} 
);





// if (email.value === '') { showError(email, 'Email is reguired');  } 
//  else if (!isValidEmail(email.value)) {  showError(email, 'Email is not valid');  } 
//     else {  showSuccess(email);  }
//  if (password.value === '') { showError(password, 'Password is reguired'); } 
// else { showSuccess(password); }
//  if (password2.value === '') { showError(password2, 'Confirm your password'); } 
// else { showSuccess(password2); } 
// });