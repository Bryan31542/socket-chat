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

    callback(people);
  });
});
