const DOM = {
  name: document.querySelector('.user-info__name'),
  input: document.querySelector('.user-info__input'),
  change: document.querySelector('.user-info__change-button'),
  confirm: document.querySelector('.user-info__confirm-button'),
  delete: document.querySelector('.user-info__delete-button')
}
let username = 'my friend';
const USERNAME_LS = 'username';

function getUsername() {
  const savedName = localStorage.getItem(USERNAME_LS);
  if (!savedName) return;
  username = savedName;
}

function printUsername() {
  DOM.name.textContent = username;
}

function saveUsername(text) {
  localStorage.setItem(USERNAME_LS, text);
}

function changeUsername() {
  DOM.name.classList.add('hidden');
  DOM.input.classList.remove('hidden');
  DOM.confirm.classList.remove('hidden');
}

function confirmUsernameChange() {
  const newName = DOM.input.value;
  username = newName;
  printUsername();
  saveUsername(newName);
  DOM.input.value = '';
  DOM.input.classList.add('hidden');
  DOM.confirm.classList.add('hidden');
  DOM.name.classList.remove('hidden');
}

function init() {
  getUsername();
  printUsername();

  DOM.change.addEventListener('click', changeUsername);
  DOM.confirm.addEventListener('click', confirmUsernameChange);
}

init();