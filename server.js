const SocketServer = require('./classes/SocketServer.js');
const port = process.env.PORT || 3002;
const server = require("http").createServer();
new SocketServer(server);
server.listen(port, () => {
    console.log(`Serveur tourne sur le port : ${port}`);
});