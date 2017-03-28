const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class MessengerInitComposer extends OutgoingPacket {
    constructor() {
        super(Outgoing.MessengerInitComposer);
        super.writeInt(300);
        super.writeInt(300);
        super.writeInt(800);
        super.writeInt(1100);
        super.writeInt(0); // category count
        super.writeInt(0);
    }
}

module.exports = MessengerInitComposer;