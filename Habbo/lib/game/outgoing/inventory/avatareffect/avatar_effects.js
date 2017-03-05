const Outgoing = require('../../outgoing');
const OutgoingPacket = require('../../outgoing_packet');

class AvatarEffectsComposer extends OutgoingPacket {
    constructor(effects) {
        super(Outgoing.AvatarEffectsMessageComposer);
        super.writeInt(0);
    }
}

module.exports = AvatarEffectsComposer;