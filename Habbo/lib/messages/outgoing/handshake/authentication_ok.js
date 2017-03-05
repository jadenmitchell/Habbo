const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class AuthenticationOKComposer extends OutgoingPacket {
    constructor() {
        super(Outgoing.AuthenticationOKMessageComposer);
    }
}

module.exports = AuthenticationOKComposer;