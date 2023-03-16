
// Model
//If localstorage has a todos array, then use it
// Otherwise use the default array.
let todos;

//retrieve localStorage
const savedTodos = JSON.parse(localStorage.getItem('todos'));
// Check if its an array

if (Array.isArray(savedTodos))
    todos = savedTodos;
else
    todos = [];


//creates a todo
function createTodo(todovalue, dueDay) {
    const id = '' + new Date().getTime();  // '' converts a number to a string

    todos.push({
        title: todovalue,
        dueDate: dueDay,
        id: id
    });
    saveTodos();
}


// Delete a todo
function removeTodo(idToDelete) {
    todos = todos.filter(function(todo) {
        //if the id of this todo matches idToDelete, return false
        // For everyting else, return true
    
        if (todo.id === idToDelete)
            return false;
        else 
            return true;
    });
    saveTodos();
}


// View
const render = () => {
    
    //reset our list
    document.getElementById('todo-container').innerHTML = '';
    
    todos.forEach(todo =>{  //todo is a parameter of Arrow function
        let element = document.createElement('div');
        element.innerText = todo.title + '   ' + todo.dueDate;
        
        const deleteButton = document.createElement('button');
        deleteButton.innerText  = 'Delete';
        deleteButton.classList = 'btn-delete';

        deleteButton.onclick = deleteTodo;
        deleteButton.id = todo.id

        element.appendChild(deleteButton);
        
        let todoConatiner = document.getElementById('todo-container');
        todoConatiner.appendChild(element);
    }
)};

render();


function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//controller
let btnAdd = document.getElementById('btn-add');
btnAdd.onclick = ()=> {
    const todoText = document.getElementById('todo-title');
    const todovalue = todoText.value;

    const datePicker = document.getElementById('date-picker');
    const dueDay  = datePicker.value;

    createTodo(todovalue, dueDay);
    
    render();
}

function deleteTodo (event) {
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;
    
    removeTodo(idToDelete);
    render();
}
