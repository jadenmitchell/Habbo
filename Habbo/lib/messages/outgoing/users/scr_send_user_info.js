const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class ScrSendUserInfoComposer extends OutgoingPacket {
    constructor() {
        super(Outgoing.ScrSendUserInfoMessageComposer);
        super.writeString("habbo_club");
        super.writeInt(0);
        super.writeInt(2);
        super.writeInt(0);
        super.writeInt(1);
        super.writeBoolean(false); // hc
        super.writeBoolean(false); // vip
        super.writeInt(0);
        super.writeInt(0);
        super.writeInt(0);
    }
}

module.exports = ScrSendUserInfoComposer;