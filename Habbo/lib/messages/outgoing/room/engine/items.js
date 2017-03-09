const Outgoing = require('../../outgoing');
const OutgoingPacket = require('../../outgoing_packet');

class ItemsComposer extends OutgoingPacket {
    constructor() {
        super(Outgoing.ItemsMessageComposer);
        super.writeInt(1);
        super.writeInt(1);
        super.writeString('Jaden');

        super.writeInt(0);
    }
}

module.exports = ItemsComposer;