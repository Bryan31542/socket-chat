var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has("name")) {
  window.location = "index.html";
  throw new Error("The name is required");
}

var user = {
  name: params.get("name"),
};

socket.on("connect", function () {
  console.log("Connected to server");

  socket.emit("joinChat", user, function (resp) {
    console.log("Users connected: ", resp);
  });
});

socket.on("disconnect", function () {
  console.log("Lost connection to server");
});

socket.on("createMessage", function (message) {
  console.log("Server:", message);
});

socket.on("getPeople", function (people) {
  console.log(people);
});
