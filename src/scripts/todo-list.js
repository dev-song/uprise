const todoListDOM = {
  form: document.querySelector('.todo-list__form'),
  input: document.querySelector('.todo-list__input'),
  todo: document.querySelector('.todo-list__todo'),
  doing: document.querySelector('.todo-list__doing'),
  done: document.querySelector('.todo-list__done')
}
let todo = [];
const status = ['todo', 'doing', 'done'];
const TODO_LS = 'todo';

function addTodo(text) {
  const data = {
    id: Date.now(),
    content: text,
    type: 'todo'
  }

  todo.push(data);
}

function saveTodo() {
  localStorage.setItem(TODO_LS, todo);
}

function handleSubmit(event) {
  event.preventDefault();
  addTodo(todoListDOM.input.value);
  todoListDOM.input.value = '';
}

function renderTodo() {
  todo.forEach(elm => {
    const div = document.createElement('div');
    div.classList.add('todo-list__item');
    div.textContent = elm.content;

    switch (elm.type) {
      case 'todo':
        todoListDOM.todo.appendChild(div);
        break;
      case 'doing':
        todoListDOM.doing.appendChild(div);
        break;
      case 'done':
        todoListDOM.done.appendChild(div);
        break;
      default:
        console.log("Something's wrong!");
    }
  })
}

function clearTodo() {
  todoListDOM.todo.innerHTML = '';
  todoListDOM.doing.innerHTML = '';
  todoListDOM.done.innerHTML = '';
}

function initTodo() {
  todoListDOM.form.addEventListener('submit', handleSubmit);
}

initTodo();