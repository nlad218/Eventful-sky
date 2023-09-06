var concertsContainer = $("#concertsContainer");

$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/events.json?segmentId=KZFzniwnSyZfZ7v7nJ&apikey=dyJlprt5GV4U77gi63lcD1hjTcNSPTsi",
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
      // Assuming you want to display the artist's name of the first event in the response
      var artistName = json._embedded.events[0].name;
      var concertDate = json._embedded.events[0].dates.start.localDate;

      displayArtistInfo(artistName, concertDate);
    } else {
      console.log("No events found.");
    }
  },
  error: function (xhr, status, err) {
    console.error("Error fetching data: " + err);
  },
});

function displayArtistInfo(artistName, concertDate) {
  console.log("I am in the artist info section");
  var artistNameElement = $("<h2></h2>");
  artistNameElement.text(artistName);

  var concertDateElement = $("<p></p>");
  concertDateElement.text(concertDate);

  concertsContainer.append(artistNameElement);
  artistNameElement.append(concertDateElement);
}
