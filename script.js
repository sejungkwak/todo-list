//selectors
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
let todos = [];

//event listener
todoInput.addEventListener('keydown', addTodo);
todoList.addEventListener('mousedown', editTodo);
todoList.addEventListener('contextmenu', e => e.preventDefault());

getFromLocal();

//functions
// add user input to array and localStorage and then render
function addTodo(e) {
  if ( e.key === 'Enter' ) {
    e.preventDefault();

    if ( e.target.value !== '' ) {
      const todo = {
        id: Date.now(),
        name: e.target.value,
        completed: false
      }
      todos.push(todo);

      todoInput.value = '';

      addToLocalstorage(todos);
      renderTodos(todos);
    }
  }
}

//add to localstorage
function addToLocalstorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

//render todos
function renderTodos(todos) {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.setAttribute('data-key', todo.id)
    li.className = 'todo-item';

    if ( todo.completed === true ) {
      li.classList.add('completed');
    }

    li.innerText = todo.name;
    todoList.appendChild(li);
  });
}

// left or right click event
function editTodo(e) {
  const todoItems = todoList.children;

  for ( let i = 0; i < todoItems.length; i++ ) {
    //left click: line through
    if ( e.target === todoItems[i] && e.which === 1 ) {
      todoItems[i].classList.toggle('completed');
      toggleTodo(todoItems[i].getAttribute('data-key'));
    }
    //right click: remove item
    if ( e. target === todoItems[i] && e.which === 3 ) {
      deleteTodo(todoItems[i].getAttribute('data-key'));
      todoItems[i].remove();
    }
  }
}

// completed itmes 
function toggleTodo(todo) {
  todos.forEach(item => {
    if ( item.id == todo  ) {
      item.completed = !item.completed;
    }
  })
  addToLocalstorage(todos);
}

// delete items
function deleteTodo(todo) {
  todos.forEach(item => {
    if ( item.id == todo ) {
      todos.splice(todos.indexOf(item), 1);
    }
  })
  addToLocalstorage(todos);
}

// pull data from localstorage and render
function getFromLocal() {
  const storageItems = localStorage.getItem('todos');
  if ( storageItems ) {
    todos = JSON.parse(storageItems);
    renderTodos(todos);
  }
}