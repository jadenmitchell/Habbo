const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class NavigatorSettingsComposer extends OutgoingPacket {
    constructor(homeRoomId) {
        super(Outgoing.NavigatorSettingsMessageComposer);
        super.writeInt(homeRoomId);
        super.writeInt(homeRoomId);
    }
}

module.exports = NavigatorSettingsComposer;