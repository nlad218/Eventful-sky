$(document).ready(function () {
  // Define a variable to store the selected city
  var selectedCity = "";

  // Event listeners for the city buttons
  $("#denver").click(function () {
    selectedCity = "Denver";
    fetchWeatherAndSportsData(selectedCity);
  });

  $("#newYork").click(function () {
    selectedCity = "New York City";
    fetchWeatherAndSportsData(selectedCity);
  });

  $("#chicago").click(function () {
    selectedCity = "Chicago";
    fetchWeatherAndSportsData(selectedCity);
  });

  $("#baltimoreDC").click(function () {
    selectedCity = "Baltimore";
    fetchWeatherAndSportsData(selectedCity);
  });

  $("#losAngeles").click(function () {
    selectedCity = "Los Angeles";
    fetchWeatherAndSportsData(selectedCity);
  });

  $("#miami").click(function () {
    selectedCity = "Miami";
    fetchWeatherAndSportsData(selectedCity);
  });

  $("#dallas").click(function () {
    selectedCity = "Dallas";
    fetchWeatherAndSportsData(selectedCity);
  });

  $("#boston").click(function () {
    selectedCity = "Boston";
    fetchWeatherAndSportsData(selectedCity);
  });

  // Function to display weather data in individual cards
  function displayWeatherCards(city, forecastData) {
    var weatherRow = $("#weatherRow");

    // Clear previous cards if any
    weatherRow.empty();

    // Loop through the forecast data (every 8 hours)
    for (var i = 0; i < forecastData.list.length; i += 8) {
      var forecast = forecastData.list[i];
      var cardHtml = `
        <div class="col-md-3 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Date/Time: ${forecast.dt_txt}</h5>
              <p class="card-text">Temperature: ${(
                forecast.main.temp - 273.15
              ).toFixed(2)}°C</p>
              <p class="card-text">Weather: ${
                forecast.weather[0].description
              }</p>
              <p class="card-text">Humidity: ${forecast.main.humidity}%</p>
            </div>
          </div>
        </div>
      `;
      weatherRow.append(cardHtml);
    }
  }

  // Function to fetch weather data from OpenWeatherMap API for 5 days
  function fetchWeatherData(city) {
    var apiKey = "0210813d87f5e7c72760631806e4bd7d";

    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`,
      async: true,
      dataType: "json",
      success: function (data) {
        // Display weather data in individual cards
        displayWeatherCards(city, data);
      },
      error: function (xhr, status, err) {
        console.error(`Error fetching weather data for ${city}: ${err}`);
      },
    });
  }

  // Function to fetch sports events from Ticketmaster API and sort by date
  function fetchSportsEvents(city) {
    var apiKey = "dyJlprt5GV4U77gi63lcD1hjTcNSPTsi";
    var sportsContainer = $("#eventsRow");

    $.ajax({
      type: "GET",
      url: `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&segmentId=KZFzniwnSyZfZ7v7nE&apikey=${apiKey}`,
      async: true,
      dataType: "json",
      success: function (data) {
        console.log(data);
        if (
          data._embedded &&
          data._embedded.events &&
          data._embedded.events.length > 0
        ) {
          // Sort events by date
          data._embedded.events.sort(function (a, b) {
            return (
              new Date(a.dates.start.localDate) -
              new Date(b.dates.start.localDate)
            );
          });

          // Display sports events in chronological order
          var eventsHtml = "";
          var favoriteButton = $("<button>")
            .text("Add to Favorites")
            .addClass("btn btn-primary");

          data._embedded.events.forEach(function (event) {
            var eventName = event.name;
            var eventDate = event.dates.start.localDate;
            var venueName = event._embedded.venues[0].name;
            var eventCity = event._embedded.venues[0].city.name;
            var eventState = event._embedded.venues[0].state.name;
            var eventUrl = event.url;

            var eventImage = "";
            if (event.images && event.images.length > 0) {
              eventImage = event.images[0].url;
            }
            var imageElement = $("<img>").attr("src", eventImage);
            imageElement.attr("style", "width: 250px");

            eventsHtml += `
                          <div class="col-md-6 mb-4 mt-5">
                              <div class="event card">
                              ${favoriteButton.prop("outerHTML")}
                              <img class="card-img-none" src="${eventImage}" alt="${eventName}">
                              <a href="${eventUrl}">
                              <div class="alert alert-primary custom-alert" role="alert">Click Here to Purchase Tickets!</div>
                              </a>
                                  <div class="card-body">
                                      <h5 class="card-title">${eventName}</h5>
                                      <p class="card-text">Date: ${eventDate}</p>
                                      <p class="card-text">Venue: ${venueName}</p>
                                      <p class="card-text">Location: ${eventCity}, ${eventState}</p>
                                  </div>
                              </div>
                          </div>
                      `;
          });

          sportsContainer.html(eventsHtml);
        } else {
          sportsContainer.html("<p>No sports events found.</p>");
        }
      },
      error: function (xhr, status, err) {
        console.error(`Error fetching sports events for ${city}: ${err}`);
      },
    });
  }

  // Function to fetch weather data and sports events data
  function fetchWeatherAndSportsData(city) {
    fetchWeatherData(city);
    fetchSportsEvents(city);
  }
});
