$(document).ready(function () {
  // Check if geolocation is available in the browser
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      // Get the user's lat and long
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      // Convert the obtained lat and long to a postal code using Nominatim
      convertLatLongToPostalCode(lat, long);
    });
  }

  function convertLatLongToPostalCode(lat, long) {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`;

    $.ajax({
      url: apiUrl,
      type: "GET",
      dataType: "json",
      success: function (data) {
        // Check if address contains postal code information
        if (data && data.address && data.address.postcode) {
          // Extract postal code
          const postalCode = data.address.postcode;

          // Print the postalcode in the console
          console.log("Postal Code:", postalCode);
        } else {
          console.error("No postal code found in the response.");
        }
      },
      error: function () {
        console.error("Error occurred while fetching data from Nominatim.");
      },
    });
  }
});
