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

  function fetchWeatherData(city) {
    var apiKey = "0210813d87f5e7c72760631806e4bd7d";
    var weatherContainer = $("#weatherRow");

    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`, // Add "&units=imperial" to get temperatures in Fahrenheit
      async: true,
      dataType: "json",
      success: function (data) {
        var forecastHtml = `<h2>5-Day Weather Forecast in ${city}</h2><div class="forecast-container d-flex flex-nowrap overflow-auto">`;

        for (var i = 0; i < data.list.length; i += 8) {
          var forecast = data.list[i];
          forecastHtml += `
            <div class="card m-2" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">Date/Time: ${forecast.dt_txt}</h5>
                <p class="card-text">Temperature: ${forecast.main.temp.toFixed(
                  2
                )}°F</p> <!-- Display temperature in Fahrenheit -->
                <p class="card-text">Weather: ${
                  forecast.weather[0].description
                }</p>
                <p class="card-text">Humidity: ${forecast.main.humidity}%</p>
              </div>
            </div>
          `;
        }

        forecastHtml += "</div>";
        weatherContainer.html(forecastHtml);
      },
      error: function (xhr, status, err) {
        console.error(`Error fetching weather data for ${city}: ${err}`);
      },
    });
  }

  // Event listener for "Add to Favorites" buttons
  $("#eventsRow").on("click", ".favorites", function () {
    var eventIndex = $(this).closest(".col-md-3").index();
    var event = sportsEvents[selectedCity][eventIndex];

    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    var isEventInFavorites = favorites.some(function (favEvent) {
      return favEvent.id === event.id;
    });

    if (!isEventInFavorites) {
      favorites.push({
        id: event.id,
        name: event.name,
        date: event.dates.start.localDate,
        venue: event._embedded.venues[0].name,
        location: `${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.name}`,
        image:
          event.images && event.images.length > 0 ? event.images[0].url : "",
        url: event.url,
        link: event.url,
      });

      localStorage.setItem("favorites", JSON.stringify(favorites));

      // Display a confirmation message or update UI as needed
      $("#myModal .modal-title").text("Event added to favorites!");
      $("#myModal .modal-body").text(
        "You have successfully added this event to your favorites."
      );
      $("#myModal").modal("show");
    } else {
      // Display a message indicating that the event is already in favorites
      $("#myModal .modal-title").text("Event is already in favorites!");
      $("#myModal .modal-body").text(
        "This event is already in your favorites."
      );
      $("#myModal").modal("show");
    }
  });

  // Define an object to store sports events data for each city
  var sportsEvents = {};

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
        if (
          data._embedded &&
          data._embedded.events &&
          data._embedded.events.length > 0
        ) {
          data._embedded.events.sort(function (a, b) {
            return (
              new Date(a.dates.start.localDate) -
              new Date(b.dates.start.localDate)
            );
          });

          sportsEvents[city] = data._embedded.events;

          var eventsHtml = "";
          var favoriteButton = $("<button>")
            .text("Add to Favorites")
            .addClass("btn btn-primary favorites");

          data._embedded.events.forEach(function (event, index) {
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

            if (index % 4 === 0) {
              eventsHtml += '<div class="row">'; // Start a new row at the beginning of each group of 4
            }

            eventsHtml += `
              <div class="col-md-3 mb-4 mt-5">
                <div class="event card h-100">
                  ${favoriteButton.prop("outerHTML")}
                  <img class="event-image img-fluid" src="${eventImage}" alt="${eventName}">
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

            if (index % 4 === 3 || index === data._embedded.events.length - 1) {
              eventsHtml += "</div>"; // End the row at the end of each group of 4 or at the last item
            }
          });

          sportsContainer.html(eventsHtml);
        } else {
          sportsContainer.html("<h2>No events found.</h2>");
        }
      },
      error: function (xhr, status, err) {
        console.error(`Error fetching sports events data for ${city}: ${err}`);
      },
    });
  }

  // Function to fetch weather data and sports events data for the selected city
  function fetchWeatherAndSportsData(city) {
    fetchWeatherData(city);
    fetchSportsEvents(city);
  }
});
