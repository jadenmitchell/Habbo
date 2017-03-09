const Outgoing = require('../../outgoing');
const OutgoingPacket = require('../../outgoing_packet');

class RoomVisualizationSettingsComposer extends OutgoingPacket {
    constructor() {
        super(Outgoing.RoomVisualizationSettingsComposer);
        super.writeBoolean(false);
        super.writeInt(1);
        super.writeInt(1);
    }
}

module.exports = RoomVisualizationSettingsComposer;