const { io } = require("../server");
const { Users } = require("../classes/users");
const { createMessage } = require("../utils/utils");

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

  client.on("createMessage", (data) => {
    let person = users.getPerson(client.id);
    let message = createMessage(person.name, data.message);
    client.broadcast.emit("createMessage", message);
  });

  client.on("disconnect", () => {
    let personDeleted = users.deletePerson(client.id);

    client.broadcast.emit(
      "createMessage",
      createMessage("Admin", `${personDeleted.name} left the chat`)
    );

    client.broadcast.emit("getPeople", users.getPeople());
  });

  // private messages
  client.on("privateMessage", (data) => {
    let person = users.getPerson(client.id);

    client.broadcast
      .to(data.to)
      .emit("privateMessage", createMessage(person.name, data.message));
  });
});
