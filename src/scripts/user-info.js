const userInfoDOM = {
  name: document.querySelector('.user-info__name'),
  input: document.querySelector('.user-info__input'),
  change: document.querySelector('.user-info__change-button'),
  confirm: document.querySelector('.user-info__confirm-button'),
  delete: document.querySelector('.user-info__delete-button')
}
let username = 'my friend';
const USERNAME_LS = 'username';

function loadUsername() {
  const savedName = localStorage.getItem(USERNAME_LS);
  if (!savedName) return;
  username = savedName;
}

function printUsername() {
  userInfoDOM.name.textContent = username;
}

function saveUsername(text) {
  localStorage.setItem(USERNAME_LS, text);
}

function changeUsername() {
  userInfoDOM.name.classList.add('hidden');
  userInfoDOM.input.classList.remove('hidden');
  userInfoDOM.confirm.classList.remove('hidden');
}

function confirmUsernameChange() {
  const newName = DOM.input.value;
  username = newName;
  printUsername();
  saveUsername(newName);
  userInfoDOM.input.value = '';
  userInfoDOM.input.classList.add('hidden');
  userInfoDOM.confirm.classList.add('hidden');
  userInfoDOM.name.classList.remove('hidden');
}

function initUserInfo() {
  loadUsername();
  printUsername();

  userInfoDOM.change.addEventListener('click', changeUsername);
  userInfoDOM.confirm.addEventListener('click', confirmUsernameChange);
}

initUserInfo();