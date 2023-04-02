let now = new Date();
let time = document.querySelector("#currentTime");
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekdays[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

currentTime.innerHTML = `${day}, ${hour}:${minutes}`;

navigator.geolocation.getCurrentPosition(findCity);

function showForecast(response) {
  console.log(response);

  let tempValue = document.querySelector("#temperature");
  tempValue.innerHTML = Math.round(`${response.data.daily[0].temperature.day}`);

  let weatherValue = document.querySelector("#weatherName");
  weatherValue.innerHTML = `${response.data.daily[0].condition.description}`;

  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = `${response.data.daily[0].temperature.humidity}`;

  let windValue = document.querySelector("#speed");
  windValue.innerHTML = `${response.data.daily[0].wind.speed}`;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `${response.data.daily[0].condition.icon_url}`
  );

  celciusTemp = response.data.daily[0].temperature.day;

  changeToFahr.classList.remove("active");
  changeToCelcius.classList.add("active");
}

//Format date info in forecast
function formatDate(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//Inject forecast div in java
function displayForecast(response) {
  console.log(response.data.daily);
  let weatherForecast = response.data.daily;

  let forecastElement = document.querySelector("#weatherForecast");

  let forecastHTML = `"<div class="row justify-content-md-center">`;

  weatherForecast.forEach(function (weatherForecastDay, index) {
    if (index >= 1) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="forecast-date">${formatDate(
                  weatherForecastDay.time
                )}</div>
                <div class="forecast-icon"><img id="icon" src="${
                  weatherForecastDay.condition.icon_url
                }" width="40" 
            /></div>
                <div class="forecast-temp">
                  <span class="forecast-temp-low" id="forecast-min">${Math.round(
                    weatherForecastDay.temperature.minimum
                  )}° </span>
                  <span class="forecast-temp-up" id="forecast-max">${Math.round(
                    weatherForecastDay.temperature.minimum
                  )}°</span>
                </div>
              </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function displayCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityName");
  let citySearch = document.querySelector("#cityInput");
  cityName.innerHTML = `${citySearch.value}`;
  let apiKey = "61to45a09fcda0fa1383b34254a00c2c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${citySearch.value}&key=${apiKey}`;
  axios.get(`${apiUrl}`).then(showForecast);
  axios.get(`${apiUrl}`).then(displayForecast);
}

function displayCity2(response) {
  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = `${response.data.city}`;
}

function findCity(position) {
  let apiKey = "61to45a09fcda0fa1383b34254a00c2c";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
  axios.get(`${url}`).then(displayCity2);
  axios.get(`${url}`).then(showForecast);
  axios.get(`${url}`).then(displayForecast);
}

function findLocation() {
  navigator.geolocation.getCurrentPosition(findCity);
}

let changeCity = document.querySelector(".form");
changeCity.addEventListener("submit", displayCity);

let changeCurrentPlace = document.querySelector("button");
changeCurrentPlace.addEventListener("click", findLocation);
