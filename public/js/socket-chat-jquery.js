var params = new URLSearchParams(window.location.search);

var name = params.get("name");
var room = params.get("room");

// refs
var divUsers = $("#divUsers");
var sendForm = $("#sendForm");
var txtMessage = $("#txtMessage");
var divChatBox = $("#divChatBox");

// function to render users
function renderUsers(people) {
  console.log(people);

  var html = "";

  html += "<li>";
  html +=
    '<a href="javascript:void(0)" class="active">Chat de <span>' +
    params.get("room") +
    "</span></a>";
  html += "</li>";

  for (var i = 0; i < people.length; i++) {
    html += "<li>";
    html +=
      '<a data-id="' +
      people[i].id +
      '" href="javascript:void(0)"><img src="assets/images/users/1.png" alt="user-img" class="img-circle" /><span>' +
      people[i].name +
      '<small class="text-success">online</small></span></a>';
    html += "</li>";
  }

  divUsers.html(html);
}

function renderMessages(message, me) {
  var html = "";

  var date = new Date(message.date);
  var time = date.getHours() + ":" + date.getMinutes();

  var adminClass = "info";
  if (message.name === "Admin") {
    adminClass = "danger";
  }

  if (me) {
    html += '<li class="reverse">';
    html += '<div class="chat-content">';
    html += "<h5>" + message.name + "</h5>";
    html += '<div class="box bg-light-inverse">' + message.message + "</div>";
    html += "</div>";
    html +=
      '<div class="chat-img"><img src="assets/images/users/1.png" alt="user" /></div>';
    html += '<div class="chat-time">' + time + "</div>";
    html += "</li>";
  } else {
    html += '<li class="animated fadeIn">';

    if (message.name !== "Admin") {
      html +=
        '<div class="chat-img"><img src="assets/images/users/1.png" alt="user" /></div>';
    }
    html += '<div class="chat-content">';
    html += "<h5>" + message.name + "</h5>";
    html +=
      '<div class="box bg-light-' +
      adminClass +
      '">' +
      message.message +
      "</div>";
    html += "</div>";
    html += '<div class="chat-time">' + time + "</div>";
    html += "</li>";
  }

  divChatBox.append(html);
}

function scrollBottom() {
  var newMessage = divChatBox.children("li:last-child");

  var clientHeight = divChatBox.prop("clientHeight");
  var scrollTop = divChatBox.prop("scrollTop");
  var scrollHeight = divChatBox.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    divChatBox.scrollTop(scrollHeight);
  }
}

// listeners
divUsers.on("click", "a", function () {
  var id = $(this).data("id");

  if (id) {
    console.log(id);
  }
});

sendForm.on("submit", function (e) {
  e.preventDefault();

  if (txtMessage.val().trim().length === 0) {
    return;
  }

  socket.emit(
    "createMessage",
    {
      name: name,
      message: txtMessage.val(),
    },
    function (message) {
      txtMessage.val("").focus();
      renderMessages(message, true);
      scrollBottom();
    }
  );
});
