const { io } = require("../server");
const { Users } = require("../classes/users");

const users = new Users();

io.on("connection", (client) => {
  client.on("joinChat", (data, callback) => {
    if (!data.name) {
      return callback({
        error: true,
        message: "The name is required",
      });
    }

    let people = users.addPerson(client.id, data.name);

    client.broadcast.emit("getPeople", users.getPeople());

    callback(people);
  });

  client.on("disconnect", () => {
    let personDeleted = users.deletePerson(client.id);

    client.broadcast.emit("createMessage", {
      user: "Admin",
      message: `${personDeleted.name} left the chat`,
    });

    client.broadcast.emit("getPeople", users.getPeople());
  });
});
