var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has("name") || !params.has("room")) {
  window.location = "index.html";
  throw new Error("The name and room are required");
}

var user = {
  name: params.get("name"),
  room: params.get("room"),
};

socket.on("connect", function () {
  console.log("Connected to server");

  socket.emit("joinChat", user, function (people) {
    //console.log("Users connected: ", resp);
    renderUsers(people);
  });
});

socket.on("disconnect", function () {
  console.log("Lost connection to server");
});

socket.on("createMessage", function (message) {
  renderMessages(message, false);
  scrollBottom();
});

socket.on("getPeople", function (people) {
  renderUsers(people);
});

// private messages
socket.on("privateMessage", function (message) {
  console.log("Private message:", message);
});
