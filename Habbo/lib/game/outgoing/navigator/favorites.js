const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class FavoritesComposer extends OutgoingPacket {
    constructor(favoriteRoomIds) {
        super(Outgoing.FavoritesMessageComposer);
        super.writeInt(15);
        super.writeInt(0);
    }
}

module.exports = FavoritesComposer;