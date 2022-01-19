//This file has not the "CheckTodos" function, then I realized the repetition of that piece of code and refactored it in the refactored_app.js file 

//Selectors

const userNameTitle = document.querySelector('.todo-title');
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Ask user name to custom list's title
var name = prompt('Hi! Enter your name and start being productive');
userNameTitle.innerText = name.charAt(0).toUpperCase() + name.slice(1) + "'s" + " " + "Todo list";


//Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions

function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add Todo to Local Storage
    saveLocalTodos(todoInput.value);
    //Create CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append all the above to the list
    todoList.appendChild(todoDiv);
    //Clear Todo INPUT value
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;
    //Delete TODO
    if(item.classList[0] === 'trash-btn') { //i.e. if the first class of the item element is 'trash-btn',
        const todo = item.parentElement; //then delete its parent (the div inside the ul inside the main div)
        //Animation
        todo.classList.add('fall');
        //Remove
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }
    //Check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(event.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //Check if there's anything yet
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); //filled array
    }

    todos.push(todo); //push the todo input to the todos array
    localStorage.setItem('todos', JSON.stringify(todos)); //pushing the array back to localStorage
}

function getTodos() {
    //Check if there's anything yet
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); //filled array
    }
    todos.forEach(function(todo) {
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Create CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append all the above to the list
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) { //todo = div
    //Check if there's anything yet
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); //filled array
    }
    const todoIndex = todo.children[0].innerText; //get the element
    todos.splice(todos.indexOf(todoIndex), 1); //remove the element in the todoIndex position, and remove just that one
    localStorage.setItem('todos', JSON.stringify(todos));
}