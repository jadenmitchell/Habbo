const Outgoing = require('../../outgoing');
const OutgoingPacket = require('../../outgoing_packet');

class FloorHeightMapComposer extends OutgoingPacket {
    constructor(map) {
        super(Outgoing.FloorHeightMapMessageComposer);
        super.writeString(map);
    }
}

module.exports = FloorHeightMapComposer;