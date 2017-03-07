const Outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class PerkAllowancesComposer extends OutgoingPacket {
    constructor() {
        super(Outgoing.PerkAllowancesMessageComposer);
        super.writeInt(9); // Count
        super.writeString('SAFE_CHAT');
        super.writeBoolean(true);
        super.writeString(''); // requirement.unfulfilled.safety_quiz_1
        super.writeString('USE_GUIDE_TOOL');
        super.writeBoolean(false);
        super.writeString('requirement.unfulfilled.helper_le');
        super.writeString('GIVE_GUIDE_TOURS');
        super.writeBoolean(false);
        super.writeString(''); // ??
        super.writeString('JUDGE_CHAT_REVIEWS');
        super.writeBoolean(false);
        super.writeString(''); // ??
        super.writeString('CALL_ON_HELPERS');
        super.writeBoolean(false);
        super.writeString(''); // ??
        super.writeString('CITIZEN');
        super.writeBoolean(true);
        super.writeString(''); // ??
        super.writeString('FULL_CHAT');
        super.writeBoolean(true);
        super.writeString(''); // ??
        super.writeString('TRADE');
        super.writeBoolean(true);
        super.writeString(''); // ??
        super.writeString('VOTE_IN_COMPETITIONS');
        super.writeBoolean(false);
        super.writeString('requirement.unfulfilled.helper_level_2');
    }
}

module.exports = PerkAllowancesComposer;