const net = require('net');
const logger = require('./common/logger');
const ByteBuf = require('./bytebuf');
const GameClient = require('./game/game_client');

/**
 * A non-blocking keep-alive TCP server socket.
 * 
 * @param port the port we'll be listening on
 * @param maxConnections maximum amount of connections to the server
 * @constructor
 */
function tcpServer(port, maxConnections) {
    this._port = port;
    this._maxConnections = maxConnections;
}

/**
 * Create socket and begin listening for new connections.
 * 
 * @this {TcpServer}
 */
tcpServer.prototype.listen = function() {
    this._tcpServerSocket = net.createServer((socket) => {
        // todo: develop a method to determine if auth/xml policy socket
        // todo: do not instantiate GameClient or configure socket if auth socket.
        socket.session = new GameClient(socket);
        socket.setKeepAlive(true);
        socket.setNoDelay(true);

        socket.on('data',
            (data) => {
                let buffer = Buffer.from(data);
                buffer = new ByteBuf(buffer);

                /* TODO: Decrypt the buffer. */
                socket.session.handlePacket(buffer);
            });
    });

    this._tcpServerSocket.on('error',
        (err) => {
            throw err;
        });

    this._tcpServerSocket.maxConnections = this._maxConnections;

    this._tcpServerSocket.listen({
            port: this._port,
            backlog: 10,
            exclusive: false
        },
        () => {
            logger.debug('Currently listening socket server on port ::%s', this._port);
        });
};

module.exports = tcpServer;