const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class UserObjectComposer extends OutgoingPacket {
    constructor(player) {
        super(Outgoing.UserObjectComposer);
        super.writeInt(player.id);
        super.writeString(player.username);
        super.writeString(player.figure);
        super.writeString(player.gender);
        super.writeString(player.motto);
        super.writeString('Jaden');
        super.writeBoolean(false);
        super.writeInt(3); //RespectPoints
        super.writeInt(3); //RespectPointsLeftPlayer
        super.writeInt(3); //RespectPointsLeftPet
        super.writeBoolean(true); // Friends stream active
        super.writeString(''); // last online?
        super.writeBoolean(false); // Can change name
        super.writeBoolean(false);
    }
}

module.exports = UserObjectComposer;