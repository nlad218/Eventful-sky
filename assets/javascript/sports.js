$(document).ready(function () {
  // Define a variable to store the selected city
  var selectedCity = "";

  // Event listeners for the city buttons
  $("#denver").click(function () {
    selectedCity = "Denver";
    fetchWeatherData(selectedCity);
    fetchSportsEvents(selectedCity);
  });

  $("#newYork").click(function () {
    selectedCity = "New York City";
    fetchWeatherData(selectedCity);
    fetchSportsEvents(selectedCity);
  });

  $("#chicago").click(function () {
    selectedCity = "Chicago";
    fetchWeatherData(selectedCity);
    fetchSportsEvents(selectedCity);
  });

  $("#baltimoreDC").click(function () {
    selectedCity = "Baltimore";
    fetchWeatherData(selectedCity);
    fetchSportsEvents(selectedCity);
  });

  $("#losAngeles").click(function () {
    selectedCity = "Los Angeles";
    fetchWeatherData(selectedCity);
    fetchSportsEvents(selectedCity);
  });

  $("#miami").click(function () {
    selectedCity = "Miami";
    fetchWeatherData(selectedCity);
    fetchSportsEvents(selectedCity);
  });

  $("#dallas").click(function () {
    selectedCity = "Dallas";
    fetchWeatherData(selectedCity);
    fetchSportsEvents(selectedCity);
  });

  $("#boston").click(function () {
    selectedCity = "Boston";
    fetchWeatherData(selectedCity);
    fetchSportsEvents(selectedCity);
  });

  // Function to fetch weather data from OpenWeatherMap API
  function fetchWeatherData(city) {
    var apiKey = "0210813d87f5e7c72760631806e4bd7d";
    var weatherContainer = $("#weatherContainer");

    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
      async: true,
      dataType: "json",
      success: function (data) {
        // Display weather data
        var weatherHtml = `
          <h2>Weather in ${city}</h2>
          <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Weather: ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}%</p>
        `;
        weatherContainer.html(weatherHtml);
      },
      error: function (xhr, status, err) {
        console.error(`Error fetching weather data for ${city}: ${err}`);
      },
    });
  }

  // Function to fetch sports events from Ticketmaster API and sort by date
  function fetchSportsEvents(city) {
    var apiKey = "dyJlprt5GV4U77gi63lcD1hjTcNSPTsi";
    var sportsContainer = $("#sportContainer");

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
          var eventsHtml = "<h2>Upcoming Sports Events</h2>";

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
              <div class="event">
              <a href=${eventUrl}>${imageElement.prop("outerHTML")}</a>
                <h3>${eventName}</h3>
                <p>Date: ${eventDate}</p>
                <p>Venue: ${venueName}</p>
                <p>Location: ${eventCity}, ${eventState}</p>
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
  function fetchWeatherAndSportsData(city) {
    fetchWeatherData(city);
    fetchSportsEvents(city);
  }
});
