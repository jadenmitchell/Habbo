const Packet = require('../packet');

class OutgoingPacket extends Packet {
    constructor(header) {
        super(header, 0, null);

    }
}

module.exports = OutgoingPacket;