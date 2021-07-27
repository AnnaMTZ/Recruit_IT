// JS all required elements
const inputBox = document.querySelector(".to-do-inputfield input");
const addBtn = document.querySelector(".to-do-inputfield button");
const todoList = document.querySelector(".to-do-list");


addBtn.onclick = () => {
    let userData = inputBox.value; // variable for input 
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
    // for the pending
    const pendingNumb = document.querySelector(".pending")
    pendingNumb.textContent = listArr.length;
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element}<span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`
    });
    todoList.innerHTML = newLiTag; // to add new li tag inse the lu tag
    inputBox.value = ""; // this function will enable that the input field will be blank 
    // max 10 tasks in list
    for (let i = 0; i <newLiTag; i++) {

    }
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

//this function highlights tasks that are of priority
