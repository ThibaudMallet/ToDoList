//Selecteurs

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Ecouteurs

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);

//Fonctions
function addTodo(event) {
    event.preventDefault();
    //Créer le Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Créer le li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    //Ajouter le li à la div
    todoDiv.appendChild(newTodo);
    //Ajouter la todo au local storage
    saveLocalTodos(todoInput.value)
    //Bouton Check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="far fa-plus-square"></i>';
    completedButton.classList.add("complete-button");
    //Ajouter le bouton à la div
    todoDiv.appendChild(completedButton);
    //Bouton delete
    const deletedButton = document.createElement("button");
    deletedButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deletedButton.classList.add("delete-button");
    //Ajouter le bouton à la div
    todoDiv.appendChild(deletedButton);
    todoList.appendChild(todoDiv);
    todoInput.value ="";
}

function deleteCheck(e) {
    const item = e.target;
    //Delete Todo
    if (item.classList[0] === "delete-button") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo)
    todo.addEventListener("transitionend", function() {
        todo.remove();
    });
    }
    //Check Todo
    if (item.classList[0] === "complete-button") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }

    })
}

function saveLocalTodos(todo){
    //Checker s'il y a des items existants
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos () {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Créer le li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        //Ajouter le li à la div
        todoDiv.appendChild(newTodo);
        //Bouton Check
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="far fa-plus-square"></i>';
        completedButton.classList.add("complete-button");
        //Ajouter le bouton à la div
        todoDiv.appendChild(completedButton);
        //Bouton delete
        const deletedButton = document.createElement("button");
        deletedButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deletedButton.classList.add("delete-button");
        //Ajouter le bouton à la div
        todoDiv.appendChild(deletedButton);
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}