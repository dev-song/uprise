const userInfoDOM = {
  name: document.querySelector('.user-info__name'),
  input: document.querySelector('.user-info__input'),
  change: document.querySelector('.user-info__change-button'),
  confirm: document.querySelector('.user-info__confirm-button'),
  delete: document.querySelector('.user-info__delete-button')
}
let username = language === 'ko' ? '친구' : 'my friend';
let isUsernameChanging = false;
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
  isUsernameChanging = true;
  userInfoDOM.name.classList.add('hidden');
  userInfoDOM.change.classList.add('hidden');
  userInfoDOM.input.classList.remove('hidden');
  userInfoDOM.confirm.classList.remove('hidden');
}

function confirmUsernameChange() {
  const newName = userInfoDOM.input.value;
  if (!newName) return;

  isUsernameChanging = false;
  username = newName;
  saveUsername(newName);
  printUsername();
  userInfoDOM.input.value = '';
  userInfoDOM.input.classList.add('hidden');
  userInfoDOM.confirm.classList.add('hidden');
  userInfoDOM.name.classList.remove('hidden');
  userInfoDOM.change.classList.remove('hidden');
}

function cancelUsernameChange() {
  userInfoDOM.input.value = '';
  userInfoDOM.input.classList.add('hidden');
  userInfoDOM.confirm.classList.add('hidden');
  userInfoDOM.name.classList.remove('hidden');
  userInfoDOM.change.classList.remove('hidden');
}

function deleteUsername() {
  if (isUsernameChanging) {
    cancelUsernameChange();
  }

  username = language === 'ko' ? '친구' : 'my friend';
  localStorage.setItem(USERNAME_LS, '');
  printUsername();
}

function initUserInfo() {
  loadUsername();
  printUsername();

  userInfoDOM.change.addEventListener('click', changeUsername);
  userInfoDOM.confirm.addEventListener('click', confirmUsernameChange);
  userInfoDOM.delete.addEventListener('click', deleteUsername);
}

initUserInfo();