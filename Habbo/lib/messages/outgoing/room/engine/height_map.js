const Outgoing = require('../../outgoing');
const OutgoingPacket = require('../../outgoing_packet');

class HeightMapComposer extends OutgoingPacket {
    constructor(map) {
        super(Outgoing.HeightMapMessageComposer);
        super.writeString(map);
    }
}

module.exports = HeightMapComposer;