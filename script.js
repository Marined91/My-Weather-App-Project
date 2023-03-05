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
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hour < 10) {
  hour = `0${hour}`;
}

currentTime.innerHTML = `${day}, ${hour}:${minutes}`;

navigator.geolocation.getCurrentPosition(findCity);

function showForecast(response) {
  console.log(response);

  let tempValue = document.querySelector("#temperature");
  let tempRounded = Math.round(`${response.data.main.temp}`);
  tempValue.innerHTML = `${tempRounded}`;

  let weatherValue = document.querySelector("#weatherName");
  weatherValue.innerHTML = `${response.data.weather[0].main}`;

  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = `${response.data.main.humidity}`;

  let windValue = document.querySelector("#speed");
  windValue.innerHTML = `${response.data.wind.speed}`;
}

function displayCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityName");
  let citySearch = document.querySelector("#cityInput");
  cityName.innerHTML = `${citySearch.value}`;
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showForecast);
}

function displayCity2(response) {
  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = `${response.data.name}`;
}

function findCity(position) {
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(displayCity2);
  axios.get(`${url}&appid=${apiKey}`).then(showForecast);
}

function findLocation() {
  navigator.geolocation.getCurrentPosition(findCity);
}

let changeCity = document.querySelector(".form");
changeCity.addEventListener("submit", displayCity);

let changeCurrentPlace = document.querySelector("button");
changeCurrentPlace.addEventListener("click", findLocation);
