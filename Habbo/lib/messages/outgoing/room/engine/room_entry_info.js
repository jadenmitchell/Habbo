const Outgoing = require('../../outgoing');
const OutgoingPacket = require('../../outgoing_packet');

class RoomEntryInfoComposer extends OutgoingPacket {
    constructor() {
        super(Outgoing.RoomEntryInfoMessageComposer);
        super.writeBoolean(false);
        super.writeInt(1);
        super.writeBoolean(false);
    }
}

module.exports = RoomEntryInfoComposer;