const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class AvailabilityStatusComposer extends OutgoingPacket {
    constructor() {
        super(Outgoing.AvailabilityStatusMessageComposer);
        super.writeBoolean(true);
        super.writeBoolean(false);
    }
}

module.exports = AvailabilityStatusComposer;