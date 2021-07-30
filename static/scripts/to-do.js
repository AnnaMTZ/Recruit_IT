/*
const inputBox = document.querySelector(".to-do-inputfield input"); //het input field van de to-do html wordt aangehaald door variabel inputBox
const addBtn = document.querySelector(".to-do-inputfield button");//de add button van de to-do html wordt aangehaald door variabel addBtn
const todoList = document.querySelector(".to-do-list");//de variabel die de inhoud van de to-do list aangeeft

// als op de add knop wordt gedrukt wordt de volgende functie uitgevoerd
addBtn.onclick = () => { 
    let userData = inputBox.value; // userData als variabel returns the value of the value attribute of a text field.
    let getLocalStorage = localStorage.getItem("New Todo"); // getting user entered value
    if(getLocalStorage == null) { // if local storage = null
        listArr = []; //creates a blanc array
    } else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a JS object
    }
    listArr.push(userData); // pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr));// transforming JS object into a json string
    showTasks(); // calling show tasks function
}

// this function enables me to add task list inside ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null) { // if local storage = null
        listArr = []; //creates a blanc array
    } else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a JS object
    }
    // Deze variabel update hoeveel tasks er open staan
    const pendingNumb = document.querySelector(".pending")
    pendingNumb.textContent = listArr.length;
    let newLiTag = ''; // Deze variabel geeft de li's aan
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element}<button onclick="deleteTask(${index})";><i class="fas fa-trash"></i></button></li>`
    }); // Deze functie is de tag die wordt toegevoegd
    todoList.innerHTML = newLiTag; // Deze variable zorgt ervoor dat een nieuwe li in de lu wordt gemaakt
    inputBox.value = ""; // Deze functie zorgt ervoor dat het input veld leeg is
    // max 10 tasks in list. 
    // als newLiTag meer dan 10 items heeft dan mag ie niet meer bijmaken
}

// this function deletes tasks
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particulair indexed li
    // after remove the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));// transforming JS object into a json string
    showTasks(); // calling show tasks function
}
*/
//this function highlights tasks that are of priority
// Als newLiTag ouder is dan 7 dagen kleur rood 


var list = ["Ken Bellen", "Firenzo mailen", "Anna Whatsappen", "Meeting met Ken", "CV van Ken doorsturen", "Pauze houden", "Gesprek met Gabriel inplannen", "Herinnering sturen aan Firenzo om CV bij te werken", "CV van Anna in het systeem zetten", "Herinnering sturen aan Redmar om CV bij te werken"];
var input = document.getElementById("to-do-input");
var todoList = document.getElementById("to-do-list-li");
var button = document.getElementById("btn-add-todo");

const displayToDo = (todos) => {
    const htmlString = todos.map((todo, index) => {
        return `<li> ${todo}<button onclick="deleteTask(${index})";><i class="fas fa-trash"></i></button></li>`;
    }).join('');
    todoList.innerHTML = htmlString;
}

displayToDo(list)

button.addEventListener("click", function(){
    list.push(input.value);
    displayToDo(list);
})

input.addEventListener("keyup", function(){
    if (input.value == '') {
        button.classList.add("disabled");
    } else {
        button.classList.remove("disabled");
    }
})


function deleteTask (i) {
    list.splice(i, 1)
    displayToDo(list);
}


/*
function showList (){
    todoList.innerHTML = "";
    list.forEach(function(n, i){
    todoList.innerHTML = "<li>"+n+"<a onclick='deleteItem("+i+")'></span></li>";
    })
}

document.getElementById("btn").addEventListener("click", function(){
    list.push(input.value);
    showList()
})

function deleteTask (i) {
    list.splice(i, 1)
    showList()
}*/