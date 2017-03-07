const Outgoing = require('../../outgoing');
const OutgoingPacket = require('../../outgoing_packet');

class OpenConnectionComposer extends OutgoingPacket {
    constructor() {
        super(Outgoing.OpenConnectionMessageComposer);
    }
}

module.exports = OpenConnectionComposer;