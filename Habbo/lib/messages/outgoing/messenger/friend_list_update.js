const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class FriendListUpdateComposer extends OutgoingPacket {
    constructor() {
        super(Outgoing.FriendListUpdateComposer);
        super.writeInt(0);
        super.writeInt(0);
    }
}

module.exports = FriendListUpdateComposer;