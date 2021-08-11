const resetButton = document.getElementById('loginBtn');
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
  if (re.test(input.value.trim())) { showSuccess(input); }
  else {
    showError(input, message);
  }
}

/// Event Listeners
resetButton.addEventListener('click', login);

const users = [
  {
    email: 'ken@capgemini.com',
    password: 'ken123',
    name: 'ken',
    admin: true,
    secretQuestion: 'What is the name of your first pet?',
    secretAnswer: 'Snoop Dogg'
  },
  {
    email: 'anna@capgemini.com',
    password: 'anna123',
    name: 'anna',
    admin: true
  },
  {
    email: 'firenzo@capgemini.com',
    password: 'firenzo123',
    name: 'firenzo',
    admin: false
  },
  {
    email: 'redmar@capgemini.com',
    password: 'redmar123',
    name: 'redmar',
    admin: false
  }
];

// function login() {
//   var username = document.getElementById("username").value;
//   var password = document.getElementById("password").value;

//   users.forEach(user => {
//     if (user.email === username && user.password === password) {
//       window.location = "./index.html";
//     } else {
//       document.getElementById("loginError").innerHTML = "Wrong login credentials"
//     }
//   }
//   );
// }

function login() {
  var username = document.getElementById("username");
  var password = document.getElementById("password");
  var loginError = document.getElementById("loginError");

  users.forEach(user => {
    if (user.email === username.value && user.password === password.value) {
      window.location = "./index.html";
    } else {
      loginError.innerHTML = "Wrong login credentials";
      loginError.style.color = "#f74040";
      username.style.border = "1px solid #f74040";
      password.style.border = "1px solid #f74040";
    }
  }
  );
}

// document.getElementById("secretQuestion").innerHTML = secretQuestion.value;
// document.getElementById("secretAnswer").innerHTML = secretAnswer.value;

function passwordValidation() {
  var question = document.getElementById("question").value;
  var answer = document.getElementById("answer").value;

  users.forEach(reset => {
    if (reset.secretQuestion === question && reset.secretAnswer === answer) {
      window.location = "./login.html";
    } else {
      document.getElementById("wrongAnswer").innerHTML = "Wrong secret answer"
    }
  }
  );
}



// console.log(username);
// var password = document.getElementById("password").value;
// if (username === users[0].email && password === users[0].password) {
//   console.log(username);
//   window.location = "./index.html";
// }