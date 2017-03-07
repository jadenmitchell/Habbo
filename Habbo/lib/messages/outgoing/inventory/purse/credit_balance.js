const Outgoing = require('../../outgoing');
const OutgoingPacket = require('../../outgoing_packet');

class CreditBalanceComposer extends OutgoingPacket {
    constructor(balance) {
        super(Outgoing.CreditBalanceComposer);
        super.writeString(balance + '.0');
    }
}

module.exports = CreditBalanceComposer;