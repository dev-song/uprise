const clockDOM = {
  day: document.querySelector('.clock__day'),
  time: document.querySelector('.clock__time')
}
const dayNames = {
  ko: ['일', '월', '화', '수', '목', '금', '토'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};

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
    const englishDayText = `${time.month}/${time.date}/${time.year} ${dayNames.en[time.day]}`,
      koreanDayText = `${time.year}/${time.month}/${time.date} ${dayNames.ko[time.day]}`;

    clockDOM.day.textContent = language === 'ko' ? koreanDayText : englishDayText;
    clockDOM.time.textContent = `${time.hour}:${time.minute < 10 ? `0${time.minute}` : time.minute}:${time.second < 10 ? `0${time.second}` : time.second}`;
  }, 1000);
}

function initClock() {
  activateClock();
}

initClock();