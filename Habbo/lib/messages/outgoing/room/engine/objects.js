const Outgoing = require('../../outgoing');
const OutgoingPacket = require('../../outgoing_packet');

class ObjectsComposer extends OutgoingPacket {
    constructor() {
        super(Outgoing.ObjectsMessageComposer);
        super.writeInt(1);
        super.writeInt(1);
        super.writeString('Jaden');

        super.writeInt(0);
    }
}

module.exports = ObjectsComposer;