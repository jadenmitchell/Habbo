const Outgoing = require('../../outgoing');
const OutgoingPacket = require('../../outgoing_packet');

class UsersComposer extends OutgoingPacket {
    constructor() {
        super(Outgoing.UsersMessageComposer);
        super.writeInt(0);
    }
}

module.exports = UsersComposer;