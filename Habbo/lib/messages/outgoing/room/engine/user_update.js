const Outgoing = require('../../outgoing');
const OutgoingPacket = require('../../outgoing_packet');

class UserUpdateComposer extends OutgoingPacket {
    constructor() {
        super(Outgoing.UserUpdateMessageComposer);
        super.writeInt(0);
    }
}

module.exports = UserUpdateComposer;