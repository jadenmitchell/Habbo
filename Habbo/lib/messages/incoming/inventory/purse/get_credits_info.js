const Incoming = require('./../../incoming');
const CreditBalanceComposer = require('../../../outgoing/inventory/purse/credit_balance');
const ActivityPointsComposer = require('../../../outgoing/notifications/activity_points');

function getCredits(session, packet) {
    console.log(session.player);

    session.sendPacket(new CreditBalanceComposer(session.player.credits));
    session.sendPacket(new ActivityPointsComposer(session.player.pixels));
}

/**
 * @interface
 * @type {getCredits}
 */
module.exports.handle = getCredits;

/**
 * @interface
 * @type {Number}
 */
module.exports.serial = Incoming.GetCreditsInfoEvent;