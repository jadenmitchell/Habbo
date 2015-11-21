var net = require('net');
var GameClient = require('./GameClient');
var Packet = require('./Managers/Packet');

function Server(port) {
    this.port = port;
    this.connectedClients = [];

    this.invokeTcpServer();
    this.initPacketData();
}

Server.prototype.getPort = function() {
    return this.port;
};

Server.prototype.getServer = function() {
    return this.tcpServer;
};

Server.prototype.getConnectedClients = function() {
    return this.connectedClients;
};

Server.prototype.invokeTcpServer = function() {
    this.tcpServer = net.createServer(function(socket) {
        // Socket Configuration.
        socket.setNoDelay(true);
        socket.setKeepAlive(true, 0);

        // Socket Identification.
        socket.id = (this.server.getConnectedClients().length + 1) * 1000;
        // FIXME: socket.pipe(socket);

        socket.on('data', function(data) {
            socket.session.onDataReceived(data);
        });

        socket.on('end', function() {
            //var index = this.server.getConnectedClients().indexOf(socket);
            //this.server.getConnectedClients().splice(index, 1);
        });

        // Socket Instances.
        socket.session = new GameClient(socket);

        this.server.getConnectedClients().push(socket);
        console.log("<" + socket.remoteAddress + "> in use of socket #" + socket.id + ".");
    }).listen(this.port);

    this.tcpServer.server = this;
};

Server.prototype.initPacketData = function() {
    global.Incoming = require('./Headers/Incoming');
    global.Outgoing = require('./Headers/Outgoing');
    Packet.define();
};

module.exports = Server;
