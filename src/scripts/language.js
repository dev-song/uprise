const languageDOM = {
  select: document.querySelector('.language-select'),
  languages: document.querySelectorAll('.language-select > li')
}
const translateDOM = {
  greetings: document.querySelector('.user-info__greetings'),
  userNameInput: document.querySelector('.user-info__input'),
  todoInput: document.querySelector('.todo-list__input'),
  todoTitle: document.querySelector('.todo-list__todo > h3'),
  doingTitle: document.querySelector('.todo-list__doing > h3'),
  doneTitle: document.querySelector('.todo-list__done > h3')
}
const LANGUAGE_LS = 'language';
let language = 'ko';

function changeLanguage(lang) {
  language = lang;
  saveLanguage(lang);
  location.reload();
}

function saveLanguage(lang) {
  localStorage.setItem(LANGUAGE_LS, lang);
}

function loadLanguage() {
  const lang = localStorage.getItem(LANGUAGE_LS);
  if (lang) {
    language = lang;
  }
}

function translateToEn() {
  if (language !== 'en') return;
  translateDOM.greetings.textContent = 'Nice to meet you,';
  translateDOM.userNameInput.placeholder = 'Enter your name';
  translateDOM.todoInput.placeholder = 'Register things to do';
  translateDOM.todoTitle.textContent = 'Todo';
  translateDOM.doingTitle.textContent = 'Doing';
  translateDOM.doneTitle.textContent = 'Done';
}

function renderLanguage() {
  languageDOM.languages.forEach(node => {
    if (node.dataset.lang === language) {
      node.classList.add('active');
      console.log(node, 'active');
    } else {
      node.classList.remove('active');
    }
  })
}

function handleUlClick(event) {
  if (event.target.nodeName !== 'LI' || event.target.dataset.lang === language) return;

  changeLanguage(event.target.dataset.lang);
}

function initLanguage() {
  loadLanguage();
  translateToEn();
  renderLanguage();
  languageDOM.select.addEventListener('click', handleUlClick);
}

initLanguage();