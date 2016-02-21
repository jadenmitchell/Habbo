var logger = require('./logger'),
    Request = require('./messages/Request');

function GameClient(socket) {
    this.socket = socket;
}

GameClient.prototype = {
    getSocket : function () {
        return this.socket;
    },

    onDataReceived : function (data) {
        var buffer = new Buffer(data);

        if (buffer[0] == 60) {
            this.socket.write("<?xml version=\"1.0\"?>\r\n" +
                "<!DOCTYPE cross-domain-policy SYSTEM \"/xml/dtds/cross-domain-policy.dtd\">\r\n" +
                "<cross-domain-policy>\r\n" +
                "<allow-access-from domain=\"*\" to-ports=\"1-31111\" />\r\n" +
                "</cross-domain-policy>\0");
        }
        else if (buffer[0] != 67) {
            var request = new Request(buffer);
            if (!request.corrupt)
                logger.debug("Incoming Packet: " + request.header);
        }
    },

    sendRaw : function (data) {
        this.socket.write(data);
    }
};

module.exports = GameClient;