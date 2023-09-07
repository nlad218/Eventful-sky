// var cities = ["New York", "Los Angeles", "Chicago", "Miami"];
// var weatherContainer = $("#weatherContainer");

// cities.forEach(function (city) {
//   // Use the OpenWeatherMap API to fetch weather data for each city
//   $.ajax({
//     type: "GET",
//     url:
//       "https://api.openweathermap.org/data/2.5/weather?q=" +
//       city +
//       "&appid=0210813d87f5e7c72760631806e4bd7d",
//     async: true,
//     dataType: "json",
//     success: function (weatherData) {
//       console.log(weatherData);
//       displayWeatherInfo(city, weatherData);
//     },
//     error: function (xhr, status, err) {
//       console.error("Error fetching weather data for " + city + ": " + err);
//     },
//   });
// });

// function displayWeatherInfo(city, weatherData) {
//   var weatherCard = $("<div></div>");
//   weatherCard.addClass("card mb-3");

//   var cardBody = $("<div></div>");
//   cardBody.addClass("card-body");

//   var cityNameElement = $("<h5></h5>");
//   cityNameElement.addClass("card-title");
//   cityNameElement.text("Weather in " + city);

//   var temperatureElement = $("<p></p>");
//   temperatureElement.addClass("card-text");
//   temperatureElement.text(
//     "Temperature: " + (weatherData.main.temp - 273.15).toFixed(2) + "°C"
//   );

//   var weatherDescriptionElement = $("<p></p>");
//   weatherDescriptionElement.addClass("card-text");
//   weatherDescriptionElement.text(
//     "Weather: " + weatherData.weather[0].description
//   );

//   weatherContainer.append(weatherCard);
//   weatherCard.append(cardBody);
//   cardBody.append(cityNameElement);
//   cardBody.append(temperatureElement);
//   cardBody.append(weatherDescriptionElement);
// }
