const submitEmaiButton = document.getElementById("submitEmail");
const userEmail = document.getElementById("userEmail");
const validateUserButton = document.getElementById("validateUser");

let user = {};
let answerFromUserInput;

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
        admin: true,
        secretQuestion: 'What is the name of your first pet?',
        secretAnswer: 'Snoop Dogg'
    },
    {
        email: 'firenzo@capgemini.com',
        password: 'firenzo123',
        name: 'firenzo',
        admin: false,
        secretQuestion: 'What is the name of your first pet?',
        secretAnswer: 'Snoop Dogg'
    },
    {
        email: 'redmar@capgemini.com',
        password: 'redmar123',
        name: 'redmar',
        admin: false,
        secretQuestion: 'What is the name of your first pet?',
        secretAnswer: 'Snoop Dogg'
    }
];

function checkEmail(event) {
    console.log(userEmail.value);
    users.forEach((element, index) => {
        if (userEmail.value === element.email) {
            user = element;
            console.log(user);
            showQuestion(element.secretQuestion, element.secretAnswer);
        } else {
            console.log("user not found");
        }
    });
}

function showQuestion(question, answer) {
    document.getElementById("secretQuestion").innerHTML = question;
}

function validateUser(user, answer) {
    if (user.secretAnswer === answer) {
        document.getElementById("showPassword").innerHTML = "Your password is: " + user.password;
    } else {
        document.getElementById("showPassword").innerHTML = "Your answer is not correct";
    }
    console.log(user, answer);
}

submitEmaiButton.addEventListener('click', (event) => {
    event.preventDefault();
    checkEmail();
});

validateUserButton.addEventListener('click', (event) => {
    event.preventDefault();
    answerFromUserInput = document.getElementById("answer").value;
    validateUser(user, answerFromUserInput);
});
