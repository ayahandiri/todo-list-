const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);


function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value)

    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("c-button");
    todoDiv.appendChild(completeButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("t-button");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "t-button") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", function () {
            
            todo.remove();
        });
    }

    if (item.classList[0] === "c-button") {
        const todo = item.parentElement;
        todo.classList.toggle("complete");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) { // Correction ici, fermant correctement la fonction avec { et }
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "complete":
                if (todo.classList.contains("complete")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncomplete":
                if (todo.classList.contains("complete")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
        }
    });
}
function saveLocalTodos(todo){
    let todos ;
    if(localStorage.getItem("todos")===null){
        todos=[]
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos));

}

function getTodos(){
    let todos ;
    if(localStorage.getItem("todos")===null){
        todos=[]
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

    

        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add("c-button");
        todoDiv.appendChild(completeButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("t-button");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });

}
function removeLocalTodos(todo){
    let todos ;
    if(localStorage.getItem("todos")===null){
        todos=[]
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexof(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));


}