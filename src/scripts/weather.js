const API_KEY = '786473e13b2376e7a66f4036c572eda9';
const weatherDOM = {
  city: document.querySelector('.weather__city'),
  temp: document.querySelector('.weather__temperature')
}
const COORDS_LS = 'coordinates';

function getCoordinates() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function saveCoordinates(coords) {
  localStorage.setItem(COORDS_LS, JSON.stringify(coords));
}

function getWeather({ latitude, longitude }) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(json => renderWeather(json));
}

function renderWeather(data) {
  weatherDOM.city.textContent = data.name;
  weatherDOM.temp.textContent = data.main.temp.toFixed(1);
}

function handleGeoSuccess(geolocation) {
  const coords = {
    latitude: geolocation.coords.latitude,
    longitude: geolocation.coords.longitude
  };
  saveCoordinates(coords);
  getWeather(coords);
}

function handleGeoError(err) {
  console.error(`Error occurred: '${err.message}' with code ${err.code}`);
}

function initWeather() {
  const coords = localStorage.getItem(COORDS_LS);
  if (!coords) {
    getCoordinates();
  } else {
    getWeather(JSON.parse(coords));
  }
}

initWeather()