const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class GetMinimailMessageCountComposer extends OutgoingPacket {
    constructor() {
        super(Outgoing.GetMinimailMessageCountComposer);
        super.writeInt(0);
    }
}

module.exports = GetMinimailMessageCountComposer;