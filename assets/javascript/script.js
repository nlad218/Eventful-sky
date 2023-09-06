$(document).ready(function () {
  // Define the API endpoint URL
  const apiKey = "dyJlprt5GV4U77gi63lcD1hjTcNSPTsi";
  const apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json";

  // Handle form submission
  $("#search-form").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the search query from the input field
    const searchQuery = $("#search-input").val();

    // Construct the API URL with the query parameter
    const fullApiUrl = `${apiUrl}?keyword=${searchQuery}&apikey=${apiKey}`;

    $.ajax({
      url: fullApiUrl,
      method: "GET",
      success: function (response) {
        // Handle the API response here (e.g., display results on the page)
        console.log(response);
      },
      error: function (error) {
        // Handle any errors that occur during the request
        console.error("API request failed:", error);
      },
    });
  });
});
