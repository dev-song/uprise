const clockDOM = {
  day: document.querySelector('.clock__day'),
  time: document.querySelector('.clock__time')
}
const dayNames = {
  ko: ['일', '월', '화', '수', '목', '금', '토'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};
let language = 'ko';

function getCurrentTime() {
  const now = new Date();
  const time = {
    year: now.getFullYear(),
    month: now.getMonth(),
    date: now.getDate(),
    day: now.getDay(),
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds()
  }
  return time;
}

function activateClock() {
  return setInterval(() => {
    const time = getCurrentTime();
    clockDOM.day.textContent = `${time.year}년 ${time.month}월 ${time.date}일 ${dayNames[language][time.day]}`;
    clockDOM.time.textContent = `${time.hour}:${time.minute < 10 ? `0${time.minute}` : time.minute}:${time.second < 10 ? `0${time.second}` : time.second}`;
  }, 1000);
}

function initClock() {
  activateClock();
}

initClock();