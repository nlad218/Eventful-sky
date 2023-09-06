var cities = ["New York", "Los Angeles", "Chicago", "Miami"];
var weatherContainer = $("#weatherContainer");

cities.forEach(function (city) {
  // Use the OpenWeatherMap API to fetch weather data for each city
  $.ajax({
    type: "GET",
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=0210813d87f5e7c72760631806e4bd7d",
    async: true,
    dataType: "json",
    success: function (weatherData) {
      console.log(weatherData);
      displayWeatherInfo(city, weatherData);
    },
    error: function (xhr, status, err) {
      console.error("Error fetching weather data for " + city + ": " + err);
    },
  });
});

function displayWeatherInfo(city, weatherData) {
  var cityNameElement = $("<h2></h2>");
  cityNameElement.text("Weather in " + city);

  var temperatureElement = $("<p></p>");
  temperatureElement.text(
    "Temperature: " + (weatherData.main.temp - 273.15).toFixed(2) + "°C"
  );

  var weatherDescriptionElement = $("<p></p>");
  weatherDescriptionElement.text(
    "Weather: " + weatherData.weather[0].description
  );

  weatherContainer.append(cityNameElement);
  cityNameElement.append(temperatureElement);
  temperatureElement.append(weatherDescriptionElement);
}
