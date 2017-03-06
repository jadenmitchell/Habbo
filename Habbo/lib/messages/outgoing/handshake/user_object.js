const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class UserObjectComposer extends OutgoingPacket {
    constructor(key) {
        super(Outgoing.CompleteDiffieHandshakeMessageComposer);
        super.writeString(key);
    }
}

module.exports = UserObjectComposer;