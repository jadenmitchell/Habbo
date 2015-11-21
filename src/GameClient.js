var Player = require('./Managers/Player');
var Packet = require('./Managers/Packet');
// Packet Handlers.
var Request = require('./messages/Request');
var Response = require('./messages/Response');

function GameClient(socket) {
    this.socket = socket;
}

GameClient.prototype.getSocket = function() {
    return this.socket;
};

GameClient.prototype.tryLogin = function() {
    this.player = new Player(this);
};

GameClient.prototype.onDataReceived = function(data) {
    var buffer = new Buffer(data);
    var message = new Request(buffer);

    if (buffer[0] == 60) {
        this.socket.write("<?xml version=\"1.0\"?>\r\n" +
                "<!DOCTYPE cross-domain-policy SYSTEM \"/xml/dtds/cross-domain-policy.dtd\">\r\n" +
                "<cross-domain-policy>\r\n" +
                "<allow-access-from domain=\"*\" to-ports=\"1-31111\" />\r\n" +
                "</cross-domain-policy>\0");
    }
    else if (data[0] != 67) {
        Packet.execute(this, message);
    }
};

GameClient.prototype.sendPacket = function(packet) {
    //var message = new Response();
};

module.exports = GameClient;
