var list = [];
var input = document.getElementById("to-do-input");
var todoList = document.getElementById("to-do-list-li");
var button = document.getElementById("btn-add-todo");
const pendingTasks = document.getElementById("pendingTasks");
let toDoListData;

const fetchToDos = async () => {
    const res = await fetch('https://cv-backend.ikbendirk.nl/todos')
        .then(res => res.json())
        .then(json => json.data)

        toDoListData = Object.entries(res);
        displayToDos(toDoListData);
        console.log(toDoListData);
}

function displayToDos(toDos) {
    const htmlString = toDos.map(([key, toDoInfo]) => {
        console.log(toDoInfo);
        return `
            <li> 
                <button class="color_btn urgent colorBtn" onclick="showColor(this)" id="btnUrgent"><i class="fas fa-exclamation"></i></button>
                ${toDoInfo.taskName} 
                <button class="deleteBtn" onclick="deleteTask()";><i class="fas fa-trash"></i></button>
            </li>
        `;
    }).join('');
    document.getElementById("to-do-list-li").innerHTML = htmlString;
    pendingTasks.innerHTML = `You have ${toDoListData.length} pending tasks`
}

button.addEventListener("click", function(){
    list.push(input.value);
    displayToDo(list);
    input.value = '';
    button.classList.add("disabled");
})

input.addEventListener("keyup", function () {
    if (input.value == '') {
        button.classList.add("disabled");
    } else {
        button.classList.remove("disabled");
    }
})

function deleteTask(i) {
    console.log(toDoListData)
    list.splice(i, 1)
    displayToDos(toDoListData)
}

function showColor(button) {
    const changeColor = button.parentElement;
    changeColor.classList.toggle("toggleClass");
    button.classList.toggle("toggleClass");
}

fetchToDos();
