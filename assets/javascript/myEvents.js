document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the saved events from local storage
  var favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Get the element where saved events will be displayed
  var savedEventsList = document.getElementById("savedEventsList");

  // Display saved events
  favorites.forEach(function (event) {
    var listItem = document.createElement("p");
    listItem.innerHTML = `
            <img src="${event.image}" alt="${event.name}" style="max-width: 100px;">
            <h3>${event.name}</h3>
            <p>Date: ${event.date}</p>
            <p>Venue: ${event.venue}</p>
            <p>Location: ${event.location}</p>
            <a href="${event.link}" target="_blank">Event Link</a>
          `;
    savedEventsList.appendChild(listItem);
  });

  // Get the "Clear Favorites" button element
  var clearFavoritesButton = document.getElementById("clearFavoritesButton");

  // Add a click event listener to the button
  clearFavoritesButton.addEventListener("click", function () {
    // Clear the saved events in local storage
    localStorage.removeItem("favorites");

    // Clear the displayed saved events
    savedEventsList.innerHTML = "";
  });
});
