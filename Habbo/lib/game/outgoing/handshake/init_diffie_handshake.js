const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class InitDiffieHandshakeComposer extends OutgoingPacket {
    constructor(prime, generator) {
        super(Outgoing.InitDiffieHandshakeMessageComposer);
        super.writeString(prime);
        super.writeString(generator);
    }
}

module.exports = InitDiffieHandshakeComposer