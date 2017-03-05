const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class UserRightsComposer extends OutgoingPacket {
    constructor(hasClub, hasVip, isAdmin) {
        super(Outgoing.UserRightsMessageComposer);

        if (!hasClub && hasVip) {
            super.writeInt(2);
        }
        else if (hasClub && !hasVip) {
            super.writeInt(1);
        }
        else {
            super.writeInt(0);
        }

        super.writeInt(isAdmin ? 1000 : 0);
    }
}

module.exports = UserRightsComposer;