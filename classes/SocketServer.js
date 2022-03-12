const Player = require('./Player');

module.exports = class SocketServer {
    constructor(server) {
        this._io = require('socket.io')(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        this._io.on('connection', (client) => {
            this.connection(client);
        });
        this.players = [];
    }

    connection(client) {
        this.addNewPlayer(client)
    }

    addNewPlayer(client) {
        const newPlayer = new Player("Moi", client.id);
        this._io.emit("newPlayer", { name: newPlayer._name, id: newPlayer._id });
    }
}