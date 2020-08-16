const todoListDOM = {
  form: document.querySelector('.todo-list__form'),
  input: document.querySelector('.todo-list__input'),
  todo: document.querySelector('.todo-list__todo'),
  doing: document.querySelector('.todo-list__doing'),
  done: document.querySelector('.todo-list__done'),
  list: document.querySelector('.todo-list')
};
const todoListClassNames = {
  item: 'todo-list__item',
  leftButton: 'todo-list__change-left',
  rightButton: 'todo-list__change-right',
  deleteButton: 'todo-list__delete'
};
const TYPE_TODO = 'todo',
  TYPE_DOING = 'doing',
  TYPE_DONE = 'done';
const TODO_LS = 'todo';
let todo = [];

function addTodo(text) {
  const data = {
    id: Date.now(),
    content: text,
    type: TYPE_TODO
  };

  todo.push(data);
  saveTodo();
}

function saveTodo() {
  localStorage.setItem(TODO_LS, JSON.stringify(todo));
}

function loadTodo() {
  if (localStorage.getItem(TODO_LS)) {
    todo = JSON.parse(localStorage.getItem(TODO_LS));
  }
  renderTodo();
}

function renderTodo() {
  clearAllTodos();
  todo.forEach(elm => {
    const div = document.createElement('div');
    div.classList.add(todoListClassNames.item);
    div.id = elm.id;
    div.dataset.type = elm.type;
    div.textContent = elm.content;

    const leftButton = document.createElement('button');
    leftButton.classList.add(todoListClassNames.leftButton);
    leftButton.textContent = '⬅';

    const rightButton = document.createElement('button');
    rightButton.classList.add(todoListClassNames.rightButton);
    rightButton.textContent = '➡';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add(todoListClassNames.deleteButton);
    deleteButton.textContent = '❌';

    div.appendChild(leftButton);
    div.appendChild(rightButton);

    switch (elm.type) {
      case TYPE_TODO:
        leftButton.classList.add('hidden');
        todoListDOM.todo.appendChild(div);
        break;
      case TYPE_DOING:
        todoListDOM.doing.appendChild(div);
        break;
      case TYPE_DONE:
        rightButton.classList.add('hidden');
        todoListDOM.done.appendChild(div);
        break;
      default:
        console.log("Something's wrong!");
    }

    div.appendChild(deleteButton);
  })
}

function clearAllTodos() {
  function clearChildDivNode(nodelist) {
    for (let i = nodelist.length - 1; i >= 0; i--) {
      const currentElement = nodelist[i];
      if (currentElement.nodeName === 'DIV') currentElement.remove();
    }
  }
  clearChildDivNode(todoListDOM.todo.childNodes);
  clearChildDivNode(todoListDOM.doing.childNodes);
  clearChildDivNode(todoListDOM.done.childNodes);
}

function changeTodoType(id, type) {
  for (let i = 0, len = todo.length; i < len; i++) {
    if (todo[i].id === parseInt(id)) {
      todo[i].type = type;
      console.log(todo[i]);
      break;
    }
  }
  saveTodo();
}

function deleteTodo(id) {
  todo = todo.filter(item => item.id !== parseInt(id));
  saveTodo();
}

function handleSubmit(event) {
  event.preventDefault();
  addTodo(todoListDOM.input.value);
  todoListDOM.input.value = '';
  renderTodo();
}

function handleButtonClick(event) {
  const todoId = event.target.parentNode.id;
  const originalType = event.target.parentNode.dataset.type;
  let newType;
  let isChanged;
  if (event.target.classList.contains(todoListClassNames.leftButton)) {
    newType = originalType === TYPE_DOING ? TYPE_TODO : TYPE_DOING;
  } else if (event.target.classList.contains(todoListClassNames.rightButton)) {
    newType = originalType === TYPE_TODO ? TYPE_DOING : TYPE_DONE;
  } else if (event.target.classList.contains(todoListClassNames.deleteButton)) {
    deleteTodo(todoId);
    isChanged = true;
  }

  if (newType) {
    changeTodoType(todoId, newType);
    isChanged = true;
  }
  if (isChanged) {
    renderTodo();
  }
}

function initTodo() {
  loadTodo();
  todoListDOM.form.addEventListener('submit', handleSubmit);
  todoListDOM.list.addEventListener('click', handleButtonClick);
}

initTodo();