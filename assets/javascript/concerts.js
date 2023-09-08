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

  function fetchWeatherData(city) {
    var apiKey = "0210813d87f5e7c72760631806e4bd7d";
    var weatherContainer = $("#weatherRow"); // Change the container to #weatherRow

    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`,
      async: true,
      dataType: "json",
      success: function (data) {
        // Display weather data for 5 days
        var forecastHtml = `<h2>5-Day Weather Forecast in ${city}</h2><div class="forecast-container d-flex flex-nowrap overflow-auto">`;

        // Loop through the forecast data (every 8 hours)
        for (var i = 0; i < data.list.length; i += 8) {
          var forecast = data.list[i];
          forecastHtml += `
            <div class="card m-2" style="width: 18rem;">
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

  // Function to fetch sports events from Ticketmaster API
  function fetchSportsEvents(city) {
    var apiKey = "dyJlprt5GV4U77gi63lcD1hjTcNSPTsi"; // Replace with your API key
    var concertsContainer = $("#concertsContainer");

    $.ajax({
      type: "GET",
      url: `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&segmentId=KZFzniwnSyZfZ7v7nJ&apikey=${apiKey}`,
      async: true,
      dataType: "json",
      success: function (data) {
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

          // Display sports events (concerts) in chronological order
          var eventsHtml = "<h2>Upcoming Music Events</h2>";
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

          concertsContainer.html(eventsHtml);
        } else {
          concertsContainer.html("<p>No music events found.</p>");
        }
      },
      error: function (xhr, status, err) {
        console.error(`Error fetching music events for ${city}: ${err}`);
      },
    });
  }

  // Event listener for the "Add to Favorites" button
  $("#concertsContainer").on("click", ".btn-primary", function () {
    // Get the event data associated with the clicked button
    var eventCard = $(this).closest(".event");
    var eventName = eventCard.find(".card-title").text();
    var eventDate = eventCard
      .find(".card-text:eq(0)")
      .text()
      .replace("Date: ", "");
    var venueName = eventCard
      .find(".card-text:eq(1)")
      .text()
      .replace("Venue: ", "");
    var eventLocation = eventCard
      .find(".card-text:eq(2)")
      .text()
      .replace("Location: ", "");
    var eventImage = eventCard.find("img").attr("src");

    // Create an object to represent the event
    var eventObject = {
      name: eventName,
      date: eventDate,
      venue: venueName,
      location: eventLocation,
      image: eventImage,
    };

    // Retrieve existing favorites from local storage or create an empty array
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Check if the event is already in favorites
    var isEventInFavorites = favorites.some(function (favorite) {
      return (
        favorite.name === eventObject.name && favorite.date === eventObject.date
      );
    });

    if (!isEventInFavorites) {
      // Add the event to favorites
      favorites.push(eventObject);

      // Update the local storage with the updated favorites
      localStorage.setItem("favorites", JSON.stringify(favorites));

      // Provide user feedback (you can customize this)
      alert("Event added to favorites!");
    } else {
      // Provide user feedback if the event is already in favorites (you can customize this)
      alert("Event is already in favorites!");
    }
  });
});
