var list = [];
var input = document.getElementById("to-do-input");
var todoList = document.getElementById("to-do-list-li");
var button = document.getElementById("btn-add-todo");
const pendingTasks = document.getElementById("pendingTasks");
let toDoListDataObject;
let toDoListData = []

const fetchToDos = async () => {
    const res = await fetch('https://cv-backend.ikbendirk.nl/todos')
        .then(res => res.json())
        .then(json => json.data)

        toDoListDataObject = res;
        toDoListData = Object.entries(toDoListDataObject);
        displayToDos(toDoListData);
        console.log(toDoListData);
}

//This function get's todo's from the database
function displayToDos(toDos) {
    const htmlString = toDos.map(([key, toDoInfo]) => {
        console.log(toDoInfo);
        return `
            <li id="${key}"> 
                <button class="color_btn urgent colorBtn" onclick="makeUrgent(this)" id="btnUrgent"><i class="fas fa-exclamation"></i></button>
                ${toDoInfo.taskName} 
                <button class="deleteBtn" onclick="deleteTask(this)";><i class="fas fa-trash"></i></button>
            </li>
        `;
    }).join('');
    document.getElementById("to-do-list-li").innerHTML = htmlString;
    pendingTasks.innerHTML = `You have ${toDoListData.length} pending tasks`
}

fetchToDos();

let postData = {
    // "taskName": "Een todo 2", 
    "done": false,
    "urgent": false
}

button.addEventListener("click", function(e){
    e.preventDefault()
    button.classList.add("disabled");

    updatePostData()

    fetch('https://cv-backend.ikbendirk.nl/todo/',{
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(postData),

})
    .then(response => response.json())
    .then(data => {
        console.log('success', data); 
        fetchToDos()
})
    .catch((error) => {console.log('there was an error', error)})
})

const updatePostData = (urgent, taskName, todoId) => {
    if(todoId) {
        postData.todoId = todoId
        postData.taskName = taskName
        postData.urgent = urgent
    } else {
        // postData.urgent = urgent
        postData.taskName = input.value
    }

}


function deleteTask(element) {
    console.log(element.parentElement.id)
    fetch(`https://cv-backend.ikbendirk.nl/todo/${element.parentElement.id}` , {
    method: 'DELETE',
    headers: {"Content-Type": "application/json"}
  })
    .then(response => { return response.json();}) 
    .then(data => { 
        console.log(data)
        fetchToDos() 
    })
}
  
input.addEventListener("keyup", function () {
    if (input.value == '') {
        button.classList.add("disabled");
    } else {
        button.classList.remove("disabled");
    }
})

input.addEventListener("keyup", function () {
    if (toDoListData.length == 10) {
        button.classList.add("disabled");
    } else {
        button.classList.remove("disabled");
    }
})

function makeUrgent(button) {
    console.log(button.parentElement.id)
    const changeColor = button.parentElement;
    changeColor.classList.toggle("toggleClass");
    button.classList.toggle("toggleClass");
    console.log(changeColor.classList.contains("toggleClass"))
    button.classList.add("disabled");
    const toDoTaskName = toDoListDataObject[button.parentElement.id].taskName;
    const toDoUrgentState = toDoListDataObject[button.parentElement.id].urgent;
    
    updatePostData(!toDoUrgentState, toDoTaskName, button.parentElement.id)

    fetch('https://cv-backend.ikbendirk.nl/todo/',{
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(postData),

})
    .then(response => response.json())
    .then(data => {
        console.log('success', data); 
        fetchToDos()
})
    .catch((error) => {console.log('there was an error', error)})
}





// if LI is more than 7 days old showColor (automatically toggleClass) 
// setTimeout(function() {
//     const sevenDaysOld = button.parentElement;
// }, 60480000)

// if toggleClass is present than move to top of the list
// if element.parentElement.id has toggleClass present


// $(document).ready(function() {
//     $('button.parentElement').click(function() {
//       var clicked = $(this);
//       var previousAll = clicked.prevAll();

//       if(previousAll.length > 0) {
//         var top = $(previousAll[previousAll.length - 1]);
//         var previous = $(previousAll[0]);
//         var moveUp = clicked.attr('offsetTop') - top.attr('offsetTop');
//         var moveDown = (clicked.offset().top + clicked.outerHeight()) - (previous.offset().top + previous.outerHeight());

//         clicked.css('position', 'relative');
//         previousAll.css('position', 'relative');
//         clicked.animate({'top': -moveUp});
//         previousAll.animate({'top': moveDown}, {complete: function() {
//           clicked.parent().prepend(clicked);
//           clicked.css({'position': 'static', 'top': 0});
//           previousAll.css({'position': 'static', 'top': 0}); 
//         }});
//       }
//     });
//   });

