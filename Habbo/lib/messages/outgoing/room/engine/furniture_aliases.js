const Outgoing = require('../../outgoing');
const OutgoingPacket = require('../../outgoing_packet');

class FurnitureAliasesComposer extends OutgoingPacket {
    constructor() {
        super(Outgoing.FurnitureAliasesMessageComposer);
        super.writeInt(0);
    }
}

module.exports = FurnitureAliasesComposer;