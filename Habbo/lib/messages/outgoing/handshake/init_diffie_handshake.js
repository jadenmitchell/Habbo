const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class InitDiffieHandshakeComposer extends OutgoingPacket {
    constructor(token) {
        super(Outgoing.InitDiffieHandshakeMessageComposer);
        super.writeString(token);
        super.writeBoolean(false);
    }
}

module.exports = InitDiffieHandshakeComposer;