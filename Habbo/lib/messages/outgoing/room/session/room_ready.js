const Outgoing = require('../../outgoing');
const OutgoingPacket = require('../../outgoing_packet');

class RoomReadyComposer extends OutgoingPacket {
    constructor(room, model) {
        super(Outgoing.RoomReadyMessageComposer);
        super.writeString(model);
        super.writeInt(room);
    }
}

module.exports = RoomReadyComposer;