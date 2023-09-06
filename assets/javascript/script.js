$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/events.json?&apikey=dyJlprt5GV4U77gi63lcD1hjTcNSPTsi",
  async: true,
  dataType: "json",
  success: function (json) {
    console.log(json);
  },
  error: function (xhr, status, err) {
    // This time, we do not end up here!
  },
});

// // Wait for the document to be fully loaded before adding event listeners
// document.addEventListener("DOMContentLoaded", function () {
//   // Find the "Start free trial" button by its class
//   var startTrialButton = document.querySelector(".btn-primary");

//   // Add a click event listener to the button
//   startTrialButton.addEventListener("click", function () {
//     // Redirect the user to another page
//     window.location.href = "freetrial.html";
//   });
// });
