const PICTURES_URL = "https://source.unsplash.com/1600x900/?travel";

function loadBackgroundPicture() {
  const backgroundStyle = `center / cover no-repeat url(${PICTURES_URL})`;
  document.body.style.background = backgroundStyle;
}

function initBackground() {
  loadBackgroundPicture();
}

initBackground();