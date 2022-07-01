const Player = require("./Player");

module.exports = class SocketServer {
  constructor(server) {
    this._io = require("socket.io")(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    this._io.on("connection", (socket) => this.connect(socket));
    this.players = [];
  }

  connect(socket) {
    socket.on("client:user:new", (client) => this.addNewPlayer(socket, client));
  }

  addNewPlayer(socket, client) {
    const alreadyExists = this.players.some(
      (player) => player._name === client.name
    );
    if (!alreadyExists) {
      const newPlayer = new Player(client.name, client.id);
      console.log(
        "New Player ! name: %s, id:%s",
        newPlayer._name,
        newPlayer._id
      );
      this.players.push(newPlayer);
      console.log(this.players);
      this._io.emit("server:player:new", {
        name: newPlayer._name,
        id: newPlayer._id,
      });
      socket.emit("server:auth:login", { success: true, message: "Connexion effectuée avec succès" });
    } else {
      socket.emit("server:auth:login", { success: false, message: "Ce nom d'utilisation est déjà utilisé" });
    }
  }
};
