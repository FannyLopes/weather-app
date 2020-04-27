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
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let showDate = document.querySelector("h2");
showDate.innerHTML = `${today} ${hours}:${minutes}`;

function formatHour(timestamp) {
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let description = document.querySelector("h3");
  description.innerHTML = response.data.weather[0].description;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind} km/h`;

  let Feel = Math.round(response.data.main.temp);
  let FeelElement = document.querySelector("#feelslike");
  FeelElement.innerHTML = `${Feel}`;

  let descriptionImageElement = document.querySelector("#description-image");
  descriptionImageElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  descriptionImageElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML = `
   <div class="col-5">
      <div class="forecast-card">
        <h5>
          ${formatHour(forecast.dt * 1000)}
        </h5>
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" />
        <div class="forecast-temp">
          ${Math.round(forecast.main.temp)}º
        </div>
      </div>
    </div>
  `;
  }
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  let apiKey = "ad1a51d08b6686a739675f6d3e3d864c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);

  cityInput.value = "";
}
let city = document.querySelector("#search-form");
city.addEventListener("submit", showCity);

function weatherCurrentLocation(response) {
  let city = document.querySelector("h1");
  city.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h4");
  temperatureElement.innerHTML = `${temperature}ºC`;
  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector("h3");
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
