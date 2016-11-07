const net = require("net");
const logger = require("./logger");
const session = require("./session");
const packet = require("./game/packet");

function redisServer(port) {
    this._serverPort = port;
};

function tcpServer(port, maxConnections) {
    this._listenPort = port;
    this._maxConnections = maxConnections;
    this._connectedClients = [];
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

tcpServer.prototype = {
    getPort: function() {
        return this._listenPort;
    },

    getServer: function() {
        return this._tcpServer;
    },

    getConnectedClients: function() {
        return this._connectedClients;
    },

    startListen: function() {
        this._tcpServer = net.createServer((socket) => {
                socket.setNoDelay(true);
                socket.parent = this.parent;
                socket.session = session.HabboSession(this);
                socket.parent.getConnectedClients().push(socket);
                logger.info("Socket #%s is in use.", socket.id);

                socket.on("data",
                    (data) => {
                        let buffer = new Buffer(data);
                        // decrypt data
                        //buffer = encryption.doDecrypt(rsa, buffer);
                        packet.requestBufferCodecHandler(buffer);
                    });

                socket.on("end",
                    () => {
                        const index = this.server.getConnectedClients().indexOf(socket);
                        this.server.getConnectedClients().splice(index, 1);
                        logger.info("Socket #%s is no longer in use.", socket.id);
                    });
            })
            .listen({
                    port: this.getPort(),
                    backlog: 10,
                    exclusive: false
                },
                () => {
                    logger.info("Server is up and running on port: %s", this.getPort());
                });

        this._tcpServer.maxConnections = this._maxConnections;
        // handle socket errors
        this._tcpServer.parent = this;
    }
};

module.exports.TcpServer = tcpServer;