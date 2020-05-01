function currentDate(timestamp) {
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
  return `${today} ${hours}:${minutes}`;
}
let showDate = document.querySelector("h2");
showDate.innerHTML = currentDate();

function forecastHour(timestamp) {
  let currentDate = new Date();
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
  celsiusTemperature = response.data.main.temp;

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

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
   <div class="col">
      <div class="forecast-card">
        <h5>
          ${forecastHour(forecast.dt * 1000)}
        </h5>
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" />
        <div class="forecast-temp">
          ${Math.round(forecast.main.temp)} ºC
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

function weatherCurrentLocation(response) {
  let city = document.querySelector("h1");
  city.innerHTML = `${response.data.name}`;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  celsiusTemperature = response.data.main.temp;

  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector("h3");
  descriptionElement.innerHTML = `${description}`;

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

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  let feelElement = document.querySelector("#feelslike");
  feelElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenehitLink.classList.add("active");
  celsiusLink2.classList.remove("active");
  fahrenehitLink2.classList.add("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let feelElement = document.querySelector("#feelslike");
  feelElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenehitLink.classList.remove("active");
  celsiusLink2.classList.add("active");
  fahrenehitLink2.classList.remove("active");
}

let celsiusTemperature = null;

let fahrenehitLink = document.querySelector("#fahrenheit-link");
fahrenehitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let celsiusLink2 = document.querySelector("#celsius-link2");
celsiusLink2.addEventListener("click", showCelsiusTemp);

let fahrenehitLink2 = document.querySelector("#fahrenheit-link2");
fahrenehitLink2.addEventListener("click", showFahrenheitTemp);

let city = document.querySelector("#search-form");
city.addEventListener("submit", showCity);

let button = document.querySelector("#button-current");
button.addEventListener("click", searchLocation);
