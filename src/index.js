function displayTemperatureFunction(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dayTimeElement = document.querySelector("#day-and-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}" class="emoji" />`;
  dayTimeElement.innerHTML = dayFunction(date);
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);

  displayForecast(response.data.city);
}

function dayFunction(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes},`;
}

function searchCity(city) {
  let apiKey = "6778eb30a3f8f38t710a50259f4eoc6f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperatureFunction);
}

function citySearchFunction(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-search-text");
  let cityElement = document.querySelector("#city");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", citySearchFunction);

function getForecast(city) {
  let apiKey = "6778eb30a3f8f38t710a50259f4eoc6f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  let forecastHTMl = "";

  days.forEach(function (day) {
    forecastHTMl =
      forecastHTMl +
      `<div class "weather-forecast">
          <div class="weather-forecast-day">${day}</div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
                width="40px"
              />

              <div class="weather-forecast-temperatures">
                <strong class="weather-forecast-max"> 12° </strong>
                <span class="weather-forecast-min"> 10° </span>
              </div>
            </div>
        `;
  });

  let weatherForecast = document.querySelector("#forecast");
  weatherForecast.innerHTML = forecastHTMl;
}

searchCity("London");
