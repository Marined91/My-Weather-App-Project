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
  let tempRounded = Math.round(`${response.data.daily[0].temperature.day}`);
  tempValue.innerHTML = `${tempRounded}`;

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
}

function displayCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityName");
  let citySearch = document.querySelector("#cityInput");
  cityName.innerHTML = `${citySearch.value}`;
  let apiKey = "61to45a09fcda0fa1383b34254a00c2c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${citySearch.value}&key=${apiKey}`;
  axios.get(`${apiUrl}`).then(showForecast);
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
}

function findLocation() {
  navigator.geolocation.getCurrentPosition(findCity);
}

let changeCity = document.querySelector(".form");
changeCity.addEventListener("submit", displayCity);

let changeCurrentPlace = document.querySelector("button");
changeCurrentPlace.addEventListener("click", findLocation);
