$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/events.json?segmentId=KZFzniwnSyZfZ7v7nJ&apikey=dyJlprt5GV4U77gi63lcD1hjTcNSPTsi",
  async: true,
  dataType: "json",
  success: function (json) {
    console.log(json);
  },
  error: function (xhr, status, err) {
    // This time, we do not end up here!
  },
});
