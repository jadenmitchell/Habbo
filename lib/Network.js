var logger = require('./logger'),
    net = require('net'),
    GameClient = require('./GameClient');

function Network(port) {
    this.port = port;
    this.connectedClients = [];
}

Network.prototype = {
    getPort : function () {
        return this.port;
    },

    getServer : function() {
        return this.tcpServer;
    },

    getConnectedClients : function() {
        return this.connectedClients;
    },

    invokeTcpServer : function() {
        this.tcpServer = net.createServer(function (socket) {
            socket.setNoDelay(true);
            socket.setKeepAlive(true);

            socket.id = (this.server.getConnectedClients().length + 1) * 1000;
            socket.server = this.server;
            socket.session = new GameClient(this);

            this.server.connectedClients.push(socket);

            socket.on('data', function (data) {
                this.session.onDataReceived(data);
            });

            socket.on('end', function() {
                var index = this.server.getConnectedClients().indexOf(socket);
                this.server.getConnectedClients().splice(index, 1);
                logger.info('Socket #' + socket.id + ' is no longer in use.');
            });

            logger.info('Socket #' + socket.id + ' is in use.');
        }).listen(this.port);

        this.tcpServer.server = this;
    }
};

module.exports = Network;