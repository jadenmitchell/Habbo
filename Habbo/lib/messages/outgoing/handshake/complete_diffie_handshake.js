const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class CompleteDiffieHandshakeComposer extends OutgoingPacket {
    constructor(key) {
        super(Outgoing.CompleteDiffieHandshakeMessageComposer);
        super.writeString(key);
    }
}

module.exports = CompleteDiffieHandshakeComposer;