var params = new URLSearchParams(window.location.search);

// ref
var divUsers = $("#divUsers");

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
