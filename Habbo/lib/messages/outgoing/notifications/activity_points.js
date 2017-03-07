const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class ActivityPointsComposer extends OutgoingPacket {
    constructor(amount) {
        super(Outgoing.ActivityPointsMessageComposer);
        super.writeInt(1); // type
        super.writeInt(0); // other currency lovehearts etc
        super.writeInt(amount);
    }
}

module.exports = ActivityPointsComposer;