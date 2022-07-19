let date = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let currentDay = days[date.getDay()];
let currentHours = date.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}
let currentMonth = months[date.getMonth()];
let currentDate = date.getDate();

let currentMinutes = date.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let today = document.querySelector("#today-date");
today.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentHours}:${currentMinutes}`;

function displaySearchLocationTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperatureToday");
  currentTemp.innerHTML = temp;
  let location = response.data.name;
  let currentLocation = document.querySelector("#city");
  currentLocation.innerHTML = location;
}
function changeLocation(event) {
  event.preventDefault();
  let searchLocation = document.querySelector("#city-input").value;
  let apiKey = "039c311a361445e74371c5ff199e2903";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displaySearchLocationTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", changeLocation);

function displayCurrentLocationTemperature(response) {
  console.log(response);
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperatureToday");
  currentTemp.innerHTML = temp;
  let location = response.data.name;
  let currentLocation = document.querySelector("#city");
  currentLocation.innerHTML = location;
}

function showCurrentLocation() {
  function showPosition(position) {
    let currentLatitude = position.coords.latitude;
    let currentLongitude = position.coords.longitude;
    console.log(currentLatitude);
    console.log(currentLongitude);
    let apiKey = "039c311a361445e74371c5ff199e2903";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayCurrentLocationTemperature);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentLocation);
