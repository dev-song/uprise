const clock = document.querySelector('.js-clock');
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

function printClock() {
  const repeat = setInterval(() => {
    const time = getCurrentTime();
    const dayText = `${time.year}년 ${time.month}월 ${time.date}일 ${dayNames[language][time.day]}`;
    const timeText = `${time.hour}:${time.minute < 10 ? `0${time.minute}` : time.minute}:${time.second < 10 ? `0${time.second}` : time.second}`;
    console.log(dayText, timeText);
  }, 1000);
}