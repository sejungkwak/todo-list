# To Do List

![screen recording](https://media.giphy.com/media/dfvnKqLXNJJCoE4Zda/giphy.gif?cid=790b7611cb6ad9e1ff9f25fb17f59d79f2404b7082e5ecd0&rid=giphy.gif&ct=g)

## project notes

1. HTML

- h1: todos
- input / placeholder: Enter your todo
- small: Left click to toggle completed.
  Right click to delete todo.

2. CSS

3. JavaScript

- Left click to toggle completed. Right click to delete todo.
- event listener
- LocalStorage

---

Challenge from Brad Traversy & Florin Pop on Udemy '50 Projects in 50 Days'

---

## Takeaways from the instructor

1. HTML

- input autocomplete="off"
- ul under form tag

2. CSS

- .input:focus { outline-color:}

3. Javascript

- variable for form + 'submit' event listener
- 'click' event listener for the left click
- 'contextmenu' event listener for the right click

```

const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if ( todos ) {
  todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  addTodo();
})

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text
  }

  if (todoText) {
    const todoEl = document.createElement('li');
    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLS();
    })

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    })

    todosUL.appendChild(todoEl);

    input.value = '';

    updateLS();
  }
}

function updateLS() {
  todosEl = document.querySelectorAll('li');

  const todos = [];

  todosEl.forEach(todoEl => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed')
    })
  })

  localStorage.setItem('todos', JSON.stringify(todos))
}
```
