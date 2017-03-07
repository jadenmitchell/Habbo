const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class RoomRatingComposer extends OutgoingPacket {
    constructor(ratingData) {
        super(Outgoing.RoomRatingComposer);
        super.writeInt(ratingData);
        super.writeBoolean(false);
    }
}

module.exports = RoomRatingComposer;