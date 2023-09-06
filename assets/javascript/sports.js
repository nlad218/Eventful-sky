var sportsContainer = $("#sportsContainer");

// show us what the different segment IDs are
// var segmentsUrl =
//   "https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=dyJlprt5GV4U77gi63lcD1hjTcNSPTsi";

$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/events.json?segmentId=KZFzniwnSyZfZ7v7nE&apikey=dyJlprt5GV4U77gi63lcD1hjTcNSPTsi",
  async: true,
  dataType: "json",
  success: function (json) {
    console.log(json);
    // Check if there are any events in the response
    if (
      json._embedded &&
      json._embedded.events &&
      json._embedded.events.length > 0
    ) {
      // loops through each event
      json._embedded.events.forEach(function (event) {
        var name = event.name;
        var date = event.dates.start.localDate;
        var venue = event._embedded.venues[0].name;
        var city = event._embedded.venues[0].city.name;
        var state = event._embedded.venues[0].state.name;

        displayArtistInfo(name, date, venue, city, state);
      });
    } else {
      console.log("No events found.");
    }
  },
  error: function (xhr, status, err) {
    console.error("Error fetching data: " + err);
  },
});

function displayArtistInfo(name, date, venue, city, state) {
  console.log("I am in the sports info section");
  var nameElement = $("<h2></h2>");
  nameElement.text(name);

  var dateElement = $("<p></p>");
  dateElement.text(date);

  var venueElement = $("<p></p>");
  venueElement.text(venue);

  var cityElement = $("<p></p>");
  var stateElement = $("<p></p>");
  cityElement.text(city + ", " + state);

  sportsContainer.append(nameElement);
  nameElement.append(dateElement);
  dateElement.append(venueElement);
  venueElement.append(cityElement);
  cityElement.append(stateElement);
}
