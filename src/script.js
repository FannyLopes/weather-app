let currentDate = new Date();
let ListDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = ListDays[currentDate.getDay()];
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();

let showDate = document.querySelector("h2");
showDate.innerHTML = `${today} ${hours}:${minutes}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h3");
  temperatureElement.innerHTML = `${temperature}ºC`;
  let description = document.querySelector("h5");
  description.innerHTML = response.data.weather[0].main;
}
function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  let apiKey = "ad1a51d08b6686a739675f6d3e3d864c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  cityInput.value = "";
}
let city = document.querySelector("#search-form");
city.addEventListener("submit", showCity);

function weatherCurrentLocation(response) {
  let city = document.querySelector("h1");
  city.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h3");
  temperatureElement.innerHTML = `${temperature}ºC`;
  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector("h5");
  descriptionElement.innerHTML = `${description}`;
}

function getLocation(position) {
  let apiKey = "ad1a51d08b6686a739675f6d3e3d864c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(weatherCurrentLocation);
}

function searchLocation() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

let button = document.querySelector("#button-current");
button.addEventListener("click", searchLocation);
