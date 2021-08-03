var list = [];
var input = document.getElementById("to-do-input");
var todoList = document.getElementById("to-do-list-li");
var button = document.getElementById("btn-add-todo");

const fetchToDos = async () => {
    const res = await fetch('https://cv-backend.ikbendirk.nl/todos')
        .then(res => res.json())
        .then(json => json.data)

    displayToDos(Object.entries(res));
    console.log(Object.entries(res));
}

fetchToDos();

function displayToDos(toDos) {
    const htmlString = toDos.map(([key, toDoInfo]) => {
        console.log(toDoInfo);
        return `
        <li> ${toDoInfo.taskName}</li>
        `;
    }).join('');
    document.getElementById("to-do-list-li").innerHTML = htmlString;
}

const displayToDo = (todos) => {
    const htmlString = todos.map((todo, index) => {
        return `<li> ${todo}<button onclick="deleteTask(${index})";><i class="fas fa-trash"></i></button></li>`;
    }).join('');
    todoList.innerHTML = htmlString;
}

button.addEventListener("click", function () {
    list.push(input.value);
    userToDo(list);
})

input.addEventListener("keyup", function () {
    if (input.value == '') {
        button.classList.add("disabled");
    } else {
        button.classList.remove("disabled");
    }
})

function deleteTask(i) {
    list.splice(i, 1)
    displayToDo(list);
}

// const pendingNumb = document.querySelector(".pending")
// pendingNumb.textContent = htmlString.length;