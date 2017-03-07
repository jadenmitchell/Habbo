const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class HabboBroadcastComposer extends OutgoingPacket {
    constructor(message, url = '') {
        super(Outgoing.HabboBroadcastMessageComposer);
        super.writeString(message);
        super.writeString(url);
    }
}

module.exports = HabboBroadcastComposer;